# View: v_inv_serial

## Usa los objetos:
- [[inv_items]]
- [[inv_seriales]]

```sql

CREATE VIEW [dbo].[v_inv_serial]
AS

SELECT '0' AS cod_serie,'0' AS cod_item,'No Aplica' AS des_item,'0' AS cod_bodega
UNION ALL
SELECT ser.cod_serie,ser.cod_item,ite.des_item,ser.cod_bodega
FROM inv_seriales AS ser WITH(NOLOCK)
	INNER JOIN inv_items AS ite WITH(NOLOCK) ON ser.cod_item=ite.cod_item
WHERE estado=1;

```
