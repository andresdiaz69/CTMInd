# View: v_gen_usuario

```sql

CREATE VIEW [dbo].[v_gen_usuario]
AS

SELECT *
FROM sys.sysusers
WHERE isntuser=1

```
