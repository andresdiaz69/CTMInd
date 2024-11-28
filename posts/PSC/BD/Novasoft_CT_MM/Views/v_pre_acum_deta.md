# View: v_pre_acum_deta

## Usa los objetos:
- [[pre_acumula]]
- [[pre_clasifica]]
- [[pre_detalle]]
- [[pre_rubro]]

```sql

CREATE VIEW [dbo].[v_pre_acum_deta]
AS
SELECT pre_acumula.ano_acu, pre_acumula.cod_cl1, pre_acumula.cod_cl2, pre_acumula.cod_cl3, pre_acumula.cod_suc, pre_acumula.cod_cco, 
    pre_acumula.cod_rubro, pre_acumula.apr_ini, 
    pre_acumula.apr_adi, pre_acumula.apr_red, 
    pre_acumula.apr_fin, pre_acumula.com_01, 
    pre_acumula.com_02, pre_acumula.com_03, 
    pre_acumula.com_04, pre_acumula.com_05, 
    pre_acumula.com_06, pre_acumula.com_07, 
    pre_acumula.com_08, pre_acumula.com_09, 
    pre_acumula.com_10, pre_acumula.com_11, 
    pre_acumula.com_12, pre_acumula.sal_apr01, 
    pre_acumula.sal_apr02, pre_acumula.sal_apr03, 
    pre_acumula.sal_apr04, pre_acumula.sal_apr05, 
    pre_acumula.sal_apr06, pre_acumula.sal_apr07, 
    pre_acumula.sal_apr08, pre_acumula.sal_apr09, 
    pre_acumula.sal_apr10, pre_acumula.sal_apr11, 
    pre_acumula.sal_apr12, pre_acumula.fac_01, 
    pre_acumula.fac_02, pre_acumula.fac_03, 
    pre_acumula.fac_04, pre_acumula.fac_05, 
    pre_acumula.fac_06, pre_acumula.fac_07, 
    pre_acumula.fac_08, pre_acumula.fac_09, 
    pre_acumula.fac_10, pre_acumula.fac_11, 
    pre_acumula.fac_12,
  SUM(ISNULL(pre_detalle.val_01,0)) AS det01, 
  SUM(ISNULL(pre_detalle.val_02,0)) AS det02, 
  SUM(ISNULL(pre_detalle.val_03,0)) AS det03, 
  SUM(ISNULL(pre_detalle.val_04,0)) AS det04, 
  SUM(ISNULL(pre_detalle.val_05,0)) AS det05, 
  SUM(ISNULL(pre_detalle.val_06,0)) AS det06, 
  SUM(ISNULL(pre_detalle.val_07,0)) AS det07, 
  SUM(ISNULL(pre_detalle.val_08,0)) AS det08, 
  SUM(ISNULL(pre_detalle.val_09,0)) AS det09, 
  SUM(ISNULL(pre_detalle.val_10,0)) AS det10, 
  SUM(ISNULL(pre_detalle.val_11,0)) AS det11, 
  SUM(ISNULL(pre_detalle.val_12,0)) AS det12,
pre_clasifica.nom_clas as nom_clas,pre_rubro.cod_clas AS cod_clas
FROM pre_acumula 
    INNER JOIN pre_rubro ON pre_acumula.cod_rubro=pre_rubro.cod_rub 
    LEFT OUTER JOIN pre_clasifica ON pre_rubro.cod_clas=pre_clasifica.cod_clas 
    LEFT OUTER JOIN pre_detalle ON pre_rubro.cod_rub=pre_detalle.cod_rubro AND pre_acumula.ano_acu=pre_detalle.ano_det AND 
pre_acumula.cod_rubro=pre_detalle.cod_rubro AND pre_acumula.cod_cl1=pre_detalle.cod_cl1 AND pre_acumula.cod_cl2=pre_detalle.cod_cl2 AND 
pre_acumula.cod_cl3=pre_detalle.cod_cl3 AND pre_acumula.cod_suc=pre_detalle.cod_suc AND pre_acumula.cod_cco=pre_detalle.cod_cco
GROUP BY pre_acumula.ano_acu, pre_acumula.cod_cl1, pre_acumula.cod_cl2, pre_acumula.cod_cl3, pre_acumula.cod_suc, pre_acumula.cod_cco, 
    pre_acumula.cod_rubro, pre_acumula.apr_ini, 
    pre_acumula.apr_adi, pre_acumula.apr_red, 
    pre_acumula.apr_fin, pre_acumula.com_01, 
    pre_acumula.com_02, pre_acumula.com_03, 
    pre_acumula.com_04, pre_acumula.com_05, 
    pre_acumula.com_06, pre_acumula.com_07, 
    pre_acumula.com_08, pre_acumula.com_09, 
    pre_acumula.com_10, pre_acumula.com_11, 
    pre_acumula.com_12, pre_acumula.sal_apr01, 
    pre_acumula.sal_apr02, pre_acumula.sal_apr03, 
    pre_acumula.sal_apr04, pre_acumula.sal_apr05, 
    pre_acumula.sal_apr06, pre_acumula.sal_apr07, 
    pre_acumula.sal_apr08, pre_acumula.sal_apr09, 
    pre_acumula.sal_apr10, pre_acumula.sal_apr11, 
    pre_acumula.sal_apr12, pre_acumula.fac_01, 
    pre_acumula.fac_02, pre_acumula.fac_03, 
    pre_acumula.fac_04, pre_acumula.fac_05, 
    pre_acumula.fac_06, pre_acumula.fac_07, 
    pre_acumula.fac_08, pre_acumula.fac_09, 
    pre_acumula.fac_10, pre_acumula.fac_11, 
    pre_acumula.fac_12, pre_clasifica.nom_clas, 
    pre_rubro.cod_clas

```
