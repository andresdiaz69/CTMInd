# Stored Procedure: sp_Requisiciones_GuardarEntrevista

## Usa los objetos:
- [[Requisiciones_Candidatos]]
- [[Requisiciones_DireccionCandidato]]
- [[Requisiciones_Entrevista]]
- [[Requisiciones_Entrevista_Temp]]
- [[Requisiciones_EntrevistaTitulos]]
- [[Requisiciones_ExperienciaLaboral]]
- [[Requisiciones_HistoricoCandidato]]
- [[Requisiciones_HistoricoPreEntrevista]]
- [[Requisiciones_HistoricoReclutador]]
- [[Requisiciones_RelacionesPersonales]]
- [[Requisiciones_Solicitudes]]
- [[Requisiciones_SolicitudesCandidatos]]
- [[Requisiciones_SolicitudesDocumentos]]

```sql
CREATE PROCEDURE [dbo].[sp_Requisiciones_GuardarEntrevista]
(
	@IdSolicitud INT, 
	@CedulaCandidato NVARCHAR(50),
	@FinEntrevista BIT
) AS
BEGIN 

	BEGIN TRAN

	--DECLARE 
	--	@IdSolicitud INT, 
	--	@CedulaCandidato NVARCHAR(50),
	--	@FinEntrevista BIT

	--SET @IdSolicitud = 7977 
	--SET @CedulaCandidato = '1121969548'
	--SET @FinEntrevista = 0



	IF OBJECT_ID(N'tempdb.dbo.#EntrevistaTemporal', N'U') IS NOT NULL
		DROP TABLE #EntrevistaTemporal


	--EXCEPCIÓN TABLA TEMPORAL ENTREVISTA GENERAL
	BEGIN TRY
		BEGIN
			--Tabla temporal con la información completa de la entrevista
			SELECT * INTO #EntrevistaTemporal 
			FROM Requisiciones_Entrevista_Temp 
			WHERE IdSolicitud = @IdSolicitud
				AND CedulaCandidato = @CedulaCandidato
		END
	END TRY

	BEGIN CATCH
		BEGIN
			SELECT
					ERROR_NUMBER() AS ErrorNumber,
					ERROR_SEVERITY() AS ErrorSeverity,
					ERROR_STATE() AS ErrorState,
					ERROR_PROCEDURE() AS ErrorProcedure,
					ERROR_LINE() AS ErrorLine,
					ERROR_MESSAGE() AS ErrorMessage,
					ErrorResult = 'NO se pudo realizar la consulta temporal de la entrevista',
					ErrorLog = 1
			ROLLBACK TRAN
			RETURN
		END
	END CATCH




	--EXCEPCIÓN UPDATE DATOS CANDIDATOS
	BEGIN TRY
		BEGIN
			--Candidatos
			UPDATE Requisiciones_Candidatos
			SET Telefono = A.Telefono, Celular = A.Celular, Correo = A.Correo, FechaNacimiento = A.FechaNacimiento, 
				Direccion = A.DireccionCompleta, TipIdentificacion = A.TipIdentificacion
			from #EntrevistaTemporal A
			INNER JOIN Requisiciones_Candidatos B ON A.CedulaCandidato = B.Cedula 
		END
	END TRY

	BEGIN CATCH
		BEGIN
			SELECT
					ERROR_NUMBER() AS ErrorNumber,
					ERROR_SEVERITY() AS ErrorSeverity,
					ERROR_STATE() AS ErrorState,
					ERROR_PROCEDURE() AS ErrorProcedure,
					ERROR_LINE() AS ErrorLine,
					ERROR_MESSAGE() AS ErrorMessage,
					ErrorResult = 'NO se pudo realizar la modificación de los datos del candidato',
					ErrorLog = 1
			ROLLBACK TRAN
			RETURN
		END
	END CATCH



	--EXCEPCION UPDATE DATOS DE LA DIRECCION
	BEGIN TRY
		BEGIN
			--Direccion
			UPDATE Requisiciones_DireccionCandidato
			SET CodTipoCalle = A.CodTipoCalle, NombreCalle = A.NombreCalle, NumCalle = A.NumCalle, Piso = A.Piso, 
				Bloque = A.Bloque, Puerta = A.Puerta, Complemento = A.Complemento,	DireccionCompleta = A.DireccionCompleta
			from #EntrevistaTemporal A
			INNER JOIN Requisiciones_DireccionCandidato B ON A.CedulaCandidato = B.Cedula 
		END
	END TRY

	BEGIN CATCH
		BEGIN
			SELECT
					ERROR_NUMBER() AS ErrorNumber,
					ERROR_SEVERITY() AS ErrorSeverity,
					ERROR_STATE() AS ErrorState,
					ERROR_PROCEDURE() AS ErrorProcedure,
					ERROR_LINE() AS ErrorLine,
					ERROR_MESSAGE() AS ErrorMessage,
					ErrorResult = 'NO se pudo realizar la modificación de la dirección',
					ErrorLog = 1
			ROLLBACK TRAN
			RETURN
		END
	END CATCH



	--EXCEPCION DELETE RELACIONES PERSONALES
	BEGIN TRY
		BEGIN
			--Eliminar las relaciones personales existentes
			DELETE FROM Requisiciones_RelacionesPersonales 
			WHERE IdSolicitud = @IdSolicitud AND CedulaCandidato = @CedulaCandidato
		END
	END TRY

	BEGIN CATCH
		BEGIN
			SELECT
					ERROR_NUMBER() AS ErrorNumber,
					ERROR_SEVERITY() AS ErrorSeverity,
					ERROR_STATE() AS ErrorState,
					ERROR_PROCEDURE() AS ErrorProcedure,
					ERROR_LINE() AS ErrorLine,
					ERROR_MESSAGE() AS ErrorMessage,
					ErrorResult = 'NO se pudo realizar la eliminación de las relaciones personales',
					ErrorLog = 1
			ROLLBACK TRAN
			RETURN
		END
	END CATCH


	--EXCEPCION INSERT RELACIONES PERSONALES
	IF (SELECT RelacionesPersonales FROM #EntrevistaTemporal) = 1
		BEGIN --Revisar si hay nuevas relaciones para insertar		
			BEGIN TRY
				BEGIN
					INSERT INTO Requisiciones_RelacionesPersonales (IdSolicitud, CedulaCandidato, Familiar_Activos, 
						Parentesco_Familiar, UserName_Familiar, Nombre_Familiar, CodEmpresa_Familiar, Empresa_Familiar, 
						CodLinea_Familiar, Linea_Familiar, CodCargo_Familiar, Cargo_Familiar, TrabajoAnteriormente, 
						CodCargoAnterior, NombreCargoAnterior, CodLineaAnterior, NombreLineaAnterior, FechaIngresoAnterior,
						FechaRetiroAnterior, CausaRetiro, AnoRetiro, FechaRegistro)

					SELECT IdSolicitud, CedulaCandidato, Familiar_Activos, Parentesco_Familiar, UserName_Familiar, 
						Nombre_Familiar, CodEmpresa_Familiar, Empresa_Familiar, CodLinea_Familiar, Linea_Familiar,
						CodCargo_Familiar, Cargo_Familiar, TrabajoAnteriormente, CodCargoAnterior, NombreCargoAnterior, 
						CodLineaAnterior, NombreLineaAnterior, FechaIngresoAnterior, FechaRetiroAnterior, CausaRetiro, 
						AnoRetiro, FechaRegistro
					FROM #EntrevistaTemporal 
				END
			END TRY

			BEGIN CATCH
				BEGIN
					SELECT
						ERROR_NUMBER() AS ErrorNumber,
						ERROR_SEVERITY() AS ErrorSeverity,
						ERROR_STATE() AS ErrorState,
						ERROR_PROCEDURE() AS ErrorProcedure,
						ERROR_LINE() AS ErrorLine,
						ERROR_MESSAGE() AS ErrorMessage,
						ErrorResult = 'NO se pudo realizar el guardado de las relaciones personales',
						ErrorLog = 1
					ROLLBACK TRAN
					RETURN
				END
			END CATCH
		END



	--EXCEPCION INSERT / UPDATE ENTREVISTA
	IF NOT EXISTS (SELECT * FROM Requisiciones_Entrevista WHERE IdSolicitud = @IdSolicitud AND CedulaCandidato = @CedulaCandidato)
		BEGIN 
			--INSERTAR LOS DATOS PARA LA NUEVA ENTREVISTA
			BEGIN TRY
				BEGIN
					INSERT INTO Requisiciones_Entrevista (IdSolicitud, CedulaCandidato,	CodMunicipio, Municipio, CodCiudad, Ciudad, FechaPreEntrevista, FechaEntrevista,
							Edad, Sexo, EstadoCivil, TipoVivienda, CodCiudadCandidato, CiudadCandidato, BarrioCandidato, NucleoFamiliar, TieneProcesoActivo, 
							CandidatoProcesoActivo,	Primaria, Bachillerato, Tecnico, Tecnologo, Profesional, Postgrado, CuentaConCertificado, FortalezasCargo, HabilidadesCargo, 
							ComentariosAdicionales,	Recomendaciones, Observaciones, PrimerEmpleo, CabezaFamilia)
					SELECT IdSolicitud, CedulaCandidato, CodMunicipio, Municipio, CodCiudad, Ciudad, FechaPreEntrevista, FechaEntrevista, Edad, Sexo, EstadoCivil, TipoVivienda, 
						CodCiudadCandidato, CiudadCandidato, BarrioCandidato, NucleoFamiliar, TieneProcesoActivo, CandidatoProcesoActivo, Primaria, Bachillerato, Tecnico, 
						Tecnologo, Profesional, Postgrado, CuentaConCertificado, FortalezasCargo, HabilidadesCargo, ComentariosAdicionales, Recomendaciones, ObservacionesEntrevista, 
						PrimerEmpleo, CabezaFamilia
					FROM #EntrevistaTemporal 
				END
			END TRY

			BEGIN CATCH
				BEGIN
					SELECT
							ERROR_NUMBER() AS ErrorNumber,
							ERROR_SEVERITY() AS ErrorSeverity,
							ERROR_STATE() AS ErrorState,
							ERROR_PROCEDURE() AS ErrorProcedure,
							ERROR_LINE() AS ErrorLine,
							ERROR_MESSAGE() AS ErrorMessage,
							ErrorResult = 'NO se pudo realizar el guardado de la entrevista',
							ErrorLog = 1
					ROLLBACK TRAN
					RETURN
				END
			END CATCH
		END

	ELSE 
		BEGIN 
			--MODIFICAR LA ENTREVISTA
			BEGIN TRY
				BEGIN
					--MODIFICAR LA ENTREVISTA EXISTENTE
					UPDATE Requisiciones_Entrevista
					SET CodMunicipio = A.CodMunicipio, Municipio = A.Municipio, CodCiudad = A.CodCiudad, Ciudad = A.Ciudad, FechaPreEntrevista = A.FechaPreEntrevista, 
						FechaEntrevista = A.FechaEntrevista, Edad = A.Edad, Sexo = A.Sexo, EstadoCivil = A.EstadoCivil, TipoVivienda = A.TipoVivienda, 
						CodCiudadCandidato = A.CodCiudadCandidato, CiudadCandidato = A.CiudadCandidato, BarrioCandidato = A.BarrioCandidato, NucleoFamiliar = A.NucleoFamiliar,
						TieneProcesoActivo = A.TieneProcesoActivo, CandidatoProcesoActivo = A.CandidatoProcesoActivo, Primaria = A.Primaria, Bachillerato = A.Bachillerato,
						Tecnico = A.Tecnico, Tecnologo = A.Tecnologo, Profesional = A.Profesional, Postgrado = A.Postgrado, CuentaConCertificado = A.CuentaConCertificado, 
						FortalezasCargo = A.FortalezasCargo, HabilidadesCargo = A.HabilidadesCargo, ComentariosAdicionales = A.ComentariosAdicionales, 
						Recomendaciones = A.Recomendaciones, Observaciones = A.ObservacionesEntrevista, PrimerEmpleo = A.PrimerEmpleo, CabezaFamilia= A.CabezaFamilia
					FROM #EntrevistaTemporal A
					INNER JOIN Requisiciones_Entrevista B ON A.IdSolicitud = B.IdSolicitud AND A.CedulaCandidato = B.CedulaCandidato
				END
			END TRY

			BEGIN CATCH
				BEGIN
					SELECT
							ERROR_NUMBER() AS ErrorNumber,
							ERROR_SEVERITY() AS ErrorSeverity,
							ERROR_STATE() AS ErrorState,
							ERROR_PROCEDURE() AS ErrorProcedure,
							ERROR_LINE() AS ErrorLine,
							ERROR_MESSAGE() AS ErrorMessage,
							ErrorResult = 'NO se pudo realizar la modificación de la entrevista',
							ErrorLog = 1
					ROLLBACK TRAN
					RETURN
				END
			END CATCH		
		END




	--EXCEPCION DOCUMENTO DE LA SOLICITUD
	IF NOT EXISTS (SELECT * FROM Requisiciones_SolicitudesDocumentos WHERE IdSolicitud = @IdSolicitud AND Cedula = @CedulaCandidato AND IdDocumento = 2)
		BEGIN 
			--INSERTAR LOS DATOS DEL DOCUMENTO DE ENTREVISTA
			BEGIN TRY
				BEGIN				
					INSERT INTO Requisiciones_SolicitudesDocumentos (IdSolicitud, Cedula, IdDocumento, Archivo, Seleccionado, Observaciones, FechaCreacion)
					SELECT IdSolicitud, CedulaCandidato, IdDocumento, Archivo, Seleccionado, ObservacionesDocumentos, FechaCreacion
					FROM #EntrevistaTemporal 
				END
			END TRY
		
			BEGIN CATCH
				BEGIN
					SELECT
							ERROR_NUMBER() AS ErrorNumber,
							ERROR_SEVERITY() AS ErrorSeverity,
							ERROR_STATE() AS ErrorState,
							ERROR_PROCEDURE() AS ErrorProcedure,
							ERROR_LINE() AS ErrorLine,
							ERROR_MESSAGE() AS ErrorMessage,
							ErrorResult = 'NO se pudo realizar el guardado del documento de la entrevista',
							ErrorLog = 1
					ROLLBACK TRAN
					RETURN
				END
			END CATCH
		END

	ELSE 
		BEGIN 
			--MODIFICAR EL REGISTRO DEL DOCUMENTO DE LA ENTREVISTA
			BEGIN TRY
				BEGIN
					UPDATE Requisiciones_SolicitudesDocumentos
					SET Archivo = A.Archivo, Seleccionado = A.Seleccionado, Observaciones = A.ObservacionesDocumentos, FechaCreacion = A.FechaCreacion
					FROM #EntrevistaTemporal A
					INNER JOIN Requisiciones_SolicitudesDocumentos B ON A.IdSolicitud = B.IdSolicitud AND A.CedulaCandidato = B.Cedula AND A.IdDocumento = B.IdDocumento
				END
			END TRY

			BEGIN CATCH
				BEGIN
					SELECT
							ERROR_NUMBER() AS ErrorNumber,
							ERROR_SEVERITY() AS ErrorSeverity,
							ERROR_STATE() AS ErrorState,
							ERROR_PROCEDURE() AS ErrorProcedure,
							ERROR_LINE() AS ErrorLine,
							ERROR_MESSAGE() AS ErrorMessage,
							ErrorResult = 'NO se pudo realizar la modificación del documento de la entrevista',
							ErrorLog = 1
					ROLLBACK TRAN
					RETURN
				END
			END CATCH
		END


	


	--EXCEPCION PARA ELIMINAR LA EXPERIENCIA LABORAL
	BEGIN TRY
		BEGIN
			--EXPERIENCIA LABORAL
			DELETE FROM Requisiciones_ExperienciaLaboral
			WHERE IdSolicitud = @IdSolicitud AND CedulaCandidato = @CedulaCandidato
		END
	END TRY

	BEGIN CATCH
		BEGIN
			SELECT
					ERROR_NUMBER() AS ErrorNumber,
					ERROR_SEVERITY() AS ErrorSeverity,
					ERROR_STATE() AS ErrorState,
					ERROR_PROCEDURE() AS ErrorProcedure,
					ERROR_LINE() AS ErrorLine,
					ERROR_MESSAGE() AS ErrorMessage,
					ErrorResult = 'ERROR: Eliminar Experiencia Laboral',
					ErrorLog = 1
			ROLLBACK TRAN
			RETURN
		END
	END CATCH
	



	--EXCEPCION PARA ELIMINAR LOS TITULOS ACADEMICOS
	BEGIN TRY
		BEGIN
			--TITULOS ACADEMICOS
			DELETE FROM Requisiciones_EntrevistaTitulos
			WHERE IdSolicitud = @IdSolicitud AND CedulaCandidato = @CedulaCandidato
		END
	END TRY

	BEGIN CATCH
		BEGIN
			SELECT
					ERROR_NUMBER() AS ErrorNumber,
					ERROR_SEVERITY() AS ErrorSeverity,
					ERROR_STATE() AS ErrorState,
					ERROR_PROCEDURE() AS ErrorProcedure,
					ERROR_LINE() AS ErrorLine,
					ERROR_MESSAGE() AS ErrorMessage,
					ErrorResult = 'ERROR: Eliminar Titulos Academicos',
					ErrorLog = 1
			ROLLBACK TRAN
			RETURN
		END
	END CATCH



	--FINALIZAR ENTREVISTA
	IF @FinEntrevista = 1
		BEGIN 

			--EXCEPCION PARA MODIFICAR EL ESTADO DEL CANDIDATO
			BEGIN TRY
				BEGIN
					--MODIFICAR ESTADO DEL CANDIDATO
					UPDATE Requisiciones_SolicitudesCandidatos
					SET IdEstadoCandidato = A.IdEstadoCandidato, OrdenSeleccion = A.OrdenSeleccionCandidato, IdEstadoReclutador = a.IdEstadoReclutadorCandidato,
						IdRazonRechazoCandidato = A.IdRazonRechazoCandidato
					FROM #EntrevistaTemporal A
					INNER JOIN Requisiciones_SolicitudesCandidatos B ON A.IdSolicitud = B.IdSolicitud AND A.CedulaCandidato = B.Cedula
				END
			END TRY

			BEGIN CATCH
				BEGIN
					SELECT
							ERROR_NUMBER() AS ErrorNumber,
							ERROR_SEVERITY() AS ErrorSeverity,
							ERROR_STATE() AS ErrorState,
							ERROR_PROCEDURE() AS ErrorProcedure,
							ERROR_LINE() AS ErrorLine,
							ERROR_MESSAGE() AS ErrorMessage,
							ErrorResult = 'ERROR: Modificar estado del candidato.',
							ErrorLog = 1
					ROLLBACK TRAN
					RETURN
				END
			END CATCH


			--EXCEPCION PARA MODIFICAR EL ESTADO DEL RECLUTADOR EN LA SOLICITUD
			BEGIN TRY
				BEGIN
					--MODIFICAR ESTADO DEL RECLUTADOR EN LA SOLICITUD
					IF (SELECT IdEstadoReclutador FROM #EntrevistaTemporal) <> 0
						BEGIN 
							UPDATE Requisiciones_Solicitudes
							SET IdEstadoReclutador = A.IdEstadoReclutador
							FROM #EntrevistaTemporal A
							INNER JOIN Requisiciones_Solicitudes B ON A.IdSolicitud = B.IdSolicitud 
						END
				END
			END TRY

			BEGIN CATCH
				BEGIN
					SELECT
							ERROR_NUMBER() AS ErrorNumber,
							ERROR_SEVERITY() AS ErrorSeverity,
							ERROR_STATE() AS ErrorState,
							ERROR_PROCEDURE() AS ErrorProcedure,
							ERROR_LINE() AS ErrorLine,
							ERROR_MESSAGE() AS ErrorMessage,
							ErrorResult = 'ERROR: Modificar estado del reclutador',
							ErrorLog = 1
					ROLLBACK TRAN
					RETURN
				END
			END CATCH


			--EXCEPCION PARA INSERTAR EL HISTORICO DEL CANDIDATO
			BEGIN TRY
				BEGIN
					--HISTORICO CANDIDATO
					INSERT INTO Requisiciones_HistoricoCandidato (IdSolicitud, CedulaCandidato, IdEstadoCandidato, Observaciones, UserModifico, FechaModificacion, OrdenSeleccion)
					SELECT IdSolicitud, CedulaCandidato, IdEstadoCandidato, ObservacionesCandidato, UserModifico, FechaModificacion, OrdenSeleccionCandidato
					FROM #EntrevistaTemporal
				END
			END TRY

			BEGIN CATCH
				BEGIN
					SELECT
							ERROR_NUMBER() AS ErrorNumber,
							ERROR_SEVERITY() AS ErrorSeverity,
							ERROR_STATE() AS ErrorState,
							ERROR_PROCEDURE() AS ErrorProcedure,
							ERROR_LINE() AS ErrorLine,
							ERROR_MESSAGE() AS ErrorMessage,
							ErrorResult = 'ERROR: Historico Candidato',
							ErrorLog = 1
					ROLLBACK TRAN
					RETURN
				END
			END CATCH

			--EXCEPCION PARA INSERTAR EL HISTORICO DEL RECLUTADOR
			BEGIN TRY
				BEGIN
					--HISTORICO RECLUTADOR
					INSERT INTO Requisiciones_HistoricoReclutador(IdSolicitud, CedulaCandidato, IdEstadoReclutador, Observaciones, UserModifico, FechaModificacion)
					SELECT IdSolicitud, CedulaCandidato, IdEstadoReclutadorCandidato, '', UserModifico, FechaModificacion
					FROM #EntrevistaTemporal
				END
			END TRY

			BEGIN CATCH
				BEGIN
					SELECT
							ERROR_NUMBER() AS ErrorNumber,
							ERROR_SEVERITY() AS ErrorSeverity,
							ERROR_STATE() AS ErrorState,
							ERROR_PROCEDURE() AS ErrorProcedure,
							ERROR_LINE() AS ErrorLine,
							ERROR_MESSAGE() AS ErrorMessage,
							ErrorResult = 'ERROR: Historico Reclutador',
							ErrorLog = 1
					ROLLBACK TRAN
					RETURN
				END
			END CATCH
		
		END

	ELSE 
		BEGIN 
			--EXCEPCION PARA INSERTAR EL HISTORICO DE LA PRE ENTREVISTA
			BEGIN TRY
				BEGIN
					--HISTORICO PRE ENTREVISTA
					INSERT INTO Requisiciones_HistoricoPreEntrevista (IdSolicitud, CedulaCandidato, Observaciones, UserModifico, FechaModificacion)
					SELECT IdSolicitud, CedulaCandidato, ObservacionesCandidato, UserModifico, FechaModificacion
					FROM #EntrevistaTemporal
				END
			END TRY

			BEGIN CATCH
				BEGIN
					SELECT
							ERROR_NUMBER() AS ErrorNumber,
							ERROR_SEVERITY() AS ErrorSeverity,
							ERROR_STATE() AS ErrorState,
							ERROR_PROCEDURE() AS ErrorProcedure,
							ERROR_LINE() AS ErrorLine,
							ERROR_MESSAGE() AS ErrorMessage,
							ErrorResult = 'ERROR: Historico Pre Entrevista',
							ErrorLog = 1
					ROLLBACK TRAN
					RETURN
				END
			END CATCH
		
		END

	--ELIMINAR LA INFORMACION DEL CANDIDATO EN LA TABLA TEMPORAL
	DELETE FROM Requisiciones_Entrevista_Temp WHERE IdSolicitud = @IdSolicitud AND CedulaCandidato = @CedulaCandidato

	--ELIMINAR TABLA TEMPORAL
	IF OBJECT_ID(N'tempdb.dbo.#EntrevistaTemporal', N'U') IS NOT NULL
		DROP TABLE #EntrevistaTemporal


	COMMIT TRAN


	SELECT ErrorNumber = 0, ErrorSeverity = 0, ErrorState = 0, ErrorProcedure = '', ErrorLine = 0, ErrorMessage = '', ErrorResult = 'Sin Errores', ErrorLog = 2
	RETURN 
END

```
