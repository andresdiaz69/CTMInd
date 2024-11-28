# View: v_GTH_Califica

## Usa los objetos:
- [[GTH_Evalua_Respuesta]]
- [[GTH_PregEvalua]]
- [[GTH_Rta]]

```sql
CREATE VIEW [dbo].[v_GTH_Califica]
AS
SELECT        P.peso_preg, iif(R.cod_rta = '0', ISNULL(RT.val_rta, 100), ISNULL(RT.val_rta, 0)) AS val_rta, R.cod_rta, R.cod_eva, R.id, R.ide_pre, R.consec_eva
FROM            dbo.GTH_Evalua_Respuesta AS R INNER JOIN
                         dbo.GTH_PregEvalua AS P ON R.cod_eva = P.cod_eva AND R.ide_pre = P.ide_pre LEFT OUTER JOIN
                         dbo.GTH_Rta AS RT ON R.cod_rta = RT.cod_rta

```
