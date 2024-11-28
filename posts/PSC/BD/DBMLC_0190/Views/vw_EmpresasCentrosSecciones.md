# View: vw_EmpresasCentrosSecciones

## Usa los objetos:
- [[Centros]]
- [[Empresas]]
- [[EmpresasCentrosSecciones]]
- [[Secciones]]

```sql



CREATE VIEW [dbo].[vw_EmpresasCentrosSecciones]
AS
SELECT        t1.CodigoEmpresa, t2.NombreEmpresa, t1.CodigoCentro, t3.NombreCentro, t1.CodigoSeccion, t4.Seccion
FROM            dbo.EmpresasCentrosSecciones AS t1 LEFT OUTER JOIN
                         dbo.Empresas AS t2 ON t1.CodigoEmpresa = t2.CodigoEmpresa LEFT OUTER JOIN
                         dbo.Centros AS t3 ON t1.CodigoCentro = t3.CodigoCentro LEFT OUTER JOIN
                         dbo.Secciones AS t4 ON t1.CodigoSeccion = t4.CodigoSeccion

```
