# View: vw_RepuestosVendedoresComisionesCT_3_Detalle

## Usa los objetos:
- [[Empleados]]
- [[vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT]]
- [[vw_PorcentajeRecaudoTallerPorFacturaAl100]]

```sql











CREATE VIEW [dbo].[vw_RepuestosVendedoresComisionesCT_3_Detalle]
AS
SELECT        dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT.Ano_Periodo, dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT.Mes_Periodo, 
                         CASE WHEN vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT.CodigoEmpresa <> Empleados.CodigoEmpresa THEN empleados.codigoempresa ELSE vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT.CodigoEmpresa END AS CodigoEmpresa, 
                         dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT.CodigoEmpresa AS CodigoEmpresaOT, dbo.Empleados.CodigoEmpresa AS CodigoEmpresaEmpleado, dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT.Centro, 
                         dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT.CedulaVendedorRepuestos, dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT.NumeroFacturaTaller, dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT.FechaFactura, 
                         dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.ValorTotalFactura, dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.ImporteEfecto, dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.PorcentajeRecaudo, 
                         SUM(dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT.UnidadesVendidas * dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT.ValorUnitario - dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT.UnidadesVendidas * dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT.ValorUnitario * dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT.PorcentajeDescuento
                          / 100) AS ValorBaseTaller, 1 AS TipoTaller
FROM            dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT LEFT OUTER JOIN
                         dbo.Empleados ON dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT.CedulaVendedorRepuestos = dbo.Empleados.CodigoEmpleado LEFT OUTER JOIN
                         dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100 ON dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT.CodigoEmpresa = dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.CodigoEmpresa AND 
                         dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT.CodigoCentro = dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.CodigoCentro AND 
                         dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT.NumeroFacturaTaller = dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.NumeroFacturaTaller
WHERE        

-- APLICA RECAUDO TALLER
-- EMPLEADOS QUE SE LES DEBE LIMITAR EL PAGO CON LA FECHA DE LA FACTURA (TODOS MENOS LOS RELACIONADOS)
(
(dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT.TipoOperacion = 'MAT') 
AND (dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT.FechaFactura > '20170930')
AND (dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT.FechaFactura <= '20191031') 
AND (dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT.CedulaVendedorRepuestos NOT IN (79497419, 93380721, 79686998, 406824, 11313710))
)

OR

-- APLICA RECAUDO TALLER
-- EMPLEADOS QUE SE LES DEBE SEGUIR PAGANDO SIN FECHA LIMITE DE LA FACTURA
(
(dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT.TipoOperacion = 'MAT') 
AND (dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT.FechaFactura > '20170930')
AND (dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT.CedulaVendedorRepuestos IN (79497419, 93380721, 79686998, 406824, 11313710))
)

GROUP BY dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT.Ano_Periodo, dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT.Mes_Periodo, dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT.CodigoEmpresa, dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT.CedulaVendedorRepuestos, 
                         dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT.NumeroFacturaTaller, dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.ValorTotalFactura, dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.ImporteEfecto, 
                         dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.PorcentajeRecaudo, dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT.Centro, dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT.FechaFactura, dbo.Empleados.CodigoEmpresa
HAVING        (dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT.CodigoEmpresa <> 6) AND (dbo.vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT.CedulaVendedorRepuestos IS NOT NULL)




```
