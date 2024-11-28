# View: vw_Empleados_ValidosProductividad_JD

## Usa los objetos:
- [[v_EmpleadosActivosRetirados]]
- [[vw_CargosProductividad]]

```sql

CREATE VIEW [dbo].[vw_Empleados_ValidosProductividad_JD] AS

SELECT a.Ano_Periodo, a.Mes_Periodo, a.CodigoEmpleado, a.Nombres, a.Apellido1, a.Apellido2, a.CodigoEmpresa, a.Empresa, a.Unidad_Negocio, 
	a.Nombre_Unidad_Negocio, a.CodigoMarca, a.Marca, a.codigo_centro, a.nombre_centro, a.Fecha_Ingreso, a.Fecha_retiro, a.Codigo_Cargo, A.Nombre_Cargo
FROM v_EmpleadosActivosRetirados	AS a
INNER JOIN vw_CargosProductividad	AS b ON a.Codigo_Cargo = b.CodigoCargo
WHERE a.CodigoMarca	IN (80, 410, 411, 416, 482, 483, 520, 592) 


```
