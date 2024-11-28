# View: vw_AsesoresDeServicio_1

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]
- [[vw_PorcentajeRecaudoTallerPorFactura]]
- [[vw_VariablesVersiones]]

```sql

CREATE VIEW [dbo].[vw_AsesoresDeServicio_1] AS
SELECT        dbo.vw_PorcentajeRecaudoTallerPorFactura.Ano_Periodo, dbo.vw_PorcentajeRecaudoTallerPorFactura.Mes_Periodo, dbo.vw_PorcentajeRecaudoTallerPorFactura.CodigoEmpresa, 
                         dbo.ComisionesSpigaTallerPorOT.CedulaAsesorServicioResponsable, dbo.vw_PorcentajeRecaudoTallerPorFactura.NumeroFacturaTaller, dbo.ComisionesSpigaTallerPorOT.NumOT, 
                         dbo.vw_PorcentajeRecaudoTallerPorFactura.FechaFactura, dbo.vw_PorcentajeRecaudoTallerPorFactura.ValorTotalFactura, dbo.vw_PorcentajeRecaudoTallerPorFactura.ImporteEfecto, 
                         dbo.vw_PorcentajeRecaudoTallerPorFactura.PorcentajeRecaudo, [VAR].ValorVariable, 
                         SUM(dbo.ComisionesSpigaTallerPorOT.ValorUnitario * dbo.ComisionesSpigaTallerPorOT.UnidadesVendidas - dbo.ComisionesSpigaTallerPorOT.ValorUnitario * dbo.ComisionesSpigaTallerPorOT.UnidadesVendidas * dbo.ComisionesSpigaTallerPorOT.PorcentajeDescuento
                          / 100) AS ValorNeto_MAT, 
                         SUM((dbo.ComisionesSpigaTallerPorOT.ValorUnitario * dbo.ComisionesSpigaTallerPorOT.UnidadesVendidas - dbo.ComisionesSpigaTallerPorOT.ValorUnitario * dbo.ComisionesSpigaTallerPorOT.UnidadesVendidas * dbo.ComisionesSpigaTallerPorOT.PorcentajeDescuento
                          / 100) / [VAR].ValorVariable) AS ValorBase_MAT
FROM            dbo.vw_PorcentajeRecaudoTallerPorFactura LEFT OUTER JOIN
                         dbo.ComisionesSpigaTallerPorOT ON dbo.vw_PorcentajeRecaudoTallerPorFactura.CodigoEmpresa = dbo.ComisionesSpigaTallerPorOT.CodigoEmpresa AND 
                         dbo.vw_PorcentajeRecaudoTallerPorFactura.NumeroFacturaTaller = dbo.ComisionesSpigaTallerPorOT.NumeroFacturaTaller CROSS JOIN
                             (SELECT        ValorVariable
                               FROM            dbo.vw_VariablesVersiones
                               WHERE        (IdVariable = 35)) AS [VAR]
WHERE        --dbo.ComisionesSpigaTallerPorOT.TipoIntCargo = 'GA'

(dbo.ComisionesSpigaTallerPorOT.TipoOperacion = 'MAT') 
AND (dbo.ComisionesSpigaTallerPorOT.TipoIntCargo = 'C' OR
	dbo.ComisionesSpigaTallerPorOT.TipoIntCargo = 'S' OR
	dbo.ComisionesSpigaTallerPorOT.TipoIntCargo = 'G' OR
	dbo.ComisionesSpigaTallerPorOT.TipoIntCargo = 'GA') -- JCS: 2023/05/18 -- NUEVO CÓDIGO DE GARANTÍAS

GROUP BY dbo.vw_PorcentajeRecaudoTallerPorFactura.Ano_Periodo, dbo.vw_PorcentajeRecaudoTallerPorFactura.Mes_Periodo, dbo.vw_PorcentajeRecaudoTallerPorFactura.CodigoEmpresa, 
                         dbo.ComisionesSpigaTallerPorOT.CedulaAsesorServicioResponsable, dbo.vw_PorcentajeRecaudoTallerPorFactura.NumeroFacturaTaller, dbo.vw_PorcentajeRecaudoTallerPorFactura.ValorTotalFactura, 
                         dbo.vw_PorcentajeRecaudoTallerPorFactura.ImporteEfecto, dbo.vw_PorcentajeRecaudoTallerPorFactura.PorcentajeRecaudo, dbo.vw_PorcentajeRecaudoTallerPorFactura.FechaFactura, [VAR].ValorVariable, 
                         dbo.ComisionesSpigaTallerPorOT.NumOT
HAVING        (dbo.ComisionesSpigaTallerPorOT.CedulaAsesorServicioResponsable IS NOT NULL)

```
