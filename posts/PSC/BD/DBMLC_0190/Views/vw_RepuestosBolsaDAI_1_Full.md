# View: vw_RepuestosBolsaDAI_1_Full

## Usa los objetos:
- [[Centros]]
- [[ComisionesSpigaAlmacenAlbaran]]
- [[Secciones]]
- [[Sedes]]
- [[vw_PorcentajeRecaudoAlmacenFactura]]

```sql




CREATE VIEW [dbo].[vw_RepuestosBolsaDAI_1_Full]
AS
SELECT        dbo.vw_PorcentajeRecaudoAlmacenFactura.Ano_Periodo, dbo.vw_PorcentajeRecaudoAlmacenFactura.Mes_Periodo, dbo.vw_PorcentajeRecaudoAlmacenFactura.CodigoEmpresa, dbo.Sedes.CodigoSede, 
                         dbo.Sedes.NombreSede, dbo.Centros.CodigoCentro, dbo.Centros.NombreCentro, dbo.Secciones.CodigoSeccion, dbo.Secciones.Seccion, dbo.Sedes.BolsaPorcentaje, dbo.vw_PorcentajeRecaudoAlmacenFactura.NumeroFactura, 
                         dbo.vw_PorcentajeRecaudoAlmacenFactura.TotalFactura, dbo.vw_PorcentajeRecaudoAlmacenFactura.ImporteEfecto, dbo.vw_PorcentajeRecaudoAlmacenFactura.PorcentajeRecaudo, 
                         SUM(dbo.ComisionesSpigaAlmacenAlbaran.UnidadesVendidas * dbo.ComisionesSpigaAlmacenAlbaran.ValorUnitarioReferencia - dbo.ComisionesSpigaAlmacenAlbaran.UnidadesVendidas * dbo.ComisionesSpigaAlmacenAlbaran.ValorUnitarioReferencia
                          * dbo.ComisionesSpigaAlmacenAlbaran.PorcDescuento / 100) AS ValorBaseMostrador, 
                         SUM((dbo.ComisionesSpigaAlmacenAlbaran.UnidadesVendidas * dbo.ComisionesSpigaAlmacenAlbaran.ValorUnitarioReferencia - dbo.ComisionesSpigaAlmacenAlbaran.UnidadesVendidas * dbo.ComisionesSpigaAlmacenAlbaran.ValorUnitarioReferencia
                          * dbo.ComisionesSpigaAlmacenAlbaran.PorcDescuento / 100) * (dbo.vw_PorcentajeRecaudoAlmacenFactura.PorcentajeRecaudo / 100)) AS ValorNetoMostrador
FROM            dbo.Secciones RIGHT OUTER JOIN
                         dbo.vw_PorcentajeRecaudoAlmacenFactura ON dbo.Secciones.CodigoSeccion = dbo.vw_PorcentajeRecaudoAlmacenFactura.FkSecciones LEFT OUTER JOIN
                         dbo.ComisionesSpigaAlmacenAlbaran ON dbo.vw_PorcentajeRecaudoAlmacenFactura.NumeroFactura = dbo.ComisionesSpigaAlmacenAlbaran.NumeroFactura LEFT OUTER JOIN
                         dbo.Sedes INNER JOIN
                         dbo.Centros ON dbo.Sedes.CodigoSede = dbo.Centros.CodigoSede ON dbo.vw_PorcentajeRecaudoAlmacenFactura.CodigoCentro = dbo.Centros.CodigoCentro
WHERE        
(NOT (dbo.ComisionesSpigaAlmacenAlbaran.Seccion LIKE N'%insumos%'))
--AND (dbo.ComisionesSpigaAlmacenAlbaran.FechaFactura <= '20191031' OR dbo.ComisionesSpigaAlmacenAlbaran.CedulaVendedorRepuestos IN (79694312))

GROUP BY dbo.vw_PorcentajeRecaudoAlmacenFactura.Ano_Periodo, dbo.vw_PorcentajeRecaudoAlmacenFactura.Mes_Periodo, dbo.vw_PorcentajeRecaudoAlmacenFactura.CodigoEmpresa, 
                         dbo.vw_PorcentajeRecaudoAlmacenFactura.NumeroFactura, dbo.vw_PorcentajeRecaudoAlmacenFactura.TotalFactura, dbo.vw_PorcentajeRecaudoAlmacenFactura.ImporteEfecto, 
                         dbo.vw_PorcentajeRecaudoAlmacenFactura.PorcentajeRecaudo, dbo.Sedes.CodigoSede, dbo.Sedes.NombreSede, dbo.Sedes.BolsaPorcentaje, dbo.Centros.CodigoCentro, dbo.Centros.NombreCentro, 
                         dbo.Secciones.CodigoSeccion, dbo.Secciones.Seccion
HAVING        (dbo.vw_PorcentajeRecaudoAlmacenFactura.CodigoEmpresa = 6)


```
