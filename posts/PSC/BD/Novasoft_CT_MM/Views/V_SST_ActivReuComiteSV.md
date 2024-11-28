# View: V_SST_ActivReuComiteSV

## Usa los objetos:
- [[SST_ActividadReunionComiteSegVial]]

```sql
CREATE VIEW [dbo].[V_SST_ActivReuComiteSV]
AS
SELECT  cod_comite_sv, cons_acta, cod_act_comite_sv, cod_cia
FROM    dbo.SST_ActividadReunionComiteSegVial
WHERE   (ind_plan = 1);

```
