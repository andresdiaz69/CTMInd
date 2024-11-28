# Stored Procedure: sp_Requisiciones_SolicitudByCod

## Usa los objetos:
- [[Cargos]]
- [[EmpleadosActivos]]
- [[Profiles]]
- [[Requisiciones_Cargos]]
- [[Requisiciones_EmpleadosReemplazados]]
- [[Requisiciones_Estados]]
- [[Requisiciones_EstadosNomina]]
- [[Requisiciones_EstadosReclutador]]
- [[Requisiciones_Jefes]]
- [[Requisiciones_RazonesCancelacion]]
- [[Requisiciones_Solicitudes]]
- [[Requisiciones_SolicitudesCandidatos]]
- [[Requisiciones_SolicitudesEsquema]]
- [[Requisiciones_SolicitudProveedor]]
- [[rhh_tbcalend]]
- [[v_Requisiciones_CiudadDepto]]
- [[v_Requisiciones_Observaciones_Nomina]]
- [[v_Requisiciones_Observaciones_Solicitud]]
- [[v_Requisiciones_ParametrizacionTipoValor]]

```sql
CREATE PROCEDURE [dbo].[sp_Requisiciones_SolicitudByCod]
(
	@IdSolicitud INT 
) AS 

BEGIN
	
	SET NOCOUNT ON
	SET FMTONLY OFF

	--DECLARE @IdSolicitud INT 
	--SET @IdSolicitud = 8500
	
	SELECT	DISTINCT IdSolicitud,				IdEstadoSolicitud,					EstadoSolicitud,					TipoSolicitud,			
		NitProveedor,							FechaAutorizacionGteLinea,			FechaSolicitud,						CodigoCargo,					
		NombreCargo,							CargoCritico,						Salario,							IdSolicitante,					
		Solicitante,							CodEmpresa,							Empresa,							CodMarca,								
		Marca,									CodCentro,							Centro,								CodigoUnidadNegocio,
		UnidadNegocio,							CodSeccion,							Seccion,							CodDepartamento,		
		Departamento,							CodSede,							Sede,								Unica,							
		Observaciones,							IdEstadoReclutador,					EstadoReclutador,					IdEstadoNomina,					
		EstadoNomina,							FechaInicioContrato,				FechaCitacionFirmaContrato,			FechaCitacionFirmaContratoAplazada,		
		CodigoContrato,							NombreContrato,						DuracionContratoMeses,				BonoAlimentacion,
		BonoCelular,							BonoGasolina,						AuxMovilizacion,					SalarioGarantizado,		
		FinSalario,								DescripcionTrabajo,					Requisitos,							PrimerEsquema,					
		SegundoEsquema,							TercerEsquema,						CuartoEsquema,						QuintoEsquema,					
		SextoEsquema,							ObservacionesGteUSC,				ObservacionesGteLinea,				ObservacionesCancelacionSolicitud,		
		CandidatoNoFirmaContrato,				CandidatoDevueltoSeleccion,			CandidatoAplazaFirmaContrato,		JefeAplazaFirmaContrato,
		Candidatos_PendienteEntrevista,			Candidatos_Entrevistado,			Candidatos_Potencial,				Candidatos_Seleccionado,
		Candidatos_Rechazados,					Candidatos_Preseleccionado,			Candidatos_DevueltoSeleccion,		Candidatos_Contratados,
		CancelacionInactividad,					HorarioDiurno,						Horario,							EstadoGeneral,					
		DescEstadoGeneral,						IdRazonCancelacion,					NombreRazonCancelacion,				CC_Jefe1,
		NombreJefe,								CodCiudadLabor,						NombreCiudadLabor,					InHouse,
		InHouseProyect,							InHouseNombreProyect,				InHouseConfir,						NuevoSalario,
		CedulaReemplazo,						NombreReemplazo,
		TiempoTranscurrido = CASE WHEN CONVERT(DATE,FechaSolicitud) = CONVERT(DATE,GETDATE()) THEN 0
			WHEN (TiempoTranscurrido - 1) < 0 THEN 0
			ELSE (TiempoTranscurrido - 1) END
	FROM 
	(
		SELECT	DISTINCT					IdSolicitud,				IdEstadoSolicitud,				EstadoSolicitud,				TipoSolicitud,			
				NitProveedor,				Observaciones,				CodEmpresa,						Empresa,						CodMarca,								
				Marca,						CodCentro,					Centro,							CodigoUnidadNegocio,			UnidadNegocio,						
				CodSeccion,					Seccion,					CodDepartamento,				Departamento,					CodSede,		
				Sede,						Salario,					Unica,							FechaSolicitud,					FechaInicioContrato,		
				CodigoContrato,				NombreContrato,				DuracionContratoMeses,			BonoAlimentacion,				BonoCelular,		
				BonoGasolina,				AuxMovilizacion,			SalarioGarantizado,				FinSalario,						DescripcionTrabajo,		
				Requisitos,					HorarioDiurno,				PrimerEsquema,					SegundoEsquema,					TercerEsquema,						
				CuartoEsquema,				QuintoEsquema,				SextoEsquema,					CodigoCargo,					NombreCargo,							
				CargoCritico,				IdSolicitante,				Solicitante,					IdEstadoNomina,					EstadoNomina,		
				IdEstadoReclutador,			EstadoReclutador,			IdRazonCancelacion,				NombreRazonCancelacion,			FechaCitacionFirmaContrato,		
				EstadoGeneral,				DescEstadoGeneral,			FechaAutorizacionGteLinea,		ObservacionesGteLinea,			CC_Jefe1,
				NombreJefe,					InHouse,					InHouseProyect,					CodCiudadLabor,					NombreCiudadLabor, 
				InHouseNombreProyect,		NuevoSalario,				CedulaReemplazo,				NombreReemplazo,
		
				FechaCitacionFirmaContratoAplazada,			ObservacionesGteUSC,				CancelacionInactividad,				ObservacionesCancelacionSolicitud,
				CandidatoNoFirmaContrato,					CandidatoDevueltoSeleccion,			CandidatoAplazaFirmaContrato,		JefeAplazaFirmaContrato,		
				Candidatos_PendienteEntrevista,				Candidatos_Entrevistado, 			Candidatos_Potencial,				Candidatos_Seleccionado,					
				Candidatos_Rechazados,						Candidatos_Preseleccionado,			Candidatos_DevueltoSeleccion,		Candidatos_Contratados,

				InHouseConfir = CASE WHEN InHouse = 1 THEN 'Si' ELSE 'No' END,
				Horario = CASE WHEN HorarioDiurno = 1 THEN 'Diurno' ELSE 'Nocturno' END,

				TiempoTranscurrido =
				(SELECT  SUM(CASE WHEN F.DiaSemana BETWEEN 1 AND 5 THEN F.Cant ELSE 0 END) - 
						(SELECT COUNT(dia_fes) FROM [Novasoft_CT_MM].[dbo].[rhh_tbcalend] where dia_fes >= FechaAutorizacionGteLinea and dia_fes <= GETDATE()) AS 'TiempoTranscurrido'
							FROM  (
								SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, GETDATE())/7-DATEDIFF(DAY, -6, FechaAutorizacionGteLinea)/7 AS Cant UNION
								SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, GETDATE())/7-DATEDIFF(DAY, -5, FechaAutorizacionGteLinea)/7 AS Cant UNION
								SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, GETDATE())/7-DATEDIFF(DAY, -4, FechaAutorizacionGteLinea)/7 AS Cant UNION
								SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, GETDATE())/7-DATEDIFF(DAY, -3, FechaAutorizacionGteLinea)/7 AS Cant UNION
								SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, GETDATE())/7-DATEDIFF(DAY, -2, FechaAutorizacionGteLinea)/7 AS Cant UNION
								SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, GETDATE())/7-DATEDIFF(DAY, -1, FechaAutorizacionGteLinea)/7 AS Cant UNION
								SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, GETDATE())/7-DATEDIFF(DAY,  0, FechaAutorizacionGteLinea)/7 AS Cant	
							) F
						)
		FROM (
			SELECT DISTINCT					S.IdSolicitud,						IdEstadoSolicitud=S.IdEstado,		EstadoSolicitud=E.Estado,
				S.TipoSolicitud,			S.Observaciones,					S.CodEmpresa,						NitProveedor=ISNULL(SP.Nit, 0),
				S.Empresa,					S.CodMarca,							S.Marca,							S.CodCentro,
				S.Centro,					S.CodigoUnidadNegocio,				S.UnidadNegocio,					S.CodSeccion,
				S.Seccion,					S.CodDepartamento,					S.Departamento,						S.CodSede,
				S.Sede,						S.Salario,							S.Unica,							FechaSolicitud=CONVERT(date,S.FechaCreacion),
				S.FechaInicioContrato,		S.FechaCitacionFirmaContrato,		CodigoContrato=S.tip_con,			S.FechaCitacionFirmaContratoAplazada,	
				NombreContrato=S.nom_con,	S.DuracionContratoMeses,			S.BonoAlimentacion,					S.BonoCelular,		
				S.BonoGasolina,				S.AuxMovilizacion,					S.SalarioGarantizado,				S.FinSalario,
				S.DescripcionTrabajo,		S.Requisitos,						S.HorarioDiurno,					Esq.PrimerEsquema,
				Esq.SegundoEsquema,			Esq.TercerEsquema,					Esq.CuartoEsquema,					Esq.QuintoEsquema,
				Esq.SextoEsquema,			S.CodigoCargo,						C.NombreCargo,						ISNULL(CC.Critico,0)CargoCritico,
				IdSolicitante=P.UserId,		S.IdEstadoNomina,					N.EstadoNomina,						Solicitante=CONCAT(P.Nombres,' ',P.Apellidos),
				S.IdEstadoReclutador,		EstadoReclutador=ER.Estado,			RC.IdRazonCancelacion,				RC.NombreRazonCancelacion,
				J.CC_Jefe1,					EM.NombreJefe,						S.NuevoSalario,						S.InHouse,
				S.InHouseProyect,			S.CodCiudadLabor,					Reemplazo.CedulaReemplazo,			Reemplazo.NombreReemplazo,
				

				NombreCiudadLabor = Ciudad.NombreCiudad,								InHouseNombreProyect = TV.Nombre,

				ObservacionesGteUSC=Obs_S.Observaciones_NuevoSalarioAceptado,			CancelacionInactividad=Obs_S.Observaciones_FinalizadaFaltaRespuesta,		
				ObservacionesCancelacionSolicitud=Obs_S.Observaciones_Cancelada,		CandidatoNoFirmaContrato=Obs_N.Observaciones_CandidatoNoFirmaContrato,	
				CandidatoDevueltoSeleccion=Obs_N.Observaciones_DevueltoSeleccion,		CandidatoAplazaFirmaContrato=Obs_N.Observaciones_CandidatoAplazaFirma,
				JefeAplazaFirmaContrato=Obs_N.Observaciones_JefeAplazaFirma,		
				
				Con_can.Candidatos_PendienteEntrevista,				Con_can.Candidatos_Entrevistado,					Con_can.Candidatos_Potencial,
				Con_can.Candidatos_Seleccionado,					Con_can.Candidatos_Rechazados,						Con_can.Candidatos_Preseleccionado,
				Con_can.Candidatos_DevueltoSeleccion,				Con_can.Candidatos_Contratados,

				FechaAutorizacionGteLinea = CASE WHEN Obs_S.Estado_PendienteAsociarProveedor IS NOT NULL THEN Obs_S.Fecha_PendienteAsociarProveedor
													ELSE Obs_S.Fecha_BusquedaCandidatos END,

				ObservacionesGteLinea = CASE WHEN Obs_S.Estado_PendienteAsociarProveedor IS NOT NULL THEN Obs_S.Observaciones_PendienteAsociarProveedor
												ELSE Obs_S.Observaciones_BusquedaCandidatos END,

				EstadoGeneral = CASE WHEN s.IdEstado = 2 AND s.IdEstadoReclutador IN (1,2,3,4,5,6) THEN er.Estado
									WHEN s.IdEstado = 3 AND s.IdEstadoNomina IN (5,6,8,9) THEN n.EstadoNomina
									ELSE e.Estado END,

				DescEstadoGeneral = CASE WHEN s.IdEstado = 2 AND s.IdEstadoReclutador IN (1,2,3,4,5,6) THEN er.Descripcion
										WHEN s.IdEstado = 3 AND s.IdEstadoNomina IN (5,6,8,9) THEN n.Descripcion
										ELSE e.Descripcion END
		
			FROM (
				SELECT * FROM Requisiciones_Solicitudes 
				WHERE IdSolicitud = @IdSolicitud
			) AS S

			LEFT JOIN	Requisiciones_EmpleadosReemplazados AS Reemplazo ON Reemplazo.IdSolicitud = S.IdSolicitud

			LEFT JOIN	v_Requisiciones_ParametrizacionTipoValor AS TV ON TV.Id = S.InHouseProyect AND TV.Tipo = 'InHouse'

			LEFT JOIN	v_Requisiciones_CiudadDepto AS Ciudad ON Ciudad.CodigoCiudad = s.CodCiudadLabor AND Ciudad.CodigoPais = '057'

			--Estados de la Solicitud
			LEFT JOIN   Requisiciones_Estados AS E ON S.IdEstado = E.IdEstado

			--Razones de cancelación
			LEFT JOIN	Requisiciones_RazonesCancelacion AS RC ON RC.IdRazonCancelacion = S.RazonCancelacion

			--Estados reclutador
			LEFT JOIN   Requisiciones_EstadosReclutador AS er ON s.IdEstadoReclutador = er.IdEstado

			--Cargos
			LEFT JOIN   Cargos AS c ON  c.CodigoCargo = s.CodigoCargo

			--Cargos Criticos
			LEFT JOIN   Requisiciones_Cargos AS CC ON  cc.CodigoCargo = s.CodigoCargo and s.CodigoUnidadNegocio = CC.CodigoMarca

			--Usuarios
			LEFT JOIN   Profiles AS p ON s.UserIdCreo = p.UserId

			--Estados nómina
			LEFT JOIN	Requisiciones_EstadosNomina AS n ON s.IdEstadoNomina = n.IdEstadoNomina

			--Proveedor
			LEFT JOIN (
				SELECT * FROM Requisiciones_SolicitudProveedor 
				WHERE Nit <> 0 AND Solicitud = @IdSolicitud
			) AS SP ON S.IdSolicitud = SP.Solicitud
			
			--Jefes
			LEFT JOIN Requisiciones_Jefes AS J ON S.IdSolicitud = J.IdSolicitud 
			LEFT JOIN	
			(
				SELECT DISTINCT CodigoEmpleado, NombreJefe = Nombres+' '+Apellido1+' '+Apellido2
				FROM EmpleadosActivos
				WHERE Ano_Periodo = YEAR(GETDATE()) AND Mes_Periodo = MONTH(GETDATE())
			) AS EM ON J.CC_Jefe1 = EM.CodigoEmpleado

			--Esquemas variables
			LEFT JOIN (
				SELECT IdSolicitud,							
					PrimerEsquema = MAX(PrimerEsquema),			SegundoEsquema = MAX(SegundoEsquema),		TercerEsquema = MAX(TercerEsquema),		
					CuartoEsquema = MAX(CuartoEsquema),			QuintoEsquema = MAX(QuintoEsquema),			SextoEsquema = MAX(SextoEsquema)
				FROM (
					SELECT DISTINCT IdSolicitud, 
						CASE WHEN NumeroEsquema = 1 THEN Esquema ELSE NULL END PrimerEsquema,
						CASE WHEN NumeroEsquema = 2 THEN Esquema ELSE NULL END SegundoEsquema,
						CASE WHEN NumeroEsquema = 3 THEN Esquema ELSE NULL END TercerEsquema,
						CASE WHEN NumeroEsquema = 4 THEN Esquema ELSE NULL END CuartoEsquema,
						CASE WHEN NumeroEsquema = 5 THEN Esquema ELSE NULL END QuintoEsquema,
						CASE WHEN NumeroEsquema = 6 THEN Esquema ELSE NULL END SextoEsquema
					FROM Requisiciones_SolicitudesEsquema
					WHERE IdSolicitud = @IdSolicitud
				) A
				GROUP BY IdSolicitud
			) Esq ON s.IdSolicitud = Esq.IdSolicitud

			--Observaciones Solicitud 
			LEFT JOIN v_Requisiciones_Observaciones_Solicitud AS Obs_S ON Obs_S.IdSolicitud = S.IdSolicitud

			--Observaciones Nomina 
			LEFT JOIN v_Requisiciones_Observaciones_Nomina AS Obs_N ON Obs_N.IdSolicitud = S.IdSolicitud
		

			----Cantidad de Candidatos anexados en la solicitud
			LEFT JOIN (
				SELECT IdSolicitud, 
					SUM(Candidatos_PendienteEntrevista)Candidatos_PendienteEntrevista,		SUM(Candidatos_Entrevistado)Candidatos_Entrevistado,
					SUM(Candidatos_Potencial)Candidatos_Potencial,							SUM(Candidatos_Seleccionado)Candidatos_Seleccionado,
					SUM(Candidatos_Rechazados)Candidatos_Rechazados,						SUM(Candidatos_Preseleccionado)Candidatos_Preseleccionado,
					SUM(Candidatos_DevueltoSeleccion)Candidatos_DevueltoSeleccion,			SUM(Candidatos_Contratados)Candidatos_Contratados
				FROM (
					SELECT IdSolicitud, 
						CASE WHEN IdEstadoCandidato = 1 THEN 1 ELSE 0 END Candidatos_PendienteEntrevista,
						CASE WHEN IdEstadoCandidato = 2 THEN 1 ELSE 0 END Candidatos_Entrevistado,
						CASE WHEN IdEstadoCandidato = 3 THEN 1 ELSE 0 END Candidatos_Potencial,
						CASE WHEN IdEstadoCandidato = 4 THEN 1 ELSE 0 END Candidatos_Seleccionado,
						CASE WHEN IdEstadoCandidato = 5 THEN 1 ELSE 0 END Candidatos_Rechazados,
						CASE WHEN IdEstadoCandidato = 6 THEN 1 ELSE 0 END Candidatos_Preseleccionado,
						CASE WHEN IdEstadoCandidato = 7 THEN 1 ELSE 0 END Candidatos_DevueltoSeleccion,
						CASE WHEN IdEstadoCandidato = 8 THEN 1 ELSE 0 END Candidatos_Contratados	
					FROM Requisiciones_SolicitudesCandidatos
					WHERE IdSolicitud = @IdSolicitud
				) A
				GROUP BY IdSolicitud
			) Con_can ON S.IdSolicitud = Con_can.IdSolicitud

		)A
	)A
END 

```
