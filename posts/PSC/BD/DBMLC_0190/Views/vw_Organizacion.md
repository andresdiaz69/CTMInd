# View: vw_Organizacion

## Usa los objetos:
- [[Ciudades]]
- [[Empresas]]
- [[EmpresasCentros]]
- [[Sedes]]
- [[vw_Centros]]

```sql

CREATE VIEW [dbo].[vw_Organizacion]
AS
SELECT        dbo.Empresas.CodigoEmpresa, dbo.Empresas.NombreEmpresa, dbo.Ciudades.CodigoCiudad, dbo.Ciudades.NombreCiudad, dbo.Sedes.CodigoSede, dbo.Sedes.NombreSede, dbo.vw_Centros.CodigoCentro, 
                         dbo.vw_Centros.NombreCentro, dbo.Empresas.NombreEmpresa + N' | ' + dbo.Ciudades.NombreCiudad + N' | ' + dbo.Sedes.NombreSede AS SedeCompleta, 
                         dbo.Empresas.NombreEmpresa + N' | ' + dbo.Ciudades.NombreCiudad + N' | ' + dbo.Sedes.NombreSede + N' | ' + dbo.vw_Centros.NombreCentro AS CentroCompleto, dbo.vw_Centros.SiglaMarca
FROM            dbo.Empresas INNER JOIN
                         dbo.EmpresasCentros ON dbo.Empresas.CodigoEmpresa = dbo.EmpresasCentros.CodigoEmpresa INNER JOIN
                         dbo.Ciudades INNER JOIN
                         dbo.Sedes ON dbo.Ciudades.CodigoCiudad = dbo.Sedes.CodigoCiudad INNER JOIN
                         dbo.vw_Centros ON dbo.Sedes.CodigoSede = dbo.vw_Centros.CodigoSede ON dbo.EmpresasCentros.CodigoCentro = dbo.vw_Centros.CodigoCentro



```
