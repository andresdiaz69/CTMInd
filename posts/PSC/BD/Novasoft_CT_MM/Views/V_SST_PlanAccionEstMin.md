# View: V_SST_PlanAccionEstMin

## Usa los objetos:
- [[SST_EvaluaDef]]
- [[SST_EvaluaResp]]

```sql
CREATE VIEW [dbo].[V_SST_PlanAccionEstMin]
AS
SELECT        R.cod_eva, R.cod_cia, CONVERT(DATE, R.fec_eje) AS fec_eje
FROM            dbo.SST_EvaluaResp AS R INNER JOIN
                         dbo.SST_EvaluaDef AS E ON R.cod_eva = E.cod_eva
WHERE        (E.ind_eva = 2) AND R.fec_fin IS NOT NULL
GROUP BY R.cod_eva, R.cod_cia, R.fec_eje

```
