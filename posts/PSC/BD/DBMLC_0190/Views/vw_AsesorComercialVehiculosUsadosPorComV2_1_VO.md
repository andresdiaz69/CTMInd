# View: vw_AsesorComercialVehiculosUsadosPorComV2_1_VO

## Usa los objetos:
- [[ComisionesSpigaVO]]
- [[VehiculosModelos]]
- [[vw_PorcentajeRecaudoVOFactura]]

```sql


















CREATE VIEW [dbo].[vw_AsesorComercialVehiculosUsadosPorComV2_1_VO]
AS
SELECT        YEAR(FechaPeriodo) AS Ano_Periodo, MONTH(FechaPeriodo) AS Mes_Periodo, Ano_Recaudo, Mes_Recaudo, FechaRecaudo, FechaEntregaCliente, FechaPeriodo, CodigoEmpresa, Empresa, CodigoCentro, Centro, FechaFactura, 
                         NumeroFactura, VIN, TotalFactura, TotalFacturaSinCuotaReteFuente, ImporteEfecto, PorcentajeRecaudo, 
						 
						 ISNULL(PrecioLista, 0) AS PrecioLista,
						 ISNULL(ValorDto, 0) AS ValorDto,
						 ISNULL(ImporteImpuestos, 0) AS ImporteImpuestos,
						 ISNULL(TotalFactura, 0) - ISNULL(ImporteImpuestos, 0) AS PrecioBaseComision, 
						 
						 CodigoMArca, Marca, CodigoGama, Gama, CodigoModelo, AñoModelo, Modelo, CedulaVendedor, UPPER(NombreVendedor) AS NombreVendedor, 
                         0 AS IdLiquidacion, 0 AS IdHistorico
FROM            (SELECT        dbo.vw_PorcentajeRecaudoVOFactura.Ano_Recaudo, dbo.vw_PorcentajeRecaudoVOFactura.Mes_Recaudo, dbo.vw_PorcentajeRecaudoVOFactura.CodigoEmpresa, 
                                                    dbo.vw_PorcentajeRecaudoVOFactura.Empresa, dbo.vw_PorcentajeRecaudoVOFactura.CodigoCentro, dbo.vw_PorcentajeRecaudoVOFactura.Centro, dbo.vw_PorcentajeRecaudoVOFactura.FechaFactura, 
                                                    dbo.vw_PorcentajeRecaudoVOFactura.NumeroFactura, dbo.vw_PorcentajeRecaudoVOFactura.VIN, dbo.vw_PorcentajeRecaudoVOFactura.TotalFactura, dbo.vw_PorcentajeRecaudoVOFactura.TotalFacturaSinCuotaReteFuente,
													dbo.vw_PorcentajeRecaudoVOFactura.ImporteEfecto, 
                                                    dbo.vw_PorcentajeRecaudoVOFactura.PorcentajeRecaudo, 
													
													dbo.ComisionesSpigaVO.PrecioLista, 
													dbo.ComisionesSpigaVO.ValorDto,
													dbo.ComisionesSpigaVO.ImporteImpuestos,
													
													dbo.ComisionesSpigaVO.CodigoMArca, dbo.ComisionesSpigaVO.Marca, dbo.ComisionesSpigaVO.CodigoGama, dbo.ComisionesSpigaVO.Gama, 
                                                    dbo.ComisionesSpigaVO.CodigoModelo, dbo.ComisionesSpigaVO.AñoModelo, dbo.ComisionesSpigaVO.Modelo, dbo.ComisionesSpigaVO.CedulaVendedor, dbo.ComisionesSpigaVO.NombreVendedor, 
                                                    dbo.VehiculosModelos.ValorComision, dbo.ComisionesSpigaVO.FechaEntregaCliente, dbo.vw_PorcentajeRecaudoVOFactura.FechaRecaudo, 
                                                    CASE WHEN dbo.ComisionesSpigaVO.FechaEntregaCliente > dbo.vw_PorcentajeRecaudoVOFactura.FechaRecaudo THEN dbo.ComisionesSpigaVO.FechaEntregaCliente ELSE dbo.vw_PorcentajeRecaudoVOFactura.FechaRecaudo
                                                     END AS FechaPeriodo
                          FROM            dbo.vw_PorcentajeRecaudoVOFactura INNER JOIN
                                                    dbo.ComisionesSpigaVO ON dbo.vw_PorcentajeRecaudoVOFactura.NumeroFactura = dbo.ComisionesSpigaVO.NumeroFactura AND dbo.vw_PorcentajeRecaudoVOFactura.VIN = dbo.ComisionesSpigaVO.VIN AND 
                                                    dbo.vw_PorcentajeRecaudoVOFactura.CodigoEmpresa = dbo.ComisionesSpigaVO.CodigoEmpresaSugerido AND 
                                                    dbo.vw_PorcentajeRecaudoVOFactura.CodigoCentro = dbo.ComisionesSpigaVO.CodigoCentro LEFT OUTER JOIN
                                                    dbo.VehiculosModelos ON dbo.ComisionesSpigaVO.CodigoGama = dbo.VehiculosModelos.CodigoGama AND dbo.ComisionesSpigaVO.CodigoMArca = dbo.VehiculosModelos.CodigoMarca AND 
                                                    dbo.ComisionesSpigaVO.CodigoModelo = dbo.VehiculosModelos.CodigoModelo AND dbo.ComisionesSpigaVO.AñoModelo = dbo.VehiculosModelos.AnoModelo) AS RESULTADO

--JCS:2024/03/07 -- RESTRICCIÓN PAARA QUE NO SE CRUCEN VEHÍCULOS CON LA V1
WHERE FechaEntregaCliente >= '20240201'



```
