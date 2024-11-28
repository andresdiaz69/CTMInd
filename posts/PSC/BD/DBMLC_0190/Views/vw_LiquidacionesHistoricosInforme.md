# View: vw_LiquidacionesHistoricosInforme

## Usa los objetos:
- [[ComisionesModelosSub]]
- [[Empleados]]
- [[EmpleadosActivos]]
- [[Empresas]]
- [[vw_LiquidacionesHistoricos]]

```sql
CREATE VIEW [dbo].[vw_LiquidacionesHistoricosInforme]
AS
SELECT        dbo.vw_LiquidacionesHistoricos.IdComisionModeloSub, dbo.ComisionesModelosSub.NombreModeloSub, dbo.vw_LiquidacionesHistoricos.Tipo, dbo.vw_LiquidacionesHistoricos.Ano_Periodo, 
                         dbo.vw_LiquidacionesHistoricos.Mes_Periodo, dbo.vw_LiquidacionesHistoricos.CodigoEmpresa, dbo.Empresas.NombreEmpresa, dbo.vw_LiquidacionesHistoricos.CodigoEmpleado, 
                         dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS Empleado, dbo.vw_LiquidacionesHistoricos.Comision, dbo.EmpleadosActivos.CodigoMarca, dbo.EmpleadosActivos.Marca, 
                         dbo.EmpleadosActivos.codigo_centro, dbo.EmpleadosActivos.nombre_centro, dbo.EmpleadosActivos.codigo_seccion, dbo.EmpleadosActivos.nombre_seccion
FROM            dbo.vw_LiquidacionesHistoricos LEFT OUTER JOIN
                         dbo.ComisionesModelosSub ON dbo.vw_LiquidacionesHistoricos.IdComisionModeloSub = dbo.ComisionesModelosSub.IdComisionModeloSub LEFT OUTER JOIN
                         dbo.EmpleadosActivos ON dbo.vw_LiquidacionesHistoricos.CodigoEmpresa = dbo.EmpleadosActivos.CodigoEmpresa AND dbo.vw_LiquidacionesHistoricos.CodigoEmpleado = dbo.EmpleadosActivos.CodigoEmpleado AND 
                         dbo.vw_LiquidacionesHistoricos.Ano_Periodo = dbo.EmpleadosActivos.Ano_Periodo AND dbo.vw_LiquidacionesHistoricos.Mes_Periodo = dbo.EmpleadosActivos.Mes_Periodo LEFT OUTER JOIN
                         dbo.Empleados ON dbo.vw_LiquidacionesHistoricos.CodigoEmpleado = dbo.Empleados.CodigoEmpleado LEFT OUTER JOIN
                         dbo.Empresas ON dbo.vw_LiquidacionesHistoricos.CodigoEmpresa = dbo.Empresas.CodigoEmpresa
WHERE        (dbo.vw_LiquidacionesHistoricos.Ano_Periodo >= 2018)


```
