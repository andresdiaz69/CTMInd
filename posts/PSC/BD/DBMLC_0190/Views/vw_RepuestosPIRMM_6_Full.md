# View: vw_RepuestosPIRMM_6_Full

## Usa los objetos:
- [[ExogenasDiasLaborados]]
- [[ExogenasPuntosEmpleadosCentro]]
- [[vw_RepuestosPIRMM_5_Full]]

```sql


CREATE VIEW [dbo].[vw_RepuestosPIRMM_6_Full]
AS
SELECT        dbo.ExogenasDiasLaborados.CodigoEmpleado, dbo.vw_RepuestosPIRMM_5_Full.Ano_Periodo, dbo.vw_RepuestosPIRMM_5_Full.Mes_Periodo, dbo.vw_RepuestosPIRMM_5_Full.CodigoEmpresa, 

							dbo.vw_RepuestosPIRMM_5_Full.CodigoSede, dbo.vw_RepuestosPIRMM_5_Full.NombreSede, 
							dbo.vw_RepuestosPIRMM_5_Full.CodigoCentro, dbo.vw_RepuestosPIRMM_5_Full.NombreCentro, 
							
							
							dbo.vw_RepuestosPIRMM_5_Full.PIRPorcentaje, dbo.vw_RepuestosPIRMM_5_Full.PIRPuntos, dbo.vw_RepuestosPIRMM_5_Full.ValorNetoMostrador, dbo.vw_RepuestosPIRMM_5_Full.ValorNetoTaller, 
                         dbo.vw_RepuestosPIRMM_5_Full.ValorBasePIR, dbo.vw_RepuestosPIRMM_5_Full.Faltante, dbo.vw_RepuestosPIRMM_5_Full.ValorDelPuntoPIR, dbo.ExogenasDiasLaborados.DiasLaborados, 
                         ISNULL(dbo.ExogenasPuntosEmpleadosCentro.PuntosPIR, 0) AS PuntosAsignadosEmpleado, ISNULL(dbo.ExogenasPuntosEmpleadosCentro.PuntosPIR, 0) 
                         * dbo.vw_RepuestosPIRMM_5_Full.ValorDelPuntoPIR * dbo.ExogenasDiasLaborados.DiasLaborados / 30 AS Comision
FROM            dbo.vw_RepuestosPIRMM_5_Full INNER JOIN
                         dbo.ExogenasDiasLaborados ON dbo.vw_RepuestosPIRMM_5_Full.Ano_Periodo = dbo.ExogenasDiasLaborados.Ano AND dbo.vw_RepuestosPIRMM_5_Full.Mes_Periodo = dbo.ExogenasDiasLaborados.Mes LEFT OUTER JOIN
                         dbo.ExogenasPuntosEmpleadosCentro ON dbo.vw_RepuestosPIRMM_5_Full.CodigoCentro = dbo.ExogenasPuntosEmpleadosCentro.CodigoCentro AND 
                         dbo.ExogenasDiasLaborados.CodigoEmpleado = dbo.ExogenasPuntosEmpleadosCentro.CodigoEmpleado









```
