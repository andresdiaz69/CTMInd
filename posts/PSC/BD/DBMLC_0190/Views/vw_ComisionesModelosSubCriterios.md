# View: vw_ComisionesModelosSubCriterios

## Usa los objetos:
- [[ComisionesModelosSubCriterios]]
- [[vw_ComisionesModelosSub]]

```sql

 CREATE VIEW [dbo].[vw_ComisionesModelosSubCriterios] AS

SELECT        dbo.vw_ComisionesModelosSub.IdComisionModeloSub, dbo.vw_ComisionesModelosSub.NombreModeloSub, dbo.vw_ComisionesModelosSub.Vista, dbo.vw_ComisionesModelosSub.CodigoEmpresa, 
                         dbo.vw_ComisionesModelosSub.NombreEmpresa, dbo.vw_ComisionesModelosSub.IdComisionModelo, dbo.vw_ComisionesModelosSub.NombreModelo, dbo.vw_ComisionesModelosSub.NombreModeloSubCompleto, 
                         dbo.vw_ComisionesModelosSub.DiaCorte, dbo.vw_ComisionesModelosSub.Activar, dbo.ComisionesModelosSubCriterios.IdComisionModeloSubCriterio, dbo.ComisionesModelosSubCriterios.NombreModeloSubCriterio, dbo.ComisionesModelosSubCriterios.Activo
FROM            dbo.vw_ComisionesModelosSub LEFT OUTER JOIN
                         dbo.ComisionesModelosSubCriterios ON dbo.vw_ComisionesModelosSub.IdComisionModeloSub = dbo.ComisionesModelosSubCriterios.IdComisionModeloSub

```
