# View: V_SST_EvaluaDefinEvaIni

## Usa los objetos:
- [[SST_EvaluaPlanifEva]]

```sql
CREATE VIEW [dbo].[V_SST_EvaluaDefinEvaIni]
AS
SELECT        cod_cia, cons, tit_cons, fec_reg, ind_eva
FROM            dbo.SST_EvaluaPlanifEva
WHERE        (ind_eva = 1)

```
