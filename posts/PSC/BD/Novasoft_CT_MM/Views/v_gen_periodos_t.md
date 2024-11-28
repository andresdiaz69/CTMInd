# View: v_gen_periodos_t

## Usa los objetos:
- [[gen_periodos]]

```sql

CREATE VIEW [dbo].[v_gen_periodos_t] 
AS 
SELECT	DISTINCT mes_per,nom_per
FROM	gen_periodos WITH(NOLOCK)
WHERE	mes_per<>'13';

```
