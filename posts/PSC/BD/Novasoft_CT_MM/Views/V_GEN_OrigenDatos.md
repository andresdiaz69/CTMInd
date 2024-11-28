# View: V_GEN_OrigenDatos

```sql

CREATE VIEW [dbo].[V_GEN_OrigenDatos]
AS
SELECT	ROW_NUMBER() OVER (ORDER BY name) AS Codigo, Name AS Nombre 
FROM	sys.objects WITH(NOLOCK)
WHERE	type in (N'U', N'V');

```
