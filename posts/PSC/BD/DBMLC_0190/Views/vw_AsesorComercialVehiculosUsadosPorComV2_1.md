# View: vw_AsesorComercialVehiculosUsadosPorComV2_1

## Usa los objetos:
- [[VehiculosMarcas]]
- [[VehiculosMarcasGrupos]]
- [[vw_AsesorComercialVehiculosUsadosPorComV2_1_EQ]]
- [[vw_AsesorComercialVehiculosUsadosPorComV2_1_VO]]

```sql


















CREATE VIEW [dbo].[vw_AsesorComercialVehiculosUsadosPorComV2_1]
AS

SELECT        BASE.Ano_Periodo, BASE.Mes_Periodo, BASE.Ano_Recaudo, BASE.Mes_Recaudo, BASE.FechaRecaudo, BASE.FechaEntregaCliente, BASE.FechaPeriodo, BASE.CodigoEmpresa, BASE.Empresa, BASE.CodigoCentro, 
                         BASE.Centro, BASE.FechaFactura, BASE.NumeroFactura, BASE.VIN, BASE.TotalFactura, BASE.TotalFacturaSinCuotaReteFuente, BASE.ImporteEfecto, BASE.PorcentajeRecaudo, BASE.PrecioLista, BASE.ValorDto, 
                         BASE.PrecioBaseComision, 
						 
						 BASE.CodigoMArca, 
						 BASE.Marca, 
						 VehiculosMarcasGrupos.CodigoMarcaGrupo, 
						 VehiculosMarcasGrupos.MarcaGrupo,
						 
						 BASE.CodigoGama, BASE.Gama, BASE.CodigoModelo, BASE.AñoModelo, BASE.Modelo, BASE.CedulaVendedor, BASE.NombreVendedor, BASE.IdLiquidacion, 
                         BASE.IdHistorico

FROM            VehiculosMarcasGrupos 
				INNER JOIN
                VehiculosMarcas 
				ON 
				VehiculosMarcasGrupos.CodigoMarcaGrupo = VehiculosMarcas.CodigoMarcaGrupo 
				RIGHT OUTER JOIN

                             (SELECT        Ano_Periodo, Mes_Periodo, Ano_Recaudo, Mes_Recaudo, FechaRecaudo, FechaEntregaCliente, FechaPeriodo, CodigoEmpresa, Empresa, CodigoCentro, Centro, FechaFactura, NumeroFactura, VIN, TotalFactura, 
                                                         TotalFacturaSinCuotaReteFuente, ImporteEfecto, PorcentajeRecaudo, PrecioLista, ValorDto, PrecioBaseComision, CodigoMArca, Marca, CodigoGama, Gama, CodigoModelo, AñoModelo, Modelo, CedulaVendedor, 
                                                         NombreVendedor, IdLiquidacion, IdHistorico
                               FROM            vw_AsesorComercialVehiculosUsadosPorComV2_1_VO
                               UNION ALL
                               SELECT        Ano_Periodo, Mes_Periodo, Ano_Recaudo, Mes_Recaudo, FechaRecaudo, FechaEntregaCliente, FechaPeriodo, CodigoEmpresa, Empresa, CodigoCentro, Centro, FechaFactura, NumeroFactura, VIN, TotalFactura, 
                                                        TotalFacturaSinCuotaReteFuente, ImporteEfecto, PorcentajeRecaudo, PrecioLista, ValorDto, PrecioBaseComision, CodigoMArca, Marca, CodigoGama, Gama, CodigoModelo, AñoModelo, Modelo, CedulaVendedor, 
                                                        NombreVendedor, IdLiquidacion, IdHistorico
                               FROM            vw_AsesorComercialVehiculosUsadosPorComV2_1_EQ
							   ) 
							   AS BASE 
							   ON VehiculosMarcas.CodigoMarca = BASE.CodigoMArca






```
