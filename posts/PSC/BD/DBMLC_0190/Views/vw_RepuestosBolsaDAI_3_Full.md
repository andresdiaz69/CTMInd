# View: vw_RepuestosBolsaDAI_3_Full

## Usa los objetos:
- [[Centros]]
- [[ComisionesSpigaTallerPorOT]]
- [[Sedes]]

```sql




CREATE VIEW [dbo].[vw_RepuestosBolsaDAI_3_Full]
AS
SELECT        dbo.ComisionesSpigaTallerPorOT.Ano_Periodo, dbo.ComisionesSpigaTallerPorOT.Mes_Periodo, dbo.ComisionesSpigaTallerPorOT.CodigoEmpresa, dbo.ComisionesSpigaTallerPorOT.Empresa, dbo.Sedes.CodigoSede, 
                         dbo.Sedes.NombreSede, dbo.Centros.CodigoCentro, dbo.Centros.NombreCentro, dbo.ComisionesSpigaTallerPorOT.CodigoSeccion, dbo.ComisionesSpigaTallerPorOT.Seccion, dbo.Sedes.BolsaPorcentaje, 
                         SUM(dbo.ComisionesSpigaTallerPorOT.UnidadesVendidas * dbo.ComisionesSpigaTallerPorOT.ValorUnitario - dbo.ComisionesSpigaTallerPorOT.UnidadesVendidas * dbo.ComisionesSpigaTallerPorOT.ValorUnitario * dbo.ComisionesSpigaTallerPorOT.PorcentajeDescuento
                          / 100) AS ValorNetoTaller
FROM            dbo.Sedes INNER JOIN
                         dbo.Centros ON dbo.Sedes.CodigoSede = dbo.Centros.CodigoSede RIGHT OUTER JOIN
                         dbo.ComisionesSpigaTallerPorOT ON dbo.Centros.CodigoCentro = dbo.ComisionesSpigaTallerPorOT.CodigoCentro
WHERE        
(dbo.ComisionesSpigaTallerPorOT.TipoIntCargo <> 'G')
--AND (dbo.ComisionesSpigaTallerPorOT.FechaFactura <= '20191031' OR dbo.ComisionesSpigaTallerPorOT.CedulaVendedorRepuestos IN (79694312))

GROUP BY dbo.ComisionesSpigaTallerPorOT.Ano_Periodo, dbo.ComisionesSpigaTallerPorOT.Mes_Periodo, dbo.ComisionesSpigaTallerPorOT.CodigoEmpresa, dbo.ComisionesSpigaTallerPorOT.Empresa, dbo.Sedes.CodigoSede, 
                         dbo.Sedes.NombreSede, dbo.Sedes.BolsaPorcentaje, dbo.Centros.CodigoCentro, dbo.Centros.NombreCentro, dbo.ComisionesSpigaTallerPorOT.CodigoSeccion, dbo.ComisionesSpigaTallerPorOT.Seccion
HAVING        (dbo.ComisionesSpigaTallerPorOT.CodigoEmpresa = 6)


```
