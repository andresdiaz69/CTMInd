# View: vw_AsesorComercialVehiculosUsadosPorComV2_2

## Usa los objetos:
- [[EmpleadosRangosMaestras]]
- [[RangosMaestras]]
- [[vw_AsesorComercialVehiculosUsadosPorComV2_1]]
- [[vw_RangosVersionesMaxSub]]

```sql







CREATE VIEW [dbo].[vw_AsesorComercialVehiculosUsadosPorComV2_2]
AS
SELECT        dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.Ano_Periodo, dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.Mes_Periodo, dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.Ano_Recaudo, dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.Mes_Recaudo, 
                         dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.FechaRecaudo, dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.FechaEntregaCliente, dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.FechaPeriodo, dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.CodigoEmpresa, 
                         dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.Empresa, dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.CodigoCentro, dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.Centro, dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.FechaFactura, 
                         dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.NumeroFactura, dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.VIN, dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.TotalFactura, dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.TotalFacturaSinCuotaReteFuente, 
                         dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.ImporteEfecto, dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.PorcentajeRecaudo, dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.PrecioLista, dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.ValorDto, 
                         dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.PrecioBaseComision, 
						 
						 dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.CodigoMArca, 
						 dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.Marca, 
						 dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.CodigoMarcaGrupo,                          
						 dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.MarcaGrupo, 
						 
						 dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.CodigoGama, dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.Gama, dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.CodigoModelo, 
                         dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.AñoModelo, dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.Modelo, dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.CedulaVendedor, dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.NombreVendedor, 
                         dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.IdLiquidacion, dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.IdHistorico, CANTIDAD.VehiculosRecaudados, dbo.vw_RangosVersionesMaxSub.IdRangoMaestra, 
                         dbo.vw_RangosVersionesMaxSub.IdRangoVersionMax, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
FROM            dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1 
						 INNER JOIN
                         dbo.EmpleadosRangosMaestras 
						 ON dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.CedulaVendedor = dbo.EmpleadosRangosMaestras.CodigoEmpleado 
						 INNER JOIN
                         dbo.vw_RangosVersionesMaxSub 
						 ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMaxSub.IdRangoMaestra 
						 INNER JOIN
                         dbo.RangosMaestras 
						 ON 
						 dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.RangosMaestras.IdRangoMaestra 
						 --CodigoMarcaGrupo NO APLICA PARA USADOS
						 --AND dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.CodigoMarcaGrupo = dbo.RangosMaestras.CodigoMarcaGrupo 
						 LEFT OUTER JOIN
                             (SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedor, COUNT(*) AS VehiculosRecaudados
                               FROM            dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1 AS vw_AsesorComercialVehiculosUsadosPorComV2_1_1
							   GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedor) AS CANTIDAD 
							   ON 
							   dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.Ano_Periodo = CANTIDAD.Ano_Periodo 
							   AND dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.Mes_Periodo = CANTIDAD.Mes_Periodo 
							   AND dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.CodigoEmpresa = CANTIDAD.CodigoEmpresa 
							   AND dbo.vw_AsesorComercialVehiculosUsadosPorComV2_1.CedulaVendedor = CANTIDAD.CedulaVendedor 
WHERE        
(dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub = 99) AND (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 184) 

```
