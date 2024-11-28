# View: v_pre_rubcco

## Usa los objetos:
- [[pre_rub_cco]]
- [[pre_rubro]]

```sql



CREATE VIEW [dbo].[v_pre_rubcco]
AS
SELECT a.cod_rub,a.nom_rub,cod_cco
FROM pre_rubro a INNER JOIN pre_rub_cco b ON a.cod_rub=b.cod_rubro



```
