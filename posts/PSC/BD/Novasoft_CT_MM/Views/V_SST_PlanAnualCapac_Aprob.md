# View: V_SST_PlanAnualCapac_Aprob

## Usa los objetos:
- [[SST_NivAprob]]
- [[SST_NivAprobDetAprob]]
- [[SST_PlanAnualCapac_Aprob]]

```sql
CREATE VIEW [dbo].[V_SST_PlanAnualCapac_Aprob]
AS
SELECT TOP (100) PERCENT APROB.cod_cons, APROB.cod_cia, APROB.anio, APROB.version, APROB.cod_suc, APROB.cod_cli, APROB.fch_rev, APROB.aprobador, APROB.observa, APROB.cod_est_apro, RTRIM(DET.niv_aprob) 
                         + ' - ' + NIV.des_niv AS niv_aprob
FROM dbo.SST_PlanAnualCapac_Aprob AS APROB 
INNER JOIN dbo.SST_NivAprobDetAprob AS DET ON CONCAT(RTRIM(LTRIM(APROB.cod_cia)), '*', RTRIM(LTRIM(APROB.anio)), '*', RTRIM(LTRIM(APROB.version)), '*', RTRIM(LTRIM(APROB.cod_suc)), '*', RTRIM(LTRIM(APROB.cod_cli))) = DET.llave AND APROB.aprobador = DET.cod_emp 
INNER JOIN dbo.SST_NivAprob AS NIV ON DET.cod_cia = NIV.cod_cia AND DET.niv_aprob = NIV.niv_aprob
WHERE cod_item = '005'
ORDER BY APROB.cod_cons
```
