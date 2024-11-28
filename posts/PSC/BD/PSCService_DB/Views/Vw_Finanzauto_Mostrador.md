# View: Vw_Finanzauto_Mostrador

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]
- [[SpigaFichaLlamadaAgendamientoDatosTerceroFechaAlta]]
- [[v_habeas_data]]
- [[vw_terceros_consolidado]]

```sql
CREATE view Vw_Finanzauto_Mostrador as
select distinct  
       CodigoEmpresa,Empresa,NitCliente cedula,
       NombreCliente NombreCliente,	  
	   case when ValorBool = 1 then 'No Contactar'
	        else 'contactar' end habeas,   
	   case when categoriaAgendamiento in('Tarj. Comunidad Casa Toro','Tarj. Comunidad Motorysa') then 'Activo'
	        else 'No Activo' end DescuentoCategoriaTarjeta, categoriaAgendamiento,
	   marca,      	   centro,	   Seccion,	   Referencia,	   DescripcionReferencia,
	   FechaFactura FechaCierre,   NumeroFactura,	   ValorUnitarioReferencia,	   UnidadesVendidas,
	   PorcDescuento,	   Impuestos,	   ValorNeto, 	    CedulaVendedorRepuestos, NombreVendedorRepuestos 	       
 from (
	  select distinct 
	        -- orden = ROW_NUMBER() over(partition by c.vin order by c.FechaFactura desc),
	         c.NitCliente,	       c.NombreCliente,  
	         c.Marca,              c.NumeroFactura,  cc.PkTerceros,
	         c.FechaFactura,   c.Centro,c.TipoMov,
	         FechaNacimiento,    c.Seccion,Empresa,
	         cc.FkProfesiones,      c.ValorUnitarioReferencia,  c.ValorNeto,
	         c.Codigoempresa,  CedulaVendedorRepuestos, NombreVendedorRepuestos,
	         cc.Nifcif,             c.codigocentro,   
			 c.Impuestos,      c.PorcDescuento,    
			 cc.celular1,          ct.categoriacliente categoriaAgendamiento,  c.CategoriaCliente categoriaTaller,
			 c.Referencia,         c.DescripcionReferencia,    c.UnidadesVendidas,
			 cc.TipoDocumento
	    from [dbmlc_0190].dbo.ComisionesSpigaAlmacenAlbaran		c
		--left join   [PSCService_DB].dbo.spiga_vehiculos     v  on v.vin = c.vin
		left join  [DBMLC_0190]..vw_terceros_consolidado   cc        on  cc.Nifcif = c.Nitcliente	 	
		left join [DBMLC_0190]..SpigaFichaLlamadaAgendamientoDatosTerceroFechaAlta ct on ct.PkTerceros = cc.PkTerceros
		   where c.NitCliente not in ('8300049938','9005736668','9013893271','9002830997','8001585381','9003539391','8600190638','9003362494')
			 --and year (c.FechaFactura )in (2021,2020,2024,2022,2023) 		 
		   and c.Codigoempresa in (1,5,6,24)	
		 --  and c.nit = '52709399'
			 ) a   left join	[dbmlc_0190].dbo.v_habeas_data		v	on	a.pkterceros = v.Pkterceros
			
	where-- v.ValorBool is NULL ---enviar marcado el habeas
	    ValorNeto >0--38.348
```
