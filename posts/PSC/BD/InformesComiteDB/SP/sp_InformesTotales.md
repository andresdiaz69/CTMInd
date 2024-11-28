# Stored Procedure: sp_InformesTotales

```sql

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_InformesTotales]
	-- Add the parameters for the stored procedure here
	--<@Param1, sysname, @p1> <Datatype_For_Param1, , int> = <Default_Value_For_Param1, , 0>, 
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    DECLARE @Anterior as Decimal(38,4)	
	DECLARE @Actual as Decimal(38,4)	
	DECLARE @Presupuesto as Decimal(38,4)	
	DECLARE @Orden as int

	IF (SELECT COUNT(*) FROM #TotalTemporal) = 0
	BEGIN
		insert into #TotalTemporal select   CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Orden,Balance,
											CodigoConcepto,NombreConcepto,Sede,Anterior,AntPorcentaje,Actual,ActPorcentaje,
											Presupuesto,PrePorcentaje,Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6 from #TablaTemporal1			

		Update #TotalTemporal set Sede = 'Total'
	END
	ELSE
	BEGIN
	
		DECLARE Total_cursor CURSOR FOR  
		SELECT Anterior,Actual,Presupuesto,Orden FROM #TablaTemporal1
		OPEN Total_cursor;  

		FETCH NEXT FROM Total_cursor INTO @Anterior,@Actual,@Presupuesto,@Orden  
		WHILE @@FETCH_STATUS = 0  
		BEGIN  
		   -- This is executed as long as the previous fetch succeeds.  
		   UPDATE #TotalTemporal 
		   SET #TotalTemporal.anterior = #TotalTemporal.anterior + @Anterior, 
			   #TotalTemporal.actual = #TotalTemporal.actual + @Actual,
			   #TotalTemporal.presupuesto = #TotalTemporal.presupuesto + @Presupuesto 
			WHERE #TotalTemporal.orden = @Orden

		   FETCH NEXT FROM Total_cursor INTO @Anterior,@Actual,@Presupuesto,@Orden    
		END  

		CLOSE Total_cursor
		DEALLOCATE Total_cursor

	END
END



```
