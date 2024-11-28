# View: v_gen_clasif1

## Usa los objetos:
- [[fn_gen_dependescto]]

```sql

CREATE VIEW [dbo].[v_gen_clasif1]
AS 
SELECT cod_cia, cod_suc, cod_cco, cod_cl1 AS codigo, nombre, estado
FROM  dbo.fn_gen_dependescto (3)
GROUP BY cod_cia, cod_suc, cod_cco, cod_cl1, nombre, estado

```
