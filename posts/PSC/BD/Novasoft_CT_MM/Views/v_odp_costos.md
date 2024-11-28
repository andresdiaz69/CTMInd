# View: v_odp_costos

## Usa los objetos:
- [[inv_items]]
- [[odp_costos]]

```sql
CREATE VIEW dbo.v_odp_costos 
AS
SELECT a.cod_item,b.des_item,a.ano_cos,'01' AS periodo,cosst_01 AS costo
FROM inv_items b INNER JOIN odp_costos a ON a.cod_item=b.cod_item
UNION ALL SELECT a.cod_item,b.des_item,a.ano_cos,'02' AS periodo,cosst_02 AS costo
FROM inv_items b INNER JOIN odp_costos a ON a.cod_item=b.cod_item
UNION ALL SELECT a.cod_item,b.des_item,a.ano_cos,'03' AS periodo,cosst_03 AS costo
FROM inv_items b INNER JOIN odp_costos a ON a.cod_item=b.cod_item
UNION ALL SELECT a.cod_item,b.des_item,a.ano_cos,'04' AS periodo,cosst_04 AS costo
FROM inv_items b INNER JOIN odp_costos a ON a.cod_item=b.cod_item
UNION ALL SELECT a.cod_item,b.des_item,a.ano_cos,'05' AS periodo,cosst_05 AS costo
FROM inv_items b INNER JOIN odp_costos a ON a.cod_item=b.cod_item
UNION ALL SELECT a.cod_item,b.des_item,a.ano_cos,'06' AS periodo,cosst_06 AS costo
FROM inv_items b INNER JOIN odp_costos a ON a.cod_item=b.cod_item
UNION ALL SELECT a.cod_item,b.des_item,a.ano_cos,'07' AS periodo,cosst_07 AS costo
FROM inv_items b INNER JOIN odp_costos a ON a.cod_item=b.cod_item
UNION ALL SELECT a.cod_item,b.des_item,a.ano_cos,'08' AS periodo,cosst_08 AS costo
FROM inv_items b INNER JOIN odp_costos a ON a.cod_item=b.cod_item
UNION ALL SELECT a.cod_item,b.des_item,a.ano_cos,'09' AS periodo,cosst_09 AS costo
FROM inv_items b INNER JOIN odp_costos a ON a.cod_item=b.cod_item
UNION ALL SELECT a.cod_item,b.des_item,a.ano_cos,'10' AS periodo,cosst_10 AS costo
FROM inv_items b INNER JOIN odp_costos a ON a.cod_item=b.cod_item
UNION ALL SELECT a.cod_item,b.des_item,a.ano_cos,'11' AS periodo,cosst_11 AS costo
FROM inv_items b INNER JOIN odp_costos a ON a.cod_item=b.cod_item
UNION ALL SELECT a.cod_item,b.des_item,a.ano_cos,'12' AS periodo,cosst_12 AS costo
FROM inv_items b INNER JOIN odp_costos a ON a.cod_item=b.cod_item

```
