# View: v_gen_sucursal

## Usa los objetos:
- [[fn_gen_dependescto]]

```sql

CREATE VIEW [dbo].[v_gen_sucursal]
AS 

SELECT cod_cia, cod_suc, nombre AS nom_suc, estado AS est_suc
FROM  dbo.fn_gen_dependescto (1)
GROUP BY cod_cia, cod_suc, nombre, estado

```
