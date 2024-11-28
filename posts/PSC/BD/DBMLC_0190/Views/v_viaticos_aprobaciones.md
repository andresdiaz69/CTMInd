# View: v_viaticos_aprobaciones

## Usa los objetos:
- [[EmpleadosActivos]]
- [[v_Viaticos_detalle]]
- [[Viaticos_Autorizaciones]]

```sql
CREATE VIEW [dbo].[v_viaticos_aprobaciones]
AS	
select  distinct(a.CodigoAprobador) as CedulaAprobador, 
CONCAT(b.Nombres, ' ',b.Apellido1,' ', b.Apellido2 ) as Aprobador,
a.IdSolicitudViaje as Id, c.CodigoEmpleado, c.NombreEmpleado as NombreSolicitante,
c.FechaSolicitud, c.FechaSalidaViaje, c.FechaResgresoViaje,c.Tipo,
c.NombreCiudadOrigen,
c.CiudadOrigen,
c.NombreDeptoOrigen,
c.DptoOrigen,
c.NombreCiudadDestino,
c.CiudadDestino,
c.DptoDestino,
c.NombreDeptoDestino,
c.Motivo,
c.Desplazamiento,c.IdEstado,c.Estado,a.FechaAutorizacion as FechaAprobado,
a.Aprobacion 

from Viaticos_Autorizaciones as a
left join EmpleadosActivos as b on a.CodigoAprobador = b.CodigoEmpleado and Ano_Periodo = year(getdate()) and Mes_Periodo = month(getdate())
inner join v_Viaticos_detalle as c on a.IdSolicitudViaje = c.IdSolicitud

```
