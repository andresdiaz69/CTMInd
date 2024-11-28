# View: vw_AccesoriosVendedoresBonCT_2_Detalle

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]
- [[Empleados]]

```sql



CREATE VIEW [dbo].[vw_AccesoriosVendedoresBonCT_2_Detalle]
AS
SELECT        dbo.ComisionesSpigaTallerPorOT.Ano_Periodo, dbo.ComisionesSpigaTallerPorOT.Mes_Periodo, 
                         CASE WHEN ComisionesSpigaTallerPorOT.CodigoEmpresa <> Empleados.CodigoEmpresa THEN empleados.codigoempresa ELSE ComisionesSpigaTallerPorOT.CodigoEmpresa END AS CodigoEmpresa, 
                         dbo.ComisionesSpigaTallerPorOT.CodigoEmpresa AS CodigoEmpresaOT, dbo.Empleados.CodigoEmpresa AS CodigoEmpresaEmpleado, dbo.ComisionesSpigaTallerPorOT.Empresa, dbo.ComisionesSpigaTallerPorOT.Centro, 
                         dbo.ComisionesSpigaTallerPorOT.CedulaBodeguero AS CedulaVendedorRepuestos, dbo.ComisionesSpigaTallerPorOT.NumeroFacturaTaller, dbo.ComisionesSpigaTallerPorOT.FechaFactura, 
                         SUM(dbo.ComisionesSpigaTallerPorOT.UnidadesVendidas * dbo.ComisionesSpigaTallerPorOT.ValorUnitario - dbo.ComisionesSpigaTallerPorOT.UnidadesVendidas * dbo.ComisionesSpigaTallerPorOT.ValorUnitario * dbo.ComisionesSpigaTallerPorOT.PorcentajeDescuento
                          / 100) AS TotalTallerPorOT, 1 AS TipoTaller
FROM            dbo.ComisionesSpigaTallerPorOT LEFT OUTER JOIN
                         dbo.Empleados ON dbo.ComisionesSpigaTallerPorOT.CedulaBodeguero = dbo.Empleados.CodigoEmpleado
WHERE        
(dbo.ComisionesSpigaTallerPorOT.CodClas1 IN ('1', '21', '34', 'ACC') 
OR dbo.ComisionesSpigaTallerPorOT.CodClas1 = 'ROPA') 
AND (dbo.ComisionesSpigaTallerPorOT.TipoIntCargo <> 'I') 
AND (dbo.ComisionesSpigaTallerPorOT.TipoIntCargo <> 'G')
AND (dbo.ComisionesSpigaTallerPorOT.FechaFactura <= '20191031')

GROUP BY dbo.ComisionesSpigaTallerPorOT.Ano_Periodo, dbo.ComisionesSpigaTallerPorOT.Mes_Periodo, dbo.ComisionesSpigaTallerPorOT.CodigoEmpresa, dbo.ComisionesSpigaTallerPorOT.Empresa, 
                         dbo.ComisionesSpigaTallerPorOT.CedulaBodeguero, dbo.ComisionesSpigaTallerPorOT.NumeroFacturaTaller, dbo.ComisionesSpigaTallerPorOT.FechaFactura, dbo.ComisionesSpigaTallerPorOT.Centro, 
                         dbo.Empleados.CodigoEmpresa
HAVING        (dbo.ComisionesSpigaTallerPorOT.CodigoEmpresa <> 6) AND (dbo.ComisionesSpigaTallerPorOT.CedulaBodeguero IS NOT NULL)


```
