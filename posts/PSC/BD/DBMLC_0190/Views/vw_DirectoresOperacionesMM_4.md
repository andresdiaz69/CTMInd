# View: vw_DirectoresOperacionesMM_4

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[vw_DirectoresOperacionesMM_2]]
- [[vw_RangosVersionesMaxSub]]

```sql
CREATE VIEW [dbo].[vw_DirectoresOperacionesMM_4]
AS
SELECT        dbo.vw_DirectoresOperacionesMM_2.Ano_Periodo, dbo.vw_DirectoresOperacionesMM_2.Mes_Periodo, EMPLEADO.CodigoEmpleado, dbo.vw_DirectoresOperacionesMM_2.ValorNetoTaller, EMPLEADO.IdRangoMaestra, 
                         EMPLEADO.IdRangoVersionMax, EMPLEADO.IdComisionModeloSub, EMPLEADO.IdComisionModeloSubCriterio
FROM            (SELECT        dbo.Empleados.CodigoEmpleado, dbo.Empleados.CodigoEmpresa, dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS Empleado, dbo.Empleados.CodigoCargo, 
                                                    dbo.Empleados.FechaIngreso, dbo.Empleados.DiasLaboradosMesIngreso, dbo.Empleados.FechaRetiro, dbo.Empleados.CodigoCentro, dbo.Empleados.cod_marca, dbo.Empleados.nombre_marca, 
                                                    dbo.Empleados.e_mail, dbo.Empleados.FechaNacimiento, dbo.vw_RangosVersionesMaxSub.IdRangoMaestra, dbo.vw_RangosVersionesMaxSub.IdRangoVersionMax, 
                                                    dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
                          FROM            dbo.EmpleadosRangosMaestras INNER JOIN
                                                    dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado INNER JOIN
                                                    dbo.vw_RangosVersionesMaxSub ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMaxSub.IdRangoMaestra
                          WHERE        (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub = 24) AND (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 25)) AS EMPLEADO CROSS JOIN
                         dbo.vw_DirectoresOperacionesMM_2


```
