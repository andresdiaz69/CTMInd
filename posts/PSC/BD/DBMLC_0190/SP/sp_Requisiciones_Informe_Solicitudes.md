# Stored Procedure: sp_Requisiciones_Informe_Solicitudes

## Usa los objetos:
- [[AspNetUsers]]
- [[Cargos]]
- [[Profiles]]
- [[Requisiciones_EmpleadosReemplazados]]
- [[Requisiciones_Estados]]
- [[Requisiciones_HistoricoSolicitud]]
- [[Requisiciones_Razones]]
- [[Requisiciones_Solicitudes]]
- [[Requisiciones_SolicitudesEsquema]]
- [[v_Requisiciones_CiudadDepto]]
- [[v_Requisiciones_EmpleadosActivosRetirados]]
- [[v_Requisiciones_ParametrizacionTipoValor]]
- [[vw_Empresas]]
- [[vw_UnidadDeNegocio]]

```sql
CREATE PROCEDURE [dbo].[sp_Requisiciones_Informe_Solicitudes]
(
	@AnioPeriodo INT,
	@CodCargo SMALLINT
) AS

BEGIN 

	IF @CodCargo = 0
		BEGIN 
			SELECT	DISTINCT					AnoPeriodo=YEAR(FechaCreacion),			MesPeriodo=MONTH(FechaCreacion),
				IdSolicitud,					FechaCreacion,							IdEstado,							Estado,
				TipoSolicitud,					Razon,									CedulaSolicitante,					NombreSolicitante,			
				CodigoCargo,					NombreCargo,							CodEmpresa,							NombreEmpresa,				
				CodUnidad,						NombreUnidad,							CodCentro,							NombreCentro,
				CodSeccion,						NombreSeccion,							CodDepartamento,					NombreDepartamento,
				CodSede,						Sede,									AuxMovilizacion,					BonoAlimentacion,			
				BonoCelular,					BonoGasolina,							Esquema1,							Esquema2,				
				Esquema3,						Esquema4,								Esquema5,							Esquema6,				
				CodContrato,					NombreContrato,							Salario,							NuevoSalario,
				EstadoSalario,					CedulaAutorizadorS,						NombreAutorizadorS,					CodCargoAutorizadorS,				
				CargoAutorizadorS,				FechaAutorizacionSalario,				ObservacionesSalario,				FechaAutorizacionGteL,		
				ObsAutorizacionGteL,			CedulaGerenteLinea,						NombreGerenteLinea,					CodCiudadLabor,
				NombreCiudadLabor,				InHouse,								InHouseProyect,						InHouseNombreProyect,
				InHouseConfir,					CedulaReemplazo,						NombreReemplazo
			FROM (
				SELECT	DISTINCT
					S.IdSolicitud,				S.FechaCreacion,						S.IdEstado,							ES.Estado,
					S.TipoSolicitud,			R.Razon,								DS.CedulaSolicitante,				DS.NombreSolicitante,			
					S.CodigoCargo,				C.NombreCargo,							S.CodEmpresa,						E.NombreEmpresa,				
					U.CodUnidad,				U.NombreUnidad,							S.CodCentro,						S.CodSeccion,						
					S.tip_con AS CodContrato,	S.nom_con AS NombreContrato,			S.Salario,							S.AuxMovilizacion,
					S.BonoAlimentacion,			S.BonoCelular,							S.BonoGasolina,						Esq.Esquema1,
					Esq.Esquema2,				Esq.Esquema3,							Esq.Esquema4,						Esq.Esquema5,
					Esq.Esquema6,				GteL.FechaAutorizacionGteL,				GteL.ObsAutorizacionGteL,			GteL.CedulaGerenteLinea,	
					GteL.NombreGerenteLinea,	S.CodCiudadLabor,						S.InHouse,							S.InHouseProyect,
					B.CedulaReemplazo,			B.NombreReemplazo,
					NombreCiudadLabor = Ciudad.NombreCiudad,				AutorizacionSalario.CedulaAutorizadorS,					
					AutorizacionSalario.NombreAutorizadorS,					AutorizacionSalario.CodCargoAutorizadorS,				
					AutorizacionSalario.CargoAutorizadorS,					AutorizacionSalario.FechaAutorizacionSalario,			
					AutorizacionSalario.ObservacionesSalario,				InHouseNombreProyect = TV.Nombre,

					NuevoSalario = CASE WHEN (AutorizacionSalario.FechaAutorizacionSalario IS NOT NULL)
												OR (S.IdEstado = 10) THEN 'SI' ELSE 'NO' END,
					EstadoSalario = CASE WHEN S.IdEstado = 10 THEN 'Salario Pendiente' ELSE AutorizacionSalario.Estado END,	
					NombreCentro = CASE WHEN CS.NombreCentro IS NOT NULL THEN CS.NombreCentro ELSE S.Centro END,
					NombreSeccion = CASE WHEN CS.NombreCentro IS NOT NULL THEN CS.NombreSeccion ELSE S.Seccion END,
					CodDepartamento = CASE WHEN CS.CodDepartamento IS NOT NULL THEN CS.CodDepartamento ELSE S.CodDepartamento END,
					NombreDepartamento = CASE WHEN CS.NombreDepartamento IS NOT NULL THEN CS.NombreDepartamento ELSE S.Departamento END,
					CodSede = CASE WHEN CS.CodSede IS NOT NULL THEN CS.CodSede ELSE S.CodSede END,
					Sede = CASE WHEN CS.Sede IS NOT NULL THEN CS.Sede ELSE S.Sede END,
					InHouseConfir = CASE WHEN InHouse = 1 THEN 'Si' ELSE 'No' END
			
				FROM (
					SELECT * FROM Requisiciones_Solicitudes
					WHERE YEAR(FechaCreacion) = @AnioPeriodo
				) AS S

				LEFT JOIN v_Requisiciones_CiudadDepto AS Ciudad ON Ciudad.CodigoCiudad = S.CodCiudadLabor AND Ciudad.CodigoPais = '057'

				LEFT JOIN	v_Requisiciones_ParametrizacionTipoValor AS TV ON TV.Id = S.InHouseProyect AND TV.Tipo = 'InHouse'

				--ESTADO SOLICITUD
				LEFT JOIN Requisiciones_Estados AS ES ON ES.IdEstado = S.IdEstado

				--RAZON DE LA SOLICITUD 
				LEFT JOIN Requisiciones_Razones AS R ON R.IdRazon = S.IdRazon

				--NOMBRE EMPRESA
				LEFT JOIN vw_Empresas AS E ON S.CodEmpresa = E.CodigoEmpresa

				--NOMBRE CARGO
				LEFT JOIN Cargos AS C ON S.CodigoCargo = C.CodigoCargo

				--NOMBRE UNIDAD DE NEGOCIO
				LEFT JOIN (
					SELECT	DISTINCT UnidadNegocio_Requisicion AS CodUnidad, 
							NombreUnidadNegocio_Requisicion AS NombreUnidad
					FROM vw_UnidadDeNegocio
				) AS U ON S.CodigoUnidadNegocio = U.CodUnidad

				--NOMBRE CENTRO, SECCION, DEPARTAMENTO Y SEDE
				LEFT JOIN (
					SELECT	DISTINCT			CodCentro,			NombreCentro,			CodSeccion,
						NombreSeccion,			CodDepartamento,	NombreDepartamento,		CodSede=CodSedeAmbiental,
						Sede=SedeAmbiental
					FROM VW_UnidadDeNegocio
				) AS CS ON CS.CodCentro = S.CodCentro AND CS.CodSeccion = S.CodSeccion

				--NOMBRE Y CEDULA SOLICITANTE
				LEFT JOIN (
					SELECT A.Id, A.UserName AS CedulaSolicitante, A.Email, 
						NombreSolicitante=REPLACE(REPLACE(REPLACE(UPPER(b.Nombres+' '+b.Apellidos),' ','<>'),'><',''),'<>',' ')
					FROM AspNetUsers A
					INNER JOIN Profiles B ON A.Id = B.UserId
				) AS DS ON DS.Id = S.UserIdCreo

				--ESQUEMAS VARIABLES
				LEFT JOIN (
					SELECT * FROM (
						SELECT IdSolicitud, Esquema = REPLACE(REPLACE(REPLACE(UPPER(CASE WHEN Esquema = '' THEN NULL ELSE Esquema END),' ','<>'),'><',''),'<>',' '), 
							NumeroEsquema = CASE WHEN NumeroEsquema = 1 THEN 'Esquema1'
												 WHEN NumeroEsquema = 2 THEN 'Esquema2'
												 WHEN NumeroEsquema = 3 THEN 'Esquema3'
												 WHEN NumeroEsquema = 4 THEN 'Esquema4'
												 WHEN NumeroEsquema = 5 THEN 'Esquema5'
												 WHEN NumeroEsquema = 6 THEN 'Esquema6' END
						FROM Requisiciones_SolicitudesEsquema 
					) ConvertTable PIVOT(MAX(Esquema) FOR [NumeroEsquema] IN ([Esquema1],
																			  [Esquema2],
																			  [Esquema3],
																			  [Esquema4],
																			  [Esquema5],
																			  [Esquema6])) AS PivotTable
				) AS Esq ON S.IdSolicitud = Esq.IdSolicitud

				--AUTORIZACION DE LINEA
				LEFT JOIN 
				(
					SELECT	DISTINCT					A.IdSolicitud,				A.IdEstado,				A.ObsAutorizacionGteL, 
							A.FechaAutorizacionGteL,	A.TipAutorizacionLinea,		DA.IdGerenteLinea,		DA.CedulaGerenteLinea,
							DA.NombreGerenteLinea,		DA.CodCargoGerenteLinea,	DA.CargoGerenteLinea,	DA.EmailGerenteLinea
					FROM (
						SELECT	DISTINCT								IdSolicitud,						IdEstado, 
							ObsAutorizacionGteL=Observaciones,			IdGerenteLinea=UserModifico,		FechaAutorizacionGteL=FechaModificacion, 
							TipAutorizacionLinea = 'Solicitud Con Candidatos'
						FROM Requisiciones_HistoricoSolicitud AS a
						WHERE IdEstado = 5

						UNION ALL

						SELECT	DISTINCT				SinC.IdSolicitud,			SinC.IdEstado,						SinC.Observaciones, 	
								SinC.UserModifico,		SinC.FechaModificacion, 	TipAutorizacionLinea = 'Solicitud Sin Candidatos'
						FROM (
							SELECT A.IdSolicitud, B.IdEstado, B.Observaciones, B.UserModifico, B.FechaModificacion
							FROM (
								SELECT IdSolicitud, MIN(IdHistorico)IdHistorico
								FROM Requisiciones_HistoricoSolicitud
								WHERE IdEstado = 2
								GROUP BY IdSolicitud
							) A
							INNER JOIN Requisiciones_HistoricoSolicitud AS B ON A.IdHistorico = B.IdHistorico	
						) SinC
						LEFT JOIN (
							SELECT IdSolicitud, IdEstado, Observaciones, UserModifico, FechaModificacion
							FROM Requisiciones_HistoricoSolicitud AS a
							WHERE IdEstado = 5 
						) ConC ON SinC.IdSolicitud = ConC.IdSolicitud
						WHERE ConC.IdSolicitud IS NULL
					) A
					LEFT JOIN (
						SELECT	DISTINCT					A.Id AS IdGerenteLinea,				EM.Codigo_Cargo AS CodCargoGerenteLinea, 					
							A.Email AS EmailGerenteLinea,	A.UserName AS CedulaGerenteLinea,	EM.Nombre_Cargo AS CargoGerenteLinea,
							NombreGerenteLinea=REPLACE(REPLACE(REPLACE(UPPER(b.Nombres+' '+b.Apellidos),' ','<>'),'><',''),'<>',' ')
						FROM AspNetUsers A
						INNER JOIN Profiles B ON A.Id = B.UserId
						LEFT JOIN v_Requisiciones_EmpleadosActivosRetirados AS EM ON A.UserName = EM.CodigoEmpleado
					) AS DA ON DA.IdGerenteLinea = A.IdGerenteLinea
				) AS GteL ON GteL.IdSolicitud = S.IdSolicitud

				--AUTORIZACION DE SALARIO
				LEFT JOIN (
					SELECT DISTINCT			
						AutSolicitud.IdSolicitud,							AutSolicitud.IdEstado,							AutSolicitud.FechaCreacion, 
						HistoricoSolicitud.FechaModificacion,				HistoricoSolicitud.UserModifico,				Usuario.CedulaAutorizadorS,			
						Usuario.NombreAutorizadorS,							Usuario.CodCargoAutorizadorS,					Usuario.CargoAutorizadorS,
						ObservacionesSalario = HistoricoSolicitud.Observaciones,		HistoricoSolicitud.FechaModificacion AS FechaAutorizacionSalario,	
						CASE WHEN HistoricoSolicitud.IdEstado = 8 THEN 'Salario Rechazado' 
							WHEN HistoricoSolicitud.IdEstado = 4 THEN 'Salario Aprobado' 
							WHEN AutSolicitud.IdEstado = 10 THEN 'Salario Pendiente' 
							END Estado
					FROM
					(
						SELECT AutSalario.IdSolicitud, AutSalario.IdEstado, AutSalario.FechaCreacion, Historico.FechaModificacion
						FROM ( 

							SELECT Salario.IdSolicitud, Solicitudes.IdEstado, Solicitudes.FechaCreacion
							FROM (
								SELECT DISTINCT IdSolicitud 
								FROM Requisiciones_HistoricoSolicitud 
								WHERE IdEstado = 10

								UNION ALL

								SELECT DISTINCT IdSolicitud
								FROM Requisiciones_Solicitudes
								WHERE NuevoSalario = 1
							) Salario
							INNER JOIN (
								SELECT DISTINCT IdSolicitud, IdEstado, FechaCreacion
								FROM Requisiciones_Solicitudes
							) Solicitudes ON Solicitudes.IdSolicitud = Salario.IdSolicitud

						) AutSalario

						LEFT JOIN (
							SELECT IdSolicitud, FechaModificacion = MIN(FechaModificacion)
							FROM Requisiciones_HistoricoSolicitud 
							WHERE IdEstado IN (4, 8)
							GROUP BY IdSolicitud
						) Historico ON AutSalario.IdSolicitud = Historico.IdSolicitud
						WHERE YEAR(AutSalario.FechaCreacion) >= 2021
					) AutSolicitud

					LEFT JOIN Requisiciones_HistoricoSolicitud HistoricoSolicitud ON AutSolicitud.IdSolicitud = HistoricoSolicitud.IdSolicitud 
																AND AutSolicitud.FechaModificacion = HistoricoSolicitud.FechaModificacion

					LEFT JOIN (
						SELECT	DISTINCT					A.Id AS IdAutorizadorS,				EM.Codigo_Cargo AS CodCargoAutorizadorS, 					
							A.Email AS EmailAutorizadorS,	A.UserName AS CedulaAutorizadorS,	EM.Nombre_Cargo AS CargoAutorizadorS,
							NombreAutorizadorS=REPLACE(REPLACE(REPLACE(UPPER(b.Nombres+' '+b.Apellidos),' ','<>'),'><',''),'<>',' ')
						FROM AspNetUsers A
						INNER JOIN Profiles B ON A.Id = B.UserId
						LEFT JOIN v_Requisiciones_EmpleadosActivosRetirados AS EM ON A.UserName = EM.CodigoEmpleado
					) AS Usuario ON Usuario.IdAutorizadorS = HistoricoSolicitud.UserModifico

					WHERE (AutSolicitud.IdEstado = 9 AND AutSolicitud.FechaModificacion IS NOT NULL) OR (AutSolicitud.IdEstado <> 9)
				) AS AutorizacionSalario ON AutorizacionSalario.IdSolicitud = S.IdSolicitud

				--Reemplazo
				LEFT JOIN Requisiciones_EmpleadosReemplazados B ON S.IdSolicitud = B.IdSolicitud
			) A		
			ORDER BY IdSolicitud ASC
		END

	ELSE
		BEGIN 
			SELECT	DISTINCT					AnoPeriodo=YEAR(FechaCreacion),			MesPeriodo=MONTH(FechaCreacion),
				IdSolicitud,					FechaCreacion,							IdEstado,								Estado,
				TipoSolicitud,					Razon,									CedulaSolicitante,						NombreSolicitante,			
				CodigoCargo,					NombreCargo,							CodEmpresa,								NombreEmpresa,				
				CodUnidad,						NombreUnidad,							CodCentro,								NombreCentro,
				CodSeccion,						NombreSeccion,							CodDepartamento,						NombreDepartamento,
				CodSede,						Sede,									AuxMovilizacion,						BonoAlimentacion,			
				BonoCelular,					BonoGasolina,							Esquema1,								Esquema2,				
				Esquema3,						Esquema4,								Esquema5,								Esquema6,				
				CodContrato,					NombreContrato,							Salario,								NuevoSalario,
				EstadoSalario,					CedulaAutorizadorS,						NombreAutorizadorS,						CodCargoAutorizadorS,				
				CargoAutorizadorS,				FechaAutorizacionSalario,				ObservacionesSalario,					FechaAutorizacionGteL,		
				ObsAutorizacionGteL,			CedulaGerenteLinea,						NombreGerenteLinea,						CodCiudadLabor,
				NombreCiudadLabor,				InHouse,								InHouseProyect,							InHouseNombreProyect,
				InHouseConfir,					CedulaReemplazo,						NombreReemplazo
			FROM (
				SELECT	DISTINCT
					S.IdSolicitud,				S.FechaCreacion,						S.IdEstado,								ES.Estado,
					S.TipoSolicitud,			R.Razon,								DS.CedulaSolicitante,					DS.NombreSolicitante,			
					S.CodigoCargo,				C.NombreCargo,							S.CodEmpresa,							E.NombreEmpresa,				
					U.CodUnidad,				U.NombreUnidad,							S.CodCentro,							S.CodSeccion,						
					S.tip_con AS CodContrato,	S.nom_con AS NombreContrato,			S.Salario,								S.AuxMovilizacion,
					S.BonoAlimentacion,			S.BonoCelular,							S.BonoGasolina,							Esq.Esquema1,
					Esq.Esquema2,				Esq.Esquema3,							Esq.Esquema4,							Esq.Esquema5,
					Esq.Esquema6,				GteL.FechaAutorizacionGteL,				GteL.ObsAutorizacionGteL,				GteL.CedulaGerenteLinea,	
					GteL.NombreGerenteLinea,	S.CodCiudadLabor,						S.InHouse,								S.InHouseProyect,
					B.CedulaReemplazo,			B.NombreReemplazo,
					NombreCiudadLabor = Ciudad.NombreCiudad,				InHouseNombreProyect = TV.Nombre,
					AutorizacionSalario.CedulaAutorizadorS,					AutorizacionSalario.NombreAutorizadorS,
					AutorizacionSalario.CodCargoAutorizadorS,				AutorizacionSalario.CargoAutorizadorS,
					AutorizacionSalario.FechaAutorizacionSalario,			AutorizacionSalario.ObservacionesSalario,

					NuevoSalario = CASE WHEN (AutorizacionSalario.FechaAutorizacionSalario IS NOT NULL)
												OR (S.IdEstado = 10) THEN 'SI' ELSE 'NO' END,
					EstadoSalario = CASE WHEN S.IdEstado = 10 THEN 'Salario Pendiente' ELSE AutorizacionSalario.Estado END,	
					NombreCentro = CASE WHEN CS.NombreCentro IS NOT NULL THEN CS.NombreCentro ELSE S.Centro END,
					NombreSeccion = CASE WHEN CS.NombreCentro IS NOT NULL THEN CS.NombreSeccion ELSE S.Seccion END,
					CodDepartamento = CASE WHEN CS.CodDepartamento IS NOT NULL THEN CS.CodDepartamento ELSE S.CodDepartamento END,
					NombreDepartamento = CASE WHEN CS.NombreDepartamento IS NOT NULL THEN CS.NombreDepartamento ELSE S.Departamento END,
					CodSede = CASE WHEN CS.CodSede IS NOT NULL THEN CS.CodSede ELSE S.CodSede END,
					Sede = CASE WHEN CS.Sede IS NOT NULL THEN CS.Sede ELSE S.Sede END,
					InHouseConfir = CASE WHEN InHouse = 1 THEN 'Si' ELSE 'No' END
			
				FROM (
					SELECT * FROM Requisiciones_Solicitudes
					WHERE YEAR(FechaCreacion) = @AnioPeriodo
						AND CodigoCargo = @CodCargo
				) AS S
				
				LEFT JOIN v_Requisiciones_CiudadDepto AS Ciudad ON Ciudad.CodigoCiudad = S.CodCiudadLabor AND Ciudad.CodigoPais = '057'

				LEFT JOIN v_Requisiciones_ParametrizacionTipoValor AS TV ON TV.Id = S.InHouseProyect AND TV.Tipo = 'InHouse'

				--ESTADO SOLICITUD
				LEFT JOIN Requisiciones_Estados AS ES ON ES.IdEstado = S.IdEstado

				--RAZON DE LA SOLICITUD 
				LEFT JOIN Requisiciones_Razones AS R ON R.IdRazon = S.IdRazon

				--NOMBRE EMPRESA
				LEFT JOIN vw_Empresas AS E ON S.CodEmpresa = E.CodigoEmpresa

				--NOMBRE CARGO
				LEFT JOIN Cargos AS C ON S.CodigoCargo = C.CodigoCargo

				--NOMBRE UNIDAD DE NEGOCIO
				LEFT JOIN (
					SELECT	DISTINCT UnidadNegocio_Requisicion AS CodUnidad, 
							NombreUnidadNegocio_Requisicion AS NombreUnidad
					FROM vw_UnidadDeNegocio
				) AS U ON S.CodigoUnidadNegocio = U.CodUnidad

				--NOMBRE CENTRO, SECCION, DEPARTAMENTO Y SEDE
				LEFT JOIN (
					SELECT	DISTINCT			CodCentro,			NombreCentro,			CodSeccion,
						NombreSeccion,			CodDepartamento,	NombreDepartamento,		CodSede=CodSedeAmbiental,
						Sede=SedeAmbiental
					FROM VW_UnidadDeNegocio
				) AS CS ON CS.CodCentro = S.CodCentro AND CS.CodSeccion = S.CodSeccion

				--NOMBRE Y CEDULA SOLICITANTE
				LEFT JOIN (
					SELECT A.Id, A.UserName AS CedulaSolicitante, A.Email, 
						NombreSolicitante=REPLACE(REPLACE(REPLACE(UPPER(b.Nombres+' '+b.Apellidos),' ','<>'),'><',''),'<>',' ')
					FROM AspNetUsers A
					INNER JOIN Profiles B ON A.Id = B.UserId
				) AS DS ON DS.Id = S.UserIdCreo

				--ESQUEMAS VARIABLES
				LEFT JOIN (
					SELECT * FROM (
						SELECT IdSolicitud, Esquema = REPLACE(REPLACE(REPLACE(UPPER(CASE WHEN Esquema = '' THEN NULL ELSE Esquema END),' ','<>'),'><',''),'<>',' '), 
							NumeroEsquema = CASE WHEN NumeroEsquema = 1 THEN 'Esquema1'
												 WHEN NumeroEsquema = 2 THEN 'Esquema2'
												 WHEN NumeroEsquema = 3 THEN 'Esquema3'
												 WHEN NumeroEsquema = 4 THEN 'Esquema4'
												 WHEN NumeroEsquema = 5 THEN 'Esquema5'
												 WHEN NumeroEsquema = 6 THEN 'Esquema6' END
						FROM Requisiciones_SolicitudesEsquema 
					) ConvertTable PIVOT(MAX(Esquema) FOR [NumeroEsquema] IN ([Esquema1],
																			  [Esquema2],
																			  [Esquema3],
																			  [Esquema4],
																			  [Esquema5],
																			  [Esquema6])) AS PivotTable
				) AS Esq ON S.IdSolicitud = Esq.IdSolicitud

				--AUTORIZACION DE LINEA
				LEFT JOIN 
				(
					SELECT	DISTINCT					A.IdSolicitud,				A.IdEstado,				A.ObsAutorizacionGteL, 
							A.FechaAutorizacionGteL,	A.TipAutorizacionLinea,		DA.IdGerenteLinea,		DA.CedulaGerenteLinea,
							DA.NombreGerenteLinea,		DA.CodCargoGerenteLinea,	DA.CargoGerenteLinea,	DA.EmailGerenteLinea
					FROM (
						SELECT	DISTINCT								IdSolicitud,						IdEstado, 
							ObsAutorizacionGteL=Observaciones,			IdGerenteLinea=UserModifico,		FechaAutorizacionGteL=FechaModificacion, 
							TipAutorizacionLinea = 'Solicitud Con Candidatos'
						FROM Requisiciones_HistoricoSolicitud AS a
						WHERE IdEstado = 5

						UNION ALL

						SELECT	DISTINCT				SinC.IdSolicitud,			SinC.IdEstado,						SinC.Observaciones, 	
								SinC.UserModifico,		SinC.FechaModificacion, 	TipAutorizacionLinea = 'Solicitud Sin Candidatos'
						FROM (
							SELECT A.IdSolicitud, B.IdEstado, B.Observaciones, B.UserModifico, B.FechaModificacion
							FROM (
								SELECT IdSolicitud, MIN(IdHistorico)IdHistorico
								FROM Requisiciones_HistoricoSolicitud
								WHERE IdEstado = 2
								GROUP BY IdSolicitud
							) A
							INNER JOIN Requisiciones_HistoricoSolicitud AS B ON A.IdHistorico = B.IdHistorico	
						) SinC
						LEFT JOIN (
							SELECT IdSolicitud, IdEstado, Observaciones, UserModifico, FechaModificacion
							FROM Requisiciones_HistoricoSolicitud AS a
							WHERE IdEstado = 5 
						) ConC ON SinC.IdSolicitud = ConC.IdSolicitud
						WHERE ConC.IdSolicitud IS NULL
					) A
					LEFT JOIN (
						SELECT	DISTINCT					A.Id AS IdGerenteLinea,				EM.Codigo_Cargo AS CodCargoGerenteLinea, 					
							A.Email AS EmailGerenteLinea,	A.UserName AS CedulaGerenteLinea,	EM.Nombre_Cargo AS CargoGerenteLinea,
							NombreGerenteLinea=REPLACE(REPLACE(REPLACE(UPPER(b.Nombres+' '+b.Apellidos),' ','<>'),'><',''),'<>',' ')
						FROM AspNetUsers A
						INNER JOIN Profiles B ON A.Id = B.UserId
						LEFT JOIN v_Requisiciones_EmpleadosActivosRetirados AS EM ON A.UserName = EM.CodigoEmpleado
					) AS DA ON DA.IdGerenteLinea = A.IdGerenteLinea
				) AS GteL ON GteL.IdSolicitud = S.IdSolicitud

				--AUTORIZACION DE SALARIO
				LEFT JOIN (
					SELECT DISTINCT			
						AutSolicitud.IdSolicitud,							AutSolicitud.IdEstado,							AutSolicitud.FechaCreacion, 
						HistoricoSolicitud.FechaModificacion,				HistoricoSolicitud.UserModifico,				Usuario.CedulaAutorizadorS,			
						Usuario.NombreAutorizadorS,							Usuario.CodCargoAutorizadorS,					Usuario.CargoAutorizadorS,
						ObservacionesSalario = HistoricoSolicitud.Observaciones,		HistoricoSolicitud.FechaModificacion AS FechaAutorizacionSalario,	
						CASE WHEN HistoricoSolicitud.IdEstado = 8 THEN 'Salario Rechazado' 
							WHEN HistoricoSolicitud.IdEstado = 4 THEN 'Salario Aprobado' 
							WHEN AutSolicitud.IdEstado = 10 THEN 'Salario Pendiente' 
							END Estado
					FROM
					(
						SELECT AutSalario.IdSolicitud, AutSalario.IdEstado, AutSalario.FechaCreacion, Historico.FechaModificacion
						FROM ( 

							SELECT Salario.IdSolicitud, Solicitudes.IdEstado, Solicitudes.FechaCreacion
							FROM (
								SELECT DISTINCT IdSolicitud 
								FROM Requisiciones_HistoricoSolicitud 
								WHERE IdEstado = 10

								UNION ALL

								SELECT DISTINCT IdSolicitud
								FROM Requisiciones_Solicitudes
								WHERE NuevoSalario = 1
							) Salario
							INNER JOIN (
								SELECT DISTINCT IdSolicitud, IdEstado, FechaCreacion
								FROM Requisiciones_Solicitudes
							) Solicitudes ON Solicitudes.IdSolicitud = Salario.IdSolicitud

						) AutSalario

						LEFT JOIN (
							SELECT IdSolicitud, FechaModificacion = MIN(FechaModificacion)
							FROM Requisiciones_HistoricoSolicitud 
							WHERE IdEstado IN (4, 8)
							GROUP BY IdSolicitud
						) Historico ON AutSalario.IdSolicitud = Historico.IdSolicitud
						WHERE YEAR(AutSalario.FechaCreacion) >= 2021
					) AutSolicitud

					LEFT JOIN Requisiciones_HistoricoSolicitud HistoricoSolicitud ON AutSolicitud.IdSolicitud = HistoricoSolicitud.IdSolicitud 
																AND AutSolicitud.FechaModificacion = HistoricoSolicitud.FechaModificacion

					LEFT JOIN (
						SELECT	DISTINCT					A.Id AS IdAutorizadorS,				EM.Codigo_Cargo AS CodCargoAutorizadorS, 					
							A.Email AS EmailAutorizadorS,	A.UserName AS CedulaAutorizadorS,	EM.Nombre_Cargo AS CargoAutorizadorS,
							NombreAutorizadorS=REPLACE(REPLACE(REPLACE(UPPER(b.Nombres+' '+b.Apellidos),' ','<>'),'><',''),'<>',' ')
						FROM AspNetUsers A
						INNER JOIN Profiles B ON A.Id = B.UserId
						LEFT JOIN v_Requisiciones_EmpleadosActivosRetirados AS EM ON A.UserName = EM.CodigoEmpleado
					) AS Usuario ON Usuario.IdAutorizadorS = HistoricoSolicitud.UserModifico

					WHERE (AutSolicitud.IdEstado = 9 AND AutSolicitud.FechaModificacion IS NOT NULL) OR (AutSolicitud.IdEstado <> 9)
				) AS AutorizacionSalario ON AutorizacionSalario.IdSolicitud = S.IdSolicitud

				--Reemplazo
				LEFT JOIN Requisiciones_EmpleadosReemplazados B ON S.IdSolicitud = B.IdSolicitud
			) A		
			ORDER BY IdSolicitud ASC
		END

END

```
