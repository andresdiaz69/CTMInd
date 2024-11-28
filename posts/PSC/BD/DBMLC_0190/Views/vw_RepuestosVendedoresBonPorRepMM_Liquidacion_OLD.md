# View: vw_RepuestosVendedoresBonPorRepMM_Liquidacion_OLD

## Usa los objetos:
- [[vw_RangosMaestrasFull]]
- [[vw_RepuestosVendedoresBonPorRepMM_9]]

```sql





CREATE VIEW [dbo].[vw_RepuestosVendedoresBonPorRepMM_Liquidacion_OLD]
AS
--SELECT       
SELECT DISTINCT

 dbo.vw_RepuestosVendedoresBonPorRepMM_9.Ano_Periodo, dbo.vw_RepuestosVendedoresBonPorRepMM_9.Mes_Periodo, dbo.vw_RepuestosVendedoresBonPorRepMM_9.CodigoEmpresa, 
                         dbo.vw_RepuestosVendedoresBonPorRepMM_9.CedulaVendedorRepuestos, dbo.vw_RepuestosVendedoresBonPorRepMM_9.CodigoEmpleado, dbo.vw_RepuestosVendedoresBonPorRepMM_9.Empleado, 
                         dbo.vw_RepuestosVendedoresBonPorRepMM_9.FechaRetiro, dbo.vw_RepuestosVendedoresBonPorRepMM_9.CodigoSede, dbo.vw_RepuestosVendedoresBonPorRepMM_9.NombreSede, 
                         dbo.vw_RepuestosVendedoresBonPorRepMM_9.ValorVariable_Ven, dbo.vw_RepuestosVendedoresBonPorRepMM_9.ValorVariable_Aux, dbo.vw_RepuestosVendedoresBonPorRepMM_9.ValorVariable_Jefe, 
                         dbo.vw_RepuestosVendedoresBonPorRepMM_9.Presupuesto, dbo.vw_RepuestosVendedoresBonPorRepMM_9.CumplimientoAl15_OT, dbo.vw_RepuestosVendedoresBonPorRepMM_9.CumplimientoAl15_AL, 
                         dbo.vw_RepuestosVendedoresBonPorRepMM_9.CumplimientoAl15, dbo.vw_RepuestosVendedoresBonPorRepMM_9.PorcentajeCumplimientoAl15, dbo.vw_RepuestosVendedoresBonPorRepMM_9.CumplimientoAl30_OT, 
                         dbo.vw_RepuestosVendedoresBonPorRepMM_9.CumplimientoAl30_AL, dbo.vw_RepuestosVendedoresBonPorRepMM_9.CumplimientoAl30, dbo.vw_RepuestosVendedoresBonPorRepMM_9.PorcentajeCumplimientoAl30, 
                         dbo.vw_RangosMaestrasFull.IdComisionModeloSub, dbo.vw_RepuestosVendedoresBonPorRepMM_9.IdRangoMaestra, dbo.vw_RepuestosVendedoresBonPorRepMM_9.IdRangoVersionMax, 
                         dbo.vw_RangosMaestrasFull.IdRangoVersion, dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, 
                         dbo.vw_RangosMaestrasFull.Valor, dbo.vw_RepuestosVendedoresBonPorRepMM_9.ComisionAl15, dbo.vw_RangosMaestrasFull.Valor AS ComisionAl30, 
						 
						 
						 
						 CASE 
						 WHEN FechaIngreso < DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) 
							THEN dbo.vw_RepuestosVendedoresBonPorRepMM_9.ComisionAl15 + dbo.vw_RangosMaestrasFull.Valor 
						 WHEN DATEPART(YEAR, FechaIngreso) = Ano_Periodo AND DATEPART(MONTH, FechaIngreso) = Mes_Periodo 
							THEN DiasLaboradosMesIngreso * (dbo.vw_RepuestosVendedoresBonPorRepMM_9.ComisionAl15 + dbo.vw_RangosMaestrasFull.Valor) / 30
						 ELSE 0
						 END AS Comision, 
						 
						 
						 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.vw_RepuestosVendedoresBonPorRepMM_9 LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.vw_RepuestosVendedoresBonPorRepMM_9.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.Desde < dbo.vw_RepuestosVendedoresBonPorRepMM_9.PorcentajeCumplimientoAl30) AND 
                         (dbo.vw_RangosMaestrasFull.Hasta >= dbo.vw_RepuestosVendedoresBonPorRepMM_9.PorcentajeCumplimientoAl30) AND (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 8)

 --AND CodigoEmpleado NOT IN (52072959, 1110486801, 1121846131)



```
