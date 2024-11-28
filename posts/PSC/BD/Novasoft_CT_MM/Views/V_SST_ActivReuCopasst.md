# View: V_SST_ActivReuCopasst

## Usa los objetos:
- [[SST_ActividadReunionCopasst]]

```sql
CREATE VIEW [dbo].[V_SST_ActivReuCopasst]
AS
SELECT  cod_copasst, cons_acta, cod_act_copasst, cod_cia
FROM    dbo.SST_ActividadReunionCopasst
WHERE  (ind_plan = 1);

```
