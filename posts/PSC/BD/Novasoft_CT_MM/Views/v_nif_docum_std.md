# View: v_nif_docum_std

## Usa los objetos:
- [[gen_ccosto]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_monedas]]
- [[gen_sucursal]]
- [[gen_terceros]]
- [[nif_cabdoc]]
- [[nif_codplan]]
- [[nif_cuedoc]]
- [[nif_puc]]

```sql

CREATE VIEW [dbo].[v_nif_docum_std]
AS
SELECT a.fch_doc,a.apl_ori,a.cambio,a.det_doc,a.ind_mp,a.ind_tas,b.ano_doc,b.per_doc,b.sub_tip,b.tip_doc,b.num_doc,b.reg_doc,b.cod_cta,b.trans,b.cod_suc,
			b.cod_cco,b.cod_ter,b.num_che,b.bas_mov,b.des_mov,b.deb_mov,b.cre_mov,b.tip_mov,b.fch_mov,b.cod_cl1,b.cod_cl2,b.cod_cl3,b.cod_dif,
			b.diferencia,b.dex_mov,b.cex_mov,b.marca,b.ind_mr,b.fec_tas,b.tasa,
			p.nom_cta,
			t.ter_nombre,
			s.nom_suc,
			c.nom_cco,
			x.nombre AS nom_cl1,
			y.nombre AS nom_cl2,
			z.nombre AS nom_cl3,
			m.des_mon,pl.des_plan,
			a.fec_grab,a.usuario,b.num_concil
FROM nif_cabdoc AS a WITH(NOLOCK)
	INNER JOIN nif_cuedoc AS b WITH(NOLOCK) ON a.ano_doc=b.ano_doc AND a.per_doc=b.per_doc AND a.sub_tip=b.sub_tip AND a.num_doc=b.num_doc
	INNER JOIN nif_puc AS p WITH(NOLOCK) ON b.cod_cta=p.cod_cta
	INNER JOIN gen_terceros AS t WITH(NOLOCK) ON b.cod_ter=t.ter_nit
	INNER JOIN gen_sucursal AS s WITH(NOLOCK) ON b.cod_suc=s.cod_suc
	INNER JOIN gen_ccosto AS c WITH(NOLOCK) ON b.cod_cco=c.cod_cco
	INNER JOIN gen_clasif1 AS x WITH(NOLOCK) ON b.cod_cl1=x.codigo
	INNER JOIN gen_clasif2 AS y WITH(NOLOCK) ON b.cod_cl2=y.codigo
	INNER JOIN gen_clasif3 AS z WITH(NOLOCK) ON b.cod_cl3=z.codigo
	INNER JOIN gen_monedas AS m WITH(NOLOCK)ON a.ind_mp=m.cod_mon
	LEFT OUTER JOIN nif_codplan AS pl WITH(NOLOCK) ON a.cod_plan=pl.cod_plan

```
