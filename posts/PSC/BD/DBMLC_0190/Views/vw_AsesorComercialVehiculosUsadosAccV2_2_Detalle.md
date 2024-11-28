# View: vw_AsesorComercialVehiculosUsadosAccV2_2_Detalle

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]
- [[vw_VariablesVersiones]]

```sql










CREATE VIEW [dbo].[vw_AsesorComercialVehiculosUsadosAccV2_2_Detalle]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, NumeroFacturaTaller, SUM(ValorNetoTaller) AS ValorNetoTaller, SUM(BonificacionTaller) AS BonificacionTaller, ValorVariable
FROM            (SELECT        dbo.ComisionesSpigaTallerPorOT.Ano_Periodo, dbo.ComisionesSpigaTallerPorOT.Mes_Periodo, dbo.ComisionesSpigaTallerPorOT.CodigoEmpresa, dbo.ComisionesSpigaTallerPorOT.CedulaVendedorRepuestos, dbo.ComisionesSpigaTallerPorOT.NumeroFacturaTaller,
                                                    dbo.ComisionesSpigaTallerPorOT.UnidadesVendidas * dbo.ComisionesSpigaTallerPorOT.ValorUnitario - dbo.ComisionesSpigaTallerPorOT.UnidadesVendidas * dbo.ComisionesSpigaTallerPorOT.ValorUnitario * dbo.ComisionesSpigaTallerPorOT.PorcentajeDescuento
                                                     / 100 AS ValorNetoTaller, (UnidadesVendidas * ValorUnitario - UnidadesVendidas * ValorUnitario * PorcentajeDescuento / 100) 
                                                    * VAR.ValorVariable AS BonificacionTaller, 
                                                    VAR.ValorVariable 
                          FROM            dbo.ComisionesSpigaTallerPorOT CROSS JOIN
                                                        (SELECT        ValorVariable
                                                          FROM            dbo.vw_VariablesVersiones
                                                          WHERE        (IdVariable = 47)) AS VAR



WHERE  (dbo.ComisionesSpigaTallerPorOT.CodClas1 IN ('1','21','34','ACC') OR  dbo.ComisionesSpigaTallerPorOT.CodClas1 = 'ROPA') AND (dbo.ComisionesSpigaTallerPorOT.TipoIntCargo <> 'I') AND (dbo.ComisionesSpigaTallerPorOT.TipoIntCargo <> 'G')

) AS RESULTADO
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, NumeroFacturaTaller, ValorVariable
HAVING        (CedulaVendedorRepuestos IS NOT NULL)





```
