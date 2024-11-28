# View: vw_ComercialVNPorComV2_1_VN

## Usa los objetos:
- [[ComisionesSpigaVN]]
- [[VehiculosModelos]]
- [[vw_PorcentajeRecaudoVNFactura]]

```sql



CREATE VIEW [dbo].[vw_ComercialVNPorComV2_1_VN]
AS
SELECT        YEAR(FechaPeriodo) AS Ano_Periodo, MONTH(FechaPeriodo) AS Mes_Periodo, Ano_Recaudo, Mes_Recaudo, FechaRecaudo, FechaEntregaCliente, FechaPeriodo, CodigoEmpresa, Empresa, CodigoCentro, Centro, FechaFactura, 
                         NumeroFactura, VIN, TotalFactura, TotalFacturaSinCuotaReteFuente, ImporteEfecto, PorcentajeRecaudo, 
						 
						 ISNULL(PrecioLista, 0) AS PrecioLista,
						 ISNULL(ValorDto, 0) AS ValorDto,
						 ISNULL(ImporteImpuestos, 0) AS ImporteImpuestos,
						 ISNULL(PrecioLista, 0) - ISNULL(ValorDto, 0) AS PrecioBaseComision,						 
						 
						 CodigoMArca, Marca, CodigoGama, Gama, CodigoModelo, AñoModelo, Modelo, CedulaVendedor, UPPER(NombreVendedor) AS NombreVendedor, 
                         0 AS IdLiquidacion, 0 AS IdHistorico
FROM            (SELECT        dbo.vw_PorcentajeRecaudoVNFactura.Ano_Recaudo, dbo.vw_PorcentajeRecaudoVNFactura.Mes_Recaudo, dbo.vw_PorcentajeRecaudoVNFactura.CodigoEmpresa, dbo.vw_PorcentajeRecaudoVNFactura.Empresa, 
                                                    dbo.vw_PorcentajeRecaudoVNFactura.CodigoCentro, dbo.vw_PorcentajeRecaudoVNFactura.Centro, dbo.vw_PorcentajeRecaudoVNFactura.FechaFactura, dbo.vw_PorcentajeRecaudoVNFactura.NumeroFactura, dbo.vw_PorcentajeRecaudoVNFactura.VIN, dbo.vw_PorcentajeRecaudoVNFactura.TotalFactura, dbo.vw_PorcentajeRecaudoVNFactura.TotalFacturaSinCuotaReteFuente,
                                                    dbo.vw_PorcentajeRecaudoVNFactura.ImporteEfecto, dbo.vw_PorcentajeRecaudoVNFactura.PorcentajeRecaudo, 
													
													dbo.ComisionesSpigaVN.PrecioLista, 
													dbo.ComisionesSpigaVN.ValorDto,
													dbo.ComisionesSpigaVN.ImporteImpuestos,
													
													dbo.ComisionesSpigaVN.CodigoMArca, dbo.ComisionesSpigaVN.Marca, 
                                                    dbo.ComisionesSpigaVN.CodigoGama, dbo.ComisionesSpigaVN.Gama, dbo.ComisionesSpigaVN.CodigoModelo, dbo.ComisionesSpigaVN.AñoModelo, dbo.ComisionesSpigaVN.Modelo, 
                                                    dbo.ComisionesSpigaVN.CedulaVendedor, dbo.ComisionesSpigaVN.NombreVendedor, dbo.VehiculosModelos.ValorComision, dbo.ComisionesSpigaVN.FechaEntregaCliente, 
                                                    dbo.vw_PorcentajeRecaudoVNFactura.FechaRecaudo, 
                                                    CASE WHEN dbo.ComisionesSpigaVN.FechaEntregaCliente > dbo.vw_PorcentajeRecaudoVNFactura.FechaRecaudo THEN dbo.ComisionesSpigaVN.FechaEntregaCliente ELSE dbo.vw_PorcentajeRecaudoVNFactura.FechaRecaudo
                                                     END AS FechaPeriodo
                          FROM            dbo.vw_PorcentajeRecaudoVNFactura INNER JOIN
                                                    dbo.ComisionesSpigaVN ON dbo.vw_PorcentajeRecaudoVNFactura.NumeroFactura = dbo.ComisionesSpigaVN.NumeroFactura AND  dbo.vw_PorcentajeRecaudoVNFactura.VIN = dbo.ComisionesSpigaVN.VIN AND
                                                    dbo.vw_PorcentajeRecaudoVNFactura.CodigoEmpresa = dbo.ComisionesSpigaVN.CodigoEmpresaSugerido AND dbo.vw_PorcentajeRecaudoVNFactura.CodigoCentro = dbo.ComisionesSpigaVN.CodigoCentro LEFT OUTER JOIN
                                                    dbo.VehiculosModelos ON dbo.ComisionesSpigaVN.CodigoGama = dbo.VehiculosModelos.CodigoGama AND dbo.ComisionesSpigaVN.CodigoMArca = dbo.VehiculosModelos.CodigoMarca AND 
                                                    dbo.ComisionesSpigaVN.CodigoModelo = dbo.VehiculosModelos.CodigoModelo AND dbo.ComisionesSpigaVN.AñoModelo = dbo.VehiculosModelos.AnoModelo) AS RESULTADO








```
