# Stored Procedure: sp_rhh_importaempleados_masiva_fp

## Usa los objetos:
- [[fn_sis_GetUsuActual]]
- [[Gen_tipide]]
- [[GTH_Contratos]]
- [[GTH_ParamContratos]]
- [[rhh_cargos]]
- [[rhh_ConvCl8]]
- [[rhh_convenio]]
- [[RHH_EMPCONV]]
- [[Rhh_emplea]]
- [[rhh_emplea_masiv_fp]]
- [[Rhh_EmpleaDeducible]]
- [[rhh_Empleo_NovLab]]
- [[rhh_Empleos]]
- [[Rhh_hisfon]]
- [[rhh_hislab]]
- [[rhh_Nomb_Empleo]]
- [[rhh_NovLab]]
- [[rhh_NovLab_TipNov]]
- [[Rhh_tbfondos]]
- [[rhh_TipNovLab]]
- [[Sis_aplicacion]]

```sql
-- exec sp_rhh_importaempleados_masiva_fp

CREATE PROCEDURE [dbo].[sp_rhh_importaempleados_masiva_fp]
 
AS
BEGIN
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
    /*CAMPOS MAESTRO EMPLEADOS*/
    DECLARE @cod_emp          CHAR(12),
		  @num_ide          VARCHAR(15),
		  @tip_ide          CHAR(2),
		  @cod_reloj        VARCHAR(15),
		  @ap1_emp          VARCHAR(50),
		  @ap2_emp          VARCHAR(50),
		  @nom1_emp         VARCHAR(50),
		  @nom2_emp         VARCHAR(50),
		  @fec_nac          DATETIME,
		  @sex_emp          INT,
		  @num_lib          CHAR(12),
		  @cla_lib          SMALLINT,
		  @dim_lib          SMALLINT,
		  @gru_san          CHAR(3),
		  @fac_rhh          CHAR(1),
		  @est_civ          SMALLINT,
		  @nac_emp          SMALLINT,
		  @dir_res          VARCHAR(100),
		  @tel_res          VARCHAR(50),
		  @barrio           VARCHAR(50),
		  @e_mail           VARCHAR(100),
		  @tel_cel          VARCHAR(50),
		  @fec_ing          DATETIME,
		  @ind_pva		NUMERIC(1,0), -- Indicador Pago Prima Vacaciones
		  @fec_bon		DATETIME, -- Fecha de bonificación 
		  @Fec_Aut	     DATETIME, -- Fecha utorización datos
		  @tip_pag          SMALLINT,
		  @cod_ban          CHAR(2),
		  @cta_ban          CHAR(25),
		  @cod_tlq          CHAR(2),
		  @reg_sal          SMALLINT,
		  @cla_sal          SMALLINT,
		  @cod_cia          CHAR(3),
		  @cod_suc          CHAR(3),
		  @cod_cco          CHAR(10),
		  @cod_cl1          VARCHAR(12),
		  @cod_cl2          VARCHAR(12),
		  @cod_cl3          VARCHAR(12),
		  @cod_cl4          VARCHAR(12),
		  @cod_cl5          VARCHAR(12),
		  @cod_cl6          VARCHAR(12),
		  @cod_cl7          VARCHAR(12),
		  @cod_car          CHAR(8),
		  @tip_con          CHAR(2),
		  @fdo_ate          CHAR(4),
		  @por_ate          NUMERIC(9, 4),
		  @fdo_pen          CHAR(4),
		  @fdo_sal          CHAR(4),
		  @ccf_emp          CHAR(4),
		  @fdo_ces          CHAR(4),
		  @met_ret          SMALLINT,
		  @por_ret          NUMERIC(6, 2),
		  @tip_ded          SMALLINT,
		  @mto_dto          MONEY,
		  @sal_bas          MONEY,
		  @dia_vac          SMALLINT,
		  @ind_sab          NUMERIC(1, 0),
		  @prm_sal          MONEY,
		  @cta_gas          CHAR(16),
		  @ind_svar         TINYINT,
		  @ind_pdias        BIT,
		  @mod_liq          CHAR(2),
		  @pai_exp          CHAR(3),
		  @ciu_exp          CHAR(5),
		  @pai_res          CHAR(3),
		  @ciu_res          CHAR(5),
		  @pai_lab          CHAR(3),
		  @ciu_lab          CHAR(5),
		  @pen_emp          SMALLINT,
		  @ind_EmpleapenEmp BIT,
		  @usuario          SYSNAME,
		  @Cod_pai          CHAR(3),
		  @cod_ciu          CHAR(5),
		  @fec_fin          DATETIME,
		  @Cod_CT           INT,
		  @tam_emp          NUMERIC(5, 2),
		  @pes_emp          NUMERIC(5, 2),
		  @cod_area         VARCHAR(12),
		  @Suc_SS           CHAR(10),
		  @sal_ant_flex     MONEY,
		  @por_flex         MONEY,
		  @e_mail_alt       VARCHAR(100),
		  @cta_gasnif       CHAR(16),
		  @ind_discco       TINYINT,
		  @ind_discconif    TINYINT,
		  @per_car          TINYINT,
		  @ind_lider        BIT,
		  @val_hora         MONEY,
		  @cod_pagelec      CHAR(20),
		  @fecexpdoc		DATETIME,
		  @PagarD31		INT,

		  /*campos de historial laboral Fp*/
		  @sec_car		INT, -- Sector del cargo, De la entridad, otras entidades o provado
		  @cod_ins	     CHAR(12), -- Entidad Ext., cuando el cargo no es de la entidad
		  @cod_nov		CHAR(2), -- Novedad, Novedades Laborales
		  @tip_nov	     CHAR(2), -- Tipo, Tipos de Novedades Laborales
		  @cod_empleo	     VARCHAR(4), -- Función
		  @ind_nov	     INT, -- 
		  @cla_nom	     CHAR(2), -- Clases de Nombramiento, Nombramiento(Tipo)
		  @Fec_nov	     DATETIME, -- Fec. Novedad
		  @res_nom		CHAR(14), -- Nombramiento (Resol.)
		  @fre_nom	     DATETIME, -- Nombramiento(Fecha)
		  @ded_horas	     NUMERIC(7,2), -- Nro Horas/Nro Puntos, (Datos básicos 2)
		  @clasif_cat	     CHAR(3), -- Categoría (Datos Básicos 2)
		  @Act_Pose	     VARCHAR(15), -- Acta de Posesión
		  @tie_ded	     INT, -- Tiempo dedicación
		  @por_pag	     FLOAT, -- % pago
		  @cod_mon		CHAR(2);  -- moneda de pago

    /*CAMPOS CONTRATOS - gth_contratos*/
    DECLARE @tip_cot          CHAR(2),
		  @subtip_cot       CHAR(2),
		  @ind_extjero      BIT,
		  @ind_resi_extjero BIT,
		  @cod_pai_cont     CHAR(3),
		  @cod_dep_cont     CHAR(2),
		  @cod_ciu_cont     CHAR(5),
		  @ind_ley1393      BIT,
		  @cod_est          CHAR(2),
		  @ind_contrat      BIT,
		  @ind_L1450        BIT,
		  @fec_cont_ant     DATETIME,
		  @num_cont         VARCHAR(20),
		  @cod_cont         INT,
		  @Tip_VincDian     CHAR(2); -- tipo vinculación DIAN

    /*CAMPOS CONTRATOS - gth_paramcontratos*/
    DECLARE @horas_mes NUMERIC,
		  @ind_phras BIT;

    /*HISTORICO VACACIONES*/

    DECLARE @dias_vac INT;
    DECLARE @dias_vac_ant INT;
    DECLARE @Fec_ini_vac_ant DATETIME;

    /*AFILIACIONES A FONDOS RHH_HISFON*/

    DECLARE @fec_afi_sal DATETIME;
    DECLARE @fec_afi_pen DATETIME;
    DECLARE @fec_afi_ccf DATETIME;
    DECLARE @fec_afi_arp DATETIME;
    DECLARE @fec_afi_ces DATETIME;

    DECLARE @ind_web BIT;
    DECLARE @nom_rem           BIT,
		  @nom_prm           BIT,
		  @ind_con           BIT,
		 
		  /*** Deducibles de Renta***/
		  @DeduSalud         MONEY,
		  @DeduVivienda      MONEY,
		  @Dependiente       TINYINT,
		  /*** Datos Convenio ***/
		  @emp_apl           CHAR(1),
		  @Convenio          CHAR(12),
		  @conv_estruc       INT,
		  @SucursalConvenio  VARCHAR(15),
		  @CcostoConvenio    VARCHAR(30),
		  @Clasificador1Conv VARCHAR(12),
		  @Clasificador2Conv VARCHAR(12),
		  @Clasificador3Conv VARCHAR(12),
		  @Clasificador4Conv VARCHAR(12),
		  @Clasificador5Conv VARCHAR(12),
		  @Clasificador6Conv VARCHAR(12),
		  @Clasificador7Conv VARCHAR(12),
		  @Clasificador8Conv VARCHAR(12),
		  @Estado            SMALLINT;

    DECLARE @nRegIns SMALLINT;

    SET NOCOUNT ON;
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

    BEGIN
	   DECLARE @RowCnt BIGINT;
	   DECLARE @MaxRows BIGINT;
	   DECLARE @cMsgErr VARCHAR(MAX);
	   DECLARE @ind_recontra BIT = 0;
	   

	   SELECT @emp_apl = emp_apl
	   FROM Sis_aplicacion
	   WHERE Cod_apl = 'NOM';

	   CREATE TABLE #T_Error(
		   Empleado  VARCHAR(15) COLLATE DATABASE_DEFAULT NULL,
		   Resultado VARCHAR(5000) COLLATE DATABASE_DEFAULT NULL
					    );

	   SET @nRegIns = 0;

	   SET @usuario = dbo.fn_sis_GetUsuActual();
	   SET @tip_ded = 1;
	   SET @mto_dto = 0;

	   CREATE TABLE #Tempo1(
		   Cod_emp VARCHAR(15) COLLATE DATABASE_DEFAULT NULL,
		   NID     BIGINT
					   );

	   DELETE rhh_emplea_masiv_fp
	   WHERE cod_emp IS NULL;

	   INSERT INTO #Tempo1( Cod_emp,
					    NID
					  )
	   SELECT RTRIM(LTRIM(C.Cod_emp)),
			ROW_NUMBER() OVER(
			ORDER BY C.cod_emp) AS NID
	   FROM rhh_emplea_masiv_fp AS C;

	   SET @RowCnt = 1;

	   SELECT @MaxRows = COUNT(*)
	   FROM #tempo1;

	   IF @MaxRows IS NULL OR @MaxRows <= 0
	   BEGIN
		  INSERT INTO #T_Error
		  VALUES
			    (
			    NULL, 'Lista de Empleados a procesar vacía' );
	   END;

	   UPDATE rhh_emplea_masiv_fp
		SET TipoIdentificacion = T.Cod_tip
	   FROM rhh_emplea_masiv_fp E
	   INNER JOIN Gen_tipide t ON E.tipoIdentificacion = tip_tip;

	   WHILE @RowCnt <= @MaxRows
	   BEGIN

		  SET @ind_recontra = 0;

		  SELECT @cod_emp = RTRIM(LTRIM(cod_emp))
		  FROM #tempo1
		  WHERE @RowCnt = NID;

		  IF EXISTS( SELECT Cod_emp
				   FROM Rhh_emplea
				   WHERE Cod_emp = RTRIM(LTRIM(@cod_emp)) AND est_lab IN(
															  '99', '04'
															 ) )
		  BEGIN
			 SET @ind_recontra = 1;
		  END;

		  SELECT @num_ide = NroIdentificacion,
			    @tip_ide = TipoIdentificacion,
			    @cod_reloj = CodigoAlterno,
			    @ap1_emp = PrimerApellido,
			    @ap2_emp = SegundoApellido,
			    @nom1_emp = PrimerNombre,
			    @nom2_emp = SegundoNombre,
			    @fec_nac = FechaNacimiento,
			    @sex_emp = SexoEmp,
			    @num_lib = NumLibreta,
			    @cla_lib = ClaseLibreta,
			    @dim_lib = distritoLibreta,
			    @gru_san = GrupoSang,
			    @fac_rhh = factorRh,
			    @est_civ = estadocivil,
			    @nac_emp = Nacionalidad,
			    @dir_res = DireccionRes,
			    @tel_res = TelefonoRes,
			    @barrio = Barrio,
			    @e_mail = email,
			    @tel_cel = Celular,
			    @fec_ing = FechaIngreso,
			    @ind_pva = COALESCE(ind_pva,1),
			    @fec_bon = COALESCE(fec_bon,FechaIngreso),
			    @fec_aut = COALESCE(fec_aut,GETDATE()),
			    @tip_pag = TipoPago,
			    @cod_ban = Banco,
			    @cta_ban = CuentaBanco,
			    @cod_tlq = TipoLIquida,
			    @reg_sal = COALESCE(RegimenSal,2),
			    @cla_sal = Clase_Salario,
			    @cod_cia = COALESCE(Compañía,'0'),
			    @cod_suc = COALESCE(Sucursal,'0'),
			    @cod_cco = COALESCE(CentroCosto,'0'),
			    @cod_cl1 = COALESCE(Clasificador1,'0'),
			    @cod_cl2 = COALESCE(Clasificador2,'0'),
			    @cod_cl3 = COALESCE(Clasificador3,'0'),
			    @cod_cl4 = COALESCE(Clasificador4,'0'),
			    @cod_cl5 = COALESCE(Clasificador5,'0'),
			    @cod_cl6 = COALESCE(Clasificador6,'0'),
			    @cod_cl7 = COALESCE(Clasificador7,'0'),
			    @cod_car = CodCargo,
			    @tip_con = COALESCE(tipoContrato,'0'),
			    @fdo_ate = FondoRiegos,
			    @por_ate = Por_Riesgos,
			    @fdo_pen = FondoPension,
			    @fdo_sal = FondoSalud,
			    @ccf_emp = FondoCCF,
			    @fdo_ces = FondoCesant,
			    @met_ret = MetReten,
			    @por_ret = PorcReten,
			    @sal_bas = Salario,
			    @dia_vac = DiasVacacionAno,
			    @ind_sab = SabadoHabil,
			    @prm_sal = PromedioSalud,
			    @cta_gas = CuentaGasto,
			    @ind_svar = Variable,
			    @ind_pdias = COALESCE(PorDias,0),
			    @mod_liq = ModoLiquidacion,
			    @pai_exp = PaisExpIdentif,
			    @ciu_exp = CiudadExpIdent,
			    @pai_res = PaisRes,
			    @ciu_res = CiudadRes,
			    @pai_lab = PaisLab,
			    @ciu_lab = CiuLabor,
			    @pen_emp = Pensionado,
			    @ind_EmpleapenEmp = PensxEmpresa,
			    @cod_pai = PaisNacimiento,
			    @cod_ciu = CiudadNacimiento,
			    @tip_cot = TipCotizante,
			    @subtip_cot = SubtipoCotizante,
			    @ind_extjero = Extranjero,
			    @ind_resi_extjero = ResideExtranjero,
			    @ind_ley1393 = COALESCE(ley1393,0),
			    @ind_contrat = contratista,
			    @ind_L1450 = Ley1450,
			    @cod_ciu_cont = CiuContrato,
			    @cod_pai_cont = PaisContrato,
			    @horas_mes = horasmes,
			    @num_cont = NroContrato,
			    @fec_fin = FechaFinContrato,
			    @Tip_VincDIAN = COALESCE(Tip_VincDIAN,'04'),
			    @Cod_CT = centrotrabajo,
			    @tam_emp = Estatura,
			    @pes_emp = Peso,
			    @cod_area = Area,
			    @Suc_SS = sucursalSS,
			    @sal_ant_flex = COALESCE(SueldoAntesFlex,0),
			    @por_flex = COALESCE(Porcen_Flex,0),
			    @e_mail_alt = EmailAlterno,
			    @cta_gasnif = CuentaGastoNiif,
			    @ind_discco = DistribucionCCosto,
			    @ind_discconif = DistriCCostoNiif,
			    @DeduSalud = DeducibleSalud,
			    @DeduVivienda = DeducibleVivienda,
			    @Dependiente = Dependientes,
			    @per_car = NroPersoCargo,
			    @Convenio = convenio,
			    @SucursalConvenio = SucursalConvenio,
			    @CcostoConvenio = CcostoConvenio,
			    @Clasificador1Conv = Clasificador1Conv,
			    @Clasificador2Conv = Clasificador2Conv,
			    @Clasificador3Conv = Clasificador3Conv,
			    @Clasificador4Conv = Clasificador4Conv,
			    @Clasificador5Conv = Clasificador5Conv,
			    @Clasificador6Conv = Clasificador6Conv,
			    @Clasificador7Conv = Clasificador7Conv,
			    @Clasificador8Conv = Clasificador8Conv,
			    @ind_lider = Lider,
			    @val_hora = valorhora,
			    @cod_pagelec = codpagoElectronico,
			    @fecexpdoc = FechaExpdocId,
			    @PagarD31 = PagarDia31Vac,
			     /*campos de historial laboral Fp*/
				@sec_car = sectcargo,
				@cod_ins = entidadext,
				@cod_nov = COALESCE(novedad,'0'),
				@tip_nov = COALESCE(tiponovedad,'0'),
				@cod_empleo = COALESCE(codempleo,'0'),
				@ind_nov = COALESCE(publicauotra,1),
				@cla_nom = COALESCE(Clasenombramiento,'01'),
				@Fec_nov = COALESCE(fecnovedad,FechaIngreso),
				@res_nom = COALESCE(resolucion,cod_emp),
				@fre_nom = COALESCE(fecharesolucion,FechaIngreso),
				@ded_horas= COALESCE(horasdedicacion,0),
				@clasif_cat = categoria,
				@Act_Pose	= COALESCE(ActaPosesion,cod_emp),
				@tie_ded = COALESCE(tiempodedicac,1),
				@por_pag = COALESCE(porcentajepago,100),
				@cod_mon = COALESCE(CodMon,'00')	 
		  FROM rhh_emplea_masiv_fp
		  WHERE RTRIM(LTRIM(cod_emp)) = @cod_emp;

		  IF @cod_pagelec = '' OR @cod_pagelec IS NULL
		  BEGIN
			 SELECT @cod_pagelec = NroIdentificacion
			 FROM rhh_emplea_masiv_fp
			 WHERE RTRIM(LTRIM(cod_emp)) = @cod_emp;
		  END

		  BEGIN TRY
			 BEGIN TRANSACTION;

			 IF @ind_recontra = 1
			 BEGIN
				UPDATE rhh_emplea
				  SET ap1_emp = @ap1_emp,
					 ap2_emp = ISNULL(@ap2_emp, ''),
					 tip_ide = @tip_ide,
					 pai_exp = @pai_exp,
					 ciu_exp = @ciu_exp,
					 fec_nac = @fec_nac,
					 cod_pai = @cod_pai,
					 cod_dep = RTRIM(SUBSTRING(@cod_ciu, 1, 2)),
					 cod_ciu = @cod_ciu,
					 sex_emp = @sex_emp,
					 num_lib = @num_lib,
					 cla_lib = @cla_lib,
					 dim_lib = @dim_lib,
					 gru_san = @gru_san,
					 fac_rhh = @fac_rhh,
					 est_civ = @est_civ,
					 nac_emp = @nac_emp,
					 dir_res = @dir_res,
					 tel_res = @tel_res,
					 pai_res = @pai_res,
					 dpt_res = RTRIM(SUBSTRING(@ciu_res, 1, 2)),
					 ciu_res = @ciu_res,
					 fec_ing = @fec_ing,
					 ind_pva = @ind_pva,
					 fec_bon = @fec_bon,
					 fec_aut = @fec_aut,
					 tip_pag = @tip_pag,
					 met_ret = @met_ret,
					 por_ret = @por_ret,
					 tip_ded = ISNULL(@tip_ded, 1),
					 mto_dto = ISNULL(@mto_dto, 0),
					 cod_ban = @cod_ban,
					 cta_ban = @cta_ban,
					 reg_sal = @reg_sal,
					 cod_tlq = @cod_tlq,
					 est_lab = '01',
					 pen_emp = @pen_emp,
					 por_ate = @por_ate,
					 sal_bas = @sal_bas,
					 ind_vac = 1,
					 ind_sab = @ind_sab,
					 cta_gas = @cta_gas,
					 ind_svar = @ind_svar,
					 e_mail = @e_mail,
					 tel_cel = @tel_cel,
					 cod_reloj = @cod_reloj,
					 mod_liq = @mod_liq,
					 suc_ban = 0,
					 prm_sal = @prm_sal,
					 dpt_exp = RTRIM(SUBSTRING(@ciu_EXP, 1, 2)),
					 num_ide = @num_ide,
					 barrio = @barrio,
					 nom1_emp = @nom1_emp,
					 nom2_emp = @nom2_emp,
					 ind_EmpleapenEmp = @ind_EmpleapenEmp,
					 dia_vac = @dia_vac,
					 tam_emp = @tam_emp,
					 pes_emp = @pes_emp,
					 ind_discco = @ind_discco,
					 ind_discconif = @ind_discconif,
					 cta_gasnif = @cta_gasnif,
					 e_mail_alt = @e_mail_alt,
					 per_car = @per_car,
					 ind_lider = @ind_lider,
					 cod_pagelec = @cod_pagelec,
					 fec_expdoc = @fecexpdoc,
					 ind_m31 = @PagarD31,
					 ind_pdias =  @ind_pdias
				WHERE cod_emp = RTRIM(LTRIM(@cod_emp));

			 END;
				ELSE
			 BEGIN
				INSERT INTO RHH_EMPLEA( cod_emp,
								    ap1_emp,
								    ap2_emp,
								    tip_ide,
								    pai_exp,
								    ciu_exp,
								    fec_nac,
								    cod_pai,
								    cod_dep,
								    cod_ciu,
								    sex_emp,
								    num_lib,
								    cla_lib,
								    dim_lib,
								    gru_san,
								    fac_rhh,
								    est_civ,
								    nac_emp,
								    dir_res,
								    tel_res,
								    pai_res,
								    dpt_res,
								    ciu_res,
								    fec_ing,
								    ind_pva,
								    fec_bon,
								    fec_aut,
								    tip_pag,
								    met_ret,
								    por_ret,
								    tip_ded,
								    mto_dto,
								    cod_ban,
								    cta_ban,
								    reg_sal,
								    cod_tlq,
								    est_lab,
								    pen_emp,
								    por_ate,
								    sal_bas,
								    ind_vac,
								    ind_sab,
								    cta_gas,
								    ind_svar,
								    e_mail,
								    tel_cel,
								    cod_reloj,
								    mod_liq,
								    suc_ban,
								    prm_sal,
								    dpt_exp,
								    num_ide,
								    barrio,
								    nom1_emp,
								    nom2_emp,
								    ind_EmpleapenEmp,
								    dia_vac,
								    tam_emp,
								    pes_emp,
								    ind_discco,
								    ind_discconif,
								    cta_gasnif,
								    e_mail_alt,
								    per_car,
								    ind_lider,
								    cod_pagelec,
								    fec_expdoc,
								    ind_m31,
								    ind_pdias,
									fec_aum
								  )
				VALUES
					  (
					  RTRIM(LTRIM(@cod_emp)), @ap1_emp, ISNULL(@ap2_emp, ''), @tip_ide, @pai_exp, @ciu_exp, @fec_nac, @cod_pai, RTRIM(SUBSTRING(
					  @cod_ciu, 1, 2)), @cod_ciu, @sex_emp, @num_lib, @cla_lib, @dim_lib, @gru_san, @fac_rhh, @est_civ, @nac_emp, @dir_res,
					  @tel_res, @pai_res, RTRIM(SUBSTRING(@ciu_res, 1, 2)), @ciu_res, @fec_ing, @ind_pva, @fec_bon, @fec_aut, @tip_pag, 
					  @met_ret, @por_ret, @tip_ded, @mto_dto, @cod_ban, @cta_ban, @reg_sal, @cod_tlq, '01', @pen_emp, @por_ate, @sal_bas, 1, 
					  @ind_sab, @cta_gas, @ind_svar, @e_mail, @tel_cel, @cod_reloj, @mod_liq, 0, @prm_sal, RTRIM(SUBSTRING(@ciu_EXP, 1, 2)), 
					  @num_ide, @barrio, @nom1_emp, ISNULL(@nom2_emp, ''), @ind_EmpleapenEmp, @dia_vac, @tam_emp, @pes_emp, @ind_discco, 
					  @ind_discconif, @cta_gasnif, @e_mail_alt, @per_car, @ind_lider, @cod_pagelec, @fecexpdoc, @PagarD31, @ind_pdias, @fec_ing );
			 END;

			 INSERT INTO GTH_Contratos( [cod_emp],
								   [num_cont],
								   [tip_con],
								   [fec_con],
								   [not_con],
								   [cla_sal],
								   [tip_cot],
								   [SubTip_Cot],
								   [ind_extjero],
								   [ind_resi_extjero],
								   [cod_pai],
								   [cod_dep],
								   [cod_ciu],
								   [ind_ley1393],
								   [cod_est],
								   [ind_contrat],
								   [ind_L1450],
								   [Tip_VincDIAN]
								 )
			 VALUES
				   (
				   RTRIM(LTRIM(@cod_emp)), @num_cont, @tip_con, @fec_ing,
				   'Generado por Proceso Masivo Contratos', @cla_sal, @tip_cot, @subtip_cot, @ind_extjero, @ind_resi_extjero, @cod_pai_cont, RTRIM(
				   SUBSTRING(@cod_ciu_cont, 1, 2)), @cod_ciu_cont, @ind_ley1393, '1 ', @ind_contrat, @ind_L1450, @tip_VincDIAN );

			 SELECT @cod_cont = SCOPE_IDENTITY();

			 INSERT INTO GTH_ParamContratos( [cod_emp],
									   [cod_con],
									   [fec_param],
									   [cla_sal],
									   [horas_mes],
									   [mod_liq],
									   [ind_phras]
									 )
			 VALUES
				   (
				   RTRIM(LTRIM(@cod_emp)), @cod_cont, @fec_ing, @cla_sal, @horas_mes, @mod_liq, 0 );

			 IF @emp_apl = 'T'
			 BEGIN
				SELECT @Estado = ind_estado
				FROM rhh_convenio
				WHERE cod_conv = @Convenio;

				IF @Estado = 2
				BEGIN
				    SET @cMsgErr = 'El convenio  ' + RTRIM(LTRIM(@Convenio)) + ' asociado al empleado : ' + RTRIM(LTRIM(@cod_emp)) +
				    ' Esta en estado inactivo. ';
				    RAISERROR(@cMsgErr, 18, -1);
				END;

				SELECT @conv_estruc = conv_estruc
				FROM rhh_ConvCl8
				WHERE cod_conv = @convenio
					 AND conv_suc = @SucursalConvenio
					 AND conv_cco = @CcostoConvenio
					 AND conv_cl1 = @Clasificador1Conv
					 AND conv_cl2 = @Clasificador2Conv
					 AND conv_cl3 = @Clasificador3Conv
					 AND conv_cl4 = @Clasificador4Conv
					 AND conv_cl5 = @Clasificador5Conv
					 AND conv_cl6 = @Clasificador6Conv
					 AND conv_cl7 = @Clasificador7Conv
					 AND conv_cl8 = @Clasificador8Conv;

				IF @conv_estruc IS NULL
				BEGIN
				    SET @cMsgErr = 'La Estrucura de Costos definidas para el convenio  del empleado : ' + RTRIM(LTRIM(@cod_emp)) + ' no existe. ';
				    RAISERROR(@cMsgErr, 18, -1);
				END;
				    ELSE
				BEGIN
				    INSERT INTO RHH_EMPCONV( cod_emp,
									    cod_conv,
									    conv_suc,
									    conv_cco,
									    fec_ini,
									    conv_cl1,
									    conv_cl2,
									    conv_cl3,
									    conv_cl4,
									    conv_cl5,
									    conv_cl6,
									    conv_cl7,
									    conv_cl8
									  )
				    VALUES
						 (
						 RTRIM(LTRIM(@cod_emp)), @convenio, @SucursalConvenio, @CcostoConvenio, @fec_ing, @Clasificador1Conv,
						 @Clasificador2Conv, @Clasificador3Conv, @Clasificador4Conv, @Clasificador5Conv, @Clasificador6Conv, @Clasificador7Conv,
						 @Clasificador8Conv );

				END;

			 END;

			 IF @emp_apl = 'O'
			 BEGIN
				DECLARE @Cod_Nov_Vali CHAR(2);
				DECLARE @ind_trslpo TINYINT;
				DECLARE @cClaEmpl CHAR(2);
				

				SELECT @ind_trslpo = ind_trslpo
				FROM rhh_TipNovLab
				WHERE tip_nov = @tip_nov;


				SELECT @Cod_Nov_Vali = CASE
									  WHEN @ind_trslpo = 1 THEN( SELECT H.cod_nov
														    FROM rhh_hislab AS H
														    INNER JOIN rhh_TipNovLab AS N ON H.tip_nov = N.tip_nov
														    WHERE H.cod_emp = @cod_emp
																AND ((@fec_ing >= H.fec_ini AND (@fec_ing <= H.fec_fin OR H.fec_fin IS NULL
																						  )
																	)
																	AND (@fec_fin >= H.fec_ini AND (@fec_fin <= H.fec_fin OR H.fec_fin IS NULL
																							 )
																	    )
																    )
																AND N.ind_trslpo = 0
																AND sec_car = 1 )
									  WHEN @ind_trslpo = 0
										  AND ( SELECT COUNT(1)
											   FROM rhh_hislab AS H
											   INNER JOIN rhh_TipNovLab AS N ON H.tip_nov = N.tip_nov
											   WHERE H.cod_emp = @cod_emp AND (H.fec_fin < @fec_ing) AND N.ind_trslpo = 0 AND sec_car = 1 ) > 0 THEN(
											   SELECT H.tip_nov
											   FROM rhh_hislab AS H
											   INNER JOIN rhh_TipNovLab AS N ON H.tip_nov = N.tip_nov
											   WHERE H.cod_emp = @cod_emp
												    AND N.ind_trslpo = 0
												    AND sec_car = 1
												    AND fec_ini = (
												    SELECT MAX(fec_ini)
												    FROM rhh_hislab AS H
												    INNER JOIN rhh_TipNovLab AS N ON H.tip_nov = N.tip_nov
												    WHERE H.cod_emp = @cod_emp AND (H.fec_fin < @fec_ing) AND N.ind_trslpo = 0 AND sec_car = 1
															   ) )
									  ELSE NULL
								   END;

				    SELECT @cClaEmpl = cla_emp
				    FROM rhh_Empleos
				    WHERE cod_empleo = @cod_empleo;

					 SET @cMsgErr = CASE
								    WHEN @cod_empleo <> '0' AND (@cClaEmpl IS NULL OR @cClaEmpl = ''
														  ) THEN 'Debe Seleccionar una Función o Rol.'
								    WHEN @cla_nom IS NULL OR @cla_nom = '' THEN 'Debe Seleccionar la Clase de Nombramiento.'
								    WHEN( SELECT COUNT(1)
										  FROM rhh_NovLab_TipNov
										  WHERE cod_nov = @cod_nov AND tip_nov = @tip_nov ) = 0 THEN
										  'La combinación de la Novedad y Tipo de Novedad no está definida.'
								    WHEN @cod_empleo <> '0'
									   AND ( SELECT COUNT(1)
											 FROM rhh_Empleo_NovLab
											 WHERE cla_emp = @cClaEmpl AND cod_nov = @cod_nov AND tip_nov = @tip_nov ) = 0 THEN
											 'El tipo de Funcion o Rol, no está definido para esa Novedad y/o tipo de Novedad.'
								    WHEN @cod_empleo <> '0'
									   AND ( SELECT COUNT(1)
											 FROM rhh_Nomb_Empleo
											 WHERE cla_emp = @cClaEmpl AND cla_nom = @cla_nom ) = 0 THEN
											 'El tipo de Función o Rol no admite el tipo de Nombramiento establecido.'
								    WHEN @ind_trslpo = 1
									   AND ( SELECT CASE uni_tpo
													   WHEN 'D' THEN DATEADD(dd, (
																SELECT can_tpo
																FROM rhh_TipNovLab
																WHERE tip_nov = @tip_nov
																		  ), @fec_ing)
													   WHEN 'M' THEN DATEADD(mm, (
																SELECT can_tpo
																FROM rhh_TipNovLab
																WHERE tip_nov = @tip_nov
																		  ), @fec_ing)
													   WHEN 'A' THEN DATEADD(yy, (
																SELECT can_tpo
																FROM rhh_TipNovLab
																WHERE tip_nov = @tip_nov
																		  ), @fec_ing)
												    END
											 FROM rhh_TipNovLab
											 WHERE tip_nov = @tip_nov ) < @fec_fin 
											 THEN 'El intervalo supera el limite de duración para el tipo de novedad indicado.'
									  WHEN @ind_trslpo = 0
										  AND @fec_fin IS NOT NULL
										  AND ( SELECT CASE uni_tpo
													    WHEN 'D' THEN DATEADD(dd, (
																   SELECT can_tpo
																   FROM rhh_NovLab
																   WHERE cod_nov = @cod_nov
																			), @fec_ing)
													    WHEN 'M' THEN DATEADD(mm, (
																   SELECT can_tpo
																   FROM rhh_NovLab
																   WHERE cod_nov = @cod_nov
																			), @fec_ing)
													    WHEN 'A' THEN DATEADD(yy, (
																   SELECT can_tpo
																   FROM rhh_NovLab
																   WHERE cod_nov = @cod_nov
																			), @fec_ing)
													END
											   FROM rhh_NovLab
											   WHERE cod_nov = @cod_nov ) < @fec_fin 
											   THEN  'El intervalo supera el limite de duración para la novedad indicada.'
						             WHEN @cod_car NOT IN (SELECT COD_CAR
													   FROM rhh_cargos
													   WHERE cod_car = @cod_car)
									   THEN 'EL Cargo ' + @cod_car + ' no existe'
							  END;

				      

				 IF @cMsgErr IS NULL
				 BEGIN
				    INSERT INTO RHH_HISLAB( cod_emp,
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
									   cod_ciu,
									   cod_dep,
									   cod_pai,
									   fec_ini,
									   fec_fin,
									   sal_bas,
									   tip_con,
									   sec_car,
									   cod_con,
									   nue_con,
									   fec_nov,
									   cod_ct,
									   cod_area,
									   sal_ant_flex,
									   por_flex,
									   suc_SS,
									   val_hora,
									   cod_ins,
									   cod_nov,
									   tip_nov,
									   cod_empleo,
									   ind_nov,
									   cla_nom,
									   res_nom,
									   fre_nom,
									   ded_horas,
									   clasif_cat,
									   Act_Pose,
									   tie_ded,
									   tip_pag,
									   cod_mon
									   )
				    VALUES
						  (
						  RTRIM(LTRIM(@cod_emp)), @cod_cia, @cod_suc, @cod_cco, @cod_cl1, @cod_cl2, @cod_cl3, @cod_cl4, @cod_cl5, @cod_cl6, @cod_cl7,
						  @cod_car, @ciu_lab, RTRIM(SUBSTRING(@ciu_lab, 1, 2)), @pai_lab, @Fec_Ing, @fec_fin, @sal_bas, @tip_con, @sec_car, @cod_cont, 1,
						  GETDATE(), @Cod_CT, @cod_area, @sal_ant_flex, @por_flex, @Suc_SS, @val_hora, @cod_ins,@cod_nov, @tip_nov,
						  @cod_empleo,@ind_nov, @cla_nom, @res_nom, @fre_nom, @ded_horas, @clasif_cat, @Act_Pose, @tie_ded, @por_pag, @cod_mon );
				 END;
				 ELSE 
				    RAISERROR(@cMsgErr, 18, -1);
			 END;

			
			 

			 /****AFILIACIONES A FONDOS****/

			 IF EXISTS( SELECT Cod_fdo
					  FROM Rhh_tbfondos
					  WHERE Cod_fdo = @fdo_pen )
			 BEGIN
				INSERT INTO Rhh_hisfon( cod_emp,
								    cod_fdo,
								    fec_afi,
								    fec_ter,
								    tip_fdo,
								    tip_nov
								  )
				VALUES
					  (
					  RTRIM(LTRIM(@cod_emp)), @fdo_pen, @fec_ing, NULL, 1, 1 );
			 END;
				ELSE
			 BEGIN
				SET @cMsgErr = ' El fondo de pensión no existe para el empleado: ' + RTRIM(LTRIM(@cod_emp));
				RAISERROR(@cMsgErr, 18, -1);
			 END;
			 IF EXISTS( SELECT Cod_fdo
					  FROM Rhh_tbfondos
					  WHERE Cod_fdo = @fdo_sal )
			 BEGIN
				INSERT INTO Rhh_hisfon( cod_emp,
								    cod_fdo,
								    fec_afi,
								    fec_ter,
								    tip_fdo,
								    tip_nov
								  )
				VALUES
					  (
					  RTRIM(LTRIM(@cod_emp)), @fdo_sal, @fec_ing, NULL, 2, 1 );
			 END;
				ELSE
			 BEGIN
				SET @cMsgErr = ' El fondo de Salud no existe para el empleado: ' + RTRIM(LTRIM(@cod_emp));
				RAISERROR(@cMsgErr, 18, -1);
			 END;
			 IF EXISTS( SELECT Cod_fdo
					  FROM Rhh_tbfondos
					  WHERE Cod_fdo = @fdo_ate )
			 BEGIN
				INSERT INTO Rhh_hisfon( cod_emp,
								    cod_fdo,
								    fec_afi,
								    fec_ter,
								    tip_fdo,
								    tip_nov
								  )
				VALUES
					  (
					  RTRIM(LTRIM(@cod_emp)), @fdo_ate, @fec_ing, NULL, 3, 1 );
			 END;
				ELSE
			 BEGIN
				SET @cMsgErr = ' El fondo de Riesgo no existe para el empleado: ' + RTRIM(LTRIM(@cod_emp));
				RAISERROR(@cMsgErr, 18, -1);
			 END;

			 IF EXISTS( SELECT Cod_fdo
					  FROM Rhh_tbfondos
					  WHERE Cod_fdo = @ccf_emp )
			 BEGIN
				INSERT INTO Rhh_hisfon( cod_emp,
								    cod_fdo,
								    fec_afi,
								    fec_ter,
								    tip_fdo,
								    tip_nov
								  )
				VALUES
					  (
					  RTRIM(LTRIM(@cod_emp)), @ccf_emp, @fec_ing, NULL, 4, 1 );
			 END;
				ELSE
			 BEGIN
				SET @cMsgErr = ' La Caja de Compensación no existe para el empleado: ' + RTRIM(LTRIM(@cod_emp));
				RAISERROR(@cMsgErr, 18, -1);
			 END;

			 IF EXISTS( SELECT Cod_fdo
					  FROM Rhh_tbfondos
					  WHERE Cod_fdo = @fdo_ces )
			 BEGIN
				INSERT INTO Rhh_hisfon( cod_emp,
								    cod_fdo,
								    fec_afi,
								    fec_ter,
								    tip_fdo,
								    tip_nov
								  )
				VALUES
					  (
					  RTRIM(LTRIM(@cod_emp)), @fdo_ces, @fec_ing, NULL, 5, 1 );
			 END;
				ELSE
			 BEGIN
				SET @cMsgErr = ' El fondo de Cesantias no existe para el empleado: ' + RTRIM(LTRIM(@cod_emp));
				RAISERROR(@cMsgErr, 18, -1);
			 END;

			 IF @DeduVivienda > 0
			 BEGIN
				INSERT INTO Rhh_EmpleaDeducible( Cod_Deducible,
										   Cod_emp,
										   Fec_ini,
										   Val_Deduc
										 )
				VALUES
					  (
					  1, RTRIM(LTRIM(@cod_emp)), @fec_ing, @DeduVivienda );
			 END;

			 IF @DeduSalud > 0
			 BEGIN
				INSERT INTO Rhh_EmpleaDeducible( Cod_Deducible,
										   Cod_emp,
										   Fec_ini,
										   Val_Deduc
										 )
				VALUES
					  (
					  2, RTRIM(LTRIM(@cod_emp)), @fec_ing, @DeduSalud );

			 END;
			 IF @Dependiente > 0
			 BEGIN
				INSERT INTO Rhh_EmpleaDeducible( Cod_Deducible,
										   Cod_emp,
										   Fec_ini,
										   Val_Deduc
										 )
				VALUES
					  (
					  3, RTRIM(LTRIM(@cod_emp)), @fec_ing, 1 );
			 END;

			 INSERT INTO #T_Error
			 VALUES
				   (
				   RTRIM(LTRIM(@cod_emp)), 'Nuevo empleado Creado' );

			 SET @RowCnt = @RowCnt + 1;

			 IF XACT_STATE() = 1
			 BEGIN
				COMMIT TRANSACTION;
			 END;
		  END TRY
		  BEGIN CATCH

			 SET @cMsgErr = 'Error :' + RTRIM(CONVERT(CHAR, ERROR_NUMBER())) + ', ' + 'Severidad :' + RTRIM(CONVERT(CHAR, ERROR_SEVERITY())) +
			 ', ' + 'Procedimiento :' + RTRIM(ISNULL(ERROR_PROCEDURE(), '')) + ', ' + 'En la Línea :' + RTRIM(CONVERT(CHAR, ERROR_LINE())) + ': '
			 + ERROR_MESSAGE();

			 SET @RowCnt = @RowCnt + 1;

			 IF XACT_STATE() <> 0
			 BEGIN
				ROLLBACK TRANSACTION;
			 END;
			 IF XACT_STATE() = 1
			 BEGIN
				COMMIT TRANSACTION;
			 END;
			 SET @nRegIns = @nRegIns + 1;

			 INSERT INTO #T_Error
			 VALUES
				   (
				   RTRIM(LTRIM(@cod_emp)), 'Error creando Empleado, Mensaje:' + @cMsgErr );
		  END CATCH;
	   END;

	      DELETE rhh_emplea_masiv_fp;

	   IF @nRegIns = 0
	   BEGIN
		  INSERT INTO #T_Error
		  VALUES
			    (
			    NULL, 'Creados Correctamente ' + RTRIM(CONVERT(CHAR, @RowCnt - 1)) + ' Empleados' );
	   END;

	   SELECT * FROM #T_Error;
    END;
END;

```
