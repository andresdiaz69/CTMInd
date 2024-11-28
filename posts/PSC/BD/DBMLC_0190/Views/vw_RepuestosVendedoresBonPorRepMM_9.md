# View: vw_RepuestosVendedoresBonPorRepMM_9

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[vw_RangosVersionesMax]]
- [[vw_RepuestosVendedoresBonPorRepMM_8]]
- [[vw_VariablesVersiones]]

```sql
CREATE VIEW [dbo].[vw_RepuestosVendedoresBonPorRepMM_9]
AS
SELECT        dbo.vw_RepuestosVendedoresBonPorRepMM_8.Ano_Periodo, dbo.vw_RepuestosVendedoresBonPorRepMM_8.Mes_Periodo, dbo.vw_RepuestosVendedoresBonPorRepMM_8.CodigoEmpresa, 
                         dbo.vw_RepuestosVendedoresBonPorRepMM_8.CedulaVendedorRepuestos, dbo.Empleados.CodigoEmpleado, dbo.Empleados.FechaIngreso, dbo.Empleados.DiasLaboradosMesIngreso, dbo.Empleados.FechaRetiro, 
                         dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS Empleado, dbo.vw_RepuestosVendedoresBonPorRepMM_8.CodigoSede, 
                         dbo.vw_RepuestosVendedoresBonPorRepMM_8.NombreSede, 
                         CASE WHEN vw_RangosVersionesMax.IdRangoMaestra = 34 THEN dbo.vw_RepuestosVendedoresBonPorRepMM_8.Presupuesto_Sede ELSE dbo.vw_RepuestosVendedoresBonPorRepMM_8.Presupuesto END AS Presupuesto,
                          CASE WHEN vw_RangosVersionesMax.IdRangoMaestra = 34 THEN dbo.vw_RepuestosVendedoresBonPorRepMM_8.CumplimientoAl15_OT_Sede ELSE dbo.vw_RepuestosVendedoresBonPorRepMM_8.CumplimientoAl15_OT END
                          AS CumplimientoAl15_OT, 
                         CASE WHEN vw_RangosVersionesMax.IdRangoMaestra = 34 THEN dbo.vw_RepuestosVendedoresBonPorRepMM_8.CumplimientoAl15_AL_Sede ELSE dbo.vw_RepuestosVendedoresBonPorRepMM_8.CumplimientoAl15_AL END
                          AS CumplimientoAl15_AL, 
                         CASE WHEN vw_RangosVersionesMax.IdRangoMaestra = 34 THEN dbo.vw_RepuestosVendedoresBonPorRepMM_8.CumplimientoAl15_Sede ELSE dbo.vw_RepuestosVendedoresBonPorRepMM_8.CumplimientoAl15 END AS CumplimientoAl15,
                          CASE WHEN vw_RangosVersionesMax.IdRangoMaestra = 34 THEN dbo.vw_RepuestosVendedoresBonPorRepMM_8.PorcentajeCumplimientoAl15_Sede ELSE dbo.vw_RepuestosVendedoresBonPorRepMM_8.PorcentajeCumplimientoAl15
                          END AS PorcentajeCumplimientoAl15, CASE WHEN vw_RangosVersionesMax.IdRangoMaestra = 35 AND 
                         PorcentajeCumplimientoAl15 >= 60 THEN VAR_VEN.ValorVariable WHEN vw_RangosVersionesMax.IdRangoMaestra = 37 AND 
                         PorcentajeCumplimientoAl15 >= 60 THEN VAR_AUX.ValorVariable WHEN vw_RangosVersionesMax.IdRangoMaestra = 34 AND 
                         PorcentajeCumplimientoAl15_Sede >= 60 THEN VAR_JEFE.ValorVariable ELSE 0 END AS ComisionAl15, 
                         CASE WHEN vw_RangosVersionesMax.IdRangoMaestra = 34 THEN dbo.vw_RepuestosVendedoresBonPorRepMM_8.CumplimientoAl30_OT_Sede ELSE dbo.vw_RepuestosVendedoresBonPorRepMM_8.CumplimientoAl30_OT END
                          AS CumplimientoAl30_OT, 
                         CASE WHEN vw_RangosVersionesMax.IdRangoMaestra = 34 THEN dbo.vw_RepuestosVendedoresBonPorRepMM_8.CumplimientoAl30_AL_Sede ELSE dbo.vw_RepuestosVendedoresBonPorRepMM_8.CumplimientoAl30_AL END
                          AS CumplimientoAl30_AL, 
                         CASE WHEN vw_RangosVersionesMax.IdRangoMaestra = 34 THEN dbo.vw_RepuestosVendedoresBonPorRepMM_8.CumplimientoAl30_Sede ELSE dbo.vw_RepuestosVendedoresBonPorRepMM_8.CumplimientoAl30 END AS CumplimientoAl30,
                          CASE WHEN vw_RangosVersionesMax.IdRangoMaestra = 34 THEN dbo.vw_RepuestosVendedoresBonPorRepMM_8.PorcentajeCumplimientoAl30_Sede ELSE dbo.vw_RepuestosVendedoresBonPorRepMM_8.PorcentajeCumplimientoAl30
                          END AS PorcentajeCumplimientoAl30, dbo.vw_RangosVersionesMax.IdRangoMaestra, dbo.vw_RangosVersionesMax.IdRangoVersionMax, VAR_VEN.ValorVariable AS ValorVariable_Ven, 
                         VAR_AUX.ValorVariable AS ValorVariable_Aux, VAR_JEFE.ValorVariable AS ValorVariable_Jefe
FROM            dbo.vw_RepuestosVendedoresBonPorRepMM_8 LEFT OUTER JOIN
                         dbo.Empleados ON dbo.vw_RepuestosVendedoresBonPorRepMM_8.CedulaVendedorRepuestos = dbo.Empleados.CodigoEmpleado LEFT OUTER JOIN
                         dbo.vw_RangosVersionesMax RIGHT OUTER JOIN
                         dbo.EmpleadosRangosMaestras ON dbo.vw_RangosVersionesMax.IdRangoMaestra = dbo.EmpleadosRangosMaestras.IdRangoMaestra ON 
                         dbo.vw_RepuestosVendedoresBonPorRepMM_8.CedulaVendedorRepuestos = dbo.EmpleadosRangosMaestras.CodigoEmpleado CROSS JOIN
                             (SELECT        ValorVariable
                               FROM            dbo.vw_VariablesVersiones
                               WHERE        (IdVariable = 6)) AS VAR_VEN CROSS JOIN
                             (SELECT        ValorVariable
                               FROM            dbo.vw_VariablesVersiones AS vw_VariablesVersiones_1
                               WHERE        (IdVariable = 7)) AS VAR_AUX CROSS JOIN
                             (SELECT        ValorVariable
                               FROM            dbo.vw_VariablesVersiones AS vw_VariablesVersiones_2
                               WHERE        (IdVariable = 13)) AS VAR_JEFE
WHERE        (dbo.Empleados.FechaRetiro IS NULL) AND (dbo.vw_RepuestosVendedoresBonPorRepMM_8.CedulaVendedorRepuestos IS NOT NULL)


```
