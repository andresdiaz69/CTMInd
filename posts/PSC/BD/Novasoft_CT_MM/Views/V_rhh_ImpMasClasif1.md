# View: V_rhh_ImpMasClasif1

## Usa los objetos:
- [[gen_clasif1]]
- [[rhh_ConvCl1]]
- [[sis_aplicacion]]

```sql
CREATE VIEW [dbo].[V_rhh_ImpMasClasif1]
AS
SELECT  CC.conv_cl1 AS cod_cl1, C.nombre, CC.cod_conv, CC.conv_suc AS cod_suc, CC.conv_cco AS cod_cco
FROM    gen_clasif1 AS C
INNER	JOIN rhh_ConvCl1 AS CC ON C.codigo = CC.conv_cl1
INNER	JOIN sis_aplicacion AS A ON A.cod_apl IN ('GTH', 'NOM') AND A.emp_apl = 'T'
UNION
SELECT  C.codigo AS cod_cl1, C.nombre, '0' AS cod_conv, '' AS cod_suc, '' AS cod_cco
FROM    gen_clasif1 AS C
INNER	JOIN sis_aplicacion AS A ON A.cod_apl IN ('GTH', 'NOM') AND A.emp_apl = 'P'

```
