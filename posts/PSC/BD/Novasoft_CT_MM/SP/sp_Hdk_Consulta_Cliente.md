# Stored Procedure: sp_Hdk_Consulta_Cliente

## Usa los objetos:
- [[Hdk_ClienteLic]]
- [[Hdk_Usuario]]
- [[Hdk_Usuario_Cliente]]

```sql
-- =============================================
-- Author:		Ricardo Santamaría Vanegas
-- Create date: Enero 27 de 2021
-- Description:	Consulta Cliente por Usuario

-- Modificado:	Jessy Tatiana Peralta
-- Create date: Agosto 8 de 2021
-- Description:	Se agrega el codigo del cliente.

-- =============================================
CREATE PROCEDURE [dbo].[sp_Hdk_Consulta_Cliente]
	@cUsuario VARCHAR(128) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    IF @cUsuario IS NULL OR @cUsuario = '%'
    BEGIN
	   RETURN;
    END;

    SELECT DISTINCT
		 U.Id_Usuario,
		 UC.Id_ClienteLic,
		 UC.cod_emp,
		 C.nom_emplic,
		 C.nit_emplic,
		 C.cod_cli,
		 C.cod_emplic
    FROM Hdk_Usuario AS U
    INNER JOIN Hdk_Usuario_Cliente AS UC ON U.Id_Usuario = UC.Id_Usuario
    INNER JOIN Hdk_ClienteLic AS C ON C.Id_ClienteLic = UC.Id_ClienteLic
    WHERE U.Usuario = @cUsuario--'aaponteb'

END;

```
