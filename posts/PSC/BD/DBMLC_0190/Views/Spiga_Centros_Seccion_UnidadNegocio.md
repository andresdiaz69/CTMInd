# View: Spiga_Centros_Seccion_UnidadNegocio

## Usa los objetos:
- [[Centros]]
- [[Empresas]]
- [[UnidadDeNegocio]]

```sql

CREATE VIEW [dbo].[Spiga_Centros_Seccion_UnidadNegocio] AS
SELECT a.CodEmpresa, b.NombreEmpresa, a.CodCentro, c.NombreCentro, a.CodSeccion, a.CodUnidadNegocio, a.NombreUnidadNegocio,
       a.CodDepartamento, CONCAT(RTRIM(a.CodEmpresa), RTRIM(a.CodCentro), RTRIM(a.CodSeccion)) AS Clave
FROM UnidadDeNegocio a
LEFT JOIN Empresas b ON (a.CodEmpresa = b.CodigoEmpresa)
LEFT JOIN Centros  c ON (a.CodCentro  = c.CodigoCentro)
GROUP BY a.CodEmpresa, b.NombreEmpresa, a.CodCentro, c.NombreCentro, a.CodSeccion, a.CodUnidadNegocio, a.NombreUnidadNegocio, a.CodDepartamento

--706 100%

```
