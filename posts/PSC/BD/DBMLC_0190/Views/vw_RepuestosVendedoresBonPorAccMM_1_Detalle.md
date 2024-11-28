# View: vw_RepuestosVendedoresBonPorAccMM_1_Detalle

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]
- [[vw_VariablesVersiones]]

```sql



CREATE VIEW [dbo].[vw_RepuestosVendedoresBonPorAccMM_1_Detalle]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, NumeroFactura, FechaFactura, Centro, SUM(ValorNetoMostrador) AS ValorNetoMostrador, SUM(BonificacionMostrador) AS BonificacionMostrador, 
                         MAX(ValorVariable1) AS ValorVariable1, MAX(ValorVariable2) AS ValorVariable2, 1 AS TipoAlmacen
FROM            (SELECT        dbo.ComisionesSpigaAlmacenAlbaran.Ano_Periodo, dbo.ComisionesSpigaAlmacenAlbaran.Mes_Periodo, dbo.ComisionesSpigaAlmacenAlbaran.CodigoEmpresa, 
                                                    dbo.ComisionesSpigaAlmacenAlbaran.CedulaVendedorRepuestos, dbo.ComisionesSpigaAlmacenAlbaran.NumeroFactura, dbo.ComisionesSpigaAlmacenAlbaran.FechaFactura, 
                                                    dbo.ComisionesSpigaAlmacenAlbaran.Centro, 
                                                    dbo.ComisionesSpigaAlmacenAlbaran.UnidadesVendidas * dbo.ComisionesSpigaAlmacenAlbaran.ValorUnitarioReferencia - dbo.ComisionesSpigaAlmacenAlbaran.UnidadesVendidas * dbo.ComisionesSpigaAlmacenAlbaran.ValorUnitarioReferencia
                                                     * dbo.ComisionesSpigaAlmacenAlbaran.PorcDescuento / 100 AS ValorNetoMostrador, 
                                                    CASE WHEN PorcDescuento <> 0 THEN (UnidadesVendidas * ValorUnitarioReferencia - UnidadesVendidas * ValorUnitarioReferencia * PorcDescuento / 100) 
                                                    * VAR1.ValorVariable ELSE (UnidadesVendidas * ValorUnitarioReferencia - UnidadesVendidas * ValorUnitarioReferencia * PorcDescuento / 100) * VAR2.ValorVariable END AS BonificacionMostrador, 
                                                    VAR1.ValorVariable AS ValorVariable1, VAR2.ValorVariable AS ValorVariable2
                          FROM            dbo.ComisionesSpigaAlmacenAlbaran CROSS JOIN
                                                        (SELECT        ValorVariable
                                                          FROM            dbo.vw_VariablesVersiones
                                                          WHERE        (IdVariable = 4)) AS VAR1 CROSS JOIN
                                                        (SELECT        ValorVariable
                                                          FROM            dbo.vw_VariablesVersiones AS vw_VariablesVersiones_1
                                                          WHERE        (IdVariable = 5)) AS VAR2
                          WHERE        
						  
						  (dbo.ComisionesSpigaAlmacenAlbaran.CodClasificacion1Mov in ('1', '21', '34', 'ACC', 'ROPA')) 
						  AND 
						  (dbo.ComisionesSpigaAlmacenAlbaran.TipoMov = 'VCR' OR
                          dbo.ComisionesSpigaAlmacenAlbaran.TipoMov = 'VCO' OR
                          dbo.ComisionesSpigaAlmacenAlbaran.TipoMov = 'VCRA' OR
                          dbo.ComisionesSpigaAlmacenAlbaran.TipoMov = 'VCOA')
						  AND 
						  (dbo.ComisionesSpigaAlmacenAlbaran.FechaFactura <= '20191031')

						  ) AS RESULTADO

GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, NumeroFactura, FechaFactura, Centro
HAVING        (CodigoEmpresa = 6) AND (CedulaVendedorRepuestos IS NOT NULL)



```
