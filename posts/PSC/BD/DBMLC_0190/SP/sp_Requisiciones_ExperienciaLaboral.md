# Stored Procedure: sp_Requisiciones_ExperienciaLaboral

## Usa los objetos:
- [[Requisiciones_ExperienciaLaboral]]

```sql

CREATE PROCEDURE [dbo].[sp_Requisiciones_ExperienciaLaboral]
(
	@IdSolicitud INT, 
	@CedulaCandidato BIGINT
) AS 
BEGIN

	--DECLARE @IdSolicitud INT, @CedulaCandidato BIGINT 
	--SET @IdSolicitud = 7207
	--SET @CedulaCandidato = 1001060957

	SELECT	ISNULL(CAST((ROW_NUMBER() OVER(ORDER BY  CedulaCandidato)) AS INT),0) Id,
			IdSolicitud,		CedulaCandidato,		Empresa,			FechaDesde,			
			FechaHasta,			Cargo,					Funciones,			MotivoRetiro
	FROM Requisiciones_ExperienciaLaboral
	WHERE CedulaCandidato = @CedulaCandidato
		AND IdSolicitud = @IdSolicitud 
	
END

```
