# View: vw_RepuestosVendedoresComisionesCT_1

## Usa los objetos:
- [[Empleados]]
- [[vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCT]]
- [[vw_PorcentajeRecaudoAlmacenFactura]]

```sql











CREATE VIEW [dbo].[vw_RepuestosVendedoresComisionesCT_1]
AS
SELECT        dbo.vw_PorcentajeRecaudoAlmacenFactura.Ano_Periodo, dbo.vw_PorcentajeRecaudoAlmacenFactura.Mes_Periodo, 
                         CASE WHEN vw_PorcentajeRecaudoAlmacenFactura.CodigoEmpresa <> Empleados.CodigoEmpresa THEN empleados.CodigoEmpresa ELSE vw_PorcentajeRecaudoAlmacenFactura.CodigoEmpresa END AS CodigoEmpresa, 
                         dbo.vw_PorcentajeRecaudoAlmacenFactura.CodigoEmpresa AS CodigoEmpresaAL, dbo.Empleados.CodigoEmpresa AS CodigoEmpresaEmpleado, dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCT.Centro, 
                         dbo.vw_PorcentajeRecaudoAlmacenFactura.NumeroFactura, dbo.vw_PorcentajeRecaudoAlmacenFactura.FechaFactura, dbo.vw_PorcentajeRecaudoAlmacenFactura.TotalFactura, 
                         dbo.vw_PorcentajeRecaudoAlmacenFactura.ImporteEfecto, dbo.vw_PorcentajeRecaudoAlmacenFactura.PorcentajeRecaudo, dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCT.CedulaVendedorRepuestos, 
                         SUM(dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCT.UnidadesVendidas * dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCT.ValorUnitarioReferencia - dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCT.UnidadesVendidas * dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCT.ValorUnitarioReferencia
                          * dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCT.PorcDescuento / 100) AS ValorNetoMostrador, 
                         SUM((dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCT.UnidadesVendidas * dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCT.ValorUnitarioReferencia - dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCT.UnidadesVendidas * dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCT.ValorUnitarioReferencia
                          * dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCT.PorcDescuento / 100) * (dbo.vw_PorcentajeRecaudoAlmacenFactura.PorcentajeRecaudo / 100)) AS ValorBaseMostrador, 1 AS TipoAlmacen
FROM            dbo.Empleados RIGHT OUTER JOIN
                         dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCT ON dbo.Empleados.CodigoEmpleado = dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCT.CedulaVendedorRepuestos RIGHT OUTER JOIN
                         dbo.vw_PorcentajeRecaudoAlmacenFactura ON dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCT.NumeroFactura = dbo.vw_PorcentajeRecaudoAlmacenFactura.NumeroFactura
WHERE  

-- APLICA RECAUDO ALMACEN
-- EMPLEADOS QUE SE LES DEBE LIMITAR EL PAGO CON LA FECHA DE LA FACTURA (TODOS MENOS LOS RELACIONADOS)
(
(dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCT.TipoMov <> 'VIN') 
AND (dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCT.TipoMov <> 'VINA') 
AND (dbo.vw_PorcentajeRecaudoAlmacenFactura.FechaFactura > '20170930')
AND (dbo.vw_PorcentajeRecaudoAlmacenFactura.FechaFactura <= '20191031') 
AND (dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCT.CedulaVendedorRepuestos NOT IN (79497419, 93380721, 79686998, 406824, 11313710))
)

OR

-- APLICA RECAUDO ALMACEN
-- EMPLEADOS QUE SE LES DEBE SEGUIR PAGANDO SIN FECHA LIMITE DE LA FACTURA
(
(dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCT.TipoMov <> 'VIN') 
AND (dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCT.TipoMov <> 'VINA') 
AND (dbo.vw_PorcentajeRecaudoAlmacenFactura.FechaFactura > '20170930')
AND (dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCT.CedulaVendedorRepuestos IN (79497419, 93380721, 79686998, 406824, 11313710))
)

GROUP BY dbo.vw_PorcentajeRecaudoAlmacenFactura.Ano_Periodo, dbo.vw_PorcentajeRecaudoAlmacenFactura.Mes_Periodo, dbo.vw_PorcentajeRecaudoAlmacenFactura.CodigoEmpresa, 
                         dbo.vw_PorcentajeRecaudoAlmacenFactura.NumeroFactura, dbo.vw_PorcentajeRecaudoAlmacenFactura.TotalFactura, dbo.vw_PorcentajeRecaudoAlmacenFactura.ImporteEfecto, 
                         dbo.vw_PorcentajeRecaudoAlmacenFactura.PorcentajeRecaudo, dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCT.CedulaVendedorRepuestos, dbo.vw_PorcentajeRecaudoAlmacenFactura.FechaFactura, 
                         dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCT.Centro, dbo.Empleados.CodigoEmpresa
HAVING        (dbo.vw_PorcentajeRecaudoAlmacenFactura.CodigoEmpresa <> 6) AND (dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCT.CedulaVendedorRepuestos IS NOT NULL)




```
