# View: v_rhh_opr_ausentismo_gen

## Usa los objetos:
- [[opr_ausentismo_gen]]

```sql

CREATE VIEW [dbo].[v_rhh_opr_ausentismo_gen]
AS SELECT cod_aus,
		nom_aus
   FROM dbo.opr_ausentismo_gen
   WHERE(cla_aus > '0') OR (cod_aus = '20');

```
