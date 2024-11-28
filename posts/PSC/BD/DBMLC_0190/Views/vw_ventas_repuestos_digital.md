# View: vw_ventas_repuestos_digital

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]
- [[ComisionesSpigaTallerPorOT]]
- [[vw_Terceros_Consolidado]]

```sql
CREATE view [dbo].[vw_ventas_repuestos_digital] as
select Ano_Spiga,Mes_spiga,Empresa,Centro,Seccion,Marca,Nitcliente,NombreCliente,
        Celular,Direccion,Email,Fijo,Poblacion,TipoDocumento,Valor,Origen
  from (select distinct --orden=row_number() over (partition by isnull(nifcif,Nitcliente) order by idsincronizacionspiga desc,idConsecutivo desc),
		       Ano_Spiga,Mes_spiga,Empresa,Centro,Seccion,Marca,Nitcliente,NombreCliente,
		       s.celular1 Celular,s.Direccion_Principal Direccion,
			   Email = replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(s.email_principal,char(13)+char(10)+'-',''),char(09),''),char(60),''),char(62),''),char(38),''),char(10),''),char(13),''),char(31),''),char(34),''),char(248),''),
		       s.TelPrincipal Fijo,s.ciudadPrincipal Poblacion,TipoDocumento=case FkDocumentacionTipos when 1 then 'NIT' 
			                                                                                           when 2 then 'CEDULA'
												                                                       when 3 then 'Tarjeta Extranjería'
												                                                       when 4 then 'Pasaporte'
												                                                       when 5 then 'RUT'
												                                                       when 6 then 'Tarjeta Identidad'
												                                                       when 7 then 'Cédula de Extranjería'end,  Valor=sum(valor),Origen
		 from (select Ano_Spiga,Mes_Spiga,Empresa,centro,
				      seccion=replace(replace(replace(replace(replace(replace(seccion,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
				      marca=replace(replace(replace(replace(replace(replace(marca,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),','),
				      Nitcliente,NombreCliente,Valor= sum(ValorNeto),--CategoriaCliente,
					  Origen='Taller'
				 from ComisionesSpigaTallerPorOT
				where TipoOperacion = 'MAT'
			  	  and TipoIntCargo not in ('A','I')
				--and  Ano_Spiga= 2019 and mes_spiga =8 --and NitCliente = '8600095786'
				group by Ano_Spiga,Mes_Spiga,Empresa,centro,seccion,marca,Nitcliente,NombreCliente--,CategoriaCliente
				union all
			   select Ano_Spiga,Mes_Spiga,Empresa,centro,
				      seccion=replace(replace(replace(replace(replace(replace(seccion,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
				      marca=replace(replace(replace(replace(replace(replace(marca,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
				      Nitcliente,NombreCliente,Valor= sum(ValorNeto),--CategoriaCliente,
					  Origen= 'Mostrador'
				 from ComisionesSpigaAlmacenAlbaran
				where TipoMov not in ('VIN','VINA')
				--where Ano_Spiga= 2019 and mes_spiga = 8 --and NitCliente = '8600095786'
				group by Ano_Spiga,Mes_Spiga,Empresa,centro,seccion,marca,Nitcliente,NombreCliente--,CategoriaCliente
		) a left join vw_Terceros_Consolidado s on s.NifCif = a.NitCliente 
		                                           --and isnull(s.CategoriaCliente,'') = isnull(a.CategoriaCliente,'')
		--where Ano_Spiga= 2023 and mes_spiga = 6
  group by Ano_Spiga,Mes_spiga,Empresa,Centro,Seccion,Marca,Nitcliente,NombreCliente,s.Celular1,s.Direccion_Principal,s.email_principal,s.TelPrincipal,s.PkTerceros,
		   s.ciudadPrincipal,s.FkDocumentacionTipos,--a.CategoriaCliente,
		   nifcif,Origen--,idsincronizacionspiga,idConsecutivo,
) b 
--MS-290823-se remplaza la tabla de terceros SpigaFichaLlamadaAgendamientoDatosTerceroFechaAlta por la vista vw_Terceros_Consolidado

```
