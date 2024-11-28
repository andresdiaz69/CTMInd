# View: v_cie_facts_nc

## Usa los objetos:
- [[cie_conceptos]]
- [[v_cie_docum_std]]

```sql

CREATE VIEW [dbo].[v_cie_facts_nc]
AS
	SELECT	a.ano_doc,a.per_doc,a.sub_tip,a.num_doc,a.reg_doc,a.cod_alu,
			a.val_doc,a.tot_Desc,a.net_doc,a.sal_doc,c.ind_pag,c.tip_con,c.ind_ecur, 'FC' AS docum
	FROM v_cie_docum_std AS a WITH (NOLOCK)
		INNER JOIN cie_conceptos AS c WITH (NOLOCK) ON a.cod_con=c.cod_con AND ind_pag=1 AND ind_Ecur=0
	WHERE tip_doc='020' 
		AND cambio='0'
	UNION ALL 
	SELECT	a.ano_doc,a.per_doc,a.sub_tip,a.num_doc,a.reg_doc,a.cod_alu,
			a.val_doc,a.tot_Desc,a.net_doc,a.sal_doc,c.ind_pag,c.tip_con,c.ind_ecur, 'ND' AS docum
	FROM v_cie_docum_std AS a WITH (NOLOCK)
		INNER JOIN cie_conceptos AS c WITH (NOLOCK) ON a.cod_con=c.cod_con AND ind_pag=1 AND ind_Ecur=0
	WHERE tip_doc='030' 
		AND cambio='0'
	UNION ALL 
	SELECT	a.ano_ref,a.per_ref,a.sub_ref,a.num_ref,a.reg_ref,a.cod_alu,
			a.val_doc,CONVERT(MONEY,0) tot_Desc,a.net_doc,CONVERT(MONEY,0) sal_doc,c.ind_pag,c.tip_con,c.ind_ecur,'NC' AS docum
	FROM v_cie_docum_std AS a WITH (NOLOCK)
		INNER JOIN cie_conceptos AS c WITH (NOLOCK) ON a.cod_con=c.cod_con AND ind_pag=1 AND ind_Ecur=0
	WHERE tip_doc='050' 
		AND cambio='0';

```
