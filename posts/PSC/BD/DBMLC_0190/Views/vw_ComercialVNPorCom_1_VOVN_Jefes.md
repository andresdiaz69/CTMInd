# View: vw_ComercialVNPorCom_1_VOVN_Jefes

## Usa los objetos:
- [[ComisionesSpigaVO]]
- [[VehiculosModelos]]
- [[vw_PorcentajeRecaudoVOVNFactura_Jefes]]

```sql








CREATE VIEW [dbo].[vw_ComercialVNPorCom_1_VOVN_Jefes]
AS
SELECT        YEAR(FechaPeriodo) AS Ano_Periodo, MONTH(FechaPeriodo) AS Mes_Periodo, Ano_Recaudo, Mes_Recaudo, FechaRecaudo, FechaEntregaCliente, FechaPeriodo, CodigoEmpresa, Empresa, CodigoCentro, Centro, FechaFactura, 
                         NumeroFactura, VIN, TotalFactura, TotalFacturaSinCuotaReteFuente, ImporteEfecto, PorcentajeRecaudo, PrecioLista, CodigoMArca, Marca, CodigoGama, Gama, CodigoModelo, AñoModelo, Modelo, CedulaVendedor, UPPER(NombreVendedor) AS NombreVendedor, 
                         ISNULL(ValorComision, 0) AS ValorComision, CASE WHEN ISNULL(ValorComision, 0) = 0 THEN 1 ELSE 0 END AS ModeloVehSinComision, 0 AS IdLiquidacion, 0 AS IdHistorico
FROM            (SELECT        dbo.vw_PorcentajeRecaudoVOVNFactura_Jefes.Ano_Recaudo, dbo.vw_PorcentajeRecaudoVOVNFactura_Jefes.Mes_Recaudo, dbo.vw_PorcentajeRecaudoVOVNFactura_Jefes.CodigoEmpresa, 
                                                    dbo.vw_PorcentajeRecaudoVOVNFactura_Jefes.Empresa, dbo.vw_PorcentajeRecaudoVOVNFactura_Jefes.CodigoCentro, dbo.vw_PorcentajeRecaudoVOVNFactura_Jefes.Centro, dbo.vw_PorcentajeRecaudoVOVNFactura_Jefes.FechaFactura, 
                                                    dbo.vw_PorcentajeRecaudoVOVNFactura_Jefes.NumeroFactura, dbo.vw_PorcentajeRecaudoVOVNFactura_Jefes.VIN, dbo.vw_PorcentajeRecaudoVOVNFactura_Jefes.TotalFactura, dbo.vw_PorcentajeRecaudoVOVNFactura_Jefes.TotalFacturaSinCuotaReteFuente,
													dbo.vw_PorcentajeRecaudoVOVNFactura_Jefes.ImporteEfecto, 
                                                    dbo.vw_PorcentajeRecaudoVOVNFactura_Jefes.PorcentajeRecaudo, dbo.ComisionesSpigaVO.PrecioLista, dbo.ComisionesSpigaVO.CodigoMArca, dbo.ComisionesSpigaVO.Marca, dbo.ComisionesSpigaVO.CodigoGama, dbo.ComisionesSpigaVO.Gama, 
                                                    dbo.ComisionesSpigaVO.CodigoModelo, dbo.ComisionesSpigaVO.AñoModelo, dbo.ComisionesSpigaVO.Modelo, dbo.ComisionesSpigaVO.CedulaVendedor, dbo.ComisionesSpigaVO.NombreVendedor, 
                                                    dbo.VehiculosModelos.ValorComision, dbo.ComisionesSpigaVO.FechaEntregaCliente, dbo.vw_PorcentajeRecaudoVOVNFactura_Jefes.FechaRecaudo, 
                                                    CASE WHEN dbo.ComisionesSpigaVO.FechaEntregaCliente > dbo.vw_PorcentajeRecaudoVOVNFactura_Jefes.FechaRecaudo THEN dbo.ComisionesSpigaVO.FechaEntregaCliente ELSE dbo.vw_PorcentajeRecaudoVOVNFactura_Jefes.FechaRecaudo
                                                     END AS FechaPeriodo
                          FROM            dbo.vw_PorcentajeRecaudoVOVNFactura_Jefes INNER JOIN
                                                    dbo.ComisionesSpigaVO ON dbo.vw_PorcentajeRecaudoVOVNFactura_Jefes.NumeroFactura = dbo.ComisionesSpigaVO.NumeroFactura AND dbo.vw_PorcentajeRecaudoVOVNFactura_Jefes.VIN = dbo.ComisionesSpigaVO.VIN AND 
                                                    dbo.vw_PorcentajeRecaudoVOVNFactura_Jefes.CodigoEmpresa = dbo.ComisionesSpigaVO.CodigoEmpresaSugerido AND 
                                                    dbo.vw_PorcentajeRecaudoVOVNFactura_Jefes.CodigoCentro = dbo.ComisionesSpigaVO.CodigoCentro LEFT OUTER JOIN
                                                    dbo.VehiculosModelos ON dbo.ComisionesSpigaVO.CodigoGama = dbo.VehiculosModelos.CodigoGama AND dbo.ComisionesSpigaVO.CodigoMArca = dbo.VehiculosModelos.CodigoMarca AND 
                                                    dbo.ComisionesSpigaVO.CodigoModelo = dbo.VehiculosModelos.CodigoModelo AND dbo.ComisionesSpigaVO.AñoModelo = dbo.VehiculosModelos.AnoModelo) AS RESULTADO








```
