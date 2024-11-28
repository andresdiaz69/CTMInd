# View: vw_Devoluciones_Procesos

## Usa los objetos:
- [[Devoluciones_Anexos]]
- [[Devoluciones_CausaRechazo]]
- [[Devoluciones_ConceptoCreacion]]
- [[Devoluciones_FormasPago]]
- [[Devoluciones_NatJuridica]]
- [[Devoluciones_Pagos]]
- [[Devoluciones_preGiro]]
- [[Devoluciones_Solicitud]]
- [[EmpleadosActivos]]
- [[spiga_Terceros]]

```sql

CREATE  VIEW [dbo].[vw_Devoluciones_Procesos]
AS   
 SELECT DISTINCT         
 TOP 100 PERCENT          
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
 CAST(d.NifCif AS VARCHAR (50)) [CedulaCliente],          
 d.Nombre   [NombreCliente],             
 d.FkNaturalezaJuridicaTipos [FkNaturalezaJuridicaTipos],          
 concat(d.[Apellido1], ' ', d.[Apellido2] ) [ApellidosCliente],
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
 a.IdUnidadNegocioJefe,    
 fp.DescFormaPago, nj.descNaturalezaJuridica, a.EntidadFinancieraDestino as EntidadFinancieraDestino,a.NumeroCuentaDestino as NoCuentaDestino, 
 a.TipoCuenta as TipoCuenta,
 a.DocumentoAplica, a.Anticipo, a.FacturaSerie, a.FacturaNumero, a.FacturaAnn,
 a.IdAprobador, a.IDFormaPago,a.idNaturalezaJuridica  
 -----fin campos nuevos--------    
 from Devoluciones_Solicitud a     
 -----------------ANEXOS  DEVOLUCIONES---------    
left outer join  Devoluciones_Anexos b          
on a.IdSolicitud = b.IdSolicitud          
---------------------DATOS SOLICITANTE-----------    
left outer join  (select        
   CodigoEmpleado ,Email_Corporativo,Nombres ,Apellido1, Apellido2, Nombre_Cargo        
   from(        
   SELECT /* orden=row_number() over (partition by CodigoEmpleado order by Ano_Periodo desc, Mes_Periodo desc), */        
   CodigoEmpleado ,Email_Corporativo,Nombres ,Apellido1, Apellido2, Nombre_Cargo          
   from  EmpleadosActivos
   WHERE Ano_Periodo = YEAR(GETDATE()) AND Mes_Periodo = MONTH(GETDATE())) b         
   /*where orden = 1*/   ) c          
on c.CodigoEmpleado = a.IdEmpleado        
-----------------------CLIENTE DESABILIDADO POR DEMORA-------------------    
--left outer join [PSCService_DB].dbo.spiga_Terceros d          
--on a.IdCliente  = d.NifCif 
-- JCS: 27/11/2022 - EL GROUP YA NO ES NECESARIO PQ LA TABLA spiga_Terceros YA NO GUARDA HISTÓRICOS
left outer join
(
 -- Select t.NifCif, t.PkTerceros, t.Nombre,FkNaturalezaJuridicaTipos, t.Apellido1, t.Apellido2 from   [PSCService_DB].dbo.spiga_Terceros t
 -- INNER JOIN 
	--(  
	--  Select NifCif, max(IdConsecutivo) IdConsecutivo
	--  FROM [PSCService_DB].dbo.spiga_Terceros 
	--  Group By  NifCif 
 --   ) c_ on c_.NifCif = t.NifCif and c_.IdConsecutivo = t.IdConsecutivo
 Select IdConsecutivo NifCif, PkTerceros, Nombre,FkNaturalezaJuridicaTipos, Apellido1, Apellido2 from   [PSCService_DB].dbo.spiga_Terceros
 -- JCS: 27/11/2022 - EL CAST ES NECESARIO PARA QUE NO HAYA DESBORDAMIENTO DE INT
) d on  CAST(d.NifCif AS VARCHAR (50)) = a.IdCliente 
------------------TABLA CAUSA RECHAZO--------    
left outer join Devoluciones_CausaRechazo e          
on a.IdCausaRechazo  = e.IdCausaRechazo           
---------------------DATOS APROBADOR-----------    
left outer join  (        
 select        
  CodigoEmpleado ,Nombres ,Apellido1, Apellido2        
  from(        
   SELECT /* orden=row_number() over (partition by CodigoEmpleado order by Ano_Periodo desc, Mes_Periodo desc), */        
   CodigoEmpleado ,Nombres ,Apellido1, Apellido2        
   from  EmpleadosActivos  
   WHERE Ano_Periodo = YEAR(GETDATE()) AND Mes_Periodo = MONTH(GETDATE())) b         
   /*where orden = 1*/   ) f          
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
   SELECT /* orden=row_number() over (partition by CodigoEmpleado order by Ano_Periodo desc, Mes_Periodo desc),  */       
   CodigoEmpleado ,Nombres ,Apellido1, Apellido2 , Email_Corporativo, Nombre_Cargo    
   from  EmpleadosActivos  
   WHERE Ano_Periodo = YEAR(GETDATE()) AND Mes_Periodo = MONTH(GETDATE())) b         
   /*where orden = 1*/   ) i          
on i.CodigoEmpleado = a.IdJefeAprobador    
----------------FIN--------------------    
Left join Devoluciones_FormasPago fp on fp.idFormaPago = a.IDFormaPago
Left join Devoluciones_NatJuridica nj on nj.idNaturalezaJuridica = a.idNaturalezaJuridica
Left join Devoluciones_preGiro pg on pg.idSolicitud = a.IdSolicitud
Order by a.FechaSolicitud desc


```
