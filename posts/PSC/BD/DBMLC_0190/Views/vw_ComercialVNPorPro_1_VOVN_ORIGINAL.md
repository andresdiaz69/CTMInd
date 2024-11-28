# View: vw_ComercialVNPorPro_1_VOVN_ORIGINAL

## Usa los objetos:
- [[ComisionesSpigaVO]]
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[Liquidaciones_ComercialVNPorPro_Detalle]]
- [[VehiculosVIN]]
- [[vw_ComercialVNPorPro_1_Pre]]
- [[vw_RangosVersionesMax]]

```sql




CREATE VIEW [dbo].[vw_ComercialVNPorPro_1_VOVN_ORIGINAL]
AS
SELECT        dbo.ComisionesSpigaVO.Ano_Periodo, dbo.ComisionesSpigaVO.Mes_Periodo, dbo.ComisionesSpigaVO.CodigoEmpresaSugerido AS Codigoempresa, dbo.ComisionesSpigaVO.EmpresaSugerida AS Empresa, dbo.ComisionesSpigaVO.CedulaVendedor, 
                         dbo.ComisionesSpigaVO.NombreVendedor, dbo.Empleados.CodigoEmpleado, dbo.Empleados.FechaRetiro, dbo.EmpleadosRangosMaestras.IdRangoMaestra, dbo.vw_RangosVersionesMax.IdRangoVersionMax, 
                         MAX(dbo.ComisionesSpigaVO.NumerEntregas) AS NumerEntregasMax, dbo.vw_ComercialVNPorPro_1_Pre.NumerEntregasCount AS NumerEntregas, dbo.ComisionesSpigaVO.CodigoCentro, dbo.ComisionesSpigaVO.Centro, 
                         dbo.ComisionesSpigaVO.FechaFactura, dbo.ComisionesSpigaVO.FechaEntregaCliente, dbo.ComisionesSpigaVO.TotalFactura, dbo.ComisionesSpigaVO.Marca, dbo.ComisionesSpigaVO.Gama, 
                         dbo.ComisionesSpigaVO.CodigoModelo, dbo.ComisionesSpigaVO.nombreTercero, dbo.ComisionesSpigaVO.NumeroFactura, dbo.ComisionesSpigaVO.VIN, dbo.ComisionesSpigaVO.EntregaEfectiva, 0 AS IdLiquidacion, 
                         0 AS IdHistorico
FROM            (SELECT DISTINCT VIN
                          FROM            dbo.Liquidaciones_ComercialVNPorPro_Detalle
                          WHERE        (VIN IS NOT NULL)) AS VIN_PAGADOS RIGHT OUTER JOIN
                         dbo.ComisionesSpigaVO ON VIN_PAGADOS.VIN = dbo.ComisionesSpigaVO.VIN LEFT OUTER JOIN
                         dbo.VehiculosVIN ON dbo.ComisionesSpigaVO.VIN = dbo.VehiculosVIN.VIN LEFT OUTER JOIN
                         dbo.vw_ComercialVNPorPro_1_Pre ON dbo.ComisionesSpigaVO.Ano_Periodo = dbo.vw_ComercialVNPorPro_1_Pre.Ano_Periodo AND 
                         dbo.ComisionesSpigaVO.Mes_Periodo = dbo.vw_ComercialVNPorPro_1_Pre.Mes_Periodo AND dbo.ComisionesSpigaVO.CodigoEmpresaSugerido = dbo.vw_ComercialVNPorPro_1_Pre.Codigoempresa AND 
                         dbo.ComisionesSpigaVO.CedulaVendedor = dbo.vw_ComercialVNPorPro_1_Pre.CedulaVendedor LEFT OUTER JOIN
                         dbo.EmpleadosRangosMaestras INNER JOIN
                         dbo.vw_RangosVersionesMax ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMax.IdRangoMaestra INNER JOIN
                         dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado ON dbo.ComisionesSpigaVO.CedulaVendedor = dbo.Empleados.CodigoEmpleado
WHERE        
(dbo.VehiculosVIN.ComisionProductividadBloqueada = 0) 
AND NOT (Centro LIKE N'VO%')
AND (VIN_PAGADOS.VIN IS NULL)
AND dbo.ComisionesSpigaVO.Nit NOT IN ('900336249-4', '900283099-7', '830004993-8', '860019063-8', '9003362494', '9002830997', '8300049938', '8600190638')
GROUP BY dbo.ComisionesSpigaVO.Ano_Periodo, dbo.ComisionesSpigaVO.Mes_Periodo, dbo.ComisionesSpigaVO.CodigoEmpresaSugerido, dbo.ComisionesSpigaVO.EmpresaSugerida, dbo.ComisionesSpigaVO.CedulaVendedor, 
                         dbo.ComisionesSpigaVO.NombreVendedor, dbo.Empleados.CodigoEmpleado, dbo.Empleados.FechaRetiro, dbo.EmpleadosRangosMaestras.IdRangoMaestra, dbo.vw_RangosVersionesMax.IdRangoVersionMax, 
                         dbo.ComisionesSpigaVO.Centro, dbo.ComisionesSpigaVO.FechaFactura, dbo.ComisionesSpigaVO.FechaEntregaCliente, dbo.ComisionesSpigaVO.TotalFactura, dbo.ComisionesSpigaVO.Marca, dbo.ComisionesSpigaVO.Gama, 
                         dbo.ComisionesSpigaVO.CodigoModelo, dbo.ComisionesSpigaVO.nombreTercero, dbo.ComisionesSpigaVO.NumeroFactura, dbo.vw_ComercialVNPorPro_1_Pre.NumerEntregasCount, dbo.ComisionesSpigaVO.EntregaEfectiva, 
                         dbo.ComisionesSpigaVO.VIN, dbo.ComisionesSpigaVO.CodigoCentro
HAVING        (dbo.ComisionesSpigaVO.EntregaEfectiva = 1)





```
