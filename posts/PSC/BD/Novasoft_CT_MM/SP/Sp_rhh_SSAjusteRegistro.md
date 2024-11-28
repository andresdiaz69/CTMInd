# Stored Procedure: Sp_rhh_SSAjusteRegistro

## Usa los objetos:
- [[fn_rhh_SS_25SMLV]]
- [[fn_rhh_SS_Cotizacion]]
- [[fn_rhh_ss_fsp]]
- [[fn_rhh_SS_Redondeo]]
- [[fn_rhh_SS_SMLV]]

```sql
CREATE PROCEDURE [dbo].[Sp_rhh_SSAjusteRegistro]
	@ValHissIBC              MONEY       = 24591,
	@PorPatSal               FLOAT       = 8.5,
	@PorEmpSal               FLOAT       = 4,
	@SalMinNor               MONEY       = 737717,
	@DiaHissIBC              MONEY       = 1,
	@IndProp25SMLV           BIT         = 0,
	@VG47                    INT         = 0,
	@VG51                    INT         = 0,
	@Ibc_min                 INT         = 2,
	@Ibc_por                 FLOAT       = 0,
	@ValHissApoEmpSal        MONEY       = 984,
	@ValHissApoPatSal        MONEY       = 2090,
	@TipRegAjuste            VARCHAR(2)  = 'AI',
	@Ind_red                 BIT         = 1,
	@IndAjusteMinimo         MONEY       = 0,
	@ValAjuHissIBLSal        MONEY       = 0,
	@ValAjuHissApoPatSal     MONEY       = 0,
	@ValAjuHissApoEmpSal     MONEY       = 0,
	@Res2388                 BIT         = 1,
	@cer_nro                 VARCHAR(20) = 'NOVA-67',
	@Apo_pen                 BIT         = 1,
	@PorPatPen               FLOAT       = 12,
	@PorEmpPen               FLOAT       = 4,
	@ValHissApoEmpPen        MONEY       = 984,
	@ValHissApoPatPen        MONEY       = 2951,
	@Vg48                    INT         = 1,
	@VG34                    INT         = 1,
	@ValHissApoFSP           MONEY       = 0,
	@ValHissApoFSubsistencia MONEY       = 0,
	@Apo_rie                 INT         = 0,
	@ValHissApoPatRie        MONEY       = 0,
	@Apo_Parafiscales        MONEY       = 0,
	@VG155                   MONEY       = 0,
	@SalMinNorParaf          MONEY       = 1000,
	@PorPatCCF               FLOAT       = 0,
	@VG52                    BIT         = 1,
	@ValHissApoPatCCF        MONEY       = 0,
	@ValHissApoPatSEN        MONEY       = 0,
	@ValHissApoPatEIT        MONEY       = 0,
	@ValHissApoPatESAP       MONEY       = 0,
	@PorPatICBF              FLOAT       = 2,
	@PorPatSENA              FLOAT       = 3,
	@PorPatEIT               FLOAT       = 1,
	@PorPatESAP              FLOAT       = 1,
	@ValHissApoPatICBF       MONEY       = 0,
	@ValIBCTotCCF            MONEY       = 0,
	@ValIBCTotSENA           MONEY       = 0,
	@ValIBCTotICBF           MONEY       = 0,
	@ValApoEmpSal            MONEY OUTPUT,
	@ValApoPatSal            MONEY OUTPUT,
	@ValApoEmpPen            MONEY OUTPUT,
	@ValApoPatPen            MONEY OUTPUT,
	@ValApoPatRie            MONEY OUTPUT,
	@ValAjuIBLPatSal         MONEY OUTPUT,
	@ValAjuIBLPatPen         MONEY OUTPUT,
	@ValAjuIBLPatRie         MONEY OUTPUT,
	@ValAjuIBLPatCCF         MONEY OUTPUT,
	@ValAjuIBLPatSena        MONEY OUTPUT,
	@ValAjuIBLPatIcbf        MONEY OUTPUT,
	@ValApoPatCCF            MONEY OUTPUT,
	@ValApoPatSENA           MONEY OUTPUT,
	@ValApoPatICBF           MONEY OUTPUT,
	@ValApoPatEIT            MONEY OUTPUT,
	@ValApoPatESAP           MONEY OUTPUT,
	@RedLinea                BIT,
	@PorPatRie               FLOAT,
	@ValFSP                  MONEY OUTPUT,
	@ValFSubsistencia        MONEY OUTPUT,
	@SalMin                  MONEY,
	@ValAjuIblSalud          MONEY       = 0
--WITH ENCRYPTION
AS
BEGIN
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

    DECLARE @ValAjuIBLPat       MONEY = 0,
		  @ValAjuIBLEmp       MONEY = 0,
		  @ValAjuApoRedSal    MONEY = 0,
		  @ValAjuIBLPatSalLNR MONEY = 0,
		  @Ind_apsalPat_Lnr   MONEY = 0,
		  @Ind_ApsalEmp_Lnr   MONEY = 0,
		  @DiaHissLNR         MONEY = 0,
		  @ValAjuApoPatSalLNR MONEY = 0,
		  @ValAjuApoEmpSalLNR MONEY = 0,
		  @IBLTotalSalud      MONEY = 0,
		  @PorTotalSalud      FLOAT = 0,
		  @ValAjuIBLEmpPen    MONEY = 0,
		  @ValAjuIBLEmpSal    MONEY = 0,
		  @ValAjuApoRedPen    MONEY = 0,
		  @ValAjuApoFSPLNR    MONEY = 0,
		  @ValAjuApoFubsisLNR MONEY = 0,
		  @ValAjuApoRedCCF    MONEY = 0,
		  @ValAjuApoRedSENA   MONEY = 0,
		  @ValAjuApoRedEIT    MONEY = 0,
		  @ValAjuApoRedICBF   MONEY = 0,
		  @ValAjuApoRedESAP   MONEY = 0;

    SELECT @ValApoEmpSal = 0,
		 @ValApoPatSal = 0,
		 @ValApoEmpPen = 0,
		 @ValApoPatPen = 0,
		 @ValApoPatRie = 0,
		 @ValAjuIBLPatSal = 0,
		 @ValAjuIBLPatPen = 0,
		 @ValAjuIBLPatRie = 0,
		 @ValAjuIBLPatCCF = 0,
		 @ValAjuIBLPatSena = 0,
		 @ValAjuIBLPatIcbf = 0,
		 @ValApoPatCCF = 0,
		 @ValApoPatSENA = 0,
		 @ValApoPatICBF = 0;

    IF @DiaHissIBC <> 0
    BEGIN

	   /** Se realiza validaciones para salario mínimo**/
	   SELECT @ValAjuIBLPat = AjusteIBLPat,
			@ValAjuIBLEmp = AjusteIBLEmp,
			@IndAjusteMinimo = Testeo
	   FROM dbo.fn_rhh_SS_SMLV( @ValHissIBC, @DiaHissIBC, @Salmin, @ibc_min, @Ibc_por, 0, 0, 0, 0, @Res2388 );

    END;

    IF @ValAjuIBLPat + @ValAjuIBLEmp = 0
    BEGIN
	   /** Validación tope 25 smlv**/
	   SELECT @ValAjuIBLPat = AjusteIBLPat,
			@ValAjuIBLEmp = AjusteIBLEmp
	   FROM dbo.fn_rhh_SS_25SMLV( @ValHissIBC, @DiaHissIBC, @SalminNor, @IndProp25SMLV, @VG51, @VG47, 0, 0, @Res2388 );
    END;

    IF @ValAjuIBLPat + @ValAjuIBLEmp = 0 AND @IndAjusteMinimo = 0
    BEGIN
	   SELECT @ValAjuIBLPat = AjusteIBLPat
	   FROM dbo.fn_rhh_SS_Redondeo( @ValHissIBC, @DiaHissIBC, @PorPatSal, @PorEmpSal, @ibc_min, 0, @Res2388 );
    END;

    IF @IndAjusteMinimo = 1
    BEGIN

	   IF @ibc_min = 1
	   BEGIN
		  SET @ValHissIBC = @ValHissIBC - @ValAjuIblSalud;
		  SET @ValAjuHissIBLSal = @ValAjuIblSalud;
	   END;
		  ELSE
	   BEGIN
		  SET @ValAjuIblSalud = 0;
	   END;
    END;

    SET @IBLTotalSalud = @ValHissIBC + CASE @Ibc_min
								   WHEN 3 THEN 0
								   ELSE @ValAjuIBLEmp
							    END + @ValAjuIBLPat;

    SET @ValAjuIBLPatSal = CASE @Ibc_min
						 WHEN 2 THEN @ValAjuIBLEmp
						 ELSE @ValAjuIBLPat
					  END + CASE @Ibc_min
							  WHEN 4 THEN @ValAjuIBLEmpSal
							  ELSE 0
						   END;
    IF(@PorEmpSal + @PorPatSal <> 0)
    BEGIN
	   SELECT @ValApoEmpSal = ValApoEmp,
			@ValApoPatSal = ValApoPat,
			@ValAjuApoRedSal = ValAjuApo
	   FROM dbo.fn_rhh_SS_Cotizacion( @ValHissIBC, @ValAjuIBLPat, @ValAjuIBLEmp, @ibc_min, @PorPatSal, @PorEmpSal, @SalminNor, @DiaHissIBC,
	   @IndProp25SMLV, @VG47, @VG51, 0, @ValHissApoEmpSal, @ValHissApoPatSal, 'A', @Ind_red, 0, @ValAjuIBLPatSalLNR, @Ind_apsalPat_Lnr,
	   @Ind_ApsalEmp_Lnr, @DiaHissLNR, @ValAjuApoPatSalLNR, @ValAjuApoEmpSalLNR, @IndAjusteMinimo, @ValAjuHissIBLSal, @ValAjuHissApoPatSal,
	   @ValAjuHissApoEmpSal, @Res2388 );

	   SET @PorTotalSalud = @PorEmpSal + @PorPatSal;
    END;
    IF @Apo_pen = 1
    BEGIN
	   SET @IndAjusteMinimo = 0;
	   SET @ValAjuIBLPatPen = @ValAjuIBLPatSal;
	   SET @ValAjuIBLEmpPen = @ValAjuIBLEmp;

	   IF(@PorEmpPen + @PorPatPen <> 0)
	   BEGIN
		  /*** Aporte a Pensión***/
		  SELECT @ValApoEmpPen = ValApoEmp,
			    @ValApoPatPen = ValApoPat,
			    @ValAjuApoRedPen = ValAjuApo
		  FROM dbo.fn_rhh_SS_Cotizacion( @ValHissIBC, @ValAjuIBLPatPen, @ValAjuIBLEmpPen, @ibc_min, @PorPatPen, @PorEmpPen, @SalminNor, @DiaHissIBC,
		  @IndProp25SMLV, @VG47, @VG51, 0, @ValHissApoEmpPen, @ValHissApoPatPen, 'A', @Ind_red, 0, 0, 0, 0, @DiaHissLNR, 0, 0, @IndAjusteMinimo,
		  @ValAjuIblSalud, 0, 0, @Res2388 );

		  SELECT @ValFSP = Val_FSP,
			    @ValFSubsistencia = ValFSubsistencia,
			    @ValAjuApoFSPLNR = ValAjuApoFSPLNR,
			    @ValAjuApoFubsisLNR = ValAjuApoFubsisLNR
		  FROM dbo.fn_rhh_ss_fsp( @ValHissIBC, @ValAjuIBLPatPen, @Vg48, @DiaHissIBC, @SalminNor, 0, @VG34, @ValHissApoFSP, @ValHissApoFSubsistencia,
		  @IndProp25SMLV, 'A', @VG47, @ValAjuIBLPatPen, 0, 0, 0, 0, 0, @Res2388 );

	   END;
	   SET @ValAjuIBLPatPen = @ValAjuIBLPatPen + CASE @Ibc_min
										    WHEN 4 THEN @ValAjuIBLEmpPen
										    ELSE 0
										END;

    END;


    IF @Apo_rie = 1
    BEGIN
	   SET @IndAjusteMinimo = 0;
	   SET @ValAjuIBLPatRie = @ValAjuIBLPatSal;

	   /*** Aporte a Riesgos***/
	   SELECT @ValApoPatRie = ValApoPat
	   FROM dbo.fn_rhh_SS_Cotizacion
		   ( @ValHissIBC, @ValAjuIBLPatRie, @ValAjuIBLEmp, @ibc_min, @PorPatRie, 0, @SalminNor, @DiaHissIBC, @IndProp25SMLV, @VG47, @VG51, 1, 0,
		   @ValHissApoPatRie, 'A', @Ind_red, 0, @ValAjuIBLPatSalLNR, 0, 0, @DiaHissLNR, 0, 0, @IndAjusteMinimo, 0, 0, 0, @Res2388
		   --'A', @Ind_red, 0, @ValAjuIBLPatSalLNR, 0, 0, 0, 0, 0
		   );

    END;
	   ELSE
    BEGIN
	   SET @ValAjuIBLPatRie = @ValAjuIBLPatSal;
    END;


    IF @Apo_Parafiscales = 1
    BEGIN

	   IF @VG155 = 1
	   BEGIN
		  SET @SalMinNorParaf = @SalMinNor;
	   END;
		  ELSE
	   BEGIN
		  SET @SalMinNorParaf = 1000;
	   END;

	   SET @IndAjusteMinimo = 0;

	   IF @PorPatCCF <> 0
	   BEGIN
		  SELECT @ValAjuIBLPatCCF = AjusteIBLPat,
			    @ValAjuIBLEmp = AjusteIBLEmp,
			    @IndAjusteMinimo = Testeo
		  FROM dbo.fn_rhh_SS_SMLV( @ValIBCTotCCF, @DiaHissIBC, @SalMinNorParaf, @ibc_min, @Ibc_por, 0, 0, 0, 0, @Res2388 );

		  IF @ValAjuIBLPatCCF = 0 AND @IndAjusteMinimo = 0
		  BEGIN
			 SELECT @ValAjuIBLPatCCF = AjusteIBLPat,
				   @IndAjusteMinimo = test
			 FROM dbo.fn_rhh_SS_Redondeo( @ValIBCTotCCF, @DiaHissIBC, @PorPatCCF, 0, @ibc_min, 0, @Res2388 );

		  END;
	   END;

	   /*** Aporte a Cajas***/

	   IF @VG52 = 0 --Redondear Aporte  Parafiscales 1-SI,0-NO                                                                    
	   BEGIN
		  SET @Ind_red = 0;
	   END;

	   IF @PorPatCCF <> 0
	   BEGIN
		  SELECT @ValApoPatCCF = ValApoPat,
			    @ValAjuApoRedCCF = ValAjuApo
		  FROM dbo.fn_rhh_SS_Cotizacion( @ValIBCTotCCF, @ValAjuIBLPatCCF, 0, @ibc_min, @PorPatCCF, 0, @SalMinNorParaf, @DiaHissIBC, @IndProp25SMLV,
		  @VG47, @VG51, 0, 0, @ValHissApoPatCCF, 'A', @Ind_red, 1, 0, 0, 0, 0, 0, 0, @IndAjusteMinimo, 0, 0, 0, @Res2388 );
	   END;
	   --SET @ValApoPatCCF = @ValApoPatCCF + @ValAjuApoRedCCF;
	   IF @PorPatSENA <> 0
	   BEGIN
		  SET @IndAjusteMinimo = 0;
		  SELECT @ValAjuIBLPatSENA = AjusteIBLPat,
			    --@ValAjuIBLEmp = AjusteIBLEmp, 
			    @IndAjusteMinimo = Testeo
		  FROM dbo.fn_rhh_SS_SMLV( @ValIBCTotSENA, @DiaHissIBC, @SalMinNorParaf, @ibc_min, @Ibc_por, 0, 0, 0, 0, @Res2388 );

		  SELECT @ValApoPatSENA = ValApoPat,
			    @ValAjuApoRedSENA = ValAjuApo
		  FROM dbo.fn_rhh_SS_Cotizacion( @ValIBCTotSENA, @ValAjuIBLPatSENA, 0, @ibc_min, @PorPatSENA, 0, @SalMinNorParaf, @DiaHissIBC,
		  @IndProp25SMLV, @VG47, @VG51, 0, 0, @ValHissApoPatSEN, 'A', @Ind_red, 1, 0, 0, 0, 0, 0, 0, @IndAjusteMinimo, 0, 0, 0, @Res2388 );
	   END;
	   --SET @ValApoPatSENA = @ValApoPatSENA + @ValAjuApoRedSENA;
	   IF @PorPatICBF <> 0
	   BEGIN
		  SELECT @ValAjuIBLPatICBF = AjusteIBLPat,
			    --@ValAjuIBLEmp = AjusteIBLEmp, 
			    @IndAjusteMinimo = Testeo
		  FROM dbo.fn_rhh_SS_SMLV( @ValIBCTotICBF, @DiaHissIBC, @SalMinNorParaf, @ibc_min, @Ibc_por, 0, 0, 0, 0, @Res2388 );

		  SELECT @ValApoPatICBF = ValApoPat,
			    @ValAjuApoRedICBF = ValAjuApo
		  FROM dbo.fn_rhh_SS_Cotizacion( @ValIBCTotICBF, @ValAjuIBLPatICBF, 0, @ibc_min, @PorPatICBF, 0, @SalMinNorParaf, @DiaHissIBC,
		  @IndProp25SMLV, @VG47, @VG51, 0, 0, @ValHissApoPatICBF, 'A', @Ind_red, 1, 0, 0, 0, 0, 0, 0, @IndAjusteMinimo, 0, 0, 0, @Res2388 );

		  SELECT @ValApoPatEIT = ValApoPat,
			    @ValAjuApoRedEIT = ValAjuApo
		  FROM dbo.fn_rhh_SS_Cotizacion( @ValIBCTotSENA, @ValAjuIBLPatCCF, 0, @ibc_min, @PorPatEIT, 0, @SalMinNorParaf, @DiaHissIBC, @IndProp25SMLV,
		  @VG47, @VG51, 0, 0, @ValHissApoPatEIT, 'A', @Ind_red, 1, 0, 0, 0, 0, 0, 0, @IndAjusteMinimo, 0, 0, 0, @Res2388 );

		  --SET @ValApoPatEIT = @ValApoPatEIT + @ValAjuApoRedEIT;
		  SELECT @ValApoPatESAP = ValApoPat,
			    @ValAjuApoRedESAP = ValAjuApo
		  FROM dbo.fn_rhh_SS_Cotizacion( @ValIBCTotSENA, @ValAjuIBLPatCCF, 0, @ibc_min, @PorPatESAP, 0, @SalMinNorParaf, @DiaHissIBC,
		  @IndProp25SMLV, @VG47, @VG51, 0, 0, @ValHissApoPatESAP, 'A', @Ind_red, 1, 0, 0, 0, 0, 0, 0, @IndAjusteMinimo, 0, 0, 0, @Res2388 );
	   END;

    END;

END;

```
