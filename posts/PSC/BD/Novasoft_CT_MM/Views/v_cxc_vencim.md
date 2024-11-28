# View: v_cxc_vencim

## Usa los objetos:
- [[cxc_cabdoc]]
- [[cxc_cliente]]
- [[cxc_cuedoc]]
- [[gen_configtipo]]

```sql

-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_cxc_vencim] AS
SELECT	ano_ref,per_ref,sub_ref,num_ref,reg_ref,fch_doc,fec_ven,b.cod_cli,val_doc,val_doc AS sal_doc,nat_doc,cl.nom_cli,cl.di1_cli,cl.te1_cli,cl.tip_mon
FROM	cxc_cabdoc a INNER JOIN cxc_cuedoc b ON a.ano_doc=b.ano_doc AND a.per_doc=b.per_doc AND a.sub_tip=b.sub_tip AND a.num_doc=b.num_doc
		INNER JOIN gen_configtipo t ON a.tip_doc=t.cod_tip
		INNER JOIN cxc_cliente cl ON b.cod_cli=cl.cod_cli
WHERE	nat_doc='D'
UNION ALL
SELECT	ano_ref,per_ref,sub_ref,num_ref,reg_ref,fch_doc,fec_ven,b.cod_cli,0 AS val_doc,- val_doc AS sal_doc,nat_doc,cl.nom_cli,cl.di1_cli,cl.te1_cli,cl.tip_mon
FROM	cxc_cabdoc AS a WITH (NOLOCK) INNER JOIN cxc_cuedoc AS b WITH (NOLOCK) ON a.ano_doc=b.ano_doc AND a.per_doc=b.per_doc AND a.sub_tip=b.sub_tip AND a.num_doc=b.num_doc
		INNER JOIN gen_configtipo AS t WITH (NOLOCK) ON a.tip_doc=t.cod_tip
		INNER JOIN cxc_cliente AS cl WITH (NOLOCK) ON b.cod_cli=cl.cod_cli
WHERE	nat_doc='C'

```
