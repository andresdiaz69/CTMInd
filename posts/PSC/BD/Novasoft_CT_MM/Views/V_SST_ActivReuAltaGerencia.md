# View: V_SST_ActivReuAltaGerencia

## Usa los objetos:
- [[SST_ActividadReunionAltaGerencia]]

```sql
CREATE VIEW [dbo].[V_SST_ActivReuAltaGerencia]
AS
SELECT  cod_alta_gerencia AS cod_alta_ger, cons_acta, cod_act_altagerencia AS cod_act_altager, cod_cia
FROM    dbo.SST_ActividadReunionAltaGerencia
WHERE   (ind_plan = 1);

```
