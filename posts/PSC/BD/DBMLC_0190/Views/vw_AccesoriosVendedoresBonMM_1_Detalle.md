# View: vw_AccesoriosVendedoresBonMM_1_Detalle

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]

```sql


CREATE VIEW [dbo].[vw_AccesoriosVendedoresBonMM_1_Detalle]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, Empresa, CedulaVendedorRepuestos, NumeroFactura, FechaFactura, Centro, 
                         SUM(UnidadesVendidas * ValorUnitarioReferencia - UnidadesVendidas * ValorUnitarioReferencia * PorcDescuento / 100) AS TotalAlmacenAlbaran, 1 AS TipoAlmacen
FROM            dbo.ComisionesSpigaAlmacenAlbaran
WHERE        
(CodClasificacion1Mov IN ('1', '21', '34', 'ACC') 
OR CodClasificacion1Mov = 'ROPA') 
AND (TipoMov <> 'VIN')
AND (dbo.ComisionesSpigaAlmacenAlbaran.FechaFactura <= '20191031')

GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, Empresa, CedulaVendedorRepuestos, NumeroFactura, FechaFactura, Centro
HAVING        (CedulaVendedorRepuestos IS NOT NULL) AND (CodigoEmpresa = 6)


```
