# Stored Procedure: sp_Descargos_ConsultaGeneral

## Usa los objetos:
- [[AspNetUsers]]
- [[Cargos]]
- [[Descargos_Empleado]]
- [[Descargos_FaltasComunes]]
- [[Descargos_Sanciones]]
- [[Descargos_SolicitudDescargos]]
- [[Descargos_Solicitudes]]
- [[EmpleadosActivos]]
- [[Profiles]]
- [[vw_Descargos_Estados]]
- [[vw_Descargos_FuerosBySolicitudes]]
- [[vw_Descargos_HistoricoSolicitud]]
- [[vw_Descargos_UnidadNegocio]]

```sql
CREATE PROC [dbo].[sp_Descargos_ConsultaGeneral]
(
	@Estado NVARCHAR(50),
	@UserID NVARCHAR(50),
	@Usuario NVARCHAR(50)
) AS

BEGIN

	SET NOCOUNT ON
	SET FMTONLY OFF
	--DECLARE @Estado NVARCHAR(50), @UserID NVARCHAR(50), @Usuario NVARCHAR(50)
	--SET @Estado = 'ACTIVO'
	--SET @UserID = 'df8e3e59-db1a-4a5f-a030-acafae6d7ab8'
	--SET @Usuario = 'GH'--'SOLICITANTE'

	DECLARE @TipoEstado NVARCHAR(50)

	/*Agregar los códigos de los estados activos o finalizados*/
	IF @Usuario = 'NOMINA' --Para nomina solo se consultan los estados finalizados
		BEGIN SET @TipoEstado = 'FINALIZADO' END

	ELSE 
		BEGIN 
			IF @Estado = 'ACTIVO'
				BEGIN SET @TipoEstado = 'ACTIVO' END

			ELSE --Finalizado
				BEGIN SET @TipoEstado = 'FINALIZADO' END
		END


	IF @Usuario = 'SOLICITANTE'
		BEGIN
			SELECT DISTINCT 
				--Descargo
				S.IdDescargo,					D.IdEstado,						D.NombreEstado,					DetalleEstado,					D.FechaSolicitud,
				D.DescripcionHechos,			D.CodigoFalta,					D.NombreFalta,					D.CodigoSancion,				D.NombreSancion,
				D.CodSAI,						D.CartaSancionFirmada,			D.SancionDefitiva,				D.NombreSancionDefitiva,		D.EstadoUsuario,
				d.FechaModEstado,

				--Fueros
				D.Enfermedad,					D.PrePension,					D.CabezaFamilia,				D.Maternidad,					D.Convivencia,
				D.OtrosFueros,					D.DescOtrosFueros,			
	
				--Empleado
				E.CedulaEmpleado,			E.NombreEmpleado,				E.CodCargoEmpleado,				E.NombreCargoEmpelado,			E.CodEmpresaEmpleado,   
				E.NombreEmpresaEmpleado,	E.CodUnidadEmpleado,			E.NombreUnidadEmpleado,			E.CodCentroEmpleado,			E.NombreCentroEmpleado,  
				E.CodSeccionEmpleado,		E.NombreSeccionEmpleado,		E.CodDepartamentoEmpleado,		E.NombreDepartamentoEmpleado,	E.CorreoEmpleado,
	
				--Solicitante
				S.IdSolicitante,			S.CedulaSolicitante,			S.NombreSolicitante,			S.CodCargoSolicitante,			S.NombreCargoSolicitante,
				S.CodEmpresaSolicitante,	S.NombreEmpresaSolicitante,		S.CodUnidadSolicitante,			S.NombreUnidadSolicitante,		S.CodCentroSolicitante,
				S.NombreCentroSolicitante,	S.CodSeccionSolicitante,		S.NombreSeccionSolicitante,		S.CodDepartamentoSolicitante,	S.NombreDepartamentoSolicitante,
				S.Email
			FROM 
			(
				--Consulta del solicitante que creo el descargo
				SELECT	
					S.IdSolicitante,							CedulaSolicitante=(U.UserName),						NombreSolicitante=(p.Nombres+' '+p.Apellidos),		
					CodCargoSolicitante=E.Codigo_Cargo,			NombreCargoSolicitante=c.NombreCargo,				CodEmpresaSolicitante=E.CodigoEmpresa,
					NombreEmpresaSolicitante=e.Empresa,			CodUnidadSolicitante=e.Unidad_Negocio,				NombreUnidadSolicitante=e.Nombre_Unidad_Negocio,
					CodCentroSolicitante=e.codigo_centro,		NombreCentroSolicitante=e.nombre_centro,			CodSeccionSolicitante=e.codigo_seccion,
					NombreSeccionSolicitante=e.nombre_seccion,	CodDepartamentoSolicitante=e.codigo_departamento,	NombreDepartamentoSolicitante=e.nombre_departamento,
					u.Email,									S.IdDescargo,										S.CedulaEmpleado
				FROM Descargos_Solicitudes S
					LEFT JOIN AspNetUsers U ON U.Id = S.IdSolicitante
					LEFT JOIN Profiles P ON S.IdSolicitante = P.UserId
					LEFT JOIN EmpleadosActivos E ON E.Ano_Periodo = YEAR(GETDATE()) 
												AND E.Mes_Periodo = MONTH(GETDATE()) 
												AND E.CodigoEmpleado = U.UserName
					LEFT JOIN Cargos C ON C.CodigoCargo = E.Codigo_Cargo 
											AND Obsoleto = 0 
											AND Activo = 1
				WHERE S.IdSolicitante = @UserID
			) S

			INNER JOIN 
			(
				--Consulta de la informacion detallado del descargo
				SELECT	D.IdDescargo,				D.IdEstado,					E.NombreEstado,				DetalleEstado = E.Descripcion, 			
						D.FechaSolicitud,			D.DescripcionHechos,		D.CodigoFalta,				F.NombreFalta, 				
						D.CodigoSancion, 			S.NombreSancion,			D.CodSAI,					D.CartaSancionFirmada,		
						E.EstadoUsuario,			E.TipoEstado,				D.SancionDefitiva,			NombreSancionDefitiva = SA_D.NombreSancion,			
						DF.Enfermedad,				DF.PrePension, 				DF.CabezaFamilia,			DF.Maternidad,
						DF.Convivencia,				DF.OtrosFueros,				DF.DescOtrosFueros,			FechaModEstado = HS.FechaModificacion

				FROM Descargos_SolicitudDescargos D
				LEFT JOIN Descargos_FaltasComunes F ON D.CodigoFalta = F.CodigoFalta
				LEFT JOIN Descargos_Sanciones S ON S.CodigoSancion = D.CodigoSancion
				LEFT JOIN vw_Descargos_Estados E ON E.IdEstado = D.IdEstado
				LEFT JOIN Descargos_Sanciones SA_D ON SA_D.CodigoSancion = D.SancionDefitiva
				LEFT JOIN vw_Descargos_FuerosBySolicitudes DF ON DF.IdDescargo = D.IdDescargo
				LEFT JOIN vw_Descargos_HistoricoSolicitud	AS HS ON D.IdDescargo = HS.IdSolicitud AND D.IdEstado = HS.IdEstado

				WHERE UPPER(E.TipoEstado) = @TipoEstado
			) D ON S.IdDescargo = D.IdDescargo

			LEFT JOIN 
			(
				--Consulta del empleado al cual se le aplica el descargo
				SELECT 	E.CedulaEmpleado,								E.NombreEmpleado,									CodCargoEmpleado=E.CodCargo,				
						NombreCargoEmpelado=C.NombreCargo,				CodEmpresaEmpleado=E.CodEmpresa,					NombreEmpresaEmpleado=U.NombreEmpresa, 		
						CodUnidadEmpleado=E.CodUnidadNegocio,			NombreUnidadEmpleado=U.NombreUnidadNegocio,			CodCentroEmpleado=E.CodCentro,
						NombreCentroEmpleado=U.NombreCentro,			CodSeccionEmpleado=E.CodSeccion,					NombreSeccionEmpleado=U.NombreSeccion,
						CodDepartamentoEmpleado=E.CodDepartamento,		NombreDepartamentoEmpleado=U.NombreDepartamento,	CorreoEmpleado=E.Correo
				FROM Descargos_Empleado E
				LEFT JOIN vw_Descargos_UnidadNegocio U ON U.CodEmpresa = E.CodEmpresa AND U.CodCentro = E.CodCentro 
						AND U.CodSeccion = E.CodSeccion AND U.CodDepartamento = E.CodDepartamento 
						AND U.CodUnidadNegocio = E.CodUnidadNegocio
				LEFT JOIN Cargos C ON C.CodigoCargo = E.CodCargo AND Obsoleto = 0 AND Activo = 1
			) E ON E.CedulaEmpleado = S.CedulaEmpleado
		END

	ELSE IF @Usuario = 'GH-A'
		BEGIN
			SELECT DISTINCT 
				--Descargo
				IdDescargo,					IdEstado,						NombreEstado,					DetalleEstado,					FechaSolicitud,
				DescripcionHechos,			CodigoFalta,					NombreFalta,					CodigoSancion,					NombreSancion,
				CodSAI,						CartaSancionFirmada,			SancionDefitiva,				NombreSancionDefitiva,			EstadoUsuario,
				FechaModEstado,

				--Fueros
				Enfermedad,					PrePension,						CabezaFamilia,					Maternidad,						Convivencia,
				OtrosFueros,				DescOtrosFueros,			

				--Empleado
				CedulaEmpleado,				NombreEmpleado,					CodCargoEmpleado,				NombreCargoEmpelado,			CodEmpresaEmpleado,   
				NombreEmpresaEmpleado,		CodUnidadEmpleado,				NombreUnidadEmpleado,			CodCentroEmpleado,				NombreCentroEmpleado,  
				CodSeccionEmpleado,			NombreSeccionEmpleado,			CodDepartamentoEmpleado,		NombreDepartamentoEmpleado,	

				--Solicitante
				IdSolicitante,				CedulaSolicitante,				NombreSolicitante,				CodCargoSolicitante,			NombreCargoSolicitante,
				CodEmpresaSolicitante,		NombreEmpresaSolicitante,		CodUnidadSolicitante,			NombreUnidadSolicitante,		CodCentroSolicitante,
				NombreCentroSolicitante,	CodSeccionSolicitante,			NombreSeccionSolicitante,		CodDepartamentoSolicitante,		NombreDepartamentoSolicitante,
				Email
			FROM
			(
				SELECT DISTINCT 
					--Descargo
					S.IdDescargo,				D.IdEstado,						D.NombreEstado,					DetalleEstado,					D.FechaSolicitud,
					D.DescripcionHechos,		D.CodigoFalta,					D.NombreFalta,					D.CodigoSancion,				D.NombreSancion,
					D.CodSAI,					D.CartaSancionFirmada,			D.SancionDefitiva,				D.NombreSancionDefitiva,		D.EstadoUsuario,
					D.FechaModEstado, 

					--Fueros
					D.Enfermedad,				D.PrePension,					D.CabezaFamilia,				D.Maternidad,					D.Convivencia,
					D.OtrosFueros,				D.DescOtrosFueros,			
	
					--Empleado
					E.CedulaEmpleado,			E.NombreEmpleado,				E.CodCargoEmpleado,				E.NombreCargoEmpelado,			E.CodEmpresaEmpleado,   
					E.NombreEmpresaEmpleado,	E.CodUnidadEmpleado,			E.NombreUnidadEmpleado,			E.CodCentroEmpleado,			E.NombreCentroEmpleado,  
					E.CodSeccionEmpleado,		E.NombreSeccionEmpleado,		E.CodDepartamentoEmpleado,		E.NombreDepartamentoEmpleado,	
	
					--Solicitante
					S.IdSolicitante,			S.CedulaSolicitante,			S.NombreSolicitante,			S.CodCargoSolicitante,			S.NombreCargoSolicitante,
					S.CodEmpresaSolicitante,	S.NombreEmpresaSolicitante,		S.CodUnidadSolicitante,			S.NombreUnidadSolicitante,		S.CodCentroSolicitante,
					S.NombreCentroSolicitante,	S.CodSeccionSolicitante,		S.NombreSeccionSolicitante,		S.CodDepartamentoSolicitante,	S.NombreDepartamentoSolicitante,
					S.Email
				FROM 
				(
					--Consulta de la informacion detallado del descargo
					SELECT	D.IdDescargo,				D.IdEstado,					E.NombreEstado,				DetalleEstado = E.Descripcion, 			
							D.FechaSolicitud,			D.DescripcionHechos,		D.CodigoFalta,				F.NombreFalta, 				
							D.CodigoSancion, 			S.NombreSancion,			D.CodSAI,					D.CartaSancionFirmada,		
							E.EstadoUsuario,			E.TipoEstado,				D.SancionDefitiva,			NombreSancionDefitiva = SA_D.NombreSancion,			
							DF.Enfermedad,				DF.PrePension, 				DF.CabezaFamilia,			DF.Maternidad,
							DF.Convivencia,				DF.OtrosFueros,				DF.DescOtrosFueros,			FechaModEstado = HS.FechaModificacion

					FROM Descargos_SolicitudDescargos D
					LEFT JOIN Descargos_FaltasComunes F ON D.CodigoFalta = F.CodigoFalta
					LEFT JOIN Descargos_Sanciones S ON S.CodigoSancion = D.CodigoSancion
					LEFT JOIN vw_Descargos_Estados E ON E.IdEstado = D.IdEstado
					LEFT JOIN Descargos_Sanciones SA_D ON SA_D.CodigoSancion = D.SancionDefitiva
					LEFT JOIN vw_Descargos_FuerosBySolicitudes DF ON DF.IdDescargo = D.IdDescargo
					LEFT JOIN vw_Descargos_HistoricoSolicitud	AS HS ON D.IdDescargo = HS.IdSolicitud AND D.IdEstado = HS.IdEstado
					WHERE UPPER(E.TipoEstado) = @TipoEstado
				) D 

				INNER JOIN 
				(
					--Consulta del solicitante que creo el descargo
					SELECT	
						S.IdSolicitante,							CedulaSolicitante=(U.UserName),						NombreSolicitante=(p.Nombres+' '+p.Apellidos),		
						CodCargoSolicitante=E.Codigo_Cargo,			NombreCargoSolicitante=c.NombreCargo,				CodEmpresaSolicitante=E.CodigoEmpresa,
						NombreEmpresaSolicitante=e.Empresa,			CodUnidadSolicitante=e.Unidad_Negocio,				NombreUnidadSolicitante=e.Nombre_Unidad_Negocio,
						CodCentroSolicitante=e.codigo_centro,		NombreCentroSolicitante=e.nombre_centro,			CodSeccionSolicitante=e.codigo_seccion,
						NombreSeccionSolicitante=e.nombre_seccion,	CodDepartamentoSolicitante=e.codigo_departamento,	NombreDepartamentoSolicitante=e.nombre_departamento,
						u.Email,									S.IdDescargo,										S.CedulaEmpleado
					FROM Descargos_Solicitudes S
					LEFT JOIN AspNetUsers U ON U.Id = S.IdSolicitante
					LEFT JOIN Profiles P ON S.IdSolicitante = P.UserId
					LEFT JOIN EmpleadosActivos E ON E.Ano_Periodo = YEAR(GETDATE()) 
												AND E.Mes_Periodo = MONTH(GETDATE()) 
												AND E.CodigoEmpleado = U.UserName
					LEFT JOIN Cargos C ON C.CodigoCargo = E.Codigo_Cargo 
											AND Obsoleto = 0 
											AND Activo = 1
				) S ON S.IdDescargo = D.IdDescargo

				LEFT JOIN 
				(
					--Consulta del empleado al cual se le aplica el descargo
					SELECT 	E.CedulaEmpleado,								E.NombreEmpleado,									CodCargoEmpleado=E.CodCargo,				
							NombreCargoEmpelado=C.NombreCargo,				CodEmpresaEmpleado=E.CodEmpresa,					NombreEmpresaEmpleado=U.NombreEmpresa, 		
							CodUnidadEmpleado=E.CodUnidadNegocio,			NombreUnidadEmpleado=U.NombreUnidadNegocio,			CodCentroEmpleado=E.CodCentro,
							NombreCentroEmpleado=U.NombreCentro,			CodSeccionEmpleado=E.CodSeccion,					NombreSeccionEmpleado=U.NombreSeccion,
							CodDepartamentoEmpleado=E.CodDepartamento,		NombreDepartamentoEmpleado=U.NombreDepartamento
					FROM Descargos_Empleado E
					LEFT JOIN vw_Descargos_UnidadNegocio U ON U.CodEmpresa = E.CodEmpresa AND U.CodCentro = E.CodCentro 
							AND U.CodSeccion = E.CodSeccion AND U.CodDepartamento = E.CodDepartamento 
							AND U.CodUnidadNegocio = E.CodUnidadNegocio
					LEFT JOIN Cargos C ON C.CodigoCargo = E.CodCargo AND Obsoleto = 0 AND Activo = 1
				) E ON E.CedulaEmpleado = S.CedulaEmpleado
			) CPT
			WHERE CedulaEmpleado <> CedulaSolicitante
		END

	ELSE IF @Usuario = 'GH-JD'
		BEGIN
			SELECT DISTINCT 
				--Descargo
				IdDescargo,					IdEstado,						NombreEstado,					DetalleEstado,					FechaSolicitud,
				DescripcionHechos,			CodigoFalta,					NombreFalta,					CodigoSancion,					NombreSancion,
				CodSAI,						CartaSancionFirmada,			SancionDefitiva,				NombreSancionDefitiva,			EstadoUsuario,
				FechaModEstado,

				--Fueros
				Enfermedad,					PrePension,						CabezaFamilia,					Maternidad,						Convivencia,
				OtrosFueros,				DescOtrosFueros,			


				--Empleado
				CedulaEmpleado,				NombreEmpleado,					CodCargoEmpleado,				NombreCargoEmpelado,			CodEmpresaEmpleado,   
				NombreEmpresaEmpleado,		CodUnidadEmpleado,				NombreUnidadEmpleado,			CodCentroEmpleado,				NombreCentroEmpleado,  
				CodSeccionEmpleado,			NombreSeccionEmpleado,			CodDepartamentoEmpleado,		NombreDepartamentoEmpleado,	

				--Solicitante
				IdSolicitante,				CedulaSolicitante,				NombreSolicitante,				CodCargoSolicitante,			NombreCargoSolicitante,
				CodEmpresaSolicitante,		NombreEmpresaSolicitante,		CodUnidadSolicitante,			NombreUnidadSolicitante,		CodCentroSolicitante,
				NombreCentroSolicitante,	CodSeccionSolicitante,			NombreSeccionSolicitante,		CodDepartamentoSolicitante,		NombreDepartamentoSolicitante,
				Email
			FROM
			(
				SELECT DISTINCT 
					--Descargo
					S.IdDescargo,				D.IdEstado,						D.NombreEstado,					DetalleEstado,					D.FechaSolicitud,
					D.DescripcionHechos,		D.CodigoFalta,					D.NombreFalta,					D.CodigoSancion,				D.NombreSancion,
					D.CodSAI,					D.CartaSancionFirmada,			D.SancionDefitiva,				D.NombreSancionDefitiva,		D.EstadoUsuario,
					D.FechaModEstado,

					--Fueros
					D.Enfermedad,				D.PrePension,					D.CabezaFamilia,				D.Maternidad,					D.Convivencia,
					D.OtrosFueros,				D.DescOtrosFueros,			

	
					--Empleado
					E.CedulaEmpleado,			E.NombreEmpleado,				E.CodCargoEmpleado,				E.NombreCargoEmpelado,			E.CodEmpresaEmpleado,   
					E.NombreEmpresaEmpleado,	E.CodUnidadEmpleado,			E.NombreUnidadEmpleado,			E.CodCentroEmpleado,			E.NombreCentroEmpleado,  
					E.CodSeccionEmpleado,		E.NombreSeccionEmpleado,		E.CodDepartamentoEmpleado,		E.NombreDepartamentoEmpleado,	
	
					--Solicitante
					S.IdSolicitante,			S.CedulaSolicitante,			S.NombreSolicitante,			S.CodCargoSolicitante,			S.NombreCargoSolicitante,
					S.CodEmpresaSolicitante,	S.NombreEmpresaSolicitante,		S.CodUnidadSolicitante,			S.NombreUnidadSolicitante,		S.CodCentroSolicitante,
					S.NombreCentroSolicitante,	S.CodSeccionSolicitante,		S.NombreSeccionSolicitante,		S.CodDepartamentoSolicitante,	S.NombreDepartamentoSolicitante,
					S.Email
				FROM 
				(
					--Consulta del solicitante que creo el descargo
					SELECT	
						S.IdSolicitante,							CedulaSolicitante=(U.UserName),						NombreSolicitante=(p.Nombres+' '+p.Apellidos),		
						CodCargoSolicitante=E.Codigo_Cargo,			NombreCargoSolicitante=c.NombreCargo,				CodEmpresaSolicitante=E.CodigoEmpresa,
						NombreEmpresaSolicitante=e.Empresa,			CodUnidadSolicitante=e.Unidad_Negocio,				NombreUnidadSolicitante=e.Nombre_Unidad_Negocio,
						CodCentroSolicitante=e.codigo_centro,		NombreCentroSolicitante=e.nombre_centro,			CodSeccionSolicitante=e.codigo_seccion,
						NombreSeccionSolicitante=e.nombre_seccion,	CodDepartamentoSolicitante=e.codigo_departamento,	NombreDepartamentoSolicitante=e.nombre_departamento,
						u.Email,									S.IdDescargo,										S.CedulaEmpleado
					FROM Descargos_Solicitudes S
					LEFT JOIN AspNetUsers U ON U.Id = S.IdSolicitante
					LEFT JOIN Profiles P ON S.IdSolicitante = P.UserId
					LEFT JOIN EmpleadosActivos E ON E.Ano_Periodo = YEAR(GETDATE()) 
												AND E.Mes_Periodo = MONTH(GETDATE()) 
												AND E.CodigoEmpleado = U.UserName
					LEFT JOIN Cargos C ON C.CodigoCargo = E.Codigo_Cargo 
											AND Obsoleto = 0 
											AND Activo = 1
					WHERE LTRIM(RTRIM(E.Unidad_Negocio)) IN ('410','411','520')
				) S

				INNER JOIN 
				(
					--Consulta de la informacion detallado del descargo
					SELECT	D.IdDescargo,				D.IdEstado,					E.NombreEstado,				DetalleEstado = E.Descripcion, 			
							D.FechaSolicitud,			D.DescripcionHechos,		D.CodigoFalta,				F.NombreFalta, 				
							D.CodigoSancion, 			S.NombreSancion,			D.CodSAI,					D.CartaSancionFirmada,		
							E.EstadoUsuario,			E.TipoEstado,				D.SancionDefitiva,			NombreSancionDefitiva = SA_D.NombreSancion,			
							DF.Enfermedad,				DF.PrePension, 				DF.CabezaFamilia,			DF.Maternidad,
							DF.Convivencia,				DF.OtrosFueros,				DF.DescOtrosFueros,			FechaModEstado = HS.FechaModificacion

					FROM Descargos_SolicitudDescargos D
					LEFT JOIN Descargos_FaltasComunes F ON D.CodigoFalta = F.CodigoFalta
					LEFT JOIN Descargos_Sanciones S ON S.CodigoSancion = D.CodigoSancion
					LEFT JOIN vw_Descargos_Estados E ON E.IdEstado = D.IdEstado
					LEFT JOIN Descargos_Sanciones SA_D ON SA_D.CodigoSancion = D.SancionDefitiva
					LEFT JOIN vw_Descargos_FuerosBySolicitudes DF ON DF.IdDescargo = D.IdDescargo
					LEFT JOIN vw_Descargos_HistoricoSolicitud	AS HS ON D.IdDescargo = HS.IdSolicitud AND D.IdEstado = HS.IdEstado

					WHERE UPPER(E.TipoEstado) = @TipoEstado
				) D ON S.IdDescargo = D.IdDescargo

				LEFT JOIN 
				(
					--Consulta del empleado al cual se le aplica el descargo
					SELECT 	E.CedulaEmpleado,								E.NombreEmpleado,									CodCargoEmpleado=E.CodCargo,				
							NombreCargoEmpelado=C.NombreCargo,				CodEmpresaEmpleado=E.CodEmpresa,					NombreEmpresaEmpleado=U.NombreEmpresa, 		
							CodUnidadEmpleado=E.CodUnidadNegocio,			NombreUnidadEmpleado=U.NombreUnidadNegocio,			CodCentroEmpleado=E.CodCentro,
							NombreCentroEmpleado=U.NombreCentro,			CodSeccionEmpleado=E.CodSeccion,					NombreSeccionEmpleado=U.NombreSeccion,
							CodDepartamentoEmpleado=E.CodDepartamento,		NombreDepartamentoEmpleado=U.NombreDepartamento
					FROM Descargos_Empleado E
					LEFT JOIN vw_Descargos_UnidadNegocio U ON U.CodEmpresa = E.CodEmpresa AND U.CodCentro = E.CodCentro 
							AND U.CodSeccion = E.CodSeccion AND U.CodDepartamento = E.CodDepartamento 
							AND U.CodUnidadNegocio = E.CodUnidadNegocio
					LEFT JOIN Cargos C ON C.CodigoCargo = E.CodCargo AND Obsoleto = 0 AND Activo = 1
				) E ON E.CedulaEmpleado = S.CedulaEmpleado

				UNION ALL

				SELECT DISTINCT 
					--Descargo
					S.IdDescargo,				D.IdEstado,						D.NombreEstado,					DetalleEstado,					D.FechaSolicitud,
					D.DescripcionHechos,		D.CodigoFalta,					D.NombreFalta,					D.CodigoSancion,				D.NombreSancion,
					D.CodSAI,					D.CartaSancionFirmada,			D.SancionDefitiva,				D.NombreSancionDefitiva,		D.EstadoUsuario,
					D.FechaModEstado,

					--Fueros
					D.Enfermedad,				D.PrePension,					D.CabezaFamilia,				D.Maternidad,					D.Convivencia,
					D.OtrosFueros,				D.DescOtrosFueros,			
	
					--Empleado
					E.CedulaEmpleado,			E.NombreEmpleado,				E.CodCargoEmpleado,				E.NombreCargoEmpelado,			E.CodEmpresaEmpleado,   
					E.NombreEmpresaEmpleado,	E.CodUnidadEmpleado,			E.NombreUnidadEmpleado,			E.CodCentroEmpleado,			E.NombreCentroEmpleado,  
					E.CodSeccionEmpleado,		E.NombreSeccionEmpleado,		E.CodDepartamentoEmpleado,		E.NombreDepartamentoEmpleado,	
	
					--Solicitante
					S.IdSolicitante,			S.CedulaSolicitante,			S.NombreSolicitante,			S.CodCargoSolicitante,			S.NombreCargoSolicitante,
					S.CodEmpresaSolicitante,	S.NombreEmpresaSolicitante,		S.CodUnidadSolicitante,			S.NombreUnidadSolicitante,		S.CodCentroSolicitante,
					S.NombreCentroSolicitante,	S.CodSeccionSolicitante,		S.NombreSeccionSolicitante,		S.CodDepartamentoSolicitante,	S.NombreDepartamentoSolicitante,
					S.Email
				FROM 
				(
					--Consulta del empleado al cual se le aplica el descargo
					SELECT 	E.CedulaEmpleado,								E.NombreEmpleado,									CodCargoEmpleado=E.CodCargo,				
							NombreCargoEmpelado=C.NombreCargo,				CodEmpresaEmpleado=E.CodEmpresa,					NombreEmpresaEmpleado=U.NombreEmpresa, 		
							CodUnidadEmpleado=E.CodUnidadNegocio,			NombreUnidadEmpleado=U.NombreUnidadNegocio,			CodCentroEmpleado=E.CodCentro,
							NombreCentroEmpleado=U.NombreCentro,			CodSeccionEmpleado=E.CodSeccion,					NombreSeccionEmpleado=U.NombreSeccion,
							CodDepartamentoEmpleado=E.CodDepartamento,		NombreDepartamentoEmpleado=U.NombreDepartamento
					FROM Descargos_Empleado E
					LEFT JOIN vw_Descargos_UnidadNegocio U ON U.CodEmpresa = E.CodEmpresa AND U.CodCentro = E.CodCentro 
							AND U.CodSeccion = E.CodSeccion AND U.CodDepartamento = E.CodDepartamento 
							AND U.CodUnidadNegocio = E.CodUnidadNegocio
					LEFT JOIN Cargos C ON C.CodigoCargo = E.CodCargo AND Obsoleto = 0 AND Activo = 1	
					WHERE E.CodUnidadNegocio IN (410,411,520)
				) E

				INNER JOIN 
				(
					--Consulta del solicitante que creo el descargo
					SELECT	
						S.IdSolicitante,							CedulaSolicitante=(U.UserName),						NombreSolicitante=(p.Nombres+' '+p.Apellidos),		
						CodCargoSolicitante=E.Codigo_Cargo,			NombreCargoSolicitante=c.NombreCargo,				CodEmpresaSolicitante=E.CodigoEmpresa,
						NombreEmpresaSolicitante=e.Empresa,			CodUnidadSolicitante=e.Unidad_Negocio,				NombreUnidadSolicitante=e.Nombre_Unidad_Negocio,
						CodCentroSolicitante=e.codigo_centro,		NombreCentroSolicitante=e.nombre_centro,			CodSeccionSolicitante=e.codigo_seccion,
						NombreSeccionSolicitante=e.nombre_seccion,	CodDepartamentoSolicitante=e.codigo_departamento,	NombreDepartamentoSolicitante=e.nombre_departamento,
						u.Email,									S.IdDescargo,										S.CedulaEmpleado
					FROM Descargos_Solicitudes S
					LEFT JOIN AspNetUsers U ON U.Id = S.IdSolicitante
					LEFT JOIN Profiles P ON S.IdSolicitante = P.UserId
					LEFT JOIN EmpleadosActivos E ON E.Ano_Periodo = YEAR(GETDATE()) 
												AND E.Mes_Periodo = MONTH(GETDATE()) 
												AND E.CodigoEmpleado = U.UserName
					LEFT JOIN Cargos C ON C.CodigoCargo = E.Codigo_Cargo 
											AND Obsoleto = 0 
											AND Activo = 1
				) S ON E.CedulaEmpleado = S.CedulaEmpleado

				INNER JOIN 
				(
					--Consulta de la informacion detallado del descargo
					SELECT	D.IdDescargo,				D.IdEstado,					E.NombreEstado,				DetalleEstado = E.Descripcion, 			
							D.FechaSolicitud,			D.DescripcionHechos,		D.CodigoFalta,				F.NombreFalta, 				
							D.CodigoSancion, 			S.NombreSancion,			D.CodSAI,					D.CartaSancionFirmada,		
							E.EstadoUsuario,			E.TipoEstado,				D.SancionDefitiva,			NombreSancionDefitiva = SA_D.NombreSancion,			
							DF.Enfermedad,				DF.PrePension, 				DF.CabezaFamilia,			DF.Maternidad,
							DF.Convivencia,				DF.OtrosFueros,				DF.DescOtrosFueros,			FechaModEstado = HS.FechaModificacion

					FROM Descargos_SolicitudDescargos D
					LEFT JOIN Descargos_FaltasComunes F ON D.CodigoFalta = F.CodigoFalta
					LEFT JOIN Descargos_Sanciones S ON S.CodigoSancion = D.CodigoSancion
					LEFT JOIN vw_Descargos_Estados E ON E.IdEstado = D.IdEstado
					LEFT JOIN Descargos_Sanciones SA_D ON SA_D.CodigoSancion = D.SancionDefitiva
					LEFT JOIN vw_Descargos_FuerosBySolicitudes DF ON DF.IdDescargo = D.IdDescargo
					LEFT JOIN vw_Descargos_HistoricoSolicitud	AS HS ON D.IdDescargo = HS.IdSolicitud AND D.IdEstado = HS.IdEstado

					WHERE UPPER(E.TipoEstado) = @TipoEstado
				) D ON S.IdDescargo = D.IdDescargo
			) CPT
		END

	ELSE IF @Usuario = 'NOMINA'
		BEGIN
			SELECT DISTINCT 
				--Descargo
				S.IdDescargo,				D.IdEstado,						D.NombreEstado,					DetalleEstado,					D.FechaSolicitud,
				D.DescripcionHechos,		D.CodigoFalta,					D.NombreFalta,					D.CodigoSancion,				D.NombreSancion,
				D.CodSAI,					D.CartaSancionFirmada,			D.SancionDefitiva,				D.NombreSancionDefitiva,		D.EstadoUsuario,
				D.FechaModEstado,

				--Fueros
				D.Enfermedad,				D.PrePension,					D.CabezaFamilia,				D.Maternidad,					D.Convivencia,
				D.OtrosFueros,				D.DescOtrosFueros,			

	
				--Empleado
				E.CedulaEmpleado,			E.NombreEmpleado,				E.CodCargoEmpleado,				E.NombreCargoEmpelado,			E.CodEmpresaEmpleado,   
				E.NombreEmpresaEmpleado,	E.CodUnidadEmpleado,			E.NombreUnidadEmpleado,			E.CodCentroEmpleado,			E.NombreCentroEmpleado,  
				E.CodSeccionEmpleado,		E.NombreSeccionEmpleado,		E.CodDepartamentoEmpleado,		E.NombreDepartamentoEmpleado,	
	
				--Solicitante
				S.IdSolicitante,			S.CedulaSolicitante,			S.NombreSolicitante,			S.CodCargoSolicitante,			S.NombreCargoSolicitante,
				S.CodEmpresaSolicitante,	S.NombreEmpresaSolicitante,		S.CodUnidadSolicitante,			S.NombreUnidadSolicitante,		S.CodCentroSolicitante,
				S.NombreCentroSolicitante,	S.CodSeccionSolicitante,		S.NombreSeccionSolicitante,		S.CodDepartamentoSolicitante,	S.NombreDepartamentoSolicitante,
				S.Email
			FROM 
			(
				--Consulta de la informacion detallado del descargo
				SELECT	D.IdDescargo,				D.IdEstado,					E.NombreEstado,				DetalleEstado = E.Descripcion, 			
						D.FechaSolicitud,			D.DescripcionHechos,		D.CodigoFalta,				F.NombreFalta, 				
						D.CodigoSancion, 			S.NombreSancion,			D.CodSAI,					D.CartaSancionFirmada,		
						E.EstadoUsuario,			E.TipoEstado,				D.SancionDefitiva,			NombreSancionDefitiva = SA_D.NombreSancion,			
						DF.Enfermedad,				DF.PrePension, 				DF.CabezaFamilia,			DF.Maternidad,
						DF.Convivencia,				DF.OtrosFueros,				DF.DescOtrosFueros,			FechaModEstado = HS.FechaModificacion

				FROM Descargos_SolicitudDescargos D
				LEFT JOIN Descargos_FaltasComunes F ON D.CodigoFalta = F.CodigoFalta
				LEFT JOIN Descargos_Sanciones S ON S.CodigoSancion = D.CodigoSancion
				LEFT JOIN vw_Descargos_Estados E ON E.IdEstado = D.IdEstado
				LEFT JOIN Descargos_Sanciones SA_D ON SA_D.CodigoSancion = D.SancionDefitiva
				LEFT JOIN vw_Descargos_FuerosBySolicitudes DF ON DF.IdDescargo = D.IdDescargo
				LEFT JOIN vw_Descargos_HistoricoSolicitud	AS HS ON D.IdDescargo = HS.IdSolicitud AND D.IdEstado = HS.IdEstado

				WHERE UPPER(E.TipoEstado) = @TipoEstado
			) D 

			INNER JOIN 
			(
				--Consulta del solicitante que creo el descargo
				SELECT	
					S.IdSolicitante,							CedulaSolicitante=(U.UserName),						NombreSolicitante=(p.Nombres+' '+p.Apellidos),		
					CodCargoSolicitante=E.Codigo_Cargo,			NombreCargoSolicitante=c.NombreCargo,				CodEmpresaSolicitante=E.CodigoEmpresa,
					NombreEmpresaSolicitante=e.Empresa,			CodUnidadSolicitante=e.Unidad_Negocio,				NombreUnidadSolicitante=e.Nombre_Unidad_Negocio,
					CodCentroSolicitante=e.codigo_centro,		NombreCentroSolicitante=e.nombre_centro,			CodSeccionSolicitante=e.codigo_seccion,
					NombreSeccionSolicitante=e.nombre_seccion,	CodDepartamentoSolicitante=e.codigo_departamento,	NombreDepartamentoSolicitante=e.nombre_departamento,
					u.Email,									S.IdDescargo,										S.CedulaEmpleado
				FROM Descargos_Solicitudes S
				LEFT JOIN AspNetUsers U ON U.Id = S.IdSolicitante
				LEFT JOIN Profiles P ON S.IdSolicitante = P.UserId
				LEFT JOIN EmpleadosActivos E ON E.Ano_Periodo = YEAR(GETDATE()) 
											AND E.Mes_Periodo = MONTH(GETDATE()) 
											AND E.CodigoEmpleado = U.UserName
				LEFT JOIN Cargos C ON C.CodigoCargo = E.Codigo_Cargo 
										AND Obsoleto = 0 
										AND Activo = 1
			) S ON S.IdDescargo = D.IdDescargo

			LEFT JOIN 
			(
				--Consulta del empleado al cual se le aplica el descargo
				SELECT 	E.CedulaEmpleado,								E.NombreEmpleado,									CodCargoEmpleado=E.CodCargo,				
						NombreCargoEmpelado=C.NombreCargo,				CodEmpresaEmpleado=E.CodEmpresa,					NombreEmpresaEmpleado=U.NombreEmpresa, 		
						CodUnidadEmpleado=E.CodUnidadNegocio,			NombreUnidadEmpleado=U.NombreUnidadNegocio,			CodCentroEmpleado=E.CodCentro,
						NombreCentroEmpleado=U.NombreCentro,			CodSeccionEmpleado=E.CodSeccion,					NombreSeccionEmpleado=U.NombreSeccion,
						CodDepartamentoEmpleado=E.CodDepartamento,		NombreDepartamentoEmpleado=U.NombreDepartamento
				FROM Descargos_Empleado E
				LEFT JOIN vw_Descargos_UnidadNegocio U ON U.CodEmpresa = E.CodEmpresa AND U.CodCentro = E.CodCentro 
						AND U.CodSeccion = E.CodSeccion AND U.CodDepartamento = E.CodDepartamento 
						AND U.CodUnidadNegocio = E.CodUnidadNegocio
				LEFT JOIN Cargos C ON C.CodigoCargo = E.CodCargo AND Obsoleto = 0 AND Activo = 1
			) E ON E.CedulaEmpleado = S.CedulaEmpleado
		END

	ELSE IF @Usuario = 'GENERAL'
		BEGIN
			SELECT DISTINCT 
				--Descargo
				S.IdDescargo,				D.IdEstado,						D.NombreEstado,					DetalleEstado,					D.FechaSolicitud,
				D.DescripcionHechos,		D.CodigoFalta,					D.NombreFalta,					D.CodigoSancion,				D.NombreSancion,
				D.CodSAI,					D.CartaSancionFirmada,			D.SancionDefitiva,				D.NombreSancionDefitiva,		D.EstadoUsuario,
				D.FechaModEstado,

				--Fueros
				D.Enfermedad,				D.PrePension,					D.CabezaFamilia,				D.Maternidad,					D.Convivencia,
				D.OtrosFueros,				D.DescOtrosFueros,			
	
				--Empleado
				E.CedulaEmpleado,			E.NombreEmpleado,				E.CodCargoEmpleado,				E.NombreCargoEmpelado,			E.CodEmpresaEmpleado,   
				E.NombreEmpresaEmpleado,	E.CodUnidadEmpleado,			E.NombreUnidadEmpleado,			E.CodCentroEmpleado,			E.NombreCentroEmpleado,  
				E.CodSeccionEmpleado,		E.NombreSeccionEmpleado,		E.CodDepartamentoEmpleado,		E.NombreDepartamentoEmpleado,	
	
				--Solicitante
				S.IdSolicitante,			S.CedulaSolicitante,			S.NombreSolicitante,			S.CodCargoSolicitante,			S.NombreCargoSolicitante,
				S.CodEmpresaSolicitante,	S.NombreEmpresaSolicitante,		S.CodUnidadSolicitante,			S.NombreUnidadSolicitante,		S.CodCentroSolicitante,
				S.NombreCentroSolicitante,	S.CodSeccionSolicitante,		S.NombreSeccionSolicitante,		S.CodDepartamentoSolicitante,	S.NombreDepartamentoSolicitante,
				S.Email
			FROM 
			(
				--Consulta de la informacion detallado del descargo
				SELECT	D.IdDescargo,				D.IdEstado,					E.NombreEstado,				DetalleEstado = E.Descripcion, 			
						D.FechaSolicitud,			D.DescripcionHechos,		D.CodigoFalta,				F.NombreFalta, 				
						D.CodigoSancion, 			S.NombreSancion,			D.CodSAI,					D.CartaSancionFirmada,		
						E.EstadoUsuario,			E.TipoEstado,				D.SancionDefitiva,			NombreSancionDefitiva = SA_D.NombreSancion,			
						DF.Enfermedad,				DF.PrePension, 				DF.CabezaFamilia,			DF.Maternidad,
						DF.Convivencia,				DF.OtrosFueros,				DF.DescOtrosFueros,			FechaModEstado = HS.FechaModificacion

				FROM Descargos_SolicitudDescargos D
				LEFT JOIN Descargos_FaltasComunes F ON D.CodigoFalta = F.CodigoFalta
				LEFT JOIN Descargos_Sanciones S ON S.CodigoSancion = D.CodigoSancion
				LEFT JOIN vw_Descargos_Estados E ON E.IdEstado = D.IdEstado
				LEFT JOIN Descargos_Sanciones SA_D ON SA_D.CodigoSancion = D.SancionDefitiva
				LEFT JOIN vw_Descargos_FuerosBySolicitudes DF ON DF.IdDescargo = D.IdDescargo
				LEFT JOIN vw_Descargos_HistoricoSolicitud	AS HS ON D.IdDescargo = HS.IdSolicitud AND D.IdEstado = HS.IdEstado

				WHERE UPPER(E.TipoEstado) = @TipoEstado
			) D 

			INNER JOIN 
			(
				--Consulta del solicitante que creo el descargo
				SELECT	
					S.IdSolicitante,							CedulaSolicitante=(U.UserName),						NombreSolicitante=(p.Nombres+' '+p.Apellidos),		
					CodCargoSolicitante=E.Codigo_Cargo,			NombreCargoSolicitante=c.NombreCargo,				CodEmpresaSolicitante=E.CodigoEmpresa,
					NombreEmpresaSolicitante=e.Empresa,			CodUnidadSolicitante=e.Unidad_Negocio,				NombreUnidadSolicitante=e.Nombre_Unidad_Negocio,
					CodCentroSolicitante=e.codigo_centro,		NombreCentroSolicitante=e.nombre_centro,			CodSeccionSolicitante=e.codigo_seccion,
					NombreSeccionSolicitante=e.nombre_seccion,	CodDepartamentoSolicitante=e.codigo_departamento,	NombreDepartamentoSolicitante=e.nombre_departamento,
					u.Email,									S.IdDescargo,										S.CedulaEmpleado
				FROM Descargos_Solicitudes S
				LEFT JOIN AspNetUsers U ON U.Id = S.IdSolicitante
				LEFT JOIN Profiles P ON S.IdSolicitante = P.UserId
				LEFT JOIN EmpleadosActivos E ON E.Ano_Periodo = YEAR(GETDATE()) 
											AND E.Mes_Periodo = MONTH(GETDATE()) 
											AND E.CodigoEmpleado = U.UserName
				LEFT JOIN Cargos C ON C.CodigoCargo = E.Codigo_Cargo 
										AND Obsoleto = 0 
										AND Activo = 1
			) S ON S.IdDescargo = D.IdDescargo

			LEFT JOIN 
			(
				--Consulta del empleado al cual se le aplica el descargo
				SELECT 	E.CedulaEmpleado,								E.NombreEmpleado,									CodCargoEmpleado=E.CodCargo,				
						NombreCargoEmpelado=C.NombreCargo,				CodEmpresaEmpleado=E.CodEmpresa,					NombreEmpresaEmpleado=U.NombreEmpresa, 		
						CodUnidadEmpleado=E.CodUnidadNegocio,			NombreUnidadEmpleado=U.NombreUnidadNegocio,			CodCentroEmpleado=E.CodCentro,
						NombreCentroEmpleado=U.NombreCentro,			CodSeccionEmpleado=E.CodSeccion,					NombreSeccionEmpleado=U.NombreSeccion,
						CodDepartamentoEmpleado=E.CodDepartamento,		NombreDepartamentoEmpleado=U.NombreDepartamento
				FROM Descargos_Empleado E
				LEFT JOIN vw_Descargos_UnidadNegocio U ON U.CodEmpresa = E.CodEmpresa AND U.CodCentro = E.CodCentro 
						AND U.CodSeccion = E.CodSeccion AND U.CodDepartamento = E.CodDepartamento 
						AND U.CodUnidadNegocio = E.CodUnidadNegocio
				LEFT JOIN Cargos C ON C.CodigoCargo = E.CodCargo AND Obsoleto = 0 AND Activo = 1
			) E ON E.CedulaEmpleado = S.CedulaEmpleado
		END

	ELSE 
		BEGIN
			SELECT DISTINCT 
				--Descargo
				S.IdDescargo,				D.IdEstado,						D.NombreEstado,					DetalleEstado,					D.FechaSolicitud,
				D.DescripcionHechos,		D.CodigoFalta,					D.NombreFalta,					D.CodigoSancion,				D.NombreSancion,
				D.CodSAI,					D.CartaSancionFirmada,			D.SancionDefitiva,				D.NombreSancionDefitiva,		D.EstadoUsuario,
				D.FechaModEstado,

				--Fueros
				D.Enfermedad,				D.PrePension,					D.CabezaFamilia,				D.Maternidad,					D.Convivencia,
				D.OtrosFueros,				D.DescOtrosFueros,			
	
				--Empleado
				E.CedulaEmpleado,			E.NombreEmpleado,				E.CodCargoEmpleado,				E.NombreCargoEmpelado,			E.CodEmpresaEmpleado,   
				E.NombreEmpresaEmpleado,	E.CodUnidadEmpleado,			E.NombreUnidadEmpleado,			E.CodCentroEmpleado,			E.NombreCentroEmpleado,  
				E.CodSeccionEmpleado,		E.NombreSeccionEmpleado,		E.CodDepartamentoEmpleado,		E.NombreDepartamentoEmpleado,	
	
				--Solicitante
				S.IdSolicitante,			S.CedulaSolicitante,			S.NombreSolicitante,			S.CodCargoSolicitante,			S.NombreCargoSolicitante,
				S.CodEmpresaSolicitante,	S.NombreEmpresaSolicitante,		S.CodUnidadSolicitante,			S.NombreUnidadSolicitante,		S.CodCentroSolicitante,
				S.NombreCentroSolicitante,	S.CodSeccionSolicitante,		S.NombreSeccionSolicitante,		S.CodDepartamentoSolicitante,	S.NombreDepartamentoSolicitante,
				S.Email
			FROM 
			(
				--Consulta de la informacion detallado del descargo
				SELECT	D.IdDescargo,				D.IdEstado,					E.NombreEstado,				DetalleEstado = E.Descripcion, 			
						D.FechaSolicitud,			D.DescripcionHechos,		D.CodigoFalta,				F.NombreFalta, 				
						D.CodigoSancion, 			S.NombreSancion,			D.CodSAI,					D.CartaSancionFirmada,		
						E.EstadoUsuario,			E.TipoEstado,				D.SancionDefitiva,			NombreSancionDefitiva = SA_D.NombreSancion,			
						DF.Enfermedad,				DF.PrePension, 				DF.CabezaFamilia,			DF.Maternidad,
						DF.Convivencia,				DF.OtrosFueros,				DF.DescOtrosFueros,			FechaModEstado = HS.FechaModificacion

				FROM Descargos_SolicitudDescargos D
				LEFT JOIN Descargos_FaltasComunes F ON D.CodigoFalta = F.CodigoFalta
				LEFT JOIN Descargos_Sanciones S ON S.CodigoSancion = D.CodigoSancion
				LEFT JOIN vw_Descargos_Estados E ON E.IdEstado = D.IdEstado
				LEFT JOIN Descargos_Sanciones SA_D ON SA_D.CodigoSancion = D.SancionDefitiva
				LEFT JOIN vw_Descargos_FuerosBySolicitudes DF ON DF.IdDescargo = D.IdDescargo
				LEFT JOIN vw_Descargos_HistoricoSolicitud HS ON D.IdDescargo = HS.IdSolicitud AND D.IdEstado = HS.IdEstado

				WHERE UPPER(E.TipoEstado) = @TipoEstado
			) D 

			INNER JOIN 
			(
				--Consulta del solicitante que creo el descargo
				SELECT	
					S.IdSolicitante,							CedulaSolicitante=(U.UserName),						NombreSolicitante=(p.Nombres+' '+p.Apellidos),		
					CodCargoSolicitante=E.Codigo_Cargo,			NombreCargoSolicitante=c.NombreCargo,				CodEmpresaSolicitante=E.CodigoEmpresa,
					NombreEmpresaSolicitante=e.Empresa,			CodUnidadSolicitante=e.Unidad_Negocio,				NombreUnidadSolicitante=e.Nombre_Unidad_Negocio,
					CodCentroSolicitante=e.codigo_centro,		NombreCentroSolicitante=e.nombre_centro,			CodSeccionSolicitante=e.codigo_seccion,
					NombreSeccionSolicitante=e.nombre_seccion,	CodDepartamentoSolicitante=e.codigo_departamento,	NombreDepartamentoSolicitante=e.nombre_departamento,
					u.Email,									S.IdDescargo,										S.CedulaEmpleado
				FROM Descargos_Solicitudes S
				LEFT JOIN AspNetUsers U ON U.Id = S.IdSolicitante
				LEFT JOIN Profiles P ON S.IdSolicitante = P.UserId
				LEFT JOIN EmpleadosActivos E ON E.Ano_Periodo = YEAR(GETDATE()) 
											AND E.Mes_Periodo = MONTH(GETDATE()) 
											AND E.CodigoEmpleado = U.UserName
				LEFT JOIN Cargos C ON C.CodigoCargo = E.Codigo_Cargo 
										AND Obsoleto = 0 
										AND Activo = 1
			) S ON S.IdDescargo = D.IdDescargo

			LEFT JOIN 
			(
				--Consulta del empleado al cual se le aplica el descargo
				SELECT 	E.CedulaEmpleado,								E.NombreEmpleado,									CodCargoEmpleado=E.CodCargo,				
						NombreCargoEmpelado=C.NombreCargo,				CodEmpresaEmpleado=E.CodEmpresa,					NombreEmpresaEmpleado=U.NombreEmpresa, 		
						CodUnidadEmpleado=E.CodUnidadNegocio,			NombreUnidadEmpleado=U.NombreUnidadNegocio,			CodCentroEmpleado=E.CodCentro,
						NombreCentroEmpleado=U.NombreCentro,			CodSeccionEmpleado=E.CodSeccion,					NombreSeccionEmpleado=U.NombreSeccion,
						CodDepartamentoEmpleado=E.CodDepartamento,		NombreDepartamentoEmpleado=U.NombreDepartamento
				FROM Descargos_Empleado E
				LEFT JOIN vw_Descargos_UnidadNegocio U ON U.CodEmpresa = E.CodEmpresa AND U.CodCentro = E.CodCentro 
						AND U.CodSeccion = E.CodSeccion AND U.CodDepartamento = E.CodDepartamento 
						AND U.CodUnidadNegocio = E.CodUnidadNegocio
				LEFT JOIN Cargos C ON C.CodigoCargo = E.CodCargo AND Obsoleto = 0 AND Activo = 1
			) E ON E.CedulaEmpleado = S.CedulaEmpleado
		END

END

```
