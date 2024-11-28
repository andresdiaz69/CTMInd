# View: V_SST_AnioAusInd

## Usa los objetos:
- [[fn_rhh_Hislab_NumSec]]
- [[rhh_ausentismo]]
- [[rhh_hislab]]

```sql
CREATE VIEW [dbo].[V_SST_AnioAusInd]
AS

SELECT  H.cod_cia, YEAR(A.fec_ini) AS Anio
FROM    dbo.rhh_ausentismo AS A
INNER JOIN dbo.rhh_hislab AS H ON A.cod_emp = H.cod_emp
             AND H.num_sec = dbo.fn_rhh_Hislab_NumSec(A.cod_emp, A.fec_ini, 0, 0)
GROUP BY H.cod_cia, YEAR(A.fec_ini)

```
