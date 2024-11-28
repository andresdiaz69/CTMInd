# View: v_cxc_vencidas

## Usa los objetos:
- [[cxc_cabdoc]]
- [[cxc_cliente]]
- [[cxc_cuedoc]]
- [[gen_configtipo]]

```sql

--	AGREGAMOS CONDICIONANTE POR TIPO DE DOCUMENTO
--	JCESARS		MAYO/2010
-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_cxc_vencidas] AS
SELECT	ano_ref,per_ref,sub_ref,num_ref,reg_ref,fch_doc,fec_ven,b.cod_cli,val_doc,val_doc AS sal_doc,nat_doc,cl.nom_cli,cl.di1_cli,cl.te1_cli
FROM	cxc_cabdoc AS a  WITH (NOLOCK) INNER JOIN cxc_cuedoc AS b  WITH (NOLOCK) ON a.ano_doc=b.ano_doc AND a.per_doc=b.per_doc AND a.sub_tip=b.sub_tip AND a.num_doc=b.num_doc
		INNER JOIN gen_configtipo AS t  WITH (NOLOCK) ON a.tip_doc=t.cod_tip
		INNER JOIN cxc_cliente AS cl  WITH (NOLOCK) ON b.cod_cli=cl.cod_cli
WHERE	t.nat_doc='D' AND t.cod_apl='CXC' AND a.tip_doc BETWEEN '010' AND '039'
UNION ALL
SELECT	ano_ref,per_ref,sub_ref,num_ref,reg_ref,fch_doc,fch_doc AS fec_ven,b.cod_cli,0 AS val_doc,- val_doc AS sal_doc,nat_doc,cl.nom_cli,cl.di1_cli,cl.te1_cli
FROM	cxc_cabdoc AS a  WITH (NOLOCK) INNER JOIN cxc_cuedoc b  WITH (NOLOCK) ON a.ano_doc=b.ano_doc AND a.per_doc=b.per_doc AND a.sub_tip=b.sub_tip AND a.num_doc=b.num_doc
		INNER JOIN gen_configtipo AS t  WITH (NOLOCK) ON a.tip_doc=t.cod_tip
		INNER JOIN cxc_cliente AS cl  WITH (NOLOCK) ON b.cod_cli=cl.cod_cli
WHERE	t.nat_doc='C' AND t.cod_apl='CXC' AND ano_ref<>'0' AND a.tip_doc BETWEEN '040' AND '069'
UNION ALL
SELECT	a.ano_doc AS ano_ref,a.per_doc AS per_ref,a.sub_tip AS sub_ref,a.num_doc AS num_ref,reg_doc AS reg_ref,fch_doc,fch_doc AS fec_ven,b.cod_cli,0 AS val_doc,- val_doc AS sal_doc,nat_doc,cl.nom_cli,cl.di1_cli,cl.te1_cli
FROM	cxc_cabdoc AS a  WITH (NOLOCK) INNER JOIN cxc_cuedoc AS b  WITH (NOLOCK) ON a.ano_doc=b.ano_doc AND a.per_doc=b.per_doc AND a.sub_tip=b.sub_tip AND a.num_doc=b.num_doc
		INNER JOIN gen_configtipo AS t  WITH (NOLOCK) ON a.tip_doc=t.cod_tip
		INNER JOIN cxc_cliente AS cl  WITH (NOLOCK) ON b.cod_cli=cl.cod_cli
WHERE	t.nat_doc='C' AND t.cod_apl='CXC' AND ano_ref='0' AND a.tip_doc BETWEEN '040' AND '069'

```
