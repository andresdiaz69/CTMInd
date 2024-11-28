# View: V_SST_ObjetivoGral_Aprob

## Usa los objetos:
- [[SST_NivAprob]]
- [[SST_NivAprobDetAprob]]
- [[SST_ObjetivoGral_Aprob]]

```sql
CREATE VIEW [dbo].[V_SST_ObjetivoGral_Aprob]
AS
SELECT TOP (100) PERCENT APROB.cod_cons, APROB.cod_cia, APROB.anio_obj_gral, APROB.fch_rev, APROB.aprobador, APROB.observa, APROB.cod_est_apro, RTRIM(DET.niv_aprob) + ' - ' + NIV.des_niv AS niv_aprob
FROM dbo.SST_ObjetivoGral_Aprob AS APROB
INNER JOIN dbo.SST_NivAprobDetAprob AS DET ON RTRIM(APROB.cod_cia) + '*' + RTRIM(APROB.anio_obj_gral) = DET.llave AND APROB.aprobador = DET.cod_emp
INNER JOIN dbo.SST_NivAprob AS NIV ON DET.cod_cia = NIV.cod_cia AND DET.niv_aprob = NIV.niv_aprob
WHERE cod_item = '001'
ORDER BY APROB.cod_cons;
```
