# View: vw_RepuestosV2_Bolsas_Vendedores_Liquidacion

## Usa los objetos:
- [[ExogenasDiasLaborados]]
- [[vw_RangosMaestrasFull]]
- [[vw_RepuestosV2_Bolsas_Vendedores_4]]

```sql









CREATE VIEW [dbo].[vw_RepuestosV2_Bolsas_Vendedores_Liquidacion]
AS
SELECT

dbo.vw_RepuestosV2_Bolsas_Vendedores_4.Ano_Periodo, dbo.vw_RepuestosV2_Bolsas_Vendedores_4.Mes_Periodo, dbo.vw_RepuestosV2_Bolsas_Vendedores_4.CodigoEmpresa, 
                         dbo.vw_RepuestosV2_Bolsas_Vendedores_4.CedulaVendedorRepuestos, dbo.vw_RepuestosV2_Bolsas_Vendedores_4.CodigoEmpleado, dbo.vw_RepuestosV2_Bolsas_Vendedores_4.Empleado, 
                         dbo.vw_RepuestosV2_Bolsas_Vendedores_4.FechaRetiro, dbo.vw_RepuestosV2_Bolsas_Vendedores_4.ValorBaseComision, dbo.vw_RepuestosV2_Bolsas_Vendedores_4.ValorBaseTotal, 
                         dbo.vw_RepuestosV2_Bolsas_Vendedores_4.CodigoCentro, dbo.vw_RepuestosV2_Bolsas_Vendedores_4.NombreCentro, dbo.vw_RepuestosV2_Bolsas_Vendedores_4.cod_marca, 
                         dbo.vw_RepuestosV2_Bolsas_Vendedores_4.nombre_marca, dbo.vw_RepuestosV2_Bolsas_Vendedores_4.CodigoCargo, dbo.vw_RepuestosV2_Bolsas_Vendedores_4.NombreCargo, 
                         dbo.vw_RepuestosV2_Bolsas_Vendedores_4.Participacion, dbo.vw_RepuestosV2_Bolsas_Vendedores_4.ValorBolsa, dbo.vw_RepuestosV2_Bolsas_Vendedores_4.Faltantes, 
                         dbo.vw_RepuestosV2_Bolsas_Vendedores_4.PesoBolsaVendedor, dbo.vw_RepuestosV2_Bolsas_Vendedores_4.TopeMaximoBolsa, dbo.vw_RepuestosV2_Bolsas_Vendedores_4.ValorBolsaVendedor, 
                         
						 dbo.vw_RepuestosV2_Bolsas_Vendedores_4.Comision AS Comision_AntesDiasLaborados, 
						 ISNULL(dbo.ExogenasDiasLaborados.DiasLaborados, 0) AS DiasLaborados, 
						 CASE WHEN ISNULL(dbo.ExogenasDiasLaborados.DiasLaborados, 0) = 0 THEN 0
						 ELSE (dbo.vw_RepuestosV2_Bolsas_Vendedores_4.Comision / 30) * ISNULL(dbo.ExogenasDiasLaborados.DiasLaborados, 0)
						 END AS Comision,

						 --JCS - 2022/08/08: NECESARIO PARA PODER FILTRAR DESDE .NET
						 dbo.vw_RangosMaestrasFull.Desde,
						 dbo.vw_RangosMaestrasFull.Hasta,

						 dbo.vw_RepuestosV2_Bolsas_Vendedores_4.IdRangoMaestra, 
                         dbo.vw_RepuestosV2_Bolsas_Vendedores_4.IdRangoVersionMax, dbo.vw_RepuestosV2_Bolsas_Vendedores_4.IdComisionModeloSub, dbo.vw_RepuestosV2_Bolsas_Vendedores_4.IdComisionModeloSubCriterio, 
                         dbo.vw_RangosMaestrasFull.CodigoConcepto, dbo.vw_RangosMaestrasFull.CodigoConceptoAux, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion						 

FROM            dbo.vw_RepuestosV2_Bolsas_Vendedores_4 LEFT OUTER JOIN
                         dbo.ExogenasDiasLaborados ON dbo.vw_RepuestosV2_Bolsas_Vendedores_4.CodigoEmpleado = dbo.ExogenasDiasLaborados.CodigoEmpleado AND 
                         dbo.vw_RepuestosV2_Bolsas_Vendedores_4.Ano_Periodo = dbo.ExogenasDiasLaborados.Ano AND dbo.vw_RepuestosV2_Bolsas_Vendedores_4.Mes_Periodo = dbo.ExogenasDiasLaborados.Mes LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.vw_RepuestosV2_Bolsas_Vendedores_4.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion

--JCS - 2022/08/08: EL FILTRADO AHORA SE HACE DESDE LA BLL DE .NET PARA MEJORAR EL PERFORMANCE
--WHERE        

--(dbo.vw_RangosMaestrasFull.Desde < dbo.vw_RepuestosV2_Bolsas_Vendedores_4.ValorBaseComision) 
--AND (dbo.vw_RangosMaestrasFull.Hasta >= dbo.vw_RepuestosV2_Bolsas_Vendedores_4.ValorBaseComision) 
--AND (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 61) 
--AND (dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio = 107)

--OR 

--(dbo.vw_RangosMaestrasFull.Desde < dbo.vw_RepuestosV2_Bolsas_Vendedores_4.ValorBaseComision) 
--AND (dbo.vw_RangosMaestrasFull.Hasta >= dbo.vw_RepuestosV2_Bolsas_Vendedores_4.ValorBaseComision) 
--AND (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 62) 
--AND (dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio = 113)



```
