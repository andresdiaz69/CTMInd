# Stored Procedure: sp_rhh_AjuMinProySS

## Usa los objetos:
- [[fn_rhh_VG]]
- [[rhh_emplea]]
- [[Rhh_hisss]]

```sql
CREATE PROCEDURE [dbo].[sp_rhh_AjuMinProySS]
	@fFec_cte DATETIME
AS
BEGIN
    SET NOCOUNT ON;
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

    DECLARE @SalMin MONEY;
    DECLARE @SalMinRd MONEY;
    DECLARE @DiasTotSal INT;
    DECLARE @vdia_sal MONEY;
    DECLARE @BaseTotSal MONEY;
    DECLARE @DiasTotPen INT;
    DECLARE @vdia_Pen MONEY;
    DECLARE @BaseTotPen MONEY;
    DECLARE @BaseTotRie MONEY;
    DECLARE @DiasTotRie INT;
    DECLARE @vdia_rie MONEY;
    DECLARE @nIndSalMinEspS BIT;
    DECLARE @nIndSalMinEspP BIT;
    DECLARE @nIndSalMinEspR BIT;
    DECLARE @Empleados TABLE(
	    Nid      BIGINT,
	    cod_emp  CHAR(15),
	    dia_sal  INT,
	    dia_pen  INT,
	    ibc_sal  MONEY,
	    ibc_pen  MONEY,
	    cod_cont BIGINT,
	    sal_emp  MONEY,
	    pen_emp  MONEY,
	    serial   INT,
	    vap_sal  MONEY,
	    vap_pen  MONEY
					   );
    DECLARE @Cont BIGINT;
    DECLARE @ContMax BIGINT;
    DECLARE @Cod_emp CHAR(15);
    DECLARE @AjuPatSal MONEY;
    DECLARE @SaludEmp MONEY;
    DECLARE @PensionEmp MONEY;
    DECLARE @IBCPer MONEY;
    DECLARE @PorPatSal NUMERIC(5, 2); -----INT LSR
    DECLARE @PorEmpSal NUMERIC(5, 2); -----INT LSR
    DECLARE @SaludPat MONEY;
    DECLARE @PorPatPen NUMERIC(5, 2); -----INT LSR
    DECLARE @PorEmpPen NUMERIC(5, 2); -----INT LSR
    DECLARE @PensionPat MONEY;
    DECLARE @Serial INT;
    DECLARE @Vap_sal MONEY;
    DECLARE @Vap_pen MONEY;
    DECLARE @Resultado TABLE(
	    MENSAJE VARCHAR(MAX)
					   );

    SET @SalMin = CONVERT(MONEY, dbo.fn_rhh_VG( 60, @fFec_cte ));
    SET @SalMinRd = ROUND(@SalMin + 1, -3);
    SET @PorPatSal = CONVERT(NUMERIC(5, 2), dbo.fn_rhh_VG( 30, @fFec_cte )); --INT LSR
    SET @PorEmpSal = CONVERT(NUMERIC(5, 2), dbo.fn_rhh_VG( 32, @fFec_cte )); --INT LSR
    SET @PorPatPen = CONVERT(NUMERIC(5, 2), dbo.fn_rhh_VG( 31, @fFec_cte )); --INT LSR
    SET @PorEmpPen = CONVERT(NUMERIC(5, 2), dbo.fn_rhh_VG( 33, @fFec_cte )); --INT LSR
    SET @CONT = 1;
    SET @SaludEmp = 0;
    SET @PensionEmp = 0;

    INSERT INTO @Empleados( NID,
					   cod_emp,
					   dia_sal,
					   dia_pen,
					   ibc_sal,
					   ibc_pen,
					   Cod_cont,
					   sal_emp,
					   pen_emp,
					   serial,
					   vap_sal,
					   vap_pen
					 )
    SELECT ROW_NUMBER() OVER(
		 ORDER BY hisss.cod_emp),
		 hisss.cod_emp,
		 dia_sal,
		 dia_pen,
		 ibc_sal,
		 ibc_pen,
		 cod_cont,
		 vae_sal,
		 vae_pen,
		 serial,
		 vap_sal,
		 vap_pen
    FROM Rhh_hisss AS hisss,
	    rhh_emplea AS emp
    WHERE fec_cau = @fFec_cte
		AND tip_reg = 'P'
		AND tip_liq = '04'
		AND hisss.cod_emp = emp.cod_emp
		AND est_lab = '99'
		AND emp.ind_ctt = 0;

    SELECT @CONTMAX = MAX(NID)
    FROM @Empleados;

    WHILE @CONT <= @CONTMAX
    BEGIN
	   SELECT @Cod_emp = cod_emp,
			@DiasTotSal = dia_sal,
			@BaseTotSal = ibc_sal,
			@SaludEmp = sal_emp,
			@PensionEmp = pen_emp,
			@Serial = serial,
			@Vap_pen = vap_pen,
			@Vap_sal = vap_sal
	   FROM @Empleados
	   WHERE NID = @CONT;

	   IF @SalMinRd < @SalMin
	   BEGIN
		  SET @SalMinRd = @SalMin;
	   END;

	   IF @BaseTotSal <= @SalMinRd / 30 * @DiasTotSal
	   BEGIN
		  SELECT @AjuPatSal = ROUND(@SalMinRd / 30 * @DiasTotSal, -3) - @BaseTotSal; --lsr REDONDEO AL MIL
		  SET @IBCPer = @BaseTotSal + @AjuPatSal;

		  IF ROUND((@IBCPer * (@PorPatSal + @PorEmpSal) / 100) - 1, -2) < ROUND(CEILING(@SalMin / 30 * @DiasTotSal) * (@PorPatSal + @PorEmpSal) /
		  100, 0)
		  BEGIN

			 SELECT @SaludPat = ROUND(@IBCPer * (@PorPatSal + @PorEmpSal) / 100, 0) - (@SaludEmp + @Vap_sal);
		  END;
			 ELSE
		  BEGIN
			 SELECT @SaludPat = ROUND((@IBCPer * (@PorPatSal + @PorEmpSal) / 100) - 1, -2) - (@SaludEmp + @Vap_sal);
		  END;

		  IF ROUND((@IBCPer * (@PorPatPen + @PorEmpPen) / 100) - 1, -2) < ROUND(CEILING(@SalMin / 30 * @DiasTotSal) * (@PorPatPen + @PorEmpPen) /
		  100, 0)
		  BEGIN
			 SELECT @PensionPat = ROUND(@IBCPer * (@PorPatPen + @PorEmpPen) / 100, 0) - (@PensionEmp + @Vap_pen);
		  END;
			 ELSE
		  BEGIN
			 SELECT @PensionPat = ROUND((@IBCPer * (@PorPatPen + @PorEmpPen) / 100) - 1, -2) - (@PensionEmp + @Vap_pen);
		  END;

		  INSERT INTO rhh_hisss( cod_emp,
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
							cod_cont
						   )
		  SELECT cod_emp,
			    tip_liq,
			    tip_reg,
			    fec_cau,
			    fec_cte,
			    fdo_sal,
			    fdo_pen,
			    fdo_ate,
			    0,
			    0,
			    0,
			    @AjuPatSal,
			    @AjuPatSal,
			    0,
			    @AjuPatSal,
			    @AjuPatSal,
			    0,
			    por_sal,
			    por_pen,
			    por_rie,
			    @SaludPat,
			    @PensionPat,
			    0,
			    0,
			    0,
			    0,
			    cod_cont
		  FROM rhh_hisss
		  WHERE serial = @Serial;

	   END;

	   SET @CONT = @CONT + 1;

    END;
    INSERT INTO @Resultado
    VALUES
		 (
		 'Se realizaron los cambios satisfactoriamente' );
    SELECT * FROM @Resultado;

END;

```
