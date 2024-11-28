# Stored Procedure: sp_Requisiciones_CandidatoConSolicitudes

## Usa los objetos:
- [[Cargos]]
- [[Requisiciones_Candidatos]]
- [[Requisiciones_DireccionCandidato]]
- [[Requisiciones_Estados]]
- [[Requisiciones_EstadosCandidatos]]
- [[Requisiciones_HistoricoCandidato]]
- [[Requisiciones_Solicitudes]]
- [[Requisiciones_SolicitudesCandidatos]]
- [[v_Requisiciones_Clase]]

```sql

CREATE PROCEDURE [dbo].[sp_Requisiciones_CandidatoConSolicitudes]
(
	@IdSolicitud INT,
	@CodEmpleado BIGINT,
	@Celular NVARCHAR(50),
	@Correo NVARCHAR(100)
) AS
BEGIN

	SET NOCOUNT ON
	SET FMTONLY OFF

	DECLARE @SolicitudActual BIT, @SolicitudActiva BIT;

	--Consultar si existe en la solicitud actual.
	SET @SolicitudActual = (SELECT CONVERT(BIT,CASE WHEN COUNT(*) >= 1 THEN 1 ELSE 0 END)
							FROM(
								SELECT DISTINCT SC.Cedula 
								FROM Requisiciones_SolicitudesCandidatos AS SC
								LEFT JOIN Requisiciones_Candidatos AS C ON SC.Cedula = C.Cedula
								WHERE IdSolicitud = @IdSolicitud AND (SC.Cedula = @CodEmpleado 
																	OR LTRIM(RTRIM(C.Celular)) = @Celular 
																	OR LTRIM(RTRIM(C.Correo)) = @Correo)
							)A )


	--Consultar si existe en una solicitud activa.
	SET @SolicitudActiva = (SELECT CONVERT(BIT,CASE WHEN COUNT(*) >= 1 THEN 1 ELSE 0 END)
							FROM(				 
								SELECT DISTINCT SC.Cedula
								FROM Requisiciones_SolicitudesCandidatos AS SC
								INNER JOIN Requisiciones_Solicitudes AS S ON SC.IdSolicitud = S.IdSolicitud
								LEFT JOIN Requisiciones_Candidatos AS C ON SC.Cedula = C.Cedula
								WHERE S.IdEstado NOT IN (7,8,9,12) AND (SC.Cedula = @CodEmpleado 
																	OR LTRIM(RTRIM(C.Celular)) = @Celular 
																	OR LTRIM(RTRIM(C.Correo)) = @Correo)
							) A )


	--Si existe en la solicitud actual.
	IF @SolicitudActual = 1
		BEGIN 
			SELECT  IdSolicitud = 0,						IdEstado = CONVERT(SMALLINT,1),					IdEstadoCandidato = 0,
					NombreEstadoCandidato = '',				Cedula = '',									Nombres = '',						
					Apellido1 = '',							Apellido2 = '',									Telefono = '',						
					Celular = '',							Correo = '',									FechaNacimiento = GETDATE(),		
					TipIdentificacion = '',					TipoIdentificacion = '',						NombreCargo = '',					
					UnidadNegocio = '',						FechaRegistroCandidato = GETDATE(),				CodTipoCalle = '',					
					NombreCalle = '',						NumCalle = '',									Piso = '',							
					Bloque = '',							Puerta = '',									Complemento = '',					
					DireccionCompleta = '',					Mensaje = 'Solicitud Actual'
		END


	--Si existe en una solicitud activa.
	ELSE IF @SolicitudActiva = 1
		BEGIN 
			SELECT  IdSolicitud = 0,						IdEstado = CONVERT(SMALLINT,1),					IdEstadoCandidato = 0,
					NombreEstadoCandidato = '',				Cedula = '',									Nombres = '',						
					Apellido1 = '',							Apellido2 = '',									Telefono = '',						
					Celular = '',							Correo = '',									FechaNacimiento = GETDATE(),		
					TipIdentificacion = '',					TipoIdentificacion = '',						NombreCargo = '',					
					UnidadNegocio = '',						FechaRegistroCandidato = GETDATE(),				CodTipoCalle = '',					
					NombreCalle = '',						NumCalle = '',									Piso = '',							
					Bloque = '',							Puerta = '',									Complemento = '',					
					DireccionCompleta = '',					Mensaje = 'Solicitud Activa'
		END


	--Informacion de reintegro
	ELSE 
		BEGIN
			SELECT	IdSolicitud,		IdEstado,					IdEstadoCandidato,		NombreEstadoCandidato,		Cedula,
					Nombres,			Apellido1,					Apellido2,				Telefono,					Celular,
					Correo,				FechaNacimiento,			TipIdentificacion,		TipoIdentificacion,			NombreCargo,
					UnidadNegocio,		FechaRegistroCandidato,		CodTipoCalle,			NombreCalle,				NumCalle,
					Piso,				Bloque,						Puerta,					Complemento,				DireccionCompleta,
					Mensaje
			FROM
			(
				SELECT	DISTINCT				SC.IdSolicitud,				DC.Puerta,				SC.IdEstadoCandidato,
						C.Nombres,				C.Apellido1,				C.Apellido2,			TipoIdentificacion=TD.SubClase,
						C.Correo,				C.FechaNacimiento,			C.Telefono,				NombreEstadoCandidato=EC.EstadoCandidato,
						C.Celular,				C.TipIdentificacion,		CA.NombreCargo,			FechaRegistroCandidato=HC.FechaModificacion,
						DC.CodTipoCalle,		DC.NombreCalle,				DC.NumCalle,			DC.DireccionCompleta,		
						S.UnidadNegocio,		DC.Piso,					DC.Bloque,				IdEstado=CONVERT(SMALLINT,ISNULL(S.IdEstado,1)),
						SC.Cedula,				DC.Complemento,				Mensaje = 'Registro Candidato'
				FROM Requisiciones_SolicitudesCandidatos SC
				LEFT JOIN Requisiciones_Solicitudes S ON S.IdSolicitud = SC.IdSolicitud
				LEFT JOIN Requisiciones_Estados AS ES ON ES.IdEstado = S.IdEstado
				LEFT JOIN Cargos CA ON CA.CodigoCargo = S.CodigoCargo
				LEFT JOIN Requisiciones_HistoricoCandidato HC ON HC.CedulaCandidato = SC.Cedula 
																	AND HC.IdSolicitud = S.IdSolicitud
																	AND HC.IdEstadoCandidato = 1
				LEFT JOIN Requisiciones_Candidatos	AS C ON SC.Cedula = C.Cedula
				LEFT JOIN Requisiciones_EstadosCandidatos	AS EC ON SC.IdEstadoCandidato = EC.IdEstadoCandidato
				LEFT JOIN v_Requisiciones_Clase	AS TD ON  LTRIM(RTRIM(C.TipIdentificacion)) = LTRIM(RTRIM(TD.CodSubClase)) AND TD.CodClase = 1	
				LEFT JOIN Requisiciones_DireccionCandidato AS DC ON DC.Cedula = CONVERT(BIGINT,SC.Cedula)
				WHERE ES.TipoProceso = 'CERRADO' AND (SC.Cedula = @CodEmpleado OR LTRIM(RTRIM(C.Celular)) = @Celular OR LTRIM(RTRIM(C.Correo)) = @Correo)
			) A
		END

END

```
