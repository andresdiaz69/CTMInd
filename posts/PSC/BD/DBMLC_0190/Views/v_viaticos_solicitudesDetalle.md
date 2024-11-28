# View: v_viaticos_solicitudesDetalle

## Usa los objetos:
- [[Tramite_Ciudades]]
- [[Tramite_Departamentos]]
- [[Viaticos_Desplazamiento]]
- [[Viaticos_EnvioArchivos]]
- [[Viaticos_Estados]]
- [[Viaticos_Motivo]]
- [[Viaticos_Solicitudes]]
- [[Viaticos_Tipos]]

```sql


CREATE VIEW [dbo].[v_viaticos_solicitudesDetalle]
AS
SELECT        s.Id, s.CodigoEmpleado, s.FechaSolicitud, s.FechaSalidaViaje, s.FechaResgresoViaje,t.IdTipo, t.Tipo, 
				s.CiudadOrigen, cp.descripcion as 'NombreCiudadOrigen',s.DptoOrigen, dp.descripcion as 'NombreDeptoOrigen',
				s.CiudadDestino, ci.descripcion as 'NombreCiudadDestino' , s.DptoDestino, de.descripcion as 'NombreDeptoDestino',
				s.Motivo, d.Desplazamiento, s.IdEstado, e.Estado, s.FechaAprobado,
				s.ValorParcialAprobado,s.ValorAprobadoAlimentacion,s.ValorAprobadoLavanderia,s.ValorAprobadoPeajes,
				s.IdTipoMotivo, ea.ArchivoTesoreria,ea.ArchivoAnticipo,ea.ArchivoContabilizacion,ea.ArchivoDescuento,ea.ArchivoGastosViaje,
				ea.FechaEnvTesoreria, ea.FechaEnvAnticipo, ea.FechaEnvLegalizacion, ea.FechaEnvDescuentoNomina, ea.FechaEnvNovedades
FROM            dbo.Viaticos_Solicitudes AS s INNER JOIN
                         dbo.Viaticos_Tipos AS t ON s.IdTipo = t.IdTipo INNER JOIN
                         dbo.Viaticos_Desplazamiento AS d ON s.IdDesplazamiento = d.IdDesplazamiento INNER JOIN
                         dbo.Viaticos_Estados AS e ON s.IdEstado = e.IdEstado left join 
						 dbo.Tramite_Departamentos as de on s.DptoDestino = de.departamento left join 
						 dbo.Tramite_Ciudades as ci on s.CiudadDestino = ci.Idciudad and  s.DptoDestino = ci.departamento left join
						 dbo.Tramite_Departamentos as dp on s.DptoOrigen = dp.departamento left join 
						 dbo.Tramite_Ciudades as cp on s.CiudadOrigen = cp.Idciudad and dp.departamento = cp.departamento left join
						 dbo.Viaticos_Motivo as mo on s.IdTipoMotivo = mo.IdMotivo left join
						 dbo.Viaticos_EnvioArchivos as ea on s.id = ea.idsolicitud


```
