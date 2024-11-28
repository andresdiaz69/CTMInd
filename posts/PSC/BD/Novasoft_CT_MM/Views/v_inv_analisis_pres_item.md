# View: v_inv_analisis_pres_item

## Usa los objetos:
- [[inv_preitem]]
- [[v_inv_rentab_vert]]

```sql

CREATE VIEW [dbo].[v_inv_analisis_pres_item]
AS
SELECT vis.ano_acu, vis.per_acu, vis.cod_item, des_item, cod_grupo, nom_gru, ISNULL(SUM(pre_uni),0) AS pre_uni, ISNULL(SUM(pre_val),0) AS pre_val,
SUM(vta_und) AS vta_und, SUM(vta_pes) AS vta_pes, CASE WHEN ISNULL(SUM(pre_uni),0)<>0 THEN SUM(vta_und)/SUM(pre_uni)*100 ELSE 0 END AS eje_und, 
SUM(vta_und)-ISNULL(SUM(pre_uni),0) AS dif_und, CASE WHEN ISNULL(SUM(pre_val),0)<>0 THEN SUM(vta_pes)/SUM(pre_val)*100 ELSE 0 END AS eje_val, SUM(vta_pes)-ISNULL(SUM(pre_val),0) AS dif_val
FROM inv_preitem AS pre WITH(NOLOCK)
	RIGHT OUTER JOIN v_inv_rentab_vert AS vis WITH(NOLOCK) ON pre.ano_acu=vis.ano_acu AND pre.per_acu=vis.per_acu AND pre.cod_item=vis.cod_item AND pre.cod_suc=vis.cod_suc AND pre.cod_bod=vis.cod_bod
GROUP BY vis.ano_acu, vis.per_acu, vis.cod_item, des_item, cod_grupo, nom_gru

```
