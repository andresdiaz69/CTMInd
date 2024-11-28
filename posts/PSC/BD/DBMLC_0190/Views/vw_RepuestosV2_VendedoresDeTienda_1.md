# View: vw_RepuestosV2_VendedoresDeTienda_1

## Usa los objetos:
- [[Empleados]]
- [[vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCTMM]]
- [[vw_PorcentajeRecaudoAlmacenFactura]]

```sql






CREATE VIEW [dbo].[vw_RepuestosV2_VendedoresDeTienda_1]
AS
SELECT        
dbo.vw_PorcentajeRecaudoAlmacenFactura.Ano_Periodo, 
dbo.vw_PorcentajeRecaudoAlmacenFactura.Mes_Periodo, 
CASE WHEN vw_PorcentajeRecaudoAlmacenFactura.CodigoEmpresa <> Empleados.CodigoEmpresa THEN empleados.CodigoEmpresa ELSE vw_PorcentajeRecaudoAlmacenFactura.CodigoEmpresa END AS CodigoEmpresa, 
dbo.vw_PorcentajeRecaudoAlmacenFactura.CodigoEmpresa AS CodigoEmpresaAL, 
dbo.Empleados.CodigoEmpresa AS CodigoEmpresaEmpleado, 
dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCTMM.Centro, 
dbo.vw_PorcentajeRecaudoAlmacenFactura.NumeroFactura, 
dbo.vw_PorcentajeRecaudoAlmacenFactura.FechaFactura, 
dbo.vw_PorcentajeRecaudoAlmacenFactura.TotalFactura, 
dbo.vw_PorcentajeRecaudoAlmacenFactura.ImporteEfecto, 
dbo.vw_PorcentajeRecaudoAlmacenFactura.PorcentajeRecaudo, 
dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCTMM.CedulaVendedorRepuestos, 
SUM(dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCTMM.UnidadesVendidas * dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCTMM.ValorUnitarioReferencia - dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCTMM.UnidadesVendidas * dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCTMM.ValorUnitarioReferencia * dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCTMM.PorcDescuento / 100) AS ValorNetoMostrador, 
SUM((dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCTMM.UnidadesVendidas * dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCTMM.ValorUnitarioReferencia - dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCTMM.UnidadesVendidas * dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCTMM.ValorUnitarioReferencia * dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCTMM.PorcDescuento / 100) * (dbo.vw_PorcentajeRecaudoAlmacenFactura.PorcentajeRecaudo / 100)) AS ValorBaseMostrador, 
1 AS TipoAlmacen

FROM            dbo.Empleados RIGHT OUTER JOIN
                         dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCTMM ON dbo.Empleados.CodigoEmpleado = dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCTMM.CedulaVendedorRepuestos RIGHT OUTER JOIN
                         dbo.vw_PorcentajeRecaudoAlmacenFactura ON dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCTMM.NumeroFactura = dbo.vw_PorcentajeRecaudoAlmacenFactura.NumeroFactura

WHERE
dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCTMM.TipoMov NOT IN ('VIN', 'VINA')
AND
dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCTMM.FechaFactura >= '20191101'

GROUP BY 
dbo.vw_PorcentajeRecaudoAlmacenFactura.Ano_Periodo, 
dbo.vw_PorcentajeRecaudoAlmacenFactura.Mes_Periodo, 
dbo.vw_PorcentajeRecaudoAlmacenFactura.CodigoEmpresa, 
dbo.vw_PorcentajeRecaudoAlmacenFactura.NumeroFactura, 
dbo.vw_PorcentajeRecaudoAlmacenFactura.TotalFactura, 
dbo.vw_PorcentajeRecaudoAlmacenFactura.ImporteEfecto, 
dbo.vw_PorcentajeRecaudoAlmacenFactura.PorcentajeRecaudo, 
dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCTMM.CedulaVendedorRepuestos, 
dbo.vw_PorcentajeRecaudoAlmacenFactura.FechaFactura, 
dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCTMM.Centro, 
dbo.Empleados.CodigoEmpresa
HAVING        
(dbo.vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCTMM.CedulaVendedorRepuestos IS NOT NULL)


```
