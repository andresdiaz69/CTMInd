# View: v_cxp_vencim

## Usa los objetos:
- [[cxp_cabdoc]]
- [[cxp_cuedoc]]
- [[cxp_provee]]
- [[gen_configtipo]]

```sql

-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_cxp_vencim]
AS
SELECT	ano_ref,per_ref,sub_ref,num_ref,fch_doc,fec_ven,cod_pro,val_doc,val_doc AS sal_doc,ind_mp,nat_doc,cl.rso,cl.di1,cl.te1
FROM	cxp_cabdoc AS a WITH (NOLOCK) INNER JOIN cxp_cuedoc AS b WITH (NOLOCK) ON a.ano_doc=b.ano_doc AND a.per_doc=b.per_doc AND a.tip_doc=b.tip_doc AND a.num_doc=b.num_doc
		INNER JOIN gen_configtipo AS t WITH (NOLOCK) ON a.tip_doc=t.cod_tip
		INNER JOIN cxp_provee AS cl WITH (NOLOCK) ON b.cod_pro=cl.provee
WHERE	a.tip_doc=cod_tip AND nat_doc='C'
UNION ALL 
SELECT	ano_ref,per_ref,sub_ref,num_ref,fch_doc,fec_ven,cod_pro,0 AS val_doc,-val_doc AS sal_doc,ind_mp,nat_doc,cl.rso,cl.di1,cl.te1
FROM	cxp_cabdoc AS a WITH (NOLOCK) INNER JOIN cxp_cuedoc AS b WITH (NOLOCK) ON a.ano_doc=b.ano_doc AND a.per_doc=b.per_doc AND a.tip_doc=b.tip_doc AND a.num_doc=b.num_doc
		INNER JOIN gen_configtipo AS t WITH (NOLOCK) ON a.tip_doc=t.cod_tip
		INNER JOIN cxp_provee AS cl WITH (NOLOCK) ON b.cod_pro=cl.provee
WHERE	a.tip_doc=cod_tip AND nat_doc='D'

```
