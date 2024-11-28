# View: vw_TallerPITMM_4

## Usa los objetos:
- [[ExogenasDiasLaborados]]
- [[ExogenasPuntosEmpleadosCentro]]
- [[vw_TallerPITMM_3]]

```sql



CREATE VIEW [dbo].[vw_TallerPITMM_4]
AS
SELECT        dbo.ExogenasDiasLaborados.CodigoEmpleado, dbo.vw_TallerPITMM_3.Ano_Periodo, dbo.vw_TallerPITMM_3.Mes_Periodo, dbo.vw_TallerPITMM_3.CodigoEmpresa, dbo.vw_TallerPITMM_3.CodigoSede, 
                         dbo.vw_TallerPITMM_3.NombreSede,    
						 
						 dbo.vw_TallerPITMM_3.CodigoCentro, dbo.vw_TallerPITMM_3.NombreCentro,
						 
						 dbo.vw_TallerPITMM_3.PITPorcentaje, dbo.vw_TallerPITMM_3.PITPuntos,  dbo.vw_TallerPITMM_3.ValorNetoTaller,
                         dbo.vw_TallerPITMM_3.ValorBasePIT, dbo.vw_TallerPITMM_3.Faltante, dbo.vw_TallerPITMM_3.ValorDelPuntoPIT, dbo.ExogenasDiasLaborados.DiasLaborados, 
                         ISNULL(dbo.ExogenasPuntosEmpleadosCentro.PuntosPIT, 0) AS PuntosAsignadosEmpleado, ISNULL(dbo.ExogenasPuntosEmpleadosCentro.PuntosPIT, 0) 
                         * dbo.vw_TallerPITMM_3.ValorDelPuntoPIT * dbo.ExogenasDiasLaborados.DiasLaborados / 30 AS Comision
FROM            dbo.vw_TallerPITMM_3 INNER JOIN
                         dbo.ExogenasDiasLaborados ON dbo.vw_TallerPITMM_3.Ano_Periodo = dbo.ExogenasDiasLaborados.Ano AND dbo.vw_TallerPITMM_3.Mes_Periodo = dbo.ExogenasDiasLaborados.Mes LEFT OUTER JOIN
                         dbo.ExogenasPuntosEmpleadosCentro ON dbo.vw_TallerPITMM_3.CodigoCentro = dbo.ExogenasPuntosEmpleadosCentro.CodigoCentro AND 
                         dbo.ExogenasDiasLaborados.CodigoEmpleado = dbo.ExogenasPuntosEmpleadosCentro.CodigoEmpleado












```
