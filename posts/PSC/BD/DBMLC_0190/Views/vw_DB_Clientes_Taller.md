# View: vw_DB_Clientes_Taller

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]
- [[spiga_CategoriaClientes]]
- [[spiga_EntradasATaller]]
- [[spiga_Terceros]]
- [[spiga_TercerosCargos]]
- [[spiga_TercerosCorreos]]
- [[spiga_TercerosDirecciones]]
- [[spiga_TercerosTelefonos]]
- [[spiga_TipoClasificacionesVehiculos]]
- [[spiga_vehiculos]]
- [[v_habeas_data]]

```sql
--Servicio o Taller

--****************************
--Autor: Manuel Suarez
-- Date: 22/08/2024
--Descr: Alter VW se agregaron los campos cilindrada,NumeroMotor y Trasmisión .
--****************************
CREATE view vw_DB_Clientes_taller as
select distinct   Codigoempresa,   Empresa,    TipoDocumento,       NitCliente cedula,    NombreCliente , Numero      Telefono,	
	   ciudad,    Dirección_correspondencia,   Email,  cargo,       FechaNacimiento,      NombreMarca,    NombreGama,  Modelo,	
	   AñoModelo, VIN,	 placa,                NombreClasificacion, Combustible,           Cilindrada ,  kmsactuales, NumeroMotor,
	   Centro,    seccion,	 	               Trasmisión,
	   case when categoriaAgendamiento in('Tarj. Comunidad Casa Toro','Tarj. Comunidad Motorysa') then 'Activo'
	        else 'No Activo' end DescuentoCategoriaTarjeta, DescripcionTrabajoTipos,DescripcionMotivoEntrada,
	   DescripcionTrabajo,	   NumOT,	NumeroFacturaTaller,             FechaFactura	, --	FechaAperturaOrden,FechaCierre,	 
	   tipoOperacion,	    TipoIntCargo,	CedulaVendedorRepuestos,     NombreVendedorRepuestos ,  
	   a.CedulaAsesorServicioResponsable,   a.AsesorServicioResponsable,
	   sum(valorNeto) valor  --ValorUnitario, UnidadesVendidas,	   PorcentajeDescuento,	   ImporteImpuesto	    
from (
	  select distinct a.NitCliente,
	         a.NombreCliente,  m.Email,	           f.Numero,             t.PkTerceros,  t.FechaNacimiento,
	         a.VIN,            a.Placa,	           a.NumOT,              a.nombreMarca,
	         a.NombreGama,     d.Poblacion ciudad, d.FkCalleTipos        +' '+  d.NombreCalle +' '+  d.Numero  +' '+  d.Complemento Dirección_correspondencia ,
			 a.centro,         a.FechaFactura,	   a.DescripcionTrabajo, v.NombreModelo modelo,
			 a.gama,           CodModelo, 		   FkDocumentacionTipos, v.AñoModelo,
			 a.valorNeto,	   tipoOperacion	,  a.Empresa,            a.Codigoempresa,
			 p.Descripcion cargo, a.TipoIntCargo , kmsactuales,          Seccion  , 
			 cc.Descripcion categoriaAgendamiento, FechaAperturaOrden,   a.fechaentrega FechaCierre,
			 ValorUnitario,	  UnidadesVendidas,	   PorcentajeDescuento,	 ImporteImpuesto,CedulaVendedorRepuestos, 
			 NombreVendedorRepuestos,              a.NumeroFacturaTaller, cv.NombreClasificacion,
			 v.Combustible,     v.Cilindrada,      a.CedulaAsesorServicioResponsable,  a.AsesorServicioResponsable,
			 DescripcionTrabajoTipos,DescripcionMotivoEntrada, v.NumeroMotor, 
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
												 when 7 then 'Cédula de Extranjería'end
	    from [dbmlc_0190].dbo.ComisionesSpigaTallerPorOT					          a
		left join (select convert(varchar,AñoOT)+'\'+SerieOT+'\'+convert(varchar,NumOT)+'\'+convert(varchar,NumTrabajo) Numot,
		                  DescripcionTrabajoTipos,DescripcionMotivoEntrada
		             from [PSCService_DB]..spiga_EntradasATaller ) et on et.Numot = a.NumOT
	    left join	[PSCService_DB].dbo.spiga_Terceros			  t	on a.NitCliente = t.Nifcif
		left join   [PSCService_DB].dbo.spiga_vehiculos            v  on v.vin = a.VIN
		left join   [PSCService_DB].[dbo].[spiga_TipoClasificacionesVehiculos] cv on v.CodModelo = cv.PkCodModelo
																				 and v.ExtModelo = cv.PkExtModelo
																				 and v.AñoModelo = cv.PkAnoModelo
	    left join	[PSCService_DB].dbo.spiga_TercerosTelefonos	  f	on t.PkTerceros = f.PkFkTerceros 
		                                                           and f.Principal = 1
	    left join	[PSCService_DB].dbo.spiga_TercerosCorreos	  m	on t.PkTerceros = m.PkFkTerceros 
		                                                           and m.Principal = 1
	    left join   [PSCService_DB].dbo.spiga_TercerosDirecciones d on t.PkTerceros = d.PkFkTerceros
		                                                           and d.Principal = 1
        left join [PSCService_DB].dbo.spiga_TercerosCargos p on p.PkTerceroCargos_Iden = t.FkTerceroCargos
		left join [PSCService_DB]..spiga_CategoriaClientes cc on cc.PkFkTerceros =t.PkTerceros
															 and cc.Descripcion like 'Tarj. Comunidad%'
	  where a.NitCliente not in ('8300049938','9005736668','9013893271','9002830997','8001585381','9003539391','8600190638')	
	   ) a	
 left join	[dbmlc_0190].dbo.v_habeas_data	v	on	a.PkTerceros = v.Pkterceros
where v.ValorBool is NULL
and a.TipoIntCargo not in ( 'A','I','GA','G')
group by Codigoempresa,   Empresa,  TipoDocumento,   NitCliente ,   NombreCliente , Numero , Trasmisión,	
	  ciudad,   Dirección_correspondencia,	   Email,	cargo, FechaNacimiento,  NombreMarca, NombreGama,  Modelo,	
	  AñoModelo,  VIN,	 placa, NombreClasificacion, Combustible, Cilindrada ,  kmsactuales,	 Centro,  seccion,	 	   
	  categoriaAgendamiento , DescripcionTrabajoTipos,DescripcionMotivoEntrada, NumeroMotor,
	  DescripcionTrabajo,	   NumOT,	NumeroFacturaTaller,   FechaFactura	, --	FechaAperturaOrden,FechaCierre,	 
	  tipoOperacion,	   TipoIntCargo,	CedulaVendedorRepuestos, NombreVendedorRepuestos ,  
	  a.CedulaAsesorServicioResponsable,  a.AsesorServicioResponsable

```
