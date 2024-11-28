# View: vw_PorcentajeRecaudoVNFacturaFull_V2

## Usa los objetos:
- [[ComisionesSpigaNotasCredito]]
- [[ComisionesSpigaVN]]
- [[ComisionesSpigaVNFactura]]
- [[Liquidaciones_ComercialVNPorCom_Detalle]]
- [[VehiculosVIN]]

```sql




CREATE VIEW [dbo].[vw_PorcentajeRecaudoVNFacturaFull_V2] AS 

SELECT        RESULTADO.Ano_Periodo AS Ano_Recaudo, RESULTADO.Mes_Periodo AS Mes_Recaudo, RESULTADO.Dia_Periodo AS Dia_Recaudo, DATEFROMPARTS(RESULTADO.Ano_Periodo, RESULTADO.Mes_Periodo, 
                         RESULTADO.Dia_Periodo) AS FechaRecaudo, RESULTADO.CodigoEmpresaSugerido AS CodigoEmpresa, RESULTADO.EmpresaSugerida AS Empresa, RESULTADO.CodigoCentro, RESULTADO.Centro, RESULTADO.FechaFactura, RESULTADO.NumeroFactura, 
                         RESULTADO.TotalFactura, RESULTADO.CuotaReteFuente, RESULTADO.TotalFactura - RESULTADO.CuotaReteFuente AS TotalFacturaSinCuotaReteFuente, RESULTADO.ImporteEfecto, RESULTADO.PorcentajeRecaudo, 
                         RESULTADO.VIN, RESULTADO.Nitcliente, RESULTADO.NombreCliente,
                             (SELECT        MAX(FechaEntregaCliente) AS FechaEntregaCliente
                               FROM            dbo.ComisionesSpigaVN
                               WHERE        (CodigoEmpresaSugerido = RESULTADO.CodigoEmpresaSugerido) AND (CodigoCentro = RESULTADO.CodigoCentro) AND (NumeroFactura = RESULTADO.NumeroFactura)) AS FechaEntregaCliente,
                             (SELECT        MAX(CedulaVendedor) AS CedulaVendedor
                               FROM            dbo.ComisionesSpigaVN AS ComisionesSpigaVN_1
                               WHERE        (CodigoEmpresaSugerido = RESULTADO.CodigoEmpresaSugerido) AND (CodigoCentro = RESULTADO.CodigoCentro) AND (NumeroFactura = RESULTADO.NumeroFactura)) AS CedulaVendedor,
                             (SELECT        MAX(NombreVendedor) AS NombreVendedor
                               FROM            dbo.ComisionesSpigaVN AS ComisionesSpigaVN_2
                               WHERE        (CodigoEmpresaSugerido = RESULTADO.CodigoEmpresaSugerido) AND (CodigoCentro = RESULTADO.CodigoCentro) AND (NumeroFactura = RESULTADO.NumeroFactura)) AS NombreVendedor,
                             (SELECT        MAX(Gama) AS Gama
                               FROM            dbo.ComisionesSpigaVN AS ComisionesSpigaVN_3
                               WHERE        (CodigoEmpresaSugerido = RESULTADO.CodigoEmpresaSugerido) AND (CodigoCentro = RESULTADO.CodigoCentro) AND (NumeroFactura = RESULTADO.NumeroFactura)) AS Gama,
                             (SELECT        MAX(Modelo) AS Modelo
                               FROM            dbo.ComisionesSpigaVN AS ComisionesSpigaVN_4
                               WHERE        (CodigoEmpresaSugerido = RESULTADO.CodigoEmpresaSugerido) AND (CodigoCentro = RESULTADO.CodigoCentro) AND (NumeroFactura = RESULTADO.NumeroFactura)) AS Modelo, 
							   (SELECT        MAX(TipoOportunidad) AS TipoOportunidad
                               FROM            dbo.ComisionesSpigaVN AS ComisionesSpigaVN_5
                               WHERE        (CodigoEmpresaSugerido = RESULTADO.CodigoEmpresaSugerido) AND (CodigoCentro = RESULTADO.CodigoCentro) AND (NumeroFactura = RESULTADO.NumeroFactura)) AS TipoOportunidad, 
							   (SELECT        MAX(Procedencia) AS Procedencia
                               FROM            dbo.ComisionesSpigaVN AS ComisionesSpigaVN_6
                               WHERE        (CodigoEmpresaSugerido = RESULTADO.CodigoEmpresaSugerido) AND (CodigoCentro = RESULTADO.CodigoCentro) AND (NumeroFactura = RESULTADO.NumeroFactura)) AS Procedencia, 
							   (SELECT        MAX(CodigoMarca) AS CodigoMarca
                               FROM            dbo.ComisionesSpigaVN AS ComisionesSpigaVN_6
                               WHERE        (CodigoEmpresaSugerido = RESULTADO.CodigoEmpresaSugerido) AND (CodigoCentro = RESULTADO.CodigoCentro) AND (NumeroFactura = RESULTADO.NumeroFactura)) AS CodigoMarca, 

                         dbo.ComisionesSpigaNotasCredito.NumeroNotaCredito, dbo.VehiculosVIN.ComisionRecaudoBloqueada, dbo.VehiculosVIN.ComisionProductividadBloqueada, VIN_PAGADOS.VIN AS VIN_Pagado
FROM            (SELECT        YEAR(MAX(DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1))) AS Ano_Periodo, MONTH(MAX(DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1))) AS Mes_Periodo, 1 AS Dia_Periodo, MAX(CodigoEmpresaSugerido) 
                                                    AS CodigoEmpresaSugerido, MAX(EmpresaSugerida) AS EmpresaSugerida, MAX(CodigoCentro) AS CodigoCentro, MAX(Centro) AS Centro, MAX(FechaFactura) AS FechaFactura, MAX(NumeroFactura) AS NumeroFactura, MAX(TotalFactura) 
                                                    AS TotalFactura, ISNULL(MAX(CuotaReteFuente), 0) AS CuotaReteFuente, SUM(ImporteEfecto) AS ImporteEfecto, CASE WHEN (MAX(TotalFactura) - ISNULL(MAX(CuotaReteFuente), 0)) <> 0 THEN SUM(ImporteEfecto) 
                                                    * 100 / (MAX(TotalFactura) - ISNULL(MAX(CuotaReteFuente), 0)) ELSE 0 END AS PorcentajeRecaudo, MAX(VIN) AS VIN, MAX(Nitcliente) AS Nitcliente, MAX(NombreCliente) AS NombreCliente
                          FROM            dbo.ComisionesSpigaVNFactura
                          GROUP BY CodigoEmpresaSugerido, EmpresaSugerida, CodigoCentro, FechaFactura, NumeroFactura, VIN) AS RESULTADO LEFT OUTER JOIN
                             (SELECT DISTINCT VIN
                               FROM            dbo.Liquidaciones_ComercialVNPorCom_Detalle
                               WHERE        (VIN IS NOT NULL)) AS VIN_PAGADOS ON RESULTADO.VIN = VIN_PAGADOS.VIN LEFT OUTER JOIN
                         dbo.VehiculosVIN ON RESULTADO.VIN = dbo.VehiculosVIN.VIN LEFT OUTER JOIN
                         
						 dbo.ComisionesSpigaNotasCredito ON 
						 RESULTADO.CodigoEmpresaSugerido = dbo.ComisionesSpigaNotasCredito.CodigoEmpresaSugerido 
						 AND RESULTADO.CodigoCentro = dbo.ComisionesSpigaNotasCredito.CodigoCentro 
						 AND RESULTADO.NumeroFactura = dbo.ComisionesSpigaNotasCredito.NumeroFactura
						 AND RESULTADO.VIN = dbo.ComisionesSpigaNotasCredito.VIN


```
