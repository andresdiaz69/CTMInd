# Stored Procedure: sp_rhh_PrimaEspecial1_fp

## Usa los objetos:
- [[rhh_emplea]]
- [[rhh_hislab]]
- [[rhh_pertlq]]
- [[Sp_rhh_LiqCte]]

```sql
/* 
20201214 LSR @iInd_Procesa = 0 no escribe el concepto en el result, pero si se tiene en cuenta para la prestacion que llame la formula
*/
-- sp_rhh_PrimaEspecial1_fp w.cod_emp;w.cod_cont;a_concliq(i,m_cod_con);fFec_corte;a_concliq(i,m_tip_liq),0
-- EXEC sp_rhh_PrimaEspecial1_fp @cCod_emp,@nCodCont,'001485',@fFec_cte,@cTip_liq,1, @nPriEspecial OUTPUT;
CREATE PROCEDURE [dbo].[sp_rhh_PrimaEspecial1_fp]
	@cCod_emp     CHAR(12),
	@cod_cont     INT,
	@cConcepto    CHAR(6),
	@fFec_cte     DATETIME,
	@cTip_liq     CHAR(2),
	@iInd_Procesa SMALLINT = 0, /* 0 procesa la novedad y 1 no procesa */
	@nVal_nov     FLOAT    = 0 OUTPUT
AS
BEGIN
    DECLARE @ValPrimEsp MONEY = 0;
    DECLARE @fec_ing DATETIME;
    DECLARE @cCargo CHAR(8);
    DECLARE @fFecIni DATETIME;
    DECLARE @ValPrim MONEY = 0;
    DECLARE @DiasVincMes MONEY = 0;
    DECLARE @DiasVinCargo MONEY = 0;
    DECLARE @cCodTql CHAR(2);
    DECLARE @fFecIPertlq DATETIME;
    DECLARE @fFecFPertlq DATETIME;
    DECLARE @cContHislabMin INT;
    DECLARE @cContHislabMax INT;

    SET @ValPrimEsp = 0;
    -- Verificamos Fecha ingreso  y periodicidad de liquidacion.
    SELECT @fec_ing = E.fec_ing,
		 @ccodTql = E.cod_tlq
    FROM rhh_emplea AS E
    WHERE cod_emp = @cCod_emp;

    SELECT @fFecIPertlq = fec_ini,
		 @fFecFPertlq = fec_fin
    FROM rhh_pertlq
    WHERE fec_fin = @fFec_cte AND cod_tlq = @cCodTql;

    SELECT ROW_NUMBER() OVER(
		 ORDER BY H.cod_emp,
				H.cod_car,
				H.fec_ini) AS Consecutivo,
		 H.cod_car,
		 C.pri_es1,
		 H.fec_ini,
		 H.fec_fin,
		 TH.dias
    INTO #T_CARGOS
    FROM rhh_hislab AS H
    INNER JOIN #t_rhh_hislab AS TH ON H.cod_car = TH.cod_car
    INNER JOIN #t_rhh_carano AS C ON H.cod_car = C.cod_car
						    AND num_ano = YEAR(@fFec_cte)
						    AND C.fec_apl = ( SELECT MAX(fec_apl)
										  FROM #t_rhh_carano
										  WHERE cod_car = TH.COD_CAR )
    WHERE Cod_emp = @cCod_emp
		AND H.fec_ini <= @fFecFPertlq
		AND (H.fec_fin IS NULL OR H.fec_fin >= @fFecIPertlq
		    );

    DELETE FROM #T_CARGOS
    WHERE pri_es1 <= 0;

    SELECT @cContHislabMin = MIN(consecutivo),
		 @cContHislabMAX = MAX(consecutivo)
    FROM #T_CARGOS;

    WHILE @cContHislabMAX >= @cContHislabMin
    BEGIN
	   SELECT @ValPrimEsp = pri_es1
	   FROM #T_CARGOS AS C
	   WHERE C.Consecutivo = @cContHislabMin;

	   SELECT @DiasVinCargo = DIAS
	   FROM #T_CARGOS
	   WHERE Consecutivo = @cContHislabMin;

	   IF @DiasVinCargo > ( SELECT ISNULL(SUM(M.can_liq), 0)
					    FROM #t_resultado AS M
					    WHERE M.Cod_con = '000020' )
	   BEGIN
		  SELECT @DiasVinCargo = ISNULL(SUM(M.can_liq), 0)
		  FROM #t_resultado AS M
		  WHERE M.Cod_con = '000020';
	   END;

	   SELECT @DiasVincMes = @DiasVincMes + @DiasVinCargo;
	   SELECT @ValPrim = @ValPrim + (ROUND((@ValPrimEsp) / 30 * @DiasVinCargo, 0));

	   SET @cContHislabMin = @cContHislabMin + 1;
    END;
    --select '@ValPrim'=@ValPrim   , '@iInd_Procesa'=@iInd_Procesa
    IF @ValPrim > 0
    BEGIN
	   IF @iInd_Procesa = 0
	   BEGIN
		  IF OBJECT_ID('TempDb..#T_VarPub') IS NULL
		  BEGIN
			 SELECT [Cantidad] = @DiasVincMes,
				   [Resultado] = @ValPrim;
		  END;
			 ELSE
		  BEGIN
			 EXEC dbo.Sp_rhh_LiqCte @cCodCon = @cConcepto,
							    @Cantidad = @DiasVincMes,
							    @Resultado = @ValPrim;
		  END;
	   END;
		  ELSE
	   BEGIN
		  IF @cTip_liq = '08'
		  BEGIN
			 SELECT @nVal_nov = ISNULL(@ValPrim, 0);
		  END;
			 ELSE
		  BEGIN
			 SELECT @nVal_nov = ISNULL(@ValPrimEsp, 0);
		  END;
	   END;
    END;
END;

```
