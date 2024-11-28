# Stored Procedure: sp_Requisiciones_TituloAcademico

## Usa los objetos:
- [[Requisiciones_EntrevistaTitulos]]

```sql

CREATE PROCEDURE [dbo].[sp_Requisiciones_TituloAcademico]
(
	@IdSolicitud INT, 
	@CedulaCandidato BIGINT
) AS 
BEGIN

	--DECLARE @IdSolicitud INT, @CedulaCandidato BIGINT 
	--SET @IdSolicitud = 7207
	--SET @CedulaCandidato = 1001060957

	SELECT	ISNULL(CAST((ROW_NUMBER() OVER(ORDER BY  CedulaCandidato)) AS INT),0) Id,
			IdSolicitud,		CedulaCandidato,		TituloObtenido, 
			Institucion,		AnoTitulo
	FROM Requisiciones_EntrevistaTitulos
	WHERE CedulaCandidato = @CedulaCandidato
		AND IdSolicitud = @IdSolicitud 
	
END

```
