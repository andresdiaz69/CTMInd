# View: vw_RepuestosPIRMM_444_Detalle_Full

## Usa los objetos:
- [[ExogenasPuntosEmpleadosCentro]]
- [[vw_RepuestosPIRMM_444_Full]]

```sql



CREATE VIEW [dbo].[vw_RepuestosPIRMM_444_Detalle_Full]
AS
SELECT        dbo.ExogenasPuntosEmpleadosCentro.CodigoEmpleado, dbo.vw_RepuestosPIRMM_444_Full.Ano_Periodo, dbo.vw_RepuestosPIRMM_444_Full.Mes_Periodo, dbo.vw_RepuestosPIRMM_444_Full.CodigoEmpresa, 
                         dbo.vw_RepuestosPIRMM_444_Full.CodigoSede, dbo.vw_RepuestosPIRMM_444_Full.NombreSede, 
						 
						  dbo.vw_RepuestosPIRMM_444_Full.CodigoCentro, dbo.vw_RepuestosPIRMM_444_Full.NombreCentro,
						 
						 dbo.vw_RepuestosPIRMM_444_Full.TotalFacturasMostrador, dbo.vw_RepuestosPIRMM_444_Full.ImportesEfectoMostrador, 
                         dbo.vw_RepuestosPIRMM_444_Full.PorcentajesRecaudoMostrador,  dbo.vw_RepuestosPIRMM_444_Full.ValorNetoMostrador, dbo.vw_RepuestosPIRMM_444_Full.ValorNetoTaller, 
                         dbo.vw_RepuestosPIRMM_444_Full.ValorBasePIR
FROM            dbo.ExogenasPuntosEmpleadosCentro LEFT OUTER JOIN
                         dbo.vw_RepuestosPIRMM_444_Full ON dbo.ExogenasPuntosEmpleadosCentro.CodigoCentro = dbo.vw_RepuestosPIRMM_444_Full.CodigoCentro
WHERE        (dbo.ExogenasPuntosEmpleadosCentro.PuntosPIR > 0)





```
