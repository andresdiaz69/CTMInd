# View: vw_AsesorComercialVehiculosUsadosPorFinV2_Liquidacion

## Usa los objetos:
- [[Empleados]]
- [[vw_AsesorComercialVehiculosUsadosPorFinV2_3]]

```sql


CREATE VIEW [dbo].[vw_AsesorComercialVehiculosUsadosPorFinV2_Liquidacion]
AS
SELECT        

vw_AsesorComercialVehiculosUsadosPorFinV2_3.Ano_Periodo, 
vw_AsesorComercialVehiculosUsadosPorFinV2_3.Mes_Periodo, 
vw_AsesorComercialVehiculosUsadosPorFinV2_3.IdEmpresas AS CodigoEmpresa, 
vw_AsesorComercialVehiculosUsadosPorFinV2_3.Empresa, 
vw_AsesorComercialVehiculosUsadosPorFinV2_3.CedulaVendedor, 
vw_AsesorComercialVehiculosUsadosPorFinV2_3.CedulaVendedor AS CodigoEmpleado, 
vw_AsesorComercialVehiculosUsadosPorFinV2_3.NombreVendedor, 
vw_AsesorComercialVehiculosUsadosPorFinV2_3.NombreVendedor AS Empleado, 

--JCS:2024/07/23 - SE DEBE VALIDAR QUE EN EL PERIODO ACTUAL EL EMPLEADO ESTE ACTIVO, CON EL PERIODO QUE GENERO LA COMISION NO ES SUFICIENTE
Empleados.FechaRetiro,

vw_AsesorComercialVehiculosUsadosPorFinV2_3.CodigoMarca, 
vw_AsesorComercialVehiculosUsadosPorFinV2_3.Marca, 
vw_AsesorComercialVehiculosUsadosPorFinV2_3.VehiculosRecaudados, 

SUM(vw_AsesorComercialVehiculosUsadosPorFinV2_3.ComisionAsesor) AS ComisionFinancieras, 

vw_AsesorComercialVehiculosUsadosPorFinV2_3.IdRangoMaestra, 
vw_AsesorComercialVehiculosUsadosPorFinV2_3.IdComisionModeloSub, 

0 AS IdLiquidacion, 
0 AS IdHistorico, 
GETDATE() AS FechaLiquidacion


FROM            vw_AsesorComercialVehiculosUsadosPorFinV2_3 LEFT OUTER JOIN
                         Empleados ON vw_AsesorComercialVehiculosUsadosPorFinV2_3.CedulaVendedor = Empleados.CodigoEmpleado

--JCS:2024/07/23 - SE DEBE VALIDAR QUE EN EL PERIODO ACTUAL EL EMPLEADO ESTE ACTIVO, CON EL PERIODO QUE GENERO LA COMISION NO ES SUFICIENTE
--TODO: VALIDAR PQ ESTO SE DEBERÍA PODER HACER POR LA INTERFAZ
WHERE Empleados.FechaRetiro IS NULL

GROUP BY 

vw_AsesorComercialVehiculosUsadosPorFinV2_3.Ano_Periodo, 
vw_AsesorComercialVehiculosUsadosPorFinV2_3.Mes_Periodo, 
vw_AsesorComercialVehiculosUsadosPorFinV2_3.IdEmpresas, 
vw_AsesorComercialVehiculosUsadosPorFinV2_3.Empresa, 
vw_AsesorComercialVehiculosUsadosPorFinV2_3.CedulaVendedor, 
vw_AsesorComercialVehiculosUsadosPorFinV2_3.NombreVendedor, 
vw_AsesorComercialVehiculosUsadosPorFinV2_3.CodigoMarca, 
vw_AsesorComercialVehiculosUsadosPorFinV2_3.Marca, 
vw_AsesorComercialVehiculosUsadosPorFinV2_3.IdRangoMaestra, 
vw_AsesorComercialVehiculosUsadosPorFinV2_3.VehiculosRecaudados, 
vw_AsesorComercialVehiculosUsadosPorFinV2_3.IdComisionModeloSub, 
Empleados.FechaRetiro


```
