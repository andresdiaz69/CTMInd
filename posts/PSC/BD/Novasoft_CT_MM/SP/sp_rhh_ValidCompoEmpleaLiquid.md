# Stored Procedure: sp_rhh_ValidCompoEmpleaLiquid

## Usa los objetos:
- [[fn_rhh_Hislab_NumSec]]
- [[fn_rhh_Plantilla_Emp]]
- [[GTH_Contratos]]
- [[rhh_EmpConv]]
- [[rhh_emplea]]
- [[rhh_hisfon]]
- [[rhh_tbestlab]]
- [[sis_aplicacion]]

```sql
-- =============================================
-- Author:		Ricardo Santamaría Vanegas
-- Create date: Abril 21 de 2014
-- Description:	Determina que datos hacen falta a un empleado para ser liquidable
-- =============================================
CREATE PROCEDURE [dbo].[sp_rhh_ValidCompoEmpleaLiquid]
-- Add the parameters for the stored procedure here
	@fFecRefPar DATETIME    = NULL,
	@cCodEmpPar VARCHAR(12) = NULL
AS
BEGIN

    SET NOCOUNT ON;
    DECLARE @TabEmpl TABLE(
	    numreg      INT IDENTITY(1, 1),
	    cod_emp     CHAR(12),
	    ind_no_liq  BIT DEFAULT 0,
	    observacion NVARCHAR(MAX) DEFAULT ''
					 );
    DECLARE @nRegAct INT;
    DECLARE @nRegTot INT;
    DECLARE @cCodEmp VARCHAR(12);
    DECLARE @cEmpApl CHAR(1);
    DECLARE @fFecRef DATETIME;

    SELECT @cEmpApl = emp_apl
    FROM sis_aplicacion
    WHERE cod_apl = 'NOM';

--SET @cCodEmpPar = '1018481034'
--SET @cCodEmpPar = '6123552'
    SET @fFecRef = ISNULL(@fFecRefPar, GETDATE());
    SET @nRegAct = 1;

    IF @cCodEmpPar IS NULL OR @cCodEmpPar = '%'
    BEGIN
	   INSERT INTO @TabEmpl( cod_emp )
	   SELECT E.cod_emp
	   FROM rhh_emplea AS E
	   INNER JOIN rhh_tbestlab AS T ON T.est_lab = E.est_lab
	   WHERE T.ind_liq <> 0;
    END;
	   ELSE
    BEGIN
	   INSERT INTO @TabEmpl( cod_emp )
	   SELECT cod_emp
	   FROM rhh_emplea
	   WHERE cod_emp LIKE @cCodEmpPar;
    END;

    SET @nRegTot = @@ROWCOUNT;

    IF @nRegTot = 0 AND @cCodEmpPar IS NOT NULL AND @cCodEmpPar <> '%'
    BEGIN
	   INSERT INTO @TabEmpl( cod_emp,
						ind_no_liq,
						observacion
					   )
	   VALUES
			(
			@cCodEmpPar, 1, 'No existe en la Base de Datos como empleado.' )
    END;

    WHILE @nRegAct <= @nRegTot AND @nRegTot > 0
    BEGIN
	   SELECT @cCodEmp = cod_emp
	   FROM @TabEmpl
	   WHERE numreg = @nRegAct;

	   IF( SELECT T.ind_liq
		  FROM rhh_emplea AS E
		  INNER JOIN rhh_tbestlab AS T ON T.est_lab = E.est_lab
		  WHERE cod_emp = @cCodEmp ) = 0
	   BEGIN
		  UPDATE @TabEmpl
		    SET ind_no_liq = 1,
			   observacion = observacion+'El empleado está en un estado no liquidable.'+CHAR(13)+CHAR(10)
		  WHERE numreg = @nRegAct
	   END;

/*Contrato*/
	   IF NOT EXISTS( SELECT *
				   FROM GTH_Contratos
				   WHERE cod_emp = @cCodEmp AND fec_con <= @fFecRef AND cod_est IN(
																	  1, 2
																	 ) )
	   BEGIN
		  UPDATE @TabEmpl
		    SET ind_no_liq = 1,
			   observacion = observacion+'El empleado no tiene Contrato o el estado del mismo no es liquidable en la fecha de referencia.'+CHAR(13)
			   +CHAR(10)
		  WHERE numreg = @nRegAct
	   END;

/*Historia laboral*/
	   IF( SELECT DBO.fn_rhh_Hislab_NumSec( @cCodEmp, @fFecRef, 1, 1 ) ) IS NULL
	   BEGIN
		  UPDATE @TabEmpl
		    SET ind_no_liq = 1,
			   observacion = observacion+'El empleado no tiene Historia Laboral para la fecha de referencia.'+CHAR(13)+CHAR(10)
		  WHERE numreg = @nRegAct
	   END;

/*Pensión*/
	   IF NOT EXISTS( SELECT *
				   FROM rhh_hisfon
				   WHERE cod_emp = @cCodEmp
					    AND tip_fdo = 1
					    AND fec_afi <= @fFecRef
					    AND (fec_ter IS NULL OR fec_ter >= @fFecRef
						   ) )
	   BEGIN
		  UPDATE @TabEmpl
		    SET ind_no_liq = 1,
			   observacion = observacion+'El empleado no tiene afiliación al fondo de Pensiones obligatorias.'+CHAR(13)+CHAR(10)
		  WHERE numreg = @nRegAct
	   END;

/*Salud*/
	   IF NOT EXISTS( SELECT *
				   FROM rhh_hisfon
				   WHERE cod_emp = @cCodEmp
					    AND tip_fdo = 2
					    AND fec_afi <= @fFecRef
					    AND (fec_ter IS NULL OR fec_ter >= @fFecRef
						   ) )
	   BEGIN
		  UPDATE @TabEmpl
		    SET ind_no_liq = 1,
			   observacion = observacion+'El empleado no tiene afiliación al fondo de Salud.'+CHAR(13)+CHAR(10)
		  WHERE numreg = @nRegAct
	   END;

/*Riesgos*/
	   IF NOT EXISTS( SELECT *
				   FROM rhh_hisfon
				   WHERE cod_emp = @cCodEmp
					    AND tip_fdo = 3
					    AND fec_afi <= @fFecRef
					    AND (fec_ter IS NULL OR fec_ter >= @fFecRef
						   ) )
	   BEGIN
		  UPDATE @TabEmpl
		    SET ind_no_liq = 1,
			   observacion = observacion+'El empleado no tiene afiliación al fondo de Riesgos Laborales.'+CHAR(13)+CHAR(10)
		  WHERE numreg = @nRegAct
	   END;

/*Caja de Compensación*/
	   IF NOT EXISTS( SELECT *
				   FROM rhh_hisfon
				   WHERE cod_emp = @cCodEmp
					    AND tip_fdo = 4
					    AND fec_afi <= @fFecRef
					    AND (fec_ter IS NULL OR fec_ter >= @fFecRef
						   ) )
	   BEGIN
		  UPDATE @TabEmpl
		    SET ind_no_liq = 1,
			   observacion = observacion+'El empleado no tiene afiliación al La Caja de Compensación Familiar.'+CHAR(13)+CHAR(10)
		  WHERE numreg = @nRegAct
	   END;

/*Cesantías*/
	   IF NOT EXISTS( SELECT *
				   FROM rhh_hisfon
				   WHERE cod_emp = @cCodEmp
					    AND tip_fdo = 5
					    AND fec_afi <= @fFecRef
					    AND (fec_ter IS NULL OR fec_ter >= @fFecRef
						   ) )
	   BEGIN
		  UPDATE @TabEmpl
		    SET ind_no_liq = 1,
			   observacion = observacion+'El empleado no tiene afiliación al fondo de Cesantías.'+CHAR(13)+CHAR(10)
		  WHERE numreg = @nRegAct
	   END;

	   IF @cEmpApl = 'T'
	   BEGIN
/*Convenio*/
		  IF NOT EXISTS( SELECT *
					  FROM rhh_EmpConv
					  WHERE cod_emp = @cCodEmp
						   AND fec_ini = (
						   SELECT MAX(fec_ini)
						   FROM rhh_EmpConv
						   WHERE cod_emp = @cCodEmp AND fec_ini <= @fFecRef AND (fec_fin IS NULL OR fec_fin >= @fFecRef
																	 )
									  ) )
		  BEGIN
			 UPDATE @TabEmpl
			   SET ind_no_liq = 1,
				  observacion = observacion+'El empleado no tiene vinculación con un convenio.'+CHAR(13)+CHAR(10)
			 WHERE numreg = @nRegAct
		  END;

/*Plantillas*/
		  IF( SELECT dbo.fn_rhh_Plantilla_Emp( @cCodEmpPar, @fFecRef ) ) IS NULL
		  BEGIN
			 UPDATE @TabEmpl
			   SET ind_no_liq = 1,
				  observacion = observacion+'El empleado no está incluido en una plantilla.'+CHAR(13)+CHAR(10)
			 WHERE numreg = @nRegAct
		  END;
	   END;

	   SET @nRegAct = @nRegAct + 1;
    END;

    UPDATE @TabEmpl
	 SET observacion = 'Ok'
    WHERE ind_no_liq = 0;

    SELECT * FROM @TabEmpl;

END;

```
