# View: vw_Bonificaciones_Liquidacion

## Usa los objetos:
- [[Cargos]]
- [[Centros]]
- [[EmpleadosActivos]]
- [[ExogenasBonificaciones]]

```sql

CREATE VIEW [dbo].[vw_Bonificaciones_Liquidacion] AS 
select distinct eb.Ano as Ano_Periodo, eb.Mes as Mes_Periodo, eb.CodigoEmpleado, ea.Nombres + ' ' + ea.Apellido1 + ' ' + ea.Apellido2 as Empleado,
ea.CodigoEmpresa,ea.Empresa,ea.Unidad_Negocio,ea.Nombre_Unidad_Negocio,ea.codigo_centro,cr.NombreCentro, ea.Codigo_Cargo,cg.NombreCargo,  eb.ValorBonificacion as Comision,
cg.ValorMaximoBonificacion, cg.CodigoConceptoBonificacionTaller, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
from ExogenasBonificaciones as eb left join 
EmpleadosActivos as ea on eb.CodigoEmpleado = ea.CodigoEmpleado and eb.UnidadNegocio = ea.Unidad_Negocio and eb.CodigoCentro = ea.codigo_centro and eb.CodigoCargo = ea.Codigo_Cargo left join 
Cargos as cg on ea.Codigo_Cargo = cg.CodigoCargo left join Centros as cr on eb.CodigoCentro = cr.CodigoCentro

```
