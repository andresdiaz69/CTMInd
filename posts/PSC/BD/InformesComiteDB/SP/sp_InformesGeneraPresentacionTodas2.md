# Stored Procedure: sp_InformesGeneraPresentacionTodas2

## Usa los objetos:
- [[InformesPresentaciones]]
- [[InformesPresentacionesSedes]]
- [[InformesSedesCentros]]
- [[sp_GetErrorInfo]]
- [[sp_InformesGeneraPresentacion]]

```sql
-- =============================================
-- Author:		Freddy Guerrero
-- Create date: 2019/02/22
-- Description:	Generacion anual de todas Presentaciones
-- 20190719 -- Se quitaron los filtros de compañías
-- =============================================
CREATE PROCEDURE [dbo].[sp_InformesGeneraPresentacionTodas2] 
	
	@Año as smallint,
	@Mes as smallint,
	@Mes_Acum as bit = 0,
	@PyG_Balance as bit	= 0
	
AS
BEGIN

	SET NOCOUNT ON;

	DECLARE @Redondeo bit = 0
	DECLARE @CodigoPresentacion AS tinyint
	DECLARE @NombrePresentacion AS nvarchar(100)
	DECLARE Presentaciones_cursor CURSOR FOR  
		select distinct a.CodigoPresentacion,a.NombrePresentacion 
		from InformesPresentaciones a
			left join InformesPresentacionesSedes b on a.CodigoPresentacion = b.CodigoPresentacion 
			left join InformesSedesCentros c on b.CodigoSede = c.CodigoSede 
		where	
			CentroID is not null 
			and a.CodigoPresentacion not in (18,44,1,38,2,43)  -- Se retiran las presentaciones de JD Antiguas
			--and	a.CodigoPresentacion in (1,2,18)
			--and	NombrePresentacion not like '%USC%'
			--and NombrePresentacion not like '%Digital%'
			order by CodigoPresentacion 

	OPEN Presentaciones_cursor;  

	-- Perform the first fetch.  
	FETCH NEXT FROM Presentaciones_cursor INTO @CodigoPresentacion,@NombrePresentacion 

	WHILE @@FETCH_STATUS = 0  
	BEGIN  
		RAISERROR ( @NombrePresentacion ,   0 ,   1 ) WITH NOWAIT WAITFOR   DELAY   '00:00:01' ;

		BEGIN TRY
			exec sp_InformesGeneraPresentacion @CodigoPresentacion,@Año,@Mes,@Mes_Acum,@PyG_Balance,0,@Redondeo -- Presentacion,Año,Mes,Mensual/Acumulado,Pyg/Balance,Retorna Valores/Tabla
			Select  @CodigoPresentacion,@Año,@Mes,@Mes_Acum,@PyG_Balance,0,@Redondeo -- Presentacion,Año,Mes,Mensual/Acumulado,Pyg/Balance,Retorna Valores/Tabla
		END TRY  
		BEGIN CATCH 
			EXECUTE sp_GetErrorInfo @NombrePresentacion		
			rollback
		END CATCH; 

		FETCH NEXT FROM Presentaciones_cursor INTO @CodigoPresentacion,@NombrePresentacion
	END  

	CLOSE Presentaciones_cursor;  
	DEALLOCATE Presentaciones_cursor; 

END






```
