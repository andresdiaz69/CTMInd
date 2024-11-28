# Stored Procedure: sp_rhh_CreaEmp

## Usa los objetos:
- [[fn_gen_sumdf360]]
- [[GTH_Contratos]]
- [[GTH_ParamContratos]]
- [[rhh_emplea]]
- [[rhh_empleadeducible]]
- [[rhh_hisdiasvac]]
- [[rhh_hisfon]]
- [[rhh_hislab]]
- [[rhh_novfija]]
- [[rhh_tipcon]]
- [[sp_gen_validatriggers]]
- [[sp_rhh_LiqErrInfo]]
- [[vtu_gth_NovedadesFijas]]

```sql
-- =====================================================================
-- Author:		Viviana Solano
-- Create date: Agosto 8 de 2011
-- Description:	Creacion Empleado apartir de un proceso especial
-- =====================================================================

CREATE PROCEDURE [dbo].[sp_rhh_CreaEmp]
	@CodEmp			CHAR(12),
	@Ap1Emp			CHAR(50),
	@Ap2Emp			CHAR(50),
	@Nom1Emp		CHAR(50),	
	@Nom2Emp		CHAR(50),
	@NumIde			VARCHAR(15),
	@TipIde			CHAR(2),
	@Paidoc			CHAR(3),
	@DepDoc			CHAR(2),
	@CiuDoc			CHAR(5),
	@FecExpDoc		DATETIME,
	@FecNac			DATETIME,
	@PaiNac			CHAR(3),
	@DeptNac		CHAR(2),
	@CiuNac			CHAR(5),
	@GenEmp			CHAR(1),
	@EstCiv			CHAR(1),
	@NroPsp			VARCHAR(20),
	@CodPaiEmi		VARCHAR(3),
	@FecExpPsp		DATETIME,
	@FecVenPsp		DATETIME,
	@ClaLib			CHAR(1),
	@NumLib			CHAR(12),
	@DisLib			CHAR(5),
	@GruSan			CHAR(2),
	@FacRhh			CHAR(1),
	@TamEmp			MONEY,
	@PesEmp			MONEY,
	@NacEmp			CHAR(1),
	@PaiRes			CHAR(3),
	@DeptRes		CHAR(2),
	@CiuRes			CHAR(5),
	@LocRes			CHAR(2),
	@BarRes			CHAR(4),
	@DirRes			VARCHAR(100),
	@barrio			VARCHAR(50),
	@TelRes			VARCHAR(50),
	@TelCel			VARCHAR(50),
	@Email			VARCHAR(100),
	@AviEmp			VARCHAR(150),
	@RegSal			CHAR(1),
	@codTlq			VARCHAR(2),
	@TipPag			CHAR(3),
	@CodBan			CHAR(2),
	@CtaBan			CHAR(25),
	@MetRet			CHAR(1),
	@PorRet			SMALLINT,
	@PrmSal			MONEY,
	@IndVac			CHAR(1),
	@Diavac			SMALLINT,
	@Numcont		VARCHAR(20)	,
	@FecCon			DATETIME,
	@TipCon			CHAR(2),
	@TipTrabajo		TINYINT,
	@PaiCon			CHAR(3),
	@DepCon			CHAR(2),
	@CiuCon			CHAR(5),
	@NotCon			VARCHAR(200),
	@Codcia			CHAR(3),
	@CodSuc			CHAR(3),
	@CodCco			CHAR(10),
	@CodCl1			VARCHAR(12),
	@CodCl2			VARCHAR(12),
	@CodCl3			VARCHAR(12),
	@CodCl4			VARCHAR(12),
	@CodCl5			VARCHAR(12),
	@CodCl6			VARCHAR(12),
	@CodCl7			VARCHAR(12),
	@CodArea		VARCHAR(12),
	@sucSS			CHAR(10),
	@CodCT			INT,
	@CodCar			CHAR(8),
	@SalBas			MONEY,
	@PaiLab			CHAR(3),
	@DepLab			CHAR(2),
	@CiuLab			CHAR(5),
	@FecIng			DATETIME,
	@FecFin			DATETIME,
	@ModLiq			CHAR(2),
	@HorasMes		NUMERIC(18,2),
	@ClaSal			SMALLINT,
	@FdoSal			CHAR(4),
	@FdoPen			CHAR(4),
	@FdoCCF			CHAR(4),
	@FdoArp			CHAR(4),
	@FdoCes			CHAR(4),
	@Arp			CHAR(15),
	@TipCot			CHAR(2),
	@SubTipCot		CHAR(2),
	@IndExtjero		BIT,
	@IndResExt		BIT,
	@CodAlt			VARCHAR(15), -- Código Alterno
	@CodEst			CHAR(2), -- Código del Estado Laboral del Empleado
	@CtaGasto		CHAR(16), -- Cuenta de Gastos
	@IndCco			BIT, -- Indicador Distribución por Centro de Costos
	@IndDecRta		CHAR(1),
	@NumReq			INT,
	@AutDat			TINYINT,
	@FecAut			DATETIME,
	@IndSab			BIT,
	@Ind_m31		BIT, 
	@DedViv			MONEY, 
	@DedSal			MONEY, 
	@IndDep			BIT, 
	@Ind_Pdias		BIT, 
	@Ind_Svar		BIT,
	@NovFijas		vtu_gth_NovedadesFijas READONLY,
	@IndCont		INT, --1 = Nuevo Contrato, 2 = Recontratación
	@ValHora		MONEY,
	@TipMedCer		VARCHAR(2),
	@IndCcoNiif		BIT,
	@CtaGasNiif		CHAR(16),
	@FecFinPerPba	DATETIME,
	@IndEstLabRef	BIT,
	@CodPagElec		CHAR(20),
	@Observacion	TEXT,
	@Emailalt		VARCHAR(100),
	@ind_lider		BIT,
	@ind_temporal	BIT

-- WITH ENCRYPTION
AS
BEGIN
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;

	SET	@CodEmp = RTRIM(LTRIM(@CodEmp));

	DECLARE @PorArp			NUMERIC(9,4);
	DECLARE	@cod_con		INTEGER;
	DECLARE @Emp			SMALLINT;
	DECLARE @cMsgErr		VARCHAR(MAX);
	DECLARE @NomEmp			VARCHAR(100);
	DECLARE @Fec_Fin		DATETIME;
	DECLARE @TipDur			TINYINT;
	DECLARE	@Durcon			BIT;
	DECLARE @Fec_FinHl		DATETIME; -- Fecha fin historia laobral 
	DECLARE @fFec_afiSal	DATETIME
	DECLARE @fFec_afiPen	DATETIME
	DECLARE @fFec_afiCCF	DATETIME
	DECLARE @fFec_afiArl	DATETIME
	Declare @fFec_afiCes	DATETIME
	DECLARE @fFeciniHdVac	DATETIME;
	DECLARE @fFecNovfij		DATETIME;
	DECLARE @cantnovfija	INT;
	DECLARE @FecFinVal		DATETIME;	 /*Fecha Finalizacion para validacion*/

	SELECT	@TipDur = tip_dur, @Durcon = dur_con 
	FROM	rhh_tipcon 
	WHERE	tip_con = @TipCon;

	IF @FecFin = '19000101'
	BEGIN
		SET @Fec_Fin = NULL;
	END
	ELSE
	BEGIN
		SET @Fec_Fin = @FecFin;
	END

	IF @FecFinPerPba = '19000101'
	BEGIN
		SET @FecFinPerPba = NULL;
	END

	SELECT	@Emp = COUNT(cod_emp) 
	FROM	rhh_emplea 
	WHERE	cod_emp = @CodEmp;

	SELECT @NomEmp = RTRIM(@Nom1Emp)+' '+RTRIM(@Nom2Emp);
	SELECT @PorArp = CONVERT(NUMERIC(9,4),REPLACE(@Arp,',','.'));		/* 2013-1188 */

	BEGIN TRY
		BEGIN TRANSACTION
			IF @IndCont = 1
			BEGIN
				IF @Emp = 1
				BEGIN
					RAISERROR('El Empleado Existe', 16, 1);
				END
			END

			IF @TipDur= 1 AND (@FecFin IS NULL OR @FecFin ='19000101')
			BEGIN
				RAISERROR ('El tipo de Contrato es termino fijo. La fecha de finalizacion no puede ser NULA', 16, 1);
			END

			SET @FecFinVal = dbo.fn_gen_sumdf360 (@FecIng,360);

			IF DATEPART (DAY, @FecFinVal) = 30
			BEGIN
			   SET @FecFinVal = EOMONTH(@FecFinVal);
			END

			IF @TipDur= 1 AND @Durcon = 0 AND @FecFin > @FecFinVal 
			BEGIN
				RAISERROR('El tipo de Contrato es termino fijo inferior a 1 año. La fecha de finalizacion es superior a 1 año ', 16, 1);
			END

			IF @TipDur= 2
			BEGIN
				SELECT @FecFin = NULL;
			END
	
			IF @FecAut = '19000101'
			BEGIN
				SET @FecAut = NULL;
			END
			/*** Validamos las fechas de finalizacion de las diferentes tablas. ***/
		  	-- Obtenemos la maxima fecha de retiro del empelado. 
			SELECT	@Fec_finHl  = MAX(fec_ret)
			FROM	rhh_hislab
			WHERE	cod_emp = @CodEmp;

			-- Tabla rhh_hisdiasvac: Actualizacion Fecha Fin  si la fec_fin es NULA  
			SELECT  @fFeciniHdVac =  MAX(fec_ini) FROM rhh_hisdiasvac  WHERE cod_emp = @CodEmp;

			IF(SELECT fec_fin FROM rhh_hisdiasvac WHERE cod_emp = @CodEmp AND fec_ini = @fFeciniHdVac) IS NULL
			OR (SELECT fec_fin FROM rhh_hisdiasvac WHERE cod_emp = @CodEmp AND fec_ini = @fFeciniHdVac) = '19000101'
			BEGIN
				UPDATE	rhh_hisdiasvac
				SET		fec_fin = @Fec_FinHl 
				WHERE	cod_emp = @CodEmp  
						AND fec_fin IS NULL
						AND fec_ini = (SELECT  MAX(fec_ini) FROM rhh_hisdiasvac  WHERE cod_emp = @CodEmp);    
			END; 
			--  tabla de Fondos: Actualizacion Fecha Retiro  si la FEC_TER es NULA 
			SELECT  @fFec_afiSal = MAX(fec_afi) FROM rhh_hisfon  WHERE cod_emp = @CodEmp AND tip_fdo = 1;
			SELECT  @fFec_afiPen = MAX(fec_afi) FROM rhh_hisfon  WHERE cod_emp = @CodEmp AND tip_fdo = 2;
			SELECT  @fFec_afiArl = MAX(fec_afi) FROM rhh_hisfon  WHERE cod_emp = @CodEmp AND tip_fdo = 3;
			SELECT  @fFec_afiCCF = MAX(fec_afi) FROM rhh_hisfon  WHERE cod_emp = @CodEmp AND tip_fdo = 4;
			SELECT  @fFec_afiCes = MAX(fec_afi) FROM rhh_hisfon  WHERE cod_emp = @CodEmp AND tip_fdo = 5;

			IF( SELECT fec_ter FROM rhh_hisfon WHERE cod_emp = @CodEmp AND tip_fdo = 1 AND fec_afi = @fFec_afiSal) IS NULL
				OR ( SELECT fec_ter FROM rhh_hisfon WHERE cod_emp = @CodEmp AND tip_fdo = 1 AND fec_afi = @fFec_afiSal) = '19000101'
			BEGIN
				UPDATE	rhh_hisfon
				SET		fec_ter = @Fec_FinHl,
						tip_nov = 3
				WHERE	cod_emp = @CodEmp  AND tip_fdo = 1
						AND fec_ter IS NULL
						AND fec_afi = @fFec_afiSal;
			END;

			IF( SELECT fec_ter FROM rhh_hisfon WHERE cod_emp = @CodEmp  AND tip_fdo = 2 AND fec_afi = @fFec_afiPen) IS NULL
				OR ( SELECT fec_ter FROM rhh_hisfon WHERE cod_emp = @CodEmp AND  tip_fdo = 2 AND fec_ter IS NULL AND fec_afi = @fFec_afiPen) = '19000101'
			BEGIN
				UPDATE	rhh_hisfon
				SET		fec_ter = @Fec_FinHl,
						tip_nov = 3
				WHERE	cod_emp = @CodEmp  AND tip_fdo = 2
						AND fec_ter IS NULL
						AND fec_afi = @fFec_afiPen;
			END;

			IF( SELECT fec_ter FROM rhh_hisfon WHERE cod_emp = @CodEmp  AND tip_fdo = 3 AND fec_afi = @fFec_afiArl ) IS NULL
				OR ( SELECT fec_ter FROM rhh_hisfon WHERE cod_emp = @CodEmp AND  tip_fdo = 3 AND fec_afi = @fFec_afiArl ) = '19000101'
			BEGIN
				UPDATE	rhh_hisfon
				SET		fec_ter = @Fec_FinHl,
						tip_nov = 3
				WHERE	cod_emp = @CodEmp  AND tip_fdo = 3
						AND fec_ter IS NULL
						AND fec_afi = @fFec_afiArl;
			END;

			IF( SELECT fec_ter FROM rhh_hisfon WHERE cod_emp = @CodEmp  AND tip_fdo = 4 AND fec_afi = @fFec_afiCCF ) IS NULL
				OR ( SELECT fec_ter FROM rhh_hisfon WHERE cod_emp = @CodEmp AND  tip_fdo = 4 AND fec_afi = @fFec_afiCCF) = '19000101'
			BEGIN
				UPDATE	rhh_hisfon
				SET		fec_ter = @Fec_FinHl,
						tip_nov = 3
				WHERE	cod_emp = @CodEmp  AND tip_fdo = 4
						AND fec_ter IS NULL
						AND fec_afi = @fFec_afiCCF;
			END;

			IF( SELECT fec_ter FROM rhh_hisfon WHERE cod_emp = @CodEmp  AND tip_fdo = 5 AND fec_afi = @fFec_afiCes) IS NULL
				OR ( SELECT fec_ter FROM rhh_hisfon WHERE cod_emp = @CodEmp AND tip_fdo = 5 AND fec_afi = @fFec_afiCes) = '19000101'
			BEGIN
				UPDATE	rhh_hisfon
				SET		fec_ter = @Fec_FinHl,
						tip_nov = 3
				WHERE	cod_emp = @CodEmp  AND tip_fdo = 5
						AND fec_ter IS NULL
						AND fec_afi = @fFec_afiCes;
			END;
		
			-- Actualizacion Fecha Hasta de la tablade novedades fijas si la fec_has es NULA  
			SELECT	@cantnovfija = COUNT(cod_con)  
			FROM	rhh_novfija 
			WHERE	cod_emp = @CodEmp  
					AND (FEC_HAS  IS NULL OR FEC_HAS = '19000101' OR FEC_HAS > @Fec_FinHl )

			IF  ( @cantnovfija >=1)
			BEGIN
				BEGIN TRY 
	    			EXEC sp_gen_validatriggers 'Tr_rhh_NovFija_Valid_PerBl',1;
				END TRY
				BEGIN CATCH
					EXEC sp_gen_validatriggers 'Tr_rhh_NovFija_Valid_PerBl',3;
				END CATCH
    	   
				IF  (SELECT COUNT(*) FROM rhh_novfija WHERE  COD_eMP = @CodEmp AND fec_has is null ) > 0 OR 
					(SELECT COUNT(*) FROM rhh_novfija WHERE  COD_eMP = @CodEmp AND fec_has = '19000101') > 0
				BEGIN 
					UPDATE	rhh_novfija
					SET		fec_has = @Fec_FinHl
					WHERE	cod_emp = @CodEmp  
							AND (FEC_HAS IS NULL OR FEC_HAS = '19000101');
				END
				IF  (SELECT COUNT(*) FROM rhh_novfija WHERE  COD_eMP = @CodEmp AND ind_Cto_FNov = 1  AND FEC_HAS > @Fec_FinHl) > 0
				BEGIN
					UPDATE	rhh_novfija
					SET		fec_has = @Fec_FinHl
					WHERE	cod_emp = @CodEmp  
							AND (FEC_HAS  > @Fec_fin)
							AND ind_Cto_FNov = 1;
				END 
				EXEC sp_gen_validatriggers 'Tr_rhh_NovFija_Valid_PerBl',3;
			END; 
       
	/***Fin Validacion fechas de retiro ******/

			/* Insert Informacion General*/
			IF @IndCont = 1
			BEGIN
				INSERT 
				INTO	rhh_emplea (cod_emp,ap1_emp,ap2_emp,nom_emp,num_ide,tip_ide,pai_exp,dpt_exp,ciu_exp,fec_nac,cod_pai,cod_dep,cod_ciu,sex_emp,est_civ,
						cla_lib,num_lib,dim_lib,gru_san,fac_rhh,tam_emp,pes_emp,nac_emp,pai_res,dpt_res,ciu_res,dir_res,barrio,tel_res,tel_cel,
						e_mail,avi_emp,reg_sal,tip_pag,cod_ban,cta_ban,met_ret,por_ret,prm_sal,ind_vac,dia_vac,por_ate,est_lab,cod_reloj,
						nom1_emp,nom2_emp,cod_tlq,ind_discco,cta_gas,ind_DecRenta,num_req,Aut_Dat,Fec_Aut,ind_m31,ind_pdias,ind_svar,ind_sab,
						Concepto_DIAN2280,tip_ded,fec_aum,ind_discconif,cta_gasnif,pto_gas,per_car,ind_estlabref,cod_pagelec,e_mail_alt,ind_lider,cod_est,
						fec_expdoc,fec_venc_psp,cod_localidad,cod_barrio,nro_psp,cod_pai_emisor_psp,fec_exp_psp)
				VALUES	(@CodEmp,RTRIM(@Ap1Emp),RTRIM(@Ap2Emp),@NomEmp,@NumIde,@TipIde,@Paidoc,@DepDoc,@CiuDoc,@FecNac,@PaiNac,@DeptNac,@CiuNac,@GenEmp,@EstCiv,
						@ClaLib,@NumLib,@DisLib,@GruSan,@FacRhh,@TamEmp,@PesEmp,@NacEmp,@PaiRes,@DeptRes,@CiuRes,@DirRes,@barrio,@TelRes,@TelCel,
						@Email,@AviEmp,@RegSal,@TipPag,@CodBan,RTRIM(LTRIM(@CtaBan)),@MetRet,@PorRet,@PrmSal,@IndVac,@Diavac,@PorArp,'01',@CodAlt,
						RTRIM(@Nom1Emp),RTRIM(@Nom2Emp),@codTlq,@IndCco,@CtaGasto,@IndDecRta,@NumReq,@AutDat,@FecAut,@Ind_m31,@Ind_Pdias,@Ind_Svar,@IndSab,
						@TipMedCer,0,@FecIng,@IndCcoNiif,@CtaGasNiif,0,0,@IndEstLabRef,@CodPagElec,@emailalt,@ind_lider,'04',@FecExpDoc,@FecVenPsp,
						@LocRes,@BarRes,@NroPsp,@CodPaiEmi,@FecExpPsp);
			END
			ELSE
			BEGIN
				UPDATE	rhh_emplea 
				SET		cod_emp = @CodEmp, ap1_emp = RTRIM(@Ap1Emp), ap2_emp = RTRIM(@Ap2Emp), nom_emp = @NomEmp,
						num_ide = @NumIde, tip_ide = @TipIde, pai_exp = @Paidoc, dpt_exp = @DepDoc, ciu_exp = @CiuDoc,
						fec_nac = @FecNac, cod_pai = @PaiNac, cod_dep = @DeptNac, cod_ciu = @CiuNac, sex_emp = @GenEmp, est_civ = @EstCiv,
						cla_lib = @ClaLib, num_lib = @NumLib, dim_lib = @DisLib, gru_san = @GruSan, fac_rhh = @FacRhh, tam_emp = @TamEmp,
						pes_emp = @PesEmp, nac_emp = @NacEmp, pai_res = @PaiRes, dpt_res = @DeptRes, ciu_res = @CiuRes, dir_res = @DirRes,
						barrio = @barrio, tel_res = @TelRes, tel_cel = @TelCel, e_mail = @Email, avi_emp = @AviEmp, reg_sal = @RegSal,
						tip_pag = @TipPag, cod_ban = @CodBan, cta_ban = RTRIM(LTRIM(@CtaBan)), met_ret = @MetRet, por_ret = @PorRet,
						prm_sal = @PrmSal, ind_vac = @IndVac, dia_vac = @Diavac, por_ate = @PorArp, est_lab = '01', cod_reloj = @CodAlt,
						nom1_emp = RTRIM(@Nom1Emp), nom2_emp = RTRIM(@Nom2Emp), cod_tlq = @codTlq, ind_discco = @IndCco, cta_gas = @CtaGasto,
						ind_DecRenta = @IndDecRta, Aut_Dat = @AutDat, Fec_Aut = @FecAut, ind_m31 = @Ind_m31,ind_pdias = @Ind_Pdias,
						ind_svar = @Ind_Svar, ind_sab = @IndSab, Concepto_DIAN2280 = @TipMedCer, ind_discconif = @IndCcoNiif, cta_gasnif = @CtaGasNiif,
						ind_estlabref = @IndEstLabRef, cod_pagelec = @CodPagElec, e_mail_alt = @emailalt, ind_lider = @ind_lider, cod_est = '04',
						fec_expdoc = @FecExpDoc, fec_venc_psp = @FecVenPsp, cod_localidad = @LocRes, cod_barrio = @BarRes, nro_psp = @NroPsp,
						cod_pai_emisor_psp = @CodPaiEmi, fec_exp_psp = @FecExpPsp
				WHERE	cod_emp = @CodEmp;
			END
		  		  
			/*Insert Informacion Contrato*/
			INSERT
			INTO	GTH_Contratos (cod_emp,num_cont,fec_con,tip_con,cod_pai,cod_dep,cod_ciu,not_con,tip_cot,SubTip_Cot,ind_extjero,ind_resi_extjero,cod_est,num_req,fec_pba,ind_temporal) 
			VALUES	(@CodEmp,@Numcont,@FecCon,@TipCon,@PaiCon,@DepCon,@CiuCon,@NotCon,@TipCot,@SubTipCot,@IndExtjero,@IndResExt,'1',@NumReq,@FecFinPerPba,@ind_temporal);

			SELECT	@cod_con = MAX(cod_con)
			FROM	GTH_Contratos 
			WHERE	cod_emp = @CodEmp AND num_cont = @Numcont AND fec_con = @FecCon;

			/* Insert Parametros Contrato*/	
			INSERT 
			INTO	GTH_ParamContratos(cod_emp,cod_con,fec_param,cla_sal,horas_mes,mod_liq,TipTrabajo) 
			VALUES	(@CodEmp,@cod_con,@FecIng,@ClaSal,@HorasMes,@ModLiq,@TipTrabajo);
		
			/*Insert Historia Laboral*/	
			INSERT 
			INTO	rhh_hislab (cod_emp,cod_con,cod_cia,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cl4,cod_cl5,cod_cl6,cod_cl7,cod_car,cod_area,suc_SS,cod_CT,
					sal_bas,fec_ini,fec_nov,cod_pai,cod_dep,cod_ciu,nue_con,tip_con,fec_fin,val_hora,des_fun) 
			VALUES	(@CodEmp,@cod_con,@Codcia,@CodSuc,@CodCco,@CodCl1,@CodCl2,@CodCl3,@CodCl4,@CodCl5,@CodCl6,@CodCl7,@CodCar,@CodArea,@sucSS,@CodCT,
					@SalBas,@FecIng,GETDATE(),@PaiLab,@DepLab,@CiuLab,1,@TipCon,@Fec_Fin,@ValHora,@Observacion);
	   
			/* Insert Afiliacion Pension */
			INSERT 
			INTO	rhh_hisfon(cod_emp,cod_fdo,fec_afi,tip_fdo,tip_nov)
			VALUES	(@CodEmp,@FdoPen,@FecIng,1,1);
   	
   			/* Insert Afiliacion Salud */
			INSERT 
			INTO	rhh_hisfon(cod_emp,cod_fdo,fec_afi,tip_fdo,tip_nov)
			VALUES	(@CodEmp,@FdoSal,@FecIng,2,1);
	
   			/* Insert Afiliacion CCF */
			INSERT 
			INTO	rhh_hisfon(cod_emp,cod_fdo,fec_afi,tip_fdo,tip_nov)
			VALUES	(@CodEmp,@FdoCCF,@FecIng,4,1);
	
			/* Insert Afiliacion ARP */
			INSERT
			INTO	rhh_hisfon(cod_emp,cod_fdo,fec_afi,tip_fdo,tip_nov)
			VALUES	(@CodEmp,@FdoArp,@FecIng,3,1);
	
			/* Insert Afiliacion Fondo Cesantias */
			INSERT 
			INTO	rhh_hisfon(cod_emp,cod_fdo,fec_afi,tip_fdo,tip_nov)
			VALUES	(@CodEmp,@FdoCes,@FecIng,5,1);
	
			/* Insert Deducibles para Retencion en la Fuente*/
			IF @DedViv > 0
			BEGIN
				INSERT 
				INTO	rhh_empleadeducible (Cod_Deducible, Cod_emp, Val_Deduc, Fec_ini)
				VALUES	(1, @CodEmp, @DedViv, @FecIng);
			END

			IF @DedSal > 0
			BEGIN
				INSERT 
				INTO	rhh_empleadeducible (Cod_Deducible, Cod_emp, Val_Deduc, Fec_ini)
				VALUES	(2, @CodEmp, @DedSal, @FecIng);
			END

			IF @IndDep = 1
			BEGIN
				INSERT 
				INTO	rhh_empleadeducible (Cod_Deducible, Cod_emp, Val_Deduc, Fec_ini)
				VALUES	(3, @CodEmp, 1 , @FecIng);
			END

			/* Inserta las Novedades Fijas */
			IF (SELECT COUNT(*) FROM @NovFijas) > 0
			BEGIN
				INSERT
				INTO	rhh_novfija(cod_emp,cod_con,fec_nov,fec_has,apl_con,val_nov,ind_pro,cod_cont,ind_vac,
						ind_inc,ind_licRem,ind_vacPag)
				SELECT	@CodEmp,cod_con,CONVERT (varchar(8),fec_nov, 112),CONVERT (varchar(8),fec_has, 112),apl_con,val_nov,ind_pro,@cod_con,ind_vac,ind_inc,ind_licrem,
						ind_vacpag
				FROM	@NovFijas;
			END

			--Se hace la actualización del estado al final para que permita ingresar los fondos.
			UPDATE	rhh_emplea 
			SET		est_lab = @CodEst
			WHERE	cod_emp = @CodEmp;

			COMMIT TRANSACTION
			SELECT 'Resultado del Proceso' = 'Empleado Creado Satisfactoriamente';
	
	END TRY
	BEGIN CATCH
		EXEC sp_rhh_LiqErrInfo @cMsgErr OUTPUT;

		IF @@TRANCOUNT > 0
		BEGIN
			ROLLBACK TRANSACTION;
		END
		
		SELECT 'Resultado del Proceso' = 'Error en el proceso:'+@cMsgErr;
		SET @cMsgErr = 'Error en el proceso:'+@cMsgErr;

		RAISERROR(@cMsgErr, 16, 1);
	
	END CATCH
END

```
