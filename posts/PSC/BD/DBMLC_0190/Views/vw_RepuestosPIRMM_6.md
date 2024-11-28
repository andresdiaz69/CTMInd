# View: vw_RepuestosPIRMM_6

## Usa los objetos:
- [[ExogenasDiasLaborados]]
- [[ExogenasPuntosEmpleadosCentro]]
- [[vw_RepuestosPIRMM_5]]

```sql

CREATE VIEW [dbo].[vw_RepuestosPIRMM_6]
AS
SELECT        dbo.ExogenasDiasLaborados.CodigoEmpleado, dbo.vw_RepuestosPIRMM_5.Ano_Periodo, dbo.vw_RepuestosPIRMM_5.Mes_Periodo, dbo.vw_RepuestosPIRMM_5.CodigoEmpresa, 

							dbo.vw_RepuestosPIRMM_5.CodigoSede, dbo.vw_RepuestosPIRMM_5.NombreSede, 
							dbo.vw_RepuestosPIRMM_5.CodigoCentro, dbo.vw_RepuestosPIRMM_5.NombreCentro, 
							
							
							dbo.vw_RepuestosPIRMM_5.PIRPorcentaje, dbo.vw_RepuestosPIRMM_5.PIRPuntos, dbo.vw_RepuestosPIRMM_5.ValorNetoMostrador, dbo.vw_RepuestosPIRMM_5.ValorNetoTaller, 
                         dbo.vw_RepuestosPIRMM_5.ValorBasePIR, dbo.vw_RepuestosPIRMM_5.Faltante, dbo.vw_RepuestosPIRMM_5.ValorDelPuntoPIR, dbo.ExogenasDiasLaborados.DiasLaborados, 
                         ISNULL(dbo.ExogenasPuntosEmpleadosCentro.PuntosPIR, 0) AS PuntosAsignadosEmpleado, ISNULL(dbo.ExogenasPuntosEmpleadosCentro.PuntosPIR, 0) 
                         * dbo.vw_RepuestosPIRMM_5.ValorDelPuntoPIR * dbo.ExogenasDiasLaborados.DiasLaborados / 30 AS Comision
FROM            dbo.vw_RepuestosPIRMM_5 INNER JOIN
                         dbo.ExogenasDiasLaborados ON dbo.vw_RepuestosPIRMM_5.Ano_Periodo = dbo.ExogenasDiasLaborados.Ano AND dbo.vw_RepuestosPIRMM_5.Mes_Periodo = dbo.ExogenasDiasLaborados.Mes LEFT OUTER JOIN
                         dbo.ExogenasPuntosEmpleadosCentro ON dbo.vw_RepuestosPIRMM_5.CodigoCentro = dbo.ExogenasPuntosEmpleadosCentro.CodigoCentro AND 
                         dbo.ExogenasDiasLaborados.CodigoEmpleado = dbo.ExogenasPuntosEmpleadosCentro.CodigoEmpleado









```
