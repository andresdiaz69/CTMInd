# View: vw_ComisionesResponsablesMaestrasManuales

## Usa los objetos:
- [[ComisionesMaestrasManuales]]
- [[ComisionesResponsablesMaestrasManuales]]
- [[vw_ComisionesManualesEmpleadosActivos]]

```sql

CREATE view [com].[vw_ComisionesResponsablesMaestrasManuales] 

as
select ISNULL(CAST((ROW_NUMBER() OVER (ORDER BY Responsanle.IdRegistro)) AS INT), 0) AS Id, 
Responsanle.CodigoEmpleado, CONCAT(Empleado.Apellido1, ' ',  Empleado.Apellido2) Apellidos, 
Empleado.Nombres, Empleado.Nombre_Cargo, Responsanle.IdMaestra, cmm.IdEsquema, Responsanle.Estado, Responsanle.FechaModificacion, 
Responsanle.UserIdModifico
from com.ComisionesResponsablesMaestrasManuales Responsanle
join com.vw_ComisionesManualesEmpleadosActivos as Empleado on Empleado.CodigoEmpleado = Responsanle.CodigoEmpleado 
join com.ComisionesMaestrasManuales as cmm on cmm.IdMaestra = Responsanle.IdMaestra 

```
