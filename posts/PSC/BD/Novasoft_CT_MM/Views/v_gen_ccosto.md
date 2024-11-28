# View: v_gen_ccosto

## Usa los objetos:
- [[fn_gen_dependescto]]

```sql

CREATE VIEW [dbo].[v_gen_ccosto]
AS 

SELECT cod_cia, cod_suc, cod_cco, nombre AS nom_cco, estado AS est_cco
FROM  dbo.fn_gen_dependescto (2)
GROUP BY cod_cia, cod_suc, cod_cco, nombre, estado;

```
