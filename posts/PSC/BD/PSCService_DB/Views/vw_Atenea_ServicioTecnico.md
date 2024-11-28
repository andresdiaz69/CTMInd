# View: vw_Atenea_ServicioTecnico

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]
- [[spiga_Vehiculos]]
- [[vw_Atenea_Terceros]]
- [[vw_Atenea_Vehiculos]]

```sql


CREATE view [dbo].[vw_Atenea_ServicioTecnico] as
--JCS: 19/10/2023 - SE AGREGA LA COLUMNA pkterceros
--MS: 281123 se ajusta el nombre del empleado del operario por el asesor responsable, se ajusta la descripcion por la descripcion de trabajo y se ajusta el cargo para no mostrara interno y mostrara en las garantias el cliente
--MS: 041223 se quitan las empresas nuestras y se agregan los cmapos codigo empresa y nombre empresa 
--MS: 200224 se ajusto el filtro a la vista de vehiculos para tomar encuenta la placa 
--Manue suarez--211124-  se quita fitro de placa por la informacion de maquinaria 
select distinct tc.pkterceros,     tc.Nombre_completo,   tc.Nifcif   NitCliente,       
       Direccion_principal,        Telefono1,
       Telefono2,                  tc.celular1,                   email_principal,       ciudadPrincipal,
	   cv.ContactoConductor,       Telefono = cv.TelPrincipal,    Celular = cv.celular1, cv.Placa,
	   NumOT,                      cv.NombreMarca,                cv.NombreGama,         cv.NumeroMotor,
	   cv.kmsActuales,             cs.AsesorServicioResponsable   NombreOperario ,       CedulaAsesorServicioResponsable CedulaOperario,        DescripcionTrabajo Descripcion,
	   Centro,                     FechaAperturaOrden,            fechaentrega,          CodigoCentro,
	   CodOrdenServicio='null',    cv.CodigoMarca, 	              Modelo,                CodigoEmpresa,     Empresa NombreEmpresa
  from [DBMLC_0190].dbo.ComisionesSpigaTallerPorOT      cs
  left join vw_Atenea_Vehiculos cv on cv.vin= cs.VIN
                                  -- and cv.Placa=cs.Placa--(case when cs.VIN IS null Or cs.VIN = '' then cv.Placa else cv.VIN end = case when cs.VIN IS null Or cs.VIN = '' then cs.Placa else cs.VIN end ) 
  left join (select orden = ROW_NUMBER() over(partition by vin order by fechadeactualizacion desc),VIN,NumDocumentoPropietario
               from [PSCService_DB].dbo.spiga_Vehiculos) vh on vh.VIN= cs.VIN
                                                           and orden=1
       join vw_Atenea_Terceros     tc on tc.Nifcif = case when TipoIntCargo in('G','GA','S') then vh.NumDocumentoPropietario
                                                          else cs.NitCliente end
  
 where TipoIntCargo <>'I' 
   and tc.nifcif not in ('8300049938','9005736668','9013893271','9002830997','9003539391','8600190638','9003362494')
  -- and year(fechaentrega) = 2024
  --and day(fechaentrega) = 16
  -- and MONTH (fechaentrega) = 11  
  ---- and CodigoMarca is  not null  392

  -- order by CodigoMarca


```
