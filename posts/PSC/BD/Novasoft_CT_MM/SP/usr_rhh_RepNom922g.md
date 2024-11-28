# Stored Procedure: usr_rhh_RepNom922g

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
- [[NOM_VARGEN]]
- [[rhh_cargos]]
- [[rhh_cauretiro]]
- [[rhh_emplea]]
- [[rhh_hislab]]
- [[rhh_liqhis]]
- [[rhh_tipcon]]
- [[usr_basescert]]
- [[usr_concert]]

```sql
CREATE PROCEDURE [dbo].[usr_rhh_RepNom922g](
	@cod_emp	CHAR(12) = '37011660',	-- No es un proceso masivo, por lo que no acepta codigo '%'
	--@nomcont	char(6) = '2257',
	@CodRepo	VARCHAR(40) = 'EL INTERESADO'		--	1: Certificacion para personal activo salario fijo

								--	2: Certificacion para personal activo salario variable (con promedio)
								--	3: Certificacion personal retirado (ultimo salario devengado)


--WITH ENCRYPTION

)
AS

BEGIN

	DECLARE	@ContVigente	int,
			@CargoFecha		char(8),

			@FecUltLiq		DATETIME,
			@FecInicialProc	DATETIME,
			@FecCert		DATETIME,
			@Estado			CHAR(2),
			@SalarioFch		MONEY

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
		[SalBas]		[int],
		[cod_con]		[int],
		[DiasLab]		[int],
		[ValPre]		[money] ,
		[PromDevPre]	[int] ,
		[DiaFcert]		[char] (2),
		[MesFcert]		[char] (15),
		[AnoFcert]		[char] (4),
		[fec_ini]		[datetime],
		[fec_fin]		[datetime],
		[Variable]		[char] (10),
		[interesa]		[char] (15),
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
		[totcomi]		[money] ,
		[procomi]		[int] ,
		[nomdiaFcert]	[char] (15),
		[faxcia]		[char] (15),
		[extension]		[char] (15),
		[tipoiden]		[char] (30),
		[tipvincula]		[char] (30),
		[destino]		[char] (40),
		[fIngcompelt]   [char] (30),
		[fRetcompelt]   [char] (30)
	)

	
	DECLARE @VG510 NVARCHAR(200) = (select val_var from NOM_VARGEN WHERE NUM_VAR=510)
	DECLARE @VG555 NVARCHAR(200) = (select val_var from NOM_VARGEN WHERE NUM_VAR=555)
	DECLARE @diasprom int
	DECLARE @cadena NVARCHAR(MAX)
	DECLARE @tmpval money=0, @tmpvalcom money =0

	SET @FecCert = GETDATE()
	SET @ContVigente = dbo.fn_rhh_ContratoFch (@cod_emp, @FecCert, 0)
	SET @CargoFecha = dbo.fn_rhh_CargoFch(@cod_emp, @FecCert, 0)
	SET @Estado = (SELECT E.est_lab FROM rhh_emplea E WHERE E.cod_emp = @cod_emp)
	SET @SalarioFch = round(dbo.fn_rhh_SueldoFch(@cod_emp,GETDATE(),2,1),0)
	--SET @IndSvar = (SELECT E.ind_svar FROM rhh_emplea E WHERE E.cod_emp = @cCodEmp)

	declare @fectmp1 date = (select fec_ini from rhh_hislab where  cod_emp=@cod_emp and nue_con=1 and cod_con=@ContVigente)


	SELECT	@FecUltLiq = MAX(h.fec_cte)
	FROM	rhh_liqhis h
	WHERE	h.cod_emp = RTRIM(@cod_emp) and h.cod_cont = @ContVigente and h.nat_liq = 1 and h.tip_liq = '01'

	SELECT @FecUltLiq= ISNULL(@FecUltLiq,GETDATE())

	--Si en históricos hay datos de la primera quincena, se devuelve a buscar desde el mes anterior--  probar
	IF DATEPART(D,@FecUltLiq) < 28
		SELECT	@FecUltLiq = dateadd(d,-day(@FecUltLiq),@FecUltLiq)
		


	SELECT @diasprom = @VG555 * 30

	IF  @FecUltLiq IS NOT NULL
	BEGIN
--		IF ((@CodRepo = 1) and @Estado not in ('99', '00')) OR ((@CodRepo = 2) and @Estado not in ('99', '00')) OR ((@CodRepo = 3) and @Estado in ('99', '00'))
--		BEGIN
			INSERT INTO #OCertLab
				SELECT	H.cod_emp, 
						CASE	E.sex_emp
							WHEN	1	THEN	'La señora ' 
							WHEN	2	THEN	'El señor '	END		AS	senor,
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
						(SELECT top(1) cod_car from rhh_hislab where cod_emp=@cod_emp and cod_con=@ContVigente order by fec_ini desc ) as cod_car,
						
--						C.nom_car,
						(select nom_car from rhh_cargos where cod_car=
						(SELECT top(1) cod_car from rhh_hislab where cod_emp=@cod_emp and cod_con=@ContVigente order by fec_ini desc )) as nom_car,
	
						H.cod_cl1,

						--H.tip_con as TipCon,
						(SELECT top(1) tip_con from rhh_hislab where cod_emp=@cod_emp and cod_con=@ContVigente order by fec_ini desc) as TipCon,

						(SELECT top(1) nom_con from rhh_tipcon where tip_con=E.tip_con) as NomCon,
--						T.nom_con as NomCon,
						--E.sal_bas as SalBas,
						(SELECT top(1) sal_bas from rhh_hislab where cod_emp=@cod_emp and cod_con=@ContVigente order by fec_ini desc ) as SalBas,

						@ContVigente as cod_con,
						0 AS DiasLab,
						0 AS ValPre,
						0 AS PromDevPre,
						RIGHT('0'+LTRIM(RTRIM(DAY(@FecCert))),2) as DiaFcert, 
						dbo.Fn_Gen_GetMesLetras(@FecCert) as MesFcert,
						YEAR(@FecCert) as AnoFcert,
						MIN(H.fec_ini) as fec_ini,
						
						(SELECT top(1) fec_ret from rhh_hislab where cod_emp=@cod_emp and cod_con=@ContVigente order by fec_ini desc) as fec_fin,
--						MAX(H.fec_ret) as fec_fin,

						--(case	@CodRepo	when 1	then ' fijo '
						--					when 2	then ' variable '
						--					else ''
						-- end) as Variable,
						'' AS Variable,
						 CASE	E.sex_emp
							WHEN	1	THEN	'la interesada' 
							WHEN	2	THEN	'el interesado'	END		AS	interesa,
						H.cau_ret, R.nom_ret as nom_cret,
						CM.nom_cia, CM.nit_cia, CM.dig_ver,
						CC.nom_cco,
						CONVERT(VARCHAR(100),dbo.fn_rhh_VG(102,getdate())) As VG102, 
						(select RTRIM(nom_var) from nom_vargen where num_var = '102') as CAR_FIR,
						CM.dir_cia,CM.tel_cia,
						0 as totcomi,0 as procomi,
						dbo.Fn_Gen_GetDIALetras(@FecCert) as nomdiaFcert,
						CM.fax_cia as faxcia,CM.num_pat as extension,TI.des_tip as tipoiden,
						CASE	E.sex_emp
							WHEN	1	THEN	' vinculada ' 
							WHEN	2	THEN	' vinculado '	END		AS	[tipvincula],
						@CodRepo as destino,'fecha','fecret'



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
				WHERE	H.cod_emp = RTRIM(@cod_emp) and H.cod_con = @ContVigente  and fec_ini=(select min(fec_ini) from rhh_hislab where  cod_emp=@cod_emp and cod_con=@ContVigente)
--						and cod_con=@nomcont
				GROUP	BY H.cod_emp,E.ap1_emp,E.ap2_emp,E.nom_emp,E.num_ide, CI.nom_ciu, E.sex_emp, C.cod_car, C.nom_car, H.tip_con, T.nom_con, H.cod_cl1, E.ind_svar, 
						H.cau_ret, R.nom_ret, CM.nom_cia, CM.nit_cia, CM.dig_ver,CC.nom_cco,E.sal_bas,CM.dir_cia,CM.tel_cia,CM.fax_cia,CM.num_pat,des_tip,E.tip_con
				ORDER	BY H.cod_emp, fec_ini DESC


				
				SET @FecInicialProc = DATEADD (MONTH,@VG555*-1,@FecUltLiq)
				SET @FecInicialProc = dateadd(DAY,1,@FecInicialProc)


				SET @FecInicialProc = CASE WHEN DAY(@FecInicialProc)=31 THEN dateadd(DAY,1,@FecInicialProc) ELSE @FecInicialProc END


				DECLARE @FEC1 DATE = FORMAT(CONVERT(DATE,getdate()),'dd/MM/yyyy','en-US')

				UPDATE #OCertLab SET	DiasLab = CASE WHEN dbo.fn_gen_DP(@fectmp1, @FecUltLiq) > @diasprom THEN @diasprom ELSE dbo.fn_gen_DP(@fectmp1, @FecUltLiq) END


				SELECT  @TMPVAL = ISNULL(sum(val_liq),0) from	rhh_liqhis lh where	lh.cod_emp = 
													RTRIM(CONVERT(CHAR,@cod_emp))  
													 and lh.cod_cont =  @ContVigente
													 and lh.nat_liq = 1 
													 and lh.tip_liq = '01' 
													 and lh.fec_cte between @FecInicialProc and @FecUltLiq
													 and cod_con in (select concepto   from usr_concert where tipocon='extras')
													 

			SELECT  @TMPVALCOM = ISNULL(sum(val_liq),0) from	rhh_liqhis lh where	lh.cod_emp = 
													RTRIM(CONVERT(CHAR,@cod_emp))  
													 and lh.cod_cont =  @ContVigente
													 and lh.nat_liq = 1 
													 and lh.tip_liq = '01' 
													 and lh.fec_cte between @FecInicialProc and @FecUltLiq
													 and cod_con in (select concepto   from usr_concert where rtrim(tipocon)='comision')



				UPDATE #OCertLab SET valpre = @tmpval, totcomi = @tmpvalcom

				UPDATE #OCertLab SET PromDevPre =	ROUND((ValPre/DiasLab)*30,0),
									 Procomi    =   ROUND((totcomi/DiasLab)*30,0)


		UPDATE #OCertLab SET	DiaFIng = RIGHT('0'+LTRIM(RTRIM(DAY(fec_ini))),2), 
								MesFIng = dbo.Fn_Gen_GetMesLetras(fec_ini),
								AnoFIng = YEAR(fec_ini)

		UPDATE #OCertLab SET	DiaFRet = RIGHT('0'+LTRIM(RTRIM(DAY(fec_fin))),2), 
								MesFRet = dbo.Fn_Gen_GetMesLetras(fec_fin),
								AnoFRet = YEAR(fec_fin)


		UPDATE #OCertLab SET	fIngcompelt = RIGHT('0'+LTRIM(RTRIM(DAY(fec_ini))),2) + ' de ' +  dbo.Fn_Gen_GetMesLetras(fec_ini) + ' de ' +  rtrim(convert(CHAR,YEAR(fec_ini)))
		UPDATE #OCertLab SET	fRetcompelt = RTRIM(DiaFRet) + ' de ' + RTRIM(MesFRet) + ' de ' +  rtrim(AnoFRet)


	END
	ELSE
		PRINT 'NO SE ENCONTRARON REGISTOS'


	IF EXISTS(SELECT * FROM usr_basescert WHERE cod_emp=@cod_emp and fechacert=CONVERT(DATE,@FecCert))
		DELETE usr_basescert WHERE cod_emp=@cod_emp and fechacert=CONVERT(DATE,@FecCert)

	INSERT INTO usr_basescert VALUES (@cod_emp,@FecCert,@FecInicialProc,@FecUltLiq,0,(select DiasLab from #OCertLab),@tmpval,(select PromDevPre from #OCertLab),@TMPVALCOM,(select procomi from #OCertLab))
	

	SELECT CL.*, CASE WHEN CL.SalBas <> 0 THEN left(dbo.fn_gen_monto(CL.SalBas,1,'00'),len(rtrim(dbo.fn_gen_monto(CL.SalBas,1,'00')))-20) + ' M/CTE'  ELSE '' END AS monto,
				left(dbo.fn_gen_monto(CL.PromDevPre,1,'00'),len(rtrim(dbo.fn_gen_monto(CL.PromDevPre,1,'00')))-20) + ' M/CTE' AS montovar,
				left(dbo.fn_gen_monto(CL.procomi,1,'00'),len(rtrim(dbo.fn_gen_monto(CL.procomi,1,'00')))-20) + ' M/CTE' AS montocomi
	FROM #OCertLab CL


	DROP TABLE #OCertLab


--left(dbo.fn_gen_monto(CL.procomi,1,'00'),len(rtrim(dbo.fn_gen_monto(CL.procomi,1,'00')))-20) + ' M/CTE'



END


```
