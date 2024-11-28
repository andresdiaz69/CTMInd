# View: V_rhh_ausentismo

## Usa los objetos:
- [[rhh_ausentismo]]
- [[Rhh_TbClasAus]]
- [[rhh_tbtipaus]]

```sql

CREATE VIEW [dbo].[V_rhh_ausentismo]
AS
SELECT cod_emp,
	  cer_nro,
	  RTRIM(CONVERT(CHAR, Fec_ini, 102)) AS Fec_ini, 
	  a.cod_aus,
	  ind_pro,
	  au.cla_aus
FROM rhh_ausentismo AS a
INNER JOIN rhh_tbtipaus AS au ON a.cod_aus = au.cod_aus
INNER JOIN Rhh_TbClasAus AS ca ON au.cla_aus = ca.cla_aus
WHERE ind_reconocimiento = 1;


```
