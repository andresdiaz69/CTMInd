# View: vw_DB_Clientes_VO

## Usa los objetos:
- [[ComisionesSpigaVO]]
- [[ComisionesSpigaVO]]
- [[spiga_CategoriaClientes]]
- [[spiga_Terceros]]
- [[spiga_TercerosCargos]]
- [[spiga_TercerosCorreos]]
- [[spiga_TercerosDirecciones]]
- [[spiga_TipoClasificacionesVehiculos]]
- [[spiga_TipoDeVentasVehiculos]]
- [[spiga_vehiculos]]
- [[v_habeas_data]]
- [[vw_Terceros_Consolidado_Telefonos]]

```sql
--****************************
--Autor: Manuel Suarez
-- Date: 22/08/2024
--Descr: Alter VW se agregaron los campos NumeroMotor y Trasmisión .
--****************************
CREATE view vw_DB_Clientes_VO as
select distinct Codigoempresa,	Empresa,	         TipoDocumento,     nit Cedula,	        nombreTercero NombreCliente,	
       Numero Telefono,	        celular1 celular,	 Email,	            ciudad,	            Dirección_correspondencia,	
	   FechaNacimiento,	        cargo,               tipoPersona,
	   case when categoriacliente in('Tarj. Comunidad Casa Toro','Tarj. Comunidad Motorysa') then 'Activo'
	        else 'No Activo' end CategoriaTarjeta,
	   Marca,	                Gama,	             Modelo   ,	        AñoModelo,	        placa,	   
	   vin, 	                NumeroMotor,         Combustible,	    Cilindrada,	        Trasmisión,
	   NombreVendedor,		    NombreClasificacion, Centro,	        Seccion,	        FechaFactura,	
	   FechaEntregaCliente,     color, 	             Procedencia,	    Procedenciadetalle, kmsactuales,	  
	   Servicio, 	            TipoVenta,  	     totalfactura	 --  PrecioLista		
 from (
	  select distinct c.CodigoMArca,
	         orden = ROW_NUMBER() over(partition by c.vin order by c.FechaFactura desc),
	         c.Nit,	                c.nombreTercero,         f.TelPrincipal Numero,
	         c.Marca,               c.Gama,                  t.PkTerceros,
	         c.AñoModelo,           c.FechaFactura,          c.Centro,
	         t.FechaNacimiento,     c.vin,       	         c.Seccion,
	         t.FkProfesiones,       c.PrecioVehiculo,        c.NombreVendedor,
	         c.Modelo,              m.Email,                 c.Codigoempresa,
	         t.Nifcif,              c.codigocentro,          c.codigogama,c.Empresa,
			 c.fechaentregacliente, d.provincia ciudad,      v.placa,totalfactura,
			 v.Combustible,         v.Cilindrada,            t.FkDocumentacionTipos,
			 Servicio,			    c.PrecioLista,           kmsactuales,
			 Procedenciadetalle,    cv.NombreClasificacion,  color,
			 t.FkTerceroCargos,     p.Descripcion cargo,     ct.Descripcion CategoriaCliente,
			 NumeroMotor,           celular1,                tdv.TipoVenta , 
			 case when fkterceroclases = 1 then 'Natural'
	              when fkterceroclases = 2 then 'Empresa'
				  else null end tipoPersona, 
			 case when cv.FkCajaVelocidadTipos ='1'   then '12F/12R'
                  when cv.FkCajaVelocidadTipos ='10'  then 'IVT'
                  when cv.FkCajaVelocidadTipos ='11'  then 'MECANICA'
                  when cv.FkCajaVelocidadTipos ='12'  then 'PowerShift 16F/5R'
                  when cv.FkCajaVelocidadTipos ='13'  then 'PowerShift 18F/6R'
                  when cv.FkCajaVelocidadTipos ='14'  then 'PowrQuad 16F/16R'
                  when cv.FkCajaVelocidadTipos ='15'  then 'PowrQuad 16F/16R - Creeper'
                  when cv.FkCajaVelocidadTipos ='2'	  then '12F/12R creeper'
                  when cv.FkCajaVelocidadTipos ='3'	  then '12F/4R Syncro'
                  when cv.FkCajaVelocidadTipos ='4'	  then '12F/4R Syncro - Creeper'
                  when cv.FkCajaVelocidadTipos ='5'	  then '9F/3R'
                  when cv.FkCajaVelocidadTipos ='6'	  then '9F/3R Creeper'
                  when cv.FkCajaVelocidadTipos ='7'	  then 'AutoQuad PLUS 20F/20R'
                  when cv.FkCajaVelocidadTipos ='8'	  then 'CVT'
                  when cv.FkCajaVelocidadTipos ='9'	  then 'Hydro'
                  when cv.FkCajaVelocidadTipos ='A'	  then 'AUTOMATICA'
                  when cv.FkCajaVelocidadTipos ='M'	  then 'MANUAL'
				  else null end Trasmisión ,
			 TipoDocumento=case FkDocumentacionTipos when 1 then 'NIT' 
			                                     when 2 then 'CEDULA'
												 when 3 then 'Tarjeta Extranjería'
												 when 4 then 'Pasaporte'
												 when 5 then 'RUT'
												 when 6 then 'Tarjeta Identidad'
												 when 7 then 'Cédula de Extranjería'end,
			 isnull( d.FkCalleTipos,'')  +' '+ isnull(d.NombreCalle ,'')    +' '+    isnull(d.Numero,'')+' '+  isnull(d.Complemento,'') Dirección_correspondencia ,procedencia
	    from [dbmlc_0190].dbo.ComisionesSpigaVo c
		join (select nit, Empresa, vin, gama, sum(EntregaEfectiva) entrega 
	            from ComisionesSpigaVo c 
		       group by nit, Empresa, vin, gama) ce on ce.VIN = c.vin
		                                           and ce.Nit = c.nit
											       and ce.Empresa = c.Empresa
											       and ce.Gama = c.Gama
		left join [PSCService_DB].dbo.spiga_vehiculos     v  on v.vin = c.vin
		left join [PSCService_DB].[dbo].[spiga_TipoDeVentasVehiculos] tdv on tdv.VIN = v.VIN
																		  and tdv.IdEmpresas = c.Codigoempresa
																		  and tdv.IdCentros = c.CodigoCentro
																		  --and tdv.Factura = c.NumeroFactura
		left join [PSCService_DB]..[spiga_TipoClasificacionesVehiculos] cv on v.CodModelo = cv.PkCodModelo
                                                                            and v.AñoModelo = cv.PkAnoModelo
												                            and cv.PkExtModelo = v.ExtModelo
	    left join [PSCService_DB].dbo.spiga_Terceros		t	on c.Nit = t.Nifcif	    
		left join vw_terceros_consolidado_telefonos         f   on f.PkTerceros = t.PkTerceros
	    left join [PSCService_DB].dbo.spiga_TercerosCorreos	m	on t.PkTerceros = m.PkFkTerceros 
	                                                           and m.Principal = 1
		left join [PSCService_DB].dbo.spiga_TercerosDirecciones d on t.PkTerceros = d.PkFkTerceros
		                                                           and d.Principal = 1
		left join [PSCService_DB].dbo.spiga_TercerosCargos  p on p.PkTerceroCargos_Iden = t.FkTerceroCargos
		left join [PSCService_DB]..spiga_CategoriaClientes ct on ct.PkFkTerceros = t.PkTerceros
														     and ct.Descripcion like 'Tarj. Comunidad%'
	   where c.Nit not in ('8300049938','9005736668','9013893271','9002830997','8001585381','9003539391','8600190638','9003362494')
	     and ce.entrega >0
	  ) a   
 left join	[dbmlc_0190].dbo.v_habeas_data		v	on	a.pkterceros = v.Pkterceros

where v.ValorBool is NULL
  and orden = 1

```
