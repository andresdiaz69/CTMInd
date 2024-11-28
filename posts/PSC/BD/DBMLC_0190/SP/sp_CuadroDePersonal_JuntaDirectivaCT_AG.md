# Stored Procedure: sp_CuadroDePersonal_JuntaDirectivaCT_AG

## Usa los objetos:
- [[EmpleadosActivos]]

```sql
CREATE PROCEDURE   [dbo].[sp_CuadroDePersonal_JuntaDirectivaCT_AG] 
	-- Add the parameters for the stored procedure here	
	@AnoActual as int,
	@MesActual as int
AS

--declare	@AnoActual as int
--declare @MesActual as int
--set @AnoActual =2023
--set @MesActual = 12
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	Declare @MesAnterior as smallint
	Declare @AñoAnterior as smallint

	if @MesActual = 1 
	Begin
		set @MesAnterior = 12 
		set @AñoAnterior = @AnoActual - 1
		end
	else
	begin
		set @MesAnterior = @MesActual - 1
		set @AñoAnterior = @AnoActual 
		end

-- Insert statements for procedure here

SELECT RTRIM(LTRIM(isnull(ISNULL(MesActual.Nombre_Cargo_Junta,MesAnterior.Nombre_Cargo_Junta),AñoAnterior.Nombre_Cargo_Junta))) AS Nombre_Cargo_Junta,
	RTRIM(LTRIM(isnull(ISNULL(MesActual.Nombre_Unidad_Negocio,MesAnterior.Nombre_Unidad_Negocio),AñoAnterior.Nombre_Unidad_Negocio))) AS Nombre_Unidad_Negocio,
	Isnull(MesAnterior.Cantidad,0) as Cantidad_Anterior, Isnull(MesActual.Cantidad,0) as Cantidad_Actual, 
	Isnull(AñoAnterior.Cantidad,0) AS AñoAnterior
	FROM 
	(
		SELECT Nombre_Cargo_Junta, Nombre_Unidad_Negocio, count(*) [Cantidad]
		FROM EmpleadosActivos
		WHERE CodigoEmpresa in (1,5,22,24) AND Mes_Periodo = @MesActual  AND Ano_Periodo = @AnoActual
		GROUP BY Nombre_Cargo_Junta,Nombre_Unidad_Negocio
	)AS MesActual

FULL OUTER JOIN 
	(
		SELECT Nombre_Cargo_Junta, Nombre_Unidad_Negocio, count(*) [Cantidad]
		FROM EmpleadosActivos
		WHERE CodigoEmpresa in (1,5,22,24) AND Mes_Periodo = @MesAnterior AND Ano_Periodo = @AñoAnterior
		GROUP BY Nombre_Cargo_Junta,Nombre_Unidad_Negocio
	)AS MesAnterior

ON MesActual.Nombre_Cargo_Junta = MesAnterior.Nombre_Cargo_Junta 
AND MesActual.Nombre_Unidad_Negocio = MesAnterior.Nombre_Unidad_Negocio FULL OUTER JOIN 

(SELECT Nombre_Cargo_Junta, Nombre_Unidad_Negocio, count(*) [Cantidad]
	FROM EmpleadosActivos
	WHERE CodigoEmpresa in (1,5,22,24)	AND Mes_Periodo = @MesActual AND Ano_Periodo = @AnoActual - 1
	GROUP BY Nombre_Cargo_Junta,Nombre_Unidad_Negocio) as AñoAnterior 

ON MesActual.Nombre_Cargo_Junta = AñoAnterior.Nombre_Cargo_Junta 
AND MesActual.Nombre_Unidad_Negocio = AñoAnterior.Nombre_Unidad_Negocio 
ORDER BY MesActual.Nombre_Cargo_Junta, MesActual.Nombre_Unidad_Negocio

END

```
