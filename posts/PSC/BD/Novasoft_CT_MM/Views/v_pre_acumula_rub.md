# View: v_pre_acumula_rub

## Usa los objetos:
- [[pre_acumula]]
- [[pre_rubro]]

```sql



CREATE VIEW [dbo].[v_pre_acumula_rub]
AS
SELECT a.ano_acu,'01' AS periodo,a.cod_rubro,SUM(a.com_01) AS compromiso,SUM(a.sal_apr01) AS saldo,
SUM(a.fac_01) AS facturado,b.nom_rub
FROM pre_acumula a INNER JOIN pre_rubro b ON a.cod_rubro=b.cod_rub
GROUP BY a.ano_acu,a.cod_rubro,b.nom_rub
UNION ALL SELECT a.ano_acu,'02' AS periodo,a.cod_rubro,SUM(a.com_02) AS compromiso,SUM(a.sal_apr02) AS saldo,
SUM(a.fac_02) AS facturado,b.nom_rub
FROM pre_acumula a INNER JOIN pre_rubro b ON a.cod_rubro=b.cod_rub
GROUP BY a.ano_acu,a.cod_rubro,b.nom_rub
UNION ALL SELECT a.ano_acu,'03' AS periodo,a.cod_rubro,SUM(a.com_03) AS compromiso,SUM(a.sal_apr03) AS saldo,
SUM(a.fac_03) AS facturado,b.nom_rub
FROM pre_acumula a INNER JOIN pre_rubro b ON a.cod_rubro=b.cod_rub
GROUP BY a.ano_acu,a.cod_rubro,b.nom_rub
UNION ALL SELECT a.ano_acu,'04' AS periodo,a.cod_rubro,SUM(a.com_04) AS compromiso,SUM(a.sal_apr04) AS saldo,
SUM(a.fac_04) AS facturado,b.nom_rub
FROM pre_acumula a INNER JOIN pre_rubro b ON a.cod_rubro=b.cod_rub
GROUP BY a.ano_acu,a.cod_rubro,b.nom_rub
UNION ALL SELECT a.ano_acu,'05' AS periodo,a.cod_rubro,SUM(a.com_05) AS compromiso,SUM(a.sal_apr05) AS saldo,
SUM(a.fac_05) AS facturado,b.nom_rub
FROM pre_acumula a INNER JOIN pre_rubro b ON a.cod_rubro=b.cod_rub
GROUP BY a.ano_acu,a.cod_rubro,b.nom_rub
UNION ALL SELECT a.ano_acu,'06' AS periodo,a.cod_rubro,SUM(a.com_06) AS compromiso,SUM(a.sal_apr06) AS saldo,
SUM(a.fac_06) AS facturado,b.nom_rub
FROM pre_acumula a INNER JOIN pre_rubro b ON a.cod_rubro=b.cod_rub
GROUP BY a.ano_acu,a.cod_rubro,b.nom_rub
UNION ALL SELECT a.ano_acu,'07' AS periodo,a.cod_rubro,SUM(a.com_07) AS compromiso,SUM(a.sal_apr07) AS saldo,
SUM(a.fac_07) AS facturado,b.nom_rub
FROM pre_acumula a INNER JOIN pre_rubro b ON a.cod_rubro=b.cod_rub
GROUP BY a.ano_acu,a.cod_rubro,b.nom_rub
UNION ALL SELECT a.ano_acu,'08' AS periodo,a.cod_rubro,SUM(a.com_08) AS compromiso,SUM(a.sal_apr08) AS saldo,
SUM(a.fac_08) AS facturado,b.nom_rub
FROM pre_acumula a INNER JOIN pre_rubro b ON a.cod_rubro=b.cod_rub
GROUP BY a.ano_acu,a.cod_rubro,b.nom_rub
UNION ALL SELECT a.ano_acu,'09' AS periodo,a.cod_rubro,SUM(a.com_09) AS compromiso,SUM(a.sal_apr09) AS saldo,
SUM(a.fac_09) AS facturado,b.nom_rub
FROM pre_acumula a INNER JOIN pre_rubro b ON a.cod_rubro=b.cod_rub
GROUP BY a.ano_acu,a.cod_rubro,b.nom_rub
UNION ALL SELECT a.ano_acu,'10' AS periodo,a.cod_rubro,SUM(a.com_10) AS compromiso,SUM(a.sal_apr10) AS saldo,
SUM(a.fac_10) AS facturado,b.nom_rub
FROM pre_acumula a INNER JOIN pre_rubro b ON a.cod_rubro=b.cod_rub
GROUP BY a.ano_acu,a.cod_rubro,b.nom_rub
UNION ALL SELECT a.ano_acu,'11' AS periodo,a.cod_rubro,SUM(a.com_11) AS compromiso,SUM(a.sal_apr11) AS saldo,
SUM(a.fac_11) AS facturado,b.nom_rub
FROM pre_acumula a INNER JOIN pre_rubro b ON a.cod_rubro=b.cod_rub
GROUP BY a.ano_acu,a.cod_rubro,b.nom_rub
UNION ALL SELECT a.ano_acu,'12' AS periodo,a.cod_rubro,SUM(a.com_12) AS compromiso,SUM(a.sal_apr12) AS saldo,
SUM(a.fac_12) AS facturado,b.nom_rub
FROM pre_acumula a INNER JOIN pre_rubro b ON a.cod_rubro=b.cod_rub
GROUP BY a.ano_acu,a.cod_rubro,b.nom_rub



```
