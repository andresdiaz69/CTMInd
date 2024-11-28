# View: V_GTH_RefPersCandEmp

## Usa los objetos:
- [[GTH_Eval_Estado_Pers]]
- [[GTH_RefeTipo]]

```sql

CREATE VIEW [dbo].[V_GTH_RefPersCandEmp]
AS
SELECT        EP.num_req, EP.cod_rpt_respond, EP.tip_ref, TR.des_tip, EP.num_ref
FROM            dbo.GTH_Eval_Estado_Pers AS EP INNER JOIN
                         dbo.GTH_RefeTipo AS TR ON EP.tip_ref = TR.tip_ref



```
