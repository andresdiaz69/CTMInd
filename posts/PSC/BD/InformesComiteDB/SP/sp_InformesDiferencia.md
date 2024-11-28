# Stored Procedure: sp_InformesDiferencia

```sql


-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_InformesDiferencia]
	-- Add the parameters for the stored procedure here
	@Arbol as int = 17

AS
BEGIN

	SET NOCOUNT ON;

	Declare @cmd as nvarchar(1000), @saldo as decimal(38,4),@nColumnas as int,@cnt as int = 1

	select @nColumnas = count(*) from sys.columns where object_id = (select object_id from sys.tables where name='TablaPresentacion') and name like 'Anterior%' 

	WHILE @cnt <= @nColumnas
	BEGIN
		set @cmd='update #TablaTemporal1 set anterior = anterior - (select sum(anterior'+ltrim(str(@cnt))+') from TablaPresentacion where TablaPresentacion.Orden=#TablaTemporal1.Orden)'
		exec (@cmd)
		set @cmd='update #TablaTemporal1 set actual = actual - (select sum(actual'+ltrim(str(@cnt))+') from TablaPresentacion where TablaPresentacion.Orden=#TablaTemporal1.Orden)'
		exec (@cmd)
		set @cmd='update #TablaTemporal1 set presupuesto = presupuesto - (select sum(presupuesto'+ltrim(str(@cnt))+') from TablaPresentacion where TablaPresentacion.Orden=#TablaTemporal1.Orden)'
		exec (@cmd)
		set @cnt = @cnt + 1
	END

END




```
