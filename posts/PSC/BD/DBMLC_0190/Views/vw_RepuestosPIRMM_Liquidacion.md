# View: vw_RepuestosPIRMM_Liquidacion

## Usa los objetos:
- [[vw_RangosMaestrasFull]]
- [[vw_RepuestosPIRMM_7]]
- [[vw_RepuestosPIRMM_7_Full]]

```sql



CREATE VIEW [dbo].[vw_RepuestosPIRMM_Liquidacion]
AS
SELECT        dbo.vw_RepuestosPIRMM_7.Ano_Periodo, dbo.vw_RepuestosPIRMM_7.Mes_Periodo, dbo.vw_RepuestosPIRMM_7.CodigoEmpresa, dbo.vw_RepuestosPIRMM_7.CodigoEmpleado, dbo.vw_RepuestosPIRMM_7.Empleado, 
                         dbo.vw_RepuestosPIRMM_7.FechaRetiro, 
						 
						 dbo.vw_RepuestosPIRMM_7.CodigoSede, dbo.vw_RepuestosPIRMM_7.NombreSede, 
						  dbo.vw_RepuestosPIRMM_7.CodigoCentro, dbo.vw_RepuestosPIRMM_7.NombreCentro, 
						 
						 
						 dbo.vw_RepuestosPIRMM_7.PIRPorcentaje, dbo.vw_RepuestosPIRMM_7.PIRPuntos, 
                         dbo.vw_RepuestosPIRMM_7.ValorNetoMostrador, dbo.vw_RepuestosPIRMM_7.ValorNetoTaller, dbo.vw_RepuestosPIRMM_7.ValorBasePIR, dbo.vw_RepuestosPIRMM_7.Faltante, 
                         dbo.vw_RepuestosPIRMM_7.ValorDelPuntoPIR, dbo.vw_RepuestosPIRMM_7.DiasLaborados, dbo.vw_RepuestosPIRMM_7.PuntosAsignadosEmpleado, dbo.vw_RangosMaestrasFull.IdComisionModeloSub, 
                         dbo.vw_RepuestosPIRMM_7.IdRangoMaestra, dbo.vw_RepuestosPIRMM_7.IdRangoVersionMax, dbo.vw_RangosMaestrasFull.IdRangoVersion, dbo.vw_RangosMaestrasFull.ConsecutivoVersion, 
                         dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, dbo.vw_RangosMaestrasFull.Valor, 
						 
						 

						 CASE 
						 WHEN FechaIngreso < DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) 
							THEN dbo.vw_RepuestosPIRMM_7.Comision 
						 WHEN DATEPART(YEAR, FechaIngreso) = Ano_Periodo AND DATEPART(MONTH, FechaIngreso) = Mes_Periodo 
							THEN DiasLaboradosMesIngreso * dbo.vw_RepuestosPIRMM_7.Comision / 30
						 ELSE 0
						 END AS Comision, 
						 
						 0 AS IdLiquidacion, 
                         0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.vw_RepuestosPIRMM_7 LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.vw_RepuestosPIRMM_7.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 10) AND (dbo.vw_RangosMaestrasFull.Desde < dbo.vw_RepuestosPIRMM_7.Comision) AND 
                         (dbo.vw_RangosMaestrasFull.Hasta >= dbo.vw_RepuestosPIRMM_7.Comision)

						 AND CodigoEmpleado NOT IN (20794402, 52072959, 1110486801, 1121846131)


						 UNION ALL


						 SELECT        dbo.vw_RepuestosPIRMM_7_Full.Ano_Periodo, dbo.vw_RepuestosPIRMM_7_Full.Mes_Periodo, dbo.vw_RepuestosPIRMM_7_Full.CodigoEmpresa, dbo.vw_RepuestosPIRMM_7_Full.CodigoEmpleado, dbo.vw_RepuestosPIRMM_7_Full.Empleado, 
                         dbo.vw_RepuestosPIRMM_7_Full.FechaRetiro, 
						 
						 dbo.vw_RepuestosPIRMM_7_Full.CodigoSede, dbo.vw_RepuestosPIRMM_7_Full.NombreSede, 
						  dbo.vw_RepuestosPIRMM_7_Full.CodigoCentro, dbo.vw_RepuestosPIRMM_7_Full.NombreCentro, 
						 
						 
						 dbo.vw_RepuestosPIRMM_7_Full.PIRPorcentaje, dbo.vw_RepuestosPIRMM_7_Full.PIRPuntos, 
                         dbo.vw_RepuestosPIRMM_7_Full.ValorNetoMostrador, dbo.vw_RepuestosPIRMM_7_Full.ValorNetoTaller, dbo.vw_RepuestosPIRMM_7_Full.ValorBasePIR, dbo.vw_RepuestosPIRMM_7_Full.Faltante, 
                         dbo.vw_RepuestosPIRMM_7_Full.ValorDelPuntoPIR, dbo.vw_RepuestosPIRMM_7_Full.DiasLaborados, dbo.vw_RepuestosPIRMM_7_Full.PuntosAsignadosEmpleado, dbo.vw_RangosMaestrasFull.IdComisionModeloSub, 
                         dbo.vw_RepuestosPIRMM_7_Full.IdRangoMaestra, dbo.vw_RepuestosPIRMM_7_Full.IdRangoVersionMax, dbo.vw_RangosMaestrasFull.IdRangoVersion, dbo.vw_RangosMaestrasFull.ConsecutivoVersion, 
                         dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, dbo.vw_RangosMaestrasFull.Valor, 
						 
						 

						 CASE 
						 WHEN FechaIngreso < DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) 
							THEN dbo.vw_RepuestosPIRMM_7_Full.Comision 
						 WHEN DATEPART(YEAR, FechaIngreso) = Ano_Periodo AND DATEPART(MONTH, FechaIngreso) = Mes_Periodo 
							THEN DiasLaboradosMesIngreso * dbo.vw_RepuestosPIRMM_7_Full.Comision / 30
						 ELSE 0
						 END AS Comision, 
						 
						 0 AS IdLiquidacion, 
                         0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.vw_RepuestosPIRMM_7_Full LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.vw_RepuestosPIRMM_7_Full.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 10) AND (dbo.vw_RangosMaestrasFull.Desde < dbo.vw_RepuestosPIRMM_7_Full.Comision) AND 
                         (dbo.vw_RangosMaestrasFull.Hasta >= dbo.vw_RepuestosPIRMM_7_Full.Comision)

						 AND CodigoEmpleado IN (20794402, 52072959, 1110486801, 1121846131)








```
