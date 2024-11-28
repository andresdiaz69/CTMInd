# Stored Procedure: sp_Rhh_Plantilla_ExcluyeEmp

## Usa los objetos:
- [[fn_rhh_ConvEmp]]
- [[fn_rhh_Hislab_NumSec]]
- [[rhh_EmpConv]]
- [[rhh_hislab]]
- [[Rhh_PlantDef]]
- [[Rhh_PlantDefConv]]
- [[Rhh_PlantDefEmp]]
- [[Rhh_Plantilla]]
- [[Rhh_PlantVigencia]]

```sql
-- =============================================
-- Author:		Ricardo Santamaría Vanegas
-- Create date: Mayo 6 de 2021
-- Description:	Crea exclusiones en las plantillas eventuales para el empleado (@cod_emp) enviado en parámetros
---				o para los empleados que están asociados al convenio @Convenio
--				@Plantilla Plantilla eventual en la que se está incluyendo
--				@fec_ini - @fec_fin Rango de fechas en los que se incluye al empleado en @Plantilla
-- =============================================
CREATE PROCEDURE sp_Rhh_Plantilla_ExcluyeEmp
-- Add the parameters for the stored procedure here
	@cCodEmp   CHAR(12)     = NULL,
	@Convenio  VARCHAR(15)  = NULL,
	@Plantilla NVARCHAR(30) = NULL,
	@fec_ini   DATETIME     = NULL,
	@fec_fin   DATETIME     = NULL
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @CodSuc CHAR(3);
    DECLARE @ConvEmp VARCHAR(15);
    DECLARE @cCodEmpAct CHAR(12);
    DECLARE @nTotEmp INT;
    DECLARE @nEmpAct INT = 1;

    SET @Plantilla = ISNULL(@Plantilla, '');

    IF(@Convenio IS NOT NULL OR LEN(@Convenio) > 0
	 )
	 AND (@cCodEmp IS NOT NULL OR LEN(@cCodEmp) > 0
		)
    BEGIN
	   RAISERROR('Solo puede especificar uno de los dos parámetros; o es por empleado o es por convenio', 16, 1);
    END;

    CREATE TABLE #t_Empledos_del_Convenio(
	    NumEmp  INT IDENTITY(1, 1),
	    cod_emp CHAR(12) COLLATE DATABASE_DEFAULT PRIMARY KEY
								 );

    IF @cCodEmp IS NOT NULL AND LEN(@cCodEmp) > 0
    BEGIN
	   INSERT INTO #t_Empledos_del_Convenio( cod_emp )
	   VALUES
			(
			@cCodEmp );
    END;

    IF @Convenio IS NOT NULL AND LEN(@Convenio) > 0
    BEGIN
	   INSERT INTO #t_Empledos_del_Convenio( cod_emp )
	   SELECT DISTINCT
			Ec.cod_emp
	   FROM rhh_EmpConv AS Ec WITH(NOLOCK)
	   WHERE Ec.cod_conv = @Convenio
		    AND Ec.fec_ini <= @fec_fin
		    AND (Ec.fec_fin >= @fec_ini OR Ec.fec_fin IS NULL
			   );
    END;

    SELECT @nTotEmp = COUNT(cod_emp)
    FROM #t_Empledos_del_Convenio;

    WHILE @nEmpAct <= @nTotEmp
    BEGIN
	   SELECT @cCodEmpAct = cod_emp
	   FROM #t_Empledos_del_Convenio
	   WHERE NumEmp = @nEmpAct;

	   SELECT @CodSuc = cod_suc
	   FROM rhh_hislab WITH(NOLOCK)
	   WHERE cod_emp = @cCodEmpAct
		    AND num_sec = dbo.fn_rhh_Hislab_NumSec( @cCodEmpAct, @fec_fin, 0, 1 );

	   SELECT @ConvEmp = dbo.fn_rhh_ConvEmp( @cCodEmpAct, @fec_fin );

	   IF @ConvEmp IS NOT NULL AND @CodSuc IS NOT NULL
	   BEGIN
		  WITH Plantillas
			  AS (SELECT DISTINCT
					   'PlantDef' AS Tabla,
					   @cCodEmpAct AS cod_emp,
					   Pd.cod_plt,
					   P.Tip_plt,
					   CONVERT(INT, 0) AS ind_excl,
					   V.fec_ini,
					   V.fec_fin
				 FROM Rhh_PlantDef AS Pd WITH(NOLOCK)
				 INNER JOIN Rhh_Plantilla AS P WITH(NOLOCK) ON P.cod_plt = Pd.cod_plt
				 INNER JOIN Rhh_PlantVigencia AS V WITH(NOLOCK) ON V.cod_vige = P.cod_vige
														 AND V.fec_ini <= @fec_fin
														 AND (V.fec_fin >= @fec_ini OR V.fec_fin IS NULL
															)
				 WHERE(Pd.cod_conv = @ConvEmp OR Pd.cod_conv = '0'
					 )
					 AND (Pd.cod_suc = @CodSuc OR Pd.cod_suc = '0'
						)
				 UNION ALL
				 SELECT DISTINCT
					   'PlantDefEmp',
					   @cCodEmpAct AS cod_emp,
					   Pe.cod_plt,
					   P.Tip_plt,
					   CONVERT(INT, Pe.ind_excl) AS ind_excl,
					   Pe.fec_ini,
					   Pe.fec_fin
				 FROM Rhh_PlantDefEmp AS Pe WITH(NOLOCK)
				 INNER JOIN Rhh_Plantilla AS P WITH(NOLOCK) ON P.cod_plt = Pe.cod_plt
				 WHERE Pe.cod_emp = @cCodEmpAct
					  AND Pe.fec_ini <= @fec_fin
					  AND (Pe.fec_fin >= @fec_ini OR Pe.fec_fin IS NULL
						 )
				 UNION ALL
				 SELECT DISTINCT
					   'PlantDefConv',
					   @cCodEmpAct AS cod_emp,
					   Pc.cod_plt,
					   P.Tip_plt,
					   CONVERT(INT, 0) AS ind_excl,
					   Pc.fec_ini,
					   Pc.fec_fin
				 FROM Rhh_PlantDefConv AS Pc WITH(NOLOCK)
				 INNER JOIN Rhh_Plantilla AS P WITH(NOLOCK) ON P.cod_plt = Pc.cod_plt
				 INNER JOIN rhh_EmpConv AS E WITH(NOLOCK) ON E.cod_emp = @cCodEmpAct
													AND E.cod_conv = Pc.cod_conv
													AND E.fec_ini <= @fec_fin
													AND (E.fec_fin >= @fec_ini OR E.fec_fin IS NULL
													    )
				 WHERE Pc.fec_ini <= @fec_fin AND (Pc.fec_fin >= @fec_ini OR Pc.fec_fin IS NULL
										    )),
			  Plant_A_Excl
			  AS (SELECT *,
					   CASE
						  WHEN fec_ini < @fec_ini THEN @fec_ini
						  ELSE fec_ini
					   END AS fec_ini_excl,
					   CASE
						  WHEN fec_fin > @fec_fin THEN @fec_fin
						  ELSE fec_fin
					   END AS fec_fin_excl
				 FROM Plantillas
				 WHERE ind_excl = 0 AND cod_plt <> @Plantilla)
			  MERGE Rhh_PlantDefEmp AS D
			  USING( SELECT cod_emp,
						 cod_plt,
						 Tip_plt,
						 fec_ini_excl,
						 MAX(fec_fin_excl) AS fec_fin_excl
				    FROM Plant_A_Excl
				    GROUP BY cod_emp,
						   cod_plt,
						   Tip_plt,
						   fec_ini_excl ) AS O
			  ON(D.cod_plt = O.cod_plt AND D.cod_emp = O.cod_emp AND D.fec_ini = O.fec_ini_excl
			    )
				 WHEN MATCHED AND Tip_plt = 2
				   THEN UPDATE SET ind_excl = 1
				 WHEN NOT MATCHED AND Tip_plt = 2
				   THEN
				   INSERT(cod_plt,
						cod_emp,
						ind_excl,
						fec_ini,
						fec_fin)
				   VALUES
						(
						O.cod_plt, O.cod_emp, 1, O.fec_ini_excl, O.fec_fin_excl );

	   END;

	   SET @nEmpAct = @nEmpAct + 1;
    END;
END;

```
