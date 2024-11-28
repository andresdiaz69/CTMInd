# View: v_com_prodxprov

## Usa los objetos:
- [[com_prodxprov]]
- [[inv_items]]

```sql

/*VISTA PARA CONSULTAR LOS ITEMS POR PROVEEDOR SPA2018-0039 */
CREATE VIEW [dbo].[v_com_prodxprov]
AS
SELECT        dbo.com_prodxprov.cod_pro, dbo.com_prodxprov.cod_item, dbo.inv_items.des_item
FROM            dbo.com_prodxprov WITH(NOLOCK) 
	INNER JOIN dbo.inv_items WITH(NOLOCK) ON dbo.com_prodxprov.cod_item = dbo.inv_items.cod_item

```
