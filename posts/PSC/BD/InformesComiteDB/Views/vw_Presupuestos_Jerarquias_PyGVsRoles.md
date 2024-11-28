# View: vw_Presupuestos_Jerarquias_PyGVsRoles

## Usa los objetos:
- [[AspNetRoles]]
- [[Presupuestos_Jerarquias]]
- [[Presupuestos_Jerarquias_PyGVsRoles]]

```sql
CREATE VIEW dbo.vw_Presupuestos_Jerarquias_PyGVsRoles
AS
SELECT        dbo.Presupuestos_Jerarquias_PyGVsRoles.IdJerarquia, dbo.Presupuestos_Jerarquias.CodigoConcepto, dbo.Presupuestos_Jerarquias.NombreConcepto, dbo.Presupuestos_Jerarquias_PyGVsRoles.RoleId, 
                         DBMLC_0190.dbo.AspNetRoles.Name AS RoleName
FROM            dbo.Presupuestos_Jerarquias_PyGVsRoles LEFT OUTER JOIN
                         DBMLC_0190.dbo.AspNetRoles ON dbo.Presupuestos_Jerarquias_PyGVsRoles.RoleId = DBMLC_0190.dbo.AspNetRoles.Id LEFT OUTER JOIN
                         dbo.Presupuestos_Jerarquias ON dbo.Presupuestos_Jerarquias_PyGVsRoles.IdJerarquia = dbo.Presupuestos_Jerarquias.IdJerarquia

```
