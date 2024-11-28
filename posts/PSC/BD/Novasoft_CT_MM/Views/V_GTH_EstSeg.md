# View: V_GTH_EstSeg

## Usa los objetos:
- [[GTH_RptEstudSeguridad]]
- [[GTH_TipEstudSeg]]

```sql

CREATE VIEW [dbo].[V_GTH_EstSeg]
AS
SELECT        ES.cod_emp, ES.num_req, ES.cvo_estseg, TE.des_tipest
FROM            dbo.GTH_RptEstudSeguridad AS ES INNER JOIN
                         dbo.GTH_TipEstudSeg AS TE ON ES.tip_estseg = TE.tip_estseg


```
