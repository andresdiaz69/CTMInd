# Stored Procedure: Sp_Digital_CruceLeadsVentasN

## Usa los objetos:
- [[ComisionesSpigaVN]]
- [[Digital_Canales]]
- [[Digital_Reglas]]
- [[Leads]]
- [[spiga_TercerosCorreos]]
- [[spiga_TercerosTelefonos]]
- [[vw_Terceros_Consolidado]]

```sql

CREATE PROC [dbo].[Sp_Digital_CruceLeadsVentasN]
--MS: 130923 -- se remplaza la tabla de terceros LlamadaAgendamientoDatosTerceroFechaAlta 

--entregaVehiculo
	@ano_EntregaVehiculo VARCHAR(4) 
	, @mes_EntregaVehiculo VARCHAR(2)

--leads
	, @fechaini VARCHAR(8)
	, @fechafin VARCHAR(8)

AS
BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF

	--reporte:
	SELECT reporte.*
	FROM(
	--organizacion de columnas para reporte
		SELECT 
			IdVenta = UPPER(res.Id) 
			, IdLead = UPPER(res.Id_av) 
			, FechaLead = res.Fecha_Lead
			, FechaEntrega = res.FechaEntregaCliente
			, NombreComprador = UPPER(res.NombreTercero)
			, CrucePor = UPPER(res.Cruce)
			, Email = (SELECT TOP 1 L.email FROM Leads L WHERE RES.id_av = L.id_av)
			, Telefono = (SELECT TOP 1 L.telefono FROM Leads L WHERE RES.id_av = L.id_av)
			, Regla = UPPER(res.Fuente)
			, Canal = (SELECT TOP 1 C.Canal FROM Digital_Reglas R INNER JOIN Digital_Canales C ON C.IdCanal = R.IdCanal WHERE res.fuente LIKE '%'+R.Regla+'%' ORDER BY C.Canal DESC)
			, PrimerContacto = UPPER(res.Asesor_Lead)
			, SegundoContacto = UPPER(res.NombreVendedor)
			, Centro = UPPER(res.Centro)
			, Sede = UPPER(res.Seccion)
			, MarcaVenta = UPPER(res.MarcaVenta)
			, GamaVenta = UPPER(res.GamaVenta)
			, MarcaLead = UPPER(res.MarcaLead)
			, Vin = UPPER(res.Vin)
			, PrecioVehiculo = res.PrecioVehiculo
		FROM(
			--se limpian los leads cruzando fuente con la marca
				SELECT ROW_NUMBER() OVER(PARTITION BY cb.vin ORDER BY cb.vin, cb.id_av DESC) AS Fila, cb.*
				FROM(
					--Se agregan columnas adicionales de la tabla leads
						SELECT ca.*, l.fuente, MarcaLead = l.sitio, l.asesor_actualizacion AS Asesor_Lead
						FROM(
							--cruzar leads seleccionados previamente contra comisiones vn en el mes seleccionado
								SELECT v.id, l.id_av, l.NifCif, v.nombreTercero, l.Cruce, MarcaVenta = v.Marca, GamaVenta = v.Gama, v.VIN, v.NombreVendedor, 
								v.Centro, v.Seccion, v.PrecioVehiculo, l.fecha AS Fecha_Lead, v.FechaEntregaCliente
								FROM  ComisionesSpigaVN v,
									--Distincion de cruce (Telefono o Email)
								 (select distinct a.*,  nifcif, 
								       Cruce = case when (s.email_principal = a.Email) and (s.PkTerceros = a.PkFkTerceros) then 'Email' 
									                else case when (s.email_particular1 = a.email) AND (s.PkTerceros = a.PkFkTerceros) then 'Email' 
													          else case when (s.celular1 = a.mlc_telefono) AND (s.PkTerceros = a.PkFkTerceros) then 'Telefono' 
														                else case when (s.telprincipal = a.mlc_telefono) AND (s.PkTerceros = a.PkFkTerceros) then 'Telefono'
													                          end
												                    end
											              end
										       end
										FROM(--cruce de leads contra datos de tercero por columna 'telefono' --32.041
										select PkFkTerceros,   l.mlc_telefono,      l.email,  l.id_av,    l.fecha,
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
										select PkFkTerceros,   l.mlc_telefono,       l.email,   l.id_av,  l.fecha, 
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
								 WHERE a.PkFkTerceros = s.PkTerceros 
									)l WHERE v.Nit = l.NifCif AND (YEAR(FechaEntregaCliente)=@ano_EntregaVehiculo AND MONTH(FechaEntregaCliente)=@mes_EntregaVehiculo)
							)ca, Leads l WHERE ca.id_av = l.id_av
					)cb
			)res 
	  WHERE res.Fila = 1
	)reporte 
	WHERE PrecioVehiculo >= 0 
	  and (MarcaLead like (CONCAT('%',MarcaVenta,'%')) or MarcaVenta like (CONCAT('%',MarcaLead,'%')))
END


```
