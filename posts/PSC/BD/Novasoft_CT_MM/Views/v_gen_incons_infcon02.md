# View: v_gen_incons_infcon02

## Usa los objetos:
- [[cnt_puc]]
- [[gen_ccosto]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_monedas]]
- [[gen_subtipodoc]]
- [[gen_sucursal]]
- [[gen_terceros]]
- [[v_gen_infcon]]

```sql

/*ADECUACION VERSION WEB	JCESARS	SEPTIEMBRE/2007.
MODIFICACION PARA TRAER INFORMACION COMPLETA A LA TABLA DE INCONSISTENCIAS	JCESARS	ABRIL/2009
AGREGAMOS VALIDACION SOBRE LA TABLA DE MONEDAS
SRS	2012-0026
JCESARS		MARZO/2012*/
CREATE VIEW [dbo].[v_gen_incons_infcon02]
AS
SELECT a.ano_doc,a.per_doc,a.sub_tip,a.num_doc,a.reg_doc,a.cod_cta AS codigo,' Cuenta no existe'  AS error,a.aplic 
FROM v_gen_infcon AS a WITH(NOLOCK) 
	LEFT OUTER JOIN cnt_puc AS b WITH(NOLOCK) ON a.cod_cta=b.cod_cta
WHERE b.cod_cta IS NULL

UNION ALL

SELECT a.ano_doc,a.per_doc,a.sub_tip,a.num_doc,a.reg_doc,a.cod_suc AS codigo,' Sucursal no existe'  AS error,a.aplic 
FROM v_gen_infcon AS a WITH(NOLOCK) 
	LEFT OUTER JOIN gen_sucursal AS b WITH(NOLOCK) ON a.cod_suc=b.cod_suc
WHERE b.cod_suc IS NULL

UNION ALL

SELECT a.ano_doc,a.per_doc,a.sub_tip,a.num_doc,a.reg_doc,a.cod_ter AS codigo,' Tercero no existe'  AS error,aplic 
FROM v_gen_infcon AS a WITH(NOLOCK) 
	LEFT OUTER JOIN gen_terceros AS b WITH(NOLOCK) ON a.cod_ter=b.ter_nit
WHERE b.ter_nit IS NULL

UNION ALL

SELECT a.ano_doc,a.per_doc,a.sub_tip,a.num_doc,a.reg_doc,a.cod_cl1 AS codigo,' Clasific 1 no existe'  AS error,aplic 
FROM v_gen_infcon AS a WITH(NOLOCK) 
	LEFT OUTER JOIN gen_clasif1 AS b WITH(NOLOCK) ON a.cod_cl1=b.codigo
WHERE b.codigo IS NULL

UNION ALL

SELECT a.ano_doc,a.per_doc,a.sub_tip,a.num_doc,a.reg_doc,a.cod_cl2 AS codigo,' Clasific 2 no existe'  AS error,aplic 
FROM v_gen_infcon AS a WITH(NOLOCK) 
	LEFT OUTER JOIN gen_clasif2 AS b WITH(NOLOCK) ON a.cod_cl2=b.codigo
WHERE b.codigo IS NULL

UNION ALL

SELECT a.ano_doc,a.per_doc,a.sub_tip,a.num_doc,a.reg_doc,a.cod_cl3 AS codigo,' Clasific 3 no existe'  AS error,aplic 
FROM v_gen_infcon AS a WITH(NOLOCK) 
	LEFT OUTER JOIN gen_clasif3 AS b WITH(NOLOCK) ON a.cod_cl3=b.codigo
WHERE b.codigo IS NULL

UNION ALL

SELECT a.ano_doc,a.per_doc,a.sub_tip,a.num_doc,a.reg_doc,a.cod_cco as codigo,' Ccosto  no existe'  AS error,aplic 
FROM v_gen_infcon AS a WITH(NOLOCK) 
	LEFT OUTER JOIN gen_ccosto AS b WITH(NOLOCK) ON a.cod_cco=b.cod_cco
WHERE b.cod_cco IS NULL

UNION ALL

SELECT a.ano_doc,a.per_doc,a.sub_tip,a.num_doc,a.reg_doc,a.sub_tip as codigo,' Subtipo de documento  no existe'  AS error,aplic 
FROM v_gen_infcon  AS a WITH(NOLOCK) 
	LEFT OUTER JOIN gen_subtipodoc AS b WITH(NOLOCK) ON a.sub_tip=b.cod_sub
WHERE b.cod_sub IS NULL

UNION ALL

SELECT a.ano_doc,a.per_doc,a.sub_tip,a.num_doc,a.reg_doc,a.ind_mr as codigo,' Moneda no existe'  AS error,aplic 
FROM v_gen_infcon AS a WITH(NOLOCK) 
	LEFT OUTER JOIN gen_monedas AS b WITH(NOLOCK) ON a.ind_mr=b.cod_mon
WHERE b.cod_mon IS NULL;

```
