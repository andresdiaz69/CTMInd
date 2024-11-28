# Stored Procedure: sp_InformesGeneraPresentacionJuntaDigital_30Nov2021

## Usa los objetos:
- [[sp_InformesGeneraPresentacion]]
- [[TablaDigital]]
- [[TablaPresentacion]]

```sql

-- =======================================================================================================================================
-- Author:		LUIS FREDDY GUERRERO LOPEZ
-- Create date: 2019 
-- Description:	GENERA UNA PRESENTACION DE COMITE SEGUN PARAMETROS
-- Mod date: 2020-01-07 Se agrega Correccion Monetaria, No Operacionales y la Uilidad Neta al final
-- Mod date: 2020-02-12 En Costos/Utilidad Bruta Se modifica la formula de la comunidad   GP(Comunidad)+UB(Asistencias)-GP(Asistencias)
-- Mod date: 2020-02-26 Se quita Utilidad/Comunidad de la Resta Ingresos - Costos
-- Mod date: 2020-06-26 Se agrega en ingresos,utilidad y gastos de ventas el codigo de concepto 113 por solicitud de Jaime Mayoral
-- =======================================================================================================================================


create PROCEDURE [dbo].[sp_InformesGeneraPresentacionJuntaDigital_30Nov2021] 

	@CodigoPresentacion as smallint,
	@Año as smallint,
	@Mes as smallint,
	@Mes_Acum as bit = 0, -- 0 Mes o 1 Acum,
	--@TipoArbol as bit = 0, -- 0 P&G o 1 Balance			ESTA PRESENTACION SE ALIMENTA SOLO DEL P&G
	--@RetornaTabla bit = 1,
	@Redondeo bit = 1 --0 Sin Redondeo o 1 Con Redondeo
AS



--declare @CodigoPresentacion as smallint,
--	@Año as smallint,
--	@Mes as smallint,
--	@Mes_Acum as bit = 1, 
--	@Redondeo bit = 1 --0 Sin Redondeo o 1 Con Redondeo

--set @CodigoPresentacion = 21
--set	@Año = 2021
--set @Mes = 7






BEGIN	
	SET NOCOUNT ON


	BEGIN TRAN


	-- Ejecuta la presentacion de la informacion base

		exec sp_InformesGeneraPresentacion @CodigoPresentacion,@Año,@Mes,@Mes_Acum,0,0,@Redondeo

	-- Estandariza la ubicacion de las sedes ya que unas tuenen mas sedes que otras por compañia	
	-- Analisis de Datos

		update TablaPresentacion set 
		Anterior16		=Anterior6,
		AntPorcentaje16	=Anterior6,
		Actual16		=Actual6,
		ActPorcentaje16	=ActPorcentaje6,
		Presupuesto16	=Presupuesto6,
		PrePorcentaje16	=PrePorcentaje6
		where @CodigoPresentacion in (21,19) 

	-- Asistencias

		update TablaPresentacion set 
		Anterior17		=Anterior7,
		AntPorcentaje17	=Anterior7,
		Actual17		=Actual7,
		ActPorcentaje17	=ActPorcentaje7,
		Presupuesto17	=Presupuesto7,
		PrePorcentaje17	=PrePorcentaje7
		where @CodigoPresentacion in (21,19) 

		update TablaPresentacion set 
		Anterior17		=Anterior6,
		AntPorcentaje17	=Anterior6,
		Actual17		=Actual6,
		ActPorcentaje17	=ActPorcentaje6,
		Presupuesto17	=Presupuesto6,
		PrePorcentaje17	=PrePorcentaje6
		where @CodigoPresentacion in (20) 
			
	-- Elimina tablas de trabajo para luego crearlas nuevamente

		IF OBJECT_ID (N'dbo.TablaDigital', N'U') IS NOT NULL
			drop table TablaDigital
		IF OBJECT_ID (N'dbo.TablaJuntaDigital', N'U') IS NOT NULL
			drop table TablaJuntaDigital	

	-- Selecciona la informacion

	--select * from TablaDigital
	--select * from TablaJuntaDigital


	

	select *,0 ColorFila into TablaDigital 
		from (

			select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,1 Orden,Nombreconcepto,
			'Total' Sede,Anterior2 Anterior,AntPorcentaje2 AntPorcentaje,Actual2 Actual,ActPorcentaje2 ActPorcentaje,Presupuesto2 Presupuesto,PrePorcentaje2 PrePorcentaje
			from TablaPresentacion where Codigoconcepto in (1) 

			union

			-- INGRESOS
					
			
			select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2, Orden,NombreConcepto,Sede,SUM(Anterior),sum(AntPorcentaje),
			SUM(Actual),sum(ActPorcentaje),SUM(Presupuesto),sum(PrePorcentaje) 
			from (

				select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,2 Orden,Sede2 NombreConcepto,'Total' Sede,SUM(case when CodigoConcepto <> 1 then Anterior2*-1 else Anterior2 end) Anterior,SUM(AntPorcentaje2) AntPorcentaje,SUM(case when CodigoConcepto <> 1 then Actual2*-1 else Actual2 end) Actual,SUM(ActPorcentaje2) ActPorcentaje,SUM(case when CodigoConcepto <> 1 then Presupuesto2*-1 else Presupuesto2 end) Presupuesto,SUM(PrePorcentaje2) PrePorcentaje
				from TablaPresentacion where Codigoconcepto in (1,102) group by CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Sede2
				--union
				--select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,2 Orden,Sede2 NombreConcepto,'Total' Sede,Anterior2 *-1 Anterior,
				--AntPorcentaje2 AntPorcentaje,Actual2 *-1 Actual,ActPorcentaje2 ActPorcentaje,Presupuesto2 *-1 Presupuesto,PrePorcentaje2 PrePorcentaje
				--from TablaPresentacion where Codigoconcepto in (113) 

			) Digital group by CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Orden,NombreConcepto,Sede 
			
			union
			
			select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,3 Orden,Sede1 NombreConcepto,'Total' Sede,SUM(case when CodigoConcepto <> 1 then Anterior1*-1 else Anterior1 end) Anterior,SUM(AntPorcentaje1) AntPorcentaje,SUM(case when CodigoConcepto <> 1 then Actual1*-1 else Actual1 end) Actual,SUM(ActPorcentaje1) ActPorcentaje,SUM(case when CodigoConcepto <> 1 then Presupuesto1*-1 else Presupuesto1 end) Presupuesto,SUM(PrePorcentaje1) PrePorcentaje
			from TablaPresentacion where Codigoconcepto in (1,102) group by CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Sede1
			
			
			union
			--v1
			--select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,4 Orden,Sede3 NombreConcepto,'Total' Sede,SUM(case when CodigoConcepto <> 1 then Anterior3*-1 else Anterior3 end) Anterior,SUM(AntPorcentaje3) AntPorcentaje,SUM(case when CodigoConcepto <> 1 then Actual3*-1 else Actual3 end) Actual,SUM(ActPorcentaje3) ActPorcentaje,SUM(case when CodigoConcepto <> 1 then Presupuesto3*-1 else Presupuesto3 end) Presupuesto,SUM(PrePorcentaje3) PrePorcentaje
			--from TablaPresentacion where Codigoconcepto in (1,288,287) group by CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Sede3
			--v2
			--select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,4 Orden,Sede3 NombreConcepto,'Total' Sede,SUM(case when CodigoConcepto <> 1 then (Anterior3+Anterior17)*-1 else (Anterior3+Anterior17) end) Anterior,SUM(AntPorcentaje3) AntPorcentaje,SUM(case when CodigoConcepto <> 1 then (Actual3+Actual17)*-1 else (Actual3+Actual17) end) Actual,SUM(ActPorcentaje3) ActPorcentaje,SUM(case when CodigoConcepto <> 1 then (Presupuesto3+Presupuesto17)*-1 else Presupuesto3 end) Presupuesto,SUM(PrePorcentaje3) PrePorcentaje
			--from TablaPresentacion where Codigoconcepto in (1,288,287) group by CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Sede3
			--v3
			select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,4 Orden,NombreConcepto,Sede,SUM(Anterior),sum(AntPorcentaje),SUM(Actual),sum(ActPorcentaje),SUM(Presupuesto),sum(PrePorcentaje) from (

				select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,4 Orden,Sede3 NombreConcepto,'Total' Sede,SUM(case when CodigoConcepto <> 1 then Anterior3*-1 else Anterior3 end) Anterior,SUM(AntPorcentaje3) AntPorcentaje,SUM(case when CodigoConcepto <> 1 then Actual3*-1 else Actual3 end) Actual,SUM(ActPorcentaje3) ActPorcentaje,SUM(case when CodigoConcepto <> 1 then Presupuesto3*-1 else Presupuesto3 end) Presupuesto,SUM(PrePorcentaje3) PrePorcentaje
				from TablaPresentacion where Codigoconcepto in (1,288,287) group by CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Sede3
				union
				select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,4 Orden,Sede3 NombreConcepto,'Total' Sede,SUM(case when CodigoConcepto <> 1 then (Anterior17)*-1 else (Anterior17) end) Anterior,SUM(AntPorcentaje17) AntPorcentaje,SUM(case when CodigoConcepto <> 1 then (Actual17)*-1 else (Actual17) end) Actual,SUM(ActPorcentaje17) ActPorcentaje,SUM(case when CodigoConcepto <> 1 then (Presupuesto17)*-1 else Presupuesto17 end) Presupuesto,SUM(PrePorcentaje17) PrePorcentaje
				from TablaPresentacion where Codigoconcepto in (1,288,287) group by CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Sede3
				union
				select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,4 Orden,Sede3 NombreConcepto,'Total' Sede,SUM(Anterior17) Anterior,SUM(AntPorcentaje17) AntPorcentaje,SUM(Actual17) Actual,SUM(ActPorcentaje17) ActPorcentaje,SUM(Presupuesto17) Presupuesto,SUM(PrePorcentaje17) PrePorcentaje
				from TablaPresentacion where Codigoconcepto in (63) group by CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Sede3

			) Comunidades_Mas_Asistencias group by CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Orden,NombreConcepto,Sede 

			union 

			-- COSTOS / UTILIDAD BRUTA

			select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,5 Orden,
			'UTILIDAD BRUTA' NombreConcepto,'Total' Sede,Anterior2 Anterior,AntPorcentaje2 AntPorcentaje,Actual2 Actual,ActPorcentaje2 ActPorcentaje,Presupuesto2 Presupuesto,PrePorcentaje2 PrePorcentaje
			from TablaPresentacion where Codigoconcepto in (1)

			union

			select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,6 Orden,Sede2 NombreConcepto,'Total' Sede,SUM(Anterior2) Anterior,SUM(AntPorcentaje2) AntPorcentaje,SUM(Actual2) Actual,SUM(ActPorcentaje2) ActPorcentaje,SUM(Presupuesto2) Presupuesto,SUM(PrePorcentaje2) PrePorcentaje
			from TablaPresentacion where Codigoconcepto in (125) group by CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Sede2

			union

			select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,7 Orden,Sede1 NombreConcepto,'Total' Sede,SUM(Anterior1) Anterior,SUM(AntPorcentaje1) AntPorcentaje,SUM(Actual1) Actual,SUM(ActPorcentaje1) ActPorcentaje,SUM(Presupuesto1) Presupuesto,SUM(PrePorcentaje1) PrePorcentaje
			from TablaPresentacion where Codigoconcepto in (125) group by CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Sede1

			union
			--v1
			--select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,8 Orden,Sede3 NombreConcepto,'Total' Sede,SUM(Anterior3) Anterior,SUM(AntPorcentaje3) AntPorcentaje,SUM(Actual3) Actual,SUM(ActPorcentaje3) ActPorcentaje,SUM(Presupuesto3) Presupuesto,SUM(PrePorcentaje3) PrePorcentaje
			--from TablaPresentacion where Codigoconcepto in (125) group by CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Sede3
			--v2
			--select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,8 Orden,Sede3 NombreConcepto,'Total' Sede,SUM((Anterior3+Anterior17)) Anterior,SUM(AntPorcentaje3) AntPorcentaje,SUM(Actual3+Actual17) Actual,SUM(ActPorcentaje3) ActPorcentaje,SUM(Presupuesto3+Presupuesto17) Presupuesto,SUM(PrePorcentaje3) PrePorcentaje
			--from TablaPresentacion where Codigoconcepto in (125) group by CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Sede3
			select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,8 Orden,NombreConcepto,Sede,SUM(Anterior),sum(AntPorcentaje),SUM(Actual),sum(ActPorcentaje),SUM(Presupuesto),sum(PrePorcentaje) from (
				
					-- Ingresos Comunidad
					select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,8 Orden,Sede3 NombreConcepto,'Total' Sede,SUM(Anterior3) Anterior,SUM(AntPorcentaje3) AntPorcentaje,SUM(Actual3) Actual,SUM(ActPorcentaje3) ActPorcentaje,SUM(Presupuesto3) Presupuesto,SUM(PrePorcentaje3) PrePorcentaje
					from TablaPresentacion where Codigoconcepto in (1) group by CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Sede3
				
					-- Menos gastos personal Comunidad
					union
					select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,8 Orden,Sede3 NombreConcepto,'Total' Sede,SUM(Anterior3)*-1 Anterior,SUM(AntPorcentaje3) AntPorcentaje,SUM(Actual3)*-1 Actual,SUM(ActPorcentaje3) ActPorcentaje,SUM(Presupuesto3)*-1 Presupuesto,SUM(PrePorcentaje3) PrePorcentaje
					from TablaPresentacion where Codigoconcepto in (125) group by CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Sede3
				
					-- mas utilidad bruta Asistencias -- Se comenta por revision con Jaime (Algun dia de enero) -- Se habilita de nuevo (2020-02-15)
					union
					select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,8 Orden,Sede3 NombreConcepto,'Total' Sede,SUM(Anterior17) Anterior,SUM(AntPorcentaje17) AntPorcentaje,SUM(Actual17) Actual,SUM(ActPorcentaje17) ActPorcentaje,SUM(Presupuesto17) Presupuesto,SUM(PrePorcentaje17) PrePorcentaje
					from TablaPresentacion where Codigoconcepto in (63) group by CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Sede3			

					-- Menos gastos personal Asistencias
					union
					select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,8 Orden,Sede3 NombreConcepto,'Total' Sede,SUM(Anterior17)*-1 Anterior,SUM(AntPorcentaje17) AntPorcentaje,SUM(Actual17)*-1 Actual,SUM(ActPorcentaje17) ActPorcentaje,SUM(Presupuesto17)*-1 Presupuesto,SUM(PrePorcentaje17) PrePorcentaje
					from TablaPresentacion where Codigoconcepto in (125) group by CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Sede3

					--union
					--select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,8 Orden,Sede2 NombreConcepto,'Total' Sede,Anterior2 *-1 Anterior,AntPorcentaje2 AntPorcentaje,Actual2 *-1 Actual,ActPorcentaje2 ActPorcentaje,Presupuesto2 *-1 Presupuesto,PrePorcentaje2 PrePorcentaje
					--from TablaPresentacion where Codigoconcepto in (113) 

			) Comunidades group by CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Orden,NombreConcepto,Sede 
			--union

			---- UTILIDAD BRUTA - JAIME ELIMINO ESTA FILA

			--select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,9 Orden,'UTILIDAD BRUTA' NombreConcepto,'Total' Sede,Anterior2 Anterior,AntPorcentaje2 AntPorcentaje,Actual2 Actual,ActPorcentaje2 ActPorcentaje,Presupuesto2 Presupuesto,PrePorcentaje2 PrePorcentaje
			--from TablaPresentacion where Codigoconcepto in (1)

			union

			-- GASTOS DE OPERACION

			select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,10 Orden,'GASTOS DE OPERACIÓN' NombreConcepto,'Total' Sede,
			Anterior2 Anterior,AntPorcentaje2 AntPorcentaje,Actual2 Actual,ActPorcentaje2 ActPorcentaje,Presupuesto2 Presupuesto,PrePorcentaje2 PrePorcentaje
			from TablaPresentacion where Codigoconcepto in (1)


			union

			-- GASTOS DE VENTAS

			select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,11 Orden,'Gastos de Ventas' NombreConcepto,'Total' Sede,SUM(Anterior) Anterior,SUM(AntPorcentaje) AntPorcentaje,SUM(Actual) Actual,SUM(ActPorcentaje) ActPorcentaje,SUM(Presupuesto) Presupuesto,SUM(PrePorcentaje) PrePorcentaje
			 from (
				select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Anterior2 Anterior,AntPorcentaje2 AntPorcentaje,Actual2 Actual,ActPorcentaje2 ActPorcentaje,Presupuesto2 Presupuesto,PrePorcentaje2 PrePorcentaje
				from TablaPresentacion where Codigoconcepto in (102) 
				union
				select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Anterior1 Anterior,AntPorcentaje1 AntPorcentaje,Actual1 Actual,ActPorcentaje1 ActPorcentaje,Presupuesto1 Presupuesto,PrePorcentaje1 PrePorcentaje
				from TablaPresentacion where Codigoconcepto in (102) 
				union
				select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Anterior3 Anterior,AntPorcentaje3 AntPorcentaje,Actual3 Actual,ActPorcentaje3 ActPorcentaje,Presupuesto3 Presupuesto,PrePorcentaje3 PrePorcentaje
				from TablaPresentacion where Codigoconcepto in (102) 
				union
				select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Anterior17 Anterior,AntPorcentaje17 AntPorcentaje,Actual17 Actual,ActPorcentaje17 ActPorcentaje,Presupuesto17 Presupuesto,PrePorcentaje17 PrePorcentaje
				from TablaPresentacion where Codigoconcepto in (102) 
				union
				select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Anterior2 *-1 Anterior,AntPorcentaje2 AntPorcentaje,Actual2 *-1 Actual,ActPorcentaje2 ActPorcentaje,Presupuesto2 *-1 Presupuesto,PrePorcentaje2 PrePorcentaje
				from TablaPresentacion where Codigoconcepto in (286) 
				union
				select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Anterior1 *-1 Anterior,AntPorcentaje1 AntPorcentaje,Actual1 *-1 Actual,ActPorcentaje1 ActPorcentaje,Presupuesto1 *-1 Presupuesto,PrePorcentaje1 PrePorcentaje
				from TablaPresentacion where Codigoconcepto in (286) 
				union
				select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Anterior3 *-1 Anterior,AntPorcentaje3 AntPorcentaje,Actual3 *-1 Actual,ActPorcentaje3 ActPorcentaje,Presupuesto3 *-1 Presupuesto,PrePorcentaje3 PrePorcentaje
				from TablaPresentacion where Codigoconcepto in (286) 
				union
				select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Anterior17 *-1 Anterior,AntPorcentaje17 AntPorcentaje,Actual17 *-1 Actual,ActPorcentaje17 ActPorcentaje,Presupuesto17 *-1 Presupuesto,PrePorcentaje17 PrePorcentaje
				from TablaPresentacion where Codigoconcepto in (286) 
				union
				select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Anterior2 *-1 Anterior,AntPorcentaje2 AntPorcentaje,Actual2 *-1 Actual,ActPorcentaje2 ActPorcentaje,Presupuesto2 *-1 Presupuesto,PrePorcentaje2 PrePorcentaje
				from TablaPresentacion where Codigoconcepto in (113) 
				union
				select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Anterior1 *-1 Anterior,AntPorcentaje1 AntPorcentaje,
				Actual1 *-1 Actual,ActPorcentaje1 ActPorcentaje,Presupuesto1 *-1 Presupuesto,PrePorcentaje1 PrePorcentaje
				from TablaPresentacion where Codigoconcepto in (116)
			) GastosDeVentas
			group by CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2

			union

			-- GASTOS GENERALES

			select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,12 Orden,'Gastos Generales' NombreConcepto,'Total' Sede,SUM(Anterior) Anterior,SUM(AntPorcentaje) AntPorcentaje,SUM(Actual) Actual,SUM(ActPorcentaje) ActPorcentaje,SUM(Presupuesto) Presupuesto,SUM(PrePorcentaje) PrePorcentaje
			from (

				select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,SUM(Anterior2) Anterior,SUM(AntPorcentaje2) AntPorcentaje,SUM(Actual2) Actual,SUM(ActPorcentaje2) ActPorcentaje,SUM(Presupuesto2) Presupuesto,SUM(PrePorcentaje2) PrePorcentaje
				from TablaPresentacion where Codigoconcepto in (148) group by CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Sede2
				union
				select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Anterior1 Anterior,AntPorcentaje1 AntPorcentaje,Actual1 Actual,ActPorcentaje1 ActPorcentaje,Presupuesto1 Presupuesto,PrePorcentaje1 PrePorcentaje
				from TablaPresentacion where Codigoconcepto in (148) 
				union
				select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Anterior3 Anterior,AntPorcentaje3 AntPorcentaje,Actual3 Actual,ActPorcentaje3 ActPorcentaje,Presupuesto3 Presupuesto,PrePorcentaje3 PrePorcentaje
				from TablaPresentacion where Codigoconcepto in (148) 
				union
				select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Anterior17 Anterior,AntPorcentaje17 AntPorcentaje,Actual17 Actual,ActPorcentaje17 ActPorcentaje,Presupuesto17 Presupuesto,PrePorcentaje17 PrePorcentaje
				from TablaPresentacion where Codigoconcepto in (148) 

			) GastosGenerales

			group by CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2

			union

			-- UTILIDAD OPERATIVA

			select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,13 Orden,'UTILIDAD OPERATIVA' NombreConcepto,'Total' Sede,Anterior2 Anterior,AntPorcentaje2 AntPorcentaje,Actual2 Actual,ActPorcentaje2 ActPorcentaje,Presupuesto2 Presupuesto,PrePorcentaje2 PrePorcentaje
			from TablaPresentacion where Codigoconcepto in (1)


			union

			-- TRANSFORMACION DIGITAL

			select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,14 Orden,'Transformación Digital' NombreConcepto,'Total' Sede,Anterior5 Anterior,AntPorcentaje5 AntPorcentaje,Actual5 Actual,ActPorcentaje5 ActPorcentaje,Presupuesto5 Presupuesto,PrePorcentaje5 PrePorcentaje
			from TablaPresentacion where Codigoconcepto in (231)

			union

				-- ANALISIS DE DATOS

			select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,15 Orden,'Análisis de Datos + PMO' NombreConcepto,'Total' Sede,Anterior16 Anterior,AntPorcentaje16 AntPorcentaje,Actual16 Actual,ActPorcentaje16 ActPorcentaje,Presupuesto16 Presupuesto,PrePorcentaje16 PrePorcentaje
			from TablaPresentacion where Codigoconcepto in (231)

			--union
			
			-- EMPRENDIMIENTOS

			--select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,16 Orden,'Empredimientos' NombreConcepto,'Total' Sede,Anterior4 Anterior,AntPorcentaje4 AntPorcentaje,Actual4 Actual,ActPorcentaje4 ActPorcentaje,Presupuesto4 Presupuesto,PrePorcentaje4 PrePorcentaje
			--from TablaPresentacion where Codigoconcepto in (231)

			

			union

			-- ING. (EGR.) NO OPERACIONALES

			select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Orden,NombreConcepto,Sede,
			Anterior=sum(Anterior),AntPorcentaje=sum(AntPorcentaje),Actual=sum(Actual),ActPorcentaje=sum(ActPorcentaje),Presupuesto=sum(Presupuesto),PrePorcentaje=sum(PrePorcentaje)
			from(
				select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,18 Orden,'No Operacionales' NombreConcepto,'Total' Sede,AnteriorTotal Anterior,AntPorcentajeTotal AntPorcentaje,ActualTotal Actual,ActPorcentajeTotal ActPorcentaje,PresupuestoTotal Presupuesto,PrePorcentajeTotal PrePorcentaje
				from TablaPresentacion where Codigoconcepto in (232)
				union
				select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,18 Orden,'No Operacionales' NombreConcepto,'Total' Sede,AnteriorTotal Anterior,AntPorcentajeTotal AntPorcentaje,ActualTotal Actual,ActPorcentajeTotal ActPorcentaje,PresupuestoTotal Presupuesto,PrePorcentajeTotal PrePorcentaje
				from TablaPresentacion where Codigoconcepto in (186)
				union
				select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,18 Orden,'No Operacionales' NombreConcepto,'Total' Sede,
				Anterior1,AntPorcentaje1,Actual1,ActPorcentaje1,Presupuesto1,PrePorcentaje1
				from TablaPresentacion where Codigoconcepto in (254)
				union
				select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,18 Orden,'No Operacionales' NombreConcepto,'Total' Sede,
				Anterior2,AntPorcentaje2,Actual2,ActPorcentaje2,Presupuesto2,PrePorcentaje2
				from TablaPresentacion where Codigoconcepto in (254)
				union
				select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,18 Orden,'No Operacionales' NombreConcepto,'Total' Sede,
				Anterior3,AntPorcentaje3,Actual3,ActPorcentaje3,Presupuesto3,PrePorcentaje3
				from TablaPresentacion where Codigoconcepto in (254)
			)a	group by CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Orden,NombreConcepto,Sede

			
			union

	
--select * from tablapresentacion where Codigoconcepto in (254)


		-- GAC	--- CORRECCION MONETARIA

			select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Orden,NombreConcepto,Sede,
					 Anterior=sum(Anterior),AntPorcentaje=sum(AntPorcentaje),Actual=sum(Actual),ActPorcentaje=sum(ActPorcentaje),Presupuesto=sum(Presupuesto),
					 PrePorcentaje=sum(PrePorcentaje)
			from(
					select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,19 Orden,'GAC' NombreConcepto,'Total' Sede,
					Anterior1 Anterior,AntPorcentaje1 AntPorcentaje,Actual1 Actual,ActPorcentaje1 ActPorcentaje,Presupuesto1 Presupuesto,PrePorcentaje1 PrePorcentaje
					from TablaPresentacion where Codigoconcepto in (266)

					union all

					select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,19 Orden,'GAC' NombreConcepto,'Total' Sede,
					Anterior2 Anterior,AntPorcentaje2 AntPorcentaje,Actual2 Actual,ActPorcentaje2 ActPorcentaje,Presupuesto2 Presupuesto,PrePorcentaje2 PrePorcentaje
					from TablaPresentacion where Codigoconcepto in (266)

					union all

					select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,19 Orden,'GAC' NombreConcepto,'Total' Sede,
					Anterior3 Anterior,AntPorcentaje3 AntPorcentaje,Actual3 Actual,ActPorcentaje3 ActPorcentaje,Presupuesto3 Presupuesto,PrePorcentaje3 PrePorcentaje
					from TablaPresentacion where Codigoconcepto in (266)

					union all

					select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,19 Orden,'GAC' NombreConcepto,'Total' Sede,
					Anterior4 Anterior,AntPorcentaje4 AntPorcentaje,Actual4 Actual,ActPorcentaje4 ActPorcentaje,Presupuesto4 Presupuesto,PrePorcentaje4 PrePorcentaje
					from TablaPresentacion where Codigoconcepto in (266)

					union all

					select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,19 Orden,'GAC' NombreConcepto,'Total' Sede,
					Anterior5 Anterior,AntPorcentaje5 AntPorcentaje,Actual5 Actual,ActPorcentaje5 ActPorcentaje,Presupuesto5 Presupuesto,PrePorcentaje5 PrePorcentaje
					from TablaPresentacion where Codigoconcepto in (266)

					union all

					select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,19 Orden,'GAC' NombreConcepto,'Total' Sede,
					Anterior6 Anterior,AntPorcentaje6 AntPorcentaje,Actual6 Actual,ActPorcentaje6 ActPorcentaje,Presupuesto6 Presupuesto,PrePorcentaje6 PrePorcentaje
					from TablaPresentacion where Codigoconcepto in (266)

					union all

					select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,19 Orden,'GAC' NombreConcepto,'Total' Sede,
					Anterior10 Anterior,AntPorcentaje10 AntPorcentaje,Actual10 Actual,ActPorcentaje10 ActPorcentaje,Presupuesto10 Presupuesto,PrePorcentaje10 PrePorcentaje
					from TablaPresentacion where Codigoconcepto in (266)


			)a	group by CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Orden,NombreConcepto,Sede




			union

			-- TOTAL TRANSFORMACION

			select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,20 Orden,'TOTAL TRANSFORMACION' NombreConcepto,'Total' Sede,AnteriorTotal Anterior,AntPorcentajeTotal AntPorcentaje,ActualTotal Actual,ActPorcentajeTotal ActPorcentaje,PresupuestoTotal Presupuesto,PrePorcentajeTotal PrePorcentaje
			from TablaPresentacion where Codigoconcepto in (231)
					   
			union



			-- Bellpi APP & Connect

			select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2, Orden,NombreConcepto,Sede,Anterior=sum(Anterior),AntPorcentaje=sum(AntPorcentaje),Actual=sum(Actual),
			ActPorcentaje=sum(ActPorcentaje),Presupuesto=sum(Presupuesto),PrePorcentaje=sum(PrePorcentaje)
			from(
					select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,21 Orden,'Bellpi APP & Connect' NombreConcepto,'Total' Sede,Anterior4 Anterior,AntPorcentaje4 AntPorcentaje,Actual4 Actual,ActPorcentaje4 ActPorcentaje,Presupuesto4 Presupuesto,PrePorcentaje4 PrePorcentaje
					from TablaPresentacion where Codigoconcepto in (298)
			
					union all

					select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,21 Orden,'Bellpi APP & Connect' NombreConcepto,'Total' Sede,Anterior4*-1 Anterior,AntPorcentaje4*-1 AntPorcentaje,Actual4*-1 Actual,ActPorcentaje4*-1 ActPorcentaje,Presupuesto4*-1 Presupuesto,PrePorcentaje4*-1 PrePorcentaje
					from TablaPresentacion where Codigoconcepto in (266)
			)a	group by CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2, Orden,NombreConcepto,Sede


	


	
			union
			
			-- Bellpi Usados
			select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2, Orden,NombreConcepto,Sede,Anterior=sum(Anterior),AntPorcentaje=sum(AntPorcentaje),Actual=sum(Actual),
			ActPorcentaje=sum(ActPorcentaje),Presupuesto=sum(Presupuesto),PrePorcentaje=sum(PrePorcentaje)
			from(
				select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,22 Orden,'Bellpi Usados' NombreConcepto,'Total' Sede,Anterior8 Anterior,AntPorcentaje8 AntPorcentaje,Actual8 Actual,ActPorcentaje8 ActPorcentaje,Presupuesto8 Presupuesto,PrePorcentaje8 PrePorcentaje
				from TablaPresentacion where Codigoconcepto in (298)
			
				union all

				select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,22 Orden,'Bellpi Usados' NombreConcepto,'Total' Sede,Anterior8*-1 Anterior,AntPorcentaje8*-1 AntPorcentaje,Actual8*-1 Actual,ActPorcentaje8*-1 ActPorcentaje,Presupuesto8*-1 Presupuesto,PrePorcentaje8*-1 PrePorcentaje
				from TablaPresentacion where Codigoconcepto in (266)
			)a	group by CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2, Orden,NombreConcepto,Sede


			union

			-- Ecommerce Bonaparte

			select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2, Orden,NombreConcepto,Sede,Anterior=sum(Anterior),AntPorcentaje=sum(AntPorcentaje),Actual=sum(Actual),
			ActPorcentaje=sum(ActPorcentaje),Presupuesto=sum(Presupuesto),PrePorcentaje=sum(PrePorcentaje)
			from(
				select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,23 Orden,'Ecommerce Bonaparte' NombreConcepto,'Total' Sede,Anterior9 Anterior,AntPorcentaje9 AntPorcentaje,Actual9 Actual,ActPorcentaje9 ActPorcentaje,Presupuesto9 Presupuesto,PrePorcentaje9 PrePorcentaje
				from TablaPresentacion where Codigoconcepto in (298)
			
				union all

				select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,23 Orden,'Ecommerce Bonaparte' NombreConcepto,'Total' Sede,Anterior9*-1 Anterior,AntPorcentaje9*-1 AntPorcentaje,Actual9*-1 Actual,ActPorcentaje9*-1 ActPorcentaje,Presupuesto9*-1 Presupuesto,PrePorcentaje9*-1 PrePorcentaje
				from TablaPresentacion where Codigoconcepto in (266)
			)a	group by CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2, Orden,NombreConcepto,Sede


			union

		
			-- GAC

			select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Orden,NombreConcepto,Sede,
					 Anterior=sum(Anterior),AntPorcentaje=sum(AntPorcentaje),Actual=sum(Actual),ActPorcentaje=sum(ActPorcentaje),Presupuesto=sum(Presupuesto),
					 PrePorcentaje=sum(PrePorcentaje)
			from(
					select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,24 Orden,'GAC' NombreConcepto,'Total' Sede,
					Anterior7 Anterior,AntPorcentaje7 AntPorcentaje,Actual7 Actual,ActPorcentaje7 ActPorcentaje,Presupuesto7 Presupuesto,PrePorcentaje7 PrePorcentaje
					from TablaPresentacion where Codigoconcepto in (266)

					union all

					select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,24 Orden,'GAC' NombreConcepto,'Total' Sede,
					Anterior8 Anterior,AntPorcentaje8 AntPorcentaje,Actual8 Actual,ActPorcentaje8 ActPorcentaje,Presupuesto8 Presupuesto,PrePorcentaje8 PrePorcentaje
					from TablaPresentacion where Codigoconcepto in (266)

					union all

					select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,24 Orden,'GAC' NombreConcepto,'Total' Sede,
					Anterior9 Anterior,AntPorcentaje9 AntPorcentaje,Actual9 Actual,ActPorcentaje9 ActPorcentaje,Presupuesto9 Presupuesto,PrePorcentaje9 PrePorcentaje
					from TablaPresentacion where Codigoconcepto in (266)
			)a	group by CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Orden,NombreConcepto,Sede


		
			union
			-- TOTAL EMPRENDIMIENTOS

			select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,25 Orden,'TOTAL EMPRENDIMIENTOS' NombreConcepto,'Total' Sede,Anterior2 Anterior,AntPorcentaje2 AntPorcentaje,Actual2 Actual,ActPorcentaje2 ActPorcentaje,Presupuesto2 Presupuesto,PrePorcentaje2 PrePorcentaje
			from TablaPresentacion where Codigoconcepto in (231)

			union
			-- GRAN TOTAL (TRANS+EMP)

			select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,26 Orden,'GRAN TOTAL (TRANS+EMP)' NombreConcepto,'Total' Sede,Anterior2 Anterior,AntPorcentaje2 AntPorcentaje,Actual2 Actual,ActPorcentaje2 ActPorcentaje,Presupuesto2 Presupuesto,PrePorcentaje2 PrePorcentaje
			from TablaPresentacion where Codigoconcepto in (231)

		) TablaPresentacion

	COMMIT


	--select * from TablaDigital
	--select * from TablaJuntaDigital

	-- Organiza Totales

	-- Inicializa Totales
	update TablaDigital set Anterior = 0,Actual = 0,Presupuesto = 0,AntPorcentaje = 0,ActPorcentaje = 0,PrePorcentaje = 0 where Orden in (5,9,10,13,20,25,26)

	-- Corrige Signo de visualizacion
	--update TablaDigital set Anterior = Anterior*-1 ,Actual = Actual*-1,Presupuesto = Presupuesto*-1,AntPorcentaje = AntPorcentaje*-1,ActPorcentaje = ActPorcentaje*-1,PrePorcentaje = PrePorcentaje*-1 where Orden in (2,3,4)
	--update TablaDigital set Anterior = Anterior*-1 ,Actual = Actual*-1,Presupuesto = Presupuesto*-1,AntPorcentaje = AntPorcentaje*-1,ActPorcentaje = ActPorcentaje*-1,PrePorcentaje = PrePorcentaje*-1 where Orden in (1)

	-- Totaliza Ingresos - Gastos

	update TablaDigital set Anterior = (select SUM(Anterior) from TablaDigital where Orden in (2,3,4)),
							Actual =  (select SUM(Actual) from TablaDigital where Orden in (2,3,4)),
							Presupuesto =  (select SUM(Presupuesto) from TablaDigital where Orden in (2,3,4))
							where Orden = 1 

	-- Resta Ingresos - Costos

	update TablaDigital set Anterior =		((select SUM(Anterior)		from TablaDigital where Orden in (2)) - Anterior), 
							Actual =		((select SUM(Actual)		from TablaDigital where Orden in (2)) - Actual), 
							Presupuesto =	((select SUM(Presupuesto)	from TablaDigital where Orden in (2)) - Presupuesto) 
							where Orden = 6 

	update TablaDigital set Anterior =		((select SUM(Anterior)		from TablaDigital where Orden in (3)) - Anterior), 
							Actual =		((select SUM(Actual)		from TablaDigital where Orden in (3)) - Actual), 
							Presupuesto =	((select SUM(Presupuesto)	from TablaDigital where Orden in (3)) - Presupuesto) 
							where Orden = 7 

	-- Se retira con aprobacion de Jaime Mayoral 
	--update TablaDigital set Anterior =		((select SUM(Anterior)		from TablaDigital where Orden in (4)) - Anterior), 
	--						Actual =		((select SUM(Actual)		from TablaDigital where Orden in (4)) - Actual), 
	--						Presupuesto =	((select SUM(Presupuesto)	from TablaDigital where Orden in (4)) - Presupuesto) 
	--						where Orden = 8 

	-- Totaliza Utilidad Bruta
	update TablaDigital set Anterior = (select SUM(Anterior) from TablaDigital where Orden in (6,7,8)),
							Actual = (select SUM(Actual) from TablaDigital where Orden in (6,7,8)),
							Presupuesto = (select SUM(Presupuesto) from TablaDigital where Orden in (6,7,8))
							where Orden = 5

	-- Totaliza GASTOS DE OPERACION
	update TablaDigital set Anterior =		((select SUM(Anterior)		from TablaDigital where Orden in (11)) + (select SUM(Anterior)		from TablaDigital where Orden in (12))), 
							AntPorcentaje = ((select SUM(AntPorcentaje) from TablaDigital where Orden in (11)) + (select SUM(AntPorcentaje)	from TablaDigital where Orden in (12))),
							Actual =		((select SUM(Actual)		from TablaDigital where Orden in (11)) + (select SUM(Actual)		from TablaDigital where Orden in (12))), 
							ActPorcentaje = ((select SUM(ActPorcentaje) from TablaDigital where Orden in (11)) + (select SUM(ActPorcentaje)	from TablaDigital where Orden in (12))),
							Presupuesto =	((select SUM(Presupuesto)	from TablaDigital where Orden in (11)) + (select SUM(Presupuesto)	from TablaDigital where Orden in (12))), 
							PrePorcentaje = ((select SUM(PrePorcentaje) from TablaDigital where Orden in (11)) + (select SUM(PrePorcentaje)	from TablaDigital where Orden in (12))) 
							where Orden = 10

	-- Totaliza UTILIDAD OPERATIVA
	update TablaDigital set Anterior =		((select SUM(Anterior)		from TablaDigital where Orden in (5)) - (select SUM(Anterior)		from TablaDigital where Orden in (10))), 
							AntPorcentaje = ((select SUM(AntPorcentaje) from TablaDigital where Orden in (5)) - (select SUM(AntPorcentaje)	from TablaDigital where Orden in (10))),
							Actual =		((select SUM(Actual)		from TablaDigital where Orden in (5)) - (select SUM(Actual)			from TablaDigital where Orden in (10))), 
							ActPorcentaje = ((select SUM(ActPorcentaje) from TablaDigital where Orden in (5)) - (select SUM(ActPorcentaje)	from TablaDigital where Orden in (10))),
							Presupuesto =	((select SUM(Presupuesto)	from TablaDigital where Orden in (5)) - (select SUM(Presupuesto)	from TablaDigital where Orden in (10))), 
							PrePorcentaje = ((select SUM(PrePorcentaje) from TablaDigital where Orden in (5)) - (select SUM(PrePorcentaje)	from TablaDigital where Orden in (10))) 
							where Orden = 13

	-- Totaliza UTILIDAD NETA DISTRIBUIBLE
	--update TablaDigital set Anterior = (select SUM(Anterior) from TablaDigital where Orden in (13,14,15,16,17,18)),
	--						Actual =  (select SUM(Actual) from TablaDigital where Orden in (13,14,15,16,17,18)),
	--						Presupuesto =  (select SUM(Presupuesto) from TablaDigital where Orden in (13,14,15,16,17,18))
	--						where Orden = 19

-- Totaliza TOTAL TRANSFORMACION
	update TablaDigital set Anterior =		((select SUM(Anterior)		from TablaDigital where Orden in (5)) - (select SUM(Anterior)		from TablaDigital where Orden in (10)))+
											(select SUM(Anterior)		from TablaDigital where Orden in (14))+
											(select SUM(Anterior)		from TablaDigital where Orden in (15))+
											(select SUM(Anterior)		from TablaDigital where Orden in (18))+
											(select SUM(Anterior)		from TablaDigital where Orden in (19)),

							AntPorcentaje = ((select SUM(AntPorcentaje) from TablaDigital where Orden in (5)) - (select SUM(AntPorcentaje)	from TablaDigital where Orden in (10)))+
											(select SUM(AntPorcentaje) from TablaDigital where Orden in (14))+ 
											(select SUM(AntPorcentaje) from TablaDigital where Orden in (15))+
											(select SUM(AntPorcentaje) from TablaDigital where Orden in (18))+
											(select SUM(AntPorcentaje) from TablaDigital where Orden in (19)),


							Actual =		((select SUM(Actual)		from TablaDigital where Orden in (5)) - (select SUM(Actual)			from TablaDigital where Orden in (10)))+
											(select SUM(Actual)		from TablaDigital where Orden in (14))+
											(select SUM(Actual)		from TablaDigital where Orden in (15))+
											(select SUM(Actual)		from TablaDigital where Orden in (18))+
											(select SUM(Actual)		from TablaDigital where Orden in (19)),
							
							ActPorcentaje = ((select SUM(ActPorcentaje) from TablaDigital where Orden in (5)) - (select SUM(ActPorcentaje)	from TablaDigital where Orden in (10)))+
											(select SUM(ActPorcentaje) from TablaDigital where Orden in (14))+
											(select SUM(ActPorcentaje) from TablaDigital where Orden in (15))+
											(select SUM(ActPorcentaje) from TablaDigital where Orden in (18))+
											(select SUM(ActPorcentaje) from TablaDigital where Orden in (19)),

							Presupuesto =	((select SUM(Presupuesto)	from TablaDigital where Orden in (5)) - (select SUM(Presupuesto)	from TablaDigital where Orden in (10)))+
											(select SUM(Presupuesto)	from TablaDigital where Orden in (14))+
											(select SUM(Presupuesto)	from TablaDigital where Orden in (15))+
											(select SUM(Presupuesto)	from TablaDigital where Orden in (18))+
											(select SUM(Presupuesto)	from TablaDigital where Orden in (19)),

							PrePorcentaje = ((select SUM(PrePorcentaje) from TablaDigital where Orden in (5)) - (select SUM(PrePorcentaje)	from TablaDigital where Orden in (10))) +
											(select SUM(PrePorcentaje) from TablaDigital where Orden in (14))+
											(select SUM(PrePorcentaje) from TablaDigital where Orden in (15))+
											(select SUM(PrePorcentaje) from TablaDigital where Orden in (18))+
											(select SUM(PrePorcentaje) from TablaDigital where Orden in (19))
											where Orden = 20

-- Totaliza TOTAL EMPRENDIMIENTOS

	update TablaDigital set Anterior =		((select SUM(Anterior)		from TablaDigital where Orden in (21)) + (select SUM(Anterior)		from TablaDigital where Orden in (22))
											+ (select SUM(Anterior)		from TablaDigital where Orden in (23)) + (select SUM(Anterior)		from TablaDigital where Orden in (24))), 

							AntPorcentaje = ((select SUM(AntPorcentaje) from TablaDigital where Orden in (21)) + (select SUM(AntPorcentaje)	from TablaDigital where Orden in (22))
											+(select SUM(AntPorcentaje) from TablaDigital where Orden in (23)) + (select SUM(AntPorcentaje) from TablaDigital where Orden in (24))),

							Actual =		((select SUM(Actual)		from TablaDigital where Orden in (21)) + (select SUM(Actual)		from TablaDigital where Orden in (22))
											+(select SUM(Actual)		from TablaDigital where Orden in (23)) + (select SUM(Actual)		from TablaDigital where Orden in (24))),
							
							ActPorcentaje = ((select SUM(ActPorcentaje) from TablaDigital where Orden in (21)) + (select SUM(ActPorcentaje)	from TablaDigital where Orden in (22))
											+(select SUM(ActPorcentaje) from TablaDigital where Orden in (23)) + (select SUM(ActPorcentaje) from TablaDigital where Orden in (24))),
											
							Presupuesto =	((select SUM(Presupuesto)	from TablaDigital where Orden in (21)) + (select SUM(Presupuesto)	from TablaDigital where Orden in (22))
											+(select SUM(Presupuesto)	from TablaDigital where Orden in (23)) + (select SUM(Presupuesto)	from TablaDigital where Orden in (24))), 


							PrePorcentaje = ((select SUM(PrePorcentaje) from TablaDigital where Orden in (21)) + (select SUM(PrePorcentaje)	from TablaDigital where Orden in (22))
											+(select SUM(PrePorcentaje) from TablaDigital where Orden in (23)) + (select SUM(PrePorcentaje) from TablaDigital where Orden in (24))) 
							where Orden = 25


-- Totaliza TOTAL GRAN TOTAL (TRANS+EMP)

	update TablaDigital set Anterior =		((select SUM(Anterior)		from TablaDigital where Orden in (20)) + (select SUM(Anterior)		from TablaDigital where Orden in (25))), 

							AntPorcentaje = ((select SUM(AntPorcentaje) from TablaDigital where Orden in (20)) + (select SUM(AntPorcentaje)	from TablaDigital where Orden in (25))),

							Actual =		((select SUM(Actual)		from TablaDigital where Orden in (20)) + (select SUM(Actual)		from TablaDigital where Orden in (25))),
							
							ActPorcentaje = ((select SUM(ActPorcentaje) from TablaDigital where Orden in (20)) + (select SUM(ActPorcentaje)	from TablaDigital where Orden in (25))),
											
							Presupuesto =	((select SUM(Presupuesto)	from TablaDigital where Orden in (20)) + (select SUM(Presupuesto)	from TablaDigital where Orden in (25))), 


							PrePorcentaje = ((select SUM(PrePorcentaje) from TablaDigital where Orden in (20)) + (select SUM(PrePorcentaje)	from TablaDigital where Orden in (25))) 
							where Orden = 26



	-- Correccion de Porcentajes
	
	update TablaDigital set AntPorcentaje = 1,ActPorcentaje = 1,PrePorcentaje = 1 where Orden in (1,5)


	update TablaDigital set AntPorcentaje = case when (Select Anterior from TablaDigital where Orden = 1) <> 0 then (Anterior*1)/(Select Anterior from TablaDigital where Orden = 1) else 0 end, 
							ActPorcentaje = case when (Select Actual from TablaDigital where Orden = 1) <> 0 then (Actual*1)/(Select Actual from TablaDigital where Orden = 1) else 0 end,   
							PrePorcentaje = case when (Select Presupuesto from TablaDigital where Orden = 1) <> 0 then (Presupuesto*1)/(Select Presupuesto from TablaDigital where Orden = 1) else 0 end  
							where Orden in (2,3,4,5,10,13)

	update TablaDigital set AntPorcentaje = case when (Select Anterior from TablaDigital where Orden = 1) <> 0 then (Anterior*1)/(Select Anterior from TablaDigital where Orden = 1) else 0 end, 
							ActPorcentaje = case when (Select Actual from TablaDigital where Orden = 1) <> 0 then (Actual*1)/(Select Actual from TablaDigital where Orden = 1) else 0 end,   
							PrePorcentaje = case when (Select Presupuesto from TablaDigital where Orden = 1) <> 0 then (Presupuesto*1)/(Select Presupuesto from TablaDigital where Orden = 1) else 0 end  
							where Orden in (6,7,8)

	update TablaDigital set AntPorcentaje = case when (Select Anterior from TablaDigital where Orden = 1) <> 0 then (Anterior*1)/(Select Anterior from TablaDigital where Orden = 1) else 0 end, 
							ActPorcentaje = case when (Select Actual from TablaDigital where Orden = 1) <> 0 then (Actual*1)/(Select Actual from TablaDigital where Orden = 1) else 0 end,   
							PrePorcentaje = case when (Select Presupuesto from TablaDigital where Orden = 1) <> 0 then (Presupuesto*1)/(Select Presupuesto from TablaDigital where Orden = 1) else 0 end  
							where Orden in (11,12)

	update TablaDigital set AntPorcentaje = case when (Select Anterior from TablaDigital where Orden = 1) <> 0 then (Anterior*1)/(Select Anterior from TablaDigital where Orden = 1) else 0 end, 
							ActPorcentaje = case when (Select Actual from TablaDigital where Orden = 1) <> 0 then (Actual*1)/(Select Actual from TablaDigital where Orden = 1) else 0 end,   
							PrePorcentaje = case when (Select Presupuesto from TablaDigital where Orden = 1) <> 0 then (Presupuesto*1)/(Select Presupuesto from TablaDigital where Orden = 1) else 0 end  
							where Orden in (13,14,15,16,17,18,19)

	-- asigna color a las filas

	--Anteriores
	--update TablaDigital set ColorFila = 1 where Orden in (1,10)
	--update TablaDigital set ColorFila = 2 where Orden in (3,7,11,17,18)
	--update TablaDigital set ColorFila = 3 where Orden in (5,13,19)

	--Nuevas
	update TablaDigital set ColorFila = 1 where Orden in (20,25)
	update TablaDigital set ColorFila = 2 where Orden in (26)
	update TablaDigital set ColorFila = 3 where Orden in (1,5,10,13,18,19,24)

	-- Agrega columnas de variacion

	SELECT CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Orden,Sede,Anterior, AntPorcentaje,
		Actual-Anterior VariacionAnt,
		case when Anterior<>0 then (Actual-Anterior)/Anterior else 1 end VarAntPorcentaje, 
		Nombreconcepto, Actual, ActPorcentaje, Presupuesto, PrePorcentaje, 
		Actual - Presupuesto VariacionPre,
		case when Presupuesto <> 0 then (Actual - Presupuesto) / Presupuesto else 0 end VarPrePorcentaje,
		ColorFila
	into TablaJuntaDigital
	FROM TablaDigital

	drop table TablaDigital


END



-- select * from TablaJuntaDigital
```
