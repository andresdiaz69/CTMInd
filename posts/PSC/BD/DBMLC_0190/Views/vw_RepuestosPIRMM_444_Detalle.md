# View: vw_RepuestosPIRMM_444_Detalle

## Usa los objetos:
- [[ExogenasPuntosEmpleadosCentro]]
- [[vw_RepuestosPIRMM_444]]

```sql


CREATE VIEW [dbo].[vw_RepuestosPIRMM_444_Detalle]
AS
SELECT        dbo.ExogenasPuntosEmpleadosCentro.CodigoEmpleado, dbo.vw_RepuestosPIRMM_444.Ano_Periodo, dbo.vw_RepuestosPIRMM_444.Mes_Periodo, dbo.vw_RepuestosPIRMM_444.CodigoEmpresa, 
                         dbo.vw_RepuestosPIRMM_444.CodigoSede, dbo.vw_RepuestosPIRMM_444.NombreSede, 
						 
						  dbo.vw_RepuestosPIRMM_444.CodigoCentro, dbo.vw_RepuestosPIRMM_444.NombreCentro,
						 
						 dbo.vw_RepuestosPIRMM_444.TotalFacturasMostrador, dbo.vw_RepuestosPIRMM_444.ImportesEfectoMostrador, 
                         dbo.vw_RepuestosPIRMM_444.PorcentajesRecaudoMostrador,  dbo.vw_RepuestosPIRMM_444.ValorNetoMostrador, dbo.vw_RepuestosPIRMM_444.ValorNetoTaller, 
                         dbo.vw_RepuestosPIRMM_444.ValorBasePIR
FROM            dbo.ExogenasPuntosEmpleadosCentro LEFT OUTER JOIN
                         dbo.vw_RepuestosPIRMM_444 ON dbo.ExogenasPuntosEmpleadosCentro.CodigoCentro = dbo.vw_RepuestosPIRMM_444.CodigoCentro
WHERE        (dbo.ExogenasPuntosEmpleadosCentro.PuntosPIR > 0)





```
