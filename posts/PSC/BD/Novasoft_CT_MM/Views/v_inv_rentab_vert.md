# View: v_inv_rentab_vert

## Usa los objetos:
- [[v_inv_rentabilidad]]

```sql
CREATE VIEW [dbo].[v_inv_rentab_vert]
AS
SELECT cod_item, cod_suc, cod_bod, ano_acu, '01' AS per_acu, veun01 AS vta_und, vepe01 AS vta_pes, cove01 AS cos_ven, utbr01 AS uti_vta, des_item, cod_grupo, nom_gru
FROM v_inv_rentabilidad
UNION ALL
SELECT cod_item, cod_suc, cod_bod, ano_acu, '02' AS per_acu, veun02 AS vta_und, vepe02 AS vta_pes, cove02 AS cos_ven, utbr02 AS uti_vta, des_item, cod_grupo, nom_gru
FROM v_inv_rentabilidad
UNION ALL
SELECT cod_item, cod_suc, cod_bod, ano_acu, '03' AS per_acu, veun03 AS vta_und, vepe03 AS vta_pes, cove03 AS cos_ven, utbr03 AS uti_vta, des_item, cod_grupo, nom_gru
FROM v_inv_rentabilidad
UNION ALL
SELECT cod_item, cod_suc, cod_bod, ano_acu, '04' AS per_acu, veun04 AS vta_und, vepe04 AS vta_pes, cove04 AS cos_ven, utbr04 AS uti_vta, des_item, cod_grupo, nom_gru
FROM v_inv_rentabilidad
UNION ALL
SELECT cod_item, cod_suc, cod_bod, ano_acu, '05' AS per_acu, veun05 AS vta_und, vepe05 AS vta_pes, cove05 AS cos_ven, utbr05 AS uti_vta, des_item, cod_grupo, nom_gru
FROM v_inv_rentabilidad
UNION ALL
SELECT cod_item, cod_suc, cod_bod, ano_acu, '06' AS per_acu, veun06 AS vta_und, vepe06 AS vta_pes, cove06 AS cos_ven, utbr06 AS uti_vta, des_item, cod_grupo, nom_gru
FROM v_inv_rentabilidad
UNION ALL
SELECT cod_item, cod_suc, cod_bod, ano_acu, '07' AS per_acu, veun07 AS vta_und, vepe07 AS vta_pes, cove07 AS cos_ven, utbr07 AS uti_vta, des_item, cod_grupo, nom_gru
FROM v_inv_rentabilidad
UNION ALL
SELECT cod_item, cod_suc, cod_bod, ano_acu, '08' AS per_acu, veun08 AS vta_und, vepe08 AS vta_pes, cove08 AS cos_ven, utbr08 AS uti_vta, des_item, cod_grupo, nom_gru
FROM v_inv_rentabilidad
UNION ALL
SELECT cod_item, cod_suc, cod_bod, ano_acu, '09' AS per_acu, veun09 AS vta_und, vepe09 AS vta_pes, cove09 AS cos_ven, utbr09 AS uti_vta, des_item, cod_grupo, nom_gru
FROM v_inv_rentabilidad
UNION ALL
SELECT cod_item, cod_suc, cod_bod, ano_acu, '10' AS per_acu, veun10 AS vta_und, vepe10 AS vta_pes, cove10 AS cos_ven, utbr10 AS uti_vta, des_item, cod_grupo, nom_gru
FROM v_inv_rentabilidad
UNION ALL
SELECT cod_item, cod_suc, cod_bod, ano_acu, '11' AS per_acu, veun11 AS vta_und, vepe11 AS vta_pes, cove11 AS cos_ven, utbr11 AS uti_vta, des_item, cod_grupo, nom_gru
FROM v_inv_rentabilidad
UNION ALL
SELECT cod_item, cod_suc, cod_bod, ano_acu, '12' AS per_acu, veun12 AS vta_und, vepe12 AS vta_pes, cove12 AS cos_ven, utbr12 AS uti_vta, des_item, cod_grupo, nom_gru
FROM v_inv_rentabilidad


```
