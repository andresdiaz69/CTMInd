# View: V_cnt_dian2006terceros_res

## Usa los objetos:
- [[V_cnt_dian2006terceros]]

```sql

CREATE VIEW [dbo].[V_cnt_dian2006terceros_res]
AS

SELECT DISTINCT cod_for,nit_ter
FROM V_cnt_dian2006terceros WITH(NOLOCK);

```
