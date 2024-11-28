# Stored Procedure: Sp_rhh_InfNominaElectronica_SaphetyV1

## Usa los objetos:
- [[fn_gen_DP]]
- [[fn_rhh_Hislab_NumSec_cont]]
- [[fn_rhh_VG]]
- [[gen_bancos]]
- [[gen_compania]]
- [[gen_paises]]
- [[gen_tipide]]
- [[rhh_AdminEnvioPagoElectronico]]
- [[rhh_AdminEnvioPagoElectronicoDetalle]]
- [[rhh_AdminEnvioPE_Ajuste]]
- [[rhh_AdminEnvioPEDetalle_Ajuste]]
- [[rhh_CentroTrab]]
- [[rhh_ComprobanteElectronico]]
- [[rhh_ComprobanteElectronicoNota]]
- [[rhh_concep_nomelec]]
- [[rhh_emplea]]
- [[rhh_hislab]]
- [[rhh_LiqHis]]
- [[rhh_paramPagoElec]]
- [[Rhh_TbClasAus]]
- [[rhh_tbhorextra]]
- [[rhh_TbTipAus]]
- [[rhh_tbTipPag]]
- [[rhh_tipcon]]
- [[rhh_tipoliq]]
- [[sis_empresa]]
- [[v_rhh_Concep]]

```sql
-- ======================================================================
-- Author:  Viviana Solano
-- Create date: Mayo 6 de 2021
-- Description: Genera la información del empleado para Saphety
-- ======================================================================
CREATE PROCEDURE [dbo].[Sp_rhh_InfNominaElectronica_SaphetyV1]
	@cCodCia         CHAR(3),
	@cCodEmp         CHAR(12),
	@fFecha          DATETIME    = '20210228',
	@TipoComprobante TINYINT     = 1, /* (1-Nómina Electrónica, 2-Nómina Electrónica - Reemplazar) */
	@NumDoc          VARCHAR(40) = '',
	@IndHab          BIT         = 0 /* Indicador para Habilitacion */
--WITH ENCRYPTION
AS
BEGIN
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
    SET NOCOUNT ON;

    DECLARE @ConsecutivoNE BIGINT;
    DECLARE @Indweb BIT;

    SELECT @Indweb = ind_web
    FROM sis_empresa;

    DECLARE @fFechaE DATETIME = GETDATE();

    DECLARE @fFechaEmision DATE;
    DECLARE @fhoraEmision CHAR(19);

    DECLARE @ffecInic DATE = DATEADD(DAY, 1, EOMONTH(@fFecha, -1));
    DECLARE @ffecFin DATE = EOMONTH(@fFecha);

    DECLARE @FechaRetiro DATE;
    DECLARE @Consecutivo VARCHAR(MAX) = '';
    DECLARE @PaisCabecera CHAR(2) = '';
    DECLARE @DptoCabecera CHAR(2) = '';
    DECLARE @CiudadCabecera CHAR(5) = '';
    DECLARE @DiasTrabajados INT = 0;
    DECLARE @NumSec INT;
    DECLARE @Ind_Altoriesgo BIT;
    DECLARE @Salbas MONEY = 0;
    DECLARE @PaisTrabajo CHAR(2) = '';
    DECLARE @DptoTrabajo CHAR(2) = '';
    DECLARE @CiudadTrabajo CHAR(5) = '';
    DECLARE @SueldoTrabajado BIGINT = 0;
    DECLARE @Dotacion BIGINT = 0;
    DECLARE @ApoyoASostenimiento BIGINT = 0;
    DECLARE @Teletrabajo BIGINT = 0;
    DECLARE @Retiro BIGINT = 0;
    DECLARE @Indemnizacion BIGINT = 0;
    DECLARE @Reintegro BIGINT = 0;
    DECLARE @AuxilioTransporte BIGINT = 0;
    DECLARE @ViaticoSalarial BIGINT = 0;
    DECLARE @ViaticoNoSalarial BIGINT = 0;
    DECLARE @CantidadVC INT = 0;
    DECLARE @PagoVC BIGINT = 0;
    DECLARE @CantidadVCP INT = 0;
    DECLARE @PagoVCP BIGINT = 0;
    DECLARE @CantidadPrimas INT = 0;
    DECLARE @PagoPrimas BIGINT = 0;
    DECLARE @PagoNoSalarial BIGINT = 0;
    DECLARE @PagoCesantias BIGINT = 0;
    DECLARE @PorcentajeCesantias INT = 0;
    DECLARE @PagoIntereses BIGINT = 0;
    DECLARE @BonificacionSalarial BIGINT = 0;
    DECLARE @BonificacionNoSalarial BIGINT = 0;
    DECLARE @AuxilioSalarial BIGINT = 0;
    DECLARE @AuxilioNoSalarial BIGINT = 0;
    DECLARE @CompensacionOrdinaria BIGINT = 0;
    DECLARE @CompensacionExtraordinaria BIGINT = 0;
    DECLARE @PagoSalarialBono BIGINT = 0;
    DECLARE @PagoNoSalarialBono BIGINT = 0;
    DECLARE @PagoAlimentacionSalarial BIGINT = 0;
    DECLARE @PagoAlimentacionNoSalarial BIGINT = 0;
    DECLARE @ValorPagadoComision BIGINT = 0;
    DECLARE @ValorPagadoTercero BIGINT = 0;
    DECLARE @ValorPagadoAnticipo BIGINT = 0;

    DECLARE @PensionVoluntaria BIGINT = 0;
    DECLARE @RetencionFuente BIGINT = 0;
    DECLARE @AFC BIGINT = 0;
    DECLARE @Cooperativa BIGINT = 0;
    DECLARE @EmbargoFiscal BIGINT = 0;
    DECLARE @PlanesComplementarios BIGINT = 0;
    DECLARE @Educacion BIGINT = 0;
    DECLARE @ReintegroDeduccion BIGINT = 0;
    DECLARE @Deuda BIGINT = 0;
    DECLARE @PorcentajeSalud INT = 0;
    DECLARE @DeduccionSalud BIGINT = 0;
    DECLARE @PorcentajePension INT = 0;
    DECLARE @DeduccionPension BIGINT = 0;
    DECLARE @PorcentajeSeguridadPensional DECIMAL(6, 2)  = 0;
    DECLARE @DeduccionSeguridadPensional BIGINT = 0;
    DECLARE @PorcentajeSubsistencia DECIMAL(6, 2)  = 0;
    DECLARE @DeduccionSubsistencia BIGINT = 0;
    DECLARE @PorcentajeSindicato INT = 0;
    DECLARE @DeduccionSindicacato BIGINT = 0;
    DECLARE @ValorSancionPublica BIGINT = 0;
    DECLARE @ValorSancionPrivada BIGINT = 0;
    DECLARE @ValorPagadoTerceroDeduccion BIGINT = 0;
    DECLARE @ValorPagadoAnticipoDeduccion BIGINT = 0;
    DECLARE @ValorPagadoOtras BIGINT = 0;
    DECLARE @NumeroCabecera VARCHAR(MAX);
    DECLARE @TotalDevengados BIGINT = 0;
    DECLARE @TotalDeducciones BIGINT = 0;
    DECLARE @TotalComprobante BIGINT = 0;
    DECLARE @TotalIncapacidades BIGINT = 0;
    DECLARE @TotalOtrosConceptos BIGINT = 0;
    DECLARE @TotalLibranzas BIGINT = 0;
    DECLARE @TotalHorasExtras BIGINT = 0;
    DECLARE @fFec_TiempoLaborado DATETIME; /*Variable para el calculo del tiempo laborado*/
    DECLARE @prefijo CHAR(5);
    DECLARE @cod_cont INT;
    DECLARE @ParamFecha TINYINT;

    DECLARE @HED BIGINT = 0;
    DECLARE @Cantidad_HED BIGINT = 0;
    DECLARE @HEN BIGINT = 0;
    DECLARE @Cantidad_HEN BIGINT = 0;
    DECLARE @HRN BIGINT = 0;
    DECLARE @Cantidad_HRN BIGINT = 0;
    DECLARE @HEDDF BIGINT = 0;
    DECLARE @Cantidad_HEDDF BIGINT = 0;
    DECLARE @HRDDF BIGINT = 0;
    DECLARE @Cantidad_HRDDF BIGINT = 0;
    DECLARE @HENDF BIGINT = 0;
    DECLARE @Cantidad_HENDF BIGINT = 0;
    DECLARE @HRNDF BIGINT = 0;
    DECLARE @Cantidad_HRNDF BIGINT = 0;

    DECLARE @ErrorMessage NVARCHAR(4000);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;
    DECLARE @Inc_Email BIT;

    SELECT @prefijo = prefijo,
		 @ParamFecha = ParamFecha,
		 @Inc_Email = Inc_Email
    FROM rhh_paramPagoElec
    WHERE cod_cia = @cCodCia AND cod_operador = 2;

    --SET @fFechaEmision = CONVERT(VARCHAR(10), @fFechaE, 120);
    SET @fFechaEmision = @fFechaE;
    --SET @fhoraEmision = @fFechaE;
    --SET @fhoraEmision = CONVERT(VARCHAR(8), @fFechaE, 108);
    SET @fhoraEmision = CONVERT(CHAR(19), @fFechaE, 126);

    BEGIN TRY

	   IF OBJECT_ID('TempDb..#t_rhh_LiqHis') IS NOT NULL
	   BEGIN
		  TRUNCATE TABLE #t_rhh_LiqHis;
	   END;
		  ELSE
	   BEGIN
		  SELECT TOP 0 *,
					CONVERT(BIGINT, NULL) AS Consecutivo
		  INTO #t_rhh_LiqHis
		  FROM rhh_LiqHis;

		  CREATE UNIQUE NONCLUSTERED INDEX IX_TmpLiqHisPK ON #T_Rhh_LiqHis( cod_con, tip_liq, fec_liq, sec_con, nom_cvo, cod_cont, fec_cte,
		  conv_estruc, cpto_cvo, num_pas
															 );
		  IF @TipoComprobante = 2 OR @TipoComprobante = 3
		  BEGIN
			 SELECT @ConsecutivoNE = MAX(Consecutivo)
			 FROM rhh_AdminEnvioPagoElectronico
			 WHERE cod_cia = @cCodCia;

			 SET @ConsecutivoNE = ISNULL(@ConsecutivoNE, 0);
			 SET @ConsecutivoNE = @ConsecutivoNE + 1;

			 SELECT @ConsecutivoNE = Consecutivo
			 FROM rhh_AdminEnvioPagoElectronico
			 WHERE cod_operadorPE = 2
				  AND cod_cia = @cCodCia
				  AND cod_emp LIKE RTRIM(@cCodEmp)
				  AND Fecha = @fFecha
				  AND NumLote_operador IS NULL
				  AND TipoComprobante = @TipoComprobante;

			 IF @@ROWCOUNT = 0
			 BEGIN
				INSERT INTO rhh_AdminEnvioPagoElectronico( Consecutivo,
												   cod_cia,
												   cod_emp,
												   fecha,
												   TipoComprobante,
												   cod_operadorPE,
												   IndHab
												 )
				SELECT @ConsecutivoNE,
					  cod_cia,
					  cod_emp,
					  fecha,
					  TipoComprobante,
					  cod_operadorPE,
					  @IndHab
				FROM rhh_AdminEnvioPE_Ajuste
				WHERE cod_emp = @cCodEmp AND fecha = @fFecha;
			 END;

			 INSERT INTO rhh_AdminEnvioPagoElectronicoDetalle( Consecutivo,
													 cod_emp,
													 IDL_num,
													 cod_cia
												    )
			 SELECT @ConsecutivoNE,
				   cod_emp,
				   IDL_num,
				   @cCodCia
			 FROM rhh_AdminEnvioPEDetalle_Ajuste
			 WHERE cod_emp = @cCodEmp;

			 DELETE FROM rhh_AdminEnvioPEDetalle_Ajuste
			 WHERE cod_emp = @cCodEmp;

			 DELETE FROM rhh_AdminEnvioPE_Ajuste
			 WHERE cod_emp = @cCodEmp AND fecha = @fFecha;
		  END;

		  IF @TipoComprobante = 1 OR @TipoComprobante = 2
		  BEGIN
			 INSERT INTO #t_rhh_LiqHis
			 SELECT H.*,
				   E.Consecutivo
			 FROM rhh_liqhis AS H
			 INNER JOIN rhh_AdminEnvioPagoElectronico AS E ON H.cod_emp = E.cod_emp
			 INNER JOIN rhh_AdminEnvioPagoElectronicoDetalle AS ED ON ED.Consecutivo = E.Consecutivo AND ED.cod_cia = E.cod_cia AND H.IDL_num = ED
			 .IDL_num
			 WHERE cod_operadorPE = 2
				  AND NumLote_operador IS NULL
				  AND fecha = @fFecha
				  AND H.cod_emp = @cCodEmp
				  AND H.cod_cia = @cCodCia
				  AND ind_PagoRetro = 0
				  AND TipoComprobante = @TipoComprobante /*Excluye registros de pago y calculo retroactivo y compensación flexible*/
				  AND IndHab = @IndHab;

			 IF @@ROWCOUNT = 0
			 BEGIN
				SELECT 'No hay registros para procesar';
				RETURN;
			 END;
		  END;
	   END;

	   --SELECT TOP 1 @Consecutivo = CONVERT(VARCHAR(MAX), Consecutivo)
	   --FROM #t_rhh_LiqHis;
	   SELECT @Consecutivo = CONVERT(VARCHAR(MAX), Consecutivo)
	   FROM rhh_AdminEnvioPagoElectronico
	   WHERE cod_operadorPE = 2
		    AND NumLote_operador IS NULL
		    AND fecha = @fFecha
		    AND cod_emp = @cCodEmp
		    AND cod_cia = @cCodCia
		    AND TipoComprobante = @TipoComprobante;

	   IF @prefijo = ''
	   BEGIN
		  SET @prefijo = 'NOM';
	   END;

	   SET @NumeroCabecera = RTRIM(@prefijo) + @Consecutivo;

	   DECLARE @FechasPagosNomina TABLE(
		   Fecha DATE
								);

	   IF @ParamFecha = 1
	   BEGIN
		  INSERT INTO @FechasPagosNomina( Fecha )
		  SELECT fec_cte
		  FROM( SELECT ROW_NUMBER() OVER(PARTITION BY fec_cte
					ORDER BY fec_cte) AS Num,
					fec_cte
			   FROM #t_rhh_LiqHis WITH(NOLOCK) ) AS ID1
		  WHERE num = 1;
	   END;
		  ELSE
	   BEGIN
		  INSERT INTO @FechasPagosNomina( Fecha )
		  SELECT fec_liq
		  FROM( SELECT ROW_NUMBER() OVER(PARTITION BY fec_liq
					ORDER BY fec_liq) AS Num,
					fec_liq
			   FROM #t_rhh_LiqHis WITH(NOLOCK) ) AS ID1
		  WHERE num = 1;

	   END;

	   SELECT @PaisCabecera = cod_iso,
			@DptoCabecera = cod_dep,
			@CiudadCabecera = cod_ciu
	   FROM gen_compania AS C
	   INNER JOIN gen_paises AS P ON C.cod_pai = P.cod_pai
	   WHERE cod_cia = @cCodCia;

	   SELECT @cod_cont = MAX(cod_cont)
	   FROM #t_rhh_LiqHis;

	   SET @NumSec = dbo.fn_rhh_Hislab_NumSec_cont( @cCodEmp, @cod_cont, @fFecha, 0, 1 );

	   SELECT @Ind_Altoriesgo = Ind_Altoriesgo,
			@Salbas = sal_bas,
			@PaisTrabajo = cod_iso,
			@DptoTrabajo = cod_dep,
			@CiudadTrabajo = cod_ciu,
			@FechaRetiro = fec_ret
	   FROM rhh_hislab AS H
	   INNER JOIN rhh_CentroTrab AS CT ON H.cod_ct = CT.cod_CT
	   INNER JOIN gen_paises AS P ON H.cod_pai = P.cod_pai
	   WHERE cod_emp = @cCodEmp AND num_sec = @NumSec;

	   SET @PorcentajeSalud = CONVERT(FLOAT, dbo.fn_rhh_VG( 32, @fFecha ));
	   SET @PorcentajePension = CONVERT(FLOAT, dbo.fn_rhh_VG( 33, @fFecha ));

	   IF @FechaRetiro < @fFecha
	   BEGIN
		  SET @fFec_TiempoLaborado = @FechaRetiro;
	   END;
		  ELSE
	   BEGIN
		  SET @fFec_TiempoLaborado = @fFecha;
	   END;

	   DECLARE @rhh_emplea TABLE(
		   CodigoTrabajador         VARCHAR(12) COLLATE DATABASE_DEFAULT NULL,
		   PeriodoNomina            SMALLINT,
		   FechaIngreso             DATE,
		   FechaRetiro              DATE,
		   TiempoLaborado           INT,
		   TipoTrabajador           CHAR(2) COLLATE DATABASE_DEFAULT NULL,
		   SubTipoTrabajador        CHAR(2) COLLATE DATABASE_DEFAULT NULL,
		   AltoRiesgoPension        BIT,
		   TipoDocumento            TINYINT,
		   NumeroDocumento          VARCHAR(15),
		   PrimerApellido           VARCHAR(50) COLLATE DATABASE_DEFAULT NULL,
		   SegundoApellido          VARCHAR(50) COLLATE DATABASE_DEFAULT NULL,
		   PrimerNombre             VARCHAR(50) COLLATE DATABASE_DEFAULT NULL,
		   OtrosNombres             VARCHAR(50) COLLATE DATABASE_DEFAULT NULL,
		   SalarioIntegral          BIT,
		   TipoContrato             SMALLINT,
		   Sueldo                   MONEY,
		   LugarTrabajoPais         VARCHAR(2) COLLATE DATABASE_DEFAULT NULL,
		   LugarTrabajoDepartamento CHAR(2),
		   LugarTrabajoCiudad       CHAR(5),
		   LugarTrabajoDireccion    VARCHAR(100) COLLATE DATABASE_DEFAULT NULL,
		   Forma                    TINYINT,
		   /*FechaPago numero ?????*/
		   Metodo                   VARCHAR(3) COLLATE DATABASE_DEFAULT NULL,
		   Banco                    VARCHAR(30) COLLATE DATABASE_DEFAULT NULL,
		   TipoCuenta               VARCHAR(100) COLLATE DATABASE_DEFAULT NULL,
		   NumeroCuenta             VARCHAR(25) COLLATE DATABASE_DEFAULT NULL,
		   Email                    VARCHAR(100) COLLATE DATABASE_DEFAULT NULL
						   );

	   DECLARE @Devengados TABLE(
		   CodEmp                     CHAR(12),
		   DiasTrabajados             INT,
		   SueldoTrabajado            BIGINT,
		   Dotacion                   BIGINT,
		   ApoyoASostenimiento        BIGINT,
		   Teletrabajo                BIGINT,
		   Retiro                     BIGINT,
		   Indemnizacion              BIGINT,
		   Reintegro                  BIGINT,
		   AuxilioTransporte          BIGINT,
		   ViaticoSalarial            BIGINT,
		   ViaticoNoSalarial          BIGINT,
		   CantidadVC                 INT, /*VacacionesComunes*/
		   PagoVC                     BIGINT,
		   CantidadVCP                INT, /*VacacionesCompensadas*/
		   PagoVCP                    BIGINT,
		   CantidadPrimas             INT, /*Primas*/
		   PagoPrimas                 BIGINT, /*Primas*/
		   PagoNoSalarial             BIGINT,
		   PagoCesantias              BIGINT, /*Cesantias*/
		   Porcentaje                 INT,
		   PagoIntereses              BIGINT,
		   BonificacionSalarial       BIGINT,
		   BonificacionNoSalarial     BIGINT,
		   AuxilioSalarial            BIGINT,
		   AuxilioNoSalarial          BIGINT,
		   CompensacionOrdinaria      BIGINT,
		   CompensacionExtraordinaria BIGINT,
		   PagoSalarialBono           BIGINT,
		   PagoNoSalarialBono         BIGINT,
		   PagoAlimentacionSalarial   BIGINT,
		   PagoAlimentacionNoSalarial BIGINT,
		   ValorPagadoComision        BIGINT,
		   ValorPagadoTercero         BIGINT,
		   ValorPagadoAnticipo        BIGINT
						   );

	   DECLARE @Deducciones TABLE(
		   CodEmp                       CHAR(12),
		   PensionVoluntaria            BIGINT,
		   RetencionFuente              BIGINT,
		   AFC                          BIGINT,
		   Cooperativa                  BIGINT,
		   EmbargoFiscal                BIGINT,
		   PlanesComplementarios        BIGINT,
		   Educacion                    BIGINT,
		   Reintegro                    BIGINT,
		   Deuda                        BIGINT,
		   PorcentajeSalud              INT,
		   DeduccionSalud               BIGINT,
		   PorcentajePension            INT,
		   DeduccionPension             BIGINT,
		   PorcentajeSeguridadPensional DECIMAL(6, 2),
		   DeduccionSeguridadPensional  BIGINT,
		   PorcentajeSubsistencia       DECIMAL(6, 2),
		   DeduccionSubsistencia        BIGINT,
		   PorcentajeSindicato          INT,
		   DeduccionSindicacato         BIGINT,
		   ValorSancionPublica          BIGINT,
		   ValorSancionPrivada          BIGINT,
		   ValorPagadoTercero           BIGINT,
		   ValorPagadoAnticipo          BIGINT,
		   ValorPagadoOtras             BIGINT
						    );

	   INSERT INTO @rhh_emplea( CodigoTrabajador,
						   PeriodoNomina,
						   FechaIngreso,
						   FechaRetiro,
						   TiempoLaborado,
						   TipoTrabajador,
						   SubTipoTrabajador,
						   AltoRiesgoPension,
						   TipoDocumento,
						   NumeroDocumento,
						   PrimerApellido,
						   SegundoApellido,
						   PrimerNombre,
						   OtrosNombres,
						   SalarioIntegral,
						   TipoContrato,
						   Sueldo,
						   LugarTrabajoPais,
						   LugarTrabajoDepartamento,
						   LugarTrabajoCiudad,
						   LugarTrabajoDireccion,
						   Forma,
						   Metodo,
						   Banco,
						   TipoCuenta,
						   NumeroCuenta,
						   Email
						 )
	   SELECT cod_emp,
			TL.Cod_NomElec,
			fec_ing,
			@FechaRetiro,
			dbo.fn_gen_DP( FEC_ING, @fFec_TiempoLaborado ),
			tip_cot,
			CASE
			    WHEN SubTip_Cot = '0' THEN '00'
			    ELSE '01'
			END,
			CASE
			    WHEN @Ind_Altoriesgo = 1 THEN 1
			    ELSE 0
			END,
			CONVERT(INT, T.cod_dian),
			num_ide,
			RTRIM(ap1_emp),
			RTRIM(ap2_emp),
			RTRIM(nom1_emp),
			RTRIM(nom2_emp),
			CASE
			    WHEN cla_sal = 1 THEN 0
			    ELSE 1
			END,
			C.Cod_NomElec,
			@Salbas,
			@PaisTrabajo,
			@DptoTrabajo,
			@CiudadTrabajo,
			RTRIM(dir_res) AS LugarTrabajoDireccion,
			1,
			TP.Cod_NomElec,
			CASE
			    WHEN E.cod_ban = '0' THEN ''
			    ELSE nom_ban
			END,
			CASE
			    WHEN TP.for_pag = 1 THEN TP.nom_pag
			    ELSE ''
			END,
			cta_ban,
			e_mail
	   FROM rhh_emplea AS E
	   INNER JOIN rhh_tipoliq AS TL ON E.cod_tlq = TL.cod_tlq
	   INNER JOIN gen_tipide AS T ON E.tip_ide = T.cod_tip
	   INNER JOIN rhh_tipcon AS C ON E.tip_con = C.tip_con
	   --	   INNER JOIN gen_paises AS P ON P.cod_pai = E.pai_res
	   INNER JOIN rhh_tbTipPag AS TP ON E.tip_pag = TP.tip_pag
	   INNER JOIN gen_bancos AS B ON E.cod_ban = B.cod_ban
	   WHERE cod_emp = @cCodEmp;

	   /*Información para Devengados*/

	   SELECT @DiasTrabajados = ISNULL(SUM(can_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '01';

	   SELECT @SueldoTrabajado = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '02';

	   SELECT @Dotacion = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '40';

	   SELECT @ApoyoASostenimiento = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '41';

	   SELECT @Teletrabajo = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '42';

	   SELECT @Retiro = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '43';

	   SELECT @Indemnizacion = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '44';

	   SELECT @Reintegro = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '45';

	   SELECT @AuxilioTransporte = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '03';

	   SELECT @ViaticoSalarial = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '04';

	   SELECT @ViaticoNoSalarial = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '05';

	   IF( SELECT ISNULL(SUM(val_liq), 0)
		  FROM #t_rhh_LiqHis AS H
		  INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
		  WHERE IDatributo = '13' AND H.cod_con = '001130' ) > 0
	   BEGIN
		  SELECT @CantidadVC = ISNULL(SUM(can_liq), 0)
		  FROM #t_rhh_LiqHis AS H
		  WHERE cod_con = '000004';
	   END;

	   SELECT @PagoVC = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '13';

	   SELECT @CantidadVCP = ROUND(ISNULL(SUM(can_liq), 0), 0),
			@PagoVCP = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '14';

	   SELECT @CantidadPrimas = ISNULL(MAX(can_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '15';

	   SELECT @PagoPrimas = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '15';

	   SELECT @PagoNoSalarial = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '16';

	   SELECT @PagoCesantias = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '17' AND H.cod_con <> '008419';

	   IF DATEPART(MONTH, @fFecha) = '12'
	   BEGIN
		  SELECT @PagoCesantias = @PagoCesantias + ISNULL(SUM(val_liq), 0)
		  FROM #t_rhh_LiqHis AS H
		  INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
		  WHERE IDatributo = '17' AND H.cod_con = '008419';
	   END;

	   SELECT @PagoIntereses = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '18' AND H.cod_con <> '008413';

	   IF DATEPART(MONTH, @fFecha) = '12'
	   BEGIN
		  SELECT @PagoIntereses = @PagoIntereses + ISNULL(SUM(val_liq), 0)
		  FROM #t_rhh_LiqHis AS H
		  INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
		  WHERE IDatributo = '18' AND H.cod_con = '008413';
	   END;

	   SELECT @PorcentajeCesantias = ISNULL(MAX(can_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   WHERE cod_con = '001569';

	   SELECT @BonificacionSalarial = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '23';

	   SELECT @BonificacionNoSalarial = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '24';

	   SELECT @AuxilioSalarial = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '25';

	   SELECT @AuxilioNoSalarial = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '26';

	   SELECT @CompensacionOrdinaria = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '30';

	   SELECT @CompensacionExtraordinaria = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '31';

	   SELECT @PagoSalarialBono = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '32';

	   SELECT @PagoNoSalarialBono = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '33';

	   SELECT @PagoAlimentacionSalarial = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '34';

	   SELECT @PagoAlimentacionNoSalarial = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '35';

	   SELECT @ValorPagadoComision = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '37';

	   SELECT @ValorPagadoTercero = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '38';

	   SELECT @ValorPagadoAnticipo = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '39';

	   DECLARE @HorasExtras TABLE(
		   idpropiedad CHAR(6),
		   /*propiedaddesc VARCHAR(100),*/
		   HoraInicio  DATETIME,
		   HoraFin     DATETIME,
		   Cantidad    MONEY,
		   Porcentaje  INT,
		   Pago        MONEY
						    );

	   INSERT INTO @HorasExtras( idpropiedad,
						    Cantidad,
						    Pago
						  )
	   SELECT IDatributo,
			SUM(can_liq),
			SUM(val_liq)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   INNER JOIN rhh_tbhorextra AS HE ON C.IDatributo = HE.idpropiedad AND HE.idpropiedad <> 0
	   GROUP BY IDatributo;

	   --  UPDATE @HorasExtras
	   --SET Porcentaje = HE.Porcentaje,
	   --propiedaddesc = NE.propiedaddesc
	   --  FROM @HorasExtras AS H
	   --  INNER JOIN rhh_tbhorextra AS HE ON H.idpropiedad = HE.idpropiedad
	   --  INNER JOIN rhh_NomElec_propiedades AS NE ON HE.idpropiedad = NE.idpropiedad	        
	   UPDATE @HorasExtras
		SET Porcentaje = HE.Porcentaje
	   FROM @HorasExtras AS H
	   INNER JOIN rhh_tbhorextra AS HE ON H.idpropiedad = HE.idpropiedad;

	   /*Cuando se diligencien los campos de fechas se debe aplicar formato CONVERT(VARCHAR(10), FechaInicio, 120) AS FechaInicio*/

	   DECLARE @Incapacidades TABLE(
		   FechaInicio VARCHAR(10) DEFAULT '',
		   FechaFin    VARCHAR(10) DEFAULT '',
		   Cantidad    INT,
		   Tipo        INT,
		   Pago        BIGINT DEFAULT 0,
		   cod_con     CHAR(6)
							 );

	   -- INSERT INTO @Incapacidades( Cantidad,
	   --				 Tipo,
	   --				 Pago
	   --			    )
	   -- SELECT ISNULL(SUM(can_liq), 0),
	   --Cod_NomElec,
	   --ISNULL(SUM(val_liq), 0)
	   -- FROM #t_rhh_LiqHis AS H
	   -- INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   -- INNER JOIN rhh_TbTipAus AS AU ON H.cod_con = AU.Cod_ConPago
	   --					 OR H.cod_con = AU.Cod_ConAuxDias
	   --					 OR H.cod_con = AU.Cod_ConAuxPorcentaje
	   -- INNER JOIN Rhh_TbClasAus AS CA ON CA.cla_aus = AU.cla_aus
	   -- WHERE IDatributo = '19'
	   -- GROUP BY Cod_NomElec;
	   INSERT INTO @Incapacidades( Cantidad,
							 cod_con,
							 Pago
						    )
	   SELECT ISNULL(SUM(can_liq), 0),
			H.cod_con,
			ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '19'
	   GROUP BY H.cod_con;

	   UPDATE @Incapacidades
		SET Tipo = Cod_NomElec
	   FROM @Incapacidades I
	   INNER JOIN rhh_TbTipAus AS AU ON I.cod_con = AU.Cod_ConPago
								 OR I.cod_con = AU.Cod_ConAuxDias
								 OR I.cod_con = AU.Cod_ConAuxPorcentaje
								 OR I.cod_con = AU.Cod_ConFactPrestInt
	   INNER JOIN Rhh_TbClasAus AS CA ON CA.cla_aus = AU.cla_aus;

	   UPDATE @Incapacidades
		SET Cantidad = 0
	   FROM @Incapacidades AS I
	   INNER JOIN rhh_TbTipAus AS AU ON I.cod_con = AU.Cod_ConAuxPorcentaje OR I.cod_con = AU.Cod_ConFactPrestInt
	   INNER JOIN Rhh_TbClasAus AS CA ON CA.cla_aus = AU.cla_aus;

	   /*Licencia Maternidad*/
	   INSERT INTO @Incapacidades( Cantidad,
							 Tipo,
							 Pago
						    )
	   SELECT ISNULL(SUM(can_liq), 0),
			10,
			ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '20';

	   /*Licencia Remunerada*/
	   INSERT INTO @Incapacidades( Cantidad,
							 Tipo,
							 Pago
						    )
	   SELECT ISNULL(SUM(can_liq), 0),
			11,
			ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '21';

	   /*Licencia No Remunerada*/
	   INSERT INTO @Incapacidades( Tipo,
							 Cantidad
						    )
	   SELECT 12,
			ISNULL(SUM(can_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '22';

	   DECLARE @OtrosConceptos TABLE(
		   DescripcionConcepto VARCHAR(200),
		   ConceptoSalarial    BIGINT DEFAULT 0,
		   ConceptoNoSalarial  BIGINT DEFAULT 0
							  );

	   INSERT INTO @OtrosConceptos( DescripcionConcepto,
							  ConceptoSalarial
							)
	   SELECT nom_con,
			ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   INNER JOIN v_rhh_Concep AS DC ON H.cod_con = DC.cod_con AND H.mod_liq = DC.mod_liq
	   WHERE IDatributo = '28'
	   GROUP BY nom_con;

	   INSERT INTO @OtrosConceptos( DescripcionConcepto,
							  ConceptoNoSalarial
							)
	   SELECT nom_con,
			ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   INNER JOIN v_rhh_Concep AS DC ON H.cod_con = DC.cod_con AND H.mod_liq = DC.mod_liq
	   WHERE IDatributo = '29'
	   GROUP BY nom_con;

	   /*Información para Deducciones */

	   SELECT @PensionVoluntaria = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '57';

	   SELECT @RetencionFuente = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '58';

	   SELECT @AFC = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '59';

	   SELECT @Cooperativa = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '60';

	   SELECT @EmbargoFiscal = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '61';

	   SELECT @PlanesComplementarios = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '62';

	   SELECT @Educacion = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '63';

	   SELECT @ReintegroDeduccion = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '64';

	   SELECT @Deuda = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '65';

	   SELECT @DeduccionSalud = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '47';

	   SELECT @DeduccionPension = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '48';

	   SELECT @PorcentajeSeguridadPensional = ISNULL(MAX(can_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '49';

	   SELECT @DeduccionSeguridadPensional = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '49';

	   SELECT @PorcentajeSubsistencia = ISNULL(MAX(can_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '50';

	   SELECT @DeduccionSubsistencia = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '50';

	   SELECT @DeduccionSindicacato = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '51';

	   SELECT @ValorSancionPublica = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '52';

	   SELECT @ValorSancionPrivada = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '71';

	   SELECT @ValorPagadoTerceroDeduccion = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '54';

	   SELECT @ValorPagadoAnticipoDeduccion = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '55';

	   SELECT @ValorPagadoOtras = ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   WHERE IDatributo = '56';

	   DECLARE @Libranza TABLE(
		   DescripcionConcepto VARCHAR(200),
		   Deduccion           BIGINT DEFAULT 0
						 );

	   INSERT INTO @Libranza( DescripcionConcepto,
						 Deduccion
					    )
	   SELECT nom_con,
			ISNULL(SUM(val_liq), 0)
	   FROM #t_rhh_LiqHis AS H
	   INNER JOIN rhh_concep_nomelec AS C ON H.cod_con = C.cod_con AND H.mod_liq = C.mod_liq
	   INNER JOIN v_rhh_Concep AS DC ON H.cod_con = DC.cod_con AND H.mod_liq = DC.mod_liq
	   WHERE IDatributo = '53'
	   GROUP BY nom_con;

	   DECLARE @ReintegroValida BIGINT = 0;
	   DECLARE @ReintegroDeduccionValida BIGINT = 0;

	   IF @Reintegro < 0
	   BEGIN
		  SET @ReintegroValida = @Reintegro;
		  SET @Reintegro = 0;
	   END;

	   IF @ReintegroDeduccion < 0
	   BEGIN
		  SET @ReintegroDeduccionValida = @ReintegroDeduccion;
		  SET @ReintegroDeduccion = 0;
	   END;

	   IF @ReintegroValida < 0
	   BEGIN
		  SET @ReintegroDeduccion = @ReintegroDeduccion + (@ReintegroValida * -1);
	   END;

	   IF @ReintegroDeduccionValida < 0
	   BEGIN
		  SET @ReintegroDeduccion = @Reintegro + (@ReintegroDeduccionValida * -1);
	   END;

	   /* Devengos Negativos pasan al concepto Reintero - Deduccion */
	   IF @SueldoTrabajado < 0
	   BEGIN
		  SET @ReintegroDeduccion = @ReintegroDeduccion + (@SueldoTrabajado * -1);
		  SET @SueldoTrabajado = 0;
		  SET @DiasTrabajados = 0;
	   END;

	   IF @Dotacion < 0
	   BEGIN
		  SET @ReintegroDeduccion = @ReintegroDeduccion + (@Dotacion * -1);
		  SET @Dotacion = 0;
	   END;

	   IF @ApoyoASostenimiento < 0
	   BEGIN
		  SET @ReintegroDeduccion = @ReintegroDeduccion + (@ApoyoASostenimiento * -1);
		  SET @ApoyoASostenimiento = 0;
	   END;

	   IF @Teletrabajo < 0
	   BEGIN
		  SET @ReintegroDeduccion = @ReintegroDeduccion + (@Teletrabajo * -1);
		  SET @Teletrabajo = 0;
	   END;

	   IF @Retiro < 0
	   BEGIN
		  SET @ReintegroDeduccion = @ReintegroDeduccion + (@Retiro * -1);
		  SET @Retiro = 0;
	   END;

	   IF @Indemnizacion < 0
	   BEGIN
		  SET @ReintegroDeduccion = @ReintegroDeduccion + (@Indemnizacion * -1);
		  SET @Indemnizacion = 0;
	   END;

	   IF @AuxilioTransporte < 0
	   BEGIN
		  SET @ReintegroDeduccion = @ReintegroDeduccion + (@AuxilioTransporte * -1);
		  SET @AuxilioTransporte = 0;
	   END;

	   IF @ViaticoSalarial < 0
	   BEGIN
		  SET @ReintegroDeduccion = @ReintegroDeduccion + (@ViaticoSalarial * -1);
		  SET @ViaticoSalarial = 0;
	   END;

	   IF @ViaticoNoSalarial < 0
	   BEGIN
		  SET @ReintegroDeduccion = @ReintegroDeduccion + (@ViaticoNoSalarial * -1);
		  SET @ViaticoNoSalarial = 0;
	   END;

	   IF @PagoVC < 0
	   BEGIN
		  SET @ReintegroDeduccion = @ReintegroDeduccion + (@PagoVC * -1);
		  SET @PagoVC = 0;
		  SET @CantidadVC = 0;
	   END;

	   IF @PagoVCP < 0
	   BEGIN
		  SET @ReintegroDeduccion = @ReintegroDeduccion + (@PagoVCP * -1);
		  SET @PagoVCP = 0;
		  SET @CantidadVCP = 0;
	   END;

	   IF @PagoPrimas < 0
	   BEGIN
		  SET @ReintegroDeduccion = @ReintegroDeduccion + (@PagoPrimas * -1);
		  SET @PagoPrimas = 0;
		  SET @CantidadPrimas = 0;
	   END;

	   IF @PagoNoSalarial < 0
	   BEGIN
		  SET @ReintegroDeduccion = @ReintegroDeduccion + (@PagoNoSalarial * -1);
		  SET @PagoNoSalarial = 0;
	   END;

	   IF @PagoCesantias < 0
	   BEGIN
		  SET @ReintegroDeduccion = @ReintegroDeduccion + (@PagoCesantias * -1);
		  SET @PagoCesantias = 0;
	   END;

	   IF @PagoIntereses < 0
	   BEGIN
		  SET @ReintegroDeduccion = @ReintegroDeduccion + (@PagoIntereses * -1);
		  SET @PagoIntereses = 0;
	   END;

	   IF @PorcentajeCesantias < 0
	   BEGIN
		  SET @PorcentajeCesantias = 0;
	   END;

	   IF @BonificacionSalarial < 0
	   BEGIN
		  SET @ReintegroDeduccion = @ReintegroDeduccion + (@BonificacionSalarial * -1);
		  SET @BonificacionSalarial = 0;
	   END;

	   IF @BonificacionNoSalarial < 0
	   BEGIN
		  SET @ReintegroDeduccion = @ReintegroDeduccion + (@BonificacionNoSalarial * -1);
		  SET @BonificacionNoSalarial = 0;
	   END;

	   IF @AuxilioSalarial < 0
	   BEGIN
		  SET @ReintegroDeduccion = @ReintegroDeduccion + (@AuxilioSalarial * -1);
		  SET @AuxilioSalarial = 0;
	   END;

	   IF @AuxilioNoSalarial < 0
	   BEGIN
		  SET @ReintegroDeduccion = @ReintegroDeduccion + (@AuxilioNoSalarial * -1);
		  SET @AuxilioNoSalarial = 0;
	   END;

	   IF @CompensacionOrdinaria < 0
	   BEGIN
		  SET @ReintegroDeduccion = @ReintegroDeduccion + (@CompensacionOrdinaria * -1);
		  SET @CompensacionOrdinaria = 0;
	   END;

	   IF @CompensacionExtraordinaria < 0
	   BEGIN
		  SET @ReintegroDeduccion = @ReintegroDeduccion + (@CompensacionExtraordinaria * -1);
		  SET @CompensacionExtraordinaria = 0;
	   END;

	   IF @PagoSalarialBono < 0
	   BEGIN
		  SET @ReintegroDeduccion = @ReintegroDeduccion + (@PagoSalarialBono * -1);
		  SET @PagoSalarialBono = 0;
	   END;

	   IF @PagoNoSalarialBono < 0
	   BEGIN
		  SET @ReintegroDeduccion = @ReintegroDeduccion + (@PagoNoSalarialBono * -1);
		  SET @PagoNoSalarialBono = 0;
	   END;

	   IF @PagoAlimentacionSalarial < 0
	   BEGIN
		  SET @ReintegroDeduccion = @ReintegroDeduccion + (@PagoAlimentacionSalarial * -1);
		  SET @PagoAlimentacionSalarial = 0;
	   END;

	   IF @PagoAlimentacionNoSalarial < 0
	   BEGIN
		  SET @ReintegroDeduccion = @ReintegroDeduccion + (@PagoAlimentacionNoSalarial * -1);
		  SET @PagoAlimentacionNoSalarial = 0;
	   END;

	   IF @ValorPagadoComision < 0
	   BEGIN
		  SET @ReintegroDeduccion = @ReintegroDeduccion + (@ValorPagadoComision * -1);
		  SET @ValorPagadoComision = 0;
	   END;

	   IF @ValorPagadoTercero < 0
	   BEGIN
		  SET @ReintegroDeduccion = @ReintegroDeduccion + (@ValorPagadoTercero * -1);
		  SET @ValorPagadoTercero = 0;
	   END;

	   IF @ValorPagadoAnticipo < 0
	   BEGIN
		  SET @ReintegroDeduccion = @ReintegroDeduccion + (@ValorPagadoAnticipo * -1);
		  SET @ValorPagadoAnticipo = 0;
	   END;

	   /* Deducciones Negativas pasan al concepto Reintero - Devengo */
	   IF @PensionVoluntaria < 0
	   BEGIN
		  SET @Reintegro = @Reintegro + (@PensionVoluntaria * -1);
		  SET @PensionVoluntaria = 0;
	   END;

	   IF @RetencionFuente < 0
	   BEGIN
		  SET @Reintegro = @Reintegro + (@RetencionFuente * -1);
		  SET @RetencionFuente = 0;
	   END;

	   IF @AFC < 0
	   BEGIN
		  SET @Reintegro = @Reintegro + (@AFC * -1);
		  SET @AFC = 0;
	   END;

	   IF @Cooperativa < 0
	   BEGIN
		  SET @Reintegro = @Reintegro + (@Cooperativa * -1);
		  SET @Cooperativa = 0;
	   END;

	   IF @EmbargoFiscal < 0
	   BEGIN
		  SET @Reintegro = @Reintegro + (@EmbargoFiscal * -1);
		  SET @EmbargoFiscal = 0;
	   END;

	   IF @PlanesComplementarios < 0
	   BEGIN
		  SET @Reintegro = @Reintegro + (@PlanesComplementarios * -1);
		  SET @PlanesComplementarios = 0;
	   END;

	   IF @Educacion < 0
	   BEGIN
		  SET @Reintegro = @Reintegro + (@Educacion * -1);
		  SET @Educacion = 0;
	   END;

	   IF @Deuda < 0
	   BEGIN
		  SET @Reintegro = @Reintegro + (@Deuda * -1);
		  SET @Deuda = 0;
	   END;

	   IF @DeduccionSalud < 0
	   BEGIN
		  SET @Reintegro = @Reintegro + (@DeduccionSalud * -1);
		  SET @DeduccionSalud = 0;
		  SET @PorcentajeSalud = 0;
	   END;

	   IF @DeduccionPension < 0
	   BEGIN
		  SET @Reintegro = @Reintegro + (@DeduccionPension * -1);
		  SET @DeduccionPension = 0;
		  SET @PorcentajePension = 0;
	   END;

	   IF @DeduccionSeguridadPensional < 0
	   BEGIN
		  SET @Reintegro = @Reintegro + (@DeduccionSeguridadPensional * -1);
		  SET @DeduccionSeguridadPensional = 0;
		  SET @PorcentajeSeguridadPensional = 0;
	   END;

	   IF @DeduccionSubsistencia < 0
	   BEGIN
		  SET @Reintegro = @Reintegro + (@DeduccionSubsistencia * -1);
		  SET @DeduccionSubsistencia = 0;
		  SET @PorcentajeSubsistencia = 0;
	   END;

	   IF @DeduccionSindicacato < 0
	   BEGIN
		  SET @Reintegro = @Reintegro + (@DeduccionSindicacato * -1);
		  SET @DeduccionSindicacato = 0;
		  SET @PorcentajeSindicato = 0;
	   END;

	   IF @ValorSancionPublica < 0
	   BEGIN
		  SET @Reintegro = @Reintegro + (@ValorSancionPublica * -1);
		  SET @ValorSancionPublica = 0;
	   END;

	   IF @ValorSancionPrivada < 0
	   BEGIN
		  SET @Reintegro = @Reintegro + (@ValorSancionPrivada * -1);
		  SET @ValorSancionPrivada = 0;
	   END;

	   IF @ValorPagadoTerceroDeduccion < 0
	   BEGIN
		  SET @Reintegro = @Reintegro + (@ValorPagadoTerceroDeduccion * -1);
		  SET @ValorPagadoTerceroDeduccion = 0;
	   END;

	   IF @ValorPagadoAnticipoDeduccion < 0
	   BEGIN
		  SET @Reintegro = @Reintegro + (@ValorPagadoAnticipoDeduccion * -1);
		  SET @ValorPagadoAnticipoDeduccion = 0;
	   END;

	   IF @ValorPagadoOtras < 0
	   BEGIN
		  SET @Reintegro = @Reintegro + (@ValorPagadoOtras * -1);
		  SET @ValorPagadoOtras = 0;
	   END;

	   INSERT INTO @Devengados( CodEmp,
						   DiasTrabajados,
						   SueldoTrabajado,
						   Dotacion,
						   ApoyoASostenimiento,
						   Teletrabajo,
						   Retiro,
						   Indemnizacion,
						   Reintegro,
						   AuxilioTransporte,
						   ViaticoSalarial,
						   ViaticoNoSalarial,
						   CantidadVC,
						   PagoVC,
						   CantidadVCP,
						   PagoVCP,
						   CantidadPrimas,
						   PagoPrimas,
						   PagoNoSalarial, /**????*/
						   PagoCesantias,
						   Porcentaje,
						   PagoIntereses,
						   BonificacionSalarial,
						   BonificacionNoSalarial,
						   AuxilioSalarial,
						   AuxilioNoSalarial,
						   CompensacionOrdinaria,
						   CompensacionExtraordinaria,
						   PagoSalarialBono,
						   PagoNoSalarialBono,
						   PagoAlimentacionSalarial,
						   PagoAlimentacionNoSalarial,
						   ValorPagadoComision,
						   ValorPagadoTercero,
						   ValorPagadoAnticipo
						 )
	   VALUES
			(
			@cCodEmp, @DiasTrabajados, @SueldoTrabajado, @Dotacion, @ApoyoASostenimiento, @Teletrabajo, @Retiro, @Indemnizacion, @Reintegro,
			@AuxilioTransporte, @ViaticoSalarial, @ViaticoNoSalarial, @CantidadVC, @PagoVC, @CantidadVCP, @PagoVCP, @CantidadPrimas, @PagoPrimas,
			@PagoNoSalarial, @PagoCesantias, @PorcentajeCesantias, @PagoIntereses, @BonificacionSalarial, @BonificacionNoSalarial,
			@AuxilioSalarial, @AuxilioNoSalarial, @CompensacionOrdinaria, @CompensacionExtraordinaria, @PagoSalarialBono, @PagoNoSalarialBono,
			@PagoAlimentacionSalarial, @PagoAlimentacionNoSalarial, @ValorPagadoComision, @ValorPagadoTercero, @ValorPagadoAnticipo );

	   INSERT INTO @Deducciones( CodEmp,
						    PensionVoluntaria,
						    RetencionFuente,
						    AFC,
						    Cooperativa,
						    EmbargoFiscal,
						    PlanesComplementarios,
						    Educacion,
						    Reintegro,
						    Deuda,
						    PorcentajeSalud,
						    DeduccionSalud,
						    PorcentajePension,
						    DeduccionPension,
						    PorcentajeSeguridadPensional,
						    DeduccionSeguridadPensional,
						    PorcentajeSubsistencia,
						    DeduccionSubsistencia,
						    PorcentajeSindicato,
						    DeduccionSindicacato,
						    ValorSancionPublica,
						    ValorSancionPrivada,
						    ValorPagadoTercero,
						    ValorPagadoAnticipo,
						    ValorPagadoOtras
						  )
	   VALUES
			(
			@cCodEmp, @PensionVoluntaria, @RetencionFuente, @AFC, @Cooperativa, @EmbargoFiscal, @PlanesComplementarios, @Educacion,
			@ReintegroDeduccion, @Deuda, @PorcentajeSalud, @DeduccionSalud, @PorcentajePension, @DeduccionPension, @PorcentajeSeguridadPensional,
			@DeduccionSeguridadPensional, @PorcentajeSubsistencia, @DeduccionSubsistencia, @PorcentajeSindicato, @DeduccionSindicacato,
			@ValorSancionPublica, @ValorSancionPrivada, @ValorPagadoTerceroDeduccion, @ValorPagadoAnticipoDeduccion, @ValorPagadoOtras );

	   SELECT @TotalDevengados = SUM(SueldoTrabajado + Dotacion + ApoyoASostenimiento + Teletrabajo + Retiro + Indemnizacion + Reintegro +
	   AuxilioTransporte + ViaticoSalarial + ViaticoNoSalarial + PagoVC + PagoVCP + PagoPrimas + PagoNoSalarial + PagoCesantias + PagoIntereses +
	   BonificacionSalarial + BonificacionNoSalarial + AuxilioSalarial + AuxilioNoSalarial + CompensacionOrdinaria + CompensacionExtraordinaria +
	   PagoSalarialBono + PagoNoSalarialBono + PagoAlimentacionSalarial + PagoAlimentacionNoSalarial + ValorPagadoComision + ValorPagadoTercero +
	   ValorPagadoAnticipo)
	   FROM @Devengados;

	   SELECT @TotalIncapacidades = ISNULL(SUM(ISNULL(Pago, 0)), 0)
	   FROM @Incapacidades;

	   SELECT @TotalHorasExtras = ISNULL(SUM(ISNULL(Pago, 0)), 0)
	   FROM @HorasExtras;

	   SELECT @TotalOtrosConceptos = ISNULL(SUM(ISNULL(ConceptoSalarial, 0) + ISNULL(ConceptoNoSalarial, 0)), 0)
	   FROM @OtrosConceptos;

	   SET @TotalDevengados = @TotalDevengados + @TotalIncapacidades + @TotalOtrosConceptos + @TotalHorasExtras;

	   SELECT @TotalDeducciones = SUM(PensionVoluntaria + RetencionFuente + AFC + Cooperativa + EmbargoFiscal + PlanesComplementarios + Educacion +
	   Reintegro + Deuda + DeduccionSalud + DeduccionPension + DeduccionSeguridadPensional + DeduccionSubsistencia + DeduccionSindicacato +
	   ValorSancionPublica + ValorSancionPrivada + ValorPagadoTercero + ValorPagadoAnticipo + ValorPagadoOtras)
	   FROM @Deducciones;

	   SELECT @TotalLibranzas = ISNULL(SUM(ISNULL(Deduccion, 0)), 0)
	   FROM @Libranza;

	   SET @TotalDeducciones = @TotalDeducciones + @TotalLibranzas;

	   SET @TotalComprobante = @TotalDevengados - @TotalDeducciones;

	   /*Informacion XML*/
	   -- Cursor Cursor C_FE
	   IF @TipoComprobante = 2 OR @TipoComprobante = 3
	   BEGIN
		  DECLARE @NumDocRelacionado VARCHAR(40);
		  DECLARE @codCuneDocRelacionado VARCHAR(150);
		  DECLARE @FechaEmisionDocRelacionado DATE;

		  SELECT @NumDocRelacionado = NumEnvio,
			    @codCuneDocRelacionado = cod_cune,
			    @FechaEmisionDocRelacionado = FechaEmision
		  FROM rhh_AdminEnvioPagoElectronico
		  WHERE cod_operadorPE = 2
			   AND cod_emp = @cCodEmp
			   AND NumEnvio = @NumDoc
			   AND cod_cia = @cCodCia
			   AND Fecha = @fFecha;

		  IF @TipoComprobante = 2
		  BEGIN
			 SELECT '1' AS TipoNota;
			 SELECT 'ReemplazandoPredecesor' AS ReemplazandoPredecesor,
				   @NumDocRelacionado AS NumeroPred,
				   @codCuneDocRelacionado AS CUNEPred,
				   CONVERT(VARCHAR(10), @FechaEmisionDocRelacionado, 120) AS FechaGenPred;

		  END;

		  IF @TipoComprobante = 3
		  BEGIN
			 SELECT '2' AS TipoNota;
			 SELECT 'EliminandoPredecesor' AS EliminandoPredecesor,
				   @NumDocRelacionado AS NumeroPred,
				   @codCuneDocRelacionado AS CUNEPred,
				   CONVERT(VARCHAR(10), @FechaEmisionDocRelacionado, 120) AS FechaGenPred;
		  END;

	   END;

	   -- Cursor Cursor C_FE1
	   IF @TipoComprobante = 2
	   BEGIN
		  SELECT 'Novedad' AS Novedad,
			    'CUNENov' AS CUNENov,
			    'true' AS Value;
	   END;

	   --SET @fhoraEmision = CONVERT(VARCHAR(8), @fFechaE, 108);
	   -- Cursor Cursor C_FE2
	   IF @TipoComprobante = 1 OR @TipoComprobante = 2
	   BEGIN
		  SELECT 'Periodo' AS Periodo,
			    CONVERT(VARCHAR(10), FechaIngreso, 120) AS FechaIngreso,
			    CONVERT(VARCHAR(10), FechaRetiro, 120) AS FechaRetiro,
			    CONVERT(VARCHAR(10), @ffecInic, 120) AS FechaLiquidacionInicio,
			    CONVERT(VARCHAR(10), @ffecFin, 120) AS FechaLiquidacionFin,
			    RTRIM(CONVERT(VARCHAR(MAX), TiempoLaborado)) AS TiempoLaborado,
			    CONVERT(VARCHAR(10), @fFechaEmision, 120) AS FechaGen
		  FROM @rhh_emplea;
	   END;

	   -- Cursor Cursor C_FE3
	   SELECT 'NumeroSecuenciaXML' AS NumeroSecuenciaXML,
			CodigoTrabajador,
			@prefijo AS Prefijo,
			RTRIM(CONVERT(VARCHAR(MAX), @Consecutivo)) AS Consecutivo
	   FROM @rhh_emplea;

	   -- Cursor Cursor C_FE4
	   SELECT 'LugarGeneracionXML' AS LugarGeneracionXML,
			@PaisCabecera AS Pais,
			@DptoCabecera AS DepartamentoEstado,
			@CiudadCabecera AS MunicipioCiudad,
			'es' AS Idioma;

	   -- Cursor Cursor C_FE5
	   IF @TipoComprobante = 1 OR @TipoComprobante = 2
	   BEGIN
		  SELECT 'InformacionGeneral' AS InformacionGeneral,
			    '1.0.0' AS Version,
			    '2' AS Ambiente,
			    RTRIM(@fhoraEmision) AS FechaHoraGen,
			    CONVERT(CHAR(2), PeriodoNomina) AS PeriodoNomina,
			    'COP' AS TipoMoneda,
			    '' AS TRM,
			    '01' AS TipoXML
		  FROM @rhh_emplea;
	   END;

	   IF @TipoComprobante = 3
	   BEGIN
		  SELECT 'InformacionGeneral' AS InformacionGeneral,
			    RTRIM(@fhoraEmision) AS FechaHoraGen,
			    CONVERT(CHAR(2), PeriodoNomina) AS PeriodoNomina,
			    'COP' AS TipoMoneda,
			    '' AS TRM
		  FROM @rhh_emplea;
	   END;

	   -- Cursor Cursor C_FE6
	   IF @TipoComprobante = 1 OR @TipoComprobante = 2
	   BEGIN
		  IF @TotalComprobante < 0
		  BEGIN
			 SELECT nota AS Notas
			 FROM rhh_ComprobanteElectronicoNota
			 WHERE cod_emp_NE = @cCodEmp
				  AND ano_NE = DATEPART(YEAR, @fFecha)
				  AND periodo_NE = DATEPART(MONTH, @fFecha)
			 UNION ALL
			 SELECT 'La connotación del elemento ComprobanteTotal es de carácter negativo, Comprobante Total:' + RTRIM(CONVERT(CHAR(20),
			 @TotalComprobante));

			 SET @TotalComprobante = @TotalComprobante * -1;
		  END;
			 ELSE
		  BEGIN
			 SELECT nota AS Notas
			 FROM rhh_ComprobanteElectronicoNota
			 WHERE cod_emp_NE = @cCodEmp
				  AND ano_NE = DATEPART(YEAR, @fFecha)
				  AND periodo_NE = DATEPART(MONTH, @fFecha);
		  END;
	   END;

	   IF @TipoComprobante = 3
	   BEGIN
		  WITH Notas
			  AS (SELECT 'Eliminar' AS Notas)
			  SELECT Notas FROM Notas;
	   END;

	   -- Cursor Cursor C_FE7
	   IF @TipoComprobante = 1 OR @TipoComprobante = 2
	   BEGIN
		  SELECT 'Empleador' AS Empleador,
			    nom_cia AS RazonSocial,
			    '' AS PrimerApellido,
			    '' AS SegundoApellido,
			    '' AS PrimerNombre,
			    '' AS OtrosNombres,
			    nit_cia AS NIT,
			    dig_ver AS DV,
			    cod_iso AS Pais,
			    cod_dep AS DepartamentoEstado,
			    cod_ciu AS MunicipioCiudad,
			    dir_cia AS Direccion
		  FROM gen_compania AS C
		  INNER JOIN gen_paises AS P ON C.cod_pai = P.cod_pai
		  WHERE cod_cia = @cCodCia;
	   END;

	   DECLARE @IndNoProcesado BIT; /*Si el campo FechaProceso esta diligenciado es porque el registro ya se ha procesado anteriormente*/

	   SET @IndNoProcesado = 1;

	   IF( SELECT FechaProceso
		  FROM rhh_AdminEnvioPagoElectronico
		  WHERE cod_operadorPE = 2
			   AND cod_emp = @cCodEmp
			   AND cod_cia = @cCodCia
			   AND fecha = @fFecha
			   AND consecutivo = @Consecutivo ) IS NULL
	   BEGIN
		  SET @IndNoProcesado = 0;
	   END;

	   IF @TipoComprobante = 3
	   BEGIN
		  SELECT 'Empleador' AS Empleador,
			    nit_cia AS NIT
		  FROM gen_compania AS C
		  WHERE cod_cia = @cCodCia;

		  SELECT 'Totales' AS Totales,
			    CASE
				   WHEN @IndNoProcesado = 0 THEN @NumeroCabecera
				   ELSE @NumeroCabecera + '-1'
			    END AS CorrelationDocumentId;

		  UPDATE rhh_AdminEnvioPagoElectronico
		    SET NumEnvio = @NumeroCabecera,
			   FechaEmision = @fFechaEmision,
			   cune_Reemplazo = @codCuneDocRelacionado,
			   NumEnvio_Reemplazo = @NumDocRelacionado,
			   IndHab = @IndHab
		  WHERE cod_operadorPE = 2
			   AND cod_emp = @cCodEmp
			   AND cod_cia = @cCodCia
			   AND fecha = @fFecha
			   AND consecutivo = @Consecutivo;

		  --UPDATE rhh_AdminEnvioPagoElectronico
		  --  SET ind_anulado = 1
		  --WHERE cod_operadorPE = 2
		  --  AND cod_emp = @cCodEmp
		  --  AND cod_cia = @cCodCia
		  --  AND fecha = @fFecha
		  --  AND NumEnvio = @NumDoc;
		  RETURN;
	   END;

	   SELECT 'Trabajador' AS Trabajador,
			TipoTrabajador,
			SubTipoTrabajador,
			CASE
			    WHEN AltoRiesgoPension = 0 THEN 'false'
			    ELSE 'true'
			END AS AltoRiesgoPension,
			CONVERT(CHAR(2), TipoDocumento) AS TipoDocumento,
			CONVERT(VARCHAR(15), NumeroDocumento) AS NumeroDocumento,
			PrimerApellido,
			CASE
			    WHEN LEN(SegundoApellido) = 0 THEN '.'
			    WHEN SegundoApellido IS NULL THEN '.'
			    ELSE SegundoApellido
			END AS SegundoApellido,
			PrimerNombre,
			OtrosNombres,
			LugarTrabajoPais,
			LugarTrabajoDepartamento AS LugarTrabajoDepartamentoEstado,
			LugarTrabajoCiudad AS LugarTrabajoMunicipioCiudad,
			LugarTrabajoDireccion,
			CASE
			    WHEN SalarioIntegral = 0 THEN 'false'
			    ELSE 'true'
			END AS SalarioIntegral,
			RTRIM(CONVERT(CHAR(5), TipoContrato)) AS TipoContrato,
			RTRIM(CONVERT(CHAR(20), Sueldo)) AS Sueldo,
			CodigoTrabajador,
			CASE
			    WHEN @Inc_Email = 1 THEN Email
			    ELSE ''
			END AS CorreoElectronico
	   FROM @rhh_emplea;

	   -- Cursor Cursor C_FE9
	   SELECT 'Pago' AS Pago,
			Forma,
			Metodo,
			Banco,
			TipoCuenta,
			NumeroCuenta
	   FROM @rhh_emplea;

	   -- Cursor Cursor C_FE10
	   SELECT 'FechasPagos' AS FechasPagos,
			CONVERT(VARCHAR(10), Fecha, 120) AS FechaPago
	   FROM @FechasPagosNomina;

	   -- Cursor Cursor C_FE11
	   --SELECT 'Devengados' AS Devengados,
	   SELECT 'Basico' AS Basico,
			RTRIM(CONVERT(CHAR(2), DiasTrabajados)) AS DiasTrabajados,
			RTRIM(CONVERT(CHAR(15), SueldoTrabajado)) AS SueldoTrabajado
	   FROM @Devengados;

	   -- Cursor Cursor C_FE12
	   SELECT 'Transporte' AS Transporte,
			RTRIM(CONVERT(CHAR(15), AuxilioTransporte)) AS AuxilioTransporte,
			CASE
			    WHEN ViaticoSalarial <> 0 THEN RTRIM(CONVERT(CHAR(15), ViaticoSalarial))
			    ELSE NULL
			END AS ViaticoManutAlojS,
			CASE
			    WHEN ViaticoNoSalarial <> 0 THEN RTRIM(CONVERT(CHAR(15), ViaticoNoSalarial))
			    ELSE NULL
			END AS ViaticoManutAlojNS
	   --RTRIM(CONVERT(CHAR(12), ViaticoSalarial)) AS ViaticoManutAlojS,
	   --RTRIM(CONVERT(CHAR(12), ViaticoNoSalarial)) AS ViaticoManutAlojNS
	   FROM @Devengados
	   WHERE AuxilioTransporte > 0 OR ViaticoSalarial > 0 OR ViaticoNoSalarial > 0;

	   -- Cursor Cursor C_FE13
	   SELECT 'HEDs' AS HEDs,
			HoraInicio,
			HoraFin,
			RTRIM(CONVERT(CHAR(12), Cantidad)) AS Cantidad,
			RTRIM(CONVERT(CHAR(12), Porcentaje)) AS Porcentaje,
			RTRIM(CONVERT(CHAR(15), Pago)) AS Pago
	   FROM @HorasExtras
	   WHERE idpropiedad = '06';

	   SELECT @HED = pago,
			@Cantidad_HED = Cantidad
	   FROM @HorasExtras
	   WHERE idpropiedad = '06';

	   -- Cursor Cursor C_FE14
	   SELECT 'HENs' AS HENs,
			HoraInicio,
			HoraFin,
			RTRIM(CONVERT(CHAR(12), Cantidad)) AS Cantidad,
			RTRIM(CONVERT(CHAR(12), Porcentaje)) AS Porcentaje,
			RTRIM(CONVERT(CHAR(15), Pago)) AS Pago
	   FROM @HorasExtras
	   WHERE idpropiedad = '07';

	   SELECT @HEN = pago,
			@Cantidad_HEN = Cantidad
	   FROM @HorasExtras
	   WHERE idpropiedad = '07';

	   -- Cursor Cursor C_FE15
	   SELECT 'HRNs' AS HRNs,
			HoraInicio,
			HoraFin,
			RTRIM(CONVERT(CHAR(12), Cantidad)) AS Cantidad,
			RTRIM(CONVERT(CHAR(12), Porcentaje)) AS Porcentaje,
			RTRIM(CONVERT(CHAR(15), Pago)) AS Pago
	   FROM @HorasExtras
	   WHERE idpropiedad = '08';

	   SELECT @HRN = pago,
			@Cantidad_HRN = Cantidad
	   FROM @HorasExtras
	   WHERE idpropiedad = '08';

	   -- Cursor Cursor C_FE16
	   SELECT 'HEDDFs' AS HEDDFs,
			HoraInicio,
			HoraFin,
			RTRIM(CONVERT(CHAR(12), Cantidad)) AS Cantidad,
			RTRIM(CONVERT(CHAR(12), Porcentaje)) AS Porcentaje,
			RTRIM(CONVERT(CHAR(15), Pago)) AS Pago
	   FROM @HorasExtras
	   WHERE idpropiedad = '09';

	   SELECT @HEDDF = pago,
			@Cantidad_HEDDF = Cantidad
	   FROM @HorasExtras
	   WHERE idpropiedad = '09';

	   -- Cursor Cursor C_FE17
	   SELECT 'HRDDFs' AS HRDDFs,
			HoraInicio,
			HoraFin,
			RTRIM(CONVERT(CHAR(12), Cantidad)) AS Cantidad,
			RTRIM(CONVERT(CHAR(12), Porcentaje)) AS Porcentaje,
			RTRIM(CONVERT(CHAR(15), Pago)) AS Pago
	   FROM @HorasExtras
	   WHERE idpropiedad = '10';

	   SELECT @HRDDF = pago,
			@Cantidad_HRDDF = Cantidad
	   FROM @HorasExtras
	   WHERE idpropiedad = '10';

	   -- Cursor Cursor C_FE18
	   SELECT 'HENDFs' AS HENDFs,
			HoraInicio,
			HoraFin,
			RTRIM(CONVERT(CHAR(12), Cantidad)) AS Cantidad,
			RTRIM(CONVERT(CHAR(12), Porcentaje)) AS Porcentaje,
			RTRIM(CONVERT(CHAR(15), Pago)) AS Pago
	   FROM @HorasExtras
	   WHERE idpropiedad = '11';

	   SELECT @HENDF = pago,
			@Cantidad_HENDF = Cantidad
	   FROM @HorasExtras
	   WHERE idpropiedad = '11';

	   -- Cursor Cursor C_FE19
	   SELECT 'HRNDFs' AS HRNDFs,
			HoraInicio,
			HoraFin,
			RTRIM(CONVERT(CHAR(12), Cantidad)) AS Cantidad,
			RTRIM(CONVERT(CHAR(12), Porcentaje)) AS Porcentaje,
			RTRIM(CONVERT(CHAR(15), Pago)) AS Pago
	   FROM @HorasExtras
	   WHERE idpropiedad = '12';

	   SELECT @HRNDF = pago,
			@Cantidad_HRNDF = Cantidad
	   FROM @HorasExtras
	   WHERE idpropiedad = '12';

	   -- Cursor Cursor C_FE20
	   SELECT 'VacacionesComunes' AS VacacionesComunes,
			'' AS FechaInicio,
			'' AS FechaFin,
			RTRIM(CONVERT(CHAR(5), CantidadVC)) AS Cantidad,
			RTRIM(CONVERT(CHAR(15), PagoVC)) AS Pago
	   FROM @Devengados
	   WHERE PagoVC > 0 OR CantidadVC > 0;

	   -- Cursor Cursor C_FE21
	   SELECT 'VacacionesCompensadas' AS VacacionesCompensadas,
			RTRIM(CONVERT(CHAR(5), CantidadVCP)) AS Cantidad,
			RTRIM(CONVERT(CHAR(15), PagoVCP)) AS Pago
	   FROM @Devengados
	   WHERE PagoVCP > 0 OR CantidadVCP > 0;

	   -- Cursor Cursor C_FE22
	   SELECT 'Primas' AS Primas,
			RTRIM(CONVERT(CHAR(5), CantidadPrimas)) AS Cantidad,
			RTRIM(CONVERT(CHAR(15), PagoPrimas)) AS Pago,
			RTRIM(CONVERT(CHAR(15), PagoNoSalarial)) AS PagoNS
	   FROM @Devengados
	   WHERE PagoPrimas > 0 OR PagoNoSalarial > 0;

	   -- Cursor Cursor C_FE23
	   SELECT 'Cesantias' AS Cesantias,
			RTRIM(CONVERT(CHAR(15), PagoCesantias)) AS Pago,
			RTRIM(CONVERT(CHAR(5), Porcentaje)) AS Porcentaje,
			RTRIM(CONVERT(CHAR(15), PagoIntereses)) AS PagoIntereses
	   FROM @Devengados
	   WHERE PagoCesantias > 0 OR PagoIntereses > 0;

	   -- Cursor Cursor C_FE24
	   SELECT 'Incapacidades' AS Incapacidades,
			FechaInicio,
			FechaFin,
			RTRIM(CONVERT(CHAR(5), SUM(Cantidad))) AS Cantidad,
			RTRIM(CONVERT(CHAR(5), Tipo)) AS Tipo,
			RTRIM(CONVERT(CHAR(15), SUM(Pago))) AS Pago
	   FROM @Incapacidades
	   WHERE Tipo < 10
	   GROUP BY FechaInicio,
			  FechaFin,
			  Tipo;

	   -- Cursor Cursor C_FE25
	   SELECT 'LicenciaMP' AS LicenciaMP,
			FechaInicio,
			FechaFin,
			RTRIM(CONVERT(CHAR(5), Cantidad)) AS Cantidad,
			RTRIM(CONVERT(CHAR(15), Pago)) AS Pago
	   FROM @Incapacidades
	   WHERE Tipo = 10 AND Pago > 0;

	   -- Cursor Cursor C_FE26
	   SELECT 'LicenciaR' AS LicenciaR,
			FechaInicio,
			FechaFin,
			RTRIM(CONVERT(CHAR(5), Cantidad)) AS Cantidad,
			RTRIM(CONVERT(CHAR(15), Pago)) AS Pago
	   FROM @Incapacidades
	   WHERE Tipo = 11 AND Pago > 0;

	   -- Cursor Cursor C_FE27
	   SELECT 'LicenciaNR' AS LicenciaNR,
			FechaInicio,
			FechaFin,
			RTRIM(CONVERT(CHAR(5), Cantidad)) AS Cantidad
	   FROM @Incapacidades
	   WHERE Tipo = 12 AND Cantidad > 0;

	   -- Cursor Cursor C_FE28
	   SELECT 'Bonificaciones' AS Bonificaciones,
			CASE
			    WHEN BonificacionSalarial <> 0 THEN RTRIM(CONVERT(CHAR(15), BonificacionSalarial))
			    ELSE NULL
			END AS BonificacionS,
			CASE
			    WHEN BonificacionNoSalarial <> 0 THEN RTRIM(CONVERT(CHAR(15), BonificacionNoSalarial))
			    ELSE NULL
			END AS BonificacionNS
	   FROM @Devengados
	   WHERE BonificacionSalarial > 0 OR BonificacionNoSalarial > 0;

	   -- Cursor Cursor C_FE29
	   SELECT 'Auxilio' AS Auxilio,
			CASE
			    WHEN AuxilioSalarial <> 0 THEN RTRIM(CONVERT(CHAR(15), AuxilioSalarial))
			    ELSE NULL
			END AS AuxilioS,
			CASE
			    WHEN AuxilioNoSalarial <> 0 THEN RTRIM(CONVERT(CHAR(15), AuxilioNoSalarial))
			    ELSE NULL
			END AS AuxilioNS
	   FROM @Devengados
	   WHERE AuxilioSalarial > 0 OR AuxilioNoSalarial > 0;

	   -- Cursor Cursor C_FE30
	   WITH HuelgasLegales
		   AS (SELECT '' AS HuelgasLegales,
				    '' AS FechaInicio,
				    '' AS FechaFin,
				    '' AS Cantidad)
		   SELECT HuelgasLegales,
				FechaInicio,
				FechaFin,
				Cantidad
		   FROM HuelgasLegales
		   WHERE HuelgasLegales = 1; /*Retornar consulta vacia*/

	   -- Cursor Cursor C_FE31
	   SELECT 'OtrosConceptos' AS OtrosConceptos,
			DescripcionConcepto,
			RTRIM(CONVERT(CHAR(15), ConceptoSalarial)) AS ConceptoS,
			RTRIM(CONVERT(CHAR(15), ConceptoNoSalarial)) AS ConceptoNS
	   FROM @OtrosConceptos
	   WHERE ConceptoSalarial > 0 OR ConceptoNoSalarial > 0;

	   -- Cursor Cursor C_FE32
	   SELECT 'Compensaciones' AS Compensaciones,
			RTRIM(CONVERT(CHAR(15), CompensacionOrdinaria)) AS CompensacionO,
			RTRIM(CONVERT(CHAR(15), CompensacionExtraordinaria)) AS CompensacionE
	   FROM @Devengados
	   WHERE CompensacionOrdinaria > 0 OR CompensacionExtraordinaria > 0;

	   -- Cursor Cursor C_FE33
	   SELECT 'BonoEPCTVs' AS BonoEPCTVs,
			RTRIM(CONVERT(CHAR(15), PagoSalarialBono)) AS PagoS,
			RTRIM(CONVERT(CHAR(15), PagoNoSalarialBono)) AS PagoNS,
			RTRIM(CONVERT(CHAR(15), PagoAlimentacionSalarial)) AS PagoAlimentacionS,
			RTRIM(CONVERT(CHAR(15), PagoAlimentacionNoSalarial)) AS PagoAlimentacionNS
	   FROM @Devengados
	   WHERE PagoSalarialBono > 0
		    OR PagoNoSalarialBono > 0
		    OR PagoAlimentacionSalarial > 0
		    OR PagoAlimentacionNoSalarial > 0;

	   -- Cursor Cursor C_FE34
	   SELECT 'Comisiones' AS Comisiones,
			RTRIM(CONVERT(CHAR(15), ValorPagadoComision)) AS Comision
	   FROM @Devengados
	   WHERE ValorPagadoComision > 0;

	   -- Cursor Cursor C_FE35
	   SELECT 'DevPagoTerceros' AS DevPagoTerceros,
			RTRIM(CONVERT(CHAR(15), ValorPagadoTercero)) AS PagoTercero
	   FROM @Devengados
	   WHERE ValorPagadoTercero > 0;

	   -- Cursor Cursor C_FE36    
	   SELECT 'DevAnticipos' AS DevAnticipos,
			RTRIM(CONVERT(CHAR(15), ValorPagadoAnticipo)) AS Anticipo
	   FROM @Devengados
	   WHERE ValorPagadoAnticipo > 0;

	   -- Cursor Cursor C_FE37  
	   SELECT 'Devengados' AS Devengados,
			RTRIM(CONVERT(CHAR(15), Dotacion)) AS Dotacion,
			RTRIM(CONVERT(CHAR(15), ApoyoASostenimiento)) AS ApoyoSost,
			RTRIM(CONVERT(CHAR(15), Teletrabajo)) AS Teletrabajo,
			RTRIM(CONVERT(CHAR(15), Retiro)) AS BonifRetiro,
			RTRIM(CONVERT(CHAR(15), Indemnizacion)) AS Indemnizacion,
			RTRIM(CONVERT(CHAR(15), Reintegro)) AS Reintegro
	   FROM @Devengados;

	   /*Deducciones*/
	   --SELECT 'Deducciones' AS Deducciones,
	   -- Cursor Cursor C_FE38
	   SELECT 'Salud' AS Salud,
			RTRIM(CONVERT(CHAR(5), PorcentajeSalud)) AS Porcentaje,
			RTRIM(CONVERT(CHAR(15), DeduccionSalud)) AS Deduccion
	   FROM @Deducciones;

	   -- Cursor Cursor C_FE39
	   SELECT 'FondoPension' AS FondoPension,
			RTRIM(CONVERT(CHAR(5), PorcentajePension)) AS Porcentaje,
			RTRIM(CONVERT(CHAR(15), DeduccionPension)) AS Deduccion
	   FROM @Deducciones;

	   -- Cursor Cursor C_FE40
	   SELECT 'FondoSP' AS FondoSP,
			RTRIM(CONVERT(CHAR(5), PorcentajeSeguridadPensional)) AS Porcentaje,
			RTRIM(CONVERT(CHAR(15), DeduccionSeguridadPensional)) AS Deduccion,
			RTRIM(CONVERT(CHAR(5), PorcentajeSubsistencia)) AS PorcentajeSub,
			RTRIM(CONVERT(CHAR(15), DeduccionSubsistencia)) AS DeduccionSub
	   FROM @Deducciones
	   WHERE PorcentajeSeguridadPensional > 0
		    OR DeduccionSeguridadPensional > 0
		    OR PorcentajeSubsistencia > 0
		    OR DeduccionSubsistencia > 0;

	   -- Cursor Cursor C_FE41
	   SELECT 'Sindicatos' AS Sindicatos,
			RTRIM(CONVERT(CHAR(5), PorcentajeSindicato)) AS Porcentaje,
			RTRIM(CONVERT(CHAR(15), DeduccionSindicacato)) AS Deduccion
	   FROM @Deducciones
	   WHERE PorcentajeSindicato > 0 OR DeduccionSindicacato > 0;

	   -- Cursor Cursor C_FE42
	   SELECT 'Sanciones' AS Sanciones,
			RTRIM(CONVERT(CHAR(15), ValorSancionPublica)) AS SancionPublic,
			RTRIM(CONVERT(CHAR(15), ValorSancionPrivada)) AS SancionPriv
	   FROM @Deducciones
	   WHERE ValorSancionPublica > 0 OR ValorSancionPrivada > 0;

	   -- Cursor Cursor C_FE43
	   SELECT 'Libranzas' AS Libranzas,
			DescripcionConcepto AS Descripcion,
			RTRIM(CONVERT(CHAR(15), Deduccion)) AS Deduccion
	   FROM @Libranza
	   WHERE Deduccion > 0;

	   -- Cursor Cursor C_FE44
	   SELECT 'DedPagoTerceros' AS DedPagoTerceros,
			RTRIM(CONVERT(CHAR(15), ValorPagadoTercero)) AS PagoTercero
	   FROM @Deducciones
	   WHERE ValorPagadoTercero > 0;

	   -- Cursor Cursor C_FE45
	   SELECT 'DedAnticipos' AS DedAnticipos,
			RTRIM(CONVERT(CHAR(15), ValorPagadoAnticipo)) AS Anticipo
	   FROM @Deducciones
	   WHERE ValorPagadoAnticipo > 0;

	   -- Cursor Cursor C_FE46
	   SELECT 'OtrasDeducciones' AS OtrasDeducciones,
			RTRIM(CONVERT(CHAR(15), ValorPagadoOtras)) AS OtraDeduccion
	   FROM @Deducciones
	   WHERE ValorPagadoOtras > 0;

	   -- Cursor C_FE47
	   SELECT 'Deducciones' AS Deducciones,
			RTRIM(CONVERT(CHAR(15), PensionVoluntaria)) AS PensionVoluntaria,
			RTRIM(CONVERT(CHAR(15), RetencionFuente)) AS RetencionFuente,
			RTRIM(CONVERT(CHAR(15), AFC)) AS AFC,
			RTRIM(CONVERT(CHAR(15), Cooperativa)) AS Cooperativa,
			RTRIM(CONVERT(CHAR(15), EmbargoFiscal)) AS EmbargoFiscal,
			RTRIM(CONVERT(CHAR(15), PlanesComplementarios)) AS PlanComplementarios,
			RTRIM(CONVERT(CHAR(15), Educacion)) AS Educacion,
			RTRIM(CONVERT(CHAR(15), Reintegro)) AS Reintegro,
			RTRIM(CONVERT(CHAR(15), Deuda)) AS Deuda
	   FROM @Deducciones;

	   -- Cursor C_FE48
	   SELECT 'Totales;' AS Totales,
			0 AS Redondeo,
			RTRIM(CONVERT(CHAR(15), @TotalDevengados)) AS DevengadosTotal,
			RTRIM(CONVERT(CHAR(15), @TotalDeducciones)) AS DeduccionesTotal,
			RTRIM(CONVERT(CHAR(15), @TotalComprobante)) AS ComprobanteTotal,
			CASE
			    WHEN @IndNoProcesado = 0 THEN @NumeroCabecera
			    ELSE @NumeroCabecera + '-1'
			END AS CorrelationDocumentId;

	   UPDATE rhh_AdminEnvioPagoElectronico
		SET NumEnvio = @NumeroCabecera,
		    FechaEmision = @fFechaEmision,
		    IndHab = @IndHab
	   WHERE cod_operadorPE = 2
		    AND cod_emp = @cCodEmp
		    AND cod_cia = @cCodCia
		    AND fecha = @fFecha
		    AND consecutivo = @Consecutivo;

	   DELETE rhh_ComprobanteElectronico
	   WHERE Consecutivo = @Consecutivo AND cod_emp = @cCodEmp;

	   INSERT INTO rhh_ComprobanteElectronico( Consecutivo,
									   NumEnvio,
									   cod_emp,
									   DiasTrabajados,
									   SueldoTrabajado,
									   Dotacion,
									   ApoyoSostenimiento,
									   Teletrabajo,
									   Retiro,
									   Indemnizacion,
									   ReintegroDev,
									   AuxilioTransporte,
									   ViaticoSalarial,
									   ViaticoNoSalarial,
									   CantidadVC,
									   PagoVC,
									   CantidadVCP,
									   PagoVCP,
									   CantidadPrimas,
									   PagoPrimas,
									   PagoNoSalarial,
									   PagoCesantias,
									   Porcentaje,
									   PagoIntereses,
									   BonificacionSalarial,
									   BonificacionNoSalarial,
									   AuxilioSalarial,
									   AuxilioNoSalarial,
									   CompensacionOrdinaria,
									   CompensacionExtra,
									   PagoSalarialBono,
									   PagoNoSalarialBono,
									   PagoAlimentacionSalarial,
									   PagoAlimentacionNoSal,
									   ValorPagadoComision,
									   ValorPagadoTerceroDev,
									   ValorPagadoAnticipoDev,
									   TotalIncapacidades,
									   TotalOtrosConceptos,
									   PensionVoluntaria,
									   RetencionFuente,
									   AFC,
									   Cooperativa,
									   EmbargoFiscal,
									   PlanesComplementarios,
									   Educacion,
									   ReintegroDed,
									   Deuda,
									   PorcentajeSalud,
									   DeduccionSalud,
									   PorcentajePension,
									   DeduccionPension,
									   PorcentajeSegPensional,
									   DeduccionSegPensional,
									   PorcentajeSubsistencia,
									   DeduccionSubsistencia,
									   PorcentajeSindicato,
									   DeduccionSindicato,
									   ValorSancionPublica,
									   ValorSancionPrivada,
									   ValorPagadoTerceroDed,
									   ValorPagadoAnticipoDed,
									   ValorPagadoOtras,
									   HorasExtras,
									   Libranzas,
									   cod_cia,
									   fecha,
									   HED,
									   Cantidad_HED,
									   HEN,
									   Cantidad_HEN,
									   HRN,
									   Cantidad_HRN,
									   HEDDF,
									   Cantidad_HEDDF,
									   HRDDF,
									   Cantidad_HRDDF,
									   HENDF,
									   Cantidad_HENDF,
									   HRNDF,
									   Cantidad_HRNDF,
									   Devengados,
									   Deducciones,
									   TotalComprobante
									 )
	   SELECT @Consecutivo,
			@NumeroCabecera,
			@cCodEmp,
			DiasTrabajados,
			SueldoTrabajado,
			Dotacion,
			ApoyoASostenimiento,
			Teletrabajo,
			Retiro,
			Indemnizacion,
			Dev.Reintegro,
			AuxilioTransporte,
			ViaticoSalarial,
			ViaticoNoSalarial,
			CantidadVC,
			PagoVC,
			CantidadVCP,
			PagoVCP,
			CantidadPrimas,
			PagoPrimas,
			PagoNoSalarial,
			PagoCesantias,
			Porcentaje,
			PagoIntereses,
			BonificacionSalarial,
			BonificacionNoSalarial,
			AuxilioSalarial,
			AuxilioNoSalarial,
			CompensacionOrdinaria,
			CompensacionExtraordinaria,
			PagoSalarialBono,
			PagoNoSalarialBono,
			PagoAlimentacionSalarial,
			PagoAlimentacionNoSalarial,
			ValorPagadoComision,
			Dev.ValorPagadoTercero,
			Dev.ValorPagadoAnticipo,
			@TotalIncapacidades,
			@TotalOtrosConceptos,
			PensionVoluntaria,
			RetencionFuente,
			AFC,
			Cooperativa,
			EmbargoFiscal,
			PlanesComplementarios,
			Educacion,
			Ded.Reintegro,
			Deuda,
			PorcentajeSalud,
			DeduccionSalud,
			PorcentajePension,
			DeduccionPension,
			PorcentajeSeguridadPensional,
			DeduccionSeguridadPensional,
			PorcentajeSubsistencia,
			DeduccionSubsistencia,
			PorcentajeSindicato,
			DeduccionSindicacato,
			ValorSancionPublica,
			ValorSancionPrivada,
			Ded.ValorPagadoTercero,
			Ded.ValorPagadoAnticipo,
			Ded.ValorPagadoOtras,
			@TotalHorasExtras,
			@TotalLibranzas,
			@cCodCia,
			@fFecha,
			@HED,
			@Cantidad_HED,
			@HEN,
			@Cantidad_HEN,
			@HRN,
			@Cantidad_HRN,
			@HEDDF,
			@Cantidad_HEDDF,
			@HRDDF,
			@Cantidad_HRDDF,
			@HENDF,
			@Cantidad_HENDF,
			@HRNDF,
			@Cantidad_HRNDF,
			@TotalDevengados,
			@TotalDeducciones,
			@TotalComprobante
	   FROM @Devengados AS Dev
	   INNER JOIN @Deducciones AS Ded ON Dev.CodEmp = Ded.CodEmp;

	   IF @TipoComprobante = 2
	   BEGIN
		  UPDATE rhh_AdminEnvioPagoElectronico
		    SET cune_Reemplazo = @codCuneDocRelacionado,
			   NumEnvio_Reemplazo = @NumDocRelacionado
		  WHERE cod_operadorPE = 2
			   AND cod_emp = @cCodEmp
			   AND cod_cia = @cCodCia
			   AND fecha = @fFecha
			   AND NumEnvio = @NumeroCabecera;

		  --UPDATE rhh_AdminEnvioPagoElectronico
		  --  SET ind_anulado = 1
		  --WHERE cod_operadorPE = 2
		  --  AND cod_emp = @cCodEmp
		  --  AND cod_cia = @cCodCia
		  --  AND fecha = @fFecha
		  --  AND NumEnvio = @NumDoc;
	   END;
    END TRY
    BEGIN CATCH
	   SELECT @ErrorMessage = ERROR_MESSAGE(),
			@ErrorSeverity = ERROR_SEVERITY(),
			@ErrorState = ERROR_STATE();
	   -- Uso de Raiserror para la descripción del error presentado en este bloque 
	   RAISERROR(@ErrorMessage, -- Texto de Mensaje
	   @ErrorSeverity, -- Severidad
	   @ErrorState -- Estado
	   );
	   SELECT 'Se presento Error en la selección de la información';
    END CATCH;

END;
```
