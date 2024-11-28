# View: v_cie_vencidas

## Usa los objetos:
- [[cie_alumnos]]
- [[cie_cabdoc]]
- [[cie_cuedoc]]
- [[gen_configtipo]]

```sql

/*AGREGAMOS CONDICIONANTE POR TIPO DE DOCUMENTO
JCESARS		MAYO/2010
OROMERO     SEPT.-2020 -SRS2020-1151 - Se toma el campo net_doc como saldo para que tenga en cuenta las becas y beneficios
            otorgados al estudiante*/
CREATE VIEW [dbo].[v_cie_vencidas]
AS
SELECT	ano_ref,per_ref,sub_ref,num_ref,reg_ref,fch_doc,fec_ven,b.cod_alu,val_doc,net_doc AS sal_doc,nat_doc,
	cl.nom_alu,cl.dir_resp,cl.tel1_resp,cl.nom_resp,cl.ide_resp
FROM cie_cabdoc AS a WITH(NOLOCK)
	INNER JOIN cie_cuedoc AS b WITH(NOLOCK) ON a.ano_doc=b.ano_doc AND a.per_doc=b.per_doc AND a.sub_tip=b.sub_tip AND a.num_doc=b.num_doc
	INNER JOIN gen_configtipo AS t WITH(NOLOCK) ON a.tip_doc=t.cod_tip
	INNER JOIN cie_alumnos AS cl WITH(NOLOCK) ON b.cod_alu=cl.cod_alu
WHERE t.nat_doc='D' 
	AND t.cod_apl='CIE' 
	AND a.tip_doc BETWEEN '010' AND '039'
UNION ALL
SELECT	ano_ref,per_ref,sub_ref,num_ref,reg_ref,fch_doc,fch_doc AS fec_ven,b.cod_alu,0 AS val_doc,- net_doc AS sal_doc,nat_doc,
	cl.nom_alu,cl.dir_resp,cl.tel1_resp,cl.nom_resp,cl.ide_resp
FROM	cie_cabdoc AS a WITH(NOLOCK)
	INNER JOIN cie_cuedoc AS b WITH(NOLOCK) ON a.ano_doc=b.ano_doc AND a.per_doc=b.per_doc AND a.sub_tip=b.sub_tip AND a.num_doc=b.num_doc
	INNER JOIN gen_configtipo AS t WITH(NOLOCK) ON a.tip_doc=t.cod_tip
	INNER JOIN cie_alumnos AS cl WITH(NOLOCK) ON b.cod_alu=cl.cod_alu
WHERE t.nat_doc='C' 
	AND t.cod_apl='CIE' 
	AND ano_ref<>'0' 
	AND a.tip_doc BETWEEN '040' AND '069'
UNION ALL
SELECT	a.ano_doc AS ano_ref,a.per_doc AS per_ref,a.sub_tip AS sub_ref,a.num_doc AS num_ref,reg_doc AS reg_ref,fch_doc,fch_doc AS fec_ven,
	b.cod_alu,0 AS val_doc,- net_doc AS sal_doc,nat_doc,
	cl.nom_alu,cl.dir_resp,cl.tel1_resp,cl.nom_resp,cl.ide_resp
FROM cie_cabdoc AS a WITH(NOLOCK)
	INNER JOIN cie_cuedoc AS b WITH(NOLOCK) ON a.ano_doc=b.ano_doc AND a.per_doc=b.per_doc AND a.sub_tip=b.sub_tip AND a.num_doc=b.num_doc
	INNER JOIN gen_configtipo AS t WITH(NOLOCK) ON a.tip_doc=t.cod_tip
	INNER JOIN cie_alumnos AS cl WITH(NOLOCK) ON b.cod_alu=cl.cod_alu
WHERE t.nat_doc='C' 
	AND t.cod_apl='CIE' 
	AND ano_ref='0' 
	AND a.tip_doc BETWEEN '040' AND '069';

```
