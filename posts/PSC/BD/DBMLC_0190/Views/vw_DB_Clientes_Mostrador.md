# View: vw_DB_Clientes_Mostrador

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]
- [[spiga_CategoriaClientes]]
- [[spiga_Terceros]]
- [[spiga_TercerosCorreos]]
- [[spiga_TercerosDirecciones]]
- [[spiga_TercerosTelefonos]]
- [[v_habeas_data]]

```sql


CREATE view [dbo].[vw_DB_Clientes_Mostrador] as
select distinct CodigoEmpresa, Empresa, TipoDocumento, Documento ,NombreCliente,telefono,Email,ciudad,Dirección,FechaNacimiento,
       Marca, Centro, Seccion, DescripcionReferencia,CedulaVendedorRepuestos,   NombreVendedorRepuestos,
	   FechaFactura,--,a.CodigoCentro,a.CodigoSeccion,
	   case when categoriaAgendamiento in('Tarj. Comunidad Casa Toro','Tarj. Comunidad Motorysa') then 'Activo'
	        else 'No Activo' end DescuentoCategoriaTarjeta, ValorNeto
 from (select distinct a.NombreCliente,tel.Numero telefono, provincia ciudad,+' '+  d.NombreCalle +' '+  d.Numero  +' '+  d.Complemento Dirección,
               cor.Email,a.Seccion,t.PkTerceros,marca,centro,a.descripcionReferencia,a.CedulaVendedorRepuestos,a.NombreVendedorRepuestos,
			   a.FechaFactura, CodigoEmpresa,Empresa,NifCif documento,t.FechaNacimiento ,cc.descripcion categoriaAgendamiento,a.ValorNeto ,--u.NombreUnidadNegocio Linea,
			   a.CodigoCentro,a.CodigoSeccion,
			   TipoDocumento=case FkDocumentacionTipos when 1 then 'NIT' 
			                                           when 2 then 'CEDULA'
												       when 3 then 'Tarjeta Extranjería'
												       when 4 then 'Pasaporte'
												       when 5 then 'RUT'
												       when 6 then 'Tarjeta Identidad'
												       when 7 then 'Cédula de Extranjería'end

		 from ComisionesSpigaAlmacenAlbaran				a
		 left join	[PSCService_DB].dbo.spiga_Terceros			t	on a.NitCliente = t.Nifcif
		 left join [PSCService_DB]..spiga_CategoriaClientes cc on cc.PkFkTerceros =t.PkTerceros
															 and cc.Descripcion like 'Tarj. Comunidad%'
		 left join	[PSCService_DB].dbo.spiga_TercerosTelefonos	tel	on t.PkTerceros = tel.PkFkTerceros 
		                                                          and tel.Principal = 1
		 left join	[PSCService_DB].dbo.spiga_TercerosCorreos	cor	on t.PkTerceros = cor.PkFkTerceros 
		                                                          and cor.Principal = 1
		 left join [PSCService_DB].dbo.spiga_TercerosDirecciones d on t.PkTerceros = d.PkFkTerceros
		                                                          and d.Principal = 1
	     --left join UnidadDeNegocio u on --u.CodCentro = a.CodigoCentro
						--			 u.CodSeccion = a.CodigoSeccion
						--			and a.CodigoEmpresa = u.CodEmpresa									
		where a.nitcliente not in ('8300049938','9003539391','9002830997','1','8600190638')
      )a left join	v_habeas_data	v	on	a.pkterceros = v.Pkterceros
where v.ValorBool is NULL
--and Linea like '%for%'
--and year(FechaFactura)>=2019

```
