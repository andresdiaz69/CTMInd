# View: vw_TallerAsesoresUsadosCT_4

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[ExogenasSatisfaccionClientes]]
- [[vw_RangosVersionesMax]]
- [[vw_TallerAsesoresUsadosCT_3]]
- [[vw_VariablesVersiones]]

```sql


CREATE VIEW [dbo].[vw_TallerAsesoresUsadosCT_4]
AS
SELECT        dbo.vw_TallerAsesoresUsadosCT_3.Ano_Periodo, dbo.vw_TallerAsesoresUsadosCT_3.Mes_Periodo, dbo.vw_TallerAsesoresUsadosCT_3.CodigoEmpresa, 
                         dbo.vw_TallerAsesoresUsadosCT_3.CedulaAsesorServicioResponsable, ISNULL(dbo.Empleados.CodigoEmpleado, 0) AS CodigoEmpleado, 
                         dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS Empleado, dbo.Empleados.FechaRetiro, dbo.vw_TallerAsesoresUsadosCT_3.ValorVariable, 
                         SUM(dbo.vw_TallerAsesoresUsadosCT_3.ValorBase_MAT_Recaudo) AS ValorBase_MAT, SUM(dbo.vw_TallerAsesoresUsadosCT_3.ValorBase_MO_Recaudo) AS ValorBase_MO, 
                         SUM(dbo.vw_TallerAsesoresUsadosCT_3.ValorBase_MAT_Recaudo) + SUM(dbo.vw_TallerAsesoresUsadosCT_3.ValorBase_MO_Recaudo) AS ValorBase_TOTAL, dbo.vw_RangosVersionesMax.IdRangoMaestra, 
                         dbo.vw_RangosVersionesMax.IdRangoVersionMax, SUM(dbo.vw_TallerAsesoresUsadosCT_3.ValorNeto_TOTAL) AS ValorNeto_TOTAL, 
						 
						 ISNULL(SATISFACCION.PorcentajeSatisfaccion, 0.00) AS PorcentajeSatisfaccion, [VAR].ValorVariableSatisfaccion,

                         CASE 
						 WHEN ISNULL(SATISFACCION.PorcentajeSatisfaccion, 0.00) > 95.00 THEN [VAR].ValorVariableSatisfaccion
						 ELSE 0 END AS BonificacionSatisfaccion
						 
						 
FROM            (SELECT        CodigoEmpleado, Ano, Mes, PorcentajeSatisfaccion
                          FROM            dbo.ExogenasSatisfaccionClientes) AS SATISFACCION RIGHT OUTER JOIN
                         dbo.vw_TallerAsesoresUsadosCT_3 ON SATISFACCION.CodigoEmpleado = dbo.vw_TallerAsesoresUsadosCT_3.CedulaAsesorServicioResponsable AND 
                         SATISFACCION.Mes = dbo.vw_TallerAsesoresUsadosCT_3.Mes_Periodo AND SATISFACCION.Ano = dbo.vw_TallerAsesoresUsadosCT_3.Ano_Periodo LEFT OUTER JOIN
                         dbo.EmpleadosRangosMaestras LEFT OUTER JOIN
                         dbo.vw_RangosVersionesMax ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMax.IdRangoMaestra RIGHT OUTER JOIN
                         dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado ON 
                         dbo.vw_TallerAsesoresUsadosCT_3.CedulaAsesorServicioResponsable = dbo.Empleados.CodigoEmpleado CROSS JOIN
                             (SELECT        ValorVariable AS ValorVariableSatisfaccion
                               FROM            dbo.vw_VariablesVersiones
                               WHERE        (IdVariable = 20)) AS [VAR]
GROUP BY dbo.vw_TallerAsesoresUsadosCT_3.Ano_Periodo, dbo.vw_TallerAsesoresUsadosCT_3.Mes_Periodo, dbo.vw_TallerAsesoresUsadosCT_3.CodigoEmpresa, 
                         dbo.vw_TallerAsesoresUsadosCT_3.CedulaAsesorServicioResponsable, dbo.vw_RangosVersionesMax.IdRangoMaestra, dbo.vw_RangosVersionesMax.IdRangoVersionMax, 
                         dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2, dbo.Empleados.FechaRetiro, ISNULL(dbo.Empleados.CodigoEmpleado, 0), dbo.vw_TallerAsesoresUsadosCT_3.ValorVariable, 
                         ISNULL(SATISFACCION.PorcentajeSatisfaccion, 0), [VAR].ValorVariableSatisfaccion



```
