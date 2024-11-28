# View: v_Viaticos_autorizacion

## Usa los objetos:
- [[v_Viaticos_detalle]]
- [[Viaticos_Aprobacion]]

```sql



CREATE VIEW [dbo].[v_Viaticos_autorizacion]
AS	
select va.IdSolicitud,va.CodigoEmpleado,vd.NombreEmpleado,va.CodigoAutorizador,convert(int,va.RealizaViaje) as RealizaViaje,
va.AutorizaViaticos,va.ValorTotalSolicitud,va.FechaCreacion
,va.ObservacionesAprobacion,va.ReciboCaja,vd.FechaSolicitud,vd.FechaSalidaViaje,vd.FechaResgresoViaje
,va.FechaAprobacion as FechaAprobacionAutorizacion, vd.ArchivoTesoreria,vd.ArchivoAnticipo, vd.ArchivoLegalizacion  ArchivoContabilizacion,
vd.ArchivoDescuento,vd.Novedad as ArchivoGastosViaje
from Viaticos_Aprobacion as va 
inner join v_viaticos_detalle as vd on va.IdSolicitud = vd.IdSolicitud


```
