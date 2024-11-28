# View: v_inv_acuven

## Usa los objetos:
- [[cxc_cliente]]
- [[inv_cabdoc]]
- [[inv_cuedoc]]
- [[inv_grupos]]
- [[inv_items]]

```sql

CREATE VIEW [dbo].[v_inv_acuven]
AS
SELECT     dbo.inv_items.des_item, dbo.inv_items.cod_grupo, dbo.inv_cabdoc.ano_doc, dbo.inv_cabdoc.per_doc, dbo.inv_cabdoc.cod_suc, 
                      dbo.inv_cuedoc.bodega, dbo.inv_cuedoc.item, SUM(dbo.inv_cuedoc.cantidad) AS cantidad, SUM(dbo.inv_cuedoc.pre_tot) AS pre_tot, dbo.inv_grupos.nom_gru, dbo.cxc_cliente.nom_cli, 
                      dbo.inv_cabdoc.cliente
FROM         dbo.inv_cabdoc WITH(NOLOCK) 
		INNER JOIN dbo.inv_cuedoc WITH(NOLOCK) ON dbo.inv_cabdoc.ano_doc = dbo.inv_cuedoc.ano_doc AND dbo.inv_cabdoc.num_doc = dbo.inv_cuedoc.num_doc AND 
                      dbo.inv_cabdoc.per_doc = dbo.inv_cuedoc.per_doc AND dbo.inv_cabdoc.tip_doc = dbo.inv_cuedoc.tip_doc 
		INNER JOIN dbo.inv_items WITH(NOLOCK) ON dbo.inv_cuedoc.item = dbo.inv_items.cod_item 
		INNER JOIN dbo.inv_grupos WITH(NOLOCK) ON dbo.inv_items.cod_grupo = dbo.inv_grupos.cod_gru 
		INNER JOIN dbo.cxc_cliente WITH(NOLOCK) ON dbo.inv_cabdoc.cliente = dbo.cxc_cliente.cod_cli
WHERE dbo.inv_cabdoc.tip_doc='010'
GROUP BY dbo.inv_items.des_item, dbo.inv_items.cod_grupo, dbo.inv_cabdoc.ano_doc, dbo.inv_cabdoc.per_doc, dbo.inv_cabdoc.cod_suc, 
                      dbo.inv_cuedoc.bodega, dbo.inv_cuedoc.item, dbo.inv_grupos.nom_gru, dbo.cxc_cliente.nom_cli, 
                      dbo.inv_cabdoc.cliente


```
