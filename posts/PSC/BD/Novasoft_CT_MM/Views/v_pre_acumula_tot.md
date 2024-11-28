# View: v_pre_acumula_tot

## Usa los objetos:
- [[pre_acumula]]
- [[pre_rubro]]

```sql



CREATE VIEW [dbo].[v_pre_acumula_tot]
AS
SELECT a.ano_acu,a.cod_rubro,SUM(apr_ini) AS apr_ini,SUM(a.apr_adi) AS apr_adi,SUM(a.apr_red) AS apr_red,SUM(a.apr_fin) AS apr_fin,b.nom_rub
FROM pre_acumula a INNER JOIN pre_rubro b ON a.cod_rubro=b.cod_rub
GROUP BY a.ano_acu,a.cod_rubro,b.nom_rub




```
