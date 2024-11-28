# Stored Procedure: sp_Requisiciones_CandidatosPorEntrevistar

## Usa los objetos:
- [[EmpleadosActivos]]
- [[Requisiciones_Entrevistadores]]
- [[Requisiciones_Entrevistadores_Secciones]]
- [[Secciones]]
- [[v_Requisiciones_EmailUsers]]
- [[v_Requisiciones_SolicitudesCandidatos]]
- [[vw_UnidadDeNegocio]]

```sql

CREATE PROCEDURE [dbo].[sp_Requisiciones_CandidatosPorEntrevistar]
(
	@CodEntrevistador BIGINT
) AS

BEGIN 

	SET NOCOUNT ON
	SET FMTONLY OFF

	--DECLARE @CodEntrevistador BIGINT
	--SET @CodEntrevistador = 1001277352

	SELECT * 
	FROM
	(
		SELECT DISTINCT num_solicitud,EstadoSolicitud,EstadoCandidato,Cedula,NombreCompleto,CodigoCargo,NombreCargo,CodigoUnidadNegocio,CodCentro,CodSeccion,CodEntrevistador,REGISTRO,Unica
		FROM 
		(
			SELECT SC.num_solicitud, SC.IdEstadoCandidato, SC.EstadoSolicitud, SC.EstadoCandidato, SC.Cedula, SC.NombreCompleto, SC.CodigoCargo, SC.NombreCargo, 
				SC.CodigoUnidadNegocio, SC.UnidadNegocio, SC.CodCentro, SC.Centro, SC.CodSeccion, SC.Seccion, CodEntrevistador=PE.CodEmpleado,Unica
		
			FROM v_Requisiciones_SolicitudesCandidatos sc 
			LEFT JOIN
			(
				SELECT DISTINCT E.CodRegistro,E.CodEmpleado,E.CodUnidadNegocio,E.CodCentro,ES.CodSeccion
				FROM Requisiciones_Entrevistadores E

				LEFT JOIN vw_UnidadDeNegocio AS U ON E.CodUnidadNegocio = U.UnidadNegocio_Requisicion 
												AND E.CodCentro = U.CodCentro
		
				LEFT JOIN v_Requisiciones_EmailUsers AS EU ON e.CodEmpleado = EU.UserName
		
				LEFT JOIN Requisiciones_Entrevistadores_Secciones AS ES ON ES.CodUnidad = E.CodUnidadNegocio 
																		AND E.CodCentro = ES.CodCentro 
																		AND E.CodEmpleado = ES.CodEmpleado
		
				LEFT JOIN Secciones AS S ON S.CodigoSeccion = ES.CodSeccion		
			) PE ON PE.CodUnidadNegocio = SC.CodigoUnidadNegocio AND PE.CodCentro = SC.CodCentro AND PE.CodSeccion IS NULL
	
			WHERE sc.IdEstadoCandidato = 1 AND SC.TipoEstadoSolicitud = 'ABIERTO' AND PE.CodRegistro IS NOT NULL

			UNION ALL

			SELECT SC.num_solicitud, SC.IdEstadoCandidato, SC.EstadoSolicitud, SC.EstadoCandidato, SC.Cedula, SC.NombreCompleto, SC.CodigoCargo, SC.NombreCargo, 
				SC.CodigoUnidadNegocio, SC.UnidadNegocio, SC.CodCentro, SC.Centro, SC.CodSeccion, SC.Seccion, CodEntrevistador=PE.CodEmpleado,Unica
			FROM v_Requisiciones_SolicitudesCandidatos sc 
			LEFT JOIN
			(
				SELECT DISTINCT E.CodRegistro,E.CodEmpleado,E.CodUnidadNegocio,E.CodCentro,ES.CodSeccion
				FROM Requisiciones_Entrevistadores E

				LEFT JOIN vw_UnidadDeNegocio AS U ON E.CodUnidadNegocio = U.UnidadNegocio_Requisicion 
												AND E.CodCentro = U.CodCentro
		
				LEFT JOIN v_Requisiciones_EmailUsers AS EU ON e.CodEmpleado = EU.UserName
		
				LEFT JOIN Requisiciones_Entrevistadores_Secciones AS ES ON ES.CodUnidad = E.CodUnidadNegocio 
																		AND E.CodCentro = ES.CodCentro 
																		AND E.CodEmpleado = ES.CodEmpleado
		
				LEFT JOIN Secciones AS S ON S.CodigoSeccion = ES.CodSeccion
			) PE ON PE.CodUnidadNegocio = SC.CodigoUnidadNegocio AND PE.CodCentro = SC.CodCentro AND PE.CodSeccion = SC.CodSeccion

			WHERE sc.IdEstadoCandidato = 1 AND SC.TipoEstadoSolicitud = 'ABIERTO' AND PE.CodRegistro IS NOT NULL
		) A
		LEFT JOIN 
		(
			SELECT TOP 1 REGISTRO='EXISTE',* FROM EmpleadosActivos 
			WHERE Ano_Periodo = YEAR(GETDATE())
				AND Mes_Periodo = MONTH(GETDATE())
				AND CodigoEmpleado = @CodEntrevistador
		) E ON A.CodCentro = E.codigo_centro 
			AND	A.CodigoUnidadNegocio = E.Unidad_Negocio
			AND A.CodigoCargo = E.Codigo_Cargo

		WHERE CodEntrevistador = @CodEntrevistador
	) A
	WHERE REGISTRO IS NULL
END

```
