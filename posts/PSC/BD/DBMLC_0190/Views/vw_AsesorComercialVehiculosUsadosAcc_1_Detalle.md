# View: vw_AsesorComercialVehiculosUsadosAcc_1_Detalle

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]
- [[vw_VariablesVersiones]]

```sql






CREATE VIEW [dbo].[vw_AsesorComercialVehiculosUsadosAcc_1_Detalle]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, NumeroFactura, SUM(ValorNetoMostrador) AS ValorNetoMostrador, SUM(BonificacionMostrador) AS BonificacionMostrador, ValorVariable
FROM            (SELECT        dbo.ComisionesSpigaAlmacenAlbaran.Ano_Periodo, dbo.ComisionesSpigaAlmacenAlbaran.Mes_Periodo, dbo.ComisionesSpigaAlmacenAlbaran.CodigoEmpresa, 
                                                    dbo.ComisionesSpigaAlmacenAlbaran.CedulaVendedorRepuestos, dbo.ComisionesSpigaAlmacenAlbaran.NumeroFactura,
                                                    dbo.ComisionesSpigaAlmacenAlbaran.UnidadesVendidas * dbo.ComisionesSpigaAlmacenAlbaran.ValorUnitarioReferencia - dbo.ComisionesSpigaAlmacenAlbaran.UnidadesVendidas * dbo.ComisionesSpigaAlmacenAlbaran.ValorUnitarioReferencia
                                                     * dbo.ComisionesSpigaAlmacenAlbaran.PorcDescuento / 100 AS ValorNetoMostrador, 
                                                    (UnidadesVendidas * ValorUnitarioReferencia - UnidadesVendidas * ValorUnitarioReferencia * PorcDescuento / 100) 
                                                    * VAR.ValorVariable AS BonificacionMostrador, 
                                                    VAR.ValorVariable
                          FROM            dbo.ComisionesSpigaAlmacenAlbaran CROSS JOIN
                                                        (SELECT        ValorVariable
                                                          FROM            dbo.vw_VariablesVersiones
                                                          WHERE        (IdVariable = 25)) AS VAR

WHERE (dbo.ComisionesSpigaAlmacenAlbaran.CodClasificacion1Mov IN ('1','21','34','ACC') OR dbo.ComisionesSpigaAlmacenAlbaran.CodClasificacion1Mov = 'ROPA') AND (dbo.ComisionesSpigaAlmacenAlbaran.TipoMov <> 'VIN')) AS RESULTADO
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, NumeroFactura, ValorVariable
HAVING        (CedulaVendedorRepuestos IS NOT NULL)





```
