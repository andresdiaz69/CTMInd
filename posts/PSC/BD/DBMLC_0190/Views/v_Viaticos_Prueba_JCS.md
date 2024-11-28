# View: v_Viaticos_Prueba_JCS

## Usa los objetos:
- [[EmpleadosActivos]]
- [[Viaticos_Aprobacion]]
- [[Viaticos_Autorizaciones]]
- [[Viaticos_Solicitudes]]

```sql
CREATE VIEW dbo.Viaticos_Prueba_JCS
AS
SELECT        dbo.Viaticos_Aprobacion.IdSolicitud, dbo.Viaticos_Solicitudes.IdEstado, dbo.Viaticos_Solicitudes.CodigoEmpleado, dbo.EmpleadosActivos.CodigoMarca, dbo.EmpleadosActivos.codigo_centro, 
                         dbo.EmpleadosActivos.Unidad_Negocio, dbo.Viaticos_Autorizaciones.Aprobacion, dbo.Viaticos_Autorizaciones.ApruebaOtros, dbo.Viaticos_Autorizaciones.CodigoAprobador, dbo.Viaticos_Autorizaciones.FechaAutorizacion, 
                         dbo.EmpleadosActivos.Ano_Periodo, dbo.EmpleadosActivos.Mes_Periodo
FROM            dbo.Viaticos_Solicitudes INNER JOIN
                         dbo.Viaticos_Aprobacion ON dbo.Viaticos_Solicitudes.Id = dbo.Viaticos_Aprobacion.IdSolicitud INNER JOIN
                         dbo.Viaticos_Autorizaciones ON dbo.Viaticos_Aprobacion.IdSolicitud = dbo.Viaticos_Autorizaciones.IdSolicitudViaje INNER JOIN
                         dbo.EmpleadosActivos ON dbo.Viaticos_Solicitudes.CodigoEmpleado = dbo.EmpleadosActivos.CodigoEmpleado

```
