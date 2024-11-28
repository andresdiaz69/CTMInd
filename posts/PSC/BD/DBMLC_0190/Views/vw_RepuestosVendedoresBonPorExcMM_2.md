# View: vw_RepuestosVendedoresBonPorExcMM_2

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]
- [[vw_VariablesVersiones]]

```sql

CREATE VIEW [dbo].[vw_RepuestosVendedoresBonPorExcMM_2]
AS
SELECT        dbo.ComisionesSpigaAlmacenAlbaran.Ano_Periodo, dbo.ComisionesSpigaAlmacenAlbaran.Mes_Periodo, dbo.ComisionesSpigaAlmacenAlbaran.CodigoEmpresa, dbo.ComisionesSpigaAlmacenAlbaran.NumeroFactura, 
                         dbo.ComisionesSpigaAlmacenAlbaran.CedulaVendedorRepuestos, 
                         dbo.ComisionesSpigaAlmacenAlbaran.UnidadesVendidas * dbo.ComisionesSpigaAlmacenAlbaran.ValorUnitarioReferencia - dbo.ComisionesSpigaAlmacenAlbaran.UnidadesVendidas * dbo.ComisionesSpigaAlmacenAlbaran.ValorUnitarioReferencia
                          * dbo.ComisionesSpigaAlmacenAlbaran.PorcDescuento AS ValorBase, 
                         (dbo.ComisionesSpigaAlmacenAlbaran.UnidadesVendidas * dbo.ComisionesSpigaAlmacenAlbaran.ValorUnitarioReferencia - dbo.ComisionesSpigaAlmacenAlbaran.UnidadesVendidas * dbo.ComisionesSpigaAlmacenAlbaran.ValorUnitarioReferencia
                          * dbo.ComisionesSpigaAlmacenAlbaran.PorcDescuento) * [VAR].ValorVariable AS ValorNeto, [VAR].ValorVariable
FROM            dbo.ComisionesSpigaAlmacenAlbaran CROSS JOIN
                             (SELECT        ValorVariable
                               FROM            dbo.vw_VariablesVersiones
                               WHERE        (IdVariable = 12)) AS [VAR]

WHERE (dbo.ComisionesSpigaAlmacenAlbaran.FechaFactura <= '20191031') 
GROUP BY dbo.ComisionesSpigaAlmacenAlbaran.Ano_Periodo, dbo.ComisionesSpigaAlmacenAlbaran.Mes_Periodo, dbo.ComisionesSpigaAlmacenAlbaran.CodigoEmpresa, dbo.ComisionesSpigaAlmacenAlbaran.NumeroFactura, 
                         dbo.ComisionesSpigaAlmacenAlbaran.CedulaVendedorRepuestos, 
                         dbo.ComisionesSpigaAlmacenAlbaran.UnidadesVendidas * dbo.ComisionesSpigaAlmacenAlbaran.ValorUnitarioReferencia - dbo.ComisionesSpigaAlmacenAlbaran.UnidadesVendidas * dbo.ComisionesSpigaAlmacenAlbaran.ValorUnitarioReferencia
                          * dbo.ComisionesSpigaAlmacenAlbaran.PorcDescuento, 
                         (dbo.ComisionesSpigaAlmacenAlbaran.UnidadesVendidas * dbo.ComisionesSpigaAlmacenAlbaran.ValorUnitarioReferencia - dbo.ComisionesSpigaAlmacenAlbaran.UnidadesVendidas * dbo.ComisionesSpigaAlmacenAlbaran.ValorUnitarioReferencia
                          * dbo.ComisionesSpigaAlmacenAlbaran.PorcDescuento) * [VAR].ValorVariable, [VAR].ValorVariable



```
