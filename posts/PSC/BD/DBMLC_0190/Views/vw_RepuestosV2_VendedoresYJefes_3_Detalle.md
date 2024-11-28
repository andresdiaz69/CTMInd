# View: vw_RepuestosV2_VendedoresYJefes_3_Detalle

## Usa los objetos:
- [[Empleados]]
- [[vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCTMM]]
- [[vw_PorcentajeRecaudoTallerPorFacturaAl100]]

```sql





CREATE VIEW [dbo].[vw_RepuestosV2_VendedoresYJefes_3_Detalle]
AS
SELECT        dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCTMM.Ano_Periodo, dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCTMM.Mes_Periodo, 
                         CASE WHEN vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCTMM.CodigoEmpresa <> Empleados.CodigoEmpresa THEN empleados.codigoempresa ELSE vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCTMM.CodigoEmpresa END AS CodigoEmpresa, 
                         dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCTMM.CodigoEmpresa AS CodigoEmpresaOT, dbo.Empleados.CodigoEmpresa AS CodigoEmpresaEmpleado, dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCTMM.Centro, 
                         dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCTMM.CedulaVendedorRepuestos, dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCTMM.NumeroFacturaTaller, dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCTMM.FechaFactura, 
                         dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.ValorTotalFactura, dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.ImporteEfecto, dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.PorcentajeRecaudo, 
                         SUM(dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCTMM.UnidadesVendidas * dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCTMM.ValorUnitario - dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCTMM.UnidadesVendidas * dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCTMM.ValorUnitario * dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCTMM.PorcentajeDescuento
                          / 100) AS ValorBaseTaller, 1 AS TipoTaller
FROM            dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCTMM LEFT OUTER JOIN
                         dbo.Empleados ON dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCTMM.CedulaVendedorRepuestos = dbo.Empleados.CodigoEmpleado LEFT OUTER JOIN
                         dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100 ON dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCTMM.CodigoEmpresa = dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.CodigoEmpresa AND 
                         dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCTMM.CodigoCentro = dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.CodigoCentro AND 
                         dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCTMM.NumeroFacturaTaller = dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.NumeroFacturaTaller
WHERE        
(dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCTMM.TipoOperacion = 'MAT')
AND
(dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCTMM.FechaFactura >= '20191101')

GROUP BY dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCTMM.Ano_Periodo, dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCTMM.Mes_Periodo, dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCTMM.CodigoEmpresa, dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCTMM.CedulaVendedorRepuestos, 
                         dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCTMM.NumeroFacturaTaller, dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.ValorTotalFactura, dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.ImporteEfecto, 
                         dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.PorcentajeRecaudo, dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCTMM.Centro, dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCTMM.FechaFactura, dbo.Empleados.CodigoEmpresa
HAVING        (dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCTMM.CedulaVendedorRepuestos IS NOT NULL)




```
