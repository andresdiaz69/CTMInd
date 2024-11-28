# View: vw_Centros

## Usa los objetos:
- [[Centros]]

```sql


CREATE VIEW [dbo].[vw_Centros]
AS
SELECT        CodigoCentro, CodigoSede, CodigoSedeCumplimiento, NombreCentro, CASE WHEN CHARINDEX('-', NombreCentro) = 0 THEN NombreCentro ELSE LEFT(nombreCentro, CHARINDEX('-', NombreCentro) - 1) END AS SiglaMarca
FROM            Centros

```
