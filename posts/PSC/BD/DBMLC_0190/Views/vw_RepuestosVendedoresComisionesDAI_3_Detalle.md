# View: vw_RepuestosVendedoresComisionesDAI_3_Detalle

## Usa los objetos:
- [[vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor]]
- [[vw_PorcentajeRecaudoTallerPorFacturaAl100]]
- [[vw_VariablesVersiones]]

```sql


CREATE VIEW [dbo].[vw_RepuestosVendedoresComisionesDAI_3_Detalle]
AS
SELECT        dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.Ano_Periodo, dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.Mes_Periodo, dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.CodigoEmpresa, dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.Centro, 
                         dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.CedulaVendedorRepuestos, dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.NumeroFacturaTaller, dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.FechaFactura, 
                         dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.ValorTotalFactura, dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.ImporteEfecto, dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.PorcentajeRecaudo, 
                         dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.NumOT, 
                         SUM(dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.UnidadesVendidas * dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.ValorUnitario - dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.UnidadesVendidas * dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.ValorUnitario * dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.PorcentajeDescuento
                          / 100) AS ValorBaseTaller, 
                         SUM((dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.UnidadesVendidas * dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.ValorUnitario - dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.UnidadesVendidas * dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.ValorUnitario * dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.PorcentajeDescuento
                          / 100) * [VAR].ValorVariable) AS ComisionTaller, MAX([VAR].ValorVariable) AS ValorVariable, 1 AS TipoTaller
FROM            dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor LEFT OUTER JOIN
                         dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100 ON dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.NumeroFacturaTaller = dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.NumeroFacturaTaller AND 
                         dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.CodigoCentro = dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.CodigoCentro AND 
                         dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.CodigoEmpresa = dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.CodigoEmpresa CROSS JOIN
                             (SELECT        ValorVariable
                               FROM            dbo.vw_VariablesVersiones
                               WHERE        (IdVariable = 14)) AS [VAR]
WHERE        
(dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.TipoOperacion = 'MAT')
AND (dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.FechaFactura <= '20191031')

GROUP BY dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.Ano_Periodo, dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.Mes_Periodo, dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.CodigoEmpresa, dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.CedulaVendedorRepuestos, 
                         dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.NumeroFacturaTaller, dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.FechaFactura, dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.NumOT, dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.Centro, 
                         dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.ValorTotalFactura, dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.ImporteEfecto, dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.PorcentajeRecaudo
HAVING        (dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.CodigoEmpresa = 6) AND (dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedor.CedulaVendedorRepuestos IS NOT NULL)




```
