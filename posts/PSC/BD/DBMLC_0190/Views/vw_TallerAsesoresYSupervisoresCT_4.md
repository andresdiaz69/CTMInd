# View: vw_TallerAsesoresYSupervisoresCT_4

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[vw_RangosVersionesMax]]
- [[vw_TallerAsesoresYSupervisoresCT_1]]
- [[vw_TallerAsesoresYSupervisoresCT_2]]
- [[vw_TallerAsesoresYSupervisoresCT_3]]

```sql
CREATE VIEW [dbo].[vw_TallerAsesoresYSupervisoresCT_4]
AS
SELECT        dbo.vw_TallerAsesoresYSupervisoresCT_1.Ano_Periodo, dbo.vw_TallerAsesoresYSupervisoresCT_1.Mes_Periodo, dbo.vw_TallerAsesoresYSupervisoresCT_1.CodigoEmpresa, 
                         dbo.vw_TallerAsesoresYSupervisoresCT_1.CedulaAsesorServicioResponsable, dbo.Empleados.CodigoEmpleado, dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS Empleado, 
                         dbo.Empleados.FechaRetiro, dbo.vw_RangosVersionesMax.IdRangoMaestra, dbo.vw_RangosVersionesMax.IdRangoVersionMax, ISNULL(dbo.vw_TallerAsesoresYSupervisoresCT_2.ValorVariable, 
                         dbo.vw_TallerAsesoresYSupervisoresCT_3.ValorVariable) AS ValorVariable, ISNULL(dbo.vw_TallerAsesoresYSupervisoresCT_2.ValorNeto_MAT, 0) AS ValorNeto_MAT, 
                         ISNULL(dbo.vw_TallerAsesoresYSupervisoresCT_2.ValorBase_MAT, 0) AS ValorBase_MAT, ISNULL(dbo.vw_TallerAsesoresYSupervisoresCT_3.ValorNeto_MO, 0) AS ValorNeto_MO, 
                         ISNULL(dbo.vw_TallerAsesoresYSupervisoresCT_3.ValorBase_MO, 0) AS ValorBase_MO, ISNULL(dbo.vw_TallerAsesoresYSupervisoresCT_2.ValorNeto_MAT, 0) 
                         + ISNULL(dbo.vw_TallerAsesoresYSupervisoresCT_3.ValorNeto_MO, 0) AS ValorNeto_TOTAL, ISNULL(dbo.vw_TallerAsesoresYSupervisoresCT_2.ValorBase_MAT, 0) 
                         + ISNULL(dbo.vw_TallerAsesoresYSupervisoresCT_3.ValorBase_MO, 0) AS ValorBase_TOTAL
FROM            dbo.Empleados LEFT OUTER JOIN
                         dbo.vw_RangosVersionesMax INNER JOIN
                         dbo.EmpleadosRangosMaestras ON dbo.vw_RangosVersionesMax.IdRangoMaestra = dbo.EmpleadosRangosMaestras.IdRangoMaestra ON 
                         dbo.Empleados.CodigoEmpleado = dbo.EmpleadosRangosMaestras.CodigoEmpleado RIGHT OUTER JOIN
                         dbo.vw_TallerAsesoresYSupervisoresCT_3 RIGHT OUTER JOIN
                         dbo.vw_TallerAsesoresYSupervisoresCT_1 ON dbo.vw_TallerAsesoresYSupervisoresCT_3.CodigoEmpresa = dbo.vw_TallerAsesoresYSupervisoresCT_1.CodigoEmpresa AND 
                         dbo.vw_TallerAsesoresYSupervisoresCT_3.Ano_Periodo = dbo.vw_TallerAsesoresYSupervisoresCT_1.Ano_Periodo AND 
                         dbo.vw_TallerAsesoresYSupervisoresCT_3.Mes_Periodo = dbo.vw_TallerAsesoresYSupervisoresCT_1.Mes_Periodo AND 
                         dbo.vw_TallerAsesoresYSupervisoresCT_3.CedulaAsesorServicioResponsable = dbo.vw_TallerAsesoresYSupervisoresCT_1.CedulaAsesorServicioResponsable LEFT OUTER JOIN
                         dbo.vw_TallerAsesoresYSupervisoresCT_2 ON dbo.vw_TallerAsesoresYSupervisoresCT_1.CodigoEmpresa = dbo.vw_TallerAsesoresYSupervisoresCT_2.CodigoEmpresa AND 
                         dbo.vw_TallerAsesoresYSupervisoresCT_1.Ano_Periodo = dbo.vw_TallerAsesoresYSupervisoresCT_2.Ano_Periodo AND 
                         dbo.vw_TallerAsesoresYSupervisoresCT_1.Mes_Periodo = dbo.vw_TallerAsesoresYSupervisoresCT_2.Mes_Periodo AND 
                         dbo.vw_TallerAsesoresYSupervisoresCT_1.CedulaAsesorServicioResponsable = dbo.vw_TallerAsesoresYSupervisoresCT_2.CedulaAsesorServicioResponsable ON 
                         dbo.Empleados.CodigoEmpleado = dbo.vw_TallerAsesoresYSupervisoresCT_1.CedulaAsesorServicioResponsable



```
