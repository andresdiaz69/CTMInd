# View: vw_Devoluciones_Procesos_OLD

## Usa los objetos:
- [[Devoluciones_Anexos]]
- [[Devoluciones_CausaRechazo]]
- [[Devoluciones_ConceptoCreacion]]
- [[Devoluciones_Pagos]]
- [[Devoluciones_Solicitud]]
- [[EmpleadosActivos]]
- [[spiga_Terceros]]

```sql

CREATE  VIEW [dbo].[vw_Devoluciones_Procesos_OLD]
AS           
 select           
 top 1000           
 isNull (a.IdSolicitud ,-1) [IdentificadorSolicitud],           
 a.IdEmpleado [CedulaEmpleado],          
 c.Nombres [NombreSolicitante],           
 concat(c.[Apellido1], ' ', c.[Apellido2] ) [ApellidosSolicitante],           
 f.Nombres [NombreAprobador],           
 concat(f.[Apellido1], ' ', f.[Apellido2] ) [ApellidosAprobador],           
 g.NumeroSpiga [NumeroPago],          
 g.FechaPago [Fecha Pago],          
 g.UrlAnexoPago,          
 c.Email_Corporativo [CorreoSolicitante],          
 c.Nombre_Cargo [Cargo],  
 -----------ID------------------
 --d.NifCif [CedulaCliente],          
 --d.Nombre   [NombreCliente],             
 --d.FkNaturalezaJuridicaTipos [FkNaturalezaJuridicaTipos],          
 --concat(d.[Apellido1], ' ', d.[Apellido2] ) [ApellidosCliente],           
 ----------FIN------------------
a.Idcliente [CedulaCliente],
(select top(1) nombre from [PSCService_DB].dbo.spiga_Terceros where NifCif = a.IdCliente order by FechaMod desc) [NombreCliente],
(select top(1) FkNaturalezaJuridicaTipos from [PSCService_DB].dbo.spiga_Terceros where NifCif = a.IdCliente order by FechaMod desc) [FkNaturalezaJuridicaTipos],
concat(
(select top(1) Apellido1 from [PSCService_DB].dbo.spiga_Terceros where NifCif = a.IdCliente order by FechaMod desc), ' ' ,
(select top(1) Apellido2 from [PSCService_DB].dbo.spiga_Terceros where NifCif = a.IdCliente order by FechaMod desc)) [ApellidosCliente], 
 --------- FIN----------------------
 a.ValorDevolucion [ValorDevolucion],           
 a.FechaSolicitud  [FechaSolicitud],             
 a.FechaAprobacion [FechaAprobacion],          
 a.Estado,           
 a.IdCausaRechazo,          
 a.CodigoTerceros,          
 a.ObservacionSolicitud,          
 a.EstadoPago,          
a.ObservacionEstado,          
e.DescripcionRechazo ,          
 a.IdEmpresa ,          
 a.IdCentro ,          
 a.IdLinea,           
 b.UrlFormatoDevolucionDinero ,          
 b.UrlFotocopiaCedula ,          
 b.UrlCamaraComercio ,          
 b.UrlCertificadoBancario ,          
 b.UrlDocumentoSpiga ,          
 b.UrlAdiciones ,          
 b.UrlCartaAutenticada ,          
 b.UrlOrdenCompra ,      
 -------nuevos campos-------------    
 a.IdConceptoCreacion,      
 h.DescripcionConceptoCreacion,       
  a.FechaModificacion,    
 a.IdJefeAprobador ,    
 i.Nombres [NombreJefe],    
 concat(i.[Apellido1], ' ', i.[Apellido2] ) [ApellidosJefe],         
 i.Email_Corporativo[CorreoJefe], i.Nombre_Cargo [CargoJefe] ,    
 a.EstadoAprobadorJefe ,    
 a.FechaAccionJefe,    
 a.ObservacionRechazoJefe,    
 a.IdUnidadNegocioJefe    
 -----fin campos nuevos--------    
 from Devoluciones_Solicitud a     
 -----------------ANEXOS  DEVOLUCIONES---------    
left outer join  Devoluciones_Anexos b          
on a.IdSolicitud = b.IdSolicitud          
---------------------DATOS SOLICITANTE-----------    
left outer join  (select        
   CodigoEmpleado ,Email_Corporativo,Nombres ,Apellido1, Apellido2, Nombre_Cargo        
   from(        
   SELECT orden=row_number() over (partition by CodigoEmpleado order by Ano_Periodo desc, Mes_Periodo desc),        
   CodigoEmpleado ,Email_Corporativo,Nombres ,Apellido1, Apellido2, Nombre_Cargo          
   from  EmpleadosActivos  ) b         
   where orden = 1   ) c          
on c.CodigoEmpleado = a.IdEmpleado        
-----------------------CLIENTE DESABILIDADO POR DEMORA-------------------    
--left outer join vw_TercerosUltimaFechaActualizacion d          
--on a.IdCliente  = d.NifCif          
------------------TABLA CAUSA RECHAZO--------    
left outer join Devoluciones_CausaRechazo e          
on a.IdCausaRechazo  = e.IdCausaRechazo           
---------------------DATOS APROBADOR-----------    
left outer join  (        
 select        
  CodigoEmpleado ,Nombres ,Apellido1, Apellido2        
  from(        
   SELECT orden=row_number() over (partition by CodigoEmpleado order by Ano_Periodo desc, Mes_Periodo desc),        
   CodigoEmpleado ,Nombres ,Apellido1, Apellido2        
   from  EmpleadosActivos  ) b         
   where orden = 1   ) f          
on f.CodigoEmpleado = a.IdAprobador    
---------------------PAGOS----------------    
left outer join  Devoluciones_Pagos g          
on g.IdSolicitud= a.IdSolicitud     
----------------CREACION CONCEPTO---------    
left outer join Devoluciones_ConceptoCreacion  h         
on a.IdConceptoCreacion= h.IdConceptoCreacion      
-------------DATOS JEFE-----------------    
left outer join  (        
 select        
  CodigoEmpleado ,Nombres ,Apellido1, Apellido2,Email_Corporativo, Nombre_Cargo        
  from(        
   SELECT orden=row_number() over (partition by CodigoEmpleado order by Ano_Periodo desc, Mes_Periodo desc),        
   CodigoEmpleado ,Nombres ,Apellido1, Apellido2 , Email_Corporativo, Nombre_Cargo    
   from  EmpleadosActivos  ) b         
   where orden = 1   ) i          
on i.CodigoEmpleado = a.IdJefeAprobador    
----------------FIN--------------------    
order by a.FechaSolicitud 

```
