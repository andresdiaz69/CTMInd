# View: vw_InformesRentabilizacionResumenAnual_v2

## Usa los objetos:
- [[InformesIndRentabilizacion_v2]]
- [[InformesPresentaciones]]

```sql





CREATE VIEW [dbo].[vw_InformesRentabilizacionResumenAnual_v2]
AS
SELECT        a.CodigoPresentacion, a.NombrePresentacion, a.Año, a.NombreConcepto, a.Acumulado, a.AcumuladoP, a.Orden, b.IndRentaTipo, b.IndRentaOrden, b.EmpresaPrincipal
FROM            dbo.InformesIndRentabilizacion_v2 AS a LEFT OUTER JOIN
                         dbo.InformesPresentaciones AS b ON a.CodigoPresentacion = b.CodigoPresentacion
WHERE        (b.IndRentaTipo <> '')

```
