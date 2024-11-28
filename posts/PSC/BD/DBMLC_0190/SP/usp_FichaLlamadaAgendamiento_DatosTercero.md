# Stored Procedure: usp_FichaLlamadaAgendamiento_DatosTercero

## Usa los objetos:
- [[spiga_CategoriaClientes]]
- [[spiga_Terceros]]
- [[spiga_TercerosCorreos]]
- [[spiga_TercerosDirecciones]]
- [[spiga_TercerosTelefonos]]
- [[spiga_Vehiculos]]
- [[vw_Terceros_Registro_Unico]]

```sql
CREATE procedure [usp_FichaLlamadaAgendamiento_DatosTercero] (@telefono nvarchar(15)=null, @placa nvarchar(20)=null, @vin nvarchar(17)=null, @IdDocumentacionTipos tinyint=null, @NumDocumento nvarchar(20)=null)
AS
SET FMTONLY OFF

--Terceros de la cabecera
create table #Terceros (IdTerceros int primary key(IdTerceros))
insert into #Terceros
select distinct IdTerceros
  FROM (select PkTerceros IdTerceros 
          FROM [PSCService_DB]..spiga_Terceros t1 with(nolock) 
		 INNER JOIN [PSCService_DB]..spiga_TercerosTelefonos t2 with(nolock) on t2.PkFkTerceros=t1.PkTerceros
         WHERE t2.Numero=@telefono
         UNION
        select r.PkTerceros as IdTerceros 
		  from [PSCService_DB]..spiga_Vehiculos as t1 with(nolock)
		  left join vw_Terceros_Registro_Unico r on r.Nifcif = t1.NumDocumentoPropietario
         where ((@placa is not null and t1.placa=@placa) or (@vin is not null and t1.vin=@vin)) 
		   and NumDocumentoPropietario is not null
         UNION
        select PkTerceros as IdTerceros 
		  from [PSCService_DB]..spiga_Vehiculos as t1 with(nolock)
		  left join vw_Terceros_Registro_Unico r on r.Nifcif = t1.NumDocumentoConductor
         where ((@placa is not null and t1.Placa=@placa) or (@vin is not null and t1.vin=@vin)) 
		   and NumDocumentoConductor is not null
         UNION
        select PkTerceros IdTerceros
		  FROM [PSCService_DB]..spiga_Terceros  t1 with(nolock) 
         WHERE t1.FkDocumentacionTipos=@IdDocumentacionTipos
		   and t1.NifCif=@NumDocumento
       ) t

SELECT t2.PkTerceros, t2.Nombre, t2.Apellido1, t2.Apellido2, t102.numero Celular, t101.Numero Fijo,t9.Direccion,
       t9.Poblacion,case FkDocumentacionTipos when 1 then 'NIT' 
			                                  when 2 then 'CEDULA'
											  when 3 then 'Tarjeta Extranjería'
											  when 4 then 'Pasaporte'
											  when 5 then 'RUT'
											  when 6 then 'Tarjeta Identidad'
											  when 7 then 'Cédula de Extranjería'end TipoDocumento, t2.NifCif, t8.Email, t10.Descripcion CategoriaCliente,  t2.FechaAlta
  FROM #Terceros t1
 INNER JOIN [PSCService_DB]..spiga_Terceros  t2 with(nolock) on t2.PkTerceros=t1.IdTerceros
  LEFT OUTER JOIN (Select t22.PkFkTerceros, max(case when t22.Principal = 1 and t22.FkTelefonoTipos = 1 then t22.PkTerceroTelefonos_Iden
                                                     when t22.FkTelefonoTipos = 1 then t22.PkTerceroTelefonos_Iden end) IdTerceroPrincipal,
						  max(case when t22.Principal = 1 and t22.FkTelefonoTipos = 3 then t22.PkTerceroTelefonos_Iden 
						           when t22.FkTelefonoTipos = 3 then t22.PkTerceroTelefonos_Iden end) IdTelefonoMovil                        
				     From [PSCService_DB]..spiga_TercerosTelefonos t22 with(nolock)
				    Where t22.FechaBaja is null
				    group by t22.PkFkTerceros
				   ) t155 on t155.PkFkTerceros = t2.PkTerceros  
  LEFT OUTER JOIN [PSCService_DB]..spiga_TercerosTelefonos t101 with(nolock) on t101.PkFkTerceros = t155.PkFkTerceros 
                                                          and t101.PkTerceroTelefonos_Iden = t155.IdTerceroPrincipal 
  LEFT OUTER JOIN [PSCService_DB]..spiga_TercerosTelefonos t102 with(nolock) on t102.PkFkTerceros = t155.PkFkTerceros 
														  and t102.PkTerceroTelefonos_Iden = t155.IdTelefonoMovil 
 						  
  LEFT OUTER JOIN (SELECT PkFkTerceros, MAX(Email) Email 
                     from [PSCService_DB]..spiga_TercerosCorreos with(nolock) 
				    where FechaBaja is null and Principal=1
				 group by PkFkTerceros) t8 on t8.PkFkTerceros=t2.PkTerceros
  LEFT OUTER JOIN (SELECT t1.PkFkTerceros, isnull(t1.FkCalleTipos,'') + ' ' + t1.NombreCalle+ isnull(' ' +t1.Numero,'')+isnull(' '+t1.Piso,'') Direccion, t1.Poblacion
				     FROM [PSCService_DB]..spiga_TercerosDirecciones t1 with(nolock) 				   
					INNER JOIN (SELECT PkFkTerceros, MAX(PkTerceroDirecciones_Iden) id
						          FROM [PSCService_DB]..spiga_TercerosDirecciones with(nolock) 
								 where FechaBaja is null 
								   and Principal=1
						         group by PkFkTerceros) t3 on t3.pkfkterceros=t1.pkfkterceros 
														  and t3.id=t1.PkTerceroDirecciones_Iden
				 ) t9 on t9.PkFkTerceros=t2.PkTerceros
LEFT OUTER JOIN (SELECT PkFkTerceros, FkClienteCategorias, Descripcion
				   FROM [PSCService_DB]..[spiga_CategoriaClientes] t1 with(nolock) 
			      GROUP BY PkFkTerceros, FkClienteCategorias, Descripcion) t10 on t10.PkFkTerceros=t2.PkTerceros



```
