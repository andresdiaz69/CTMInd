# View: vw_ComercialVNPorCom_1_Jefes

## Usa los objetos:
- [[vw_ComercialVNPorCom_1_VN_Jefes]]
- [[vw_ComercialVNPorCom_1_VOVN_Jefes]]

```sql


CREATE VIEW [dbo].[vw_ComercialVNPorCom_1_Jefes_OLD]
AS
SELECT        Ano_Periodo, Mes_Periodo, Ano_Recaudo, Mes_Recaudo, FechaRecaudo, FechaEntregaCliente, FechaPeriodo, CodigoEmpresa, Empresa, CodigoCentro, Centro, FechaFactura, NumeroFactura, VIN, TotalFactura, 
                         TotalFacturaSinCuotaReteFuente, ImporteEfecto, PorcentajeRecaudo, PrecioLista, CodigoMArca, Marca, CodigoGama, Gama, CodigoModelo, AñoModelo, Modelo, CedulaVendedor, NombreVendedor, ValorComision, 
                         ModeloVehSinComision, IdLiquidacion, IdHistorico
FROM            (SELECT        Ano_Periodo, Mes_Periodo, Ano_Recaudo, Mes_Recaudo, FechaRecaudo, FechaEntregaCliente, FechaPeriodo, CodigoEmpresa, Empresa, CodigoCentro, Centro, FechaFactura, NumeroFactura, VIN, TotalFactura, 
                                                    TotalFacturaSinCuotaReteFuente, ImporteEfecto, PorcentajeRecaudo, PrecioLista, 
													
													--LA MARCA Volkswagen Comerciales LA VUELVE Volkswagen
													CASE 
													WHEN CodigoMArca = 6 THEN 2
													ELSE CodigoMArca
													END AS CodigoMArca,
													
													CASE 
													WHEN CodigoMArca = 6 THEN 'Volkswagen'
													ELSE Marca
													END AS Marca,
													
													CodigoGama, Gama, CodigoModelo, AñoModelo, Modelo, CedulaVendedor, NombreVendedor, ValorComision, 
                                                    ModeloVehSinComision, IdLiquidacion, IdHistorico
                          FROM            dbo.vw_ComercialVNPorCom_1_VN_Jefes
                          UNION ALL
                          SELECT        Ano_Periodo, Mes_Periodo, Ano_Recaudo, Mes_Recaudo, FechaRecaudo, FechaEntregaCliente, FechaPeriodo, CodigoEmpresa, Empresa, CodigoCentro, Centro, FechaFactura, NumeroFactura, VIN, TotalFactura, 
                                                   TotalFacturaSinCuotaReteFuente, ImporteEfecto, PorcentajeRecaudo, PrecioLista, 
												   
												    --LA MARCA Volkswagen Comerciales LA VUELVE Volkswagen
													CASE 
													WHEN CodigoMArca = 6 THEN 2
													ELSE CodigoMArca
													END AS CodigoMArca,
													
													CASE 
													WHEN CodigoMArca = 6 THEN 'Volkswagen'
													ELSE Marca
													END AS Marca,
												   
												   CodigoGama, Gama, CodigoModelo, AñoModelo, Modelo, CedulaVendedor, NombreVendedor, ValorComision, 
                                                   ModeloVehSinComision, IdLiquidacion, IdHistorico
                          FROM            dbo.vw_ComercialVNPorCom_1_VOVN_Jefes) AS INFO_ORIGINAL

```
