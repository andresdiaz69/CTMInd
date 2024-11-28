# Stored Procedure: usp_FichaLlamadaAgendamiento_DatosVehiculos

## Usa los objetos:
- [[ComisionesSpigaVN]]
- [[ComisionesSpigaVO]]
- [[spiga_CompraDeUsados]]
- [[spiga_ComprasVehiculosVN]]
- [[spiga_Gamas]]
- [[spiga_Terceros]]
- [[spiga_TercerosTelefonos]]
- [[spiga_TipoClasificacionesVehiculos]]
- [[spiga_Vehiculos]]
- [[vw_Terceros_Registro_Unico]]

```sql
CREATE procedure [usp_FichaLlamadaAgendamiento_DatosVehiculos] (@telefono nvarchar(15)=null, @placa nvarchar(20)=null, @vin nvarchar(17)=null, @IdDocumentacionTipos tinyint=null, @NumDocumento nvarchar(20)=null)
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

SELECT distinct t2.IdVehiculos,t2.NombreMarca as Marca, t4.Nombre AS Gama, t5.PkCodModelo, t5.PkExtModelo, t5.PkAnoModelo, 
       t5.Nombre AS Modelo, t2.placa, t2.VIN, t2.NumeroMotor, t5.Cilindrada, t2.FechaFinGarantiaMecanica, 
	   t2.FechaFinGarantiaPintura, t2.FechaFinGarantiaLatoneria FechaFinGarantiaChapa,
	   isnull((SELECT MAX(t7.FechaEntregaCliente) 
                 FROM [PSCService_DB]..spiga_ComprasVehiculosVN t6 
                inner join ComisionesSpigaVN t7  on t7.Codigoempresa=t6.IdEmpresas 
                						        and t7.VIN=t6.VIN 
                						        and t7.CodigoMArca=t6.IdMarcas 
                						        and t7.CodigoGama=t6.IdGamas 
                						        and t7.CodigoModelo=t6.CodModelo 
                						        --and t6.FechaAbono is null 
                						        --and t6.FkComprasNumDet_Abonado is null 
                						        --and t6.FechaAnulacion is null
               where t6.IdVehiculos=t2.IdVehiculos), 
      (SELECT MAX(t7.FechaEntregaCliente) 
	     FROM [PSCService_DB]..spiga_CompraDeUsados t6
		inner join ComisionesSpigaVO t7 on t7.Codigoempresa         =t6.IdEmpresas 
							           and t7.VIN=t6.VIN 
                					   and t7.CodigoMArca=t6.IdMarcas 
                					   and t7.CodigoGama=t6.IdGamas 
                					   and t7.CodigoModelo=t6.CodModelo 
							         --  and t6.FechaAbono is null 
							         --  and t6.FkComprasNumDet_Abonado is null 
							         --  and t6.FechaAnulacion is null
        where t6.IdVehiculos=t2.IdVehiculos)) as FechaEntrega
   FROM #Vehiculos as t1 
  inner join [PSCService_DB]..spiga_Vehiculos as t2 with(nolock) on t2.IdVehiculos=t1.IdVehiculos 
  INNER JOIN [PSCService_DB]..spiga_Gamas AS t4 with(nolock)  ON t2.CodigoMarca = t4.PkFkMarcas 
										                     AND t2.CodigoGama = t4.PkGamas 
  INNER JOIN [PSCService_DB]..[spiga_TipoClasificacionesVehiculos] AS t5 with(nolock)  ON t2.CodigoMarca = t5.PkFkMarcas
										                                              AND t2.CodigoGama = t5.PkFkGamas 
										                                              AND t2.CodModelo   = t5.PkCodModelo 
										                                              AND t2.ExtModelo   = t5.PkExtModelo
										                                              AND t2.AñoModelo   = t5.PkAnoModelo



```
