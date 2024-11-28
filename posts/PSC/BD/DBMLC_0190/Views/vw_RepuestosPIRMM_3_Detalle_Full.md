# View: vw_RepuestosPIRMM_3_Detalle_Full

## Usa los objetos:
- [[Centros]]
- [[ComisionesSpigaTallerPorOT]]
- [[Sedes]]
- [[vw_PorcentajeRecaudoTallerPorFacturaAl100]]

```sql



CREATE VIEW [dbo].[vw_RepuestosPIRMM_3_Detalle_Full]
AS
SELECT        dbo.ComisionesSpigaTallerPorOT.Ano_Periodo, dbo.ComisionesSpigaTallerPorOT.Mes_Periodo, dbo.ComisionesSpigaTallerPorOT.CodigoEmpresa, dbo.ComisionesSpigaTallerPorOT.Empresa, dbo.Sedes.CodigoSede, 
                         dbo.Sedes.NombreSede, dbo.Centros.CodigoCentro, dbo.Centros.NombreCentro, dbo.ComisionesSpigaTallerPorOT.Centro, dbo.ComisionesSpigaTallerPorOT.NumeroFacturaTaller, 
                         dbo.ComisionesSpigaTallerPorOT.FechaFactura, dbo.Sedes.PIRPorcentaje, dbo.Sedes.PIRPuntos, 
                         SUM(dbo.ComisionesSpigaTallerPorOT.UnidadesVendidas * dbo.ComisionesSpigaTallerPorOT.ValorUnitario - dbo.ComisionesSpigaTallerPorOT.UnidadesVendidas * dbo.ComisionesSpigaTallerPorOT.ValorUnitario * dbo.ComisionesSpigaTallerPorOT.PorcentajeDescuento
                          / 100) AS ValorNetoTaller, 1 AS TipoTaller
FROM            dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100 RIGHT OUTER JOIN
                         dbo.ComisionesSpigaTallerPorOT ON dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.NumeroFacturaTaller = dbo.ComisionesSpigaTallerPorOT.NumeroFacturaTaller AND 
                         dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.CodigoCentro = dbo.ComisionesSpigaTallerPorOT.CodigoCentro AND 
                         dbo.vw_PorcentajeRecaudoTallerPorFacturaAl100.CodigoEmpresa = dbo.ComisionesSpigaTallerPorOT.CodigoEmpresa LEFT OUTER JOIN
                         dbo.Sedes INNER JOIN
                         dbo.Centros ON dbo.Sedes.CodigoSede = dbo.Centros.CodigoSede ON dbo.ComisionesSpigaTallerPorOT.CodigoCentro = dbo.Centros.CodigoCentro
WHERE        
(dbo.ComisionesSpigaTallerPorOT.TipoIntCargo <> 'G') 
AND (dbo.ComisionesSpigaTallerPorOT.TipoOperacion = 'MAT')
--AND (dbo.ComisionesSpigaTallerPorOT.FechaFactura <= '20191031' OR dbo.ComisionesSpigaTallerPorOT.CedulaVendedorRepuestos IN (20794402, 52072959, 1110486801, 1121846131))

GROUP BY dbo.ComisionesSpigaTallerPorOT.Ano_Periodo, dbo.ComisionesSpigaTallerPorOT.Mes_Periodo, dbo.ComisionesSpigaTallerPorOT.NumeroFacturaTaller, dbo.ComisionesSpigaTallerPorOT.CodigoEmpresa, 
                         dbo.ComisionesSpigaTallerPorOT.Empresa, dbo.Sedes.CodigoSede, dbo.Sedes.NombreSede, dbo.Sedes.PIRPorcentaje, dbo.Sedes.PIRPuntos, dbo.ComisionesSpigaTallerPorOT.FechaFactura, 
                         dbo.ComisionesSpigaTallerPorOT.Centro, dbo.Centros.CodigoCentro, dbo.Centros.NombreCentro
HAVING        (dbo.ComisionesSpigaTallerPorOT.CodigoEmpresa = 6)


```
