# View: vw_OrganizacionCentrosDepartamentos

## Usa los objetos:
- [[Centros]]
- [[EmpresasCentrosSecciones]]
- [[vw_Centros]]

```sql
CREATE VIEW [dbo].[vw_OrganizacionCentrosDepartamentos]
AS
SELECT DISTINCT dbo.EmpresasCentrosSecciones.CodigoCentro, dbo.Centros.NombreCentro, dbo.EmpresasCentrosSecciones.CodigoDepartamento, dbo.vw_Centros.SiglaMarca
FROM            dbo.EmpresasCentrosSecciones LEFT OUTER JOIN
                         dbo.vw_Centros ON dbo.EmpresasCentrosSecciones.CodigoCentro = dbo.vw_Centros.CodigoCentro LEFT OUTER JOIN
                         dbo.Centros ON dbo.EmpresasCentrosSecciones.CodigoCentro = dbo.Centros.CodigoCentro

```
