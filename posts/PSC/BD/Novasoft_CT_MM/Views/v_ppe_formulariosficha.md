# View: v_ppe_formulariosficha

```sql

-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_ppe_formulariosficha]
AS

SELECT name
FROM sys.objects WITH (NOLOCK)
WHERE name like 'ppe_ft%'

```
