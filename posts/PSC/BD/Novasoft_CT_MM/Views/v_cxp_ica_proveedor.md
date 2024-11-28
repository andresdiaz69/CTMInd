# View: v_cxp_ica_proveedor

## Usa los objetos:
- [[cxp_sucprov]]
- [[gen_actividad]]

```sql

-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_cxp_ica_proveedor]
AS
SELECT scp.cod_pro,scp.suc_pro,act.cod_pai,act.cod_dep,act.cod_ciu,act.cod_act,act.nom_act,act.trf_act,act.val_top
FROM cxp_sucprov AS scp WITH (NOLOCK) 
		INNER JOIN gen_actividad AS act WITH (NOLOCK) ON scp.cod_pai=act.cod_pai AND scp.cod_dep=act.cod_dep AND scp.cod_ciu=act.cod_ciu

```
