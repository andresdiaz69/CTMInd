# View: v_nom_docum

## Usa los objetos:
- [[nom_cabdoc]]
- [[nom_cuedoc]]
- [[rhh_ConvCco]]
- [[rhh_ConvCl1]]
- [[rhh_ConvCl2]]
- [[rhh_ConvCl3]]
- [[rhh_ConvCl4]]
- [[rhh_ConvCl5]]
- [[rhh_ConvCl6]]
- [[rhh_ConvCl7]]
- [[rhh_ConvCl8]]
- [[rhh_Convenio]]
- [[rhh_ConvSuc]]
- [[rhh_tipliquid]]
- [[v_rhh_concep]]
- [[v_rhh_emplea]]

```sql

/*Vista para documentos*/
CREATE VIEW [dbo].[v_nom_docum]
AS
SELECT	cab.ano_doc, cab.per_doc, cab.tip_doc, cab.sub_tip, cab.num_doc, cab.cod_emp AS cod_emp_cab, 
		cab.cod_con AS cod_con_cab, cab.fec_doc,
		cab.tip_liq AS tip_liq_cab, cab.cambio, cab.des_doc,
		cue.reg_doc, cue.trans, cue.tip_liq AS tip_liq_cue, cue.cod_con  AS cod_con_cue, 
		cue.cod_emp AS cod_emp_cue, cue.can_doc, cue.val_doc, cue.cod_conv, cue.fec_apl,
		RTRIM(emp.ap1_emp)+' ' + RTRIM(emp.ap2_emp) + ' ' + RTRIM(emp.nom_emp) AS nom_emp_cab,
		RTRIM(emp1.ap1_emp)+' ' + RTRIM(emp1.ap2_emp) + ' ' + RTRIM(emp1.nom_emp) AS nom_emp_cue,
		con.nom_con AS nom_con_cab, con1.nom_con AS nom_con_cue,
		tip.nom_liq AS nom_liq_cab, tip1.nom_liq AS nom_liq_cue,
		cnv.nom_conv AS nom_conv_cue,
		cue.conv_suc, CnSu.conv_suc_des,
		cue.conv_cco, CnCc.conv_cco_des,
		cue.conv_cl1, CnC1.conv_cl1_des,
		cue.conv_cl2, CnC2.conv_cl2_des,
		cue.conv_cl3, CnC3.conv_cl3_des,
		cue.conv_cl4, CnC4.conv_cl4_des,
		cue.conv_cl5, CnC5.conv_cl5_des,
		cue.conv_cl6, CnC6.conv_cl6_des,
		cue.conv_cl7, CnC7.conv_cl7_des,
		cue.conv_cl8, CnC8.conv_cl8_des
FROM	nom_cabdoc cab
INNER	JOIN nom_cuedoc cue ON cab.ano_doc=cue.ano_doc AND cab.per_doc=cue.per_doc AND cab.sub_tip=cue.sub_tip AND cab.num_doc=cue.num_doc
LEFT	JOIN v_rhh_emplea emp ON emp.cod_emp=cab.cod_emp
LEFT	JOIN v_rhh_emplea emp1 ON emp1.cod_emp=cue.cod_emp
LEFT	JOIN v_rhh_concep con ON con.cod_con=cab.cod_con
LEFT	JOIN v_rhh_concep con1 ON con1.cod_con=cue.cod_con
LEFT	JOIN rhh_tipliquid tip ON tip.tip_liq=cab.tip_liq
LEFT	JOIN rhh_tipliquid tip1 ON tip1.tip_liq=cue.tip_liq
LEFT	JOIN rhh_Convenio Cnv ON Cnv.cod_conv = cue.cod_conv
LEFT	JOIN rhh_ConvSuc CnSu ON CnSu.cod_conv = cue.cod_conv AND CnSu.conv_suc = cue.conv_suc
LEFT	JOIN rhh_ConvCco CnCc ON CnCc.cod_conv = cue.cod_conv AND CnCc.conv_suc = cue.conv_suc AND CnCc.conv_cco = cue.conv_cco
LEFT	JOIN rhh_ConvCl1 CnC1 ON CnC1.cod_conv = cue.cod_conv AND CnC1.conv_suc = cue.conv_suc AND CnC1.conv_cco = cue.conv_cco AND CnC1.conv_cl1 = cue.conv_cl1
LEFT	JOIN rhh_ConvCl2 CnC2 ON CnC2.cod_conv = cue.cod_conv AND CnC2.conv_suc = cue.conv_suc AND CnC2.conv_cco = cue.conv_cco AND CnC2.conv_cl1 = cue.conv_cl1 AND CnC2.conv_cl2 = cue.conv_cl2
LEFT	JOIN rhh_ConvCl3 CnC3 ON CnC3.cod_conv = cue.cod_conv AND CnC3.conv_suc = cue.conv_suc AND CnC3.conv_cco = cue.conv_cco AND CnC3.conv_cl1 = cue.conv_cl1 AND CnC3.conv_cl2 = cue.conv_cl2 AND CnC3.conv_cl3 = cue.conv_cl3
LEFT	JOIN rhh_ConvCl4 CnC4 ON CnC4.cod_conv = cue.cod_conv AND CnC4.conv_suc = cue.conv_suc AND CnC4.conv_cco = cue.conv_cco AND CnC4.conv_cl1 = cue.conv_cl1 AND CnC4.conv_cl2 = cue.conv_cl2 AND CnC4.conv_cl3 = cue.conv_cl3 AND CnC4.conv_cl4 = cue.conv_cl4
LEFT	JOIN rhh_ConvCl5 CnC5 ON CnC5.cod_conv = cue.cod_conv AND CnC5.conv_suc = cue.conv_suc AND CnC5.conv_cco = cue.conv_cco AND CnC5.conv_cl1 = cue.conv_cl1 AND CnC5.conv_cl2 = cue.conv_cl2 AND CnC5.conv_cl3 = cue.conv_cl3 AND CnC5.conv_cl4 = cue.conv_cl4 AND CnC5.conv_cl5 = cue.conv_cl5
LEFT	JOIN rhh_ConvCl6 CnC6 ON CnC6.cod_conv = cue.cod_conv AND CnC6.conv_suc = cue.conv_suc AND CnC6.conv_cco = cue.conv_cco AND CnC6.conv_cl1 = cue.conv_cl1 AND CnC6.conv_cl2 = cue.conv_cl2 AND CnC6.conv_cl3 = cue.conv_cl3 AND CnC6.conv_cl4 = cue.conv_cl4 AND CnC6.conv_cl5 = cue.conv_cl5 AND CnC6.conv_cl6 = cue.conv_cl6
LEFT	JOIN rhh_ConvCl7 CnC7 ON CnC7.cod_conv = cue.cod_conv AND CnC7.conv_suc = cue.conv_suc AND CnC7.conv_cco = cue.conv_cco AND CnC7.conv_cl1 = cue.conv_cl1 AND CnC7.conv_cl2 = cue.conv_cl2 AND CnC7.conv_cl3 = cue.conv_cl3 AND CnC7.conv_cl4 = cue.conv_cl4 AND CnC7.conv_cl5 = cue.conv_cl5 AND CnC7.conv_cl6 = cue.conv_cl6 AND CnC7.conv_cl7 = cue.conv_cl7
LEFT	JOIN rhh_ConvCl8 CnC8 ON CnC8.cod_conv = cue.cod_conv AND CnC8.conv_suc = cue.conv_suc AND CnC8.conv_cco = cue.conv_cco AND CnC8.conv_cl1 = cue.conv_cl1 AND CnC8.conv_cl2 = cue.conv_cl2 AND CnC8.conv_cl3 = cue.conv_cl3 AND CnC8.conv_cl4 = cue.conv_cl4 AND CnC8.conv_cl5 = cue.conv_cl5 AND CnC8.conv_cl6 = cue.conv_cl6 AND CnC8.conv_cl7 = cue.conv_cl7 AND CnC8.conv_cl8 = cue.conv_cl8

```
