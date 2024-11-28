# View: v_inv_vtacliite

## Usa los objetos:
- [[cxc_cliente]]
- [[inv_cabdoc]]
- [[inv_cuedoc]]
- [[inv_grupos]]
- [[inv_items]]

```sql

CREATE VIEW [dbo].[v_inv_vtacliite]
AS
SELECT cab.ano_doc, cab.per_doc, cab.cliente, cli.nom_cli, cue.item, ite.des_item, ite.cod_grupo, gru.nom_gru, cab.cod_suc, cue.bodega, 
SUM(cue.cantidad) AS cantidad, SUM(cue.pre_tot-cue.mon_des) AS vta_net, SUM(cue.cos_tot) AS cos_ven
FROM inv_cabdoc AS cab WITH(NOLOCK)
	INNER JOIN inv_cuedoc AS cue WITH(NOLOCK) ON cab.ano_doc=cue.ano_doc AND cab.per_doc=cue.per_doc AND cab.tip_doc=cue.tip_doc AND cab.num_doc=cue.num_doc 
	INNER JOIN inv_items AS ite WITH(NOLOCK) ON cue.item=ite.cod_item INNER JOIN inv_grupos gru ON ite.cod_grupo=gru.cod_gru INNER JOIN cxc_cliente cli ON cab.cliente=cli.cod_cli
WHERE cab.tip_doc='010'
GROUP BY cab.ano_doc, cab.per_doc, cab.cliente, cli.nom_cli, cue.item, ite.des_item, ite.cod_grupo, gru.nom_gru, cab.cod_suc, cue.bodega

```
