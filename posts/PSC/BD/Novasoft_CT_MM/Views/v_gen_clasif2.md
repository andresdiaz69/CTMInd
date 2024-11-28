# View: v_gen_clasif2

## Usa los objetos:
- [[fn_gen_dependescto]]

```sql

CREATE VIEW [dbo].[v_gen_clasif2]
AS 
SELECT cod_cia, cod_suc, cod_cco, cod_cl1, cod_cl2 AS codigo, nombre, estado
FROM  dbo.fn_gen_dependescto (4)
GROUP BY cod_cia, cod_suc, cod_cco, cod_cl1, cod_cl2, nombre, estado

```
