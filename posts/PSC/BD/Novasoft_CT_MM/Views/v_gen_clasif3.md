# View: v_gen_clasif3

## Usa los objetos:
- [[fn_gen_dependescto]]

```sql

CREATE VIEW [dbo].[v_gen_clasif3]
AS 
SELECT cod_cia, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3 AS codigo, nombre, estado
FROM  dbo.fn_gen_dependescto (5)
GROUP BY cod_cia, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, nombre, estado

```
