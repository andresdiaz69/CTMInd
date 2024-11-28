# View: v_cie_docum_std

## Usa los objetos:
- [[cie_alumnos]]
- [[cie_cabdoc]]
- [[cie_conceptos]]
- [[cie_cuedoc]]
- [[cie_familia]]
- [[fac_tipofactura]]
- [[fac_tipoOpera]]
- [[gen_ccosto]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_sucursal]]

```sql

/*	AGREGAMOS NOMBRES Y APELLIDOS DE LOS ALUMNOS
	JCESARS		SEPTIEMBRE/2011
	AFLOREZ OCTUBRE/2022 SRN2020-0304 SE AGREGAN CAMPOS DE FACTURACIÓN*/
CREATE VIEW [dbo].[v_cie_docum_std] 
AS
	SELECT cab.fch_doc,cab.det_doc,cab.per_esc,cab.for_pag,cab.dia_pla,cab.banco,cab.cheque,cab.cambio,cab.apl_ori,cab.fec_grab,cab.usuario,
	cue.ano_doc,cue.per_doc,cue.tip_doc,cue.sub_tip,cue.num_doc,cue.reg_doc,cue.trans,cue.cod_alu,cue.cod_fam,cue.cod_suc,cue.cod_cco,
	cue.cod_cl1,cue.cod_cl2,cue.cod_cl3,cue.ind_con,cue.cod_con,cue.num_che,cue.por_int,cue.val_doc,cue.sal_doc,cue.por_des,cue.val_des,
	cue.net_doc,cue.desc_fin,cue.tot_desc,cue.val_beca,cue.ano_ref,cue.per_ref,cue.sub_ref,cue.num_ref,cue.reg_ref,cue.ano_ant,cue.per_ant,
	cue.sub_ant,cue.doc_ant,cue.reg_ant,cue.ant_doc,cue.dia_int,cue.fec_int,cue.val_int,cue.ind_fact,cue.fec_ven,cue.ant_conc,cue.saldo_fact,
	cue.jerarquia AS jerarquia_cue,cue.matricula,cue.fec_pag,cue.modkey,alu.nom_alu,con.nom_con,con.jerarquia,fam.ape_nomp,suc.nom_suc,cco.nom_cco,
	cl1.nombre AS nom_cl1,cl2.nombre AS nom_cl2,cl3.nombre AS nom_cl3,cant.nom_con AS con_ant,
	alu.nom1_alu,ISNULL(alu.nom2_alu,'') AS nom2_alu,alu.ap1_alu,ISNULL(alu.ap2_alu,'') AS ap2_alu
	,cab.nro_resol,cab.est_dian,cab.est_cliente,cab.cod_cufe,cab.guid_envio,cab.LDF_fe,cab.link_fe,cab.fto_Fac
	,cab.lote_facture,cab.tipo_fact,tipf.descrip_tipo,cab.tipo_oper,toper.descrip_oper,cab.cod_cude,cab.ocom_cli,cab.fec_Ocomcli,cab.causal_NC, cue.val_pag
	FROM cie_cabdoc AS cab WITH (NOLOCK)
	INNER JOIN cie_cuedoc AS cue WITH (NOLOCK) ON cab.ano_doc=cue.ano_doc AND cab.per_doc=cue.per_doc AND cab.sub_tip=cue.sub_tip AND cab.num_doc=cue.num_doc 
	INNER JOIN cie_alumnos AS alu WITH (NOLOCK) ON cue.cod_alu=alu.cod_alu  
	INNER JOIN cie_conceptos AS con WITH (NOLOCK) ON cue.cod_con=con.cod_con
	INNER JOIN cie_familia AS fam WITH (NOLOCK) ON cue.cod_fam=fam.cod_fam
	INNER JOIN gen_sucursal AS suc WITH (NOLOCK) ON cue.cod_suc=suc.cod_suc
	INNER JOIN gen_ccosto AS cco WITH (NOLOCK) ON cue.cod_cco=cco.cod_cco
	INNER JOIN gen_clasif1 AS cl1 WITH (NOLOCK) ON cue.cod_cl1=cl1.codigo
	INNER JOIN gen_clasif2 AS cl2 WITH (NOLOCK) ON cue.cod_cl2=cl2.codigo
	INNER JOIN gen_clasif3 AS cl3 WITH (NOLOCK) ON cue.cod_cl3=cl3.codigo
	INNER JOIN cie_conceptos AS cant WITH (NOLOCK) ON cue.ant_conc=cant.cod_con
	LEFT OUTER JOIN dbo.fac_tipofactura AS tipf WITH(NOLOCK) ON tipf.tipo_fact = cab.tipo_fact
	LEFT OUTER JOIN dbo.fac_tipoOpera AS toper WITH(NOLOCK) ON toper.tipo_oper = cab.tipo_oper;

```
