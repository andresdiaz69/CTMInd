# View: vw_Atenea_Comercial_VN

## Usa los objetos:
- [[ComisionesSpigaVN]]
- [[spiga_TercerosContactos]]
- [[spiga_Vehiculos]]
- [[vw_Atenea_Terceros]]

```sql
CREATE view [dbo].[vw_Atenea_Comercial_VN] as
--MS: 050923 se crea de forma separada para vehiculos nuevos
--MS: 051023 se agrega subconsulta de comisiones para dejar solo entregas efectivas
--MS: 041223 se quitan las empresas nuestras y se agregan los cmapos codigo empresa y nombre empresa 
select distinct tc.pkterceros,        tc.Nombre_completo,   Nit,                       tc.Direccion_principal,      tc.Telefono1,
       tc.Telefono2,                  tc.celular1,               tc.email_principal,          tc.ciudadPrincipal,
	   tcc.Nombre_completo Contacto,  tcc.Telefono1 Telefono,    tcc.celular1 Celular,        Placa,
	   cs.vin,                        NombreMarca,               NombreGama,                  NumeroMotor,
	   NombreVendedor,                CedulaVendedor,            FechaFactura,                FechaEntregaCliente,
	   Centro,                        CodigoCentro,              CodOrdenServicio='null',     CodigoMarca,
	   Modelo,						  TipoVH = 'VN' ,            CodigoEmpresa,               Empresa NombreEmpresa-- JCS: 27/07/2023 - PARA FACILITAR LA IDENTIFICACIÓN DEL TIPO DE VEHÍCULO
  from (select vin,nit,NombreVendedor,CedulaVendedor,max(fechafactura)fechafactura,max(FechaEntregaCliente)FechaEntregaCliente,
               Centro, CodigoCentro,Modelo,CodigoMArca,sum(EntregaEfectiva)entrega,Codigoempresa,Empresa
          from [DBMLC_0190].dbo.ComisionesSpigaVN 
		 -- where vin ='JM7VA4WLARN101284'
		  group by vin,nit,NombreVendedor,CedulaVendedor,Centro, CodigoCentro,Modelo,CodigoMArca,Codigoempresa,Empresa)    cs
  join vw_Atenea_Terceros                      tc on tc.Nifcif = cs.Nit
  left join ( select Placa,         vin,         NombreMarca,      NombreGama,              
                     NumeroMotor,   CodigoGama,  orden = ROW_NUMBER() over(partition by vin order by fechadeactualizacion desc)
					from  [PSCService_DB].dbo.spiga_Vehiculos (nolock) a
			   where VIN is not null
		       ) cv on cv.VIN= cs.VIN
			        and cv.orden=1    
  left join [PSCService_DB].[dbo].spiga_TercerosContactos c on c.PkFkTerceros = tc.pkterceros
  left join vw_Atenea_Terceros tcc on tcc.pkterceros = c.PkFkTerceros_Contactos 

where entrega >0
and tc.nifcif not in ('8300049938','9005736668','9013893271','9002830997','9003539391','8600190638','9003362494')
--and year(FechaEntregaCliente) = 2023 
--and MONTH(FechaEntregaCliente)=10
--and cs.vin ='JM7VA4WLARN101284'


```
