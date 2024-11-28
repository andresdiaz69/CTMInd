# View: vw_ComercialVNPorPro_1_VN

## Usa los objetos:
- [[ComisionesSpigaVN]]
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[Liquidaciones_ComercialVNPorPro_Detalle]]
- [[VehiculosVIN]]
- [[vw_ComercialVNPorPro_1_Pre]]
- [[vw_RangosVersionesMaxSub]]

```sql



CREATE VIEW [dbo].[vw_ComercialVNPorPro_1_VN]
AS
SELECT        dbo.ComisionesSpigaVN.Ano_Periodo, dbo.ComisionesSpigaVN.Mes_Periodo, dbo.ComisionesSpigaVN.CodigoEmpresaSugerido AS CodigoEmpresa, dbo.ComisionesSpigaVN.EmpresaSugerida AS Empresa, dbo.ComisionesSpigaVN.CedulaVendedor, 
                         dbo.ComisionesSpigaVN.NombreVendedor, dbo.Empleados.CodigoEmpleado, dbo.Empleados.FechaRetiro, dbo.EmpleadosRangosMaestras.IdRangoMaestra, dbo.vw_RangosVersionesMaxSub.IdRangoVersionMax, 
                         
						 MAX(dbo.ComisionesSpigaVN.NumerEntregas) AS NumerEntregasMax, 
						 MAX(dbo.vw_ComercialVNPorPro_1_Pre.NumerEntregasCount) AS NumerEntregas,
						 MAX(dbo.vw_ComercialVNPorPro_1_Pre.NumerEntregasCount_VehUtil) AS NumerEntregas_VehUtil,
						 
						 dbo.ComisionesSpigaVN.CodigoCentro, dbo.ComisionesSpigaVN.Centro, 
                         dbo.ComisionesSpigaVN.FechaFactura, dbo.ComisionesSpigaVN.FechaEntregaCliente, dbo.ComisionesSpigaVN.TotalFactura, dbo.ComisionesSpigaVN.Marca, dbo.ComisionesSpigaVN.Gama, 
                         dbo.ComisionesSpigaVN.CodigoModelo, dbo.ComisionesSpigaVN.nombreTercero, dbo.ComisionesSpigaVN.NumeroFactura, dbo.ComisionesSpigaVN.VIN, dbo.ComisionesSpigaVN.EntregaEfectiva, 0 AS IdLiquidacion, 
                         0 AS IdHistorico
FROM            dbo.ComisionesSpigaVN LEFT OUTER JOIN
                             (SELECT DISTINCT VIN
                               FROM            dbo.Liquidaciones_ComercialVNPorPro_Detalle
                               WHERE        (VIN IS NOT NULL)) AS VIN_PAGADOS ON dbo.ComisionesSpigaVN.VIN = VIN_PAGADOS.VIN LEFT OUTER JOIN
                         dbo.vw_ComercialVNPorPro_1_Pre ON dbo.ComisionesSpigaVN.Ano_Periodo = dbo.vw_ComercialVNPorPro_1_Pre.Ano_Periodo AND 
                         dbo.ComisionesSpigaVN.Mes_Periodo = dbo.vw_ComercialVNPorPro_1_Pre.Mes_Periodo AND dbo.ComisionesSpigaVN.CodigoEmpresaSugerido = dbo.vw_ComercialVNPorPro_1_Pre.Codigoempresa AND 
                         dbo.ComisionesSpigaVN.CedulaVendedor = dbo.vw_ComercialVNPorPro_1_Pre.CedulaVendedor LEFT OUTER JOIN
                         dbo.EmpleadosRangosMaestras INNER JOIN
                         dbo.vw_RangosVersionesMaxSub ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMaxSub.IdRangoMaestra INNER JOIN
                         dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado ON dbo.ComisionesSpigaVN.CedulaVendedor = dbo.Empleados.CodigoEmpleado LEFT OUTER JOIN
                         dbo.VehiculosVIN ON dbo.ComisionesSpigaVN.VIN = dbo.VehiculosVIN.VIN
WHERE        
(dbo.VehiculosVIN.ComisionProductividadBloqueada = 0) 
AND (VIN_PAGADOS.VIN IS NULL)
AND dbo.ComisionesSpigaVN.Nit NOT IN ('900336249-4', '900283099-7', '830004993-8', '860019063-8', '9003362494', '9002830997', '8300049938', '8600190638')
AND dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub IN (12,13) -- SOLUCIONA LA DUPLICIDAD EN EL DETALLE, AHORA SE UTILIZA: vw_RangosVersionesMaxSub
AND dbo.ComisionesSpigaVN.Ano_Periodo >= 2022 -- JCS: 2022/11/09 - PERFORMANCE
AND dbo.vw_ComercialVNPorPro_1_Pre.Ano_Periodo >= 2022 -- JCS: 2022/11/09 - PERFORMANCE
GROUP BY dbo.ComisionesSpigaVN.Ano_Periodo, dbo.ComisionesSpigaVN.Mes_Periodo, dbo.ComisionesSpigaVN.CodigoEmpresaSugerido, dbo.ComisionesSpigaVN.EmpresaSugerida, dbo.ComisionesSpigaVN.CedulaVendedor, 
                         dbo.ComisionesSpigaVN.NombreVendedor, dbo.Empleados.CodigoEmpleado, dbo.Empleados.FechaRetiro, dbo.EmpleadosRangosMaestras.IdRangoMaestra, dbo.vw_RangosVersionesMaxSub.IdRangoVersionMax, 
                         dbo.ComisionesSpigaVN.Centro, dbo.ComisionesSpigaVN.FechaFactura, dbo.ComisionesSpigaVN.FechaEntregaCliente, dbo.ComisionesSpigaVN.TotalFactura, dbo.ComisionesSpigaVN.Marca, dbo.ComisionesSpigaVN.Gama, 
                         dbo.ComisionesSpigaVN.CodigoModelo, dbo.ComisionesSpigaVN.nombreTercero, dbo.ComisionesSpigaVN.NumeroFactura, dbo.ComisionesSpigaVN.EntregaEfectiva, 
                         dbo.ComisionesSpigaVN.VIN, dbo.ComisionesSpigaVN.CodigoCentro
HAVING        (dbo.ComisionesSpigaVN.EntregaEfectiva = 1)




```
