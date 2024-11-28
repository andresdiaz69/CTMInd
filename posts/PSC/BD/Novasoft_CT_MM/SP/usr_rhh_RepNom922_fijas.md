# Stored Procedure: usr_rhh_RepNom922_fijas

## Usa los objetos:
- [[fn_gen_DP]]
- [[Fn_Gen_GetDIALetras]]
- [[Fn_Gen_GetMesLetras]]
- [[fn_gen_monto]]
- [[fn_rhh_CargoFch]]
- [[fn_rhh_ContratoFch]]
- [[fn_rhh_SueldoFch]]
- [[fn_rhh_VG]]
- [[gen_ccosto]]
- [[gen_ciudad]]
- [[gen_compania]]
- [[gen_tipide]]
- [[GTH_ParamContratos]]
- [[NOM_VARGEN]]
- [[rhh_cargos]]
- [[rhh_cauretiro]]
- [[rhh_emplea]]
- [[rhh_hislab]]
- [[rhh_liqhis]]
- [[RHH_NOVFIJA]]
- [[rhh_tbfondos]]
- [[rhh_tipcon]]
- [[usr_basescert]]
- [[usr_concert]]
- [[v_rhh_concep]]

```sql
CREATE PROCEDURE [dbo].[usr_rhh_RepNom922_fijas](
	@cod_emp	CHAR(12) = '1016020936'	
)

AS
BEGIN

	DECLARE	@ContVigente	int,
			@CargoFecha		char(8),

			@FecUltLiq		DATETIME,
			@FecInicialProc	DATETIME,
			@FecCert		DATETIME,
			@Estado			CHAR(2),
			@SalarioFch		MONEY,
			@fecharet		DATE,
			@clasesal		smallint,
			@destino	VARCHAR(40) = 'EL INTERESADO'	

	declare @TMPVALNEG MONEY=0
	DECLARE @TMPVALCOMNEG MONEY = 0
	declare @relnovfijas	varchar(max) =N' '

	CREATE TABLE #OCertLab (
		[cod_emp]		[char] (12) COLLATE DATABASE_DEFAULT, 
		[senor]			[char] (10),
		[nombre]		[char] (200),
		[identif]		[char] (15),
		[num_ide]		[varchar] (15) COLLATE DATABASE_DEFAULT,
		[ciu_exp]       [char] (30),
		[DiaFIng]		[char] (2),
		[MesFIng]		[char] (15),
		[AnoFIng]		[char] (4),
		[DiaFRet]		[char] (2),
		[MesFRet]		[char] (15),
		[AnoFRet]		[char] (4),
		[cod_car]		[char] (8)  COLLATE DATABASE_DEFAULT, 
		[nom_car]		[varchar] (250)  COLLATE DATABASE_DEFAULT,
		[cod_cl1]		[varchar] (12) COLLATE DATABASE_DEFAULT,
		[TipCon]		[char] (2),
		[NomCon]		[char] (100),
		[SalBas]		[money],
		[cod_con]		[int],
		[DiasLab]		[int],
		[ValPre]		[money] ,
		[PromDevPre]	[int] ,
		[DiaFcert]		[char] (2),
		[MesFcert]		[char] (15),
		[AnoFcert]		[char] (4),
		[fec_ini]		[datetime],
		[fec_fin]		[datetime],
		[Variable]		[char] (20),
		[interesa]		[char] (20),
		[cau_ret]		[char] (4),
		[nom_cret]		[char] (25),
		[nom_cia]       [varchar] (200),
		[nit_cia]       [char] (12),
		[dig_ver]       [char] (1),
		[nom_costo]		[char] (40),
		[nombrefir]		[char] (50),
		[carfir]		[char] (50),
		[dircia]		[char] (50),
		[telcia]		[char] (15),
		[totportafolio]		[money] ,
		[proportafolio]		[int] ,
		[nomdiaFcert]	[char] (15),
		[faxcia]		[char] (15),
		[extension]		[char] (15),
		[tipoiden]		[char] (30),
		[tipvincula]		[char] (30),
		[destino]		[char] (40),
		[fIngcompelt]   [char] (30),
		[fRetcompelt]   [char] (30),
		[periodo1]		[char] (80),
		[periodo12]		[char] (80),
		[periodo2]		[char] (80),
		[periodo22]		[char] (80),
		[periodo3]		[char] (80),
		[periodo32]		[char] (80),
		[periodo4]		[char] (80),
		[periodo42]		[char] (80),
		[periodo5]		[char] (80),
		[periodo52]		[char] (80),
		[periodo6]		[char] (80),
		[periodo62]		[char] (80),
		[periodo7]		[char] (80),
		[periodo72]		[char] (80),
		[tiposal]		[char] (30),
		[ciudadcia]		[char] (30),
		[empremision]	[char] (50),
		[correo]		[char] (50),
		[fdosal]		[varchar] (150),
		[fdopen]		[varchar] (150),
		[fdoces]		[varchar] (150),
		[fdoarl]		[varchar] (150),
		[fdocaj]		[varchar] (150),
		[clasesal]		[char] (50),
		[ciulabo]		[char] (50),



	)

	
--	DECLARE @VG510 NVARCHAR(200) = (select val_var from NOM_VARGEN WHERE NUM_VAR=510)
	DECLARE @VG555 NVARCHAR(200) = (select val_var from NOM_VARGEN WHERE NUM_VAR=555)
	DECLARE @diasprom int
	DECLARE @cadena NVARCHAR(MAX)
	DECLARE @tmpval money=0, @tmpvalport money =0
	DECLARE @dirweb_empresa	VARCHAR(100) =  (select val_var from NOM_VARGEN WHERE NUM_VAR=750)

	SET @FecCert = GETDATE()
	SET @ContVigente = dbo.fn_rhh_ContratoFch (@cod_emp, @FecCert, 0)
	SET @CargoFecha = dbo.fn_rhh_CargoFch(@cod_emp, @FecCert, 0)
	SET @Estado = (SELECT E.est_lab FROM rhh_emplea E WHERE E.cod_emp = @cod_emp)
	SET @SalarioFch = round(dbo.fn_rhh_SueldoFch(@cod_emp,GETDATE(),2,1),0)

	declare @fectmp1 date = (select top (1) fec_ini from rhh_hislab where  cod_emp=@cod_emp and nue_con=1)  --no afecta las certificaiones ya que no estáncon  promedio


	SELECT	@FecUltLiq = MAX(h.fec_cte)
	FROM	rhh_liqhis h
	WHERE	h.cod_emp = RTRIM(@cod_emp) and h.cod_cont = @ContVigente and h.nat_liq = 1 and h.tip_liq = '01'

	SELECT @FecUltLiq= ISNULL(@FecUltLiq,GETDATE())

	IF DAY(@FecUltLiq) < 28
		SELECT	@FecUltLiq = dateadd(d,-day(@FecUltLiq),@FecUltLiq)



	SELECT @diasprom = @VG555 * 30
	IF  @FecUltLiq IS NOT NULL
	BEGIN
--		IF ((@CodRepo = 1) and @Estado not in ('99', '00')) OR ((@CodRepo = 2) and @Estado not in ('99', '00')) OR ((@CodRepo = 3) and @Estado in ('99', '00'))
--		BEGIN
			INSERT INTO #OCertLab
				SELECT	H.cod_emp, 
						CASE	E.sex_emp
							WHEN	1	THEN	'la señora ' 
							WHEN	2	THEN	'el señor '	END		AS	senor,
						RTRIM(E.nom_emp) + ' ' + RTRIM(E.ap1_emp) + ' ' + RTRIM(E.ap2_emp)  AS nombre, 
						CASE	E.sex_emp
							WHEN	1	THEN	' identificada ' 
							WHEN	2	THEN	' identificado '	END		AS	identif,
						E.num_ide, CI.nom_ciu,
						'' as DiaFIng,
						'' as MesFIng,
						'' as AnoFIng,
						'' as DiaFRet,
						'' as MesFRet,
						'' as AnoFRet,
						--C.cod_car, C.nom_car,		-- cargo a la fecha del certificado
						(SELECT top(1) cod_car from rhh_hislab where cod_emp=@cod_emp order by fec_ini desc ) as cod_car,
						
--						C.nom_car,
						(select nom_car from rhh_cargos where cod_car=
						(SELECT top(1) cod_car from rhh_hislab where cod_emp=@cod_emp order by fec_ini desc )) as nom_car,
	
						H.cod_cl1,



						--H.tip_con as TipCon,
						(SELECT top(1) tip_con from rhh_hislab where cod_emp=@cod_emp order by fec_ini desc) as TipCon,

						(SELECT top(1) nom_con from rhh_tipcon where tip_con=E.tip_con) as NomCon,
--						T.nom_con as NomCon,
						
						
						E.sal_bas as SalBas,
						--(SELECT top(1) sal_ant_flex from rhh_hislab where cod_emp=@cod_emp  order by fec_ini desc) as SalBas,

						@ContVigente as cod_con,
						0 AS DiasLab,
						0 AS ValPre,
						0 AS PromDevPre,
						RIGHT('0'+LTRIM(RTRIM(DAY(@FecCert))),2) as DiaFcert, 
						dbo.Fn_Gen_GetMesLetras(@FecCert) as MesFcert,
						YEAR(@FecCert) as AnoFcert,
						MIN(H.fec_ini) as fec_ini,
						
						(SELECT top(1) fec_ret from rhh_hislab where cod_emp=@cod_emp order by fec_ini desc) as fec_fin,
						'' AS Variable,
						 CASE	E.sex_emp
							WHEN	1	THEN	'de la interesada' 
							WHEN	2	THEN	'del interesado'	END		AS	interesa,
						H.cau_ret, R.nom_ret as nom_cret,
						CM.nom_cia, CM.nit_cia, CM.dig_ver,
						CC.nom_cco,

						RTRIM(CONVERT(VARCHAR(100),dbo.fn_rhh_VG(102,getdate()))) As VG102, 
						(select RTRIM(nom_var) from nom_vargen where num_var = '102') as CAR_FIR,
						
						RTRIM(CM.dir_cia),RTRIM(CM.tel_cia),
						0 as totportafolio,0 as proportafolio,
						dbo.Fn_Gen_GetDIALetras(@FecCert) as nomdiaFcert,
							CM.fax_cia as faxcia,CM.num_pat as extension,TI.des_tip as tipoiden,
						CASE	E.sex_emp
							WHEN	1	THEN	' vinculada ' 
							WHEN	2	THEN	' vinculado '	END		AS	[tipvincula],
						@destino as destino,'fecha','fecret',
						'','','','','','','','','','','','','','',
						CASE WHEN (SELECT TOP(1) cla_sal FROM GTH_ParamContratos WHERE cod_emp=@cod_emp ORDER BY fec_param DESC)=1 THEN
							'SALARIO BASICO' ELSE ' SALARIO INTEGRAL' END AS tiposal,
						(SELECT nom_ciu FROM gen_ciudad WHERE cod_ciu=CM.cod_ciu) AS ciudadcia,
						CC.nom_cco As empremision,CM.cor_ele,
						FS.nom_fdo as fdosal, FP.nom_fdo as fdopen, FC.nom_fdo as fdoces,
						FA.nom_fdo as fdoarl, FJ.nom_fdo as fdocaj,
						case when E.cla_sal=1 then 'ingreso mensual' else 'Salario Integral' end,''


				FROM	rhh_hislab H
						INNER JOIN	rhh_emplea E ON E.cod_emp = H.cod_emp
						INNER JOIN	rhh_cargos C ON C.cod_car = H.cod_car
--						INNER JOIN	rhh_cargos C ON C.cod_car = @CargoFecha
						INNER JOIN	rhh_tipcon T ON T.tip_con = H.tip_con
						LEFT JOIN	rhh_cauretiro R ON R.cau_ret = H.cau_ret
						INNER JOIN  gen_ciudad CI ON E.ciu_exp = CI.cod_ciu 
						INNER JOIN  gen_compania CM ON E.cod_cia = CM.cod_cia
						INNER JOIN  gen_ccosto CC  ON  CC.cod_cco = E.cod_cco
						INNER JOIN gen_tipide TI  ON TI.cod_tip=E.tip_ide
						INNER JOIN rhh_tbfondos FP ON FP.cod_fdo=E.fdo_pen
						INNER JOIN rhh_tbfondos FS ON FS.cod_fdo=E.fdo_sal
						INNER JOIN rhh_tbfondos FC ON FC.cod_fdo=E.fdo_ces
						INNER JOIN rhh_tbfondos FA ON FA.cod_fdo=E.fdo_ate
						INNER JOIN rhh_tbfondos FJ ON FJ.cod_fdo=E.ccf_emp

				WHERE	H.cod_emp = RTRIM(@cod_emp) and H.cod_con = @ContVigente  and fec_ini=(select min(fec_ini) from rhh_hislab where  cod_emp=@cod_emp and cod_con=@ContVigente)
--						and cod_con=@nomcont
				GROUP	BY H.cod_emp,E.ap1_emp,E.ap2_emp,E.nom_emp,E.num_ide, CI.nom_ciu, E.sex_emp, C.cod_car, C.nom_car, H.tip_con, T.nom_con, H.cod_cl1, E.ind_svar, 
						H.cau_ret, R.nom_ret, CM.nom_cia, CM.nit_cia, CM.dig_ver,CC.nom_cco,E.sal_bas,CM.dir_cia,CM.tel_cia,CM.fax_cia,CM.num_pat,des_tip,
						E.tip_con,CM.cod_ciu,E.cod_cco,CM.cor_ele,CM.rep_leg,FS.nom_fdo,FP.nom_fdo,FC.nom_fdo,FA.nom_fdo,FJ.nom_fdo,E.cla_sal
				ORDER	BY H.cod_emp, fec_ini DESC


				UPDATE #OCertLab SET SALBAS = (SELECT top(1) sal_bas from rhh_hislab where cod_emp=@cod_emp  order by fec_ini desc)
					WHERE SALBAS=0

				declare @ciulabor char(5)= (SELECT top(1) cod_ciu from rhh_hislab where cod_emp=@cod_emp  order by fec_ini desc)

				UPDATE #OCertLab SET ciulabo = (SELECT nom_ciu from gen_ciudad where cod_ciu =  (SELECT top(1) cod_ciu from rhh_hislab where cod_emp=@cod_emp  order by fec_ini desc))

				
				SET @FecInicialProc = DATEADD (MONTH,@VG555*-1,@FecUltLiq)


				IF DAY(@FecUltLiq) = 28  --Para el mes de febrero
					SELECT	@FecInicialProc = dateadd(d,3,@FecInicialProc)
				

				SET @FecInicialProc = CASE WHEN DAY(@FecInicialProc)=31 THEN dateadd(DAY,1,@FecInicialProc) 
											WHEN DAY(@FecInicialProc)=30 AND MONTH(@FecInicialProc) IN (1,3,5,7,8,10,12) THEN dateadd(DAY,2,@FecInicialProc)
											ELSE @FecInicialProc END



				UPDATE #OCertLab SET	DiasLab = CASE WHEN dbo.fn_gen_DP(@fectmp1, @FecUltLiq) > @diasprom THEN @diasprom ELSE dbo.fn_gen_DP(@fectmp1, @FecUltLiq) END


			--Almacenar los valores de novedades fijas
			SELECT  @tmpvalport = isnull(SUM(val_nov),0) FROM RHH_NOVFIJA WHERE cod_emp=@cod_emp and 
													cod_con in  (select concepto   from usr_concert where tipocon='1') and
													@FecCert BETWEEN fec_nov and ISNULL(fec_has,@FecCert)
													 


					--Almacenar los valores de conceptos variables
					SELECT  @tmpval = ISNULL(sum(val_liq),0) from	rhh_liqhis lh where	lh.cod_emp = 
													RTRIM(CONVERT(CHAR,@cod_emp))  
													 and lh.cod_cont =  @ContVigente
													 and lh.tip_liq = '01' 
													 AND nat_liq=1
													 and lh.fec_cte between @FecInicialProc and @FecUltLiq
													 and lh.ind_sal=1
							--						 and cod_con in (select concepto   from usr_concert where rtrim(tipocon)='2') AND COD_CON<>'001050'
									
														 
				SELECT  @TMPVALNEG = ISNULL(sum(val_liq),0) from	rhh_liqhis lh where	lh.cod_emp = 
													RTRIM(CONVERT(CHAR,@cod_emp))  
													 and lh.cod_cont =  @ContVigente
													 and lh.nat_liq = 2
													 and lh.tip_liq = '01' 
													 and lh.fec_cte between @FecInicialProc and @FecUltLiq
													 and lh.ind_sal=1
								--					 and cod_con in (select concepto   from usr_concert where rtrim(tipocon)='2') AND COD_CON<>'001050'
											

				SELECT @TMPVALNEG = COALESCE(@TMPVALNEG,0)

				SELECT @tmpval = @tmpval - @TMPVALNEG


				UPDATE #OCertLab SET valpre = @tmpval, totportafolio = @tmpvalport

				UPDATE #OCertLab SET PromDevPre =	ROUND((ValPre/DiasLab)*30,0),
									 proportafolio    =  totportafolio




		UPDATE #OCertLab SET	DiaFIng = RIGHT('0'+LTRIM(RTRIM(DAY(fec_ini))),2), 
								MesFIng = dbo.Fn_Gen_GetMesLetras(fec_ini),
								AnoFIng = YEAR(fec_ini)


		SET @fecharet =    (select fec_ret from rhh_hislab where  cod_emp=@cod_emp and cod_con=@ContVigente and fec_ret IS NOT NULL)

		UPDATE #OCertLab SET	DiaFRet = RIGHT('0'+LTRIM(RTRIM(DAY(@fecharet))),2), 
								MesFRet = dbo.Fn_Gen_GetMesLetras(@fecharet),
								AnoFRet = YEAR(@fecharet)


		UPDATE #OCertLab SET	fIngcompelt = RIGHT('0'+LTRIM(RTRIM(DAY(fec_ini))),2) + ' de ' +  dbo.Fn_Gen_GetMesLetras(fec_ini) + ' de ' +  rtrim(convert(CHAR,YEAR(fec_ini)))
		UPDATE #OCertLab SET	fRetcompelt = RTRIM(DiaFRet) + ' de ' + RTRIM(MesFRet) + ' de ' +  rtrim(AnoFRet)


		--Buscar los períodos laborados en las historias laborales

		declare @iniciohis date,
				@finhis		date,
				@contrato	int,
				@cadenacon	Char(80),
				@cadenacon2	Char(80)

		declare @numhis  int = 1
		

		DECLARE  periodostra CURSOR FOR
		SELECT fec_ini,cod_con from rhh_hislab where cod_emp=@cod_emp and nue_con=1
			
		OPEN periodostra
		FETCH NEXT FROM periodostra INTO @iniciohis,@contrato

		WHILE @@FETCH_STATUS = 0
		BEGIN


			SELECT @finhis = fec_ret from rhh_hislab where cod_emp=@cod_emp and cod_con = @contrato
		
			SET @cadenacon = '' + right('00' + RTRIM(convert(char,day(@iniciohis))),2)  + ' de ' + datename(m,@iniciohis) + ' de ' + RTRIM(convert(char,year(@iniciohis))) 
			
			SET @cadenacon2 = COALESCE(' ' + right('00' + RTRIM(convert(char,day(@finhis))),2)  + ' de ' + datename(m,@finhis) + ' de ' + RTRIM(convert(char,year(@finhis))),' a la Fecha')
			

			select @cadena = CASE @numhis WHEN 1 THEN 'UPDATE #OCertLab SET periodo1= ''' + rtrim(@cadenacon) + ''',periodo12 = ''' + rtrim(@cadenacon2) + ''''
										  WHEN 2 THEN 'UPDATE #OCertLab SET periodo2 =''' + rtrim(@cadenacon) + ''',periodo22 = ''' + rtrim(@cadenacon2) + ''''
										  WHEN 3 THEN 'UPDATE #OCertLab SET periodo3 = ''' + rtrim(@cadenacon) + ''',periodo32 = ''' + rtrim(@cadenacon2) + ''''
										  WHEN 4 THEN 'UPDATE #OCertLab SET periodo4 = ''' + rtrim(@cadenacon) + ''',periodo42 = ''' + rtrim(@cadenacon2) + ''''
										  WHEN 5 THEN 'UPDATE #OCertLab SET periodo5 = ''' + rtrim(@cadenacon) + ''',periodo52 = ''' + rtrim(@cadenacon2) + ''''
										  WHEN 6 THEN 'UPDATE #OCertLab SET periodo6 = ''' + rtrim(@cadenacon) + ''',periodo62 = ''' + rtrim(@cadenacon2) + ''''
										  WHEN 7 THEN 'UPDATE #OCertLab SET periodo6 = ''' + rtrim(@cadenacon) + ''',periodo72 = ''' + rtrim(@cadenacon2) + ''''  END

			EXEC SP_EXECUTESQL @cadena

			SET @numhis = @numhis+1
			FETCH NEXT FROM periodostra INTO @iniciohis,@contrato
		END

	CLOSE periodostra;
	DEALLOCATE periodostra;




	END
	ELSE
		PRINT 'NO SE ENCONTRARON REGISTOS'


	IF EXISTS(SELECT * FROM usr_basescert WHERE cod_emp=@cod_emp and fechacert=CONVERT(DATE,@FecCert))
		DELETE usr_basescert WHERE cod_emp=@cod_emp and fechacert=CONVERT(DATE,@FecCert)

--	INSERT INTO usr_basescert VALUES (@cod_emp,@FecCert,@FecInicialProc,@FecUltLiq,0,(select DiasLab from #OCertLab),@tmpval,(select PromDevPre from #OCertLab),@TMPVALCOM,(select procomi from #OCertLab))

	IF @tmpval<>0
		INSERT INTO usr_basescert VALUES (@cod_emp,@FecCert,@FecInicialProc,@FecUltLiq,0,@diasprom,@tmpval,(select PromDevPre from #OCertLab),0,0,@ContVigente,(select diaslab from #OCertLab))

------  insertar la novedades fijas
	declare @concepfij	char(6)
	declare	@valfija	money
	declare @nombrecon	varchar(200)


	declare CURconcepfij cursor for
	SELECT  F.cod_con,F.val_nov,V.nom_con FROM RHH_NOVFIJA F INNER JOIN v_rhh_concep V on F.cod_con = V.cod_con    WHERE cod_emp=@cod_emp and 
													F.cod_con in  (select concepto   from usr_concert where tipocon='fijas') and
													@FecCert BETWEEN fec_nov and ISNULL(fec_has,@FecCert)


	OPEN CURconcepfij
	FETCH NEXT FROM CURconcepfij INTO @concepfij,@valfija,@nombrecon

	WHILE @@FETCH_STATUS=0
	BEGIN	

	--	INSERT INTO usr_basescert VALUES (@cod_emp,@FecCert,@FecInicialProc,@FecUltLiq,0,@diasprom,0,0,@valfija,@valfija,@ContVigente,(select diaslab from #OCertLab))
		SELECT @relnovfijas= @relnovfijas + ' + ' + rtrim(@nombrecon) + ' $' + 
			LTRIM(left(rtrim(CONVERT(CHAR,CONVERT(MONEY,@valfija),1)) , len(rtrim(CONVERT(CHAR,CONVERT(MONEY,@valfija),1))) -3))
		   + ' (' + left(dbo.fn_gen_monto(@valfija,1,'00'),len(rtrim(dbo.fn_gen_monto(@valfija,1,'00')))-20) + ')'
		
		FETCH NEXT FROM CURconcepfij INTO @concepfij,@valfija,@nombrecon

	END


	CLOSE CURconcepfij
	DEALLOCATE	CURconcepfij
----------------------------


	SELECT CL.*, CASE WHEN CL.SalBas <> 0 THEN left(dbo.fn_gen_monto(CL.SalBas,1,'00'),len(rtrim(dbo.fn_gen_monto(CL.SalBas,1,'00')))-20) + ' M/CTE'  ELSE '' END AS monto,
				left(dbo.fn_gen_monto(CL.PromDevPre,1,'00'),len(rtrim(dbo.fn_gen_monto(CL.PromDevPre,1,'00')))-20) + ' M/CTE' AS montovar,
				left(dbo.fn_gen_monto(CL.proportafolio,1,'00'),len(rtrim(dbo.fn_gen_monto(CL.proportafolio,1,'00')))-20) + ' M/CTE' AS montocomi,
				left(rtrim(CONVERT(CHAR,CONVERT(MONEY,CL.SalBas),1)) , len(rtrim(CONVERT(CHAR,CONVERT(MONEY,CL.SalBas),1))) -3)  as basico,
				left(rtrim(CONVERT(CHAR,CONVERT(MONEY,CL.PromDevPre),1)) , len(rtrim(CONVERT(CHAR,CONVERT(MONEY,CL.PromDevPre),1))) -3)  as procomiles,
				@relnovfijas as relfijas,@dirweb_empresa as dirweb_empresa
	FROM #OCertLab CL


	DROP TABLE #OCertLab


--left(dbo.fn_gen_monto(CL.procomi,1,'00'),len(rtrim(dbo.fn_gen_monto(CL.procomi,1,'00')))-20) + ' M/CTE'



END


```
