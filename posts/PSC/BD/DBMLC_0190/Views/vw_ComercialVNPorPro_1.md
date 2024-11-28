# View: vw_ComercialVNPorPro_1

## Usa los objetos:
- [[ComisionesSpigaNotasCredito]]
- [[vw_ComercialVNPorPro_1_VN]]
- [[vw_ComercialVNPorPro_1_VOVN]]

```sql

CREATE VIEW [dbo].[vw_ComercialVNPorPro_1]
AS
SELECT        RESULTADO.Ano_Periodo, RESULTADO.Mes_Periodo, RESULTADO.Codigoempresa, RESULTADO.Empresa, RESULTADO.CedulaVendedor, RESULTADO.NombreVendedor, RESULTADO.CodigoEmpleado, 
                         RESULTADO.FechaRetiro, RESULTADO.IdRangoMaestra, RESULTADO.IdRangoVersionMax, RESULTADO.NumerEntregasMax, RESULTADO.NumerEntregas, RESULTADO.NumerEntregas_VehUtil, RESULTADO.CodigoCentro, RESULTADO.Centro, 
                         RESULTADO.FechaFactura, RESULTADO.FechaEntregaCliente, RESULTADO.TotalFactura, RESULTADO.Marca, RESULTADO.Gama, RESULTADO.CodigoModelo, RESULTADO.nombreTercero, 
                         RESULTADO.NumeroFactura, RESULTADO.VIN, RESULTADO.EntregaEfectiva, RESULTADO.IdLiquidacion, RESULTADO.IdHistorico, dbo.ComisionesSpigaNotasCredito.FechaNotaCredito
FROM            (SELECT        Ano_Periodo, Mes_Periodo, Codigoempresa, Empresa, CedulaVendedor, NombreVendedor, CodigoEmpleado, FechaRetiro, IdRangoMaestra, IdRangoVersionMax, NumerEntregasMax, 
                                                    NumerEntregas, NumerEntregas_VehUtil, CodigoCentro, Centro, FechaFactura, FechaEntregaCliente, TotalFactura, Marca, Gama, CodigoModelo, nombreTercero, NumeroFactura, VIN, EntregaEfectiva, IdLiquidacion, 
                                                    IdHistorico
                          FROM            dbo.vw_ComercialVNPorPro_1_VN
                          UNION ALL
                          SELECT        Ano_Periodo, Mes_Periodo, Codigoempresa, Empresa, CedulaVendedor, NombreVendedor, CodigoEmpleado, FechaRetiro, IdRangoMaestra, IdRangoVersionMax, NumerEntregasMax, 
                                                   NumerEntregas, NumerEntregas_VehUtil, CodigoCentro, Centro, FechaFactura, FechaEntregaCliente, TotalFactura, Marca, Gama, CodigoModelo, nombreTercero, NumeroFactura, VIN, EntregaEfectiva, IdLiquidacion, 
                                                   IdHistorico
                          FROM            dbo.vw_ComercialVNPorPro_1_VOVN) AS RESULTADO LEFT OUTER JOIN
                         
						 dbo.ComisionesSpigaNotasCredito 
						 ON RESULTADO.Codigoempresa = dbo.ComisionesSpigaNotasCredito.CodigoEmpresaSugerido 
						 AND RESULTADO.CodigoCentro = dbo.ComisionesSpigaNotasCredito.CodigoCentro 
						 AND RESULTADO.NumeroFactura = dbo.ComisionesSpigaNotasCredito.NumeroFactura
						 AND RESULTADO.VIN = dbo.ComisionesSpigaNotasCredito.VIN

WHERE        (dbo.ComisionesSpigaNotasCredito.FechaNotaCredito IS NULL)

```
