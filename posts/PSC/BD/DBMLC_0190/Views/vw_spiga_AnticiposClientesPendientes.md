# View: vw_spiga_AnticiposClientesPendientes

## Usa los objetos:
- [[spiga_AnticiposClientesPendientes]]

```sql


CREATE VIEW [dbo].[vw_spiga_AnticiposClientesPendientes] AS
SELECT isnull(ROW_NUMBER()over (order by NIF asc), -1) as orden, *
FROM [PSCService_db].[dbo].[spiga_AnticiposClientesPendientes]


```
