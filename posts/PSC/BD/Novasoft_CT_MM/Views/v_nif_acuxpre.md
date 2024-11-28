# View: v_nif_acuxpre

## Usa los objetos:
- [[v_nif_acumes]]
- [[v_nif_premes]]

```sql
CREATE VIEW [dbo].[v_nif_acuxpre] AS
SELECT     ano_acu, Periodo, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, nat_cta, tip_cta, SUM(acu_deb) AS acu_deb, SUM(acu_cre) AS acu_cre, 
                      CASE nat_cta WHEN 1 THEN SUM(acu_deb - acu_cre) ELSE SUM(acu_cre - acu_deb) END AS eje_mes, 0 AS pre_mes
FROM         dbo.v_nif_acumes
WHERE     (Periodo <> '13')
GROUP BY ano_acu, Periodo, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, nat_cta, tip_cta
UNION ALL
SELECT     ano_acu, Periodo, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, nat_cta, tip_cta, 0 AS acu_deb, 0 AS acu_cre, 0 AS eje_mes, SUM(pre_mes) 
                      AS pre_mes
FROM         dbo.v_nif_premes
GROUP BY ano_acu, Periodo, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, nat_cta, tip_cta

```
