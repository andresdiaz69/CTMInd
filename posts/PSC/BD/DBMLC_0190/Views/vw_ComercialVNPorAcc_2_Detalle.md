# View: vw_ComercialVNPorAcc_2_Detalle

## Usa los objetos:
- [[vw_ComercialVNPorAcc_ComisionesSpigaTallerPorOT]]
- [[vw_VariablesVersiones]]

```sql







CREATE VIEW [dbo].[vw_ComercialVNPorAcc_2_Detalle]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, NumeroFacturaTaller, SUM(ValorNetoTaller) AS ValorNetoTaller, SUM(BonificacionTaller) AS BonificacionTaller, ValorVariableCT, ValorVariableMM
FROM            (SELECT        dbo.vw_ComercialVNPorAcc_ComisionesSpigaTallerPorOT.Ano_Periodo, dbo.vw_ComercialVNPorAcc_ComisionesSpigaTallerPorOT.Mes_Periodo, dbo.vw_ComercialVNPorAcc_ComisionesSpigaTallerPorOT.CodigoEmpresa, dbo.vw_ComercialVNPorAcc_ComisionesSpigaTallerPorOT.CedulaVendedorRepuestos, dbo.vw_ComercialVNPorAcc_ComisionesSpigaTallerPorOT.NumeroFacturaTaller,
                                                    dbo.vw_ComercialVNPorAcc_ComisionesSpigaTallerPorOT.UnidadesVendidas * dbo.vw_ComercialVNPorAcc_ComisionesSpigaTallerPorOT.ValorUnitario - dbo.vw_ComercialVNPorAcc_ComisionesSpigaTallerPorOT.UnidadesVendidas * dbo.vw_ComercialVNPorAcc_ComisionesSpigaTallerPorOT.ValorUnitario * dbo.vw_ComercialVNPorAcc_ComisionesSpigaTallerPorOT.PorcentajeDescuento
                                                     / 100 AS ValorNetoTaller, CASE WHEN CodigoEmpresa = 6 THEN (UnidadesVendidas * ValorUnitario - UnidadesVendidas * ValorUnitario * PorcentajeDescuento / 100) 
                                                    * VARMM.ValorVariable ELSE (UnidadesVendidas * ValorUnitario - UnidadesVendidas * ValorUnitario * PorcentajeDescuento / 100) * VARCT.ValorVariable END AS BonificacionTaller, 
                                                    VARCT.ValorVariable AS ValorVariableCT, VARMM.ValorVariable AS ValorVariableMM

							-- JCS: 03/05/2023 
							-- SI EL VENDEDOR DE REPUESTOS ES DE CT O MM, Y VENDIO ALGO POR BN, SE LE DEBE PAGAR POR SU EMPRESA
							-- APLICA SÓLO PARA EL ESQUEMA DE ACCESORIOS DE VENDEDORES VN

                          FROM            dbo.vw_ComercialVNPorAcc_ComisionesSpigaTallerPorOT CROSS JOIN
                                                        (SELECT        ValorVariable
                                                          FROM            dbo.vw_VariablesVersiones
                                                          WHERE        (IdVariable = 9)) AS VARCT CROSS JOIN
                                                        (SELECT        ValorVariable
                                                          FROM            dbo.vw_VariablesVersiones AS vw_VariablesVersiones_1
                                                          WHERE        (IdVariable = 11)) AS VARMM



WHERE  

--(dbo.vw_ComercialVNPorAcc_ComisionesSpigaTallerPorOT.CodClas1 IN ('1','21', '34') OR  dbo.vw_ComercialVNPorAcc_ComisionesSpigaTallerPorOT.CodClas1 = 'ROPA') 
--AND (dbo.vw_ComercialVNPorAcc_ComisionesSpigaTallerPorOT.TipoIntCargo <> 'I') 
--AND (dbo.vw_ComercialVNPorAcc_ComisionesSpigaTallerPorOT.TipoIntCargo <> 'G')

(dbo.vw_ComercialVNPorAcc_ComisionesSpigaTallerPorOT.TipoOperacion = 'MAT') 
AND 
--(dbo.vw_ComercialVNPorAcc_ComisionesSpigaTallerPorOT.CodClas1 IN ('ROPA','1','40','ACC','21','34','BOUT','ACCE'))
(dbo.vw_ComercialVNPorAcc_ComisionesSpigaTallerPorOT.Seccion LIKE '%bout%') -- JCS: 2023/02/08 - PARA QUE NO SE QUEDEN POR FUERA ACCESORIOS

) AS RESULTADO
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, NumeroFacturaTaller, ValorVariableCT, ValorVariableMM
HAVING        (CedulaVendedorRepuestos IS NOT NULL)





```
