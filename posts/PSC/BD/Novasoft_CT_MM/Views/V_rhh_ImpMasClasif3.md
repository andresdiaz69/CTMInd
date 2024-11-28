# View: V_rhh_ImpMasClasif3

## Usa los objetos:
- [[gen_clasif3]]
- [[rhh_ConvCl3]]
- [[sis_aplicacion]]

```sql
CREATE VIEW [dbo].[V_rhh_ImpMasClasif3]
AS
SELECT  CC.conv_cl3 AS cod_cl3, C.nombre, CC.cod_conv, CC.conv_suc AS cod_suc, CC.conv_cco AS cod_cco, CC.conv_cl1 AS cod_cl1, CC.conv_cl2 AS cod_cl2
FROM    gen_clasif3 AS C
INNER	JOIN rhh_ConvCl3 AS CC ON C.codigo = CC.conv_cl3
INNER	JOIN sis_aplicacion AS A ON A.cod_apl IN ('GTH', 'NOM') AND A.emp_apl = 'T'
UNION
SELECT  C.codigo AS cod_cl1, C.nombre, '0' AS cod_conv, '' AS cod_suc, '' AS cod_cco, '' AS cod_cl1, '' AS cod_cl2
FROM    gen_clasif3 AS C
INNER	JOIN sis_aplicacion AS A ON A.cod_apl IN ('GTH', 'NOM') AND A.emp_apl = 'P'

```
