# View: vw_ComercialVNPorAcc_2_Detalle_ORIGINAL

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]
- [[vw_VariablesVersiones]]

```sql





CREATE VIEW [dbo].[vw_ComercialVNPorAcc_2_Detalle_ORIGINAL]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, NumeroFacturaTaller, SUM(ValorNetoTaller) AS ValorNetoTaller, SUM(BonificacionTaller) AS BonificacionTaller, ValorVariableCT, ValorVariableMM
FROM            (SELECT        dbo.ComisionesSpigaTallerPorOT.Ano_Periodo, dbo.ComisionesSpigaTallerPorOT.Mes_Periodo, dbo.ComisionesSpigaTallerPorOT.CodigoEmpresa, dbo.ComisionesSpigaTallerPorOT.CedulaVendedorRepuestos, dbo.ComisionesSpigaTallerPorOT.NumeroFacturaTaller,
                                                    dbo.ComisionesSpigaTallerPorOT.UnidadesVendidas * dbo.ComisionesSpigaTallerPorOT.ValorUnitario - dbo.ComisionesSpigaTallerPorOT.UnidadesVendidas * dbo.ComisionesSpigaTallerPorOT.ValorUnitario * dbo.ComisionesSpigaTallerPorOT.PorcentajeDescuento
                                                     / 100 AS ValorNetoTaller, CASE WHEN CodigoEmpresa = 6 THEN (UnidadesVendidas * ValorUnitario - UnidadesVendidas * ValorUnitario * PorcentajeDescuento / 100) 
                                                    * VARMM.ValorVariable ELSE (UnidadesVendidas * ValorUnitario - UnidadesVendidas * ValorUnitario * PorcentajeDescuento / 100) * VARCT.ValorVariable END AS BonificacionTaller, 
                                                    VARCT.ValorVariable AS ValorVariableCT, VARMM.ValorVariable AS ValorVariableMM
                          FROM            dbo.ComisionesSpigaTallerPorOT CROSS JOIN
                                                        (SELECT        ValorVariable
                                                          FROM            dbo.vw_VariablesVersiones
                                                          WHERE        (IdVariable = 9)) AS VARCT CROSS JOIN
                                                        (SELECT        ValorVariable
                                                          FROM            dbo.vw_VariablesVersiones AS vw_VariablesVersiones_1
                                                          WHERE        (IdVariable = 11)) AS VARMM



WHERE  

--(dbo.ComisionesSpigaTallerPorOT.CodClas1 IN ('1','21', '34') OR  dbo.ComisionesSpigaTallerPorOT.CodClas1 = 'ROPA') 
--AND (dbo.ComisionesSpigaTallerPorOT.TipoIntCargo <> 'I') 
--AND (dbo.ComisionesSpigaTallerPorOT.TipoIntCargo <> 'G')

(dbo.ComisionesSpigaTallerPorOT.TipoOperacion = 'MAT') 
AND 
--(dbo.ComisionesSpigaTallerPorOT.CodClas1 IN ('ROPA','1','40','ACC','21','34','BOUT','ACCE'))
(dbo.ComisionesSpigaTallerPorOT.Seccion LIKE '%bout%') -- JCS: 2023/02/08 - PARA QUE NO SE QUEDEN POR FUERA ACCESORIOS

) AS RESULTADO
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, NumeroFacturaTaller, ValorVariableCT, ValorVariableMM
HAVING        (CedulaVendedorRepuestos IS NOT NULL)





```
