# Stored Procedure: sp_Descargos_EvidenciasByDescargo

## Usa los objetos:
- [[Descargos_Evidencias]]

```sql

CREATE PROC [dbo].[sp_Descargos_EvidenciasByDescargo]
(
	@IdDescargo BIGINT,	
	@TipoConsulta NVARCHAR(20)	
) AS

BEGIN
	
	SET NOCOUNT ON
	SET FMTONLY OFF
	
	--DECLARE	@IdDescargo BIGINT,	@TipoConsulta NVARCHAR(20)	
	--SET	@IdDescargo = 2
	--SET	@TipoConsulta = 'SOLICITANTE'

	--Consulta de Todos los Documentos a Excepcion del Contrato
	IF @TipoConsulta = 'SOLICITANTE'
	BEGIN
		
		SELECT TipoConsulta,IdSolicitud,IdEvidencia,NombreArchivo,UrlDocumento,FechaAnexo 
		FROM 
		(
			SELECT TipoConsulta = 'PROCESO', A.IdSolicitud, A.IdEvidencia, A.NombreArchivo, 
				A.UrlDocumento, A.FechaAnexo 
			FROM Descargos_Evidencias A
			WHERE A.IdSolicitud = @IdDescargo 
				AND A.IdEvidencia <> 'CO' 
				AND A.IdEvidencia NOT LIKE 'E%'					

			UNION ALL

			SELECT TipoConsulta = 'EMPLEADO', A.IdSolicitud, A.IdEvidencia, A.NombreArchivo, 
				A.UrlDocumento, A.FechaAnexo 
			FROM Descargos_Evidencias A
			WHERE A.IdSolicitud = @IdDescargo 		
				AND A.IdEvidencia LIKE 'E%'
		) Solicitante

	END


	--Consulta de Todos los Documentos
	ELSE IF @TipoConsulta = 'GENERAL'
	BEGIN 
		
		SELECT TipoConsulta,IdSolicitud,IdEvidencia,NombreArchivo,UrlDocumento,FechaAnexo 
		FROM 
		(
			SELECT TipoConsulta = 'PROCESO', A.IdSolicitud, A.IdEvidencia, A.NombreArchivo, 
				A.UrlDocumento, A.FechaAnexo 
			FROM Descargos_Evidencias A
			WHERE A.IdSolicitud = @IdDescargo 
				AND A.IdEvidencia NOT LIKE 'E%'

			UNION ALL

			SELECT TipoConsulta = 'EMPLEADO', A.IdSolicitud, A.IdEvidencia, A.NombreArchivo, 
				A.UrlDocumento, A.FechaAnexo 
			FROM Descargos_Evidencias A
			WHERE A.IdSolicitud = @IdDescargo 
				AND A.IdEvidencia LIKE 'E%'
		) G

	END


	ELSE IF @TipoConsulta = 'PREGUNTAS-CITACION'--Consultar Los documentos de Citación y Preguntas
	BEGIN 

		SELECT TipoConsulta = 'PREGUNTAS-CITACION',IdSolicitud,IdEvidencia,NombreArchivo,UrlDocumento,FechaAnexo 
		FROM Descargos_Evidencias A
		WHERE A.IdSolicitud = @IdDescargo 
			AND A.IdEvidencia IN ('CI', 'PR')

	END


	ELSE --Consultar el Documento de Sanción
	BEGIN 

		SELECT TipoConsulta = 'SANCION',IdSolicitud,IdEvidencia,NombreArchivo,UrlDocumento,FechaAnexo 
		FROM Descargos_Evidencias A
		WHERE A.IdSolicitud = @IdDescargo 
			AND A.IdEvidencia IN ('SA')
		
	END

END

```
