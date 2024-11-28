# View: vw_ComercialVNPorFinV2_3

## Usa los objetos:
- [[ComisionFinancierasCantidadMinimaVH]]
- [[ComisionFinancierasEmpleadosPorMarcas]]
- [[ComisionFinancierasPorMarcas]]
- [[vw_ComercialVNPorFinV2_1]]
- [[vw_ComercialVNPorFinV2_2]]

```sql












CREATE VIEW [dbo].[vw_ComercialVNPorFinV2_3]
AS

SELECT *, 

-- JCS:13/03/2024 - YA EXISTE LA EXÓGENA PAGOS POR EMPLEADO
--CASE
--WHEN IdFinanciera IN (17280, 17320, 552867) -- FZ/FA/EQ
--THEN BaseFinanciacion / 1000000 * 10800
--ELSE BaseFinanciacion / 1000000 * 7200
--END AS ComisionAsesor

BaseFinanciacion / 1000000 * ComisionPorMillonEmpleado AS ComisionAsesor

FROM

(

SELECT        vw_ComercialVNPorFinV2_1.Ano_Periodo, vw_ComercialVNPorFinV2_1.Mes_Periodo, vw_ComercialVNPorFinV2_1.Vin, vw_ComercialVNPorFinV2_1.CodigoMarca, vw_ComercialVNPorFinV2_1.Marca, 
                         vw_ComercialVNPorFinV2_1.CodigoGama, vw_ComercialVNPorFinV2_1.Gama, vw_ComercialVNPorFinV2_1.AñoModelo, vw_ComercialVNPorFinV2_1.Modelo, vw_ComercialVNPorFinV2_1.ValorNeto, 
                         vw_ComercialVNPorFinV2_1.TotalFactura, vw_ComercialVNPorFinV2_1.FechaEntregaCliente, vw_ComercialVNPorFinV2_1.NumeroFacturaVehiculo, vw_ComercialVNPorFinV2_1.CedulaVendedor, 
                         vw_ComercialVNPorFinV2_1.NombreVendedor, vw_ComercialVNPorFinV2_1.IdFinanciera, vw_ComercialVNPorFinV2_1.Financiera, vw_ComercialVNPorFinV2_1.BaseImponible, vw_ComercialVNPorFinV2_1.IvaImporte, 
                         vw_ComercialVNPorFinV2_1.FechaFacturaFinanciera, vw_ComercialVNPorFinV2_1.IdEmpresas, vw_ComercialVNPorFinV2_1.Empresa, vw_ComercialVNPorFinV2_1.Centro, vw_ComercialVNPorFinV2_1.Seccion, 
                         vw_ComercialVNPorFinV2_1.Factura_financiera, vw_ComercialVNPorFinV2_1.Documento, vw_ComercialVNPorFinV2_1.NombreTercero, vw_ComercialVNPorFinV2_2.FechaRetiro, vw_ComercialVNPorFinV2_2.IdRangoMaestra, 

						 -- JCS:21/02/2024 - CASO ESPECIAL ESQUEMAS SIN MAESTRAS
						 CASE
						 WHEN IdEmpresas = 1 
						 THEN 97
						 ELSE 98
						 END AS IdComisionModeloSub,
						  
                         ISNULL(ComisionFinancierasPorMarcas.ComisionPorMillon, 0) AS ComisionPorMillon, 
						 ISNULL(ComisionFinancierasEmpleadosPorMarcas.ComisionPorMillon, 0) AS ComisionPorMillonEmpleado, 
						 ISNULL(vw_ComercialVNPorFinV2_2.VehiculosRecaudados, 0) AS VehiculosRecaudados,						 
						 ISNULL(ComisionFinancierasCantidadMinimaVH.CantidadMinimaVH, 0) AS CantidadMinimaVH,

						 CASE 
						 WHEN ISNULL(vw_ComercialVNPorFinV2_2.VehiculosRecaudados, 0) >= ISNULL(ComisionFinancierasCantidadMinimaVH.CantidadMinimaVH, 0) 
						 THEN CAST(1 AS BIT)
						 ELSE CAST(0 AS BIT)
						 END AS AplicaComision,

						 CASE 
						 WHEN ISNULL(ComisionFinancierasPorMarcas.ComisionPorMillon, 0) > 0
						 THEN (vw_ComercialVNPorFinV2_1.BaseImponible / ISNULL(ComisionFinancierasPorMarcas.ComisionPorMillon, 0)) * 1000000 
						 ELSE 0
						 END AS BaseFinanciacion

FROM            

ComisionFinancierasPorMarcas RIGHT OUTER JOIN
ComisionFinancierasEmpleadosPorMarcas RIGHT OUTER JOIN
vw_ComercialVNPorFinV2_1 
ON 
ComisionFinancierasEmpleadosPorMarcas.CodigoFinanciera = vw_ComercialVNPorFinV2_1.IdFinanciera AND 
ComisionFinancierasEmpleadosPorMarcas.CodigoMarca = vw_ComercialVNPorFinV2_1.CodigoMarca AND 
ComisionFinancierasEmpleadosPorMarcas.Ano_Periodo = vw_ComercialVNPorFinV2_1.Ano_Periodo AND 
ComisionFinancierasEmpleadosPorMarcas.Mes_Periodo = vw_ComercialVNPorFinV2_1.Mes_Periodo 
LEFT OUTER JOIN
ComisionFinancierasCantidadMinimaVH 
ON 
vw_ComercialVNPorFinV2_1.CodigoMarca = ComisionFinancierasCantidadMinimaVH.CodigoMarca AND 
vw_ComercialVNPorFinV2_1.Ano_Periodo = ComisionFinancierasCantidadMinimaVH.Ano_Periodo AND 
vw_ComercialVNPorFinV2_1.Mes_Periodo = ComisionFinancierasCantidadMinimaVH.Mes_Periodo 
ON 
ComisionFinancierasPorMarcas.CodigoFinanciera = vw_ComercialVNPorFinV2_1.IdFinanciera AND 
ComisionFinancierasPorMarcas.CodigoMarca = vw_ComercialVNPorFinV2_1.CodigoMarca AND 
ComisionFinancierasPorMarcas.Ano_Periodo = vw_ComercialVNPorFinV2_1.Ano_Periodo AND 
ComisionFinancierasPorMarcas.Mes_Periodo = vw_ComercialVNPorFinV2_1.Mes_Periodo 
LEFT OUTER JOIN
vw_ComercialVNPorFinV2_2 
ON 
vw_ComercialVNPorFinV2_1.CedulaVendedor = vw_ComercialVNPorFinV2_2.CedulaVendedor AND 
vw_ComercialVNPorFinV2_1.Ano_Periodo = vw_ComercialVNPorFinV2_2.Ano_Periodo AND 
vw_ComercialVNPorFinV2_1.Mes_Periodo = vw_ComercialVNPorFinV2_2.Mes_Periodo

WHERE       

(vw_ComercialVNPorFinV2_2.VehiculosRecaudados > 0)
AND
(vw_ComercialVNPorFinV2_2.VehiculosRecaudados >= ISNULL(ComisionFinancierasCantidadMinimaVH.CantidadMinimaVH, 0))

)

AS BASE


```
