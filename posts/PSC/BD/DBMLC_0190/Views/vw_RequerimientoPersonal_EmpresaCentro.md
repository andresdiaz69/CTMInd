# View: vw_RequerimientoPersonal_EmpresaCentro

## Usa los objetos:
- [[Centros]]
- [[Departamentos]]
- [[Empresas]]
- [[EmpresasCentrosSecciones]]
- [[Secciones]]
- [[Sedes]]

```sql
CREATE VIEW [dbo].[vw_RequerimientoPersonal_EmpresaCentro]
AS
SELECT        dbo.Empresas.CodigoEmpresa, dbo.Empresas.NombreEmpresa, dbo.Centros.CodigoCentro, dbo.Centros.NombreCentro, dbo.Secciones.CodigoSeccion, dbo.Secciones.Seccion, 
                         dbo.Departamentos.CodigoDepartamento, dbo.Departamentos.NombreDepartamento, dbo.Sedes.CodigoSede, dbo.Sedes.NombreSede
FROM            dbo.Empresas INNER JOIN
                         dbo.Centros INNER JOIN
                         dbo.EmpresasCentrosSecciones INNER JOIN
                         dbo.Departamentos ON dbo.EmpresasCentrosSecciones.CodigoDepartamento = dbo.Departamentos.CodigoDepartamento INNER JOIN
                         dbo.Secciones ON dbo.EmpresasCentrosSecciones.CodigoSeccion = dbo.Secciones.CodigoSeccion ON dbo.Centros.CodigoCentro = dbo.EmpresasCentrosSecciones.CodigoCentro ON 
                         dbo.Empresas.CodigoEmpresa = dbo.EmpresasCentrosSecciones.CodigoEmpresa INNER JOIN
                         dbo.Sedes ON dbo.Centros.CodigoSedeCumplimiento = dbo.Sedes.CodigoSede AND dbo.Centros.CodigoSede = dbo.Sedes.CodigoSede

```
