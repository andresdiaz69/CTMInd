# View: V_GEN_Campos

```sql

CREATE VIEW [dbo].[V_GEN_Campos]
AS
SELECT COLUMN_NAME AS CAMPO, TABLE_NAME AS TABLA
FROM INFORMATION_SCHEMA.COLUMNS WITH(NOLOCK);

```
