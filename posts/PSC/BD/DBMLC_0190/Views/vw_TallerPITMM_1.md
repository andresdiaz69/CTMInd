# View: vw_TallerPITMM_1

## Usa los objetos:
- [[Centros]]
- [[ComisionesSpigaTallerPorOT]]
- [[Sedes]]
- [[vw_PorcentajeRecaudoTallerPorFactura]]

```sql
CREATE VIEW [dbo].[vw_TallerPITMM_1]
AS
SELECT        dbo.vw_PorcentajeRecaudoTallerPorFactura.Ano_Periodo, dbo.vw_PorcentajeRecaudoTallerPorFactura.Mes_Periodo, dbo.vw_PorcentajeRecaudoTallerPorFactura.CodigoEmpresa, dbo.Sedes.CodigoSede, 
                         dbo.Sedes.NombreSede, dbo.Centros.CodigoCentro, dbo.Centros.NombreCentro, dbo.Sedes.PITPorcentaje, dbo.Sedes.PITPuntos, dbo.vw_PorcentajeRecaudoTallerPorFactura.NumeroFacturaTaller, 
                         dbo.vw_PorcentajeRecaudoTallerPorFactura.ValorTotalFactura, dbo.vw_PorcentajeRecaudoTallerPorFactura.ImporteEfecto, dbo.vw_PorcentajeRecaudoTallerPorFactura.PorcentajeRecaudo, 
                         SUM(dbo.ComisionesSpigaTallerPorOT.UnidadesVendidas * dbo.ComisionesSpigaTallerPorOT.ValorUnitario - dbo.ComisionesSpigaTallerPorOT.UnidadesVendidas * dbo.ComisionesSpigaTallerPorOT.ValorUnitario * dbo.ComisionesSpigaTallerPorOT.PorcentajeDescuento
                          / 100) AS ValorBaseTaller, 
                         SUM((dbo.ComisionesSpigaTallerPorOT.UnidadesVendidas * dbo.ComisionesSpigaTallerPorOT.ValorUnitario - dbo.ComisionesSpigaTallerPorOT.UnidadesVendidas * dbo.ComisionesSpigaTallerPorOT.ValorUnitario * dbo.ComisionesSpigaTallerPorOT.PorcentajeDescuento
                          / 100) * (dbo.vw_PorcentajeRecaudoTallerPorFactura.PorcentajeRecaudo / 100)) AS ValorNetoTaller
FROM            dbo.ComisionesSpigaTallerPorOT RIGHT OUTER JOIN
                         dbo.vw_PorcentajeRecaudoTallerPorFactura ON dbo.ComisionesSpigaTallerPorOT.NumeroFacturaTaller = dbo.vw_PorcentajeRecaudoTallerPorFactura.NumeroFacturaTaller LEFT OUTER JOIN
                         dbo.Sedes INNER JOIN
                         dbo.Centros ON dbo.Sedes.CodigoSede = dbo.Centros.CodigoSede ON dbo.vw_PorcentajeRecaudoTallerPorFactura.CodigoCentro = dbo.Centros.CodigoCentro
WHERE        (dbo.ComisionesSpigaTallerPorOT.TipoOperacion <> 'MAT') AND (dbo.ComisionesSpigaTallerPorOT.TipoIntCargo <> 'G')
GROUP BY dbo.vw_PorcentajeRecaudoTallerPorFactura.Ano_Periodo, dbo.vw_PorcentajeRecaudoTallerPorFactura.Mes_Periodo, dbo.vw_PorcentajeRecaudoTallerPorFactura.CodigoEmpresa, 
                         dbo.vw_PorcentajeRecaudoTallerPorFactura.NumeroFacturaTaller, dbo.vw_PorcentajeRecaudoTallerPorFactura.ValorTotalFactura, dbo.vw_PorcentajeRecaudoTallerPorFactura.ImporteEfecto, 
                         dbo.vw_PorcentajeRecaudoTallerPorFactura.PorcentajeRecaudo, dbo.Sedes.CodigoSede, dbo.Sedes.NombreSede, dbo.Sedes.PITPorcentaje, dbo.Sedes.PITPuntos, dbo.Centros.CodigoCentro, dbo.Centros.NombreCentro
HAVING        (dbo.vw_PorcentajeRecaudoTallerPorFactura.CodigoEmpresa = 6)


```
