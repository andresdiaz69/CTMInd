# View: vw_OrganizacionCumplimiento

## Usa los objetos:
- [[Centros]]
- [[Ciudades]]
- [[Empresas]]
- [[EmpresasCentros]]
- [[Sedes]]

```sql
create VIEW [dbo].[vw_OrganizacionCumplimiento]
AS
SELECT        dbo.Empresas.CodigoEmpresa, dbo.Empresas.NombreEmpresa, dbo.Ciudades.CodigoCiudad, dbo.Ciudades.NombreCiudad, dbo.Sedes.CodigoSede, dbo.Sedes.NombreSede, dbo.Centros.CodigoCentro, 
                         dbo.Centros.NombreCentro, dbo.Empresas.NombreEmpresa + N' | ' + dbo.Ciudades.NombreCiudad + N' | ' + dbo.Sedes.NombreSede AS SedeCompleta, 
                         dbo.Empresas.NombreEmpresa + N' | ' + dbo.Ciudades.NombreCiudad + N' | ' + dbo.Sedes.NombreSede + N' | ' + dbo.Centros.NombreCentro AS CentroCompleto
FROM            dbo.Empresas INNER JOIN
                         dbo.EmpresasCentros ON dbo.Empresas.CodigoEmpresa = dbo.EmpresasCentros.CodigoEmpresa INNER JOIN
                         dbo.Ciudades INNER JOIN
                         dbo.Sedes ON dbo.Ciudades.CodigoCiudad = dbo.Sedes.CodigoCiudad INNER JOIN
                         dbo.Centros ON dbo.Sedes.CodigoSede = dbo.Centros.CodigoSedeCumplimiento ON dbo.EmpresasCentros.CodigoCentro = dbo.Centros.CodigoCentro
```
