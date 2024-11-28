# View: vw_RepuestosVendedoresComisionesRenault_1

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]
- [[Empleados]]
- [[vw_PorcentajeRecaudoAlmacenFactura]]

```sql


CREATE VIEW [dbo].[vw_RepuestosVendedoresComisionesRenault_1]
AS
SELECT        dbo.vw_PorcentajeRecaudoAlmacenFactura.Ano_Periodo, dbo.vw_PorcentajeRecaudoAlmacenFactura.Mes_Periodo, 
                         CASE WHEN vw_PorcentajeRecaudoAlmacenFactura.CodigoEmpresa <> Empleados.CodigoEmpresa THEN empleados.CodigoEmpresa ELSE vw_PorcentajeRecaudoAlmacenFactura.CodigoEmpresa END AS CodigoEmpresa, 
                         dbo.vw_PorcentajeRecaudoAlmacenFactura.CodigoEmpresa AS CodigoEmpresaAL, dbo.Empleados.CodigoEmpresa AS CodigoEmpresaEmpleado, dbo.ComisionesSpigaAlmacenAlbaran.Centro, 
                         dbo.vw_PorcentajeRecaudoAlmacenFactura.NumeroFactura, dbo.vw_PorcentajeRecaudoAlmacenFactura.FechaFactura, dbo.vw_PorcentajeRecaudoAlmacenFactura.TotalFactura, 
                         dbo.vw_PorcentajeRecaudoAlmacenFactura.ImporteEfecto, dbo.vw_PorcentajeRecaudoAlmacenFactura.PorcentajeRecaudo, dbo.ComisionesSpigaAlmacenAlbaran.CedulaVendedorRepuestos, 
                         SUM(dbo.ComisionesSpigaAlmacenAlbaran.UnidadesVendidas * dbo.ComisionesSpigaAlmacenAlbaran.ValorUnitarioReferencia - dbo.ComisionesSpigaAlmacenAlbaran.UnidadesVendidas * dbo.ComisionesSpigaAlmacenAlbaran.ValorUnitarioReferencia
                          * dbo.ComisionesSpigaAlmacenAlbaran.PorcDescuento / 100) AS ValorNetoMostrador, 
                         SUM((dbo.ComisionesSpigaAlmacenAlbaran.UnidadesVendidas * dbo.ComisionesSpigaAlmacenAlbaran.ValorUnitarioReferencia - dbo.ComisionesSpigaAlmacenAlbaran.UnidadesVendidas * dbo.ComisionesSpigaAlmacenAlbaran.ValorUnitarioReferencia
                          * dbo.ComisionesSpigaAlmacenAlbaran.PorcDescuento / 100) * (dbo.vw_PorcentajeRecaudoAlmacenFactura.PorcentajeRecaudo / 100)) AS ValorBaseMostrador, 1 AS TipoAlmacen
FROM            dbo.Empleados RIGHT OUTER JOIN
                         dbo.ComisionesSpigaAlmacenAlbaran ON dbo.Empleados.CodigoEmpleado = dbo.ComisionesSpigaAlmacenAlbaran.CedulaVendedorRepuestos RIGHT OUTER JOIN
                         dbo.vw_PorcentajeRecaudoAlmacenFactura ON dbo.ComisionesSpigaAlmacenAlbaran.NumeroFactura = dbo.vw_PorcentajeRecaudoAlmacenFactura.NumeroFactura

WHERE        
--(dbo.ComisionesSpigaAlmacenAlbaran.FechaFactura <= '20191031')
(dbo.vw_PorcentajeRecaudoAlmacenFactura.FechaFactura <= '20191031')

GROUP BY dbo.vw_PorcentajeRecaudoAlmacenFactura.Ano_Periodo, dbo.vw_PorcentajeRecaudoAlmacenFactura.Mes_Periodo, dbo.vw_PorcentajeRecaudoAlmacenFactura.CodigoEmpresa, 
                         dbo.vw_PorcentajeRecaudoAlmacenFactura.NumeroFactura, dbo.vw_PorcentajeRecaudoAlmacenFactura.TotalFactura, dbo.vw_PorcentajeRecaudoAlmacenFactura.ImporteEfecto, 
                         dbo.vw_PorcentajeRecaudoAlmacenFactura.PorcentajeRecaudo, dbo.ComisionesSpigaAlmacenAlbaran.CedulaVendedorRepuestos, dbo.vw_PorcentajeRecaudoAlmacenFactura.FechaFactura, 
                         dbo.ComisionesSpigaAlmacenAlbaran.Centro, dbo.Empleados.CodigoEmpresa
HAVING        (dbo.vw_PorcentajeRecaudoAlmacenFactura.CodigoEmpresa <> 6) AND (dbo.ComisionesSpigaAlmacenAlbaran.CedulaVendedorRepuestos IS NOT NULL)


```
