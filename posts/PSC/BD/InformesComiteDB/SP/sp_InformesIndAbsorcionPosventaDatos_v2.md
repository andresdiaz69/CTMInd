# Stored Procedure: sp_InformesIndAbsorcionPosventaDatos_v2

## Usa los objetos:
- [[informesIndAbsorcionPosventa_v2]]
- [[InformesPresentaciones]]
- [[sp_InformesIndAbsorcionPosventaAnualSedes_v2]]

```sql




-- =============================================
-- Author:		Freddy Guerrero
-- Create date: 2019/08/05
-- Description:	Absorcion Posventa Totalizado por lineas
-- =============================================
CREATE PROCEDURE [dbo].[sp_InformesIndAbsorcionPosventaDatos_v2]
	-- Add the parameters for the stored procedure here
	@Año as int

AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @Empresa as int = 0

	-- Declare the variables to store the values returned by FETCH.  
	DECLARE @NombrePresentacion nvarchar(50),@CodigoPresentacion as smallint
  
	DECLARE contact_cursor CURSOR FOR  
	SELECT NombrePresentacion,CodigoPresentacion FROM InformesPresentaciones where PresentacionPrincipal <> 0 and EmpresaPrincipal = (case when @Empresa=0 then EmpresaPrincipal else @Empresa end) --and CodigoPresentacion not in (54,55,49,38)
	--SELECT NombrePresentacion,CodigoPresentacion FROM InformesPresentaciones where PresentacionPrincipal <> 0 and CodigoPresentacion in (54,55,49,38)
  
	OPEN contact_cursor
  
	FETCH NEXT FROM contact_cursor  
	INTO @NombrePresentacion, @CodigoPresentacion;  
  
	-- Check @@FETCH_STATUS to see if there are any more rows to fetch.  
	WHILE @@FETCH_STATUS = 0  
	BEGIN  

		--PRINT @NombrePresentacion
		RAISERROR ( @NombrePresentacion ,   0 ,   1 )   WITH   NOWAIT WAITFOR   DELAY   '00:00:05' ;
  
		exec sp_InformesIndAbsorcionPosventaAnualSedes_v2 @CodigoPresentacion,@Año

		FETCH NEXT FROM contact_cursor  
		INTO @NombrePresentacion, @CodigoPresentacion;  

	END  
  
	CLOSE contact_cursor
	DEALLOCATE contact_cursor

	select * from informesIndAbsorcionPosventa_v2

END


```
