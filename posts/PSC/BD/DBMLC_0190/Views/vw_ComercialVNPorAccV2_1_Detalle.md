# View: vw_ComercialVNPorAccV2_1_Detalle

## Usa los objetos:
- [[vw_ComercialVNPorAcc_ComisionesSpigaAlmacenAlbaran]]
- [[vw_VariablesVersiones]]

```sql









CREATE VIEW [dbo].[vw_ComercialVNPorAccV2_1_Detalle]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, NumeroFactura, SUM(ValorNetoMostrador) AS ValorNetoMostrador, SUM(BonificacionMostrador) AS BonificacionMostrador, ValorVariableCT, ValorVariableMM
FROM            (SELECT        dbo.vw_ComercialVNPorAcc_ComisionesSpigaAlmacenAlbaran.Ano_Periodo, dbo.vw_ComercialVNPorAcc_ComisionesSpigaAlmacenAlbaran.Mes_Periodo, dbo.vw_ComercialVNPorAcc_ComisionesSpigaAlmacenAlbaran.CodigoEmpresa, 
                                                    dbo.vw_ComercialVNPorAcc_ComisionesSpigaAlmacenAlbaran.CedulaVendedorRepuestos, dbo.vw_ComercialVNPorAcc_ComisionesSpigaAlmacenAlbaran.NumeroFactura,
                                                    dbo.vw_ComercialVNPorAcc_ComisionesSpigaAlmacenAlbaran.UnidadesVendidas * dbo.vw_ComercialVNPorAcc_ComisionesSpigaAlmacenAlbaran.ValorUnitarioReferencia - dbo.vw_ComercialVNPorAcc_ComisionesSpigaAlmacenAlbaran.UnidadesVendidas * dbo.vw_ComercialVNPorAcc_ComisionesSpigaAlmacenAlbaran.ValorUnitarioReferencia
                                                     * dbo.vw_ComercialVNPorAcc_ComisionesSpigaAlmacenAlbaran.PorcDescuento / 100 AS ValorNetoMostrador, 
                                                    CASE WHEN CodigoEmpresa = 6 THEN (UnidadesVendidas * ValorUnitarioReferencia - UnidadesVendidas * ValorUnitarioReferencia * PorcDescuento / 100) 
                                                    * VARMM.ValorVariable ELSE (UnidadesVendidas * ValorUnitarioReferencia - UnidadesVendidas * ValorUnitarioReferencia * PorcDescuento / 100) * VARCT.ValorVariable END AS BonificacionMostrador, 
                                                    VARCT.ValorVariable AS ValorVariableCT, VARMM.ValorVariable AS ValorVariableMM

							-- JCS: 03/05/2023 
							-- SI EL VENDEDOR DE REPUESTOS ES DE CT O MM, Y VENDIO ALGO POR BN, SE LE DEBE PAGAR POR SU EMPRESA
							-- APLICA SÓLO PARA EL ESQUEMA DE ACCESORIOS DE VENDEDORES VN

                          FROM            dbo.vw_ComercialVNPorAcc_ComisionesSpigaAlmacenAlbaran CROSS JOIN
                                                        (SELECT        ValorVariable
                                                          FROM            dbo.vw_VariablesVersiones
                                                          WHERE        (IdVariable = 43)) AS VARCT CROSS JOIN
                                                        (SELECT        ValorVariable
                                                          FROM            dbo.vw_VariablesVersiones AS vw_VariablesVersiones_1
                                                          WHERE        (IdVariable = 45)) AS VARMM

WHERE 

--(dbo.vw_ComercialVNPorAcc_ComisionesSpigaAlmacenAlbaran.CodClasificacion1Mov IN ('1','21', '34') OR dbo.vw_ComercialVNPorAcc_ComisionesSpigaAlmacenAlbaran.CodClasificacion1Mov = 'ROPA') 
--AND (dbo.vw_ComercialVNPorAcc_ComisionesSpigaAlmacenAlbaran.TipoMov <> 'VIN')

--dbo.vw_ComercialVNPorAcc_ComisionesSpigaAlmacenAlbaran.CodClasificacion1Mov IN ('ROPA','1','40','ACC','21','34','BOUT','ACCE')
dbo.vw_ComercialVNPorAcc_ComisionesSpigaAlmacenAlbaran.Seccion LIKE '%bout%' -- JCS: 2023/02/08 - PARA QUE NO SE QUEDEN POR FUERA ACCESORIOS
AND
dbo.vw_ComercialVNPorAcc_ComisionesSpigaAlmacenAlbaran.TipoMov NOT IN ('VIN', 'VINA')

) AS RESULTADO
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, NumeroFactura, ValorVariableCT, ValorVariableMM
HAVING        (CedulaVendedorRepuestos IS NOT NULL)





```
