# Stored Procedure: sp_InformesSedeCartera

## Usa los objetos:
- [[InformesCentros]]
- [[InformesSedesCentros]]
- [[sp_InformesSaldoCartera]]

```sql

-- =======================================================================================================================================
-- Author:		LUIS FREDDY GUERRERO LOPEZ
-- Create date: 2018-10-12
-- Description:	Reune la cartera de una sede sumando la cartera de los centros principales
-- =======================================================================================================================================

CREATE PROCEDURE [dbo].[sp_InformesSedeCartera]
	@CodigoSede as int,
	@AñoActual as int,
	@MesActual as int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;

	DECLARE @Empresa as smallint
	DECLARE @CodigoCentro as smallint
	DECLARE @SaldoAnt as decimal(38,4),@SaldoAct as decimal(38,4)
	DECLARE @FechaCarteraAnterior as datetime,@FechaCarteraActual as datetime 
		
	SET @FechaCarteraActual = CONVERT(datetime, '01-'+ltrim(str(@MesActual))+'-'+ltrim(str(@AñoActual)),103)
	SET @FechaCarteraAnterior = CONVERT(VARCHAR(25),DATEADD(dd,-(DAY(@FechaCarteraActual)),@FechaCarteraActual),103)


	-- Inicializa los valores de la cartera
	update #TablaTemporal1 set Anterior = 0, Actual = 0	where Nivel1=100 and Nivel2=100 and Nivel3=200 and Nivel4=100 and Nivel5=200 and Nivel6=100
	update #TablaTemporal1 set Anterior = 0, Actual = 0	where Nivel1=100 and Nivel2=100 and Nivel3=200 and Nivel4=100 and Nivel5=200 and Nivel6=200
	update #TablaTemporal1 set Anterior = 0, Actual = 0 where Nivel1=100 and Nivel2=100 and Nivel3=200 and Nivel4=100 and Nivel5=200 and Nivel6=300
	update #TablaTemporal1 set Anterior = 0, Actual = 0 where Nivel1=100 and Nivel2=100 and Nivel3=200 and Nivel4=100 and Nivel5=200 and Nivel6=400
	update #TablaTemporal1 set Anterior = 0, Actual = 0 where Nivel1=100 and Nivel2=100 and Nivel3=200 and Nivel4=100 and Nivel5=200 and Nivel6=500

	-- Recorre los centros principales de la sede y suma su cartera por los tiempos determinados
	DECLARE Cartera_cursor CURSOR FOR  
		Select t2.Empresa,t2.CodigoCentro from InformesSedesCentros t1 left join InformesCentros t2 on t1.CentroID = t2.CentroID 
		where CodigoSede= @CodigoSede and t2.Activo=1
	OPEN Cartera_cursor;  

	FETCH NEXT FROM Cartera_cursor INTO @Empresa,@CodigoCentro  
	WHILE @@FETCH_STATUS = 0  
	BEGIN  

		exec sp_InformesSaldoCartera @Empresa,@CodigoCentro,@FechaCarteraAnterior,'E',0,30,null,null,@SaldoAnt output
		exec sp_InformesSaldoCartera @Empresa,@CodigoCentro,@FechaCarteraActual,'E',0,30,null,null,@SaldoAct output
		update #TablaTemporal1 set Anterior = Anterior + (@SaldoAnt * (-1)), Actual = Actual + (@SaldoAct * (-1)) 
		where Nivel1=100 and Nivel2=100 and Nivel3=200 and Nivel4=100 and Nivel5=200 and Nivel6=100

		exec sp_InformesSaldoCartera @Empresa,@CodigoCentro,@FechaCarteraAnterior,'E',31,90,null,null,@SaldoAnt output
		exec sp_InformesSaldoCartera @Empresa,@CodigoCentro,@FechaCarteraActual,'E',31,90,null,null,@SaldoAct output
		update #TablaTemporal1 set Anterior = Anterior + (@SaldoAnt * (-1)), Actual = Actual + (@SaldoAct * (-1)) 
		where Nivel1=100 and Nivel2=100 and Nivel3=200 and Nivel4=100 and Nivel5=200 and Nivel6=200

		exec sp_InformesSaldoCartera @Empresa,@CodigoCentro,@FechaCarteraAnterior,'E',91,180,null,null,@SaldoAnt output
		exec sp_InformesSaldoCartera @Empresa,@CodigoCentro,@FechaCarteraActual,'E',91,180,null,null,@SaldoAct output
		update #TablaTemporal1 set Anterior = Anterior + (@SaldoAnt * (-1)), Actual = Actual + (@SaldoAct * (-1)) 
		where Nivel1=100 and Nivel2=100 and Nivel3=200 and Nivel4=100 and Nivel5=200 and Nivel6=300

		exec sp_InformesSaldoCartera @Empresa,@CodigoCentro,@FechaCarteraAnterior,'E',181,360,null,null,@SaldoAnt output
		exec sp_InformesSaldoCartera @Empresa,@CodigoCentro,@FechaCarteraActual,'E',181,360,null,null,@SaldoAct output
		update #TablaTemporal1 set Anterior = Anterior + (@SaldoAnt * (-1)), Actual = Actual + (@SaldoAct * (-1))  
		where Nivel1=100 and Nivel2=100 and Nivel3=200 and Nivel4=100 and Nivel5=200 and Nivel6=400

		exec sp_InformesSaldoCartera @Empresa,@CodigoCentro,@FechaCarteraAnterior,'E',360,9999,null,null,@SaldoAnt output
		exec sp_InformesSaldoCartera @Empresa,@CodigoCentro,@FechaCarteraActual,'E',360,9999,null,null,@SaldoAct output
		update #TablaTemporal1 set Anterior = Anterior + (@SaldoAnt * (-1)), Actual = Actual + (@SaldoAct * (-1)) 
		where Nivel1=100 and Nivel2=100 and Nivel3=200 and Nivel4=100 and Nivel5=200 and Nivel6=500

		FETCH NEXT FROM Cartera_cursor INTO @Empresa,@CodigoCentro    
	END  

	CLOSE Cartera_cursor
	DEALLOCATE Cartera_cursor


END



```
