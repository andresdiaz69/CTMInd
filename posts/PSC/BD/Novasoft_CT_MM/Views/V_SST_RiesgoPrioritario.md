# View: V_SST_RiesgoPrioritario

## Usa los objetos:
- [[GTH_FactRieTip]]
- [[SST_MprDetMatrizArea]]
- [[SST_MprDetMatrizProceso]]

```sql
CREATE VIEW [dbo].[V_SST_RiesgoPrioritario]
AS
SELECT	M.tip_fact, R.des_fact, M.cod_mpr
FROM	SST_MprDetMatrizArea AS M WITH (NOLOCK)
INNER	JOIN GTH_FactRieTip AS R WITH (NOLOCK) ON M.tip_fact = R.tip_fact
		AND M.ind_rieprio = 1
GROUP	BY M.tip_fact, R.des_fact, M.cod_mpr
UNION
SELECT	M.tip_fact, R.des_fact, M.cod_mpr 
FROM	SST_MprDetMatrizProceso AS M WITH (NOLOCK)
INNER	JOIN GTH_FactRieTip AS R WITH (NOLOCK) ON M.tip_fact = R.tip_fact
		AND M.ind_rieprio = 1
GROUP	BY M.tip_fact, R.des_fact, M.cod_mpr

```
