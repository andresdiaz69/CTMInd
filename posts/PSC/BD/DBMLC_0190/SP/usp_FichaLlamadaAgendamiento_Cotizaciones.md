# Stored Procedure: usp_FichaLlamadaAgendamiento_Cotizaciones

## Usa los objetos:
- [[spiga_CotizacionesContactCenter]]
- [[spiga_Terceros]]
- [[spiga_TercerosTelefonos]]
- [[spiga_Vehiculos]]

```sql

create procedure [dbo].[usp_FichaLlamadaAgendamiento_Cotizaciones] (@telefono nvarchar(15)=null, @placa nvarchar(20)=null, @vin nvarchar(17)=null, @IdDocumentacionTipos tinyint=null, @NumDocumento nvarchar(20)=null)
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
       
      select PkTerceros  IdTerceros
		FROM [PSCService_DB]..spiga_Terceros  t1 with(nolock) 
       WHERE t1.FkDocumentacionTipos=@IdDocumentacionTipos 
         and t1.NifCif=@NumDocumento    
      ) as t

--Terceros de la cabecera
create table #Vehiculos (IdVehiculos int primary key(IdVehiculos))
insert into #Vehiculos
select distinct IdVehiculos 
  from [PSCService_DB]..spiga_Vehiculos as t1 with(nolock)
 where ((@placa is not null and t1.Placa=@placa) or (@vin is not null and t1.vin=@vin))


select Empresa,  Centro,  Descripcion, Total, Fecha, FechaValidez,
	   CantidadCotizada,  Gama,  Modelo
  from #Terceros as t1
 inner join [PSCService_DB]..spiga_CotizacionesContactCenter as t2 on t2.PkFkTerceros=t1.IdTerceros

drop table #Terceros
```
