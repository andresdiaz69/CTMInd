# View: V_SST_RegProcedimiento_Aprob

## Usa los objetos:
- [[SST_NivAprob]]
- [[SST_NivAprobDetAprob]]
- [[SST_RegProcedimiento_Aprob]]

```sql
CREATE VIEW [dbo].[V_SST_RegProcedimiento_Aprob]
AS
SELECT TOP (100) PERCENT APROB.cod_cons, APROB.cod_cia, APROB.cod_proc, APROB.fecha, APROB.tip_doc, APROB.fch_rev, APROB.aprobador, APROB.observa, APROB.cod_est_apro, RTRIM(DET.niv_aprob) 
                         + ' - ' + NIV.des_niv AS niv_aprob
FROM dbo.SST_RegProcedimiento_Aprob AS APROB
INNER JOIN dbo.SST_NivAprobDetAprob AS DET ON CONCAT(RTRIM(LTRIM(APROB.cod_cia)), '*', RTRIM(LTRIM(APROB.cod_proc)), '*', RTRIM(LTRIM(CONVERT(CHAR, APROB.fecha, 103))), '*', RTRIM(LTRIM(APROB.tip_doc))) = DET.llave AND APROB.aprobador = DET.cod_emp
INNER JOIN dbo.SST_NivAprob AS NIV ON DET.cod_cia = NIV.cod_cia AND DET.niv_aprob = NIV.niv_aprob
WHERE LEN(cod_item) < 3
ORDER BY APROB.cod_cons
```
