# Stored Procedure: usp_FichaLlamadaAgendamiento_HistoricoVehiculos

## Usa los objetos:
- [[Centros]]
- [[spiga_EntradasATaller]]
- [[spiga_Terceros]]
- [[spiga_TercerosTelefonos]]
- [[spiga_Vehiculos]]
- [[vw_Terceros_Registro_Unico]]

```sql
CREATE  procedure [usp_FichaLlamadaAgendamiento_HistoricoVehiculos] (@telefono nvarchar(15)=null, @placa nvarchar(20)=null, @vin nvarchar(17)=null, @IdDocumentacionTipos tinyint=null, @NumDocumento nvarchar(20)=null)
AS
SET FMTONLY OFF

--Terceros de la cabecera
create table #Terceros (IdTerceros int primary key(IdTerceros))
insert into #Terceros
select distinct IdTerceros
  FROM (
        select PkTerceros as IdTerceros
		  FROM [PSCService_DB]..spiga_Terceros as t1 with(nolock)
		 INNER JOIN [PSCService_DB]..spiga_TercerosTelefonos as t2 with(nolock) on t2.PkFkTerceros=t1.PkTerceros
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
        select PkTerceros as IdTerceros
		  FROM [PSCService_DB]..spiga_Terceros as t1 with(nolock) 
         WHERE t1.FkDocumentacionTipos=@IdDocumentacionTipos 
		   and t1.NifCif=@NumDocumento
        ) as t

create table #Vehiculos (IdVehiculos int primary key(IdVehiculos))
insert into #Vehiculos
select distinct IdVehiculos
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

select t12.IdVehiculos, t8.Placa as Placa, t1.DescripcionTrabajoTipos as Descripcion,t1.FechaAlta as FechaAltaTrabajo,
       t1.FechaCierre as FechaCierre, t1.NombreAsesor as EmpleadoAlta,
	   t7.NombreCentro as NombreCentro,t1.Kmts as Kmts
  from [PSCService_DB]..spiga_EntradasATaller as t1 with(nolock) 
 inner join [PSCService_DB]..spiga_Vehiculos as t8 with(nolock) on t8.IdVehiculos=t1.IdVehiculos
 inner join Centros as t7 with(nolock) on t1.IdCentros=t7.CodigoCentro
 inner join #Vehiculos as t12 on t12.IdVehiculos=t8.IdVehiculos
 order by t1.FechaAlta desc

```
