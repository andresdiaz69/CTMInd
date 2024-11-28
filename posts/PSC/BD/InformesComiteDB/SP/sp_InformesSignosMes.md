# Stored Procedure: sp_InformesSignosMes

```sql



-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
create PROCEDURE [dbo].[sp_InformesSignosMes]
	-- Add the parameters for the stored procedure here
	@Arbol as int = 17

AS
BEGIN

	SET NOCOUNT ON;
		
	update #TablaTemporal1 set Anterior = Anterior * (-1), Actual = Actual * (-1) , Presupuesto = Presupuesto * (-1) where DebeHaber = 'H'

END





```
