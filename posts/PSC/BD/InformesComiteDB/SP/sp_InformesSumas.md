# Stored Procedure: sp_InformesSumas

```sql

-- =============================================
-- Author:		Freddy Guerrero 
-- Create date: 2018/10/16
-- Description:	Se asegura de realizar todas las sumas de las presenaciones, generales y particulares
-- 2019-12-10 
-- Actualiza sumas de presupuesto de Utilidad RP,MO
-- =============================================
CREATE PROCEDURE [dbo].[sp_InformesSumas]
	-- Add the parameters for the stored procedure here
	@Arbol as smallint = 17
	--@CodigoNivel as smallint
	
AS
BEGIN

	SET NOCOUNT ON;

	Declare @Nivel1 as smallint,@Nivel2 as smallint,@Nivel3 as smallint,@Nivel4 as smallint,@Nivel5 as smallint,@Nivel6 as smallint
	Declare @Suma as int,@Total as decimal(38, 4)  

	Set @Total = 0
	Set @Suma = 0

	DECLARE Nivel1_cursor CURSOR FOR 
	Select Nivel1 from #TablaTemporal1 where Nivel2 = 0 group by NombreConcepto,Nivel1 order by Nivel1

	OPEN Nivel1_cursor;  
	FETCH NEXT FROM Nivel1_cursor INTO @Nivel1
	WHILE @@FETCH_STATUS = 0  
	BEGIN  

		IF EXISTS (select NombreConcepto,Nivel2,Sum(Anterior)  from #TablaTemporal1 where Nivel1 = @Nivel1 and Nivel2 <> 0 group by NombreConcepto,Nivel2)
		BEGIN
			DECLARE Nivel2_cursor CURSOR FOR 
			select Nivel2  from #TablaTemporal1 where Nivel1 = @Nivel1 and Nivel2 <> 0 group by Nivel2 order by Nivel2
			OPEN Nivel2_cursor;  
			FETCH NEXT FROM Nivel2_cursor INTO @Nivel2
			WHILE @@FETCH_STATUS = 0  
			BEGIN  

--				select NombreConcepto,Nivel1,Nivel2,Nivel3,Anterior  from #TablaTemporal1 where nivel1 = @Nivel1 and nivel2 = @Nivel2 and nivel3 <> 0
--				if @@ROWCOUNT > 0
				IF EXISTS (select NombreConcepto,Nivel1,Nivel2,Nivel3,Anterior  from #TablaTemporal1 where Nivel1 = @Nivel1 and Nivel2 = @Nivel2 and Nivel3 <> 0)
				BEGIN
					DECLARE Nivel3_cursor CURSOR FOR 
					SELECT Nivel3 from #TablaTemporal1 where Nivel1 = @Nivel1 and Nivel2 = @Nivel2 AND Nivel3 <> 0 group by Nivel1,Nivel2,Nivel3
					OPEN Nivel3_cursor;  
					FETCH NEXT FROM Nivel3_cursor INTO @Nivel3
					WHILE @@FETCH_STATUS = 0  
					BEGIN  

						IF EXISTS (select NombreConcepto,Nivel1,Nivel2,Nivel3,Nivel4,Anterior  from #TablaTemporal1 where Nivel1 = @Nivel1 and Nivel2 = @Nivel2 and Nivel3 = @Nivel3 and Nivel4 <> 0)
						BEGIN
							DECLARE Nivel4_cursor CURSOR FOR 
							SELECT Nivel4 from #TablaTemporal1 where Nivel1 = @Nivel1 and Nivel2 = @Nivel2 AND Nivel3 = @Nivel3 AND Nivel4 <> 0 group by Nivel1,Nivel2,Nivel3,Nivel4
							OPEN Nivel4_cursor;  
							FETCH NEXT FROM Nivel4_cursor INTO @Nivel4
							WHILE @@FETCH_STATUS = 0  
							BEGIN  

								IF EXISTS (select NombreConcepto,Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,Anterior  from #TablaTemporal1 where Nivel1 = @Nivel1 and Nivel2 = @Nivel2 and Nivel3 = @Nivel3 and Nivel4 = @Nivel4 and Nivel5 <> 0)
								BEGIN
									DECLARE Nivel5_cursor CURSOR FOR 
									SELECT Nivel5 from #TablaTemporal1 where Nivel1 = @Nivel1 and Nivel2 = @Nivel2 AND Nivel3 = @Nivel3 AND Nivel4 = @Nivel4 AND Nivel5 <> 0 group by Nivel1,Nivel2,Nivel3,Nivel4,Nivel5
									OPEN Nivel5_cursor;  
									FETCH NEXT FROM Nivel5_cursor INTO @Nivel5
									WHILE @@FETCH_STATUS = 0  
									BEGIN  

										IF EXISTS (select NombreConcepto,Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,Anterior  from #TablaTemporal1 where Nivel1 = @Nivel1 and Nivel2 = @Nivel2 and Nivel3 = @Nivel3 and Nivel4 = @Nivel4 and Nivel5 = @Nivel5 and Nivel6 <> 0)
										BEGIN

											--Actualiza Anterior
											select @Total = sum(Anterior)  from #TablaTemporal1 where Nivel1 = @Nivel1 and Nivel2 = @Nivel2 and Nivel3 = @Nivel3 and Nivel4 = @Nivel4 and Nivel5 = @Nivel5 and Nivel6 <> 0
											UPDATE #TablaTemporal1 SET Anterior = @Total where Nivel1 = @Nivel1 and Nivel2 = @Nivel2 and Nivel3 = @Nivel3 and Nivel4 = @Nivel4 and Nivel5 = @Nivel5 and Nivel6 = 0
											--Actualiza Actual
											select @Total = sum(Actual)  from #TablaTemporal1 where Nivel1 = @Nivel1 and Nivel2 = @Nivel2 and Nivel3 = @Nivel3 and Nivel4 = @Nivel4 and Nivel5 = @Nivel5 and Nivel6 <> 0
											UPDATE #TablaTemporal1 SET Actual = @Total where Nivel1 = @Nivel1 and Nivel2 = @Nivel2 and Nivel3 = @Nivel3 and Nivel4 = @Nivel4 and Nivel5 = @Nivel5 and Nivel6 = 0
											--Actualiza Presupuesto
											--select @Total = sum(Presupuesto)  from #TablaTemporal1 where Nivel1 = @Nivel1 and Nivel2 = @Nivel2 and Nivel3 = @Nivel3 and Nivel4 = @Nivel4 and Nivel5 = @Nivel5 and Nivel6 <> 0
											--UPDATE #TablaTemporal1 SET Presupuesto = @Total where Nivel1 = @Nivel1 and Nivel2 = @Nivel2 and Nivel3 = @Nivel3 and Nivel4 = @Nivel4 and Nivel5 = @Nivel5 and Nivel6 = 0

										END
										FETCH NEXT FROM Nivel5_cursor INTO @Nivel5 
									END
									--Actualiza Anterior

									--if @Arbol = 18 and @Nivel1=100 and @Nivel2=100 and @Nivel3=200 and @Nivel4=100 
									--BEGIN
									--	PRINT ''
									--END
									--ELSE	
									--BEGIN

										select @Total = sum(Anterior)  from #TablaTemporal1 where Nivel1 = @Nivel1 and Nivel2 = @Nivel2 and Nivel3 = @Nivel3 and Nivel4 = @Nivel4 and Nivel5 <> 0 and Nivel6 = 0
										UPDATE #TablaTemporal1 SET Anterior = @Total where Nivel1 = @Nivel1 and Nivel2 = @Nivel2 and Nivel3 = @Nivel3 and Nivel4 = @Nivel4 and Nivel5 = 0
										--Actualiza Actual
										select @Total = sum(Actual)  from #TablaTemporal1 where Nivel1 = @Nivel1 and Nivel2 = @Nivel2 and Nivel3 = @Nivel3 and Nivel4 = @Nivel4 and Nivel5 <> 0 and Nivel6 = 0
										UPDATE #TablaTemporal1 SET Actual = @Total where Nivel1 = @Nivel1 and Nivel2 = @Nivel2 and Nivel3 = @Nivel3 and Nivel4 = @Nivel4 and Nivel5 = 0
										--Actualiza Presupuesto
										--select @Total = sum(Presupuesto)  from #TablaTemporal1 where Nivel1 = @Nivel1 and Nivel2 = @Nivel2 and Nivel3 = @Nivel3 and Nivel4 = @Nivel4 and Nivel5 <> 0 and Nivel6 = 0
										--UPDATE #TablaTemporal1 SET Presupuesto = @Total where Nivel1 = @Nivel1 and Nivel2 = @Nivel2 and Nivel3 = @Nivel3 and Nivel4 = @Nivel4 and Nivel5 = 0

									--END
									CLOSE Nivel5_cursor  
									DEALLOCATE Nivel5_cursor 


								END
								FETCH NEXT FROM Nivel4_cursor INTO @Nivel4 
							END
							--Actualiza Anterior
							select @Total = sum(Anterior)  from #TablaTemporal1 where Nivel1 = @Nivel1 and Nivel2 = @Nivel2 and Nivel3 = @Nivel3 and Nivel4 <> 0 and Nivel5 = 0 
							UPDATE #TablaTemporal1 SET Anterior = @Total where Nivel1 = @Nivel1 and Nivel2 = @Nivel2 and Nivel3 = @Nivel3 and Nivel4 = 0
							--Actualiza Actual
							select @Total = sum(Actual)  from #TablaTemporal1 where Nivel1 = @Nivel1 and Nivel2 = @Nivel2 and Nivel3 = @Nivel3 and Nivel4 <> 0 and Nivel5 = 0 
							UPDATE #TablaTemporal1 SET Actual = @Total where Nivel1 = @Nivel1 and Nivel2 = @Nivel2 and Nivel3 = @Nivel3 and Nivel4 = 0
							--Actualiza Presupuesto
							--select @Total = sum(Presupuesto)  from #TablaTemporal1 where Nivel1 = @Nivel1 and Nivel2 = @Nivel2 and Nivel3 = @Nivel3 and Nivel4 <> 0 and Nivel5 = 0 
							--UPDATE #TablaTemporal1 SET Presupuesto = @Total where Nivel1 = @Nivel1 and Nivel2 = @Nivel2 and Nivel3 = @Nivel3 and Nivel4 = 0

							CLOSE Nivel4_cursor  
							DEALLOCATE Nivel4_cursor 


						END
						FETCH NEXT FROM Nivel3_cursor INTO @Nivel3 
					END
					--Actualiza Anterior
					select @Total = sum(Anterior)  from #TablaTemporal1 where Nivel1 = @Nivel1 and Nivel2 = @Nivel2 and Nivel3 <> 0 and Nivel4 = 0 
					UPDATE #TablaTemporal1 SET Anterior = @Total where Nivel1 = @Nivel1 and Nivel2 = @Nivel2 and Nivel3 = 0
					--Actualiza Actual
					select @Total = sum(Actual)  from #TablaTemporal1 where Nivel1 = @Nivel1 and Nivel2 = @Nivel2 and Nivel3 <> 0 and Nivel4 = 0 
					UPDATE #TablaTemporal1 SET Actual = @Total where Nivel1 = @Nivel1 and Nivel2 = @Nivel2 and Nivel3 = 0
					--Actualiza Presupuesto
					--select @Total = sum(Presupuesto)  from #TablaTemporal1 where Nivel1 = @Nivel1 and Nivel2 = @Nivel2 and Nivel3 <> 0 and Nivel4 = 0 
					--UPDATE #TablaTemporal1 SET Presupuesto = @Total where Nivel1 = @Nivel1 and Nivel2 = @Nivel2 and Nivel3 = 0

					CLOSE Nivel3_cursor  
					DEALLOCATE Nivel3_cursor  

				END
				FETCH NEXT FROM Nivel2_cursor INTO @Nivel2 
			END
	
			-- Actualiza Anterior
			select @Total = sum(Anterior)  from #TablaTemporal1 where Nivel1 = @Nivel1 and Nivel2 <> 0 and Nivel3 = 0
			UPDATE #TablaTemporal1 SET Anterior = @Total where Nivel1 = @Nivel1 and Nivel2 = 0
			-- Actualiza Actual
			select @Total = sum(Actual)  from #TablaTemporal1 where Nivel1 = @Nivel1 and Nivel2 <> 0 and Nivel3 = 0
			UPDATE #TablaTemporal1 SET Actual = @Total where Nivel1 = @Nivel1 and Nivel2 = 0
			-- Actualiza Presupuesto
			--select @Total = sum(Presupuesto)  from #TablaTemporal1 where Nivel1 = @Nivel1 and Nivel2 <> 0 and Nivel3 = 0 
			--UPDATE #TablaTemporal1 SET Presupuesto = @Total where Nivel1 = @Nivel1 and Nivel2 = 0

			CLOSE Nivel2_cursor  
			DEALLOCATE Nivel2_cursor  

		END
		FETCH NEXT FROM Nivel1_cursor INTO @Nivel1 
	END  

	CLOSE Nivel1_cursor  
	DEALLOCATE Nivel1_cursor  



-- SUMAS ESPECIFICAS P&G 

	IF @Arbol = 17
	BEGIN

		----Ventas Netas			

-------VERSION 1------------------------------------------------------------------		

			---- Ventas Netas - Nuevos	
			--	update #TablaTemporal1 set 
			--		Anterior = (
			--		select sum(Anterior) from #TablaTemporal1 where 
			--		(Nivel1 = 100 and Nivel2=100 and Nivel3 =100) or 
			--		(Nivel1 = 100 and Nivel2=200 and Nivel3 =100) or 
			--		(Nivel1 = 100 and Nivel2=300 and Nivel3 =100)),
			--		Actual = (
			--		select sum(Actual) from #TablaTemporal1 where 
			--		(Nivel1 = 100 and Nivel2=100 and Nivel3 =100) or 
			--		(Nivel1 = 100 and Nivel2=200 and Nivel3 =100) or 
			--		(Nivel1 = 100 and Nivel2=300 and Nivel3 =100))
			--		--,Presupuesto = (
			--		--select sum(Presupuesto) from #TablaTemporal1 where 
			--		--(Nivel1 = 100 and Nivel2=100 and Nivel3 =100) or 
			--		--(Nivel1 = 100 and Nivel2=200 and Nivel3 =100) or 
			--		--(Nivel1 = 100 and Nivel2=300 and Nivel3 =100))		
			--	where Nivel1 = 100 and Nivel2=400 and Nivel3 =100 

-------VERSION 2------------------------------------------------------------------

			--  Ventas Netas - Nuevos - Venta nuevos	
				update #TablaTemporal1 set 
					Anterior = (
					select sum(Anterior) from #TablaTemporal1 where 
					(Nivel1 = 100 and Nivel2=100 and Nivel3 =100 and Nivel4 =100 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=200 and Nivel3 =100 and Nivel4 =100 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=300 and Nivel3 =100 and Nivel4 =100 and Nivel5=0 )),
					Actual = (
					select sum(Actual) from #TablaTemporal1 where 
					(Nivel1 = 100 and Nivel2=100 and Nivel3 =100 and Nivel4 =100 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=200 and Nivel3 =100 and Nivel4 =100 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=300 and Nivel3 =100 and Nivel4 =100 and Nivel5=0 ))
					--,Presupuesto = (
					--select sum(Presupuesto) from #TablaTemporal1 where 
					--(Nivel1 = 100 and Nivel2=100 and Nivel3 =100) or 
					--(Nivel1 = 100 and Nivel2=200 and Nivel3 =100) or 
					--(Nivel1 = 100 and Nivel2=300 and Nivel3 =100))		
				where Nivel1=100 and Nivel2=400 and Nivel3=100 and Nivel4=100 and Nivel5=0    

			--  Ventas Netas - Nuevos - Bonificaciones nuevos	
				update #TablaTemporal1 set 
					Anterior = (
					select sum(Anterior) from #TablaTemporal1 where 
					(Nivel1 = 100 and Nivel2=100 and Nivel3 =100 and Nivel4 =200 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=200 and Nivel3 =100 and Nivel4 =200 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=300 and Nivel3 =100 and Nivel4 =200 and Nivel5=0 )),
					Actual = (
					select sum(Actual) from #TablaTemporal1 where 
					(Nivel1 = 100 and Nivel2=100 and Nivel3 =100 and Nivel4 =200 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=200 and Nivel3 =100 and Nivel4 =200 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=300 and Nivel3 =100 and Nivel4 =200 and Nivel5=0 ))			
					--,Presupuesto = (
					--select sum(Presupuesto) from #TablaTemporal1 where 
					--(Nivel1 = 100 and Nivel2=100 and Nivel3 =100) or 
					--(Nivel1 = 100 and Nivel2=200 and Nivel3 =100) or 
					--(Nivel1 = 100 and Nivel2=300 and Nivel3 =100))		
				where Nivel1=100 and Nivel2=400 and Nivel3=100 and Nivel4=200 and Nivel5=0    

			-- Ventas Netas - Nuevos	
				update #TablaTemporal1 set 
					Anterior = (
					select sum(Anterior) from #TablaTemporal1 where 
					(Nivel1=100 and Nivel2=400 and Nivel3=100 and Nivel4=100 and Nivel5=0 ) or 
					(Nivel1=100 and Nivel2=400 and Nivel3=100 and Nivel4=200 and Nivel5=0 )),
					Actual = (
					select sum(Actual) from #TablaTemporal1 where 
					(Nivel1=100 and Nivel2=400 and Nivel3=100 and Nivel4=100 and Nivel5=0 ) or 
					(Nivel1=100 and Nivel2=400 and Nivel3=100 and Nivel4=200 and Nivel5=0 ))
					--,Presupuesto = (
					--select sum(Presupuesto) from #TablaTemporal1 where 
					--(Nivel1=100 and Nivel2=400 and Nivel3=100 and Nivel4=100 and Nivel5=0 ) or 
					--(Nivel1=100 and Nivel2=400 and Nivel3=100 and Nivel4=200 and Nivel5=0 ),
				where Nivel1 = 100 and Nivel2=400 and Nivel3 =100 and Nivel4 =0  
-----------------------------------------------------------------------------------	


-------VERSION 1------------------------------------------------------------------	

			---- Ventas Netas - Usados
			--update #TablaTemporal1 set 
			--	Anterior = (
			--	select sum(Anterior) from #TablaTemporal1 where 
			--	(Nivel1 = 100 and Nivel2=100 and Nivel3 =200) or 
			--	(Nivel1 = 100 and Nivel2=200 and Nivel3 =200) or 
			--	(Nivel1 = 100 and Nivel2=300 and Nivel3 =200)), 
			--	Actual = (
			--	select sum(Actual) from #TablaTemporal1 where 
			--	(Nivel1 = 100 and Nivel2=100 and Nivel3 =200) or 
			--	(Nivel1 = 100 and Nivel2=200 and Nivel3 =200) or 
			--	(Nivel1 = 100 and Nivel2=300 and Nivel3 =200)) 
			--	--,Presupuesto = (
			--	--select sum(Presupuesto) from #TablaTemporal1 where 
			--	--(Nivel1 = 100 and Nivel2=100 and Nivel3 =200) or 
			--	--(Nivel1 = 100 and Nivel2=200 and Nivel3 =200) or 
			--	--(Nivel1 = 100 and Nivel2=300 and Nivel3 =200)) 
			--	where Nivel1 = 100 and Nivel2=400 and Nivel3 =200 

-------VERSION 2------------------------------------------------------------------	

			--  Ventas Netas - Usados - Venta de Usados	
				update #TablaTemporal1 set 
					Anterior = (
					select sum(Anterior) from #TablaTemporal1 where 
					(Nivel1 = 100 and Nivel2=100 and Nivel3 =200 and Nivel4 =100 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=200 and Nivel3 =200 and Nivel4 =100 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=300 and Nivel3 =200 and Nivel4 =100 and Nivel5=0 )),
					Actual = (
					select sum(Actual) from #TablaTemporal1 where 
					(Nivel1 = 100 and Nivel2=100 and Nivel3 =200 and Nivel4 =100 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=200 and Nivel3 =200 and Nivel4 =100 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=300 and Nivel3 =200 and Nivel4 =100 and Nivel5=0 ))
					--,Presupuesto = (
					--select sum(Presupuesto) from #TablaTemporal1 where 
					--(Nivel1 = 100 and Nivel2=100 and Nivel3 =100) or 
					--(Nivel1 = 100 and Nivel2=200 and Nivel3 =100) or 
					--(Nivel1 = 100 and Nivel2=300 and Nivel3 =100))		
				where Nivel1=100 and Nivel2=400 and Nivel3=200 and Nivel4=100 and Nivel5=0    

			--  Ventas Netas - Nuevos - Venta vehículos Demo
				update #TablaTemporal1 set 
					Anterior = (
					select sum(Anterior) from #TablaTemporal1 where 
					(Nivel1 = 100 and Nivel2=100 and Nivel3 =200 and Nivel4 =200 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=200 and Nivel3 =200 and Nivel4 =200 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=300 and Nivel3 =200 and Nivel4 =200 and Nivel5=0 )),
					Actual = (
					select sum(Actual) from #TablaTemporal1 where 
					(Nivel1 = 100 and Nivel2=100 and Nivel3 =200 and Nivel4 =200 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=200 and Nivel3 =200 and Nivel4 =200 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=300 and Nivel3 =200 and Nivel4 =200 and Nivel5=0 ))				
					--,Presupuesto = (
					--select sum(Presupuesto) from #TablaTemporal1 where 
					--(Nivel1 = 100 and Nivel2=100 and Nivel3 =100) or 
					--(Nivel1 = 100 and Nivel2=200 and Nivel3 =100) or 
					--(Nivel1 = 100 and Nivel2=300 and Nivel3 =100))		
				where Nivel1=100 and Nivel2=400 and Nivel3=200 and Nivel4=200 and Nivel5=0    

			--  Ventas Netas - Nuevos - Venta Fuera de estandar
				update #TablaTemporal1 set 
					Anterior = (
					select sum(Anterior) from #TablaTemporal1 where 
					(Nivel1 = 100 and Nivel2=100 and Nivel3 =200 and Nivel4 =300 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=200 and Nivel3 =200 and Nivel4 =300 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=300 and Nivel3 =200 and Nivel4 =300 and Nivel5=0 )),
					Actual = (
					select sum(Actual) from #TablaTemporal1 where 
					(Nivel1 = 100 and Nivel2=100 and Nivel3 =200 and Nivel4 =300 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=200 and Nivel3 =200 and Nivel4 =300 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=300 and Nivel3 =200 and Nivel4 =300 and Nivel5=0 ))				
					--,Presupuesto = (
					--select sum(Presupuesto) from #TablaTemporal1 where 
					--(Nivel1 = 100 and Nivel2=100 and Nivel3 =100) or 
					--(Nivel1 = 100 and Nivel2=200 and Nivel3 =100) or 
					--(Nivel1 = 100 and Nivel2=300 and Nivel3 =100))		
				where Nivel1=100 and Nivel2=400 and Nivel3=200 and Nivel4=300 and Nivel5=0  

			-- Ventas Netas - Usados	
				update #TablaTemporal1 set 
					Anterior = (
					select sum(Anterior) from #TablaTemporal1 where 
					(Nivel1=100 and Nivel2=400 and Nivel3=200 and Nivel4=100 and Nivel5=0 ) or 
					(Nivel1=100 and Nivel2=400 and Nivel3=200 and Nivel4=200 and Nivel5=0 ) or 
					(Nivel1=100 and Nivel2=400 and Nivel3=200 and Nivel4=300 and Nivel5=0 )),
					Actual = (
					select sum(Actual) from #TablaTemporal1 where 
					(Nivel1=100 and Nivel2=400 and Nivel3=200 and Nivel4=100 and Nivel5=0 ) or 
					(Nivel1=100 and Nivel2=400 and Nivel3=200 and Nivel4=200 and Nivel5=0 ) or 
					(Nivel1=100 and Nivel2=400 and Nivel3=200 and Nivel4=300 and Nivel5=0 ))
					--,Presupuesto = (
					--select sum(Presupuesto) from #TablaTemporal1 where 
					--(Nivel1=100 and Nivel2=400 and Nivel3=100 and Nivel4=100 and Nivel5=0 ) or 
					--(Nivel1=100 and Nivel2=400 and Nivel3=100 and Nivel4=200 and Nivel5=0 ),
				where Nivel1 = 100 and Nivel2=400 and Nivel3 =200 and Nivel4=0

----------------------------------------------------------------------------------	

-------VERSION 1------------------------------------------------------------------	

			---- Ventas Netas - Repuestos
			--update #TablaTemporal1 set 
			--	Anterior = (
			--	select sum(Anterior) from #TablaTemporal1 where 
			--	(Nivel1 = 100 and Nivel2=100 and Nivel3 =300) or 
			--	(Nivel1 = 100 and Nivel2=200 and Nivel3 =300) or 
			--	(Nivel1 = 100 and Nivel2=300 and Nivel3 =300)), 
			--	Actual = (
			--	select sum(Actual) from #TablaTemporal1 where 
			--	(Nivel1 = 100 and Nivel2=100 and Nivel3 =300) or 
			--	(Nivel1 = 100 and Nivel2=200 and Nivel3 =300) or 
			--	(Nivel1 = 100 and Nivel2=300 and Nivel3 =300)) 
			--	--,Presupuesto = (
			--	--select sum(Presupuesto) from #TablaTemporal1 where 
			--	--(Nivel1 = 100 and Nivel2=100 and Nivel3 =300) or 
			--	--(Nivel1 = 100 and Nivel2=200 and Nivel3 =300) or 
			--	--(Nivel1 = 100 and Nivel2=300 and Nivel3 =300)) 
			--	where Nivel1 = 100 and Nivel2=400 and Nivel3 =300 

-------VERSION 2------------------------------------------------------------------
	
			--  Ventas Netas - Repuestos - Venta de Repuestos	
				update #TablaTemporal1 set 
					Anterior = (
					select sum(Anterior) from #TablaTemporal1 where 
					(Nivel1 = 100 and Nivel2=100 and Nivel3 =300 and Nivel4 =100 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=200 and Nivel3 =300 and Nivel4 =100 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=300 and Nivel3 =300 and Nivel4 =100 and Nivel5=0 )),
					Actual = (
					select sum(Actual) from #TablaTemporal1 where 
					(Nivel1 = 100 and Nivel2=100 and Nivel3 =300 and Nivel4 =100 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=200 and Nivel3 =300 and Nivel4 =100 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=300 and Nivel3 =300 and Nivel4 =100 and Nivel5=0 ))
					--,Presupuesto = (
					--select sum(Presupuesto) from #TablaTemporal1 where 
					--(Nivel1 = 100 and Nivel2=100 and Nivel3 =100) or 
					--(Nivel1 = 100 and Nivel2=200 and Nivel3 =100) or 
					--(Nivel1 = 100 and Nivel2=300 and Nivel3 =100))		
				where Nivel1=100 and Nivel2=400 and Nivel3=300 and Nivel4=100 and Nivel5=0    

			--  Ventas Netas - Repuestos - Bonificaciones Repuestos
				update #TablaTemporal1 set 
					Anterior = (
					select sum(Anterior) from #TablaTemporal1 where 
					(Nivel1 = 100 and Nivel2=100 and Nivel3 =300 and Nivel4 =200 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=200 and Nivel3 =300 and Nivel4 =200 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=300 and Nivel3 =300 and Nivel4 =200 and Nivel5=0 )),
					Actual = (
					select sum(Actual) from #TablaTemporal1 where 
					(Nivel1 = 100 and Nivel2=100 and Nivel3 =300 and Nivel4 =200 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=200 and Nivel3 =300 and Nivel4 =200 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=300 and Nivel3 =300 and Nivel4 =200 and Nivel5=0 ))
					--,Presupuesto = (
					--select sum(Presupuesto) from #TablaTemporal1 where 
					--(Nivel1 = 100 and Nivel2=100 and Nivel3 =100) or 
					--(Nivel1 = 100 and Nivel2=200 and Nivel3 =100) or 
					--(Nivel1 = 100 and Nivel2=300 and Nivel3 =100))		
				where Nivel1=100 and Nivel2=400 and Nivel3=300 and Nivel4=200 and Nivel5=0    

			--  Ventas Netas - Repuestos - Venta Cojinerias y Otros
				update #TablaTemporal1 set 
					Anterior = (
					select sum(Anterior) from #TablaTemporal1 where 
					(Nivel1 = 100 and Nivel2=100 and Nivel3 =300 and Nivel4 =300 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=200 and Nivel3 =300 and Nivel4 =300 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=300 and Nivel3 =300 and Nivel4 =300 and Nivel5=0 )),
					Actual = (
					select sum(Actual) from #TablaTemporal1 where 
					(Nivel1 = 100 and Nivel2=100 and Nivel3 =300 and Nivel4 =300 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=200 and Nivel3 =300 and Nivel4 =300 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=300 and Nivel3 =300 and Nivel4 =300 and Nivel5=0 ))
					--,Presupuesto = (
					--select sum(Presupuesto) from #TablaTemporal1 where 
					--(Nivel1 = 100 and Nivel2=100 and Nivel3 =100) or 
					--(Nivel1 = 100 and Nivel2=200 and Nivel3 =100) or 
					--(Nivel1 = 100 and Nivel2=300 and Nivel3 =100))		
				where Nivel1=100 and Nivel2=400 and Nivel3=300 and Nivel4=300 and Nivel5=0  

			-- Ventas Netas - Repuestos	
				update #TablaTemporal1 set 
					Anterior = (
					select sum(Anterior) from #TablaTemporal1 where 
					(Nivel1=100 and Nivel2=400 and Nivel3=300 and Nivel4=100 and Nivel5=0 ) or 
					(Nivel1=100 and Nivel2=400 and Nivel3=300 and Nivel4=200 and Nivel5=0 ) or 
					(Nivel1=100 and Nivel2=400 and Nivel3=300 and Nivel4=300 and Nivel5=0 )),
					Actual = (
					select sum(Actual) from #TablaTemporal1 where 
					(Nivel1=100 and Nivel2=400 and Nivel3=300 and Nivel4=100 and Nivel5=0 ) or 
					(Nivel1=100 and Nivel2=400 and Nivel3=300 and Nivel4=200 and Nivel5=0 ) or 
					(Nivel1=100 and Nivel2=400 and Nivel3=300 and Nivel4=300 and Nivel5=0 ))
					--,Presupuesto = (
					--select sum(Presupuesto) from #TablaTemporal1 where 
					--(Nivel1=100 and Nivel2=400 and Nivel3=100 and Nivel4=100 and Nivel5=0 ) or 
					--(Nivel1=100 and Nivel2=400 and Nivel3=100 and Nivel4=200 and Nivel5=0 ),
				where Nivel1 = 100 and Nivel2=400 and Nivel3 =300 and Nivel4=0

----------------------------------------------------------------------------------	

-------VERSION 1------------------------------------------------------------------	

			---- Ventas Netas - Mano de Obra
			--	update #TablaTemporal1 set 
			--		Anterior = (
			--		select sum(Anterior) from #TablaTemporal1 where 
			--		(Nivel1 = 100 and Nivel2=100 and Nivel3 =400) or 
			--		(Nivel1 = 100 and Nivel2=200 and Nivel3 =400) or 
			--		(Nivel1 = 100 and Nivel2=300 and Nivel3 =400)), 
			--		Actual = (
			--		select sum(Actual) from #TablaTemporal1 where 
			--		(Nivel1 = 100 and Nivel2=100 and Nivel3 =400) or 
			--		(Nivel1 = 100 and Nivel2=200 and Nivel3 =400) or 
			--		(Nivel1 = 100 and Nivel2=300 and Nivel3 =400))
			--		--,Presupuesto = (
			--		--select sum(Presupuesto) from #TablaTemporal1 where 
			--		--(Nivel1 = 100 and Nivel2=100 and Nivel3 =400) or 
			--		--(Nivel1 = 100 and Nivel2=200 and Nivel3 =400) or 
			--		--(Nivel1 = 100 and Nivel2=300 and Nivel3 =400)) 
			--		where Nivel1 = 100 and Nivel2=400 and Nivel3 =400
					
-------VERSION 2------------------------------------------------------------------					

			--  Ventas Netas - Mano de Obra - Venta mano de obra
				update #TablaTemporal1 set 
					Anterior = (
					select sum(Anterior) from #TablaTemporal1 where 
					(Nivel1 = 100 and Nivel2=100 and Nivel3 =400 and Nivel4 =100 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=200 and Nivel3 =400 and Nivel4 =100 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=300 and Nivel3 =400 and Nivel4 =100 and Nivel5=0 )),
					Actual = (
					select sum(Actual) from #TablaTemporal1 where 
					(Nivel1 = 100 and Nivel2=100 and Nivel3 =400 and Nivel4 =100 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=200 and Nivel3 =400 and Nivel4 =100 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=300 and Nivel3 =400 and Nivel4 =100 and Nivel5=0 ))
					--,Presupuesto = (
					--select sum(Presupuesto) from #TablaTemporal1 where 
					--(Nivel1 = 100 and Nivel2=100 and Nivel3 =400 and Nivel4 =100) or 
					--(Nivel1 = 100 and Nivel2=200 and Nivel3 =400 and Nivel4 =100) or 
					--(Nivel1 = 100 and Nivel2=300 and Nivel3 =400 and Nivel4 =0))
				where Nivel1=100 and Nivel2=400 and Nivel3=400 and Nivel4=100 and Nivel5=0    

			--  Ventas Netas - Mano de Obra - Venta trabajos a terceros
				update #TablaTemporal1 set 
					Anterior = (
					select sum(Anterior) from #TablaTemporal1 where 
					(Nivel1 = 100 and Nivel2=100 and Nivel3 =400 and Nivel4 =200 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=200 and Nivel3 =400 and Nivel4 =200 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=300 and Nivel3 =400 and Nivel4 =200 and Nivel5=0 )), 
					Actual = (
					select sum(Actual) from #TablaTemporal1 where 
					(Nivel1 = 100 and Nivel2=100 and Nivel3 =400 and Nivel4 =200 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=200 and Nivel3 =400 and Nivel4 =200 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=300 and Nivel3 =400 and Nivel4 =200 and Nivel5=0 )) 
					--,Presupuesto = (
					--select sum(Presupuesto) from #TablaTemporal1 where 
					--(Nivel1 = 100 and Nivel2=100 and Nivel3 =400 and Nivel4 =200) or 
					--(Nivel1 = 100 and Nivel2=200 and Nivel3 =400 and Nivel4 =200)) 
				where Nivel1=100 and Nivel2=400 and Nivel3=400 and Nivel4=200 and Nivel5=0    

			--  Ventas Netas - Mano de Obra - Venta otros
				update #TablaTemporal1 set 
					Anterior = (
					select sum(Anterior) from #TablaTemporal1 where 
					(Nivel1 = 100 and Nivel2=100 and Nivel3 =400 and Nivel4 =300 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=200 and Nivel3 =400 and Nivel4 =300 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=300 and Nivel3 =400 and Nivel4 =300 and Nivel5=0 )),
					Actual = (
					select sum(Actual) from #TablaTemporal1 where 
					(Nivel1 = 100 and Nivel2=100 and Nivel3 =400 and Nivel4 =300 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=200 and Nivel3 =400 and Nivel4 =300 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=300 and Nivel3 =400 and Nivel4 =300 and Nivel5=0 )) 
					--,Presupuesto = (
					--select sum(Presupuesto) from #TablaTemporal1 where 
					--(Nivel1 = 100 and Nivel2=100 and Nivel3 =400 and Nivel4 =200) or 
					--(Nivel1 = 100 and Nivel2=200 and Nivel3 =400 and Nivel4 =200)) 
				where Nivel1=100 and Nivel2=400 and Nivel3=400 and Nivel4=300 and Nivel5=0   

			--  Ventas Netas - Mano de Obra - Bonificaciones taller
				update #TablaTemporal1 set 
					Anterior = (
					select sum(Anterior) from #TablaTemporal1 where 
					(Nivel1 = 100 and Nivel2=100 and Nivel3=400 and Nivel4=400 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=200 and Nivel3=400 and Nivel4=400 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=300 and Nivel3=400 and Nivel4=400 and Nivel5=0 )), 
					Actual = (
					select sum(Actual) from #TablaTemporal1 where 
					(Nivel1 = 100 and Nivel2=100 and Nivel3=400 and Nivel4=400 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=200 and Nivel3=400 and Nivel4=400 and Nivel5=0 ) or 
					(Nivel1 = 100 and Nivel2=300 and Nivel3=400 and Nivel4=400 and Nivel5=0 )) 
					--,Presupuesto = (
					--select sum(Presupuesto) from #TablaTemporal1 where 
					--(Nivel1 = 100 and Nivel2=100 and Nivel3 =400 and Nivel4 =200) or 
					--(Nivel1 = 100 and Nivel2=200 and Nivel3 =400 and Nivel4 =200)) 
				where Nivel1=100 and Nivel2=400 and Nivel3=400 and Nivel4=400 and Nivel5=0


			-- Ventas Netas - Mano de Obra	
				update #TablaTemporal1 set 
					Anterior = (
					select sum(Anterior) from #TablaTemporal1 where 
					(Nivel1=100 and Nivel2=400 and Nivel3=400 and Nivel4=100 and Nivel5=0 ) or 
					(Nivel1=100 and Nivel2=400 and Nivel3=400 and Nivel4=200 and Nivel5=0 ) or 
					(Nivel1=100 and Nivel2=400 and Nivel3=400 and Nivel4=300 and Nivel5=0 ) or 
					(Nivel1=100 and Nivel2=400 and Nivel3=400 and Nivel4=400 and Nivel5=0 )),
					Actual = (
					select sum(Actual) from #TablaTemporal1 where 
					(Nivel1=100 and Nivel2=400 and Nivel3=400 and Nivel4=100 and Nivel5=0 ) or 
					(Nivel1=100 and Nivel2=400 and Nivel3=400 and Nivel4=200 and Nivel5=0 ) or 
					(Nivel1=100 and Nivel2=400 and Nivel3=400 and Nivel4=300 and Nivel5=0 ) or 
					(Nivel1=100 and Nivel2=400 and Nivel3=400 and Nivel4=400 and Nivel5=0 ))
					--,Presupuesto = (
					--select sum(Presupuesto) from #TablaTemporal1 where 
					--(Nivel1=100 and Nivel2=400 and Nivel3=400 and Nivel4=100 and Nivel5=0 ) or 
					--(Nivel1=100 and Nivel2=400 and Nivel3=400 and Nivel4=200 and Nivel5=0 ) or 
					--(Nivel1=100 and Nivel2=400 and Nivel3=400 and Nivel4=300 and Nivel5=0 ) or 
					--(Nivel1=100 and Nivel2=400 and Nivel3=400 and Nivel4=400 and Nivel5=0 ))
				where Nivel1 = 100 and Nivel2=400 and Nivel3 =400 and Nivel4=0

----------------------------------------------------------------------------------					 

			-- Total Ventas Netas
			update #TablaTemporal1 set 
				Anterior = (	
				select sum(Anterior) from #TablaTemporal1 where 
				(Nivel1 = 100 and Nivel2=400 and Nivel3 <>0 and Nivel4 = 0)), 
				Actual   = (	
				select sum(Actual)   from #TablaTemporal1 where 
				(Nivel1 = 100 and Nivel2=400 and Nivel3 <>0 and Nivel4 = 0))
				--,Presupuesto = (	
				--select sum(Presupuesto) from #TablaTemporal1 where 
				--(Nivel1 = 100 and Nivel2=400 and Nivel3 <>0)) 
				where Nivel1 = 100 and Nivel2=400 and Nivel3 =0 

			--INGRESOS
			update #TablaTemporal1 set 
				Anterior = (	select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =0) OR (Nivel1 = 100 and Nivel2=500 and Nivel3 =0)),
				Actual = (		select sum(Actual) from #TablaTemporal1   where (Nivel1 = 100 and Nivel2=400 and Nivel3 =0) OR (Nivel1 = 100 and Nivel2=500 and Nivel3 =0))
				--,Presupuesto = (	select sum(Presupuesto) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =0) OR (Nivel1 = 100 and Nivel2=500 and Nivel3 =0))
				where Nivel1 = 100 and Nivel2=0 and Nivel3 =0 

			--UTILIDAD BRUTA TOTAL

			--  Nuevos - Utilidad Bruta Nuevos
			update #TablaTemporal1 set 
				Anterior =  
				(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =100 and Nivel4 = 100 and Nivel5 = 0)) - 
				(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=100 and Nivel3 =100 and Nivel4 = 100 and Nivel5 = 0)), 
				Actual =  
				(select sum(Actual)   from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =100 and Nivel4 = 100 and Nivel5 = 0)) - 
				(select sum(Actual)   from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=100 and Nivel3 =100 and Nivel4 = 100 and Nivel5 = 0)) 
				--,Presupuesto =  
				--(select sum(Presupuesto) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =100)) - 
				--(select sum(Presupuesto) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=100 and Nivel3 =100)) 
				where Nivel1 = 200 and Nivel2=100 and Nivel3 =100 and Nivel4 =0 

			--  Nuevos - Bonificaciones de Fábrica
			update #TablaTemporal1 set 
				Anterior =  
				(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =100 and Nivel4 = 200 and Nivel5 = 0)), 
				Actual =  
				(select sum(Actual)   from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =100 and Nivel4 = 200 and Nivel5 = 0)) 
				--,Presupuesto =  
				--(select sum(Presupuesto) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =100)) - 
				--(select sum(Presupuesto) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=100 and Nivel3 =100)) 
				where Nivel1 = 200 and Nivel2=100 and Nivel3 =200 and Nivel4 =0 

			--  Nuevos - 
			update #TablaTemporal1 set 
				Anterior =  
				(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=100 and Nivel3 =100 and Nivel4 = 0)) + 
				(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=100 and Nivel3 =200 and Nivel4 = 0)), 
				Actual =  
				(select sum(Actual)   from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=100 and Nivel3 =100 and Nivel4 = 0)) + 
				(select sum(Actual)   from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=100 and Nivel3 =200 and Nivel4 = 0)) 
				--,Presupuesto =  
				--(select sum(Presupuesto) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =100)) - 
				--(select sum(Presupuesto) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=100 and Nivel3 =100)) 
				where Nivel1 = 200 and Nivel2=100 and Nivel3 =0 and Nivel4 =0 



-------VERSION 1------------------------------------------------------------------

			---- Usados
			--update #TablaTemporal1 set 
			--	Anterior =  
			--	(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =200)) - 
			--	(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=200 and Nivel3 =100)), 
			--	Actual =  
			--	(select sum(Actual) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =200)) - 
			--	(select sum(Actual) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=200 and Nivel3 =100))
			--	--,Presupuesto =  
			--	--(select sum(Presupuesto) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =200)) - 
			--	--(select sum(Presupuesto) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=200 and Nivel3 =100)) 
			--	where Nivel1 = 200 and Nivel2=200 and Nivel3 =0 

--------VERSION 2-----------------------------------------------------------------

			-- Utilidad Bruta Usados
			update #TablaTemporal1 set 
				Anterior =  
				(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =200 and Nivel4 =100 and Nivel5=0 )) - 
				(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=200 and Nivel3 =100 and Nivel4 =100 and Nivel5=0 )), 
				Actual =  
				(select sum(Actual) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =200 and Nivel4 =100 and Nivel5=0 )) - 
				(select sum(Actual) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=200 and Nivel3 =100 and Nivel4 =100 and Nivel5=0 ))
				--,Presupuesto =  
				--(select sum(Presupuesto) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =200)) - 
				--(select sum(Presupuesto) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=200 and Nivel3 =100)) 
				where Nivel1 = 200 and Nivel2=200 and Nivel3 =100 and Nivel4 =0 

			-- Utilidad Bruta vehículos Demo
			update #TablaTemporal1 set 
				Anterior =  
				(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =200 and Nivel4 =200 and Nivel5=0 )) - 
				(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=200 and Nivel3 =200 and Nivel4 =100 and Nivel5=0 )), 
				Actual =  
				(select sum(Actual) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =200 and Nivel4 =200 and Nivel5=0 )) - 
				(select sum(Actual) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=200 and Nivel3 =200 and Nivel4 =100 and Nivel5=0 ))
				--,Presupuesto =  
				--(select sum(Presupuesto) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =200)) - 
				--(select sum(Presupuesto) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=200 and Nivel3 =100)) 
				where Nivel1 = 200 and Nivel2=200 and Nivel3 =200 and Nivel4 =0 

			-- Utilidad Bruta vehículos Fuera de estandar
			update #TablaTemporal1 set 
				Anterior =  
				(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =200 and Nivel4 =300 and Nivel5=0 )) - 
				(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=200 and Nivel3 =300 and Nivel4 =100 and Nivel5=0 )), 
				Actual =  
				(select sum(Actual)   from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =200 and Nivel4 =300 and Nivel5=0 )) - 
				(select sum(Actual)   from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=200 and Nivel3 =300 and Nivel4 =100 and Nivel5=0 ))
				--,Presupuesto =  
				--(select sum(Presupuesto) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =200)) - 
				--(select sum(Presupuesto) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=200 and Nivel3 =100)) 
				where Nivel1 = 200 and Nivel2=200 and Nivel3 =300 and Nivel4 =0 

			-- Usados
			update #TablaTemporal1 set 
				Anterior =  
				(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=200 and Nivel3 =100 and Nivel4 =0 and Nivel5=0 )) + 
				(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=200 and Nivel3 =200 and Nivel4 =0 and Nivel5=0 )) + 
				(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=200 and Nivel3 =300 and Nivel4 =0 and Nivel5=0 )), 
				Actual =  
				(select sum(Actual)   from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=200 and Nivel3 =100 and Nivel4 =0 and Nivel5=0 )) + 
				(select sum(Actual)   from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=200 and Nivel3 =200 and Nivel4 =0 and Nivel5=0 )) +
				(select sum(Actual)   from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=200 and Nivel3 =300 and Nivel4 =0 and Nivel5=0 ))
				--,Presupuesto =  
				--(select sum(Presupuesto) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =200)) - 
				--(select sum(Presupuesto) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=200 and Nivel3 =100)) 
				where Nivel1 = 200 and Nivel2=200 and Nivel3 =0 and Nivel4 =0 


-------------------------------------------------------------------------

			-- Repuestos - Utilidad bruta Repuestos
			update #TablaTemporal1 set 
				Anterior =  
				(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =300 and Nivel4 = 100 and Nivel5 = 0)) - 
				(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=300 and Nivel3 =100 and Nivel4 = 100 and Nivel5 = 100)), 
				Actual =  
				(select sum(Actual)   from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =300 and Nivel4 = 100 and Nivel5 = 0)) -  
				(select sum(Actual)   from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=300 and Nivel3 =100 and Nivel4 = 100 and Nivel5 = 100))
				--,Presupuesto =  
				--(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =300)) - 
				--(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=300 and Nivel3 =100)) 
				where Nivel1 = 200 and Nivel2=300 and Nivel3 =100 and Nivel4 =100 and Nivel5 = 0

			-- Repuestos - Utilidad bruta tapicerias y otros producción
			update #TablaTemporal1 set 
				Anterior =  
				(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =300 and Nivel4 = 200 and Nivel5 = 0)) - 
				(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=300 and Nivel3 =100 and Nivel4 = 200 and Nivel5 = 100)), 
				Actual =  
				(select sum(Actual)   from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =300 and Nivel4 = 200 and Nivel5 = 0)) -  
				(select sum(Actual)   from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=300 and Nivel3 =100 and Nivel4 = 200 and Nivel5 = 100))
				--,Presupuesto =  
				--(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =300)) - 
				--(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=300 and Nivel3 =100)) 
				where Nivel1 = 200 and Nivel2=300 and Nivel3 =100 and Nivel4 =200 and Nivel5 = 0

			-- Repuestos - Utilidad Bruta Repuestos
			update #TablaTemporal1 set 
				Anterior =  
				(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=300 and Nivel3 =100 and Nivel4 = 100 and Nivel5 = 0)) + 
				(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=300 and Nivel3 =100 and Nivel4 = 200 and Nivel5 = 0)), 
				Actual =  
				(select sum(Actual)   from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=300 and Nivel3 =100 and Nivel4 = 100 and Nivel5 = 0)) +  
				(select sum(Actual)   from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=300 and Nivel3 =100 and Nivel4 = 200 and Nivel5 = 0))
				--,Presupuesto =  
				--(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =300)) - 
				--(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=300 and Nivel3 =100)) 
				where Nivel1 = 200 and Nivel2=300 and Nivel3 =100 and Nivel4 =0 

			-- Repuestos - Bonificaciones de Fábrica
			update #TablaTemporal1 set 
				Anterior =  
				(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =300 and Nivel4 =300 and Nivel5=0 )),
				Actual =  
				(select sum(Actual) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =300 and Nivel4 =300 and Nivel5=0 ))
				--,Presupuesto =  
				--(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=100 and Nivel3 =100 and Nivel4 =200 and Nivel5=0 ))
				where Nivel1 = 200 and Nivel2=300 and Nivel3 =200 and Nivel4=0 

			-- Repuestos 
			update #TablaTemporal1 set 
				Anterior =  
				(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=300 and Nivel3 =100 and Nivel4 =0))+ 
				(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=300 and Nivel3 =200 and Nivel4 =0)), 
				Actual =  
				(select sum(Actual)   from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=300 and Nivel3 =100 and Nivel4 =0))+ 
				(select sum(Actual)   from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=300 and Nivel3 =200 and Nivel4 =0)) 
				--,Presupuesto =  
				--(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =300)) - 
				--(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=300 and Nivel3 =100)) 
				where Nivel1 = 200 and Nivel2=300 and Nivel3 =0 and Nivel4 =0 

		------Mano de Obra -------------------------------------------------------------------

			-- Mano de Obra - C.V. Mano de Obra 
			update #TablaTemporal1 set 
				Anterior =  
				(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=400 and Nivel3 =100 and Nivel4 =100 and Nivel5=100 and Nivel6=0 ))+
				(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=400 and Nivel3 =100 and Nivel4 =100 and Nivel5=200 and Nivel6=0 ))+
				(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=400 and Nivel3 =100 and Nivel4 =100 and Nivel5=300 and Nivel6=0 ))+
				(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=400 and Nivel3 =100 and Nivel4 =100 and Nivel5=400 and Nivel6=0 ))+
				(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=400 and Nivel3 =100 and Nivel4 =100 and Nivel5=500 and Nivel6=0 )),
				Actual =  
				(select sum(Actual)   from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=400 and Nivel3 =100 and Nivel4 =100 and Nivel5=100 and Nivel6=0 ))+
				(select sum(Actual)   from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=400 and Nivel3 =100 and Nivel4 =100 and Nivel5=200 and Nivel6=0 ))+
				(select sum(Actual)   from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=400 and Nivel3 =100 and Nivel4 =100 and Nivel5=300 and Nivel6=0 ))+
				(select sum(Actual)   from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=400 and Nivel3 =100 and Nivel4 =100 and Nivel5=400 and Nivel6=0 ))+
				(select sum(Actual)   from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=400 and Nivel3 =100 and Nivel4 =100 and Nivel5=500 and Nivel6=0 ))
				--,Presupuesto =  
				--(select sum(Presupuesto) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=400 and Nivel3 =100 and Nivel4 <> 0 and Nivel5=0 ))
				where Nivel1 = 200 and Nivel2=400 and Nivel3 =100 and Nivel4=100 and Nivel5=0 

			-- Mano de Obra - Utilidad bruta Mano de Obra
			update #TablaTemporal1 set 
				Anterior =  
				--(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =400 and Nivel4=0)) - 
				(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =400 and Nivel4 in (100,200,300) and Nivel5=0)) - 
				(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=400 and Nivel3 =100 and Nivel4=100 and Nivel5=0)), 
				Actual =  
				--(select sum(Actual)   from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =400 and Nivel4=0)) - 
				(select sum(Actual) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =400 and Nivel4 in (100,200,300) and Nivel5=0)) - 
				(select sum(Actual)   from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=400 and Nivel3 =100 and Nivel4=100 and Nivel5=0))
				--,Presupuesto =  
				--(select sum(Presupuesto) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =400)) - 
				--(select sum(Presupuesto) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=400 and Nivel3 =100)) 
				where Nivel1 = 200 and Nivel2=400 and Nivel3 =100 and Nivel4=0 

			-- Mano de Obra - Bonificaciones de Fábrica
			update #TablaTemporal1 set 
				Anterior =  
				(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=100 and Nivel3 =400 and Nivel4 =400 and Nivel5=0 )),
				Actual =  
				(select sum(Actual) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=100 and Nivel3 =400 and Nivel4 =400 and Nivel5=0 ))
				--,Presupuesto =  
				--(select sum(Presupuesto) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=100 and Nivel3 =100 and Nivel4 =200 and Nivel5=0 ))
				where Nivel1 = 200 and Nivel2=400 and Nivel3 =200 and Nivel4=0 and nivel5=0

			-- Mano de Obra
			update #TablaTemporal1 set 
				Anterior =  
				(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=400 and Nivel3 =100 and Nivel4=0 )) + 
				(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=400 and Nivel3 =200 and Nivel4=0 )), 
				Actual =  
				(select sum(Actual)   from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=400 and Nivel3 =100 and Nivel4=0 )) + 
				(select sum(Actual)   from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=400 and Nivel3 =200 and Nivel4=0 )) 
				--,Presupuesto =  
				--(select sum(Presupuesto) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=400 and Nivel3 =400)) - 
				--(select sum(Presupuesto) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=400 and Nivel3 =100)) 
				where Nivel1 = 200 and Nivel2=400 and Nivel3 =0 and Nivel4=0 






			-- Otros Ingresos
			update #TablaTemporal1 set 
				Anterior =  
				(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=500 and Nivel3 =0)) - 
				(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=500 and Nivel3 =100)) ,
				Actual =  
				(select sum(Actual) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=500 and Nivel3 =0)) - 
				(select sum(Actual) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=500 and Nivel3 =100))
				--,Presupuesto =  
				--(select sum(Presupuesto) from #TablaTemporal1 where (Nivel1 = 100 and Nivel2=500 and Nivel3 =0)) - 
				--(select sum(Presupuesto) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2=500 and Nivel3 =100)) 
				where Nivel1 = 200 and Nivel2=500 and Nivel3 =0 

			-- UTILIDAD BRUTA TOTAL
			update #TablaTemporal1 set 
				Anterior =  
				(select sum(Anterior) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2<>0 and Nivel3=0)), 
				Actual =  
				(select sum(Actual) from #TablaTemporal1 where   (Nivel1 = 200 and Nivel2<>0 and Nivel3=0)) 
				--,Presupuesto =  
				--(select sum(Presupuesto) from #TablaTemporal1 where (Nivel1 = 200 and Nivel2<>0 and Nivel3=0)) 
				where Nivel1 = 200 and Nivel2=0 and Nivel3 =0 

			-- UTILIDAD OPERATIVA
			update #TablaTemporal1 set 
				Anterior = ( 
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=0) - 
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 300 and Nivel2=0) -
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 400 and Nivel2=0) -
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 500 and Nivel2=0)),
				Actual = ( 
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=0) - 
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 300 and Nivel2=0) -
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 400 and Nivel2=0) -
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 500 and Nivel2=0))
				--,Presupuesto = ( 
				--(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=0) - 
				--(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 300 and Nivel2=0) -
				--(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 400 and Nivel2=0) -
				--(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 500 and Nivel2=0))
				where Nivel1 = 600 and Nivel2=0  

			-- Diferencia al Cambio
			update #TablaTemporal1 set 
				Anterior = ( 
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=300 and Nivel3=100 and Nivel4=0)-  
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=300 and Nivel3=200 and Nivel4=0)),
				Actual = ( 
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=300 and Nivel3=100 and Nivel4=0)-  
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=300 and Nivel3=200 and Nivel4=0))
				--,Presupuesto = ( 
				--(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=300 and Nivel3=100 and Nivel4=0)-  
				--(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=300 and Nivel3=200 and Nivel4=0))
				where Nivel1 = 700 and Nivel2=300 and Nivel3=0  


			-- Valoracion Forward
			update #TablaTemporal1 set 
				Anterior = ( 
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=400 and Nivel3=100 and Nivel4=0)-  
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=400 and Nivel3=200 and Nivel4=0)),
				Actual = ( 
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=400 and Nivel3=100 and Nivel4=0)-  
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=400 and Nivel3=200 and Nivel4=0))
				--,Presupuesto = ( 
				--(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=400 and Nivel3=100 and Nivel4=0)-  
				--(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=400 and Nivel3=200 and Nivel4=0))
				where Nivel1 = 700 and Nivel2=400 and Nivel3=0  

			-- Liquidacion Forward
			update #TablaTemporal1 set 
				Anterior = ( 
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=500 and Nivel3=100 and Nivel4=0)-  
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=500 and Nivel3=200 and Nivel4=0)),
				Actual = ( 
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=500 and Nivel3=100 and Nivel4=0)-  
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=500 and Nivel3=200 and Nivel4=0))
				--,Presupuesto = ( 
				--(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=500 and Nivel3=100 and Nivel4=0)-  
				--(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=500 and Nivel3=200 and Nivel4=0))
				where Nivel1 = 700 and Nivel2=500 and Nivel3=0  

			-- Otros Costos Financieros Netos
			update #TablaTemporal1 set 
				Anterior = ( 
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=100 and Nivel3=200 and Nivel4=0) -
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=100 and Nivel3=100 and Nivel4=0)),
				Actual = ( 
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=100 and Nivel3=200 and Nivel4=0) -
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=100 and Nivel3=100 and Nivel4=0))
				--,Presupuesto = ( 
				--(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=100 and Nivel3=100 and Nivel4=0) - 
				--(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=100 and Nivel3=200 and Nivel4=0))
				where Nivel1 = 700 and Nivel2=100 and Nivel3 = 0  

			-- COSTO FINANCIERO NETO
			update #TablaTemporal1 set 
				Anterior = ( 
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=100 and Nivel3=0) + 
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=200 and Nivel3=0) -
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=300 and Nivel3=0) -
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=400 and Nivel3=0) -
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=500 and Nivel3=0)),
				Actual = ( 
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=100 and Nivel3=0) +
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=200 and Nivel3=0) -
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=300 and Nivel3=0) -
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=400 and Nivel3=0) -
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=500 and Nivel3=0))
				--,Presupuesto = ( 
				--(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=100 and Nivel3=0) - 
				--(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=200 and Nivel3=0) +
				--(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=300 and Nivel3=0) +
				--(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=400 and Nivel3=0) +
				--(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=500 and Nivel3=0))
				where Nivel1 = 700 and Nivel2=0  

			-- UTILIDAD OPERATIVA NETA
			update #TablaTemporal1 set 
				Anterior = ( 
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 600 and Nivel2=0) - 
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=0)),
				Actual = ( 
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 600 and Nivel2=0) - 
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=0))
				--,Presupuesto = ( 
				--(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 600 and Nivel2=0) - 
				--(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=0))
				where Nivel1 = 800 and Nivel2=0  

			-- ING. (EGR.) NO OPERACIONALES
			update #TablaTemporal1 set 
				Anterior = ( 
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 900 and Nivel2=100 and Nivel3=0) - 
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 900 and Nivel2=200 and Nivel3=0)),
				Actual = ( 
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 900 and Nivel2=100 and Nivel3=0) - 
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 900 and Nivel2=200 and Nivel3=0))
				--,Presupuesto = ( 
				--(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 600 and Nivel2=0) + 
				--(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=0))
				where Nivel1 = 900 and Nivel2=0 

			-- UTILIDAD NETA
			update #TablaTemporal1 set 
				Anterior = ( 
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 800 and Nivel2=0) + 
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 900 and Nivel2=0) +
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 =1000 and Nivel2=0)),
				Actual = ( 
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 800 and Nivel2=0) + 
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 900 and Nivel2=0) +
				(select sum(Actual) from #TablaTemporal1 where Nivel1 =1000 and Nivel2=0))
				--,Presupuesto = ( 
				--(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 800 and Nivel2=0) + 
				--(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 900 and Nivel2=0) +
				--(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 =1000 and Nivel2=0))
				where Nivel1 = 1100 and Nivel2=0  

			-- UTILIDAD NETA DISTRIBUIBLE
			update #TablaTemporal1 set 
				Anterior = ( 
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 1100 and Nivel2=0) + 
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 1200 and Nivel2=0) -
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 1300 and Nivel2=0)),
				Actual = ( 
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 1100 and Nivel2=0) + 
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 1200 and Nivel2=0) -
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 1300 and Nivel2=0))
				--,Presupuesto = ( 
				--(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 1100 and Nivel2=0) + 
				--(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 1200 and Nivel2=0) -
				--(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 1300 and Nivel2=0))
				where Nivel1 = 1400 and Nivel2=0  

			-- Estado de Resultado Integral - ERI
			update #TablaTemporal1 set 
				Anterior = ( 
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 1400 and Nivel2=0) + 
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 1500 and Nivel2=0)),
				Actual = ( 
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 1400 and Nivel2=0) + 
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 1500 and Nivel2=0))
				--,Presupuesto = ( 
				--(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 1100 and Nivel2=0) + 
				--(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 1200 and Nivel2=0) -
				--(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 1300 and Nivel2=0))
				where Nivel1 = 1600 and Nivel2=0  


	-- PRESUPUESTO
			-- C.V. Nuevos
				update #TablaTemporal1 set 
					Presupuesto = ( 
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 100 and Nivel2=400 and Nivel3=100 and Nivel4=0) - 
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=100 and Nivel3=0 ))
					where Nivel1 = 200 and Nivel2=100 and Nivel3=100 and Nivel4=100 and Nivel5=0 

				update #TablaTemporal1 set 
					Presupuesto = ( 
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=100 and Nivel3=0) - 
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=100 and Nivel3=200 and Nivel4=0 ))
					where Nivel1 = 200 and Nivel2=100 and Nivel3=100 and Nivel4=0 

			-- C.V. Usados
				update #TablaTemporal1 set 
					Presupuesto = ( 
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 100 and Nivel2=400 and Nivel3=200 and Nivel4=0) - 
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=200 and Nivel3=0 ))
					where Nivel1 = 200 and Nivel2=200 and Nivel3=100 and Nivel4=0 

			-- C.V. Repuestos
				update #TablaTemporal1 set 
					Presupuesto = ( 
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 100 and Nivel2=400 and Nivel3=300 and Nivel4=0) - 
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=300 and Nivel3=0 ))
					where Nivel1 = 200 and Nivel2=300 and Nivel3=100 and Nivel4=100 and Nivel5=100  and Nivel6=0
				update #TablaTemporal1 set 
					Presupuesto = ( 
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=300 and Nivel3=0 ) - 
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=300 and Nivel3=200 and Nivel4=0 ))
					where Nivel1 = 200 and Nivel2=300 and Nivel3=100 and Nivel4=100 and Nivel5 = 0 
				update #TablaTemporal1 set 
					Presupuesto = ( 
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=300 and Nivel3=100 and Nivel4=100 and nivel5 = 0  ) + 
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=300 and Nivel3=100 and Nivel4=200 and nivel5 = 0 )+
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=300 and Nivel3=200 and Nivel4=0 and nivel5 = 0 ))
					where Nivel1 = 200 and Nivel2=300 and Nivel3=100 and Nivel4=0 and Nivel5 = 0 

			-- C.V. Mano de Obra
				update #TablaTemporal1 set 
					Presupuesto = ( 
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 100 and Nivel2=400 and Nivel3=400 and Nivel4=0) - 
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=400 and Nivel3=0 ))
					where Nivel1 = 200 and Nivel2=400 and Nivel3=100 and Nivel4=100 and Nivel5 = 0 

				update #TablaTemporal1 set 
					Presupuesto = ( 
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=400 and Nivel3=0 ))
					where Nivel1 = 200 and Nivel2=400 and Nivel3=100 and Nivel4=0 and Nivel5 = 0 

			-- C.V. COMISIONES
				update #TablaTemporal1 set 
					Presupuesto = ( 
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 300 and Nivel2=200 and Nivel3=600 and Nivel4=100 and Nivel5=0) + 
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 300 and Nivel2=200 and Nivel3=600 and Nivel4=200 and Nivel5=0) + 
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 300 and Nivel2=200 and Nivel3=600 and Nivel4=300 and Nivel5=0))
					where Nivel1 = 300 and Nivel2=200 and Nivel3=600 and Nivel4=0 

			-- GASTOS DE VENTAS	
				update #TablaTemporal1 set 
					Presupuesto = ( 
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 300 and Nivel2=100 and Nivel3<>0 and Nivel4=0)) 
					where Nivel1 = 300 and Nivel2=100 and Nivel3=0


			-- GASTOS DE PERSONAL
				update #TablaTemporal1 set 
					Presupuesto = ( 
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 300 and Nivel2=200 and Nivel3<>0 and Nivel4=0)) 
					where Nivel1 = 300 and Nivel2=200 and Nivel3=0

			-- GASTOS DE OPERACION
				update #TablaTemporal1 set 
					Presupuesto = ( 
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 300 and Nivel2<>0 and Nivel3=0)) 
					where Nivel1 = 300 and Nivel2=0 

			-- UTILIDAD OPERATIVA
				update #TablaTemporal1 set 
					Presupuesto = ( 
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=0 ) - 
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 300 and Nivel2=0 ) -
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 400 and Nivel2=0 ) -
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 500 and Nivel2=0 ))
					where Nivel1 = 600 and Nivel2=0 

			-- OTROS COSTOS FINANCIEROS NETOS 
				update #TablaTemporal1 set 
					Presupuesto = ( 
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=100 and Nivel3=200 and Nivel4=0) -
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=100 and Nivel3=100 and Nivel4=0)) 
					where Nivel1 = 700 and Nivel2=100 and Nivel3=0 						
			
			-- COSTO FINANCIERO
				update #TablaTemporal1 set 
					Presupuesto = ( 
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=100 and Nivel3=0 ) + 
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=200 and Nivel3=0 ) -
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=300 and Nivel3=0 ) -
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=400 and Nivel3=0 ) -
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=500 and Nivel3=0 ))
					where Nivel1 = 700 and Nivel2=0 

			-- UTILIDAD OPERATIVA NETA
				update #TablaTemporal1 set 
					Presupuesto = ( 
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 600 and Nivel2=0 ) - 
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 700 and Nivel2=0 ))
					where Nivel1 = 800 and Nivel2=0 

			-- GAC
				update #TablaTemporal1 set 
					Presupuesto = ( 
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 1000 and Nivel2=100 and Nivel3=0 ) + 
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 1000 and Nivel2=200 and Nivel3=0 ))
					where Nivel1 = 1000 and Nivel2=0 

			-- UTILIDAD NETA
				update #TablaTemporal1 set 
					Presupuesto = ( 
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 800 and Nivel2=0) + 
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 900 and Nivel2=0) +
					(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 =1000 and Nivel2=0))
					where Nivel1 = 1100 and Nivel2=0  

			-- UTILIDAD NETA DISTRIBUIBLE
			update #TablaTemporal1 set 
				Presupuesto = ( 
				(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 1100 and Nivel2=0) + 
				(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 1200 and Nivel2=0) -
				(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 1300 and Nivel2=0))
				where Nivel1 = 1400 and Nivel2=0 

			-- Estado de Resultado Integral - ERI
			update #TablaTemporal1 set 
				Presupuesto = ( 
				(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 1400 and Nivel2=0) +
				(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 1500 and Nivel2=0))
				where Nivel1 = 1600 and Nivel2=0 				
				
	END

	 

-- SUMAS ESPECIFICAS BALANCE

	ELSE IF @Arbol = 18
	BEGIN 

			---- Cartera por vencer
			--	update #TablaTemporal1 set 
			--	Anterior = ( 
			--	(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 100 and Nivel2=100 and Nivel3=200 and Nivel4=100 AND Nivel5=0) -
			--	(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 100 and Nivel2=100 and Nivel3=200 and Nivel4=100 AND Nivel5=200 and Nivel6=0)),
			--	Actual = ( 
			--	(select sum(Actual) from #TablaTemporal1 where Nivel1 = 100 and Nivel2=100 and Nivel3=200 and Nivel4=100 AND Nivel5=0) -
			--	(select sum(Actual) from #TablaTemporal1 where Nivel1 = 100 and Nivel2=100 and Nivel3=200 and Nivel4=100 AND Nivel5=200 and Nivel6=0))
			--	where Nivel1 = 100 and Nivel2=100 and Nivel3=200 and Nivel4=100 AND Nivel5=100 and Nivel6=0 			
			
			-- Usos y Aportes
			update #TablaTemporal1 set 
				Anterior = ( 
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 100 and Nivel2=0) - 
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=100 and Nivel3=0) - 
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=200 and Nivel3=100 and Nivel4=0) -
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=200 and Nivel3=200 and Nivel4=0) -
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=200 and Nivel3=300 and Nivel4=0) -
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=200 and Nivel3=400 and Nivel4=0) -
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=200 and Nivel3=500 and Nivel4=0) -
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=200 and Nivel3=600 and Nivel4=0) -
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=200 and Nivel3=700 and Nivel4=0) -
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=200 and Nivel3=800 and Nivel4=0) -
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=200 and Nivel3=900 and Nivel4=0)),
				Actual = ( 
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 100 and Nivel2=0) - 
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=100 and Nivel3=0) - 
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=200 and Nivel3=100 and Nivel4=0) -
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=200 and Nivel3=200 and Nivel4=0) -
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=200 and Nivel3=300 and Nivel4=0) -
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=200 and Nivel3=400 and Nivel4=0) -
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=200 and Nivel3=500 and Nivel4=0) -
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=200 and Nivel3=600 and Nivel4=0) -
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=200 and Nivel3=700 and Nivel4=0) -
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=200 and Nivel3=800 and Nivel4=0) -
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=200 and Nivel3=900 and Nivel4=0)),
				Presupuesto = ( 
				(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 100 and Nivel2=0) - 
				(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=100 and Nivel3=0) - 
				(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=200 and Nivel3=100 and Nivel4=0) -
				(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=200 and Nivel3=200 and Nivel4=0) -
				(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=200 and Nivel3=300 and Nivel4=0) -
				(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=200 and Nivel3=400 and Nivel4=0) -
				(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=200 and Nivel3=500 and Nivel4=0) -
				(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=200 and Nivel3=600 and Nivel4=0) -
				(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=200 and Nivel3=700 and Nivel4=0) -
				(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=200 and Nivel3=800 and Nivel4=0) -
				(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=200 and Nivel3=900 and Nivel4=0))
				where Nivel1 = 200 and Nivel2=200 and Nivel3=1000 and Nivel4=0 

			-- PATRIMONIO
			update #TablaTemporal1 set 
				Anterior = 
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=200 and Nivel3<>0),
				Actual = 
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=200 and Nivel3<>0),
				Presupuesto = 
				(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=200 and Nivel3<>0)
				where Nivel1 = 200 and Nivel2=200 and Nivel3=0 

			-- PASIVO Y PATRIMONIO
			update #TablaTemporal1 set 
				Anterior =	(
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=100 and Nivel3=0) +  
				(select sum(Anterior) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=200 and Nivel3=0)),
				Actual =	(
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=100 and Nivel3=0) +  
				(select sum(Actual) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=200 and Nivel3=0)),
				Presupuesto =	(
				(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=100 and Nivel3=0) +  
				(select sum(Presupuesto) from #TablaTemporal1 where Nivel1 = 200 and Nivel2=200 and Nivel3=0))
				where Nivel1 = 200 and Nivel2=0  

	END

END

```
