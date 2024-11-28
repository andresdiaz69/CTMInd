# View: v_gen_grupos

```sql

CREATE view [dbo].[v_gen_grupos] 
AS
SELECT SUBSTRING(name,1,30) AS name 
FROM sysusers WITH(NOLOCK)
WHERE uid = GID 
	AND substring(name,1,3)<>'db_';

```
