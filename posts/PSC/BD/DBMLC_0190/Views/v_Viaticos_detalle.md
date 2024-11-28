# View: v_Viaticos_detalle

## Usa los objetos:
- [[EmpleadosActivos]]
- [[v_viaticos_solicitudesDetalle]]
- [[Viaticos_Alimentacion]]
- [[Viaticos_Aprobacion]]
- [[Viaticos_ArchivosOtros]]
- [[Viaticos_Hospedaje]]
- [[Viaticos_Transporte]]

```sql
CREATE VIEW [dbo].[v_Viaticos_detalle]
AS
SELECT distinct a.Id as 'IdSolicitud',	apr.CodigoAutorizador,	a.CodigoEmpleado,	CONCAT(ea.Nombres,' ',ea.Apellido1,' ',Apellido2) AS 'NombreEmpleado' , a.FechaSolicitud, a.FechaSalidaViaje, a.FechaResgresoViaje,a.IdTipo, a.Tipo, 
						a.CiudadOrigen,a.NombreCiudadOrigen, a.DptoOrigen, a.NombreDeptoOrigen, a.CiudadDestino, a.NombreCiudadDestino,
						 a.DptoDestino,a.NombreDeptoDestino,a.Motivo, a.Desplazamiento, a.IdEstado, a.Estado, 
                         a.FechaAprobado, case when b.HotelDesayuno =1 then 'SI' when b.HotelDesayuno = 0 then 'NO' end as 'HotelDesayuno', 
						 b.ValorDesayuno, b.ValorAlmuerzo, b.ValorCena  ,b.CantidadDias, b.ValorUnitarioAlimentacion, b.ValorTotalAlimentacion, c.UnitarioHotel, c.DiasHotel, c.TotalHotel, c.UnitarioLavanderia, c.DiasLavanderia, c.TotalLavanderia, va.UnitarioOtros, va.CantidadOtros,
						 ValorTotalOtros = va.UnitarioOtros * va.CantidadOtros,
                         va.NotasOtros,va.Archivo, d.ValorUnitarioTCASalida, d.CantidadUnidadesTCASalida, d.ValorTotalSalida, d.ValorUnitarioACTRegreso, d.CantidadUnidadesACTRegreso, d.ValorTotalRegreso, d.ValorUnitarioCiudDestino, 
                         d.CantidadUnidadesCiudDestino, d.ValorTotalCiudDestino, d.ValorUnitarioPeajes,d.CantidadUnidadesPeajes,d.ValorTotalPeajes,d.Kilometros,d.ValorTotalKilometros, d.ValorParqueadero,
						 d.ValorUnitarioTiquetesIntermunicipales, d.CantidadUnidadTiquetes, d.ValorTotalTiquetes,
						 a.ValorParcialAprobado as ValorTotalAprobado,a.ValorAprobadoAlimentacion,a.ValorAprobadoLavanderia,a.ValorAprobadoPeajes,ea.CodigoEmpresa as IdEmpresa, ea.Empresa, a.IdTipoMotivo, ea.Unidad_Negocio, ea.Codigo_Cargo,
						 a.ArchivoTesoreria, a.FechaEnvTesoreria, a.ArchivoAnticipo, a.FechaEnvAnticipo, a.ArchivoContabilizacion as ArchivoLegalizacion,
						 a.FechaEnvLegalizacion, a.ArchivoDescuento, a.FechaEnvDescuentoNomina, a.ArchivoGastosViaje as Novedad, a.FechaEnvNovedades,
						 sum ( isnull(d.ValorTotalCiudDestino,0) + isnull(d.ValorTotalSalida,0)+ isnull(d.ValorTotalRegreso,0)+ isnull(b.ValorTotalAlimentacion,0) + isnull(c.TotalHotel,0)+  isnull(c.TotalLavanderia,0)
						 + isnull(d.ValorTotalKilometros,0)+  isnull(d.ValorTotalPeajes,0) + 
						 isnull( va.UnitarioOtros * va.CantidadOtros,0)) + isnull(d.ValorParqueadero,0) + isnull(d.ValorTotalTiquetes, 0)  as ValorSolicitud, 
						 apr.FechaAprobacion
FROM            dbo.v_viaticos_solicitudesDetalle AS a LEFT OUTER JOIN
                         dbo.Viaticos_Alimentacion AS b ON a.Id = b.IdSolicitudAux LEFT OUTER JOIN
                         dbo.Viaticos_Hospedaje AS c ON a.Id = c.IdSolicitudAux LEFT OUTER JOIN
                         dbo.Viaticos_Transporte AS d ON a.Id = d.IdSolicitudAux INNER JOIN 
						 dbo.EmpleadosActivos AS ea ON a.CodigoEmpleado = ea.CodigoEmpleado LEFT OUTER JOIN
						 dbo.Viaticos_ArchivosOtros as va on a.Id = va.IdSolicitudAux LEFT OUTER JOIN
						 dbo.Viaticos_Aprobacion as apr on a.Id = apr.IdSolicitud
						  --where ea.Ano_Periodo = 2023 and ea.Mes_Periodo = 10 --DC PARA TENER INFORMACION 1-11.2023
						 where ea.Ano_Periodo = year(getdate()) and ea.Mes_Periodo = month(getdate())
group by a.Id, apr.CodigoAutorizador, a.CodigoEmpleado,ea.Nombres,ea.Apellido1,Apellido2, a.FechaSolicitud, a.FechaSalidaViaje, a.FechaResgresoViaje,a.IdTipo, a.Tipo, 
a.CiudadOrigen,a.NombreCiudadOrigen, a.DptoOrigen, a.NombreDeptoOrigen, a.CiudadDestino, a.NombreCiudadDestino,a.DptoDestino,a.NombreDeptoDestino,a.Motivo, a.Desplazamiento, a.IdEstado, a.Estado, 
a.FechaAprobado, b.HotelDesayuno, b.ValorDesayuno, b.ValorAlmuerzo, b.ValorCena, b.CantidadDias, b.ValorUnitarioAlimentacion, b.ValorTotalAlimentacion, c.UnitarioHotel, c.DiasHotel, c.TotalHotel, c.UnitarioLavanderia, c.DiasLavanderia, c.TotalLavanderia, va.UnitarioOtros, va.CantidadOtros, 
va.NotasOtros,va.Archivo, d.ValorUnitarioTCASalida, d.CantidadUnidadesTCASalida, d.ValorTotalSalida, d.ValorUnitarioACTRegreso, d.CantidadUnidadesACTRegreso, d.ValorTotalRegreso, d.ValorUnitarioCiudDestino, 
d.CantidadUnidadesCiudDestino, d.ValorTotalCiudDestino, d.ValorUnitarioPeajes,d.CantidadUnidadesPeajes,d.ValorTotalPeajes,d.Kilometros,d.ValorTotalKilometros,d.ValorParqueadero,
d.ValorUnitarioTiquetesIntermunicipales, d.CantidadUnidadTiquetes, d.ValorTotalTiquetes,
a.ValorParcialAprobado,a.ValorAprobadoAlimentacion,a.ValorAprobadoLavanderia,a.ValorAprobadoPeajes, ea.Empresa, a.IdTipoMotivo, ea.Unidad_Negocio, ea.Codigo_Cargo,ea.CodigoEmpresa,
a.ArchivoTesoreria, a.FechaEnvTesoreria, a.ArchivoAnticipo, a.FechaEnvAnticipo, a.ArchivoContabilizacion,  a.ArchivoContabilizacion,
a.FechaEnvLegalizacion, a.ArchivoDescuento, a.FechaEnvDescuentoNomina, a.ArchivoGastosViaje, a.FechaEnvNovedades,apr.FechaAprobacion						
                        

```
