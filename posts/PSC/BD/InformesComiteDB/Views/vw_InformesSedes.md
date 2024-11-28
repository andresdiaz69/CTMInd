# View: vw_InformesSedes

## Usa los objetos:
- [[InformesPresentaciones]]
- [[InformesPresentacionesSedes]]
- [[InformesSedes]]

```sql


CREATE VIEW [dbo].[vw_InformesSedes]
AS
SELECT        dbo.InformesPresentaciones.CodigoPresentacion, dbo.InformesPresentaciones.NombrePresentacion, dbo.InformesSedes.CodigoSede, dbo.InformesSedes.NombreSede, dbo.InformesSedes.Ciudad, 
                         dbo.InformesSedes.Departamento, dbo.InformesSedes.Diferencia, dbo.InformesPresentacionesSedes.Orden
FROM            dbo.InformesSedes LEFT OUTER JOIN
                         dbo.InformesPresentacionesSedes ON dbo.InformesPresentacionesSedes.CodigoSede = dbo.InformesSedes.CodigoSede LEFT OUTER JOIN
                         dbo.InformesPresentaciones ON dbo.InformesPresentaciones.CodigoPresentacion = dbo.InformesPresentacionesSedes.CodigoPresentacion

```
