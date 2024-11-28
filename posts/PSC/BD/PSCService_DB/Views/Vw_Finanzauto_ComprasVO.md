# View: Vw_Finanzauto_ComprasVO

## Usa los objetos:
- [[Empresas]]
- [[spiga_CompraDeUsados]]
- [[spiga_DatosTerceros]]
- [[spiga_GastosVehiculosVO]]
- [[spiga_TipoClasificacionesVehiculos]]
- [[spiga_tipodeventasvehiculos]]
- [[spiga_Vehiculos]]
- [[vw_Terceros_Consolidado]]

```sql
CREATE view Vw_Finanzauto_ComprasVO as
select distinct co.IdEmpresas, e.NombreEmpresa, co.IdCentros, co.nombre Centro, co.ImporteTotal, co.FechaAsiento FechaFactura,co.IdVehiculos, co.VIN, co.Kms,
       co.Comercializable idComercializable, case Comercializable when 1 then 'Verdadero' else 'Falso' end Comercializable, co.IdMarcas,
	   co.NombreMarca, co.IdGamas, co.NombreGama, co.CodModelo, co.NombreModelo, co.AñoModelo, v.FechaDeActualizacion,
	   v.Cilindrada, v.Combustible, Carroceria,Color, g.GIS, g.GNIS , cv.NombreClasificacion , co.Matricula, tv.PerfilCliente,
	   t.Nifcif, t.FkDocumentacionTipos,t.TipoDocumento, t.Nombre_completo, t.Fecha_Alta, t.FkEstadoCivilTipos,
	   case  when t.FkEstadoCivilTipos = 'C'  then 'Casado/a'
             when t.FkEstadoCivilTipos = 'D'  then 'Divorciado/a'
             when t.FkEstadoCivilTipos = 'DE' then 'Desconocido/a'
             when t.FkEstadoCivilTipos = 'P'  then 'Pareja de hecho'
             when t.FkEstadoCivilTipos = 'S'	then 'Soltero/a'
             when t.FkEstadoCivilTipos = 'SE'	then 'Separado/a'
             when t.FkEstadoCivilTipos = 'V'	then 'Viudo/a' end Estado_civil,
	   t.Sexo, case when t.Sexo = 'H'then 'Hombre' when t.Sexo = 'M'then 'Mujer'else 'Indefinido'end Decripcion_sexo,  
	   t.pkTerceroFormacionNiveles_Iden, t.Nivel, t.FkTerceroCargos,t.Cargo,t.FkActividadTipos,dt.DescripcionActividadTipos,
	   t.NumeroHijos, t.CiudadPrincipal,t.FechaNacimiento

  from [PSCService_DB]..spiga_CompraDeUsados co
 inner join (select IdVehiculos, NumExpediente,max(ComprasNumDet)cont, sum(ImporteCompra) mp
               FROM [PSCService_DB]..spiga_CompraDeUsados-- where   IdVehiculos=275815 --numfactura like '%244151261%'
			  group by IdVehiculos,NumExpediente)a on a.IdVehiculos = co.idVehiculos
			                                        and a.cont = co.ComprasNumDet
									                and a.NumExpediente = co.NumExpediente
									                and a.mp >0
left join [DBMLC_0190]..Empresas e on e.CodigoEmpresa = co.IdEmpresas
--left join [DBMLC_0190]..UnidadDeNegocio u on  u.CodCentro = co.IdCentros
--                                          and u.CodDepartamento = co.IdModuloOrigen
left join [PSCService_DB]..spiga_Vehiculos v on v.IdVehiculos = co.IdVehiculos
left join [PSCService_DB]..[spiga_TipoClasificacionesVehiculos] cv on v.CodModelo = cv.PkCodModelo
                                                 and v.AñoModelo = cv.PkAnoModelo
left join [PSCService_DB]..spiga_GastosVehiculosVO g  on g.VIN = co.VIN
                                    and g.Ano_Periodo = co.Ano_Periodo
									and g.Mes_Periodo = co.Mes_Periodo
left join [PSCService_DB]..spiga_tipodeventasvehiculos tv on tv.VIN = co.VIN
                                        and tv.IdEmpresas = co.IdEmpresas
										and tv.IdCentros = co.IdCentros
										and tv.Placa = co.Matricula
left join [DBMLC_0190]..vw_Terceros_Consolidado  t on t.PkTerceros = co.IdTerceros
left join [PSCService_DB]..spiga_DatosTerceros dt on dt.PkTerceros = t.PkTerceros
where co.IdEmpresas in (1,5,6,24)
--  and year(co.FechaAsiento) >=2018 
```
