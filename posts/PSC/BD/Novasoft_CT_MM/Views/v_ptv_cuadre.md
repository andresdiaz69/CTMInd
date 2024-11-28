# View: v_ptv_cuadre

## Usa los objetos:
- [[gen_cajas]]
- [[gen_tipodoc]]
- [[ptv_detcuadre_caja]]
- [[ptv_forpag]]

```sql

-- 2020/01/23 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_ptv_cuadre]
AS
SELECT d.ano_doc,d.per_doc,d.tip_doc,d.sub_tip, d.num_doc,d.fch_doc,d.usu_caj,d.cod_ven,d.cod_caj,d.tip_caj,
d.for_pag,d.doc_pag,
CASE WHEN d.tip_doc IN('520','540','302') THEN d.val_pag*-1 ELSE d.val_pag END AS val_pag,
CASE WHEN d.tip_doc IN('520','540','302') THEN d.cambio*-1 ELSE d.cambio END AS cambio,
CASE WHEN d.tip_doc IN('520','540','302') THEN d.val_iva*-1 ELSE d.val_iva END AS val_iva,
CASE WHEN d.tip_doc IN('520','540','302') THEN d.val_fac*-1 ELSE d.val_fac END AS val_fac,
CASE WHEN d.tip_doc IN('520','540','302') THEN d.val_ant*-1 ELSE d.val_ant END AS val_ant,
c.nom_caj,f.nombre,d.ind_cons,d.comp_cons,reg_pag AS regno,g.des_tip,f.tip_pag, d.num_ant
FROM dbo.ptv_detcuadre_caja AS d WITH (NOLOCK) 
INNER JOIN dbo.gen_cajas AS c WITH (NOLOCK) ON d.cod_caj = c.cod_caj 
INNER JOIN dbo.ptv_forpag AS f WITH (NOLOCK) ON d.for_pag = f.cod_pag
INNER JOIN dbo.gen_tipodoc AS g WITH (NOLOCK) ON d.tip_doc = g.cod_tip

```
