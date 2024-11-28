# View: V_GTH_ExMedico

## Usa los objetos:
- [[GTH_RptExamenMedico]]
- [[GTH_TipoExamen]]

```sql

CREATE VIEW [dbo].[V_GTH_ExMedico]
AS
SELECT        EM.cod_emp, EM.num_req, EM.cvo_exmed, TE.Des_TipEx
FROM            dbo.GTH_RptExamenMedico AS EM INNER JOIN
                         dbo.GTH_TipoExamen AS TE ON EM.tip_ex = TE.Tip_Ex


```
