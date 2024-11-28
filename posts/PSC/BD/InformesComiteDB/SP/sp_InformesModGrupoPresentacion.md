# Stored Procedure: sp_InformesModGrupoPresentacion

## Usa los objetos:
- [[InformesPresentacionesGrupos]]

```sql


-- =======================================================================================================================================
-- Author:		LUIS FREDDY GUERRERO LOPEZ
-- Create date: 2020-05-07 ultima actualizacion
-- Description:	Modifica el grupo a una presentacion
-- =======================================================================================================================================

CREATE PROCEDURE [dbo].[sp_InformesModGrupoPresentacion] 

	@CodigoPresentacion as smallint,
	@Grupo as smallint
AS
BEGIN

	SET NOCOUNT ON

	delete from InformesPresentacionesGrupos where CodigoPresentacion  = @CodigoPresentacion

	Insert into InformesPresentacionesGrupos (CodigoGrupo,CodigoPresentacion)  values (@Grupo,@CodigoPresentacion)

END

```
