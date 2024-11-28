# View: vw_ComercialVNPorCom_1_VN_Jefes

## Usa los objetos:
- [[ComisionesSpigaVN]]
- [[VehiculosModelos]]
- [[vw_PorcentajeRecaudoVNFactura_Jefes]]

```sql









CREATE VIEW [dbo].[vw_ComercialVNPorCom_1_VN_Jefes]
AS
SELECT        YEAR(FechaPeriodo) AS Ano_Periodo, MONTH(FechaPeriodo) AS Mes_Periodo, Ano_Recaudo, Mes_Recaudo, FechaRecaudo, FechaEntregaCliente, FechaPeriodo, CodigoEmpresa, Empresa, CodigoCentro, Centro, FechaFactura, 
                         NumeroFactura, VIN, TotalFactura, TotalFacturaSinCuotaReteFuente, ImporteEfecto, PorcentajeRecaudo, PrecioLista, CodigoMArca, Marca, CodigoGama, Gama, CodigoModelo, AñoModelo, Modelo, CedulaVendedor, UPPER(NombreVendedor) AS NombreVendedor, 
                         ISNULL(ValorComision, 0) AS ValorComision, CASE WHEN ISNULL(ValorComision, 0) = 0 THEN 1 ELSE 0 END AS ModeloVehSinComision, 0 AS IdLiquidacion, 0 AS IdHistorico
FROM            (SELECT        dbo.vw_PorcentajeRecaudoVNFactura_Jefes.Ano_Recaudo, dbo.vw_PorcentajeRecaudoVNFactura_Jefes.Mes_Recaudo, dbo.vw_PorcentajeRecaudoVNFactura_Jefes.CodigoEmpresa, dbo.vw_PorcentajeRecaudoVNFactura_Jefes.Empresa, 
                                                    dbo.vw_PorcentajeRecaudoVNFactura_Jefes.CodigoCentro, dbo.vw_PorcentajeRecaudoVNFactura_Jefes.Centro, dbo.vw_PorcentajeRecaudoVNFactura_Jefes.FechaFactura, dbo.vw_PorcentajeRecaudoVNFactura_Jefes.NumeroFactura, dbo.vw_PorcentajeRecaudoVNFactura_Jefes.VIN, dbo.vw_PorcentajeRecaudoVNFactura_Jefes.TotalFactura, dbo.vw_PorcentajeRecaudoVNFactura_Jefes.TotalFacturaSinCuotaReteFuente,
                                                    dbo.vw_PorcentajeRecaudoVNFactura_Jefes.ImporteEfecto, dbo.vw_PorcentajeRecaudoVNFactura_Jefes.PorcentajeRecaudo, dbo.ComisionesSpigaVN.PrecioLista, dbo.ComisionesSpigaVN.CodigoMArca, dbo.ComisionesSpigaVN.Marca, 
                                                    dbo.ComisionesSpigaVN.CodigoGama, dbo.ComisionesSpigaVN.Gama, dbo.ComisionesSpigaVN.CodigoModelo, dbo.ComisionesSpigaVN.AñoModelo, dbo.ComisionesSpigaVN.Modelo, 
                                                    dbo.ComisionesSpigaVN.CedulaVendedor, dbo.ComisionesSpigaVN.NombreVendedor, dbo.VehiculosModelos.ValorComision, dbo.ComisionesSpigaVN.FechaEntregaCliente, 
                                                    dbo.vw_PorcentajeRecaudoVNFactura_Jefes.FechaRecaudo, 
                                                    CASE WHEN dbo.ComisionesSpigaVN.FechaEntregaCliente > dbo.vw_PorcentajeRecaudoVNFactura_Jefes.FechaRecaudo THEN dbo.ComisionesSpigaVN.FechaEntregaCliente ELSE dbo.vw_PorcentajeRecaudoVNFactura_Jefes.FechaRecaudo
                                                     END AS FechaPeriodo
                          FROM            dbo.vw_PorcentajeRecaudoVNFactura_Jefes INNER JOIN
                                                    dbo.ComisionesSpigaVN ON dbo.vw_PorcentajeRecaudoVNFactura_Jefes.NumeroFactura = dbo.ComisionesSpigaVN.NumeroFactura AND  dbo.vw_PorcentajeRecaudoVNFactura_Jefes.VIN = dbo.ComisionesSpigaVN.VIN AND
                                                    dbo.vw_PorcentajeRecaudoVNFactura_Jefes.CodigoEmpresa = dbo.ComisionesSpigaVN.CodigoEmpresaSugerido AND dbo.vw_PorcentajeRecaudoVNFactura_Jefes.CodigoCentro = dbo.ComisionesSpigaVN.CodigoCentro LEFT OUTER JOIN
                                                    dbo.VehiculosModelos ON dbo.ComisionesSpigaVN.CodigoGama = dbo.VehiculosModelos.CodigoGama AND dbo.ComisionesSpigaVN.CodigoMArca = dbo.VehiculosModelos.CodigoMarca AND 
                                                    dbo.ComisionesSpigaVN.CodigoModelo = dbo.VehiculosModelos.CodigoModelo AND dbo.ComisionesSpigaVN.AñoModelo = dbo.VehiculosModelos.AnoModelo) AS RESULTADO









```
