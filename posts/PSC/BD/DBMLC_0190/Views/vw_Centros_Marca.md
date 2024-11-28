# View: vw_Centros_Marca

## Usa los objetos:
- [[Centros]]
- [[VehiculosMarcas]]

```sql
CREATE VIEW [dbo].[vw_Centros_Marca] AS

	SELECT DISTINCT C.CodigoCentro, C.NombreCentro, C.SiglaMarca, CodigoMarca
	,CASE WHEN C.SiglaMarca = 'JD' THEN 'JOHN DEERE'
	WHEN V.marca IS NULL THEN C.SiglaMarca
	ELSE V.Marca END Marca 
	FROM
	(
		SELECT        CodigoCentro, CodigoSede, CodigoSedeCumplimiento, NombreCentro, 
		CASE WHEN CHARINDEX('-', NombreCentro) = 0 THEN NombreCentro ELSE LEFT(nombreCentro, CHARINDEX('-', NombreCentro) - 1) END AS SiglaMarca
		FROM            Centros 
	)AS C
	LEFT JOIN VehiculosMarcas AS V ON C.SiglaMarca = V.SiglaMarca


```
