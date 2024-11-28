# View: v_gth_ConsCiaSolCar

## Usa los objetos:
- [[gen_compania]]
- [[GTH_Requisicion]]

```sql

CREATE VIEW [dbo].[v_gth_ConsCiaSolCar]
AS
SELECT        R.cod_cia, CP.nom_cia, R.fec_sol
FROM            dbo.GTH_Requisicion AS R INNER JOIN
                         dbo.gen_compania AS CP ON R.cod_cia = CP.cod_cia


```
