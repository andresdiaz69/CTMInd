# View: V_SST_Politica_Aprob

## Usa los objetos:
- [[SST_NivAprob]]
- [[SST_NivAprobDetAprob]]
- [[SST_Politica_Aprob]]

```sql
CREATE VIEW [dbo].[V_SST_Politica_Aprob]
AS
SELECT TOP (100) PERCENT APROB.cod_cons, APROB.cod_cia, APROB.cod_polit, APROB.fch_rev, APROB.aprobador, APROB.observa, APROB.cod_est_apro, RTRIM(DET.niv_aprob) + ' - ' + NIV.des_niv AS niv_aprob
FROM dbo.SST_Politica_Aprob AS APROB
INNER JOIN dbo.SST_NivAprobDetAprob AS DET ON CONCAT(RTRIM(APROB.cod_cia), '*', CONVERT(CHAR, APROB.cod_polit)) = DET.llave AND APROB.aprobador = DET.cod_emp
INNER JOIN dbo.SST_NivAprob AS NIV ON DET.cod_cia = NIV.cod_cia AND DET.niv_aprob = NIV.niv_aprob
WHERE cod_item = '002'
ORDER BY APROB.cod_cons;
```