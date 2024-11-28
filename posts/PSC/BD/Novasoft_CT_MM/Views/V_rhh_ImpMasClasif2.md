# View: V_rhh_ImpMasClasif2

## Usa los objetos:
- [[gen_clasif2]]
- [[rhh_ConvCl2]]
- [[sis_aplicacion]]

```sql
CREATE VIEW [dbo].[V_rhh_ImpMasClasif2]
AS
SELECT  CC.conv_cl2 AS cod_cl2, C.nombre, CC.cod_conv, CC.conv_suc AS cod_suc, CC.conv_cco AS cod_cco, CC.conv_cl1 AS cod_cl1
FROM    gen_clasif2 AS C
INNER	JOIN rhh_ConvCl2 AS CC ON C.codigo = CC.conv_cl2
INNER	JOIN sis_aplicacion AS A ON A.cod_apl IN ('GTH', 'NOM') AND A.emp_apl = 'T'
UNION
SELECT  C.codigo AS cod_cl2, C.nombre, '0' AS cod_conv, '' AS cod_suc, '' AS cod_cco, '' AS cod_cl1
FROM    gen_clasif2 AS C
INNER	JOIN sis_aplicacion AS A ON A.cod_apl IN ('GTH', 'NOM') AND A.emp_apl = 'P'

```
