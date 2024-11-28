# View: Vw_Finanzauto_VentasVN

## Usa los objetos:
- [[ComisionesSpigavn]]
- [[ComisionesSpigaVN]]
- [[spiga_DatosTerceros]]
- [[spiga_GastosVehiculosVO]]
- [[spiga_TipoClasificacionesVehiculos]]
- [[spiga_tipodeventasvehiculos]]
- [[spiga_Vehiculos]]
- [[spiga_VehiculosEntregados]]
- [[vw_Terceros_Consolidado]]

```sql
CREATE view Vw_Finanzauto_VentasVN as
select distinct vn.VIN, v.KmsActuales, vn.CodigoMarca, vn.Marca, vn.CodigoGama, vn.Gama, vn.CodigoModelo, vn.Modelo, vn.AñoModelo,
       vn.IdEmpresas, vn.Empresa, vn.CodigoCentro, vn.Centro, vn.Tipo, vn.FechaEntregaCliente, vn.FechaFactura, vn.Valor,
	   v.FechaDeActualizacion, v.Cilindrada, tv.FechaMatriculacion,tv.SitioPlaca, v.Combustible, v.Carroceria, v.Color, g.GIS, g.GNIS, cv.NombreClasificacion,
	   v.Placa, tv.PerfilCliente, tv.TipoNegocio, tv.TipoVenta, tv.TipoCompra, tv.TipoVentaMarca, tv.TipoFinanciacion, t.Nifcif, t.FkDocumentacionTipos,
	   t.TipoDocumento, t.Nombre_completo, t.Fecha_Alta,   t.FkEstadoCivilTipos,
	   case  when t.FkEstadoCivilTipos = 'C'  then 'Casado/a'
             when t.FkEstadoCivilTipos = 'D'  then 'Divorciado/a'
             when t.FkEstadoCivilTipos = 'DE' then 'Desconocido/a'
             when t.FkEstadoCivilTipos = 'P'  then 'Pareja de hecho'
             when t.FkEstadoCivilTipos = 'S'	then 'Soltero/a'
             when t.FkEstadoCivilTipos = 'SE'	then 'Separado/a'
             when t.FkEstadoCivilTipos = 'V'	then 'Viudo/a' end Estado_civil,
	   t.Sexo, case when t.Sexo = 'H'then 'Hombre' when t.Sexo = 'M'then 'Mujer'else 'Indefinido'end Decripcion_sexo,  
	   t.pkTerceroFormacionNiveles_Iden, t.Nivel, t.FkTerceroCargos,t.Cargo,t.FkActividadTipos,dt.DescripcionActividadTipos,
	   t.NumeroHijos, t.CiudadPrincipal,t.FechaNacimiento, vn.CedulaVendedor, vn.NombreVendedor, cm.PrecioVehiculo, cm.PrecioLista,
	   ValorDto, cm.TotalFactura, cm.Procedencia, cm.NombreVersion, cm.ProcedenciaDetalle, cm.TipoOportunidad, cv.CantidadPasajeros,
	   cv.CapacidadDeCarga
  from [PSCService_DB]..spiga_VehiculosEntregados vn
  inner join (select vin,nit, sum(valor) vr, MAX(FechaEntregaCliente) fch,IdEmpresas
                from [PSCService_DB]..spiga_VehiculosEntregados where tipo='Nuevos'
				 and year(FechaEntregaCliente) >=2018 
				-- and IdEmpresas = 1 and VIN = 'WGH0H262VHAA01606'
               group by vin,nit,IdEmpresas) aa on aa.VIN = vn.VIN
			                   and aa.fch = vn.FechaEntregaCliente
							   and aa.Nit =  vn.nit							   
							   and vr >0
							   and aa.IdEmpresas = vn.IdEmpresas
							   and year(aa.fch)=year(vn.FechaEntregaCliente)

  left join [PSCService_DB]..spiga_Vehiculos v on v.vin = vn.vin
  left join [dbmlc_0190].dbo.ComisionesSpigaVN	cm on cm.codigoempresa = vn.codigoempresa
                                                  and cm.VIN = v.VIN
												  and cm.Ano_Periodo = vn.Ano_Periodo
												  and cm.CodigoCentro = vn.CodigoCentro
												  and cm.Nit = vn.Nit
												  and cm.EntregaEfectiva>0
 join (  select nit, Empresa, vin, gama, sum(EntregaEfectiva) entrega --MS:180424 se agreo validacion anulaciones en la comisiones
	       from [dbmlc_0190]..ComisionesSpigavn c 
		  group by nit, Empresa, vin, gama)ce on ce.VIN = cm.vin
		                                     and ce.Nit = cm.nit
											 and ce.Empresa = cm.Empresa
											 and ce.Gama = cm.Gama
											 and ce.entrega>0
  left join [PSCService_DB]..spiga_GastosVehiculosVO g  on g.VIN = vn.VIN
                                    and g.Ano_Periodo = vn.Ano_Periodo
  								    and g.Mes_Periodo = vn.Mes_Periodo
  left join [PSCService_DB]..[spiga_TipoClasificacionesVehiculos] cv on v.CodModelo = cv.PkCodModelo
                                                   and v.AñoModelo = cv.PkAnoModelo
												   and cv.PkExtModelo = v.ExtModelo
  left join [PSCService_DB]..spiga_tipodeventasvehiculos tv on tv.VIN = vn.VIN
                                        and tv.IdEmpresas = vn.IdEmpresas
										and tv.IdCentros = vn.CodigoCentro
										and tv.Placa = v.placa
										and tv.Ano_Periodo = vn.Ano_Periodo
										and tv.Mes_Periodo = vn.Mes_Periodo 
  left join [DBMLC_0190]..vw_Terceros_Consolidado  t on t.Nifcif = vn.Nit
  left join [PSCService_DB]..spiga_DatosTerceros dt on dt.PkTerceros = t.PkTerceros
 where vn.tipo = 'Nuevos' 
   --and year(vn.FechaEntregaCliente) >=2018 
   and vn.IdEmpresas in (1,5,6,24)
   --and vn.Marca not like '%john%'
   and vn.VIN is not null 
   and vn.VIN <>''
 --  and cm.TotalFactura<0
  -- and vn.VIN = 'WV1ZZZ2HZJA020324'


```
