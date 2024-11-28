# Stored Procedure: SCC_sp_SRS_Cierre 

## Usa los objetos:
- [[SCC_Cabeza]]
- [[SCC_ITEM]]
- [[SCC_Prueba]]

```sql
-- =============================================
-- Author:		Angélica Maricela Garcia Galvis
-- Create date:	Agosto 2017
-- Description:	Realiza las Consulta de las Solicitudes que se encuentran Entregadas
-- Cadena Ejecución: SCC_sp_SRS_Cierre 
-- =============================================
CREATE PROCEDURE [dbo].[SCC_sp_SRS_Cierre ]
	
AS
BEGIN
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

    SET NOCOUNT ON;

	DECLARE @FechaFinal DATETIME = GETDATE();

    WITH CERRAR
	    AS (SELECT IT.Nro_Formato,
				IT.Nro_item
		   FROM SCC_ITEM AS IT
		   INNER JOIN SCC_Cabeza AS CAB ON IT.Nro_Formato = CAB.Nro_Formato
		   INNER JOIN SCC_Prueba AS PR ON IT.Nro_Formato = PR.Nro_Formato
		   WHERE IT.Ind_Tramite = 5
			    AND IT.FechaDeEntrega < DATEADD(DAY, -8, @FechaFinal)
			    AND IT.FechaDeEntrega > '19000101'
			   )

	    UPDATE SCC_ITEM
		 SET Ind_Tramite = 6,
			FormaDeValidacion = ' Fecha de Validación Asignada por el sistema, no se recibio retroalimentación del Gerente de Proyectos y/o Consultor',
			Fecha_Recibo_ValidaClient = GETDATE()
			
	    FROM SCC_ITEM AS IT
	    INNER JOIN CERRAR AS CR ON IT.Nro_Formato = CR.Nro_Formato AND IT.Nro_item = CR.Nro_item;

END;


```
