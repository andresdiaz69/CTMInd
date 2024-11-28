# View: vw_TallerSupervisoresColisionMM_2

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]
- [[vw_PorcentajeRecaudoTallerPorFactura]]
- [[vw_VariablesVersiones]]

```sql
CREATE VIEW [dbo].[vw_TallerSupervisoresColisionMM_2]
AS
SELECT        dbo.vw_PorcentajeRecaudoTallerPorFactura.Ano_Periodo, dbo.vw_PorcentajeRecaudoTallerPorFactura.Mes_Periodo, dbo.vw_PorcentajeRecaudoTallerPorFactura.CodigoEmpresa, 
                         dbo.vw_PorcentajeRecaudoTallerPorFactura.CodigoCentro, dbo.ComisionesSpigaTallerPorOT.Centro, dbo.vw_PorcentajeRecaudoTallerPorFactura.NumeroFacturaTaller, dbo.ComisionesSpigaTallerPorOT.NumOT, 
                         dbo.vw_PorcentajeRecaudoTallerPorFactura.FechaFactura, dbo.vw_PorcentajeRecaudoTallerPorFactura.ValorTotalFactura, dbo.vw_PorcentajeRecaudoTallerPorFactura.ImporteEfecto, 
                         dbo.vw_PorcentajeRecaudoTallerPorFactura.PorcentajeRecaudo, [VAR].ValorVariable, 
                         SUM(dbo.ComisionesSpigaTallerPorOT.ValorUnitario * dbo.ComisionesSpigaTallerPorOT.UnidadesVendidas - dbo.ComisionesSpigaTallerPorOT.ValorUnitario * dbo.ComisionesSpigaTallerPorOT.UnidadesVendidas * dbo.ComisionesSpigaTallerPorOT.PorcentajeDescuento
                          / 100) AS ValorNeto_MO, 
                         SUM((dbo.ComisionesSpigaTallerPorOT.ValorUnitario * dbo.ComisionesSpigaTallerPorOT.UnidadesVendidas - dbo.ComisionesSpigaTallerPorOT.ValorUnitario * dbo.ComisionesSpigaTallerPorOT.UnidadesVendidas * dbo.ComisionesSpigaTallerPorOT.PorcentajeDescuento
                          / 100) / [VAR].ValorVariable) AS ValorBase_MO
FROM            dbo.vw_PorcentajeRecaudoTallerPorFactura LEFT OUTER JOIN
                         dbo.ComisionesSpigaTallerPorOT ON dbo.vw_PorcentajeRecaudoTallerPorFactura.NumeroFacturaTaller = dbo.ComisionesSpigaTallerPorOT.NumeroFacturaTaller CROSS JOIN
                             (SELECT        ValorVariable
                               FROM            dbo.vw_VariablesVersiones
                               WHERE        (IdVariable = 18)) AS [VAR]
WHERE        (dbo.ComisionesSpigaTallerPorOT.TipoOperacion <> 'MAT') AND (dbo.ComisionesSpigaTallerPorOT.TipoIntCargo <> 'G') AND (dbo.ComisionesSpigaTallerPorOT.TipoIntCargo <> 'I') AND 
                         (dbo.ComisionesSpigaTallerPorOT.TipoIntCargo = 'S' OR
                         dbo.ComisionesSpigaTallerPorOT.TipoIntCargo = 'C') AND (dbo.ComisionesSpigaTallerPorOT.CodigoCentro = 79)
GROUP BY dbo.vw_PorcentajeRecaudoTallerPorFactura.Ano_Periodo, dbo.vw_PorcentajeRecaudoTallerPorFactura.Mes_Periodo, dbo.vw_PorcentajeRecaudoTallerPorFactura.CodigoEmpresa, 
                         dbo.vw_PorcentajeRecaudoTallerPorFactura.NumeroFacturaTaller, dbo.vw_PorcentajeRecaudoTallerPorFactura.ValorTotalFactura, dbo.vw_PorcentajeRecaudoTallerPorFactura.ImporteEfecto, 
                         dbo.vw_PorcentajeRecaudoTallerPorFactura.PorcentajeRecaudo, dbo.vw_PorcentajeRecaudoTallerPorFactura.FechaFactura, [VAR].ValorVariable, dbo.vw_PorcentajeRecaudoTallerPorFactura.CodigoCentro, 
                         dbo.ComisionesSpigaTallerPorOT.Centro, dbo.ComisionesSpigaTallerPorOT.NumOT
HAVING        (dbo.vw_PorcentajeRecaudoTallerPorFactura.CodigoEmpresa = 6)


```
