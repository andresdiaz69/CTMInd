# View: v_gen_consec

## Usa los objetos:
- [[cnt_cabdoc]]
- [[cxc_cabdoc]]
- [[cxp_cabdoc]]
- [[gen_subtipodoc]]
- [[inv_cabdoc]]
- [[nif_cabdoc]]
- [[tes_cabdoc]]

```sql

CREATE VIEW [dbo].[v_gen_consec]
AS
SELECT ano_doc, per_doc, tip_doc, sub_tip,  sub.nom_sub, num_doc, 'CXC' AS aplic
FROM cxc_cabdoc AS cab WITH(NOLOCK)
	INNER JOIN gen_subtipodoc AS sub WITH(NOLOCK) ON cab.tip_doc = sub.cod_tip and cab.sub_tip = sub.cod_sub

UNION ALL

SELECT ano_doc, per_doc, tip_doc, sub_tip, sub.nom_sub, num_doc, 'CXP' AS aplic
FROM cxp_cabdoc AS cab WITH(NOLOCK)
	INNER JOIN gen_subtipodoc AS sub WITH(NOLOCK) ON cab.tip_doc = sub.cod_tip and cab.sub_tip = sub.cod_sub

UNION ALL

SELECT ano_doc, per_doc, tip_doc, sub_tip, sub.nom_sub,  num_doc,  'INV' AS aplic
FROM inv_cabdoc AS cab WITH(NOLOCK) 
	INNER JOIN gen_subtipodoc AS sub WITH(NOLOCK) ON cab.tip_doc = sub.cod_tip and cab.sub_tip = sub.cod_sub

UNION ALL

SELECT ano_doc, per_doc, tip_doc, sub_tip, sub.nom_sub, num_doc,  'TES' AS aplic
FROM tes_cabdoc AS cab WITH(NOLOCK) 
	INNER JOIN gen_subtipodoc AS sub WITH(NOLOCK) ON cab.tip_doc = sub.cod_tip and cab.sub_tip = sub.cod_sub

UNION ALL

SELECT ano_doc, per_doc, tip_doc, sub_tip,  sub.nom_sub, num_doc, 'CNT' AS aplic
FROM cnt_cabdoc AS cab WITH(NOLOCK) 
	INNER JOIN gen_subtipodoc AS sub WITH(NOLOCK) ON cab.tip_doc = sub.cod_tip and cab.sub_tip = sub.cod_sub

UNION ALL

SELECT ano_doc, per_doc, tip_doc, sub_tip,  sub.nom_sub, num_doc, 'NIF' AS aplic
FROM nif_cabdoc AS cab WITH(NOLOCK) 
	INNER JOIN gen_subtipodoc AS sub WITH(NOLOCK) ON cab.tip_doc = sub.cod_tip and cab.sub_tip = sub.cod_sub;

```
