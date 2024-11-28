# Stored Procedure: sp_Devoluciones_Procesos

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
- [[v_Requisiciones_EmpleadosActivosRetirados]]
- [[v_UnidadDeNegocio]]

```sql
--- 1. Modificaciones en sp_Devoluciones_Procesos
CREATE PROCEDURE [dbo].[sp_Devoluciones_Procesos]
	@Estado VARCHAR(50),
	@CedulaEmpleado VARCHAR(50) = null,
	@AprobadorJefe VARCHAR(50) = null,
	@AprobadorTesoreria VARCHAR(50) = null,
	@IdSolicitud INT = null,
	@FechaGiradoIni VARCHAR(50)=null,
	@FechaGiradoFin VARCHAR(50)=null,
	@FechaPendienteIni VARCHAR(50)=null,
	@FechaPendienteFin VARCHAR(50)=null,
	@FechaAprobadoJefeIni VARCHAR(50)=null,
	@FechaAprobadoJefeFin VARCHAR(50)=null,
	@FechaAprobadoTesoIni VARCHAR(50)=null,
	@FechaAprobadoTesoFin VARCHAR(50)=null,
	@idEmpresa INT
AS
BEGIN

SET FMTONLY OFF
SET DATEFORMAT YMD

-- JCS: 27/11/2022 - SE CAMBIO EL NOMBRE DE LA TABLA: Tmp_EmpleadosActivo TEMPORAL PARA GARANTIZAR QUE SEA ÚNICA ENTRE LOS MÓDULOS
SELECT  CodigoEmpleado ,
		Nombres,
		Apellido1, 
		Apellido2, 
		Email_Corporativo, 
		Nombre_Cargo   
		
		INTO #Tmp_EmpleadosActivos_ControlDevoluciones
		FROM EmpleadosActivos  
		WHERE Ano_Periodo = YEAR(GETDATE()) AND Mes_Periodo = MONTH(GETDATE())          
   
   --Evalúa cuando @Estado es igual a "TODOS"--
   IF @Estado = 'TODOS'
		BEGIN 
			--Evalúa cuando las fechas no son nulas y @Estado es igual a "TODOS"--
			IF (@FechaGiradoIni is not null and @FechaGiradoFin is not null )
				BEGIN
					SELECT DISTINCT         
						ISNULL (a.IdSolicitud ,-1) [IdentificadorSolicitud],           
						a.IdEmpleado [CedulaEmpleado],         
						CONCAT(ISNULL( emplSolic.Nombres,''), ' ', ISNULL(emplSolic.Apellido1,''), ' ', ISNULL(emplSolic.Apellido2,'') ) NombreSolicitanteCompleto,
						
						emplSolic.Nombres [NombreSolicitante],           
						
						CONCAT(emplSolic.[Apellido1], ' ', emplSolic.[Apellido2] ) [ApellidosSolicitante], 
						
						f.Nombres [NombreAprobador],           
						CONCAT(f.[Apellido1], ' ', f.[Apellido2] ) [ApellidosAprobador],      
						CONCAT(ISNULL(f.Nombres,''), ' ', ISNULL(f.Apellido1,''), ' ', ISNULL(f.Apellido2,'') ) NombreAprobadorTesoCompleto,
						
						g.NumeroSpiga [NumeroPago],          
						g.FechaPago [Fecha Pago],          
						g.UrlAnexoPago,          
						c.Email_Corporativo [CorreoSolicitante],         
						c.Nombre_Cargo [Cargo],  						
						-----------ID------------------
						d.NifCif [CedulaCliente],          
						d.Nombre   [NombreCliente],             
						d.FkNaturalezaJuridicaTipos [FkNaturalezaJuridicaTipos],          
						CONCAT(d.[Apellido1], ' ', d.[Apellido2] ) [ApellidosCliente],
						CONCAT(ISNULL(d.Nombre,''), ' ', ISNULL(d.Apellido1,''), ' ', ISNULL(d.Apellido2,'') ) NombreClienteCompleto,
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
						-------NUEVOS CAMPOS-------------    
						a.IdConceptoCreacion,      
						h.DescripcionConceptoCreacion,       
						a.FechaModificacion,    
						a.IdJefeAprobador,    
						i.Nombres [NombreJefe],    
						CONCAT(i.[Apellido1], ' ', i.[Apellido2] ) [ApellidosJefe],
						CONCAT(ISNULL(i.Nombres,''), ' ', ISNULL(i.Apellido1,''), ' ', ISNULL(i.Apellido2,'') ) NombreAprobadorJefeCompleto,
						i.Email_Corporativo[CorreoJefe], 
						i.Nombre_Cargo [CargoJefe],    
						a.EstadoAprobadorJefe,    
						a.FechaAccionJefe,    
						a.ObservacionRechazoJefe,    
						a.IdUnidadNegocioJefe,    
						fp.DescFormaPago, 
						nj.descNaturalezaJuridica, 
						a.EntidadFinancieraDestino as EntidadFinancieraDestino,
						a.NumeroCuentaDestino as NoCuentaDestino, 
						a.TipoCuenta as TipoCuenta,
						a.DocumentoAplica, 
						a.Anticipo, 
						a.FacturaSerie, 
						a.FacturaNumero, 
						a.FacturaAnn,
						a.IdAprobador, 
						ISNULL(pg.FechaCreacion, GETDATE()) as FechaGiro, 
						a.CorreoElectronico as CorreoCliente,
						em.NombreEmpresa, 
						a.IDFormaPago, 
						a.idNaturalezaJuridica, 						
						--PREGIRO
						pg.ObservacionRechazo,
						pg.idPagos,
						pg.FechaCreacion,						
						---- BENEFICIARIO
						a.NombresBeneficiario,
						a.CedulaBeneficiario,
						a.NaturalezaJuridicaBeneficiario,
						a.CorrreoElectronicoBeneficiario,
						udn.NombreUnidadNegocio,
						CONCAT(ISNULL(k.Nombres,''), ' ', ISNULL(k.Apellido1,''), ' ', ISNULL(k.Apellido2,'') ) NombreAprobadorBanco,
						a.ObservacionRechazoBanco,
						a.FechaAprobacionBanco
						
					FROM Devoluciones_Solicitud a     	
					
					LEFT JOIN v_Requisiciones_EmpleadosActivosRetirados emplSolic ON emplSolic.CodigoEmpleado = a.IdEmpleado
					
					LEFT JOIN v_UnidadDeNegocio udn ON a.IdLinea = udn.CodUnidadNegocio
					Inner Join Empresas Em ON em.CodigoEmpresa = a.IdEmpresa	
					-----------------ANEXOS  DEVOLUCIONES---------    
					left outer join  Devoluciones_Anexos b ON a.IdSolicitud = b.IdSolicitud     
					---------------------DATOS SOLICITANTE-----------   
					left join  #Tmp_EmpleadosActivos_ControlDevoluciones C ON c.CodigoEmpleado = a.IdEmpleado  
					left join  [PSCService_DB].dbo.spiga_Terceros d ON d.NifCif = a.IdCliente
					------------------TABLA CAUSA RECHAZO--------    
					left outer join Devoluciones_CausaRechazo e ON a.IdCausaRechazo  = e.IdCausaRechazo   
					---------------------DATOS APROBADOR tesoreria-----------    
					left join  #Tmp_EmpleadosActivos_ControlDevoluciones F ON f.CodigoEmpleado = a.IdAprobador					
					---------------------PAGOS----------------    
					left outer join  Devoluciones_Pagos g ON g.IdSolicitud= a.IdSolicitud    
					----------------CREACION CONCEPTO---------    
					left outer join Devoluciones_ConceptoCreacion h ON a.IdConceptoCreacion= h.IdConceptoCreacion  
					-------------DATOS APROBADOR JEFE-----------------    
					left join  #Tmp_EmpleadosActivos_ControlDevoluciones I ON i.CodigoEmpleado = a.IdJefeAprobador 
					-------------DATOS APROBADOR BANCO-----------------    
					LEFT JOIN v_Requisiciones_EmpleadosActivosRetirados k ON k.CodigoEmpleado = a.IdAprobadorBanco
					----------------FIN--------------------    
					Left join Devoluciones_FormasPago fp ON fp.idFormaPago = a.IDFormaPago
					Left join Devoluciones_NatJuridica nj ON nj.idNaturalezaJuridica = a.idNaturalezaJuridica
					Left join
					(
						SELECT pg_.* FROM Devoluciones_preGiro  pg_
						Inner Join 
						(
							SELECT idSolicitud, max(idPagos) idPago FROM Devoluciones_preGiro p_
							GROUP BY idSolicitud		 
						) f_ ON f_.idSolicitud = pg_.idSolicitud and f_.idPago = pg_.idPagos
					) pg ON  pg.IdSolicitud = a.IdSolicitud 
					
					WHERE (a.IdEmpresa = @idEmpresa  or @idEmpresa =0)
					
					AND ( (a.IdEmpleado = @CedulaEmpleado and @CedulaEmpleado is NOT null) OR (@CedulaEmpleado is null)	)
					AND ( (a.IdJefeAprobador = @AprobadorJefe and @AprobadorJefe is NOT null) OR (@AprobadorJefe is null) )
					AND ( (a.IdAprobador = @AprobadorTesoreria and @AprobadorTesoreria is NOT null) OR (@AprobadorTesoreria is null) )
					AND ( (a.IdSolicitud = @IdSolicitud and @IdSolicitud is NOT null) OR (@IdSolicitud is null)	)
					AND ( ( pg.FechaCreacion >= @FechaGiradoIni AND pg.FechaCreacion <=@FechaGiradoFin AND @FechaGiradoIni is NOT null) OR (@FechaGiradoIni is null) )
					AND ( ( (pg.FechaCreacion >= @FechaGiradoIni OR a.FechaModificacion >= @FechaGiradoIni) AND  (pg.FechaCreacion <=@FechaGiradoFin OR a.FechaModificacion <=@FechaGiradoFin) AND  @FechaGiradoIni is NOT null) OR (@FechaGiradoIni is null) )
					
					AND ( (a.FechaSolicitud >= @FechaPendienteIni AND  a.FechaSolicitud <=  @FechaPendienteFin AND  @FechaPendienteIni is NOT null) OR (@FechaPendienteIni is null) )
					AND ( (a.FechaAccionJefe >= @FechaAprobadoJefeIni AND  a.FechaAccionJefe <=  @FechaAprobadoJefeFin AND  @FechaAprobadoJefeIni is NOT null) OR (@FechaAprobadoJefeIni is null) )
					AND ( (a.FechaAprobacion >= @FechaAprobadoTesoIni AND  a.FechaAprobacion <=  @FechaAprobadoTesoFin AND  @FechaAprobadoTesoIni is NOT null) OR (@FechaAprobadoTesoIni is null) )					
					ORDER BY a.FechaSolicitud DESC
				END
			
			--Este ELSE se ejecuta cuando las fechas son nulas y @Estado es igual a "TODOS"--
			ELSE				
				BEGIN 
				SELECT DISTINCT         
					ISNULL (a.IdSolicitud ,-1) [IdentificadorSolicitud],           
					a.IdEmpleado [CedulaEmpleado],         
					CONCAT ( ISNULL(emplSolic.Nombres,''), ' ', ISNULL(emplSolic.Apellido1,''), ' ', ISNULL(emplSolic.Apellido2,'') ) NombreSolicitanteCompleto,
					emplSolic.Nombres [NombreSolicitante],           
					CONCAT(emplSolic.[Apellido1], ' ', emplSolic.[Apellido2] ) [ApellidosSolicitante],           
					f.Nombres [NombreAprobador],           
					CONCAT(f.[Apellido1], ' ', f.[Apellido2] ) [ApellidosAprobador],      
					CONCAT(ISNULL(f.Nombres,''), ' ', ISNULL(f.Apellido1,''), ' ', ISNULL(f.Apellido2,'') ) NombreAprobadorTesoCompleto,
					g.NumeroSpiga [NumeroPago],          
					g.FechaPago [Fecha Pago],          
					g.UrlAnexoPago,          
					c.Email_Corporativo [CorreoSolicitante],          
					c.Nombre_Cargo [Cargo],  
					-----------ID------------------
					d.NifCif [CedulaCliente],          
					d.Nombre   [NombreCliente],             
					d.FkNaturalezaJuridicaTipos [FkNaturalezaJuridicaTipos],          
					CONCAT(d.[Apellido1], ' ', d.[Apellido2] ) [ApellidosCliente],
					CONCAT(ISNULL(d.Nombre,''), ' ', ISNULL(d.Apellido1,''), ' ', ISNULL(d.Apellido2,'') ) NombreClienteCompleto,
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
					-------NUEVOS CAMPOS-------------    
					a.IdConceptoCreacion,      
					h.DescripcionConceptoCreacion,       
					a.FechaModificacion,    
					a.IdJefeAprobador ,    
					i.Nombres [NombreJefe],    
					CONCAT(i.[Apellido1], ' ', i.[Apellido2] ) [ApellidosJefe],         
					CONCAT(ISNULL(i.Nombres,''), ' ', ISNULL(i.Apellido1,''), ' ', ISNULL(i.Apellido2,'') ) NombreAprobadorJefeCompleto,
					i.Email_Corporativo[CorreoJefe], 
					i.Nombre_Cargo [CargoJefe] ,    
					a.EstadoAprobadorJefe ,    
					a.FechaAccionJefe,    
					a.ObservacionRechazoJefe,    
					a.IdUnidadNegocioJefe,    
					fp.DescFormaPago, 
					nj.descNaturalezaJuridica, 
					a.EntidadFinancieraDestino AS EntidadFinancieraDestino,
					a.NumeroCuentaDestino AS NoCuentaDestino, 
					a.TipoCuenta AS TipoCuenta,
					a.DocumentoAplica, 
					a.Anticipo, 
					a.FacturaSerie, 
					a.FacturaNumero, 
					a.FacturaAnn,
					a.IdAprobador, 
					GETDATE() AS FechaGiro, 
					a.CorreoElectronico AS CorreoCliente, 
					em.NombreEmpresa, 
					a.IDFormaPago, 
					a.idNaturalezaJuridica,
					---- BENEFICIARIO
					a.NombresBeneficiario,
					a.CedulaBeneficiario,
					a.NaturalezaJuridicaBeneficiario,
					a.CorrreoElectronicoBeneficiario,
					udn.NombreUnidadNegocio,
					CONCAT(ISNULL(k.Nombres,''), ' ', ISNULL(k.Apellido1,''), ' ', ISNULL(k.Apellido2,'') ) NombreAprobadorBanco,
					a.ObservacionRechazoBanco,
					a.FechaAprobacionBanco

				FROM Devoluciones_Solicitud a    
				LEFT JOIN v_Requisiciones_EmpleadosActivosRetirados emplSolic ON emplSolic.CodigoEmpleado = a.IdEmpleado
				LEFT JOIN v_UnidadDeNegocio udn ON a.IdLinea = udn.CodUnidadNegocio
				Inner Join Empresas Em ON em.CodigoEmpresa = a.IdEmpresa
					-----------------ANEXOS  DEVOLUCIONES---------    
				left outer join  Devoluciones_Anexos b ON a.IdSolicitud = b.IdSolicitud          
				---------------------DATOS SOLICITANTE-----------   
				left join  #Tmp_EmpleadosActivos_ControlDevoluciones C ON c.CodigoEmpleado = a.IdEmpleado  
				left join  [PSCService_DB].dbo.spiga_Terceros d ON d.NifCif = a.IdCliente
				------------------TABLA CAUSA RECHAZO--------    
				left outer join Devoluciones_CausaRechazo e ON a.IdCausaRechazo  = e.IdCausaRechazo           
				---------------------DATOS APROBADOR tesoreria-----------    
				left join  #Tmp_EmpleadosActivos_ControlDevoluciones F ON f.CodigoEmpleado = a.IdAprobador
				---------------------PAGOS----------------    
				left outer join  Devoluciones_Pagos g ON g.IdSolicitud= a.IdSolicitud     
				----------------CREACION CONCEPTO---------    
				left outer join Devoluciones_ConceptoCreacion  h ON a.IdConceptoCreacion= h.IdConceptoCreacion      
				-------------DATOS APROBADOR JEFE-----------------    
				left join  #Tmp_EmpleadosActivos_ControlDevoluciones I ON i.CodigoEmpleado = a.IdJefeAprobador  
				-------------DATOS APROBADOR BANCO-----------------    
				LEFT JOIN v_Requisiciones_EmpleadosActivosRetirados k ON k.CodigoEmpleado = a.IdAprobadorBanco
				----------------FIN--------------------    
				Left join Devoluciones_FormasPago fp ON fp.idFormaPago = a.IDFormaPago
				Left join Devoluciones_NatJuridica nj ON nj.idNaturalezaJuridica = a.idNaturalezaJuridica
				
				WHERE (a.IdEmpresa = @idEmpresa  or @idEmpresa = 0)
				AND ( (a.IdEmpleado = @CedulaEmpleado and @CedulaEmpleado is NOT null) OR (@CedulaEmpleado is null)	)
				AND ( (a.IdJefeAprobador = @AprobadorJefe and @AprobadorJefe is NOT null) OR (@AprobadorJefe is null) )
				AND ( (a.IdAprobador = @AprobadorTesoreria and @AprobadorTesoreria is NOT null) OR (@AprobadorTesoreria is null) )
				AND ( (a.IdSolicitud = @IdSolicitud and @IdSolicitud is NOT null) OR (@IdSolicitud is null)	)
				AND ( (a.FechaSolicitud >= @FechaPendienteIni AND  a.FechaSolicitud <=  @FechaPendienteFin AND  @FechaPendienteIni is NOT null) OR (@FechaPendienteIni is null) )
				AND ( (a.FechaAccionJefe >= @FechaAprobadoJefeIni AND  a.FechaAccionJefe <=  @FechaAprobadoJefeFin AND  @FechaAprobadoJefeIni is NOT null) OR (@FechaAprobadoJefeIni is null) )
				AND ( (a.FechaAprobacion >= @FechaAprobadoTesoIni AND  a.FechaAprobacion <=  @FechaAprobadoTesoFin AND  @FechaAprobadoTesoIni is NOT null) OR (@FechaAprobadoTesoIni is null) )
				
				ORDER BY a.FechaSolicitud DESC
			END
		END

   --Evalúa cuando @Estado es diferente de "TODOS"--
   ELSE
		BEGIN
			--Evalúa cuando las fechas no son nulas y @Estado es diferente de "TODOS"--
			IF (@FechaGiradoIni is not null and @FechaGiradoFin is not null )
				BEGIN
					SELECT DISTINCT         
						ISNULL (a.IdSolicitud ,-1) [IdentificadorSolicitud],           
						a.IdEmpleado [CedulaEmpleado],         
						CONCAT( ISNULL(emplSolic.Nombres,''), ' ', ISNULL(emplSolic.Apellido1,''), ' ', ISNULL(emplSolic.Apellido2,'') ) NombreSolicitanteCompleto,
						emplSolic.Nombres [NombreSolicitante],           
						CONCAT(emplSolic.[Apellido1], ' ', emplSolic.[Apellido2]) [ApellidosSolicitante],           
						f.Nombres [NombreAprobador],           
						CONCAT(f.[Apellido1], ' ', f.[Apellido2]) [ApellidosAprobador],      
						CONCAT(ISNULL(f.Nombres,''), ' ', ISNULL(f.Apellido1,''), ' ', ISNULL(f.Apellido2,'') ) NombreAprobadorTesoCompleto,
						g.NumeroSpiga [NumeroPago],          
						g.FechaPago [Fecha Pago],          
						g.UrlAnexoPago,          
						c.Email_Corporativo [CorreoSolicitante],          
						c.Nombre_Cargo [Cargo],  
						-----------ID------------------
						d.NifCif [CedulaCliente],          
						d.Nombre   [NombreCliente],             
						d.FkNaturalezaJuridicaTipos [FkNaturalezaJuridicaTipos],          
						CONCAT(d.[Apellido1], ' ', d.[Apellido2] ) [ApellidosCliente],
						CONCAT(ISNULL(d.Nombre,''), ' ', ISNULL(d.Apellido1,''), ' ', ISNULL(d.Apellido2,'') ) NombreClienteCompleto,
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
						-------NUEVOS CAMPOS-------------    
						a.IdConceptoCreacion,      
						h.DescripcionConceptoCreacion,       
						a.FechaModificacion,    
						a.IdJefeAprobador ,    
						i.Nombres [NombreJefe],    
						CONCAT(i.[Apellido1], ' ', i.[Apellido2] ) [ApellidosJefe],         
						CONCAT(ISNULL(i.Nombres,''), ' ', ISNULL(i.Apellido1,''), ' ', ISNULL(i.Apellido2,'') ) NombreAprobadorJefeCompleto,
						i.Email_Corporativo[CorreoJefe], 
						i.Nombre_Cargo [CargoJefe] ,    
						a.EstadoAprobadorJefe ,    
						a.FechaAccionJefe,    
						a.ObservacionRechazoJefe,    
						a.IdUnidadNegocioJefe,    
						fp.DescFormaPago, 
						nj.descNaturalezaJuridica, 
						a.EntidadFinancieraDestino as EntidadFinancieraDestino,
						a.NumeroCuentaDestino as NoCuentaDestino, 
						a.TipoCuenta as TipoCuenta,
						a.DocumentoAplica, 
						a.Anticipo, 
						a.FacturaSerie, 
						a.FacturaNumero, 
						a.FacturaAnn,
						a.IdAprobador, 
						ISNULL(pg.FechaCreacion, GETDATE()) as FechaGiro, 
						a.CorreoElectronico as CorreoCliente,
						em.NombreEmpresa, 
						a.IDFormaPago, 
						a.idNaturalezaJuridica, 
						--Pregiro
						pg.ObservacionRechazo,
						pg.idPagos,
						pg.FechaCreacion,
						---- BENEFICIARIO
						a.NombresBeneficiario,
						a.CedulaBeneficiario,
						a.NaturalezaJuridicaBeneficiario,
						a.CorrreoElectronicoBeneficiario,
						udn.NombreUnidadNegocio,
						CONCAT(ISNULL(k.Nombres,''), ' ', ISNULL(k.Apellido1,''), ' ', ISNULL(k.Apellido2,'') ) NombreAprobadorBanco,
						a.ObservacionRechazoBanco,
						a.FechaAprobacionBanco

					FROM Devoluciones_Solicitud a     
					LEFT JOIN v_UnidadDeNegocio udn ON a.IdLinea = udn.CodUnidadNegocio

					LEFT JOIN v_Requisiciones_EmpleadosActivosRetirados emplSolic ON emplSolic.CodigoEmpleado = a.IdEmpleado

					Inner Join Empresas Em ON em.CodigoEmpresa = a.IdEmpresa
						-----------------ANEXOS  DEVOLUCIONES---------    
					left outer join  Devoluciones_Anexos b  ON a.IdSolicitud = b.IdSolicitud          
					---------------------DATOS SOLICITANTE-----------   
					left join  #Tmp_EmpleadosActivos_ControlDevoluciones C ON c.CodigoEmpleado = a.IdEmpleado  
					left join  [PSCService_DB].dbo.spiga_Terceros d ON d.NifCif = a.IdCliente
					------------------TABLA CAUSA RECHAZO--------    
					left outer join Devoluciones_CausaRechazo e  ON a.IdCausaRechazo  = e.IdCausaRechazo           
					---------------------DATOS APROBADOR tesoreria-----------    
					left join  #Tmp_EmpleadosActivos_ControlDevoluciones F ON f.CodigoEmpleado = a.IdAprobador
					---------------------PAGOS----------------    
					left outer join  Devoluciones_Pagos g  ON g.IdSolicitud= a.IdSolicitud     
					----------------CREACION CONCEPTO---------    
					left outer join Devoluciones_ConceptoCreacion  h  ON a.IdConceptoCreacion= h.IdConceptoCreacion      
					-------------DATOS APROBADOR JEFE-----------------    
					left join  #Tmp_EmpleadosActivos_ControlDevoluciones I ON i.CodigoEmpleado = a.IdJefeAprobador  
					-------------DATOS APROBADOR BANCO-----------------    
					LEFT JOIN v_Requisiciones_EmpleadosActivosRetirados k ON k.CodigoEmpleado = a.IdAprobadorBanco
					----------------FIN--------------------    
					Left join Devoluciones_FormasPago fp ON fp.idFormaPago = a.IDFormaPago
					Left join Devoluciones_NatJuridica nj ON nj.idNaturalezaJuridica = a.idNaturalezaJuridica
					
					Left join
					(
						SELECT pg_.*
						FROM Devoluciones_preGiro  pg_
						Inner Join 
						(	
							SELECT	idSolicitud, max(idPagos) idPago FROM Devoluciones_preGiro p_ 
									GROUP BY idSolicitud 
						) 
						f_ ON f_.idSolicitud = pg_.idSolicitud and f_.idPago = pg_.idPagos 
					)  				
					pg ON  pg.IdSolicitud = a.IdSolicitud 
					
					WHERE a.Estado = @Estado  AND (a.IdEmpresa = @idEmpresa  or @idEmpresa =0)
					
					AND ( (a.IdEmpleado = @CedulaEmpleado and @CedulaEmpleado is NOT null) OR (@CedulaEmpleado is null)	)
					AND ( (a.IdJefeAprobador = @AprobadorJefe and @AprobadorJefe is NOT null) OR (@AprobadorJefe is null) )
					AND ( (a.IdAprobador = @AprobadorTesoreria and @AprobadorTesoreria is NOT null) OR (@AprobadorTesoreria is null) )
					AND ( (a.IdSolicitud = @IdSolicitud and @IdSolicitud is NOT null) OR (@IdSolicitud is null)	)
					AND ( ( (pg.FechaCreacion >= @FechaGiradoIni OR a.FechaModificacion >= @FechaGiradoIni) AND  (pg.FechaCreacion <=@FechaGiradoFin OR a.FechaModificacion <=@FechaGiradoFin) AND  @FechaGiradoIni is NOT null) OR (@FechaGiradoIni is null) )
					
					AND ( (a.FechaSolicitud >= @FechaPendienteIni AND  a.FechaSolicitud <=  @FechaPendienteFin AND  @FechaPendienteIni is NOT null) OR (@FechaPendienteIni is null) )
					AND ( (a.FechaAccionJefe >= @FechaAprobadoJefeIni AND  a.FechaAccionJefe <=  @FechaAprobadoJefeFin AND  @FechaAprobadoJefeIni is NOT null) OR (@FechaAprobadoJefeIni is null) )
					AND ( (a.FechaAprobacion >= @FechaAprobadoTesoIni AND  a.FechaAprobacion <=  @FechaAprobadoTesoFin AND  @FechaAprobadoTesoIni is NOT null) OR (@FechaAprobadoTesoIni is null) )
					
					ORDER BY a.FechaSolicitud DESC
				END
	        
			-- Evalúa cuando cuando las fechas son nulas y @Estado es diferente de "TODOS"--
			ELSE
				BEGIN 
					SELECT DISTINCT         
						ISNULL (a.IdSolicitud ,-1) [IdentificadorSolicitud],           
						a.IdEmpleado [CedulaEmpleado],         
						CONCAT( ISNULL(emplSolic.Nombres,''), ' ', ISNULL(emplSolic.Apellido1,''), ' ', ISNULL(emplSolic.Apellido2,'') ) NombreSolicitanteCompleto,
						emplSolic.Nombres [NombreSolicitante],           
						CONCAT(emplSolic.[Apellido1], ' ', emplSolic.[Apellido2]) [ApellidosSolicitante],           
						f.Nombres [NombreAprobador],           
						CONCAT(f.[Apellido1], ' ', f.[Apellido2]) [ApellidosAprobador],      
						CONCAT(ISNULL(f.Nombres,''), ' ', ISNULL(f.Apellido1,''), ' ', ISNULL(f.Apellido2,'') ) NombreAprobadorTesoCompleto,
						g.NumeroSpiga [NumeroPago],          
						g.FechaPago [Fecha Pago],          
						g.UrlAnexoPago,          
						c.Email_Corporativo [CorreoSolicitante],          
						c.Nombre_Cargo [Cargo],  
						-----------ID------------------
						d.NifCif [CedulaCliente],          
						d.Nombre   [NombreCliente],             
						d.FkNaturalezaJuridicaTipos [FkNaturalezaJuridicaTipos],          
						CONCAT(d.[Apellido1], ' ', d.[Apellido2] ) [ApellidosCliente],
						CONCAT(ISNULL(d.Nombre,''), ' ', ISNULL(d.Apellido1,''), ' ', ISNULL(d.Apellido2,'') ) NombreClienteCompleto,
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
						CONCAT(i.[Apellido1], ' ', i.[Apellido2] ) [ApellidosJefe],         
						CONCAT(ISNULL(i.Nombres,''), ' ', ISNULL(i.Apellido1,''), ' ', ISNULL(i.Apellido2,'') ) NombreAprobadorJefeCompleto,
						i.Email_Corporativo[CorreoJefe], i.Nombre_Cargo [CargoJefe] ,    
						a.EstadoAprobadorJefe ,    
						a.FechaAccionJefe,    
						a.ObservacionRechazoJefe,    
						a.IdUnidadNegocioJefe,    
						fp.DescFormaPago, nj.descNaturalezaJuridica, 
						a.EntidadFinancieraDestino as EntidadFinancieraDestino,
						a.NumeroCuentaDestino as NoCuentaDestino, 
						a.TipoCuenta as TipoCuenta,
						a.DocumentoAplica, 
						a.Anticipo, 
						a.FacturaSerie, 
						a.FacturaNumero, 
						a.FacturaAnn,
						a.IdAprobador, 
						GETDATE() as FechaGiro, 
						a.CorreoElectronico as CorreoCliente, 
						em.NombreEmpresa, 
						a.IDFormaPago, a.idNaturalezaJuridica,
						---- BENEFICIARIO
						a.NombresBeneficiario,
						a.CedulaBeneficiario,
						a.NaturalezaJuridicaBeneficiario,
						a.CorrreoElectronicoBeneficiario,
						udn.NombreUnidadNegocio,
						CONCAT(ISNULL(k.Nombres,''), ' ', ISNULL(k.Apellido1,''), ' ', ISNULL(k.Apellido2,'') ) NombreAprobadorBanco,
						a.ObservacionRechazoBanco,
						a.FechaAprobacionBanco

					FROM Devoluciones_Solicitud a     
					LEFT JOIN v_UnidadDeNegocio udn ON a.IdLinea = udn.CodUnidadNegocio
					LEFT JOIN v_Requisiciones_EmpleadosActivosRetirados emplSolic ON emplSolic.CodigoEmpleado = a.IdEmpleado
					Inner Join Empresas Em ON em.CodigoEmpresa = a.IdEmpresa
						-----------------ANEXOS  DEVOLUCIONES---------    
					left outer join  Devoluciones_Anexos b  ON a.IdSolicitud = b.IdSolicitud          
					---------------------DATOS SOLICITANTE-----------   
					left join  #Tmp_EmpleadosActivos_ControlDevoluciones C ON c.CodigoEmpleado = a.IdEmpleado  
					left join  [PSCService_DB].dbo.spiga_Terceros d ON   d.NifCif = a.IdCliente
					------------------TABLA CAUSA RECHAZO--------    
					left outer join Devoluciones_CausaRechazo e  ON a.IdCausaRechazo  = e.IdCausaRechazo           
					---------------------DATOS APROBADOR tesoreria-----------    
					left join  #Tmp_EmpleadosActivos_ControlDevoluciones F ON f.CodigoEmpleado = a.IdAprobador
					---------------------PAGOS----------------    
					left outer join  Devoluciones_Pagos g  ON g.IdSolicitud= a.IdSolicitud     
					----------------CREACION CONCEPTO---------    
					left outer join Devoluciones_ConceptoCreacion  h  ON a.IdConceptoCreacion= h.IdConceptoCreacion      
					-------------DATOS APROBADOR JEFE-----------------    
					left join  #Tmp_EmpleadosActivos_ControlDevoluciones I ON i.CodigoEmpleado = a.IdJefeAprobador  
					-------------DATOS APROBADOR BANCO-----------------    
					LEFT JOIN v_Requisiciones_EmpleadosActivosRetirados k ON k.CodigoEmpleado = a.IdAprobadorBanco
					----------------FIN--------------------    
					Left join Devoluciones_FormasPago fp ON fp.idFormaPago = a.IDFormaPago
					Left join Devoluciones_NatJuridica nj ON nj.idNaturalezaJuridica = a.idNaturalezaJuridica
					
					WHERE a.Estado = @Estado  AND (a.IdEmpresa = @idEmpresa  or @idEmpresa =0)
					AND ( (a.IdEmpleado = @CedulaEmpleado and @CedulaEmpleado is NOT null) OR (@CedulaEmpleado is null)	)
					AND ( (a.IdJefeAprobador = @AprobadorJefe and @AprobadorJefe is NOT null) OR (@AprobadorJefe is null) )
					AND ( (a.IdAprobador = @AprobadorTesoreria and @AprobadorTesoreria is NOT null) OR (@AprobadorTesoreria is null) )
					AND ( (a.IdSolicitud = @IdSolicitud and @IdSolicitud is NOT null) OR (@IdSolicitud is null) )
					AND ( (a.FechaSolicitud >= @FechaPendienteIni AND  a.FechaSolicitud <=  @FechaPendienteFin AND  @FechaPendienteIni is NOT null) OR (@FechaPendienteIni is null)	)
					AND ( (a.FechaAccionJefe >= @FechaAprobadoJefeIni AND  a.FechaAccionJefe <=  @FechaAprobadoJefeFin AND  @FechaAprobadoJefeIni is NOT null) OR (@FechaAprobadoJefeIni is null) )
					AND ( (a.FechaAprobacion >= @FechaAprobadoTesoIni AND  a.FechaAprobacion <=  @FechaAprobadoTesoFin AND  @FechaAprobadoTesoIni is NOT null) OR (@FechaAprobadoTesoIni is null) )
					
					ORDER BY a.FechaSolicitud DESC
				END
		END
-- JCS: 27/11/2022 - SE ACMBIO EL NOMBRE DE LA TABLA: Tmp_EmpleadoActivos TEMPORAL PARA GARANTIZAR QUE SEA ÚNICA ENTRE LOS MÓDULOS
DROP TABLE #Tmp_EmpleadosActivos_ControlDevoluciones

END
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

```
