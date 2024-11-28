# View: v_ppe_ings

## Usa los objetos:
- [[gen_subtipodoc]]
- [[ppe_activos]]
- [[ppe_cabdoc]]
- [[ppe_cuedoc]]

```sql

-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_ppe_ings]
AS
SELECT DISTINCT dbo.ppe_cabdoc.ano_doc, dbo.ppe_cabdoc.per_doc, dbo.ppe_cabdoc.tip_doc,dbo.ppe_cabdoc.sub_tip, dbo.ppe_cabdoc.num_doc, dbo.ppe_cabdoc.fec_doc, dbo.ppe_cabdoc.det_doc, 
                  dbo.ppe_cuedoc.reg_doc, dbo.ppe_cuedoc.cod_item, dbo.ppe_activos.cod_pla, dbo.ppe_cuedoc.val_uni, dbo.ppe_cuedoc.cod_ter, dbo.ppe_cuedoc.cod_bod, 
                  dbo.ppe_activos.des_cor, dbo.ppe_activos.cod_ter AS Expr1, dbo.ppe_activos.cod_suc, dbo.ppe_activos.cod_cco, dbo.ppe_activos.cod_cl1, dbo.ppe_activos.cod_cl2, 
                  dbo.ppe_activos.cod_cl3, dbo.ppe_activos.fec_asig, dbo.ppe_activos.num_asig, dbo.ppe_activos.cod_prv, dbo.ppe_activos.cod_clas, dbo.ppe_activos.cos_def, 
                  dbo.ppe_activos.costo, dbo.ppe_activos.val_net, dbo.ppe_activos.ano_ing, dbo.ppe_activos.per_ing, dbo.ppe_activos.sub_ing, dbo.ppe_activos.num_ing,
				  dbo.gen_subtipodoc.nom_sub
FROM     dbo.ppe_cabdoc WITH (NOLOCK) 
INNER JOIN  dbo.ppe_cuedoc WITH (NOLOCK) ON dbo.ppe_cabdoc.ano_doc = dbo.ppe_cuedoc.ano_doc AND dbo.ppe_cabdoc.per_doc = dbo.ppe_cuedoc.per_doc AND 
            dbo.ppe_cabdoc.sub_tip = dbo.ppe_cuedoc.sub_tip AND dbo.ppe_cabdoc.num_doc = dbo.ppe_cuedoc.num_doc 
INNER JOIN gen_subtipodoc WITH (NOLOCK) ON gen_subtipodoc.cod_sub= ppe_cabdoc.sub_tip
INNER JOIN dbo.ppe_activos WITH (NOLOCK) ON dbo.ppe_cabdoc.ano_doc = dbo.ppe_activos.ano_ing AND dbo.ppe_cabdoc.per_doc = dbo.ppe_activos.per_ing AND 
            dbo.ppe_cabdoc.sub_tip = dbo.ppe_activos.sub_ing AND dbo.ppe_cabdoc.num_doc = dbo.ppe_activos.num_ing AND dbo.ppe_cuedoc.reg_doc=dbo.ppe_activos.reg_ing

```
