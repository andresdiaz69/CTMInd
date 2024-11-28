# View: vw_TallerAsesoresColisionMM_1

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]
- [[vw_PorcentajeRecaudoTallerPorFactura]]
- [[vw_VariablesVersiones]]

```sql
CREATE VIEW [dbo].[vw_TallerAsesoresColisionMM_1]
AS
SELECT        dbo.vw_PorcentajeRecaudoTallerPorFactura.Ano_Periodo, dbo.vw_PorcentajeRecaudoTallerPorFactura.Mes_Periodo, dbo.vw_PorcentajeRecaudoTallerPorFactura.CodigoEmpresa, 
                         dbo.ComisionesSpigaTallerPorOT.CedulaAsesorServicioResponsable, dbo.vw_PorcentajeRecaudoTallerPorFactura.NumeroFacturaTaller, dbo.ComisionesSpigaTallerPorOT.NumOT, 
                         dbo.vw_PorcentajeRecaudoTallerPorFactura.FechaFactura, dbo.vw_PorcentajeRecaudoTallerPorFactura.ValorTotalFactura, dbo.vw_PorcentajeRecaudoTallerPorFactura.ImporteEfecto, 
                         dbo.vw_PorcentajeRecaudoTallerPorFactura.PorcentajeRecaudo, [VAR].ValorVariable, 
                         SUM(dbo.ComisionesSpigaTallerPorOT.ValorUnitario * dbo.ComisionesSpigaTallerPorOT.UnidadesVendidas - dbo.ComisionesSpigaTallerPorOT.ValorUnitario * dbo.ComisionesSpigaTallerPorOT.UnidadesVendidas * dbo.ComisionesSpigaTallerPorOT.PorcentajeDescuento
                          / 100) AS ValorNeto_MAT, 
                         SUM((dbo.ComisionesSpigaTallerPorOT.ValorUnitario * dbo.ComisionesSpigaTallerPorOT.UnidadesVendidas - dbo.ComisionesSpigaTallerPorOT.ValorUnitario * dbo.ComisionesSpigaTallerPorOT.UnidadesVendidas * dbo.ComisionesSpigaTallerPorOT.PorcentajeDescuento
                          / 100) / [VAR].ValorVariable) AS ValorBase_MAT
FROM            dbo.vw_PorcentajeRecaudoTallerPorFactura LEFT OUTER JOIN
                         dbo.ComisionesSpigaTallerPorOT ON dbo.vw_PorcentajeRecaudoTallerPorFactura.NumeroFacturaTaller = dbo.ComisionesSpigaTallerPorOT.NumeroFacturaTaller CROSS JOIN
                             (SELECT        ValorVariable
                               FROM            dbo.vw_VariablesVersiones
                               WHERE        (IdVariable = 17)) AS [VAR]
WHERE        (dbo.ComisionesSpigaTallerPorOT.TipoOperacion = 'MAT') AND (dbo.ComisionesSpigaTallerPorOT.TipoIntCargo = 'C' OR
                         dbo.ComisionesSpigaTallerPorOT.TipoIntCargo = 'S') AND (dbo.ComisionesSpigaTallerPorOT.CodigoCentro = 79)
GROUP BY dbo.vw_PorcentajeRecaudoTallerPorFactura.Ano_Periodo, dbo.vw_PorcentajeRecaudoTallerPorFactura.Mes_Periodo, dbo.vw_PorcentajeRecaudoTallerPorFactura.CodigoEmpresa, 
                         dbo.ComisionesSpigaTallerPorOT.CedulaAsesorServicioResponsable, dbo.vw_PorcentajeRecaudoTallerPorFactura.NumeroFacturaTaller, dbo.vw_PorcentajeRecaudoTallerPorFactura.ValorTotalFactura, 
                         dbo.vw_PorcentajeRecaudoTallerPorFactura.ImporteEfecto, dbo.vw_PorcentajeRecaudoTallerPorFactura.PorcentajeRecaudo, dbo.vw_PorcentajeRecaudoTallerPorFactura.FechaFactura, [VAR].ValorVariable, 
                         dbo.ComisionesSpigaTallerPorOT.NumOT
HAVING        (dbo.vw_PorcentajeRecaudoTallerPorFactura.CodigoEmpresa = 6) AND (dbo.ComisionesSpigaTallerPorOT.CedulaAsesorServicioResponsable IS NOT NULL)


```
