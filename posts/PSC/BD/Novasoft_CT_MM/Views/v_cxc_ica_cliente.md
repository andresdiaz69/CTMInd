# View: v_cxc_ica_cliente

## Usa los objetos:
- [[cxc_succli]]
- [[gen_actividad]]

```sql

-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_cxc_ica_cliente]
AS
SELECT scc.cod_cli,scc.suc_cli,act.cod_pai,act.cod_dep,act.cod_ciu,act.cod_act,act.nom_act,act.trf_act,act.val_top
FROM cxc_succli AS scc  WITH (NOLOCK) 
		INNER JOIN gen_actividad AS act  WITH (NOLOCK) ON scc.cod_pai=act.cod_pai AND scc.cod_dep=act.cod_dep AND scc.cod_ciu=act.cod_ciu

```
