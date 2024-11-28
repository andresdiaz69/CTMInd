# View: v_sis_confmae

## Usa los objetos:
- [[sis_confmae]]
- [[sis_maexgru]]

```sql
CREATE VIEW [dbo].[v_sis_confmae]
AS
SELECT DISTINCT dbo.sis_confmae.*, dbo.sis_maexgru.cod_apl AS cod_apl
FROM         dbo.sis_confmae INNER JOIN
                      dbo.sis_maexgru ON dbo.sis_confmae.cod_mae = dbo.sis_maexgru.cod_mae


```
