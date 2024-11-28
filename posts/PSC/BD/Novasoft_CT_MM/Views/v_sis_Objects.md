# View: v_sis_Objects

```sql
CREATE VIEW dbo.v_sis_Objects
AS
SELECT     name, object_id, principal_id, schema_id, parent_object_id, type, type_desc, create_date, modify_date, is_ms_shipped, is_published, is_schema_published
FROM         sys.objects

```
