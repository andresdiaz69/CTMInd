# View: V_rhh_ImpMasCcostos

## Usa los objetos:
- [[gen_ccosto]]
- [[rhh_ConvCco]]
- [[sis_aplicacion]]

```sql
CREATE VIEW [dbo].[V_rhh_ImpMasCcostos]
AS
SELECT  CC.conv_cco AS cod_cco, C.nom_cco, CC.cod_conv, CC.conv_suc AS cod_suc
FROM    gen_ccosto AS C
INNER	JOIN rhh_ConvCco AS CC ON C.cod_cco = CC.conv_cco
INNER	JOIN sis_aplicacion AS A ON A.cod_apl IN ('GTH', 'NOM') AND A.emp_apl = 'T'
UNION
SELECT  C.cod_cco, C.nom_cco, '0' AS cod_conv, '' AS cod_suc
FROM    gen_ccosto AS C
INNER	JOIN sis_aplicacion AS A ON A.cod_apl IN ('GTH', 'NOM') AND A.emp_apl = 'P'

```
