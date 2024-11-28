# View: v_opr_item_precli

## Usa los objetos:
- [[cxc_cliente]]
- [[fac_precli]]
- [[inv_items]]

```sql

/*VISTA QUE MUESTRA LOS PRECIOS DE CLIENTES POR ITEM*/
CREATE VIEW [dbo].[v_opr_item_precli] 
AS
	SELECT ite.cod_item,ite.des_item,'0' AS precio,ite.ind_opr,cli.cod_cli
	FROM inv_items AS ite WITH (NOLOCK)
		RIGHT JOIN cxc_cliente AS cli WITH (NOLOCK) ON ite.cod_item<>'0'
	WHERE ite.ind_opr<>'0'
		AND RTRIM(ite.cod_item)+RTRIM(cli.cod_cli) NOT IN (SELECT RTRIM(cod_item)+RTRIM(cod_cli) FROM fac_precli)

	UNION ALL

	SELECT ite.cod_item,ite.des_item,ISNULL(pre.pre_item,'0') AS precio,ite.ind_opr,ISNULL(pre.cod_cli,'0') AS cod_cli
	FROM inv_items AS ite WITH (NOLOCK)
		INNER JOIN fac_precli AS pre WITH (NOLOCK) ON pre.cod_item=ite.cod_item
	WHERE ite.ind_opr<>'0';

```
