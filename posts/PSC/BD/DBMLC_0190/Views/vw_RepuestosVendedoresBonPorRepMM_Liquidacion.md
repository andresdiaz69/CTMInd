# View: vw_RepuestosVendedoresBonPorRepMM_Liquidacion

## Usa los objetos:
- [[vw_RangosMaestrasFull]]
- [[vw_RepuestosVendedoresBonPorRepMM_9_Full]]

```sql







CREATE VIEW [dbo].[vw_RepuestosVendedoresBonPorRepMM_Liquidacion]
AS



SELECT DISTINCT

 dbo.vw_RepuestosVendedoresBonPorRepMM_9_Full.Ano_Periodo, dbo.vw_RepuestosVendedoresBonPorRepMM_9_Full.Mes_Periodo, dbo.vw_RepuestosVendedoresBonPorRepMM_9_Full.CodigoEmpresa, 
                         dbo.vw_RepuestosVendedoresBonPorRepMM_9_Full.CedulaVendedorRepuestos, dbo.vw_RepuestosVendedoresBonPorRepMM_9_Full.CodigoEmpleado, dbo.vw_RepuestosVendedoresBonPorRepMM_9_Full.Empleado, 
                         dbo.vw_RepuestosVendedoresBonPorRepMM_9_Full.FechaRetiro, dbo.vw_RepuestosVendedoresBonPorRepMM_9_Full.CodigoSede, dbo.vw_RepuestosVendedoresBonPorRepMM_9_Full.NombreSede, 
                         dbo.vw_RepuestosVendedoresBonPorRepMM_9_Full.ValorVariable_Ven, dbo.vw_RepuestosVendedoresBonPorRepMM_9_Full.ValorVariable_Aux, dbo.vw_RepuestosVendedoresBonPorRepMM_9_Full.ValorVariable_Jefe, 
                         dbo.vw_RepuestosVendedoresBonPorRepMM_9_Full.Presupuesto, dbo.vw_RepuestosVendedoresBonPorRepMM_9_Full.CumplimientoAl15_OT, dbo.vw_RepuestosVendedoresBonPorRepMM_9_Full.CumplimientoAl15_AL, 
                         dbo.vw_RepuestosVendedoresBonPorRepMM_9_Full.CumplimientoAl15, dbo.vw_RepuestosVendedoresBonPorRepMM_9_Full.PorcentajeCumplimientoAl15, dbo.vw_RepuestosVendedoresBonPorRepMM_9_Full.CumplimientoAl30_OT, 
                         dbo.vw_RepuestosVendedoresBonPorRepMM_9_Full.CumplimientoAl30_AL, dbo.vw_RepuestosVendedoresBonPorRepMM_9_Full.CumplimientoAl30, dbo.vw_RepuestosVendedoresBonPorRepMM_9_Full.PorcentajeCumplimientoAl30, 
                         dbo.vw_RangosMaestrasFull.IdComisionModeloSub, dbo.vw_RepuestosVendedoresBonPorRepMM_9_Full.IdRangoMaestra, dbo.vw_RepuestosVendedoresBonPorRepMM_9_Full.IdRangoVersionMax, 
                         dbo.vw_RangosMaestrasFull.IdRangoVersion, dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, 
                         dbo.vw_RangosMaestrasFull.Valor, dbo.vw_RepuestosVendedoresBonPorRepMM_9_Full.ComisionAl15, dbo.vw_RangosMaestrasFull.Valor AS ComisionAl30, 
						 
						 
						 
						 CASE 
						 WHEN FechaIngreso < DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) 
							THEN dbo.vw_RepuestosVendedoresBonPorRepMM_9_Full.ComisionAl15 + dbo.vw_RangosMaestrasFull.Valor 
						 WHEN DATEPART(YEAR, FechaIngreso) = Ano_Periodo AND DATEPART(MONTH, FechaIngreso) = Mes_Periodo 
							THEN DiasLaboradosMesIngreso * (dbo.vw_RepuestosVendedoresBonPorRepMM_9_Full.ComisionAl15 + dbo.vw_RangosMaestrasFull.Valor) / 30
						 ELSE 0
						 END AS Comision, 
						 
						 
						 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.vw_RepuestosVendedoresBonPorRepMM_9_Full LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.vw_RepuestosVendedoresBonPorRepMM_9_Full.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.Desde < dbo.vw_RepuestosVendedoresBonPorRepMM_9_Full.PorcentajeCumplimientoAl30) AND 
                         (dbo.vw_RangosMaestrasFull.Hasta >= dbo.vw_RepuestosVendedoresBonPorRepMM_9_Full.PorcentajeCumplimientoAl30) AND (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 8)

						 --AND CodigoEmpleado IN (52072959, 1110486801, 1121846131)
						 AND CodigoEmpleado = 52072959 





```
