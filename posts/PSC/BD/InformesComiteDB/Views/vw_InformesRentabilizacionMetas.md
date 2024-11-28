# View: vw_InformesRentabilizacionMetas

## Usa los objetos:
- [[InformesIndMetas]]
- [[InformesPresentaciones]]

```sql



CREATE VIEW [dbo].[vw_InformesRentabilizacionMetas]
AS
SELECT        t1.Indicador, t1.Año, t1.CodigoPresentacion, t2.NombrePresentacion, t1.Meta
FROM            dbo.InformesIndMetas AS t1 LEFT OUTER JOIN
                         dbo.InformesPresentaciones AS t2 ON t1.CodigoPresentacion = t2.CodigoPresentacion

```
