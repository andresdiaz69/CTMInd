# Stored Procedure: sp_rhh_UsuDef_DetPagoImp

## Usa los objetos:
- [[fn_rhh_ContratoFch]]
- [[rhh_concep]]
- [[rhh_DefConcep]]
- [[rhh_emplea]]
- [[rhh_tbModLiq]]
- [[rhh_tipliquid]]
- [[rhh_UsuDef_DetPagImp]]
- [[Rhh_UsuDef_DetPago]]

```sql
-- ======================================================================================
-- Author:		FLADIR ALDANA ARIAS
-- Create date: Junio 5 de 2020
-- Adaptado al Estándar por Ricardo Santamaría Vanegas
-- Fecha Adaptación Noviembre 19 de 2020
-- Description:	Importacion masiva de historial de pagos por definición y concepto definido.
-- ======================================================================================
CREATE PROCEDURE [dbo].[sp_rhh_UsuDef_DetPagoImp]
AS
BEGIN
    SET NOCOUNT ON;
    SET ROWCOUNT 0;

    DECLARE @repetidos INT

    IF (SELECT COUNT(*)
        FROM rhh_UsuDef_DetPagImp) = 0
    BEGIN
        SELECT 'No hay registros para proesar' AS Error, '0' AS Codigo
        RETURN
    END

    /*Creación tabla para guardar las inconsistencias encontradas*/
    CREATE TABLE #T_Errores (	  Error NVARCHAR(max) NULL, 
						  cod_emp CHAR(6) NULL, 
						  mod_liq CHAR(2) NULL, 
						  cod_con CHAR(6) NULL, 
						  tip_liq CHAR(2) NULL,
						  fec_cte DATETIME NULL,
						  cod_def_concep INT NULL)

    --Verificar la relación entre los conceptos y las definiciones
    INSERT
    INTO	 #T_Errores
		  (Error, cod_con, cod_def_concep)
		  SELECT  DISTINCT 'El código de concepto reportado no está relacionado con la definición de concepto' AS Error, 
				i.cod_con, 
				i.cod_def_concep
		  FROM    rhh_DefConcep d
		  INNER   JOIN rhh_UsuDef_DetPagImp i ON i.cod_con = d.cod_con AND i.mod_liq = d.mod_liq AND i.cod_def_concep != d.Cod_def_concep

    --Verificar la existencia de los empleados en la base de datos.
    INSERT
    INTO	 #T_Errores
		  (Error, cod_emp)
		  SELECT DISTINCT 'El empleado no se encuentra creado en la base de datos' AS Error, H.cod_emp
		  FROM	 rhh_UsuDef_DetPagImp H
		  LEFT	 OUTER JOIN rhh_emplea E ON H.cod_emp = E.cod_emp
		  WHERE	 E.cod_emp IS NULL

    --verificar la existencia del concepto en la base de datos.
    INSERT
    INTO	 #T_Errores
		  (Error, cod_con)
		  SELECT  DISTINCT 'El concepto no existe en la base de datos.' AS Error, I.cod_con
		  FROM    rhh_UsuDef_DetPagImp AS I
		  LEFT    OUTER JOIN rhh_concep AS C ON I.cod_con = C.cod_con
		  WHERE   C.cod_con IS NULL

    --Verificar errores en los tipos de liquidacion.
    INSERT
    INTO	 #T_Errores
		  (Error, tip_liq)
		  SELECT  DISTINCT 'El tipo de liquidación reportado no es válido' AS Error,
				H.tip_liq
		  FROM    rhh_UsuDef_DetPagImp H
		  LEFT    OUTER JOIN rhh_tipliquid AS E ON H.tip_liq = E.tip_liq
		  WHERE   E.tip_liq IS NULL

    --Verificar errores en el modo de liquidacion para conceptos.
    INSERT
    INTO	 #T_Errores
		  (Error, mod_liq)
		  SELECT  DISTINCT 'El modo de liquidación reportado no es válido para el concepto al que está asociado' AS Error,
				H.mod_liq
		  FROM    rhh_UsuDef_DetPagImp H
		  LEFT    OUTER JOIN rhh_tbModLiq AS E ON H.mod_liq = E.mod_liq
		  WHERE   E.mod_liq IS NULL

    --Verificar la existencia de valores duplicados
    INSERT
    INTO	  #T_Errores
		  (cod_emp, cod_con, tip_liq, fec_cte, Error)
		  SELECT	cod_emp,
				cod_con,
				tip_liq,
				fec_cte,
				'El registro se encuenta repetido, está ' + CONVERT(VARCHAR(20), COUNT(*)) + ' veces' AS Error
		  FROM	rhh_UsuDef_DetPagImp
		  GROUP	BY cod_emp, cod_con, tip_liq, fec_cte
		  HAVING	COUNT(*) > 1


    --Se verifica si se estan insertando registros que ya existen en la base de datos.
    INSERT
    INTO	  #T_Errores
		  SELECT  'El registro ya se encuentra en el histórico.' As Error,
				i.cod_emp,
				i.cod_con,
				i.tip_liq,
				i.fec_cte
		  FROM	rhh_UsuDef_DetPagImp as i
		  INNER	JOIN Rhh_UsuDef_DetPago as h ON 
				    i.cod_emp = h.cod_emp
				    AND i.cod_con = h.cod_con
				    AND i.cod_def_concep = h.Cod_def_concep
				    AND i.tip_liq = h.tip_liq
				    AND i.fec_cte = h.fec_cte
		  
   -- actualiza con el contrato a la fecha de liquidacion.
	UPDATE rhh_UsuDef_DetPagImp SET cod_cont = dbo.fn_rhh_ContratoFch(cod_emp,fec_cte,0) WHERE cod_emp = cod_emp

	-- Valida que el registro se encuentre en la vigencia de los constratos del empleado.
    INSERT
    INTO	  #T_Errores
		  (cod_emp, cod_con, tip_liq, fec_cte, Error)
		  SELECT	cod_emp, 
				cod_con,
				tip_liq,
				fec_cte,
				'La fecha de corte del registro es inferior a la fecha de ingreso del empleado, o no tiene un contrato cuya vigencia coincida con la del registro reportado'
		FROM rhh_UsuDef_DetPagImp
		WHERE cod_cont = 0

    IF EXISTS(SELECT * FROM #T_Errores)
    BEGIN
	   SELECT	 Error, 
			 cod_emp AS [Código Empleado],
			 mod_liq AS [Modo de Liquidación],
			 cod_con AS Concepto,
			 tip_liq AS [Tipo de Liquidación],
			 fec_cte AS [Fecha de Corte],
			 cod_def_concep AS [Código Definición]
	   FROM	 #T_Errores

	   DELETE FROM rhh_UsuDef_DetPagImp
	   RETURN
    END

	--al pasar las validaciones se realizan las inserciones correspondientes.
	INSERT 
	INTO	  Rhh_UsuDef_DetPago(cod_emp, fec_ing, cod_cont, fec_cte, fec_cte_pago, idl_num,
						tip_liq, cod_def_concep, cod_con, mod_liq, val_liq, can_liq,
						fec_ini_acu, fec_fin_acu, ind_baseXunidad, val_base, base_dia,
						dia_int,
						b01_liq, b02_liq, b03_liq, b04_liq, b05_liq, b06_liq, b07_liq,
						b08_liq, b09_liq, b10_liq, b11_liq, b12_liq, b13_liq, b14_liq,
						b15_liq, b16_liq, b17_liq, b18_liq, b19_liq, b20_liq, val_net,
						ind_cie, dias_vacas_disf_acum)
		  SELECT	A.cod_emp, E.fec_ing, A.cod_cont, A.fec_cte, A.fec_cte, 0, A.tip_liq, A.cod_def_concep, A.cod_con, 
				A.mod_liq, ISNULL(A.val_liq,0), ISNULL(A.can_liq,0), A.fec_cte, A.fec_cte, 0, val_base, 0,
				0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
		  FROM	rhh_UsuDef_DetPagImp A
		  INNER	JOIN rhh_emplea E ON A.cod_emp = E.cod_emp
	

	--Mensaje de proceso terminado.
	SELECT 'Se han cargado ' + CONVERT(VARCHAR(10), COUNT(*)) +
		  ' registros a la tabla de historicos.'
	FROM	  rhh_UsuDef_DetPagImp as i
	INNER  JOIN Rhh_UsuDef_DetPago h ON i.cod_emp = h.cod_emp
			AND i.cod_con = h.cod_con
			AND i.cod_def_concep = h.Cod_def_concep
			AND i.tip_liq = h.tip_liq
			AND i.fec_cte = h.fec_cte

	
	DELETE FROM rhh_UsuDef_DetPagImp
END

```
