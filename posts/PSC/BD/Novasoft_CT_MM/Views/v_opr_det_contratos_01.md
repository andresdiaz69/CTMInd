# View: v_opr_det_contratos_01

## Usa los objetos:
- [[inv_items]]
- [[opr_det_contratos]]

```sql

-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_opr_det_contratos_01]
AS
SELECT	a.grupo,a.num_cto,a.cod_item,a.sit_cli,a.cod_conv,a.cod_cli,a.cantidad,a.val_uni,a.val_tot,a.recursos,a.ind_fac,b.des_item,item_AIU,tar_AIU,
		cod_ica as actividad,bodega,hor_ini,hor_fin,ind_lun,ind_mar,ind_mie,ind_jue,ind_vie,ind_sab,ind_dom,fch_ini,fch_fin,cod_mon,ind_tas,tasa_neg,
		ind_fes,sub_tip,hor_lun,hor_mar,hor_mie,hor_jue,hor_vie,hor_sab,hor_dom,hor_fes
FROM	opr_det_contratos AS a WITH(NOLOCK) INNER JOIN inv_items AS b WITH(NOLOCK) on a.cod_item=b.cod_item
WHERE	b.ind_opr='01'

```
