# View: V_rhh_concep

## Usa los objetos:
- [[rhh_concep]]
- [[rhh_DefConcep]]
- [[SIS_APLICACION]]

```sql
CREATE VIEW [dbo].[V_rhh_concep]
AS
SELECT        dbo.rhh_concep.cod_con, dbo.rhh_DefConcep.nom_con, dbo.rhh_concep.nat_con, dbo.rhh_concep.nov_rel, dbo.rhh_DefConcep.mod_liq, dbo.rhh_DefConcep.apl_con, dbo.rhh_DefConcep.nom_pro, 
                         dbo.rhh_DefConcep.cod_for, dbo.rhh_DefConcep.ind_sal, dbo.rhh_DefConcep.ind_pen, dbo.rhh_DefConcep.ind_rpr, dbo.rhh_DefConcep.ind_ret, dbo.rhh_DefConcep.ind_nded, dbo.rhh_DefConcep.ind_bon, 
                         dbo.rhh_DefConcep.ind_prn, dbo.rhh_DefConcep.ind_prs, dbo.rhh_DefConcep.ind_prv, dbo.rhh_DefConcep.ind_ppa, dbo.rhh_DefConcep.ind_ces, dbo.rhh_DefConcep.ind_caj, dbo.rhh_DefConcep.ind_icb, 
                         dbo.rhh_DefConcep.ind_sen, dbo.rhh_DefConcep.ind_ind, dbo.rhh_DefConcep.ind_vadf, dbo.rhh_DefConcep.ind_vad, dbo.rhh_DefConcep.ind_valc, dbo.rhh_DefConcep.ind_vst, dbo.rhh_DefConcep.cta_deb, 
                         dbo.rhh_DefConcep.cta_cre, dbo.rhh_DefConcep.cco_deb, dbo.rhh_DefConcep.cco_cre, dbo.rhh_DefConcep.ter_deb, dbo.rhh_DefConcep.ter_cre, dbo.rhh_DefConcep.cod_rub, dbo.rhh_DefConcep.ind_tes, 
                         dbo.rhh_DefConcep.ben_tes, dbo.rhh_DefConcep.cta_tes, dbo.rhh_DefConcep.cod_bas, dbo.rhh_DefConcep.dis_cco, dbo.rhh_DefConcep.ind_terc, dbo.rhh_DefConcep.ind_pre, dbo.rhh_DefConcep.ind_stras, 
                         dbo.rhh_DefConcep.ind_proy, dbo.rhh_DefConcep.emp_apl, dbo.rhh_DefConcep.cod_prov, dbo.rhh_DefConcep.tipo_docxp, dbo.rhh_DefConcep.ind_BonAl, dbo.rhh_DefConcep.ind_PagIndir, dbo.rhh_DefConcep.int_cnt, 
                         dbo.rhh_concep.tipo_con, dbo.rhh_DefConcep.ind_valnov, dbo.rhh_DefConcep.ind_SoloConv, dbo.rhh_DefConcep.ind_PagNoSal, dbo.rhh_DefConcep.No_Facturable, dbo.rhh_DefConcep.orden_liq, 
                         dbo.rhh_DefConcep.ind_sueldo, rhh_DefConcep.Desc_DIAN, rhh_DefConcep.cod_clabono, rhh_DefConcep.con_nif, dbo.rhh_DefConcep.ind_Hextra, dbo.rhh_DefConcep.Cod_def_concep, ind_antc50_ec, ind_EgrAnt_ec, 
                         conded_ec, ind_antc_EC, condev_ec, ind_pagindir_ec, ind_decter_ec, ind_deccta_ec, ind_prod_ec, dbo.rhh_DefConcep.int_niif, dbo.rhh_DefConcep.niif_deb, dbo.rhh_DefConcep.niif_cre, dbo.rhh_DefConcep.ind_discconiif, 
                         dbo.rhh_DefConcep.ind_tercniif, dbo.rhh_DefConcep.niif_tercdeb, dbo.rhh_DefConcep.niif_tercre, ISNULL(dbo.rhh_DefConcep.Ind_ValNeto,0) AS Ind_ValNeto, dbo.rhh_DefConcep.ind_NetoTodosTipLiq,dbo.rhh_DefConcep.ind_ctt,
					dbo.rhh_DefConcep.ind_Aux01, dbo.rhh_DefConcep.ind_Aux02, dbo.rhh_DefConcep.ind_Aux03, dbo.rhh_DefConcep.ind_Aux04, dbo.rhh_DefConcep.ind_Aux05, dbo.rhh_DefConcep.ind_Aux06,
				     dbo.rhh_DefConcep.ind_Aux07, dbo.rhh_DefConcep.ind_Aux08, dbo.rhh_DefConcep.ind_Aux09, dbo.rhh_DefConcep.ind_Aux10, dbo.rhh_DefConcep.ind_Aux11,	dbo.rhh_DefConcep.ind_Aux12,
				     dbo.rhh_DefConcep.ind_Aux13, dbo.rhh_DefConcep.ind_Aux14, dbo.rhh_DefConcep.ind_Aux15 
FROM            dbo.rhh_concep INNER JOIN
                         dbo.rhh_DefConcep ON dbo.rhh_concep.cod_con = dbo.rhh_DefConcep.cod_con
WHERE        (dbo.rhh_DefConcep.emp_apl = 'M') AND (NOT EXISTS
                             (SELECT        cod_con
                               FROM            dbo.rhh_DefConcep AS I
                               WHERE        (cod_con = dbo.rhh_DefConcep.cod_con) AND (mod_liq = dbo.rhh_DefConcep.mod_liq) AND (emp_apl =
                                                             (SELECT        emp_apl
                                                               FROM            dbo.SIS_APLICACION AS sis_aplicacion_1
                                                               WHERE        (cod_apl = 'NOM')))))
UNION ALL
SELECT        dbo.rhh_concep.cod_con, dbo.rhh_DefConcep.nom_con, dbo.rhh_concep.nat_con, dbo.rhh_concep.nov_rel, dbo.rhh_DefConcep.mod_liq, dbo.rhh_DefConcep.apl_con, dbo.rhh_DefConcep.nom_pro, 
                         dbo.rhh_DefConcep.cod_for, dbo.rhh_DefConcep.ind_sal, dbo.rhh_DefConcep.ind_pen, dbo.rhh_DefConcep.ind_rpr, dbo.rhh_DefConcep.ind_ret, dbo.rhh_DefConcep.ind_nded, dbo.rhh_DefConcep.ind_bon, 
                         dbo.rhh_DefConcep.ind_prn, dbo.rhh_DefConcep.ind_prs, dbo.rhh_DefConcep.ind_prv, dbo.rhh_DefConcep.ind_ppa, dbo.rhh_DefConcep.ind_ces, dbo.rhh_DefConcep.ind_caj, dbo.rhh_DefConcep.ind_icb, 
                         dbo.rhh_DefConcep.ind_sen, dbo.rhh_DefConcep.ind_ind, dbo.rhh_DefConcep.ind_vadf, dbo.rhh_DefConcep.ind_vad, dbo.rhh_DefConcep.ind_valc, dbo.rhh_DefConcep.ind_vst, dbo.rhh_DefConcep.cta_deb, 
                         dbo.rhh_DefConcep.cta_cre, dbo.rhh_DefConcep.cco_deb, dbo.rhh_DefConcep.cco_cre, dbo.rhh_DefConcep.ter_deb, dbo.rhh_DefConcep.ter_cre, dbo.rhh_DefConcep.cod_rub, dbo.rhh_DefConcep.ind_tes, 
                         dbo.rhh_DefConcep.ben_tes, dbo.rhh_DefConcep.cta_tes, dbo.rhh_DefConcep.cod_bas, dbo.rhh_DefConcep.dis_cco, dbo.rhh_DefConcep.ind_terc, dbo.rhh_DefConcep.ind_pre, dbo.rhh_DefConcep.ind_stras, 
                         dbo.rhh_DefConcep.ind_proy, dbo.rhh_DefConcep.emp_apl, dbo.rhh_DefConcep.cod_prov, dbo.rhh_DefConcep.tipo_docxp, dbo.rhh_DefConcep.ind_BonAl, dbo.rhh_DefConcep.ind_PagIndir, dbo.rhh_DefConcep.int_cnt, 
                         dbo.rhh_concep.tipo_con, dbo.rhh_DefConcep.ind_valnov, dbo.rhh_DefConcep.ind_SoloConv, dbo.rhh_DefConcep.ind_PagNoSal, dbo.rhh_DefConcep.No_Facturable, dbo.rhh_DefConcep.orden_liq, 
                         dbo.rhh_DefConcep.ind_sueldo, rhh_DefConcep.Desc_DIAN, rhh_DefConcep.cod_clabono, rhh_DefConcep.con_nif, dbo.rhh_DefConcep.ind_Hextra, dbo.rhh_DefConcep.Cod_def_concep, ind_antc50_ec, ind_EgrAnt_ec, 
                         conded_ec, ind_antc_EC, condev_ec, ind_pagindir_ec, ind_decter_ec, ind_deccta_ec, ind_prod_ec, dbo.rhh_DefConcep.int_niif, dbo.rhh_DefConcep.niif_deb, dbo.rhh_DefConcep.niif_cre, dbo.rhh_DefConcep.ind_discconiif, 
                         dbo.rhh_DefConcep.ind_tercniif, dbo.rhh_DefConcep.niif_tercdeb, dbo.rhh_DefConcep.niif_tercre, ISNULL(dbo.rhh_DefConcep.Ind_ValNeto,0) AS Ind_ValNeto, dbo.rhh_DefConcep.ind_NetoTodosTipLiq,dbo.rhh_DefConcep.ind_ctt,
					dbo.rhh_DefConcep.ind_Aux01, dbo.rhh_DefConcep.ind_Aux02, dbo.rhh_DefConcep.ind_Aux03, dbo.rhh_DefConcep.ind_Aux04, dbo.rhh_DefConcep.ind_Aux05, dbo.rhh_DefConcep.ind_Aux06,
				     dbo.rhh_DefConcep.ind_Aux07, dbo.rhh_DefConcep.ind_Aux08, dbo.rhh_DefConcep.ind_Aux09, dbo.rhh_DefConcep.ind_Aux10, dbo.rhh_DefConcep.ind_Aux11,	dbo.rhh_DefConcep.ind_Aux12,
				     dbo.rhh_DefConcep.ind_Aux13, dbo.rhh_DefConcep.ind_Aux14, dbo.rhh_DefConcep.ind_Aux15 
FROM            dbo.rhh_concep INNER JOIN
                         dbo.rhh_DefConcep ON dbo.rhh_concep.cod_con = dbo.rhh_DefConcep.cod_con
WHERE        dbo.rhh_DefConcep.emp_apl =
                             (SELECT        emp_apl
                               FROM            dbo.SIS_APLICACION AS sis_aplicacion_1
                               WHERE        (cod_apl = 'NOM'))

```
