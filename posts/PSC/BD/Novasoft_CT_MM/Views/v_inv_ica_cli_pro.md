# View: v_inv_ica_cli_pro

## Usa los objetos:
- [[cxc_succli]]
- [[cxp_sucprov]]
- [[gen_actividad]]

```sql

CREATE VIEW [dbo].[v_inv_ica_cli_pro]
AS
SELECT scc.cod_cli AS codigo,scc.suc_cli,act.cod_pai,act.cod_dep,act.cod_ciu,act.cod_act,act.nom_act,act.trf_act,act.val_top
FROM cxc_succli AS scc WITH(NOLOCK) 
		INNER JOIN gen_actividad AS act WITH(NOLOCK) ON scc.cod_pai=act.cod_pai AND scc.cod_dep=act.cod_dep AND scc.cod_ciu=act.cod_ciu
UNION ALL
SELECT scc.cod_pro AS codigo,scc.suc_pro,act.cod_pai,act.cod_dep,act.cod_ciu,act.cod_act,act.nom_act,act.trf_act,act.val_top
FROM cxp_sucprov AS scc WITH(NOLOCK) 
		INNER JOIN gen_actividad AS act WITH(NOLOCK) ON scc.cod_pai=act.cod_pai AND scc.cod_dep=act.cod_dep AND scc.cod_ciu=act.cod_ciu

```
