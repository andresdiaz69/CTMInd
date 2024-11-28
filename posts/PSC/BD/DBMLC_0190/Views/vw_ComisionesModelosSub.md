# View: vw_ComisionesModelosSub

## Usa los objetos:
- [[ComisionesModelos]]
- [[ComisionesModelosSub]]
- [[Empresas]]

```sql
CREATE VIEW [dbo].[vw_ComisionesModelosSub]
AS
SELECT        dbo.ComisionesModelosSub.IdComisionModeloSub, dbo.ComisionesModelosSub.NombreModeloSub, dbo.ComisionesModelosSub.Vista, dbo.Empresas.CodigoEmpresa, dbo.Empresas.NombreEmpresa, 
                         dbo.ComisionesModelos.IdComisionModelo, dbo.ComisionesModelos.NombreModelo, CAST(dbo.ComisionesModelosSub.IdComisionModeloSub AS VARCHAR(2)) 
                         + ' - ' + dbo.ComisionesModelosSub.NombreModeloSub AS NombreModeloSubCompleto, dbo.ComisionesModelosSub.DiaCorte, dbo.ComisionesModelosSub.Activar
FROM            dbo.ComisionesModelosSub INNER JOIN
                         dbo.ComisionesModelos ON dbo.ComisionesModelosSub.IdComisionModelo = dbo.ComisionesModelos.IdComisionModelo INNER JOIN
                         dbo.Empresas ON dbo.ComisionesModelosSub.CodigoEmpresa = dbo.Empresas.CodigoEmpresa

```
