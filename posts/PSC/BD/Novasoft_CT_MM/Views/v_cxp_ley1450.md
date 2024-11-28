# View: v_cxp_ley1450

## Usa los objetos:
- [[cxp_ley1450]]

```sql

-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_cxp_ley1450]
AS
SELECT cod_pro,ano_ret,per_ret,val_ftm,val_aps,val_app,val_fso,val_rie,val_afc,val_afa,por_rie,val_com,val_apc,ind_dep,val_dep,val_mos,val_msa,bas_25p
			,val_25e,bas_ret,por_rps,ral_ftm,ral_aps,ral_app,ral_fso,ral_rie,ral_afc,ral_afa,val_com AS ral_val_com,val_apc AS ral_val_apc,ind_dep AS ral_ind_dep,ral_dep,val_mos AS ral_val_mos
			,val_msa AS ral_val_msa,ras_25p,ral_25e,ras_ret
			,ror_rps,val_ret,bas_iman,val_iman,bas_rea,ral_ret,dif_bas,dif_ret
FROM cxp_ley1450  WITH (NOLOCK)

```
