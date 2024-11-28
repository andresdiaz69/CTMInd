# Stored Procedure: sp_Requisiciones_LeadTime

## Usa los objetos:
- [[AspNetUsers]]
- [[Cargos]]
- [[Empresas]]
- [[Requisiciones_Estados]]
- [[Requisiciones_EstadosReclutador]]
- [[Requisiciones_HistoricoReclutador]]
- [[Requisiciones_HistoricoSolicitud]]
- [[Requisiciones_Reclutadores_Usuarios]]
- [[Requisiciones_Solicitudes]]
- [[Requisiciones_SolicitudProveedor]]
- [[UnidadDeNegocio]]
- [[vw_DiasFestivos]]

```sql



-- ==================================================
-- Control de Cambios
-- 2024|08|15 - ALEXIS - Ajuste de la consulta diviendo el proceso por fechas y ajustando los tiempos de cada fecha.
-- ==================================================
CREATE PROCEDURE [dbo].[sp_Requisiciones_LeadTime] 
(
	@AnoPeriodo int,
	@MesInicial int,
	@MesFinal int
	--@FechaDesde date,
	--@fechaHasta date
) AS

--set @FechaDesde = N'20200701'
--set @FechaHasta = N'20200930'
--declare @AnoPeriodo int, @MesInicial int, @MesFinal int
--set @AnoPeriodo = 2021
--set @MesInicial = 4
--set @MesFinal = 4

BEGIN

	SELECT Año,												Mes,											IdSolicitud,
		IdEstado,											Estado,											CodigoCargo,
		NombreCargo,										CodEmpresa,										Empresa,
		CodigoUnidadNegocio,								UnidadNegocio,									CodCentro,
		Centro,												CodSeccion,										Seccion,
		CodDepartamento,									Departamento,									FechaSolicitud,
		FechaAceptadoCByN,									DiasAceptadoCByN,								FechaAutorizacionSalario,
		DiasAutorizacionSalario,							FechaAceptadoGerente,							DiasAutorizacionGerente,
		FechaProveedorAsociado,								DiasProveedorAsociado,							FechaInicioBusqueda,
		DiasInicioBusqueda,									FechaReclutadorPendienteEntrevista,				DiasReclutadorPendienteEntrevista,
		FechaReclutadorPendientePreseleccionar,				DiasReclutadorPendientePreseleccionar,			FechaReclutadorProcesoEvaluacion,
		DiasReclutadorProcesoEvaluacion,					FechaReclutadorExamenMedico,					DiasReclutadorExamenMedico,
		FechaReclutadorEstudioSeguridad,					DiasReclutadorEstudioSeguridad,					FechaReclutadorPoligrafo,
		DiasReclutadorPoligrafo,							FechaCandidatoSeleccionado,						DiasCandidatoseleccionado,
		FechaCandidatoDevueltoASeleccion,					DiasCandidatoDevueltoASeleccion,				FechaCandidatoSeleccionadoProcesoDevuelto,
		DiasCandidatoSeleccionadoProcesoDevuelto,			FechaCandidatoContratado,						DiasCandidatoContratado,
		FechaSolicitudRechazada,							DiasSolicitudRechazada,							FechaSolicitudCancelada,
		DiasSolicitudCancelada,								FechaSolicitudCierreAutomatico,					DiasSolicitudCierreAutomatico,
		TotalDias,											TiempoAreaSolicitante,							TiempoAreaGestionHumana,
		TiempoAreaReclutador,								TiempoAreaNomina
	FROM 
	(
		SELECT	Año,												Mes,											IdSolicitud,
				IdEstado,											Estado,											CodigoCargo,
				NombreCargo,										CodEmpresa,										Empresa,
				CodigoUnidadNegocio,								UnidadNegocio,									CodCentro,
				Centro,												CodSeccion,										Seccion,
				CodDepartamento,									Departamento,									FechaSolicitud,
				FechaAceptadoCByN,									DiasAceptadoCByN,								FechaAutorizacionSalario,
				DiasAutorizacionSalario,							FechaAceptadoGerente,							DiasAutorizacionGerente,
				FechaProveedorAsociado,								DiasProveedorAsociado,							FechaInicioBusqueda,
				DiasInicioBusqueda,									FechaReclutadorPendienteEntrevista,				DiasReclutadorPendienteEntrevista,
				FechaReclutadorPendientePreseleccionar,				DiasReclutadorPendientePreseleccionar,			FechaReclutadorProcesoEvaluacion,
				DiasReclutadorProcesoEvaluacion,					FechaReclutadorExamenMedico,					DiasReclutadorExamenMedico,
				FechaReclutadorEstudioSeguridad,					DiasReclutadorEstudioSeguridad,					FechaReclutadorPoligrafo,
				DiasReclutadorPoligrafo,							FechaCandidatoSeleccionado,						DiasCandidatoseleccionado,
				FechaCandidatoDevueltoASeleccion,					DiasCandidatoDevueltoASeleccion,				FechaCandidatoSeleccionadoProcesoDevuelto,
				DiasCandidatoSeleccionadoProcesoDevuelto,			FechaCandidatoContratado,						DiasCandidatoContratado,
				FechaSolicitudRechazada,							DiasSolicitudRechazada,							FechaSolicitudCancelada,
				DiasSolicitudCancelada,								FechaSolicitudCierreAutomatico,					DiasSolicitudCierreAutomatico,
				TotalDias,											TiempoAreaSolicitante,							TiempoAreaGestionHumana,
				TiempoAreaReclutador,								TiempoAreaNomina
		FROM
		(
			SELECT 
				Año=YEAR(e.FechaSolicitud),							Mes=MONTH(e.FechaSolicitud),						e.IdSolicitud,
				s.IdEstado,											es.Estado,											e.CodigoCargo,
				e.NombreCargo,										e.CodEmpresa,										(EM.NombreEmpresa)Empresa,
				e.CodigoUnidadNegocio,								(U.NombreUnidadNegocio)UnidadNegocio,				e.CodCentro,
				(CE.NombreCentro)Centro,							e.CodSeccion,										E.Seccion,
				e.CodDepartamento,									(d.NombreDepartamento)Departamento,					e.FechaSolicitud,
	
				e.FechaAceptadoCByN,								e.DiasAceptadoCByN,
				e.FechaAutorizacionSalario,							e.DiasAutorizacionSalario,
				e.FechaAceptadoGerente,								e.DiasAutorizacionGerente,
				e.FechaProveedorAsociado,							e.DiasProveedorAsociado,
				e.FechaInicioBusqueda,								e.DiasInicioBusqueda,
														
				e.FechaReclutadorPendienteEntrevista,				e.DiasReclutadorPendienteEntrevista,
				e.FechaReclutadorPendientePreseleccionar,			e.DiasReclutadorPendientePreseleccionar,
				e.FechaReclutadorProcesoEvaluacion,					e.DiasReclutadorProcesoEvaluacion,
				e.FechaReclutadorExamenMedico,						e.DiasReclutadorExamenMedico,
				e.FechaReclutadorEstudioSeguridad,					e.DiasReclutadorEstudioSeguridad,
				e.FechaReclutadorPoligrafo,							e.DiasReclutadorPoligrafo,
														
				e.FechaCandidatoSeleccionado,						e.DiasCandidatoseleccionado,
				e.FechaCandidatoDevueltoASeleccion,					e.DiasCandidatoDevueltoASeleccion,
				e.FechaCandidatoSeleccionadoProcesoDevuelto,		e.DiasCandidatoSeleccionadoProcesoDevuelto,
				e.FechaCandidatoContratado,							e.DiasCandidatoContratado,
				e.FechaSolicitudRechazada,							e.DiasSolicitudRechazada,
				e.FechaSolicitudCancelada,							e.DiasSolicitudCancelada,
				e.FechaSolicitudCierreAutomatico,					e.DiasSolicitudCierreAutomatico,

				TotalDias = (DiasAceptadoCByN +								DiasAutorizacionSalario +						DiasAutorizacionGerente +						
							 DiasSolicitudRechazada +						DiasSolicitudCancelada +						DiasInicioBusqueda +
							 DiasProveedorAsociado +						DiasCandidatoDevueltoASeleccion +				DiasCandidatoContratado +
							 DiasSolicitudCierreAutomatico +				DiasCandidatoSeleccionadoProcesoDevuelto + 		DiasReclutadorPendienteEntrevista +
							 DiasReclutadorPendientePreseleccionar + 		DiasReclutadorProcesoEvaluacion + 				DiasReclutadorEstudioSeguridad +
							 DiasReclutadorExamenMedico +					DiasReclutadorPoligrafo),
	
				TiempoAreaSolicitante = (DiasAceptadoCByN +					DiasAutorizacionSalario +						DiasAutorizacionGerente + 
										 DiasSolicitudCierreAutomatico +	DiasReclutadorPendienteEntrevista +				DiasReclutadorPendientePreseleccionar + 
										 DiasSolicitudCancelada +			DiasSolicitudRechazada), 

				TiempoAreaGestionHumana=
					CASE WHEN (SP.Nit = '8300049938') OR (N.Nit_Reclutador = '8300049938') --El reclutador es GH
						THEN ((DiasInicioBusqueda + DiasProveedorAsociado + DiasCandidatoSeleccionadoProcesoDevuelto + DiasReclutadorProcesoEvaluacion + DiasReclutadorEstudioSeguridad 
									+ DiasReclutadorExamenMedico + DiasReclutadorPoligrafo) - (DiasReclutadorPendienteEntrevista + DiasReclutadorPendientePreseleccionar))
						ELSE (DiasInicioBusqueda + DiasProveedorAsociado) END,
				
				TiempoAreaReclutador = 
					CASE WHEN (SP.Nit NOT IN ('8300049938', '0')) OR (N.Nit_Reclutador NOT IN ('8300049938', '0')) --Nits diferentes a Gestión Humana y 0
						THEN ((DiasCandidatoseleccionado + DiasCandidatoSeleccionadoProcesoDevuelto + DiasReclutadorProcesoEvaluacion + DiasReclutadorEstudioSeguridad 
									+ DiasReclutadorExamenMedico + DiasReclutadorPoligrafo))
						ELSE 0 END,

				TiempoAreaNomina = (DiasCandidatoContratado + DiasCandidatoDevueltoASeleccion)
			FROM
			(
				SELECT IdSolicitud,					CodigoCargo,					NombreCargo,					CodEmpresa,					CodigoUnidadNegocio,		
					CodCentro,						CodSeccion,						Seccion,						CodDepartamento,			FechaSolicitud,
					FechaAceptadoCByN,								DiasAceptadoCByN,
					FechaAutorizacionSalario,						DiasAutorizacionSalario,
					FechaAceptadoGerente,							DiasAutorizacionGerente,
					FechaProveedorAsociado,							DiasProveedorAsociado,
					FechaInicioBusqueda,							DiasInicioBusqueda,

					FechaReclutadorPendienteEntrevista,				DiasReclutadorPendienteEntrevista,				FechaReclutadorPendientePreseleccionar,
					DiasReclutadorPendientePreseleccionar,			FechaReclutadorProcesoEvaluacion,				DiasReclutadorProcesoEvaluacion,
					FechaReclutadorExamenMedico,					DiasReclutadorExamenMedico,						FechaReclutadorEstudioSeguridad,
					DiasReclutadorEstudioSeguridad,					FechaReclutadorPoligrafo,						DiasReclutadorPoligrafo,

					FechaCandidatoSeleccionado,						DiasCandidatoseleccionado = CASE WHEN FechaCandidatoSeleccionado IS NOT NULL AND FechaCandidatoSeleccionado <> ''
																				THEN (DiasCandidatoseleccionado-(DiasReclutadorProcesoEvaluacion+DiasReclutadorExamenMedico
																						+DiasReclutadorEstudioSeguridad+DiasReclutadorPoligrafo)) 
																				ELSE 0 END,

					FechaCandidatoDevueltoASeleccion,				DiasCandidatoDevueltoASeleccion,
					FechaCandidatoSeleccionadoProcesoDevuelto,		DiasCandidatoSeleccionadoProcesoDevuelto,
					FechaCandidatoContratado,						DiasCandidatoContratado = (DiasCandidatoContratado - (DiasCandidatoSeleccionadoProcesoDevuelto
																															+ DiasCandidatoDevueltoASeleccion)),
					FechaSolicitudRechazada,						DiasSolicitudRechazada,
					FechaSolicitudCancelada,						DiasSolicitudCancelada,
					FechaSolicitudCierreAutomatico,					DiasSolicitudCierreAutomatico
				FROM 
				(
					SELECT IdSolicitud,			CodigoCargo,		NombreCargo,			CodEmpresa,				CodigoUnidadNegocio,				
						CodCentro,				CodSeccion,			Seccion,				CodDepartamento,
						FechaSolicitud = ISNULL(CONVERT(varchar,FechaSolicitud,20),''),						
						FechaAceptadoCByN=ISNULL(CONVERT(varchar,FechaAceptadoCByN,20),''),
						FechaAutorizacionSalario=ISNULL(CONVERT(varchar,FechaAutorizacionSalario,20),''),	
						FechaAceptadoGerente=ISNULL(CONVERT(varchar,FechaAceptadoGerente,20),''),
						FechaProveedorAsociado=ISNULL(CONVERT(varchar,FechaProveedorAsociado,20),''),
						FechaSolicitudRechazada = ISNULL(CONVERT(varchar,FechaSolicitudRechazada,20),''),	
						FechaSolicitudCancelada= ISNULL(CONVERT(varchar,FechaSolicitudCancelada,20),''),
						FechaCandidatoSeleccionadoProcesoDevuelto=ISNULL(CONVERT(varchar,FechaCandidatoSeleccionadoProcesoDevuelto,20),''),	
						FechaCandidatoContratado=ISNULL(CONVERT(varchar,FechaCandidatoContratado,20),''),	
						FechaCandidatoSeleccionado=ISNULL(CONVERT(varchar,FechaCandidatoSeleccionado,20),''),
						FechaInicioBusqueda=ISNULL(CONVERT(varchar,FechaInicioBusqueda,20),''),				
						FechaCandidatoDevueltoASeleccion=ISNULL(CONVERT(varchar,FechaCandidatoDevueltoASeleccion,20),''),							
						FechaSolicitudCierreAutomatico=ISNULL(CONVERT(varchar,FechaSolicitudCierreAutomatico,20),''),		
					
						CASE WHEN ISNULL(DiasAceptadoCByN,0) < 0 THEN 0 ELSE ISNULL(DiasAceptadoCByN,0) END DiasAceptadoCByN,
						CASE WHEN ISNULL(DiasAutorizacionSalario,0) < 0 THEN 0 ELSE ISNULL(DiasAutorizacionSalario,0) END DiasAutorizacionSalario,
						CASE WHEN ISNULL(DiasAutorizacionGerente,0) < 0 THEN 0 ELSE ISNULL(DiasAutorizacionGerente,0) END DiasAutorizacionGerente,
						CASE WHEN ISNULL(DiasProveedorAsociado,0) < 0 THEN 0 ELSE ISNULL(DiasProveedorAsociado,0) END DiasProveedorAsociado,
						CASE WHEN ISNULL(DiasSolicitudRechazada,0) < 0 THEN 0 ELSE ISNULL(DiasSolicitudRechazada,0)  END DiasSolicitudRechazada,
						CASE WHEN ISNULL(DiasSolicitudCancelada,0) < 0 THEN 0 ELSE ISNULL(DiasSolicitudCancelada,0) END DiasSolicitudCancelada,
						CASE WHEN ISNULL(DiasInicioBusqueda,0)	< 0 THEN 0 ELSE ISNULL(DiasInicioBusqueda,0) END DiasInicioBusqueda,
						CASE WHEN ISNULL(DiasCandidatoseleccionado,0) < 0 THEN 0 ELSE ISNULL(DiasCandidatoseleccionado,0) END DiasCandidatoseleccionado,
						CASE WHEN ISNULL(DiasCandidatoDevueltoASeleccion,0) < 0 THEN 0 ELSE ISNULL(DiasCandidatoDevueltoASeleccion,0) END DiasCandidatoDevueltoASeleccion,
						CASE WHEN ISNULL(DiasCandidatoSeleccionadoProcesoDevuelto,0) < 0 THEN 0 ELSE ISNULL(DiasCandidatoSeleccionadoProcesoDevuelto,0) END DiasCandidatoSeleccionadoProcesoDevuelto,
						CASE WHEN ISNULL(DiasCandidatoContratado,0) < 0 THEN 0 ELSE ISNULL(DiasCandidatoContratado,0) END DiasCandidatoContratado,
						CASE WHEN ISNULL(DiasSolicitudCierreAutomatico,0) < 0 THEN 0 ELSE ISNULL(DiasSolicitudCierreAutomatico,0) END DiasSolicitudCierreAutomatico,

						FechaReclutadorPendienteEntrevista = ISNULL(CONVERT(varchar,RECLUTADOR.FechaReclutadorPendienteEntrevista,20),''),						
						FechaReclutadorPendientePreseleccionar = ISNULL(CONVERT(varchar,RECLUTADOR.FechaReclutadorPendientePreseleccionar,20),''),						
						FechaReclutadorProcesoEvaluacion = ISNULL(CONVERT(varchar,RECLUTADOR.FechaReclutadorProcesoEvaluacion,20),''),						
						FechaReclutadorExamenMedico = ISNULL(CONVERT(varchar,RECLUTADOR.FechaReclutadorExamenMedico,20),''),						
						FechaReclutadorEstudioSeguridad = ISNULL(CONVERT(varchar,RECLUTADOR.FechaReclutadorEstudioSeguridad,20),''),						
						FechaReclutadorPoligrafo = ISNULL(CONVERT(varchar,RECLUTADOR.FechaReclutadorPoligrafo,20),''),								
						FechaReclutadorSeleccionado = ISNULL(CONVERT(varchar,RECLUTADOR.FechaReclutadorSeleccionado,20),''),					

						CASE WHEN FechaInicioBusqueda = FechaReclutadorPendienteEntrevista THEN 0 
							ELSE (CASE WHEN ISNULL(DiasReclutadorPendienteEntrevista,0) < 0 THEN 0 ELSE ISNULL(DiasReclutadorPendienteEntrevista,0) END) END DiasReclutadorPendienteEntrevista,
						CASE WHEN ISNULL(DiasReclutadorPendientePreseleccionar,0) < 0 THEN 0 ELSE ISNULL(DiasReclutadorPendientePreseleccionar,0) END DiasReclutadorPendientePreseleccionar,
						CASE WHEN ISNULL(DiasReclutadorProcesoEvaluacion,0) < 0 THEN 0 ELSE ISNULL(DiasReclutadorProcesoEvaluacion,0) END DiasReclutadorProcesoEvaluacion,
						CASE WHEN ISNULL(DiasReclutadorExamenMedico,0) < 0 THEN 0 ELSE ISNULL(DiasReclutadorExamenMedico,0) END DiasReclutadorExamenMedico,
						CASE WHEN ISNULL(DiasReclutadorEstudioSeguridad,0) < 0 THEN 0 ELSE ISNULL(DiasReclutadorEstudioSeguridad,0) END DiasReclutadorEstudioSeguridad,
						CASE WHEN ISNULL(DiasReclutadorPoligrafo,0) < 0 THEN 0 ELSE ISNULL(DiasReclutadorPoligrafo,0) END DiasReclutadorPoligrafo,
						CASE WHEN ISNULL(DiasReclutadorSeleccionado,0) < 0 THEN 0 ELSE ISNULL(DiasReclutadorSeleccionado,0) END DiasReclutadorSeleccionado

					FROM 
					(
						SELECT	DISTINCT 				IdSolicitud,		CodigoCargo,		NombreCargo,		CodEmpresa,			
							CodigoUnidadNegocio,		CodCentro,			CodSeccion,			Seccion,			CodDepartamento,	
							FechaSolicitud,				--FechaPendienteCByN es la misma FechaSolicitud

							FechaAceptadoCByN = FechaAceptadoCByN,
							DiasAceptadoCByN = 
								(DATEDIFF(DAY,FechaSolicitud,FechaAceptadoCByN)
									- ((SELECT (SUM(CASE WHEN F.DiaSemana = 6 THEN F.Cant ELSE 0 END) + SUM(CASE WHEN F.DiaSemana = 7 THEN F.Cant ELSE 0 END)
											+ (
												SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
												WHERE Fechafestivo >= FechaSolicitud
												AND Fechafestivo <= FechaAceptadoCByN)
											) AS DiasInhabiles
										FROM  (
											SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaAceptadoCByN)/7-DATEDIFF(DAY, -6, FechaSolicitud)/7 AS Cant UNION
											SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaAceptadoCByN)/7-DATEDIFF(DAY, -5, FechaSolicitud)/7 AS Cant UNION
											SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaAceptadoCByN)/7-DATEDIFF(DAY, -4, FechaSolicitud)/7 AS Cant UNION
											SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaAceptadoCByN)/7-DATEDIFF(DAY, -3, FechaSolicitud)/7 AS Cant UNION
											SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaAceptadoCByN)/7-DATEDIFF(DAY, -2, FechaSolicitud)/7 AS Cant UNION
											SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaAceptadoCByN)/7-DATEDIFF(DAY, -1, FechaSolicitud)/7 AS Cant UNION									
											SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaAceptadoCByN)/7-DATEDIFF(DAY,  0, FechaSolicitud)/7 AS Cant
										) F))),
									
							FechaAutorizacionSalario = FechaSalarioAceptado,
							DiasAutorizacionSalario =
								(DATEDIFF(DAY,FechaSolicitud,FechaSalarioAceptado)
									- ((SELECT (SUM(CASE WHEN F.DiaSemana = 6 THEN F.Cant ELSE 0 END) + SUM(CASE WHEN F.DiaSemana = 7 THEN F.Cant ELSE 0 END)
											+ (
												SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
												WHERE Fechafestivo >= FechaSolicitud
												AND Fechafestivo <= FechaSalarioAceptado)
											) AS DiasInhabiles
										FROM  (
											SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaSalarioAceptado)/7-DATEDIFF(DAY, -6, FechaSolicitud)/7 AS Cant UNION
											SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaSalarioAceptado)/7-DATEDIFF(DAY, -5, FechaSolicitud)/7 AS Cant UNION
											SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaSalarioAceptado)/7-DATEDIFF(DAY, -4, FechaSolicitud)/7 AS Cant UNION
											SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaSalarioAceptado)/7-DATEDIFF(DAY, -3, FechaSolicitud)/7 AS Cant UNION
											SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaSalarioAceptado)/7-DATEDIFF(DAY, -2, FechaSolicitud)/7 AS Cant UNION
											SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaSalarioAceptado)/7-DATEDIFF(DAY, -1, FechaSolicitud)/7 AS Cant UNION									
											SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaSalarioAceptado)/7-DATEDIFF(DAY,  0, FechaSolicitud)/7 AS Cant
										) F))),


							FechaAceptadoGerente = ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),
							DiasAutorizacionGerente =
								(DATEDIFF(DAY,ISNULL(FechaSalarioAceptado,FechaAceptadoCByN),ISNULL(FechaAceptadoGerente,FechaInicioBusqueda))
									- ((SELECT (SUM(CASE WHEN F.DiaSemana = 6 THEN F.Cant ELSE 0 END) + SUM(CASE WHEN F.DiaSemana = 7 THEN F.Cant ELSE 0 END)
											+ (
												SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
												WHERE Fechafestivo >= ISNULL(FechaSalarioAceptado,FechaAceptadoCByN)
												AND Fechafestivo <= ISNULL(FechaAceptadoGerente,FechaInicioBusqueda))
											) AS DiasInhabiles
										FROM  (
											SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, ISNULL(FechaAceptadoGerente,FechaInicioBusqueda))/7-DATEDIFF(DAY, -6, ISNULL(FechaSalarioAceptado,FechaAceptadoCByN))/7 AS Cant UNION
											SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, ISNULL(FechaAceptadoGerente,FechaInicioBusqueda))/7-DATEDIFF(DAY, -5, ISNULL(FechaSalarioAceptado,FechaAceptadoCByN))/7 AS Cant UNION
											SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, ISNULL(FechaAceptadoGerente,FechaInicioBusqueda))/7-DATEDIFF(DAY, -4, ISNULL(FechaSalarioAceptado,FechaAceptadoCByN))/7 AS Cant UNION
											SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, ISNULL(FechaAceptadoGerente,FechaInicioBusqueda))/7-DATEDIFF(DAY, -3, ISNULL(FechaSalarioAceptado,FechaAceptadoCByN))/7 AS Cant UNION
											SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, ISNULL(FechaAceptadoGerente,FechaInicioBusqueda))/7-DATEDIFF(DAY, -2, ISNULL(FechaSalarioAceptado,FechaAceptadoCByN))/7 AS Cant UNION
											SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, ISNULL(FechaAceptadoGerente,FechaInicioBusqueda))/7-DATEDIFF(DAY, -1, ISNULL(FechaSalarioAceptado,FechaAceptadoCByN))/7 AS Cant UNION									
											SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, ISNULL(FechaAceptadoGerente,FechaInicioBusqueda))/7-DATEDIFF(DAY,  0, ISNULL(FechaSalarioAceptado,FechaAceptadoCByN))/7 AS Cant
										) F))),
									

							FechaSolicitudRechazada,
							DiasSolicitudRechazada =
								(DATEDIFF(DAY,FechaSolicitud,FechaSolicitudRechazada) -
									- ((SELECT (SUM(CASE WHEN F.DiaSemana = 6 THEN F.Cant ELSE 0 END) + SUM(CASE WHEN F.DiaSemana = 7 THEN F.Cant ELSE 0 END) 
											+ (
												SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
												WHERE Fechafestivo >= FechaSolicitud
												AND Fechafestivo <= FechaSolicitudRechazada)
											) AS DiasInhabiles
										FROM (
											SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaSolicitudRechazada)/7-DATEDIFF(DAY, -6, FechaSolicitud)/7 AS Cant UNION
											SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaSolicitudRechazada)/7-DATEDIFF(DAY, -5, FechaSolicitud)/7 AS Cant UNION
											SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaSolicitudRechazada)/7-DATEDIFF(DAY, -4, FechaSolicitud)/7 AS Cant UNION
											SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaSolicitudRechazada)/7-DATEDIFF(DAY, -3, FechaSolicitud)/7 AS Cant UNION
											SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaSolicitudRechazada)/7-DATEDIFF(DAY, -2, FechaSolicitud)/7 AS Cant UNION
											SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaSolicitudRechazada)/7-DATEDIFF(DAY, -1, FechaSolicitud)/7 AS Cant UNION
											SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaSolicitudRechazada)/7-DATEDIFF(DAY,  0, FechaSolicitud)/7 AS Cant
										) F))),


							FechaSolicitudCancelada,
							DiasSolicitudCancelada=
							(DATEDIFF(DAY,ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),FechaSolicitud),FechaSolicitudCancelada)
								-((SELECT (SUM(CASE WHEN I.DiaSemana = 6 THEN I.Cant ELSE 0 END) + SUM(CASE WHEN I.DiaSemana = 7 THEN I.Cant ELSE 0 END)
										+ (
											SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
											WHERE Fechafestivo >= ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),FechaSolicitud)
											AND Fechafestivo <= FechaSolicitudCancelada)
										) AS DiasInhabiles
									FROM  (
										SELECT  1 AS Diasemana, (DATEDIFF(DAY, -7, FechaSolicitudCancelada)/7) - (DATEDIFF(DAY, -6, ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),FechaSolicitud))/7) AS Cant UNION
										SELECT  2 AS Diasemana, (DATEDIFF(DAY, -6, FechaSolicitudCancelada)/7) - (DATEDIFF(DAY, -5, ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),FechaSolicitud))/7) AS Cant UNION
										SELECT  3 AS Diasemana, (DATEDIFF(DAY, -5, FechaSolicitudCancelada)/7) - (DATEDIFF(DAY, -4, ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),FechaSolicitud))/7) AS Cant UNION
										SELECT  4 AS Diasemana, (DATEDIFF(DAY, -4, FechaSolicitudCancelada)/7) - (DATEDIFF(DAY, -3, ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),FechaSolicitud))/7) AS Cant UNION
										SELECT  5 AS Diasemana, (DATEDIFF(DAY, -3, FechaSolicitudCancelada)/7) - (DATEDIFF(DAY, -2, ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),FechaSolicitud))/7) AS Cant UNION
										SELECT  6 AS Diasemana, (DATEDIFF(DAY, -2, FechaSolicitudCancelada)/7) - (DATEDIFF(DAY, -1, ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),FechaSolicitud))/7) AS Cant UNION
										SELECT  7 AS Diasemana, (DATEDIFF(DAY, -1, FechaSolicitudCancelada)/7) - (DATEDIFF(DAY,  0, ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),FechaSolicitud))/7) AS Cant
									) I))),

						
							FechaProveedorAsociado = CASE WHEN FechaAceptadoGerente IS NOT NULL THEN FechaInicioBusqueda ELSE NULL END,
							DiasProveedorAsociado = CASE WHEN FechaAceptadoGerente IS NOT NULL THEN
								(DATEDIFF(DAY,FechaAceptadoGerente,FechaInicioBusqueda)
									-((SELECT (SUM(CASE WHEN J.DiaSemana = 6 THEN J.Cant ELSE 0 END) + SUM(CASE WHEN J.DiaSemana = 7 THEN J.Cant ELSE 0 END)
											+ (
												SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
												WHERE Fechafestivo >= FechaAceptadoGerente
												AND Fechafestivo <= FechaInicioBusqueda)
											) AS DiasInhabiles
										FROM  (
											SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaInicioBusqueda)/7-DATEDIFF(DAY, -6, FechaAceptadoGerente)/7 AS Cant UNION
											SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaInicioBusqueda)/7-DATEDIFF(DAY, -5, FechaAceptadoGerente)/7 AS Cant UNION
											SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaInicioBusqueda)/7-DATEDIFF(DAY, -4, FechaAceptadoGerente)/7 AS Cant UNION
											SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaInicioBusqueda)/7-DATEDIFF(DAY, -3, FechaAceptadoGerente)/7 AS Cant UNION
											SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaInicioBusqueda)/7-DATEDIFF(DAY, -2, FechaAceptadoGerente)/7 AS Cant UNION
											SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaInicioBusqueda)/7-DATEDIFF(DAY, -1, FechaAceptadoGerente)/7 AS Cant UNION
											SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaInicioBusqueda)/7-DATEDIFF(DAY,  0, FechaAceptadoGerente)/7 AS Cant
										) J))) ELSE NULL END,
								

							FechaInicioBusqueda,
							DiasInicioBusqueda =
								CASE WHEN FechaCandidatoSeleccionado IS NOT NULL THEN
									(DATEDIFF(DAY,FechaInicioBusqueda,FechaCandidatoSeleccionado)
										-((SELECT (SUM(CASE WHEN J.DiaSemana = 6 THEN J.Cant ELSE 0 END) + SUM(CASE WHEN J.DiaSemana = 7 THEN J.Cant ELSE 0 END)
												+ (
													SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
													WHERE Fechafestivo >= FechaInicioBusqueda
													AND Fechafestivo <= FechaCandidatoSeleccionado)
												) AS DiasInhabiles
											FROM  (
												SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaCandidatoSeleccionado)/7 - DATEDIFF(DAY, -6, FechaInicioBusqueda)/7 AS Cant UNION
												SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaCandidatoSeleccionado)/7 - DATEDIFF(DAY, -5, FechaInicioBusqueda)/7 AS Cant UNION
												SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaCandidatoSeleccionado)/7 - DATEDIFF(DAY, -4, FechaInicioBusqueda)/7 AS Cant UNION
												SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaCandidatoSeleccionado)/7 - DATEDIFF(DAY, -3, FechaInicioBusqueda)/7 AS Cant UNION
												SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaCandidatoSeleccionado)/7 - DATEDIFF(DAY, -2, FechaInicioBusqueda)/7 AS Cant UNION
												SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaCandidatoSeleccionado)/7 - DATEDIFF(DAY, -1, FechaInicioBusqueda)/7 AS Cant UNION
												SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaCandidatoSeleccionado)/7 - DATEDIFF(DAY,  0, FechaInicioBusqueda)/7 AS Cant
											) J)))
								ELSE (CASE WHEN FechaInicioBusqueda IS NOT NULL THEN 
										(DATEDIFF(DAY,FechaInicioBusqueda,GETDATE())
											- ((SELECT (SUM(CASE WHEN F.DiaSemana = 6 THEN F.Cant ELSE 0 END) + SUM(CASE WHEN F.DiaSemana = 7 THEN F.Cant ELSE 0 END)
													+ (
														SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
														WHERE Fechafestivo >= FechaInicioBusqueda
														AND Fechafestivo <= GETDATE())
													) AS DiasInhabiles
												FROM  (
													SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, GETDATE())/7-DATEDIFF(DAY, -6, FechaInicioBusqueda)/7 AS Cant UNION
													SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, GETDATE())/7-DATEDIFF(DAY, -5, FechaInicioBusqueda)/7 AS Cant UNION
													SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, GETDATE())/7-DATEDIFF(DAY, -4, FechaInicioBusqueda)/7 AS Cant UNION
													SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, GETDATE())/7-DATEDIFF(DAY, -3, FechaInicioBusqueda)/7 AS Cant UNION
													SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, GETDATE())/7-DATEDIFF(DAY, -2, FechaInicioBusqueda)/7 AS Cant UNION
													SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, GETDATE())/7-DATEDIFF(DAY, -1, FechaInicioBusqueda)/7 AS Cant UNION									
													SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, GETDATE())/7-DATEDIFF(DAY,  0, FechaInicioBusqueda)/7 AS Cant
												) F)))
											 END) END,
							

							FechaCandidatoSeleccionado,
							DiasCandidatoseleccionado =
								(DATEDIFF(DAY,FechaInicioBusqueda,FechaCandidatoSeleccionado)
									- ((SELECT (SUM(CASE WHEN F.DiaSemana = 6 THEN F.Cant ELSE 0 END) + SUM(CASE WHEN F.DiaSemana = 7 THEN F.Cant ELSE 0 END)
											+ (
												SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
												WHERE Fechafestivo >= FechaInicioBusqueda
												AND Fechafestivo <= FechaCandidatoSeleccionado)
											) AS DiasInhabiles
										FROM  (
											SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaCandidatoSeleccionado)/7-DATEDIFF(DAY, -6, FechaInicioBusqueda)/7 AS Cant UNION
											SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaCandidatoSeleccionado)/7-DATEDIFF(DAY, -5, FechaInicioBusqueda)/7 AS Cant UNION
											SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaCandidatoSeleccionado)/7-DATEDIFF(DAY, -4, FechaInicioBusqueda)/7 AS Cant UNION
											SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaCandidatoSeleccionado)/7-DATEDIFF(DAY, -3, FechaInicioBusqueda)/7 AS Cant UNION
											SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaCandidatoSeleccionado)/7-DATEDIFF(DAY, -2, FechaInicioBusqueda)/7 AS Cant UNION
											SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaCandidatoSeleccionado)/7-DATEDIFF(DAY, -1, FechaInicioBusqueda)/7 AS Cant UNION									
											SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaCandidatoSeleccionado)/7-DATEDIFF(DAY,  0, FechaInicioBusqueda)/7 AS Cant
										) F))),


									
							FechaCandidatoDevueltoASeleccion,
							DiasCandidatoDevueltoASeleccion=DATEDIFF(DAY,FechaCandidatoSeleccionado,FechaCandidatoDevueltoASeleccion)
							-((SELECT  
								(SUM(CASE WHEN L.DiaSemana = 6 THEN L.Cant ELSE 0 END) + SUM(CASE WHEN L.DiaSemana = 7 THEN L.Cant ELSE 0 END) + 
								(SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
								WHERE Fechafestivo >= FechaCandidatoSeleccionado
								AND Fechafestivo <= FechaCandidatoSeleccionado)) AS DiasInhabiles
								FROM  (
									SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaCandidatoDevueltoASeleccion)/7-DATEDIFF(DAY, -6, FechaCandidatoSeleccionado)/7 AS Cant UNION
									SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaCandidatoDevueltoASeleccion)/7-DATEDIFF(DAY, -5, FechaCandidatoSeleccionado)/7 AS Cant UNION
									SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaCandidatoDevueltoASeleccion)/7-DATEDIFF(DAY, -4, FechaCandidatoSeleccionado)/7 AS Cant UNION
									SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaCandidatoDevueltoASeleccion)/7-DATEDIFF(DAY, -3, FechaCandidatoSeleccionado)/7 AS Cant UNION
									SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaCandidatoDevueltoASeleccion)/7-DATEDIFF(DAY, -2, FechaCandidatoSeleccionado)/7 AS Cant UNION
									SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaCandidatoDevueltoASeleccion)/7-DATEDIFF(DAY, -1, FechaCandidatoSeleccionado)/7 AS Cant UNION
									SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaCandidatoDevueltoASeleccion)/7-DATEDIFF(DAY,  0, FechaCandidatoSeleccionado)/7 AS Cant
								) L)),


							--Aparece resultado cuando la solicitud paso por el estado 11 (Devuelto a selección)
							FechaCandidatoSeleccionadoProcesoDevuelto, 
							DiasCandidatoSeleccionadoProcesoDevuelto=DATEDIFF(DAY,FechaCandidatoDevueltoASeleccion,FechaCandidatoSeleccionadoProcesoDevuelto)
							-((SELECT  
								(SUM(CASE WHEN K.DiaSemana = 6 THEN K.Cant ELSE 0 END) + SUM(CASE WHEN K.DiaSemana = 7 THEN K.Cant ELSE 0 END) + 
								(SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
								WHERE Fechafestivo >= FechaCandidatoDevueltoASeleccion
								AND Fechafestivo <= FechaCandidatoDevueltoASeleccion)) AS DiasInhabiles
								FROM  (
									SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaCandidatoSeleccionadoProcesoDevuelto)/7-DATEDIFF(DAY, -6, FechaCandidatoDevueltoASeleccion)/7 AS Cant UNION
									SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaCandidatoSeleccionadoProcesoDevuelto)/7-DATEDIFF(DAY, -5, FechaCandidatoDevueltoASeleccion)/7 AS Cant UNION
									SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaCandidatoSeleccionadoProcesoDevuelto)/7-DATEDIFF(DAY, -4, FechaCandidatoDevueltoASeleccion)/7 AS Cant UNION
									SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaCandidatoSeleccionadoProcesoDevuelto)/7-DATEDIFF(DAY, -3, FechaCandidatoDevueltoASeleccion)/7 AS Cant UNION
									SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaCandidatoSeleccionadoProcesoDevuelto)/7-DATEDIFF(DAY, -2, FechaCandidatoDevueltoASeleccion)/7 AS Cant UNION
									SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaCandidatoSeleccionadoProcesoDevuelto)/7-DATEDIFF(DAY, -1, FechaCandidatoDevueltoASeleccion)/7 AS Cant UNION
									SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaCandidatoSeleccionadoProcesoDevuelto)/7-DATEDIFF(DAY,  0, FechaCandidatoDevueltoASeleccion)/7 AS Cant
								) K)),
									   

							FechaCandidatoContratado,
							DiasCandidatoContratado=DATEDIFF(DAY,FechaCandidatoSeleccionado,FechaCandidatoContratado)
							-((SELECT  
								(SUM(CASE WHEN L.DiaSemana = 6 THEN L.Cant ELSE 0 END) + SUM(CASE WHEN L.DiaSemana = 7 THEN L.Cant ELSE 0 END) + 
								(SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
								WHERE Fechafestivo >= FechaCandidatoSeleccionado
								AND Fechafestivo <= FechaCandidatoSeleccionado)) AS DiasInhabiles
								FROM  (
									SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaCandidatoContratado)/7-DATEDIFF(DAY, -6, FechaCandidatoSeleccionado)/7 AS Cant UNION
									SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaCandidatoContratado)/7-DATEDIFF(DAY, -5, FechaCandidatoSeleccionado)/7 AS Cant UNION
									SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaCandidatoContratado)/7-DATEDIFF(DAY, -4, FechaCandidatoSeleccionado)/7 AS Cant UNION
									SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaCandidatoContratado)/7-DATEDIFF(DAY, -3, FechaCandidatoSeleccionado)/7 AS Cant UNION
									SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaCandidatoContratado)/7-DATEDIFF(DAY, -2, FechaCandidatoSeleccionado)/7 AS Cant UNION
									SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaCandidatoContratado)/7-DATEDIFF(DAY, -1, FechaCandidatoSeleccionado)/7 AS Cant UNION
									SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaCandidatoContratado)/7-DATEDIFF(DAY,  0, FechaCandidatoSeleccionado)/7 AS Cant
								) L)),


							FechaSolicitudCierreAutomatico,
							DiasSolicitudCierreAutomatico=
							DATEDIFF(DAY,ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),FechaSolicitud),FechaSolicitudCierreAutomatico)
							-((SELECT  
								(SUM(CASE WHEN I.DiaSemana = 6 THEN I.Cant ELSE 0 END) + SUM(CASE WHEN I.DiaSemana = 7 THEN I.Cant ELSE 0 END) + 
								(SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
								WHERE Fechafestivo >= ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),FechaSolicitud)
								AND Fechafestivo <= ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),FechaSolicitud))) AS DiasInhabiles
								FROM  (
									SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaSolicitudCierreAutomatico)/7-DATEDIFF(DAY, -6, ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),FechaSolicitud))/7 AS Cant UNION
									SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaSolicitudCierreAutomatico)/7-DATEDIFF(DAY, -5, ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),FechaSolicitud))/7 AS Cant UNION
									SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaSolicitudCierreAutomatico)/7-DATEDIFF(DAY, -4, ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),FechaSolicitud))/7 AS Cant UNION
									SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaSolicitudCierreAutomatico)/7-DATEDIFF(DAY, -3, ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),FechaSolicitud))/7 AS Cant UNION
									SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaSolicitudCierreAutomatico)/7-DATEDIFF(DAY, -2, ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),FechaSolicitud))/7 AS Cant UNION
									SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaSolicitudCierreAutomatico)/7-DATEDIFF(DAY, -1, ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),FechaSolicitud))/7 AS Cant UNION
									SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaSolicitudCierreAutomatico)/7-DATEDIFF(DAY,  0, ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),FechaSolicitud))/7 AS Cant
								) I))


						FROM
						(
							SELECT 
								IdSolicitud,							CodigoCargo,						NombreCargo,					CodEmpresa,
								CodigoUnidadNegocio,					CodCentro,							CodSeccion,						Seccion,
								NuevoSalario,							CodDepartamento,					FechaSolicitud,					FechaAceptadoCByN,
								FechaAceptadoGerente,					FechaSalarioAceptado,				FechaSolicitudRechazada,		FechaSolicitudCancelada,
								FechaInicioBusqueda,					FechaCandidatoSeleccionado,			FechaCandidatoContratado,		FechaCandidatoDevueltoASeleccion,
								FechaSolicitudCierreAutomatico,			FechaPendienteCByN,
								CASE WHEN FechaCandidatoDevueltoASeleccion IS NOT NULL 
										THEN (SELECT DISTINCT DC.FechaModificacion FROM Requisiciones_HistoricoSolicitud DC
												WHERE DC.IdSolicitud = A.IdSolicitud AND DC.IdEstado = 3 
													AND DC.FechaModificacion >= A.FechaCandidatoDevueltoASeleccion) 
										END FechaCandidatoSeleccionadoProcesoDevuelto
							FROM 
							(
								SELECT 
									IdSolicitud,												CodigoCargo,											NombreCargo,							
									CodEmpresa,													CodigoUnidadNegocio,									CodCentro,								
									CodSeccion,													Seccion,												CodDepartamento,
									NuevoSalario,
									FechaSolicitud=MAX(FechaSolicitud),								FechaAceptadoCByN=MAX(FechaAceptadoCByN),		
									FechaAceptadoGerente=MAX(FechaAceptadoGerente),					FechaSalarioAceptado=MAX(FechaSalarioAceptado),
									FechaSolicitudRechazada=MAX(FechaSolicitudRechazada),			FechaSolicitudCierreAutomatico=MAX(FechaSolicitudCierreAutomatico),
									FechaInicioBusqueda=MAX(FechaInicioBusqueda),					FechaCandidatoSeleccionado=MIN(FechaCandidatoSeleccionado),
									FechaCandidatoContratado=MAX(FechaCandidatoContratado),			FechaCandidatoDevueltoASeleccion=MAX(FechaCandidatoDevueltoASeleccion),		
									FechaSolicitudCancelada=MAX(FechaSolicitudCancelada),			FechaPendienteCByN=MAX(FechaPendienteCByN)
								FROM
								(	
									SELECT	s.IdSolicitud,		s.CodigoCargo,		c.NombreCargo,		s.CodigoUnidadNegocio,			s.CodEmpresa,	
											s.CodCentro,		s.CodSeccion,		s.Seccion,			s.CodDepartamento,				s.FechaSolicitud,
											s.NuevoSalario,
											CASE WHEN h.IdEstado = 1  THEN h.FechaModificacion END FechaAceptadoCByN,
											CASE WHEN h.IdEstado = 2  THEN h.FechaModificacion END FechaInicioBusqueda,
											CASE WHEN h.IdEstado = 3  THEN h.FechaModificacion END FechaCandidatoSeleccionado,
											CASE WHEN h.IdEstado = 4  THEN h.FechaModificacion END FechaSalarioAceptado,
											CASE WHEN h.IdEstado = 5  THEN h.FechaModificacion END FechaAceptadoGerente,
											CASE WHEN h.IdEstado = 7  THEN h.FechaModificacion END FechaCandidatoContratado,
											CASE WHEN h.IdEstado = 8  THEN h.FechaModificacion END FechaSolicitudRechazada,
											CASE WHEN h.IdEstado = 9  THEN h.FechaModificacion END FechaSolicitudCancelada,									
											CASE WHEN h.IdEstado = 11 THEN H.FechaModificacion END FechaCandidatoDevueltoASeleccion,
											CASE WHEN h.IdEstado = 12 THEN H.FechaModificacion END FechaSolicitudCierreAutomatico,
											CASE WHEN h.IdEstado = 13 THEN H.FechaModificacion END FechaPendienteCByN --Es la misma fecha de creación
									FROM (
										SELECT *, FechaSolicitud=FechaCreacion
										FROM Requisiciones_Solicitudes
										WHERE FechaCreacion >= '20240626'
									) S
									LEFT JOIN	Requisiciones_HistoricoSolicitud	h	on	h.IdSolicitud = s.IdSolicitud	
									left join	Requisiciones_Estados				e	on	h.IdEstado = e.IdEstado								
									left join	Cargos								c	on	s.CodigoCargo = c.CodigoCargo
								)a 
								--WHERE IdSolicitud BETWEEN 7200 AND 7208
								GROUP BY IdSolicitud,CodigoCargo,NombreCargo,CodEmpresa,CodigoUnidadNegocio,CodCentro,CodSeccion,Seccion,CodDepartamento,NuevoSalario
							)A
						)b 

					) C

					LEFT JOIN 
					(
						SELECT	(Solicitud.IdSolicitud)IdSolicitud_R,											CONVERT(DATE,Solicitud.FechaCreacion)FechaCreacion,		
								FechaReclutadorPendienteEntrevista,				
								DiasReclutadorPendienteEntrevista=
												DATEDIFF(DAY,CONVERT(DATE,Solicitud.FechaCreacion),FechaReclutadorPendienteEntrevista)
												-((SELECT  
													(SUM(CASE WHEN H.DiaSemana = 6 THEN H.Cant ELSE 0 END) + SUM(CASE WHEN H.DiaSemana = 7 THEN H.Cant ELSE 0 END) + 
													(SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
													WHERE Fechafestivo >= FechaCreacion
													AND Fechafestivo <= FechaCreacion)) AS DiasInhabiles
													FROM  (
														SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaReclutadorPendienteEntrevista)/7-DATEDIFF(DAY, -6, FechaCreacion)/7 AS Cant UNION
														SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaReclutadorPendienteEntrevista)/7-DATEDIFF(DAY, -5, FechaCreacion)/7 AS Cant UNION
														SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaReclutadorPendienteEntrevista)/7-DATEDIFF(DAY, -4, FechaCreacion)/7 AS Cant UNION
														SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaReclutadorPendienteEntrevista)/7-DATEDIFF(DAY, -3, FechaCreacion)/7 AS Cant UNION
														SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaReclutadorPendienteEntrevista)/7-DATEDIFF(DAY, -2, FechaCreacion)/7 AS Cant UNION
														SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaReclutadorPendienteEntrevista)/7-DATEDIFF(DAY, -1, FechaCreacion)/7 AS Cant UNION
														SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaReclutadorPendienteEntrevista)/7-DATEDIFF(DAY,  0, FechaCreacion)/7 AS Cant
													) H)),

								FechaReclutadorPendientePreseleccionar,					
								DiasReclutadorPendientePreseleccionar=
												DATEDIFF(DAY,FechaReclutadorPendienteEntrevista,FechaReclutadorPendientePreseleccionar)
												-((SELECT  
													(SUM(CASE WHEN H.DiaSemana = 6 THEN H.Cant ELSE 0 END) + SUM(CASE WHEN H.DiaSemana = 7 THEN H.Cant ELSE 0 END) + 
													(SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
													WHERE Fechafestivo >= FechaReclutadorPendienteEntrevista
													AND Fechafestivo <= FechaReclutadorPendienteEntrevista)) AS DiasInhabiles
													FROM  (
														SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaReclutadorPendientePreseleccionar)/7-DATEDIFF(DAY, -6, FechaReclutadorPendienteEntrevista)/7 AS Cant UNION
														SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaReclutadorPendientePreseleccionar)/7-DATEDIFF(DAY, -5, FechaReclutadorPendienteEntrevista)/7 AS Cant UNION
														SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaReclutadorPendientePreseleccionar)/7-DATEDIFF(DAY, -4, FechaReclutadorPendienteEntrevista)/7 AS Cant UNION
														SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaReclutadorPendientePreseleccionar)/7-DATEDIFF(DAY, -3, FechaReclutadorPendienteEntrevista)/7 AS Cant UNION
														SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaReclutadorPendientePreseleccionar)/7-DATEDIFF(DAY, -2, FechaReclutadorPendienteEntrevista)/7 AS Cant UNION
														SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaReclutadorPendientePreseleccionar)/7-DATEDIFF(DAY, -1, FechaReclutadorPendienteEntrevista)/7 AS Cant UNION
														SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaReclutadorPendientePreseleccionar)/7-DATEDIFF(DAY,  0, FechaReclutadorPendienteEntrevista)/7 AS Cant
													) H)),	
		

								FechaReclutadorProcesoEvaluacion,				
								DiasReclutadorProcesoEvaluacion=
												DATEDIFF(DAY,FechaReclutadorPendientePreseleccionar,FechaReclutadorProcesoEvaluacion)
												-((SELECT  
													(SUM(CASE WHEN H.DiaSemana = 6 THEN H.Cant ELSE 0 END) + SUM(CASE WHEN H.DiaSemana = 7 THEN H.Cant ELSE 0 END) + 
													(SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
													WHERE Fechafestivo >= FechaReclutadorPendientePreseleccionar
													AND Fechafestivo <= FechaReclutadorPendientePreseleccionar)) AS DiasInhabiles
													FROM  (
														SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaReclutadorProcesoEvaluacion)/7-DATEDIFF(DAY, -6, FechaReclutadorPendientePreseleccionar)/7 AS Cant UNION
														SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaReclutadorProcesoEvaluacion)/7-DATEDIFF(DAY, -5, FechaReclutadorPendientePreseleccionar)/7 AS Cant UNION
														SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaReclutadorProcesoEvaluacion)/7-DATEDIFF(DAY, -4, FechaReclutadorPendientePreseleccionar)/7 AS Cant UNION
														SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaReclutadorProcesoEvaluacion)/7-DATEDIFF(DAY, -3, FechaReclutadorPendientePreseleccionar)/7 AS Cant UNION
														SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaReclutadorProcesoEvaluacion)/7-DATEDIFF(DAY, -2, FechaReclutadorPendientePreseleccionar)/7 AS Cant UNION
														SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaReclutadorProcesoEvaluacion)/7-DATEDIFF(DAY, -1, FechaReclutadorPendientePreseleccionar)/7 AS Cant UNION
														SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaReclutadorProcesoEvaluacion)/7-DATEDIFF(DAY,  0, FechaReclutadorPendientePreseleccionar)/7 AS Cant
													) H)),			
		

								FechaReclutadorExamenMedico,				
								DiasReclutadorExamenMedico=
												DATEDIFF(DAY,FechaReclutadorCalculoExamenMedico,FechaReclutadorExamenMedico)
												-((SELECT  
													(SUM(CASE WHEN H.DiaSemana = 6 THEN H.Cant ELSE 0 END) + SUM(CASE WHEN H.DiaSemana = 7 THEN H.Cant ELSE 0 END) + 
													(SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
													WHERE Fechafestivo >= FechaReclutadorProcesoEvaluacion
													AND Fechafestivo <= FechaReclutadorProcesoEvaluacion)) AS DiasInhabiles
													FROM  (
														SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaReclutadorExamenMedico)/7-DATEDIFF(DAY, -6, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaReclutadorExamenMedico)/7-DATEDIFF(DAY, -5, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaReclutadorExamenMedico)/7-DATEDIFF(DAY, -4, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaReclutadorExamenMedico)/7-DATEDIFF(DAY, -3, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaReclutadorExamenMedico)/7-DATEDIFF(DAY, -2, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaReclutadorExamenMedico)/7-DATEDIFF(DAY, -1, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaReclutadorExamenMedico)/7-DATEDIFF(DAY,  0, FechaReclutadorProcesoEvaluacion)/7 AS Cant
													) H)),				
		

								FechaReclutadorEstudioSeguridad,				
								DiasReclutadorEstudioSeguridad=
												DATEDIFF(DAY,FechaReclutadorCalculoEstudioSeguridad,FechaReclutadorEstudioSeguridad)
												-((SELECT  
													(SUM(CASE WHEN H.DiaSemana = 6 THEN H.Cant ELSE 0 END) + SUM(CASE WHEN H.DiaSemana = 7 THEN H.Cant ELSE 0 END) + 
													(SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
													WHERE Fechafestivo >= FechaReclutadorProcesoEvaluacion
													AND Fechafestivo <= FechaReclutadorProcesoEvaluacion)) AS DiasInhabiles
													FROM  (
														SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaReclutadorEstudioSeguridad)/7-DATEDIFF(DAY, -6, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaReclutadorEstudioSeguridad)/7-DATEDIFF(DAY, -5, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaReclutadorEstudioSeguridad)/7-DATEDIFF(DAY, -4, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaReclutadorEstudioSeguridad)/7-DATEDIFF(DAY, -3, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaReclutadorEstudioSeguridad)/7-DATEDIFF(DAY, -2, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaReclutadorEstudioSeguridad)/7-DATEDIFF(DAY, -1, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaReclutadorEstudioSeguridad)/7-DATEDIFF(DAY,  0, FechaReclutadorProcesoEvaluacion)/7 AS Cant
													) H)),
							
		
								FechaReclutadorPoligrafo,			
								DiasReclutadorPoligrafo=
												DATEDIFF(DAY,FechaReclutadorCalculoPoligrafo,FechaReclutadorPoligrafo)
												-((SELECT  
													(SUM(CASE WHEN H.DiaSemana = 6 THEN H.Cant ELSE 0 END) + SUM(CASE WHEN H.DiaSemana = 7 THEN H.Cant ELSE 0 END) + 
													(SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
													WHERE Fechafestivo >= FechaReclutadorProcesoEvaluacion
													AND Fechafestivo <= FechaReclutadorProcesoEvaluacion)) AS DiasInhabiles
													FROM  (
														SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaReclutadorPoligrafo)/7-DATEDIFF(DAY, -6, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaReclutadorPoligrafo)/7-DATEDIFF(DAY, -5, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaReclutadorPoligrafo)/7-DATEDIFF(DAY, -4, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaReclutadorPoligrafo)/7-DATEDIFF(DAY, -3, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaReclutadorPoligrafo)/7-DATEDIFF(DAY, -2, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaReclutadorPoligrafo)/7-DATEDIFF(DAY, -1, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaReclutadorPoligrafo)/7-DATEDIFF(DAY,  0, FechaReclutadorProcesoEvaluacion)/7 AS Cant
													) H)),				
		

								FechaReclutadorSeleccionado,			
								DiasReclutadorSeleccionado=
												DATEDIFF(DAY,FechaReclutadorProcesoEvaluacion,FechaReclutadorSeleccionado)
												-((SELECT  
													(SUM(CASE WHEN H.DiaSemana = 6 THEN H.Cant ELSE 0 END) + SUM(CASE WHEN H.DiaSemana = 7 THEN H.Cant ELSE 0 END) + 
													(SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
													WHERE Fechafestivo >= FechaReclutadorProcesoEvaluacion
													AND Fechafestivo <= FechaReclutadorProcesoEvaluacion)) AS DiasInhabiles
													FROM  (
														SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaReclutadorSeleccionado)/7-DATEDIFF(DAY, -6, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaReclutadorSeleccionado)/7-DATEDIFF(DAY, -5, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaReclutadorSeleccionado)/7-DATEDIFF(DAY, -4, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaReclutadorSeleccionado)/7-DATEDIFF(DAY, -3, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaReclutadorSeleccionado)/7-DATEDIFF(DAY, -2, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaReclutadorSeleccionado)/7-DATEDIFF(DAY, -1, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaReclutadorSeleccionado)/7-DATEDIFF(DAY,  0, FechaReclutadorProcesoEvaluacion)/7 AS Cant
													) H))
		
		
						FROM Requisiciones_Solicitudes AS Solicitud

						LEFT JOIN 
						(
							SELECT	
								A.IdSolicitud,											CedulaCandidato,															
								FechaReclutadorProcesoEvaluacion,						FechaReclutadorPoligrafo,								FechaReclutadorExamenMedico,							
								FechaReclutadorEstudioSeguridad,						FechaReclutadorSeleccionado,							FechaReclutadorCalculoPoligrafo,						
								FechaReclutadorCalculoExamenMedico,						FechaReclutadorCalculoEstudioSeguridad,

								CASE WHEN Historico.FechaModificacion IS NOT NULL 
									THEN (CASE WHEN Historico.FechaModificacion > FechaReclutadorPendienteEntrevista 
											THEN Historico.FechaModificacion 
											ELSE FechaReclutadorPendienteEntrevista 
											END)
									ELSE NULL END AS FechaReclutadorPendienteEntrevista,

								CASE WHEN Historico.FechaModificacion IS NOT NULL 
									THEN (CASE WHEN Historico.FechaModificacion > FechaReclutadorPendientePreseleccionar 
											THEN Historico.FechaModificacion 
											ELSE FechaReclutadorPendientePreseleccionar END)
									ELSE NULL END AS FechaReclutadorPendientePreseleccionar
							FROM 
							(
								SELECT A.IdSolicitud,																		CedulaCandidato,														
									MAX(FechaReclutadorPendienteEntrevista)FechaReclutadorPendienteEntrevista,				MAX(FechaReclutadorPendientePreseleccionar)FechaReclutadorPendientePreseleccionar,
									MAX(FechaReclutadorProcesoEvaluacion)FechaReclutadorProcesoEvaluacion,					MAX(FechaReclutadorPoligrafo)FechaReclutadorPoligrafo,											
									MAX(FechaReclutadorExamenMedico)FechaReclutadorExamenMedico,							MAX(FechaReclutadorEstudioSeguridad)FechaReclutadorEstudioSeguridad,							
									MAX(FechaReclutadorSeleccionado)FechaReclutadorSeleccionado,							MAX(FechaReclutadorCalculoPoligrafo)FechaReclutadorCalculoPoligrafo,
									MAX(FechaReclutadorCalculoExamenMedico)FechaReclutadorCalculoExamenMedico,				MAX(FechaReclutadorCalculoEstudioSeguridad)FechaReclutadorCalculoEstudioSeguridad
								FROM
								(
									SELECT DISTINCT S.IdSolicitud,		S.CedulaCandidato,		HR.IdHistorico,
										CASE WHEN HR.IdEstadoReclutador = 1  THEN CONVERT(DATE,HR.FechaModificacion) END AS FechaReclutadorPendienteEntrevista,  --PENDIENTE ENTREVISTA
										CASE WHEN HR.IdEstadoReclutador = 2  THEN CONVERT(DATE,HR.FechaModificacion) END AS FechaReclutadorPendientePreseleccionar,  --PENDIENTE PRESELECCIONAR
										CASE WHEN HR.IdEstadoReclutador = 3  THEN CONVERT(DATE,HR.FechaModificacion) END AS FechaReclutadorProcesoEvaluacion,  --PROCESO DE EVALUACIÓN
										CASE WHEN HR.IdEstadoReclutador = 4  THEN CONVERT(DATE,HR.FechaModificacion) END AS FechaReclutadorPoligrafo,  --POLIGRAFO	
										CASE WHEN HR.IdEstadoReclutador = 5  THEN CONVERT(DATE,HR.FechaModificacion) END AS FechaReclutadorExamenMedico,  --EXAMEN MEDICO
										CASE WHEN HR.IdEstadoReclutador = 6  THEN CONVERT(DATE,HR.FechaModificacion) END AS FechaReclutadorEstudioSeguridad,  --ESTUDIO SEGURIDAD
										CASE WHEN HR.IdEstadoReclutador = 7  THEN CONVERT(DATE,HR.FechaModificacion) END AS FechaReclutadorSeleccionado,  --CANDIDATO SELECCIONADO

										CASE WHEN HR.IdEstadoReclutador = 4  THEN 
										(
											SELECT TOP 1 CONVERT(DATE,A.FechaModificacion)  
											FROM
											(
												SELECT orden = ROW_NUMBER() over(partition by cedulacandidato  order by fechamodificacion asc),
      													HR.IdHistorico, HR.IdSolicitud, HR.CedulaCandidato, HR.IdEstadoReclutador, ER.Estado, HR.FechaModificacion
												FROM Requisiciones_HistoricoReclutador HR 
												LEFT JOIN Requisiciones_EstadosReclutador ER ON ER.IdEstado = HR.IdEstadoReclutador 
												WHERE HR.IdEstadoReclutador in (3,4,5,6) 
											) A
											WHERE HR.CedulaCandidato = A.CedulaCandidato AND HR.IdSolicitud = A.IdSolicitud AND A.orden = (HO.orden - 1) 
										)
										END AS FechaReclutadorCalculoPoligrafo,  --CALCULO POLIGRAFO
	
										CASE WHEN HR.IdEstadoReclutador = 5  THEN 
										(
											SELECT TOP 1 CONVERT(DATE,A.FechaModificacion)  
											FROM
											(
												SELECT orden = ROW_NUMBER() over(partition by cedulacandidato  order by fechamodificacion asc),
      													HR.IdHistorico, HR.IdSolicitud, HR.CedulaCandidato, HR.IdEstadoReclutador, ER.Estado, HR.FechaModificacion
												FROM Requisiciones_HistoricoReclutador HR 
												LEFT JOIN Requisiciones_EstadosReclutador ER ON ER.IdEstado = HR.IdEstadoReclutador 
												WHERE HR.IdEstadoReclutador in (3,4,5,6) 
											) A
											WHERE HR.CedulaCandidato = A.CedulaCandidato AND HR.IdSolicitud = A.IdSolicitud AND A.orden = (HO.orden - 1) 
										)
										END AS FechaReclutadorCalculoExamenMedico,  --CALCULO EXAMEN MEDICO

										CASE WHEN HR.IdEstadoReclutador = 6  THEN 
										(
											SELECT TOP 1 CONVERT(DATE,A.FechaModificacion)  
											FROM
											(
												SELECT orden = ROW_NUMBER() over(partition by cedulacandidato  order by fechamodificacion asc),
      													HR.IdHistorico, HR.IdSolicitud, HR.CedulaCandidato, HR.IdEstadoReclutador, ER.Estado, HR.FechaModificacion
												FROM Requisiciones_HistoricoReclutador HR 
												LEFT JOIN Requisiciones_EstadosReclutador ER ON ER.IdEstado = HR.IdEstadoReclutador 
												WHERE HR.IdEstadoReclutador in (3,4,5,6) 
											) A
											WHERE HR.CedulaCandidato = A.CedulaCandidato AND HR.IdSolicitud = A.IdSolicitud AND A.orden = (HO.orden - 1) 
										)
										END AS FechaReclutadorCalculoEstudioSeguridad  --CALCULO ESTUDIO SEGURIDAD

									FROM
									(
										SELECT S.IdSolicitud,
										(
											SELECT TOP (1) CedulaCandidato
											FROM
											(
												SELECT DISTINCT IdSolicitud, HR.CedulaCandidato,
													CASE WHEN HR.IdEstadoReclutador = 3 THEN 1 --PROCESO DE EVALUACIÓN
															WHEN HR.IdEstadoReclutador = 4 THEN 2 --POLIGRAFO
															WHEN HR.IdEstadoReclutador = 5 THEN 3 --EXAMEN MEDICO
															WHEN HR.IdEstadoReclutador = 6 THEN 4 --ESTUDIO SEGURIDAD
															WHEN HR.IdEstadoReclutador = 7 THEN 5 --CANDIDATO SELECCIONADO
															WHEN HR.IdEstadoReclutador = 2 THEN 6 --PENDIENTE PRESELECCIONAR
															WHEN HR.IdEstadoReclutador = 1 THEN 7 --PENDIENTE ENTREVISTA
															ELSE 99 END Proceso 
												FROM Requisiciones_HistoricoReclutador HR	
											) A
											WHERE A.IdSolicitud = S.IdSolicitud 
											ORDER BY Proceso ASC
										) CedulaCandidato
										FROM Requisiciones_Solicitudes S
									) S
									LEFT JOIN Requisiciones_HistoricoReclutador HR ON HR.IdSolicitud = S.IdSolicitud AND S.CedulaCandidato = HR.CedulaCandidato
									LEFT JOIN 
									(
										SELECT orden = ROW_NUMBER() over(partition by cedulacandidato  order by fechamodificacion asc),
      											HR.IdHistorico, HR.IdSolicitud, HR.CedulaCandidato, HR.IdEstadoReclutador, ER.Estado, HR.FechaModificacion
										FROM Requisiciones_HistoricoReclutador HR 
										LEFT JOIN Requisiciones_EstadosReclutador ER ON ER.IdEstado = HR.IdEstadoReclutador 
										WHERE HR.IdEstadoReclutador in (3,4,5,6) 	  
									) HO ON S.IdSolicitud = HO.IdSolicitud AND S.CedulaCandidato = HO.CedulaCandidato AND HR.IdHistorico = HO.IdHistorico

								) A	
								GROUP BY A.IdSolicitud, CedulaCandidato
				
							) A
				
							LEFT JOIN Requisiciones_HistoricoSolicitud Historico ON A.IdSolicitud = Historico.IdSolicitud AND Historico.IdEstado = 2
			
						) AS HistoricoReclutador ON HistoricoReclutador.IdSolicitud = Solicitud.IdSolicitud		

					) RECLUTADOR ON C.IdSolicitud = RECLUTADOR.IdSolicitud_R
				)a
			)e
	
			LEFT JOIN Requisiciones_SolicitudProveedor as sp on e.IdSolicitud = sp.Solicitud 

			LEFT JOIN Requisiciones_Solicitudes	as s	on  e.IdSolicitud = s.IdSolicitud	

			LEFT JOIN Requisiciones_Estados		as es	on	s.IdEstado = es.IdEstado

			LEFT JOIN 
			( 
				SELECT IdSolicitud, IdEstado, UserModifico=MAX(UserModifico)
				FROM Requisiciones_HistoricoSolicitud 
				WHERE IdEstado = 3
				GROUP BY IdSolicitud, IdEstado
			) AS H ON H.IdSolicitud = S.IdSolicitud

			LEFT JOIN 
			(
				SELECT RU.Nit_Reclutador, RU.Cedula_Usuario, AU.Id 
				FROM Requisiciones_Reclutadores_Usuarios RU
				LEFT JOIN AspNetUsers AU ON RU.Cedula_Usuario = AU.UserName
			) N ON H.UserModifico = N.Id
	
			LEFT JOIN Empresas AS EM ON E.CodEmpresa = EM.CodigoEmpresa
	
			LEFT JOIN	
			(
				SELECT DISTINCT CodUnidadNegocio, NombreUnidadNegocio 
				FROM UnidadDeNegocio
			)	u	on	u.CodUnidadNegocio = e.CodigoUnidadNegocio

			LEFT JOIN	
			(
				SELECT DISTINCT CodCentro, NombreCentro 
				FROM UnidadDeNegocio
			)	ce	on	ce.CodCentro = s.CodCentro

			LEFT JOIN	
			(
				SELECT DISTINCT CodDepartamento, NombreDepartamento 
				FROM UnidadDeNegocio
			)	d	on	d.CodDepartamento = s.CodDepartamento
		) ParteNueva
	
		UNION ALL

		SELECT	Año,												Mes,											IdSolicitud,
				IdEstado,											Estado,											CodigoCargo,
				NombreCargo,										CodEmpresa,										Empresa,
				CodigoUnidadNegocio,								UnidadNegocio,									CodCentro,
				Centro,												CodSeccion,										Seccion,
				CodDepartamento,									Departamento,									FechaSolicitud,
				FechaAceptadoCByN,									DiasAceptadoCByN,								FechaAutorizacionSalario,
				DiasAutorizacionSalario,							FechaAceptadoGerente,							DiasAutorizacionGerente,
				FechaProveedorAsociado,								DiasProveedorAsociado,							FechaInicioBusqueda,
				DiasInicioBusqueda,									FechaReclutadorPendienteEntrevista,				DiasReclutadorPendienteEntrevista,
				FechaReclutadorPendientePreseleccionar,				DiasReclutadorPendientePreseleccionar,			FechaReclutadorProcesoEvaluacion,
				DiasReclutadorProcesoEvaluacion,					FechaReclutadorExamenMedico,					DiasReclutadorExamenMedico,
				FechaReclutadorEstudioSeguridad,					DiasReclutadorEstudioSeguridad,					FechaReclutadorPoligrafo,
				DiasReclutadorPoligrafo,							FechaCandidatoSeleccionado,						DiasCandidatoseleccionado,
				FechaCandidatoDevueltoASeleccion,					DiasCandidatoDevueltoASeleccion,				FechaCandidatoSeleccionadoProcesoDevuelto,
				DiasCandidatoSeleccionadoProcesoDevuelto,			FechaCandidatoContratado,						DiasCandidatoContratado,
				FechaSolicitudRechazada,							DiasSolicitudRechazada,							FechaSolicitudCancelada,
				DiasSolicitudCancelada,								FechaSolicitudCierreAutomatico,					DiasSolicitudCierreAutomatico,
				TotalDias,											TiempoAreaSolicitante,							TiempoAreaGestionHumana,
				TiempoAreaReclutador,								TiempoAreaNomina
		FROM
		(
			SELECT 
				Año=YEAR(e.FechaSolicitud),							Mes=MONTH(e.FechaSolicitud),						e.IdSolicitud,
				s.IdEstado,											es.Estado,											e.CodigoCargo,
				e.NombreCargo,										e.CodEmpresa,										(EM.NombreEmpresa)Empresa,
				e.CodigoUnidadNegocio,								(U.NombreUnidadNegocio)UnidadNegocio,				e.CodCentro,
				(CE.NombreCentro)Centro,							e.CodSeccion,										E.Seccion,
				e.CodDepartamento,									(d.NombreDepartamento)Departamento,					e.FechaSolicitud,
	
				FechaAceptadoCByN = '',								DiasAceptadoCByN = 0, --No existia el Proceso de CB y N
				e.FechaAutorizacionSalario,							e.DiasAutorizacionSalario,
				e.FechaAceptadoGerente,								e.DiasAutorizacionGerente,
				e.FechaProveedorAsociado,							e.DiasProveedorAsociado,
				e.FechaInicioBusqueda,								e.DiasInicioBusqueda,
														
				e.FechaReclutadorPendienteEntrevista,				e.DiasReclutadorPendienteEntrevista,
				e.FechaReclutadorPendientePreseleccionar,			e.DiasReclutadorPendientePreseleccionar,
				e.FechaReclutadorProcesoEvaluacion,					e.DiasReclutadorProcesoEvaluacion,
				e.FechaReclutadorExamenMedico,						e.DiasReclutadorExamenMedico,
				e.FechaReclutadorEstudioSeguridad,					e.DiasReclutadorEstudioSeguridad,
				e.FechaReclutadorPoligrafo,							e.DiasReclutadorPoligrafo,
														
				e.FechaCandidatoSeleccionado,						e.DiasCandidatoseleccionado,
				e.FechaCandidatoDevueltoASeleccion,					e.DiasCandidatoDevueltoASeleccion,
				e.FechaCandidatoSeleccionadoProcesoDevuelto,		e.DiasCandidatoSeleccionadoProcesoDevuelto,
				e.FechaCandidatoContratado,							e.DiasCandidatoContratado,
				e.FechaSolicitudRechazada,							e.DiasSolicitudRechazada,
				e.FechaSolicitudCancelada,							e.DiasSolicitudCancelada,
				e.FechaSolicitudCierreAutomatico,					e.DiasSolicitudCierreAutomatico,

				TotalDias = (DiasAutorizacionSalario +			DiasAutorizacionGerente +			DiasSolicitudRechazada +					DiasSolicitudCancelada +		
							 DiasInicioBusqueda +				DiasCandidatoseleccionado +			DiasCandidatoDevueltoASeleccion +			DiasCandidatoSeleccionadoProcesoDevuelto + 
							 DiasCandidatoContratado +			DiasSolicitudCierreAutomatico +		DiasReclutadorPendienteEntrevista +			DiasReclutadorPendientePreseleccionar + 
							 DiasReclutadorProcesoEvaluacion + 	DiasReclutadorEstudioSeguridad +	DiasReclutadorExamenMedico +				DiasReclutadorPoligrafo +
							 DiasProveedorAsociado),
	
				TiempoAreaSolicitante = (DiasAutorizacionSalario + DiasAutorizacionGerente + DiasSolicitudCierreAutomatico + DiasReclutadorPendienteEntrevista + DiasReclutadorPendientePreseleccionar
											+ DiasSolicitudCancelada+DiasSolicitudRechazada), 
				TiempoAreaGestionHumana=
					CASE WHEN (SP.Nit='8300049938') OR (N.Nit_Reclutador='8300049938')
						THEN ((DiasInicioBusqueda + DiasProveedorAsociado + DiasCandidatoSeleccionadoProcesoDevuelto + DiasReclutadorProcesoEvaluacion + DiasReclutadorEstudioSeguridad 
									+ DiasReclutadorExamenMedico + DiasReclutadorPoligrafo) - (DiasReclutadorPendienteEntrevista + DiasReclutadorPendientePreseleccionar))
						ELSE (DiasInicioBusqueda + DiasProveedorAsociado) END,
				
				TiempoAreaReclutador = 
					CASE WHEN (SP.Nit NOT IN ('8300049938', '0')) OR (N.Nit_Reclutador NOT IN ('8300049938', '0')) --Nits diferentes a Gestión Humana y 0
						THEN ((DiasCandidatoseleccionado + DiasCandidatoSeleccionadoProcesoDevuelto + DiasReclutadorProcesoEvaluacion + DiasReclutadorEstudioSeguridad 
									+ DiasReclutadorExamenMedico + DiasReclutadorPoligrafo))
						ELSE 0 END,

				TiempoAreaNomina = (DiasCandidatoContratado + DiasCandidatoDevueltoASeleccion)
			FROM
			(
				SELECT IdSolicitud,					CodigoCargo,					NombreCargo,					CodEmpresa,					CodigoUnidadNegocio,		
					CodCentro,						CodSeccion,						Seccion,						CodDepartamento,			FechaSolicitud,
					FechaAutorizacionSalario,						DiasAutorizacionSalario,
					FechaAceptadoGerente,							DiasAutorizacionGerente,
					FechaProveedorAsociado,							DiasProveedorAsociado,
					FechaInicioBusqueda,							DiasInicioBusqueda,

					FechaReclutadorPendienteEntrevista,				DiasReclutadorPendienteEntrevista,
					FechaReclutadorPendientePreseleccionar,			DiasReclutadorPendientePreseleccionar,
					FechaReclutadorProcesoEvaluacion,				DiasReclutadorProcesoEvaluacion,
					FechaReclutadorExamenMedico,					DiasReclutadorExamenMedico,
					FechaReclutadorEstudioSeguridad,				DiasReclutadorEstudioSeguridad,
					FechaReclutadorPoligrafo,						DiasReclutadorPoligrafo,

					FechaCandidatoSeleccionado,						DiasCandidatoseleccionado = CASE WHEN FechaCandidatoSeleccionado IS NOT NULL AND FechaCandidatoSeleccionado <> ''
																				THEN (DiasCandidatoseleccionado-(DiasReclutadorProcesoEvaluacion+DiasReclutadorExamenMedico+DiasReclutadorEstudioSeguridad+DiasReclutadorPoligrafo)) 
																				ELSE 0 END,

					FechaCandidatoDevueltoASeleccion,				DiasCandidatoDevueltoASeleccion,
					FechaCandidatoSeleccionadoProcesoDevuelto,		DiasCandidatoSeleccionadoProcesoDevuelto,
					FechaCandidatoContratado,						DiasCandidatoContratado = (DiasCandidatoContratado - (DiasCandidatoSeleccionadoProcesoDevuelto + DiasCandidatoDevueltoASeleccion)),
					FechaSolicitudRechazada,						DiasSolicitudRechazada,
					FechaSolicitudCancelada,						DiasSolicitudCancelada,
					FechaSolicitudCierreAutomatico,					DiasSolicitudCierreAutomatico
				FROM 
				(
					SELECT IdSolicitud,		CodigoCargo,	NombreCargo,	CodEmpresa,		CodigoUnidadNegocio,	CodCentro,		CodSeccion,		Seccion,	CodDepartamento,
						FechaSolicitud = ISNULL(CONVERT(varchar,FechaSolicitud,20),''),						FechaAutorizacionSalario=ISNULL(CONVERT(varchar,FechaAutorizacionSalario,20),''),
						FechaAceptadoGerente=ISNULL(CONVERT(varchar,FechaAceptadoGerente,20),''),			FechaSolicitudRechazada = ISNULL(CONVERT(varchar,FechaSolicitudRechazada,20),''),
						FechaSolicitudCancelada= ISNULL(CONVERT(varchar,FechaSolicitudCancelada,20),''),	FechaCandidatoSeleccionadoProcesoDevuelto=ISNULL(CONVERT(varchar,FechaCandidatoSeleccionadoProcesoDevuelto,20),''),	
						FechaCandidatoContratado=ISNULL(CONVERT(varchar,FechaCandidatoContratado,20),''),	FechaCandidatoSeleccionado=ISNULL(CONVERT(varchar,FechaCandidatoSeleccionado,20),''),
						FechaInicioBusqueda=ISNULL(CONVERT(varchar,FechaInicioBusqueda,20),''),				FechaCandidatoDevueltoASeleccion=ISNULL(CONVERT(varchar,FechaCandidatoDevueltoASeleccion,20),''),							
						FechaSolicitudCierreAutomatico=ISNULL(CONVERT(varchar,FechaSolicitudCierreAutomatico,20),''),		
						FechaProveedorAsociado=ISNULL(CONVERT(varchar,FechaProveedorAsociado,20),''),
		
						CASE WHEN ISNULL(DiasAutorizacionSalario,0) < 0 THEN 0 ELSE ISNULL(DiasAutorizacionSalario,0) END DiasAutorizacionSalario,
						CASE WHEN ISNULL(DiasAutorizacionGerente,0) < 0 THEN 0 ELSE ISNULL(DiasAutorizacionGerente,0) END DiasAutorizacionGerente,
						CASE WHEN ISNULL(DiasProveedorAsociado,0) < 0 THEN 0 ELSE ISNULL(DiasProveedorAsociado,0) END DiasProveedorAsociado,
						CASE WHEN ISNULL(DiasSolicitudRechazada,0) < 0 THEN 0 ELSE ISNULL(DiasSolicitudRechazada,0)  END DiasSolicitudRechazada,
						CASE WHEN ISNULL(DiasSolicitudCancelada,0) < 0 THEN 0 ELSE ISNULL(DiasSolicitudCancelada,0) END DiasSolicitudCancelada,
						CASE WHEN ISNULL(DiasInicioBusqueda,0)	< 0 THEN 0 ELSE ISNULL(DiasInicioBusqueda,0) END DiasInicioBusqueda,
						CASE WHEN ISNULL(DiasCandidatoseleccionado,0) < 0 THEN 0 ELSE ISNULL(DiasCandidatoseleccionado,0) END DiasCandidatoseleccionado,
						CASE WHEN ISNULL(DiasCandidatoDevueltoASeleccion,0) < 0 THEN 0 ELSE ISNULL(DiasCandidatoDevueltoASeleccion,0) END DiasCandidatoDevueltoASeleccion,
						CASE WHEN ISNULL(DiasCandidatoSeleccionadoProcesoDevuelto,0) < 0 THEN 0 ELSE ISNULL(DiasCandidatoSeleccionadoProcesoDevuelto,0) END DiasCandidatoSeleccionadoProcesoDevuelto,
						CASE WHEN ISNULL(DiasCandidatoContratado,0) < 0 THEN 0 ELSE ISNULL(DiasCandidatoContratado,0) END DiasCandidatoContratado,
						CASE WHEN ISNULL(DiasSolicitudCierreAutomatico,0) < 0 THEN 0 ELSE ISNULL(DiasSolicitudCierreAutomatico,0) END DiasSolicitudCierreAutomatico,


						FechaReclutadorPendienteEntrevista = ISNULL(CONVERT(varchar,RECLUTADOR.FechaReclutadorPendienteEntrevista,20),''),						
						FechaReclutadorPendientePreseleccionar = ISNULL(CONVERT(varchar,RECLUTADOR.FechaReclutadorPendientePreseleccionar,20),''),						
						FechaReclutadorProcesoEvaluacion = ISNULL(CONVERT(varchar,RECLUTADOR.FechaReclutadorProcesoEvaluacion,20),''),						
						FechaReclutadorExamenMedico = ISNULL(CONVERT(varchar,RECLUTADOR.FechaReclutadorExamenMedico,20),''),						
						FechaReclutadorEstudioSeguridad = ISNULL(CONVERT(varchar,RECLUTADOR.FechaReclutadorEstudioSeguridad,20),''),						
						FechaReclutadorPoligrafo = ISNULL(CONVERT(varchar,RECLUTADOR.FechaReclutadorPoligrafo,20),''),								
						FechaReclutadorSeleccionado = ISNULL(CONVERT(varchar,RECLUTADOR.FechaReclutadorSeleccionado,20),''),					

						CASE WHEN FechaInicioBusqueda = FechaReclutadorPendienteEntrevista THEN 0 
							ELSE (CASE WHEN ISNULL(DiasReclutadorPendienteEntrevista,0) < 0 THEN 0 ELSE ISNULL(DiasReclutadorPendienteEntrevista,0) END) END DiasReclutadorPendienteEntrevista,
						CASE WHEN ISNULL(DiasReclutadorPendientePreseleccionar,0) < 0 THEN 0 ELSE ISNULL(DiasReclutadorPendientePreseleccionar,0) END DiasReclutadorPendientePreseleccionar,
						CASE WHEN ISNULL(DiasReclutadorProcesoEvaluacion,0) < 0 THEN 0 ELSE ISNULL(DiasReclutadorProcesoEvaluacion,0) END DiasReclutadorProcesoEvaluacion,
						CASE WHEN ISNULL(DiasReclutadorExamenMedico,0) < 0 THEN 0 ELSE ISNULL(DiasReclutadorExamenMedico,0) END DiasReclutadorExamenMedico,
						CASE WHEN ISNULL(DiasReclutadorEstudioSeguridad,0) < 0 THEN 0 ELSE ISNULL(DiasReclutadorEstudioSeguridad,0) END DiasReclutadorEstudioSeguridad,
						CASE WHEN ISNULL(DiasReclutadorPoligrafo,0) < 0 THEN 0 ELSE ISNULL(DiasReclutadorPoligrafo,0) END DiasReclutadorPoligrafo,
						CASE WHEN ISNULL(DiasReclutadorSeleccionado,0) < 0 THEN 0 ELSE ISNULL(DiasReclutadorSeleccionado,0) END DiasReclutadorSeleccionado

					FROM 
					(
						SELECT IdSolicitud,CodigoCargo,NombreCargo,CodEmpresa,CodigoUnidadNegocio,CodCentro,CodSeccion,Seccion,CodDepartamento,
						FechaSolicitud,FechaAutorizacionSalario=FechaAceptadoGerenteUSC,
							DiasAutorizacionSalario= (DATEDIFF(DAY,ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario),FechaAceptadoGerenteUSC)
							- ((SELECT  
								(SUM(CASE WHEN F.DiaSemana = 6 THEN F.Cant ELSE 0 END) + SUM(CASE WHEN F.DiaSemana = 7 THEN F.Cant ELSE 0 END) + 
								(SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
								WHERE Fechafestivo >= ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario)
								AND Fechafestivo <= FechaAceptadoGerenteUSC)) AS DiasInhabiles
								FROM  (
									SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaAceptadoGerenteUSC)/7-DATEDIFF(DAY, -6, ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario))/7 AS Cant UNION
									SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaAceptadoGerenteUSC)/7-DATEDIFF(DAY, -5, ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario))/7 AS Cant UNION
									SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaAceptadoGerenteUSC)/7-DATEDIFF(DAY, -4, ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario))/7 AS Cant UNION
									SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaAceptadoGerenteUSC)/7-DATEDIFF(DAY, -3, ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario))/7 AS Cant UNION
									SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaAceptadoGerenteUSC)/7-DATEDIFF(DAY, -2, ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario))/7 AS Cant UNION
									SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaAceptadoGerenteUSC)/7-DATEDIFF(DAY, -1, ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario))/7 AS Cant UNION
									SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaAceptadoGerenteUSC)/7-DATEDIFF(DAY,  0, ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario))/7 AS Cant
								) F))),

							FechaAceptadoGerente=ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),
							DiasAutorizacionGerente=DATEDIFF(DAY,ISNULL(FechaAceptadoGerenteUSC,ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario)),ISNULL(fechaAceptadoGerente,FechaInicioBusqueda))
							-((SELECT  
								(SUM(CASE WHEN G.DiaSemana = 6 THEN G.Cant ELSE 0 END) + SUM(CASE WHEN G.DiaSemana = 7 THEN G.Cant ELSE 0 END) + 
								(SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
								WHERE Fechafestivo >= ISNULL(FechaAceptadoGerenteUSC,ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario))
								AND Fechafestivo <= FechaAceptadoGerenteUSC)) AS DiasInhabiles
								FROM  (
									SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, ISNULL(fechaAceptadoGerente,FechaInicioBusqueda))/7-DATEDIFF(DAY, -6, ISNULL(FechaAceptadoGerenteUSC,ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario)))/7 AS Cant UNION
									SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, ISNULL(fechaAceptadoGerente,FechaInicioBusqueda))/7-DATEDIFF(DAY, -5, ISNULL(FechaAceptadoGerenteUSC,ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario)))/7 AS Cant UNION
									SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, ISNULL(fechaAceptadoGerente,FechaInicioBusqueda))/7-DATEDIFF(DAY, -4, ISNULL(FechaAceptadoGerenteUSC,ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario)))/7 AS Cant UNION
									SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, ISNULL(fechaAceptadoGerente,FechaInicioBusqueda))/7-DATEDIFF(DAY, -3, ISNULL(FechaAceptadoGerenteUSC,ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario)))/7 AS Cant UNION
									SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, ISNULL(fechaAceptadoGerente,FechaInicioBusqueda))/7-DATEDIFF(DAY, -2,  ISNULL(FechaAceptadoGerenteUSC,ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario)))/7 AS Cant UNION
									SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, ISNULL(fechaAceptadoGerente,FechaInicioBusqueda))/7-DATEDIFF(DAY, -1, ISNULL(FechaAceptadoGerenteUSC,ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario)))/7 AS Cant UNION
									SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, ISNULL(fechaAceptadoGerente,FechaInicioBusqueda))/7-DATEDIFF(DAY,  0, ISNULL(FechaAceptadoGerenteUSC,ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario)))/7 AS Cant
								) G)),

							FechaSolicitudRechazada,
							DiasSolicitudRechazada=
							DATEDIFF(DAY,ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario),FechaSolicitudRechazada)
							-((SELECT  
								(SUM(CASE WHEN H.DiaSemana = 6 THEN H.Cant ELSE 0 END) + SUM(CASE WHEN H.DiaSemana = 7 THEN H.Cant ELSE 0 END) + 
								(SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
								WHERE Fechafestivo >= ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario)
								AND Fechafestivo <= ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario))) AS DiasInhabiles
								FROM  (
									SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaSolicitudRechazada)/7-DATEDIFF(DAY, -6, ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario))/7 AS Cant UNION
									SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaSolicitudRechazada)/7-DATEDIFF(DAY, -5, ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario))/7 AS Cant UNION
									SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaSolicitudRechazada)/7-DATEDIFF(DAY, -4, ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario))/7 AS Cant UNION
									SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaSolicitudRechazada)/7-DATEDIFF(DAY, -3, ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario))/7 AS Cant UNION
									SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaSolicitudRechazada)/7-DATEDIFF(DAY, -2, ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario))/7 AS Cant UNION
									SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaSolicitudRechazada)/7-DATEDIFF(DAY, -1, ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario))/7 AS Cant UNION
									SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaSolicitudRechazada)/7-DATEDIFF(DAY,  0, ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario))/7 AS Cant
								) H)),

							FechaSolicitudCancelada,
							DiasSolicitudCancelada=
							DATEDIFF(DAY,ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario)),FechaSolicitudCancelada)
							-((SELECT  
								(SUM(CASE WHEN I.DiaSemana = 6 THEN I.Cant ELSE 0 END) + SUM(CASE WHEN I.DiaSemana = 7 THEN I.Cant ELSE 0 END) + 
								(SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
								WHERE Fechafestivo >= ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario))
								AND Fechafestivo <= ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario)))) AS DiasInhabiles
								FROM  (
									SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaSolicitudCancelada)/7-DATEDIFF(DAY, -6, ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario)))/7 AS Cant UNION
									SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaSolicitudCancelada)/7-DATEDIFF(DAY, -5, ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario)))/7 AS Cant UNION
									SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaSolicitudCancelada)/7-DATEDIFF(DAY, -4, ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario)))/7 AS Cant UNION
									SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaSolicitudCancelada)/7-DATEDIFF(DAY, -3, ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario)))/7 AS Cant UNION
									SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaSolicitudCancelada)/7-DATEDIFF(DAY, -2, ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario)))/7 AS Cant UNION
									SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaSolicitudCancelada)/7-DATEDIFF(DAY, -1, ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario)))/7 AS Cant UNION
									SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaSolicitudCancelada)/7-DATEDIFF(DAY,  0, ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),ISNULL(FechaSolicitud,FechaPendienteAutorizacionSalario)))/7 AS Cant
								) I)),

							FechaProveedorAsociado = CASE WHEN FechaAceptadoGerente IS NOT NULL THEN FechaInicioBusqueda ELSE NULL END,
							DiasProveedorAsociado = CASE WHEN FechaAceptadoGerente IS NOT NULL THEN
								(DATEDIFF(DAY,FechaAceptadoGerente,FechaInicioBusqueda)
									-((SELECT (SUM(CASE WHEN J.DiaSemana = 6 THEN J.Cant ELSE 0 END) + SUM(CASE WHEN J.DiaSemana = 7 THEN J.Cant ELSE 0 END)
											+ (
												SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
												WHERE Fechafestivo >= FechaAceptadoGerente
												AND Fechafestivo <= FechaInicioBusqueda)
											) AS DiasInhabiles
										FROM  (
											SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaInicioBusqueda)/7-DATEDIFF(DAY, -6, FechaAceptadoGerente)/7 AS Cant UNION
											SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaInicioBusqueda)/7-DATEDIFF(DAY, -5, FechaAceptadoGerente)/7 AS Cant UNION
											SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaInicioBusqueda)/7-DATEDIFF(DAY, -4, FechaAceptadoGerente)/7 AS Cant UNION
											SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaInicioBusqueda)/7-DATEDIFF(DAY, -3, FechaAceptadoGerente)/7 AS Cant UNION
											SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaInicioBusqueda)/7-DATEDIFF(DAY, -2, FechaAceptadoGerente)/7 AS Cant UNION
											SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaInicioBusqueda)/7-DATEDIFF(DAY, -1, FechaAceptadoGerente)/7 AS Cant UNION
											SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaInicioBusqueda)/7-DATEDIFF(DAY,  0, FechaAceptadoGerente)/7 AS Cant
										) J))) ELSE NULL END,
								

							FechaInicioBusqueda,
							DiasInicioBusqueda =
								CASE WHEN FechaCandidatoSeleccionado IS NOT NULL THEN
									(DATEDIFF(DAY,FechaInicioBusqueda,FechaCandidatoSeleccionado)
										-((SELECT (SUM(CASE WHEN J.DiaSemana = 6 THEN J.Cant ELSE 0 END) + SUM(CASE WHEN J.DiaSemana = 7 THEN J.Cant ELSE 0 END)
												+ (
													SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
													WHERE Fechafestivo >= FechaInicioBusqueda
													AND Fechafestivo <= FechaCandidatoSeleccionado)
												) AS DiasInhabiles
											FROM  (
												SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaCandidatoSeleccionado)/7 - DATEDIFF(DAY, -6, FechaInicioBusqueda)/7 AS Cant UNION
												SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaCandidatoSeleccionado)/7 - DATEDIFF(DAY, -5, FechaInicioBusqueda)/7 AS Cant UNION
												SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaCandidatoSeleccionado)/7 - DATEDIFF(DAY, -4, FechaInicioBusqueda)/7 AS Cant UNION
												SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaCandidatoSeleccionado)/7 - DATEDIFF(DAY, -3, FechaInicioBusqueda)/7 AS Cant UNION
												SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaCandidatoSeleccionado)/7 - DATEDIFF(DAY, -2, FechaInicioBusqueda)/7 AS Cant UNION
												SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaCandidatoSeleccionado)/7 - DATEDIFF(DAY, -1, FechaInicioBusqueda)/7 AS Cant UNION
												SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaCandidatoSeleccionado)/7 - DATEDIFF(DAY,  0, FechaInicioBusqueda)/7 AS Cant
											) J)))
								ELSE (CASE WHEN FechaInicioBusqueda IS NOT NULL THEN 
										(DATEDIFF(DAY,FechaInicioBusqueda,GETDATE())
											- ((SELECT (SUM(CASE WHEN F.DiaSemana = 6 THEN F.Cant ELSE 0 END) + SUM(CASE WHEN F.DiaSemana = 7 THEN F.Cant ELSE 0 END)
													+ (
														SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
														WHERE Fechafestivo >= FechaInicioBusqueda
														AND Fechafestivo <= GETDATE())
													) AS DiasInhabiles
												FROM  (
													SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, GETDATE())/7-DATEDIFF(DAY, -6, FechaInicioBusqueda)/7 AS Cant UNION
													SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, GETDATE())/7-DATEDIFF(DAY, -5, FechaInicioBusqueda)/7 AS Cant UNION
													SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, GETDATE())/7-DATEDIFF(DAY, -4, FechaInicioBusqueda)/7 AS Cant UNION
													SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, GETDATE())/7-DATEDIFF(DAY, -3, FechaInicioBusqueda)/7 AS Cant UNION
													SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, GETDATE())/7-DATEDIFF(DAY, -2, FechaInicioBusqueda)/7 AS Cant UNION
													SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, GETDATE())/7-DATEDIFF(DAY, -1, FechaInicioBusqueda)/7 AS Cant UNION									
													SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, GETDATE())/7-DATEDIFF(DAY,  0, FechaInicioBusqueda)/7 AS Cant
												) F)))
											 END) END,
							

							FechaCandidatoSeleccionado,
							DiasCandidatoseleccionado =
								(DATEDIFF(DAY,FechaInicioBusqueda,FechaCandidatoSeleccionado)
									- ((SELECT (SUM(CASE WHEN F.DiaSemana = 6 THEN F.Cant ELSE 0 END) + SUM(CASE WHEN F.DiaSemana = 7 THEN F.Cant ELSE 0 END)
											+ (
												SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
												WHERE Fechafestivo >= FechaInicioBusqueda
												AND Fechafestivo <= FechaCandidatoSeleccionado)
											) AS DiasInhabiles
										FROM  (
											SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaCandidatoSeleccionado)/7-DATEDIFF(DAY, -6, FechaInicioBusqueda)/7 AS Cant UNION
											SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaCandidatoSeleccionado)/7-DATEDIFF(DAY, -5, FechaInicioBusqueda)/7 AS Cant UNION
											SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaCandidatoSeleccionado)/7-DATEDIFF(DAY, -4, FechaInicioBusqueda)/7 AS Cant UNION
											SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaCandidatoSeleccionado)/7-DATEDIFF(DAY, -3, FechaInicioBusqueda)/7 AS Cant UNION
											SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaCandidatoSeleccionado)/7-DATEDIFF(DAY, -2, FechaInicioBusqueda)/7 AS Cant UNION
											SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaCandidatoSeleccionado)/7-DATEDIFF(DAY, -1, FechaInicioBusqueda)/7 AS Cant UNION									
											SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaCandidatoSeleccionado)/7-DATEDIFF(DAY,  0, FechaInicioBusqueda)/7 AS Cant
										) F))),


									
							FechaCandidatoDevueltoASeleccion,
							DiasCandidatoDevueltoASeleccion=DATEDIFF(DAY,FechaCandidatoSeleccionado,FechaCandidatoDevueltoASeleccion)
							-((SELECT  
								(SUM(CASE WHEN L.DiaSemana = 6 THEN L.Cant ELSE 0 END) + SUM(CASE WHEN L.DiaSemana = 7 THEN L.Cant ELSE 0 END) + 
								(SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
								WHERE Fechafestivo >= FechaCandidatoSeleccionado
								AND Fechafestivo <= FechaCandidatoSeleccionado)) AS DiasInhabiles
								FROM  (
									SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaCandidatoDevueltoASeleccion)/7-DATEDIFF(DAY, -6, FechaCandidatoSeleccionado)/7 AS Cant UNION
									SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaCandidatoDevueltoASeleccion)/7-DATEDIFF(DAY, -5, FechaCandidatoSeleccionado)/7 AS Cant UNION
									SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaCandidatoDevueltoASeleccion)/7-DATEDIFF(DAY, -4, FechaCandidatoSeleccionado)/7 AS Cant UNION
									SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaCandidatoDevueltoASeleccion)/7-DATEDIFF(DAY, -3, FechaCandidatoSeleccionado)/7 AS Cant UNION
									SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaCandidatoDevueltoASeleccion)/7-DATEDIFF(DAY, -2, FechaCandidatoSeleccionado)/7 AS Cant UNION
									SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaCandidatoDevueltoASeleccion)/7-DATEDIFF(DAY, -1, FechaCandidatoSeleccionado)/7 AS Cant UNION
									SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaCandidatoDevueltoASeleccion)/7-DATEDIFF(DAY,  0, FechaCandidatoSeleccionado)/7 AS Cant
								) L)),


							--Aparece resultado cuando la solicitud paso por el estado 11 (Devuelto a selección)
							FechaCandidatoSeleccionadoProcesoDevuelto, 
							DiasCandidatoSeleccionadoProcesoDevuelto=DATEDIFF(DAY,FechaCandidatoDevueltoASeleccion,FechaCandidatoSeleccionadoProcesoDevuelto)
							-((SELECT  
								(SUM(CASE WHEN K.DiaSemana = 6 THEN K.Cant ELSE 0 END) + SUM(CASE WHEN K.DiaSemana = 7 THEN K.Cant ELSE 0 END) + 
								(SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
								WHERE Fechafestivo >= FechaCandidatoDevueltoASeleccion
								AND Fechafestivo <= FechaCandidatoDevueltoASeleccion)) AS DiasInhabiles
								FROM  (
									SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaCandidatoSeleccionadoProcesoDevuelto)/7-DATEDIFF(DAY, -6, FechaCandidatoDevueltoASeleccion)/7 AS Cant UNION
									SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaCandidatoSeleccionadoProcesoDevuelto)/7-DATEDIFF(DAY, -5, FechaCandidatoDevueltoASeleccion)/7 AS Cant UNION
									SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaCandidatoSeleccionadoProcesoDevuelto)/7-DATEDIFF(DAY, -4, FechaCandidatoDevueltoASeleccion)/7 AS Cant UNION
									SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaCandidatoSeleccionadoProcesoDevuelto)/7-DATEDIFF(DAY, -3, FechaCandidatoDevueltoASeleccion)/7 AS Cant UNION
									SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaCandidatoSeleccionadoProcesoDevuelto)/7-DATEDIFF(DAY, -2, FechaCandidatoDevueltoASeleccion)/7 AS Cant UNION
									SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaCandidatoSeleccionadoProcesoDevuelto)/7-DATEDIFF(DAY, -1, FechaCandidatoDevueltoASeleccion)/7 AS Cant UNION
									SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaCandidatoSeleccionadoProcesoDevuelto)/7-DATEDIFF(DAY,  0, FechaCandidatoDevueltoASeleccion)/7 AS Cant
								) K)),
									   

							FechaCandidatoContratado,
							DiasCandidatoContratado=DATEDIFF(DAY,FechaCandidatoSeleccionado,FechaCandidatoContratado)
							-((SELECT  
								(SUM(CASE WHEN L.DiaSemana = 6 THEN L.Cant ELSE 0 END) + SUM(CASE WHEN L.DiaSemana = 7 THEN L.Cant ELSE 0 END) + 
								(SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
								WHERE Fechafestivo >= FechaCandidatoSeleccionado
								AND Fechafestivo <= FechaCandidatoSeleccionado)) AS DiasInhabiles
								FROM  (
									SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaCandidatoContratado)/7-DATEDIFF(DAY, -6, FechaCandidatoSeleccionado)/7 AS Cant UNION
									SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaCandidatoContratado)/7-DATEDIFF(DAY, -5, FechaCandidatoSeleccionado)/7 AS Cant UNION
									SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaCandidatoContratado)/7-DATEDIFF(DAY, -4, FechaCandidatoSeleccionado)/7 AS Cant UNION
									SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaCandidatoContratado)/7-DATEDIFF(DAY, -3, FechaCandidatoSeleccionado)/7 AS Cant UNION
									SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaCandidatoContratado)/7-DATEDIFF(DAY, -2, FechaCandidatoSeleccionado)/7 AS Cant UNION
									SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaCandidatoContratado)/7-DATEDIFF(DAY, -1, FechaCandidatoSeleccionado)/7 AS Cant UNION
									SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaCandidatoContratado)/7-DATEDIFF(DAY,  0, FechaCandidatoSeleccionado)/7 AS Cant
								) L)),


							FechaSolicitudCierreAutomatico,
							DiasSolicitudCierreAutomatico=
							DATEDIFF(DAY,ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),FechaSolicitud),FechaSolicitudCierreAutomatico)
							-((SELECT  
								(SUM(CASE WHEN I.DiaSemana = 6 THEN I.Cant ELSE 0 END) + SUM(CASE WHEN I.DiaSemana = 7 THEN I.Cant ELSE 0 END) + 
								(SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
								WHERE Fechafestivo >= ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),FechaSolicitud)
								AND Fechafestivo <= ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),FechaSolicitud))) AS DiasInhabiles
								FROM  (
									SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaSolicitudCierreAutomatico)/7-DATEDIFF(DAY, -6, ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),FechaSolicitud))/7 AS Cant UNION
									SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaSolicitudCierreAutomatico)/7-DATEDIFF(DAY, -5, ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),FechaSolicitud))/7 AS Cant UNION
									SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaSolicitudCierreAutomatico)/7-DATEDIFF(DAY, -4, ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),FechaSolicitud))/7 AS Cant UNION
									SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaSolicitudCierreAutomatico)/7-DATEDIFF(DAY, -3, ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),FechaSolicitud))/7 AS Cant UNION
									SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaSolicitudCierreAutomatico)/7-DATEDIFF(DAY, -2, ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),FechaSolicitud))/7 AS Cant UNION
									SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaSolicitudCierreAutomatico)/7-DATEDIFF(DAY, -1, ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),FechaSolicitud))/7 AS Cant UNION
									SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaSolicitudCierreAutomatico)/7-DATEDIFF(DAY,  0, ISNULL(ISNULL(FechaAceptadoGerente,FechaInicioBusqueda),FechaSolicitud))/7 AS Cant
								) I))


						FROM
						(
							SELECT 
								IdSolicitud,						CodigoCargo,						NombreCargo,				CodEmpresa,				CodigoUnidadNegocio,			CodCentro,
								CodSeccion,							Seccion,							CodDepartamento,			FechaSolicitud,			FechaAceptadoGerente,			FechaPendienteAutorizacionSalario,
								FechaAceptadoGerenteUSC,			FechaSolicitudRechazada,			FechaSolicitudCancelada,	FechaInicioBusqueda,	FechaCandidatoSeleccionado,		FechaCandidatoContratado,
								FechaCandidatoDevueltoASeleccion,	FechaSolicitudCierreAutomatico,
								CASE WHEN FechaCandidatoDevueltoASeleccion IS NOT NULL 
										THEN (SELECT DISTINCT DC.FechaModificacion FROM Requisiciones_HistoricoSolicitud DC
												WHERE DC.IdSolicitud = A.IdSolicitud AND DC.IdEstado = 3 AND DC.FechaModificacion >= A.FechaCandidatoDevueltoASeleccion) 
										END FechaCandidatoSeleccionadoProcesoDevuelto
							FROM 
							(
								SELECT 
									IdSolicitud,												CodigoCargo,													NombreCargo,							
									CodEmpresa,													CodigoUnidadNegocio,											CodCentro,								
									CodSeccion,													Seccion,														CodDepartamento,
									FechaSolicitud=MAX(FechaSolicitud),							FechaAceptadoGerente=MAX(FechaAceptadoGerente),					FechaPendienteAutorizacionSalario=MAX(FechaPendienteAutorizacionSalario),
									FechaAceptadoGerenteUSC=MAX(FechaAceptadoGerenteUSC),		FechaSolicitudRechazada=MAX(FechaSolicitudRechazada),			FechaSolicitudCierreAutomatico=MAX(FechaSolicitudCierreAutomatico),
									FechaInicioBusqueda=MAX(FechaInicioBusqueda),				FechaCandidatoSeleccionado=MIN(FechaCandidatoSeleccionado),		FechaCandidatoDevueltoASeleccion=MAX(FechaCandidatoDevueltoASeleccion),
									FechaCandidatoContratado=MAX(FechaCandidatoContratado),		FechaSolicitudCancelada=MAX(FechaSolicitudCancelada)
								FROM
								(	
									SELECT h.IdSolicitud,s.CodigoCargo,c.NombreCargo,s.CodigoUnidadNegocio, s.CodEmpresa, s.CodCentro, s.CodSeccion,S.Seccion,s.CodDepartamento, 
										(S.FechaCreacion)FechaSolicitud,
										CASE WHEN h.IdEstado = 2 THEN h.FechaModificacion  END FechaInicioBusqueda,
										CASE WHEN h.IdEstado = 3 THEN h.FechaModificacion  END FechaCandidatoSeleccionado,
										CASE WHEN h.IdEstado = 4 THEN h.FechaModificacion  END FechaAceptadoGerenteUSC,
										CASE WHEN h.IdEstado = 5 THEN h.FechaModificacion  END FechaAceptadoGerente,
										CASE WHEN h.IdEstado = 7 THEN h.FechaModificacion  END FechaCandidatoContratado,
										CASE WHEN h.IdEstado = 8 THEN h.FechaModificacion  END FechaSolicitudRechazada,
										CASE WHEN h.IdEstado = 9 THEN h.FechaModificacion  END FechaSolicitudCancelada,
										CASE WHEN h.IdEstado = 10 THEN h.FechaModificacion END FechaPendienteAutorizacionSalario,
										CASE WHEN h.IdEstado = 11 THEN H.FechaModificacion END FechaCandidatoDevueltoASeleccion,
										CASE WHEN h.IdEstado = 12 THEN H.FechaModificacion END FechaSolicitudCierreAutomatico
									FROM		Requisiciones_HistoricoSolicitud	h
									left join	Requisiciones_Estados				e	on	h.IdEstado = e.IdEstado
									left join	Requisiciones_Solicitudes			s	on	h.IdSolicitud = s.IdSolicitud	
									left join	Cargos								c	on	s.CodigoCargo = c.CodigoCargo
								)a 
								--WHERE IdSolicitud BETWEEN 7200 AND 7208
								GROUP BY IdSolicitud,CodigoCargo,NombreCargo,CodEmpresa,CodigoUnidadNegocio,CodCentro,CodSeccion,Seccion,CodDepartamento
							)A
						)b 
					) c 

					LEFT JOIN 
					(
						SELECT	(Solicitud.IdSolicitud)IdSolicitud_R,											CONVERT(DATE,Solicitud.FechaCreacion)FechaCreacion,		
								FechaReclutadorPendienteEntrevista,				
								DiasReclutadorPendienteEntrevista=
												DATEDIFF(DAY,CONVERT(DATE,Solicitud.FechaCreacion),FechaReclutadorPendienteEntrevista)
												-((SELECT  
													(SUM(CASE WHEN H.DiaSemana = 6 THEN H.Cant ELSE 0 END) + SUM(CASE WHEN H.DiaSemana = 7 THEN H.Cant ELSE 0 END) + 
													(SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
													WHERE Fechafestivo >= FechaCreacion
													AND Fechafestivo <= FechaCreacion)) AS DiasInhabiles
													FROM  (
														SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaReclutadorPendienteEntrevista)/7-DATEDIFF(DAY, -6, FechaCreacion)/7 AS Cant UNION
														SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaReclutadorPendienteEntrevista)/7-DATEDIFF(DAY, -5, FechaCreacion)/7 AS Cant UNION
														SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaReclutadorPendienteEntrevista)/7-DATEDIFF(DAY, -4, FechaCreacion)/7 AS Cant UNION
														SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaReclutadorPendienteEntrevista)/7-DATEDIFF(DAY, -3, FechaCreacion)/7 AS Cant UNION
														SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaReclutadorPendienteEntrevista)/7-DATEDIFF(DAY, -2, FechaCreacion)/7 AS Cant UNION
														SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaReclutadorPendienteEntrevista)/7-DATEDIFF(DAY, -1, FechaCreacion)/7 AS Cant UNION
														SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaReclutadorPendienteEntrevista)/7-DATEDIFF(DAY,  0, FechaCreacion)/7 AS Cant
													) H)),

								FechaReclutadorPendientePreseleccionar,					
								DiasReclutadorPendientePreseleccionar=
												DATEDIFF(DAY,FechaReclutadorPendienteEntrevista,FechaReclutadorPendientePreseleccionar)
												-((SELECT  
													(SUM(CASE WHEN H.DiaSemana = 6 THEN H.Cant ELSE 0 END) + SUM(CASE WHEN H.DiaSemana = 7 THEN H.Cant ELSE 0 END) + 
													(SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
													WHERE Fechafestivo >= FechaReclutadorPendienteEntrevista
													AND Fechafestivo <= FechaReclutadorPendienteEntrevista)) AS DiasInhabiles
													FROM  (
														SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaReclutadorPendientePreseleccionar)/7-DATEDIFF(DAY, -6, FechaReclutadorPendienteEntrevista)/7 AS Cant UNION
														SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaReclutadorPendientePreseleccionar)/7-DATEDIFF(DAY, -5, FechaReclutadorPendienteEntrevista)/7 AS Cant UNION
														SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaReclutadorPendientePreseleccionar)/7-DATEDIFF(DAY, -4, FechaReclutadorPendienteEntrevista)/7 AS Cant UNION
														SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaReclutadorPendientePreseleccionar)/7-DATEDIFF(DAY, -3, FechaReclutadorPendienteEntrevista)/7 AS Cant UNION
														SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaReclutadorPendientePreseleccionar)/7-DATEDIFF(DAY, -2, FechaReclutadorPendienteEntrevista)/7 AS Cant UNION
														SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaReclutadorPendientePreseleccionar)/7-DATEDIFF(DAY, -1, FechaReclutadorPendienteEntrevista)/7 AS Cant UNION
														SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaReclutadorPendientePreseleccionar)/7-DATEDIFF(DAY,  0, FechaReclutadorPendienteEntrevista)/7 AS Cant
													) H)),	
		

								FechaReclutadorProcesoEvaluacion,				
								DiasReclutadorProcesoEvaluacion=
												DATEDIFF(DAY,FechaReclutadorPendientePreseleccionar,FechaReclutadorProcesoEvaluacion)
												-((SELECT  
													(SUM(CASE WHEN H.DiaSemana = 6 THEN H.Cant ELSE 0 END) + SUM(CASE WHEN H.DiaSemana = 7 THEN H.Cant ELSE 0 END) + 
													(SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
													WHERE Fechafestivo >= FechaReclutadorPendientePreseleccionar
													AND Fechafestivo <= FechaReclutadorPendientePreseleccionar)) AS DiasInhabiles
													FROM  (
														SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaReclutadorProcesoEvaluacion)/7-DATEDIFF(DAY, -6, FechaReclutadorPendientePreseleccionar)/7 AS Cant UNION
														SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaReclutadorProcesoEvaluacion)/7-DATEDIFF(DAY, -5, FechaReclutadorPendientePreseleccionar)/7 AS Cant UNION
														SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaReclutadorProcesoEvaluacion)/7-DATEDIFF(DAY, -4, FechaReclutadorPendientePreseleccionar)/7 AS Cant UNION
														SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaReclutadorProcesoEvaluacion)/7-DATEDIFF(DAY, -3, FechaReclutadorPendientePreseleccionar)/7 AS Cant UNION
														SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaReclutadorProcesoEvaluacion)/7-DATEDIFF(DAY, -2, FechaReclutadorPendientePreseleccionar)/7 AS Cant UNION
														SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaReclutadorProcesoEvaluacion)/7-DATEDIFF(DAY, -1, FechaReclutadorPendientePreseleccionar)/7 AS Cant UNION
														SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaReclutadorProcesoEvaluacion)/7-DATEDIFF(DAY,  0, FechaReclutadorPendientePreseleccionar)/7 AS Cant
													) H)),			
		

								FechaReclutadorExamenMedico,				
								DiasReclutadorExamenMedico=
												DATEDIFF(DAY,FechaReclutadorCalculoExamenMedico,FechaReclutadorExamenMedico)
												-((SELECT  
													(SUM(CASE WHEN H.DiaSemana = 6 THEN H.Cant ELSE 0 END) + SUM(CASE WHEN H.DiaSemana = 7 THEN H.Cant ELSE 0 END) + 
													(SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
													WHERE Fechafestivo >= FechaReclutadorProcesoEvaluacion
													AND Fechafestivo <= FechaReclutadorProcesoEvaluacion)) AS DiasInhabiles
													FROM  (
														SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaReclutadorExamenMedico)/7-DATEDIFF(DAY, -6, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaReclutadorExamenMedico)/7-DATEDIFF(DAY, -5, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaReclutadorExamenMedico)/7-DATEDIFF(DAY, -4, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaReclutadorExamenMedico)/7-DATEDIFF(DAY, -3, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaReclutadorExamenMedico)/7-DATEDIFF(DAY, -2, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaReclutadorExamenMedico)/7-DATEDIFF(DAY, -1, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaReclutadorExamenMedico)/7-DATEDIFF(DAY,  0, FechaReclutadorProcesoEvaluacion)/7 AS Cant
													) H)),				
		

								FechaReclutadorEstudioSeguridad,				
								DiasReclutadorEstudioSeguridad=
												DATEDIFF(DAY,FechaReclutadorCalculoEstudioSeguridad,FechaReclutadorEstudioSeguridad)
												-((SELECT  
													(SUM(CASE WHEN H.DiaSemana = 6 THEN H.Cant ELSE 0 END) + SUM(CASE WHEN H.DiaSemana = 7 THEN H.Cant ELSE 0 END) + 
													(SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
													WHERE Fechafestivo >= FechaReclutadorProcesoEvaluacion
													AND Fechafestivo <= FechaReclutadorProcesoEvaluacion)) AS DiasInhabiles
													FROM  (
														SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaReclutadorEstudioSeguridad)/7-DATEDIFF(DAY, -6, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaReclutadorEstudioSeguridad)/7-DATEDIFF(DAY, -5, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaReclutadorEstudioSeguridad)/7-DATEDIFF(DAY, -4, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaReclutadorEstudioSeguridad)/7-DATEDIFF(DAY, -3, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaReclutadorEstudioSeguridad)/7-DATEDIFF(DAY, -2, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaReclutadorEstudioSeguridad)/7-DATEDIFF(DAY, -1, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaReclutadorEstudioSeguridad)/7-DATEDIFF(DAY,  0, FechaReclutadorProcesoEvaluacion)/7 AS Cant
													) H)),
							
		
								FechaReclutadorPoligrafo,			
								DiasReclutadorPoligrafo=
												DATEDIFF(DAY,FechaReclutadorCalculoPoligrafo,FechaReclutadorPoligrafo)
												-((SELECT  
													(SUM(CASE WHEN H.DiaSemana = 6 THEN H.Cant ELSE 0 END) + SUM(CASE WHEN H.DiaSemana = 7 THEN H.Cant ELSE 0 END) + 
													(SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
													WHERE Fechafestivo >= FechaReclutadorProcesoEvaluacion
													AND Fechafestivo <= FechaReclutadorProcesoEvaluacion)) AS DiasInhabiles
													FROM  (
														SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaReclutadorPoligrafo)/7-DATEDIFF(DAY, -6, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaReclutadorPoligrafo)/7-DATEDIFF(DAY, -5, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaReclutadorPoligrafo)/7-DATEDIFF(DAY, -4, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaReclutadorPoligrafo)/7-DATEDIFF(DAY, -3, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaReclutadorPoligrafo)/7-DATEDIFF(DAY, -2, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaReclutadorPoligrafo)/7-DATEDIFF(DAY, -1, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaReclutadorPoligrafo)/7-DATEDIFF(DAY,  0, FechaReclutadorProcesoEvaluacion)/7 AS Cant
													) H)),				
		

								FechaReclutadorSeleccionado,			
								DiasReclutadorSeleccionado=
												DATEDIFF(DAY,FechaReclutadorProcesoEvaluacion,FechaReclutadorSeleccionado)
												-((SELECT  
													(SUM(CASE WHEN H.DiaSemana = 6 THEN H.Cant ELSE 0 END) + SUM(CASE WHEN H.DiaSemana = 7 THEN H.Cant ELSE 0 END) + 
													(SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos 
													WHERE Fechafestivo >= FechaReclutadorProcesoEvaluacion
													AND Fechafestivo <= FechaReclutadorProcesoEvaluacion)) AS DiasInhabiles
													FROM  (
														SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaReclutadorSeleccionado)/7-DATEDIFF(DAY, -6, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaReclutadorSeleccionado)/7-DATEDIFF(DAY, -5, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaReclutadorSeleccionado)/7-DATEDIFF(DAY, -4, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaReclutadorSeleccionado)/7-DATEDIFF(DAY, -3, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaReclutadorSeleccionado)/7-DATEDIFF(DAY, -2, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaReclutadorSeleccionado)/7-DATEDIFF(DAY, -1, FechaReclutadorProcesoEvaluacion)/7 AS Cant UNION
														SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaReclutadorSeleccionado)/7-DATEDIFF(DAY,  0, FechaReclutadorProcesoEvaluacion)/7 AS Cant
													) H))
		
		
						FROM Requisiciones_Solicitudes AS Solicitud

						LEFT JOIN 
						(
							SELECT	
								A.IdSolicitud,											CedulaCandidato,															
								FechaReclutadorProcesoEvaluacion,						FechaReclutadorPoligrafo,								FechaReclutadorExamenMedico,							
								FechaReclutadorEstudioSeguridad,						FechaReclutadorSeleccionado,							FechaReclutadorCalculoPoligrafo,						
								FechaReclutadorCalculoExamenMedico,						FechaReclutadorCalculoEstudioSeguridad,

								CASE WHEN Historico.FechaModificacion IS NOT NULL 
									THEN (CASE WHEN Historico.FechaModificacion > FechaReclutadorPendienteEntrevista 
											THEN Historico.FechaModificacion 
											ELSE FechaReclutadorPendienteEntrevista 
											END)
									ELSE NULL END AS FechaReclutadorPendienteEntrevista,

								CASE WHEN Historico.FechaModificacion IS NOT NULL 
									THEN (CASE WHEN Historico.FechaModificacion > FechaReclutadorPendientePreseleccionar 
											THEN Historico.FechaModificacion 
											ELSE FechaReclutadorPendientePreseleccionar END)
									ELSE NULL END AS FechaReclutadorPendientePreseleccionar
							FROM 
							(
								SELECT A.IdSolicitud,																		CedulaCandidato,														
									MAX(FechaReclutadorPendienteEntrevista)FechaReclutadorPendienteEntrevista,				MAX(FechaReclutadorPendientePreseleccionar)FechaReclutadorPendientePreseleccionar,
									MAX(FechaReclutadorProcesoEvaluacion)FechaReclutadorProcesoEvaluacion,					MAX(FechaReclutadorPoligrafo)FechaReclutadorPoligrafo,											
									MAX(FechaReclutadorExamenMedico)FechaReclutadorExamenMedico,							MAX(FechaReclutadorEstudioSeguridad)FechaReclutadorEstudioSeguridad,							
									MAX(FechaReclutadorSeleccionado)FechaReclutadorSeleccionado,							MAX(FechaReclutadorCalculoPoligrafo)FechaReclutadorCalculoPoligrafo,
									MAX(FechaReclutadorCalculoExamenMedico)FechaReclutadorCalculoExamenMedico,				MAX(FechaReclutadorCalculoEstudioSeguridad)FechaReclutadorCalculoEstudioSeguridad
								FROM
								(
									SELECT DISTINCT S.IdSolicitud,		S.CedulaCandidato,		HR.IdHistorico,
										CASE WHEN HR.IdEstadoReclutador = 1  THEN CONVERT(DATE,HR.FechaModificacion) END AS FechaReclutadorPendienteEntrevista,  --PENDIENTE ENTREVISTA
										CASE WHEN HR.IdEstadoReclutador = 2  THEN CONVERT(DATE,HR.FechaModificacion) END AS FechaReclutadorPendientePreseleccionar,  --PENDIENTE PRESELECCIONAR
										CASE WHEN HR.IdEstadoReclutador = 3  THEN CONVERT(DATE,HR.FechaModificacion) END AS FechaReclutadorProcesoEvaluacion,  --PROCESO DE EVALUACIÓN
										CASE WHEN HR.IdEstadoReclutador = 4  THEN CONVERT(DATE,HR.FechaModificacion) END AS FechaReclutadorPoligrafo,  --POLIGRAFO	
										CASE WHEN HR.IdEstadoReclutador = 5  THEN CONVERT(DATE,HR.FechaModificacion) END AS FechaReclutadorExamenMedico,  --EXAMEN MEDICO
										CASE WHEN HR.IdEstadoReclutador = 6  THEN CONVERT(DATE,HR.FechaModificacion) END AS FechaReclutadorEstudioSeguridad,  --ESTUDIO SEGURIDAD
										CASE WHEN HR.IdEstadoReclutador = 7  THEN CONVERT(DATE,HR.FechaModificacion) END AS FechaReclutadorSeleccionado,  --CANDIDATO SELECCIONADO

										CASE WHEN HR.IdEstadoReclutador = 4  THEN 
										(
											SELECT TOP 1 CONVERT(DATE,A.FechaModificacion)  
											FROM
											(
												SELECT orden = ROW_NUMBER() over(partition by cedulacandidato  order by fechamodificacion asc),
      													HR.IdHistorico, HR.IdSolicitud, HR.CedulaCandidato, HR.IdEstadoReclutador, ER.Estado, HR.FechaModificacion
												FROM Requisiciones_HistoricoReclutador HR 
												LEFT JOIN Requisiciones_EstadosReclutador ER ON ER.IdEstado = HR.IdEstadoReclutador 
												WHERE HR.IdEstadoReclutador in (3,4,5,6) 
											) A
											WHERE HR.CedulaCandidato = A.CedulaCandidato AND HR.IdSolicitud = A.IdSolicitud AND A.orden = (HO.orden - 1) 
										)
										END AS FechaReclutadorCalculoPoligrafo,  --CALCULO POLIGRAFO
	
										CASE WHEN HR.IdEstadoReclutador = 5  THEN 
										(
											SELECT TOP 1 CONVERT(DATE,A.FechaModificacion)  
											FROM
											(
												SELECT orden = ROW_NUMBER() over(partition by cedulacandidato  order by fechamodificacion asc),
      													HR.IdHistorico, HR.IdSolicitud, HR.CedulaCandidato, HR.IdEstadoReclutador, ER.Estado, HR.FechaModificacion
												FROM Requisiciones_HistoricoReclutador HR 
												LEFT JOIN Requisiciones_EstadosReclutador ER ON ER.IdEstado = HR.IdEstadoReclutador 
												WHERE HR.IdEstadoReclutador in (3,4,5,6) 
											) A
											WHERE HR.CedulaCandidato = A.CedulaCandidato AND HR.IdSolicitud = A.IdSolicitud AND A.orden = (HO.orden - 1) 
										)
										END AS FechaReclutadorCalculoExamenMedico,  --CALCULO EXAMEN MEDICO

										CASE WHEN HR.IdEstadoReclutador = 6  THEN 
										(
											SELECT TOP 1 CONVERT(DATE,A.FechaModificacion)  
											FROM
											(
												SELECT orden = ROW_NUMBER() over(partition by cedulacandidato  order by fechamodificacion asc),
      													HR.IdHistorico, HR.IdSolicitud, HR.CedulaCandidato, HR.IdEstadoReclutador, ER.Estado, HR.FechaModificacion
												FROM Requisiciones_HistoricoReclutador HR 
												LEFT JOIN Requisiciones_EstadosReclutador ER ON ER.IdEstado = HR.IdEstadoReclutador 
												WHERE HR.IdEstadoReclutador in (3,4,5,6) 
											) A
											WHERE HR.CedulaCandidato = A.CedulaCandidato AND HR.IdSolicitud = A.IdSolicitud AND A.orden = (HO.orden - 1) 
										)
										END AS FechaReclutadorCalculoEstudioSeguridad  --CALCULO ESTUDIO SEGURIDAD

									FROM
									(
										SELECT S.IdSolicitud,
										(
											SELECT TOP (1) CedulaCandidato
											FROM
											(
												SELECT DISTINCT IdSolicitud, HR.CedulaCandidato,
													CASE WHEN HR.IdEstadoReclutador = 3 THEN 1 --PROCESO DE EVALUACIÓN
															WHEN HR.IdEstadoReclutador = 4 THEN 2 --POLIGRAFO
															WHEN HR.IdEstadoReclutador = 5 THEN 3 --EXAMEN MEDICO
															WHEN HR.IdEstadoReclutador = 6 THEN 4 --ESTUDIO SEGURIDAD
															WHEN HR.IdEstadoReclutador = 7 THEN 5 --CANDIDATO SELECCIONADO
															WHEN HR.IdEstadoReclutador = 2 THEN 6 --PENDIENTE PRESELECCIONAR
															WHEN HR.IdEstadoReclutador = 1 THEN 7 --PENDIENTE ENTREVISTA
															ELSE 99 END Proceso 
												FROM Requisiciones_HistoricoReclutador HR	
											) A
											WHERE A.IdSolicitud = S.IdSolicitud 
											ORDER BY Proceso ASC
										) CedulaCandidato
										FROM Requisiciones_Solicitudes S
									) S
									LEFT JOIN Requisiciones_HistoricoReclutador HR ON HR.IdSolicitud = S.IdSolicitud AND S.CedulaCandidato = HR.CedulaCandidato
									LEFT JOIN 
									(
										SELECT orden = ROW_NUMBER() over(partition by cedulacandidato  order by fechamodificacion asc),
      											HR.IdHistorico, HR.IdSolicitud, HR.CedulaCandidato, HR.IdEstadoReclutador, ER.Estado, HR.FechaModificacion
										FROM Requisiciones_HistoricoReclutador HR 
										LEFT JOIN Requisiciones_EstadosReclutador ER ON ER.IdEstado = HR.IdEstadoReclutador 
										WHERE HR.IdEstadoReclutador in (3,4,5,6) 	  
									) HO ON S.IdSolicitud = HO.IdSolicitud AND S.CedulaCandidato = HO.CedulaCandidato AND HR.IdHistorico = HO.IdHistorico

								) A	
								GROUP BY A.IdSolicitud, CedulaCandidato
				
							) A
				
							LEFT JOIN Requisiciones_HistoricoSolicitud Historico ON A.IdSolicitud = Historico.IdSolicitud AND Historico.IdEstado = 2
			
						) AS HistoricoReclutador ON HistoricoReclutador.IdSolicitud = Solicitud.IdSolicitud		

					) RECLUTADOR ON C.IdSolicitud = RECLUTADOR.IdSolicitud_R
				)a
			)e
	
			LEFT JOIN Requisiciones_SolicitudProveedor as sp on e.IdSolicitud = sp.Solicitud 

			LEFT JOIN Requisiciones_Solicitudes	as s	on  e.IdSolicitud = s.IdSolicitud	

			LEFT JOIN Requisiciones_Estados		as es	on	s.IdEstado = es.IdEstado

			LEFT JOIN 
			( 
				SELECT IdSolicitud, IdEstado, UserModifico=MAX(UserModifico)
				FROM Requisiciones_HistoricoSolicitud 
				WHERE IdEstado = 3
				GROUP BY IdSolicitud, IdEstado
			) AS H ON H.IdSolicitud = S.IdSolicitud

			LEFT JOIN 
			(
				SELECT RU.Nit_Reclutador, RU.Cedula_Usuario, AU.Id 
				FROM Requisiciones_Reclutadores_Usuarios RU
				LEFT JOIN AspNetUsers AU ON RU.Cedula_Usuario = AU.UserName
			) N ON H.UserModifico = N.Id
	
			LEFT JOIN Empresas AS EM ON E.CodEmpresa = EM.CodigoEmpresa
	
			LEFT JOIN	
			(
				SELECT DISTINCT CodUnidadNegocio, NombreUnidadNegocio 
				FROM UnidadDeNegocio
			)	u	on	u.CodUnidadNegocio = e.CodigoUnidadNegocio

			LEFT JOIN	
			(
				SELECT DISTINCT CodCentro, NombreCentro 
				FROM UnidadDeNegocio
			)	ce	on	ce.CodCentro = s.CodCentro

			LEFT JOIN	
			(
				SELECT DISTINCT CodDepartamento, NombreDepartamento 
				FROM UnidadDeNegocio
			)	d	on	d.CodDepartamento = s.CodDepartamento

			--Se pinta esta fecha debido a que el 26-06-2024 se cambio el proceso por solicitud de "CB y N"
			WHERE e.FechaSolicitud <= '20240625' 
		) ParteAntigua
	) ConsultaCompleta

	WHERE YEAR(FechaSolicitud) = @AnoPeriodo
		AND MONTH(FechaSolicitud) >= @MesInicial
		AND MONTH(FechaSolicitud) <= @MesFinal

	ORDER BY IdSolicitud

END

```
