# Stored Procedure: SCC_sp_ActulizaEstados

## Usa los objetos:
- [[SCC_ITEM]]

```sql
-- =============================================
-- Author:		Angélica Maricela Garcia Galvis
-- Create date:	Abril 2.016
-- Description:	Actualiza los Estados en las tablas correspondientes.
-- EXEC 		SCC_sp_ActulizaEstados 1,1,2		
-- =============================================
CREATE PROCEDURE [dbo].[SCC_sp_ActulizaEstados]
@Nro_Formato INT,
@Nro_item INT,
@Ind_tramite TINYINT
AS
BEGIN
    UPDATE SCC_ITEM
    SET Ind_tramite = @Ind_tramite
    WHERE Nro_Formato = @Nro_Formato
    AND Nro_item = @Nro_item

END


```
