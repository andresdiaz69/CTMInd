# View: vw_ClubIntegralModelosSub

## Usa los objetos:
- [[ClubIntegralModelos]]
- [[ClubIntegralModelosSub]]

```sql
CREATE VIEW [dbo].[vw_ClubIntegralModelosSub]
AS
SELECT        dbo.ClubIntegralModelosSub.IdCLubIntegralModeloSub, dbo.ClubIntegralModelos.IdCubIntegralModelo, dbo.ClubIntegralModelosSub.Vista, dbo.ClubIntegralModelosSub.NombreModeloSub, 
                         dbo.ClubIntegralModelos.NombreModelo
FROM            dbo.ClubIntegralModelos INNER JOIN
                         dbo.ClubIntegralModelosSub ON dbo.ClubIntegralModelos.IdCubIntegralModelo = dbo.ClubIntegralModelosSub.IdClubIntegralModelo






```
