# View: vw_AccesoriosVendedoresBonCT_1_Detalle

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]
- [[Empleados]]

```sql



CREATE VIEW [dbo].[vw_AccesoriosVendedoresBonCT_1_Detalle]
AS
SELECT        dbo.ComisionesSpigaAlmacenAlbaran.Ano_Periodo, dbo.ComisionesSpigaAlmacenAlbaran.Mes_Periodo, 
                         CASE WHEN ComisionesSpigaAlmacenAlbaran.CodigoEmpresa <> Empleados.CodigoEmpresa THEN empleados.CodigoEmpresa ELSE ComisionesSpigaAlmacenAlbaran.CodigoEmpresa END AS CodigoEmpresa, 
                         dbo.ComisionesSpigaAlmacenAlbaran.CodigoEmpresa AS CodigoEmpresaAL, dbo.Empleados.CodigoEmpresa AS CodigoEmpresaEmpleado, dbo.ComisionesSpigaAlmacenAlbaran.Empresa, 
                         dbo.ComisionesSpigaAlmacenAlbaran.Centro, dbo.ComisionesSpigaAlmacenAlbaran.CedulaBodeguero AS CedulaVendedorRepuestos, dbo.ComisionesSpigaAlmacenAlbaran.NumeroFactura, 
                         dbo.ComisionesSpigaAlmacenAlbaran.FechaFactura, 
                         SUM(dbo.ComisionesSpigaAlmacenAlbaran.UnidadesVendidas * dbo.ComisionesSpigaAlmacenAlbaran.ValorUnitarioReferencia - dbo.ComisionesSpigaAlmacenAlbaran.UnidadesVendidas * dbo.ComisionesSpigaAlmacenAlbaran.ValorUnitarioReferencia
                          * dbo.ComisionesSpigaAlmacenAlbaran.PorcDescuento / 100) AS TotalAlmacenAlbaran, 1 AS TipoAlmacen
FROM            dbo.ComisionesSpigaAlmacenAlbaran LEFT OUTER JOIN
                         dbo.Empleados ON dbo.ComisionesSpigaAlmacenAlbaran.CedulaBodeguero = dbo.Empleados.CodigoEmpleado
WHERE        
(dbo.ComisionesSpigaAlmacenAlbaran.CodClasificacion1Mov IN ('1', '21', '34', 'ACC') 
OR dbo.ComisionesSpigaAlmacenAlbaran.CodClasificacion1Mov = 'ROPA') 
AND (dbo.ComisionesSpigaAlmacenAlbaran.TipoMov <> 'VIN')
AND (dbo.ComisionesSpigaAlmacenAlbaran.FechaFactura <= '20191031')

GROUP BY dbo.ComisionesSpigaAlmacenAlbaran.Ano_Periodo, dbo.ComisionesSpigaAlmacenAlbaran.Mes_Periodo, dbo.ComisionesSpigaAlmacenAlbaran.CodigoEmpresa, dbo.ComisionesSpigaAlmacenAlbaran.Empresa, 
                         dbo.ComisionesSpigaAlmacenAlbaran.CedulaBodeguero, dbo.ComisionesSpigaAlmacenAlbaran.NumeroFactura, dbo.ComisionesSpigaAlmacenAlbaran.FechaFactura, dbo.ComisionesSpigaAlmacenAlbaran.Centro, 
                         dbo.Empleados.CodigoEmpresa
HAVING        (dbo.ComisionesSpigaAlmacenAlbaran.CodigoEmpresa <> 6) AND (dbo.ComisionesSpigaAlmacenAlbaran.CedulaBodeguero IS NOT NULL)


```
