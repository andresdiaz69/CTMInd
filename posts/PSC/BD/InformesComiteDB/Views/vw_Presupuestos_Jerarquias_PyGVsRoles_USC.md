# View: vw_Presupuestos_Jerarquias_PyGVsRoles_USC

## Usa los objetos:
- [[AspNetRoles]]
- [[Presupuestos_Jerarquias_PyGVsRoles_USC]]
- [[Presupuestos_Jerarquias_USC]]

```sql

CREATE VIEW [dbo].[vw_Presupuestos_Jerarquias_PyGVsRoles_USC]
AS
SELECT			dbo.Presupuestos_Jerarquias_PyGVsRoles_USC.IdJerarquia, 
				dbo.Presupuestos_Jerarquias_USC.CodigoConcepto, 
				dbo.Presupuestos_Jerarquias_USC.NombreConcepto, 
				dbo.Presupuestos_Jerarquias_PyGVsRoles_USC.RoleId, 
                         DBMLC_0190.dbo.AspNetRoles.Name AS RoleName

FROM            dbo.Presupuestos_Jerarquias_PyGVsRoles_USC LEFT OUTER JOIN
                         DBMLC_0190.dbo.AspNetRoles ON dbo.Presupuestos_Jerarquias_PyGVsRoles_USC.RoleId = DBMLC_0190.dbo.AspNetRoles.Id LEFT OUTER JOIN
                         dbo.Presupuestos_Jerarquias_USC ON dbo.Presupuestos_Jerarquias_PyGVsRoles_USC.IdJerarquia = dbo.Presupuestos_Jerarquias_USC.IdJerarquia

```
