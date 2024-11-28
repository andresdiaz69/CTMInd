# Stored Procedure: usp_FichaLlamadaAgendamiento_Seguros

## Usa los objetos:
- [[spiga_Terceros]]
- [[spiga_TercerosTelefonos]]
- [[spiga_Vehiculos]]
- [[spiga_VehiculosSeguros]]
- [[vw_Terceros_Registro_Unico]]

```sql

CREATE procedure [usp_FichaLlamadaAgendamiento_Seguros] (@telefono nvarchar(15)=null, @placa nvarchar(20)=null, @vin nvarchar(17)=null, @IdDocumentacionTipos tinyint=null, @NumDocumento nvarchar(20)=null)
AS
SET FMTONLY OFF

--Terceros de la cabecera
create table #Terceros (IdTerceros int primary key(IdTerceros))
insert into #Terceros
select distinct IdTerceros
  FROM (select PkTerceros  IdTerceros
		  FROM [PSCService_DB]..spiga_Terceros  t1 with(nolock)
		 INNER JOIN [PSCService_DB]..spiga_TercerosTelefonos as t2 with(nolock) on t2.PkFkTerceros=t1.PkTerceros
         WHERE t2.Numero=@telefono
         UNION
        select r.PkTerceros  IdTerceros 
		  from [PSCService_DB]..spiga_Vehiculos  t1 with(nolock)
		  left join vw_Terceros_Registro_Unico r on r.Nifcif = t1.NumDocumentoPropietario
         where ((@placa is not null and t1.placa=@placa) or (@vin is not null and t1.vin=@vin)) 
		   and NumDocumentoPropietario is not null
         UNION
        select PkTerceros  IdTerceros 
		  from [PSCService_DB]..spiga_Vehiculos  t1 with(nolock)
		  left join vw_Terceros_Registro_Unico r on r.Nifcif = t1.NumDocumentoConductor
         where ((@placa is not null and t1.Placa=@placa) or (@vin is not null and t1.vin=@vin)) 
		   and NumDocumentoConductor is not null
         UNION
        select PkTerceros  IdTerceros
		  FROM [PSCService_DB]..spiga_Terceros  t1 with(nolock) 
         WHERE t1.FkDocumentacionTipos=@IdDocumentacionTipos 
		   and t1.NifCif=@NumDocumento
        ) as t

create table #Vehiculos (IdVehiculos int primary key(IdVehiculos))
insert into #Vehiculos
SELECT distinct IdVehiculos
  FROM (SELECT t5.IdVehiculos as IdVehiculos 
          FROM #Terceros as t1
		  left join vw_Terceros_Registro_Unico r on r.PkTerceros = t1.IdTerceros
		 inner join [PSCService_DB]..spiga_Vehiculos as t5 with(nolock) on t5.NumDocumentoPropietario=r.Nifcif
         where ((@placa is null and @vin is null) or (@placa is not null and t5.Placa=@placa) or (@vin is not null and t5.vin=@vin))
         union
        SELECT IdVehiculos as IdVehiculos 
		  FROM #Terceros as t1 
		  left join vw_Terceros_Registro_Unico r on r.PkTerceros = t1.IdTerceros
		 inner join [PSCService_DB]..spiga_Vehiculos as t5 with(nolock) on t5.NumDocumentoConductor=r.Nifcif
         where ((@placa is null and @vin is null) or (@placa is not null and t5.placa=@placa) or (@vin is not null and t5.vin=@vin))
       ) as t

select t4.IdVehiculos, t1.DescripcionSeguroTipos as DescripcionSeguroTipos,t1.IdTerceros as IdTerceros,
       NombreSeguro as Compañia, t1.FechaAlta as FechaAlta,
	   t1.FechaVencimiento as FechaVencimiento,t1.Importe as Importe,t1.ImporteFranquicia as ImporteFranquicia,
	   t1.NumeroPoliza
  from [PSCService_DB]..spiga_VehiculosSeguros as t1 with(nolock)
 inner join #Vehiculos as t4 on t4.IdVehiculos=t1.IdVehiculos							  
 where t1.FechaBaja is null
-- and vin ='WFOCP6A99G1B54378'
 order by t1.FechaAlta


 --select *  from [PSCService_DB]..spiga_VehiculosSeguros where vin ='WFOCP6A99G1B54378'
```
