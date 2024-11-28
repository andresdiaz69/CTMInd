# View: vw_ClubIntegralModelosSubCriterios

## Usa los objetos:
- [[ClubIntegralModelosSub]]
- [[ClubIntegralModelosSubCriterios]]

```sql
CREATE VIEW [dbo].[vw_ClubIntegralModelosSubCriterios]
AS
SELECT        dbo.ClubIntegralModelosSub.IdClubIntegralModelo, dbo.ClubIntegralModelosSub.IdCLubIntegralModeloSub, dbo.ClubIntegralModelosSub.NombreModeloSub, dbo.ClubIntegralModelosSub.Vista, 
                         dbo.ClubIntegralModelosSub.DiaCorte, dbo.ClubIntegralModelosSubCriterios.IdCLubIntegralModeloSubCriterio, dbo.ClubIntegralModelosSubCriterios.NombreModeloSubCriterio
FROM            dbo.ClubIntegralModelosSub INNER JOIN
                         dbo.ClubIntegralModelosSubCriterios ON dbo.ClubIntegralModelosSub.IdCLubIntegralModeloSub = dbo.ClubIntegralModelosSubCriterios.IdClubIntegralModeloSub






```
