# Stored Procedure: sp_Requisiciones_SolicitudSinProceso

## Usa los objetos:
- [[Requisiciones_HistoricoCandidato]]
- [[Requisiciones_SubClase]]
- [[v_Requisiciones_EmailUsers]]
- [[v_Requisiciones_SolicitudesCandidatos]]
- [[v_Requisiciones_UsuariosReclutadores]]
- [[vw_DiasFestivos]]

```sql
CREATE PROCEDURE [dbo].[sp_Requisiciones_SolicitudSinProceso]
(
	@Estado BIT
) AS

BEGIN
	-- =============================================
	-- Control de Cambios	
	-- 2024|09|17 - ALEXIS - Se agrego una subconsulta para filtrar estado que recibe el procedimiento
	-- 2024|09|19 - ALEXIS - Se modifica el tiempo de la solicitud, para que se cierre al quinto día habil
	-- 2024|09|20 - ALEXIS - Se agrega la variable @DiasHabiles el cual contiene el valor parametrizado y se compara en select de Cancelar.
	-- =============================================

	SET NOCOUNT ON
	SET FMTONLY OFF

	DECLARE @DiasHabiles INT = (CONVERT(INT, (SELECT TOP 1 SubClase FROM Requisiciones_SubClase where CodClase = 22)));

	--Consultar las Solicitudes que se pueden revisar
	SELECT DISTINCT num_solicitud
	INTO #Temp_SolicitudesEnRevision
	FROM v_Requisiciones_SolicitudesCandidatos
	WHERE IdEstadoSolicitud IN (2, 11) AND
		Num_Solicitud NOT IN (
			SELECT DISTINCT Num_Solicitud
			FROM v_Requisiciones_SolicitudesCandidatos 
			WHERE IdEstadoCandidato IN (6, 7) AND IdEstadoSolicitud IN (2, 11)
		)
	
	
	--Consulta de las solicitudes faltas por respuesta del reclutador
	SELECT Id, IdSolicitud, FechaModificacion, TiempoTranscurrido, Cancelar
	FROM 
	(
		SELECT DISTINCT ISNULL(CAST((ROW_NUMBER() OVER(ORDER BY IdSolicitud)) AS INT),0) AS Id, IdSolicitud, FechaModificacion, 
			TiempoTranscurrido = (TiempoTranscurrido - 1), 
			Cancelar = CONVERT(BIT, CASE WHEN (TiempoTranscurrido - 1) > @DiasHabiles THEN 1 ELSE 0 END) 
		FROM (
			SELECT IdSolicitud, FechaModificacion,
				(SELECT  SUM(CASE WHEN F.DiaSemana BETWEEN 1 AND 5 THEN F.Cant ELSE 0 END) - 
					(SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos where Fechafestivo >= FechaModificacion and Fechafestivo <= GETDATE()) AS 'TiempoTranscurrido'
						FROM  (
							SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, GETDATE())/7-DATEDIFF(DAY, -6, FechaModificacion)/7 AS Cant UNION
							SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, GETDATE())/7-DATEDIFF(DAY, -5, FechaModificacion)/7 AS Cant UNION
							SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, GETDATE())/7-DATEDIFF(DAY, -4, FechaModificacion)/7 AS Cant UNION
							SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, GETDATE())/7-DATEDIFF(DAY, -3, FechaModificacion)/7 AS Cant UNION
							SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, GETDATE())/7-DATEDIFF(DAY, -2, FechaModificacion)/7 AS Cant UNION
							SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, GETDATE())/7-DATEDIFF(DAY, -1, FechaModificacion)/7 AS Cant UNION
							SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, GETDATE())/7-DATEDIFF(DAY,  0, FechaModificacion)/7 AS Cant	
						) F
					) AS TiempoTranscurrido 
			FROM (
				SELECT IdSolicitud, MAX(FechaModificacion)FechaModificacion
				FROM Requisiciones_HistoricoCandidato 
				WHERE IdSolicitud IN (
						SELECT * FROM
						(
							SELECT DISTINCT IdSolicitud
							FROM Requisiciones_HistoricoCandidato A
							INNER JOIN (
								SELECT	DISTINCT				UserId,						Cedula_Usuario,			Nombre_Usuario,		
										Nit_Reclutador, 		Nombre_Reclutadora,			Email
								FROM 
								(
									SELECT	UserId,					Cedula_Usuario,		Nombre_Usuario,		Nit_Reclutador, 
											Nombre_Reclutadora,		Email
									FROM v_Requisiciones_UsuariosReclutadores 
									WHERE Nit_Reclutador NOT IN (8300049938, 0)

									UNION ALL

									SELECT	UserId,					Cedula_Usuario,		Nombre_Usuario,		Nit_Reclutador, 
											Nombre_Reclutadora,		Email
									FROM v_Requisiciones_UsuariosReclutadores 
									WHERE Cedula_Usuario = '10262763920' 

									UNION ALL 

									SELECT	UserId = B.Id,			Cedula_Usuario = B.UserName,		Nombre_Usuario = B.NombreCompleto, 
											Nit_Reclutador,			Nombre_Reclutadora,					B.Email
									FROM v_Requisiciones_UsuariosReclutadores AS A
									LEFT JOIN v_Requisiciones_EmailUsers AS B ON B.UserName = '1026276392'
									WHERE Cedula_Usuario = '10262763920' 
										AND Nit_Reclutador = '8300049938'
								)A
							) AS B ON A.UserModifico = B.UserId
							WHERE IdEstadoCandidato = 1 AND
								IdSolicitud IN (SELECT * FROM #Temp_SolicitudesEnRevision)
						) A
						WHERE IdSolicitud NOT IN (	   
								SELECT * FROM (
									SELECT DISTINCT num_solicitud FROM v_Requisiciones_SolicitudesCandidatos 
									WHERE IdEstadoSolicitud IN (2,11) AND IdEstadoCandidato = 1 AND ExisteEntrevista = 1
										AND num_solicitud IN (SELECT * FROM #Temp_SolicitudesEnRevision)
								) A
								WHERE num_solicitud NOT IN (
										SELECT DISTINCT num_solicitud
										FROM v_Requisiciones_SolicitudesCandidatos
										WHERE num_solicitud IN (SELECT * FROM #Temp_SolicitudesEnRevision) AND IdEstadoCandidato = 2				
									)
							)
					)
				GROUP BY IdSolicitud
			) A
		) A
	) A
	WHERE Cancelar = @Estado

END

```
