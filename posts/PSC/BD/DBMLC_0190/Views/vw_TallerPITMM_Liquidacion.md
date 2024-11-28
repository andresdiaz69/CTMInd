# View: vw_TallerPITMM_Liquidacion

## Usa los objetos:
- [[vw_RangosMaestrasFull]]
- [[vw_TallerPITMM_5]]

```sql




CREATE VIEW [dbo].[vw_TallerPITMM_Liquidacion]
AS
SELECT        dbo.vw_TallerPITMM_5.Ano_Periodo, dbo.vw_TallerPITMM_5.Mes_Periodo, dbo.vw_TallerPITMM_5.CodigoEmpresa, dbo.vw_TallerPITMM_5.CodigoEmpleado, dbo.vw_TallerPITMM_5.Empleado, 
                         dbo.vw_TallerPITMM_5.FechaRetiro, dbo.vw_TallerPITMM_5.CodigoSede, dbo.vw_TallerPITMM_5.NombreSede, 
						 
						 dbo.vw_TallerPITMM_5.CodigoCentro, dbo.vw_TallerPITMM_5.NombreCentro,
						 
						 dbo.vw_TallerPITMM_5.PITPorcentaje, dbo.vw_TallerPITMM_5.PITPuntos, 
                         dbo.vw_TallerPITMM_5.ValorNetoTaller, dbo.vw_TallerPITMM_5.ValorBasePIT, dbo.vw_TallerPITMM_5.Faltante, dbo.vw_TallerPITMM_5.ValorDelPuntoPIT, dbo.vw_TallerPITMM_5.DiasLaborados, 
                         dbo.vw_TallerPITMM_5.PuntosAsignadosEmpleado, dbo.vw_RangosMaestrasFull.IdComisionModeloSub, dbo.vw_TallerPITMM_5.IdRangoMaestra, dbo.vw_TallerPITMM_5.IdRangoVersionMax, 
                         dbo.vw_RangosMaestrasFull.IdRangoVersion, dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, 
                         dbo.vw_RangosMaestrasFull.Valor, 					 
						

						 CASE 
						 WHEN FechaIngreso < DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) 
							THEN dbo.vw_TallerPITMM_5.Comision
						 WHEN DATEPART(YEAR, FechaIngreso) = Ano_Periodo AND DATEPART(MONTH, FechaIngreso) = Mes_Periodo 
							THEN DiasLaboradosMesIngreso * dbo.vw_TallerPITMM_5.Comision / 30
						 ELSE 0
						 END AS Comision, 
						 
						 dbo.vw_RangosMaestrasFull.CodigoMarcaGrupo, dbo.vw_RangosMaestrasFull.MarcaGrupo, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() 
                         AS FechaLiquidacion
FROM            dbo.vw_TallerPITMM_5 LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.vw_TallerPITMM_5.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 19) AND (dbo.vw_RangosMaestrasFull.Desde < dbo.vw_TallerPITMM_5.Comision) AND (dbo.vw_RangosMaestrasFull.Hasta >= dbo.vw_TallerPITMM_5.Comision)








```
