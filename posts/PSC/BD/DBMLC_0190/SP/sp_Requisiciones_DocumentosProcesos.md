# Stored Procedure: sp_Requisiciones_DocumentosProcesos

## Usa los objetos:
- [[Requisiciones_Documentos]]
- [[Requisiciones_SolicitudesDocumentos]]

```sql

CREATE PROCEDURE [dbo].[sp_Requisiciones_DocumentosProcesos] 
(
	@IdSolicitud int,
	@CedulaCandidato bigint
) AS

BEGIN

--DECLARE 
--	@IdSolicitud int,
--	@CedulaCandidato bigint

--	SET @IdSolicitud = 2902
--	SET @CedulaCandidato = 156695

	SELECT Doc.IdDocumento, Doc.Documento, Doc.Inicial, SD.IdSolicitud, SD.Cedula, (SD.Archivo)NomArchivo, SD.Seleccionado, SD.Observaciones, SD.FechaCreacion
	FROM Requisiciones_Documentos AS Doc
	LEFT JOIN 
	(
		SELECT IdSolicitud,Cedula,Archivo,Seleccionado,Observaciones,FechaCreacion,IdDocumento
		FROM Requisiciones_SolicitudesDocumentos  
		WHERE IdSolicitud = @IdSolicitud AND Cedula = @CedulaCandidato
	) SD ON SD.IdDocumento = Doc.IdDocumento 

END 

```
