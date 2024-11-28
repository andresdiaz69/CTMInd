# Stored Procedure: usp_CotizacionSegurosSinc

## Usa los objetos:
- [[Centros]]
- [[Compras]]
- [[Empresas]]
- [[Facturacion]]
- [[FacturacionDescripciones]]
- [[FacturacionDet]]
- [[Gamas]]
- [[Marcas]]
- [[Modelos]]
- [[Opcionales]]
- [[Secciones]]
- [[ServicioTipos]]
- [[TerceroCargos]]
- [[TerceroEmails]]
- [[Terceros]]
- [[TerceroTelefonos]]
- [[TrabajoOrdenes]]
- [[Trabajos]]
- [[Tratamientos]]
- [[VehiculoOpcionales]]
- [[Vehiculos]]
- [[ventas]]
- [[VentasDetTerceroCabecera]]

```sql

CREATE procedure [usp_CotizacionSegurosSinc]
(
	@fechaInicial datetime = null,
	@fechaFinal   datetime = null
) AS

--declare  @fechaInicial datetime = null,
-- @fechaFinal datetime = null
declare @ft as bit


SET FMTONLY OFF

set @ft=(case when  @fechaInicial is null and @fechaFinal is null then 0 else 1 end)
 
set @fechaInicial=isnull(@fechaInicial,convert(datetime,'1900-01-01T00:00:00.000',126))
set @fechaFinal=isnull(@fechaFinal,convert(datetime,'9999-12-31T00:00:00.000',126))

SELECT distinct
	   t1.PkFkEmpresas as CodigoEmpresa, t2.Nombre as Empresa, t3.PkCentros as CodigoCentro, t3.Nombre AS NombreCentro, 
	   t4.PkSecciones_Iden as CodigoSeccion, t4.Descripcion as NombreSeccion, t5.NombreTercero as NombresCliente, 
	   t5.NifCif as CedulaCliente, t6.FechaNacimiento as FechaDeNacimiento,
	   isnull(t5.FkCalleTipos,'') + isnull(' '+ t5.NombreCalle,'') + isnull(' ' + t5.Numero,'') + isnull(' '+ t5.Bloque, '') +
	   isnull(' '+ t5.Piso,'') + isnull(' '+ t5.Puerta,'') +isnull(' '+ t5.Complemento,'') + isnull(' '+ t5.FkPaises,'') + isnull(' '+ t5.Poblacion,'') as Dirección, 
	   t13.Numero as Telefono, t14.Numero as Celular, t15.Email as CorreoElectronico,
	   t8.Descripcion AS Ocupacion, t7.Nombre AS Genero, t5.Matricula as Placa, t5.NombreMarca as Marca, t5.NombreGama as Gama,
	   t5.DescripcionModelo as Modelo, t1.FkAñoModelo as Año, t11.Nombre AS Servicio, t10.NumeroMotor as Motor,
	   t5.VIN, t5.DescripcionColor as Color, t16.Cilindrada, t16.NumeroPlazas as NumeroPasajeros, t3.Poblacion as CiudadMatricula, t1.FechaEntregaCliente
  FROM [192.168.80.18].[DMS90280].VN.ventas AS t1 with(nolock)
 INNER JOIN [192.168.80.18].[DMS90280].CM.Empresas AS t2 with(nolock) ON t1.PkFkEmpresas = t2.PkEmpresas
 INNER JOIN [192.168.80.18].[DMS90280].CM.Centros AS t3 with(nolock) ON t1.FkCentros = t3.PkCentros
 INNER JOIN [192.168.80.18].[DMS90280].CM.Secciones AS t4 with(nolock) ON t1.FkSecciones = t4.PkSecciones_Iden
 INNER JOIN [192.168.80.18].[DMS90280].VN.VentasDetTerceroCabecera AS t5 with(nolock) ON t1.PkFkEmpresas = t5.PkFkEmpresas 
																				    AND t1.PkFkAñoExpediente = t5.PkFkAñoExpediente
																				    AND t1.PkFkSeries_Expediente = t5.PkFkSeries_Expediente 
																				    AND t1.PkFkNumExpediente = t5.PkFkNumExpediente
																				    AND t1.PkVentas_Iden = t5.PkFkVentas
 INNER JOIN [192.168.80.18].[DMS90280].CM.Terceros AS t6 with(nolock) ON t5.PkFkTerceros = t6.PkTerceros
  LEFT OUTER JOIN [192.168.80.18].[DMS90280].CM.Tratamientos AS t7 with(nolock) ON t6.FkPaises = t7.PkFkPaises 
																			  AND t6.FkTratamientos = t7.PkTratamientos_Iden
  LEFT OUTER JOIN [192.168.80.18].[DMS90280].CM.TerceroCargos as t8 with(nolock) ON t8.PkTerceroCargos_Iden = t6.FkTerceroCargos
 INNER JOIN [192.168.80.18].[DMS90280].VN.Compras as t9 with(nolock) on t9.PkFkEmpresas = t1.PkFkEmpresas
																   AND t9.PkAñoExpediente = t1.PkFkAñoExpediente 
																   AND t9.PkFkSeries_Expediente = t1.PkFkSeries_Expediente 
																   AND t9.PkNumExpediente = t1.PkFkNumExpediente 
																   AND t9.PkComprasNumDet_Iden = t1.FkComprasNumDet
 INNER JOIN [192.168.80.18].[DMS90280].CM.Vehiculos AS t10 with(nolock) ON t9.FkVehiculos = t10.PkVehiculos_Iden
  LEFT OUTER JOIN [192.168.80.18].[DMS90280].CM.ServicioTipos as t11 with(nolock) on t11.PkServicioTipos = t10.FkServicioTipos
  LEFT OUTER JOIN (Select t22.PkFkTerceros, max(case when t22.Principal = 1 and t22.FkTelefonoTipos = 1 then t22.PkTerceroTelefonos_Iden when t22.FkTelefonoTipos = 1 then t22.PkTerceroTelefonos_Iden end) as IdTerceroPrincipal,
						  max(case when t22.Principal = 1 and t22.FkTelefonoTipos = 3 then t22.PkTerceroTelefonos_Iden when t22.FkTelefonoTipos = 3 then t22.PkTerceroTelefonos_Iden end) as IdTelefonoMovil                        
 				     From [192.168.80.18].[DMS90280].CM.TerceroTelefonos as t22 with(nolock)
				    Where t22.FechaBaja is null
				    group by t22.PkFkTerceros
				   ) as t12 on t12.PkFkTerceros = t6.PkTerceros  
  LEFT OUTER JOIN [192.168.80.18].[DMS90280].CM.TerceroTelefonos as t13 with(nolock) on t13.PkFkTerceros = t12.PkFkTerceros
																				   and t13.PkTerceroTelefonos_Iden = t12.IdTerceroPrincipal 
  LEFT OUTER JOIN [192.168.80.18].[DMS90280].CM.TerceroTelefonos as t14 with(nolock) on t14.PkFkTerceros = t12.PkFkTerceros
																				   and t14.PkTerceroTelefonos_Iden = t12.IdTelefonoMovil 
  LEFT OUTER JOIN (SELECT PkFkTerceros, MAX(Email) as Email 
                     from [192.168.80.18].[DMS90280].CM.TerceroEmails with(nolock) 
				    where FechaBaja is null and Principal=1
				    group by PkFkTerceros) as t15 on t15.PkFkTerceros=t6.PkTerceros
 INNER JOIN [192.168.80.18].[DMS90280].CM.Modelos as t16 with(nolock) ON t16.PkFkMarcas=t10.FkMarcas 
																	and t16.PkFkGamas = t10.FkGamas 
																	AND t16.PkExtModelo = t10.FkExtModelo 
																	AND t16.PkAñoModelo = t10.FkAñoModelo
																	AND t16.PkCodModelo = t10.FkCodModelo
--where t1.PkFkEmpresas=@IdEmpresas and month(t1.FechaEntregaCliente)=@mes and year(t1.FechaEntregaCliente)=@año and t1.fechaabono is null and t1.fkventas_abonado is null
 where (@ft=0 or (t1.FechaEntregaCliente >= @fechaInicial and   t1.FechaEntregaCliente <= @fechaFinal))
 UNION

SELECT distinct    
	   t1.PkFkEmpresas, t3.Nombre, t4.PkCentros, t4.Nombre AS Expr1, t2.PkSecciones_Iden, t2.Descripcion, t1.Cliente_Factura, t6.NifCif, t6.FechaNacimiento, t1.Direccion,
	   t13.Numero as Telefono, t14.Numero as Celular, t15.Email as CorreoElectronico,
	   t8.Descripcion AS Ocupacion, t7.Nombre AS Genero, t10.Matricula as Placa, t17.Nombre as Marca, t18.Nombre as Gama, t16.Nombre as Modelo, t10.FkAñoModelo as Año, t11.Nombre AS Servicio, t10.NumeroMotor as Motor,
	   t10.VIN, null as Color, t16.Cilindrada, t16.NumeroPlazas as NumeroPasajeros, t4.Poblacion as CiudadMatricula,t9.FechaEntrega
  FROM [192.168.80.18].[DMS90280].TA.FacturacionDescripciones AS t1  with(nolock)
 INNER JOIN (SELECT ft.PkFkEmpresas,ft.PkFkCentros,ft.PkFkAñoFactura,ft.PkFkSeries,ft.PkFkNumFactura, s.PkSecciones_Iden, s.Descripcion
			   FROM [192.168.80.18].[DMS90280].TA.FacturacionDet ft with(nolock) 
			  INNER JOIN [192.168.80.18].[DMS90280].TA.Trabajos tr with(nolock)  ON ft.PkFkEmpresas   = tr.PkFkEmpresas 
																		       AND ft.PkFkCentros    = tr.PkFkCentros
																		       AND ft.PkFkAñoOT      = tr.PkFkAñoOT 
																		       AND ft.PkFkSeries_OT  = tr.PkFkSeries 
																		       AND ft.PkFkNumOT      = tr.PkFkNumOT 
																		       AND ft.PkFkNumTrabajo = tr.PkNumTrabajo_Iden 
			  INNER JOIN [192.168.80.18].[DMS90280].CM.Secciones s with(nolock) ON tr.FkSecciones_CargoInterno = s.PkSecciones_Iden
			  GROUP BY ft.PkFkEmpresas,ft.PkFkCentros,ft.PkFkAñoFactura,ft.PkFkSeries,ft.PkFkNumFactura, s.PkSecciones_Iden, s.Descripcion
			) AS t2 ON t2.PkFkEmpresas = t1.PkFkEmpresas 
				   AND t1.PkFkCentros = t2.PkFkCentros 
				   AND t1.PkAñoFactura = t2.PkFkAñoFactura 
				   AND t1.PkFkSeries = t2.PkFkSeries 
				   AND t1.PkNumFactura = t2.PkFkNumFactura 
 INNER JOIN [192.168.80.18].[DMS90280].CM.Empresas AS t3 with(nolock) ON t1.PkFkEmpresas = t3.PkEmpresas 
 INNER JOIN [192.168.80.18].[DMS90280].CM.Centros AS t4 with(nolock) ON t1.PkFkCentros = t4.PkCentros 
 INNER JOIN [192.168.80.18].[DMS90280].TA.Facturacion AS t5 with(nolock) ON t1.PkFkSeries = t5.PkFkSeries 
																	   AND t1.PkFkEmpresas = t5.PkFkEmpresas 
																	   AND t1.PkFkCentros = t5.PkFkCentros 
																	   AND t1.PkAñoFactura = t5.PkAñoFactura 
																	   AND t1.PkNumFactura = t5.PkNumFactura 
 INNER JOIN [192.168.80.18].[DMS90280].CM.Terceros AS t6 with(nolock) ON t5.FkTerceros = t6.PkTerceros
  LEFT OUTER JOIN [192.168.80.18].[DMS90280].CM.Tratamientos AS t7 with(nolock) ON t6.FkPaises = t7.PkFkPaises 
																			  AND t6.FkTratamientos = t7.PkTratamientos_Iden
  LEFT OUTER JOIN [192.168.80.18].[DMS90280].CM.TerceroCargos as t8 with(nolock) ON t8.PkTerceroCargos_Iden = t6.FkTerceroCargos
 INNER JOIN (SELECT FacturacionDet_1.PkFkEmpresas, FacturacionDet_1.PkFkCentros, FacturacionDet_1.PkFkAñoFactura, FacturacionDet_1.PkFkSeries, FacturacionDet_1.PkFkNumFactura, tro.FkVehiculos, tro.FechaEntrega
               FROM [192.168.80.18].[DMS90280].TA.FacturacionDet AS FacturacionDet_1 with(nolock) 
			  INNER JOIN [192.168.80.18].[DMS90280].TA.TrabajoOrdenes tro with(nolock) ON FacturacionDet_1.PkFkEmpresas = tro.PkFkEmpresas 
													   AND FacturacionDet_1.PkFkCentros = tro.PkFkCentros
													   AND FacturacionDet_1.PkFkAñoOT = tro.PkAñoOT
													   AND FacturacionDet_1.PkFkSeries_OT = tro.PkFkSeries
													   AND FacturacionDet_1.PkFkNumTrabajo = tro.PkNumOT
              GROUP BY FacturacionDet_1.PkFkEmpresas, FacturacionDet_1.PkFkCentros, FacturacionDet_1.PkFkAñoFactura, FacturacionDet_1.PkFkSeries, FacturacionDet_1.PkFkNumFactura, tro.FkVehiculos, tro.FechaEntrega
			) AS t9 ON t9.PkFkEmpresas = t1.PkFkEmpresas
				   AND t1.PkFkCentros = t9.PkFkCentros 
				   AND t1.PkAñoFactura = t9.PkFkAñoFactura 
				   AND t1.PkFkSeries = t9.PkFkSeries 
				   AND t1.PkNumFactura = t9.PkFkNumFactura 
 INNER JOIN [192.168.80.18].[DMS90280].CM.Vehiculos AS t10 with(nolock) ON t9.FkVehiculos = t10.PkVehiculos_Iden				
  LEFT OUTER JOIN [192.168.80.18].[DMS90280].CM.ServicioTipos as t11 with(nolock) on t11.PkServicioTipos = t10.FkServicioTipos
  LEFT OUTER JOIN (Select t22.PkFkTerceros, max(case when t22.Principal = 1 and t22.FkTelefonoTipos = 1 then t22.PkTerceroTelefonos_Iden when t22.FkTelefonoTipos = 1 then t22.PkTerceroTelefonos_Iden end) as IdTerceroPrincipal,
						  max(case when t22.Principal = 1 and t22.FkTelefonoTipos = 3 then t22.PkTerceroTelefonos_Iden when t22.FkTelefonoTipos = 3 then t22.PkTerceroTelefonos_Iden end) as IdTelefonoMovil                        
				     From [192.168.80.18].[DMS90280].CM.TerceroTelefonos as t22 with(nolock)
				    Where t22.FechaBaja is null
				    group by t22.PkFkTerceros
				  ) as t12 on t12.PkFkTerceros = t6.PkTerceros  
  LEFT OUTER JOIN [192.168.80.18].[DMS90280].CM.TerceroTelefonos as t13 with(nolock) on t13.PkFkTerceros = t12.PkFkTerceros and t13.PkTerceroTelefonos_Iden = t12.IdTerceroPrincipal 
  LEFT OUTER JOIN [192.168.80.18].[DMS90280].CM.TerceroTelefonos as t14 with(nolock) on t14.PkFkTerceros = t12.PkFkTerceros and t14.PkTerceroTelefonos_Iden = t12.IdTelefonoMovil 
  LEFT OUTER JOIN (SELECT PkFkTerceros, MAX(Email) as Email 
                     from [192.168.80.18].[DMS90280].CM.TerceroEmails with(nolock) 
				    where FechaBaja is null and Principal=1
				    group by PkFkTerceros) as t15 on t15.PkFkTerceros=t6.PkTerceros
 INNER JOIN [192.168.80.18].[DMS90280].CM.Modelos as t16 with(nolock) ON t16.PkFkMarcas=t10.FkMarcas
																	and t16.PkFkGamas = t10.FkGamas
																	AND t16.PkExtModelo = t10.FkExtModelo 
																	AND t16.PkAñoModelo = t10.FkAñoModelo
																	AND t16.PkCodModelo = t10.FkCodModelo
 inner join [192.168.80.18].[DMS90280].CM.Marcas as t17 with(nolock) on t17.PkMarcas=t16.PkFkMarcas
 inner join [192.168.80.18].[DMS90280].CM.Gamas as t18 with(nolock) on t18.PkFkMarcas=t17.PkMarcas 
																  and t18.PkGamas=t16.PkFkGamas
  left outer join [192.168.80.18].[DMS90280].CM.VehiculoOpcionales as t19 with(nolock) on t19.PkFkVehiculos=t10.PkVehiculos_Iden 
																					 and t19.PkFkOpcionalTipos='P'
  left outer join [192.168.80.18].[DMS90280].CM.Opcionales as t20 with(nolock) on t20.PkFkMarcas=t19.PkFkMarcas 
																		     and t20.PkFkGamas=t19.PkFkGamas 
																			 and t20.PkFkCodModelo=t19.PkFkCodModelo 
																			 and t20.PkFkExtmodelo=t19.PkFkExtModelo 
																			 and t20.PkFkAñoModelo=t19.PkFkAñoModelo
																			 and t20.PkFkVersiones=t19.PkFkVersiones 
																			 and t20.PkOpcionales=t19.PkFkOpcionales 
																			 and t20.PkFkOpcionalTipos=t19.PkFkOpcionalTIpos
--where t1.PkFkEmpresas=@IdEmpresas and month(t9.FechaEntrega)=@mes and year(t9.FechaEntrega)=@año 
 where (@ft=0 or (t9.FechaEntrega >= @fechaInicial and  t9.FechaEntrega <= @fechaFinal))
```
