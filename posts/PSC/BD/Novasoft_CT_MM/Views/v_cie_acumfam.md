# View: v_cie_acumfam

## Usa los objetos:
- [[v_cie_acumfam_b]]

```sql

CREATE VIEW [dbo].[v_cie_acumfam]
AS

SELECT cod_fam,ano_acu,per_acu,SUM(acu_deb) AS acu_deb,SUM(acu_cre) AS acu_cre,SUM(sal_fin) AS sal_fin
FROM v_cie_acumfam_b WITH(NOLOCK)
GROUP BY cod_fam,ano_acu,per_acu;


```
