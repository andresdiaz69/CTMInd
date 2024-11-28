# View: vw_ComercialVNPorComV2_2

## Usa los objetos:
- [[EmpleadosRangosMaestras]]
- [[RangosMaestras]]
- [[vw_ComercialVNPorComV2_1]]
- [[vw_RangosVersionesMaxSub]]

```sql

CREATE VIEW [dbo].[vw_ComercialVNPorComV2_2]
AS
SELECT        dbo.vw_ComercialVNPorComV2_1.Ano_Periodo, dbo.vw_ComercialVNPorComV2_1.Mes_Periodo, dbo.vw_ComercialVNPorComV2_1.Ano_Recaudo, dbo.vw_ComercialVNPorComV2_1.Mes_Recaudo, 
                         dbo.vw_ComercialVNPorComV2_1.FechaRecaudo, dbo.vw_ComercialVNPorComV2_1.FechaEntregaCliente, dbo.vw_ComercialVNPorComV2_1.FechaPeriodo, dbo.vw_ComercialVNPorComV2_1.CodigoEmpresa, 
                         dbo.vw_ComercialVNPorComV2_1.Empresa, dbo.vw_ComercialVNPorComV2_1.CodigoCentro, dbo.vw_ComercialVNPorComV2_1.Centro, dbo.vw_ComercialVNPorComV2_1.FechaFactura, 
                         dbo.vw_ComercialVNPorComV2_1.NumeroFactura, dbo.vw_ComercialVNPorComV2_1.VIN, dbo.vw_ComercialVNPorComV2_1.TotalFactura, dbo.vw_ComercialVNPorComV2_1.TotalFacturaSinCuotaReteFuente, 
                         dbo.vw_ComercialVNPorComV2_1.ImporteEfecto, dbo.vw_ComercialVNPorComV2_1.PorcentajeRecaudo, dbo.vw_ComercialVNPorComV2_1.PrecioLista, dbo.vw_ComercialVNPorComV2_1.ValorDto, 
                         dbo.vw_ComercialVNPorComV2_1.PrecioBaseComision, 
						 
						 dbo.vw_ComercialVNPorComV2_1.CodigoMArca, 
						 dbo.vw_ComercialVNPorComV2_1.Marca, 
						 dbo.vw_ComercialVNPorComV2_1.CodigoMarcaGrupo,                          
						 dbo.vw_ComercialVNPorComV2_1.MarcaGrupo, 
						 
						 dbo.vw_ComercialVNPorComV2_1.CodigoGama, dbo.vw_ComercialVNPorComV2_1.Gama, dbo.vw_ComercialVNPorComV2_1.CodigoModelo, 
                         dbo.vw_ComercialVNPorComV2_1.AñoModelo, dbo.vw_ComercialVNPorComV2_1.Modelo, dbo.vw_ComercialVNPorComV2_1.CedulaVendedor, dbo.vw_ComercialVNPorComV2_1.NombreVendedor, 
                         dbo.vw_ComercialVNPorComV2_1.IdLiquidacion, dbo.vw_ComercialVNPorComV2_1.IdHistorico, CANTIDAD.VehiculosRecaudados, dbo.vw_RangosVersionesMaxSub.IdRangoMaestra, 
                         dbo.vw_RangosVersionesMaxSub.IdRangoVersionMax, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
FROM            dbo.vw_ComercialVNPorComV2_1 
						 INNER JOIN
                         dbo.EmpleadosRangosMaestras 
						 ON dbo.vw_ComercialVNPorComV2_1.CedulaVendedor = dbo.EmpleadosRangosMaestras.CodigoEmpleado 
						 INNER JOIN
                         dbo.vw_RangosVersionesMaxSub 
						 ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMaxSub.IdRangoMaestra 
						 INNER JOIN
                         dbo.RangosMaestras 
						 ON 
						 dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.RangosMaestras.IdRangoMaestra 
						 AND dbo.vw_ComercialVNPorComV2_1.CodigoMarcaGrupo = dbo.RangosMaestras.CodigoMarcaGrupo 
						 LEFT OUTER JOIN
                             (SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedor, CodigoMarcaGrupo, COUNT(*) AS VehiculosRecaudados
                               FROM            dbo.vw_ComercialVNPorComV2_1 AS vw_ComercialVNPorComV2_1_1
                               GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedor, CodigoMarcaGrupo) AS CANTIDAD 
							   ON 
							   dbo.vw_ComercialVNPorComV2_1.Ano_Periodo = CANTIDAD.Ano_Periodo 
							   AND dbo.vw_ComercialVNPorComV2_1.Mes_Periodo = CANTIDAD.Mes_Periodo 
							   AND dbo.vw_ComercialVNPorComV2_1.CodigoEmpresa = CANTIDAD.CodigoEmpresa 
							   AND dbo.vw_ComercialVNPorComV2_1.CedulaVendedor = CANTIDAD.CedulaVendedor 
							   AND dbo.vw_ComercialVNPorComV2_1.CodigoMarcaGrupo = CANTIDAD.CodigoMarcaGrupo
WHERE        
(dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub = 95) AND (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 178) 
OR
(dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub = 96) AND (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 180)

```
