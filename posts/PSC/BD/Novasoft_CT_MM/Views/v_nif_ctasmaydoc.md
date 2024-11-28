# View: v_nif_ctasmaydoc

## Usa los objetos:
- [[gen_ccosto]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_sucursal]]
- [[nif_cuedoc]]
- [[nif_puc]]

```sql

CREATE VIEW [dbo].[v_nif_ctasmaydoc]
AS
SELECT        cue.ano_doc, cue.per_doc, cue.tip_doc, cue.num_doc, cue.reg_doc, cue.cod_cta, puc.nom_cta, puc.tip_cta, cue.cod_suc, dbo.gen_sucursal.nom_suc, cue.cod_cco, 
                         dbo.gen_ccosto.nom_cco, cue.cod_cl1, dbo.gen_clasif1.nombre AS Nom_cl1, cue.cod_cl2, dbo.gen_clasif2.nombre AS Nom_cl2, cue.cod_cl3, 
                         dbo.gen_clasif3.nombre AS Nom_cl3
FROM            dbo.nif_cuedoc AS cue WITH(NOLOCK) 
	INNER JOIN dbo.nif_puc AS puc WITH(NOLOCK) ON cue.cod_cta = puc.cod_cta 
	INNER JOIN dbo.gen_sucursal WITH(NOLOCK) ON cue.cod_suc = dbo.gen_sucursal.cod_suc 
	INNER JOIN dbo.gen_ccosto WITH(NOLOCK) ON cue.cod_cco = dbo.gen_ccosto.cod_cco 
	INNER JOIN dbo.gen_clasif1 WITH(NOLOCK) ON cue.cod_cl1 = dbo.gen_clasif1.codigo 
	INNER JOIN dbo.gen_clasif2 WITH(NOLOCK) ON cue.cod_cl2 = dbo.gen_clasif2.codigo 
	INNER JOIN dbo.gen_clasif3 WITH(NOLOCK) ON cue.cod_cl3 = dbo.gen_clasif3.codigo
WHERE        (puc.tip_cta = 1) AND (cue.tip_doc <> '900');

```
