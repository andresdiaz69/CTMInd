# View: vw_TallerSupervisoresColisionMM_5

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[vw_RangosVersionesMax]]
- [[vw_TallerSupervisoresColisionMM_4]]

```sql




CREATE VIEW [dbo].[vw_TallerSupervisoresColisionMM_5]
AS
SELECT        dbo.vw_TallerSupervisoresColisionMM_4.Ano_Periodo, dbo.vw_TallerSupervisoresColisionMM_4.Mes_Periodo, dbo.vw_TallerSupervisoresColisionMM_4.CodigoEmpresa, dbo.vw_TallerSupervisoresColisionMM_4.CodigoSupervisor, 
                         ISNULL(dbo.Empleados.CodigoEmpleado, 0) AS CodigoEmpleado, dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS Empleado, dbo.Empleados.FechaRetiro, 
                         dbo.vw_TallerSupervisoresColisionMM_4.ValorVariable, SUM(dbo.vw_TallerSupervisoresColisionMM_4.ValorBase_MAT_Recaudo) AS ValorBase_MAT, SUM(dbo.vw_TallerSupervisoresColisionMM_4.ValorBase_MO_Recaudo) AS ValorBase_MO, 
                         SUM(dbo.vw_TallerSupervisoresColisionMM_4.ValorBase_MAT_Recaudo) + SUM(dbo.vw_TallerSupervisoresColisionMM_4.ValorBase_MO_Recaudo) AS ValorBase_TOTAL, dbo.vw_RangosVersionesMax.IdRangoMaestra, 
                         dbo.vw_RangosVersionesMax.IdRangoVersionMax, SUM(dbo.vw_TallerSupervisoresColisionMM_4.ValorNeto_TOTAL) AS ValorNeto_TOTAL
FROM            dbo.EmpleadosRangosMaestras LEFT OUTER JOIN
                         dbo.vw_RangosVersionesMax ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMax.IdRangoMaestra RIGHT OUTER JOIN
                         dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado RIGHT OUTER JOIN
                         dbo.vw_TallerSupervisoresColisionMM_4 ON dbo.Empleados.CodigoEmpleado = dbo.vw_TallerSupervisoresColisionMM_4.CodigoSupervisor
GROUP BY dbo.vw_TallerSupervisoresColisionMM_4.Ano_Periodo, dbo.vw_TallerSupervisoresColisionMM_4.Mes_Periodo, dbo.vw_TallerSupervisoresColisionMM_4.CodigoEmpresa, dbo.vw_TallerSupervisoresColisionMM_4.CodigoSupervisor, 
                         dbo.vw_RangosVersionesMax.IdRangoMaestra, dbo.vw_RangosVersionesMax.IdRangoVersionMax, dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2, dbo.Empleados.FechaRetiro, 
                         ISNULL(dbo.Empleados.CodigoEmpleado, 0), dbo.vw_TallerSupervisoresColisionMM_4.ValorVariable








```
