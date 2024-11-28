# View: v_cxc_ventas

## Usa los objetos:
- [[cxc_cabdoc]]
- [[cxc_cliente]]
- [[cxc_cuedoc]]
- [[cxc_zona]]
- [[gen_ccosto]]
- [[gen_ciudad]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_sucursal]]
- [[gen_vendedor]]

```sql

/*	AGREGAMOS EL CAMPO PAIS AL SELECT PARA LAS CONSULTAS DE BOTONES
	JCESARS		MARZ/2009
	2020/01/21 Inclusión Instrucción WITH (NOLOCK)
	AFLOREZ FEBRERO/2022 SRS2022-0133 SE AGREGA CONSULTA DE NOTAS CRÉDITO*/
CREATE VIEW [dbo].[v_cxc_ventas]
AS
SELECT  cli.nom_cli, cli.cod_zon, cli.tip_mon, cab.fch_doc, cab.cod_ven, cab.cambio, cab.apl_ori, cue.ano_doc, 
		cue.per_doc, cue.tip_doc, cue.sub_tip, cue.num_doc, 
        cue.reg_doc, cue.trans, cue.cod_cli, cue.ano_ref, cue.per_ref, cue.sub_ref, cue.num_ref, 
		cue.fec_ven, cue.val_fac, cue.val_doc, cue.sal_doc, 
        cue.por_iva, cue.val_iva, cue.ret_iva, cue.net_doc, cue.por_des, cue.val_des,  
		cue.por_ret, cue.val_ret, cue.ant_doc, cue.doc_ant, 
        cue.dia_ven, cue.val_com, cue.val_ica, cue.may_val, cue.men_val, cue.por_ica, cue.por_riv, 
		cue.ano_ant, cue.per_ant, cue.sub_ant, cue.cod_suc, 
        cue.cod_cco, cue.ind_con, cue.cod_cl1, cue.cod_cl2, cue.cod_cl3, cue.final, cue.reg_ant, 
		cue.numche, cue.ban_pos, cue.fec_che, cue.num_che, 
        cue.reg_ref, cue.cod_cat, ciu.nom_ciu, ven.nom_ven, suc.nom_suc, zona.nom_zon, ccosto.nom_cco, cli.cod_ciu, 
		cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, cab.ind_mp, ciu.cod_pai
FROM    dbo.cxc_cabdoc AS cab WITH (NOLOCK)
		INNER JOIN dbo.cxc_cuedoc AS cue WITH (NOLOCK)		ON cab.ano_doc = cue.ano_doc AND cab.per_doc = cue.per_doc AND cab.tip_doc = cue.tip_doc AND cab.num_doc = cue.num_doc  
		INNER JOIN dbo.cxc_cliente	AS cli WITH (NOLOCK)	ON cue.cod_cli = cli.cod_cli 
		INNER JOIN dbo.gen_ciudad	AS ciu WITH (NOLOCK)	ON cli.cod_ciu = ciu.cod_ciu AND cli.cod_dep=ciu.cod_dep AND cli.cod_pai=ciu.cod_pai
		INNER JOIN dbo.gen_vendedor AS ven WITH (NOLOCK)	ON cab.cod_ven = ven.cod_ven 
		INNER JOIN dbo.cxc_zona		AS zona WITH (NOLOCK)	ON cli.cod_zon = zona.cod_zon 
		INNER JOIN dbo.gen_sucursal AS suc WITH (NOLOCK)	ON cue.cod_suc = suc.cod_suc 
		INNER JOIN dbo.gen_ccosto	AS ccosto WITH (NOLOCK) ON cue.cod_cco = ccosto.cod_cco
		INNER JOIN dbo.gen_clasif1  AS cl1 WITH (NOLOCK)	ON cue.cod_cl1 = cl1.codigo 
		INNER JOIN dbo.gen_clasif2  AS cl2 WITH (NOLOCK)	ON cue.cod_cl2 = cl2.codigo
		INNER JOIN dbo.gen_clasif3  AS cl3 WITH (NOLOCK)	ON cue.cod_cl3 = cl3.codigo
WHERE   (cue.tip_doc BETWEEN '010' AND '039')
		AND (cab.cambio = '0')
UNION ALL
SELECT  cli.nom_cli, cli.cod_zon, cli.tip_mon, cab.fch_doc, cab.cod_ven, cab.cambio, cab.apl_ori, cue.ano_doc, 
		cue.per_doc, cue.tip_doc, cue.sub_tip, cue.num_doc, 
        cue.reg_doc, cue.trans, cue.cod_cli, cue.ano_ref, cue.per_ref, cue.sub_ref, cue.num_ref, 
		cue.fec_ven, (cue.val_fac* -1) AS val_fac, (cue.val_doc* -1) AS val_doc, (cue.sal_doc* -1) AS sal_doc, 
        cue.por_iva, (cue.val_iva* -1) AS val_iva, (cue.ret_iva* -1) AS ret_iva, (cue.net_doc* -1) AS net_doc,
		cue.por_des, (cue.val_des* -1) AS val_des, cue.por_ret, (cue.val_ret* -1) AS val_ret, cue.ant_doc, cue.doc_ant, 
        cue.dia_ven, (cue.val_com* -1) AS val_com, (cue.val_ica* -1) AS val_ica, (cue.may_val* -1) AS may_val, (cue.men_val* -1) AS men_val,
		cue.por_ica, cue.por_riv, cue.ano_ant, cue.per_ant, cue.sub_ant, cue.cod_suc, 
        cue.cod_cco, cue.ind_con, cue.cod_cl1, cue.cod_cl2, cue.cod_cl3, cue.final, cue.reg_ant, 
		cue.numche, cue.ban_pos, cue.fec_che, cue.num_che, 
        cue.reg_ref, cue.cod_cat, ciu.nom_ciu, ven.nom_ven, suc.nom_suc, zona.nom_zon, ccosto.nom_cco, cli.cod_ciu, 
		cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, cab.ind_mp, ciu.cod_pai
FROM    dbo.cxc_cabdoc AS cab WITH (NOLOCK)
		INNER JOIN dbo.cxc_cuedoc AS cue WITH (NOLOCK)		ON cab.ano_doc = cue.ano_doc AND cab.per_doc = cue.per_doc AND cab.tip_doc = cue.tip_doc AND cab.num_doc = cue.num_doc  
		INNER JOIN dbo.cxc_cliente	AS cli WITH (NOLOCK)	ON cue.cod_cli = cli.cod_cli 
		INNER JOIN dbo.gen_ciudad	AS ciu WITH (NOLOCK)	ON cli.cod_ciu = ciu.cod_ciu AND cli.cod_dep=ciu.cod_dep AND cli.cod_pai=ciu.cod_pai
		INNER JOIN dbo.gen_vendedor AS ven WITH (NOLOCK)	ON cab.cod_ven = ven.cod_ven 
		INNER JOIN dbo.cxc_zona		AS zona WITH (NOLOCK)	ON cli.cod_zon = zona.cod_zon 
		INNER JOIN dbo.gen_sucursal AS suc WITH (NOLOCK)	ON cue.cod_suc = suc.cod_suc 
		INNER JOIN dbo.gen_ccosto	AS ccosto WITH (NOLOCK) ON cue.cod_cco = ccosto.cod_cco
		INNER JOIN dbo.gen_clasif1  AS cl1 WITH (NOLOCK)	ON cue.cod_cl1 = cl1.codigo 
		INNER JOIN dbo.gen_clasif2  AS cl2 WITH (NOLOCK)	ON cue.cod_cl2 = cl2.codigo
		INNER JOIN dbo.gen_clasif3  AS cl3 WITH (NOLOCK)	ON cue.cod_cl3 = cl3.codigo
WHERE   cue.tip_doc IN ('050')
		AND cab.cambio = '0';

```
