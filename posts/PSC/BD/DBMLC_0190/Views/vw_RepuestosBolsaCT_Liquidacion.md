# View: vw_RepuestosBolsaCT_Liquidacion

## Usa los objetos:
- [[vw_RangosMaestrasFull]]
- [[vw_RepuestosBolsaCT_7]]
- [[vw_RepuestosBolsaCT_7_Full]]

```sql







CREATE VIEW [dbo].[vw_RepuestosBolsaCT_Liquidacion]
AS
SELECT        dbo.vw_RepuestosBolsaCT_7.Ano_Periodo, dbo.vw_RepuestosBolsaCT_7.Mes_Periodo, dbo.vw_RepuestosBolsaCT_7.CodigoEmpresa, dbo.vw_RepuestosBolsaCT_7.CodigoEmpleado, 
                         dbo.vw_RepuestosBolsaCT_7.Empleado, dbo.vw_RepuestosBolsaCT_7.FechaIngreso, dbo.vw_RepuestosBolsaCT_7.FechaRetiro, dbo.vw_RepuestosBolsaCT_7.CodigoSede, dbo.vw_RepuestosBolsaCT_7.NombreSede, 
                         dbo.vw_RepuestosBolsaCT_7.CodigoCentro, dbo.vw_RepuestosBolsaCT_7.NombreCentro, dbo.vw_RepuestosBolsaCT_7.CodigoSeccion, dbo.vw_RepuestosBolsaCT_7.Seccion, dbo.vw_RepuestosBolsaCT_7.BolsaPorcentaje, 
                         dbo.vw_RepuestosBolsaCT_7.BolsaPuntos, dbo.vw_RepuestosBolsaCT_7.ValorNetoMostrador, dbo.vw_RepuestosBolsaCT_7.ValorNetoTaller, dbo.vw_RepuestosBolsaCT_7.ValorBaseBolsa, 
                         dbo.vw_RepuestosBolsaCT_7.ValorDelPuntoBolsa, dbo.vw_RepuestosBolsaCT_7.PuntosAsignadosEmpleado, dbo.vw_RepuestosBolsaCT_7.IdRangoMaestra, dbo.vw_RepuestosBolsaCT_7.IdRangoVersionMax, 
                         dbo.vw_RangosMaestrasFull.IdComisionModeloSub, dbo.vw_RangosMaestrasFull.IdRangoVersion, dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, 
                         dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, dbo.vw_RangosMaestrasFull.Valor, 
						 
						 CASE 
						 WHEN FechaIngreso < DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) 
                         THEN dbo.vw_RepuestosBolsaCT_7.PuntosAsignadosEmpleado * dbo.vw_RepuestosBolsaCT_7.ValorDelPuntoBolsa * dbo.vw_RangosMaestrasFull.Valor / 100 
						 WHEN DATEPART(YEAR, FechaIngreso) = Ano_Periodo AND DATEPART(MONTH, FechaIngreso) = Mes_Periodo 
						 THEN DiasLaboradosMesIngreso * (dbo.vw_RepuestosBolsaCT_7.PuntosAsignadosEmpleado * dbo.vw_RepuestosBolsaCT_7.ValorDelPuntoBolsa * dbo.vw_RangosMaestrasFull.Valor / 100) / 30 
						 ELSE 0 
						 END AS Comision, 
						 
						 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.vw_RepuestosBolsaCT_7 LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.vw_RepuestosBolsaCT_7.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 17)
AND
CodigoEmpleado NOT IN (79497419, 93380721, 406824, 11313710, 16362509)


UNION ALL


SELECT        dbo.vw_RepuestosBolsaCT_7_Full.Ano_Periodo, dbo.vw_RepuestosBolsaCT_7_Full.Mes_Periodo, dbo.vw_RepuestosBolsaCT_7_Full.CodigoEmpresa, dbo.vw_RepuestosBolsaCT_7_Full.CodigoEmpleado, 
                         dbo.vw_RepuestosBolsaCT_7_Full.Empleado, dbo.vw_RepuestosBolsaCT_7_Full.FechaIngreso, dbo.vw_RepuestosBolsaCT_7_Full.FechaRetiro, dbo.vw_RepuestosBolsaCT_7_Full.CodigoSede, dbo.vw_RepuestosBolsaCT_7_Full.NombreSede, 
                         dbo.vw_RepuestosBolsaCT_7_Full.CodigoCentro, dbo.vw_RepuestosBolsaCT_7_Full.NombreCentro, dbo.vw_RepuestosBolsaCT_7_Full.CodigoSeccion, dbo.vw_RepuestosBolsaCT_7_Full.Seccion, dbo.vw_RepuestosBolsaCT_7_Full.BolsaPorcentaje, 
                         dbo.vw_RepuestosBolsaCT_7_Full.BolsaPuntos, dbo.vw_RepuestosBolsaCT_7_Full.ValorNetoMostrador, dbo.vw_RepuestosBolsaCT_7_Full.ValorNetoTaller, dbo.vw_RepuestosBolsaCT_7_Full.ValorBaseBolsa, 
                         dbo.vw_RepuestosBolsaCT_7_Full.ValorDelPuntoBolsa, dbo.vw_RepuestosBolsaCT_7_Full.PuntosAsignadosEmpleado, dbo.vw_RepuestosBolsaCT_7_Full.IdRangoMaestra, dbo.vw_RepuestosBolsaCT_7_Full.IdRangoVersionMax, 
                         dbo.vw_RangosMaestrasFull.IdComisionModeloSub, dbo.vw_RangosMaestrasFull.IdRangoVersion, dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, 
                         dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, dbo.vw_RangosMaestrasFull.Valor, 
						 
						 CASE 
						 WHEN FechaIngreso < DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) 
                         THEN dbo.vw_RepuestosBolsaCT_7_Full.PuntosAsignadosEmpleado * dbo.vw_RepuestosBolsaCT_7_Full.ValorDelPuntoBolsa * dbo.vw_RangosMaestrasFull.Valor / 100 
						 WHEN DATEPART(YEAR, FechaIngreso) = Ano_Periodo AND DATEPART(MONTH, FechaIngreso) = Mes_Periodo 
						 THEN DiasLaboradosMesIngreso * (dbo.vw_RepuestosBolsaCT_7_Full.PuntosAsignadosEmpleado * dbo.vw_RepuestosBolsaCT_7_Full.ValorDelPuntoBolsa * dbo.vw_RangosMaestrasFull.Valor / 100) / 30 
						 ELSE 0 
						 END AS Comision, 
						 
						 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.vw_RepuestosBolsaCT_7_Full LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.vw_RepuestosBolsaCT_7_Full.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 17)
AND
CodigoEmpleado IN (79497419, 93380721, 406824, 11313710, 16362509)





```
