# Stored Procedure: sp_rhh_PlanillaUnicaSS_2388

## Usa los objetos:
- [[fn_rhh_CiuLabor]]
- [[fn_Rhh_FondoFch]]
- [[fn_Rhh_FondoFch_Cont]]
- [[fn_rhh_Hislab_NumSec]]
- [[fn_rhh_Hislab_NumSec_cont]]
- [[fn_rhh_ModoEmp]]
- [[fn_rhh_tipoSalario]]
- [[fn_rhh_ValParmCont]]
- [[fn_rhh_ValParmConv]]
- [[fn_rhh_VG]]
- [[gen_compania]]
- [[gen_TipIde]]
- [[Gth_contratos]]
- [[rhh_ausentismo]]
- [[rhh_CentroTrab]]
- [[rhh_emplea]]
- [[Rhh_familia]]
- [[rhh_FdoForPag]]
- [[rhh_hisfon]]
- [[Rhh_hislab]]
- [[rhh_HisSS]]
- [[rhh_liqhis]]
- [[rhh_OtRiesgos]]
- [[rhh_OtSalud]]
- [[Rhh_PlaUnica_Reg01]]
- [[Rhh_PlaUnica_Reg02]]
- [[Rhh_SStipReg]]
- [[rhh_sucursalSS]]
- [[rhh_TbFondos]]
- [[Rhh_TbSubTipCotiza]]
- [[rhh_TbTipCotiza]]
- [[rhh_TipCon]]
- [[RHH_UPC_ADI]]
- [[SIS_APLICACION]]
- [[sp_rhh_GenSS01]]
- [[sp_rhh_LiqErrInfo]]

```sql
CREATE PROCEDURE [dbo].[sp_rhh_PlanillaUnicaSS_2388]
	@Fch_Data     DATETIME    = '20211231',
	@cCodCiaPar   VARCHAR(3)  = '%',
	@cSucSSPar    VARCHAR(10) = '%',
	@nRegsAdi     BIT         = 0, /*1 Para incluir Tipos de registro que no se envían en el plano*/
	@Tip_Planilla CHAR(1)     = 'E',
	@NumPlaAsoc   CHAR(10)    = ''

--WITH ENCRYPTION
AS
BEGIN

    SET NOCOUNT ON;
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

    DECLARE @cCodCia VARCHAR(3);
    DECLARE @cCodFdoARP CHAR(4);
    DECLARE @cCod_sgs_ARP VARCHAR(6);
    DECLARE @nTotEmp BIGINT;
    DECLARE @nValNom BIGINT;
    DECLARE @Fch_PrxPer DATETIME;
    DECLARE @Tar_CCF NUMERIC(9, 5);
    DECLARE @Tar_SENA NUMERIC(9, 5);
    DECLARE @Tar_ICBF NUMERIC(9, 5);
    DECLARE @Tar_ESAP NUMERIC(9, 5);
    DECLARE @Tar_EIT NUMERIC(9, 5);
    DECLARE @Tar_SalInt NUMERIC(9, 5);
    DECLARE @nom_suc VARCHAR(40);
    DECLARE @nom_Reg2 CHAR(15);
    DECLARE @Fch_PlaAso DATETIME;
    DECLARE @cMsgErr VARCHAR(MAX);
    DECLARE @nErrores INT;
    DECLARE @idl_num BIGINT;
    DECLARE @VG181 BIT;
    DECLARE @nVg60 MONEY;
    DECLARE @ValNom TABLE(
	    Cod_emp CHAR(12),
	    IBC_CCF MONEY,
	    fec_cau DATETIME
					);
    DECLARE @VG136 BIT;
    DECLARE @VG148 BIT;
    DECLARE @FechaInicio DATETIME = EOMONTH(DATEADD(MONTH, -1, @Fch_Data));
    DECLARE @FechaFin DATETIME = DATEADD(DAY, 1, EOMONTH(@Fch_Data));
    DECLARE @SucursaSS TABLE(
	    SucursalSS CHAR(10)
					   );
    DECLARE @nPer CHAR(2);
    DECLARE @nAno CHAR(4);
    DECLARE @NumRad CHAR(10);
    SELECT @Fch_PrxPer = DATEADD(MONTH, 1, @Fch_Data);
    SELECT @cCodCia = RTRIM(@cCodCiaPar);

    SELECT @nPer = RIGHT('00' + RTRIM(CONVERT(CHAR(2), MONTH(@Fch_Data))), 2);
    SELECT @nAno = CONVERT(CHAR(4), YEAR(@Fch_Data));
    SET @NumRad = '<' + RIGHT(REPLICATE('0', 8) + CONVERT(VARCHAR, ROUND(1000000 * RAND(), 0)), 8) + '>';

    SET @VG136 = CONVERT(BIT, dbo.fn_rhh_VG( 136, @Fch_Data ));
    SET @VG148 = CONVERT(BIT, dbo.fn_rhh_VG( 148, @Fch_Data ));
    SET @nVg60 = CONVERT(MONEY, dbo.fn_rhh_VG( 60, @Fch_Data ));

    SET @VG181 = CONVERT(BIT, dbo.fn_rhh_VG( 181, @Fch_Data ));

    SET @VG136 = ISNULL(@VG136, 0);
    SET @VG148 = ISNULL(@VG148, 0);

    DECLARE @TipReg TABLE(
	    Tip_reg CHAR(2)
					);

    INSERT INTO @TipReg
    SELECT Tip_reg
    FROM Rhh_SStipReg
    WHERE tip_RegRel <> 'N';

    INSERT INTO @TipReg
    VALUES
		 (
		 'PP' );

    IF OBJECT_ID('TempDb..#t_ErrorPL') IS NULL
    BEGIN
	   CREATE TABLE #t_Error(
		   cod_error INT,
		   error     VARCHAR(1000) COLLATE DATABASE_DEFAULT NULL,
		   ano       CHAR(4) COLLATE DATABASE_DEFAULT NULL,
		   per       CHAR(2) COLLATE DATABASE_DEFAULT NULL,
		   NumTemp   CHAR(10) COLLATE DATABASE_DEFAULT NULL
					    );
    END;

    SELECT Cod_emp,
		 fec_cte,
		 ind_vst,
		 Ind_sueldo
    INTO #rhh_liqhis
    FROM rhh_liqhis
    WHERE fec_cte > @FechaInicio AND fec_cte < @FechaFin;

    IF EXISTS( SELECT *
			FROM tempdb..sysobjects
			WHERE name LIKE('##t_RegTip02') )
    BEGIN
	   DROP TABLE [dbo].[##t_RegTip02];
    END;
    IF @cSucSSPar = ''
    BEGIN
	   SET @cSucSSPar = '%';
    END;

    IF @cSucSSPar = '%'
    BEGIN
	   INSERT INTO @SucursaSS( SucursalSS )
	   SELECT suc_ss
	   FROM rhh_sucursalSS;
	   INSERT INTO @SucursaSS( SucursalSS )
	   VALUES
			(
			'' );
    END;
	   ELSE
    BEGIN
	   INSERT INTO @SucursaSS
	   SELECT Suc_ss
	   FROM rhh_sucursalSS
	   WHERE Suc_ss = @cSucSSPar;
    END;

    SELECT @nErrores = 0;

    IF OBJECT_ID('TempDb..#t_rhh_HisSS') IS NOT NULL
    BEGIN
	   TRUNCATE TABLE #t_rhh_HisSS;
    END;
	   ELSE
    BEGIN
	   CREATE TABLE [dbo].[#t_rhh_hisss](
		   [serial]              [INT] IDENTITY(1, 1) NOT NULL PRIMARY KEY,
		   [cod_emp]             [CHAR](12) COLLATE DATABASE_DEFAULT NOT NULL,
		   [tip_liq]             [CHAR](2) COLLATE DATABASE_DEFAULT NOT NULL,
		   [tip_reg]             [CHAR](2) COLLATE DATABASE_DEFAULT NOT NULL
														DEFAULT('N'),
		   [fec_cau]             [DATETIME] NOT NULL,
		   [fec_cte]             [DATETIME] NOT NULL,
		   [fdo_sal]             [CHAR](4) COLLATE DATABASE_DEFAULT NULL,
		   [fdo_pen]             [CHAR](4) COLLATE DATABASE_DEFAULT NULL,
		   [fdo_ate]             [CHAR](4) COLLATE DATABASE_DEFAULT NULL,
		   [dia_sal]             [SMALLINT] NULL
									 DEFAULT((0)),
		   [dia_pen]             [SMALLINT] NULL
									 DEFAULT((0)),
		   [dia_rie]             [SMALLINT] NULL
									 DEFAULT((0)),
		   [bas_sal]             [MONEY] NULL
								   DEFAULT((0)),
		   [bas_pen]             [MONEY] NULL
								   DEFAULT((0)),
		   [bas_rie]             [MONEY] NULL
								   DEFAULT((0)),
		   [ibc_sal]             [MONEY] NULL
								   DEFAULT((0)),
		   [ibc_pen]             [MONEY] NULL
								   DEFAULT((0)),
		   [ibc_rie]             [MONEY] NULL
								   DEFAULT((0)),
		   [por_sal]             [FLOAT] NULL
								   DEFAULT((0)),
		   [por_pen]             [FLOAT] NULL
								   DEFAULT((0)),
		   [por_rie]             [FLOAT] NULL
								   DEFAULT((0)),
		   [vap_sal]             [MONEY] NULL
								   DEFAULT((0)),
		   [vap_pen]             [MONEY] NULL
								   DEFAULT((0)),
		   [vap_rie]             [MONEY] NULL
								   DEFAULT((0)),
		   [vae_sal]             [MONEY] NULL
								   DEFAULT((0)),
		   [vae_pen]             [MONEY] NULL
								   DEFAULT((0)),
		   [vae_fsp]             [MONEY] NULL
								   DEFAULT((0)),
		   [vvp_sal]             [MONEY] NULL
								   DEFAULT((0)),
		   [vvp_pen]             [MONEY] NULL
								   DEFAULT((0)),
		   [vvp_rie]             [MONEY] NULL
								   DEFAULT((0)),
		   [vve_sal]             [MONEY] NULL
								   DEFAULT((0)),
		   [vve_pen]             [MONEY] NULL
								   DEFAULT((0)),
		   [vve_rie]             [MONEY] NULL
								   DEFAULT((0)),
		   [nro_ieg]             [CHAR](10) COLLATE DATABASE_DEFAULT NULL
														 DEFAULT(' '),
		   [val_ieg]             [MONEY] NULL
								   DEFAULT((0)),
		   [nro_ilm]             [CHAR](10) COLLATE DATABASE_DEFAULT NULL
														 DEFAULT(' '),
		   [val_ilm]             [MONEY] NULL
								   DEFAULT((0)),
		   [upc_emp]             [MONEY] NULL
								   DEFAULT((0)),
		   [pac_emp]             [MONEY] NULL
								   DEFAULT((0)),
		   [dia_irp]             [SMALLINT] NULL
									 DEFAULT((0)),
		   [sal_bas]             [MONEY] NULL
								   DEFAULT((0)),
		   [nov_ing]             [CHAR](1) COLLATE DATABASE_DEFAULT NULL
														DEFAULT(' '),
		   [nov_ret]             [CHAR](1) COLLATE DATABASE_DEFAULT NULL
														DEFAULT(' '),
		   [nov_tdas]            [CHAR](1) COLLATE DATABASE_DEFAULT NULL
														DEFAULT(' '),
		   [nov_taas]            [CHAR](1) COLLATE DATABASE_DEFAULT NULL
														DEFAULT(' '),
		   [nov_tdap]            [CHAR](1) COLLATE DATABASE_DEFAULT NULL
														DEFAULT(' '),
		   [nov_taap]            [CHAR](1) COLLATE DATABASE_DEFAULT NULL
														DEFAULT(' '),
		   [nov_tdar]            [CHAR](1) COLLATE DATABASE_DEFAULT NULL
														DEFAULT(' '),
		   [nov_taar]            [CHAR](1) COLLATE DATABASE_DEFAULT NULL
														DEFAULT(' '),
		   [nov_vsp]             [CHAR](1) COLLATE DATABASE_DEFAULT NULL
														DEFAULT(' '),
		   [nov_vte]             [CHAR](1) COLLATE DATABASE_DEFAULT NULL
														DEFAULT(' '),
		   [nov_vst]             [CHAR](1) COLLATE DATABASE_DEFAULT NULL
														DEFAULT(' '),
		   [dia_sln]             [SMALLINT] NOT NULL
									 DEFAULT((0)),
		   [nov_sln]             [CHAR](1) COLLATE DATABASE_DEFAULT NULL
														DEFAULT(' '),
		   [nov_slr]             [CHAR](1) COLLATE DATABASE_DEFAULT NULL
														DEFAULT(' '),
		   [nov_ige]             [CHAR](1) COLLATE DATABASE_DEFAULT NULL
														DEFAULT(' '),
		   [nov_lma]             [CHAR](1) COLLATE DATABASE_DEFAULT NULL
														DEFAULT(' '),
		   [nov_vac]             [CHAR](1) COLLATE DATABASE_DEFAULT NULL
														DEFAULT(' '),
		   [nov_avp]             [CHAR](1) COLLATE DATABASE_DEFAULT NULL
														DEFAULT(' '),
		   [nov_vct]             [CHAR](1) COLLATE DATABASE_DEFAULT NULL
														DEFAULT(' '),
		   [nrt_avp]             [MONEY] NULL
								   DEFAULT((0)),
		   [per_liq]             [CHAR](2) COLLATE DATABASE_DEFAULT NULL,
		   [cod_cont]            [INT] NULL,
		   [fdo_ccf]             [CHAR](4) COLLATE DATABASE_DEFAULT NULL
														DEFAULT('0'),
		   [dia_ccf]             [SMALLINT] NULL
									 DEFAULT((0)),
		   [ibc_ccf]             [MONEY] NULL
								   DEFAULT((0)),
		   [ibc_sena]            [MONEY] NULL
								   DEFAULT((0)),
		   [ibc_icbf]            [MONEY] NULL
								   DEFAULT((0)),
		   [por_ccf]             [FLOAT] NULL
								   DEFAULT((0)),
		   [por_sena]            [FLOAT] NULL
								   DEFAULT((0)),
		   [por_icbf]            [FLOAT] NULL
								   DEFAULT((0)),
		   [por_eit]             [FLOAT] NULL
								   DEFAULT((0)),
		   [por_esap]            [FLOAT] NULL
								   DEFAULT((0)),
		   [vap_ccf]             [MONEY] NULL
								   DEFAULT((0)),
		   [vap_sena]            [MONEY] NULL
								   DEFAULT((0)),
		   [vap_icbf]            [MONEY] NULL
								   DEFAULT((0)),
		   [vap_eit]             [MONEY] NULL
								   DEFAULT((0)),
		   [vap_esap]            [MONEY] NULL
								   DEFAULT((0)),
		   [IDL_Num]             [BIGINT] NOT NULL
								    DEFAULT((0)),
		   [ley1607]             [CHAR](1) COLLATE DATABASE_DEFAULT NULL
														DEFAULT('N'),
		   [fec_sal]             [DATETIME] NOT NULL
									 DEFAULT('19000101'),
		   [ind_PreExist]        [BIT] DEFAULT((0)),
		   [vae_fsubsis]         [MONEY] NULL
								   DEFAULT((0)),
		   [cod_cia]             [CHAR](3) COLLATE DATABASE_DEFAULT NULL
														DEFAULT('0'),
		   [FechaIngreso]        [DATETIME] NOT NULL
									 DEFAULT('19000101'),
		   [FechaRetiro]         [DATETIME] NOT NULL
									 DEFAULT('19000101'),
		   [FechaInicioVSP]      [DATETIME] NOT NULL
									 DEFAULT('19000101'),
		   [FechaInicioSLN]      [DATETIME] NOT NULL
									 DEFAULT('19000101'),
		   [FechafinSLN]         [DATETIME] NOT NULL
									 DEFAULT('19000101'),
		   [FechaInicioIEG]      [DATETIME] NOT NULL
									 DEFAULT('19000101'),
		   [FechafinIEG]         [DATETIME] NOT NULL
									 DEFAULT('19000101'),
		   [FechaInicioLMA]      [DATETIME] NOT NULL
									 DEFAULT('19000101'),
		   [FechafinLMA]         [DATETIME] NOT NULL
									 DEFAULT('19000101'),
		   [FechaInicioVac]      [DATETIME] NOT NULL
									 DEFAULT('19000101'),
		   [FechafinVac]         [DATETIME] NOT NULL
									 DEFAULT('19000101'),
		   [FechaInicioVct]      [DATETIME] NOT NULL
									 DEFAULT('19000101'),
		   [FechafinVct]         [DATETIME] NOT NULL
									 DEFAULT('19000101'),
		   [FechaInicioIrl]      [DATETIME] NOT NULL
									 DEFAULT('19000101'),
		   [FechafinIrl]         [DATETIME] NOT NULL
									 DEFAULT('19000101'),
		   [IBCOtParaf]          [MONEY] NOT NULL
								   DEFAULT((0)),
		   [HorasLab]            [MONEY] NOT NULL
								   DEFAULT((0)),
		   [cer_nro]             VARCHAR(20) COLLATE DATABASE_DEFAULT NOT NULL
														  DEFAULT(('')),
		   [FechaInicialNovedad] [DATETIME] NOT NULL
									 DEFAULT('19000101'),
		   [FechaFinalNovedad]   [DATETIME] NOT NULL
									 DEFAULT('19000101'),
								 )
    ON [PRIMARY];

	   CREATE NONCLUSTERED INDEX IX_HisSS ON #t_rhh_HisSS( tip_reg, cod_emp, cod_cont, fec_cau, fec_cte );
	   CREATE NONCLUSTERED INDEX IX_HisSS_Serial ON #t_rhh_HisSS( serial, tip_reg, cod_emp, cod_cont, fec_cau, fec_cte );
    END;

    SET IDENTITY_INSERT #t_rhh_HisSS ON;

    INSERT INTO #t_rhh_HisSS( serial,
						cod_emp,
						tip_liq,
						tip_reg,
						fec_cau,
						fec_cte,
						fdo_sal,
						fdo_pen,
						fdo_ate,
						dia_sal,
						dia_pen,
						dia_rie,
						bas_sal,
						bas_pen,
						bas_rie,
						ibc_sal,
						ibc_pen,
						ibc_rie,
						por_sal,
						por_pen,
						por_rie,
						vap_sal,
						vap_pen,
						vap_rie,
						vae_sal,
						vae_pen,
						vae_fsp,
						vvp_sal,
						vvp_pen,
						vvp_rie,
						vve_sal,
						vve_pen,
						vve_rie,
						nro_ieg,
						val_ieg,
						nro_ilm,
						val_ilm,
						upc_emp,
						pac_emp,
						dia_irp,
						sal_bas,
						nov_ing,
						nov_ret,
						nov_tdas,
						nov_taas,
						nov_tdap,
						nov_taap,
						nov_tdar,
						nov_taar,
						nov_vsp,
						nov_vte,
						nov_vst,
						dia_sln,
						nov_sln,
						nov_slr,
						nov_ige,
						nov_lma,
						nov_vac,
						nov_avp,
						nov_vct,
						nrt_avp,
						per_liq,
						cod_cont,
						fdo_ccf,
						dia_ccf,
						ibc_ccf,
						ibc_sena,
						ibc_icbf,
						por_ccf,
						por_sena,
						por_icbf,
						por_eit,
						por_esap,
						vap_ccf,
						vap_sena,
						vap_icbf,
						vap_eit,
						vap_esap,
						IDL_Num,
						ley1607,
						fec_sal,
						ind_PreExist,
						vae_fsubsis,
						cod_cia,
						FechaIngreso,
						FechaRetiro,
						FechaInicioVSP,
						FechaInicioSLN,
						FechafinSLN,
						FechaInicioIEG,
						FechafinIEG,
						FechaInicioLMA,
						FechafinLMA,
						FechaInicioVac,
						FechafinVac,
						FechaInicioVct,
						FechafinVct,
						FechaInicioIrl,
						FechafinIrl,
						IBCOtParaf,
						HorasLab,
						cer_nro,
						FechaInicialNovedad,
						FechaFinalNovedad
					   )
    SELECT serial,
		 cod_emp,
		 tip_liq,
		 tip_reg,
		 fec_cau,
		 fec_cte,
		 fdo_sal,
		 fdo_pen,
		 fdo_ate,
		 dia_sal,
		 dia_pen,
		 dia_rie,
		 bas_sal,
		 bas_pen,
		 bas_rie,
		 ibc_sal,
		 ibc_pen,
		 ibc_rie,
		 por_sal,
		 por_pen,
		 por_rie,
		 vap_sal,
		 vap_pen,
		 vap_rie,
		 vae_sal,
		 vae_pen,
		 vae_fsp,
		 vvp_sal,
		 vvp_pen,
		 vvp_rie,
		 vve_sal,
		 vve_pen,
		 vve_rie,
		 nro_ieg,
		 val_ieg,
		 nro_ilm,
		 val_ilm,
		 upc_emp,
		 pac_emp,
		 dia_irp,
		 sal_bas,
		 nov_ing,
		 nov_ret,
		 nov_tdas,
		 nov_taas,
		 nov_tdap,
		 nov_taap,
		 nov_tdar,
		 nov_taar,
		 nov_vsp,
		 nov_vte,
		 nov_vst,
		 dia_sln,
		 nov_sln,
		 nov_slr,
		 nov_ige,
		 nov_lma,
		 nov_vac,
		 nov_avp,
		 nov_vct,
		 nrt_avp,
		 per_liq,
		 cod_cont,
		 fdo_ccf,
		 dia_ccf,
		 ibc_ccf,
		 ibc_sena,
		 ibc_icbf,
		 por_ccf,
		 por_sena,
		 por_icbf,
		 por_eit,
		 por_esap,
		 vap_ccf,
		 vap_sena,
		 vap_icbf,
		 vap_eit,
		 vap_esap,
		 IDL_Num,
		 ley1607,
		 fec_sal,
		 1,
		 vae_fsubsis,
		 cod_cia,
		 FechaIngreso,
		 FechaRetiro,
		 FechaInicioVSP,
		 FechaInicioSLN,
		 FechafinSLN,
		 FechaInicioIEG,
		 FechafinIEG,
		 FechaInicioLMA,
		 FechafinLMA,
		 FechaInicioVac,
		 FechafinVac,
		 FechaInicioVct,
		 FechafinVct,
		 FechaInicioIrl,
		 FechafinIrl,
		 IBCOtParaf,
		 HorasLab,
		 cer_nro,
		 CASE FechaInicioIEG
			WHEN '19000101' THEN CASE FechaInicioSLN
								WHEN '19000101' THEN CASE FechaInicioLMA
													WHEN '19000101' THEN CASE FechaInicioIRL
																		WHEN '19000101' THEN FechaInicioVac
																		ELSE FechaInicioIRL
																	 END
													ELSE FechaInicioLMA
												 END
								ELSE FechaInicioSLN
							 END
			ELSE FechaInicioIEG
		 END,
		 CASE FechafinIEG
			WHEN '19000101' THEN CASE FechafinSLN
								WHEN '19000101' THEN CASE FechafinLMA
													WHEN '19000101' THEN CASE FechafinIrl
																		WHEN '19000101' THEN FechaFinVac
																		ELSE FechafinIRL
																	 END
													ELSE FechafinLMA
												 END
								ELSE FechafinSLN
							 END
			ELSE FechafinIEG
		 END
    FROM rhh_HisSS
    WHERE fec_cau > @FechaInicio AND Fec_cau < @FechaFin AND Cod_cia LIKE @cCodCia;

/** Se reemplazan los registros con la fecha de causación al último día del mes para optimizar la ejecución en las consultas
    y realizar las validaciones por mes**/
    UPDATE #t_rhh_hisss
	 SET fec_cau = EOMONTH(@Fch_Data);

    /**Se actualiza el día de la incapacidad que empieza el 31 del mes ya que estas se reportan obligatoriamente**/
    UPDATE #t_rhh_hisss
	 SET dia_sal = 1,
		dia_pen = 1,
		dia_rie = 1,
		dia_ccf = 1
    WHERE DAY(FechaInicioIEG) = 31
		AND DAY(FechafinIEG) = 31
		AND FechaInicioIEG = FechafinIEG
		AND Tip_reg = 'I'
		AND Dia_sal = 0;

    SET IDENTITY_INSERT #t_rhh_HisSS OFF;

    WITH VALORES
	    AS (SELECT COD_EMP,
				fec_cau,
				ROW_NUMBER() OVER(PARTITION BY COD_EMP,
										 fec_cau
				ORDER BY COD_EMP,
					    fec_cau) AS NRO,
				SUM(IBC_PEN) OVER(PARTITION BY COD_EMP,
										 fec_cau) AS ibc_pen,
				SUM(VAE_PEN) OVER(PARTITION BY COD_EMP,
										 fec_cau) AS vae_pen,
				SUM(vap_pen) OVER(PARTITION BY COD_EMP,
										 fec_cau) AS vap_pen
		   FROM #T_RHH_HISSS
		   WHERE(VAE_PEN + vap_pen) <> 0 OR IBC_PEN <> 0)
	    SELECT *
	    INTO #t_valores
	    FROM valores
	    WHERE ibc_pen <> 0 AND NRO = 1;

    UPDATE #t_rhh_hisss
	 SET POR_PEN = 16
    FROM #T_RHH_HISSs AS H
    INNER JOIN #t_valores AS v ON h.cod_emp = v.cod_emp AND h.fec_cau = v.fec_cau AND v.ibc_pen <> 0
    WHERE(V.vae_pen / V.ibc_pen) > 0.03
    AND (h.por_pen <> 0 AND v.vae_pen <> 0
	   )
    AND por_pen IN( 0, 3 );

    UPDATE #t_rhh_hisss
	 SET POR_PEN = 3
    FROM #T_RHH_HISSs AS H
    INNER JOIN #t_valores AS v ON h.cod_emp = v.cod_emp AND h.fec_cau = v.fec_cau AND v.ibc_pen <> 0
    WHERE((V.vae_pen + V.vap_pen) / V.ibc_pen) < 0.0037
    AND (h.por_pen <> 0 AND v.vae_pen <> 0
	   )
    AND H.nov_sln <> 'x';

    UPDATE #t_rhh_hisss
	 SET POR_PEN = 12.75
    WHERE fec_cau > '20200401'
		AND fec_cau < '20200601'
		AND fec_cte > '20210101'
		AND vae_pen = 0
		AND nov_sln <> 'x';

    WITH Porcentaje
	    AS (SELECT MAX(fec_cau) AS FEC_CAU,
				cod_emp AS Cod_emp,
				MAX(SERIAL) AS serial,
				H.tip_reg AS tip_reg,
				T.Tip_regRel
		   FROM #t_rhh_hisss AS H
		   INNER JOIN rhh_SSTipReg AS T ON T.Tip_reg = H.tip_reg
		   WHERE por_pen <> 0
		   GROUP BY Cod_emp,
				  H.tip_reg,
				  T.Tip_regRel)
	    SELECT P.Cod_emp,
			 Tip_regRel,
			 por_pen
	    INTO #t_Por_pen
	    FROM Porcentaje AS P
	    INNER JOIN #t_rhh_hisss AS H ON H.cod_emp = p.Cod_emp AND h.fec_cau = p.FEC_CAU AND h.serial = p.serial;

    UPDATE #t_rhh_hisss
	 SET por_pen = t.por_pen
    FROM #t_rhh_hisss AS H
    INNER JOIN rhh_SSTipReg AS R ON r.Tip_reg = h.Tip_reg
    INNER JOIN #t_Por_pen AS T ON T.Cod_emp = h.cod_emp AND t.Tip_regRel = r.Tip_regRel;

    /*** Se revisa si hay interrupciones de la proyección para actualizar las fechas**/

    WITH LNR
	    AS (SELECT CER_NRO,
				VAE_SAL,
				TIP_REG,
				POR_SAL,
				cod_emp
		   FROM #T_rhh_hisss
		   WHERE nov_sln = 'X' AND TIP_REG = 'L')

	    UPDATE #T_rhh_hisss
		 SET Por_sal = L.por_sal
	    FROM #T_rhh_hisss AS HS
	    INNER JOIN LNR AS l ON HS.cer_nro = L.Cer_nro AND HS.cod_emp = L.cod_emp
	    WHERE HS.vae_sal = 0 AND HS.tip_reg = 'LC';

    /*** se excluyen los registros de proyección ya que tienen un manejo diferente ***/
    WITH D31
	    AS (SELECT SUM(Dia_sal) OVER(PARTITION BY Cod_emp) AS totdias,
				dia_sal,
				Cod_emp,
				tip_reg,
				FechaFinalNovedad,
				FechaInicialNovedad,
				serial
		   FROM #t_rhh_HisSS
		   WHERE Dia_sal <> 0 AND Tip_reg <> 'P'),
	    DIFERENCIA
	    AS (SELECT ROW_NUMBER() OVER(PARTITION BY Cod_emp
				ORDER BY Cod_emp,
					    FechaFinalNovedad DESC) AS NID,
				dia_sal,
				Cod_emp,
				tip_reg,
				FechaFinalNovedad,
				FechaInicialNovedad,
				totdias - 30 AS diferencia,
				serial
		   FROM D31
		   WHERE Totdias > 30 AND (Dia_sal - (Totdias - 30)) > 0)

	    UPDATE #t_rhh_HisSS
		 SET Dia_sal = H.dia_sal - D.diferencia,
			dia_pen = H.dia_pen - D.diferencia,
			dia_rie = H.dia_rie - D.diferencia,
			dia_ccf = H.dia_ccf - D.diferencia,
			dia_irp = CASE
					    WHEN h.dia_irp > 0 THEN H.dia_irp - D.diferencia
					END
	    FROM #t_rhh_HisSS AS H
	    INNER JOIN DIFERENCIA AS D ON H.serial = D.serial
	    WHERE D.NID = 1;

    UPDATE #t_rhh_HisSS
	 SET fdo_sal = dbo.fn_Rhh_FondoFch_Cont( cod_emp, 2, @Fch_Data, cod_cont, 0 ),
		fdo_pen = dbo.fn_Rhh_FondoFch_Cont( cod_emp, 1, @Fch_Data, cod_cont, 0 ),
		fdo_ate = dbo.fn_Rhh_FondoFch_Cont( cod_emp, 3, @Fch_Data, cod_cont, 0 ),
		fdo_ccf = dbo.fn_Rhh_FondoFch_Cont( cod_emp, 4, @Fch_Data, cod_cont, 0 );

    UPDATE #t_rhh_HisSS
	 SET Ibc_sena = 0
    WHERE ibc_sena IS NULL;
    UPDATE #t_rhh_HisSS
	 SET ibc_icbf = 0
    WHERE ibc_sena IS NULL;

    UPDATE #t_rhh_HisSS
	 SET Tip_reg = 'N',
		fec_sal = '',
		FechaInicioVac = '',
		FechafinVac = '',
		nov_vac = ''
    FROM #t_rhh_hisss AS H
    INNER JOIN Rhh_SStipReg AS TS ON H.tip_reg = TS.Tip_reg
    WHERE TS.Tip_regRel = 'V'
		AND TS.Tip_reg <> 'P'
		AND H.dia_sal = 0
		AND H.dia_pen = 0
		AND H.fec_sal > @Fch_Data;

    /********************************/
    --Se establecen las variables del empleado a la fecha del proceso
    /********************************/

    SELECT cod_emp COLLATE database_default AS cod_emp,
		 num_ide,
		 ISNULL(ap1_emp, '') AS ap1_emp,
		 ISNULL(ap2_emp, '') AS ap2_emp,
		 ISNULL(nom_emp, '') AS nom_emp,
		 tip_ide,
		 fec_ing,
		 fec_egr,
		 ccf_emp,
		 tip_cot,
		 cod_cia,
		 cod_suc,
		 cod_cco,
		 cod_cl1,
		 cod_cl2,
		 cod_cl3,
		 cod_cl4,
		 cod_cl5,
		 cod_cl6,
		 cod_cl7,
		 cod_car,
		 sal_bas,
		 tip_con,
		 est_lab,
		 dbo.fn_rhh_ValParmConv( Cod_emp, @Fch_Data, 'cod_tlq' ) AS cod_tlq,
		 emp_pen,
		 dbo.fn_rhh_ValParmCont( Cod_emp, @Fch_Data, 'cla_sal', 1 ) AS cla_sal, --cla_sal,
		 dbo.fn_rhh_ModoEmp( Cod_emp, @Fch_Data ) AS mod_liq,
		 CONVERT(DATETIME, NULL) AS fec_ret,
		 ind_extjero,
		 ind_resi_extjero,
		 SubTip_Cot,
		 '0000000000' AS suc_SS,
		 CONVERT(VARCHAR(15), NULL) AS cod_conv,
		 CONVERT(BIGINT, NULL) AS cod_cont,
		 CONVERT(DATETIME, NULL) AS fec_ini,
		 @idl_num AS idl_num,
		 ind_pdias,
		 dbo.fn_rhh_ValParmCont( Cod_emp, @Fch_Data, 'horas_dia', 1 ) AS horas_mes,
		 por_ate,
		 ind_pencomp,
		 tip_pen,
		 ind_penpagext,
		 nom1_emp,
		 nom2_emp,
		 dpt_res,
		 ciu_res,
		 pen_emp,
		 CONVERT(CHAR(3), NULL) AS conv_suc,
		 CONVERT(VARCHAR(30), NULL) AS conv_cco,
		 CONVERT(VARCHAR(12), NULL) AS conv_cl1,
		 CONVERT(VARCHAR(12), NULL) AS conv_cl2,
		 CONVERT(VARCHAR(12), NULL) AS conv_cl3,
		 CONVERT(VARCHAR(12), NULL) AS conv_cl4,
		 CONVERT(VARCHAR(12), NULL) AS conv_cl5,
		 CONVERT(VARCHAR(12), NULL) AS conv_cl6,
		 CONVERT(VARCHAR(12), NULL) AS conv_cl7,
		 CONVERT(VARCHAR(12), NULL) AS conv_cl8,
		 CONVERT(INT, NULL) AS conv_estruc,
		 NULL AS Num_sec,
		 CONVERT(BIT, 0) AS Ind_ValNeto
    INTO #t_rhh_emplea
    FROM rhh_emplea
    WHERE cod_emp = 'XXXXXXXXXXXX';

    CREATE NONCLUSTERED INDEX [IX_#T_emplea_a] ON [dbo].[#t_rhh_emplea]( [cod_emp], [cod_cont]
														 )
	    INCLUDE( [fec_egr] );
    CREATE NONCLUSTERED INDEX [IX_#T_emplea_b] ON [dbo].[#t_rhh_emplea]( [cod_cia], [suc_SS]
														 )
	    INCLUDE( [cod_emp], [num_ide], [cod_cont] );

    IF @Tip_Planilla = 'Y'
    BEGIN
	   EXEC sp_rhh_GenSS01 @Fch_Data,
					   '%',
					   0,
					   1;
    END;
	   ELSE
    BEGIN
	   EXEC sp_rhh_GenSS01 @Fch_Data;

	   IF @Tip_Planilla = 'K'
	   BEGIN
		  DELETE #t_rhh_emplea
		  WHERE Tip_cot <> '23';

	   END;
		  ELSE
	   BEGIN
		  DELETE #t_rhh_emplea
		  WHERE Tip_cot = '23';
	   END;
    END;

    IF @Tip_Planilla = 'N'
    BEGIN
	   SELECT @Fch_PlaAso = fch_pag
	   FROM Rhh_PlaUnica_Reg01
	   WHERE Num_Rad = @NumPlaAsoc;

	   DELETE #t_rhh_emplea
	   FROM #t_rhh_emplea AS e
	   WHERE e.num_ide NOT IN( SELECT NumIde_Em
						  FROM Rhh_PlaUnica_Reg02
						  WHERE Num_Rad = @NumPlaAsoc AND ano = @nAno AND per = @nPer );

    END;

    IF( SELECT emp_apl
	   FROM SIS_APLICACION
	   WHERE COD_APL = 'NOM' ) = 'A'
    BEGIN
	   WITH Retiros
		   AS (SELECT Cod_emp,
				    cod_cont
			  FROM #t_rhh_hisss
			  WHERE tip_reg = 'P' AND nov_ret = 'X')
		   UPDATE #t_rhh_hisss
			SET Nov_ret = 'X'
		   FROM #t_rhh_hisss AS H
		   INNER JOIN Retiros AS R ON H.cod_emp = R.cod_emp AND H.cod_cont = R.cod_cont AND H.tip_reg IN( 'N', 'A' );

	   SELECT E.cod_emp,
			MAX(E.fec_ing) AS FecIng
	   INTO #T_EmpleaProyecc
	   FROM #t_rhh_hisss AS H
	   INNER JOIN #t_rhh_emplea AS E ON H.cod_emp = E.cod_emp
	   WHERE Tip_reg = 'P' AND dia_sal < 0
	   GROUP BY E.cod_emp;

	   UPDATE #t_rhh_hisss
		SET FechafinVac = DATEADD(DAY, -1, P.FecIng)
	   FROM #t_rhh_hisss AS H
	   INNER JOIN #T_EmpleaProyecc P ON H.Cod_emp = P.cod_emp
	   WHERE H.tip_reg = 'P' AND P.FecIng < H.FechafinVac AND H.FechafinVac > '19000101';

    END;
    ------------------------------------------------------------
    /*********************************/
    --Registro Tipo 1
    --Datos Generales del Aportante
    /*********************************/
/*
Obtener el código de ARP para la compañia
*/
    SELECT TOP 1 @cCodFdoARP = dbo.fn_Rhh_FondoFch( E.cod_emp, 3, @Fch_Data, 0 )
    FROM #T_rhh_emplea AS E
    INNER JOIN #t_rhh_hisss AS HS ON HS.cod_emp = e.cod_emp AND E.cod_cont = HS.cod_cont
    INNER JOIN rhh_TipCon AS T ON E.tip_con = T.tip_con AND T.apo_rie = 1
    INNER JOIN @SucursaSS AS S ON E.suc_SS = S.SucursalSS
    WHERE HS.cod_cia LIKE @cCodCia AND e.tip_cot NOT IN( '12' );

    SELECT @cCod_sgs_ARP = RTRIM(cod_sgs)
    FROM rhh_TbFondos
    WHERE cod_fdo = @cCodFdoARP;
/*
Determinar El número de empleados
*/

    SELECT @nTotEmp = COUNT(DISTINCT HS.cod_emp),
		 @nValNom = SUM(HS.ibc_ccf)
    FROM #t_rhh_HisSS AS HS
    INNER JOIN #T_rhh_emplea AS E ON E.cod_emp = HS.cod_emp AND E.cod_cont = HS.cod_cont
    INNER JOIN @SucursaSS AS S ON E.suc_SS = S.SucursalSS;
    --WHERE E.cod_cia LIKE @cCodCia;
    /** Se pone en blanco la novedad de retiro para el caso en que la liquidación de contrato este en prenomina y no van a retirar el empleado***/
    UPDATE #t_rhh_HisSS
	 SET NOV_RET = ''
    FROM #t_rhh_HisSS HS
    WHERE Tip_liq NOT IN( '04', '54', '24' ) AND nov_ret <> 'P';

    /**Se actualiza la fecha de retiro para los empleados que tienen la fecha de retiro en el mes que se esta procesando y no se ha realizado liquidación de contrato**/

    UPDATE #t_rhh_HisSS
	 SET NOV_RET = 'X',
		FechaRetiro = E.Fec_ret
    FROM #t_rhh_HisSS S
    INNER JOIN #t_rhh_emplea AS E ON E.Cod_emp = S.cod_emp AND E.cod_cont = S.cod_cont
    WHERE E.fec_ret > @FechaInicio
		AND E.fec_ret < @FechaFin
		AND nov_ret NOT IN( 'X', 'P' )
    AND S.Tip_liq NOT IN( '04', '54', '24' )
    AND E.est_lab NOT IN( '04' );

    /**** Se actualiza la sucursal de Seguridad Social para los empleados que tienen proyección y no tienen días trabajados***/

    /***SRS 2014-996****/

    UPDATE #T_RHH_EMPLEA
	 SET suc_SS = HL.suc_SS
    FROM #T_RHH_EMPLEA E
    INNER JOIN #t_rhh_HisSS HS ON E.cod_emp = HS.cod_emp AND E.cod_cont = HS.cod_cont
    INNER JOIN Rhh_hislab HL ON E.cod_emp = HL.cod_emp AND E.cod_cont = HL.cod_con
    WHERE Tip_reg = 'P' AND HL.Fec_ret = E.fec_egr;

/*
Determinar el valor del IBC de los parafiscales
Se anticipa entonces todo lo de parafiscales 
que será usado en el registro tipo 2 
*/
    SELECT @Tar_SalInt = CONVERT(NUMERIC(9, 5), dbo.fn_rhh_VG( 75, @Fch_Data )); /*Tarifa para salarios integrales*/
    SELECT @nom_suc = RTRIM(descripcion)
    FROM rhh_sucursalSS
    WHERE suc_SS = RTRIM(@cSucSSPar);

/*
Armar Registro Tipo 1
*/
    SELECT '01' AS Tip_Reg,
		 1 AS Modal_plani,
		 IDENTITY( BIGINT, 1, 1) AS Secuen,
		 GC.nom_cia AS Razon_Soc,
		 'NI' AS TipIde_Apo, /*Pos 1-4*/
		 CONVERT(CHAR(16), REPLACE(REPLACE(GC.nit_cia, '.', ''), '-', '')) AS NumIde_Apo, /*Pos 5*/
		 GC.dig_ver AS DigVer_Apo,
		 @Tip_Planilla AS Tip_planilla,
		 CASE @Tip_Planilla
			WHEN 'E' THEN CONVERT(CHAR, NULL)
			WHEN 'N' THEN @NumPlaAsoc
		 END AS Num_Planill_Aso, /*Pos 6 - 8*/
		 CASE @Tip_Planilla
			WHEN 'E' THEN CONVERT(CHAR, NULL)
			WHEN 'N' THEN CONVERT(CHAR(4), YEAR(DATEADD(MONTH, 1, @Fch_PlaAso))) + '-' + RIGHT('00' + RTRIM(CONVERT(CHAR(2), MONTH(@Fch_PlaAso))),
			2) + '-' + RIGHT('00' + RTRIM(CONVERT(CHAR(2), DAY(@Fch_PlaAso))), 2)
		 END AS Fch_Planill_Aso, /*Pos 9*/
		 --UPPER(CONVERT(CHAR(1),dbo.fn_rhh_VG(125,@Fch_Data))) AS FormaPresent, SPACE(10) AS Cod_Suc, SPACE(40) AS Nom_Suc, @cCod_sgs_ARP AS Cod_ARP, /*Pos 10 - 13*/
		 UPPER(CONVERT(CHAR(1), dbo.fn_rhh_VG( 125, @Fch_Data ))) AS FormaPresent, /*Pos 10*/
		 CASE UPPER(CONVERT(CHAR(1), dbo.fn_rhh_VG( 125, @Fch_Data )))
			WHEN 'S' THEN @cSucSSPar
			ELSE SPACE(10)
		 END AS Cod_Suc, /*Pos 11*/
		 CASE UPPER(CONVERT(CHAR(1), dbo.fn_rhh_VG( 125, @Fch_Data )))
			WHEN 'S' THEN @nom_suc
			ELSE SPACE(40)
		 END AS Nom_Suc, /*Pos 12*/
		 @cCod_sgs_ARP AS Cod_ARP, /*Pos 13*/
		 CONVERT(CHAR(4), YEAR(@Fch_Data)) + '-' + RIGHT('00' + RTRIM(CONVERT(CHAR(2), MONTH(@Fch_Data))), 2) AS Per_PRC, /*Pos 14*/
		 CONVERT(CHAR(4), YEAR(DATEADD(MONTH, 1, @Fch_Data))) + '-' + RIGHT('00' + RTRIM(CONVERT(CHAR(2), MONTH(DATEADD(MONTH, 1, @Fch_Data)))), 2)
		 AS Per_SAL, /*Pos 15*/
		 CONVERT(BIGINT, NULL) AS Num_Rad,
		 CONVERT(DATETIME, NULL) AS Fch_Pag,
		 @nTotEmp AS Num_Emp, /*Pos 16-18*/
		 @nValNom AS Val_Nom,
		 CASE @VG181
			WHEN 1 THEN CONVERT(TINYINT, 5)
			ELSE CONVERT(TINYINT, 1)
		 END AS Tip_Apor,
    --CONVERT(  TINYINT, 1) AS Tip_Apor, 
		 0 AS Cod_Ope /*Pos 19-21*/
    INTO #T_RegTip01
    FROM gen_compania AS GC
    WHERE GC.cod_cia IN( SELECT DISTINCT
						  cod_cia
					FROM #t_rhh_emplea )
		AND GC.cod_cia LIKE @cCodCia;

    /*********************************/
    --Registro Tipo 2
    --Liquidación detallada de aportes
    /*********************************/

/*
Agrupar los datos de seguridad Social en un registro por empleado
**/
    SELECT HS.[cod_emp],
		 HS.Cod_cont,
		 fdo_sal AS fdo_sal,
		 HS.[fdo_pen] AS Fdo_pen,
		 fdo_ate AS fdo_ate,
		 hs.[fec_cau] AS Fec_cau,
		 HS.tip_reg AS Tip_reg,
		 HS.[dia_sal] AS dia_sal,
		 HS.[dia_pen] AS dia_pen,
		 HS.[dia_rie] AS dia_rie,
		 HS.[bas_sal] AS bas_sal,
		 HS.[bas_pen] AS bas_pen,
		 HS.[bas_rie] AS bas_rie,
		 HS.[ibc_sal] AS ibc_sal,
		 HS.[ibc_pen] AS ibc_pen,
		 HS.[ibc_rie] AS ibc_rie,
		 HS.[por_sal] AS por_sal,
		 HS.[por_pen] AS por_pen,
		 HS.[por_rie] AS por_rie,
		 HS.[vap_sal] AS vap_sal,
		 HS.[vap_pen] AS vap_pen,
		 HS.[vap_rie] AS vap_rie,
		 HS.[vae_sal] AS vae_sal,
		 HS.[vae_pen] AS vae_pen,
		 HS.[vae_fsp] AS vae_fsp,
		 HS.[vae_fsubsis] AS vae_fsp_subsist,
		 HS.[vvp_sal] AS vvp_sal,
		 HS.[vvp_pen] AS vvp_pen,
		 HS.[vvp_rie] AS vvp_rie,
		 HS.[vve_sal] AS vve_sal,
		 HS.[vve_pen] AS vve_pen,
		 HS.[vve_rie] AS vve_rie,
		 HS.[nro_ieg] AS nro_ieg,
		 HS.[val_ieg] AS val_ieg,
		 HS.[nro_ilm] AS nro_ilm,
		 HS.[val_ilm] AS val_ilm,
		 HS.[upc_emp] AS upc_emp,
		 HS.[dia_irp] AS dia_irp,
		 HS.[sal_bas] AS sal_bas,
		 HS.[nov_ing] AS nov_ing,
		 HS.[nov_ret] AS nov_ret,
		 HS.[nov_tdas] AS nov_tdas,
		 HS.[nov_taas] AS nov_taas,
		 HS.[nov_tdap] AS nov_tdap,
		 HS.[nov_taap] AS nov_taap,
		 HS.[nov_tdar] AS nov_tdar,
		 HS.[nov_taar] AS nov_taar,
		 HS.[nov_vsp] AS nov_vsp,
		 HS.[nov_vte] AS nov_vte,
		 HS.[nov_vst] AS nov_vst,
		 HS.[dia_sln] AS dia_sln,
		 HS.[nov_sln] AS nov_sln,
		 HS.[nov_slr] AS nov_slr,
		 HS.[nov_ige] AS nov_ige,
		 HS.[nov_lma] AS nov_lma,
		 HS.[nov_vac] AS nov_vac,
		 HS.[nov_avp] AS nov_avp,
		 HS.[nov_vct] AS nov_vct,
		 HS.[nrt_avp] AS nrt_avp,
		 HS.[ibc_ccf] AS ibc_ccf,
		 HS.[dia_ccf] AS dia_ccf,
		 HS.[por_ccf] AS por_ccf,
		 HS.[vap_ccf] AS vap_ccf,
		 HS.[por_sena] AS por_sena,
		 HS.[vap_sena] AS vap_sena,
		 HS.[por_icbf] AS por_icbf,
		 HS.[vap_icbf] AS vap_icbf,
		 HS.[por_eit] AS por_eit,
		 HS.[vap_eit] AS vap_eit,
		 HS.[por_esap] AS por_esap,
		 HS.[vap_esap] AS vap_esap,
		 HS.[fdo_ccf] AS Fdo_ccf,
		 HS.Cod_cont AS Cod_cont2,
		 HS.FechaIngreso AS FechaIngreso,
		 HS.FechaRetiro AS FechaRetiro,
		 HS.FechaInicioVSP AS FechaInicioVSP,
		 HS.FechaInicioSLN AS FechaInicioSLN,
		 HS.FechafinSLN AS FechafinSLN,
		 HS.FechaInicioIEG AS FechaInicioIEG,
		 HS.FechafinIEG AS FechafinIEG,
		 HS.FechaInicioLMA AS FechaInicioLMA,
		 HS.FechafinLMA AS FechafinLMA,
		 HS.FechaInicioVac AS FechaInicioVac,
		 HS.FechafinVac AS FechafinVac,
		 HS.FechaInicioVct AS FechaInicioVct,
		 HS.FechafinVct AS FechafinVct,
		 HS.FechaInicioIrl AS FechaInicioIrl,
		 HS.FechafinIrl AS FechafinIrl,
		 HS.IBCOtParaf AS IBCOtParaf,
		 HS.HorasLab AS HorasLab,
		 HS.Cer_nro AS Cer_nro,
		 HS.fec_sal AS Fec_sal,
		 HS.vae_fsubsis AS vae_fsubsis,
		 HS.IDL_Num AS Idl_num
    INTO #T_RHH_DATOSSS
    FROM #t_rhh_HisSS AS HS;

    /**/    /**/    /* Indexo la temporal para ganar rendimiento en el proceso de generacion del plano */
    CREATE NONCLUSTERED INDEX [IX_#T_rhh_datosss_a] ON [dbo].[#T_RHH_DATOSSS]( [cod_emp], [Cod_cont], [fec_cau], [idl_num]
															  );

    WITH Proyeccion
	    AS (SELECT ROW_NUMBER() OVER(PARTITION BY Cod_emp
				ORDER BY Cod_emp) AS NID,
				MAX(Nov_ret) OVER(PARTITION BY Cod_emp
				ORDER BY Cod_emp) AS Nov_ret,
				MAX(tip_liq) OVER(PARTITION BY Cod_emp
				ORDER BY Cod_emp) AS Tip_liq,
				Cod_cont,
				cod_emp
		   FROM #t_rhh_HisSS AS HS
		   WHERE hs.tIP_REG = 'P')

	    UPDATE #T_RHH_DATOSSS
		 SET Cod_cont = P.Cod_cont
	    FROM #T_RHH_DATOSSS D
	    INNER JOIN Proyeccion P ON P.Cod_emp = D.cod_emp
	    WHERE P.NID = 1 AND p.Nov_ret = '' AND P.Tip_liq = '04';

    /*** Se actualiza el porcentaje de riesgo con el último liquidado para ser reportado en la planilla Unica***/

    WITH SELECCION
	    AS (SELECT cod_emp,
				ROW_NUMBER() OVER(PARTITION BY Cod_emp
				ORDER BY Cod_emp) AS NID,
				MAX(fec_cau) OVER(PARTITION BY Cod_emp
				ORDER BY Cod_emp) AS fmax,
				MAX(idl_num) OVER(PARTITION BY Cod_emp
				ORDER BY Cod_emp) AS idl
		   FROM #T_RHH_DATOSSS)

	    UPDATE #T_RHH_DATOSSS
		 SET por_rie = D.Por_rie
	    FROM( SELECT h.por_rie,
				  s.Cod_emp
			FROM SELECCION AS S
			INNER JOIN #T_RHH_DATOSSS AS h ON s.cod_emp = h.cod_emp AND h.fec_cau = s.fmax AND h.IDL_Num = idl
			WHERE s.NID = 1 AND h.por_rie > 0 AND dia_sal > 0 ) AS D
	    INNER JOIN #T_RHH_DATOSSS AS DT ON D.cod_emp = dt.cod_emp
	    WHERE DT.por_rie > 0;

    /**/    /**/    /* Se lleva el valor de la variable 94 a una variable para no usar en todos los registros la funcion VG */
    DECLARE @vg94 NUMERIC(5, 3)= CONVERT(NUMERIC(5, 3), dbo.fn_rhh_VG( 94, @Fch_Data ));
    /** se borra de la selección los registros 'PP' Y 'AP' en los cuales se escribia el calculo de parafiscales en la versión 2***/
    DELETE FROM #T_RHH_DATOSSS
    WHERE Tip_reg IN( 'PP', 'AP' );
    /**Se separan  los registros de nómina de los de las demás novedades ***/
    SELECT HS.[cod_emp],
		 E.num_ide,
		 HS.cod_cont AS Cod_cont,
		 MAX([fdo_sal]) AS fdo_sal,
		 MAX(HS.[fdo_pen]) AS Fdo_pen,
		 MAX(HS.[fdo_ate]) AS fdo_ate,
		 SUM(HS.[dia_sal]) AS dia_sal,
		 SUM(HS.[dia_pen]) AS dia_pen,
		 SUM(HS.[dia_rie]) AS dia_rie,
		 CONVERT(BIGINT, SUM(HS.[bas_sal])) AS bas_sal,
		 CONVERT(BIGINT, SUM(HS.[bas_pen])) AS bas_pen,
		 CONVERT(BIGINT, SUM(HS.[bas_rie])) AS bas_rie,
		 CONVERT(BIGINT, SUM(HS.[ibc_sal])) AS ibc_sal,
		 CONVERT(BIGINT, SUM(HS.[ibc_pen])) AS ibc_pen,
		 CONVERT(BIGINT, SUM(HS.[ibc_rie])) AS ibc_rie,
		 MAX(HS.[por_sal]) AS por_sal,
		 MAX(HS.[por_pen]) AS por_pen,
		 MAX(HS.[por_rie]) AS por_rie,
		 CONVERT(BIGINT, SUM(HS.[vap_sal])) AS vap_sal,
		 CONVERT(BIGINT, SUM(HS.[vap_pen])) AS vap_pen,
		 CONVERT(BIGINT, SUM(HS.[vap_rie])) AS vap_rie,
		 CONVERT(BIGINT, SUM(HS.[vae_sal])) AS vae_sal,
		 CONVERT(BIGINT, SUM(HS.[vae_pen])) AS vae_pen,
		 CONVERT(BIGINT, SUM(HS.[vae_fsp])) AS vae_fsp,
		 CONVERT(BIGINT, SUM(HS.[vae_fsp_subsist])) AS vae_fsubsis,
		 CONVERT(BIGINT, SUM(HS.[vvp_sal])) AS vvp_sal,
		 CONVERT(BIGINT, SUM(HS.[vvp_pen])) AS vvp_pen,
		 CONVERT(BIGINT, SUM(HS.[vvp_rie])) AS vvp_rie,
		 CONVERT(BIGINT, SUM(HS.[vve_sal])) AS vve_sal,
		 CONVERT(BIGINT, SUM(HS.[vve_pen])) AS vve_pen,
		 CONVERT(BIGINT, SUM(HS.[vve_rie])) AS vve_rie,
		 MAX(HS.[nro_ieg]) AS nro_ieg,
		 CONVERT(BIGINT, SUM(HS.[val_ieg])) AS val_ieg,
		 MAX(HS.[nro_ilm]) AS nro_ilm,
		 CONVERT(BIGINT, SUM(HS.[val_ilm])) AS val_ilm,
		 CASE CONVERT(NUMERIC(5, 3), dbo.fn_rhh_VG( 54, @Fch_Data ))
			WHEN 0 THEN 0
			ELSE CONVERT(BIGINT, SUM(HS.[upc_emp]))
		 END AS upc_emp,
		 SUM(HS.[dia_irp]) AS dia_irp,
		 CONVERT(BIGINT, MAX(HS.[sal_bas])) AS sal_bas,
		 MAX(HS.[nov_ing]) AS nov_ing,
		 MAX(HS.[nov_ret]) AS nov_ret,
		 MAX(HS.[nov_tdas]) AS nov_tdas,
		 MAX(HS.[nov_taas]) AS nov_taas,
		 MAX(HS.[nov_tdap]) AS nov_tdap,
		 MAX(HS.[nov_taap]) AS nov_taap,
		 MAX(HS.[nov_tdar]) AS nov_tdar,
		 MAX(HS.[nov_taar]) AS nov_taar,
		 MAX(HS.[nov_vsp]) AS nov_vsp,
		 MAX(HS.[nov_vte]) AS nov_vte,
		 MAX(HS.[nov_vst]) AS nov_vst,
		 SUM(HS.[dia_sln]) AS dia_sln,
		 CASE CONVERT(NUMERIC(5, 3), dbo.fn_rhh_VG( 94, @Fch_Data ))
			WHEN 1 THEN ''
			ELSE MAX(HS.[nov_sln])
		 END AS nov_sln,
		 MAX(HS.[nov_slr]) AS nov_slr,
		 MAX(HS.[nov_ige]) AS nov_ige,
		 MAX(HS.[nov_lma]) AS nov_lma,
		 MAX(HS.[nov_vac]) AS nov_vac,
		 MAX(HS.[nov_avp]) AS nov_avp,
		 MAX(HS.[nov_vct]) AS nov_vct,
		 CONVERT(BIGINT, SUM(HS.[nrt_avp])) AS nrt_avp,
		 CONVERT(BIGINT, SUM(HS.[ibc_ccf])) AS base_ccf,
		 SUM(HS.[dia_ccf]) AS dia_ccf,
		 MAX(HS.[por_ccf]) AS por_ccf,
		 CONVERT(BIGINT, SUM(HS.[vap_ccf])) AS vap_ccf,
		 MAX(HS.[por_sena]) AS por_sena,
		 CONVERT(BIGINT, SUM(HS.[vap_sena])) AS vap_sena,
		 MAX(HS.[por_icbf]) AS por_icbf,
		 CONVERT(BIGINT, SUM(HS.[vap_icbf])) AS vap_icbf,
		 MAX(HS.[por_eit]) AS por_eit,
		 CONVERT(BIGINT, SUM(HS.[vap_eit])) AS vap_eit,
		 MAX(HS.[por_esap]) AS por_esap,
		 CONVERT(BIGINT, SUM(HS.[vap_esap])) AS vap_esap,
		 CASE MAX(HS.[fdo_ccf])
			WHEN '0' THEN ''
			ELSE MAX(HS.[fdo_ccf])
		 END AS Fdo_ccf,
		 ' ' AS ClaseRiesgo,
		 ' ' AS TarEspPen,
		 MAX(HS.FechaIngreso) AS FechaIngreso,
		 MAX(HS.FechaRetiro) AS FechaRetiro,
		 MAX(HS.FechaInicioVSP) AS FechaInicioVSP,
		 MAX(HS.FechaInicioSLN) AS FechaInicioSLN,
		 MAX(HS.FechafinSLN) AS FechafinSLN,
		 MAX(HS.FechaInicioIEG) AS FechaInicioIEG,
		 MAX(HS.FechafinIEG) AS FechafinIEG,
		 MAX(HS.FechaInicioLMA) AS FechaInicioLMA,
		 MAX(HS.FechafinLMA) AS FechafinLMA,
		 MAX(HS.FechaInicioVac) AS FechaInicioVac,
		 MAX(HS.FechafinVac) AS FechafinVac,
		 MAX(HS.FechaInicioVct) AS FechaInicioVct,
		 MAX(HS.FechafinVct) AS FechafinVct,
		 MAX(HS.FechaInicioIrl) AS FechaInicioIrl,
		 MAX(HS.FechafinIrl) AS FechafinIrl,
		 CONVERT(BIGINT, SUM(HS.IBCOtParaf)) AS IBCOtParaf,
		 CONVERT(INT, SUM(HS.[dia_sal]) * dbo.fn_rhh_ValParmCont( HS.cod_emp, @Fch_Data, 'horas_dia', 0 )) AS HorasLab,
		 MAX(Fec_cau) AS Fec_Cau,
		 '0000000' AS ciiu
    INTO #t_rhh_HiSGSS
    FROM #T_RHH_DATOSSS AS HS
    INNER JOIN #t_rhh_emplea AS E ON E.cod_emp = HS.cod_emp AND E.cod_cont = HS.cod_cont
							  -- AND E.cod_cia LIKE @cCodCia
							  AND E.suc_SS LIKE @cSucSSPar
    LEFT JOIN @TipReg AS TP ON TP.Tip_reg = HS.Tip_reg
    WHERE Tp.Tip_reg IS NULL
    GROUP BY HS.[cod_emp],
		   E.[num_ide],
		   HS.cod_cont
    ORDER BY HS.[cod_emp],
		   E.[num_ide],
		   HS.cod_cont;

    CREATE NONCLUSTERED INDEX [IX_#t_rhh_HiSGSS_a] ON [dbo].[#t_rhh_HiSGSS]( [cod_emp], [Cod_cont], [fec_cau] );

    /*** Se identifican los empleados que tienen novedades de nómina sin días y ausentismos ***/

    WITH Novedad
	    AS (SELECT HS.serial,
				HS.cod_emp,
				HS.tip_liq,
				HS.tip_reg,
				HS.fec_cau,
				HS.fec_cte,
				HS.fdo_sal,
				HS.fdo_pen,
				HS.fdo_ate,
				HS.dia_sal,
				HS.dia_pen,
				HS.dia_rie,
				HS.bas_sal,
				HS.bas_pen,
				HS.bas_rie,
				HS.ibc_sal,
				HS.ibc_pen,
				HS.ibc_rie,
				HS.por_sal,
				HS.por_pen,
				HS.por_rie,
				HS.vap_sal,
				HS.vap_pen,
				HS.vap_rie,
				HS.vae_sal,
				HS.vae_pen,
				HS.vae_fsp,
				HS.vvp_sal,
				HS.vvp_pen,
				HS.vvp_rie,
				HS.vve_sal,
				HS.vve_pen,
				HS.vve_rie,
				HS.nro_ieg,
				HS.val_ieg,
				HS.nro_ilm,
				HS.val_ilm,
				HS.upc_emp,
				HS.pac_emp,
				HS.dia_irp,
				HS.sal_bas,
				HS.nov_ing,
				HS.nov_ret,
				HS.nov_tdas,
				HS.nov_taas,
				HS.nov_tdap,
				HS.nov_taap,
				HS.nov_tdar,
				HS.nov_taar,
				HS.nov_vsp,
				HS.nov_vte,
				HS.nov_vst,
				HS.dia_sln,
				HS.nov_sln,
				HS.nov_slr,
				HS.nov_ige,
				HS.nov_lma,
				HS.nov_vac,
				HS.nov_avp,
				HS.nov_vct,
				HS.nrt_avp,
				HS.per_liq,
				HS.cod_cont,
				HS.fdo_ccf,
				HS.dia_ccf,
				HS.ibc_ccf,
				HS.ibc_sena,
				HS.ibc_icbf,
				HS.por_ccf,
				HS.por_sena,
				HS.por_icbf,
				HS.por_eit,
				HS.por_esap,
				HS.vap_ccf,
				HS.vap_sena,
				HS.vap_icbf,
				HS.vap_eit,
				HS.vap_esap,
				HS.IDL_Num,
				HS.ley1607,
				HS.fec_sal,
				HS.ind_PreExist,
				HS.vae_fsubsis,
				HS.cod_cia,
				HS.FechaIngreso,
				HS.FechaRetiro,
				HS.FechaInicioVSP,
				HS.FechaInicioSLN,
				HS.FechafinSLN,
				HS.FechaInicioIEG,
				HS.FechafinIEG,
				HS.FechaInicioLMA,
				HS.FechafinLMA,
				HS.FechaInicioVac,
				HS.FechafinVac,
				HS.FechaInicioVct,
				HS.FechafinVct,
				HS.FechaInicioIrl,
				HS.FechafinIrl,
				HS.IBCOtParaf,
				HS.HorasLab,
				HS.cer_nro
		   FROM #T_RHH_HISSS AS HS
		   INNER JOIN(
			   SELECT Cod_emp,
					Cod_cont
			   FROM #t_rhh_HiSGSS
			   WHERE Dia_sal = 0 AND Dia_pen = 0
				   ) AS DT ON HS.Cod_emp = DT.cod_emp AND HS.cod_cont = dt.Cod_cont
		   INNER JOIN @TipReg AS TP ON TP.Tip_reg = HS.Tip_reg)
	    SELECT ROW_NUMBER() OVER(PARTITION BY cod_emp,
									  cod_cont,
									  fec_cau
			 ORDER BY CER_NRO DESC) AS NID,
			 cod_emp,
			 cod_cont,
			 Tip_Reg,
			 cer_nro,
			 FechaInicioIEG,
			 FechafinIEG,
			 FechaInicioLMA,
			 FechafinLMA,
			 FechaInicioVac,
			 FechafinVac,
			 FechaInicioIrl,
			 FechafinIrl,
			 fec_sal,
			 fec_cau,
			 FechaInicioSLN,
			 FechafinSLN
	    INTO #T_NOVEDAD2
	    FROM NOVEDAD;

    /**Se actualizan los registros con valores en nómina sin días trabajados con los registros de los ausentismos**/
    UPDATE #T_RHH_DATOSSS
	 SET tip_reg = N.tip_reg,
		cer_nro = N.cer_nro,
		FechaInicioIEG = N.FechaInicioIEG,
		FechafinIEG = N.FechafinIEG,
		FechaInicioLMA = N.FechaInicioLMA,
		FechafinLMA = N.FechafinLMA,
		FechaInicioVac = N.FechaInicioVac,
		FechafinVac = N.FechafinVac,
		FechaInicioIrl = N.FechaInicioIrl,
		FechafinIrl = N.FechafinIrl,
		fec_sal = N.fec_sal,
		fechaIniciosln = N.FechaInicioSLN,
		FechaFinSln = N.FechafinSLN
    FROM #T_RHH_DATOSSS AS SS
    LEFT JOIN @TipReg AS TP ON TP.Tip_reg = SS.Tip_reg
    INNER JOIN( SELECT Cod_emp,
				   cer_nro,
				   cod_cont,
				   Fec_cau,
				   tip_reg,
				   FechaInicioIEG,
				   FechafinIEG,
				   FechaInicioLMA,
				   FechafinLMA,
				   FechaInicioVac,
				   FechaInicioIrl,
				   FechafinIrl,
				   fec_sal,
				   FechafinVac,
				   FechaInicioSLN,
				   FechafinSLN
			 FROM #T_NOVEDAD2
			 WHERE nid = 1 ) AS N ON N.Cod_emp = SS.cod_emp AND N.Fec_cau = ss.fec_cau AND N.cod_cont = ss.cod_cont
    WHERE Tp.Tip_reg IS NULL;

    DELETE #t_rhh_HiSGSS
    WHERE Dia_sal = 0 AND Dia_pen = 0 AND Dia_rie = 0;

    UPDATE #t_rhh_HiSGSS
	 SET por_rie = 0
    WHERE dia_rie = 0;

    UPDATE #t_rhh_HiSGSS
	 SET ClaseRiesgo = CT.ClaseRiesgo,
		TarEspPen = ct.TarEspecPens,
		ciiu = CASE
				 WHEN @Fch_Data > '20221031' THEN CONCAT(CT.ClaseRiesgo, CT.CodCIIU, CT.Codigo)
				 ELSE '0000000'
			  END
    FROM #t_rhh_HiSGSS AS HS
    INNER JOIN rhh_hislab H ON HS.cod_emp = h.cod_emp
						 AND num_sec = [dbo].[fn_rhh_Hislab_NumSec_cont]( hs.cod_emp, cod_cont, @Fch_Data, 0, 1 )
    INNER JOIN rhh_CentroTrab AS CT ON CT.cod_CT = H.cod_CT;

    SELECT HS.[cod_emp],
		 E.num_ide,
		 HS.cod_cont,
		 MAX([fdo_sal]) AS fdo_sal,
		 MAX(HS.[fdo_pen]) AS Fdo_pen,
		 MAX(HS.[fdo_ate]) AS fdo_ate,
		 SUM(HS.[dia_sal]) AS dia_sal,
		 SUM(HS.[dia_pen]) AS dia_pen,
		 SUM(HS.[dia_rie]) AS dia_rie,
		 CONVERT(BIGINT, SUM(HS.[bas_sal])) AS bas_sal,
		 CONVERT(BIGINT, SUM(HS.[bas_pen])) AS bas_pen,
		 CONVERT(BIGINT, SUM(HS.[bas_rie])) AS bas_rie,
		 CONVERT(BIGINT, SUM(HS.[ibc_sal])) AS ibc_sal,
		 CONVERT(BIGINT, SUM(HS.[ibc_pen])) AS ibc_pen,
		 CONVERT(BIGINT, SUM(HS.[ibc_rie])) AS ibc_rie,
		 MAX(HS.[por_sal]) AS por_sal,
		 MAX(HS.[por_pen]) AS por_pen,
		 MAX(HS.[por_rie]) AS por_rie,
		 CONVERT(BIGINT, SUM(HS.[vap_sal])) AS vap_sal,
		 CONVERT(BIGINT, SUM(HS.[vap_pen])) AS vap_pen,
		 CONVERT(BIGINT, SUM(HS.[vap_rie])) AS vap_rie,
		 CONVERT(BIGINT, SUM(HS.[vae_sal])) AS vae_sal,
		 CONVERT(BIGINT, SUM(HS.[vae_pen])) AS vae_pen,
		 CONVERT(BIGINT, SUM(HS.[vae_fsp])) AS vae_fsp,
		 CONVERT(BIGINT, SUM(HS.[vae_fsubsis])) AS vae_fsubsis,
		 CONVERT(BIGINT, SUM(HS.[vvp_sal])) AS vvp_sal,
		 CONVERT(BIGINT, SUM(HS.[vvp_pen])) AS vvp_pen,
		 CONVERT(BIGINT, SUM(HS.[vvp_rie])) AS vvp_rie,
		 CONVERT(BIGINT, SUM(HS.[vve_sal])) AS vve_sal,
		 CONVERT(BIGINT, SUM(HS.[vve_pen])) AS vve_pen,
		 CONVERT(BIGINT, SUM(HS.[vve_rie])) AS vve_rie,
		 MAX(HS.[nro_ieg]) AS nro_ieg,
		 CONVERT(BIGINT, SUM(HS.[val_ieg])) AS val_ieg,
		 MAX(HS.[nro_ilm]) AS nro_ilm,
		 CONVERT(BIGINT, SUM(HS.[val_ilm])) AS val_ilm,
		 CASE CONVERT(NUMERIC(5, 3), dbo.fn_rhh_VG( 54, @Fch_Data ))
			WHEN 0 THEN 0
			ELSE CONVERT(BIGINT, SUM(HS.[upc_emp]))
		 END AS upc_emp,
		 SUM(HS.[dia_irp]) AS dia_irp,
		 CONVERT(BIGINT, MAX(HS.[sal_bas])) AS sal_bas,
		 '' AS nov_ing,
		 MAX(Nov_ret) AS nov_ret,
		 '' AS nov_tdas,
		 '' AS nov_taas,
		 '' AS nov_tdap,
		 '' AS nov_taap,
		 '' AS nov_tdar,
		 '' AS nov_taar,
		 '' AS nov_vsp,
		 '' AS nov_vte,
		 '' AS nov_vst,
		 SUM(HS.[dia_sln]) AS dia_sln,
		 MAX(HS.[nov_sln]) AS nov_sln,
		 MAX(HS.nov_slr) AS nov_slr,
		 MAX(HS.nov_ige) AS nov_ige,
		 MAX(HS.nov_lma) AS nov_lma,
		 MAX(HS.nov_vac) AS nov_vac,
		 '' AS nov_avp,
		 '' AS nov_vct,
		 '' AS nrt_avp,
		 CONVERT(BIGINT, SUM(HS.[ibc_ccf])) AS base_ccf, --Se reporta el ibc de salud, ya que en registros de ausentismo no se aporta
		 SUM(HS.[dia_ccf]) AS dia_ccf, --Se reporta el ibc de salud, ya que en registros de ausentismo no se aporta
		 MAX(HS.[por_ccf]) AS por_ccf,
		 CONVERT(BIGINT, SUM(HS.[vap_ccf])) AS vap_ccf,
		 MAX(HS.[por_sena]) AS por_sena,
		 CONVERT(BIGINT, SUM(HS.[vap_sena])) AS vap_sena,
		 MAX(HS.[por_icbf]) AS por_icbf,
		 CONVERT(BIGINT, SUM(HS.[vap_icbf])) AS vap_icbf,
		 MAX(HS.[por_eit]) AS por_eit,
		 CONVERT(BIGINT, SUM(HS.[vap_eit])) AS vap_eit,
		 MAX(HS.[por_esap]) AS por_esap,
		 CONVERT(BIGINT, SUM(HS.[vap_esap])) AS vap_esap,
		 CASE MAX(HS.[fdo_ccf])
			WHEN 0 THEN ''
			ELSE MAX(HS.[fdo_ccf])
		 END AS Fdo_ccf,
		 ' ' AS ClaseRiesgo,
		 ' ' AS TarEspPen,
		 MAX(HS.FechaIngreso) AS FechaIngreso,
		 MAX(HS.FechaRetiro) AS FechaRetiro,
		 MAX(HS.FechaInicioVSP) AS FechaInicioVSP,
		 MAX(HS.FechaInicioSLN) AS FechaInicioSLN,
		 MAX(HS.FechafinSLN) AS FechafinSLN,
		 MAX(HS.FechaInicioIEG) AS FechaInicioIEG,
		 MAX(HS.FechafinIEG) AS FechafinIEG,
		 MAX(HS.FechaInicioLMA) AS FechaInicioLMA,
		 MAX(HS.FechafinLMA) AS FechafinLMA,
		 MAX(HS.FechaInicioVac) AS FechaInicioVac,
		 MAX(HS.FechafinVac) AS FechafinVac,
		 MAX(HS.FechaInicioVct) AS FechaInicioVct,
		 MAX(HS.FechafinVct) AS FechafinVct,
		 MAX(HS.FechaInicioIrl) AS FechaInicioIrl,
		 MAX(HS.FechafinIrl) AS FechafinIrl,
		 CONVERT(BIGINT, SUM(IBCOtParaf)) AS IBCOtParaf, --Se reporta el ibc de salud, ya que en registros de ausentismo no se aporta
		 CONVERT(INT, SUM(HS.HorasLab)) AS HorasLab,
		 MAX(Cla_sal) AS Cla_sal,
		 HS.Cer_nro AS Cer_nro,
		 '0000000' AS Ciiu
    INTO #t_rhh_HiSGSS_L
    FROM #T_RHH_DATOSSS AS HS /**/	    /**/	    /* Se cambia la condicion en las fechas y se usa la variable declarada @VG94 para hacer un poco mas eficiente el procedimiento */
    INNER JOIN #t_rhh_emplea AS E ON E.cod_emp = HS.cod_emp AND E.cod_cont = HS.cod_cont
							  --AND E.cod_cia LIKE @cCodCia
							  AND E.suc_SS LIKE @cSucSSPar
    INNER JOIN @TipReg AS TP ON TP.Tip_reg = HS.tip_reg
    WHERE HS.fec_cau >= DATEADD(DAY, 1, EOMONTH(DATEADD(month, -1, @Fch_Data)))
		AND HS.fec_cau <= EOMONTH(@Fch_Data)
		AND HS.Tip_reg NOT IN(
						  'PP', 'AP'
						 )
    GROUP BY HS.[cod_emp],
		   E.[num_ide],
		   HS.cod_cont,
		   hs.cer_nro,
		   HS.FechaInicioIEG,
		   HS.FechaInicioSLN,
		   HS.FechaInicioLMA,
		   HS.FechaInicioIrl,
		   HS.FechaInicioVac,
		   HS.fec_sal,
		   HS.Nov_ret;

    CREATE NONCLUSTERED INDEX [IX_#t_rhh_HiSGSS_L_a] ON [dbo].[#t_rhh_HiSGSS_L]( [cod_emp], [Cod_cont] );

    /**Se borran los registros con dias y valores en cero **/
    DELETE #t_rhh_HiSGSS_L
    WHERE dia_sal = 0
		AND dia_pen = 0
		AND dia_rie = 0
		AND dia_ccf = 0
		AND ibc_sal = 0
		AND ibc_pen = 0
		AND Ibc_rie = 0
		AND vap_sal = 0
		AND vae_sal = 0
		AND vap_rie = 0
		AND vap_pen = 0
		AND vae_pen = 0;

    /*20170330*/

    UPDATE #t_rhh_HiSGSS_L
	 SET ClaseRiesgo = CT.ClaseRiesgo,
		TarEspPen = ct.TarEspecPens,
		ciiu = CASE
				 WHEN @Fch_Data > '20221031' THEN CONCAT(CT.ClaseRiesgo, CT.CodCIIU, CT.Codigo)
				 ELSE '0000000'
			  END
    FROM #t_rhh_HiSGSS_L AS HS
    INNER JOIN rhh_hislab H ON HS.cod_emp = h.cod_emp
						 AND num_sec = [dbo].[fn_rhh_Hislab_NumSec_cont]( hs.cod_emp, cod_cont, @Fch_Data, 0, 1 )
    INNER JOIN rhh_CentroTrab AS CT ON CT.cod_CT = H.cod_CT;

    WITH DiaCero
	    AS (SELECT Cod_emp AS '1',
				*
		   FROM #t_rhh_HiSGSS_L
		   WHERE Dia_sal = 0 AND dia_pen = 0 AND dia_rie = 0 AND ibc_sal <> 0)
	    SELECT CASE L.FechaInicioIEG
				WHEN '19000101' THEN CASE L.FechaInicioSLN
									WHEN '19000101' THEN CASE L.FechaInicioLMA
														WHEN '19000101' THEN CASE L.FechaInicioIRL
																			WHEN '19000101' THEN L.FechaInicioVac
																			ELSE L.FechaInicioIRL
																		 END
														ELSE L.FechaInicioLMA
													 END
									ELSE L.FechaInicioSLN
								 END
				ELSE L.FechaInicioIEG
			 END AS FECHA,
			 L.*
	    INTO #T_DIA31
	    FROM #t_rhh_HiSGSS_L AS L
	    INNER JOIN DIACERO AS D ON L.Cod_emp = D.cod_emp
	    WHERE l.bas_rie = 0 AND (l.dia_sal > 1 OR l.dia_sal = 0
						   );

    WITH NIRN
	    AS (SELECT ROW_NUMBER() OVER(PARTITION BY Cod_emp
				ORDER BY Cod_emp,
					    Fecha DESC) AS id,
				*
		   FROM #T_DIA31)

	    UPDATE #t_rhh_HiSGSS_L
		 SET Dia_sal = CASE L.DIA_SAL
					    WHEN 0 THEN 1
					    ELSE L.Dia_sal - 1
					END,
			Dia_pen = CASE L.Dia_pen
					    WHEN 0 THEN 1
					    ELSE L.Dia_pen - 1
					END,
			Dia_rie = CASE L.Dia_ccf
					    WHEN 0 THEN 1
					    ELSE L.Dia_ccf - 1
					END,
			Dia_ccf = CASE L.Dia_rie
					    WHEN 0 THEN 1
					    ELSE L.Dia_rie - 1
					END,
			Dia_irp = CASE L.Dia_irp
					    WHEN 0 THEN 0
					    ELSE L.Dia_rie - 1
					END
	    FROM #t_rhh_HiSGSS_L AS L
	    INNER JOIN NIRN AS D ON L.Cod_emp = D.Cod_emp
						   AND L.FechaInicioIEG = D.FechaInicioIEG
						   AND L.FechaInicioSLN = D.FechaInicioSLN
						   AND L.FechaInicioLMA = D.FechaInicioLMA
						   AND L.FechaInicioIRL = D.FechaInicioIRL
						   AND L.FechaInicioVac = D.FechaInicioVac
	    WHERE D.ID < 3;

    UPDATE #t_rhh_HiSGSS_L
	 SET SAL_BAS = CASE
				    WHEN(dia_sal <> 0 AND ibc_sal <> 0
					   ) THEN CASE
							    WHEN ROUND((ibc_sal / dia_sal) * 30, 0) < ibc_sal THEN ibc_sal
							    ELSE ROUND((ibc_sal / dia_sal) * 30, 0)
							END
				END
    WHERE FechaInicioSLN > '19000101' AND Cla_sal = 0;

    DECLARE @inicioMes DATETIME = DATEADD(DAY, 1, EOMONTH(DATEADD(MONTH, -1, @Fch_Data)));

    UPDATE #t_rhh_HiSGSS_L
	 SET dia_pen = 0
    WHERE ibc_pen = 0;

    UPDATE #t_rhh_HiSGSS_L
	 SET FechaInicioSLN = @inicioMes
    WHERE FechaInicioSLN < @inicioMes AND FechaInicioSLN > '19000101';

    UPDATE #t_rhh_HiSGSS_L
	 SET FechafinSLN = @Fch_Data
    WHERE FechafinSLN > @Fch_Data;

    UPDATE #t_rhh_HiSGSS_L
	 SET FechaInicioIEG = @inicioMes
    WHERE FechaInicioIEG < @inicioMes AND FechaInicioIEG > '19000101';

    UPDATE #t_rhh_HiSGSS_L
	 SET FechafinIEG = @Fch_Data
    WHERE FechafinIEG > @Fch_Data;

    UPDATE #t_rhh_HiSGSS_L
	 SET FechaInicioLMA = @inicioMes
    WHERE FechaInicioLMA < @inicioMes AND FechaInicioLMA > '19000101';

    UPDATE #t_rhh_HiSGSS_L
	 SET FechafinLMA = @Fch_Data
    WHERE FechafinLMA > @Fch_Data;

    UPDATE #t_rhh_HiSGSS_L
	 SET FechaInicioVac = @inicioMes
    WHERE FechaInicioVac < @inicioMes AND FechaInicioVac > '19000101';

    UPDATE #t_rhh_HiSGSS_L
	 SET FechafinVac = @Fch_Data
    WHERE FechafinVac > @Fch_Data;

    UPDATE #t_rhh_HiSGSS_L
	 SET FechaInicioIrl = @inicioMes
    WHERE FechaInicioIrl < @inicioMes AND FechaInicioIrl > '19000101';

    UPDATE #t_rhh_HiSGSS_L
	 SET FechafinIrl = @Fch_Data
    WHERE FechafinIrl > @Fch_Data;

    UPDATE #t_rhh_HiSGSS_L
	 SET base_ccf = ibc_sal,
		dia_ccf = dia_sal
    WHERE base_ccf = 0;

    UPDATE #t_rhh_HiSGSS_L
	 SET IbcOtParaf = ibc_sal
    WHERE IbcOtParaf = 0;

    INSERT INTO #t_rhh_HiSGSS_L( cod_emp,
						   num_ide,
						   cod_cont,
						   fdo_sal,
						   Fdo_pen,
						   fdo_ate,
						   dia_sal,
						   dia_pen,
						   dia_rie,
						   bas_sal,
						   bas_pen,
						   bas_rie,
						   ibc_sal,
						   ibc_pen,
						   ibc_rie,
						   por_sal,
						   por_pen,
						   por_rie,
						   vap_sal,
						   vap_pen,
						   vap_rie,
						   vae_sal,
						   vae_pen,
						   vae_fsp,
						   vae_fsubsis,
						   vvp_sal,
						   vvp_pen,
						   vvp_rie,
						   vve_sal,
						   vve_pen,
						   vve_rie,
						   nro_ieg,
						   val_ieg,
						   nro_ilm,
						   val_ilm,
						   upc_emp,
						   dia_irp,
						   sal_bas,
						   nov_ing,
						   nov_ret,
						   nov_tdas,
						   nov_taas,
						   nov_tdap,
						   nov_taap,
						   nov_tdar,
						   nov_taar,
						   nov_vsp,
						   nov_vte,
						   nov_vst,
						   dia_sln,
						   nov_sln,
						   nov_slr,
						   nov_ige,
						   nov_lma,
						   nov_vac,
						   nov_avp,
						   nov_vct,
						   nrt_avp,
						   base_ccf,
						   dia_ccf,
						   por_ccf,
						   vap_ccf,
						   por_sena,
						   vap_sena,
						   por_icbf,
						   vap_icbf,
						   por_eit,
						   vap_eit,
						   por_esap,
						   vap_esap,
						   Fdo_ccf,
						   ClaseRiesgo,
						   TarEspPen,
						   FechaIngreso,
						   FechaRetiro,
						   FechaInicioVSP,
						   FechaInicioSLN,
						   FechafinSLN,
						   FechaInicioIEG,
						   FechafinIEG,
						   FechaInicioLMA,
						   FechafinLMA,
						   FechaInicioVac,
						   FechafinVac,
						   FechaInicioVct,
						   FechafinVct,
						   FechaInicioIrl,
						   FechafinIrl,
						   IBCOtParaf,
						   HorasLab
						 )
    SELECT Dtrab.cod_emp,
		 Dtrab.num_ide,
		 Dtrab.cod_cont,
		 Dtrab.fdo_sal,
		 Dtrab.Fdo_pen,
		 Dtrab.fdo_ate,
		 Dtrab.dia_sal,
		 Dtrab.dia_pen,
		 Dtrab.dia_rie,
		 Dtrab.bas_sal,
		 Dtrab.bas_pen,
		 Dtrab.bas_rie,
		 Dtrab.ibc_sal,
		 Dtrab.ibc_pen,
		 Dtrab.ibc_rie,
		 Dtrab.por_sal,
		 Dtrab.por_pen,
		 Dtrab.por_rie,
		 Dtrab.vap_sal,
		 Dtrab.vap_pen,
		 Dtrab.vap_rie,
		 Dtrab.vae_sal,
		 Dtrab.vae_pen,
		 Dtrab.vae_fsp,
		 Dtrab.vae_fsubsis,
		 Dtrab.vvp_sal,
		 Dtrab.vvp_pen,
		 Dtrab.vvp_rie,
		 Dtrab.vve_sal,
		 Dtrab.vve_pen,
		 Dtrab.vve_rie,
		 Dtrab.nro_ieg,
		 Dtrab.val_ieg,
		 Dtrab.nro_ilm,
		 Dtrab.val_ilm,
		 Dtrab.upc_emp,
		 Dtrab.dia_irp,
		 Dtrab.sal_bas,
		 Dtrab.nov_ing,
		 Dtrab.nov_ret,
		 Dtrab.nov_tdas,
		 Dtrab.nov_taas,
		 Dtrab.nov_tdap,
		 Dtrab.nov_taap,
		 Dtrab.nov_tdar,
		 Dtrab.nov_taar,
		 Dtrab.nov_vsp,
		 Dtrab.nov_vte,
		 Dtrab.nov_vst,
		 Dtrab.dia_sln,
		 Dtrab.nov_sln,
		 Dtrab.nov_slr,
		 Dtrab.nov_ige,
		 Dtrab.nov_lma,
		 Dtrab.nov_vac,
		 Dtrab.nov_avp,
		 Dtrab.nov_vct,
		 Dtrab.nrt_avp,
		 Dtrab.base_ccf,
		 Dtrab.dia_ccf,
		 Dtrab.por_ccf,
		 Dtrab.vap_ccf,
		 Dtrab.por_sena,
		 Dtrab.vap_sena,
		 Dtrab.por_icbf,
		 Dtrab.vap_icbf,
		 Dtrab.por_eit,
		 Dtrab.vap_eit,
		 Dtrab.por_esap,
		 Dtrab.vap_esap,
		 Dtrab.Fdo_ccf,
		 Dtrab.ClaseRiesgo,
		 Dtrab.TarEspPen,
		 Dtrab.FechaIngreso,
		 Dtrab.FechaRetiro,
		 Dtrab.FechaInicioVSP,
		 MAX(AUS.FechaInicioSLN) OVER(
		 ORDER BY AUS.Cod_emp),
		 MAX(AUS.FechafinSLN) OVER(
		 ORDER BY AUS.Cod_emp),
		 MAX(AUS.FechaInicioIEG) OVER(
		 ORDER BY AUS.Cod_emp),
		 MAX(AUS.FechafinIEG) OVER(
		 ORDER BY AUS.Cod_emp),
		 MAX(AUS.FechaInicioLMA) OVER(
		 ORDER BY AUS.Cod_emp),
		 MAX(AUS.FechafinLMA) OVER(
		 ORDER BY AUS.Cod_emp),
		 MAX(AUS.FechaInicioVac) OVER(
		 ORDER BY AUS.Cod_emp),
		 MAX(AUS.FechafinVac) OVER(
		 ORDER BY AUS.Cod_emp),
		 MAX(AUS.FechaInicioIrl) OVER(
		 ORDER BY AUS.Cod_emp),
		 MAX(AUS.FechafinIrl) OVER(
		 ORDER BY AUS.Cod_emp),
		 Dtrab.FechaInicioVct,
		 Dtrab.FechafinVct,
		 Dtrab.IBCOtParaf,
		 Dtrab.HorasLab
    FROM #t_rhh_HiSGSS_L AS AUS
    INNER JOIN #t_rhh_HiSGSS AS DTrab ON AUS.cod_emp = Dtrab.cod_emp
    WHERE Dtrab.dia_sal = 0 AND Dtrab.dia_pen = 0;

    /**** se actualiza la novedad de retiro en la lìnea correspondientes***/

    UPDATE #t_rhh_HiSGSS_L
	 SET nov_ret = CASE
				    WHEN E.fec_egr >= AU.FechaInicioSLN AND E.fec_egr <= AU.FechafinSLN THEN 'X'
				    ELSE ''
				END,
		FechaRetiro = CASE
					   WHEN E.fec_egr >= AU.FechaInicioSLN AND E.fec_egr <= AU.FechafinSLN THEN E.fec_egr
					   ELSE ''
				    END
    FROM #t_rhh_HiSGSS_L AS AU
    INNER JOIN #t_rhh_emplea AS E ON E.Cod_emp = AU.cod_emp AND E.cod_cont = AU.cod_cont
    WHERE nov_sln = 'X';

    UPDATE #t_rhh_HiSGSS_L
	 SET nov_ret = CASE
				    WHEN E.fec_egr >= AU.FechaInicioIrl AND E.fec_egr <= AU.FechafinIrl THEN 'X'
				    ELSE ''
				END,
		FechaRetiro = CASE
					   WHEN E.fec_egr >= AU.FechaInicioIrl AND E.fec_egr <= AU.FechafinIrl THEN E.fec_egr
					   ELSE ''
				    END
    FROM #t_rhh_HiSGSS_L AS AU
    INNER JOIN #t_rhh_emplea AS E ON E.Cod_emp = AU.cod_emp AND E.cod_cont = AU.cod_cont
    WHERE dia_irp > 0;

    UPDATE #t_rhh_HiSGSS_L
	 SET nov_ret = CASE
				    WHEN E.fec_egr >= AU.FechaInicioIEG AND E.fec_egr <= AU.FechafinIEG THEN 'X'
				    ELSE ''
				END,
		FechaRetiro = CASE
					   WHEN E.fec_egr >= AU.FechaInicioIEG AND E.fec_egr <= AU.FechafinIEG THEN E.fec_egr
					   ELSE ''
				    END
    FROM #t_rhh_HiSGSS_L AS AU
    INNER JOIN #t_rhh_emplea AS E ON E.Cod_emp = AU.cod_emp AND E.cod_cont = AU.cod_cont
    WHERE nov_ige = 'X';

    UPDATE #t_rhh_HiSGSS_L
	 SET nov_ret = CASE
				    WHEN E.fec_egr >= AU.FechaInicioVAC AND E.fec_egr <= AU.FechafinVac THEN 'X'
				    ELSE ''
				END,
		FechaRetiro = CASE
					   WHEN E.fec_egr >= AU.FechaInicioVAC AND E.fec_egr <= AU.FechafinVac THEN E.fec_egr
					   ELSE ''
				    END
    FROM #t_rhh_HiSGSS_L AS AU
    INNER JOIN #t_rhh_emplea AS E ON E.Cod_emp = AU.cod_emp AND E.cod_cont = AU.cod_cont
    WHERE nov_vac = 'X'
		AND AU.FechaInicioVAC > '19000101'
		AND e.fec_egr > @FechaInicio
		AND E.est_lab NOT IN( '04' );

    /** Se actualiza la fecha de retiro cuando las vacaciones terminan el 30 , la fecha de retiro es el 31 y el empleado no es pago por dìas**/

    UPDATE #t_rhh_HiSGSS_L
	 SET Nov_ret = 'X',
		FechaRetiro = E.fec_egr
    FROM #t_rhh_HiSGSS_L AU
    INNER JOIN #t_rhh_emplea AS E ON E.Cod_emp = AU.cod_emp AND E.cod_cont = AU.cod_cont
    WHERE AU.FechafinVac = DATEADD(DAY, -1, EOMONTH(AU.FechafinVac))
		AND DAY(EOMONTH(FechafinVac)) = 31
		AND E.ind_pdias = 0
		AND nov_vac = 'X'
		AND E.fec_egr IS NOT NULL;

    UPDATE #t_rhh_HiSGSS_L
	 SET FechaRetiro = CASE
					   WHEN E.fec_egr < @FechaInicio AND nov_ret = 'X' AND FechaRetiro < E.fec_egr THEN @Fch_Data
					   ELSE FechaRetiro
				    END
    FROM #t_rhh_HiSGSS_L AS AU
    INNER JOIN #t_rhh_emplea AS E ON E.Cod_emp = AU.cod_emp AND E.cod_cont = AU.cod_cont
    WHERE nov_vac = 'X';

    UPDATE #t_rhh_HiSGSS_L
	 SET nov_ret = CASE
				    WHEN E.fec_egr >= AU.FechaInicioLma AND E.fec_egr <= AU.FechaFinLma THEN 'X'
				    ELSE ''
				END,
		FechaRetiro = CASE
					   WHEN E.fec_egr >= AU.FechaInicioLma AND E.fec_egr <= AU.FechaFinLma THEN E.fec_egr
					   ELSE ''
				    END
    FROM #t_rhh_HiSGSS_L AS AU
    INNER JOIN #t_rhh_emplea AS E ON E.Cod_emp = AU.cod_emp AND E.cod_cont = AU.cod_cont
    WHERE nov_lma = 'X';

    /***Actualiza novedad de ingreso en novedades***/
    UPDATE #t_rhh_HiSGSS_L
	 SET nov_ing = CASE
				    WHEN E.fec_ing >= AU.FechaInicioSLN AND E.fec_ing <= AU.FechafinSLN THEN 'X'
				    ELSE ''
				END,
		FechaIngreso = CASE
					    WHEN E.fec_ing >= AU.FechaInicioSLN AND E.fec_ing <= AU.FechafinSLN THEN E.fec_ing
					    ELSE ''
					END
    FROM #t_rhh_HiSGSS_L AS AU
    INNER JOIN #t_rhh_emplea AS E ON E.Cod_emp = AU.cod_emp AND E.cod_cont = AU.Cod_cont
    WHERE nov_sln = 'X';

    UPDATE #t_rhh_HiSGSS_L
	 SET nov_ing = CASE
				    WHEN E.fec_ing >= AU.FechaInicioIrl AND E.fec_ing <= AU.FechafinIrl THEN 'X'
				    ELSE ''
				END,
		FechaIngreso = CASE
					    WHEN E.fec_ing >= AU.FechaInicioIrl AND E.fec_ing <= AU.FechafinIrl THEN E.fec_ing
					    ELSE ''
					END
    FROM #t_rhh_HiSGSS_L AS AU
    INNER JOIN #t_rhh_emplea AS E ON E.Cod_emp = AU.cod_emp AND E.cod_cont = AU.cod_cont
    WHERE dia_irp > 0;

    UPDATE #t_rhh_HiSGSS_L
	 SET nov_ing = CASE
				    WHEN E.fec_ing >= AU.FechaInicioIEG AND E.fec_ing <= AU.FechafinIEG THEN 'X'
				    ELSE ''
				END,
		FechaIngreso = CASE
					    WHEN E.fec_ing >= AU.FechaInicioIEG AND E.fec_ing <= AU.FechafinIEG THEN E.fec_ing
					    ELSE ''
					END
    FROM #t_rhh_HiSGSS_L AS AU
    INNER JOIN #t_rhh_emplea AS E ON E.Cod_emp = AU.cod_emp AND E.cod_cont = AU.cod_cont
    WHERE nov_ige = 'X';

    UPDATE #t_rhh_HiSGSS_L
	 SET nov_ing = CASE
				    WHEN E.fec_ing >= AU.FechaInicioVAC AND E.fec_ing <= AU.FechafinVac THEN 'X'
				    ELSE ''
				END,
		FechaIngreso = CASE
					    WHEN E.fec_ing >= AU.FechaInicioVAC AND E.fec_ing <= AU.FechafinVac THEN E.fec_ing
					    ELSE ''
					END
    FROM #t_rhh_HiSGSS_L AS AU
    INNER JOIN #t_rhh_emplea AS E ON E.Cod_emp = AU.cod_emp AND E.cod_cont = AU.cod_cont
    WHERE nov_vac = 'X' AND AU.FechaInicioVAC > '19000101';

    UPDATE #t_rhh_HiSGSS_L
	 SET nov_ing = CASE
				    WHEN E.fec_ing >= AU.FechaInicioLma AND E.fec_ing <= AU.FechaFinLma THEN 'X'
				    ELSE ''
				END,
		FechaIngreso = CASE
					    WHEN E.fec_ing >= AU.FechaInicioLma AND E.fec_ing <= AU.FechaFinLma THEN E.fec_ing
					    ELSE ''
					END
    FROM #t_rhh_HiSGSS_L AS AU
    INNER JOIN #t_rhh_emplea AS E ON E.Cod_emp = AU.cod_emp AND E.cod_cont = AU.cod_cont
    WHERE nov_lma = 'X';

    UPDATE #t_rhh_HiSGSS
	 SET nov_ing = CASE
				    WHEN E.fec_ing > @FechaInicio AND E.fec_ing < @FechaFin THEN 'X'
				    ELSE ''
				END,
		FechaIngreso = CASE
					    WHEN E.fec_ing > @FechaInicio AND E.fec_ing < @FechaFin THEN E.fec_ing
					    ELSE ''
					END
    FROM #t_rhh_HiSGSS AS D
    INNER JOIN #t_rhh_emplea AS E ON E.Cod_emp = D.cod_emp AND E.cod_cont = D.cod_cont;

    /****Se eliminan las novedades de retiro cuando existen días trabajados***/
    UPDATE #t_rhh_HiSGSS_L
	 SET NOV_RET = '',
		FechaRetiro = '',
		nov_ing = '',
		FechaIngreso = ''
    FROM #t_rhh_HiSGSS_L AS AUS
    INNER JOIN #t_rhh_HiSGSS AS DT ON AUS.Cod_emp = DT.cod_emp AND AUS.cod_cont = DT.cod_cont
    WHERE Dt.dia_sal > 0;
    --Determinar el sitio donde labora actualmente cada funcionario
    --DEBE OBTENERSE DE LA HISTORIA LABORAL
    SELECT E.cod_emp COLLATE database_default AS cod_emp,
		 CONVERT(BIGINT, H.cod_dep) AS cod_dep,
		 CONVERT(BIGINT, RIGHT(H.cod_ciu, 3)) AS cod_mun,
		 cod_con,
		 H.fec_ini,
		 CONVERT(CHAR(9), cod_CT) AS cod_CT
    INTO #T_rhh_ubica
    FROM #T_rhh_emplea AS E
    INNER JOIN rhh_hislab AS H ON E.cod_emp = H.cod_emp
						    AND E.cod_cont = H.cod_con
						    AND sec_car = 1
						    AND E.fec_ini = H.fec_ini
						    AND H.num_sec = dbo.fn_rhh_Hislab_NumSec( E.cod_emp, @Fch_Data, 0, 1 );

    UPDATE #T_rhh_ubica
	 SET cod_CT = CASE
				   WHEN CT.CodCT_Planilla = '0' THEN U.cod_CT
				   ELSE CONVERT(CHAR(9), CT.CodCT_Planilla)
			    END
    FROM #T_rhh_ubica AS U
    INNER JOIN rhh_CentroTrab AS CT ON CT.cod_CT = U.cod_CT;

    /***Se actualiza la novedad de nov_sln cuando el tipo de ausentismo es 26'***/
    IF( SELECT emp_apl
	   FROM SIS_APLICACION
	   WHERE COD_APL = 'NOM' ) = 'O'
    BEGIN
	   UPDATE #t_rhh_HiSGSS_L
		SET nov_sln = 'C'
	   FROM #t_rhh_HiSGSS_L AS l
	   INNER JOIN rhh_ausentismo AS a ON l.cod_emp = a.cod_emp AND l.Cer_nro = a.cer_nro
	   WHERE a.cod_aus = '26';
    END;
    --Armado del Registro
    /*Variables de Novedades Generales*/
    SELECT TI.tip_tip AS TipIde_Emp, /*Pos 1-3*/
		 /*E.cod_emp*/
		 E.num_ide COLLATE database_default AS NumIde_Em,
		 TC.cod_planilla AS Tipo_Cotizante, /*Pos 4-5*/
		 SC.cod_plasub AS SubTip_Cotiza, /*Pos 6 */
		 CASE C.ind_extjero
			WHEN 1 THEN 'X'
			ELSE ' '
		 END AS Ind_Extran, /*Pos 7*/
		 CASE C.ind_resi_extjero
			WHEN 1 THEN 'X'
			ELSE ' '
		 END AS IndColmbExterio, /*Pos 8*/
		 U.cod_dep AS Dpto_Labora,
		 U.cod_mun AS Muni_Labora, /*Pos 9-10*/
		 E.ap1_emp,
		 E.ap2_emp,
		 SUBSTRING(E.nom_emp, 1, CHARINDEX(' ', E.nom_emp) - 1) AS nom1_emp, /*Pos 11-13*/
		 LTRIM(SUBSTRING(E.nom_emp, CHARINDEX(' ', E.nom_emp) + 1, DATALENGTH(E.nom_emp))) AS nom2_emp, /*Pos 14*/
		 /*Novedades*/
		 HS.[nov_ing],
		 HS.[nov_ret],
		 HS.[nov_tdas],
		 HS.[nov_taas],
		 HS.[nov_tdap],
		 HS.[nov_taap], /*Pos 15-20*/
		 HS.[nov_vsp],
		 ' ' AS Correccion, /*HS.[nov_vte]*/
		 HS.[nov_vst],
		 HS.[nov_sln],
		 HS.[nov_ige],
		 HS.[nov_lma], /*Pos 21-26*/
		 HS.[nov_vac],
		 HS.[nov_avp],
		 HS.[nov_vct],
		 HS.[dia_irp],
		 FP.cod_sgs AS fdo_pen_Act, /*Pos 27-31*/
		 ( SELECT CASE PN.cod_sgs
				    WHEN FP.cod_sgs THEN NULL
				    ELSE PN.cod_sgs
				END
		   FROM rhh_hisfon AS HF
		   INNER JOIN rhh_tbfondos AS PN ON PN.cod_fdo = HF.cod_fdo
		   WHERE HF.cod_emp = E.cod_emp
			    AND HF.tip_fdo = 1
			    AND (@Fch_PrxPer BETWEEN HF.fec_afi AND HF.fec_ter
				    OR (@Fch_PrxPer >= HF.fec_afi AND HF.fec_ter IS NULL
					  )
				    AND @Fch_Data < HF.fec_afi
				   ) ) AS fdo_pen_dest, /*Pos 32*/
		 FS.cod_sgs AS fdo_sal_act, /*Pos 33*/
		 ( SELECT CASE PN.cod_sgs
				    WHEN FS.cod_sgs THEN NULL
				    ELSE PN.cod_sgs
				END
		   FROM rhh_hisfon AS HF
		   INNER JOIN rhh_tbfondos AS PN ON PN.cod_fdo = HF.cod_fdo
		   WHERE HF.cod_emp = E.cod_emp
			    AND HF.tip_fdo = 2
			    AND (@Fch_PrxPer BETWEEN HF.fec_afi AND HF.fec_ter
				    OR (@Fch_PrxPer >= HF.fec_afi AND HF.fec_ter IS NULL
					  )
				    AND @Fch_Data < HF.fec_afi
				   ) ) AS fdo_sal_dest, /*Pos 34*/
		 FC.cod_sgs AS fdo_caja, /*Pos 35*/
		 --CASE FC.cod_sgs WHEN 0 THEN ''ELSE FC.cod_sgs END  AS fdo_caja,/*Pos 35*/
		 HS.[dia_pen],
		 HS.[dia_sal]/*+HS.[dia_sln]*/		 AS dia_sal,
		 HS.[dia_rie], /*Pos 36-38*/
		 HS.[dia_ccf] * TT.ind_para AS dia_CCF, /*Pos 339*/
		 HS.[sal_bas],
		 CASE E.cla_sal
			WHEN 2 THEN 'X'
			ELSE ' '
		 END AS ind_salIntegral, /*Pos 40-41*/
		 HS.[ibc_pen],
		 HS.[ibc_sal],
		 HS.[ibc_rie],
		 HS.[Base_CCF], /*Pos 42-45*/
		 /*Variables del Sistema General*/
		 /*Pensiones*/
		 CONVERT(NUMERIC(8, 5), HS.[por_pen] / 100) AS por_pen, /*Pos 46*/
		 HS.[vap_pen] + HS.[vae_pen] AS cot_pen,
		 HS.[vve_pen],
		 HS.[vvp_pen],
		 0 AS tot_cot_pen, /*Pos 47-50*/
		 HS.vae_fsp AS vae_fsp_solid, /*Pos 51*/
		 HS.vae_fsubsis AS vae_fsp_subsist, /*Pos 52*/
		 HS.[nrt_avp], /*Pos 53*/
		 /*Salud*/
		 CONVERT(NUMERIC(8, 5), HS.[por_sal] / 100) AS por_sal, /*Pos 54*/
		 HS.[vap_sal] + HS.[vae_sal] AS cot_sal,
		 CASE CONVERT(NUMERIC(5, 3), dbo.fn_rhh_VG( 54, @Fch_Data ))
			WHEN 1 THEN 0
			ELSE HS.[upc_emp]
		 END AS upc_emp,
		 --HS.[upc_emp], /*Pos 55-56*/
		 HS.[nro_ieg],
		 HS.[val_ieg],
		 HS.[nro_ilm],
		 HS.[val_ilm], /*Pos 57-60*/
		 /*Riesgos Profesionales*/
		 CONVERT(NUMERIC(9, 7), HS.[por_rie] / 100) AS por_rie, /*Pos 61*/
		 --0 AS Cent_Trab, HS.[vap_rie] AS cot_rie,/*Pos 62-63*/
		 U.cod_CT AS Cent_Trab,
		 HS.[vap_rie] AS cot_rie, /*Pos 62-63*/
		 /*Parafiscales*/
		 CONVERT(NUMERIC(8, 5), HS.[por_ccf] / 100) AS tar_CCF,
		 HS.vap_ccf AS val_CCF, /*Pos 64-65*/
		 CASE
			WHEN HS.vap_ccf > 0 AND HS.vap_sena = 0 AND HS.vap_icbf = 0 THEN 0
			ELSE CONVERT(NUMERIC(8, 5), HS.[por_sena] / 100)
		 END AS tar_SENA,
		 HS.vap_sena AS val_SENA, /*Pos 66-67*/
		 CASE
			WHEN HS.vap_ccf > 0 AND HS.vap_sena = 0 AND HS.vap_icbf = 0 THEN 0
			WHEN HS.vap_ccf = 0 AND HS.vap_sena = 0 AND HS.vap_icbf = 0 THEN 0
			ELSE CONVERT(NUMERIC(8, 5), HS.[por_icbf] / 100)
		 END AS tar_icbf,
		 HS.vap_icbf AS val_ICBF, /*Pos 68-69*/
		 CASE
			WHEN HS.vap_ccf > 0 AND HS.vap_sena = 0 AND HS.vap_icbf = 0 THEN 0
			WHEN HS.vap_ccf = 0 AND HS.vap_sena = 0 AND HS.vap_icbf = 0 THEN 0
			ELSE CONVERT(NUMERIC(8, 5), HS.[por_eit] / 100)
		 END AS tar_eit,
		 HS.vap_eit AS Val_EIT, /*Pos 70-71*/
		 CASE
			WHEN HS.vap_ccf > 0 AND HS.vap_sena = 0 AND HS.vap_icbf = 0 THEN 0
			WHEN HS.vap_ccf = 0 AND HS.vap_sena = 0 AND HS.vap_icbf = 0 THEN 0
			ELSE CONVERT(NUMERIC(8, 5), HS.[por_esap] / 100)
		 END AS tar_esap,
		 HS.vap_esap AS Val_ESAP, /*Pos 72-73*/
		 '' AS TipIde_Cot,
		 '          ' AS NumIde_Cot, /*Pos 73 - 74*/
		 'N' AS Cot_Exo,
		 @cCod_sgs_ARP AS Admon_Rie,
		 HS.ClaseRiesgo AS ClaseRiesgo,
		 HS.TarEspPen AS TarEspPen, /*Pos 75 - Res 1607-2012*/
		 --CASE WHEN @VG136 = 0 THEN 'N' ELSE CASE  WHEN  HS.vap_sal = 0  THEN 'S' ELSE 'N' END END AS Cot_Exo /*Pos 75 - Res 1607-2012*/,
		 CASE HS.FechaIngreso
			WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
			ELSE CONVERT(CHAR(10), HS.FechaIngreso, 120)
		 END AS FechaIngreso,
		 CASE HS.FechaRetiro
			WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
			ELSE CONVERT(CHAR(10), HS.FechaRetiro, 120)
		 END AS FechaRetiro,
		 CASE HS.FechaInicioVSP
			WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
			ELSE CONVERT(CHAR(10), HS.FechaInicioVSP, 120)
		 END AS FechaInicioVSP,
		 CASE HS.FechaInicioSLN
			WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
			ELSE CONVERT(CHAR(10), HS.FechaInicioSLN, 120)
		 END AS FechaInicioSLN,
		 CASE HS.FechafinSLN
			WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
			ELSE CONVERT(CHAR(10), HS.FechafinSLN, 120)
		 END AS FechafinSLN,
		 CASE HS.FechaInicioIEG
			WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
			ELSE CONVERT(CHAR(10), HS.FechaInicioIEG, 120)
		 END AS FechaInicioIEG,
		 CASE HS.FechafinIEG
			WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
			ELSE CONVERT(CHAR(10), HS.FechafinIEG, 120)
		 END AS FechafinIEG,
		 CASE HS.FechaInicioLMA
			WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
			ELSE CONVERT(CHAR(10), HS.FechaInicioLMA, 120)
		 END AS FechaInicioLMA,
		 CASE HS.FechafinLMA
			WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
			ELSE CONVERT(CHAR(10), HS.FechafinLMA, 120)
		 END AS FechafinLMA,
		 CASE HS.FechaInicioVac
			WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
			ELSE CONVERT(CHAR(10), HS.FechaInicioVac, 120)
		 END AS FechaInicioVac,
		 CASE HS.FechafinVac
			WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
			ELSE CONVERT(CHAR(10), HS.FechafinVac, 120)
		 END AS FechafinVac,
		 CASE HS.FechaInicioVct
			WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
			ELSE CONVERT(CHAR(10), HS.FechaInicioVct, 120)
		 END AS FechaInicioVct,
		 CASE HS.FechafinVct
			WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
			ELSE CONVERT(CHAR(10), HS.FechafinVct, 120)
		 END AS FechafinVct,
		 CASE HS.FechaInicioIrl
			WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
			ELSE CONVERT(CHAR(10), HS.FechaInicioIrl, 120)
		 END AS FechaInicioIrl,
		 CASE HS.FechafinIrl
			WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
			ELSE CONVERT(CHAR(10), HS.FechafinIrl, 120)
		 END AS FechafinIrl,
		 HS.IBCOtParaf AS IBCOtParaf,
		 HS.HorasLab AS HorasLab,
		 SPACE(10) AS FecExt,
		 HS.Cod_cont AS Cod_cont,
		 HS.ciiu AS ciiu
		 INTO #T_RegTip02A
    FROM #t_rhh_HiSGSS AS HS
    INNER JOIN #T_rhh_emplea AS E ON E.cod_emp = HS.cod_emp AND E.cod_cont = HS.cod_cont
    INNER JOIN Gth_contratos AS C ON C.Cod_con = HS.cod_cont AND C.cod_emp = hs.cod_emp
    INNER JOIN rhh_TbTipCotiza AS TC ON TC.tip_cot = C.tip_cot
    INNER JOIN Rhh_TbSubTipCotiza AS SC ON SC.SubTip_Cot = C.SubTip_Cot
    INNER JOIN gen_TipIde AS TI ON TI.cod_tip = E.tip_ide
    INNER JOIN rhh_TipCon AS TT ON TT.Tip_Con = E.tip_con
    LEFT OUTER JOIN #T_rhh_ubica AS U ON U.cod_emp = E.cod_emp AND U.cod_con = HS.cod_cont
    LEFT OUTER JOIN rhh_TbFondos AS FP ON FP.cod_fdo = HS.fdo_pen
    LEFT OUTER JOIN rhh_TbFondos AS FS ON FS.cod_fdo = HS.fdo_sal
    LEFT OUTER JOIN rhh_TbFondos AS FC ON FC.cod_fdo = HS.Fdo_ccf
    --LEFT OUTER JOIN #T_BasesCCF CCF ON CCF.cod_emp = HS.cod_emp AND CCF.cod_cont = HS.cod_cont
    UNION ALL
    SELECT TI.tip_tip AS TipIde_Emp,
		 U.num_ced AS NumIde_Em,
		 '40' AS Tipo_Cotizante,
		 0 AS SubTip_Cotiza,
		 ' ' AS Ind_Extran,
		 ' ' AS IndColmbExterio,
		 MAX(Ub.cod_dep) AS Dpto_Labora,
		 MAX(Ub.cod_mun) AS Muni_Labora,
		 MAX(F.ap1_fam) AS ap1_fam,
		 MAX(F.ap2_fam) AS ap2_fam,
		 SUBSTRING(MAX(F.nom_fam), 1, CHARINDEX(' ', MAX(F.nom_fam)) - 1) AS nom1_fam, /*Pos 11-13*/
		 LTRIM(SUBSTRING(MAX(F.nom_fam), CHARINDEX(' ', MAX(F.nom_fam)) + 1, DATALENGTH(MAX(F.nom_fam)))) AS nom2_fam, /*Pos 14*/
		 '' AS nov_ing,
		 '' AS nov_ret,
		 '' AS nov_tdas,
		 '' AS nov_taas,
		 '' AS nov_tdap,
		 '' AS nov_taap,
		 '' AS nov_vsp,
		 '' AS Correccion,
		 '' AS nov_vst,
		 '' AS nov_sln,
		 '' AS nov_ige,
		 '' AS nov_lma,
		 '' AS nov_vac,
		 '' AS nov_avp,
		 '' AS nov_vct,
		 '' AS dia_irp,
		 '' AS fdo_pen_Act,
		 '' AS fdo_pen_dest,
		 MAX(FS.cod_sgs) AS fdo_sal_act, /*Pos 33*/
		 ( SELECT PN.cod_sgs
		   FROM rhh_hisfon AS HF
		   INNER JOIN rhh_tbfondos AS PN ON PN.cod_fdo = HF.cod_fdo
		   WHERE HF.cod_emp = U.cod_emp
			    AND HF.tip_fdo = 2
			    AND (@Fch_PrxPer BETWEEN HF.fec_afi AND HF.fec_ter
				    OR (@Fch_PrxPer >= HF.fec_afi AND HF.fec_ter IS NULL
					  )
				    AND @Fch_Data < HF.fec_afi
				   ) ) AS fdo_sal_dest, /*Pos 34*/
		 '' AS fdo_caja,
		 0 AS dia_pen,
		 30 AS dia_sal,
		 0 AS dia_rie,
		 0 AS dia_CCF,
		 0 AS sal_bas,
		 '' AS ind_salIntegral,
		 0 AS ibc_pen,
		 0 AS ibc_sal,
		 0 AS ibc_rie,
		 0 AS Base_CCF,
		 0 AS por_pen,
		 0 AS cot_pen,
		 0 AS vve_pen,
		 0 AS vvp_pen,
		 0 AS tot_Emp_cot_pen,
		 0 AS vae_fsp_solid,
		 0 AS vae_fsp_subsist,
		 0 AS nrt_avp,
		 0 AS por_sal,
		 0 AS cot_sal,
		 CONVERT(BIGINT, SUM(U.val_upc)) AS upc_emp,
		 '' AS nro_ieg,
		 0 AS val_ieg,
		 '' AS nro_ilm,
		 0 AS val_ilm,
		 0 AS por_rie, /*''AS Cent_Trab*/
		 0 AS Cent_Trab,
		 0 AS cot_rie,
		 0 AS tar_CCF,
		 0 AS val_CCF,
		 0 AS tar_SENA,
		 0 AS val_SENA,
		 0 AS tar_ICBF,
		 0 AS val_ICBF,
		 0 AS tar_ESAP,
		 0 AS val_ESAP,
		 0 AS tar_EIT,
		 0 AS val_EIT,
		 ---Adicion Res.3214---
		 TC.tip_tip AS TipIde_Cot,
		 E.num_ide AS NumIde_Cot,
		 'N' AS Cot_Exo, /*Resolución 1607 - 2012*/
		 '' AS Admon_Rie,
		 '' AS ClaseRiesgo,
		 '' AS TarEspPen,
		 CONVERT(VARCHAR(10), '', 121) AS FechaIngreso,
		 CONVERT(VARCHAR(10), '', 121) AS FechaRetiro,
		 CONVERT(VARCHAR(10), '', 121) AS FechaInicioVSP,
		 CONVERT(VARCHAR(10), '', 121) AS FechaInicioSLN,
		 CONVERT(VARCHAR(10), '', 121) AS FechafinSLN,
		 CONVERT(VARCHAR(10), '', 121) AS FechaInicioIEG,
		 CONVERT(VARCHAR(10), '', 121) AS FechafinIEG,
		 CONVERT(VARCHAR(10), '', 121) AS FechaInicioLMA,
		 CONVERT(VARCHAR(10), '', 121) AS FechafinLMA,
		 CONVERT(VARCHAR(10), '', 121) AS FechaInicioVac,
		 CONVERT(VARCHAR(10), '', 121) AS FechafinVac,
		 CONVERT(VARCHAR(10), '', 121) AS FechaInicioVct,
		 CONVERT(VARCHAR(10), '', 121) AS FechafinVct,
		 CONVERT(VARCHAR(10), '', 121) AS FechaInicioIrl,
		 CONVERT(VARCHAR(10), '', 121) AS FechafinIrl,
		 0 AS IBCOtParaf,
		 0 AS HorasLab,
		 SPACE(10) AS FecExt,
		 HS.Cod_cont AS Cod_cont,
		 '0000000' AS ciiu
    FROM RHH_UPC_ADI AS U
    INNER JOIN Rhh_familia AS F ON U.Cod_emp = F.Cod_emp AND U.num_ced = F.num_ced
    INNER JOIN #T_rhh_emplea AS E ON U.Cod_emp = E.Cod_emp
    INNER JOIN gen_TipIde AS TI ON TI.cod_tip = F.tip_ide
    INNER JOIN gen_TipIde AS TC ON TC.cod_tip = E.tip_ide
    INNER JOIN #t_rhh_hisss AS HS ON U.Cod_emp = HS.Cod_emp AND E.cod_cont = HS.cod_cont
    LEFT OUTER JOIN rhh_TbFondos AS FS ON FS.cod_fdo = HS.fdo_sal
    LEFT OUTER JOIN #T_rhh_ubica AS Ub ON Ub.cod_emp = E.cod_emp AND Ub.cod_con = HS.cod_cont
    WHERE CONVERT(NUMERIC(5, 3), dbo.fn_rhh_VG( 54, @Fch_Data )) = 1
    AND HS.upc_emp > 0
    AND (@Fch_Data BETWEEN U.fec_nov AND U.fec_has OR u.fec_has IS NULL
	   )
    -- AND E.Cod_cia LIKE @cCodCia
    AND E.suc_SS LIKE @cSucSSPar
    GROUP BY TI.tip_tip,
		   U.Cod_Emp,
		   U.num_ced,
		   TC.tip_tip,
		   E.num_ide,
		   HS.Cod_cont
    UNION ALL
    SELECT TI.tip_tip AS TipIde_Emp, /*Pos 1-3*/
		 E.num_ide COLLATE database_default AS NumIde_Em,
		 TC.cod_planilla AS Tipo_Cotizante, /*Pos 4-5*/
		 SC.cod_plasub AS SubTip_Cotiza, /*Pos 6 */
		 CASE C.ind_extjero
			WHEN 1 THEN 'X'
			ELSE ' '
		 END AS Ind_Extran, /*Pos 7*/
		 CASE E.ind_resi_extjero
			WHEN 1 THEN 'X'
			ELSE ' '
		 END AS IndColmbExterio, /*Pos 8*/
		 U.cod_dep AS Dpto_Labora,
		 U.cod_mun AS Muni_Labora, /*Pos 9-10*/
		 E.ap1_emp,
		 E.ap2_emp,
		 SUBSTRING(E.nom_emp, 1, CHARINDEX(' ', E.nom_emp) - 1) AS nom1_emp, /*Pos 11-13*/
		 LTRIM(SUBSTRING(E.nom_emp, CHARINDEX(' ', E.nom_emp) + 1, DATALENGTH(E.nom_emp))) AS nom2_emp, /*Pos 14*/
		 /*Novedades*/
		 HS.[nov_ing],
		 HS.[nov_ret],
		 HS.[nov_tdas],
		 HS.[nov_taas],
		 HS.[nov_tdap],
		 HS.[nov_taap], /*Pos 15-20*/
		 HS.[nov_vsp],
		 ' ' AS Correccion, /*HS.[nov_vte]*/
		 HS.[nov_vst],
		 HS.[nov_sln],
		 HS.[nov_ige],
		 HS.[nov_lma], /*Pos 21-26*/
		 HS.[nov_vac],
		 HS.[nov_avp],
		 HS.[nov_vct],
		 HS.[dia_irp],
		 FP.cod_sgs AS fdo_pen_Act, /*Pos 27-31*/
		 ( SELECT CASE PN.cod_sgs
				    WHEN FP.cod_sgs THEN NULL
				    ELSE PN.cod_sgs
				END
		   FROM rhh_hisfon AS HF
		   INNER JOIN rhh_tbfondos AS PN ON PN.cod_fdo = HF.cod_fdo
		   WHERE HF.cod_emp = E.cod_emp
			    AND HF.tip_fdo = 1
			    AND (@Fch_PrxPer BETWEEN HF.fec_afi AND HF.fec_ter
				    OR (@Fch_PrxPer >= HF.fec_afi AND HF.fec_ter IS NULL
					  )
				    AND @Fch_Data < HF.fec_afi
				   ) ) AS fdo_pen_dest, /*Pos 32*/
		 FS.cod_sgs AS fdo_sal_act, /*Pos 33*/
		 ( SELECT CASE PN.cod_sgs
				    WHEN FS.cod_sgs THEN NULL
				    ELSE PN.cod_sgs
				END
		   FROM rhh_hisfon AS HF
		   INNER JOIN rhh_tbfondos AS PN ON PN.cod_fdo = HF.cod_fdo
		   WHERE HF.cod_emp = E.cod_emp
			    AND HF.tip_fdo = 2
			    AND (@Fch_PrxPer BETWEEN HF.fec_afi AND HF.fec_ter
				    OR (@Fch_PrxPer >= HF.fec_afi AND HF.fec_ter IS NULL
					  )
				    AND @Fch_Data < HF.fec_afi
				   ) ) AS fdo_sal_dest, /*Pos 34*/
		 FC.cod_sgs AS fdo_caja, /*Pos 35*/
		 HS.[dia_pen],
		 HS.[dia_sal]/*+HS.[dia_sln]*/		 AS dia_sal,
		 HS.[dia_rie], /*Pos 36-38*/
		 HS.[dia_ccf] * TT.ind_para AS dia_CCF, /*Pos 339*/
		 HS.[sal_bas],
		 CASE E.cla_sal
			WHEN 2 THEN 'X'
			ELSE ' '
		 END AS ind_salIntegral, /*Pos 40-41*/
		 HS.[ibc_pen],
		 HS.[ibc_sal],
		 HS.[ibc_rie],
		 HS.[Base_CCF], /*Pos 42-45*/
		 /*Variables del Sistema General*/
		 /*Pensiones*/
		 CONVERT(NUMERIC(8, 5), HS.[por_pen] / 100) AS por_pen, /*Pos 46*/
		 HS.[vap_pen] + HS.[vae_pen] AS cot_pen,
		 HS.[vve_pen],
		 HS.[vvp_pen],
		 0 AS tot_cot_pen, /*Pos 47-50*/
		 HS.vae_fsp AS vae_fsp_solid, /*Pos 51*/
		 HS.vae_fsubsis AS vae_fsp_subsist, /*Pos 52*/
		 HS.[nrt_avp], /*Pos 53*/
		 /*Salud*/
		 CONVERT(NUMERIC(8, 5), HS.[por_sal] / 100) AS por_sal, /*Pos 54*/
		 HS.[vap_sal] + HS.[vae_sal] AS cot_sal,
		 CASE CONVERT(NUMERIC(5, 3), dbo.fn_rhh_VG( 54, @Fch_Data ))
			WHEN 1 THEN 0
			ELSE HS.[upc_emp]
		 END AS upc_emp,
		 --HS.[upc_emp], /*Pos 55-56*/
		 HS.[nro_ieg],
		 HS.[val_ieg],
		 HS.[nro_ilm],
		 HS.[val_ilm], /*Pos 57-60*/
		 /*Riesgos Profesionales*/
		 CONVERT(NUMERIC(9, 7), HS.[por_rie] / 100) AS por_rie, /*Pos 61*/
		 --0 AS Cent_Trab, HS.[vap_rie] AS cot_rie,/*Pos 62-63*/
		 U.cod_CT AS Cent_Trab,
		 HS.[vap_rie] AS cot_rie, /*Pos 62-63*/
		 /*Parafiscales*/
		 CONVERT(NUMERIC(8, 5), HS.[por_ccf] / 100) AS tar_CCF,
		 HS.vap_ccf AS val_CCF, /*Pos 64-65*/
		 CASE
			WHEN HS.vap_ccf > 0 AND HS.vap_sena = 0 AND HS.vap_icbf = 0 THEN 0
			ELSE CONVERT(NUMERIC(8, 5), HS.[por_sena] / 100)
		 END AS tar_SENA,
		 HS.vap_sena AS val_SENA, /*Pos 66-67*/
		 CASE
			WHEN HS.vap_ccf > 0 AND HS.vap_sena = 0 AND HS.vap_icbf = 0 THEN 0
			WHEN HS.vap_ccf = 0 AND HS.vap_sena = 0 AND HS.vap_icbf = 0 THEN 0
			ELSE CONVERT(NUMERIC(8, 5), HS.[por_icbf] / 100)
		 END AS tar_icbf,
		 HS.vap_icbf AS val_ICBF, /*Pos 68-69*/
		 CASE
			WHEN HS.vap_ccf > 0 AND HS.vap_sena = 0 AND HS.vap_icbf = 0 THEN 0
			WHEN HS.vap_ccf = 0 AND HS.vap_sena = 0 AND HS.vap_icbf = 0 THEN 0
			ELSE CONVERT(NUMERIC(8, 5), HS.[por_eit] / 100)
		 END AS tar_eit,
		 HS.vap_eit AS Val_EIT, /*Pos 70-71*/
		 CASE
			WHEN HS.vap_ccf > 0 AND HS.vap_sena = 0 AND HS.vap_icbf = 0 THEN 0
			WHEN HS.vap_ccf = 0 AND HS.vap_sena = 0 AND HS.vap_icbf = 0 THEN 0
			ELSE CONVERT(NUMERIC(8, 5), HS.[por_esap] / 100)
		 END AS tar_esap,
		 HS.vap_esap AS Val_ESAP, /*Pos 72-73*/
		 '' AS TipIde_Cot,
		 '          ' AS NumIde_Cot,
		 'N' AS Cot_Exo, /*Pos 75 - Res 1607-2012*/
		 @cCod_sgs_ARP AS Admon_Rie,
		 HS.ClaseRiesgo AS ClaseRiesgo, /*20170330*/
		 HS.TarEspPen AS TarEspPen, /*Pos 75 - Res 1607-2012*/
		 -- CASE WHEN @VG136 = 0 THEN 'N' ELSE CASE  WHEN  HS.vap_sal= 0  THEN 'S' ELSE 'N' END END AS Cot_Exo /*Pos 75 - Res 1607-2012*/,
		 CASE HS.FechaIngreso
			WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
			ELSE CONVERT(CHAR(10), HS.FechaIngreso, 120)
		 END AS FechaIngreso,
		 CASE HS.FechaRetiro
			WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
			ELSE CONVERT(CHAR(10), HS.FechaRetiro, 120)
		 END AS FechaRetiro,
		 CASE HS.FechaInicioVSP
			WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
			ELSE CONVERT(CHAR(10), HS.FechaInicioVSP, 120)
		 END AS FechaInicioVSP,
		 CASE HS.FechaInicioSLN
			WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
			ELSE CONVERT(CHAR(10), HS.FechaInicioSLN, 120)
		 END AS FechaInicioSLN,
		 CASE HS.FechafinSLN
			WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
			ELSE CONVERT(CHAR(10), HS.FechafinSLN, 120)
		 END AS FechafinSLN,
		 CASE HS.FechaInicioIEG
			WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
			ELSE CONVERT(CHAR(10), HS.FechaInicioIEG, 120)
		 END AS FechaInicioIEG,
		 CASE HS.FechafinIEG
			WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
			ELSE CONVERT(CHAR(10), HS.FechafinIEG, 120)
		 END AS FechafinIEG,
		 CASE HS.FechaInicioLMA
			WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
			ELSE CONVERT(CHAR(10), HS.FechaInicioLMA, 120)
		 END AS FechaInicioLMA,
		 CASE HS.FechafinLMA
			WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
			ELSE CONVERT(CHAR(10), HS.FechafinLMA, 120)
		 END AS FechafinLMA,
		 CASE HS.FechaInicioVac
			WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
			ELSE CONVERT(CHAR(10), HS.FechaInicioVac, 120)
		 END AS FechaInicioVac,
		 CASE HS.FechafinVac
			WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
			ELSE CONVERT(CHAR(10), HS.FechafinVac, 120)
		 END AS FechafinVac,
		 CASE HS.FechaInicioVct
			WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
			ELSE CONVERT(CHAR(10), HS.FechaInicioVct, 120)
		 END AS FechaInicioVct,
		 CASE HS.FechafinVct
			WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
			ELSE CONVERT(CHAR(10), HS.FechafinVct, 120)
		 END AS FechafinVct,
		 CASE HS.FechaInicioIrl
			WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
			ELSE CONVERT(CHAR(10), HS.FechaInicioIrl, 120)
		 END AS FechaInicioIrl,
		 CASE HS.FechafinIrl
			WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
			ELSE CONVERT(CHAR(10), HS.FechafinIrl, 120)
		 END AS FechafinIrl,
		 HS.IBCOtParaf AS IBCOtParaf,
		 HS.HorasLab AS HorasLab,
		 SPACE(10) AS FecExt,
		 HS.Cod_cont AS Cod_cont,
		 HS.Ciiu AS Ciiu
    FROM #t_rhh_HiSGSS_L AS HS
    INNER JOIN #T_rhh_emplea AS E ON E.cod_emp = HS.cod_emp AND E.cod_cont = HS.cod_cont
    INNER JOIN Gth_contratos AS C ON c.cod_con = HS.cod_cont AND C.cod_emp = hs.cod_emp
    INNER JOIN rhh_TbTipCotiza AS TC ON TC.tip_cot = C.tip_cot
    INNER JOIN Rhh_TbSubTipCotiza AS SC ON SC.SubTip_Cot = E.SubTip_Cot
    INNER JOIN gen_TipIde AS TI ON TI.cod_tip = E.tip_ide
    INNER JOIN rhh_TipCon AS TT ON TT.Tip_Con = E.tip_con
    LEFT OUTER JOIN #T_rhh_ubica AS U ON U.cod_emp = E.cod_emp AND U.cod_con = HS.cod_cont
    LEFT OUTER JOIN rhh_TbFondos AS FP ON FP.cod_fdo = HS.fdo_pen
    LEFT OUTER JOIN rhh_TbFondos AS FS ON FS.cod_fdo = HS.fdo_sal
    LEFT OUTER JOIN rhh_TbFondos AS FC ON FC.cod_fdo = HS.Fdo_ccf;

    SELECT '02' AS Tip_reg,
		 IDENTITY( BIGINT, 1, 1) AS Secuen,
		 *
    INTO #T_RegTip02
    FROM #T_RegTip02A
    ORDER BY NumIde_Em,
		   cod_cont,
		   nov_ret,
		   nov_sln,
		   nov_ige,
		   nov_ing;

    UPDATE #T_RegTip02
	 SET nov_vst = 'X'
    WHERE ROUND((CAST(sal_bas AS MONEY) / 30) * dia_sal + 0.49, 0) <> (ibc_sal)
    AND nov_sln = ''
    AND nov_vsp = ''
    AND nov_ige = ''
    AND dia_irp = 0
    AND nov_vac = ''
    AND nov_lma = ''
    AND Dia_sal > 0
    AND ind_salIntegral = ''
    AND sal_bas = @nVg60;

    UPDATE #T_RegTip02
	 SET nov_vst = 'X'
    WHERE ROUND((CAST(sal_bas AS MONEY) / 30) * dia_sal, 0) <> (ibc_sal)
    AND nov_sln = ''
    AND nov_vsp = ''
    AND nov_ige = ''
    AND dia_irp = 0
    AND nov_vac = ''
    AND nov_lma = ''
    AND Dia_sal > 0
    AND ind_salIntegral = ''
    AND sal_bas > @nVg60;

    UPDATE #T_RegTip02
	 SET nov_vst = 'X'
    WHERE ROUND((CAST(sal_bas AS MONEY) / 30) * dia_sal, 0) <> (ibc_sal)
    AND nov_sln = ''
    AND nov_vsp = ''
    AND nov_ige = ''
    AND dia_irp = 0
    AND nov_vac = ''
    AND nov_lma = ''
    AND Dia_sal > 0
    AND ind_salIntegral = ''
    AND sal_bas < @nVg60
    AND ibc_sal > ROUND((@nVg60 / 30) * dia_sal, 0);

    WITH RETIRADOS
	    AS (SELECT NumIde_Em,
				ROW_NUMBER() OVER(PARTITION BY NumIde_Em
				ORDER BY NumIde_Em) AS NID
		   FROM #T_RegTip02
		   WHERE Tipo_Cotizante = 1 AND nov_ret = 'X')

	    UPDATE #T_RegTip02
		 SET nov_ret = 'X'
	    FROM #T_RegTip02 AS T
	    INNER JOIN Retirados AS R ON R.NumIde_Em = T.NumIde_Cot
	    WHERE Tipo_Cotizante = 40;

    SELECT @nValNom = SUM(Base_CCF)
    FROM #T_RegTip02;

    UPDATE #T_RegTip01
	 SET Val_nom = @nValNom;

    /******************************************************************************************/
    /*********************************/
    --Registro Tipo 3
    --TOTAL APORTES DEL PERÍODO A PENSIONES POR ADMINISTRADORA
    /*********************************/
    --Armado del registro Tipo 3
    IF @nRegsAdi = 1
    BEGIN
	   SELECT '03' AS Tip_Reg,
			IDENTITY( BIGINT, 1, 1) AS Secuen,
			R2.fdo_pen_Act AS cod_adm_pen,
			SPACE(16) AS num_ide_adm,
			SPACE(1) AS dig_veri_adm,
			CONVERT(BIGINT, SUM(R2.cot_pen)) AS valt_cot_obl_pe,
			CONVERT(BIGINT, SUM(R2.vve_pen)) AS valt_vol_pen_em,
			CONVERT(BIGINT, SUM(R2.vvp_pen)) AS valt_vol_pen_ap,
			CONVERT(BIGINT, SUM(R2.vae_fsp_solid)) AS val_tot_fsp_sol,
			CONVERT(BIGINT, SUM(R2.vae_fsp_subsist)) AS cal_tot_fsp_sub,
			CONVERT(BIGINT, 0) AS dia_mor_pen,
			CONVERT(BIGINT, 0) AS val_mor_pen,
			CONVERT(BIGINT, 0) AS val_mor_fsp_sol,
			CONVERT(BIGINT, 0) AS val_mor_fsp_sub,
			CONVERT(BIGINT, 0) AS tot_pagar_adm_p,
			CONVERT(BIGINT, 0) AS tot_afi_X_adm_p
	   INTO #T_RegTip03
	   FROM #T_RegTip02 AS R2
	   GROUP BY R2.fdo_pen_Act;

    END;
    /*********************************/
    --Registro Tipo 4
    --TOTAL APORTES DEL PERÍODO A SALUD POR ADMINISTRADORA
    /*********************************/

/*
Cargar en temporal los certificados y sus valores para Salud
*/

    SELECT OS.cod_fdo COLLATE database_default AS cod_fdo,
		 F.cod_sgs COLLATE database_default AS cod_sgs,
		 MAX(OS.aut_ieg) AS aut_ieg,
		 CONVERT(BIGINT, SUM(OS.val_ieg)) AS val_ieg,
		 MAX(OS.aut_lma) AS aut_lma,
		 CONVERT(BIGINT, SUM(OS.val_lma)) AS val_lma,
		 MAX(OS.mes_mor) AS mes_mor,
		 CONVERT(BIGINT, SUM(OS.mor_cob)) AS mor_cob,
		 CONVERT(BIGINT, SUM(OS.mor_upc)) AS mor_upc,
		 MAX(OS.aut_sfav) AS aut_sfav,
		 CONVERT(BIGINT, SUM(OS.sfav_cob)) AS sfav_cob,
		 CONVERT(BIGINT, SUM(OS.sfav_upc)) AS sfav_upc
    INTO #T_OtSalud
    FROM rhh_OtSalud AS OS
    INNER JOIN rhh_tbfondos AS F ON F.cod_fdo = OS.cod_fdo
    INNER JOIN rhh_FdoForPag AS P ON P.for_pag = OS.for_pag AND P.ind_planilla = 1
    WHERE CONVERT(BIGINT, ano_dat) = YEAR(@Fch_Data)
		AND CONVERT(BIGINT, per_dat) = MONTH(@Fch_Data)
		AND OS.suc_SS LIKE @cSucSSPar
    GROUP BY OS.cod_fdo,
		   cod_sgs;
    --Armado del registro Tipo 4
    SELECT '04' AS Tip_Reg,
		 IDENTITY( BIGINT, 1, 1) AS Secuen,
		 R2.fdo_sal_act,
		 SPACE(16) AS nit_ter,
		 SPACE(1) AS dvr_ter,
		 CONVERT(BIGINT, SUM(R2.cot_sal)) AS tot_cot_sal,
		 CONVERT(BIGINT, SUM(R2.upc_emp)) AS upc_emp,
		 ISNULL(OS.aut_ieg, SPACE(15)) AS aut_ieg,
		 CONVERT(BIGINT, ISNULL(OS.val_ieg, 0)) AS val_ieg,
		 ISNULL(OS.aut_lma, SPACE(15)) AS aut_lma,
		 CONVERT(BIGINT, ISNULL(OS.val_lma, 0)) AS val_lma,
		 CONVERT(BIGINT, 0) AS val_net_cot_sal,
		 CONVERT(BIGINT, 0) AS nDia_mora_sal,
		 CONVERT(BIGINT, 0) AS val_mor_sal,
		 CONVERT(BIGINT, 0) AS val_mor_upc,
		 CONVERT(BIGINT, 0) AS subt_apo_cot_sa,
		 CONVERT(BIGINT, 0) AS subt_apo_cot_up,
		 ISNULL(OS.aut_sfav, SPACE(15)) AS aut_sfav,
		 CONVERT(BIGINT, ISNULL(OS.sfav_cob, 0)) AS sfav_cob,
		 CONVERT(BIGINT, ISNULL(OS.sfav_upc, 0)) AS sfav_upc,
		 CONVERT(BIGINT, 0) AS tot_cot_obl_sal,
		 CONVERT(BIGINT, 0) AS tot_upc,
		 CONVERT(BIGINT, 0) AS total_pagar_adm,
		 CONVERT(BIGINT, 0) AS tot_fsp_sal,
		 CONVERT(BIGINT, 0) AS tot_afi_adm_sal
    INTO #T_RegTip04
    FROM #T_RegTip02 AS R2
    LEFT OUTER JOIN #T_OtSalud AS OS ON OS.cod_sgs = R2.fdo_sal_act
    GROUP BY fdo_sal_act,
		   OS.aut_ieg,
		   OS.val_ieg,
		   OS.aut_lma,
		   OS.val_lma,
		   OS.aut_sfav,
		   OS.sfav_cob,
		   OS.sfav_upc;

    /******************************************************************************************/
    /*********************************/
    --Registro Tipo 5
    --TOTAL APORTES DEL PERÍODO A RIESGOS PROFESIONALES POR ADMINISTRADORA
    /*********************************/
/*
Cargar en temporal los certificados y sus valores para Riesgos*/

    SELECT OG.cod_fdo COLLATE database_default AS cod_fdo,
		 F.cod_sgs COLLATE database_default AS cod_sgs,
		 MAX(OG.aut_arp) AS aut_arp,
		 CONVERT(BIGINT, SUM(OG.val_arp)) AS val_arp,
		 CONVERT(BIGINT, SUM(OG.val_orie)) AS val_orie,
		 MAX(OG.mes_mor) AS mes_mor,
		 CONVERT(BIGINT, SUM(OG.val_mor)) AS val_mor,
		 MAX(OG.aut_sfav) AS aut_sfav,
		 CONVERT(BIGINT, SUM(OG.val_sfav)) AS val_sfav
    INTO #T_OtRiesgos
    FROM rhh_OtRiesgos AS OG
    INNER JOIN rhh_tbfondos AS F ON F.cod_fdo = OG.cod_fdo
    INNER JOIN rhh_FdoForPag AS P ON P.for_pag = OG.for_pag AND P.ind_planilla = 1
    WHERE CONVERT(BIGINT, ano_dat) = YEAR(@Fch_Data)
		AND CONVERT(BIGINT, per_dat) = MONTH(@Fch_Data)
		AND OG.suc_SS LIKE @cSucSSPar
    GROUP BY OG.cod_fdo,
		   F.cod_sgs;

    --Armado del registro Tipo 6
    SELECT '06' AS Tip_Reg,
		 IDENTITY( BIGINT, 1, 1) AS Secuen,
		 @cCod_sgs_ARP AS Cod_ARP,
		 SPACE(16) AS nit_ter,
		 SPACE(1) AS dvr_ter,
		 CONVERT(BIGINT, SUM(R2.cot_rie)) AS tot_cot_rie,
		 ISNULL(OS.aut_arp, SPACE(15)) AS aut_arp,
		 CONVERT(BIGINT, ISNULL(OS.val_arp, 0)) AS val_arp,
		 CONVERT(BIGINT, ISNULL(OS.val_orie, 0)) AS val_orie,
		 CONVERT(BIGINT, 0) AS val_net_cot_rie,
		 CONVERT(BIGINT, 0) AS nDia_mora_rie,
		 CONVERT(BIGINT, 0) AS val_mor_rie,
		 CONVERT(BIGINT, 0) AS subt_apo_cot_ri,
		 ISNULL(OS.aut_sfav, SPACE(10)) AS aut_sfav,
		 CONVERT(BIGINT, ISNULL(OS.val_sfav, 0)) AS val_sfav,
		 CONVERT(BIGINT, 0) AS total_pagar_adm,
		 CONVERT(BIGINT, 0) AS tot_fsp_rie,
		 CONVERT(BIGINT, 0) AS tot_afi_adm_rie
    INTO #T_RegTip05
    FROM #T_RegTip02 AS R2
    LEFT OUTER JOIN #T_OtRiesgos AS OS ON OS.cod_sgs = @cCod_sgs_ARP
    GROUP BY OS.aut_arp,
		   OS.val_arp,
		   OS.val_orie,
		   OS.aut_sfav,
		   OS.val_sfav;

    /******************************************************************************************/
    /*********************************/
    --Registro Tipo 7
    --TOTAL APORTES PERÍODO AL SENA
    /*********************************/
    IF @nRegsAdi = 1
    BEGIN
	   SELECT '07' AS Tip_Reg,
			IDENTITY( BIGINT, 1, 1) AS Secuen,
			SPACE(16) AS nit_ter,
			SPACE(1) AS dvr_ter,
			SUM(SN.val_SENA) AS val_SENA,
			CONVERT(BIGINT, 0) AS nDia_mora_SENA,
			CONVERT(BIGINT, 0) AS val_mor_SENA,
			CONVERT(BIGINT, 0) AS tot_SENA,
			CONVERT(BIGINT, 0) AS num_emp_SENA
	   INTO #T_RegTip07
	   FROM #T_BasesCCF AS SN;

    END;
    /******************************************************************************************/
    /*********************************/
    --Registro Tipo 8
    --TOTAL APORTES PERÍODO AL ICBF
    /*********************************/
    IF @nRegsAdi = 1
    BEGIN
	   SELECT '08' AS Tip_Reg,
			IDENTITY( BIGINT, 1, 1) AS Secuen,
			SPACE(16) AS nit_ter,
			SPACE(1) AS dvr_ter,
			SUM(SN.val_ICBF) AS val_ICBF,
			CONVERT(BIGINT, 0) AS nDia_mora_ICBF,
			CONVERT(BIGINT, 0) AS val_mor_ICBF,
			CONVERT(BIGINT, 0) AS tot_ICBF,
			CONVERT(BIGINT, 0) AS num_emp_ICBF
	   INTO #T_RegTip08
	   FROM #T_BasesCCF AS SN;
    END;

    UPDATE #T_RegTip02
	 SET fdo_caja = ''
    WHERE fdo_caja = '0';

    UPDATE #T_RegTip02
	 SET fdo_pen_act = ''
    WHERE fdo_pen_act = '0';

    UPDATE #T_RegTip02
	 SET Dpto_Labora = SUBSTRING(dbo.fn_rhh_CiuLabor( E.cod_emp, @Fch_Data, 0 ), 4, 2)
    FROM #T_RegTip02 R
    INNER JOIN Rhh_emplea E ON E.Num_ide = R.NumIde_Em
    WHERE Dpto_Labora IS NULL OR Dpto_Labora = '';

    UPDATE #T_RegTip02
	 SET Muni_Labora = SUBSTRING(dbo.fn_rhh_CiuLabor( E.cod_emp, @Fch_Data, 0 ), 8, 3)
    FROM #T_RegTip02 R
    INNER JOIN Rhh_emplea E ON E.Num_ide = R.NumIde_Em
    WHERE Muni_Labora IS NULL OR Muni_Labora = '' OR Muni_Labora = 0;

    UPDATE #T_RegTip02
	 SET Dpto_Labora = E.cod_dep
    FROM #T_RegTip02 R
    INNER JOIN Rhh_emplea E ON E.Num_ide = R.NumIde_Em
    WHERE Dpto_Labora IS NULL OR Dpto_Labora = '' OR Dpto_Labora = '0000';

    --  /****Validación VST****/
    SELECT DISTINCT
		 h.Cod_emp,
		 e.num_ide
    INTO #T_NOV_VST
    FROM #rhh_liqhis AS h
    INNER JOIN RHH_EMPLEA AS E ON H.cod_emp = e.cod_emp
    WHERE MONTH(fec_cte) = MONTH(@Fch_Data)
		AND YEAR(fec_cte) = YEAR(@Fch_Data)
		AND ind_vst = 1;

    UPDATE #T_RegTip02
	 SET NOV_VST = 'X'
    FROM #T_RegTip02 H
    INNER JOIN #T_NOV_VST N ON H.NumIde_Em = N.Num_Ide
    WHERE H.Nov_vst = ''
		AND h.nov_sln = ''
		AND H.Tipo_Cotizante NOT IN( '19', '12' )
    AND nov_ige = ''
    AND nov_vac = ''
    AND Nov_lma = ''
    AND nov_sln = ''
    AND dia_irp = 0;

    /***Actualiza el campo de exoneración***/
    UPDATE #T_RegTip02
	 SET por_sal = CASE Nov_sln
				    WHEN 'X' THEN CASE
								  WHEN cot_sal = 0 THEN CONVERT(NUMERIC(8, 5), 0.000)
								  ELSE CONVERT(NUMERIC(8, 5), 0.040)
							   END
				    WHEN 'C' THEN CONVERT(NUMERIC(8, 5), 0.000)
				    ELSE CONVERT(NUMERIC(8, 5), 0.040)
				END,
		Cot_Exo = 'S'
    WHERE cot_sal > 0
		AND ibc_sal > 0
		AND @VG148 = 1
		AND (CONVERT(NUMERIC(8, 5), CONVERT(FLOAT, cot_sal) / CONVERT(FLOAT, ibc_sal)) > 0
			AND CONVERT(NUMERIC(8, 5), CONVERT(FLOAT, cot_sal) / CONVERT(FLOAT, ibc_sal)) < 0.05
		    );

    UPDATE #T_RegTip02
	 SET Cot_Exo = 'S'
    WHERE cot_sal = 0 AND ibc_sal = 0 AND Tipo_Cotizante NOT IN( '23', '40' );

    UPDATE #T_RegTip02
	 SET tar_SENA = 0
    WHERE val_SENA = 0;
    UPDATE #T_RegTip02
	 SET @Tar_ICBF = 0
    WHERE val_ICBF = 0;
    UPDATE #T_RegTip02
	 SET tar_CCF = 0
    WHERE val_CCF = 0;

    /*** Aprendices Sena no tienen exoneración**/

    UPDATE #T_RegTip02
	 SET Cot_Exo = 'N',
		NOV_VST = '',
		tar_CCF = 0,
		tar_SENA = 0,
		tar_icbf = 0,
		dia_pen = 0,
		DIA_CCF = 0,
		IBCOtParaf = 0,
		base_ccf = 0,
		fdo_caja = '',
		fdo_pen_Act = '',
		sal_bas = CONVERT(BIGINT, dbo.fn_rhh_VG( 60, @Fch_Data ))
    FROM #T_RegTip02 H
    WHERE H.Tipo_Cotizante IN( '19', '12' );

    UPDATE #T_RegTip02
	 SET Admon_Rie = ''
    FROM #T_RegTip02 H
    WHERE H.Tipo_Cotizante IN( '12' );

    UPDATE #T_RegTip02
	 SET IBCOtParaf = base_ccf
    WHERE tar_sena = 0 AND tar_icbf > 0;

    /*** Registro Tipo 51 No tiene exoneración, no lleva código de eps**/
    UPDATE #T_RegTip02
	 SET Cot_Exo = 'N',
		IBCOtParaf = 0,
		fdo_sal_act = '',
		HorasLab = dia_pen * 8
    FROM #T_RegTip02 H
    WHERE H.Tipo_Cotizante IN( '51' );

    /***Actualiza el porcentaje de salud cuando la cotización es cero***/
    UPDATE #T_RegTip02
	 SET por_sal = CONVERT(NUMERIC(8, 5), 0.0)
    WHERE cot_sal = 0;

    DECLARE @LNR TABLE(
	    NumIde_Em CHAR(20),
	    Cot_exo   CHAR(1)
				  );
    DECLARE @SLNR TABLE(
	    NumIde_Em CHAR(20),
	    Cot_exo   CHAR(1)
				   );
    DECLARE @CAMBIO TABLE(
	    NumIde_Em CHAR(20),
	    Cot_exo   CHAR(1)
					);
    DECLARE @LNR_U TABLE(
	    NumIde_Em CHAR(20)
				    );

    /**Selecciona los empleados con Licencia No Remunerada**/
    INSERT INTO @LNR
    SELECT NumIde_Em,
		 Cot_Exo
    FROM #T_RegTip02
    WHERE nov_sln = 'X';
    /***Selecciona los empleados que tienen registro de Nomina**/
    INSERT INTO @SLNR
    SELECT NumIde_Em,
		 Cot_Exo
    FROM #T_RegTip02
    WHERE Nov_sln = '';

    /***Selecciona los empleados que tienen registros de licencia No Remunerada y De Nómina**/
    INSERT INTO @Cambio
    SELECT N.NumIde_Em,
		 N.Cot_exo
    FROM @LNR AS S
    INNER JOIN @SLNR AS N ON S.NumIde_Em = N.NumIde_Em
    WHERE S.Cot_exo <> N.Cot_exo;

    /***Actualiza los registros  de licencia No remunerada con la marcación de exoneración de los registros de nómina***/
    UPDATE #T_RegTip02
	 SET Cot_Exo = C.Cot_Exo
    FROM #T_RegTip02 R
    INNER JOIN @Cambio C ON C.NumIde_Em = R.NumIde_Em
    WHERE nov_sln = 'X';

    INSERT INTO @LNR_U
    SELECT L.NumIde_Em
    FROM @SLNR AS S
    RIGHT JOIN @LNR AS L ON S.NumIde_Em = L.NumIde_Em
    WHERE S.NumIde_Em IS NULL;

    UPDATE #T_RegTip02
	 SET Cot_Exo = 'S'
    FROM #T_RegTip02 R
    INNER JOIN @LNR_U C ON C.NumIde_Em = R.NumIde_Em
    WHERE nov_sln = 'X' AND Cot_sal = 0;

    UPDATE #T_RegTip02
	 SET TarEspPen = ''
    WHERE TarEspPen = '0';

    UPDATE #T_RegTip02
	 SET IBCOtParaf = 0
    WHERE Cot_exo = 'S';

    UPDATE #T_RegTip02
	 SET HorasLab = 0
    WHERE HorasLab IS NULL;

    IF @Fch_Data > '20200601'
    BEGIN
	   UPDATE #T_RegTip02
		SET ind_salIntegral = dbo.fn_rhh_tipoSalario( NumIde_Em )
	   WHERE LEN(ind_salIntegral) = 0 AND Tipo_Cotizante IN( '1', '2', '20', '22', '32', '58' );

    END;

    /***Evaluación de marca de ingreso para empleados con proyección academica***/
    IF( SELECT emp_apl
	   FROM SIS_APLICACION
	   WHERE COD_APL = 'NOM' ) = 'A'
    BEGIN
	   WITH Proyecta
		   AS (SELECT ROW_NUMBER() OVER(PARTITION BY H.Cod_emp---- Se evaluan los registros del mes anterior que esten en proyección para no marcar el ingreso 
				    ORDER BY H.cod_emp) AS Nid,
				    H.cod_emp,
				    e.num_ide
			  FROM #T_RHH_HISSS AS H
			  INNER JOIN #T_RHH_EMPLEA AS E ON E.Cod_emp = H.cod_emp AND H.Cod_cont = e.cod_cont
			  WHERE H.tip_reg = 'P'
			  UNION ALL-- Se evaluan los registros de los empleados que ingresan el primer día del mes validando que el mes anterior tengan  proyección para no marcar el ingreso 
			  SELECT ROW_NUMBER() OVER(PARTITION BY H.Cod_emp
				    ORDER BY H.cod_emp) AS Nid,
				    H.cod_emp,
				    e.num_ide
			  FROM Rhh_hisss AS H
			  INNER JOIN #T_RHH_EMPLEA AS E ON H.cod_emp = h.cod_emp AND H.fec_cau = @FechaInicio AND tip_reg = 'P'
			  WHERE E.fec_ing = DATEADD(DAY, 1, @FechaInicio))

		   UPDATE #T_RegTip02
			SET Nov_ing = '',
			    FechaIngreso = ''
		   FROM #T_RegTip02 AS R
		   INNER JOIN Proyecta AS P ON R.NumIde_Em = P.num_ide;

    END;

    /**********************/
/*
Registros tipo 3, 6, 9, 10 y 11
no van en el plano. Son generados por el sistema
que recibe el plano
*/
    /**** Inserta información en las tablas creadas para Planilla Unica ****/

    DELETE Rhh_PlaUnica_Reg02
    FROM Rhh_PlaUnica_Reg02 R
    INNER JOIN @SucursaSS AS S ON R.Cod_suc = S.SucursalSS
    WHERE R.Per = @nPer
		AND R.Ano = @nAno
		AND R.Cod_cia LIKE(RTRIM(@cCodCiaPar))
    AND R.Num_Rad LIKE '<%'
    AND R.Tip_Planilla = @Tip_planilla;

    DELETE Rhh_PlaUnica_Reg01
    FROM Rhh_PlaUnica_Reg01 AS R
    INNER JOIN @SucursaSS AS S ON R.Cod_suc = S.SucursalSS
    WHERE R.Per = @nPer
		AND R.Ano = @nAno
		AND R.Cod_cia LIKE(RTRIM(@cCodCiaPar))
    AND R.Num_Rad LIKE '<%'
    AND R.Tip_Planilla = @Tip_planilla;

    IF NOT EXISTS( SELECT *
			    FROM Rhh_PlaUnica_Reg01
			    WHERE Per = @nPer
					AND Ano = @nAno
					AND Tip_planilla = @Tip_Planilla
					AND Cod_cia LIKE(RTRIM(@cCodCiaPar))
			    AND Cod_Suc LIKE(RTRIM(@cSucSSPar)) )
    BEGIN
	   BEGIN TRY

		  INSERT INTO Rhh_PlaUnica_Reg01( Cod_cia,
								    Ano,
								    Per,
								    Tip_Reg,
								    Modal_plani,
								    secuen,
								    Razon_Soc,
								    TipIde_Apo,
								    NumIde_Apo,
								    DigVer_Apo,
								    Tip_planilla,
								    Num_Planill_Aso,
								    Fch_Planill_Aso,
								    FormaPresent,
								    Cod_Suc,
								    Nom_Suc,
								    Cod_ARP,
								    Per_PRC,
								    Per_SAL,
								    Num_Rad,
								    Fch_Pag,
								    Num_Emp,
								    Val_Nom,
								    Tip_Apor,
								    Cod_Ope
								  )
		  SELECT C.cod_cia,
			    @nAno,
			    @nPer,
			    R.Tip_Reg,
			    R.Modal_plani,
			    R.Secuen,
			    R.Razon_Soc,
			    R.TipIde_Apo,
			    R.NumIde_Apo,
			    R.DigVer_Apo,
			    R.Tip_planilla,
			    R.Num_Planill_Aso,
			    R.Fch_Planill_Aso,
			    R.FormaPresent,
			    R.Cod_Suc,
			    R.Nom_Suc,
			    R.Cod_ARP,
			    R.Per_PRC,
			    R.Per_SAL,
			    @NumRad,
			    R.Fch_Pag,
			    R.Num_Emp,
			    R.Val_Nom,
			    R.Tip_Apor,
			    R.Cod_Ope
		  FROM #T_RegTip01 AS R
		  INNER JOIN Gen_compania AS C ON CONVERT(CHAR(16), REPLACE(REPLACE(C.nit_cia, '.', ''), '-', '')) = R.NumIde_Apo
								    AND C.nom_cia = R.Razon_Soc;
	   END TRY
	   BEGIN CATCH
		  EXEC sp_rhh_LiqErrInfo @cMsgErr OUTPUT;
		  SELECT @nErrores = @nErrores + 1;
		  INSERT INTO #t_Error( cod_error,
						    error
						  )
		  VALUES
			    (
			    @nErrores, 'Error en la Asignación del Nro de Radicación' + @cMsgErr );
	   END CATCH;

	   BEGIN TRY

		  INSERT INTO Rhh_PlaUnica_Reg02( Cod_cia,
								    Cod_Suc,
								    Ano,
								    Per,
								    Num_Rad,
								    Tip_Planilla,
								    Tip_reg,
								    Secuen,
								    TipIde_Emp,
								    NumIde_Em,
								    Tipo_Cotizante,
								    SubTip_Cotiza,
								    Ind_Extran,
								    IndColmbExterio,
								    Dpto_Labora,
								    Muni_Labora,
								    ap1_emp,
								    ap2_emp,
								    nom1_emp,
								    nom2_emp,
								    nov_ing,
								    nov_ret,
								    nov_tdas,
								    nov_taas,
								    nov_tdap,
								    nov_taap,
								    nov_vsp,
								    Correccion,
								    nov_vst,
								    nov_sln,
								    nov_ige,
								    nov_lma,
								    nov_vac,
								    nov_avp,
								    nov_vct,
								    dia_irp,
								    fdo_pen_Act,
								    fdo_pen_dest,
								    fdo_sal_act,
								    fdo_sal_dest,
								    fdo_caja,
								    dia_pen,
								    dia_sal,
								    dia_rie,
								    dia_CCF,
								    sal_bas,
								    ind_salIntegral,
								    ibc_pen,
								    ibc_sal,
								    ibc_rie,
								    Base_CCF,
								    por_pen,
								    cot_pen,
								    vve_pen,
								    vvp_pen,
								    tot_cot_pen,
								    vae_fsp_solid,
								    vae_fsp_subsist,
								    nrt_avp,
								    por_sal,
								    cot_sal,
								    upc_emp,
								    nro_ieg,
								    val_ieg,
								    nro_ilm,
								    val_ilm,
								    por_rie,
								    Cent_Trab,
								    cot_rie,
								    tar_CCF,
								    val_CCF,
								    tar_SENA,
								    val_SENA,
								    tar_icbf,
								    val_ICBF,
								    tar_eit,
								    Val_EIT,
								    tar_esap,
								    Val_ESAP,
								    Cot_Exo,
								    NumIde_Cot,
								    TipIde_Cot,
								    FechaIngreso,
								    FechaRetiro,
								    FechaInicioVSP,
								    FechaInicioSLN,
								    FechafinSLN,
								    FechaInicioIEG,
								    FechafinIEG,
								    FechaInicioLMA,
								    FechafinLMA,
								    FechaInicioVac,
								    FechafinVac,
								    FechaInicioVct,
								    FechafinVct,
								    FechaInicioIrl,
								    FechafinIrl,
								    IBCOtParaf,
								    HorasLab,
								    Admon_Rie,
								    ClaseRiesgo,
								    TarEspPen,
								    FecExt,
								    ciiu
								  )
		  SELECT E.cod_cia,
			    E.Cod_suc,
			    @nAno,
			    @nPer,
			    @NumRad,
			    @Tip_planilla,
			    R.Tip_reg,
			    R.Secuen,
			    R.TipIde_Emp,
			    R.NumIde_Em,
			    R.Tipo_Cotizante,
			    R.SubTip_Cotiza,
			    R.Ind_Extran,
			    R.IndColmbExterio,
			    R.Dpto_Labora,
			    --R.Muni_Labora,R.ap1_emp,R.ap2_emp,R.nom1_emp,R.nom2_emp,
			    R.Muni_Labora,
			    SUBSTRING(RTRIM(R.ap1_emp), 1, 20),
			    SUBSTRING(RTRIM(R.ap2_emp), 1, 30),
			    SUBSTRING(RTRIM(R.nom1_emp), 1, 20),
			    SUBSTRING(RTRIM(R.nom2_emp), 1, 30),
			    R.nov_ing,
			    R.nov_ret,
			    R.nov_tdas,
			    R.nov_taas,
			    R.nov_tdap,
			    R.nov_taap,
			    R.nov_vsp,
			    R.Correccion,
			    R.nov_vst,
			    R.nov_sln,
			    R.nov_ige,
			    R.nov_lma,
			    R.nov_vac,
			    R.nov_avp,
			    R.nov_vct,
			    R.dia_irp,
			    ISNULL(R.fdo_pen_Act, 0),
			    R.fdo_pen_dest,
			    R.fdo_sal_act,
			    R.fdo_sal_dest,
			    ISNULL(R.fdo_caja, 0),
			    R.dia_pen,
			    R.dia_sal,
			    R.dia_rie,
			    R.dia_CCF,
			    R.sal_bas,
			    R.ind_salIntegral,
			    R.ibc_pen,
			    R.ibc_sal,
			    R.ibc_rie,
			    R.Base_CCF,
			    R.por_pen,
			    R.cot_pen,
			    R.vve_pen,
			    R.vvp_pen,
			    R.tot_cot_pen,
			    R.vae_fsp_solid,
			    R.vae_fsp_subsist,
			    R.nrt_avp,
			    R.por_sal,
			    R.cot_sal,
			    R.upc_emp,
			    R.nro_ieg,
			    R.val_ieg,
			    R.nro_ilm,
			    R.val_ilm,
			    R.por_rie,
			    ISNULL(R.Cent_Trab, 0),
			    R.cot_rie,
			    R.tar_CCF,
			    R.val_CCF,
			    R.tar_SENA,
			    R.val_SENA,
			    R.tar_icbf,
			    R.val_ICBF,
			    R.tar_eit,
			    R.Val_EIT,
			    R.tar_esap,
			    R.Val_ESAP,
			    R.Cot_Exo,
			    R.NumIde_Cot,
			    R.TipIde_Cot,
			    CONVERT(DATETIME, R.FechaIngreso, 111),
			    CONVERT(DATETIME, R.FechaRetiro, 111),
			    CONVERT(DATETIME, R.FechaInicioVSP, 111),
			    CONVERT(DATETIME, R.FechaInicioSLN, 111),
			    CONVERT(DATETIME, R.FechafinSLN, 111),
			    CONVERT(DATETIME, R.FechaInicioIEG, 111),
			    CONVERT(DATETIME, R.FechafinIEG, 111),
			    CONVERT(DATETIME, R.FechaInicioLMA, 111),
			    CONVERT(DATETIME, R.FechafinLMA, 111),
			    CONVERT(DATETIME, R.FechaInicioVac, 111),
			    CONVERT(DATETIME, R.FechafinVac, 111),
			    CONVERT(DATETIME, R.FechaInicioVct, 111),
			    CONVERT(DATETIME, R.FechafinVct, 111),
			    CONVERT(DATETIME, R.FechaInicioIrl, 111),
			    CONVERT(DATETIME, R.FechafinIrl, 111),
			    R.IBCOtParaf,
			    R.HorasLab,
			    R.Admon_Rie,
			    R.ClaseRiesgo,
			    R.TarEspPen,
			    CONVERT(DATETIME, R.FecExt, 111),
			    R.ciiu
		  FROM #T_RegTip02 AS R
		  INNER JOIN Rhh_PlaUnica_Reg01 AS E ON E.Num_rad = @NumRad;
	   END TRY
	   BEGIN CATCH
		  EXEC sp_rhh_LiqErrInfo @cMsgErr OUTPUT;
		  SELECT @nErrores = @nErrores + 1;
		  INSERT INTO #t_Error( cod_error,
						    error
						  )
		  VALUES
			    (
			    @nErrores, 'Error en la generación del archivo' + @cMsgErr );
	   END CATCH;
    END;

    IF NOT EXISTS( SELECT * FROM #T_RegTip01 )
    BEGIN
	   SELECT @nErrores = @nErrores + 1;
	   INSERT INTO #t_Error( cod_error,
						error,
						ANO,
						PER,
						NumTemp
					   )
	   VALUES
			(
			@nErrores, 'No existen Registros para Procesar', @nAno, @nPer, @NumRad );
    END;
    IF @nErrores = 0
    BEGIN
	   INSERT INTO #t_Error( cod_error,
						error,
						ANO,
						PER,
						NumTemp
					   )
	   VALUES
			(
			@nErrores, 'Proceso Terminado Satisfactoriamente', @nAno, @nPer, @NumRad );
    END;

    SELECT DISTINCT
		 *
    FROM #t_Error;
    SELECT * FROM #T_RegTip01;
    SELECT *
    FROM #T_RegTip02
    ORDER BY Secuen;
    IF @nRegsAdi = 1
    BEGIN
	   SELECT * FROM #T_RegTip03;
    END;
    SELECT * FROM #T_RegTip05;
    IF @nRegsAdi = 1
    BEGIN
	   SELECT * FROM #T_RegTip07;
	   SELECT * FROM #T_RegTip08;
    END;

END;

```
