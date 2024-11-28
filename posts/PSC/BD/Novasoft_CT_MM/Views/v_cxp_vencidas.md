# View: v_cxp_vencidas

## Usa los objetos:
- [[cxp_cabdoc]]
- [[cxp_cuedoc]]
- [[cxp_provee]]
- [[gen_configtipo]]

```sql

/*	AGREGAMOS CONDICIONANTE POR TIPO DE DOCUMENTO
	JCESARS		MAYO/2010
	2020/01/21 Inclusión Instrucción WITH (NOLOCK)
	AFLOREZ MARZO/2022 SRS2022-0242 SE VALIDA CAMPO DE FECHA DE VENCIMIENTO PARA LOS DOCUMENTOS DE REFERENCIA
	AFLOREZ ABRIL/2022 SRS2022-0420 SE CORRIGE INCONSISTENCIA DE CONSULTA DE DOCUMENTOS REFERENCIADOS*/
CREATE VIEW [dbo].[v_cxp_vencidas] AS
SELECT	b.ano_ref,b.per_ref,b.sub_ref,b.num_ref,b.reg_ref,fch_doc,c.fec_ven,b.cod_pro,b.val_doc,b.val_doc AS sal_doc,nat_doc,cl.rso,cl.di1,cl.te1
FROM	cxp_cabdoc AS a WITH (NOLOCK)
		INNER JOIN cxp_cuedoc AS b WITH (NOLOCK) ON a.ano_doc=b.ano_doc AND a.per_doc=b.per_doc AND a.sub_tip=b.sub_tip AND a.num_doc=b.num_doc
		INNER JOIN cxp_cuedoc AS c WITH (NOLOCK) ON c.ano_ref=b.ano_doc AND b.per_ref=c.per_doc AND b.sub_ref=c.sub_tip AND b.num_ref=c.num_doc and b.reg_ref=c.reg_doc
		INNER JOIN gen_configtipo AS t WITH (NOLOCK) ON a.tip_doc=t.cod_tip
		INNER JOIN cxp_provee AS cl WITH (NOLOCK) ON b.cod_pro=cl.provee
WHERE	nat_doc='C' AND t.cod_apl='CXP' AND a.tip_doc BETWEEN '110' AND '139'
UNION ALL
SELECT	b.ano_ref,b.per_ref,b.sub_ref,b.num_ref,b.reg_ref,fch_doc,c.fec_ven AS fec_ven,b.cod_pro,0 AS val_doc,- b.val_doc AS sal_doc,nat_doc,cl.rso,cl.di1,cl.te1
FROM	cxp_cabdoc AS a WITH (NOLOCK) 
		INNER JOIN cxp_cuedoc AS b WITH (NOLOCK) ON a.ano_doc=b.ano_doc AND a.per_doc=b.per_doc AND a.sub_tip=b.sub_tip AND a.num_doc=b.num_doc
		INNER JOIN cxp_cuedoc AS c WITH (NOLOCK) ON b.ano_ref=c.ano_doc AND b.per_ref=c.per_doc AND b.sub_ref=c.sub_tip AND b.num_ref=c.num_doc and b.reg_ref=c.reg_doc
		INNER JOIN gen_configtipo AS t WITH (NOLOCK) ON a.tip_doc=t.cod_tip
		INNER JOIN cxp_provee AS cl WITH (NOLOCK) ON b.cod_pro=cl.provee
WHERE	nat_doc='D' AND b.ano_ref<>'0' AND t.cod_apl='CXP' AND a.tip_doc BETWEEN '140' AND '169'
UNION ALL
SELECT	a.ano_doc AS ano_ref,a.per_doc AS per_ref,a.sub_tip AS sub_ref,a.num_doc AS num_ref,reg_doc AS reg_ref,fch_doc
		,CASE WHEN b.fec_ven IS NOT NULL THEN b.fec_ven ELSE a.fch_doc END AS fec_ven,b.cod_pro,0 AS val_doc,- val_doc AS sal_doc,nat_doc,cl.rso,cl.di1,cl.te1
FROM	cxp_cabdoc AS a WITH (NOLOCK)
		INNER JOIN cxp_cuedoc AS b WITH (NOLOCK) ON a.ano_doc=b.ano_doc AND a.per_doc=b.per_doc AND a.sub_tip=b.sub_tip AND a.num_doc=b.num_doc
		INNER JOIN gen_configtipo AS t WITH (NOLOCK) ON a.tip_doc=t.cod_tip
		INNER JOIN cxp_provee AS cl WITH (NOLOCK) ON b.cod_pro=cl.provee
WHERE	nat_doc='D' AND ano_ref='0' AND t.cod_apl='CXP' AND a.tip_doc BETWEEN '150' AND '169'

```
