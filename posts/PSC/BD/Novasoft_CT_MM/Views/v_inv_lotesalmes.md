# View: v_inv_lotesalmes

## Usa los objetos:
- [[cxp_provee]]
- [[inv_items]]
- [[inv_lotes]]

```sql

CREATE VIEW [dbo].[v_inv_lotesalmes] AS
SELECT     '01' AS Periodo, dbo.inv_lotes.ano_acu, dbo.inv_lotes.cod_item, dbo.inv_items.des_item, dbo.inv_items.cod_grupo, dbo.inv_items.cod_subgrupo, 
                      dbo.inv_lotes.cod_bod, dbo.inv_lotes.cod_suc, dbo.inv_lotes.ttun00 AS salun_ant, dbo.inv_lotes.enun01 AS ent_uni, 
                      dbo.inv_lotes.saun01 AS sal_uni, dbo.inv_lotes.ttun01 AS tot_uni, dbo.inv_lotes.tnpe00 AS salpe_ant, dbo.inv_lotes.enpe01 AS ent_pes, 
                      dbo.inv_lotes.sape01 AS sal_pes, dbo.inv_lotes.tnpe01 AS tot_pes, dbo.inv_lotes.ttpe00 AS sal_antaju, dbo.inv_lotes.ajpe01 AS ent_paju, 
                      dbo.inv_lotes.ajps01 AS sal_paju, dbo.inv_lotes.ttpe01 AS tot_paju, dbo.inv_lotes.tnex00 AS salex_ant, dbo.inv_lotes.enex01 AS ent_ext, 
                      dbo.inv_lotes.saex01 AS sal_ext, dbo.inv_lotes.tnex01 AS tot_ext, dbo.inv_lotes.veun01 AS ven_uni, dbo.inv_lotes.vepe01 AS ven_pes, 
                      dbo.inv_lotes.cove01 AS cov_pes, dbo.inv_lotes.utbr01 AS uti_pes, dbo.inv_lotes.veex01 AS ven_ext, dbo.inv_lotes.coex01 AS cov_ext, 
                      dbo.inv_lotes.utex01 AS uti_ext, dbo.inv_lotes.cod_pro, dbo.inv_lotes.fec_com, dbo.inv_lotes.fec_ven, dbo.inv_lotes.cod_lote, dbo.cxp_provee.rso,
					  dbo.inv_lotes.est_lote,dbo.inv_lotes.conteo1,dbo.inv_lotes.conteo2,dbo.inv_lotes.conteo3
FROM         dbo.inv_lotes WITH(NOLOCK)
	INNER JOIN dbo.inv_items WITH(NOLOCK) ON dbo.inv_lotes.cod_item = dbo.inv_items.cod_item INNER JOIN dbo.cxp_provee ON dbo.inv_lotes.cod_pro = dbo.cxp_provee.provee
UNION ALL
SELECT     '02' AS Periodo, dbo.inv_lotes.ano_acu, dbo.inv_lotes.cod_item, dbo.inv_items.des_item, dbo.inv_items.cod_grupo, dbo.inv_items.cod_subgrupo, 
                      dbo.inv_lotes.cod_bod, dbo.inv_lotes.cod_suc, dbo.inv_lotes.ttun01 AS salun_ant, dbo.inv_lotes.enun02 AS ent_uni, 
                      dbo.inv_lotes.saun02 AS sal_uni, dbo.inv_lotes.ttun02 AS tot_uni, dbo.inv_lotes.tnpe01 AS salpe_ant, dbo.inv_lotes.enpe02 AS ent_pes, 
                      dbo.inv_lotes.sape02 AS sal_pes, dbo.inv_lotes.tnpe02 AS tot_pes, dbo.inv_lotes.ttpe01 AS sal_antaju, dbo.inv_lotes.ajpe02 AS ent_paju, 
                      dbo.inv_lotes.ajps02 AS sal_paju, dbo.inv_lotes.ttpe02 AS tot_paju, dbo.inv_lotes.tnex01 AS salex_ant, dbo.inv_lotes.enex02 AS ent_ext, 
                      dbo.inv_lotes.saex02 AS sal_ext, dbo.inv_lotes.tnex02 AS tot_ext, dbo.inv_lotes.veun02 AS ven_uni, dbo.inv_lotes.vepe02 AS ven_pes, 
                      dbo.inv_lotes.cove02 AS cov_pes, dbo.inv_lotes.utbr02 AS uti_pes, dbo.inv_lotes.veex02 AS ven_ext, dbo.inv_lotes.coex02 AS cov_ext, 
                      dbo.inv_lotes.utex02 AS uti_ext, dbo.inv_lotes.cod_pro, dbo.inv_lotes.fec_com, dbo.inv_lotes.fec_ven, dbo.inv_lotes.cod_lote, dbo.cxp_provee.rso,
					  dbo.inv_lotes.est_lote,dbo.inv_lotes.conteo1,dbo.inv_lotes.conteo2,dbo.inv_lotes.conteo3
FROM         dbo.inv_lotes WITH(NOLOCK) 
	INNER JOIN dbo.inv_items WITH(NOLOCK) ON dbo.inv_lotes.cod_item = dbo.inv_items.cod_item INNER JOIN dbo.cxp_provee ON dbo.inv_lotes.cod_pro = dbo.cxp_provee.provee
UNION ALL
SELECT     '03' AS Periodo, dbo.inv_lotes.ano_acu, dbo.inv_lotes.cod_item, dbo.inv_items.des_item, dbo.inv_items.cod_grupo, dbo.inv_items.cod_subgrupo, 
                      dbo.inv_lotes.cod_bod, dbo.inv_lotes.cod_suc, dbo.inv_lotes.ttun02 AS salun_ant, dbo.inv_lotes.enun03 AS ent_uni, 
                      dbo.inv_lotes.saun03 AS sal_uni, dbo.inv_lotes.ttun03 AS tot_uni, dbo.inv_lotes.tnpe02 AS salpe_ant, dbo.inv_lotes.enpe03 AS ent_pes, 
                      dbo.inv_lotes.sape03 AS sal_pes, dbo.inv_lotes.tnpe03 AS tot_pes, dbo.inv_lotes.ttpe02 AS sal_antaju, dbo.inv_lotes.ajpe03 AS ent_paju, 
                      dbo.inv_lotes.ajps03 AS sal_paju, dbo.inv_lotes.ttpe03 AS tot_paju, dbo.inv_lotes.tnex02 AS salex_ant, dbo.inv_lotes.enex03 AS ent_ext, 
                      dbo.inv_lotes.saex03 AS sal_ext, dbo.inv_lotes.tnex03 AS tot_ext, dbo.inv_lotes.veun03 AS ven_uni, dbo.inv_lotes.vepe03 AS ven_pes, 
                      dbo.inv_lotes.cove03 AS cov_pes, dbo.inv_lotes.utbr03 AS uti_pes, dbo.inv_lotes.veex03 AS ven_ext, dbo.inv_lotes.coex03 AS cov_ext, 
                      dbo.inv_lotes.utex03 AS uti_ext, dbo.inv_lotes.cod_pro, dbo.inv_lotes.fec_com, dbo.inv_lotes.fec_ven, dbo.inv_lotes.cod_lote, dbo.cxp_provee.rso,
					  dbo.inv_lotes.est_lote,dbo.inv_lotes.conteo1,dbo.inv_lotes.conteo2,dbo.inv_lotes.conteo3
FROM         dbo.inv_lotes WITH(NOLOCK) 
	INNER JOIN dbo.inv_items WITH(NOLOCK) ON dbo.inv_lotes.cod_item = dbo.inv_items.cod_item INNER JOIN dbo.cxp_provee ON dbo.inv_lotes.cod_pro = dbo.cxp_provee.provee
UNION ALL
SELECT     '04' AS Periodo, dbo.inv_lotes.ano_acu, dbo.inv_lotes.cod_item, dbo.inv_items.des_item, dbo.inv_items.cod_grupo, dbo.inv_items.cod_subgrupo, 
                      dbo.inv_lotes.cod_bod, dbo.inv_lotes.cod_suc, dbo.inv_lotes.ttun03 AS salun_ant, dbo.inv_lotes.enun04 AS ent_uni, 
                      dbo.inv_lotes.saun04 AS sal_uni, dbo.inv_lotes.ttun04 AS tot_uni, dbo.inv_lotes.tnpe03 AS salpe_ant, dbo.inv_lotes.enpe04 AS ent_pes, 
                      dbo.inv_lotes.sape04 AS sal_pes, dbo.inv_lotes.tnpe04 AS tot_pes, dbo.inv_lotes.ttpe03 AS sal_antaju, dbo.inv_lotes.ajpe04 AS ent_paju, 
                      dbo.inv_lotes.ajps04 AS sal_paju, dbo.inv_lotes.ttpe04 AS tot_paju, dbo.inv_lotes.tnex03 AS salex_ant, dbo.inv_lotes.enex04 AS ent_ext, 
                      dbo.inv_lotes.saex04 AS sal_ext, dbo.inv_lotes.tnex04 AS tot_ext, dbo.inv_lotes.veun04 AS ven_uni, dbo.inv_lotes.vepe04 AS ven_pes, 
                      dbo.inv_lotes.cove04 AS cov_pes, dbo.inv_lotes.utbr04 AS uti_pes, dbo.inv_lotes.veex04 AS ven_ext, dbo.inv_lotes.coex04 AS cov_ext, 
                      dbo.inv_lotes.utex04 AS uti_ext, dbo.inv_lotes.cod_pro, dbo.inv_lotes.fec_com, dbo.inv_lotes.fec_ven, dbo.inv_lotes.cod_lote, dbo.cxp_provee.rso,
					  dbo.inv_lotes.est_lote,dbo.inv_lotes.conteo1,dbo.inv_lotes.conteo2,dbo.inv_lotes.conteo3
FROM         dbo.inv_lotes WITH(NOLOCK) 
	INNER JOIN dbo.inv_items WITH(NOLOCK) ON dbo.inv_lotes.cod_item = dbo.inv_items.cod_item INNER JOIN dbo.cxp_provee ON dbo.inv_lotes.cod_pro = dbo.cxp_provee.provee
UNION ALL
SELECT     '05' AS Periodo, dbo.inv_lotes.ano_acu, dbo.inv_lotes.cod_item, dbo.inv_items.des_item, dbo.inv_items.cod_grupo, dbo.inv_items.cod_subgrupo, 
                      dbo.inv_lotes.cod_bod, dbo.inv_lotes.cod_suc, dbo.inv_lotes.ttun04 AS salun_ant, dbo.inv_lotes.enun05 AS ent_uni, 
                      dbo.inv_lotes.saun05 AS sal_uni, dbo.inv_lotes.ttun05 AS tot_uni, dbo.inv_lotes.tnpe04 AS salpe_ant, dbo.inv_lotes.enpe05 AS ent_pes, 
                      dbo.inv_lotes.sape05 AS sal_pes, dbo.inv_lotes.tnpe05 AS tot_pes, dbo.inv_lotes.ttpe04 AS sal_antaju, dbo.inv_lotes.ajpe05 AS ent_paju, 
                      dbo.inv_lotes.ajps05 AS sal_paju, dbo.inv_lotes.ttpe05 AS tot_paju, dbo.inv_lotes.tnex04 AS salex_ant, dbo.inv_lotes.enex05 AS ent_ext, 
                      dbo.inv_lotes.saex05 AS sal_ext, dbo.inv_lotes.tnex05 AS tot_ext, dbo.inv_lotes.veun05 AS ven_uni, dbo.inv_lotes.vepe05 AS ven_pes, 
                      dbo.inv_lotes.cove05 AS cov_pes, dbo.inv_lotes.utbr05 AS uti_pes, dbo.inv_lotes.veex05 AS ven_ext, dbo.inv_lotes.coex05 AS cov_ext, 
                      dbo.inv_lotes.utex05 AS uti_ext, dbo.inv_lotes.cod_pro, dbo.inv_lotes.fec_com, dbo.inv_lotes.fec_ven, dbo.inv_lotes.cod_lote, dbo.cxp_provee.rso,
					  dbo.inv_lotes.est_lote,dbo.inv_lotes.conteo1,dbo.inv_lotes.conteo2,dbo.inv_lotes.conteo3
FROM         dbo.inv_lotes WITH(NOLOCK) 
	INNER JOIN dbo.inv_items WITH(NOLOCK) ON dbo.inv_lotes.cod_item = dbo.inv_items.cod_item INNER JOIN dbo.cxp_provee ON dbo.inv_lotes.cod_pro = dbo.cxp_provee.provee
UNION ALL
SELECT     '06' AS Periodo, dbo.inv_lotes.ano_acu, dbo.inv_lotes.cod_item, dbo.inv_items.des_item, dbo.inv_items.cod_grupo, dbo.inv_items.cod_subgrupo, 
                      dbo.inv_lotes.cod_bod, dbo.inv_lotes.cod_suc, dbo.inv_lotes.ttun05 AS salun_ant, dbo.inv_lotes.enun06 AS ent_uni, 
                      dbo.inv_lotes.saun06 AS sal_uni, dbo.inv_lotes.ttun06 AS tot_uni, dbo.inv_lotes.tnpe05 AS salpe_ant, dbo.inv_lotes.enpe06 AS ent_pes, 
                      dbo.inv_lotes.sape06 AS sal_pes, dbo.inv_lotes.tnpe06 AS tot_pes, dbo.inv_lotes.ttpe05 AS sal_antaju, dbo.inv_lotes.ajpe06 AS ent_paju, 
                      dbo.inv_lotes.ajps06 AS sal_paju, dbo.inv_lotes.ttpe06 AS tot_paju, dbo.inv_lotes.tnex05 AS salex_ant, dbo.inv_lotes.enex06 AS ent_ext, 
                      dbo.inv_lotes.saex06 AS sal_ext, dbo.inv_lotes.tnex06 AS tot_ext, dbo.inv_lotes.veun06 AS ven_uni, dbo.inv_lotes.vepe06 AS ven_pes, 
                      dbo.inv_lotes.cove06 AS cov_pes, dbo.inv_lotes.utbr06 AS uti_pes, dbo.inv_lotes.veex06 AS ven_ext, dbo.inv_lotes.coex06 AS cov_ext, 
                      dbo.inv_lotes.utex06 AS uti_ext, dbo.inv_lotes.cod_pro, dbo.inv_lotes.fec_com, dbo.inv_lotes.fec_ven, dbo.inv_lotes.cod_lote, dbo.cxp_provee.rso,
					  dbo.inv_lotes.est_lote,dbo.inv_lotes.conteo1,dbo.inv_lotes.conteo2,dbo.inv_lotes.conteo3
FROM         dbo.inv_lotes WITH(NOLOCK) 
	INNER JOIN dbo.inv_items WITH(NOLOCK) ON dbo.inv_lotes.cod_item = dbo.inv_items.cod_item INNER JOIN dbo.cxp_provee ON dbo.inv_lotes.cod_pro = dbo.cxp_provee.provee
UNION ALL
SELECT     '07' AS Periodo, dbo.inv_lotes.ano_acu, dbo.inv_lotes.cod_item, dbo.inv_items.des_item, dbo.inv_items.cod_grupo, dbo.inv_items.cod_subgrupo, 
                      dbo.inv_lotes.cod_bod, dbo.inv_lotes.cod_suc, dbo.inv_lotes.ttun06 AS salun_ant, dbo.inv_lotes.enun07 AS ent_uni, 
                      dbo.inv_lotes.saun07 AS sal_uni, dbo.inv_lotes.ttun07 AS tot_uni, dbo.inv_lotes.tnpe06 AS salpe_ant, dbo.inv_lotes.enpe07 AS ent_pes, 
                      dbo.inv_lotes.sape07 AS sal_pes, dbo.inv_lotes.tnpe07 AS tot_pes, dbo.inv_lotes.ttpe06 AS sal_antaju, dbo.inv_lotes.ajpe07 AS ent_paju, 
                      dbo.inv_lotes.ajps07 AS sal_paju, dbo.inv_lotes.ttpe07 AS tot_paju, dbo.inv_lotes.tnex06 AS salex_ant, dbo.inv_lotes.enex07 AS ent_ext, 
                      dbo.inv_lotes.saex07 AS sal_ext, dbo.inv_lotes.tnex07 AS tot_ext, dbo.inv_lotes.veun07 AS ven_uni, dbo.inv_lotes.vepe07 AS ven_pes, 
                      dbo.inv_lotes.cove07 AS cov_pes, dbo.inv_lotes.utbr07 AS uti_pes, dbo.inv_lotes.veex07 AS ven_ext, dbo.inv_lotes.coex07 AS cov_ext, 
                      dbo.inv_lotes.utex07 AS uti_ext, dbo.inv_lotes.cod_pro, dbo.inv_lotes.fec_com, dbo.inv_lotes.fec_ven, dbo.inv_lotes.cod_lote, dbo.cxp_provee.rso,
					  dbo.inv_lotes.est_lote,dbo.inv_lotes.conteo1,dbo.inv_lotes.conteo2,dbo.inv_lotes.conteo3
FROM         dbo.inv_lotes WITH(NOLOCK) 
	INNER JOIN dbo.inv_items WITH(NOLOCK) ON dbo.inv_lotes.cod_item = dbo.inv_items.cod_item INNER JOIN dbo.cxp_provee ON dbo.inv_lotes.cod_pro = dbo.cxp_provee.provee
UNION ALL
SELECT     '08' AS Periodo, dbo.inv_lotes.ano_acu, dbo.inv_lotes.cod_item, dbo.inv_items.des_item, dbo.inv_items.cod_grupo, dbo.inv_items.cod_subgrupo, 
                      dbo.inv_lotes.cod_bod, dbo.inv_lotes.cod_suc, dbo.inv_lotes.ttun07 AS salun_ant, dbo.inv_lotes.enun08 AS ent_uni, 
                      dbo.inv_lotes.saun08 AS sal_uni, dbo.inv_lotes.ttun08 AS tot_uni, dbo.inv_lotes.tnpe07 AS salpe_ant, dbo.inv_lotes.enpe08 AS ent_pes, 
                      dbo.inv_lotes.sape08 AS sal_pes, dbo.inv_lotes.tnpe08 AS tot_pes, dbo.inv_lotes.ttpe07 AS sal_antaju, dbo.inv_lotes.ajpe08 AS ent_paju, 
                      dbo.inv_lotes.ajps08 AS sal_paju, dbo.inv_lotes.ttpe08 AS tot_paju, dbo.inv_lotes.tnex07 AS salex_ant, dbo.inv_lotes.enex08 AS ent_ext, 
                      dbo.inv_lotes.saex08 AS sal_ext, dbo.inv_lotes.tnex08 AS tot_ext, dbo.inv_lotes.veun08 AS ven_uni, dbo.inv_lotes.vepe08 AS ven_pes, 
                      dbo.inv_lotes.cove08 AS cov_pes, dbo.inv_lotes.utbr08 AS uti_pes, dbo.inv_lotes.veex08 AS ven_ext, dbo.inv_lotes.coex08 AS cov_ext, 
                      dbo.inv_lotes.utex08 AS uti_ext, dbo.inv_lotes.cod_pro, dbo.inv_lotes.fec_com, dbo.inv_lotes.fec_ven, dbo.inv_lotes.cod_lote, dbo.cxp_provee.rso,
					  dbo.inv_lotes.est_lote,dbo.inv_lotes.conteo1,dbo.inv_lotes.conteo2,dbo.inv_lotes.conteo3
FROM         dbo.inv_lotes WITH(NOLOCK) 
	INNER JOIN dbo.inv_items WITH(NOLOCK) ON dbo.inv_lotes.cod_item = dbo.inv_items.cod_item INNER JOIN dbo.cxp_provee ON dbo.inv_lotes.cod_pro = dbo.cxp_provee.provee
UNION ALL
SELECT     '09' AS Periodo, dbo.inv_lotes.ano_acu, dbo.inv_lotes.cod_item, dbo.inv_items.des_item, dbo.inv_items.cod_grupo, dbo.inv_items.cod_subgrupo, 
                      dbo.inv_lotes.cod_bod, dbo.inv_lotes.cod_suc, dbo.inv_lotes.ttun08 AS salun_ant, dbo.inv_lotes.enun09 AS ent_uni, 
                      dbo.inv_lotes.saun09 AS sal_uni, dbo.inv_lotes.ttun09 AS tot_uni, dbo.inv_lotes.tnpe08 AS salpe_ant, dbo.inv_lotes.enpe09 AS ent_pes, 
                      dbo.inv_lotes.sape09 AS sal_pes, dbo.inv_lotes.tnpe09 AS tot_pes, dbo.inv_lotes.ttpe08 AS sal_antaju, dbo.inv_lotes.ajpe09 AS ent_paju, 
                      dbo.inv_lotes.ajps09 AS sal_paju, dbo.inv_lotes.ttpe09 AS tot_paju, dbo.inv_lotes.tnex08 AS salex_ant, dbo.inv_lotes.enex09 AS ent_ext, 
                      dbo.inv_lotes.saex09 AS sal_ext, dbo.inv_lotes.tnex09 AS tot_ext, dbo.inv_lotes.veun09 AS ven_uni, dbo.inv_lotes.vepe09 AS ven_pes, 
                      dbo.inv_lotes.cove09 AS cov_pes, dbo.inv_lotes.utbr09 AS uti_pes, dbo.inv_lotes.veex09 AS ven_ext, dbo.inv_lotes.coex09 AS cov_ext, 
                      dbo.inv_lotes.utex09 AS uti_ext, dbo.inv_lotes.cod_pro, dbo.inv_lotes.fec_com, dbo.inv_lotes.fec_ven, dbo.inv_lotes.cod_lote, dbo.cxp_provee.rso,
					  dbo.inv_lotes.est_lote,dbo.inv_lotes.conteo1,dbo.inv_lotes.conteo2,dbo.inv_lotes.conteo3
FROM         dbo.inv_lotes WITH(NOLOCK) 
	INNER JOIN dbo.inv_items WITH(NOLOCK) ON dbo.inv_lotes.cod_item = dbo.inv_items.cod_item INNER JOIN dbo.cxp_provee ON dbo.inv_lotes.cod_pro = dbo.cxp_provee.provee
UNION ALL
SELECT     '10' AS Periodo, dbo.inv_lotes.ano_acu, dbo.inv_lotes.cod_item, dbo.inv_items.des_item, dbo.inv_items.cod_grupo, dbo.inv_items.cod_subgrupo, 
                      dbo.inv_lotes.cod_bod, dbo.inv_lotes.cod_suc, dbo.inv_lotes.ttun09 AS salun_ant, dbo.inv_lotes.enun10 AS ent_uni, 
                      dbo.inv_lotes.saun10 AS sal_uni, dbo.inv_lotes.ttun10 AS tot_uni, dbo.inv_lotes.tnpe09 AS salpe_ant, dbo.inv_lotes.enpe10 AS ent_pes, 
                      dbo.inv_lotes.sape10 AS sal_pes, dbo.inv_lotes.tnpe10 AS tot_pes, dbo.inv_lotes.ttpe09 AS sal_antaju, dbo.inv_lotes.ajpe10 AS ent_paju, 
                      dbo.inv_lotes.ajps10 AS sal_paju, dbo.inv_lotes.ttpe10 AS tot_paju, dbo.inv_lotes.tnex09 AS salex_ant, dbo.inv_lotes.enex10 AS ent_ext, 
                      dbo.inv_lotes.saex10 AS sal_ext, dbo.inv_lotes.tnex10 AS tot_ext, dbo.inv_lotes.veun10 AS ven_uni, dbo.inv_lotes.vepe10 AS ven_pes, 
                      dbo.inv_lotes.cove10 AS cov_pes, dbo.inv_lotes.utbr10 AS uti_pes, dbo.inv_lotes.veex10 AS ven_ext, dbo.inv_lotes.coex10 AS cov_ext, 
                      dbo.inv_lotes.utex10 AS uti_ext, dbo.inv_lotes.cod_pro, dbo.inv_lotes.fec_com, dbo.inv_lotes.fec_ven, dbo.inv_lotes.cod_lote, dbo.cxp_provee.rso,
					  dbo.inv_lotes.est_lote,dbo.inv_lotes.conteo1,dbo.inv_lotes.conteo2,dbo.inv_lotes.conteo3
FROM         dbo.inv_lotes WITH(NOLOCK) 
	INNER JOIN dbo.inv_items WITH(NOLOCK) ON dbo.inv_lotes.cod_item = dbo.inv_items.cod_item INNER JOIN dbo.cxp_provee ON dbo.inv_lotes.cod_pro = dbo.cxp_provee.provee
UNION ALL
SELECT     '11' AS Periodo, dbo.inv_lotes.ano_acu, dbo.inv_lotes.cod_item, dbo.inv_items.des_item, dbo.inv_items.cod_grupo, dbo.inv_items.cod_subgrupo, 
                      dbo.inv_lotes.cod_bod, dbo.inv_lotes.cod_suc, dbo.inv_lotes.ttun10 AS salun_ant, dbo.inv_lotes.enun11 AS ent_uni, 
                      dbo.inv_lotes.saun11 AS sal_uni, dbo.inv_lotes.ttun11 AS tot_uni, dbo.inv_lotes.tnpe10 AS salpe_ant, dbo.inv_lotes.enpe11 AS ent_pes, 
                      dbo.inv_lotes.sape11 AS sal_pes, dbo.inv_lotes.tnpe11 AS tot_pes, dbo.inv_lotes.ttpe10 AS sal_antaju, dbo.inv_lotes.ajpe11 AS ent_paju, 
                      dbo.inv_lotes.ajps11 AS sal_paju, dbo.inv_lotes.ttpe11 AS tot_paju, dbo.inv_lotes.tnex10 AS salex_ant, dbo.inv_lotes.enex11 AS ent_ext, 
                      dbo.inv_lotes.saex11 AS sal_ext, dbo.inv_lotes.tnex11 AS tot_ext, dbo.inv_lotes.veun11 AS ven_uni, dbo.inv_lotes.vepe11 AS ven_pes, 
                      dbo.inv_lotes.cove11 AS cov_pes, dbo.inv_lotes.utbr11 AS uti_pes, dbo.inv_lotes.veex11 AS ven_ext, dbo.inv_lotes.coex11 AS cov_ext, 
                      dbo.inv_lotes.utex11 AS uti_ext, dbo.inv_lotes.cod_pro, dbo.inv_lotes.fec_com, dbo.inv_lotes.fec_ven, dbo.inv_lotes.cod_lote, dbo.cxp_provee.rso,
					  dbo.inv_lotes.est_lote,dbo.inv_lotes.conteo1,dbo.inv_lotes.conteo2,dbo.inv_lotes.conteo3
FROM         dbo.inv_lotes WITH(NOLOCK) 
	INNER JOIN dbo.inv_items WITH(NOLOCK) ON dbo.inv_lotes.cod_item = dbo.inv_items.cod_item INNER JOIN dbo.cxp_provee ON dbo.inv_lotes.cod_pro = dbo.cxp_provee.provee
UNION ALL
SELECT     '12' AS Periodo, dbo.inv_lotes.ano_acu, dbo.inv_lotes.cod_item, dbo.inv_items.des_item, dbo.inv_items.cod_grupo, dbo.inv_items.cod_subgrupo, 
                      dbo.inv_lotes.cod_bod, dbo.inv_lotes.cod_suc, dbo.inv_lotes.ttun11 AS salun_ant, dbo.inv_lotes.enun12 AS ent_uni, 
                      dbo.inv_lotes.saun12 AS sal_uni, dbo.inv_lotes.ttun12 AS tot_uni, dbo.inv_lotes.tnpe11 AS salpe_ant, dbo.inv_lotes.enpe12 AS ent_pes, 
                      dbo.inv_lotes.sape12 AS sal_pes, dbo.inv_lotes.tnpe12 AS tot_pes, dbo.inv_lotes.ttpe11 AS sal_antaju, dbo.inv_lotes.ajpe12 AS ent_paju, 
                      dbo.inv_lotes.ajps12 AS sal_paju, dbo.inv_lotes.ttpe12 AS tot_paju, dbo.inv_lotes.tnex11 AS salex_ant, dbo.inv_lotes.enex12 AS ent_ext, 
                      dbo.inv_lotes.saex12 AS sal_ext, dbo.inv_lotes.tnex12 AS tot_ext, dbo.inv_lotes.veun12 AS ven_uni, dbo.inv_lotes.vepe12 AS ven_pes, 
                      dbo.inv_lotes.cove12 AS cov_pes, dbo.inv_lotes.utbr12 AS uti_pes, dbo.inv_lotes.veex12 AS ven_ext, dbo.inv_lotes.coex12 AS cov_ext, 
                      dbo.inv_lotes.utex12 AS uti_ext, dbo.inv_lotes.cod_pro, dbo.inv_lotes.fec_com, dbo.inv_lotes.fec_ven, dbo.inv_lotes.cod_lote, dbo.cxp_provee.rso,
					  dbo.inv_lotes.est_lote,dbo.inv_lotes.conteo1,dbo.inv_lotes.conteo2,dbo.inv_lotes.conteo3
FROM         dbo.inv_lotes  WITH(NOLOCK)
	INNER JOIN dbo.inv_items WITH(NOLOCK) ON dbo.inv_lotes.cod_item = dbo.inv_items.cod_item INNER JOIN dbo.cxp_provee ON dbo.inv_lotes.cod_pro = dbo.cxp_provee.provee

```
