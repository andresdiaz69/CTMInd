# View: vw_ComercialVNPorFinV2_Liquidacion

## Usa los objetos:
- [[Empleados]]
- [[vw_ComercialVNPorFinV2_3]]

```sql
CREATE VIEW [dbo].[vw_ComercialVNPorFinV2_Liquidacion]
AS
SELECT        

vw_ComercialVNPorFinV2_3.Ano_Periodo, 
vw_ComercialVNPorFinV2_3.Mes_Periodo, 
vw_ComercialVNPorFinV2_3.IdEmpresas AS CodigoEmpresa, 
vw_ComercialVNPorFinV2_3.Empresa,
vw_ComercialVNPorFinV2_3.CedulaVendedor, 
vw_ComercialVNPorFinV2_3.CedulaVendedor AS CodigoEmpleado,
vw_ComercialVNPorFinV2_3.NombreVendedor,
vw_ComercialVNPorFinV2_3.NombreVendedor AS Empleado,

--JCS:2024/08/22 - SE DEBE VALIDAR QUE EN EL PERIODO ACTUAL EL EMPLEADO ESTE ACTIVO, CON EL PERIODO QUE GENERO LA COMISION NO ES SUFICIENTE
Empleados.FechaRetiro, 

vw_ComercialVNPorFinV2_3.CodigoMarca, 
vw_ComercialVNPorFinV2_3.Marca,
vw_ComercialVNPorFinV2_3.VehiculosRecaudados,

SUM(vw_ComercialVNPorFinV2_3.ComisionAsesor) AS ComisionFinancieras,

vw_ComercialVNPorFinV2_3.IdRangoMaestra,
vw_ComercialVNPorFinV2_3.IdComisionModeloSub,

0 AS IdLiquidacion, 
0 AS IdHistorico, 
GETDATE() AS FechaLiquidacion

FROM            vw_ComercialVNPorFinV2_3 LEFT OUTER JOIN
                         Empleados ON vw_ComercialVNPorFinV2_3.CedulaVendedor = Empleados.CodigoEmpleado

--JCS:2024/08/22 - SE DEBE VALIDAR QUE EN EL PERIODO ACTUAL EL EMPLEADO ESTE ACTIVO, CON EL PERIODO QUE GENERO LA COMISION NO ES SUFICIENTE
--TODO: VALIDAR PQ ESTO SE DEBERÍA PODER HACER POR LA INTERFAZ
WHERE Empleados.FechaRetiro IS NULL

GROUP BY 

vw_ComercialVNPorFinV2_3.Ano_Periodo, 
vw_ComercialVNPorFinV2_3.Mes_Periodo, 
vw_ComercialVNPorFinV2_3.IdEmpresas, 
vw_ComercialVNPorFinV2_3.Empresa, 
vw_ComercialVNPorFinV2_3.CedulaVendedor, 
vw_ComercialVNPorFinV2_3.NombreVendedor, 
vw_ComercialVNPorFinV2_3.CodigoMarca, 
vw_ComercialVNPorFinV2_3.Marca, 
vw_ComercialVNPorFinV2_3.IdRangoMaestra, 
vw_ComercialVNPorFinV2_3.VehiculosRecaudados, 
vw_ComercialVNPorFinV2_3.IdComisionModeloSub,
Empleados.FechaRetiro


```
