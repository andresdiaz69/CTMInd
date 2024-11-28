# View: V_rhh_ImpMasSucursal

## Usa los objetos:
- [[gen_sucursal]]
- [[gen_SucursalConv]]
- [[sis_aplicacion]]

```sql
CREATE VIEW [dbo].[V_rhh_ImpMasSucursal]
AS
SELECT	SC.cod_suc, S.nom_suc, SC.cod_conv
FROM	gen_sucursal AS S
INNER	JOIN gen_SucursalConv AS SC ON S.cod_suc = SC.cod_suc
INNER	JOIN sis_aplicacion AS A ON A.cod_apl IN ('GTH','NOM') AND A.emp_apl = 'T'
UNION
SELECT	S.cod_suc, S.nom_suc, '0' AS cod_conv
FROM	gen_sucursal AS S
INNER	JOIN sis_aplicacion AS A ON A.cod_apl IN ('GTH','NOM') AND A.emp_apl = 'P'

```
