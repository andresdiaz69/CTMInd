# View: vw_BonificacionTalleres_Liquidacion

## Usa los objetos:
- [[Cargos]]
- [[Centros]]
- [[EmpleadosActivos]]
- [[ExogenasBonificacionTalleres]]

```sql


CREATE VIEW [dbo].[vw_BonificacionTalleres_Liquidacion]
AS
SELECT DISTINCT 

eb.Ano AS Ano_Periodo, eb.Mes AS Mes_Periodo, eb.CodigoEmpleado, ea.Nombres + ' ' + ea.Apellido1 + ' ' + ea.Apellido2 AS Empleado, 
ea.CodigoEmpresa, ea.Empresa, ea.Unidad_Negocio, ea.Nombre_Unidad_Negocio, 
ea.codigo_centro, cr.NombreCentro, ea.Codigo_Cargo, cg.NombreCargo, eb.ValorBonificacion AS Comision, 
cg.CodigoConceptoBonificacionTaller, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion

FROM            

dbo.ExogenasBonificacionTalleres AS eb 
LEFT OUTER JOIN dbo.EmpleadosActivos AS ea 

ON eb.Mes = ea.Mes_Periodo 
AND eb.Ano = ea.Ano_Periodo 
AND eb.CodigoEmpleado = ea.CodigoEmpleado 
AND eb.UnidadNegocio = ea.Unidad_Negocio 
AND eb.CodigoCentro = ea.codigo_centro 
AND eb.CodigoCargo = ea.Codigo_Cargo 

LEFT OUTER JOIN dbo.Cargos AS cg 

ON ea.Codigo_Cargo = cg.CodigoCargo 
LEFT OUTER JOIN dbo.Centros AS cr ON eb.CodigoCentro = cr.CodigoCentro

```
