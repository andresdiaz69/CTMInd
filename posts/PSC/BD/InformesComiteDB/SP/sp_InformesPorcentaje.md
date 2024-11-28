# Stored Procedure: sp_InformesPorcentaje

```sql


/****** AUTHOR: JUAN CARLOS SÁNCHEZ ROBLES ******/
/****** DESCRIPTION: ESTRUCTURA ADICIONAL INFORMES COMITÉ ******/
/****** DATE: 2018/09/10 ******/


-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_InformesPorcentaje]
	-- Add the parameters for the stored procedure here
	@Arbol as int = 17
AS
BEGIN

	SET NOCOUNT ON;

-- PORCENTAJES

	DECLARE @Divisor as Decimal(38,4)
	DECLARE @Ingresos as Decimal(38,4),
	@VentasBrutas as Decimal(38,4),
	@VentasBrutasNuevos as Decimal(38,4),
	@VentasBrutasUsados as Decimal(38,4),
	@VentasBrutasRepuestos as Decimal(38,4),
	@VentasBrutasManodeObra as Decimal(38,4),
	@VentasNetas as Decimal(38,4),
	@VentasNetasNuevos as Decimal(38,4),
	@VentasNetasNuevosSinBonificacion as Decimal(38,4),
	@VentasNetasUsados as Decimal(38,4),
	@VentasNetasRepuestos as Decimal(38,4),
	@VentasNetasManodeObra as Decimal(38,4),
	@VentasNetasOtrosIngresos as Decimal(38,4),
	@Veces as int,
	@Nivel1 as int,
	@Nivel2 as int,
	@Nivel3 as int,
	@Nivel4 as int,
	@Nivel5 as int,
	@Nivel6 as int,
	@Valor as Decimal(38,4),
	@Anterior as Decimal(38,4),
	@Actual as Decimal(38,4),
	@Presupuesto as Decimal(38,4),
	@Orden as int,
	@GastosPersonalComisiones as Decimal(38,4)



	set @Veces = 1
	
	WHILE @Veces <= 6
	BEGIN
		set @Divisor = 0


		--IF @Veces IN (1,2,3) BEGIN 
		--	SELECT Anterior,Actual,Presupuesto,Orden,Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6 FROM #TablaTemporal1 ORDER BY Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6
		--END
		--ELSE BEGIN
		--	SELECT Anterior,Actual,Presupuesto,Orden,Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6 FROM #TotalTemporal ORDER BY Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6
		--END

		IF @Veces IN (1,2,3) BEGIN 
			DECLARE Temp_cursor CURSOR FOR  
			SELECT Anterior,Actual,Presupuesto,Orden,Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6 FROM #TablaTemporal1 ORDER BY Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6
		END
		ELSE BEGIN
			DECLARE Temp_cursor CURSOR FOR  
			SELECT Anterior,Actual,Presupuesto,Orden,Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6 FROM #TotalTemporal ORDER BY Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6
		END

		OPEN Temp_cursor;  

		FETCH NEXT FROM Temp_cursor INTO @Anterior,@Actual,@Presupuesto,@Orden,@Nivel1,@Nivel2,@Nivel3,@Nivel4,@Nivel5,@Nivel6  
		WHILE @@FETCH_STATUS = 0  
		BEGIN  
			-- This is executed as long as the previous fetch succeeds.  
			
			IF @Veces IN (1,4)
				SET @Valor = @Anterior
			IF @Veces IN (2,5)
				SET @Valor = @Actual
			IF @Veces IN (3,6)
				SET @Valor = @Presupuesto

			
			IF @Nivel1=100 and @Nivel2 = 0 --@Orden = 1 
			BEGIN
					SET @Ingresos = @Valor
					SET @Divisor = @Valor
			END
			
			SET @Divisor = @Ingresos

			IF @Arbol = 17
			BEGIN

				IF @Nivel1=100 and @Nivel2=100 and @Nivel3=0 --@Orden = 2 
				BEGIN
						SET @VentasBrutas = @Valor
						SET @Divisor = @Valor
				END
				ELSE IF @Nivel1=100 and @Nivel2=100 and @Nivel3=100 and @Nivel4=0 --@Orden = 3 
				BEGIN
						SET @VentasBrutasNuevos = @Valor
						SET @Divisor = @VentasBrutas
				END
				ELSE IF @Nivel1=100 and @Nivel2=100 and @Nivel3=200 and @Nivel4=0 --@Orden = 4 
				BEGIN
						SET @VentasBrutasUsados = @Valor
						SET @Divisor = @VentasBrutas
				END
				ELSE IF @Nivel1=100 and @Nivel2=100 and @Nivel3=300 and @Nivel4=0 --@Orden = 5 
				BEGIN
						SET @VentasBrutasRepuestos = @Valor
						SET @Divisor = @VentasBrutas
				END
				ELSE IF @Nivel1=100 and @Nivel2=100 and @Nivel3=400 and @Nivel4=0 --@Orden = 6 
				BEGIN
						SET @VentasBrutasManodeObra = @Anterior
						SET @Divisor = @VentasBrutas
				END
				ELSE IF @Nivel1=100 and @Nivel2=200 and @Nivel3=0 --@Orden = 7 
				BEGIN
						SET @Divisor = @VentasBrutas
				END
				ELSE IF @Nivel1=100 and @Nivel2=200 and @Nivel3=100 and @Nivel4=0 --@Orden = 8 
				BEGIN
						SET @Divisor = @VentasBrutasNuevos
				END
				ELSE IF @Nivel1=100 and @Nivel2=200 and @Nivel3=200 and @Nivel4=0 --@Orden = 9 
				BEGIN
						SET @Divisor = @VentasBrutasUsados
				END
				ELSE IF @Nivel1=100 and @Nivel2=200 and @Nivel3=300 and @Nivel4=0 --@Orden = 10 
				BEGIN
						SET @Divisor = @VentasBrutasRepuestos
				END
				ELSE IF @Nivel1=100 and @Nivel2=200 and @Nivel3=400 and @Nivel4=0 --@Orden = 11 
				BEGIN
						SET @Divisor = @VentasBrutasManodeObra
				END
				ELSE IF @Nivel1=100 and @Nivel2=300 and @Nivel3=0 --@Orden = 12 
				BEGIN
						SET @Divisor = @VentasBrutas
				END
				ELSE IF @Nivel1=100 and @Nivel2=300 and @Nivel3=100 and @Nivel4=0 --@Orden = 13 
				BEGIN
						SET @Divisor = @VentasBrutasNuevos
				END
				ELSE IF @Nivel1=100 and @Nivel2=300 and @Nivel3=200 and @Nivel4=0 --@Orden = 14 
				BEGIN
						SET @Divisor = @VentasBrutasUsados
				END
				ELSE IF @Nivel1=100 and @Nivel2=300 and @Nivel3=300 and @Nivel4=0 --@Orden = 15 
				BEGIN
						SET @Divisor = @VentasBrutasRepuestos
				END
				ELSE IF @Nivel1=100 and @Nivel2=300 and @Nivel3=400 and @Nivel4=0 --@Orden = 16 
				BEGIN
						SET @Divisor = @VentasBrutasManodeObra
				END
				-- Ventas Netas
				-- Nuevos
				ELSE IF @Nivel1=100 and @Nivel2=400 and @Nivel3=0 --@Orden = 17 
				BEGIN
						SET @VentasNetas = @Valor
						SET @Divisor = @Ingresos
				END
				ELSE IF @Nivel1=100 and @Nivel2=400 and @Nivel3=100 and @Nivel4=0 --@Orden = 18 
				BEGIN
						SET @VentasNetasNuevos = @Valor
						SET @Divisor = @VentasNetas
				END

				-- 2019-11-13 Modificacion de Lucy				
				ELSE IF @Nivel1=100 and @Nivel2=400 and @Nivel3=100 and @Nivel4=100 and @Nivel5=0 --@Orden = 18 
				BEGIN
						SET @VentasNetasNuevosSinBonificacion = @Valor
						SET @Divisor = @VentasNetas
				END
				-- Usados
				ELSE IF @Nivel1=100 and @Nivel2=400 and @Nivel3=200 and @Nivel4=0 --@Orden = 19 
				BEGIN
						SET @VentasNetasUsados = @Valor
						SET @Divisor = @VentasNetas
				END
				ELSE IF @Nivel1=100 and @Nivel2=400 and @Nivel3=200 and @Nivel4<>0 and @Nivel5=0 --@Orden = 19 
				BEGIN
						SET @Divisor = @VentasNetas
				END
				-- Repuestos
				ELSE IF @Nivel1=100 and @Nivel2=400 and @Nivel3=300 and @Nivel4=0 --@Orden = 20 
				BEGIN
						SET @VentasNetasRepuestos = @Valor
						SET @Divisor = @VentasNetas
				END
				ELSE IF @Nivel1=100 and @Nivel2=400 and @Nivel3=300 and @Nivel4<>0 and @Nivel5=0 --@Orden = 20 
				BEGIN
						SET @Divisor = @VentasNetas
				END
				-- Mano de Obra
				ELSE IF @Nivel1=100 and @Nivel2=400 and @Nivel3=400 and @Nivel4=0 --@Orden = 21 
				BEGIN
						SET @VentasNetasManodeObra = @Valor
						SET @Divisor = @VentasNetas
				END
				ELSE IF @Nivel1=100 and @Nivel2=500 and @Nivel3=0 --@Orden = 22 
				BEGIN
						SET @VentasNetasOtrosIngresos = @Valor
						SET @Divisor = @Ingresos
				END
				-- UTILIDAD BRUTA TOTAL
				--     Nuevos
				ELSE IF @Nivel1=200 and @Nivel2=100 and @Nivel3=0 --@Orden = 32 
				BEGIN
						SET @Divisor = @VentasNetasNuevos
				END		
				--		Utilidad Bruta Nuevos
				ELSE IF @Nivel1=200 and @Nivel2=100 and @Nivel3=100 and @Nivel4=0 --@Orden = 33 
				BEGIN
						SET @Divisor = @VentasNetasNuevosSinBonificacion
				END
				--		Costo de ventas nuevos
				ELSE IF @Nivel1=200 and @Nivel2=100 and @Nivel3=100 and @Nivel4=100 and @Nivel5=0 --@Orden = 33 
				BEGIN
						SET @Divisor = @VentasNetasNuevos
				END
				--		Bonificaciones de Fábrica
				ELSE IF @Nivel1=200 and @Nivel2=100 and @Nivel3=200 and @Nivel4=0 --@Orden = 33 
				BEGIN
						SET @Divisor = @VentasNetasNuevos
				END
				--    Usados
				ELSE IF @Nivel1=200 and @Nivel2=200 --@Orden = 34 
				BEGIN
						SET @Divisor = @VentasNetasUsados
				END
				--ELSE IF @Nivel1=200 and @Nivel2=200 and @Nivel3=100 and @Nivel4=0 --@Orden = 35 
				--BEGIN
				--		SET @Divisor = -1
				--END
				--    Repuestos
				ELSE IF @Nivel1=200 and @Nivel2=300  --@Orden = 36 
				BEGIN
						SET @Divisor = @VentasNetasRepuestos
				END
				--ELSE IF @Nivel1=200 and @Nivel2=300 and @Nivel3=100 and @Nivel4=0 --@Orden = 37 
				--BEGIN
				--		SET @Divisor = -1
				--END
				--    Mano de Obra
				ELSE IF @Nivel1=200 and @Nivel2=400 --@Orden = 38 
				BEGIN
						SET @Divisor = @VentasNetasManodeObra
				END
--				ELSE IF @Nivel1=200 and @Nivel2=400 and @Nivel3=100 --and @Nivel4<>0 --@Orden = 39 
--				BEGIN
--						SET @Divisor = @VentasNetasManodeObra
----						SET @Divisor = -1
--				END
				--    Otros Ingresos
				ELSE IF @Nivel1=200 and @Nivel2=500 --@Orden = 40 
				BEGIN
						SET @Divisor = @VentasNetasOtrosIngresos
				END
				--ELSE IF @Nivel1=200 and @Nivel2=500 and @Nivel3=100 and @Nivel4=0 --@Orden = 41 
				--BEGIN
				--		SET @Divisor = -1
				--END
				--GASTOS DE OPERACIÓN
				ELSE IF @Nivel1=300 and @Nivel2=0 --@Orden = 42 
				BEGIN
						SET @Divisor = @Ingresos
				END  
				
				-- Cambio solicitado por Lucy Chaves y Fernando Restrepo 2019-10-03 - Porcentajes Gastos PersonalComisiones
				ELSE IF @Nivel1=300 and @Nivel2=200 and @Nivel3=600 and @Nivel4=100 and @Nivel5=0  --@Orden = 42 
				BEGIN
						SET @Divisor = @VentasNetasNuevos+@VentasNetasUsados
				END  
				ELSE IF @Nivel1=300 and @Nivel2=200 and @Nivel3=600 and @Nivel4=200 and @Nivel5=0  --@Orden = 42 
				BEGIN
						SET @Divisor = @VentasNetasRepuestos
				END  
				ELSE IF @Nivel1=300 and @Nivel2=200 and @Nivel3=600 and @Nivel4=300 and @Nivel5=0  --@Orden = 42 
				BEGIN
						SET @Divisor = @VentasNetasManodeObra
				END  
				-- Fin Cambio 



			-- la ultima condicion debe devolver el valor de ingresos al divisor @Divisor = @Ingresos
				--ELSE IF @Nivel1=300 and @Nivel2=200 and @Nivel3=700 and @Nivel4=0 --@Orden = 42 
				--BEGIN
				--		SET @Divisor = @Ingresos
				--END  

			END
	
			IF @Divisor <> 0 AND @Divisor <> -1 AND @Valor <> 0 BEGIN
				if @Veces = 1
					UPDATE #TablaTemporal1 SET AntPorcentaje = @Valor/@Divisor WHERE #TablaTemporal1.Nivel1 = @Nivel1 and #TablaTemporal1.Nivel2 = @Nivel2 and #TablaTemporal1.Nivel3 = @Nivel3 and #TablaTemporal1.Nivel4 = @Nivel4 and #TablaTemporal1.Nivel5 = @Nivel5 and #TablaTemporal1.Nivel6 = @Nivel6
				if @Veces = 2
					UPDATE #TablaTemporal1 SET ActPorcentaje = @Valor/@Divisor WHERE #TablaTemporal1.Nivel1 = @Nivel1 and #TablaTemporal1.Nivel2 = @Nivel2 and #TablaTemporal1.Nivel3 = @Nivel3 and #TablaTemporal1.Nivel4 = @Nivel4 and #TablaTemporal1.Nivel5 = @Nivel5 and #TablaTemporal1.Nivel6 = @Nivel6
				if @Veces = 3
					UPDATE #TablaTemporal1 SET PrePorcentaje = @Valor/@Divisor WHERE #TablaTemporal1.Nivel1 = @Nivel1 and #TablaTemporal1.Nivel2 = @Nivel2 and #TablaTemporal1.Nivel3 = @Nivel3 and #TablaTemporal1.Nivel4 = @Nivel4 and #TablaTemporal1.Nivel5 = @Nivel5 and #TablaTemporal1.Nivel6 = @Nivel6
				if @Veces = 4
					UPDATE #TotalTemporal SET AntPorcentaje = @Valor/@Divisor WHERE #TotalTemporal.Nivel1 = @Nivel1 and #TotalTemporal.Nivel2 = @Nivel2 and #TotalTemporal.Nivel3 = @Nivel3 and #TotalTemporal.Nivel4 = @Nivel4 and #TotalTemporal.Nivel5 = @Nivel5 and #TotalTemporal.Nivel6 = @Nivel6
				if @Veces = 5
					UPDATE #TotalTemporal SET ActPorcentaje = @Valor/@Divisor WHERE #TotalTemporal.Nivel1 = @Nivel1 and #TotalTemporal.Nivel2 = @Nivel2 and #TotalTemporal.Nivel3 = @Nivel3 and #TotalTemporal.Nivel4 = @Nivel4 and #TotalTemporal.Nivel5 = @Nivel5 and #TotalTemporal.Nivel6 = @Nivel6
				if @Veces = 6
					UPDATE #TotalTemporal SET PrePorcentaje = @Valor/@Divisor WHERE #TotalTemporal.Nivel1 = @Nivel1 and #TotalTemporal.Nivel2 = @Nivel2 and #TotalTemporal.Nivel3 = @Nivel3 and #TotalTemporal.Nivel4 = @Nivel4 and #TotalTemporal.Nivel5 = @Nivel5 and #TotalTemporal.Nivel6 = @Nivel6
			END

			FETCH NEXT FROM Temp_cursor INTO @Anterior,@Actual,@Presupuesto,@Orden,@Nivel1,@Nivel2,@Nivel3,@Nivel4,@Nivel5,@Nivel6      
		END  

		CLOSE Temp_cursor
		DEALLOCATE Temp_cursor
		
		set @Veces = @Veces + 1
	END



END



```
