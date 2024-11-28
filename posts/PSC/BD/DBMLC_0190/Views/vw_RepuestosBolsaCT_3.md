# View: vw_RepuestosBolsaCT_3

## Usa los objetos:
- [[Centros]]
- [[ComisionesSpigaTallerPorOT]]
- [[Sedes]]

```sql







CREATE VIEW [dbo].[vw_RepuestosBolsaCT_3]
AS
SELECT        dbo.ComisionesSpigaTallerPorOT.Ano_Periodo, dbo.ComisionesSpigaTallerPorOT.Mes_Periodo, dbo.ComisionesSpigaTallerPorOT.CodigoEmpresa, dbo.ComisionesSpigaTallerPorOT.Empresa, dbo.Sedes.CodigoSede, 
                         dbo.Sedes.NombreSede, dbo.Centros.CodigoCentro, dbo.Centros.NombreCentro, dbo.ComisionesSpigaTallerPorOT.CodigoSeccion, dbo.ComisionesSpigaTallerPorOT.Seccion, dbo.Sedes.BolsaPorcentaje, 
                         dbo.Sedes.BolsaPuntos, 
                         SUM(dbo.ComisionesSpigaTallerPorOT.UnidadesVendidas * dbo.ComisionesSpigaTallerPorOT.ValorUnitario - dbo.ComisionesSpigaTallerPorOT.UnidadesVendidas * dbo.ComisionesSpigaTallerPorOT.ValorUnitario * dbo.ComisionesSpigaTallerPorOT.PorcentajeDescuento
                          / 100) AS ValorNetoTaller
FROM            dbo.Sedes INNER JOIN
                         dbo.Centros ON dbo.Sedes.CodigoSede = dbo.Centros.CodigoSede RIGHT OUTER JOIN
                         dbo.ComisionesSpigaTallerPorOT ON dbo.Centros.CodigoCentro = dbo.ComisionesSpigaTallerPorOT.CodigoCentro
WHERE        
(dbo.ComisionesSpigaTallerPorOT.TipoIntCargo <> 'G')
--AND (dbo.ComisionesSpigaTallerPorOT.FechaFactura <= '20191031' OR dbo.ComisionesSpigaTallerPorOT.CedulaVendedorRepuestos IN (1043875927, 79497419, 93380721, 406824, 11275377, 11313710, 16362509, 16594756, 16745552, 17342981, 26460616, 72231687, 72291293, 80053904, 94373171, 94491437, 1014201465, 1022322789, 1036661930, 1052391504, 1064985454, 1065599422, 1065825536, 1067912772, 1110486367, 1110517646, 1110553214, 1110583916, 1121860719, 1130665273, 1152206210))
AND (dbo.ComisionesSpigaTallerPorOT.FechaFactura <= '20191031')

GROUP BY dbo.ComisionesSpigaTallerPorOT.Ano_Periodo, dbo.ComisionesSpigaTallerPorOT.Mes_Periodo, dbo.ComisionesSpigaTallerPorOT.CodigoEmpresa, dbo.ComisionesSpigaTallerPorOT.Empresa, dbo.Sedes.CodigoSede, 
                         dbo.Sedes.NombreSede, dbo.Sedes.BolsaPorcentaje, dbo.Sedes.BolsaPuntos, dbo.Centros.CodigoCentro, dbo.Centros.NombreCentro, dbo.ComisionesSpigaTallerPorOT.CodigoSeccion, 
                         dbo.ComisionesSpigaTallerPorOT.Seccion
HAVING        (dbo.ComisionesSpigaTallerPorOT.CodigoEmpresa <> 6)


```
