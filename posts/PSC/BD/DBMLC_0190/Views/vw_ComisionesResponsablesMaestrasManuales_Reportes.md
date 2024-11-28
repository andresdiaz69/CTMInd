# View: vw_ComisionesResponsablesMaestrasManuales_Reportes

## Usa los objetos:
- [[ComisionesResponsablesMaestrasManuales]]
- [[vw_ComisionesMaestrasManuales]]
- [[vw_ComisionesManualesEmpleadosActivos]]

```sql
CREATE view [com].[vw_ComisionesResponsablesMaestrasManuales_Reportes] 

as
select		ISNULL(CAST((ROW_NUMBER() OVER (ORDER BY Responsanle.IdRegistro)) AS INT), 0) AS Id, 
			Responsanle.CodigoEmpleado, CONCAT(Empleado.Apellido1, ' ',  Empleado.Apellido2) Apellidos, 
			Empleado.Nombres, Responsanle.IdMaestra, cmm.IdEsquema, Responsanle.Estado, Responsanle.FechaModificacion, 
			Responsanle.UserIdModifico
from		com.ComisionesResponsablesMaestrasManuales Responsanle
			join com.vw_ComisionesManualesEmpleadosActivos as Empleado on Empleado.CodigoEmpleado = Responsanle.CodigoEmpleado 
			join com.vw_ComisionesMaestrasManuales as cmm on cmm.IdMaestra = Responsanle.IdMaestra 
														and cmm.Activa = 1 and Activar = 1
group by	Responsanle.CodigoEmpleado, Empleado.Apellido1, Empleado.Apellido2,Empleado.Nombres,
			Responsanle.IdMaestra, cmm.IdEsquema, Responsanle.Estado, Responsanle.FechaModificacion, 
			Responsanle.UserIdModifico, Responsanle.IdRegistro


```
