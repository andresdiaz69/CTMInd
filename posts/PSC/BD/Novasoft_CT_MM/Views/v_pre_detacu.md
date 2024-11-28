# View: v_pre_detacu

## Usa los objetos:
- [[pre_detalle]]
- [[pre_grupo]]
- [[pre_rubro]]
- [[pre_sec1]]
- [[pre_subgru]]
- [[pre_tiporub]]

```sql



CREATE VIEW [dbo].[v_pre_detacu]
AS
SELECT a.ano_det,a.cod_suc,a.cod_cco,a.cod_cl1,a.cod_cl2,a.cod_cl3,c.cod_tipo AS rubro,c.des_tipo AS nombre,
SUM(a.val_01) AS det01,SUM(a.val_02) AS det02,SUM(a.val_03) AS det03,
SUM(a.val_04) AS det04,SUM(a.val_05) AS det05,SUM(a.val_06) AS det06,SUM(a.val_07) AS det07,SUM(a.val_08) AS det08,
SUM(a.val_09) AS det09,SUM(a.val_10) AS det10,SUM(a.val_11) AS det11,SUM(a.val_12) AS det12
FROM pre_detalle a INNER JOIN pre_rubro b ON a.cod_rubro=b.cod_rub
INNER JOIN pre_tiporub c ON c.cod_tipo=b.tip_rub
GROUP BY a.ano_det,a.cod_suc,a.cod_cco,a.cod_cl1,a.cod_cl2,a.cod_cl3,cod_tipo,tip_rub,des_tipo
UNION ALL
SELECT a.ano_det,a.cod_suc,a.cod_cco,a.cod_cl1,a.cod_cl2,a.cod_cl3,c.cod_tip+c.cod_gru AS rubro,c.des_gru  AS nombre,
SUM(a.val_01) AS det01,SUM(a.val_02) AS det02,SUM(a.val_03) AS det03,
SUM(a.val_04) AS det04,SUM(a.val_05) AS det05,SUM(a.val_06) AS det06,SUM(a.val_07) AS det07,SUM(a.val_08) AS det08,
SUM(a.val_09) AS det09,SUM(a.val_10) AS det10,SUM(a.val_11) AS det11,SUM(a.val_12) AS det12
FROM pre_detalle a INNER JOIN pre_rubro b ON a.cod_rubro=b.cod_rub
INNER JOIN pre_grupo c ON c.cod_tip=b.tip_rub AND c.cod_gru=b.cod_gru
GROUP BY a.ano_det,a.cod_suc,a.cod_cco,a.cod_cl1,a.cod_cl2,a.cod_cl3,c.cod_tip+c.cod_gru,c.des_gru
UNION ALL
SELECT a.ano_det,a.cod_suc,a.cod_cco,a.cod_cl1,a.cod_cl2,a.cod_cl3,c.cod_tip+c.cod_gru+c.cod_sub AS rubro,c.des_sub  AS nombre,
SUM(a.val_01) AS det01,SUM(a.val_02) AS det02,SUM(a.val_03) AS det03,
SUM(a.val_04) AS det04,SUM(a.val_05) AS det05,SUM(a.val_06) AS det06,SUM(a.val_07) AS det07,SUM(a.val_08) AS det08,
SUM(a.val_09) AS det09,SUM(a.val_10) AS det10,SUM(a.val_11) AS det11,SUM(a.val_12) AS det12
FROM pre_detalle a INNER JOIN pre_rubro b ON a.cod_rubro=b.cod_rub
INNER JOIN pre_subgru c ON c.cod_tip=b.tip_rub AND c.cod_gru=b.cod_gru AND c.cod_sub=b.cod_sub
AND cod_rubro=cod_rub
GROUP BY a.ano_det,a.cod_suc,a.cod_cco,a.cod_cl1,a.cod_cl2,a.cod_cl3,c.cod_tip+c.cod_gru+c.cod_sub,c.des_sub
UNION ALL
SELECT a.ano_det,a.cod_suc,a.cod_cco,a.cod_cl1,a.cod_cl2,a.cod_cl3,c.cod_tip+c.cod_gru+c.cod_sub+c.cod_sec1 AS rubro,c.des_sec1  AS nombre,
SUM(a.val_01) AS det01,SUM(a.val_02) AS det02,SUM(a.val_03) AS det03,
SUM(a.val_04) AS det04,SUM(a.val_05) AS det05,SUM(a.val_06) AS det06,SUM(a.val_07) AS det07,SUM(a.val_08) AS det08,
SUM(a.val_09) AS det09,SUM(a.val_10) AS det10,SUM(a.val_11) AS det11,SUM(a.val_12) AS det12
FROM pre_detalle a INNER JOIN pre_rubro b ON a.cod_rubro=b.cod_rub
INNER JOIN pre_sec1 c ON c.cod_tip=b.tip_rub AND c.cod_gru=b.cod_gru AND c.cod_sub=b.cod_sub AND c.cod_sec1=b.sec_uno
GROUP BY a.ano_det,a.cod_suc,a.cod_cco,a.cod_cl1,a.cod_cl2,a.cod_cl3,c.cod_tip+c.cod_gru+c.cod_sub+c.cod_sec1,c.des_sec1
UNION ALL
SELECT a.ano_det,a.cod_suc,a.cod_cco,a.cod_cl1,a.cod_cl2,a.cod_cl3,a.cod_rubro AS rubro,b.nom_rub AS nombre,
SUM(a.val_01) AS det01,SUM(a.val_02) AS det02,SUM(a.val_03) AS det03,
SUM(a.val_04) AS det04,SUM(a.val_05) AS det05,SUM(a.val_06) AS det06,SUM(a.val_07) AS det07,SUM(a.val_08) AS det08,
SUM(a.val_09) AS det09,SUM(a.val_10) AS det10,SUM(a.val_11) AS det11,SUM(a.val_12) AS det12
FROM pre_detalle a INNER JOIN pre_rubro b ON a.cod_rubro=b.cod_rub
WHERE cod_rubro=cod_rub AND LEN(cod_rub)>8
GROUP BY a.ano_det,a.cod_suc,a.cod_cco,a.cod_cl1,a.cod_cl2,a.cod_cl3,a.cod_rubro,b.nom_rub




```
