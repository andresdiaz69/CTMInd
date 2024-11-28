# View: vw_InformesRentabilizacionResumenAnual

## Usa los objetos:
- [[InformesIndRentabilizacion]]
- [[InformesPresentaciones]]

```sql



CREATE VIEW [dbo].[vw_InformesRentabilizacionResumenAnual]
AS
SELECT        a.CodigoPresentacion, a.NombrePresentacion, a.Año, a.NombreConcepto, a.Acumulado, a.AcumuladoP, a.Orden, b.IndRentaTipo, b.IndRentaOrden, b.EmpresaPrincipal
FROM            dbo.InformesIndRentabilizacion AS a LEFT OUTER JOIN
                         dbo.InformesPresentaciones AS b ON a.CodigoPresentacion = b.CodigoPresentacion
WHERE        (b.IndRentaTipo <> '')

```
