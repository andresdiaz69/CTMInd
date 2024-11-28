# View: V_rhh_tbfondos

## Usa los objetos:
- [[rhh_tbfondos]]
- [[rhh_tbtipfdo]]

```sql
CREATE VIEW [dbo].[V_rhh_tbfondos]
AS
SELECT		F.cod_fdo,
			F.nom_fdo,
			F.nit_ter,
			F.dvr_ter,
			F.sec_fdo,
			F.tip_fdo,
			F.cod_sgs,
			F.cta_fdo,
			F.cta_deb,
			F.ind_326,
			F.ind_d30,
			F.ind_dau,
			F.cod_con,
			F.ind_prov,
			F.ind_12va_inc,
			F.cre_fsp,
			F.deb_fsp,
			F.cod_SAP,
			F.niif_deb,
			F.niif_cre,
			F.niif_debfsp,
			F.niif_crefsp,
			T.des_tip,
			T.ind_cto,
			T.ind_terc,
			T.Afi_mult,
			T.ind_ctt
FROM     dbo.rhh_tbfondos  F
INNER JOIN  rhh_tbtipfdo T ON T.tip_fdo = F.tip_fdo
WHERE    T.ind_ctt = 1
                    

```
