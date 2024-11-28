# Stored Procedure: SCC_sp_Estado_Tarea

## Usa los objetos:
- [[SCC_Tramite_Solicitud]]

```sql
-- =============================================
-- Author:	David Galindo
-- Create date:	Noviembre 2015
-- Description: Consulta para dropdownlist 
-- 30-03-2016 Se incluye parametro indicador para filtro 
-- =============================================
CREATE PROCEDURE [dbo].[SCC_sp_Estado_Tarea]
	@indicador VARCHAR(20)
AS
BEGIN
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

    IF @indicador = 'AplicaTarea'
    BEGIN
	   SELECT Ind_tramite AS Estado,
			Descripcion
	   FROM SCC_Tramite_Solicitud
	   WHERE AplicaTarea = 1;
    END;

    IF @indicador = 'AplicaItemPorAprobar'
    BEGIN
	   SELECT Ind_tramite AS Estado,
			Descripcion
	   FROM SCC_Tramite_Solicitud
	   WHERE AplicaItemPorAprobar = 1;
    END;
END;

```
