# View: vw_RepuestosPIRMM_1_Full

## Usa los objetos:
- [[Centros]]
- [[ComisionesSpigaAlmacenAlbaran]]
- [[Sedes]]
- [[vw_PorcentajeRecaudoAlmacenFactura]]

```sql



CREATE VIEW [dbo].[vw_RepuestosPIRMM_1_Full]
AS
SELECT        dbo.vw_PorcentajeRecaudoAlmacenFactura.Ano_Periodo, dbo.vw_PorcentajeRecaudoAlmacenFactura.Mes_Periodo, dbo.vw_PorcentajeRecaudoAlmacenFactura.CodigoEmpresa, dbo.Sedes.CodigoSede, 
                         dbo.Sedes.NombreSede, dbo.Centros.CodigoCentro, dbo.Centros.NombreCentro, dbo.ComisionesSpigaAlmacenAlbaran.Centro, dbo.Sedes.PIRPorcentaje, dbo.Sedes.PIRPuntos, 
                         dbo.vw_PorcentajeRecaudoAlmacenFactura.NumeroFactura, dbo.vw_PorcentajeRecaudoAlmacenFactura.FechaFactura, dbo.vw_PorcentajeRecaudoAlmacenFactura.TotalFactura, 
                         dbo.vw_PorcentajeRecaudoAlmacenFactura.ImporteEfecto, dbo.vw_PorcentajeRecaudoAlmacenFactura.PorcentajeRecaudo, 
                         SUM(dbo.ComisionesSpigaAlmacenAlbaran.UnidadesVendidas * dbo.ComisionesSpigaAlmacenAlbaran.ValorUnitarioReferencia - dbo.ComisionesSpigaAlmacenAlbaran.UnidadesVendidas * dbo.ComisionesSpigaAlmacenAlbaran.ValorUnitarioReferencia
                          * dbo.ComisionesSpigaAlmacenAlbaran.PorcDescuento / 100) AS ValorBaseMostrador, 
                         SUM((dbo.ComisionesSpigaAlmacenAlbaran.UnidadesVendidas * dbo.ComisionesSpigaAlmacenAlbaran.ValorUnitarioReferencia - dbo.ComisionesSpigaAlmacenAlbaran.UnidadesVendidas * dbo.ComisionesSpigaAlmacenAlbaran.ValorUnitarioReferencia
                          * dbo.ComisionesSpigaAlmacenAlbaran.PorcDescuento / 100) * (dbo.vw_PorcentajeRecaudoAlmacenFactura.PorcentajeRecaudo / 100)) AS ValorNetoMostrador, 1 AS TipoAlmacen
FROM            dbo.ComisionesSpigaAlmacenAlbaran RIGHT OUTER JOIN
                         dbo.vw_PorcentajeRecaudoAlmacenFactura ON dbo.ComisionesSpigaAlmacenAlbaran.NumeroFactura = dbo.vw_PorcentajeRecaudoAlmacenFactura.NumeroFactura LEFT OUTER JOIN
                         dbo.Sedes INNER JOIN
                         dbo.Centros ON dbo.Sedes.CodigoSede = dbo.Centros.CodigoSede ON dbo.vw_PorcentajeRecaudoAlmacenFactura.CodigoCentro = dbo.Centros.CodigoCentro
WHERE        
(NOT (dbo.ComisionesSpigaAlmacenAlbaran.Seccion LIKE N'%insumos%'))
--AND (dbo.ComisionesSpigaAlmacenAlbaran.FechaFactura <= '20191031' OR dbo.ComisionesSpigaAlmacenAlbaran.CedulaVendedorRepuestos IN (20794402, 52072959, 1110486801, 1121846131))

GROUP BY dbo.vw_PorcentajeRecaudoAlmacenFactura.Ano_Periodo, dbo.vw_PorcentajeRecaudoAlmacenFactura.Mes_Periodo, dbo.vw_PorcentajeRecaudoAlmacenFactura.CodigoEmpresa, 
                         dbo.vw_PorcentajeRecaudoAlmacenFactura.NumeroFactura, dbo.vw_PorcentajeRecaudoAlmacenFactura.TotalFactura, dbo.vw_PorcentajeRecaudoAlmacenFactura.ImporteEfecto, 
                         dbo.vw_PorcentajeRecaudoAlmacenFactura.PorcentajeRecaudo, dbo.Sedes.CodigoSede, dbo.Sedes.NombreSede, dbo.Sedes.PIRPorcentaje, dbo.Sedes.PIRPuntos, dbo.vw_PorcentajeRecaudoAlmacenFactura.FechaFactura, 
                         dbo.ComisionesSpigaAlmacenAlbaran.Centro, dbo.Centros.CodigoCentro, dbo.Centros.NombreCentro
HAVING        (dbo.vw_PorcentajeRecaudoAlmacenFactura.CodigoEmpresa = 6)


```
