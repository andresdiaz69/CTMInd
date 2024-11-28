# View: vw_DirectoresOperacionesMM_3

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[vw_DirectoresOperacionesMM_1]]
- [[vw_RangosVersionesMaxSub]]

```sql
CREATE VIEW [dbo].[vw_DirectoresOperacionesMM_3]
AS
SELECT        dbo.vw_DirectoresOperacionesMM_1.Ano_Periodo, dbo.vw_DirectoresOperacionesMM_1.Mes_Periodo, EMPLEADO.CodigoEmpleado, dbo.vw_DirectoresOperacionesMM_1.ValorNetoMostrador, 
                         dbo.vw_DirectoresOperacionesMM_1.ValorNetoTaller, dbo.vw_DirectoresOperacionesMM_1.ValorNetoTotal, EMPLEADO.IdRangoMaestra, EMPLEADO.IdRangoVersionMax, EMPLEADO.IdComisionModeloSub, 
                         EMPLEADO.IdComisionModeloSubCriterio
FROM            (SELECT        dbo.Empleados.CodigoEmpleado, dbo.Empleados.CodigoEmpresa, dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS Empleado, dbo.Empleados.CodigoCargo, 
                                                    dbo.Empleados.FechaIngreso, dbo.Empleados.DiasLaboradosMesIngreso, dbo.Empleados.FechaRetiro, dbo.Empleados.CodigoCentro, dbo.Empleados.cod_marca, dbo.Empleados.nombre_marca, 
                                                    dbo.Empleados.e_mail, dbo.Empleados.FechaNacimiento, dbo.vw_RangosVersionesMaxSub.IdRangoMaestra, dbo.vw_RangosVersionesMaxSub.IdRangoVersionMax, 
                                                    dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
                          FROM            dbo.EmpleadosRangosMaestras INNER JOIN
                                                    dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado INNER JOIN
                                                    dbo.vw_RangosVersionesMaxSub ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMaxSub.IdRangoMaestra
                          WHERE        (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub = 24) AND (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 24)) AS EMPLEADO CROSS JOIN
                         dbo.vw_DirectoresOperacionesMM_1


```
