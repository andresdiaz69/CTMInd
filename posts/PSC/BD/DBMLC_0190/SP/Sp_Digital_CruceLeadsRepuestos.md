# Stored Procedure: Sp_Digital_CruceLeadsRepuestos

## Usa los objetos:
- [[Digital_Canales]]
- [[Digital_Reglas]]
- [[Leads]]
- [[spiga_TercerosCorreos]]
- [[spiga_TercerosTelefonos]]
- [[vw_Terceros_Consolidado]]
- [[vw_ventas_repuestos_digital]]

```sql
CREATE proc [dbo].[Sp_Digital_CruceLeadsRepuestos]
--MS: 130923 -- se remplaza la tabla de terceros LlamadaAgendamientoDatosTerceroFechaAlta 

--repuestos
	@añoRepuesto VARCHAR(4) 
	, @mesRepuesto VARCHAR(2) 

--leads
	, @fechaini VARCHAR(8)
	, @fechafin VARCHAR(8)

as
begin
	set nocount on
	--set fmtonly off
--reporte:
select reporte.*
  from (--organizacion de columnas para reporte
		select FechaLead = res.fecha,              añoRepuesto = res.Ano_Spiga,
			   mesRepuesto = res.Mes_spiga,        NombreComprador = res.NombreCliente,
			   CrucePor = res.Cruce,               Email = email,
			   Telefono = mlc_telefono,            Regla = res.fuente,
			   Canal = (select top 1 C.Canal 
						  from Digital_Reglas R
						 inner join Digital_Canales C on C.IdCanal = R.IdCanal 
						 where res.fuente like '%'+R.Regla+'%' 
						 order by	C.Canal desc),
			   PrimerContacto = res.Asesor_Lead,   res.Centro, 
			   Sede = res.Seccion,                 MarcaVenta = res.Marca,
			   res.MarcaLead,                      res.Origen, 
			   res.Valor
		  from (--se limpian los leads cruzando fuente con la marca
				select Fila = row_number() over(partition by cb.nifcif, cb.valor order by cb.marca, cb.nifcif, cb.fecha, cb.cruce desc), cb.*
				  from (--cruzar leads seleccionados previamente contra comisiones vn en el mes seleccionado
						select l.*,         v.Ano_Spiga,  v.Mes_spiga,     v.Empresa,  v.Centro,
						       v.Seccion,   v.Marca,      v.NombreCliente, v.Valor,    v.Origen
						  from vw_ventas_repuestos_digital v,
						       --Distincion de cruce (Telefono o Email)
							   (select distinct a.*, nifcif, 
								       Cruce = case when (s.email_principal = a.Email) and (s.PkTerceros = a.PkFkTerceros) then 'Email' 
									                else case when (s.email_particular1 = a.email) AND (s.PkTerceros = a.PkFkTerceros) then 'Email' 
													          else case when (s.celular1 = a.mlc_telefono) AND (s.PkTerceros = a.PkFkTerceros) then 'Telefono' 
														                else case when (s.telprincipal = a.mlc_telefono) AND (s.PkTerceros = a.PkFkTerceros) then 'Telefono'
													                          end
												                    end
											              end
										       end
								  from (--cruce de leads contra datos de tercero por columna 'telefono' --32.041
										select PkFkTerceros,   l.mlc_telefono,      l.email,      l.fecha,
										       l.fuente,   MarcaLead = l.sitio, Asesor_Lead = l.asesor_actualizacion 
										  from [PSCService_DB]..spiga_TercerosTelefonos s 
										 inner join Leads l on s.Numero = l.mlc_telefono
										-- inner join vw_Terceros_Registro_Unico t on t.PkTerceros = s.PkFkTerceros
										 where s.Numero <> '' 
										   and s.FechaBaja is null
										   and (s.Numero not like '0%0' and s.Numero <> '0') 
										--   and t.NifCif is not null 
										   and (l.fecha between @fechaini 
										   and @fechafin)
										 union
									--MS: 130923 se comenta ya que al cmabiar la tabla  no se necesaria la segunda validacion
									----cruce de leads contra datos de tercero por columna 'celular'
									--	select PkFkTerceros,  s.numero celular,            l.email,      l.fecha, 
									--	       l.fuente,  MarcaLead = l.sitio,  Asesor_Lead = l.asesor_actualizacion 
									--	  from [PSCService_DB]..spiga_TercerosTelefonos s 
									--	 inner join Leads l on s.Numero = l.mlc_telefono
									--	-- inner join vw_Terceros_Registro_Unico t on t.PkTerceros = s.PkFkTerceros
									--	 where s.Numero <> ''
									--	   and s.FechaBaja is null
									--	   and (s.Numero not like '0%0' and s.Numero <> '0') 
									--	--   and t.NifCif is not null
									--	   and (l.fecha between @fechaini and @fechafin)
									--	 union
									--cruce de leads contra datos de terceros por columna email
										select PkFkTerceros,   l.mlc_telefono,       l.email,     l.fecha, 
										       l.fuente,   MarcaLead = l.sitio, Asesor_Lead = l.asesor_actualizacion 
										  from [PSCService_DB]..spiga_TercerosCorreos s
										 inner join Leads l on s.Email = l.email
										-- inner join vw_Terceros_Registro_Unico t on t.PkTerceros = s.PkFkTerceros
										 where ((s.email <> '' and s.email not like ('notiene@%') and s.email not like ('a@%') 
										        and s.email not like ('an@%') and s.email <> '0' and s.email not like ('noregistra@%') 
										        and s.email not like ('notienecorreo@%') and s.email not like ('#@#%') and s.Email not in ('no','@'))) 
										 --  and t.NifCif is not null
										   and s.FechaBaja is null
										   and (l.fecha between @fechaini 
										   and @fechafin)
									--	 union
									----cruce de leads contra datos de terceros por columna emailOtro
									--	select PkFkTerceros, l.mlc_telefono, l.email, l.fecha, 
									--	       l.fuente, MarcaLead = l.sitio, Asesor_Lead = l.asesor_actualizacion 
									--	  from [PSCService_DB]..spiga_TercerosCorreos s 
									--	 inner join Leads l on s.Email = l.email
									--	-- inner join vw_Terceros_Registro_Unico t on t.PkTerceros = s.PkFkTerceros
									--	 where ((s.Email <> '' and s.Email not like ('notiene@%') and s.Email not like ('a@%') 
									--	         and s.Email not like ('an@%') and s.Email <> '0' and s.Email not like ('noregistra@%') 
									--	         and s.Email not like ('notienecorreo@%') and s.Email not like ('#@#%') and s.Email not in ('no''@'))) 
									--	   --and t.NifCif is not null 
									--	   and s.FechaBaja is null
									--	   and (l.fecha between @fechaini and @fechafin)
									    )a , vw_Terceros_consolidado s 
								  where	a.PkFkTerceros = s.PkTerceros --order by 1
						    )l
					  where	v.Nitcliente = l.NifCif 
					    and v.Ano_Spiga = @añoRepuesto 
						and Mes_spiga =@mesRepuesto
				)cb
	  )res
where res.Fila = 1
	  )reporte 
where Valor >= 0
order by 4
end ---369



```
