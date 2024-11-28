# Stored Procedure: sp_rhh_novfi06_fp

## Usa los objetos:
- [[fn_gen_decapl]]
- [[fn_gen_DP]]
- [[fn_rhh_ContratoFch]]
- [[fn_rhh_Dias_de_Ausencia]]
- [[fn_rhh_DiasVac_PP]]
- [[fn_rhh_DiaVacRango]]
- [[fn_rhh_Hislab_NumSec]]
- [[fn_rhh_SueldoFch]]
- [[Rhh_AsocCptosDet]]
- [[rhh_emplea]]
- [[rhh_hislab]]
- [[RHH_NOVFIJA]]
- [[rhh_pertlq]]
- [[Rhh_TbClasAus]]
- [[rhh_TbTipAus]]
- [[rhh_TipConProySS]]
- [[rhh_tipoliq]]
- [[sp_rhh_carano00]]
- [[Sp_rhh_LiqCte]]

```sql
-- 20220509, AJMDLO, Ajuste SRS2022-0441
CREATE PROCEDURE [dbo].[sp_rhh_novfi06_fp]
	@cCod_emp    CHAR(12),
	@cCod_con    CHAR(6),
	@fFec_ini    DATETIME,
	@fFec_fin    DATETIME,
	@fFec_CorteI DATETIME,
	@SalBas      MONEY,
	@valor1      MONEY, /* VALOR 1 Y 2 son para adicionar otros conceptos que se requieran */
	@valor2      MONEY,
	@Ind         SMALLINT,
	@nCodCont    INT, /*Codigo Contrato*/
	@cCod_con1   CHAR(6), /*concepto a liquidar */
	@cCod_con2   CHAR(6), /*concepto a sumar */
	@nVal_nov    FLOAT    = 0 OUTPUT
AS
BEGIN
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
    DECLARE @nDias SMALLINT;
    DECLARE @nDias_PerLiq SMALLINT;
    DECLARE @nDiaVac SMALLINT; -- Número de Días de Vacaciones
    DECLARE @nDiaInc SMALLINT;
    DECLARE @nDiaLicRem SMALLINT;
    DECLARE @ind_vac TINYINT;
    DECLARE @ind_inc TINYINT;
    DECLARE @ind_licRem TINYINT;
    DECLARE @ind_ProyAca TINYINT;
    DECLARE @ind_prop TINYINT;
    DECLARE @ind_vacPag TINYINT;
    DECLARE @nDiaVacPag INT;
    DECLARE @nDiaVacAntic INT;
    DECLARE @nIndDesc31 TINYINT;
    DECLARE @fec_iniper DATETIME;
    DECLARE @nHab_dis DECIMAL(8, 2);
    DECLARE @nNhaDis DECIMAL(8, 2);
    DECLARE @nfFecsal DATETIME;
    DECLARE @nfFecent DATETIME;
    DECLARE @nMes CHAR(2);
    DECLARE @indPdias TINYINT;
    DECLARE @ind_m31 TINYINT;
    DECLARE @cod_tlq CHAR(2);		/*2013-1008*/
    DECLARE @tip_liq CHAR(2);		/*2013-1008*/
    DECLARE @tipliq CHAR(2);
    DECLARE @nApl_con INT;
    DECLARE @nApl_ConNov INT;
    DECLARE @modliq CHAR(2);
    DECLARE @IndUltPer BIT;
    DECLARE @nAno CHAR(4);
    DECLARE @nPer CHAR(2);
    DECLARE @fFecIniTlq DATETIME;
    /*2014-0852*/
    DECLARE @nDiaLicRemH SMALLINT;
    DECLARE @nDiaLicNORemH SMALLINT;
    DECLARE @nDiaincH SMALLINT;
    DECLARE @nDiaVacH SMALLINT;
    DECLARE @fec_ret DATETIME;
    DECLARE @fFec_Corte DATETIME;
    DECLARE @sub_per CHAR(2);
    DECLARE @IndPrimerPer BIT;
    DECLARE @MINCON SMALLINT;
    DECLARE @MAXCON SMALLINT;
    DECLARE @nDiaProy SMALLINT;
    DECLARE @Est_lab CHAR(2);
    DECLARE @tip_con CHAR(2);
    DECLARE @Num_Dec SMALLINT;
    DECLARE @Dmes_VAC INT;
    DECLARE @nD31_Vac INT;
    DECLARE @nD31_AUS INT;
    DECLARE @fFec_nov DATETIME;
    DECLARE @fFec_has DATETIME;
    DECLARE @cClaaus CHAR(2);
    DECLARE @fFecInicio DATETIME;
    DECLARE @fFecFin DATETIME;
    DECLARE @nDiasVac SMALLINT;
    DECLARE @nDiasInc SMALLINT;
    DECLARE @nDiasLR SMALLINT;
    DECLARE @nDiasLNR SMALLINT;
    DECLARE @cod_tlq_Real CHAR(2);

    CREATE TABLE #T_TotNovfija(
	    VALOR MONEY
						);
    DECLARE @NOVFIJA TABLE(
	    REG_CON      INT,
	    cod_emp      CHAR(12),
	    cod_con      CHAR(6),
	    fec_nov      DATETIME,
	    fec_has      DATETIME,
	    apl_con      SMALLINT,
	    val_nov      MONEY,
	    ind_pro      BIT,
	    ind_act      BIT,
	    cod_cont     BIT,
	    ind_vac      BIT,
	    ind_inc      BIT,
	    ind_licRem   BIT,
	    ind_vacPag   BIT,
	    ind_Cto_FNov BIT,
	    Dias         SMALLINT,
	    Dias_PerLiq  SMALLINT,
	    ind_ProyAca  BIT,
	    sal_bas      MONEY -- SRS2022-0441
					 );

     /*SNR2023-0041*/
    DECLARE @Novvacpbl TABLE
    (
	    RegConV   INT,
	    cod_emp   CHAR(12) COLLATE DATABASE_DEFAULT,
	    fec_sal   DATETIME,
	    tip_nov   CHAR(2) COLLATE DATABASE_DEFAULT,
	    dias_nov  NUMERIC(9, 2), /*Dias de la novedad*/
	    fecini    DATETIME,
	    fecfin    DATETIME
    );

    DECLARE @Cont INT = 0;
    DECLARE @ContM INT = 0;
    DECLARE @DiasSV INT = 0;
    DECLARE @FecINV DATETIME,
		  @FecFNV DATETIME;
    DECLARE @cCargo VARCHAR(8);

    SET NOCOUNT ON;

    SET @IndPrimerPer = 0;
    SET @IndUltPer = 0;
    SET @fFec_Corte = @fFec_CorteI;
    SET @nAno = CONVERT(CHAR(4), YEAR(@fFec_Corte));
    SET @nPer = RIGHT('00' + RTRIM(CONVERT(CHAR(2), MONTH(@fFec_Corte))), 2);

    SELECT @Num_Dec = ISNULL(dbo.fn_gen_decapl( 'NOM', '00', 1 ), 2);

    IF EXISTS( SELECT *
			FROM TEMPDB.dbo.sysobjects
			WHERE id = OBJECT_ID(N'[TEMPDB].[dbo].[#T_rhh_emplea ]') )
    BEGIN
	   SELECT @fec_ret = fec_egr,
			@indPdias = ISNULL(ind_pdias, 0),
			@ind_m31 = ISNULL(ind_m31, 0),
			@modliq = mod_liq,
			@cod_tlq = cod_tlq,
			@Est_lab = est_lab,
			@tip_con = Tip_con
	   FROM #T_rhh_emplea
	   WHERE cod_emp = @cCod_emp;

	   /***Actualiza indicador de ultimo periodo***/
	   IF( SELECT MAX(fec_fin)
		  FROM #T_Rhh_PerTLq
		  WHERE cod_tlq = @cod_tlq AND ano_tlq = @nAno AND per_tlq = @nPer ) = @fFec_Corte
	   BEGIN
		  SET @IndUltPer = 1;
	   END;

	   SELECT @cod_tlq_Real = cod_tlq
	   FROM rhh_emplea
	   WHERE cod_emp = @cCod_emp;

	   /*** si la fecha de retiro es inferior a la del corte se asigna esta fecha a la fecha de corte***/
	   IF @fec_ret < @fFec_Corte
	   BEGIN
		  SET @fFec_Corte = @fec_ret;
	   END;
    END;

    SELECT @tip_liq = tip_liq
    FROM #T_TiposLiqProc;

    SELECT @fFecIniTlq = MIN(fec_ini)
    FROM #T_Rhh_PerTLq
    WHERE cod_tlq = @cod_tlq AND ano_tlq = @nAno AND per_tlq = @nPer;

    SELECT @sub_per = sub_per
    FROM #T_Rhh_PerTLq
    WHERE cod_tlq = @cod_tlq AND fec_fin = @fFec_Corte;

    /***Actualiza indicador de primer periodo***/
    IF @sub_per = '1'
    BEGIN
	   SET @IndPrimerPer = 1;
    END;

    /***Selecciona las novedades fijas a liquidar en el periodo ***/
    INSERT INTO @NOVFIJA
    SELECT ROW_NUMBER() OVER(PARTITION BY COD_CON,
								  cod_emp
		 ORDER BY cod_emp,
				COD_CON),
		 cod_emp,
		 cod_con,
		 fec_nov,
		 fec_has,
		 apl_con,
		 val_nov,
		 ind_pro,
		 ind_act,
		 cod_cont,
		 ind_vac,
		 ind_inc,
		 ind_licRem,
		 ind_vacPag,
		 ind_Cto_FNov,
		 0,
		 0,
		 ind_ProyAca,
		 0
    FROM RHH_NOVFIJA
    WHERE cod_emp = @cCod_emp
		AND cod_con = @cCod_con
		AND (@fFec_Corte BETWEEN fec_nov AND fec_has
			OR (@fFec_Corte >= fec_nov AND fec_has IS NULL
			   )
			OR (fec_has >= @fFecIniTlq AND fec_has <= @fFec_Corte
			   )
		    );

    /***Si no es el unico periodo de liquidación durante el mes,ni es el último periodo , elimina las novedades que se liquidan en el último periodo de liquidación***/
    IF @IndPrimerPer = '1' AND @IndUltPer <> '1' AND @tip_liq <> '04'
    BEGIN
	   DELETE FROM @NOVFIJA
	   WHERE apl_con NOT IN( '1', '3' );

    END;

    /***Si es el último periodo , pero no es el único, elimina las novedades que se liquiden el primer periodo***/
    IF @IndUltPer = '1' AND @IndPrimerPer <> '1'
    BEGIN
	   DELETE FROM @NOVFIJA
	   WHERE apl_con NOT IN( '2', '3' );
    END;

    SELECT @MinCon = MIN(REG_CON),
		 @MaxCon = MAX(REG_CON)
    FROM @NOVFIJA
    WHERE cod_emp = @cCod_emp AND cod_con = @cCod_con;

    /*** Se recorren las novedades fijas para determinar su tratamiento***/
    WHILE @MinCon <= @MaxCon
    BEGIN
	   SELECT @nIndDesc31 = 0;
	   SELECT @nMes = MONTH(@fFec_Corte);

	   /*** Se obtienen los indicadores por novedad***/
	   SELECT @ind_vac = ind_vac,
			@ind_inc = ind_inc,
			@ind_licRem = ind_licRem,
			@ind_prop = ind_pro,
			@ind_vacPag = ind_vacPag,
			@nApl_ConNov = apl_con,
			@ind_ProyAca = ind_ProyAca,
			@fFec_nov = fec_nov,
			@fFec_has = fec_has
	   FROM @novfija
	   WHERE cod_emp = @cCod_emp
		    AND cod_con = @cCod_con
		    AND @nCodCont = CASE ind_Cto_FNov
						    WHEN 1 THEN dbo.fn_rhh_ContratoFch( @cCod_emp, fec_nov, 1 )
						    ELSE dbo.fn_rhh_ContratoFch( @cCod_emp, @fFec_Corte, 0 )
						END
	   AND REG_CON = @MINCON;

	   SELECT @ind_vac = ISNULL(@ind_vac, 0),
			@ind_inc = ISNULL(@ind_inc, 0),
			@ind_licRem = ISNULL(@ind_licRem, 0),
			@ind_ProyAca = ISNULL(@ind_ProyAca, 0);

	   /*** Se revisa la aplicación del concepto***/
	   SELECT @nApl_con = apl_con
	   FROM #T_Rhh_ConcepLiqEmp AS V
	   WHERE cod_con = @cCod_con;

	   /*** Si la novedad es proporcional***/
	   IF @ind_prop = 1
	   BEGIN
		  /*** Se calculan los dias trabajados del periodo de liquidación***/
		  SET @nDiasVac = 0;
		  SET @nDiasInc = 0;
		  SET @nDiasLR = 0;
		  SET @nDiasLNR = 0;

		  SELECT @nD31_AUS = D31_AUS
		  FROM #t_rhh_hislab;

		  IF @nApl_ConNov = 3
		  BEGIN
			 SELECT @fFecIniTlq = @fFec_ini;
		  END;

		  SET @fFecInicio = @fFecIniTlq;
		  SET @fFecFin = @fFec_Corte;

		  IF @fFec_nov > @fFecIniTlq
		  BEGIN
			 SET @fFecInicio = @fFec_nov;
		  END;

		  IF @fFec_has < @fFec_Corte
		  BEGIN
			 SET @fFecFin = @fFec_has;
		  END;

		  --SET @nDias = DATEDIFF(DAY, @fFecInicio, @fFecFin) + 1 - @nD31_Trab;
		  SET @nDias = dbo.fn_gen_DP( @fFecInicio, @fFecFin );

		  SET @nDiasLNR = dbo.fn_rhh_Dias_de_Ausencia( @cCod_emp, @fFecInicio, @fFecFin, 2 );

		  IF @nD31_AUS = 1 AND @indPdias = 0
		  BEGIN
			 SET @nDias = @nDias + @nD31_AUS;
		  END;

		  SET @nDias = @nDias - @nDiasLNR;

		  SET @nDiasVac = dbo.fn_rhh_DiaVacRango( @cCod_emp, @fFecInicio, @fFecFin, '01' );
		  SET @nDiasInc = dbo.fn_rhh_Dias_de_Ausencia( @cCod_emp, @fFecInicio, @fFecFin, 1 );
		  SET @nDiasLR = dbo.fn_rhh_Dias_de_Ausencia( @cCod_emp, @fFecInicio, @fFecFin, 4 );

		  /************AJMDLO, 20220808*****************/
		  SELECT @nD31_Vac = d31_vac
		  FROM #t_Rhh_hislab;

		  IF @ind_vac = 0
		  BEGIN
			IF DATEPART(DAY, @fFecFin) = 31 AND @nDiasVac > 0 AND @ind_m31 = 1
			 BEGIN
				SET @nDias = @nDias + dbo.fn_rhh_DiaVacRango( @cCod_emp, @fFecFin, @fFecFin, '01' );
			 END;
			 SET @nDias = @nDias - @nDiasVac;

			 /*SNR2023-0041, Validar el grupo de conceptos, solo aplica a los conceptos relacionados en
			   el grupo 3*/
				IF @cCod_con IN (SELECT cod_con FROM Rhh_AsocCptosDet WHERE Ide_AsocIntCpto = 3)
				BEGIN
						
				INSERT INTO @Novvacpbl
				SELECT ROW_NUMBER() OVER(PARTITION BY cod_emp
					  ORDER BY cod_emp), *
				FROM DBO.fn_rhh_DiasVac_PP (@cCod_emp,@fFec_ini,@fFec_CorteI);

				--SELECT * FROM @Novvacpbl;

				SELECT @Cont = MIN(RegConV),
					  @ContM = MAX(RegConV)
				FROM @Novvacpbl;

				SET @DiasSV = 0;

				WHILE @Cont <= @ContM
				BEGIN

				    SELECT @FecINV = CASE 
								    WHEN fecini > @fFec_ini THEN fecini
								    ELSE @fFec_ini
								 END,
						 @FecFNV = CASE
								    WHEN fecfin > @fFec_Corte THEN @fFec_Corte
								    ELSE fecfin
								 END
				    FROM @Novvacpbl
				    WHERE RegConV = @Cont;

				    /*Validar día 31 con IF DATEPART(DAY, @fFecFin) = 31, no importa si se paga o no
					 ya que para el pago de las primas son meses comerciales*/
				    
				    --SELECT @FecINV, @FecFNV;

				    SELECT @DiasSV = @DiasSV + COALESCE(DATEDIFF(DD,@FecINV,@FecFNV+1),0)
				    FROM @Novvacpbl
				    WHERE tip_nov IN ('02','08') AND
					     RegConV = @Cont;

				    SELECT @DiasSV = @DiasSV + COALESCE(DATEDIFF(DD,@FecINV,@FecFNV+1)*-1,0)
				    FROM @Novvacpbl
				    WHERE tip_nov = '03' AND
					     RegConV = @Cont;

				    SELECT @DiasSV = @DiasSV - CASE  
											 WHEN DATEPART(DAY, @FecFNV) = 31
												THEN CASE 
													   WHEN @DiasSV > 0 THEN  1
													   ELSE -1
												    END
											 ELSE 0
										  END
				    FROM @Novvacpbl
				    WHERE tip_nov IN ('02','08','03') AND
						RegConV = @Cont;

				    SELECT @Cont = @Cont + 1;
				END;

				--SELECT @DiasSV;
				SET @DiasSV = COALESCE(@DiasSV,0);
 
				SET @nDias = @nDias + @DiasSV;
				IF @nDias > 30
				BEGIN
				    SET @nDias = 30
				END;
			 END;
		  END;
		  --select '@nDiasVac'=@nDiasVac, '@nDias'=@nDias, '@@nD31_Vac'=@nD31_Vac
		  IF @ind_inc = 0
		  BEGIN
			 SET @nDias = @nDias - @nDiasInc;
		  END;

		  IF @ind_licRem = 0
		  BEGIN
			 SET @nDias = @nDias - @nDiasLR;
		  END;
	   END;
		  ELSE
	   BEGIN
		  /*** se toman todos los días de vinculación del empleado***/
		  SELECT @nDias = SUM(dias)
		  FROM #t_rhh_hislab;
	   END;
	   
	   /*** si el concepto se liquida en el último periodo y se encuentra en el último periodo***/
	   IF @nApl_con = 2 AND @IndUltPer = 1
	   BEGIN

		  --Si los perídos de liq no comienzan en 1 y terminan el último día del mes sin importar los días de los que se compongan
		  --se lanzará un error indicando que la novedad no se liquidará y se cambie para procesarla todos los subperíodos
		  IF DAY(@fFecIniTlq) <> 1 OR @fFec_Corte <> EOMONTH(@fFec_Corte)
		  BEGIN
			 RAISERROR(
			 N'La irregularidad de la periodicidad de liquidación no permite que se calcule correctamente en el último subperiodo. Cambie la noveded para ser procesada en todos los subperíodos',
			 16, 1);
			 RETURN;
		  END;
		  /*** Los periodos de liquidación son 30***/
		  SELECT @nDias_PerLiq = 30;
	   END;
		  ELSE
	   BEGIN
		  /*** Los periodos de liquidación son 30***/
		  IF @nApl_ConNov IN(2)
		  BEGIN
			 SET @nDias_PerLiq = 30;
		  END;
			 ELSE
		  /***  Se toman los días del periodo de liquidación***/
		  BEGIN
			 SELECT @nDias_PerLiq = dias_tlq
			 FROM rhh_pertlq AS Tlq
			 INNER JOIN rhh_tipoliq AS Liq ON Tlq.cod_tlq = Liq.cod_tlq
			 WHERE Tlq.cod_tlq = @cod_tlq AND @fFec_Corte BETWEEN fec_ini AND fec_fin;
		  END;
	   END;
	   --select '@nDias'=@nDias
	   /** Se evaluan los indicadores de proporcionalidad en ausentismos siempre y cuando el indicador de proporcionalidad este habilitado***/
	   IF @ind_prop = 1
	   BEGIN

		  SELECT @nDiaVac = SUM(dia_vac)
		  FROM #t_rhh_hislab;

		  /** Si la novedad  se liquida en el último periodo  se deben sumar los días del histórico***/
		  IF @nApl_ConNov = 2 AND @IndUltPer = 1
		  BEGIN
			
			 WITH AUS
				 AS (SELECT ROW_NUMBER() OVER(
						  ORDER BY Conceptos ASC) AS ID,
						  Conceptos,
						  cl.cla_aus
					FROM(
						SELECT Cla_aus,
							  Cod_ConPago
						FROM rhh_TbTipAus
					    ) AS AUS UNPIVOT(CONCEPTOS FOR Concepto IN(Cod_ConPago)) AS Conc
					INNER JOIN Rhh_TbClasAus AS CL ON Conc.cla_aus = CL.cla_aus
					WHERE CL.Ind_DiaAus = 1 AND CL.cla_aus = '06')
				 SELECT @nDiaLicRemH = ISNULL(SUM(can_liq), 0)
				 FROM #T_rhh_liqhis AS H
				 INNER JOIN AUS AS A ON H.Cod_con = A.Conceptos
				 WHERE fec_cte >= @fFecIniTlq AND fec_cte < @fFec_Corte AND ID = 1;

			 -- Dias Licencia no remunerada
			 SELECT @nDiaLicNORemH = ISNULL(SUM(can_liq), 0)
			 FROM #T_rhh_liqhis AS H
			 WHERE Cod_con = '000009'
				  AND cod_emp = @cCod_emp
				  AND fec_cte >= @fFecIniTlq
				  AND fec_cte < @fFec_Corte;

			 SELECT @nDiaVacH = ISNULL(SUM(can_liq), 0)
			 FROM #T_rhh_liqhis
			 WHERE Cod_con = '000004'
				  AND cod_emp = @cCod_emp
				  AND fec_cte >= @fFecIniTlq
				  AND fec_cte < @fFec_Corte;

/*
				  Se identifican los conceptos asocidos a tipos de ausentismo con clase relacionada con incapacidad
				  campo cla_aus <> '0'
				  */
			 WITH AUS
				 AS (SELECT Conceptos,
						  cl.cla_aus
					FROM(
						SELECT Cla_aus,
							  Cod_ConPago,
							  Cod_ConAuxDias
						FROM rhh_TbTipAus
					    ) AS AUS UNPIVOT(CONCEPTOS FOR Concepto IN(Cod_ConPago,
														  Cod_ConAuxDias)) AS Conc
					INNER JOIN Rhh_TbClasAus AS CL ON Conc.cla_aus = CL.cla_aus
					WHERE CL.Ind_DiaAus = 1 AND CL.Ind_reconocimiento = 1)
				 SELECT @nDiaincH = ISNULL(SUM(can_liq), 0)
				 FROM #T_rhh_liqhis AS H
				 INNER JOIN AUS AS A ON H.Cod_Con = A.Conceptos
				 WHERE fec_cte >= @fFecIniTlq AND fec_cte < @fFec_Corte;
			 SELECT @nDias = @nDias - (@nDiaLicRemH + @nDiaincH) - @nDiaVacH - @nDiaLicNORemH;
			 --FROM #t_rhh_hislab
			 --WHERE num_sec = ( SELECT MAX(num_sec)
			 --		    FROM #t_rhh_hislab );
		  END;

		  /** si es proporcional e incluye vacaciones suma las vacaciones del periodo y las del histórico***/
		  IF @ind_vacPag = 1
		  BEGIN
			 SELECT @nHab_dis = CONVERT(DECIMAL(8, 2), REPLACE(VAL_VAR, '''', ''))
			 FROM #T_VarPub
			 WHERE nom_var = 'nHab_dis';

			 SELECT @nNhaDis = CONVERT(DECIMAL(8, 2), REPLACE(VAL_VAR, '''', ''))
			 FROM #T_VarPub
			 WHERE nom_var = 'nNha_dis';

			 SELECT @nfFecsal = CONVERT(DATETIME, REPLACE(VAL_VAR, '''', ''))
			 FROM #T_VarPub
			 WHERE nom_var = 'fFec_sal';

			 SELECT @nfFecent = CONVERT(DATETIME, REPLACE(VAL_VAR, '''', ''))
			 FROM #T_VarPub
			 WHERE nom_var = 'fFec_vac';

			 SELECT @nD31_Vac = d31_vac
			 FROM #t_Rhh_hislab;

			 IF @nD31_Vac = 0
			 BEGIN
				IF MONTH(@nfFecsal) <> MONTH(@nfFecent)
				   AND DAY(EOMONTH(@nfFecsal)) = '31'
				   OR DAY(@nfFecent) = '31'
				BEGIN
				    SET @nD31_Vac = 1;
				END;
			 END;

			 SET @nDiaVacPag = ISNULL(CONVERT(INT, @nHab_dis), 0) + ISNULL(CONVERT(INT, @nNhaDis), 0); -- ISNULL(@nD31_Vac, 0);
			 SET @nDiaVacAntic = @nDiaVacPag - ISNULL(@nDiaVac, 0);

			 IF @nDiaVacAntic < 0
			 BEGIN
				SET @nDiaVacAntic = 0;
			 END;

/*
				  Detrminar si hay día 31 en los días de vacaciones pagados en difrute duranmte el período de liquidación
				  siempre se quita en novevdaes fijas con proporción vacaciones anticipadas el 31
				  */
			 IF @fFec_has > @nfFecent OR @fFec_has IS NULL
			 BEGIN
				IF @nDiaVacPag > 0
				BEGIN

				    SELECT @nDias = @nDias + @nDiaVacPag; -- CASE @ind_m31
				    --	   WHEN 1 THEN 0
				    --	   ELSE @nIndDesc31
				    --  END;
				END;
			 END;
				ELSE
			 BEGIN

				SELECT @nDias = @nDias + dbo.fn_rhh_DiaVacRango( @cCod_emp, @nfFecsal, @fFec_has, '01' );

				IF @fFec_has >= @fFec_CorteI
				BEGIN
				    SET @nDias = @nDias - @nD31_Vac;
				END;
			 END;
		  END;

		  IF @ind_ProyAca = 1
		  BEGIN
			 DECLARE @FecIniProy DATETIME;
			 DECLARE @FecFinProy DATETIME;
			 DECLARE @DiasProy INT;

			 IF @est_lab = '04'
			 BEGIN

				IF EXISTS( SELECT *
						 FROM TEMPDB.dbo.sysobjects
						 WHERE id = OBJECT_ID(N'[TEMPDB].[dbo].[#T_VarPub]') )
				BEGIN

				    SELECT @fec_ret = REPLACE(VAL_VAR, '''', '')
				    FROM #T_VarPub
				    WHERE nom_var = 'fFec_Fin_HL';

				    IF @fec_ret > @fFec_CorteI
				    BEGIN
					   SELECT @fec_ret = @fFec_CorteI;
				    END;
				END;
				    ELSE
				BEGIN
				    SELECT @fec_ret = @fFec_CorteI;
				END;

				SELECT @FecIniProy = fec_iniProy,
					  @FecFinProy = fec_finProy
				FROM rhh_TipConProySS
				WHERE tip_con = @tip_con
					 AND CASE DAY(DATEADD(DAY, 1, @fec_ret))
						    WHEN 31 THEN DATEADD(DAY, 2, @fec_ret)
						    ELSE DATEADD(DAY, 1, @fec_ret)
						END BETWEEN fec_iniProy AND fec_finProy;
				SELECT @DiasProy = ISNULL(DATEDIFF(DAY, @FecIniProy, @FecFinProy), 0);

				SET @nDias = @nDias + @DiasProy;
			 END;
		  END;

	   END;
				/**Si el concepto no se liquida en el último periodo de liquidación, toma los días del periodo***/
		  ELSE
	   BEGIN
		  SELECT @nDias = @nDias + ISNULL(SUM(can_liq), 0)
		  FROM #T_rhh_liqhis
		  WHERE Cod_con = '000002'
			   AND cod_emp = @cCod_emp
			   AND fec_cte >= @fFecIniTlq
			   AND fec_cte < @fFec_Corte
			   AND tip_liq <> @Tip_liq;

		  IF @Tip_liq = '04'
		  BEGIN
			 SELECT @nDias = ISNULL(SUM(can_liq), 0)
			 FROM #T_rhh_liqhis
			 WHERE Cod_con = '000002'
				  AND cod_emp = @cCod_emp
				  AND fec_cte >= @fFecIniTlq
				  AND fec_cte < @fFec_Corte
				  AND @Tip_liq = '04'
				  AND tip_liq <> @Tip_liq;
		  END;
	   END;

	   UPDATE @NOVFIJA
		SET Dias = @nDias,
		    Dias_PerLiq = @nDias_PerLiq,
		    sal_bas = CASE -- SRS2022-0441
					   WHEN fec_has > @fFec_Corte THEN @SalBas
					   ELSE dbo.fn_rhh_SueldoFch( cod_emp, fec_has, 1, 1 )
				    END
	   WHERE Reg_con = @MINCON;

	   SET @MINCON = @MINCON + 1;
    END;

    /*SNR2023-0041, Gastos de Representacion fijo por valor*/
   
	IF @cCod_con2 = '001071'
	BEGIN
	   SELECT @cCargo = cod_car
	   FROM rhh_hislab AS H
	   WHERE H.cod_emp = @cCod_emp
		    AND H.sec_car = 1
		    AND H.num_sec = [dbo].[fn_rhh_Hislab_NumSec]( @cCod_emp, @fFec_Corte, 3, 1 );

	   SELECT @cCargo = ISNULL(@cCargo, '0');

	   EXEC sp_rhh_carano00 @cCargo,@fFec_Corte,'gas_rep', @valor1 OUTPUT;
   
	   SET @valor1 = ISNULL(@valor1, 0);
   
    END;

    DECLARE @nValBase MONEY;

    SET @nValBase = @SalBas + @valor1 + @valor2;

    INSERT INTO #T_TotNovfija
    SELECT CASE
			WHEN ind_pro = 1 THEN ROUND(ROUND((@SalBas + @valor1 + @valor2) * val_nov * IIF(@tip_liq = '16' AND @napl_connov = 3 AND @cod_tlq_Real
			= 1, 2, 1) / 100, @Num_Dec) / Dias_PerLiq * Dias, @Num_Dec) -- SRS2022-0441
			ELSE ROUND((@SalBas + @valor1 + @valor2) * val_nov * IIF(@tip_liq = '16' AND @napl_connov = 3 AND @cod_tlq_Real = 1, 2, 1) / 100,
			@Num_Dec) -- SRS2022-0441
		 END AS Valor
    FROM @novfija
    WHERE cod_emp = @cCod_emp
		AND cod_con = @cCod_con
		AND @nCodCont = CASE ind_Cto_FNov
						WHEN 1 THEN dbo.fn_rhh_ContratoFch( @cCod_emp, fec_nov, 1 )
						ELSE dbo.fn_rhh_ContratoFch( @cCod_emp, @fFec_Corte, 0 )
					 END;

    SELECT @nVal_nov = SUM(Valor)
    FROM #T_TotNovfija;

    SELECT @nDias = MIN(DIAS)
    FROM @NOVFIJA;

/*Cuando se liquida desde otro procedimiento debe tomar el mes completo para realizar el cálculo
	  ajmdlo 20220218*/
    IF @Ind = 2
    BEGIN
	   SELECT @nDias = 30;
	   SELECT @nVal_nov = ROUND(@nValBase * val_nov / 100, 0)
	   FROM rhh_novfija
	   WHERE cod_emp = @cCod_emp
		    AND cod_con = @cCod_con
		    AND (apl_con = @nApl_con OR @tip_liq = '04'
			   )
		    AND (@fFec_Corte BETWEEN fec_nov AND fec_has
			    OR (@fFec_Corte >= fec_nov AND fec_has IS NULL
				  )
			   )
		    AND @nCodCont = CASE
						    WHEN cod_cont IS NULL THEN dbo.fn_rhh_ContratoFch( @cCod_emp, fec_nov, 1 )
						    ELSE cod_cont
						END;
    END;

    IF @nVal_nov IS NULL
    BEGIN
	   SELECT @nVal_nov = 0,
			@nDias = 0;
    END;

    IF @nDias < 0
    BEGIN
	   SELECT @nVal_nov = 0,
			@nDias = 0;
    END;

    IF @Ind <> 2
    BEGIN
	   IF OBJECT_ID('TempDb..#T_VarPub') IS NULL
	   BEGIN
		  SELECT 'Cantidad' = @nDias,
			    'Resultado' = @nVal_nov;
	   END;
		  ELSE
	   BEGIN

		  EXEC dbo.Sp_rhh_LiqCte @cCodCon = @cCod_con,
							@Cantidad = @nDias,
							@Resultado = @nVal_nov;


	   END;
    END;
END;

```
