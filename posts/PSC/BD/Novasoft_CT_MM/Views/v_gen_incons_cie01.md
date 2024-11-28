# View: v_gen_incons_cie01

## Usa los objetos:
- [[cie_alumnos]]
- [[cie_conceptos]]
- [[cie_inf_cie]]
- [[gen_ccosto]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_subtipodoc]]
- [[gen_sucursal]]

```sql

CREATE VIEW [dbo].[v_gen_incons_cie01]
AS
SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(a.cod_alu)+' Alumno no existe' AS error 
FROM cie_inf_cie AS a WITH(NOLOCK)
	LEFT OUTER JOIN cie_alumnos AS c WITH(NOLOCK) ON a.cod_alu=c.cod_alu 
WHERE c.cod_alu IS NULL

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cod_cl1)+' Clasific 1 no existe' AS error 
FROM cie_inf_cie AS a WITH(NOLOCK) 
	LEFT OUTER JOIN gen_clasif1 AS c WITH(NOLOCK) ON a.cod_cl1=c.codigo
WHERE c.codigo IS NULL

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cod_cl2)+' Clasific 2 no existe' AS error 
FROM cie_inf_cie AS a WITH(NOLOCK) 
	LEFT OUTER JOIN gen_clasif2 AS c WITH(NOLOCK) ON a.cod_cl2=c.codigo
WHERE c.codigo IS NULL

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cod_cl3)+' Clasific 3 no existe' AS error 
FROM cie_inf_cie AS a WITH(NOLOCK) 
	LEFT OUTER JOIN gen_clasif3 AS c WITH(NOLOCK) ON a.cod_cl3=c.codigo
WHERE c.codigo IS NULL

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(a.cod_cco)+' Ccosto  no existe' AS error 
FROM cie_inf_cie AS a WITH(NOLOCK) 
	LEFT OUTER JOIN gen_ccosto AS c WITH(NOLOCK) ON a.cod_cco=c.cod_cco
WHERE c.cod_cco IS NULL

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(a.cod_suc)+' Sucursal  no existe' AS error 
FROM cie_inf_cie AS a WITH(NOLOCK) 
	INNER JOIN gen_sucursal AS c WITH(NOLOCK) ON a.cod_suc=c.cod_suc
WHERE c.cod_suc IS NULL

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(sub_tip)+' Tipo documento  no existe' AS error 
FROM cie_inf_cie AS a WITH(NOLOCK) 
	LEFT OUTER JOIN gen_subtipodoc AS c WITH(NOLOCK) ON a.sub_tip=c.cod_sub AND a.tip_doc=c.cod_tip
WHERE c.cod_tip IS NULL

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(a.cod_con)+' Concepto no existe' AS error 
FROM cie_inf_cie AS a WITH(NOLOCK) 
	LEFT OUTER JOIN cie_conceptos AS c WITH(NOLOCK) ON a.cod_con=c.cod_con
WHERE c.cod_con IS NULL;

```
