# View: v_inv_acumen

## Usa los objetos:
- [[inv_acum]]
- [[inv_items]]

```sql

CREATE VIEW [dbo].[v_inv_acumen]
AS
SELECT     '01' AS Periodo, dbo.inv_acum.ano_acu, dbo.inv_acum.cod_item, dbo.inv_items.des_item, dbo.inv_items.cod_grupo, 
                      dbo.inv_items.cod_subgrupo, dbo.inv_acum.cod_bod, dbo.inv_acum.cod_suc, dbo.inv_acum.ttun00 AS salun_ant, 
                      dbo.inv_acum.enun01 AS ent_uni, dbo.inv_acum.saun01 AS sal_uni, dbo.inv_acum.ttun01 AS tot_uni, dbo.inv_acum.tnpe00 AS salpe_ant, 
                      dbo.inv_acum.enpe01 AS ent_pes, dbo.inv_acum.sape01 AS sal_pes, dbo.inv_acum.tnpe01 AS tot_pes, dbo.inv_acum.ttpe00 AS sal_antaju, 
                      dbo.inv_acum.ajpe01 AS ent_paju, dbo.inv_acum.ajps01 AS sal_paju, dbo.inv_acum.ttpe01 AS tot_paju, dbo.inv_acum.tnex00 AS salex_ant, 
                      dbo.inv_acum.enex01 AS ent_ext, dbo.inv_acum.saex01 AS sal_ext, dbo.inv_acum.tnex01 AS tot_ext, dbo.inv_acum.veun01 AS ven_uni, 
                      dbo.inv_acum.vepe01 AS ven_pes, dbo.inv_acum.cove01 AS cov_pes, dbo.inv_acum.utbr01 AS uti_pes, dbo.inv_acum.veex01 AS ven_ext, 
                      dbo.inv_acum.coex01 AS cov_ext, dbo.inv_acum.utex01 AS uti_ext
FROM         dbo.inv_acum WITH(NOLOCK) 
	INNER JOIN dbo.inv_items WITH(NOLOCK) ON dbo.inv_acum.cod_item = dbo.inv_items.cod_item
UNION ALL
SELECT     '02' AS Periodo, dbo.inv_acum.ano_acu, dbo.inv_acum.cod_item, dbo.inv_items.des_item, dbo.inv_items.cod_grupo, 
                      dbo.inv_items.cod_subgrupo, dbo.inv_acum.cod_bod, dbo.inv_acum.cod_suc, dbo.inv_acum.ttun01 AS salun_ant, 
                      dbo.inv_acum.enun02 AS ent_uni, dbo.inv_acum.saun02 AS sal_uni, dbo.inv_acum.ttun02 AS tot_uni, dbo.inv_acum.tnpe01 AS salpe_ant, 
                      dbo.inv_acum.enpe02 AS ent_pes, dbo.inv_acum.sape02 AS sal_pes, dbo.inv_acum.tnpe02 AS tot_pes, dbo.inv_acum.ttpe01 AS sal_antaju, 
                      dbo.inv_acum.ajpe02 AS ent_paju, dbo.inv_acum.ajps02 AS sal_paju, dbo.inv_acum.ttpe02 AS tot_paju, dbo.inv_acum.tnex01 AS salex_ant, 
                      dbo.inv_acum.enex02 AS ent_ext, dbo.inv_acum.saex02 AS sal_ext, dbo.inv_acum.tnex02 AS tot_ext, dbo.inv_acum.veun02 AS ven_uni, 
                      dbo.inv_acum.vepe02 AS ven_pes, dbo.inv_acum.cove02 AS cov_pes, dbo.inv_acum.utbr02 AS uti_pes, dbo.inv_acum.veex02 AS ven_ext, 
                      dbo.inv_acum.coex02 AS cov_ext, dbo.inv_acum.utex02 AS uti_ext
FROM         dbo.inv_acum WITH(NOLOCK) 
	INNER JOIN dbo.inv_items WITH(NOLOCK) ON dbo.inv_acum.cod_item = dbo.inv_items.cod_item
UNION ALL
SELECT     '03' AS Periodo, dbo.inv_acum.ano_acu, dbo.inv_acum.cod_item, dbo.inv_items.des_item, dbo.inv_items.cod_grupo, 
                      dbo.inv_items.cod_subgrupo, dbo.inv_acum.cod_bod, dbo.inv_acum.cod_suc, dbo.inv_acum.ttun02 AS salun_ant, 
                      dbo.inv_acum.enun03 AS ent_uni, dbo.inv_acum.saun03 AS sal_uni, dbo.inv_acum.ttun03 AS tot_uni, dbo.inv_acum.tnpe02 AS salpe_ant, 
                      dbo.inv_acum.enpe03 AS ent_pes, dbo.inv_acum.sape03 AS sal_pes, dbo.inv_acum.tnpe03 AS tot_pes, dbo.inv_acum.ttpe02 AS sal_antaju, 
                      dbo.inv_acum.ajpe03 AS ent_paju, dbo.inv_acum.ajps03 AS sal_paju, dbo.inv_acum.ttpe03 AS tot_paju, dbo.inv_acum.tnex02 AS salex_ant, 
                      dbo.inv_acum.enex03 AS ent_ext, dbo.inv_acum.saex03 AS sal_ext, dbo.inv_acum.tnex03 AS tot_ext, dbo.inv_acum.veun03 AS ven_uni, 
                      dbo.inv_acum.vepe03 AS ven_pes, dbo.inv_acum.cove03 AS cov_pes, dbo.inv_acum.utbr03 AS uti_pes, dbo.inv_acum.veex03 AS ven_ext, 
                      dbo.inv_acum.coex03 AS cov_ext, dbo.inv_acum.utex03 AS uti_ext
FROM         dbo.inv_acum WITH(NOLOCK)
	INNER JOIN dbo.inv_items WITH(NOLOCK) ON dbo.inv_acum.cod_item = dbo.inv_items.cod_item
UNION ALL
SELECT     '04' AS Periodo, dbo.inv_acum.ano_acu, dbo.inv_acum.cod_item, dbo.inv_items.des_item, dbo.inv_items.cod_grupo, 
                      dbo.inv_items.cod_subgrupo, dbo.inv_acum.cod_bod, dbo.inv_acum.cod_suc, dbo.inv_acum.ttun03 AS salun_ant, 
                      dbo.inv_acum.enun04 AS ent_uni, dbo.inv_acum.saun04 AS sal_uni, dbo.inv_acum.ttun04 AS tot_uni, dbo.inv_acum.tnpe03 AS salpe_ant, 
                      dbo.inv_acum.enpe04 AS ent_pes, dbo.inv_acum.sape04 AS sal_pes, dbo.inv_acum.tnpe04 AS tot_pes, dbo.inv_acum.ttpe03 AS sal_antaju, 
                      dbo.inv_acum.ajpe04 AS ent_paju, dbo.inv_acum.ajps04 AS sal_paju, dbo.inv_acum.ttpe04 AS tot_paju, dbo.inv_acum.tnex03 AS salex_ant, 
                      dbo.inv_acum.enex04 AS ent_ext, dbo.inv_acum.saex04 AS sal_ext, dbo.inv_acum.tnex04 AS tot_ext, dbo.inv_acum.veun04 AS ven_uni, 
                      dbo.inv_acum.vepe04 AS ven_pes, dbo.inv_acum.cove04 AS cov_pes, dbo.inv_acum.utbr04 AS uti_pes, dbo.inv_acum.veex04 AS ven_ext, 
                      dbo.inv_acum.coex04 AS cov_ext, dbo.inv_acum.utex04 AS uti_ext
FROM         dbo.inv_acum  WITH(NOLOCK) 
	INNER JOIN dbo.inv_items WITH(NOLOCK) ON dbo.inv_acum.cod_item = dbo.inv_items.cod_item
UNION ALL
SELECT     '05' AS Periodo, dbo.inv_acum.ano_acu, dbo.inv_acum.cod_item, dbo.inv_items.des_item, dbo.inv_items.cod_grupo, 
                      dbo.inv_items.cod_subgrupo, dbo.inv_acum.cod_bod, dbo.inv_acum.cod_suc, dbo.inv_acum.ttun04 AS salun_ant, 
                      dbo.inv_acum.enun05 AS ent_uni, dbo.inv_acum.saun05 AS sal_uni, dbo.inv_acum.ttun05 AS tot_uni, dbo.inv_acum.tnpe04 AS salpe_ant, 
                      dbo.inv_acum.enpe05 AS ent_pes, dbo.inv_acum.sape05 AS sal_pes, dbo.inv_acum.tnpe05 AS tot_pes, dbo.inv_acum.ttpe04 AS sal_antaju, 
                      dbo.inv_acum.ajpe05 AS ent_paju, dbo.inv_acum.ajps05 AS sal_paju, dbo.inv_acum.ttpe05 AS tot_paju, dbo.inv_acum.tnex04 AS salex_ant, 
                      dbo.inv_acum.enex05 AS ent_ext, dbo.inv_acum.saex05 AS sal_ext, dbo.inv_acum.tnex05 AS tot_ext, dbo.inv_acum.veun05 AS ven_uni, 
                      dbo.inv_acum.vepe05 AS ven_pes, dbo.inv_acum.cove05 AS cov_pes, dbo.inv_acum.utbr05 AS uti_pes, dbo.inv_acum.veex05 AS ven_ext, 
                      dbo.inv_acum.coex05 AS cov_ext, dbo.inv_acum.utex05 AS uti_ext
FROM         dbo.inv_acum WITH(NOLOCK) 
	INNER JOIN dbo.inv_items WITH(NOLOCK) ON dbo.inv_acum.cod_item = dbo.inv_items.cod_item
UNION ALL
SELECT     '06' AS Periodo, dbo.inv_acum.ano_acu, dbo.inv_acum.cod_item, dbo.inv_items.des_item, dbo.inv_items.cod_grupo, 
                      dbo.inv_items.cod_subgrupo, dbo.inv_acum.cod_bod, dbo.inv_acum.cod_suc, dbo.inv_acum.ttun05 AS salun_ant, 
                      dbo.inv_acum.enun06 AS ent_uni, dbo.inv_acum.saun06 AS sal_uni, dbo.inv_acum.ttun06 AS tot_uni, dbo.inv_acum.tnpe05 AS salpe_ant, 
                      dbo.inv_acum.enpe06 AS ent_pes, dbo.inv_acum.sape06 AS sal_pes, dbo.inv_acum.tnpe06 AS tot_pes, dbo.inv_acum.ttpe05 AS sal_antaju, 
                      dbo.inv_acum.ajpe06 AS ent_paju, dbo.inv_acum.ajps06 AS sal_paju, dbo.inv_acum.ttpe06 AS tot_paju, dbo.inv_acum.tnex05 AS salex_ant, 
                      dbo.inv_acum.enex06 AS ent_ext, dbo.inv_acum.saex06 AS sal_ext, dbo.inv_acum.tnex06 AS tot_ext, dbo.inv_acum.veun06 AS ven_uni, 
                      dbo.inv_acum.vepe06 AS ven_pes, dbo.inv_acum.cove06 AS cov_pes, dbo.inv_acum.utbr06 AS uti_pes, dbo.inv_acum.veex06 AS ven_ext, 
                      dbo.inv_acum.coex06 AS cov_ext, dbo.inv_acum.utex06 AS uti_ext
FROM         dbo.inv_acum WITH(NOLOCK) 
	INNER JOIN dbo.inv_items WITH(NOLOCK) ON dbo.inv_acum.cod_item = dbo.inv_items.cod_item
UNION ALL
SELECT     '07' AS Periodo, dbo.inv_acum.ano_acu, dbo.inv_acum.cod_item, dbo.inv_items.des_item, dbo.inv_items.cod_grupo, 
                      dbo.inv_items.cod_subgrupo, dbo.inv_acum.cod_bod, dbo.inv_acum.cod_suc, dbo.inv_acum.ttun06 AS salun_ant, 
                      dbo.inv_acum.enun07 AS ent_uni, dbo.inv_acum.saun07 AS sal_uni, dbo.inv_acum.ttun07 AS tot_uni, dbo.inv_acum.tnpe06 AS salpe_ant, 
                      dbo.inv_acum.enpe07 AS ent_pes, dbo.inv_acum.sape07 AS sal_pes, dbo.inv_acum.tnpe07 AS tot_pes, dbo.inv_acum.ttpe06 AS sal_antaju, 
                      dbo.inv_acum.ajpe07 AS ent_paju, dbo.inv_acum.ajps07 AS sal_paju, dbo.inv_acum.ttpe07 AS tot_paju, dbo.inv_acum.tnex06 AS salex_ant, 
                      dbo.inv_acum.enex07 AS ent_ext, dbo.inv_acum.saex07 AS sal_ext, dbo.inv_acum.tnex07 AS tot_ext, dbo.inv_acum.veun07 AS ven_uni, 
                      dbo.inv_acum.vepe07 AS ven_pes, dbo.inv_acum.cove07 AS cov_pes, dbo.inv_acum.utbr07 AS uti_pes, dbo.inv_acum.veex07 AS ven_ext, 
                      dbo.inv_acum.coex07 AS cov_ext, dbo.inv_acum.utex07 AS uti_ext
FROM         dbo.inv_acum WITH(NOLOCK) 
	INNER JOIN dbo.inv_items WITH(NOLOCK) ON dbo.inv_acum.cod_item = dbo.inv_items.cod_item
UNION ALL
SELECT     '08' AS Periodo, dbo.inv_acum.ano_acu, dbo.inv_acum.cod_item, dbo.inv_items.des_item, dbo.inv_items.cod_grupo, 
                      dbo.inv_items.cod_subgrupo, dbo.inv_acum.cod_bod, dbo.inv_acum.cod_suc, dbo.inv_acum.ttun07 AS salun_ant, 
                      dbo.inv_acum.enun08 AS ent_uni, dbo.inv_acum.saun08 AS sal_uni, dbo.inv_acum.ttun08 AS tot_uni, dbo.inv_acum.tnpe07 AS salpe_ant, 
                      dbo.inv_acum.enpe08 AS ent_pes, dbo.inv_acum.sape08 AS sal_pes, dbo.inv_acum.tnpe08 AS tot_pes, dbo.inv_acum.ttpe07 AS sal_antaju, 
                      dbo.inv_acum.ajpe08 AS ent_paju, dbo.inv_acum.ajps08 AS sal_paju, dbo.inv_acum.ttpe08 AS tot_paju, dbo.inv_acum.tnex07 AS salex_ant, 
                      dbo.inv_acum.enex08 AS ent_ext, dbo.inv_acum.saex08 AS sal_ext, dbo.inv_acum.tnex08 AS tot_ext, dbo.inv_acum.veun08 AS ven_uni, 
                      dbo.inv_acum.vepe08 AS ven_pes, dbo.inv_acum.cove08 AS cov_pes, dbo.inv_acum.utbr08 AS uti_pes, dbo.inv_acum.veex08 AS ven_ext, 
                      dbo.inv_acum.coex08 AS cov_ext, dbo.inv_acum.utex08 AS uti_ext
FROM         dbo.inv_acum WITH(NOLOCK) 
	INNER JOIN dbo.inv_items WITH(NOLOCK) ON dbo.inv_acum.cod_item = dbo.inv_items.cod_item
UNION ALL
SELECT     '09' AS Periodo, dbo.inv_acum.ano_acu, dbo.inv_acum.cod_item, dbo.inv_items.des_item, dbo.inv_items.cod_grupo, 
                      dbo.inv_items.cod_subgrupo, dbo.inv_acum.cod_bod, dbo.inv_acum.cod_suc, dbo.inv_acum.ttun08 AS salun_ant, 
                      dbo.inv_acum.enun09 AS ent_uni, dbo.inv_acum.saun09 AS sal_uni, dbo.inv_acum.ttun09 AS tot_uni, dbo.inv_acum.tnpe08 AS salpe_ant, 
                      dbo.inv_acum.enpe09 AS ent_pes, dbo.inv_acum.sape09 AS sal_pes, dbo.inv_acum.tnpe09 AS tot_pes, dbo.inv_acum.ttpe08 AS sal_antaju, 
                      dbo.inv_acum.ajpe09 AS ent_paju, dbo.inv_acum.ajps09 AS sal_paju, dbo.inv_acum.ttpe09 AS tot_paju, dbo.inv_acum.tnex08 AS salex_ant, 
                      dbo.inv_acum.enex09 AS ent_ext, dbo.inv_acum.saex09 AS sal_ext, dbo.inv_acum.tnex09 AS tot_ext, dbo.inv_acum.veun09 AS ven_uni, 
                      dbo.inv_acum.vepe09 AS ven_pes, dbo.inv_acum.cove09 AS cov_pes, dbo.inv_acum.utbr09 AS uti_pes, dbo.inv_acum.veex09 AS ven_ext, 
                      dbo.inv_acum.coex09 AS cov_ext, dbo.inv_acum.utex09 AS uti_ext
FROM         dbo.inv_acum WITH(NOLOCK) 
	INNER JOIN dbo.inv_items WITH(NOLOCK) ON dbo.inv_acum.cod_item = dbo.inv_items.cod_item
UNION ALL
SELECT     '10' AS Periodo, dbo.inv_acum.ano_acu, dbo.inv_acum.cod_item, dbo.inv_items.des_item, dbo.inv_items.cod_grupo, 
                      dbo.inv_items.cod_subgrupo, dbo.inv_acum.cod_bod, dbo.inv_acum.cod_suc, dbo.inv_acum.ttun09 AS salun_ant, 
                      dbo.inv_acum.enun10 AS ent_uni, dbo.inv_acum.saun10 AS sal_uni, dbo.inv_acum.ttun10 AS tot_uni, dbo.inv_acum.tnpe09 AS salpe_ant, 
                      dbo.inv_acum.enpe10 AS ent_pes, dbo.inv_acum.sape10 AS sal_pes, dbo.inv_acum.tnpe10 AS tot_pes, dbo.inv_acum.ttpe09 AS sal_antaju, 
                      dbo.inv_acum.ajpe10 AS ent_paju, dbo.inv_acum.ajps10 AS sal_paju, dbo.inv_acum.ttpe10 AS tot_paju, dbo.inv_acum.tnex09 AS salex_ant, 
                      dbo.inv_acum.enex10 AS ent_ext, dbo.inv_acum.saex10 AS sal_ext, dbo.inv_acum.tnex10 AS tot_ext, dbo.inv_acum.veun10 AS ven_uni, 
                      dbo.inv_acum.vepe10 AS ven_pes, dbo.inv_acum.cove10 AS cov_pes, dbo.inv_acum.utbr10 AS uti_pes, dbo.inv_acum.veex10 AS ven_ext, 
                      dbo.inv_acum.coex10 AS cov_ext, dbo.inv_acum.utex10 AS uti_ext
FROM         dbo.inv_acum WITH(NOLOCK) 
	INNER JOIN dbo.inv_items WITH(NOLOCK) ON dbo.inv_acum.cod_item = dbo.inv_items.cod_item
UNION ALL
SELECT     '11' AS Periodo, dbo.inv_acum.ano_acu, dbo.inv_acum.cod_item, dbo.inv_items.des_item, dbo.inv_items.cod_grupo, 
                      dbo.inv_items.cod_subgrupo, dbo.inv_acum.cod_bod, dbo.inv_acum.cod_suc, dbo.inv_acum.ttun10 AS salun_ant, 
                      dbo.inv_acum.enun11 AS ent_uni, dbo.inv_acum.saun11 AS sal_uni, dbo.inv_acum.ttun11 AS tot_uni, dbo.inv_acum.tnpe10 AS salpe_ant, 
                      dbo.inv_acum.enpe11 AS ent_pes, dbo.inv_acum.sape11 AS sal_pes, dbo.inv_acum.tnpe11 AS tot_pes, dbo.inv_acum.ttpe10 AS sal_antaju, 
                      dbo.inv_acum.ajpe11 AS ent_paju, dbo.inv_acum.ajps11 AS sal_paju, dbo.inv_acum.ttpe11 AS tot_paju, dbo.inv_acum.tnex10 AS salex_ant, 
                      dbo.inv_acum.enex11 AS ent_ext, dbo.inv_acum.saex11 AS sal_ext, dbo.inv_acum.tnex11 AS tot_ext, dbo.inv_acum.veun11 AS ven_uni, 
                      dbo.inv_acum.vepe11 AS ven_pes, dbo.inv_acum.cove11 AS cov_pes, dbo.inv_acum.utbr11 AS uti_pes, dbo.inv_acum.veex11 AS ven_ext, 
                      dbo.inv_acum.coex11 AS cov_ext, dbo.inv_acum.utex11 AS uti_ext
FROM         dbo.inv_acum WITH(NOLOCK) 
	INNER JOIN dbo.inv_items WITH(NOLOCK) ON dbo.inv_acum.cod_item = dbo.inv_items.cod_item
UNION ALL
SELECT     '12' AS Periodo, dbo.inv_acum.ano_acu, dbo.inv_acum.cod_item, dbo.inv_items.des_item, dbo.inv_items.cod_grupo, 
                      dbo.inv_items.cod_subgrupo, dbo.inv_acum.cod_bod, dbo.inv_acum.cod_suc, dbo.inv_acum.ttun11 AS salun_ant, 
                      dbo.inv_acum.enun12 AS ent_uni, dbo.inv_acum.saun12 AS sal_uni, dbo.inv_acum.ttun12 AS tot_uni, dbo.inv_acum.tnpe11 AS salpe_ant, 
                      dbo.inv_acum.enpe12 AS ent_pes, dbo.inv_acum.sape12 AS sal_pes, dbo.inv_acum.tnpe12 AS tot_pes, dbo.inv_acum.ttpe11 AS sal_antaju, 
                      dbo.inv_acum.ajpe12 AS ent_paju, dbo.inv_acum.ajps12 AS sal_paju, dbo.inv_acum.ttpe12 AS tot_paju, dbo.inv_acum.tnex11 AS salex_ant, 
                      dbo.inv_acum.enex12 AS ent_ext, dbo.inv_acum.saex12 AS sal_ext, dbo.inv_acum.tnex12 AS tot_ext, dbo.inv_acum.veun12 AS ven_uni, 
                      dbo.inv_acum.vepe12 AS ven_pes, dbo.inv_acum.cove12 AS cov_pes, dbo.inv_acum.utbr12 AS uti_pes, dbo.inv_acum.veex12 AS ven_ext, 
                      dbo.inv_acum.coex12 AS cov_ext, dbo.inv_acum.utex12 AS uti_ext
FROM         dbo.inv_acum WITH(NOLOCK) 
	INNER JOIN dbo.inv_items WITH(NOLOCK) ON dbo.inv_acum.cod_item = dbo.inv_items.cod_item

```
