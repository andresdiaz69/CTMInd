# Stored Procedure: sp_prt_Consulta_deducibles

## Usa los objetos:
- [[Rhh_EmpleaDeducible]]
- [[rhh_tbdeducible]]

```sql

-- =============================================
-- Author:		<Alexander Vargas>
-- Create date: <19-02-2020>
-- Description:	<Consulta los historicos de los fondos de un empleado>
-- =============================================
CREATE PROCEDURE [dbo].[sp_prt_Consulta_deducibles] 
	-- Add the parameters for the stored procedure here
	@codemp	VARCHAR(12)
	

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

SELECT empded.*,tipded.des_deducible FROM Rhh_EmpleaDeducible empded
INNER JOIN rhh_tbdeducible tipded
ON empded.cod_deducible=tipded.cod_deducible 
WHERE Cod_emp=@codemp



END

```
