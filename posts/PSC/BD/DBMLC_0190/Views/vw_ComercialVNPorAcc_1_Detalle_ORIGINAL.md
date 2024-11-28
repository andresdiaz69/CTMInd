# View: vw_ComercialVNPorAcc_1_Detalle_ORIGINAL

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]
- [[vw_VariablesVersiones]]

```sql





CREATE VIEW [dbo].[vw_ComercialVNPorAcc_1_Detalle_ORIGINAL]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, NumeroFactura, SUM(ValorNetoMostrador) AS ValorNetoMostrador, SUM(BonificacionMostrador) AS BonificacionMostrador, ValorVariableCT, ValorVariableMM
FROM            (SELECT        dbo.ComisionesSpigaAlmacenAlbaran.Ano_Periodo, dbo.ComisionesSpigaAlmacenAlbaran.Mes_Periodo, dbo.ComisionesSpigaAlmacenAlbaran.CodigoEmpresa, 
                                                    dbo.ComisionesSpigaAlmacenAlbaran.CedulaVendedorRepuestos, dbo.ComisionesSpigaAlmacenAlbaran.NumeroFactura,
                                                    dbo.ComisionesSpigaAlmacenAlbaran.UnidadesVendidas * dbo.ComisionesSpigaAlmacenAlbaran.ValorUnitarioReferencia - dbo.ComisionesSpigaAlmacenAlbaran.UnidadesVendidas * dbo.ComisionesSpigaAlmacenAlbaran.ValorUnitarioReferencia
                                                     * dbo.ComisionesSpigaAlmacenAlbaran.PorcDescuento / 100 AS ValorNetoMostrador, 
                                                    CASE WHEN CodigoEmpresa = 6 THEN (UnidadesVendidas * ValorUnitarioReferencia - UnidadesVendidas * ValorUnitarioReferencia * PorcDescuento / 100) 
                                                    * VARMM.ValorVariable ELSE (UnidadesVendidas * ValorUnitarioReferencia - UnidadesVendidas * ValorUnitarioReferencia * PorcDescuento / 100) * VARCT.ValorVariable END AS BonificacionMostrador, 
                                                    VARCT.ValorVariable AS ValorVariableCT, VARMM.ValorVariable AS ValorVariableMM
                          FROM            dbo.ComisionesSpigaAlmacenAlbaran CROSS JOIN
                                                        (SELECT        ValorVariable
                                                          FROM            dbo.vw_VariablesVersiones
                                                          WHERE        (IdVariable = 9)) AS VARCT CROSS JOIN
                                                        (SELECT        ValorVariable
                                                          FROM            dbo.vw_VariablesVersiones AS vw_VariablesVersiones_1
                                                          WHERE        (IdVariable = 11)) AS VARMM

WHERE 

--(dbo.ComisionesSpigaAlmacenAlbaran.CodClasificacion1Mov IN ('1','21', '34') OR dbo.ComisionesSpigaAlmacenAlbaran.CodClasificacion1Mov = 'ROPA') 
--AND (dbo.ComisionesSpigaAlmacenAlbaran.TipoMov <> 'VIN')

--dbo.ComisionesSpigaAlmacenAlbaran.CodClasificacion1Mov IN ('ROPA','1','40','ACC','21','34','BOUT','ACCE')
dbo.ComisionesSpigaAlmacenAlbaran.Seccion LIKE '%bout%' -- JCS: 2023/02/08 - PARA QUE NO SE QUEDEN POR FUERA ACCESORIOS
AND
dbo.ComisionesSpigaAlmacenAlbaran.TipoMov NOT IN ('VIN', 'VINA')

) AS RESULTADO
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, NumeroFactura, ValorVariableCT, ValorVariableMM
HAVING        (CedulaVendedorRepuestos IS NOT NULL)





```
