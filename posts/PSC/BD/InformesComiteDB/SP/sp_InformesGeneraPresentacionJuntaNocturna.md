# Stored Procedure: sp_InformesGeneraPresentacionJuntaNocturna

## Usa los objetos:
- [[InformesJunta]]
- [[InformesJuntaConceptos]]
- [[InformesJuntaCuadros]]
- [[sp_InformesGeneraPresentacion]]
- [[TablaJunta]]
- [[TablaPresentacion]]

```sql



-- =======================================================================================================================================
-- Author:		LUIS FREDDY GUERRERO LOPEZ
-- Create date: 2018-10-16 ultima actualizacion
-- Description:	GENERA UNA PRESENTACION DE COMITE SEGUN PARAMETROS
-- =======================================================================================================================================

create PROCEDURE [dbo].[sp_InformesGeneraPresentacionJuntaNocturna] 

	@CodigoPresentacion as smallint,
	@Año as smallint,
	@Mes as smallint,
	@Redondeo bit = 1 --0 Sin Redondeo o 1 Con Redondeo
AS
BEGIN	
	SET NOCOUNT ON
	SET FMTONLY OFF

	-- INICIALIZACION DE TABLAS

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
	--IF OBJECT_ID (N'dbo.TablaJuntaNocturna', N'U') IS NOT NULL
	--	DROP TABLE dbo.TablaJuntaNocturna


--PYG MENSUAL
	PRINT 'PYG MENSUAL'
	BEGIN TRAN
		EXEC dbo.sp_InformesGeneraPresentacion @CodigoPresentacion,@Año,@Mes,0,0,0,@Redondeo
		SELECT 1 Tipo,CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Orden,Balance,
				Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,CodigoConcepto,NombreConcepto,AnteriorTotal,
				AntPorcentajeTotal,ActualTotal,ActPorcentajeTotal,PresupuestoTotal,PrePorcentajeTotal,
				AnteriorTotal AnteriorTotalm,AntPorcentajeTotal AntPorcentajeTotalm,Año1 as Año3,MesInicial1 as MesFinal3
				INTO #TablaJuntaPYGMES
				FROM TablaPresentacion 
				ORDER BY Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6
		UPDATE #TablaJuntaPYGMES SET AnteriorTotalm=0, AntPorcentajeTotalm =0,Año3 = 0,MesFinal3=0
	COMMIT
--PYG ACUMULADO
	PRINT 'PYG ACUMULADO'
	BEGIN TRAN
		EXEC dbo.sp_InformesGeneraPresentacion @CodigoPresentacion,@Año,@Mes,1,0,0,@Redondeo
		SELECT 2 Tipo, CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Orden,Balance,
				Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,CodigoConcepto,NombreConcepto,AnteriorTotal,
				AntPorcentajeTotal,ActualTotal,ActPorcentajeTotal,PresupuestoTotal,PrePorcentajeTotal,
				AnteriorTotal AnteriorTotalm,AntPorcentajeTotal AntPorcentajeTotalm,Año1 as Año3,MesInicial1 as MesFinal3
				INTO #TablaJuntaPYGACU
				FROM TablaPresentacion 
				ORDER BY Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6
		UPDATE #TablaJuntaPYGACU SET AnteriorTotalm=0, AntPorcentajeTotalm =0,Año3 = 0,MesFinal3=0
	COMMIT
--BALANCE MENSUAL
	PRINT 'BALANCE MENSUAL'
	BEGIN TRAN
		EXEC dbo.sp_InformesGeneraPresentacion @CodigoPresentacion,@Año,@Mes,0,1,0,@Redondeo
		SELECT CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Orden,Balance,
				Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,CodigoConcepto,NombreConcepto,AnteriorTotal,
				AntPorcentajeTotal,ActualTotal,ActPorcentajeTotal,PresupuestoTotal,PrePorcentajeTotal 
				INTO #TablaJuntaBALMES
				FROM TablaPresentacion 
				ORDER BY Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6
	COMMIT			
-- BALANCE ACUMULADO
	PRINT 'BALANCE ACUMULADO'
	BEGIN TRAN
		EXEC dbo.sp_InformesGeneraPresentacion @CodigoPresentacion,@Año,@Mes,1,1,0,@Redondeo
		SELECT CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Orden,20 Balance,
				Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,CodigoConcepto,NombreConcepto,AnteriorTotal,
				AntPorcentajeTotal,ActualTotal,ActPorcentajeTotal,PresupuestoTotal,PrePorcentajeTotal 
				INTO #TablaJuntaBALACU
				FROM TablaPresentacion 
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

-- RETORNA TABLA
	PRINT 'RETORNA TABLA'

	IF OBJECT_ID (N'dbo.TablaJunta', N'U') IS NOT NULL  
	BEGIN
		PRINT 'TablaJuntaNocturna Existe'
		IF EXISTS(SELECT * FROM TablaJunta WHERE CodigoPresentacion=@CodigoPresentacion and Año=@Año and Mes=@Mes)
		BEGIN
			PRINT 'Se borran registros de la presentacion especifica'
			delete from TablaJunta where CodigoPresentacion=@CodigoPresentacion and Año=@Año and Mes=@Mes		
		END
		PRINT 'Se insertan registros de la presentacion especifica'
		insert into TablaJunta Select  @CodigoPresentacion CodigoPresentacion,@Año Año,@Mes Mes,* from #TablaJunta
	END
	ELSE
	BEGIN
		PRINT 'Se crea la tabla TablaJuntaNocturna'
		select @CodigoPresentacion CodigoPresentacion,@Año Año,@Mes Mes,* into TablaJunta from #TablaJunta order by Tipo,CodigoCuadro,Renglon
	END

END




```
