# View: V_SST_ActivReuComiteConv

## Usa los objetos:
- [[SST_ActividadReunionComite]]

```sql
CREATE VIEW [dbo].[V_SST_ActivReuComiteConv]
AS
SELECT  cod_comite, cons_acta, cod_act_comite, cod_cia
FROM    dbo.SST_ActividadReunionComite
WHERE   (ind_plan = 1);

```
