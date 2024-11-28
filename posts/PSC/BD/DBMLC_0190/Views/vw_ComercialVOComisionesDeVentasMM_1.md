# View: vw_ComercialVOComisionesDeVentasMM_1

## Usa los objetos:
- [[ComisionesSpigaVO]]
- [[vw_PorcentajeRecaudoVOFactura]]
- [[vw_VariablesVersiones]]

```sql
CREATE VIEW [dbo].[vw_ComercialVOComisionesDeVentasMM_1]
AS
SELECT        YEAR(FechaPeriodo) AS Ano_Periodo, MONTH(FechaPeriodo) AS Mes_Periodo, Ano_Recaudo, Mes_Recaudo, FechaRecaudo, FechaEntregaCliente, FechaPeriodo, CodigoEmpresa, Empresa, CodigoCentro, Centro, FechaFactura, 
                         NumeroFactura, VIN, TotalFactura, TotalFacturaSinCuotaReteFuente, ImporteEfecto, PorcentajeRecaudo, PrecioLista, CodigoMArca, Marca, CodigoGama, Gama, CodigoModelo, AñoModelo, Modelo, CedulaVendedor, 
                         UPPER(NombreVendedor) AS NombreVendedor, ISNULL(ValorPorcentaje, 0) AS ValorPorcentaje, ISNULL(ValorComision, 0) AS ValorComision, CASE WHEN ISNULL(ValorComision, 0) 
                         = 0 THEN 1 ELSE 0 END AS ModeloVehSinComision, 0 AS IdLiquidacion, 0 AS IdHistorico
FROM            (SELECT        dbo.vw_PorcentajeRecaudoVOFactura.Ano_Recaudo, dbo.vw_PorcentajeRecaudoVOFactura.Mes_Recaudo, dbo.vw_PorcentajeRecaudoVOFactura.CodigoEmpresa, dbo.vw_PorcentajeRecaudoVOFactura.Empresa, 
                                                    dbo.vw_PorcentajeRecaudoVOFactura.CodigoCentro, dbo.vw_PorcentajeRecaudoVOFactura.Centro, dbo.vw_PorcentajeRecaudoVOFactura.FechaFactura, dbo.vw_PorcentajeRecaudoVOFactura.NumeroFactura, 
                                                    dbo.vw_PorcentajeRecaudoVOFactura.VIN, dbo.vw_PorcentajeRecaudoVOFactura.TotalFactura, dbo.vw_PorcentajeRecaudoVOFactura.TotalFacturaSinCuotaReteFuente, 
                                                    dbo.vw_PorcentajeRecaudoVOFactura.ImporteEfecto, dbo.vw_PorcentajeRecaudoVOFactura.PorcentajeRecaudo, dbo.ComisionesSpigaVO.PrecioLista, dbo.ComisionesSpigaVO.CodigoMArca, 
                                                    dbo.ComisionesSpigaVO.Marca, dbo.ComisionesSpigaVO.CodigoGama, dbo.ComisionesSpigaVO.Gama, dbo.ComisionesSpigaVO.CodigoModelo, dbo.ComisionesSpigaVO.AñoModelo, 
                                                    dbo.ComisionesSpigaVO.Modelo, dbo.ComisionesSpigaVO.CedulaVendedor, dbo.ComisionesSpigaVO.NombreVendedor, [VAR].ValorVariable AS ValorPorcentaje, 
                                                    dbo.vw_PorcentajeRecaudoVOFactura.TotalFactura * [VAR].ValorVariable / 100 AS ValorComision, dbo.ComisionesSpigaVO.FechaEntregaCliente, dbo.vw_PorcentajeRecaudoVOFactura.FechaRecaudo, 
                                                    CASE WHEN dbo.ComisionesSpigaVO.FechaEntregaCliente > dbo.vw_PorcentajeRecaudoVOFactura.FechaRecaudo THEN dbo.ComisionesSpigaVO.FechaEntregaCliente ELSE dbo.vw_PorcentajeRecaudoVOFactura.FechaRecaudo
                                                     END AS FechaPeriodo
                          FROM            dbo.vw_PorcentajeRecaudoVOFactura INNER JOIN
                                                    dbo.ComisionesSpigaVO ON dbo.vw_PorcentajeRecaudoVOFactura.NumeroFactura = dbo.ComisionesSpigaVO.NumeroFactura AND dbo.vw_PorcentajeRecaudoVOFactura.VIN = dbo.ComisionesSpigaVO.VIN AND 
                                                    dbo.vw_PorcentajeRecaudoVOFactura.CodigoEmpresa = dbo.ComisionesSpigaVO.Codigoempresa AND dbo.vw_PorcentajeRecaudoVOFactura.CodigoCentro = dbo.ComisionesSpigaVO.CodigoCentro CROSS JOIN
                                                        (SELECT        IdVariable, IdVariableVersion, ValorVariable, ConsecutivoVariable
                                                          FROM            dbo.vw_VariablesVersiones
                                                          WHERE        (IdVariable = 22)) AS [VAR]) AS RESULTADO


```
