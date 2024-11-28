# View: vw_AsesorComercialVehiculosUsadosPorFinV2_3

## Usa los objetos:
- [[ComisionFinancierasCantidadMinimaVH]]
- [[ComisionFinancierasEmpleadosPorMarcas]]
- [[ComisionFinancierasPorMarcas]]
- [[vw_AsesorComercialVehiculosUsadosPorFinV2_1]]
- [[vw_AsesorComercialVehiculosUsadosPorFinV2_2]]

```sql















CREATE VIEW [dbo].[vw_AsesorComercialVehiculosUsadosPorFinV2_3]
AS

SELECT *, 

-- JCS:13/03/2024 - YA EXISTE LA EXÓGENA PAGOS POR EMPLEADO
BaseFinanciacion / 1000000 * ComisionPorMillonEmpleado AS ComisionAsesor

FROM

(

SELECT        vw_AsesorComercialVehiculosUsadosPorFinV2_1.Ano_Periodo, vw_AsesorComercialVehiculosUsadosPorFinV2_1.Mes_Periodo, vw_AsesorComercialVehiculosUsadosPorFinV2_1.Vin, vw_AsesorComercialVehiculosUsadosPorFinV2_1.CodigoMarca, vw_AsesorComercialVehiculosUsadosPorFinV2_1.Marca, 
                         vw_AsesorComercialVehiculosUsadosPorFinV2_1.CodigoGama, vw_AsesorComercialVehiculosUsadosPorFinV2_1.Gama, vw_AsesorComercialVehiculosUsadosPorFinV2_1.AñoModelo, vw_AsesorComercialVehiculosUsadosPorFinV2_1.Modelo, vw_AsesorComercialVehiculosUsadosPorFinV2_1.ValorNeto, 
                         vw_AsesorComercialVehiculosUsadosPorFinV2_1.TotalFactura, vw_AsesorComercialVehiculosUsadosPorFinV2_1.FechaEntregaCliente, vw_AsesorComercialVehiculosUsadosPorFinV2_1.NumeroFacturaVehiculo, vw_AsesorComercialVehiculosUsadosPorFinV2_1.CedulaVendedor, 
                         vw_AsesorComercialVehiculosUsadosPorFinV2_1.NombreVendedor, vw_AsesorComercialVehiculosUsadosPorFinV2_1.IdFinanciera, vw_AsesorComercialVehiculosUsadosPorFinV2_1.Financiera, vw_AsesorComercialVehiculosUsadosPorFinV2_1.BaseImponible, vw_AsesorComercialVehiculosUsadosPorFinV2_1.IvaImporte, 
                         vw_AsesorComercialVehiculosUsadosPorFinV2_1.FechaFacturaFinanciera, vw_AsesorComercialVehiculosUsadosPorFinV2_1.IdEmpresas, vw_AsesorComercialVehiculosUsadosPorFinV2_1.Empresa, vw_AsesorComercialVehiculosUsadosPorFinV2_1.Centro, vw_AsesorComercialVehiculosUsadosPorFinV2_1.Seccion, 
                         vw_AsesorComercialVehiculosUsadosPorFinV2_1.Factura_financiera, vw_AsesorComercialVehiculosUsadosPorFinV2_1.Documento, vw_AsesorComercialVehiculosUsadosPorFinV2_1.NombreTercero, vw_AsesorComercialVehiculosUsadosPorFinV2_2.FechaRetiro, vw_AsesorComercialVehiculosUsadosPorFinV2_2.IdRangoMaestra, 

						 -- JCS:13/03/2024 - CASO ESPECIAL ESQUEMAS SIN MAESTRAS
						 100 AS IdComisionModeloSub,
						  
                         ISNULL(ComisionFinancierasPorMarcas.ComisionPorMillon, 0) AS ComisionPorMillon, 
						 ISNULL(ComisionFinancierasEmpleadosPorMarcas.ComisionPorMillon, 0) AS ComisionPorMillonEmpleado, 
						 ISNULL(vw_AsesorComercialVehiculosUsadosPorFinV2_2.VehiculosRecaudados, 0) AS VehiculosRecaudados,						 
						 ISNULL(ComisionFinancierasCantidadMinimaVH.CantidadMinimaVH, 0) AS CantidadMinimaVH,

						 CASE 
						 WHEN ISNULL(vw_AsesorComercialVehiculosUsadosPorFinV2_2.VehiculosRecaudados, 0) >= ISNULL(ComisionFinancierasCantidadMinimaVH.CantidadMinimaVH, 0) 
						 THEN CAST(1 AS BIT)
						 ELSE CAST(0 AS BIT)
						 END AS AplicaComision,

						 CASE 
						 WHEN ISNULL(ComisionFinancierasPorMarcas.ComisionPorMillon, 0) > 0
						 THEN (vw_AsesorComercialVehiculosUsadosPorFinV2_1.BaseImponible / ISNULL(ComisionFinancierasPorMarcas.ComisionPorMillon, 0)) * 1000000 
						 ELSE 0
						 END AS BaseFinanciacion

FROM            

ComisionFinancierasPorMarcas RIGHT OUTER JOIN
ComisionFinancierasEmpleadosPorMarcas RIGHT OUTER JOIN
vw_AsesorComercialVehiculosUsadosPorFinV2_1 
ON 
ComisionFinancierasEmpleadosPorMarcas.CodigoFinanciera = vw_AsesorComercialVehiculosUsadosPorFinV2_1.IdFinanciera AND 
ComisionFinancierasEmpleadosPorMarcas.CodigoMarca = vw_AsesorComercialVehiculosUsadosPorFinV2_1.CodigoMarca AND 
ComisionFinancierasEmpleadosPorMarcas.Ano_Periodo = vw_AsesorComercialVehiculosUsadosPorFinV2_1.Ano_Periodo AND 
ComisionFinancierasEmpleadosPorMarcas.Mes_Periodo = vw_AsesorComercialVehiculosUsadosPorFinV2_1.Mes_Periodo 
LEFT OUTER JOIN
ComisionFinancierasCantidadMinimaVH 
ON 
vw_AsesorComercialVehiculosUsadosPorFinV2_1.CodigoMarca = ComisionFinancierasCantidadMinimaVH.CodigoMarca AND 
vw_AsesorComercialVehiculosUsadosPorFinV2_1.Ano_Periodo = ComisionFinancierasCantidadMinimaVH.Ano_Periodo AND 
vw_AsesorComercialVehiculosUsadosPorFinV2_1.Mes_Periodo = ComisionFinancierasCantidadMinimaVH.Mes_Periodo 
ON 
ComisionFinancierasPorMarcas.CodigoFinanciera = vw_AsesorComercialVehiculosUsadosPorFinV2_1.IdFinanciera AND 
ComisionFinancierasPorMarcas.CodigoMarca = vw_AsesorComercialVehiculosUsadosPorFinV2_1.CodigoMarca AND 
ComisionFinancierasPorMarcas.Ano_Periodo = vw_AsesorComercialVehiculosUsadosPorFinV2_1.Ano_Periodo AND 
ComisionFinancierasPorMarcas.Mes_Periodo = vw_AsesorComercialVehiculosUsadosPorFinV2_1.Mes_Periodo 
LEFT OUTER JOIN
vw_AsesorComercialVehiculosUsadosPorFinV2_2 
ON 
vw_AsesorComercialVehiculosUsadosPorFinV2_1.CedulaVendedor = vw_AsesorComercialVehiculosUsadosPorFinV2_2.CedulaVendedor AND 
vw_AsesorComercialVehiculosUsadosPorFinV2_1.Ano_Periodo = vw_AsesorComercialVehiculosUsadosPorFinV2_2.Ano_Periodo AND 
vw_AsesorComercialVehiculosUsadosPorFinV2_1.Mes_Periodo = vw_AsesorComercialVehiculosUsadosPorFinV2_2.Mes_Periodo

WHERE       

(vw_AsesorComercialVehiculosUsadosPorFinV2_2.VehiculosRecaudados > 0)
AND
(vw_AsesorComercialVehiculosUsadosPorFinV2_2.VehiculosRecaudados >= ISNULL(ComisionFinancierasCantidadMinimaVH.CantidadMinimaVH, 0))

)

AS BASE


```
