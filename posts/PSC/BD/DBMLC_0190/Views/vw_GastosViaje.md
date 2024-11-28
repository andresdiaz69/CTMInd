# View: vw_GastosViaje

## Usa los objetos:
- [[Jerarquia_EmpleadosNoNomina]]
- [[Tramite_Ciudades]]
- [[Tramite_Departamentos]]
- [[Viaticos_Aprobacion]]
- [[Viaticos_Autorizaciones]]
- [[Viaticos_Desplazamiento]]
- [[Viaticos_EnvioArchivos]]
- [[Viaticos_Estados]]
- [[Viaticos_Solicitudes]]
- [[Viaticos_Tipos]]
- [[vw_GastosViaje_Empleados]]

```sql

CREATE view [dbo].[vw_GastosViaje] as
select vs.id,                                  vs.CodigoEmpleado,                   e.Nombre NombreSolicitante,              
       vs.IdEstado,                            ve.Estado,                           FechaSolicitud, 
	   FechaSalidaViaje,                       FechaResgresoViaje,                  vs.IdTipo,  
	   vt.Tipo,    	                           CiudadOrigen,                        DptoOrigen,  
	   CiudadDestino,                          DptoDestino,                         tco.descripcion nombreCiudadOrigen,
	   tcd.descripcion nombreCiudadDestino,    tdo.descripcion  NombreDptoOrigen,   tdd.descripcion NombreDptoDestido,
	   Motivo,                                 vs.IdDesplazamiento,                 vd.Desplazamiento,  
	   case when va.Aprobacion =1 then va.CodigoAprobador
	        else null end CodigoAutorizador,         
	   case when je.Nombre IS null then j.Nombre
	        when va.Aprobacion =1 then je.Nombre 
			else 'null'end nombreAutorizador,

	   case when vo.ApruebaOtros =1 then vo.CodigoAprobador
	        else null end CodigoAutorizadorOtro,  
	   case when je.Nombre IS null then jo.Nombre
	        when vo.ApruebaOtros =1 then je.Nombre 
			else 'null'end nombreAutorizadorOtro,
	   va.FechaAutorizacion,                   vo.FechaAutorizacion FechaAutorizacionOtros,  vp.FechaAprobacion,                  
	   vp.CodigoAutorizador CodigoAprobador,   a.nombre nombreAprobador,                     vn.FechaEnvTesoreria,  
	   vn.FechaEnvAnticipo,        	           vn.FechaEnvLegalizacion,                      vn.FechaEnvNovedades,     
	   vn.FechaEnvDescuentoNomina,	           vs.ValorParcialAprobado
  from Viaticos_Solicitudes vs
  left join Viaticos_Estados (nolock) ve on ve.IdEstado = vs.IdEstado
  left join vw_GastosViaje_Empleados  (nolock) e on e.CodigoEmpleado = vs.CodigoEmpleado
  left join Viaticos_Tipos (nolock) vt on vt.IdTipo = vs.IdTipo
  left join Tramite_Departamentos (nolock) tdo on tdo.departamento = vs.DptoOrigen
  left join Tramite_Departamentos (nolock) tdd on tdd.departamento = vs.DptoDestino
  left join Tramite_Ciudades  (nolock)    tco on tco.Idciudad     = vs.CiudadOrigen
                                             and tco.departamento = vs.DptoOrigen
  left join Tramite_Ciudades   (nolock)   tcd on tcd.Idciudad     = vs.CiudadDestino
                                             and tcd.departamento = vs.DptoDestino
  left join Viaticos_Desplazamiento (nolock) vd on vd.IdDesplazamiento = vs.IdDesplazamiento
  left join (select IdSolicitudViaje,  Aprobacion,  CodigoAprobador,  FechaAutorizacion , 
                    orden = ROW_NUMBER() over(partition by IdSolicitudViaje order by  FechaAutorizacion desc)
               from Viaticos_Autorizaciones (nolock) 
			  where Aprobacion = 1 
			 ) va on va.IdSolicitudViaje = vs.Id                 
				 and va.orden = 1
  left join (select IdSolicitudViaje,  ApruebaOtros,  CodigoAprobador,  FechaAutorizacion , 
                    orden = ROW_NUMBER() over(partition by IdSolicitudViaje order by  FechaAutorizacion desc)
               from Viaticos_Autorizaciones (nolock)
			  where ApruebaOtros = 1
			 ) vo on vo.IdSolicitudViaje = vs.Id
                 and vo.orden =1
  left join Jerarquia_EmpleadosNoNomina (nolock) je on je.Cedula = va.CodigoAprobador
  left join vw_GastosViaje_Empleados (nolock)  j on j.CodigoEmpleado = va.CodigoAprobador
  left join vw_GastosViaje_Empleados (nolock) jo on jo.CodigoEmpleado = vo.CodigoAprobador
  left join Viaticos_Aprobacion (nolock) vp on vp.IdSolicitud = vs.Id
  left join vw_GastosViaje_Empleados (nolock) a on a.CodigoEmpleado = vp.CodigoAutorizador
  left join Viaticos_EnvioArchivos (nolock) vn  on vn.IdSolicitud = vs.Id
--where vs.Id = 7597
--  order by 1
--select * from Viaticos_Solicitudes  --5.992 --5.033
--select * from Viaticos_Estados
--select * from Viaticos_Tipos
--select * from Departamentos
--select * from Tramite_Ciudades
--select * from Tramite_Departamentos
--select * from Viaticos_Desplazamiento
--select * from Viaticos_Autorizaciones where IdSolicitudViaje = 76 order by 1
--select * from Viaticos_Aprobacion where IdSolicitud = 1597 order by 1
--select * from EmpleadosActivos where CodigoEmpleado =  '1032370461' 

```
