# View: vw_ComercialVNPorCom_1_Jefes_VC_Calle80

## Usa los objetos:
- [[vw_ComercialVNPorCom_1_VN_Jefes]]
- [[vw_ComercialVNPorCom_1_VOVN_Jefes]]

```sql

CREATE VIEW [dbo].[vw_ComercialVNPorCom_1_Jefes_VC_Calle80] AS

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

WHERE NOT (CodigoMArca = 263 and CodigoGama = 13 and Gama = 'FE' and CodigoModelo = 'FE85DE6SLNQACO1-BUS')
and NOT (CodigoMArca = 317 and CodigoGama = 18 and Gama = 'OH' and CodigoModelo = '9BM368006')
and NOT (CodigoMArca = 317 and CodigoGama = 15 and Gama = 'O500' and CodigoModelo = '9BM381898')
and NOT (CodigoMArca = 317 and CodigoGama = 3 and Gama = 'ATEGO' and CodigoModelo = 'WDB970047')
and NOT (CodigoMArca = 317 and CodigoGama = 3 and Gama = 'ATEGO' and CodigoModelo = 'WDB970047EXCKDBUS')
and NOT (CodigoMArca = 317 and CodigoGama = 3 and Gama = 'ATEGO' and CodigoModelo = '97001352CO1')
and NOT (CodigoMArca = 317 and CodigoGama = 17 and Gama = 'OF' and CodigoModelo = '9BM384223')
and NOT (CodigoMArca = 317 and CodigoGama = 3 and Gama = 'ATEGO' and CodigoModelo = 'WDB970013EXCKDBUS')
and NOT (CodigoMArca = 317 and CodigoGama = 3 and Gama = 'ATEGO' and CodigoModelo = '97004752CO1')
and NOT (CodigoMArca = 317 and CodigoGama = 16 and Gama = 'LO' and CodigoModelo = '97927651CO1')
and NOT (CodigoMArca = 317 and CodigoGama = 17 and Gama = 'OF' and CodigoModelo = '38422311CO1')
and NOT (CodigoMArca = 317 and CodigoGama = 17 and Gama = 'OF' and CodigoModelo = '38422351CO1')
and NOT (CodigoMArca = 317 and CodigoGama = 15 and Gama = 'O500' and CodigoModelo = '63401151CO1')
and NOT (CodigoMArca = 317 and CodigoGama = 16 and Gama = 'LO' and CodigoModelo = '97927751CO1')
and NOT (CodigoMArca = 317 and CodigoGama = 17 and Gama = 'OF' and CodigoModelo = 'OF917')
and NOT (CodigoMArca = 317 and CodigoGama = 18 and Gama = 'OH' and CodigoModelo = '36800651CO1')
and NOT (CodigoMArca = 317 and CodigoGama = 17 and Gama = 'OF' and CodigoModelo = '83100211CO1')
and NOT (CodigoMArca = 317 and CodigoGama = 15 and Gama = 'O500' and CodigoModelo = '63401111CO1-ABA')
and NOT (CodigoMArca = 317 and CodigoGama = 18 and Gama = 'OH' and CodigoModelo = '36800611CO1')
and NOT (CodigoMArca = 317 and CodigoGama = 18 and Gama = 'OH' and CodigoModelo = '36810411CO1')
and NOT (CodigoMArca = 317 and CodigoGama = 15 and Gama = 'O500' and CodigoModelo = '63401111CO1')
and NOT (CodigoMArca = 317 and CodigoGama = 16 and Gama = 'LO' and CodigoModelo = '97927751CO1-45')
and NOT (CodigoMArca = 317 and CodigoGama = 17 and Gama = 'OF' and CodigoModelo = '83100211CO1')


```
