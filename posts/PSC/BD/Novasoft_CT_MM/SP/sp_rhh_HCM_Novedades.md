# Stored Procedure: sp_rhh_HCM_Novedades

## Usa los objetos:
- [[nom_cabdoc]]
- [[nom_cuedoc]]
- [[rhh_emplea]]
- [[Rhh_HCM_Conceptos]]
- [[Rhh_HCM_Novedades]]
- [[sp_gen_numerador]]
- [[sp_rhh_LiqErrInfo]]

```sql
-- =============================================
-- Author:		Ricardo Santamaría Vanegas
-- Create date: Abril 5 de 2022
-- Description:	Pasa las novedades importadas a la tabla Rhh_HCM_Novedades a las tablas de documentos estándar
-- =============================================
CREATE PROCEDURE sp_rhh_HCM_Novedades
	@FchDoc DATE,
	@FchApl DATE,
	@TipLiq CHAR(2),
	@DesDoc NVARCHAR(200)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @cMsg NVARCHAR(MAX);
    DECLARE @cMsgInconsis NVARCHAR(MAX);
    DECLARE @AnoDoc CHAR(4)= CONVERT(VARCHAR, YEAR(@FchDoc));
    DECLARE @PerDoc CHAR(2)= RIGHT('00' + CONVERT(VARCHAR, MONTH(@FchDoc)), 2);

    CREATE TABLE #t_Inconsis(
	    Nro         INT IDENTITY(1, 1),
	    NumEmp      VARCHAR(4),
	    conEven     VARCHAR(4),
	    Descripcion NVARCHAR(250)
					   );

    /*Validando conceptos*/
    SET @cMsg = 'Código de concepto no homologado';
    INSERT INTO #t_Inconsis( NumEmp,
					    conEven,
					    Descripcion
					  )
    SELECT DISTINCT
		 NULL,
		 H.ConEven,
		 @cMsg
    FROM Rhh_HCM_Novedades AS H
    LEFT OUTER JOIN Rhh_HCM_Conceptos AS C ON H.ConEven = C.cod_con_HCM
    WHERE C.cod_con_Ent IS NULL;

    /*Validando empleados*/
    SET @cMsg = 'Código de empleado inexistente o no homologado';
    INSERT INTO #t_Inconsis( NumEmp,
					    conEven,
					    Descripcion
					  )
    SELECT DISTINCT
		 H.NumEmp,
		 NULL,
		 @cMsg
    FROM Rhh_HCM_Novedades AS H
    LEFT OUTER JOIN rhh_emplea AS E ON H.NumEmp = E.cod_emp_Extr
    WHERE E.cod_emp IS NULL;

    IF EXISTS( SELECT Nro FROM #t_Inconsis )
    BEGIN
	   SELECT @cMsgInconsis = COALESCE(@cMsgInconsis, 'No es posible cargar las novedaes, datos inconsistentes' + CHAR(13) + CHAR(10)) + T.
	   Descripcion + ' ----> ' + CASE
							   WHEN T.NumEmp IS NULL THEN T.conEven
							   ELSE T.NumEmp
						    END + CHAR(13) + CHAR(10)
	   FROM #t_Inconsis AS T;

	   RAISERROR(@cMsgInconsis, 16, 1);

	   RETURN;
    END;

    DECLARE @cNum_doc CHAR(14);
    DECLARE @nerror SMALLINT;
    DECLARE @cMsgErr NVARCHAR(MAX);

    EXEC sp_gen_numerador '803',
					 '0',
					 @cNum_doc OUTPUT,
					 @nerror OUTPUT;

    IF @nerror <> 0
    BEGIN
	   SET @cMsgErr = CASE @nerror
					  WHEN 100 THEN 'Tipo de documento inexistente o numerador inactivo'
					  WHEN 101 THEN 'Número actual inexistente o nulo'
					  WHEN 102 THEN 'Error en actualización de numeración consecutiva'
					  WHEN 103 THEN 'Superó el límite del consecutivo'
					  ELSE 'Error no Determinado'
				   END;

	   RAISERROR(@cMsgErr, 16, 1);
	   RETURN;
    END;

    WITH DatosImp
	    AS (SELECT ROW_NUMBER() OVER(
				ORDER BY E.Cod_emp,
					    C.cod_con_Ent) AS Reg_doc,
				H.NumEmp,
				E.cod_emp,
				H.ConEven,
				C.cod_con_Ent AS cod_con,
				CONVERT(INT, H.Horas) + ROUND(CONVERT(INT, H.minutos) / 60.0, 2) AS cantidad
		   FROM Rhh_HCM_Novedades AS H
		   INNER JOIN Rhh_HCM_Conceptos AS C ON H.ConEven = C.cod_con_HCM
		   INNER JOIN rhh_emplea AS E ON H.NumEmp = E.cod_emp_Extr)
	    SELECT @AnoDoc AS ano_doc,
			 @PerDoc AS per_doc,
			 '803' AS tip_doc,
			 '803' AS sub_tip,
			 @cNum_doc AS num_doc,
			 reg_doc,
			 @FchDoc AS fec_doc,
			 @TipLiq AS tip_liq,
			 @DesDoc AS des_doc,
			 cod_emp,
			 cod_con,
			 cantidad
	    INTO #T_Documento
	    FROM DatosImp;

    BEGIN TRY
	   BEGIN TRANSACTION;
	   INSERT INTO nom_cabdoc( ano_doc,
						  per_doc,
						  tip_doc,
						  sub_tip,
						  num_doc,
						  fec_doc,
						  tip_liq,
						  des_doc
						)
	   SELECT DISTINCT
			ano_doc,
			per_doc,
			tip_doc,
			sub_tip,
			num_doc,
			fec_doc,
			tip_liq,
			des_doc
	   FROM #T_Documento;

	   INSERT INTO nom_cuedoc( ano_doc,
						  per_doc,
						  tip_doc,
						  sub_tip,
						  num_doc,
						  reg_doc,
						  tip_liq,
						  cod_con,
						  cod_emp,
						  can_doc,
						  val_doc,
						  fec_doc,
						  fec_apl
						)
	   SELECT ano_doc,
			per_doc,
			tip_doc,
			sub_tip,
			num_doc,
			Reg_doc,
			tip_liq,
			cod_con,
			cod_emp,
			cantidad,
			0,
			fec_doc,
			@FchApl
	   FROM #T_Documento;

	   COMMIT TRANSACTION;

	   SELECT @cMsg = 'Se creó el documento Tipo "803" con número ' + @cNum_doc + '. Creado con ' + CONVERT(VARCHAR, COUNT(Reg_doc)) + ' registros.'
	   FROM #T_Documento;
    END TRY
    BEGIN CATCH
	   EXEC sp_rhh_LiqErrInfo @cMsgErr OUTPUT;

	   ROLLBACK TRANSACTION;

	   SET @cMsgErr = 'No fue posible crear el documento de novedades en Nómina. ' + CHAR(13) + CHAR(10) + @cMsgErr;
	   RAISERROR(@cMsgErr, 16, 1);
    END CATCH;

    DELETE FROM Rhh_HCM_Novedades;

END;

```
