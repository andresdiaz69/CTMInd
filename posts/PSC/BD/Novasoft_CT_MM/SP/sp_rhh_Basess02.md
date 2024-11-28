# Stored Procedure: sp_rhh_Basess02

## Usa los objetos:
- [[fn_rhh_SS_Cotizacion]]
- [[fn_rhh_ss_fsp]]
- [[fn_rhh_VG]]
- [[rhh_ausentismo]]
- [[rhh_concliq]]
- [[rhh_pertlq]]
- [[rhh_SSTipReg]]
- [[Rhh_TbClasAus]]
- [[rhh_TbTipAus]]
- [[sis_aplicacion]]
- [[sp_rhh_SS_InsertaRhhHisss]]
- [[Sp_rhh_SSAjusteRegistro]]
- [[sp_rhh_SSibcsalhisss]]

```sql
CREATE PROCEDURE [dbo].[sp_rhh_Basess02]
	@Codigo           CHAR(12),
	@cod_tlq          CHAR(2), /* w.cod_tlq. '1 ' Quincenal, '2 ' Mensual */
	@Fec_Ini          DATETIME, /*Fecha De Inicio del periodo a liquidar*/
	@Fec_Fin          DATETIME, /* Feccorte */
	@Fec_Liq          DATETIME, /* Fec_Liqui */
	@SalMin           MONEY, /*Salario Minimo - puede variar de acuerdo a parametrización Integrales*/
	@VG51             MONEY, /*Topes en salario para riesgos profesionales*/
	@Vg48             MONEY, /* Nro de Salarios Minimos para liquidar fondo de solidaridad pensional*/
	@FdoSal           CHAR(4), /*Código Fondo Salud*/
	@FdoPen           CHAR(4), /*Código Fondo Pensión*/
	@FdoAte           CHAR(4), /*Código Fondo Riesgos*/
	@PorPatSal        FLOAT, /*Porcentaje Aporte Patrón Salud*/
	@PorPatPen        FLOAT, /*Porcentaje Aporte Patrón Pensión*/
	@PorPatPar        FLOAT, /*Porcentaje Aporte Patrón */
	@PorPatRie        FLOAT, /*Porcentaje Aporte Patrón Riesgos*/
	@PorEmpSal        FLOAT, /*Porcentaje Aporte Empleado Salud*/
	@PorEmpPen        FLOAT, /*Porcentaje Aporte Empleado Pensión*/
	@PorEmpFSP        FLOAT, /*Porcentaje Aporte Empleado FSP*/
	@AltRiesgo        BIT, /*Indicador Alto Riesto*/
	@apl_con          SMALLINT, /* concep.apl_con  1=1a. Quincena, 2=2a. Quincena, 3=Ambas, 4=Ninguna */
	@tip_liq          CHAR(2), /* tipo de liquidacion '01','04' */
	@Vg75             FLOAT, /* Factor salarial salario Integral*/
	@tip_con          CHAR(2), /*Tipo de Contratro*/
	@CodCont          BIGINT, /*Codigo Contrato*/
	@IDL_Num          BIGINT, /* Nro Identificación liquidación*/
	@Ind_Inc31        BIT, /*Indicador Pago Incapacidad día 31*/
	@Ind_Lnr31        BIT, /*Indicador Pago LNR día 31*/
	@IBC_Incap        BIT, /*Ibc incapacidad mes actual - mes anterior a inicio de incapacidad */
	@Ind_apsalPat_Lnr BIT, /*Indicador Patron aporta salud en LNR*/
	@Ind_ApsalEmp_Lnr BIT, /*Indicador Empleado aporta salud en LNR*/
	@Ind_appenPat_Lnr BIT, /*Indicador Patron aporta pensión en LNR*/
	@Ind_appenEmp_Lnr BIT, /*Indicador Empleado aporta pension en LNR*/
	@Apo_Penp100      BIT, /*Indicador Patron aporta pensión 100 */
	@Apo_Salp100      BIT, /*Indicador Patron aporta salud 100 */
	@Pen_emp          BIT, /*Indicador Empleado aporta pensión  */
	@Cla_Sal          TINYINT, /*Indicador Patron aporta pensión 100 */
	@Mod_liq          CHAR(2), /*Modo liquidación empleado*/
	@Apo_sal          BIT, /*Indicador Aporta salud*/
	@Apo_pen          BIT, /*Indicador Aporta pension*/
	@Apo_rie          BIT, /*Indicador Aporta Riesgos*/
	@Apo_Parafiscales BIT, /*Indicador Aporta Parafiscales*/
	@VG94             MONEY, /* Indicador Registro Licencia No Remunerada en linea separada*/
	@SalminNor        MONEY, /*Salario minimo Normal*/
	@Sal_Bas          MONEY, /*Salario básico del empleado*/
	@IndProp25SMLV    BIT, /*Indicador de proporcionalidad para tope de 25 smlv*/
	@VG47             MONEY, /*Número de salario minimos para tope mázimo de seguridad social*/
	@Vg34             BIT, /* Porcentaje empleado fondo de solidaridad*/
	@ibc_min          TINYINT, /*Define en caso de haber ajuste por el minimo quien lo asume 1-Patron 2- Empleado, 3.-Ambos,4.- Un porcentaje*/
	@Ibc_por          NUMERIC(5, 2), /*Porcentaje para asumir diferencia en minimo*/
	@nLiNoRem         INT OUTPUT,
	@ind_pdias        BIT,
	@PorPatCCF        FLOAT, /*Porcentaje Caja*/
	@PorPatSENA       FLOAT, /*Porcentaje Sena*/
	@PorPatICBF       FLOAT, /*Porcentaje ICBF*/
	@PorPatEIT        FLOAT,
	@PorPatESAP       FLOAT,
	@Res2388          BIT,
	@RedLinea         BIT,
	@Ind_Contratista  BIT
--WITH ENCRYPTION
AS
BEGIN
    SET NOCOUNT ON;
    /** Si el concepto de incapacidad no esta asociado al tipo de liquidación no se liquidan las incapacidades**/
    IF NOT EXISTS( SELECT Cod_con
			    FROM rhh_concliq
			    WHERE Cod_con = '001150' AND tip_liq = @tip_liq )
    BEGIN
	   RETURN;
    END;

    DECLARE @nDiaInc SMALLINT;
    DECLARE @cCod_con CHAR(6);
    DECLARE @cCod_Pago CHAR(6);
    DECLARE @nDias SMALLINT;
    DECLARE @ValIBC MONEY; /*Es el IBC corresppondiente a los @nDias únicamente*/
    DECLARE @ValFSP MONEY; /** Valor fondo solidaridad Pensional**/
    DECLARE @ValFSubsistencia MONEY;
    DECLARE @val_IBC MONEY;
    DECLARE @val_IBC_DIA MONEY;
    DECLARE @nInd31Inc BIT;
    DECLARE @nInd31LNR BIT;
    DECLARE @nCanDia31 SMALLINT;
    DECLARE @nDia31 SMALLINT;
    DECLARE @FfecFinRef DATETIME;
    DECLARE @ModLiq CHAR(2);
    DECLARE @BaseSal MONEY,
		  @BasePen MONEY,
		  @BaseRie MONEY;
    DECLARE @BaseDia INT;
    DECLARE @nIndHiss BIT;
    DECLARE @indap8sal BIT;		/*Aporta el patrono el % de salud en LIc No Remun*/
    DECLARE @IndApPen BIT;		/*Aporta el patrono el % de pension en LIc No Remun*/
    DECLARE @IndApPen_Emp BIT;	/*Aporta el empleado el % de pension en LIc No Remun*/
    DECLARE @IndApSal_Emp BIT;	/*Aporta el empleado el % de pension en LIc No Remun*/
    --DECLARE	@pen_emp	smallint /*Empleado Pensionado*/
    DECLARE @nSalBas MONEY;
    DECLARE @nInd31 BIT;
    DECLARE @ValAporTotal MONEY;
    DECLARE @ValAporTotalRed MONEY;
    DECLARE @ValAjuApoRedSal MONEY;

    /*Indicadores par saber si el contrato del empleado se le liquida pension , salud y/o riesgos */
    DECLARE @Apo_PenTc BIT;
    DECLARE @Apo_SalTc BIT;
    DECLARE @Apo_RieTc BIT;

    DECLARE @ValIBC_Pen MONEY;
    DECLARE @nDias_Pen MONEY;
    DECLARE @CodAus CHAR(2);
    DECLARE @ind_extjero BIT;
    DECLARE @IBC_IncapLNR BIT;

    DECLARE @Slmv MONEY;
    DECLARE @apl_iss BIT;
    DECLARE @Vibc_per MONEY;
    DECLARE @PorEmpFSP_Ini NUMERIC(5, 3);
    DECLARE @ValFSPT MONEY;
    DECLARE @ndiasper SMALLINT;
    DECLARE @Contador SMALLINT;
    DECLARE @Max SMALLINT;
    DECLARE @Nreg SMALLINT;
    DECLARE @ind_pro BIT;
    DECLARE @Cla_aus VARCHAR(2);
    DECLARE @FecRealAusen DATE;
    DECLARE @cernro_origen VARCHAR(30);
    DECLARE @Val_IbcPerInc MONEY;
    DECLARE @Val_IbcPerLNR MONEY;
    DECLARE @DiasPerInc SMALLINT;
    DECLARE @DiasPerLNR SMALLINT;
    DECLARE @ValIBCLNR MONEY;
    DECLARE @ValIBCINC MONEY;
    DECLARE @DiasLNR SMALLINT;
    DECLARE @DiasINC SMALLINT;
    DECLARE @AjusteIBL MONEY;
    DECLARE @cCodAus CHAR(2);
    DECLARE @Ausent TABLE(
	    cod_aus        CHAR(2),
	    cla_aus        CHAR(2),
	    cod_con        CHAR(6),
	    Cod_conPago    CHAR(6),
	    ind_hsp        BIT,
	    ini_aus        DATETIME,
	    fin_aus        DATETIME,
	    dia_aus        SMALLINT,
	    d31_aus        TINYINT,
	    fec_ini_cau    DATETIME,
	    fec_fin_cau    DATETIME,
	    cer_nro        VARCHAR(20),
	    ind_pro        BIT,
	    cernro_origen  VARCHAR(20),
	    ibc_sal        MONEY,
	    Ibc_dia        MONEY,
	    Ibc_mes        MONEY,
	    NID            INT IDENTITY(1, 1),
	    ini_aus_perliq DATETIME,
	    fin_aus_perliq DATETIME
					);
    DECLARE @ValHissIBCSal           MONEY         = 0,
		  @ValHissIBCPen           MONEY         = 0,
		  @ValHissIBCRie           MONEY         = 0,
		  @DiaHissIBCSal           MONEY         = 0,
		  @DiaHissIBCPen           MONEY         = 0,
		  @DiaHissIBCRie           MONEY         = 0,
		  @ValHissApoPatSal        MONEY         = 0,
		  @ValHissApoEmpSal        MONEY         = 0,
		  @ValHissApoPatPen        MONEY         = 0,
		  @ValHissApoEmpPen        MONEY         = 0,
		  @ValHissApoPatRie        MONEY         = 0,
		  @ValApoEmpSal            MONEY         = 0,
		  @ValApoEmpPen            MONEY         = 0,
		  @ValApoPatRie            MONEY         = 0,
		  @ValApoPatSal            MONEY         = 0,
		  @ValApoPatPen            MONEY         = 0,
		  @ValAjuIBLPat            MONEY         = 0,
		  @ValAjuIBLEmp            MONEY         = 0,
		  @ValAjuApoRedPen         MONEY         = 0,
		  @Testeo                  MONEY         = 0,
		  @IBLTotalSalud           MONEY         = 0,
		  @IBLTotalPension         MONEY         = 0,
		  @IBLTotalRiesgos         MONEY         = 0,
		  @PorTotalSalud           FLOAT         = 0,
		  @PorTotalPen             FLOAT         = 0,
		  @ValAjuApoRedRie         MONEY         = 0,
		  @ValHissApoPatCCF        MONEY         = 0,
		  @ValHissApoPatSEN        MONEY         = 0,
		  @ValHissApoPatICBF       MONEY         = 0,
		  @ValHissApoPatEIT        MONEY         = 0,
		  @ValHissApoPatESAP       MONEY         = 0,
		  @ValHissIBCCCF           MONEY         = 0,
		  @ValHissIBCSEN           MONEY         = 0,
		  @ValHissIBCICBF          MONEY         = 0,
		  @DiaHissIBCCCF           MONEY         = 0,
		  @DiaHissIBCSENA          MONEY         = 0,
		  @DiaHissIBCEIT           MONEY         = 0,
		  @DiaHissIBCESAP          MONEY         = 0,
		  @ValHissApoFsp           MONEY         = 0,
		  @Tip_Reg                 CHAR(2),
		  @ValHissApoFsubsistencia MONEY         = 0,
		  @Ind_red                 BIT           = 1,
		  @DiasPen                 INT           = 0,
		  @IndAjusteMinimo         BIT           = 0,
		  @cer_nro                 VARCHAR(20),
		  @IncapacidadRel          VARCHAR(8000) = '',
		  @fec_ini_aus             DATETIME,
		  @Fec_fin_aus             DATETIME;
    DECLARE @ValAjuIBLPatSal  MONEY    = 0,
		  @ValAjuIBLPatPen  MONEY    = 0,
		  @ValAjuIBLPatRie  MONEY    = 0,
		  @ValAjuIBLPatCCF  MONEY    = 0,
		  @ValAjuIBLPatSENA MONEY    = 0,
		  @ValAjuIBLPatICBF MONEY    = 0,
		  @ValApoPatCCF     MONEY    = 0,
		  @ValApoPatSENA    MONEY    = 0,
		  @ValApoPatICBF    MONEY    = 0,
		  @ValApoPatEIT     MONEY    = 0,
		  @ValApoPatESAP    MONEY    = 0,
		  @Tip_RegAus       CHAR(2),
		  @Tip_RegAju       CHAR(2),
		  @FechaIngreso     DATETIME,
		  @FechaRetiro      DATETIME,
		  @FechaInicioVSP   DATETIME,
		  @FechaInicioSLN   DATETIME,
		  @FechafinSLN      DATETIME,
		  @FechaInicioIEG   DATETIME,
		  @FechafinIEG      DATETIME,
		  @FechaInicioLMA   DATETIME,
		  @FechafinLMA      DATETIME,
		  @FechaInicioVac   DATETIME,
		  @FechafinVac      DATETIME,
		  @FechaInicioVct   DATETIME,
		  @FechafinVct      DATETIME,
		  @FechaInicioIrl   DATETIME,
		  @FechafinIrl      DATETIME,
		  @ValAjuApoRedCCF  MONEY,
		  @ValAjuApoRedSENA MONEY,
		  @ValAjuApoRedICBF MONEY,
		  @ValAjuApoRedEIT  MONEY,
		  @ValAjuApoRedESAP MONEY,
		  @SalMinNorParaf   MONEY,
		  @VG155 SMALLINT= CONVERT(SMALLINT, dbo.fn_rhh_VG( 155, @Fec_Fin )), -- Variable general Aplicar Redondeos de salud y pensión en Pafafiscales cuando el IBC es igual al mínimo (1.Si,0.No)   ;
		  @VG52 BIT= CONVERT(BIT, dbo.fn_rhh_VG( 52, @Fec_Fin )), --Redondear Aporte Parafiscales 1-SI,0-NO                       
		  @IBLTotalCCF      MONEY    = 0,
		  @PorPatSalNor     FLOAT    = @PorPatSal,
		  @PorEmpSalNor     FLOAT    = @PorEmpSal,
		  @PorPatPenNor     FLOAT    = @PorPatPen,
		  @PorEmpPenNor     FLOAT    = @PorEmpPen,
		  @Apo_caja         BIT      = 0,
		  @Apo_Sena         BIT      = 0,
		  @Apo_ICBF         BIT      = 0,
		  @IBLTotalSENA     MONEY    = 0,
		  @IBLTotalICBF     MONEY    = 0,
		  @DiasCCF          SMALLINT = 0,
		  @PorPatCCFAU      FLOAT    = @PorPatCCF, /*Porcentaje Caja*/
		  @PorPatSENAAU     FLOAT    = @PorPatSENA, /*Porcentaje Sena*/
		  @PorPatICBFAU     FLOAT    = @PorPatICBF; /*Porcentaje ICBF*/

    DECLARE @TotDiasInc INT = 0;
    DECLARE @DiasPerliq INT      = 0,
		  @feciniMes  DATETIME = DATEADD(DAY, 1, EOMONTH(@Fec_ini, -1));

    DECLARE @Vae_sal MONEY = 0;
    DECLARE @Vae_pen MONEY = 0;
    DECLARE @Vap_sal MONEY = 0;
    DECLARE @Vap_pen MONEY = 0;
    DECLARE @Vap_rie MONEY = 0;
    DECLARE @Vap_ccf MONEY = 0;
    DECLARE @Vap_sena MONEY = 0;
    DECLARE @Vap_icbf MONEY = 0;
    DECLARE @Vap_eit MONEY = 0;
    DECLARE @Vap_esap MONEY = 0;
    DECLARE @Base_ccf MONEY = 0;
    DECLARE @Dia_ccf_his MONEY = 0;
    DECLARE @fechaInicioPer DATETIME = DATEADD(DAY, -1, @Fec_Ini);
    DECLARE @fechaFinPer DATETIME = DATEADD(DAY, 1, @Fec_Fin);
    DECLARE @ibc_minSS BIT = 0;
    DECLARE @VG53 FLOAT= CONVERT(FLOAT, dbo.fn_rhh_VG( 53, @Fec_Fin ));
    DECLARE @cEmp_apl CHAR(1);

    SET @ndiasper = 0;
    SET @Contador = 1;
    SET @Max = 0;
    SET @Nreg = 0;
    SET @Cla_aus = '00';
    SET @val_IBC_DIA = 0;
    SET @Val_IbcPerInc = 0;
    SET @Val_IbcPerLNR = 0;
    SET @DiasPerInc = 0;
    SET @DiasPerLNR = 0;
    SET @ValIBCLNR = 0;
    SET @ValIBCINC = 0;
    SET @DiasLNR = 0;
    SET @DiasINC = 0;
    SET @AjusteIBL = 0;
    SET @ValFSubsistencia = 0;
    SET @ValFSP = 0;
    SET @ValAjuIBLEmp = 0;
    SET @ValAjuIBLPat = 0;
    SET @ValAporTotal = 0;
    SET @ValAporTotalRed = 0;
    SET @ValAjuApoRedPen = 0;
    SET @ValAjuApoRedSal = 0;
    SET @ValAjuApoRedRie = 0;
    SET @ValHissIBCSal = 0;
    SET @ValHissIBCPen = 0;
    SET @ValHissIBCRie = 0;
    SET @DiaHissIBCSal = 0;
    SET @DiaHissIBCPen = 0;
    SET @DiaHissIBCRie = 0;
    SET @ValHissApoPatSal = 0;
    SET @ValHissApoEmpSal = 0;
    SET @ValHissApoPatPen = 0;
    SET @ValHissApoEmpPen = 0;
    SET @ValHissApoPatRie = 0;
    SET @ValHissApoFsp = 0;
    SET @ValHissApoFsubsistencia = 0;
    SET @Tip_Reg = 'I';
    SET @PorPatRie = 0;
    SET @nLiNoRem = 0;

    SELECT @cEmp_apl = emp_apl
    FROM sis_aplicacion
    WHERE cod_apl = 'NOM';

    /**Se crea una tabla para  insertar y poder analizar cada registro por separado ***/
    INSERT INTO @Ausent( cod_con,
					Cod_conPago,
					cod_aus,
					cla_aus,
					ini_aus,
					fin_aus,
					fec_ini_cau,
					fec_fin_cau,
					dia_aus,
					d31_aus,
					cer_nro,
					cernro_origen,
					ind_hsp,
					ind_pro
				   )
    SELECT AU.cod_con,
		 TAU.Cod_ConPago,
		 AU.cod_aus,
		 AU.cla_aus,
		 AU.ini_aus,
		 AU.fin_aus,
		 AU.fec_ini_cau,
		 AU.fec_fin_cau,
/*** En empleados con pago por días no se suma el día 31 de ausentismo porque en la tabla #t_rh_ausentimos ya se encuentra 
		 el día 31 incluido en los días de ausentismo***/
		 SUM(AU.dia_aus) + CASE @ind_pdias
						   WHEN 0 THEN SUM(CAST(AU.d31_aus AS SMALLINT))
						   ELSE 0
					    END,
		 SUM(CAST(AU.d31_aus AS SMALLINT)),
		 AU.cer_nro,
		 AU.cernro_origen,
		 AU.ind_hsp,
		 AU.ind_pro
    FROM #t_rhh_ausentismo AS AU
    INNER JOIN rhh_TbTipAus AS TAU ON AU.Cod_aus = TAU.cod_aus AND AU.Cla_aus = TAU.cla_aus
    GROUP BY AU.cod_con,
		   TAU.Cod_ConPago,
		   AU.cod_aus,
		   AU.cla_aus,
		   AU.ini_aus,
		   AU.fin_aus,
		   AU.fec_ini_cau,
		   AU.fec_fin_cau,
		   AU.cer_nro,
		   AU.cernro_origen,
		   AU.ind_hsp,
		   AU.ind_pro;

    /*** Se insertan en negativo  los registros  que se encuentran en el histórico y ya no existe la novedad para el mismo periodo de liquidación***/

    INSERT INTO #T_RHH_HISSS( cod_emp,
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
						vae_fsubsis,
						Cod_cia,
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
						cer_nro
					   )
    SELECT H.cod_emp,
		 @tip_liq,
		 H.tip_reg,
		 H.fec_cau,
		 H.fec_cte,
		 H.fdo_sal,
		 H.fdo_pen,
		 H.fdo_ate,
		 H.dia_sal * -1,
		 H.dia_pen * -1,
		 H.dia_rie * -1,
		 H.bas_sal * -1,
		 H.bas_pen * -1,
		 H.bas_rie * -1,
		 H.ibc_sal * -1,
		 H.ibc_pen * -1,
		 H.ibc_rie * -1,
		 H.por_sal,
		 H.por_pen,
		 H.por_rie,
		 H.vap_sal * -1,
		 H.vap_pen * -1,
		 H.vap_rie * -1,
		 H.vae_sal * -1,
		 H.vae_pen * -1,
		 H.vae_fsp * -1,
		 H.vvp_sal * -1,
		 H.vvp_pen * -1,
		 H.vvp_rie * -1,
		 H.vve_sal * -1,
		 H.vve_pen * -1,
		 H.vve_rie * -1,
		 H.nro_ieg,
		 H.val_ieg * -1,
		 H.nro_ilm,
		 H.val_ilm,
		 H.upc_emp,
		 H.pac_emp,
		 H.dia_irp,
		 H.sal_bas,
		 H.nov_ing,
		 H.nov_ret,
		 H.nov_tdas,
		 H.nov_taas,
		 H.nov_tdap,
		 H.nov_taap,
		 H.nov_tdar,
		 H.nov_taar,
		 H.nov_vsp,
		 H.nov_vte,
		 H.nov_vst,
		 H.dia_sln * -1,
		 H.nov_sln,
		 H.nov_slr,
		 H.nov_ige,
		 H.nov_lma,
		 H.nov_vac,
		 H.nov_avp,
		 H.nov_vct,
		 H.nrt_avp,
		 H.per_liq,
		 H.cod_cont,
		 H.fdo_ccf,
		 CASE
			WHEN(H.dia_ccf * -1) = 0 AND @tip_liq = '16' THEN H.dia_sal * -1
			ELSE H.dia_ccf * -1
		 END,
		 H.ibc_ccf * -1,
		 H.ibc_sena * -1,
		 H.ibc_icbf * -1,
		 H.por_ccf,
		 H.por_sena,
		 H.por_icbf,
		 H.por_eit,
		 H.por_esap,
		 H.vap_ccf * -1,
		 H.vap_sena * -1,
		 H.vap_icbf * -1,
		 H.vap_eit * -1,
		 H.vap_esap * -1,
		 @IDL_Num,
		 H.ley1607,
		 H.fec_sal,
		 H.vae_fsubsis * -1,
		 H.Cod_cia,
		 H.FechaIngreso,
		 H.FechaRetiro,
		 H.FechaInicioVSP,
		 H.FechaInicioSLN,
		 H.FechafinSLN,
		 H.FechaInicioIEG,
		 H.FechafinIEG,
		 H.FechaInicioLMA,
		 H.FechafinLMA,
		 H.FechaInicioVac,
		 H.FechafinVac,
		 H.FechaInicioVct,
		 H.FechafinVct,
		 H.FechaInicioIrl,
		 H.FechafinIrl,
		 H.IBCOtParaf,
		 H.HorasLab,
		 H.cer_nro
    FROM #t_rhh_hisss AS H
    LEFT JOIN #t_rhh_ausentismo AS AU ON AU.CER_NRO = H.CER_NRO
    WHERE LEN(H.CER_NRO) > 0
		AND H.Fec_cau > @fechaInicioPer
		AND H.Fec_cau < @fechaFinPer
		AND H.cod_cont = @CodCont
		AND AU.CER_NRO IS NULL;

    INSERT INTO #T_RHH_HISSS( cod_emp,
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
						vae_fsubsis,
						Cod_cia,
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
						cer_nro
					   )
    SELECT H.cod_emp,
		 H.tip_liq,
		 H.tip_reg,
		 H.fec_cau,
		 H.fec_cte,
		 H.fdo_sal,
		 H.fdo_pen,
		 H.fdo_ate,
		 H.dia_sal * -1,
		 H.dia_pen * -1,
		 H.dia_rie * -1,
		 H.bas_sal * -1,
		 H.bas_pen * -1,
		 H.bas_rie * -1,
		 H.ibc_sal * -1,
		 H.ibc_pen * -1,
		 H.ibc_rie * -1,
		 H.por_sal,
		 H.por_pen,
		 H.por_rie,
		 H.vap_sal * -1,
		 H.vap_pen * -1,
		 H.vap_rie * -1,
		 H.vae_sal * -1,
		 H.vae_pen * -1,
		 H.vae_fsp * -1,
		 H.vvp_sal * -1,
		 H.vvp_pen * -1,
		 H.vvp_rie * -1,
		 H.vve_sal * -1,
		 H.vve_pen * -1,
		 H.vve_rie * -1,
		 H.nro_ieg,
		 H.val_ieg * -1,
		 H.nro_ilm,
		 H.val_ilm,
		 H.upc_emp,
		 H.pac_emp,
		 H.dia_irp,
		 H.sal_bas,
		 H.nov_ing,
		 H.nov_ret,
		 H.nov_tdas,
		 H.nov_taas,
		 H.nov_tdap,
		 H.nov_taap,
		 H.nov_tdar,
		 H.nov_taar,
		 H.nov_vsp,
		 H.nov_vte,
		 H.nov_vst,
		 H.dia_sln * -1,
		 H.nov_sln,
		 H.nov_slr,
		 H.nov_ige,
		 H.nov_lma,
		 H.nov_vac,
		 H.nov_avp,
		 H.nov_vct,
		 H.nrt_avp,
		 H.per_liq,
		 H.cod_cont,
		 H.fdo_ccf,
		 H.dia_ccf * -1,
		 H.ibc_ccf * -1,
		 H.ibc_sena * -1,
		 H.ibc_icbf * -1,
		 H.por_ccf,
		 H.por_sena,
		 H.por_icbf,
		 H.por_eit,
		 H.por_esap,
		 H.vap_ccf * -1,
		 H.vap_sena * -1,
		 H.vap_icbf * -1,
		 H.vap_eit * -1,
		 H.vap_esap * -1,
		 @IDL_Num,
		 H.ley1607,
		 H.fec_sal,
		 H.vae_fsubsis * -1,
		 H.Cod_cia,
		 H.FechaIngreso,
		 H.FechaRetiro,
		 H.FechaInicioVSP,
		 H.FechaInicioSLN,
		 H.FechafinSLN,
		 H.FechaInicioIEG,
		 H.FechafinIEG,
		 H.FechaInicioLMA,
		 H.FechafinLMA,
		 H.FechaInicioVac,
		 H.FechafinVac,
		 H.FechaInicioVct,
		 H.FechafinVct,
		 H.FechaInicioIrl,
		 H.FechafinIrl,
		 H.IBCOtParaf,
		 H.HorasLab,
		 H.cer_nro
    FROM #t_rhh_hisss AS H
    INNER JOIN rhh_SSTipReg AS TR ON TR.Tip_reg = H.tip_reg
    WHERE H.Fec_cau > @fechaInicioPer
		AND H.Fec_cau < @fechaFinPer
		AND H.CER_NRO = ''
		AND TR.Tip_regRel IN(
						 'I', 'M', 'L', 'R'
						);

    /** Se actualiza la clase de ausentismo de acuerdo a lo parametrizado en la tabla tipo de ausentismo***/
    UPDATE @Ausent
	 SET cla_aus = TAus.Cla_Aus
    FROM @Ausent AS A
    INNER JOIN Rhh_tbtipaus AS TAus ON A.cod_aus = Taus.Cod_aus;

    IF @Ind_Lnr31 = 0
    BEGIN
	   UPDATE @Ausent
		SET dia_aus = dia_aus - d31_aus
	   WHERE cla_aus IN( '05', '06' );
    END;

    UPDATE #t_rhh_ausentismo
	 SET cla_aus = TAus.Cla_Aus
    FROM #t_rhh_ausentismo AS A
    INNER JOIN Rhh_tbtipaus AS TAus ON A.cod_aus = Taus.Cod_aus;

    SELECT @Max = MAX(NID)
    FROM @Ausent;

    /***Se recorren cada uno de los ausentismos cálculando su valor**/
    WHILE @Contador <= @Max
    BEGIN
	   SELECT @FechaInicioSLN = '',
			@FechafinSLN = '',
			@FechaInicioIEG = '',
			@FechafinIEG = '',
			@FechaInicioLMA = '',
			@FechafinLMA = '',
			@FechaInicioVac = '',
			@FechafinVac = '',
			@FechaInicioVct = '',
			@FechafinVct = '',
			@FechaInicioIrl = '',
			@FechafinIrl = '',
			@PorPatSal = @PorPatSalNor,
			@PorEmpSal = @PorEmpSalNor,
			@PorPatPen = @PorPatPenNor,
			@PorEmpPen = @PorEmpPenNor;

	   SET @val_IBC = 0;
	   SET @val_IBC_DIA = 0;

	   SELECT @cCod_con = Cod_con,
			@cCod_Pago = Cod_conPago,
			@nDiaInc = dia_aus,
			@ind_pro = ind_pro,
			@Cla_aus = cla_aus,
			@FecRealAusen = ini_aus,
			@cernro_origen = cernro_origen,
			@cer_nro = cer_nro,
			@fec_ini_aus = ini_aus,
			@fec_fin_aus = fin_aus,
			@cCodAus = cod_aus
	   FROM @Ausent
	   WHERE NID = @Contador;

	   SELECT * FROM @Ausent;

	   /** cuando el ausentismo es reconocido se paga de acuerdo con el indicador**/
	   IF @Cla_aus = '05'
	   BEGIN
		  SELECT @Apo_caja = 0,
			    @Apo_Sena = 0,
			    @Apo_ICBF = 0;

		  IF @cCodAus = '26' AND @cEmp_apl = 'O'
		  BEGIN
			 SET @PorEmpPen = 0;
			 SET @PorEmpSal = 0;
			 SET @PorPatPen = 0;
			 SET @PorPatSal = 0;

		  END;

	   END;
		  ELSE
	   BEGIN
		  WITH AUSENTISMOS
			  AS (SELECT DISTINCT
					   Conceptos,
					   cl.cla_aus
				 FROM(
					 SELECT Cla_aus,
						   Cod_ConAuxDias,
						   Cod_ConPago
					 FROM rhh_TbTipAus
					) AS AUS UNPIVOT(CONCEPTOS FOR Concepto IN(Cod_ConAuxDias,
													   Cod_ConPago)) AS Conc
				 INNER JOIN Rhh_TbClasAus AS CL ON Conc.cla_aus = CL.cla_aus
				 WHERE CL.Cla_aus = @Cla_aus)
			  SELECT @Apo_caja = MAX(CAST(ind_caj AS INT)),
				    @Apo_Sena = MAX(CAST(ind_sen AS INT)),
				    @Apo_ICBF = MAX(CAST(ind_icb AS INT))
			  FROM #T_RESULTADO AS R
			  INNER JOIN AUSENTISMOS AS A ON R.Cod_con = A.Conceptos;

	   END;

	   /** cuando el ausentismo es reconocido se paga de acuerdo con el indicador**/

	   IF @Cla_aus IN('01', '02', '04', '03', '05', '06') /*** Enfermedad General, Incapacidad Profesional, Enfermedad Profesional,Licencia Maternidad/Licencia Paternidad**/
	   BEGIN
		  IF @fec_fin_aus > @Fec_Fin
		  BEGIN
			 SET @fec_fin_aus = @Fec_Fin;
		  END;

		  IF @Cla_aus = '01'
		  BEGIN
			 SET @Tip_RegAus = 'I';
			 SET @FechaInicioIEG = @fec_ini_aus;
			 SET @FechafinIEG = @Fec_fin_aus;

		  END;
			 ELSE
		  BEGIN
			 IF @Cla_aus IN('02', '04')
			 BEGIN
				SET @Tip_RegAus = 'R';
				SET @FechaInicioIrl = @fec_ini_aus;
				SET @FechafinIrl = @Fec_fin_aus;
			 END;
				ELSE
			 BEGIN
				IF @Cla_aus IN('03')
				BEGIN
				    SET @Apo_rie = 0;
				    SET @Tip_RegAus = 'M';
				    SET @FechaInicioLMA = @fec_ini_aus;
				    SET @FechafinLMA = @Fec_fin_aus;
				END;
				    ELSE
				BEGIN
				    IF @Cla_aus IN('05')
				    BEGIN
					   IF @Ind_appenEmp_Lnr = 0
					   BEGIN
						  SET @PorEmpPen = 0;
					   END;
					   IF @Ind_appenPat_Lnr = 0
					   BEGIN
						  SET @PorPatPen = 0;
					   END;
					   IF @Ind_ApsalEmp_Lnr = 0
					   BEGIN
						  SET @PorEmpSal = 0;
					   END;
					   IF @indap8sal = 0
					   BEGIN
						  SET @PorPatSal = 0;
					   END;

					   SET @Tip_RegAus = 'L';
					   SET @FechaInicioSLN = @fec_ini_aus;
					   SET @FechafinSLN = @Fec_fin_aus;

				    END;
					   ELSE
				    BEGIN
					   IF @Cla_aus IN('06')
					   BEGIN
						  SET @Tip_RegAus = 'U';
						  SET @FechaInicioVac = @fec_ini_aus;
						  SET @FechafinVac = @Fec_fin_aus;

					   END;
				    END;
				END;
			 END;

		  END;

		  /** Se analiza si tiene prorroga para definir la fecha inicial del ausentismo**/
		  IF @ind_pro = 1
		  BEGIN
			 IF @cernro_origen IS NULL
			 BEGIN
				SELECT @FecRealAusen = Au.ini_aus
				FROM rhh_ausentismo AS Au
				WHERE Au.cod_emp = @Codigo
					 AND Au.ind_nom = 1
					 AND Au.ind_pro = 0
					 AND Au.ini_aus = ( SELECT MAX(ini_aus)
									FROM rhh_ausentismo
									WHERE ini_aus <= @fec_ini AND cod_emp = @Codigo AND ind_nom = 1 AND ind_pro = 0 );
			 END;
				ELSE
			 BEGIN
				SELECT @FecRealAusen = ini_aus
				FROM rhh_ausentismo
				WHERE cer_nro = @cernro_origen AND cod_emp = @Codigo;

			 END;

		  END;
		  SET @TotDiasInc = 0;
		  SET @DiasPerliq = 0;

		  IF @Tip_RegAus IN('L', 'U')
		  BEGIN
/*** Si la licencia no remunerada termina en un mes con día 31, se debe validar si el total de dias de incapacidad son superiores y analizar el indicador para saber si 
		  se pagan el día 31 o no***/
			 IF DAY(@Fec_Fin_AUS) = 31
			 BEGIN

				SELECT @TotDiasInc = SUM(dia_aus)
				FROM @AUSENT;

				SELECT @DiasPerliq = DATEDIFF(DAY, Fec_ini, Fec_fin)
				FROM rhh_pertlq
				WHERE Cod_tlq = @Cod_tlq AND Fec_fin = @Fec_Fin;

				IF @TotDiasInc > @DiasPerliq
				BEGIN
				    SET @nDiaInc = @nDiaInc + (@DiasPerliq - @TotDiasInc);

				    IF @Ind_Lnr31 = 0
				    BEGIN
					   UPDATE @Ausent
						SET dia_aus = @nDiaInc
					   WHERE NID = @Contador;
				    END;
				END;

			 END;

			 EXEC sp_rhh_SSibcsalhisss @Codigo,
								  1, -- El ibc siempre se calcula con el mes anterior
								  @FecRealAusen,
								  @Cla_aus,
								  @Sal_Bas,
								  @SalMin,
								  @Cla_Sal,
								  1,
								  @val_IBC_DIA OUTPUT,
								  @val_IBC OUTPUT,
								  1;

		  END;
			 ELSE
		  BEGIN
			 /** Si la incapacidad termina el día 31 se debe evaluar que los días de incapacidad no superen los días del periodo de liquidación ya que no se puede restar un día de nómina del periodo anterior**/
			 IF DAY(@Fec_Fin_AUS) = 31
			 BEGIN
				SELECT @TotDiasInc = SUM(dia_aus)
				FROM @AUSENT;

				SELECT @DiasPerliq = DATEDIFF(DAY, Fec_ini, Fec_fin)
				FROM rhh_pertlq
				WHERE Cod_tlq = @Cod_tlq AND Fec_fin = @Fec_Fin;

				IF @TotDiasInc > @DiasPerliq
				BEGIN
				    SET @nDiaInc = @nDiaInc + (@DiasPerliq - @TotDiasInc);
				END;
			 END;

			 IF DAY(@fec_ini_aus) = '31'
			    AND @fec_ini_aus = EOMONTH(@Fec_Fin)
			    AND @Ind_Inc31 = 0
			    AND @TotDiasInc = 1
			 BEGIN
				EXEC sp_rhh_SSibcsalhisss @Codigo, --Código Empleado
									 1, -- Determina Nro Meses
									 @FecRealAusen, --Fecha ausentismo
									 @Cla_aus, --clase ausentismo
									 @Sal_Bas, --salario básico
									 @SalMin, -- salario mínimo
									 @Cla_Sal, --clase de salario
									 1,
									 @val_IBC_DIA OUTPUT, --ibc diario
									 @val_IBC OUTPUT, --ibc mensual
									 1,
									 @cer_nro;

			 END;
				ELSE
			 BEGIN

				EXEC sp_rhh_SSibcsalhisss @Codigo, --Código Empleado
									 0, -- Determina Nro Meses
									 @FecRealAusen, --Fecha ausentismo
									 @Cla_aus, --clase ausentismo
									 @Sal_Bas, --salario básico
									 @SalMin, -- salario mínimo
									 @Cla_Sal, --clase de salario
									 1,
									 @val_IBC_DIA OUTPUT, --ibc diario
									 @val_IBC OUTPUT, --ibc mensual
									 1,
									 @cer_nro;

			 END;
		  END;

		  UPDATE @Ausent
		    SET ibc_sal = @val_IBC_DIA * (dia_aus),
			   Ibc_dia = @val_IBC_DIA,
			   Ibc_mes = @val_IBC
		  WHERE NID = @Contador;

		  SELECT @ValIBCINC = COALESCE(SUM(Ibc_sal), 0)
		  FROM @Ausent
		  WHERE NID = @Contador;

		  /*** Si existe una liquidación anterior para la misma incapacidad en el mismo periodo se busca para revisar si hay diferencias para realizar ajuste***/
		  SELECT @Val_IbcPerInc = COALESCE(SUM(ibc_sal), 0),
			    @DiasPerInc = COALESCE(SUM(dia_sal), 0),
			    @Vae_sal = COALESCE(SUM(Vae_sal), 0),
			    @Vae_pen = COALESCE(SUM(Vae_pen), 0),
			    @Vap_sal = COALESCE(SUM(Vap_sal), 0),
			    @Vap_pen = COALESCE(SUM(Vap_pen), 0),
			    @Vap_rie = COALESCE(SUM(Vap_rie), 0),
			    @Vap_ccf = COALESCE(SUM(Vap_ccf), 0),
			    @Vap_sena = COALESCE(SUM(Vap_sena), 0),
			    @Vap_icbf = COALESCE(SUM(Vap_icbf), 0),
			    @Vap_eit = COALESCE(SUM(Vap_eit), 0),
			    @Vap_esap = COALESCE(SUM(Vap_esap), 0),
			    @Base_ccf = COALESCE(SUM(ibc_ccf), 0),
			    @Dia_ccf_his = COALESCE(SUM(Dia_ccf), 0)
		  FROM #t_rhh_hisss
		  WHERE cod_emp = @codigo
			   AND tip_reg = @Tip_RegAus
			   AND Cer_nro = @cer_nro
			   AND Fec_cau = @Fec_Fin
			   AND fec_cte = @Fec_Fin;
		  --AND IDL_Num <> @IDL_Num;
		  SET @DiasINC = @nDiaInc;

		  SET @ValIBCINC = CEILING(@ValIBCINC);

		  IF @ValIBCINC <> 0
		  BEGIN
			 SET @ValIBCINC = @ValIBCINC + @ValHissIBCSal;

			 /** Se calcula los días totales del periodo, días de la liquidación más los días del periodo por otras liquidaciones**/

			 SET @DiasINC = @DiasINC + @DiaHissIBCSal;

			 IF @DiasINC > 30
			 BEGIN
				SET @DiasINC = 30;
			 END;

			 IF @Apo_SAL = 1
			 BEGIN
				/*** Aporte a Salud***/
				SELECT @ValApoEmpSal = ValApoEmp,
					  @ValApoPatSal = ValApoPat,
					  @ValAjuApoRedSal = ValAjuApo
				FROM dbo.fn_rhh_SS_Cotizacion( @ValIBCINC, 0, 0, @ibc_min, @PorPatSal, @PorEmpSal, @SalminNor, @DiasINC, @IndProp25SMLV, @VG47,
				@VG51, 0, 0, 0, @Tip_Reg, @Ind_red, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, @Res2388 );

				SET @IBLTotalSalud = @ValIBCINC - @Val_IbcPerInc;
				SET @PorTotalSalud = @PorEmpSal + @PorPatSal;
				SET @ValApoEmpSal = @ValApoEmpSal - @Vae_sal;
				SET @ValApoPatSal = @ValApoPatSal - @Vap_sal;
			 END;
			 /*** Aporte a Pensión***/
			 IF @Apo_pen = 1
			 BEGIN
				SET @DiasPen = @DiasINC;
				SELECT @ValApoEmpPen = ValApoEmp,
					  @ValApoPatPen = ValApoPat,
					  @ValAjuApoRedPen = ValAjuApo
				FROM dbo.fn_rhh_SS_Cotizacion( @ValIBCINC, 0, 0, @ibc_min, @PorPatPen, @PorEmpPen, @SalminNor, @DiasINC, @IndProp25SMLV, @VG47,
				@VG51, 0, 0, 0, @Tip_Reg, @Ind_red, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, @Res2388 );

				SET @PorTotalPen = @PorEmpPen + @PorPatPen;
				SET @IBLTotalPension = @IBLTotalSalud;
				SET @ValApoEmpPen = @ValApoEmpPen - @Vae_pen;
				SET @ValApoPatPen = @ValApoPatPen - @vap_pen;

				IF @RedLinea = 0
				BEGIN
				    SELECT @ValFSP = Val_FSP,
						 @ValFSubsistencia = ValFSubsistencia
				    FROM dbo.fn_rhh_ss_fsp( @ValIBCINC, 0, @Vg48, @DiasINC, @SalminNor, 0, @Vg34, @ValHissApoFsp, @ValHissApoFsubsistencia,
				    @IndProp25SMLV, @Tip_Reg, @VG47, 0, 0, 0, 0, 0, 0, @Res2388 );
				END;
			 END;

			 IF @Apo_rie = 1 /* Aporte Riesgos */
			 BEGIN

				SELECT @ValApoPatRie = ValApoPat,
					  @ValAjuApoRedRie = ValAjuApo
				FROM dbo.fn_rhh_SS_Cotizacion( @ValIBCINC, 0, 0, @ibc_min, @PorPatRie, 0, @SalminNor, @DiasINC, @IndProp25SMLV, @VG47, @VG51, 1,
				0, 0, @Tip_Reg, @Ind_red, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, @Res2388 );

				SELECT @ValApoPatRie = @ValApoPatRie - @Vap_rie;
			 END;

			 SET @ibc_minSS = @ibc_min;

			 IF @Apo_Parafiscales = 1
			 BEGIN

				IF @Tip_RegAus IN('U')
				BEGIN

				    DECLARE @NumDiasU INT;
				    SELECT @NumDiasU = SUM(dia_aus)
				    FROM @Ausent
				    WHERE Cla_aus = '06';

				    EXEC sp_rhh_SSibcsalhisss @Codigo, --Código Empleado
										0, -- Determina Nro Meses
										@FecRealAusen, --Fecha ausentismo
										@Cla_aus, --clase ausentismo
										@Sal_Bas, --salario básico
										@SalMin, -- salario mínimo
										@Cla_Sal, --clase de salario
										1,
										@val_IBC_DIA OUTPUT, --ibc diario
										@IBLTotalCCF OUTPUT, --ibc mensual
										1,
										@cer_nro;

				    SET @IBLTotalCCF = ROUND((@IBLTotalCCF / @NumDiasU) * @DiasINC, 0);
				END;
				    ELSE
				BEGIN
				    SET @IBLTotalCCF = @ValIBCINC;
				END;

				IF @VG53 <> 0
				BEGIN
				    SET @IBLTotalCCF = ROUND(@IBLTotalCCF * (@VG53 / 100), 0);
				END;

				SET @DiasCCF = @DiasINC;
				SET @PorPatCCF = @PorPatCCFAU;

				IF @VG155 = 0
				BEGIN
				    SET @SalMinNorParaf = 1000;
				    SET @ibc_min = 0;
				END;
				    ELSE
				BEGIN
				    SET @SalMinNorParaf = @SalMinNor;
				END;

				IF @Apo_caja = 1 OR (@apo_caja = 0 AND @Vap_ccf <> 0
								)
				BEGIN

				    IF @apo_caja = 0
				    BEGIN
					   SELECT @IBLTotalCCF = 0;
					   SELECT @DiasCCF = 0;
				    END;

				    SELECT @ValApoPatCCF = ValApoPat,
						 @ValAjuApoRedCCF = ValAjuApo
				    FROM dbo.fn_rhh_SS_Cotizacion( @IBLTotalCCF, 0, 0, @ibc_min, @PorPatCCF, 0, @SalMinNorParaf, @DiasINC, @IndProp25SMLV, @VG47,
				    @VG51, 0, 0, 0, @Tip_Reg, @Ind_red, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, @Res2388 );

				    SELECT @ValApoPatCCF = @ValApoPatCCF - @Vap_ccf;

				    SELECT @ValApoPatEIT = ValApoPat,
						 @ValAjuApoRedEIT = ValAjuApo
				    FROM dbo.fn_rhh_SS_Cotizacion( @IBLTotalCCF, 0, 0, @ibc_min, @PorPatEIT, 0, @SalMinNorParaf, @DiasINC, @IndProp25SMLV, @VG47,
				    @VG51, 0, 0, 0, @Tip_Reg, @Ind_red, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, @Res2388 );

				    SELECT @ValApoPatESAP = ValApoPat,
						 @ValAjuApoRedESAP = ValAjuApo
				    FROM dbo.fn_rhh_SS_Cotizacion( @IBLTotalCCF, 0, 0, @ibc_min, @PorPatESAP, 0, @SalMinNorParaf, @DiasINC, @IndProp25SMLV, @VG47,
				    @VG51, 0, 0, 0, @Tip_Reg, @Ind_red, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, @Res2388 );

				END;
				    ELSE
				BEGIN
				    SET @IBLTotalCCF = 0;
				    SET @PorPatCCF = 0;
				    SET @ValApoPatCCF = 0;
				    SET @ValAjuApoRedCCF = 0;
				    SET @PorPatEIT = 0;
				    SET @PorPatESAP = 0;
				    SET @ValApoPatEIT = 0;
				    SET @ValAjuApoRedEIT = 0;
				    SET @ValApoPatESAP = 0;
				    SET @ValAjuApoRedESAP = 0;

				END;

				IF @Apo_Sena = 1
				BEGIN
				    SET @PorPatSENA = @PorPatSENAAU;
				    SET @IBLTotalSENA = @IBLTotalCCF;
				    SELECT @ValApoPatSENA = ValApoPat,
						 @ValAjuApoRedSENA = ValAjuApo
				    FROM dbo.fn_rhh_SS_Cotizacion( @IBLTotalCCF, 0, 0, @ibc_min, @PorPatSENA, 0, @SalMinNorParaf, @DiasINC, @IndProp25SMLV, @VG47,
				    @VG51, 0, 0, 0, @Tip_Reg, @Ind_red, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, @Res2388 );

				    SELECT @ValApoPatSENA = @ValApoPatSENA - @Vap_sena;

				END;
				    ELSE
				BEGIN
				    SET @PorPatSENA = 0;
				    SET @ValApoPatSENA = 0;
				    SET @ValAjuApoRedSENA = 0;
				    SET @IBLTotalSENA = 0;
				END;

				IF @Apo_ICBF = 1
				BEGIN
				    SET @PorPatICBF = @PorPatICBFAU;
				    SET @IBLTotalICBF = @IBLTotalCCF;
				    SELECT @ValApoPatICBF = ValApoPat,
						 @ValAjuApoRedICBF = ValAjuApo
				    FROM dbo.fn_rhh_SS_Cotizacion( @IBLTotalCCF, 0, 0, @ibc_min, @PorPatICBF, 0, @SalMinNorParaf, @DiasINC, @IndProp25SMLV, @VG47,
				    @VG51, 0, 0, 0, @Tip_Reg, @Ind_red, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, @Res2388 );

				    SELECT @ValApoPatICBF = @ValApoPatICBF - @Vap_icbf;

				END;
				    ELSE
				BEGIN
				    SET @PorPatICBF = 0;
				    SET @ValApoPatICBF = 0;
				    SET @ValAjuApoRedICBF = 0;
				    SET @IBLTotalICBF = 0;
				END;

			 END;
			 SET @IBLTotalCCF = @IBLTotalCCF - @Base_ccf;
			 SET @IBLTotalICBF = @IBLTotalICBF - @Base_ccf;
			 SET @IBLTotalSENA = @IBLTotalSENA - @Base_ccf;
			 SET @DiasINC = @nDiaInc - @DiasPerInc;
			 SET @DiasCCF = @DiasCCF - @Dia_ccf_his;

			 EXEC sp_rhh_SS_InsertaRhhHisss @codigo,
									  @tip_liq,
									  @Tip_RegAus,
									  @Fec_Fin,
									  @Fec_Fin,
									  @FdoSal,
									  @fdopen,
									  @FdoAte,
									  @DiasINC,
									  @DiasINC,
									  @DiasINC,
									  @IBLTotalSalud,
									  @IBLTotalPension,
									  @IBLTotalRiesgos,
									  @IBLTotalSalud,
									  @IBLTotalPension,
									  @IBLTotalSalud,
									  @PorTotalSalud,
									  @PorTotalPen,
									  @PorPatRie,
									  @ValApoPatSal,
									  @ValApoPatPen,
									  @ValApoPatRie,
									  @ValApoEmpSal,
									  @ValApoEmpPen,
									  @ValFSP,
									  0,
									  @CodCont,
									  @DiasCCF,
									  @IBLTotalCCF,
									  @IDL_Num,
									  @IBLTotalSENA,
									  @IBLTotalICBF,
									  @PorPatCCF,
									  @PorPatSENA,
									  @PorPatICBF,
									  @PorPatEIT, --por eit 
									  @PorPatESAP, --por esap
									  @ValApoPatCCF,
									  @ValApoPatSENA,
									  @ValApoPatEIT, --eit 
									  @ValApoPatESAP, --esp 
									  @ValApoPatICBF,
									  @ValFSubsistencia,
									  '',
									  '',
									  '',
									  @FechaInicioSLN,
									  @FechafinSLN,
									  @FechaInicioIEG,
									  @FechafinIEG,
									  @FechaInicioLMA,
									  @FechafinLMA,
									  @FechaInicioVac,
									  @FechafinVac,
									  @FechaInicioVct,
									  @FechafinVct,
									  @FechaInicioIrl,
									  @FechafinIrl,
									  @IBLTotalCCF,
									  0,
									  @cer_nro;

			 SELECT @IBLTotalSalud = SUM(ibc_sal),
				   --@diaper = SUM(dia_sal),
				   @ValApoEmpSal = SUM(vae_sal),
				   @ValApoPatSal = SUM(vap_sal),
				   @ValApoEmpPen = SUM(vae_pen),
				   @ValApoPatPen = SUM(vap_pen),
				   @ValHissApoPatRie = SUM(vap_rie),
				   @ValApoPatCCF = SUM(vap_ccf),
				   @IBLTotalCCF = SUM(ibc_ccf),
				   @ValApoPatSENA = SUM(vap_sena),
				   @ValApoPatEIT = SUM(vap_eit),
				   @ValApoPatICBF = SUM(vap_icbf),
				   @TotDiasInc = SUM(Dia_sal),
				   @ValApoPatESAP = SUM(Vap_esap)
			 FROM #t_rhh_hisss AS H
			 WHERE TIP_REG IN(
						   @Tip_RegAus, RTRIM(LTRIM(@Tip_RegAus)) + 'A'
						  )
				  AND Fec_cau > @feciniMes
				  AND Fec_cau <= @Fec_Fin
				  AND cer_nro = @cer_nro;

			 IF @RedLinea = 1
			 BEGIN

				SET @ValAjuIBLPatSal = 0;
				SET @ValAjuIBLPatPen = 0;
				SET @ValAjuIBLPatRie = 0;
				SET @ValAjuIBLPatCCF = 0;

				EXEC Sp_rhh_SSAjusteRegistro @IBLTotalSalud,
									    @PorPatSal,
									    @PorEmpSal,
									    @SalMinNor,
									    @TotDiasInc,
									    1,
									    @VG47,
									    @VG51,
									    @Ibc_minSS,
									    @Ibc_por,
									    @ValApoEmpSal,
									    @ValApoPatSal,
									    '',
									    @Ind_red,
									    @IndAjusteMinimo,
									    0,
									    0,
									    0,
									    @Res2388,
									    @cer_nro,
									    @Apo_pen,
									    @PorPatPen,
									    @PorEmpPen,
									    @ValApoEmpPen,
									    @ValApoPatPen,
									    @Vg48,
									    @VG34,
									    @ValFSP,
									    @ValFSubsistencia,
									    @Apo_rie,
									    @ValApoPatRie,
									    @Apo_Parafiscales,
									    @VG155,
									    @SalMinNorParaf,
									    @PorPatCCF,
									    @VG52,
									    @ValApoPatCCF,
									    @ValApoPatSENA,
									    @ValApoPatEIT,
									    @ValApoPatESAP,
									    @PorPatICBF,
									    @PorPatSENA,
									    @PorPatEIT,
									    @PorPatESAP,
									    @ValApoPatICBF,
									    @IBLTotalCCF,
									    @IBLTotalCCF,
									    @IBLTotalCCF,
									    @ValApoEmpSal OUTPUT,
									    @ValApoPatSal OUTPUT,
									    @ValApoEmpPen OUTPUT,
									    @ValApoPatPen OUTPUT,
									    @ValApoPatRie OUTPUT,
									    @ValAjuIBLPatSal OUTPUT,
									    @ValAjuIBLPatPen OUTPUT,
									    @ValAjuIBLPatRie OUTPUT,
									    @ValAjuIBLPatCCF OUTPUT,
									    @ValAjuIBLPatSena OUTPUT,
									    @ValAjuIBLPatIcbf OUTPUT,
									    @ValApoPatCCF OUTPUT,
									    @ValApoPatSENA OUTPUT,
									    @ValApoPatICBF OUTPUT,
									    @ValApoPatEIT OUTPUT,
									    @ValApoPatESAP OUTPUT,
									    @RedLinea,
									    @PorPatRie,
									    @ValFSP OUTPUT,
									    @ValFSubsistencia OUTPUT,
									    @SalMin;

				SET @ValFSP = 0;
				SET @ValFSubsistencia = 0;

				IF(@ValAjuIBLPatSal) <> 0
				OR (@ValAjuIBLPatPen) <> 0
				OR (@ValAjuIBLPatRie) <> 0
				OR (@ValAjuIBLPatCCF) <> 0
				OR (@ValApoPatSal) <> 0
				OR @ValApoPatPen <> 0
				OR @ValApoPatRIE <> 0
				OR @ValApoPatCCF <> 0
				OR @ValFSP <> 0
				OR @ValFSubsistencia <> 0
				BEGIN
				    SET @Tip_RegAju = RTRIM(LTRIM(@Tip_RegAus)) + 'A';

				    EXEC sp_rhh_SS_InsertaRhhHisss @codigo,
											@tip_liq,
											@Tip_RegAju,
											@Fec_Fin,
											@Fec_Fin,
											@FdoSal,
											@fdopen,
											@FdoAte,
											0, --DIAS SALUD 
											0, --DIAS PENSION 
											0, --DIAS RIESGO 
											@ValAjuIBLPatSal,
											@ValAjuIBLPatPen,
											@ValAjuIBLPatSal,
											@ValAjuIBLPatSal,
											@ValAjuIBLPatPen,
											@ValAjuIBLPatSal,
											@PorTotalSalud,
											@PorTotalPen,
											@PorPatRie,
											@ValApoPatSal,
											@ValApoPatPen,
											@ValApoPatRie,
											@ValApoEmpSal,
											@ValApoEmpPen,
											@ValFSP,
											0,
											@CodCont,
											0, --DIAS CCF 
											@ValAjuIBLPatCCF,
											@IDL_Num,
											@ValAjuIBLPatSENA,
											@ValAjuIBLPatICBF,
											@PorPatCCF,
											@PorPatSENA,
											@PorPatICBF,
											@PorPatEIT,
											@PorPatESAP,
											@ValApoPatCCF,
											@ValApoPatSENA,
											@ValApoPatEIT,
											@ValApoPatESAP,
											@ValApoPatICBF,
											@ValFSubsistencia,
											'',
											'',
											'',
											@FechaInicioSLN,
											@FechafinSLN,
											@FechaInicioIEG,
											@FechafinIEG,
											@FechaInicioLMA,
											@FechafinLMA,
											@FechaInicioVac,
											@FechafinVac,
											@FechaInicioVct,
											@FechafinVct,
											@FechaInicioIrl,
											@FechafinIrl,
											0,
											0,
											@cer_nro;
				END;
			 END;

		  END;

	   END;

	   SET @Contador = @Contador + 1;

    END;

END;

```
