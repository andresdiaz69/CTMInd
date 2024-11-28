# View: Vw_Finanzauto_Taller

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]
- [[spiga_vehiculos]]
- [[SpigaFichaLlamadaAgendamientoDatosTerceroFechaAlta]]
- [[v_habeas_data]]
- [[vw_terceros_consolidado]]

```sql
CREATE view Vw_Finanzauto_Taller as
select distinct  
       Codigoempresa,Empresa,NitCliente cedula,       NombreCliente NombreCliente,	  
	   case when ValorBool = 1 then 'No Contactar'
	        else 'contactar' end habeas,   
	   case when categoriaAgendamiento in('Tarj. Comunidad Casa Toro','Tarj. Comunidad Motorysa') then 'Activo'
	        else 'No Activo' end DescuentoCategoriaTarjeta, categoriaAgendamiento,
	   marca,           vin,	       placa,          centro,
	   Seccion,         Codigo,	       descripcion,	   FechaAperturaOrden,
	   FechaFactura     FechaCierre,   NumOT,	   NumeroFacturaTaller,
	   ValorUnitario,	UnidadesVendidas,	   PorcentajeDescuento,	   ImporteImpuesto,
	   ValorNeto, 	    CedulaVendedorRepuestos, NombreVendedorRepuestos  ,TipoCargo
 from (
	  select distinct 
	         orden = ROW_NUMBER() over(partition by c.vin order by c.FechaFactura desc),
	         c.NitCliente,	       c.NombreCliente,  
	         c.Marca,              c.NumOT,          cc.PkTerceros,
	         v.AñoModelo,          c.FechaFactura,   c.Centro,
	         FechaNacimiento,      c.vin,       	 c.Seccion,
	         FkProfesiones,        c.ValorUnitario,  c.ValorNeto,
	         v.NombreModelo,       c.Codigoempresa,  c.TipoCargo,
	         cc.Nifcif,            c.codigocentro,   v.codigogama,
			 c.FechaAperturaOrden, v.placa,          c.NumeroFacturaTaller, 
			 c.ImporteImpuesto,    c.PorcentajeDescuento,     Empresa,
			 cc.celular1,          ct.categoriacliente categoriaAgendamiento,  c.CategoriaCliente categoriaTaller,
			 c.Codigo,             c.descripcion,      c.UnidadesVendidas,
			 cc.TipoDocumento,     CedulaVendedorRepuestos,NombreVendedorRepuestos
	    from [dbmlc_0190].dbo.ComisionesSpigaTallerPorOT   c
		left join   [PSCService_DB].dbo.spiga_vehiculos    v  on v.vin = c.vin    
		left join   [DBMLC_0190]..vw_terceros_consolidado   cc        on  cc.Nifcif = c.NitCliente	  
		left join [DBMLC_0190]..SpigaFichaLlamadaAgendamientoDatosTerceroFechaAlta ct on ct.NifCif = c.NitCliente
		                                                               and ct.CategoriaCliente in('Tarj. Comunidad Casa Toro','Tarj. Comunidad Motorysa')
		   where c.NitCliente not in ('8300049938','9005736668','9013893271','9002830997','8001585381','9003539391','8600190638','9003362494')
			 --and year (c.FechaFactura)in (2023,2022,2020,2021,2024) 
		  --  and MONTH(c.FechaFactura) = (3) 
		   and c.Codigoempresa in (1,5,6,24)
		--   and c.codigocentro = 148		
			 ) a   left join	[dbmlc_0190].dbo.v_habeas_data		v	on	a.pkterceros = v.Pkterceros
			
	where-- v.ValorBool is NULL ---enviar marcado el habeas	   
	    ValorNeto >0 --48.104
```
