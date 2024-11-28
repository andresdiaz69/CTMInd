# View: v_pre_acutot

## Usa los objetos:
- [[v_pre_detacu]]
- [[v_pre_genacu]]

```sql



CREATE VIEW [dbo].[v_pre_acutot]
AS
SELECT v_pre_genacu.*, ISNULL(det01,0) AS det01, ISNULL(det02,0) AS det02, ISNULL(det03,0) AS det03, ISNULL(det04,0) AS det04, 
ISNULL(det05,0) AS det05, ISNULL(det06,0) AS det06, ISNULL(det07,0) AS det07, ISNULL(det08,0) AS det08, ISNULL(det09,0) AS det09, 
ISNULL(det10,0) AS det10, ISNULL(det11,0) AS det11, ISNULL(det12,0) AS det12,
CASE LEN(v_pre_genacu.rubro)
WHEN 2 THEN 1
WHEN 4 THEN 2
WHEN 6 THEN 3
WHEN 8 THEN 4
WHEN 10 THEN 5
END AS nivel,orden=v_pre_genacu.cod_cl1
FROM v_pre_genacu LEFT OUTER JOIN v_pre_detacu 
ON v_pre_genacu.ano_acu=v_pre_detacu.ano_det AND v_pre_genacu.rubro=v_pre_detacu.rubro AND v_pre_genacu.cod_suc=v_pre_detacu.cod_suc AND 
v_pre_genacu.cod_cl1 = v_pre_detacu.cod_cl1 AND v_pre_genacu.cod_cco=v_pre_detacu.cod_cco AND 
v_pre_genacu.cod_cl2=v_pre_detacu.cod_cl2 AND v_pre_genacu.cod_cl3=v_pre_detacu.cod_cl3




```
