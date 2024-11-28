# View: vw_JefeDeVentasDaimlerVCCalle80_Liquidacion

## Usa los objetos:
- [[Centros]]
- [[vw_EmpleadosDetalle]]
- [[vw_JefeDeVentasDaimlerVCCalle80_1]]
- [[vw_JefeDeVentasDaimlerVCCalle80_2]]

```sql
CREATE VIEW [dbo].[vw_JefeDeVentasDaimlerVCCalle80_Liquidacion] AS

SELECT DISTINCT 
ISNULL(vw_JefeDeVentasDaimlerVCCalle80_1.Ano_Recaudo, vw_JefeDeVentasDaimlerVCCalle80_2.Año) AS Ano_Periodo
, ISNULL(vw_JefeDeVentasDaimlerVCCalle80_1.Mes_Recaudo, vw_JefeDeVentasDaimlerVCCalle80_2.Mes) AS Mes_Periodo
, ISNULL(vw_JefeDeVentasDaimlerVCCalle80_1.CodigoEmpleado, vw_JefeDeVentasDaimlerVCCalle80_2.CodigoEmpleado) AS CodigoEmpleado
, vw_EmpleadosDetalle.Empleado
, vw_EmpleadosDetalle.CodigoEmpresa
, vw_EmpleadosDetalle.NombreEmpresa
, vw_EmpleadosDetalle.FechaIngreso
, vw_EmpleadosDetalle.FechaRetiro
, ISNULL(vw_JefeDeVentasDaimlerVCCalle80_1.IdComisionModeloSub, vw_JefeDeVentasDaimlerVCCalle80_2.IdComisionModeloSub) AS IdComisionModeloSub
, ISNULL(vw_JefeDeVentasDaimlerVCCalle80_1.CodigoCentro, vw_JefeDeVentasDaimlerVCCalle80_2.CodigoCentro) AS CodigoCentro
, Centros.NombreCentro
, ISNULL(vw_JefeDeVentasDaimlerVCCalle80_1.VehiculosRecaudados, 0) AS VehiculosRecaudados
, ISNULL(vw_JefeDeVentasDaimlerVCCalle80_1.VentasNacionales, 0) AS VentasNacionales
, ISNULL(vw_JefeDeVentasDaimlerVCCalle80_1.PesoComercial, 0) AS PesoComercial
, ISNULL(vw_JefeDeVentasDaimlerVCCalle80_1.Desde, 0) AS Desde_PesoComercial
, ISNULL(vw_JefeDeVentasDaimlerVCCalle80_1.Hasta, 0) AS Hasta_PesoComercial
, ISNULL(vw_JefeDeVentasDaimlerVCCalle80_1.Comision_PesoComercial, 0) AS Comision_PesoComercial
, ISNULL(vw_JefeDeVentasDaimlerVCCalle80_2.VentasNetas, 0) AS VentasNetas
, ISNULL(vw_JefeDeVentasDaimlerVCCalle80_2.OtrosIngresos, 0) AS OtrosIngresos
, ISNULL(vw_JefeDeVentasDaimlerVCCalle80_2.Desde, 0) AS Desde_Bonificacion
, ISNULL(vw_JefeDeVentasDaimlerVCCalle80_2.Hasta, 0) As Hasta_Bonificacion
, ISNULL(vw_JefeDeVentasDaimlerVCCalle80_2.ParticipacionOtrosIngresos,0) AS ParticipacionOtrosIngresos
, ISNULL(vw_JefeDeVentasDaimlerVCCalle80_2.Comision_Bonificacion, 0) AS Comision_Bonificacion
, ISNULL(vw_JefeDeVentasDaimlerVCCalle80_1.Comision_PesoComercial, 0) + ISNULL(vw_JefeDeVentasDaimlerVCCalle80_2.Comision_Bonificacion, 0) AS Comision_TOTAL
, 0 AS IdLiquidacion
, 0 AS IdHistorico
, GETDATE() AS FechaLiquidacion
,vw_JefeDeVentasDaimlerVCCalle80_1.CodigoConcepto AS CodigoConcepto_1
, vw_JefeDeVentasDaimlerVCCalle80_2.CodigoConcepto AS CodigoConcepto_2

FROM vw_JefeDeVentasDaimlerVCCalle80_1

full JOIN vw_JefeDeVentasDaimlerVCCalle80_2 ON vw_JefeDeVentasDaimlerVCCalle80_1.CodigoCentro = vw_JefeDeVentasDaimlerVCCalle80_2.CodigoCentro AND vw_JefeDeVentasDaimlerVCCalle80_1.Ano_Recaudo = vw_JefeDeVentasDaimlerVCCalle80_2.Año
AND vw_JefeDeVentasDaimlerVCCalle80_1.Mes_Recaudo = vw_JefeDeVentasDaimlerVCCalle80_2.Mes AND vw_JefeDeVentasDaimlerVCCalle80_1.CodigoEmpleado = vw_JefeDeVentasDaimlerVCCalle80_2.CodigoEmpleado

LEFT JOIN dbo.vw_EmpleadosDetalle ON isnull(vw_JefeDeVentasDaimlerVCCalle80_1.CodigoEmpleado, vw_JefeDeVentasDaimlerVCCalle80_2.CodigoEmpleado) = dbo.vw_EmpleadosDetalle.CodigoEmpleado

LEFT JOIN Centros ON ISNULL(vw_JefeDeVentasDaimlerVCCalle80_1.CodigoCentro, vw_JefeDeVentasDaimlerVCCalle80_2.CodigoCentro) = Centros.CodigoCentro

```
