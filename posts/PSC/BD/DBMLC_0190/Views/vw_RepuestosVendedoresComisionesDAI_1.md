# View: vw_RepuestosVendedoresComisionesDAI_1

## Usa los objetos:
- [[vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor]]
- [[vw_PorcentajeRecaudoAlmacenFactura]]
- [[vw_VariablesVersiones]]

```sql


CREATE VIEW [dbo].[vw_RepuestosVendedoresComisionesDAI_1]
AS
SELECT        dbo.vw_PorcentajeRecaudoAlmacenFactura.Ano_Periodo, dbo.vw_PorcentajeRecaudoAlmacenFactura.Mes_Periodo, dbo.vw_PorcentajeRecaudoAlmacenFactura.CodigoEmpresa, dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.Centro, 
                         dbo.vw_PorcentajeRecaudoAlmacenFactura.NumeroFactura, dbo.vw_PorcentajeRecaudoAlmacenFactura.FechaFactura, dbo.vw_PorcentajeRecaudoAlmacenFactura.TotalFactura, 
                         dbo.vw_PorcentajeRecaudoAlmacenFactura.ImporteEfecto, dbo.vw_PorcentajeRecaudoAlmacenFactura.PorcentajeRecaudo, dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.CedulaVendedorRepuestos, 
                         SUM(dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.UnidadesVendidas * dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.ValorUnitarioReferencia - dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.UnidadesVendidas * dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.ValorUnitarioReferencia
                          * dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.PorcDescuento / 100) AS ValorNetoMostrador, 
                         SUM((dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.UnidadesVendidas * dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.ValorUnitarioReferencia - dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.UnidadesVendidas * dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.ValorUnitarioReferencia
                          * dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.PorcDescuento / 100) * (dbo.vw_PorcentajeRecaudoAlmacenFactura.PorcentajeRecaudo / 100)) AS ValorBaseMostrador, 
                         SUM((dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.UnidadesVendidas * dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.ValorUnitarioReferencia - dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.UnidadesVendidas * dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.ValorUnitarioReferencia
                          * dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.PorcDescuento / 100) * (dbo.vw_PorcentajeRecaudoAlmacenFactura.PorcentajeRecaudo / 100 * [VAR].ValorVariable)) AS ComisionMostrador, MAX([VAR].ValorVariable) AS ValorVariable, 
                         1 AS TipoAlmacen
FROM            dbo.vw_PorcentajeRecaudoAlmacenFactura LEFT OUTER JOIN
                         dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor ON dbo.vw_PorcentajeRecaudoAlmacenFactura.NumeroFactura = dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.NumeroFactura CROSS JOIN
                             (SELECT        ValorVariable
                               FROM            dbo.vw_VariablesVersiones
                               WHERE        (IdVariable = 14)) AS [VAR]
WHERE        
(dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.TipoMov <> 'VIN') 
AND (dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.TipoMov <> 'VINA')
AND (dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.FechaFactura <= '20191031')

GROUP BY dbo.vw_PorcentajeRecaudoAlmacenFactura.Ano_Periodo, dbo.vw_PorcentajeRecaudoAlmacenFactura.Mes_Periodo, dbo.vw_PorcentajeRecaudoAlmacenFactura.CodigoEmpresa, 
                         dbo.vw_PorcentajeRecaudoAlmacenFactura.NumeroFactura, dbo.vw_PorcentajeRecaudoAlmacenFactura.TotalFactura, dbo.vw_PorcentajeRecaudoAlmacenFactura.ImporteEfecto, 
                         dbo.vw_PorcentajeRecaudoAlmacenFactura.PorcentajeRecaudo, dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.CedulaVendedorRepuestos, dbo.vw_PorcentajeRecaudoAlmacenFactura.FechaFactura, 
                         dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.Centro
HAVING        (dbo.vw_PorcentajeRecaudoAlmacenFactura.CodigoEmpresa = 6) AND (dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedor.CedulaVendedorRepuestos IS NOT NULL)




```
