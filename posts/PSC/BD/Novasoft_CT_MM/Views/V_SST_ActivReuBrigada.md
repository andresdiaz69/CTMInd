# View: V_SST_ActivReuBrigada

## Usa los objetos:
- [[SST_ActividadReunionBrigada]]

```sql
CREATE VIEW [dbo].[V_SST_ActivReuBrigada]
AS
SELECT  cod_brigada, cons_acta, cod_act_brig, cod_cia
FROM    dbo.SST_ActividadReunionBrigada
WHERE   (ind_plan = 1);

```
