# View: vw_RepuestosVendedoresBonPorAccMM_2_Detalle

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]
- [[vw_VariablesVersiones]]

```sql



CREATE VIEW [dbo].[vw_RepuestosVendedoresBonPorAccMM_2_Detalle]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, NumeroFacturaTaller, FechaFactura, Centro, SUM(ValorNetoTaller) AS ValorNetoTaller, SUM(BonificacionTaller) AS BonificacionTaller, 
                         MAX(ValorVariable1) AS ValorVariable1, MAX(ValorVariable2) AS ValorVariable2, 1 AS TipoTaller
FROM            (SELECT        dbo.ComisionesSpigaTallerPorOT.Ano_Periodo, dbo.ComisionesSpigaTallerPorOT.Mes_Periodo, dbo.ComisionesSpigaTallerPorOT.CodigoEmpresa, dbo.ComisionesSpigaTallerPorOT.CedulaVendedorRepuestos, 
                                                    dbo.ComisionesSpigaTallerPorOT.NumeroFacturaTaller, dbo.ComisionesSpigaTallerPorOT.FechaFactura, dbo.ComisionesSpigaTallerPorOT.Centro, 
                                                    dbo.ComisionesSpigaTallerPorOT.UnidadesVendidas * dbo.ComisionesSpigaTallerPorOT.ValorUnitario - dbo.ComisionesSpigaTallerPorOT.UnidadesVendidas * dbo.ComisionesSpigaTallerPorOT.ValorUnitario * dbo.ComisionesSpigaTallerPorOT.PorcentajeDescuento
                                                     / 100 AS ValorNetoTaller, CASE WHEN PorcentajeDescuento <> 0 THEN (UnidadesVendidas * ValorUnitario - UnidadesVendidas * ValorUnitario * PorcentajeDescuento / 100) 
                                                    * VAR1.ValorVariable ELSE (UnidadesVendidas * ValorUnitario - UnidadesVendidas * ValorUnitario * PorcentajeDescuento / 100) * VAR2.ValorVariable END AS BonificacionTaller, VAR1.ValorVariable AS ValorVariable1,
                                                     VAR2.ValorVariable AS ValorVariable2
                          FROM            dbo.ComisionesSpigaTallerPorOT CROSS JOIN
                                                        (SELECT        ValorVariable
                                                          FROM            dbo.vw_VariablesVersiones
                                                          WHERE        (IdVariable = 4)) AS VAR1 CROSS JOIN
                                                        (SELECT        ValorVariable
                                                          FROM            dbo.vw_VariablesVersiones AS vw_VariablesVersiones_1
                                                          WHERE        (IdVariable = 5)) AS VAR2
                          WHERE        
						  
						  (dbo.ComisionesSpigaTallerPorOT.TipoOperacion = 'MAT') 
						  AND (dbo.ComisionesSpigaTallerPorOT.CodClas1 in ( '1', '21', '34', 'ACC', 'ROPA')) 
						  AND (dbo.ComisionesSpigaTallerPorOT.TipoIntCargo = 'C' OR dbo.ComisionesSpigaTallerPorOT.TipoIntCargo = 'S')
						  AND (dbo.ComisionesSpigaTallerPorOT.FechaFactura <= '20191031')

						  ) AS RESULTADO

GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, NumeroFacturaTaller, FechaFactura, Centro
HAVING        (CodigoEmpresa = 6) AND (CedulaVendedorRepuestos IS NOT NULL)



```
