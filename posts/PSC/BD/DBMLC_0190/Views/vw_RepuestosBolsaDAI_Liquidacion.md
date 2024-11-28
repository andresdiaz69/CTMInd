# View: vw_RepuestosBolsaDAI_Liquidacion

## Usa los objetos:
- [[vw_RangosMaestrasFull]]
- [[vw_RepuestosBolsaDAI_6]]
- [[vw_RepuestosBolsaDAI_6_Full]]

```sql


CREATE VIEW [dbo].[vw_RepuestosBolsaDAI_Liquidacion]
AS
SELECT        dbo.vw_RepuestosBolsaDAI_6.Ano_Periodo, dbo.vw_RepuestosBolsaDAI_6.Mes_Periodo, dbo.vw_RepuestosBolsaDAI_6.CodigoEmpresa, dbo.vw_RepuestosBolsaDAI_6.CodigoEmpleado, 
                         dbo.vw_RepuestosBolsaDAI_6.Empleado, dbo.vw_RepuestosBolsaDAI_6.FechaRetiro, dbo.vw_RepuestosBolsaDAI_6.CodigoSede, dbo.vw_RepuestosBolsaDAI_6.NombreSede, dbo.vw_RepuestosBolsaDAI_6.CodigoCentro, 
                         dbo.vw_RepuestosBolsaDAI_6.NombreCentro, dbo.vw_RepuestosBolsaDAI_6.CodigoSeccion, dbo.vw_RepuestosBolsaDAI_6.Seccion, dbo.vw_RepuestosBolsaDAI_6.BolsaPorcentaje, 
                         dbo.vw_RepuestosBolsaDAI_6.ValorNetoMostrador, dbo.vw_RepuestosBolsaDAI_6.ValorNetoTaller, dbo.vw_RepuestosBolsaDAI_6.ValorBaseBolsa, dbo.vw_RepuestosBolsaDAI_6.PuntosBolsa, 
                         dbo.vw_RangosMaestrasFull.IdComisionModeloSub, dbo.vw_RepuestosBolsaDAI_6.IdRangoMaestra, dbo.vw_RepuestosBolsaDAI_6.IdRangoVersionMax, dbo.vw_RangosMaestrasFull.IdRangoVersion, 
                         dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, dbo.vw_RangosMaestrasFull.Valor, 
                         CASE WHEN FechaIngreso < DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) THEN dbo.vw_RepuestosBolsaDAI_6.Comision WHEN DATEPART(YEAR, FechaIngreso) = Ano_Periodo AND DATEPART(MONTH, FechaIngreso) 
                         = Mes_Periodo THEN DiasLaboradosMesIngreso * dbo.vw_RepuestosBolsaDAI_6.Comision / 30 ELSE 0 END AS Comision, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.vw_RepuestosBolsaDAI_6 LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.vw_RepuestosBolsaDAI_6.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 16) AND (dbo.vw_RangosMaestrasFull.Desde < dbo.vw_RepuestosBolsaDAI_6.Comision) AND 
                         (dbo.vw_RangosMaestrasFull.Hasta >= dbo.vw_RepuestosBolsaDAI_6.Comision)

AND CodigoEmpleado NOT IN (79694312)

UNION ALL

SELECT        dbo.vw_RepuestosBolsaDAI_6_Full.Ano_Periodo, dbo.vw_RepuestosBolsaDAI_6_Full.Mes_Periodo, dbo.vw_RepuestosBolsaDAI_6_Full.CodigoEmpresa, dbo.vw_RepuestosBolsaDAI_6_Full.CodigoEmpleado, 
                         dbo.vw_RepuestosBolsaDAI_6_Full.Empleado, dbo.vw_RepuestosBolsaDAI_6_Full.FechaRetiro, dbo.vw_RepuestosBolsaDAI_6_Full.CodigoSede, dbo.vw_RepuestosBolsaDAI_6_Full.NombreSede, dbo.vw_RepuestosBolsaDAI_6_Full.CodigoCentro, 
                         dbo.vw_RepuestosBolsaDAI_6_Full.NombreCentro, dbo.vw_RepuestosBolsaDAI_6_Full.CodigoSeccion, dbo.vw_RepuestosBolsaDAI_6_Full.Seccion, dbo.vw_RepuestosBolsaDAI_6_Full.BolsaPorcentaje, 
                         dbo.vw_RepuestosBolsaDAI_6_Full.ValorNetoMostrador, dbo.vw_RepuestosBolsaDAI_6_Full.ValorNetoTaller, dbo.vw_RepuestosBolsaDAI_6_Full.ValorBaseBolsa, dbo.vw_RepuestosBolsaDAI_6_Full.PuntosBolsa, 
                         dbo.vw_RangosMaestrasFull.IdComisionModeloSub, dbo.vw_RepuestosBolsaDAI_6_Full.IdRangoMaestra, dbo.vw_RepuestosBolsaDAI_6_Full.IdRangoVersionMax, dbo.vw_RangosMaestrasFull.IdRangoVersion, 
                         dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, dbo.vw_RangosMaestrasFull.Valor, 
                         CASE WHEN FechaIngreso < DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) THEN dbo.vw_RepuestosBolsaDAI_6_Full.Comision WHEN DATEPART(YEAR, FechaIngreso) = Ano_Periodo AND DATEPART(MONTH, FechaIngreso) 
                         = Mes_Periodo THEN DiasLaboradosMesIngreso * dbo.vw_RepuestosBolsaDAI_6_Full.Comision / 30 ELSE 0 END AS Comision, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.vw_RepuestosBolsaDAI_6_Full LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.vw_RepuestosBolsaDAI_6_Full.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 16) AND (dbo.vw_RangosMaestrasFull.Desde < dbo.vw_RepuestosBolsaDAI_6_Full.Comision) AND 
                         (dbo.vw_RangosMaestrasFull.Hasta >= dbo.vw_RepuestosBolsaDAI_6_Full.Comision)

AND CodigoEmpleado IN (79694312)



```
