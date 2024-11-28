# View: vw_ComercialVNPorComV2_1_VOVN

## Usa los objetos:
- [[ComisionesSpigaVO]]
- [[VehiculosModelos]]
- [[vw_PorcentajeRecaudoVOVNFactura]]

```sql



CREATE VIEW [dbo].[vw_ComercialVNPorComV2_1_VOVN]
AS
SELECT        YEAR(FechaPeriodo) AS Ano_Periodo, MONTH(FechaPeriodo) AS Mes_Periodo, Ano_Recaudo, Mes_Recaudo, FechaRecaudo, FechaEntregaCliente, FechaPeriodo, CodigoEmpresa, Empresa, CodigoCentro, Centro, FechaFactura, 
                         NumeroFactura, VIN, TotalFactura, TotalFacturaSinCuotaReteFuente, ImporteEfecto, PorcentajeRecaudo, 
						 
						 ISNULL(PrecioLista, 0) AS PrecioLista,
						 ISNULL(ValorDto, 0) AS ValorDto,
						 ISNULL(ImporteImpuestos, 0) AS ImporteImpuestos,		
						 --JCS:2024/03/11 - AJUSTADA LA FORMULA BASE DE LA COMISION
						 ISNULL(TotalFactura, 0) - ISNULL(ImporteImpuestos, 0) AS PrecioBaseComision, 
						 
						 CodigoMArca, Marca, CodigoGama, Gama, CodigoModelo, AñoModelo, Modelo, CedulaVendedor, UPPER(NombreVendedor) AS NombreVendedor, 
                         0 AS IdLiquidacion, 0 AS IdHistorico
FROM            (SELECT        dbo.vw_PorcentajeRecaudoVOVNFactura.Ano_Recaudo, dbo.vw_PorcentajeRecaudoVOVNFactura.Mes_Recaudo, dbo.vw_PorcentajeRecaudoVOVNFactura.CodigoEmpresa, 
                                                    dbo.vw_PorcentajeRecaudoVOVNFactura.Empresa, dbo.vw_PorcentajeRecaudoVOVNFactura.CodigoCentro, dbo.vw_PorcentajeRecaudoVOVNFactura.Centro, dbo.vw_PorcentajeRecaudoVOVNFactura.FechaFactura, 
                                                    dbo.vw_PorcentajeRecaudoVOVNFactura.NumeroFactura, dbo.vw_PorcentajeRecaudoVOVNFactura.VIN, dbo.vw_PorcentajeRecaudoVOVNFactura.TotalFactura, dbo.vw_PorcentajeRecaudoVOVNFactura.TotalFacturaSinCuotaReteFuente,
													dbo.vw_PorcentajeRecaudoVOVNFactura.ImporteEfecto, 
                                                    dbo.vw_PorcentajeRecaudoVOVNFactura.PorcentajeRecaudo, 
													
													dbo.ComisionesSpigaVO.PrecioLista, 
													dbo.ComisionesSpigaVO.ValorDto,
													dbo.ComisionesSpigaVO.ImporteImpuestos,
													
													dbo.ComisionesSpigaVO.CodigoMArca, dbo.ComisionesSpigaVO.Marca, dbo.ComisionesSpigaVO.CodigoGama, dbo.ComisionesSpigaVO.Gama, 
                                                    dbo.ComisionesSpigaVO.CodigoModelo, dbo.ComisionesSpigaVO.AñoModelo, dbo.ComisionesSpigaVO.Modelo, dbo.ComisionesSpigaVO.CedulaVendedor, dbo.ComisionesSpigaVO.NombreVendedor, 
                                                    dbo.VehiculosModelos.ValorComision, dbo.ComisionesSpigaVO.FechaEntregaCliente, dbo.vw_PorcentajeRecaudoVOVNFactura.FechaRecaudo, 
                                                    CASE WHEN dbo.ComisionesSpigaVO.FechaEntregaCliente > dbo.vw_PorcentajeRecaudoVOVNFactura.FechaRecaudo THEN dbo.ComisionesSpigaVO.FechaEntregaCliente ELSE dbo.vw_PorcentajeRecaudoVOVNFactura.FechaRecaudo
                                                     END AS FechaPeriodo
                          FROM            dbo.vw_PorcentajeRecaudoVOVNFactura INNER JOIN
                                                    dbo.ComisionesSpigaVO ON dbo.vw_PorcentajeRecaudoVOVNFactura.NumeroFactura = dbo.ComisionesSpigaVO.NumeroFactura AND dbo.vw_PorcentajeRecaudoVOVNFactura.VIN = dbo.ComisionesSpigaVO.VIN AND 
                                                    dbo.vw_PorcentajeRecaudoVOVNFactura.CodigoEmpresa = dbo.ComisionesSpigaVO.CodigoEmpresaSugerido AND 
                                                    dbo.vw_PorcentajeRecaudoVOVNFactura.CodigoCentro = dbo.ComisionesSpigaVO.CodigoCentro LEFT OUTER JOIN
                                                    dbo.VehiculosModelos ON dbo.ComisionesSpigaVO.CodigoGama = dbo.VehiculosModelos.CodigoGama AND dbo.ComisionesSpigaVO.CodigoMArca = dbo.VehiculosModelos.CodigoMarca AND 
                                                    dbo.ComisionesSpigaVO.CodigoModelo = dbo.VehiculosModelos.CodigoModelo AND dbo.ComisionesSpigaVO.AñoModelo = dbo.VehiculosModelos.AnoModelo) AS RESULTADO







```
