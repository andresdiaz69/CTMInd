# Stored Procedure: sp_rhh_DocumHorex_Fp

## Usa los objetos:
- [[fn_rhh_CargoFch]]
- [[nom_cabdoc]]
- [[nom_cuedoc]]
- [[rhh_carano]]
- [[Rhh_Compensatorio_fp]]

```sql
-- =============================================
-- Author:		Ricardo Santamaría Vanegas
-- Create date: Dic 18 de 2020
-- Description:	Analiza los topes de las horas extras para determinar los compensatorios y crear el documento 807 asociado
-- =============================================
CREATE PROCEDURE [dbo].[sp_rhh_DocumHorex_Fp]
	@fFecApl DATETIME,
	@ano_doc CHAR(4),
	@per_doc CHAR(2),
	@sub_tip CHAR(5),
	@num_doc CHAR(14),
	@fec_doc DATETIME,
	@cTipOpe CHAR(1)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @mes TINYINT;
    DECLARE @ano SMALLINT;
    DECLARE @cCodCar VARCHAR(8);
    DECLARE @nMaxHorExt INT;

    DECLARE @cCodConHexDomNoc CHAR(6) = '001064';
    DECLARE @cCodConHexDom CHAR(6) = '001063';
    DECLARE @cCodConHexNoc CHAR(6) = '001062';
    DECLARE @cCodConHexDiu CHAR(6) = '001061';

    DECLARE @cCodEmp CHAR(12);

    DECLARE @nHorExtDomNoc MONEY;
    DECLARE @nHorExtDom MONEY;
    DECLARE @nHorExtNoc MONEY;
    DECLARE @nHorExtDiu MONEY;

    DECLARE @nTotHorExt MONEY;

    DECLARE @nCantHorExtDoc MONEY;
    DECLARE @nCantHorExtDocDisp MONEY;
    DECLARE @nCanHorExtCompens MONEY;
    DECLARE @sub_tip_810 CHAR(5) = '810';

    DECLARE @cod_con CHAR(6);
    DECLARE @can_doc MONEY;
    DECLARE @fec_cau DATETIME;
    DECLARE @tip_liq CHAR(2);
    DECLARE @nOrden TINYINT;
    DECLARE @nRegDocSig INT;

    DECLARE @idResol INT;
    DECLARE @idNovedad BIGINT;

    SELECT @idResol = Id_Resol,
		 @idNovedad = Id_Novedad,
		 @tip_liq = tip_liq
    FROM nom_cabdoc
    WHERE ano_doc = @ano_doc AND per_doc = @per_doc AND sub_tip = @sub_tip AND num_doc = @num_doc;

    IF @cTipOpe = 'D'
    BEGIN
	   DELETE FROM nom_cuedoc
	   WHERE ano_doc = @ano_doc
		    AND per_doc = @per_doc
		    AND sub_tip = @sub_tip_810
		    AND num_doc = @num_doc;
	   DELETE FROM nom_cabdoc
	   WHERE ano_doc = @ano_doc
		    AND per_doc = @per_doc
		    AND sub_tip = @sub_tip_810
		    AND num_doc = @num_doc;
	   DELETE FROM Rhh_Compensatorio_fp
	   WHERE cod_emp = @cCodEmp AND tip_mov = 1 AND Id_Novedad = @idNovedad;

	   RETURN;
    END;

    CREATE TABLE #t_Rhh_CuedocHex(
	    num_reg INT IDENTITY(1, 1),
	    cod_emp CHAR(12) COLLATE database_default,
	    cod_con CHAR(6) COLLATE database_default,
	    can_doc MONEY,
	    fec_cau DATETIME
						   );

    CREATE TABLE #t_Rhh_Compensa(
	    cod_emp CHAR(12) COLLATE database_default,
	    ano     SMALLINT,
	    mes     TINYINT,
	    can_hor MONEY
						  );

    /*Se borra el cuerpo del documento tipo 810 con el mismo num_doc del tipo de documento 809*/
    IF EXISTS( SELECT *
			FROM nom_cuedoc
			WHERE ano_doc = @ano_doc
				 AND per_doc = @per_doc
				 AND sub_tip = @sub_tip_810
				 AND num_doc = @num_doc )
    BEGIN
	   DELETE FROM nom_cuedoc
	   WHERE ano_doc = @ano_doc
		    AND per_doc = @per_doc
		    AND sub_tip = @sub_tip_810
		    AND num_doc = @num_doc;
    END;

    /*Se borran los compensatorios asociados a la novedad del empleado por si no se dan y ya los había*/
    IF EXISTS( SELECT *
			FROM Rhh_Compensatorio_fp
			WHERE tip_mov = 1 AND Id_Novedad = @idNovedad )
    BEGIN
	   DELETE FROM Rhh_Compensatorio_fp
	   WHERE tip_mov = 1 AND Id_Novedad = @idNovedad;
    END;

    DECLARE curEmpleados CURSOR
    FOR SELECT DISTINCT
			cod_emp
	   FROM nom_cuedoc
	   WHERE ano_doc = @ano_doc AND per_doc = @per_doc AND sub_tip = @sub_tip AND num_doc = @num_doc;

    OPEN curEmpleados;

    FETCH NEXT FROM curEmpleados INTO @cCodEmp;

    WHILE @@FETCH_STATUS <> -1
    BEGIN
	   SET @cCodCar = dbo.fn_rhh_CargoFch( @cCodEmp, @fFecApl, 0 );

	   /*Se obtiene el tope ( @nMaxHorExt ) de horas extras del cargo activo a la fecha de aplicación del documento*/
	   WITH RetroCarAno
		   AS (SELECT cod_car,
				    CASE
					   WHEN fch_retro IS NULL THEN fec_apl
					   ELSE fch_retro
				    END AS fec_apl,
				    HorEx_Max
			  FROM rhh_carano
			  WHERE cod_car = @cCodCar AND fec_apl <= @fFecApl)
		   SELECT @nMaxHorExt = C.HorEx_Max
		   FROM RetroCarAno AS C
		   WHERE fec_apl = ( SELECT MAX(fec_apl)
						 FROM RetroCarAno );

	   DECLARE curFecsCter CURSOR
	   FOR SELECT DISTINCT
			    YEAR(fec_cau) AS ano,
			    MONTH(fec_cau) AS mes
		  FROM nom_cuedoc
		  WHERE cod_emp = @cCodEmp AND sub_tip = @sub_tip AND fec_apl = @fFecApl;

	   OPEN curFecsCter;

	   FETCH NEXT FROM curFecsCter INTO @ano,
								 @mes;

	   WHILE @@FETCH_STATUS <> -1
	   BEGIN
		  SET @nCanHorExtCompens = 0;
		  SET @nTotHorExt = 0;

		  /*Sumar de cada mes el total de horas sin incluir las del documento en curso*/
		  /*Extras Dominicales Nocturnas Docs Dif al actual*/
		  SELECT @nHorExtDomNoc = ISNULL(SUM(can_doc), 0)
		  FROM nom_cuedoc
		  WHERE cod_emp = @cCodEmp
			   AND cod_con = @cCodConHexDomNoc
			   AND YEAR(fec_cau) = @ano
			   AND MONTH(fec_cau) = @mes
			   AND sub_tip = @sub_tip
			   AND ano_doc + per_doc + sub_tip + num_doc <> @ano_doc + @per_doc + @sub_tip + @num_doc;

		  /*Extras Dominicales Docs Dif al actual*/
		  SELECT @nHorExtDom = ISNULL(SUM(can_doc), 0)
		  FROM nom_cuedoc
		  WHERE cod_emp = @cCodEmp
			   AND cod_con = @cCodConHexDom
			   AND YEAR(fec_cau) = @ano
			   AND MONTH(fec_cau) = @mes
			   AND sub_tip = @sub_tip
			   AND ano_doc + per_doc + sub_tip + num_doc <> @ano_doc + @per_doc + @sub_tip + @num_doc;

		  /*Extras Nocturnas Docs Dif al actual*/
		  SELECT @nHorExtNoc = ISNULL(SUM(can_doc), 0)
		  FROM nom_cuedoc
		  WHERE cod_emp = @cCodEmp
			   AND cod_con = @cCodConHexNoc
			   AND YEAR(fec_cau) = @ano
			   AND MONTH(fec_cau) = @mes
			   AND sub_tip = @sub_tip
			   AND ano_doc + per_doc + sub_tip + num_doc <> @ano_doc + @per_doc + @sub_tip + @num_doc;

		  /*Extras Diurnas Docs Dif al actual*/
		  SELECT @nHorExtDiu = ISNULL(SUM(can_doc), 0)
		  FROM nom_cuedoc
		  WHERE cod_emp = @cCodEmp
			   AND cod_con = @cCodConHexDiu
			   AND YEAR(fec_cau) = @ano
			   AND MONTH(fec_cau) = @mes
			   AND sub_tip = @sub_tip
			   AND ano_doc + per_doc + sub_tip + num_doc <> @ano_doc + @per_doc + @sub_tip + @num_doc;

		  SET @nTotHorExt = @nHorExtDomNoc + @nHorExtDom + @nHorExtNoc + @nHorExtDiu;

		  SET @nCantHorExtDocDisp = @nMaxHorExt - @nTotHorExt;

		  DECLARE cNovHExtras CURSOR
		  FOR SELECT cod_con,
				   can_doc,
				   fec_cau,
				   CASE cod_con
					  WHEN @cCodConHexDomNoc THEN 1
					  WHEN @cCodConHexDom THEN 2
					  WHEN @cCodConHexNoc THEN 3
					  WHEN @cCodConHexDiu THEN 4
				   END AS orden
			 FROM nom_cuedoc
			 WHERE ano_doc = @ano_doc
				  AND per_doc = @per_doc
				  AND sub_tip = @sub_tip
				  AND num_doc = @num_doc
				  AND cod_emp = @cCodEmp
				  AND YEAR(fec_cau) = @ano
				  AND MONTH(fec_cau) = @mes
			 ORDER BY orden ASC;

		  OPEN cNovHExtras;
		  FETCH NEXT FROM cNovHExtras INTO @cod_con,
									@can_doc,
									@fec_cau,
									@nOrden;

		  WHILE @@FETCH_STATUS <> -1
		  BEGIN
			 SET @nCantHorExtDoc = 0;

			 IF @nCantHorExtDocDisp > 0
			 BEGIN
				IF @nCantHorExtDocDisp - @can_doc >= 0
				BEGIN
				    SET @nCantHorExtDoc = @can_doc;
				END;
				    ELSE
				BEGIN
				    SET @nCantHorExtDoc = @nCantHorExtDocDisp;
				    SET @nCanHorExtCompens = @can_doc - @nCantHorExtDoc;
				END;
				SET @nCantHorExtDocDisp = @nCantHorExtDocDisp - @nCantHorExtDoc;
			 END;
				ELSE
			 BEGIN
				SET @nCanHorExtCompens = @nCanHorExtCompens + @can_doc;
			 END;

			 /*Se carga en la tabla temporal la novedad de documento de horas extras ( @nCantHorExtDoc ) que si se alcanza a pagar*/
			 INSERT INTO #t_Rhh_CuedocHex( cod_emp,
									 cod_con,
									 can_doc,
									 fec_cau
								    )
			 VALUES
				   (
				   @cCodEmp, @cod_con, @nCantHorExtDoc, @fec_cau );

			 FETCH NEXT FROM cNovHExtras INTO @cod_con,
									    @can_doc,
									    @fec_cau,
									    @nOrden;
		  END;
		  CLOSE cNovHExtras;
		  DEALLOCATE cNovHExtras;

		  /*Se carga en la tabla temporal de compensatorios las horas ( @nCanHorExtCompens ) que sobran por mes*/
		  IF @nCanHorExtCompens > 0
		  BEGIN
			 INSERT INTO #t_Rhh_Compensa
			 VALUES
				   (
				   @cCodEmp, @ano, @mes, @nCanHorExtCompens );
		  END;

		  FETCH NEXT FROM curFecsCter INTO @ano,
									@mes;
	   END;

	   CLOSE curFecsCter;
	   DEALLOCATE curFecsCter;

	   FETCH NEXT FROM curEmpleados INTO @cCodEmp;
    END;

    CLOSE curEmpleados;
    DEALLOCATE curEmpleados;

    /*Se inserta el documento tipo 810 con el mismo num_doc del tipo de documento 809*/
    IF NOT EXISTS( SELECT *
			    FROM nom_cabdoc
			    WHERE ano_doc = @ano_doc
					AND per_doc = @per_doc
					AND sub_tip = @sub_tip_810
					AND num_doc = @num_doc )
    BEGIN
	   INSERT INTO nom_cabdoc( ano_doc,
						  per_doc,
						  tip_doc,
						  sub_tip,
						  num_doc,
						  fec_doc,
						  tip_liq,
						  des_doc,
						  Id_Resol,
						  fec_apl,
						  Id_Novedad,
						  cod_emp,
						  cod_con,
						  cambio,
						  Opc_Trg
						)
	   VALUES
			(
			@ano_doc, @per_doc, @sub_tip_810, @sub_tip_810, @num_doc, @fec_doc, @tip_liq,
			'Documento generado automáticamente a partir del tipo 809 del mismo número', @idResol, @fFecApl, @idNovedad, '0', '0', '0', 1 );
    END;
	   ELSE
    BEGIN
	   UPDATE nom_cabdoc
		SET tip_liq = @tip_liq,
		    fec_apl = @fFecApl,
		    Id_Resol = @idResol
	   WHERE ano_doc = @ano_doc
		    AND per_doc = @per_doc
		    AND sub_tip = @sub_tip_810
		    AND num_doc = @num_doc;
    END;

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
					   fec_doc,
					   fec_apl,
					   fec_cau
					 )
    SELECT @ano_doc,
		 @per_doc,
		 @sub_tip_810,
		 @sub_tip_810,
		 @num_doc,
		 num_reg,
		 @tip_liq,
		 cod_con,
		 cod_emp,
		 can_doc,
		 @fec_doc,
		 @fFecApl,
		 fec_cau
    FROM #t_Rhh_CuedocHex
    WHERE can_doc <> 0;

    /*Se cargan los compensatorios resultantes a la tabla rhh_compensatorio*/
    INSERT INTO Rhh_Compensatorio_fp( cod_emp,
							   fec_nov,
							   tip_mov,
							   Id_Novedad,
							   can_hras,
							   tip_liq
							 )
    SELECT cod_emp,
		 @fFecApl,
		 1,
		 @idNovedad,
		 SUM(can_hor),
		 @tip_liq
    FROM #t_Rhh_Compensa
    GROUP BY cod_emp;

END;
```
