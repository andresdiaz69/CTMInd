# View: vw_AspNetUserRoles

## Usa los objetos:
- [[AspNetRoles]]
- [[AspNetUserRoles]]
- [[AspNetUsers]]

```sql
CREATE VIEW [dbo].[vw_AspNetUserRoles] AS

SELECT ISNULL(CAST((ROW_NUMBER() OVER(ORDER BY  u.UserName)) AS INT),0) id, UserId = u.Id, u.UserName, u.Email, IdRol = r.Id, NombreRol = r.Name 
FROM		AspNetUsers		AS u
INNER JOIN	AspNetUserRoles AS ur	ON u.Id = ur.UserId
INNER JOIN	AspNetRoles		AS r	ON r.Id = ur.RoleId


```
