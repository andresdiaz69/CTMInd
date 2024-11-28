# Stored Procedure: sp_spiga_OrdenesDeTrabajoCerradasByPovision

## Usa los objetos:
- [[spiga_OrdenesDeTrabajoCerradas]]

```sql



--USE Desarrollo_DBMLC_0190
CREATE PROCEDURE [dbo].[sp_spiga_OrdenesDeTrabajoCerradasByPovision]

@Fecha DATE

AS

BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF

SELECT	S.AñoOT
		, S.SerieOT
		, S.NumOT
		, S.NumTrabajo
		, S.FechaEntrada
		, DiasAbiertos = DATEDIFF(DAY,S.FechaEntrada, @FECHA)
		, S.IdMarcas
		, S.NombreMarcas
		, S.IdGamas
		, S.NombreGamas
		, S.IdEmpresas
		, S.IdTerceroCargo
		, S.NombreTerceroCargo
		, S.IdCargoTipos
		, S.IdCentros
		, S.IdSecciones
		, S.IdSeccionCargo
		, S.DescripcionSeccion
		, CosteRep = CASE WHEN S.PrecioMedio IS NULL THEN 0 ELSE S.PrecioMedio END
		, CosteSub = CASE WHEN S.CosteEntradasTrabajosExternos IS NULL THEN 0 ELSE S.CosteEntradasTrabajosExternos END
		, S.Matricula
		, S.VIN
FROM	spiga_OrdenesDeTrabajoCerradas S
WHERE	(((S.FechaFacturacion IS NULL OR S.FechaFacturacion > @FECHA) AND S.FechaEntrada <= @FECHA) AND 
		(S.Ano_Periodo = YEAR(@FECHA) AND S.Mes_Periodo = MONTH(@FECHA))) AND S.FechaCierre IS NOT NULL
END

```
