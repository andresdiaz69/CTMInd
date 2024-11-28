# Stored Procedure: sp_Devoluciones_Procesos_OLD

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
- [[Empresas]]
- [[spiga_Terceros]]

```sql

CREATE PROCEDURE [dbo].[sp_Devoluciones_Procesos_OLD]
	@Estado varchar(50),
	@CedulaEmpleado varchar(50) = null,
	@AprobadorJefe varchar(50) = null,
	@AprobadorTesoreria varchar(50) = null,
	@IdSolicitud int = null,
	@FechaGiradoIni varchar(50)=null,
	@FechaGiradoFin varchar(50)=null,
	@FechaPendienteIni varchar(50)=null,
	@FechaPendienteFin varchar(50)=null,
	@FechaAprobadoJefeIni varchar(50)=null,
	@FechaAprobadoJefeFin varchar(50)=null,
	@FechaAprobadoTesoIni varchar(50)=null,
	@FechaAprobadoTesoFin varchar(50)=null,
	@idEmpresa int
AS
BEGIN

SET FMTONLY OFF
SET DATEFORMAT YMD

-- JCS: 27/11/2022 - SE ACMBIO EL NOMBRE DE LA TABLA: Tmp_EmpleadosActivo TEMPORAL PARA GARANTIZAR QUE SEA ÚNICA ENTRE LOS MÓDULOS
SELECT  CodigoEmpleado ,Nombres ,Apellido1, Apellido2 , Email_Corporativo, Nombre_Cargo   INTO #Tmp_EmpleadosActivos_ControlDevoluciones
   from  EmpleadosActivos  
   WHERE Ano_Periodo = YEAR(GETDATE()) AND Mes_Periodo = MONTH(GETDATE())          


if (@FechaGiradoIni is not null and @FechaGiradoFin is not null )
begin
	SELECT DISTINCT         
	 isNull (a.IdSolicitud ,-1) [IdentificadorSolicitud],           
	 a.IdEmpleado [CedulaEmpleado],         
	 concat(isnull(c.Nombres,''), ' ', isnull(c.Apellido1,''), ' ', isnull(c.Apellido2,'') ) NombreSolicitanteCompleto,
	 c.Nombres [NombreSolicitante],           
	 concat(c.[Apellido1], ' ', c.[Apellido2] ) [ApellidosSolicitante],           
	 f.Nombres [NombreAprobador],           
	 concat(f.[Apellido1], ' ', f.[Apellido2] ) [ApellidosAprobador],      
	 concat(isnull(f.Nombres,''), ' ', isnull(f.Apellido1,''), ' ', isnull(f.Apellido2,'') ) NombreAprobadorTesoCompleto,
	 g.NumeroSpiga [NumeroPago],          
	 g.FechaPago [Fecha Pago],          
	 g.UrlAnexoPago,          
	 c.Email_Corporativo [CorreoSolicitante],          
	 c.Nombre_Cargo [Cargo],  
	 -----------ID------------------
	 d.NifCif [CedulaCliente],          
	 d.Nombre   [NombreCliente],             
	 d.FkNaturalezaJuridicaTipos [FkNaturalezaJuridicaTipos],          
	 concat(d.[Apellido1], ' ', d.[Apellido2] ) [ApellidosCliente],
	 concat(isnull(d.Nombre,''), ' ', isnull(d.Apellido1,''), ' ', isnull(d.Apellido2,'') ) NombreClienteCompleto,
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
	 concat(isnull(i.Nombres,''), ' ', isnull(i.Apellido1,''), ' ', isnull(i.Apellido2,'') ) NombreAprobadorJefeCompleto,
	 i.Email_Corporativo[CorreoJefe], i.Nombre_Cargo [CargoJefe] ,    
	 a.EstadoAprobadorJefe ,    
	 a.FechaAccionJefe,    
	 a.ObservacionRechazoJefe,    
	 a.IdUnidadNegocioJefe,    
	 fp.DescFormaPago, nj.descNaturalezaJuridica, a.EntidadFinancieraDestino as EntidadFinancieraDestino,a.NumeroCuentaDestino as NoCuentaDestino, 
	 a.TipoCuenta as TipoCuenta,
	 a.DocumentoAplica, a.Anticipo, a.FacturaSerie, a.FacturaNumero, a.FacturaAnn,
	 a.IdAprobador, isnull(pg.FechaCreacion, getdate()) as FechaGiro, a.CorreoElectronico as CorreoCliente,
	 em.NombreEmpresa, a.IDFormaPago, a.idNaturalezaJuridica
	 -----fin campos nuevos--------    
	 from Devoluciones_Solicitud a     
	 Inner Join Empresas Em On em.CodigoEmpresa = a.IdEmpresa
	 -----------------ANEXOS  DEVOLUCIONES---------    
	left outer join  Devoluciones_Anexos b          
	on a.IdSolicitud = b.IdSolicitud          
	---------------------DATOS SOLICITANTE-----------   
	left join  #Tmp_EmpleadosActivos_ControlDevoluciones C ON c.CodigoEmpleado = a.IdEmpleado  
	left join  [PSCService_DB].dbo.spiga_Terceros d on   d.NifCif = a.IdCliente

	--left join [PSCService_DB].dbo.spiga_TerceroTerceroTipos	ti on	d.PkTerceros =ti.PkFkterceros and 
	--																(select top 1  PkFktercerotipos from [PSCService_DB].dbo.spiga_TerceroTerceroTipos) = 'CLTE'
																	and d.FechaBaja is null 
	------------------TABLA CAUSA RECHAZO--------    
	left outer join Devoluciones_CausaRechazo e          
	on a.IdCausaRechazo  = e.IdCausaRechazo           
	---------------------DATOS APROBADOR tesoreria-----------    
	left join  #Tmp_EmpleadosActivos_ControlDevoluciones F ON f.CodigoEmpleado = a.IdAprobador
	---------------------PAGOS----------------    
	left outer join  Devoluciones_Pagos g          
	on g.IdSolicitud= a.IdSolicitud     
	----------------CREACION CONCEPTO---------    
	left outer join Devoluciones_ConceptoCreacion  h         
	on a.IdConceptoCreacion= h.IdConceptoCreacion      
	-------------DATOS APROBADOR JEFE-----------------    
	left join  #Tmp_EmpleadosActivos_ControlDevoluciones I ON i.CodigoEmpleado = a.IdJefeAprobador  
	----------------FIN--------------------    
	Left join Devoluciones_FormasPago fp on fp.idFormaPago = a.IDFormaPago
	Left join Devoluciones_NatJuridica nj on nj.idNaturalezaJuridica = a.idNaturalezaJuridica
	Left join
	(
	   Select pg_.*
	   From Devoluciones_preGiro  pg_
	   Inner Join 
	   (
	     Select idSolicitud, max(idPagos) idPago from Devoluciones_preGiro p_
		 group by idSolicitud
	   ) f_ on f_.idSolicitud = pg_.idSolicitud and f_.idPago = pg_.idPagos
	)  pg on  pg.IdSolicitud = a.IdSolicitud 
	Where a.Estado = @Estado  AND (a.IdEmpresa = @idEmpresa  or @idEmpresa =0)
	AND ( 
		(a.IdEmpleado = @CedulaEmpleado and @CedulaEmpleado is NOT null) OR (@CedulaEmpleado is null)
	)
	AND (
		(a.IdJefeAprobador = @AprobadorJefe and @AprobadorJefe is NOT null) OR (@AprobadorJefe is null)
	)
	AND (
		(a.IdAprobador = @AprobadorTesoreria and @AprobadorTesoreria is NOT null) OR (@AprobadorTesoreria is null)
	)
	AND (
		(a.IdSolicitud = @IdSolicitud and @IdSolicitud is NOT null) OR (@IdSolicitud is null)
	)
	AND (
		( pg.FechaCreacion >= @FechaGiradoIni 
		  AND  pg.FechaCreacion <=@FechaGiradoFin AND  @FechaGiradoIni is NOT null) OR (@FechaGiradoIni is null)
	)
	AND (
		(	a.FechaSolicitud >= @FechaPendienteIni
			AND  a.FechaSolicitud <=  @FechaPendienteFin AND  @FechaPendienteIni is NOT null) OR (@FechaPendienteIni is null)
	)
	AND (
		(	a.FechaAccionJefe >= @FechaAprobadoJefeIni
				AND  a.FechaAccionJefe <=  @FechaAprobadoJefeFin AND  @FechaAprobadoJefeIni is NOT null) OR (@FechaAprobadoJefeIni is null)
	)
	AND (
		(	 a.FechaAprobacion >= @FechaAprobadoTesoIni
					AND  a.FechaAprobacion <=  @FechaAprobadoTesoFin AND  @FechaAprobadoTesoIni is NOT null) OR (@FechaAprobadoTesoIni is null)
	)
	Order by a.FechaSolicitud desc
end
else
begin 
	SELECT DISTINCT         
	 isNull (a.IdSolicitud ,-1) [IdentificadorSolicitud],           
	 a.IdEmpleado [CedulaEmpleado],         
	 concat(isnull(c.Nombres,''), ' ', isnull(c.Apellido1,''), ' ', isnull(c.Apellido2,'') ) NombreSolicitanteCompleto,
	 c.Nombres [NombreSolicitante],           
	 concat(c.[Apellido1], ' ', c.[Apellido2] ) [ApellidosSolicitante],           
	 f.Nombres [NombreAprobador],           
	 concat(f.[Apellido1], ' ', f.[Apellido2] ) [ApellidosAprobador],      
	 concat(isnull(f.Nombres,''), ' ', isnull(f.Apellido1,''), ' ', isnull(f.Apellido2,'') ) NombreAprobadorTesoCompleto,
	 g.NumeroSpiga [NumeroPago],          
	 g.FechaPago [Fecha Pago],          
	 g.UrlAnexoPago,          
	 c.Email_Corporativo [CorreoSolicitante],          
	 c.Nombre_Cargo [Cargo],  
	 -----------ID------------------
	 d.NifCif [CedulaCliente],          
	 d.Nombre   [NombreCliente],             
	 d.FkNaturalezaJuridicaTipos [FkNaturalezaJuridicaTipos],          
	 concat(d.[Apellido1], ' ', d.[Apellido2] ) [ApellidosCliente],
	 concat(isnull(d.Nombre,''), ' ', isnull(d.Apellido1,''), ' ', isnull(d.Apellido2,'') ) NombreClienteCompleto,
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
	 concat(isnull(i.Nombres,''), ' ', isnull(i.Apellido1,''), ' ', isnull(i.Apellido2,'') ) NombreAprobadorJefeCompleto,
	 i.Email_Corporativo[CorreoJefe], i.Nombre_Cargo [CargoJefe] ,    
	 a.EstadoAprobadorJefe ,    
	 a.FechaAccionJefe,    
	 a.ObservacionRechazoJefe,    
	 a.IdUnidadNegocioJefe,    
	 fp.DescFormaPago, nj.descNaturalezaJuridica, a.EntidadFinancieraDestino as EntidadFinancieraDestino,a.NumeroCuentaDestino as NoCuentaDestino, 
	 a.TipoCuenta as TipoCuenta,
	 a.DocumentoAplica, a.Anticipo, a.FacturaSerie, a.FacturaNumero, a.FacturaAnn,
	 a.IdAprobador, getdate() as FechaGiro, a.CorreoElectronico as CorreoCliente, em.NombreEmpresa
	 , a.IDFormaPago, a.idNaturalezaJuridica
	 -----fin campos nuevos--------    
	 from Devoluciones_Solicitud a     
	 Inner Join Empresas Em On em.CodigoEmpresa = a.IdEmpresa
	 -----------------ANEXOS  DEVOLUCIONES---------    
	left outer join  Devoluciones_Anexos b          
	on a.IdSolicitud = b.IdSolicitud          
	---------------------DATOS SOLICITANTE-----------   
	left join  #Tmp_EmpleadosActivos_ControlDevoluciones C ON c.CodigoEmpleado = a.IdEmpleado  
	left join  [PSCService_DB].dbo.spiga_Terceros d on   d.NifCif = a.IdCliente	
		--													and	(select top 1  PkFktercerotipos from [PSCService_DB].dbo.spiga_TerceroTerceroTipos) = 'CLTE'
														and d.FechaBaja is null 

	------------------TABLA CAUSA RECHAZO--------    
	left outer join Devoluciones_CausaRechazo e          
	on a.IdCausaRechazo  = e.IdCausaRechazo           
	---------------------DATOS APROBADOR tesoreria-----------    
	left join  #Tmp_EmpleadosActivos_ControlDevoluciones F ON f.CodigoEmpleado = a.IdAprobador
	---------------------PAGOS----------------    
	left outer join  Devoluciones_Pagos g          
	on g.IdSolicitud= a.IdSolicitud     
	----------------CREACION CONCEPTO---------    
	left outer join Devoluciones_ConceptoCreacion  h         
	on a.IdConceptoCreacion= h.IdConceptoCreacion      
	-------------DATOS APROBADOR JEFE-----------------    
	left join  #Tmp_EmpleadosActivos_ControlDevoluciones I ON i.CodigoEmpleado = a.IdJefeAprobador  
	----------------FIN--------------------    
	Left join Devoluciones_FormasPago fp on fp.idFormaPago = a.IDFormaPago
	Left join Devoluciones_NatJuridica nj on nj.idNaturalezaJuridica = a.idNaturalezaJuridica
	Where a.Estado = @Estado  AND (a.IdEmpresa = @idEmpresa  or @idEmpresa =0)
	AND ( 
		(a.IdEmpleado = @CedulaEmpleado and @CedulaEmpleado is NOT null) OR (@CedulaEmpleado is null)
	)
	AND (
		(a.IdJefeAprobador = @AprobadorJefe and @AprobadorJefe is NOT null) OR (@AprobadorJefe is null)
	)
	AND (
		(a.IdAprobador = @AprobadorTesoreria and @AprobadorTesoreria is NOT null) OR (@AprobadorTesoreria is null)
	)
	AND (
		(a.IdSolicitud = @IdSolicitud and @IdSolicitud is NOT null) OR (@IdSolicitud is null)
	)
	AND (
		(	a.FechaSolicitud >= @FechaPendienteIni
			AND  a.FechaSolicitud <=  @FechaPendienteFin AND  @FechaPendienteIni is NOT null) OR (@FechaPendienteIni is null)
	)
	AND (
		(	a.FechaAccionJefe >= @FechaAprobadoJefeIni
				AND  a.FechaAccionJefe <=  @FechaAprobadoJefeFin AND  @FechaAprobadoJefeIni is NOT null) OR (@FechaAprobadoJefeIni is null)
	)
	AND (
		(	 a.FechaAprobacion >= @FechaAprobadoTesoIni
					AND  a.FechaAprobacion <=  @FechaAprobadoTesoFin AND  @FechaAprobadoTesoIni is NOT null) OR (@FechaAprobadoTesoIni is null)
	)
	Order by a.FechaSolicitud desc

end

-- JCS: 27/11/2022 - SE ACMBIO EL NOMBRE DE LA TABLA: Tmp_EmpleadoActivos TEMPORAL PARA GARANTIZAR QUE SEA ÚNICA ENTRE LOS MÓDULOS
DROP TABLE #Tmp_EmpleadosActivos_ControlDevoluciones

END

```
