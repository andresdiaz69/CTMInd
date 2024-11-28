# View: V_GTH_Ausentismo

## Usa los objetos:
- [[rhh_ausentismo]]
- [[rhh_TbTipAus]]

```sql
CREATE VIEW [dbo].[V_GTH_Ausentismo]
AS
SELECT	A.cod_emp, A.cod_aus, RTRIM(T.nom_aus)+' (' + RTRIM(CONVERT(CHAR, A.fec_ini, 103)) + ')' AS nom_aus, A.fec_ini
FROM	rhh_ausentismo AS A
INNER	JOIN rhh_TbTipAus AS T ON A.cod_aus = T.cod_aus
WHERE	T.cla_aus = '02'

```
