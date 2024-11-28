# View: V_Rhh_ConvCl8

## Usa los objetos:
- [[rhh_ConvCco]]
- [[rhh_ConvCco]]
- [[rhh_ConvCco]]
- [[rhh_ConvCco]]
- [[rhh_ConvCco]]
- [[rhh_ConvCl1]]
- [[rhh_ConvCl1]]
- [[rhh_ConvCl1]]
- [[rhh_ConvCl1]]
- [[rhh_ConvCl1]]
- [[rhh_ConvCl1]]
- [[rhh_ConvCl2]]
- [[rhh_ConvCl2]]
- [[rhh_ConvCl2]]
- [[rhh_ConvCl2]]
- [[rhh_ConvCl2]]
- [[rhh_ConvCl2]]
- [[rhh_ConvCl2]]
- [[rhh_ConvCl3]]
- [[rhh_ConvCl3]]
- [[rhh_ConvCl3]]
- [[rhh_ConvCl3]]
- [[rhh_ConvCl3]]
- [[rhh_ConvCl3]]
- [[rhh_ConvCl3]]
- [[rhh_ConvCl3]]
- [[Rhh_ConvCl4]]
- [[Rhh_ConvCl4]]
- [[Rhh_ConvCl4]]
- [[Rhh_ConvCl4]]
- [[Rhh_ConvCl4]]
- [[Rhh_ConvCl4]]
- [[Rhh_ConvCl4]]
- [[Rhh_ConvCl4]]
- [[Rhh_ConvCl4]]
- [[Rhh_ConvCl5]]
- [[Rhh_ConvCl5]]
- [[Rhh_ConvCl5]]
- [[Rhh_ConvCl5]]
- [[Rhh_ConvCl5]]
- [[Rhh_ConvCl5]]
- [[Rhh_ConvCl5]]
- [[Rhh_ConvCl5]]
- [[Rhh_ConvCl5]]
- [[Rhh_ConvCl5]]
- [[Rhh_ConvCl6]]
- [[Rhh_ConvCl6]]
- [[Rhh_ConvCl6]]
- [[Rhh_ConvCl6]]
- [[Rhh_ConvCl6]]
- [[Rhh_ConvCl6]]
- [[Rhh_ConvCl6]]
- [[Rhh_ConvCl6]]
- [[Rhh_ConvCl6]]
- [[Rhh_ConvCl6]]
- [[Rhh_ConvCl6]]
- [[rhh_convCl7]]
- [[rhh_convCl7]]
- [[rhh_convCl7]]
- [[rhh_convCl7]]
- [[rhh_convCl7]]
- [[rhh_convCl7]]
- [[rhh_convCl7]]
- [[rhh_convCl7]]
- [[rhh_convCl7]]
- [[rhh_convCl7]]
- [[rhh_convCl7]]
- [[rhh_convCl7]]
- [[rhh_ConvCl8]]
- [[rhh_ConvCl8]]
- [[rhh_ConvCl8]]
- [[rhh_ConvCl8]]
- [[rhh_ConvCl8]]
- [[rhh_ConvCl8]]
- [[rhh_ConvCl8]]
- [[rhh_ConvCl8]]
- [[rhh_ConvCl8]]
- [[rhh_ConvCl8]]
- [[rhh_ConvCl8]]
- [[rhh_ConvCl8]]
- [[rhh_ConvCl8]]
- [[rhh_ConvCl8]]
- [[rhh_Convenio]]
- [[rhh_Convenio]]
- [[rhh_Convenio]]
- [[rhh_Convenio]]
- [[rhh_ConvSuc]]
- [[rhh_ConvSuc]]
- [[rhh_ConvSuc]]
- [[rhh_ConvSuc]]

```sql


CREATE VIEW [dbo].[V_Rhh_ConvCl8] WITH SCHEMABINDING
as
SELECT	dbo.rhh_Convenio.cod_cli, dbo.rhh_ConvCl8.cod_conv, dbo.rhh_Convenio.nom_conv, dbo.rhh_ConvCl8.conv_suc, dbo.Rhh_ConvSuc.conv_suc_des, dbo.rhh_ConvCl8.conv_cco, dbo.rhh_ConvCco.conv_cco_des, 
		dbo.rhh_ConvCl8.conv_cl1, dbo.rhh_ConvCl1.conv_cl1_des, dbo.rhh_ConvCl8.conv_cl2, dbo.rhh_ConvCl2.conv_cl2_des, dbo.rhh_ConvCl8.conv_cl3, dbo.rhh_ConvCl3.conv_cl3_des,
		dbo.rhh_ConvCl8.conv_cl4, dbo.rhh_ConvCl4.conv_cl4_des, dbo.rhh_ConvCl8.conv_cl5, dbo.rhh_ConvCl5.conv_cl5_des, dbo.rhh_ConvCl8.conv_cl6, dbo.rhh_ConvCl6.conv_cl6_des,
		dbo.rhh_ConvCl8.conv_cl7, dbo.rhh_ConvCl7.conv_cl7_des, dbo.rhh_ConvCl8.conv_cl8, dbo.rhh_ConvCl8.conv_cl8_des, dbo.rhh_ConvCl8.conv_estruc
FROM	dbo.rhh_ConvCl8
INNER	JOIN dbo.rhh_Convenio ON dbo.rhh_Convenio.cod_conv = dbo.rhh_ConvCl8.cod_conv
INNER	JOIN dbo.Rhh_ConvSuc ON dbo.Rhh_ConvSuc.cod_conv = dbo.rhh_ConvCl8.cod_conv AND dbo.Rhh_ConvSuc.conv_suc = dbo.rhh_ConvCl8.conv_suc
INNER	JOIN dbo.rhh_ConvCco ON dbo.rhh_ConvCco.cod_conv = dbo.rhh_ConvCl8.cod_conv AND dbo.rhh_ConvCco.conv_suc = dbo.rhh_ConvCl8.conv_suc AND dbo.rhh_ConvCco.conv_cco = dbo.rhh_ConvCl8.conv_cco
INNER	JOIN dbo.rhh_ConvCl1 ON dbo.rhh_ConvCl1.cod_conv = dbo.rhh_ConvCl8.cod_conv AND dbo.rhh_ConvCl1.conv_suc = dbo.rhh_ConvCl8.conv_suc AND dbo.rhh_ConvCl1.conv_cco = dbo.rhh_ConvCl8.conv_cco AND dbo.rhh_ConvCl1.conv_cl1 = dbo.rhh_ConvCl8.conv_cl1
INNER	JOIN dbo.rhh_ConvCl2 ON dbo.rhh_ConvCl2.cod_conv = dbo.rhh_ConvCl8.cod_conv AND dbo.rhh_ConvCl2.conv_suc = dbo.rhh_ConvCl8.conv_suc AND dbo.rhh_ConvCl2.conv_cco = dbo.rhh_ConvCl8.conv_cco AND dbo.rhh_ConvCl2.conv_cl1 = dbo.rhh_ConvCl8.conv_cl1 AND dbo.rhh_ConvCl2.conv_cl2 = dbo.rhh_ConvCl8.conv_cl2
INNER	JOIN dbo.rhh_ConvCl3 ON dbo.rhh_ConvCl3.cod_conv = dbo.rhh_ConvCl8.cod_conv AND dbo.rhh_ConvCl3.conv_suc = dbo.rhh_ConvCl8.conv_suc AND dbo.rhh_ConvCl3.conv_cco = dbo.rhh_ConvCl8.conv_cco AND dbo.rhh_ConvCl3.conv_cl1 = dbo.rhh_ConvCl8.conv_cl1 AND dbo.rhh_ConvCl3.conv_cl2 = dbo.rhh_ConvCl8.conv_cl2 AND dbo.rhh_ConvCl3.conv_cl3 = dbo.rhh_ConvCl8.conv_cl3
INNER	JOIN dbo.rhh_ConvCl4 ON dbo.rhh_ConvCl4.cod_conv = dbo.rhh_ConvCl8.cod_conv AND dbo.rhh_ConvCl4.conv_suc = dbo.rhh_ConvCl8.conv_suc AND dbo.rhh_ConvCl4.conv_cco = dbo.rhh_ConvCl8.conv_cco AND dbo.rhh_ConvCl4.conv_cl1 = dbo.rhh_ConvCl8.conv_cl1 AND dbo.rhh_ConvCl4.conv_cl2 = dbo.rhh_ConvCl8.conv_cl2 AND dbo.rhh_ConvCl4.conv_cl3 = dbo.rhh_ConvCl8.conv_cl3 AND dbo.rhh_ConvCl4.conv_cl4 = dbo.rhh_ConvCl8.conv_cl4
INNER	JOIN dbo.rhh_ConvCl5 ON dbo.rhh_ConvCl5.cod_conv = dbo.rhh_ConvCl8.cod_conv AND dbo.rhh_ConvCl5.conv_suc = dbo.rhh_ConvCl8.conv_suc AND dbo.rhh_ConvCl5.conv_cco = dbo.rhh_ConvCl8.conv_cco AND dbo.rhh_ConvCl5.conv_cl1 = dbo.rhh_ConvCl8.conv_cl1 AND dbo.rhh_ConvCl5.conv_cl2 = dbo.rhh_ConvCl8.conv_cl2 AND dbo.rhh_ConvCl5.conv_cl3 = dbo.rhh_ConvCl8.conv_cl3 AND dbo.rhh_ConvCl5.conv_cl4 = dbo.rhh_ConvCl8.conv_cl4 AND dbo.rhh_ConvCl5.conv_cl5 = dbo.rhh_ConvCl8.conv_cl5
INNER	JOIN dbo.rhh_ConvCl6 ON dbo.rhh_ConvCl6.cod_conv = dbo.rhh_ConvCl8.cod_conv AND dbo.rhh_ConvCl6.conv_suc = dbo.rhh_ConvCl8.conv_suc AND dbo.rhh_ConvCl6.conv_cco = dbo.rhh_ConvCl8.conv_cco AND dbo.rhh_ConvCl6.conv_cl1 = dbo.rhh_ConvCl8.conv_cl1 AND dbo.rhh_ConvCl6.conv_cl2 = dbo.rhh_ConvCl8.conv_cl2 AND dbo.rhh_ConvCl6.conv_cl3 = dbo.rhh_ConvCl8.conv_cl3 AND dbo.rhh_ConvCl6.conv_cl4 = dbo.rhh_ConvCl8.conv_cl4 AND dbo.rhh_ConvCl6.conv_cl5 = dbo.rhh_ConvCl8.conv_cl5 AND dbo.rhh_ConvCl6.conv_cl6 = dbo.rhh_ConvCl8.conv_cl6
INNER	JOIN dbo.rhh_ConvCl7 ON dbo.rhh_ConvCl7.cod_conv = dbo.rhh_ConvCl8.cod_conv AND dbo.rhh_ConvCl7.conv_suc = dbo.rhh_ConvCl8.conv_suc AND dbo.rhh_ConvCl7.conv_cco = dbo.rhh_ConvCl8.conv_cco AND dbo.rhh_ConvCl7.conv_cl1 = dbo.rhh_ConvCl8.conv_cl1 AND dbo.rhh_ConvCl7.conv_cl2 = dbo.rhh_ConvCl8.conv_cl2 AND dbo.rhh_ConvCl7.conv_cl3 = dbo.rhh_ConvCl8.conv_cl3 AND dbo.rhh_ConvCl7.conv_cl4 = dbo.rhh_ConvCl8.conv_cl4 AND dbo.rhh_ConvCl7.conv_cl5 = dbo.rhh_ConvCl8.conv_cl5 AND dbo.rhh_ConvCl7.conv_cl6 = dbo.rhh_ConvCl8.conv_cl6 AND dbo.rhh_ConvCl7.conv_cl7 = dbo.rhh_ConvCl8.conv_cl7

```
