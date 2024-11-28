# Stored Procedure: sp_InformesGeneraPresentacionJunta_v2

## Usa los objetos:
- [[InformesDefinitivos]]
- [[InformesDefinitivosJunta]]
- [[InformesJunta]]
- [[InformesJuntaConceptos]]
- [[InformesJuntaCuadros]]
- [[sp_InformesConsultaPresentacion]]

```sql


-- =======================================================================================================================================
-- Author:		LUIS FREDDY GUERRERO LOPEZ
-- Create date: 2018-10-16 ultima actualizacion
-- Description:	GENERA UNA PRESENTACION DE COMITE SEGUN PARAMETROS
-- =======================================================================================================================================

CREATE PROCEDURE [dbo].[sp_InformesGeneraPresentacionJunta_v2] 

	@CodigoPresentacion as smallint,
	@Año as smallint,
	@Mes as smallint,
	@Redondeo bit = 0

AS
BEGIN	
	SET NOCOUNT ON
	SET FMTONLY OFF

	set @Redondeo = 0 

	-- INICIALIZACION DE TABLAS

	if object_id(N'tempdb.dbo.#TablaPresentacion', N'U') is not null
		drop TABLE #TablaPresentacion
	if object_id(N'tempdb.dbo.#TablaJuntaPYGMES', N'U') is not null
		drop TABLE #TablaJuntaPYGMES
	if object_id(N'tempdb.dbo.#TablaJuntaPYGACU', N'U') is not null
		drop TABLE #TablaJuntaPYGACU
	if object_id(N'tempdb.dbo.#TablaJuntaBALMES', N'U') is not null
		drop TABLE #TablaJuntaBALMES
	if object_id(N'tempdb.dbo.#TablaJuntaBALACU', N'U') is not null
		drop TABLE #TablaJuntaBALACU
	if object_id(N'tempdb.dbo.#TablaTempJunta', N'U') is not null
		drop TABLE #TablaTempJunta
	if object_id(N'tempdb.dbo.#TablaJunta', N'U') is not null
		drop TABLE #TablaJunta


	SELECT * into #TablaPresentacion from InformesDefinitivos where 1=2

--PYG MENSUAL
	PRINT 'PYG MENSUAL'
	BEGIN TRAN

		DELETE FROM #TablaPresentacion
		INSERT INTO #TablaPresentacion
			EXEC dbo.sp_InformesConsultaPresentacion @CodigoPresentacion,@Año,@Mes,0,0,@Redondeo
		
		SELECT 1 Tipo,CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Orden,Balance,
				Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,CodigoConcepto,NombreConcepto,AnteriorTotal,
				AntPorcentajeTotal,ActualTotal,ActPorcentajeTotal,PresupuestoTotal,PrePorcentajeTotal,
				AnteriorTotal as AnteriorTotalm,AntPorcentajeTotal as AntPorcentajeTotalm,Año1 as Año3,MesInicial1 as MesFinal3
				INTO #TablaJuntaPYGMES
				FROM #TablaPresentacion 
				ORDER BY Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6

		UPDATE #TablaJuntaPYGMES SET AnteriorTotalm=0, AntPorcentajeTotalm =0,Año3 = 0,MesFinal3=0

	COMMIT
--PYG ACUMULADO
	PRINT 'PYG ACUMULADO'
	BEGIN TRAN
	
		DELETE FROM #TablaPresentacion
		INSERT INTO #TablaPresentacion
		EXEC dbo.sp_InformesConsultaPresentacion @CodigoPresentacion,@Año,@Mes,1,0,0,@Redondeo

		SELECT 2 Tipo, CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Orden,Balance,
				Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,CodigoConcepto,NombreConcepto,AnteriorTotal,
				AntPorcentajeTotal,ActualTotal,ActPorcentajeTotal,PresupuestoTotal,PrePorcentajeTotal,
				AnteriorTotal AnteriorTotalm,AntPorcentajeTotal AntPorcentajeTotalm,Año1 as Año3,MesInicial1 as MesFinal3
				INTO #TablaJuntaPYGACU
				FROM #TablaPresentacion 
				ORDER BY Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6

		UPDATE #TablaJuntaPYGACU SET AnteriorTotalm=0, AntPorcentajeTotalm =0,Año3 = 0,MesFinal3=0

	COMMIT
--BALANCE MENSUAL
	PRINT 'BALANCE MENSUAL'
	BEGIN TRAN

		DELETE FROM #TablaPresentacion
		INSERT INTO #TablaPresentacion
		EXEC dbo.sp_InformesConsultaPresentacion @CodigoPresentacion,@Año,@Mes,0,1,0,@Redondeo
		SELECT CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Orden,Balance,
				Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,CodigoConcepto,NombreConcepto,AnteriorTotal,
				AntPorcentajeTotal,ActualTotal,ActPorcentajeTotal,PresupuestoTotal,PrePorcentajeTotal 
				INTO #TablaJuntaBALMES
				FROM #TablaPresentacion 
				ORDER BY Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6
	COMMIT			
-- BALANCE ACUMULADO
	PRINT 'BALANCE ACUMULADO'
	BEGIN TRAN

		DELETE FROM #TablaPresentacion
		INSERT INTO #TablaPresentacion
		EXEC dbo.sp_InformesConsultaPresentacion @CodigoPresentacion,@Año,@Mes,1,1,0,@Redondeo
		SELECT CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Orden,20 Balance,
				Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,CodigoConcepto,NombreConcepto,AnteriorTotal,
				AntPorcentajeTotal,ActualTotal,ActPorcentajeTotal,PresupuestoTotal,PrePorcentajeTotal 
				INTO #TablaJuntaBALACU
				FROM #TablaPresentacion 
				ORDER BY Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6
	COMMIT

-- UNE BALANCE MES/ACUMULADO
	PRINT 'BALANCE MES/ACUMULADO'
		SELECT 3 Tipo,M.CodigoPresentacion,A.Año1,A.MesInicial1,A.MesFinal1,A.Año2,A.MesInicial2,A.MesFinal2,M.Orden,M.Balance,
			M.Nivel1,M.Nivel2,M.Nivel3,M.Nivel4,M.Nivel5,M.Nivel6,M.CodigoConcepto,M.NombreConcepto,
			A.AnteriorTotal,A.AntPorcentajeTotal,A.ActualTotal,A.ActPorcentajeTotal,A.PresupuestoTotal,
			A.PrePorcentajeTotal,M.AnteriorTotal AnteriorTotalm,M.AntPorcentajeTotal AntPorcentajeTotalm,M.Año1 Año3,M.MesFinal1 MesFinal3  
		INTO #TablaJuntaBAL 
		FROM #TablaJuntaBALMES M 
		left join #TablaJuntaBALACU A ON M.Orden = A.Orden
		ORDER BY M.Nivel1,M.Nivel2,M.Nivel3,M.Nivel4,M.Nivel5,M.Nivel6

-- AGREGA CUADROS JUNTA PYG MENSUAL
	PRINT 'AGREGA JUNTA PYG MENSUAL'
	select T4.tipo,t4.año1,t4.MesInicial1,t4.Mesfinal1,t4.Año2,t4.MesInicial2,t4.MesFinal2,t1.CodigoJunta,t1.NombreJunta,t2.CodigoCuadro,t2.NombreCuadro,
				t3.Renglon,t3.Balance,
				isnull(sum(AnteriorTotal),0) AnteriorTotal,isnull(sum(AntPorcentajeTotal),0) AntPorcentajeTotal,
				isnull(sum(ActualTotal),0) - isnull(sum(AnteriorTotal),0) VariacionAnt,
				case when isnull(sum(AnteriorTotal),0) <> 0 then (( isnull(sum(ActualTotal),0) - isnull(sum(AnteriorTotal),0) ) / isnull(sum(AnteriorTotal),0)) else 0 end VarAntPorcentaje,
				t3.NombreRenglon,
				isnull(sum(ActualTotal),0) ActualTotal,isnull(sum(ActPorcentajeTotal),0) ActPorcentajeTotal,
				isnull(sum(PresupuestoTotal),0) PresupuestoTotal,isnull(sum(PrePorcentajeTotal),0) PrePorcentajeTotal,  
				isnull(sum(ActualTotal),0) - isnull(sum(PresupuestoTotal),0) VariacionPre,
				case when isnull(sum(PresupuestoTotal),0) <> 0 then (( isnull(sum(ActualTotal),0) - isnull(sum(PresupuestoTotal),0) ) / isnull(sum(PresupuestoTotal),0)) else 0 end VarPrePorcentaje,
				isnull(sum(AnteriorTotalm),0) AnteriorTotalm,isnull(sum(AntPorcentajeTotalm),0) AntPorcentajeTotalm,t4.Año3,t4.MesFinal3,
				t3.ColorFila
	into #TablaJunta 
	from InformesJunta t1 
				left join InformesJuntaCuadros t2 on t1.CodigoJunta = t2.CodigoJunta
				left join InformesJuntaConceptos t3 on t2.CodigoCuadro = t3.CodigoCuadro 
				left join #TablaJuntaPYGMES t4 on t3.CodigoConcepto = t4.CodigoConcepto and t3.Balance = t4.Balance 
	where t2.Activo = 1 AND t4.año1 IS NOT NULL
	group by T4.tipo,t4.año1,t4.MesInicial1,t4.Mesfinal1,t4.Año2,t4.MesInicial2,t4.MesFinal2,t1.CodigoJunta,t1.NombreJunta,t2.CodigoCuadro,t2.NombreCuadro,
				t3.Renglon,t3.Balance,t3.NombreRenglon,t4.Año3,t4.MesFinal3,t3.ColorFila
	order by t2.CodigoCuadro,Renglon

-- AGREGA CUADROS JUNTA PYG ACUMULADO

	PRINT 'AGREGA JUNTA PYG ACUMULADO'
	insert into #TablaJunta
	select T4.tipo,t4.año1,t4.MesInicial1,t4.Mesfinal1,t4.Año2,t4.MesInicial2,t4.MesFinal2,t1.CodigoJunta,t1.NombreJunta,t2.CodigoCuadro,t2.NombreCuadro,
				t3.Renglon,t3.Balance,
				isnull(sum(AnteriorTotal),0) AnteriorTotal,isnull(sum(AntPorcentajeTotal),0) AntPorcentajeTotal,
				isnull(sum(ActualTotal),0) - isnull(sum(AnteriorTotal),0) VariacionAnt,
				case when isnull(sum(AnteriorTotal),0) <> 0 then (( isnull(sum(ActualTotal),0) - isnull(sum(AnteriorTotal),0) ) / isnull(sum(AnteriorTotal),0)) else 0 end VarAntPorcentaje,
				t3.NombreRenglon,
				isnull(sum(ActualTotal),0) ActualTotal,isnull(sum(ActPorcentajeTotal),0) ActPorcentajeTotal,
				isnull(sum(PresupuestoTotal),0) PresupuestoTotal,isnull(sum(PrePorcentajeTotal),0) PrePorcentajeTotal,  
				isnull(sum(ActualTotal),0) - isnull(sum(PresupuestoTotal),0) VariacionPre,
				case when isnull(sum(PresupuestoTotal),0) <> 0 then (( isnull(sum(ActualTotal),0) - isnull(sum(PresupuestoTotal),0) ) / isnull(sum(PresupuestoTotal),0)) else 0 end VarPrePorcentaje,
				isnull(sum(AnteriorTotalm),0) AnteriorTotalm,isnull(sum(AntPorcentajeTotalm),0) AntPorcentajeTotalm,t4.Año3,t4.MesFinal3,
				t3.ColorFila
	from InformesJunta t1 
				left join InformesJuntaCuadros t2 on t1.CodigoJunta = t2.CodigoJunta
				left join InformesJuntaConceptos t3 on t2.CodigoCuadro = t3.CodigoCuadro 
				left join #TablaJuntaPYGACU t4 on t3.CodigoConcepto = t4.CodigoConcepto and t3.Balance = t4.Balance 
	where t2.Activo = 1 AND t4.año1 IS NOT NULL
	group by T4.tipo,t4.año1,t4.MesInicial1,t4.Mesfinal1,t4.Año2,t4.MesInicial2,t4.MesFinal2,t1.CodigoJunta,t1.NombreJunta,t2.CodigoCuadro,t2.NombreCuadro,
				t3.Renglon,t3.Balance,t3.NombreRenglon,t4.Año3,t4.MesFinal3,t3.ColorFila
	order by t2.CodigoCuadro,Renglon

-- AGREGA CUADROS JUNTA BALANCE MES+ACU

	PRINT 'AGREGA JUNTA BALANCE MES+ACU'

	insert into #TablaJunta
	select T4.tipo,t4.año1,t4.MesInicial1,t4.Mesfinal1,t4.Año2,t4.MesInicial2,t4.MesFinal2,t1.CodigoJunta,t1.NombreJunta,t2.CodigoCuadro,t2.NombreCuadro,
				t3.Renglon,t3.Balance,
				isnull(sum(AnteriorTotal),0) AnteriorTotal,isnull(sum(AntPorcentajeTotal),0) AntPorcentajeTotal,
				isnull(sum(ActualTotal),0) - isnull(sum(AnteriorTotal),0) VariacionAnt,
				case when isnull(sum(AnteriorTotal),0) <> 0 then (( isnull(sum(ActualTotal),0) - isnull(sum(AnteriorTotal),0) ) / isnull(sum(AnteriorTotal),0)) else 0 end VarAntPorcentaje,
				t3.NombreRenglon,
				isnull(sum(ActualTotal),0) ActualTotal,isnull(sum(ActPorcentajeTotal),0) ActPorcentajeTotal,
				isnull(sum(PresupuestoTotal),0) PresupuestoTotal,isnull(sum(PrePorcentajeTotal),0) PrePorcentajeTotal,  
				isnull(sum(ActualTotal),0) - isnull(sum(PresupuestoTotal),0) VariacionPre,
				case when isnull(sum(PresupuestoTotal),0) <> 0 then (( isnull(sum(ActualTotal),0) - isnull(sum(PresupuestoTotal),0) ) / isnull(sum(PresupuestoTotal),0)) else 0 end VarPrePorcentaje,
				isnull(sum(AnteriorTotalm),0) AnteriorTotalm,isnull(sum(AntPorcentajeTotalm),0) AntPorcentajeTotalm,t4.Año3,t4.MesFinal3,
				t3.ColorFila
	from InformesJunta t1 
				left join InformesJuntaCuadros t2 on t1.CodigoJunta = t2.CodigoJunta
				left join InformesJuntaConceptos t3 on t2.CodigoCuadro = t3.CodigoCuadro 
				left join #TablaJuntaBAL t4 on t3.CodigoConcepto = t4.CodigoConcepto and t3.Balance = t4.Balance 
	where t2.Activo = 1 AND t4.año1 IS NOT NULL
	group by T4.tipo,t4.año1,t4.MesInicial1,t4.Mesfinal1,t4.Año2,t4.MesInicial2,t4.MesFinal2,t1.CodigoJunta,t1.NombreJunta,t2.CodigoCuadro,t2.NombreCuadro,
				t3.Renglon,t3.Balance,t3.NombreRenglon,t4.Año3,t4.MesFinal3,t3.ColorFila
	order by t2.CodigoCuadro,Renglon


	---- Margen Ebidta

		-- Tipo 1

			if object_id(N'tempdb.dbo.#EBITDAAjustado1', N'U') is not null
				drop TABLE #EBITDAAjustado1 
			if object_id(N'tempdb.dbo.#IngresosPeriodo1', N'U') is not null
				drop TABLE #IngresosPeriodo1 

			select AnteriorTotal,ActualTotal,PresupuestoTotal into #EBITDAAjustado1  from #TablaJunta where CodigoCuadro = 17 and tipo= 1 and renglon = 8
			select AnteriorTotal,ActualTotal,PresupuestoTotal into #IngresosPeriodo1 from #TablaJunta where CodigoCuadro = 17 and tipo= 1 and renglon = 10

			update #TablaJunta set 
					AnteriorTotal=   case when (select AnteriorTotal from #IngresosPeriodo1)    = 0 then 0 else (select AnteriorTotal from #EBITDAAjustado1)/(select AnteriorTotal from #IngresosPeriodo1) end,
					ActualTotal=     case when (select ActualTotal from #IngresosPeriodo1)      = 0 then 0 else (select ActualTotal from #EBITDAAjustado1)/(select ActualTotal from #IngresosPeriodo1) end,
					PresupuestoTotal=case when (select PresupuestoTotal from #IngresosPeriodo1) = 0 then 0 else (select PresupuestoTotal from #EBITDAAjustado1)/(select PresupuestoTotal from #IngresosPeriodo1) end
				Where CodigoCuadro = 17 and Renglon = 9 and tipo=1

			update #TablaJunta set 
					VariacionAnt     = ActualTotal - AnteriorTotal ,
					VarAntPorcentaje = 1,
					VariacionPre	 = ActualTotal - PresupuestoTotal ,
					VarPrePorcentaje = ActualTotal / (ActualTotal - PresupuestoTotal)
				Where CodigoCuadro = 17 and Renglon = 9 and tipo=1

		-- Tipo 2

			if object_id(N'tempdb.dbo.#EBITDAAjustado2', N'U') is not null
				drop TABLE #EBITDAAjustado2
			if object_id(N'tempdb.dbo.#IngresosPeriodo2', N'U') is not null
				drop TABLE #IngresosPeriodo2

			select AnteriorTotal,ActualTotal,PresupuestoTotal into #EBITDAAjustado2  from #TablaJunta where CodigoCuadro = 17 and tipo= 2 and renglon = 8
			select AnteriorTotal,ActualTotal,PresupuestoTotal into #IngresosPeriodo2 from #TablaJunta where CodigoCuadro = 17 and tipo= 2 and renglon = 10

			update #TablaJunta set 
					AnteriorTotal=   case when (select AnteriorTotal from #IngresosPeriodo2)    = 0 then 0 else (select AnteriorTotal from #EBITDAAjustado2)/(select AnteriorTotal from #IngresosPeriodo2) end,
					ActualTotal=     case when (select ActualTotal from #IngresosPeriodo2)      = 0 then 0 else (select ActualTotal from #EBITDAAjustado2)/(select ActualTotal from #IngresosPeriodo2) end,
					PresupuestoTotal=case when (select PresupuestoTotal from #IngresosPeriodo2) = 0 then 0 else (select PresupuestoTotal from #EBITDAAjustado2)/(select PresupuestoTotal from #IngresosPeriodo2) end
				Where CodigoCuadro = 17 and Renglon = 9 and tipo=2

			update #TablaJunta set 
					VariacionAnt     = ActualTotal - AnteriorTotal ,
					VarAntPorcentaje = 1,
					VariacionPre	 = ActualTotal - PresupuestoTotal ,
					VarPrePorcentaje = ActualTotal / (ActualTotal - PresupuestoTotal)
				Where CodigoCuadro = 17 and Renglon = 9 and tipo=2

	-- 'Actualiza datos'
	
	--select * from TablaJunta
	--select top 100 * from InformesDefinitivos
	delete from InformesDefinitivosJunta where CodigoPresentacion = @CodigoPresentacion and Año2 = @Año and MesFinal2 = @Mes
		
	insert into InformesDefinitivosJunta
		select @CodigoPresentacion,*,getdate() from #TablaJunta

END

```
