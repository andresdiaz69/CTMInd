# Stored Procedure: sp_InformesFormatoMes

```sql



-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_InformesFormatoMes]
AS
BEGIN

	SET NOCOUNT ON;


	Declare @cmd as nvarchar(1000),@nColumnas as int,@cnt as int = 1

	select @nColumnas = count(*) from sys.columns where object_id = (select object_id from sys.tables where name='TablaPresentacionMes') and name like 'Anterior%' 

	WHILE @cnt <= @nColumnas
	BEGIN
		set @cmd='UPDATE TablaPresentacionMes SET Anterior'+ltrim(str(@cnt))+' = Anterior'+ltrim(str(@cnt))+' / 1000000,Actual'+ltrim(str(@cnt))+' = Actual'+ltrim(str(@cnt))+' / 1000000,Presupuesto'+ltrim(str(@cnt))+' = Presupuesto'+ltrim(str(@cnt))+' / 1000000'
		--print(@cmd)
		exec (@cmd)
		set @cnt = @cnt + 1
	END

	UPDATE #TotalTemporal SET	Anterior = Anterior / 1000000
								,Actual = Actual / 1000000
								,Presupuesto = Presupuesto / 1000000

END





```
