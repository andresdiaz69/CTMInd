# View: vw_EmpresasMarcasCentros

## Usa los objetos:
- [[Centros]]
- [[Empresas]]
- [[VehiculosMarcas]]

```sql
CREATE VIEW [dbo].[vw_EmpresasMarcasCentros]
AS
SELECT        dbo.Empresas.CodigoEmpresa, dbo.Empresas.NombreEmpresa, dbo.VehiculosMarcas.CodigoMarca, dbo.VehiculosMarcas.Marca, dbo.Centros.CodigoCentro, dbo.Centros.NombreCentro
FROM            dbo.Centros CROSS JOIN
                         dbo.Empresas CROSS JOIN
                         dbo.VehiculosMarcas

```
