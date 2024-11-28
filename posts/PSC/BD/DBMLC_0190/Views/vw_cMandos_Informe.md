# View: vw_cMandos_Informe

## Usa los objetos:
- [[cMandos_Datos]]
- [[cMandos_Estructura]]
- [[UnidadDeNegocio]]

```sql







CREATE VIEW [dbo].[vw_cMandos_Informe]
AS
SELECT  TOP (100) PERCENT  CM.Año, CM.Mes, CE.NombreTipo, CE.NombreRenglon,CM.CodigoLinea,CM.CodigoEmpresa, CM.CodigoCentro, CM.CodigoTipo, 
CM.CodigoRenglon, CM.Valor, CM.FechaGeneracion, UN.NombreCentro
FROM    dbo.cMandos_Estructura AS CE LEFT JOIN dbo.cMandos_Datos AS CM 
ON CM.CodigoTipo = CE.CodigoTipo AND CM.CodigoRenglon = CE.CodigoRenglon 
LEFT JOIN (SELECT DISTINCT CodCentro, NombreCentro FROM dbo.UnidadDeNegocio) AS UN 
ON CM.CodigoCentro = UN.CodCentro
where CM.Año is not null

```
