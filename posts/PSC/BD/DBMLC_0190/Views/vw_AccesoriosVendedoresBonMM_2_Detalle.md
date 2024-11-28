# View: vw_AccesoriosVendedoresBonMM_2_Detalle

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]

```sql


CREATE VIEW [dbo].[vw_AccesoriosVendedoresBonMM_2_Detalle]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, Empresa, CedulaVendedorRepuestos, NumeroFacturaTaller, FechaFactura, Centro, 
                         SUM(UnidadesVendidas * ValorUnitario - UnidadesVendidas * ValorUnitario * PorcentajeDescuento / 100) AS TotalTallerPorOT, 1 AS TipoTaller
FROM            dbo.ComisionesSpigaTallerPorOT
WHERE        
(CodClas1 IN ('1', '21', '34', 'ACC') 
OR CodClas1 = 'ROPA') 
AND (TipoIntCargo <> 'I') 
AND (TipoIntCargo <> 'G')
AND (dbo.ComisionesSpigaTallerPorOT.FechaFactura <= '20191031')

GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, Empresa, CedulaVendedorRepuestos, NumeroFacturaTaller, FechaFactura, Centro
HAVING        (CodigoEmpresa = 6) AND (CedulaVendedorRepuestos IS NOT NULL)


```
