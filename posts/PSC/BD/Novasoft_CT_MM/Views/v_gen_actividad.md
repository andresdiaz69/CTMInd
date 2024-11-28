# View: v_gen_actividad

## Usa los objetos:
- [[gen_actividad]]

```sql

CREATE VIEW [dbo].[v_gen_actividad]
AS
SELECT cod_pai, cod_dep, cod_ciu, cod_act, SUBSTRING(nom_act,1,90) AS nom_act, trf_act, val_top 
FROM gen_actividad WITH(NOLOCK);

```
