# Stored Procedure: sp_Requisiciones_SolicitudesCandidatos

## Usa los objetos:
- [[Cargos]]
- [[EmpleadosActivos]]
- [[Requisiciones_Candidatos]]
- [[Requisiciones_DireccionCandidato]]
- [[Requisiciones_Estados]]
- [[Requisiciones_EstadosCandidatos]]
- [[Requisiciones_EstadosReclutador]]
- [[Requisiciones_Jefes]]
- [[Requisiciones_RelacionesPersonales]]
- [[Requisiciones_Solicitudes]]
- [[Requisiciones_SolicitudesCandidatos]]
- [[Requisiciones_SubClase]]
- [[v_Requisiciones_Candidatos_Docs]]
- [[v_Requisiciones_CiudadDepto]]
- [[v_Requisiciones_ParametrizacionTipoValor]]

```sql


CREATE PROCEDURE [dbo].[sp_Requisiciones_SolicitudesCandidatos] 
(
	@IdSolicitud INT,
	@CedulaCandidato NVARCHAR(50)
) AS
BEGIN
	--DECLARE @IdSolicitud INT, @CedulaCandidato NVARCHAR(50)
	--SET @IdSolicitud = 7201--0
	--SET @CedulaCandidato = '86060831'
	
	IF @IdSolicitud != 0
		BEGIN
			SELECT DISTINCT 
				IdSolicitud,				IdEstadoSolicitud,			EstadoSolicitud,		IdEstadoReclutador,			EstadoReclutador,
				OrdenSeleccion,				IdEstadoCandidato,			EstadoCandidato,		CodTipoIdentificacion,		TipoIdentificacion,
				Cedula,						NombreCompleto,				Nombres,				Apellido1,					Apellido2, 						
				FechaNacimiento,			Telefono,					Celular,				Correo,						Direccion,									
				CodTipoCalle,				TipoCalle,					NombreCalle,			NumCalle,					Piso,
				Bloque,						Puerta,						Complemento,			CodigoCargo,				NombreCargo,					
				CodigoUnidadNegocio,		UnidadNegocio,				CodCentro,				Centro,						CodSeccion,						
				Seccion,					ArchivoHV,					CertificadoSena,		Antecedentes,				Entrevista,						
				ReferenciasLaborales,		VisitaDomiciliaria,			ExamenMedico,			Poligrafo,					PruebasPsicotecnicas,			
				LicenciaConduccion,			PruebasConocimiento,		EntrevistaReclutador,	CC_Jefe1,					NombreJefe1,
				CC_Jefe2,					CC_Jefe3,					CC_Jefe4,				CC_Jefe5,					ObservacionesEntrevista,
				ObservacionesDevolucion,	ObservacionesCandidato,		ObservacionesRechazo,	DescripcionTrabajo,			RequisitosObligatorios,
				ObservacionesIniciales,		FamiliarActivo,				TrabajoAnteriormente,	InHouse,					InHouseProyect,
				InHouseNombreProyect,		InHouseConfir, 				CodCiudadLabor,			NombreCiudadLabor,			TipoEstadoSolicitud	
			FROM
			(
				SELECT DISTINCT 
					IdSolicitud,					IdEstadoSolicitud,				EstadoSolicitud,					OrdenSeleccion,						
					IdEstadoCandidato,				EstadoCandidato,				Cedula,								Nombres,
					Apellido1,						Apellido2,						CodTipoIdentificacion,				TipoIdentificacion,
					Telefono,						Celular,						Correo,								Direccion,
					FechaNacimiento,				ObservacionesCandidato,			CodigoCargo,						CodigoUnidadNegocio,
					CodCentro,						CodSeccion,						ArchivoHV,							CertificadoSena,
					Antecedentes,					Entrevista,						ReferenciasLaborales,				VisitaDomiciliaria,
					ExamenMedico,					Poligrafo,						PruebasPsicotecnicas,				LicenciaConduccion,
					PruebasConocimiento,			CC_Jefe1,						CC_Jefe2,							CC_Jefe3,
					CC_Jefe4,						CC_Jefe5,						ObservacionesEntrevista,			ObservacionesDevolucion,
					ObservacionesRechazo,			DescripcionTrabajo,				RequisitosObligatorios,				ObservacionesIniciales,
					IdEstadoReclutador,				EstadoReclutador,				CodTipoCalle,						TipoCalle,
					NombreCalle,					NumCalle,						Piso,								Bloque,
					Puerta,							Complemento,					InHouse,							InHouseProyect,		
					CodCiudadLabor,					NombreCiudadLabor,				InHouseNombreProyect,				InHouseConfir,
					TipoEstadoSolicitud,			EntrevistaReclutador,
					UnidadNegocio=LTRIM(RTRIM(REPLACE(REPLACE(REPLACE(UnidadNegocio,' ','<>'),'><',''),'<>',' '))),	
					NombreCargo=REPLACE(REPLACE(REPLACE(NombreCargo,' ','<>'),'><',''),'<>',' '),
					NombreCompleto=LTRIM(RTRIM(UPPER(REPLACE(REPLACE(REPLACE(NombreCompleto,' ','<>'),'><',''),'<>',' ')))),
					Centro=REPLACE(REPLACE(REPLACE(Centro,' ','<>'),'><',''),'<>',' '),
					Seccion=REPLACE(REPLACE(REPLACE(Seccion,' ','<>'),'><',''),'<>',' '),
					NombreJefe1=UPPER(REPLACE(REPLACE(REPLACE(NombreJefe1,' ','<>'),'><',''),'<>',' ')),
					FamiliarActivo=CASE WHEN Familiar_Activos = 1 THEN 'SI' ELSE 'NO' END,
					TrabajoAnteriormente=CASE WHEN TrabajoAnteriormente = 1 THEN 'SI' ELSE 'NO' END 

				FROM 
				(
					SELECT DISTINCT 
						IdSolicitud=S.Numero_solicitud,			IdEstadoSolicitud=S.Estado,					EstadoSolicitud=S.DetalleEstado,
						R.OrdenSeleccion,						R.IdEstadoCandidato,						E.EstadoCandidato,
						C.Cedula,								C.Nombres,									C.Apellido1,							
						C.Apellido2,							C.NombreCompleto,							C.CodTipoIdentificacion,
						C.TipoIdentificacion,					C.Telefono,									C.Celular,
						C.Correo,								c.FechaNacimiento,							C.ObservacionesCandidato,
						C.ArchivoHV,							C.CertificadoSena,							C.Antecedentes,
						C.Entrevista,							C.ReferenciasLaborales,						C.VisitaDomiciliaria,
						C.ExamenMedico,							C.Poligrafo,								C.PruebasPsicotecnicas,
						C.LicenciaConduccion,					S.CodigoCargo,								S.NombreCargo,
						C.PruebasConocimiento,					J.CC_Jefe1,									NombreJefe1=EM.NombreJefe,
						J.CC_Jefe2,								J.CC_Jefe3,									J.CC_Jefe4,
						J.CC_Jefe5,								C.ObservacionesEntrevista,					C.ObservacionesDevolucion,
						C.ObservacionesRechazo,					s.DescripcionTrabajo,						RequisitosObligatorios=s.Requisitos,		
						s.CodigoUnidadNegocio,					s.UnidadNegocio,							ObservacionesIniciales=s.Observaciones,
						s.CodCentro,							s.Centro,									s.CodSeccion,
						s.Seccion,								RP.Familiar_Activos,						RP.TrabajoAnteriormente,
						R.IdEstadoReclutador,					(ER.Estado)EstadoReclutador,				DIR.CodTipoCalle,
						(SC.SubClase)TipoCalle,					DIR.NombreCalle,							DIR.NumCalle,
						DIR.Piso,								DIR.Bloque,									DIR.Puerta,
						DIR.Complemento,						S.InHouse,									S.InHouseProyect,		
						S.CodCiudadLabor,						S.NombreCiudadLabor,						S.InHouseNombreProyect,
						TipoEstadoSolicitud,					C.EntrevistaReclutador,
						InHouseConfir = CASE WHEN InHouse = 1 THEN 'Si' ELSE 'No' END,

						Direccion = CASE WHEN DIR.DireccionCompleta IS NOT NULL OR LTRIM(RTRIM(DIR.DireccionCompleta)) <> '' 
											THEN DIR.DireccionCompleta ELSE C.Direccion END
					FROM		
					(
						SELECT DISTINCT		
							Numero_solicitud,		Estado,					DetalleEstado,		CodigoCargo,		NombreCargo,		CodigoUnidadNegocio,
							UnidadNegocio,			CodCentro,				Centro,				CodSeccion,			Seccion,			DescripcionTrabajo,
							Requisitos,				Observaciones,			InHouse,			InHouseProyect,		CodCiudadLabor,		NombreCiudadLabor,
							InHouseNombreProyect,	TipoEstadoSolicitud
						FROM 
						(
							SELECT DISTINCT 
								Numero_solicitud=S.idsolicitud,					Estado=S.idEstado,						DetalleEstado=E.Estado,		
								S.CodigoCargo,									C.NombreCargo,							S.CodigoUnidadNegocio,		
								S.UnidadNegocio,								S.CodCentro,							S.Centro,
								S.CodSeccion,									s.Seccion,								S.DescripcionTrabajo,
								S.Requisitos,									Observaciones,							S.CodCiudadLabor,
								NombreCiudadLabor=Ciudad.NombreCiudad,			S.InHouse,								S.InHouseProyect,
								InHouseNombreProyect = TV.Nombre,				TipoEstadoSolicitud=E.TipoProceso
								
							FROM		Requisiciones_Solicitudes	AS S	
							LEFT JOIN   Requisiciones_Estados		AS E	  ON s.IdEstado = e.IdEstado	
							LEFT JOIN   Cargos						AS C	  ON c.CodigoCargo = s.CodigoCargo	
							LEFT JOIN	v_Requisiciones_CiudadDepto AS Ciudad ON Ciudad.CodigoCiudad = s.CodCiudadLabor AND Ciudad.CodigoPais = '057'
							LEFT JOIN	v_Requisiciones_ParametrizacionTipoValor AS TV ON TV.Id = S.InHouseProyect AND TV.Tipo = 'InHouse'
							WHERE (S.IdSolicitud = @IdSolicitud) 					
						) AS A
					)	AS S

					INNER JOIN	Requisiciones_SolicitudesCandidatos			AS R ON r.IdSolicitud = s.Numero_solicitud

					INNER JOIN	Requisiciones_EstadosCandidatos				AS E ON r.IdEstadoCandidato = e.IdEstadoCandidato

					LEFT JOIN	Requisiciones_EstadosReclutador				AS ER ON R.IdEstadoReclutador = ER.IdEstado

					INNER JOIN	v_Requisiciones_Candidatos_Docs				AS C ON R.Cedula = C.Cedula AND R.IdSolicitud = C.IdSolicitud
	
					LEFT JOIN Requisiciones_Jefes AS J ON s.Numero_solicitud = J.IdSolicitud 

					LEFT JOIN	
					(
						SELECT DISTINCT CodigoEmpleado, NombreJefe = Nombres+' '+Apellido1+' '+Apellido2
						FROM EmpleadosActivos
						WHERE Ano_Periodo = YEAR(GETDATE()) AND Mes_Periodo = MONTH(GETDATE())
					) AS EM ON J.CC_Jefe1 = EM.CodigoEmpleado

					LEFT JOIN Requisiciones_RelacionesPersonales AS RP ON R.Cedula = RP.CedulaCandidato AND S.Numero_solicitud = RP.IdSolicitud

					LEFT JOIN Requisiciones_DireccionCandidato DIR ON R.Cedula = DIR.Cedula

					LEFT JOIN Requisiciones_SubClase SC ON SC.CodClase = 21 AND SC.CodSubClase = DIR.CodTipoCalle
				) A
			)A
		END

	ELSE
		BEGIN
			SELECT DISTINCT 
				IdSolicitud,				IdEstadoSolicitud,			EstadoSolicitud,		IdEstadoReclutador,			EstadoReclutador,
				OrdenSeleccion,				IdEstadoCandidato,			EstadoCandidato,		CodTipoIdentificacion,		TipoIdentificacion,
				Cedula,						NombreCompleto,				Nombres,				Apellido1,					Apellido2, 						
				FechaNacimiento,			Telefono,					Celular,				Correo,						Direccion,									
				CodTipoCalle,				TipoCalle,					NombreCalle,			NumCalle,					Piso,
				Bloque,						Puerta,						Complemento,			CodigoCargo,				NombreCargo,					
				CodigoUnidadNegocio,		UnidadNegocio,				CodCentro,				Centro,						CodSeccion,						
				Seccion,					ArchivoHV,					CertificadoSena,		Antecedentes,				Entrevista,						
				ReferenciasLaborales,		VisitaDomiciliaria,			ExamenMedico,			Poligrafo,					PruebasPsicotecnicas,			
				LicenciaConduccion,			PruebasConocimiento,		EntrevistaReclutador,	CC_Jefe1,					NombreJefe1,
				CC_Jefe2,					CC_Jefe3,					CC_Jefe4,				CC_Jefe5,					ObservacionesEntrevista,
				ObservacionesDevolucion,	ObservacionesCandidato,		ObservacionesRechazo,	DescripcionTrabajo,			RequisitosObligatorios,	
				ObservacionesIniciales,		FamiliarActivo,				TrabajoAnteriormente,	InHouse,					InHouseProyect,
				InHouseNombreProyect,		InHouseConfir, 				CodCiudadLabor,			NombreCiudadLabor,			TipoEstadoSolicitud
			FROM
			(
				SELECT DISTINCT
					C.IdSolicitud,					IdEstadoSolicitud=S.IdEstado,		EstadoSolicitud=ES.Estado,			C.OrdenSeleccion,
					C.IdEstadoCandidato,			EC.EstadoCandidato,					C.Cedula,							Docs.Nombres,
					Docs.Apellido1,					Docs.Apellido2,						CD.Complemento,						Docs.CodTipoIdentificacion,
					Docs.TipoIdentificacion,		Docs.Telefono,						Docs.Celular,						Docs.Correo,
					Docs.FechaNacimiento,			Docs.ObservacionesCandidato,		Docs.ArchivoHV,						Docs.CertificadoSena,
					Docs.Antecedentes,				Docs.Entrevista,					Docs.ReferenciasLaborales,			Docs.VisitaDomiciliaria,
					Docs.ExamenMedico,				Docs.Poligrafo,						Docs.PruebasPsicotecnicas,			Docs.LicenciaConduccion,
					Docs.PruebasConocimiento,		Docs.EntrevistaReclutador,			Docs.ObservacionesEntrevista,		Docs.ObservacionesDevolucion,
					Docs.ObservacionesRechazo,
					S.CodigoCargo,					J.CC_Jefe1,							J.CC_Jefe2,							J.CC_Jefe3,
					J.CC_Jefe4,						J.CC_Jefe5,							S.DescripcionTrabajo,				RequisitosObligatorios=S.Requisitos,
					S.CodigoUnidadNegocio,			S.CodCentro,						S.CodSeccion,						ObservacionesIniciales=S.Observaciones,
					C.IdEstadoReclutador,			EstadoReclutador=ER.Estado,			CD.CodTipoCalle,					TipoCalle=SubC.SubClase,
					CD.NombreCalle,					CD.NumCalle,						CD.Piso,							CD.Bloque,
					CD.Puerta,						S.InHouse,							S.InHouseProyect,					InHouseNombreProyect = TV.Nombre,
					S.CodCiudadLabor,				
					NombreCiudadLabor=Ciudad.NombreCiudad,								TipoEstadoSolicitud=ES.TipoProceso,
					InHouseConfir = CASE WHEN InHouse = 1 THEN 'Si' ELSE 'No' END,
					Direccion = CASE WHEN CD.DireccionCompleta IS NOT NULL OR LTRIM(RTRIM(CD.DireccionCompleta)) <> '' 
									THEN CD.DireccionCompleta ELSE Docs.Direccion END,
					UnidadNegocio=LTRIM(RTRIM(REPLACE(REPLACE(REPLACE(S.UnidadNegocio,' ','<>'),'><',''),'<>',' '))),	
					NombreCargo=REPLACE(REPLACE(REPLACE(Cargo.NombreCargo,' ','<>'),'><',''),'<>',' '),
					NombreCompleto=LTRIM(RTRIM(UPPER(REPLACE(REPLACE(REPLACE(Docs.NombreCompleto,' ','<>'),'><',''),'<>',' ')))),
					Centro=REPLACE(REPLACE(REPLACE(S.Centro,' ','<>'),'><',''),'<>',' '),
					Seccion=REPLACE(REPLACE(REPLACE(S.Seccion,' ','<>'),'><',''),'<>',' '),
					NombreJefe1=UPPER(REPLACE(REPLACE(REPLACE(EM.NombreJefe,' ','<>'),'><',''),'<>',' ')),
					FamiliarActivo=CASE WHEN RP.Familiar_Activos = 1 THEN 'SI' ELSE 'NO' END,
					TrabajoAnteriormente=CASE WHEN RP.TrabajoAnteriormente = 1 THEN 'SI' ELSE 'NO' END
				FROM 
				(
					SELECT	C.Cedula, MAX(SC.IdEstadoCandidato)IdEstadoCandidato, MAX(SC.IdSolicitud)IdSolicitud, 
						MAX(SC.OrdenSeleccion)OrdenSeleccion, MAX(SC.IdEstadoReclutador)IdEstadoReclutador
					FROM Requisiciones_Candidatos C
					LEFT JOIN Requisiciones_SolicitudesCandidatos SC ON SC.Cedula = C.Cedula
					WHERE C.Cedula = @CedulaCandidato
					GROUP BY C.Cedula
				) C

				INNER JOIN Requisiciones_Solicitudes AS S ON S.IdSolicitud = C.IdSolicitud

				LEFT JOIN  v_Requisiciones_ParametrizacionTipoValor AS TV ON TV.Id = S.InHouseProyect AND TV.Tipo = 'InHouse'

				LEFT JOIN  v_Requisiciones_CiudadDepto AS Ciudad ON Ciudad.CodigoCiudad = s.CodCiudadLabor AND Ciudad.CodigoPais = '057'
				
				INNER JOIN v_Requisiciones_Candidatos_Docs AS Docs ON C.Cedula = Docs.Cedula AND Docs.IdSolicitud = C.IdSolicitud

				INNER JOIN Requisiciones_Estados ES ON ES.IdEstado = S.IdEstado

				INNER JOIN Requisiciones_EstadosCandidatos AS EC ON C.IdEstadoCandidato = EC.IdEstadoCandidato

				LEFT JOIN  Cargos AS Cargo ON Cargo.CodigoCargo = S.CodigoCargo	

				LEFT JOIN  Requisiciones_DireccionCandidato CD ON CD.Cedula = C.Cedula

				LEFT JOIN  Requisiciones_SubClase SubC ON SubC.CodClase = 21 AND SubC.CodSubClase = CD.CodTipoCalle

				LEFT JOIN  Requisiciones_RelacionesPersonales AS RP ON C.Cedula = RP.CedulaCandidato AND C.IdSolicitud = RP.IdSolicitud

				LEFT JOIN  Requisiciones_EstadosReclutador AS ER ON C.IdEstadoReclutador = ER.IdEstado

				LEFT JOIN  Requisiciones_Jefes AS J ON C.IdSolicitud = J.IdSolicitud 

				LEFT JOIN	
				(
					SELECT DISTINCT CodigoEmpleado, NombreJefe = Nombres+' '+Apellido1+' '+Apellido2
					FROM EmpleadosActivos
					WHERE Ano_Periodo = YEAR(GETDATE()) AND Mes_Periodo = MONTH(GETDATE())
				) AS EM ON J.CC_Jefe1 = EM.CodigoEmpleado
			) B
		END
END

```
