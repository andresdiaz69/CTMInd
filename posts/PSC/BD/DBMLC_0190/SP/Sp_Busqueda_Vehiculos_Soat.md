# Stored Procedure: Sp_Busqueda_Vehiculos_Soat

## Usa los objetos:
- [[Empresas]]
- [[spiga_TercerosCorreos]]
- [[spiga_TercerosDirecciones]]
- [[spiga_TercerosTelefonos]]
- [[spiga_TipoClasificacionesVehiculos]]
- [[spiga_Vehiculos]]
- [[spiga_Vehiculos]]
- [[vw_Terceros_Registro_Unico]]

```sql
CREATE procedure Sp_Busqueda_Vehiculos_Soat (
      @Placa varchar(6), 
	  @IdEmpresa int
	  ) as

Begin 
    SET NOCOUNT ON
	SET FMTONLY OFF

 ---Tabla Temporal Vehiculos 
  IF OBJECT_ID(N'tempdb.dbo.#TempSoat', N'U') IS NOT NULL
  DROP TABLE #TempSoat

 --CREAR TABLA TEMPORAL CON EL VEHICULO
select v.Placa,   	         tc.NombreClasificacion TipoVehiculo,   tc.CantidadPasajeros,     tc.CapacidadDeCarga,
       a.vin,                a.NumeroMotor,                         a.NombreModelo,           a.AñoModelo,
	   a.Cilindrada,         a.Servicio,                            FechaVigenciaDesde ='',   a.NumDocumentoPropietario,   
       t.nombre +' '+isnull(t.Apellido1,'')+' '+isnull(t.Apellido2,'') Nombre,    
	   isnull( d.FkCalleTipos,'')    +' '+    isnull(d.NombreCalle ,'') +' '+  isnull(d.Numero,'')  +' '+ isnull(d.Complemento,'') Direccion,          
	   f.numero Telefono,    a.NombreMarca,  	                    a.NombreGama,              FechaSolcitud = GETDATE(),          
	   CorreoPagos  = 'lilian.rodriguez@usc.com.co'
  into #TempSoat	                
  from (select Placa, max(FechaDeActualizacion) fecha   
          from [PSCService_DB]..spiga_Vehiculos (nolock) 
         group by placa)v     
  left join [PSCService_DB].dbo.spiga_Vehiculos (nolock) a on a.Placa = v.Placa
														  and a.FechaDeActualizacion =v.fecha--where VIN='WVWZZZ60ZFT043507'
     
  left join [PSCService_DB]..spiga_TipoClasificacionesVehiculos (nolock) tc on tc.PkCodModelo = a.CodModelo 
                                                                           and tc.PkExtModelo = a.ExtModelo
															               AND tc.PkAnoModelo = a.AñoModelo
                                                                           AND tc.PkFkMarcas  = a.CodigoMarca 
																           and tc.PkFkGamas   = a.CodigoGama
  left join vw_Terceros_registro_unico (nolock) t on t.Nifcif = a.NumDocumentoPropietario
  left join	[PSCService_DB].dbo.spiga_TercerosTelefonos	f	on t.PkTerceros = f.PkFkTerceros 
																	   and f.Principal = 1
  left join  [PSCService_DB].dbo.spiga_TercerosDirecciones d on t.PkTerceros = d.PkFkTerceros
																	   and d.Principal = 1
 where v.Placa = @placa --'MCX133'

 --buscar datos de la empresa

declare @empresa nvarchar(200), @correofac nvarchar(200);

  select distinct @empresa = t.nombre,
         @correofac =m.Email 
  from empresas e
  left join vw_Terceros_registro_unico (nolock) t on t.Nifcif = replace( e.NITEmpresa ,'-','')
  left join [PSCService_DB].dbo.spiga_TercerosCorreos	m	on t.PkTerceros = m.PkFkTerceros 
														   and m.Principal = 1
  where e.CodigoEmpresa = @IdEmpresa

--mostrara la informacion agrupada del vehiculo
select Placa,   	       TipoVehiculo,        CantidadPasajeros,      CapacidadDeCarga,
       vin,                NumeroMotor,         NombreModelo,           AñoModelo,
	   Cilindrada,         Servicio,            FechaVigenciaDesde,     NumDocumentoPropietario,   
       nombre,             Direccion,           Telefono,           NombreMarca,  
	   NombreGama,         FechaSolcitud,       CorreoPagos  ,	        CorreoFactura = @correofac, 
	   Empresa = @empresa
  from #TempSoat

    IF OBJECT_ID(N'tempdb.dbo.#TempSoat', N'U') IS NOT NULL
  DROP TABLE #TempSoat
  end







```
