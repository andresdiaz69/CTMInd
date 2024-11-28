# View: v_pre_genacu

## Usa los objetos:
- [[pre_acumula]]
- [[pre_grupo]]
- [[pre_rubro]]
- [[pre_sec1]]
- [[pre_subgru]]
- [[pre_tiporub]]

```sql



CREATE VIEW [dbo].[v_pre_genacu]
AS
SELECT a.ano_acu,a.cod_suc,a.cod_cco,a.cod_cl1,a.cod_cl2,a.cod_cl3,cod_tipo AS rubro,des_tipo AS nombre,
SUM(a.apr_ini) AS ini,SUM(a.apr_adi) AS adi,SUM(a.apr_red) AS red,SUM(a.apr_fin) AS fin ,
SUM(a.com_01) AS com01,SUM(a.com_02) AS com02,SUM(a.com_03) AS com03,SUM(a.com_04) AS com04,SUM(a.com_05) AS com05,
SUM(a.com_06) AS com06,SUM(a.com_07) AS com07,SUM(a.com_08) AS com08,SUM(a.com_09) AS com09,SUM(a.com_10) AS com10,
SUM(a.com_11) AS com11,SUM(a.com_12) AS com12,
SUM(a.sal_apr01) AS sal01,SUM(a.sal_apr02) AS sal02,SUM(a.sal_apr03) AS sal03,SUM(a.sal_apr04) AS sal04,SUM(a.sal_apr05) AS sal05,
SUM(a.sal_apr06) AS sal06,SUM(a.sal_apr07) AS sal07,SUM(a.sal_apr08) AS sal08,SUM(a.sal_apr09) AS sal09,SUM(a.sal_apr10) AS sal10,
SUM(a.sal_apr11) AS sal11,SUM(a.sal_apr12) AS sal12,
SUM(a.fac_01) AS fac01,SUM(a.fac_02) AS fac02,SUM(a.fac_03) AS fac03,SUM(a.fac_04) AS fac04,SUM(a.fac_05) AS fac05,
SUM(a.fac_06) AS fac06,SUM(a.fac_07) AS fac07,SUM(a.fac_08) AS fac08,SUM(a.fac_09) AS fac09,SUM(a.fac_10) AS fac10,
SUM(a.fac_11) AS fac11,SUM(a.fac_12) AS fac12
FROM pre_acumula a INNER JOIN pre_rubro b ON a.cod_rubro=b.cod_rub INNER JOIN pre_tiporub c ON c.cod_tipo=b.tip_rub
WHERE cod_tipo=tip_rub AND cod_rubro=cod_rub
GROUP BY a.ano_acu,a.cod_suc,a.cod_cco,a.cod_cl1,a.cod_cl2,a.cod_cl3,cod_tipo,tip_rub,des_tipo
UNION ALL
SELECT a.ano_acu,a.cod_suc,a.cod_cco,a.cod_cl1,a.cod_cl2,a.cod_cl3,c.cod_tip+c.cod_gru AS rubro,c.des_gru AS nombre,
SUM(a.apr_ini) AS ini,SUM(a.apr_adi) AS adi,SUM(a.apr_red) AS red,SUM(a.apr_fin) AS fin ,
SUM(a.com_01) AS com01,SUM(a.com_02) AS com02,SUM(a.com_03) AS com03,SUM(a.com_04) AS com04,SUM(a.com_05) AS com05,
SUM(a.com_06) AS com06,SUM(a.com_07) AS com07,SUM(a.com_08) AS com08,SUM(a.com_09) AS com09,SUM(a.com_10) AS com10,
SUM(a.com_11) AS com11,SUM(a.com_12) AS com12,
SUM(a.sal_apr01) AS sal01,SUM(a.sal_apr02) AS sal02,SUM(a.sal_apr03) AS sal03,SUM(a.sal_apr04) AS sal04,SUM(a.sal_apr05) AS sal05,
SUM(a.sal_apr06) AS sal06,SUM(a.sal_apr07) AS sal07,SUM(a.sal_apr08) AS sal08,SUM(a.sal_apr09) AS sal09,SUM(a.sal_apr10) AS sal10,
SUM(a.sal_apr11) AS sal11,SUM(a.sal_apr12) AS sal12,
SUM(a.fac_01) AS fac01,SUM(a.fac_02) AS fac02,SUM(a.fac_03) AS fac03,SUM(a.fac_04) AS fac04,SUM(a.fac_05) AS fac05,
SUM(a.fac_06) AS fac06,SUM(a.fac_07) AS fac07,SUM(a.fac_08) AS fac08,SUM(a.fac_09) AS fac09,SUM(a.fac_10) AS fac10,
SUM(a.fac_11) AS fac11,SUM(a.fac_12) AS fac12
FROM pre_acumula a INNER JOIN pre_rubro b ON a.cod_rubro=b.cod_rub 
INNER JOIN pre_grupo c ON c.cod_tip=b.tip_rub AND c.cod_gru=b.cod_gru
GROUP BY a.ano_acu,a.cod_suc,a.cod_cco,a.cod_cl1,a.cod_cl2,a.cod_cl3,c.cod_tip+c.cod_gru,c.des_gru
UNION ALL
SELECT a.ano_acu,a.cod_suc,a.cod_cco,a.cod_cl1,a.cod_cl2,a.cod_cl3,c.cod_tip+c.cod_gru+c.cod_sub AS rubro,c.des_sub AS nombre,
SUM(a.apr_ini) AS ini,SUM(a.apr_adi) AS adi,SUM(a.apr_red) AS red,SUM(a.apr_fin) AS fin ,
SUM(a.com_01) AS com01,SUM(a.com_02) AS com02,SUM(a.com_03) AS com03,SUM(a.com_04) AS com04,SUM(a.com_05) AS com05,
SUM(a.com_06) AS com06,SUM(a.com_07) AS com07,SUM(a.com_08) AS com08,SUM(a.com_09) AS com09,SUM(a.com_10) AS com10,
SUM(a.com_11) AS com11,SUM(a.com_12) AS com12,
SUM(a.sal_apr01) AS sal01,SUM(a.sal_apr02) AS sal02,SUM(a.sal_apr03) AS sal03,SUM(a.sal_apr04) AS sal04,SUM(a.sal_apr05) AS sal05,
SUM(a.sal_apr06) AS sal06,SUM(a.sal_apr07) AS sal07,SUM(a.sal_apr08) AS sal08,SUM(a.sal_apr09) AS sal09,SUM(a.sal_apr10) AS sal10,
SUM(a.sal_apr11) AS sal11,SUM(a.sal_apr12) AS sal12,
SUM(a.fac_01) AS fac01,SUM(a.fac_02) AS fac02,SUM(a.fac_03) AS fac03,SUM(a.fac_04) AS fac04,SUM(a.fac_05) AS fac05,
SUM(a.fac_06) AS fac06,SUM(a.fac_07) AS fac07,SUM(a.fac_08) AS fac08,SUM(a.fac_09) AS fac09,SUM(a.fac_10) AS fac10,
SUM(a.fac_11) AS fac11,SUM(a.fac_12) AS fac12
FROM pre_acumula a INNER JOIN pre_rubro b ON a.cod_rubro=b.cod_rub 
INNER JOIN pre_subgru c ON c.cod_tip=b.tip_rub AND c.cod_gru=b.cod_gru AND c.cod_sub=b.cod_sub
GROUP BY a.ano_acu,a.cod_suc,a.cod_cco,a.cod_cl1,a.cod_cl2,a.cod_cl3,c.cod_tip+c.cod_gru+c.cod_sub,c.des_sub
UNION ALL
SELECT a.ano_acu,a.cod_suc,a.cod_cco,a.cod_cl1,a.cod_cl2,a.cod_cl3,c.cod_tip+c.cod_gru+c.cod_sub+c.cod_sec1 AS rubro,c.des_sec1 AS nombre,
SUM(a.apr_ini) AS ini,SUM(a.apr_adi) AS adi,SUM(a.apr_red) AS red,SUM(a.apr_fin) AS fin ,
SUM(a.com_01) AS com01,SUM(a.com_02) AS com02,SUM(a.com_03) AS com03,SUM(a.com_04) AS com04,SUM(a.com_05) AS com05,
SUM(a.com_06) AS com06,SUM(a.com_07) AS com07,SUM(a.com_08) AS com08,SUM(a.com_09) AS com09,SUM(a.com_10) AS com10,
SUM(a.com_11) AS com11,SUM(a.com_12) AS com12,
SUM(a.sal_apr01) AS sal01,SUM(a.sal_apr02) AS sal02,SUM(a.sal_apr03) AS sal03,SUM(a.sal_apr04) AS sal04,SUM(a.sal_apr05) AS sal05,
SUM(a.sal_apr06) AS sal06,SUM(a.sal_apr07) AS sal07,SUM(a.sal_apr08) AS sal08,SUM(a.sal_apr09) AS sal09,SUM(a.sal_apr10) AS sal10,
SUM(a.sal_apr11) AS sal11,SUM(a.sal_apr12) AS sal12,
SUM(a.fac_01) AS fac01,SUM(a.fac_02) AS fac02,SUM(a.fac_03) AS fac03,SUM(a.fac_04) AS fac04,SUM(a.fac_05) AS fac05,
SUM(a.fac_06) AS fac06,SUM(a.fac_07) AS fac07,SUM(a.fac_08) AS fac08,SUM(a.fac_09) AS fac09,SUM(a.fac_10) AS fac10,
SUM(a.fac_11) AS fac11,SUM(a.fac_12) AS fac12
FROM pre_acumula a INNER JOIN pre_rubro b ON a.cod_rubro=b.cod_rub 
INNER JOIN pre_sec1 c ON c.cod_tip=b.tip_rub AND c.cod_gru=b.cod_gru AND c.cod_sub=b.cod_sub AND c.cod_sec1=b.sec_uno 
GROUP BY a.ano_acu,a.cod_suc,a.cod_cco,a.cod_cl1,a.cod_cl2,a.cod_cl3,c.cod_tip+c.cod_gru+c.cod_sub+c.cod_sec1,c.des_sec1
UNION ALL
SELECT a.ano_acu,a.cod_suc,a.cod_cco,a.cod_cl1,a.cod_cl2,a.cod_cl3,a.cod_rubro AS rubro,b.nom_rub AS nombre,
SUM(a.apr_ini) AS ini,SUM(a.apr_adi) AS adi,SUM(a.apr_red) AS red,SUM(a.apr_fin) AS fin ,
SUM(a.com_01) AS com01,SUM(a.com_02) AS com02,SUM(a.com_03) AS com03,SUM(a.com_04) AS com04,SUM(a.com_05) AS com05,
SUM(a.com_06) AS com06,SUM(a.com_07) AS com07,SUM(a.com_08) AS com08,SUM(a.com_09) AS com09,SUM(a.com_10) AS com10,
SUM(a.com_11) AS com11,SUM(a.com_12) AS com12,
SUM(a.sal_apr01) AS sal01,SUM(a.sal_apr02) AS sal02,SUM(a.sal_apr03) AS sal03,SUM(a.sal_apr04) AS sal04,SUM(a.sal_apr05) AS sal05,
SUM(a.sal_apr06) AS sal06,SUM(a.sal_apr07) AS sal07,SUM(a.sal_apr08) AS sal08,SUM(a.sal_apr09) AS sal09,SUM(a.sal_apr10) AS sal10,
SUM(a.sal_apr11) AS sal11,SUM(a.sal_apr12) AS sal12,
SUM(a.fac_01) AS fac01,SUM(a.fac_02) AS fac02,SUM(a.fac_03) AS fac03,SUM(a.fac_04) AS fac04,SUM(a.fac_05) AS fac05,
SUM(a.fac_06) AS fac06,SUM(a.fac_07) AS fac07,SUM(a.fac_08) AS fac08,SUM(a.fac_09) AS fac09,SUM(a.fac_10) AS fac10,
SUM(a.fac_11) AS fac11,SUM(a.fac_12) AS fac12
FROM pre_acumula a INNER JOIN pre_rubro b ON a.cod_rubro=b.cod_rub
WHERE  cod_rubro=cod_rub  AND LEN(cod_rub)>8
GROUP BY a.ano_acu,a.cod_suc,a.cod_cco,a.cod_cl1,a.cod_cl2,a.cod_cl3,cod_rubro,nom_rub




```
