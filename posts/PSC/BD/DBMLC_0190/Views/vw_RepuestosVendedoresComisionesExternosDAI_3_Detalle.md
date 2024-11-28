# View: vw_RepuestosVendedoresComisionesExternosDAI_3_Detalle

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]
- [[Empleados]]
- [[vw_PorcentajeRecaudoTallerPorFacturaAl100]]

```sql




CREATE VIEW [dbo].[vw_RepuestosVendedoresComisionesExternosDAI_3_Detalle]
AS
SELECT        dbo.ComisionesSpigaTallerPorOT.Ano_Periodo, dbo.ComisionesSpigaTallerPorOT.Mes_Periodo, 
                         CASE WHEN ComisionesSpigaTallerPorOT.CodigoEmpresa <> Empleados.CodigoEmpresa THEN empleados.codigoempresa ELSE ComisionesSpigaTallerPorOT.CodigoEmpresa END AS CodigoEmpresa, 
                         dbo.ComisionesSpigaTallerPorOT.CodigoEmpresa AS CodigoEmpresaOT, dbo.Empleados.CodigoEmpresa AS CodigoEmpresaEmpleado, dbo.ComisionesSpigaTallerPorOT.Centro, 
                         dbo.ComisionesSpigaTallerPorOT.CedulaVendedorRepuestos, dbo.ComisionesSpigaTallerPorOT.NumeroFacturaTaller, dbo.ComisionesSpigaTallerPorOT.FechaFactura, 
                         dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.ValorTotalFactura, dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.ImporteEfecto, dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.PorcentajeRecaudo, 
                         SUM(dbo.ComisionesSpigaTallerPorOT.UnidadesVendidas * dbo.ComisionesSpigaTallerPorOT.ValorUnitario - dbo.ComisionesSpigaTallerPorOT.UnidadesVendidas * dbo.ComisionesSpigaTallerPorOT.ValorUnitario * dbo.ComisionesSpigaTallerPorOT.PorcentajeDescuento
                          / 100) AS ValorBaseTaller, 1 AS TipoTaller
FROM            dbo.ComisionesSpigaTallerPorOT LEFT OUTER JOIN
                         dbo.Empleados ON dbo.ComisionesSpigaTallerPorOT.CedulaVendedorRepuestos = dbo.Empleados.CodigoEmpleado LEFT OUTER JOIN
                         dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100 ON dbo.ComisionesSpigaTallerPorOT.CodigoEmpresa = dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.CodigoEmpresa AND 
                         dbo.ComisionesSpigaTallerPorOT.CodigoCentro = dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.CodigoCentro AND 
                         dbo.ComisionesSpigaTallerPorOT.NumeroFacturaTaller = dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.NumeroFacturaTaller
WHERE        
(dbo.ComisionesSpigaTallerPorOT.TipoOperacion = 'MAT')
AND (dbo.ComisionesSpigaTallerPorOT.FechaFactura <= '20191031')

GROUP BY dbo.ComisionesSpigaTallerPorOT.Ano_Periodo, dbo.ComisionesSpigaTallerPorOT.Mes_Periodo, dbo.ComisionesSpigaTallerPorOT.CodigoEmpresa, dbo.ComisionesSpigaTallerPorOT.CedulaVendedorRepuestos, 
                         dbo.ComisionesSpigaTallerPorOT.NumeroFacturaTaller, dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.ValorTotalFactura, dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.ImporteEfecto, 
                         dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.PorcentajeRecaudo, dbo.ComisionesSpigaTallerPorOT.Centro, dbo.ComisionesSpigaTallerPorOT.FechaFactura, dbo.Empleados.CodigoEmpresa
HAVING        (dbo.ComisionesSpigaTallerPorOT.CodigoEmpresa = 6) AND (dbo.ComisionesSpigaTallerPorOT.CedulaVendedorRepuestos IS NOT NULL)





```
