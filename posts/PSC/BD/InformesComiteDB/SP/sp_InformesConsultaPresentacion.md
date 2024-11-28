# Stored Procedure: sp_InformesConsultaPresentacion

## Usa los objetos:
- [[InformesDefinitivos]]
- [[InformesDefinitivosAcu]]
- [[InformesDefinitivosMes]]

```sql


-- =======================================================================================================================================
-- Author:		LUIS FREDDY GUERRERO LOPEZ
-- Create date: 2018-10-16 ultima actualizacion
-- Description:	consulta una presentacion dada segun sus parametros
--				realiza el formateo de una presentacion
-- Updates
-- 2020-07-17: Se actualiza campo Actual23 por estar Actua23
-- =======================================================================================================================================

CREATE PROCEDURE [dbo].[sp_InformesConsultaPresentacion] 

	@CodigoPresentacion as smallint,
	@Año as smallint,
	@Mes as smallint,
	@Mes_Acum as bit = 0, -- 0 Mes o 1 Acum,
	@TipoArbol as bit = 0, -- 0 P&G o 1 Balance
	@Redondeo as bit = 0, --0 Sin Redondeo o 1 Con Redondeo
	@Detalle as bit = 0, -- Normal o detallada
	@Anterior_Actual as bit = 0 -- Si es detallada se debe incluir si se desea el detalle del mes anterior o actual
AS
BEGIN

	SET NOCOUNT ON
	SET FMTONLY OFF 

	Declare @formato as int
	Declare @balance as smallint

	IF @Redondeo = 1
		set @formato = 1000000
	else 
		set @formato = 1

	if @TipoArbol = 0
		set @balance = 17
	else 
		set @balance = 18

	if @Detalle = 0
	Begin

		if 1=1
		Begin
			SELECT [CodigoPresentacion]
				  ,[Año1]
				  ,[MesInicial1]
				  ,[MesFinal1]
				  ,[Año2]
				  ,[MesInicial2]
				  ,[MesFinal2]
				  ,[Orden]
				  ,[Balance]
				  ,[Nivel1]
				  ,[Nivel2]
				  ,[Nivel3]
				  ,[Nivel4]
				  ,[Nivel5]
				  ,[Nivel6]
				  ,[CodigoConcepto]
				  ,[NombreConcepto]
				  ,[Sede1]
				  ,[Anterior1]/@Formato Anterior1
				  ,[AntPorcentaje1]
				  ,[Actual1]/@Formato Actual1
				  ,[ActPorcentaje1]
				  ,[Presupuesto1]/@Formato Presupuesto1
				  ,[PrePorcentaje1]
				  ,[Sede2]
				  ,[Anterior2]/@Formato Anterior2
				  ,[AntPorcentaje2]
				  ,[Actual2]/@Formato Actual2
				  ,[ActPorcentaje2]
				  ,[Presupuesto2]/@Formato Presupuesto2
				  ,[PrePorcentaje2]
				  ,[Sede3]
				  ,[Anterior3]/@Formato Anterior3
				  ,[AntPorcentaje3]
				  ,[Actual3]/@Formato Actual3
				  ,[ActPorcentaje3]
				  ,[Presupuesto3]/@Formato Presupuesto3
				  ,[PrePorcentaje3]
				  ,[Sede4]
				  ,[Anterior4]/@Formato Anterior4
				  ,[AntPorcentaje4]
				  ,[Actual4]/@Formato Actual4
				  ,[ActPorcentaje4]
				  ,[Presupuesto4]/@Formato Presupuesto4
				  ,[PrePorcentaje4]
				  ,[Sede5]
				  ,[Anterior5]/@Formato Anterior5
				  ,[AntPorcentaje5]
				  ,[Actual5]/@Formato Actual5
				  ,[ActPorcentaje5]
				  ,[Presupuesto5]/@Formato Presupuesto5
				  ,[PrePorcentaje5]
				  ,[Sede6]
				  ,[Anterior6]/@Formato Anterior6
				  ,[AntPorcentaje6]
				  ,[Actual6]/@Formato Actual6
				  ,[ActPorcentaje6]
				  ,[Presupuesto6]/@Formato Presupuesto6
				  ,[PrePorcentaje6]
				  ,[Sede7]
				  ,[Anterior7]/@Formato Anterior7
				  ,[AntPorcentaje7]
				  ,[Actual7]/@Formato Actual7
				  ,[ActPorcentaje7]
				  ,[Presupuesto7]/@Formato Presupuesto7
				  ,[PrePorcentaje7]
				  ,[Sede8]
				  ,[Anterior8]/@Formato Anterior8
				  ,[AntPorcentaje8]
				  ,[Actual8]/@Formato Actual8
				  ,[ActPorcentaje8]
				  ,[Presupuesto8]/@Formato Presupuesto8
				  ,[PrePorcentaje8]
				  ,[Sede9]
				  ,[Anterior9]/@Formato Anterior9
				  ,[AntPorcentaje9]
				  ,[Actual9]/@Formato Actual9
				  ,[ActPorcentaje9]
				  ,[Presupuesto9]/@Formato Presupuesto9
				  ,[PrePorcentaje9]
				  ,[Sede10]
				  ,[Anterior10]/@Formato Anterior10
				  ,[AntPorcentaje10]
				  ,[Actual10]/@Formato Actual10
				  ,[ActPorcentaje10]
				  ,[Presupuesto10]/@Formato Presupuesto10
				  ,[PrePorcentaje10]
				  ,[Sede11]
				  ,[Anterior11]/@Formato Anterior11
				  ,[AntPorcentaje11]
				  ,[Actual11]/@Formato Actual11
				  ,[ActPorcentaje11]
				  ,[Presupuesto11]/@Formato Presupuesto11
				  ,[PrePorcentaje11]
				  ,[Sede12]
				  ,[Anterior12]/@Formato Anterior12
				  ,[AntPorcentaje12]
				  ,[Actual12]/@Formato Actual12
				  ,[ActPorcentaje12]
				  ,[Presupuesto12]/@Formato Presupuesto12
				  ,[PrePorcentaje12]
				  ,[Sede13]
				  ,[Anterior13]/@Formato Anterior13
				  ,[AntPorcentaje13]
				  ,[Actual13]/@Formato Actual13
				  ,[ActPorcentaje13]
				  ,[Presupuesto13]/@Formato Presupuesto13
				  ,[PrePorcentaje13]
				  ,[Sede14]
				  ,[Anterior14]/@Formato Anterior14
				  ,[AntPorcentaje14]
				  ,[Actual14]/@Formato Actual14
				  ,[ActPorcentaje14]
				  ,[Presupuesto14]/@Formato Presupuesto14
				  ,[PrePorcentaje14]
				  ,[Sede15]
				  ,[Anterior15]/@Formato Anterior15
				  ,[AntPorcentaje15]
				  ,[Actual15]/@Formato Actual15
				  ,[ActPorcentaje15]
				  ,[Presupuesto15]/@Formato Presupuesto15
				  ,[PrePorcentaje15]
				  ,[Sede16]
				  ,[Anterior16]/@Formato Anterior16
				  ,[AntPorcentaje16]
				  ,[Actual16]/@Formato Actual16
				  ,[ActPorcentaje16]
				  ,[Presupuesto16]/@Formato Presupuesto16
				  ,[PrePorcentaje16]
				  ,[Sede17]
				  ,[Anterior17]/@Formato Anterior17
				  ,[AntPorcentaje17]
				  ,[Actual17]/@Formato Actual17
				  ,[ActPorcentaje17]
				  ,[Presupuesto17]/@Formato Presupuesto17
				  ,[PrePorcentaje17]
				  ,[Sede18]
				  ,[Anterior18]/@Formato Anterior18
				  ,[AntPorcentaje18]
				  ,[Actual18]/@Formato Actual18
				  ,[ActPorcentaje18]
				  ,[Presupuesto18]/@Formato Presupuesto18
				  ,[PrePorcentaje18]
				  ,[Sede19]
				  ,[Anterior19]/@Formato Anterior19
				  ,[AntPorcentaje19]
				  ,[Actual19]/@Formato Actual19
				  ,[ActPorcentaje19]
				  ,[Presupuesto19]/@Formato Presupuesto19
				  ,[PrePorcentaje19]
				  ,[Sede20]
				  ,[Anterior20]/@Formato Anterior20
				  ,[AntPorcentaje20]
				  ,[Actual20]/@Formato Actual20
				  ,[ActPorcentaje20]
				  ,[Presupuesto20]/@Formato Presupuesto20
				  ,[PrePorcentaje20]
				  ,[Sede21]
				  ,[Anterior21]/@Formato Anterior21
				  ,[AntPorcentaje21]
				  ,[Actual21]/@Formato Actual21
				  ,[ActPorcentaje21]
				  ,[Presupuesto21]/@Formato Presupuesto21
				  ,[PrePorcentaje21]
				  ,[Sede22]
				  ,[Anterior22]/@Formato Anterior22
				  ,[AntPorcentaje22]
				  ,[Actual22]/@Formato Actual22
				  ,[ActPorcentaje22]
				  ,[Presupuesto22]/@Formato Presupuesto22
				  ,[PrePorcentaje22]
				  ,[Sede23]
				  ,[Anterior23]/@Formato Anterior23
				  ,[AntPorcentaje23]
				  ,[Actual23]/@Formato Actual23
				  ,[ActPorcentaje23]
				  ,[Presupuesto23]/@Formato Presupuesto23
				  ,[PrePorcentaje23]
				  ,[Sede24]
				  ,[Anterior24]/@Formato Anterior24
				  ,[AntPorcentaje24]
				  ,[Actual24]/@Formato Actual24
				  ,[ActPorcentaje24]
				  ,[Presupuesto24]/@Formato Presupuesto24
				  ,[PrePorcentaje24]
				  ,[Sede25]
				  ,[Anterior25]/@Formato Anterior25
				  ,[AntPorcentaje25]
				  ,[Actual25]/@Formato Actual25
				  ,[ActPorcentaje25]
				  ,[Presupuesto25]/@Formato Presupuesto25
				  ,[PrePorcentaje25]
				  ,[SedeTotal]
				  ,[AnteriorTotal]/@Formato AnteriorTotal
				  ,[AntPorcentajeTotal]
				  ,[ActualTotal]/@Formato ActualTotal
				  ,[ActPorcentajeTotal]
				  ,[PresupuestoTotal]/@Formato PresupuestoTotal
				  ,[PrePorcentajeTotal]
				  ,[FechaGeneracion]
			  FROM [InformesDefinitivos]
			  where Balance = @balance 
			  and CodigoPresentacion = @codigoPresentacion 
			  and año2 = @año
			  and MesFinal2 = @mes 
			  and ((@Mes_Acum = 1 and MesFinal1 = MesFinal2) or (@Mes_Acum = 0 and MesFinal1 <> MesFinal2))
			  order by [Nivel1],[Nivel2],[Nivel3],[Nivel4],[Nivel5],[Nivel6]
		END

	end
	else
	begin

		Declare @Fecha as datetime

		set @Fecha = DATEFROMPARTS ( @Año, @Mes, 1 ) 
	
		if @Mes_Acum = 0
			if @Anterior_Actual = 0
				set @Fecha = DATEADD(mm,-1,DATEADD(mm,DATEDIFF(mm,0,@Fecha),0)) 
			else
				set @Fecha = @Fecha
		else
			if @Anterior_Actual = 0
				set @Fecha = DATEFROMPARTS ( @Año-1, @Mes, 1 ) 
			else
				set @Fecha = @Fecha


		SET @Año = YEAR(DATEADD(year, 0, @fecha))
		SET @Mes = MONTH(DATEADD(month, 0, @fecha))

		if @Mes_Acum = 0
		Begin
			SELECT [CodigoPresentacion]
				  ,[Año1]
				  ,[MesInicial1]
				  ,[MesFinal1]
				  ,[Año2]
				  ,[MesInicial2]
				  ,[MesFinal2]
				  ,[Orden]
				  ,[Balance]
				  ,[Nivel1]
				  ,[Nivel2]
				  ,[Nivel3]
				  ,[Nivel4]
				  ,[Nivel5]
				  ,[Nivel6]
				  ,[CodigoConcepto]
				  ,[NombreConcepto]
				  ,[Sede1]
				  ,[Anterior1]/@Formato Anterior1
				  ,[AntPorcentaje1]
				  ,[Actual1]/@Formato Actual1
				  ,[ActPorcentaje1]
				  ,[Presupuesto1]/@Formato Presupuesto1
				  ,[PrePorcentaje1]
				  ,[Sede2]
				  ,[Anterior2]/@Formato Anterior2
				  ,[AntPorcentaje2]
				  ,[Actual2]/@Formato Actual2
				  ,[ActPorcentaje2]
				  ,[Presupuesto2]/@Formato Presupuesto2
				  ,[PrePorcentaje2]
				  ,[Sede3]
				  ,[Anterior3]/@Formato Anterior3
				  ,[AntPorcentaje3]
				  ,[Actual3]/@Formato Actual3
				  ,[ActPorcentaje3]
				  ,[Presupuesto3]/@Formato Presupuesto3
				  ,[PrePorcentaje3]
				  ,[Sede4]
				  ,[Anterior4]/@Formato Anterior4
				  ,[AntPorcentaje4]
				  ,[Actual4]/@Formato Actual4
				  ,[ActPorcentaje4]
				  ,[Presupuesto4]/@Formato Presupuesto4
				  ,[PrePorcentaje4]
				  ,[Sede5]
				  ,[Anterior5]/@Formato Anterior5
				  ,[AntPorcentaje5]
				  ,[Actual5]/@Formato Actual5
				  ,[ActPorcentaje5]
				  ,[Presupuesto5]/@Formato Presupuesto5
				  ,[PrePorcentaje5]
				  ,[Sede6]
				  ,[Anterior6]/@Formato Anterior6
				  ,[AntPorcentaje6]
				  ,[Actual6]/@Formato Actual6
				  ,[ActPorcentaje6]
				  ,[Presupuesto6]/@Formato Presupuesto6
				  ,[PrePorcentaje6]
				  ,[Sede7]
				  ,[Anterior7]/@Formato Anterior7
				  ,[AntPorcentaje7]
				  ,[Actual7]/@Formato Actual7
				  ,[ActPorcentaje7]
				  ,[Presupuesto7]/@Formato Presupuesto7
				  ,[PrePorcentaje7]
				  ,[Sede8]
				  ,[Anterior8]/@Formato Anterior8
				  ,[AntPorcentaje8]
				  ,[Actual8]/@Formato Actual8
				  ,[ActPorcentaje8]
				  ,[Presupuesto8]/@Formato Presupuesto8
				  ,[PrePorcentaje8]
				  ,[Sede9]
				  ,[Anterior9]/@Formato Anterior9
				  ,[AntPorcentaje9]
				  ,[Actual9]/@Formato Actual9
				  ,[ActPorcentaje9]
				  ,[Presupuesto9]/@Formato Presupuesto9
				  ,[PrePorcentaje9]
				  ,[Sede10]
				  ,[Anterior10]/@Formato Anterior10
				  ,[AntPorcentaje10]
				  ,[Actual10]/@Formato Actual10
				  ,[ActPorcentaje10]
				  ,[Presupuesto10]/@Formato Presupuesto10
				  ,[PrePorcentaje10]
				  ,[Sede11]
				  ,[Anterior11]/@Formato Anterior11
				  ,[AntPorcentaje11]
				  ,[Actual11]/@Formato Actual11
				  ,[ActPorcentaje11]
				  ,[Presupuesto11]/@Formato Presupuesto11
				  ,[PrePorcentaje11]
				  ,[Sede12]
				  ,[Anterior12]/@Formato Anterior12
				  ,[AntPorcentaje12]
				  ,[Actual12]/@Formato Actual12
				  ,[ActPorcentaje12]
				  ,[Presupuesto12]/@Formato Presupuesto12
				  ,[PrePorcentaje12]
				  ,[Sede13]
				  ,[Anterior13]/@Formato Anterior13
				  ,[AntPorcentaje13]
				  ,[Actual13]/@Formato Actual13
				  ,[ActPorcentaje13]
				  ,[Presupuesto13]/@Formato Presupuesto13
				  ,[PrePorcentaje13]
				  ,[Sede14]
				  ,[Anterior14]/@Formato Anterior14
				  ,[AntPorcentaje14]
				  ,[Actual14]/@Formato Actual14
				  ,[ActPorcentaje14]
				  ,[Presupuesto14]/@Formato Presupuesto14
				  ,[PrePorcentaje14]
				  ,[Sede15]
				  ,[Anterior15]/@Formato Anterior15
				  ,[AntPorcentaje15]
				  ,[Actual15]/@Formato Actual15
				  ,[ActPorcentaje15]
				  ,[Presupuesto15]/@Formato Presupuesto15
				  ,[PrePorcentaje15]
				  ,[Sede16]
				  ,[Anterior16]/@Formato Anterior16
				  ,[AntPorcentaje16]
				  ,[Actual16]/@Formato Actual16
				  ,[ActPorcentaje16]
				  ,[Presupuesto16]/@Formato Presupuesto16
				  ,[PrePorcentaje16]
				  ,[Sede17]
				  ,[Anterior17]/@Formato Anterior17
				  ,[AntPorcentaje17]
				  ,[Actual17]/@Formato Actual17
				  ,[ActPorcentaje17]
				  ,[Presupuesto17]/@Formato Presupuesto17
				  ,[PrePorcentaje17]
				  ,[Sede18]
				  ,[Anterior18]/@Formato Anterior18
				  ,[AntPorcentaje18]
				  ,[Actual18]/@Formato Actual18
				  ,[ActPorcentaje18]
				  ,[Presupuesto18]/@Formato Presupuesto18
				  ,[PrePorcentaje18]
				  ,[Sede19]
				  ,[Anterior19]/@Formato Anterior19
				  ,[AntPorcentaje19]
				  ,[Actual19]/@Formato Actual19
				  ,[ActPorcentaje19]
				  ,[Presupuesto19]/@Formato Presupuesto19
				  ,[PrePorcentaje19]
				  ,[Sede20]
				  ,[Anterior20]/@Formato Anterior20
				  ,[AntPorcentaje20]
				  ,[Actual20]/@Formato Actual20
				  ,[ActPorcentaje20]
				  ,[Presupuesto20]/@Formato Presupuesto20
				  ,[PrePorcentaje20]
				  ,[Sede21]
				  ,[Anterior21]/@Formato Anterior21
				  ,[AntPorcentaje21]
				  ,[Actual21]/@Formato Actual21
				  ,[ActPorcentaje21]
				  ,[Presupuesto21]/@Formato Presupuesto21
				  ,[PrePorcentaje21]
				  ,[Sede22]
				  ,[Anterior22]/@Formato Anterior22
				  ,[AntPorcentaje22]
				  ,[Actual22]/@Formato Actual22
				  ,[ActPorcentaje22]
				  ,[Presupuesto22]/@Formato Presupuesto22
				  ,[PrePorcentaje22]
				  ,[Sede23]
				  ,[Anterior23]/@Formato Anterior23
				  ,[AntPorcentaje23]
				  ,[Actual23]/@Formato Actual23
				  ,[ActPorcentaje23]
				  ,[Presupuesto23]/@Formato Presupuesto23
				  ,[PrePorcentaje23]
				  ,[Sede24]
				  ,[Anterior24]/@Formato Anterior24
				  ,[AntPorcentaje24]
				  ,[Actual24]/@Formato Actual24
				  ,[ActPorcentaje24]
				  ,[Presupuesto24]/@Formato Presupuesto24
				  ,[PrePorcentaje24]
				  ,[Sede25]
				  ,[Anterior25]/@Formato Anterior25
				  ,[AntPorcentaje25]
				  ,[Actual25]/@Formato Actual25
				  ,[ActPorcentaje25]
				  ,[Presupuesto25]/@Formato Presupuesto25
				  ,[PrePorcentaje25]
				  ,[SedeTotal]
				  ,[AnteriorTotal]/@Formato AnteriorTotal
				  ,[AntPorcentajeTotal]
				  ,[ActualTotal]/@Formato ActualTotal
				  ,[ActPorcentajeTotal]
				  ,[PresupuestoTotal]/@Formato PresupuestoTotal
				  ,[PrePorcentajeTotal]
				  ,[FechaGeneracion]
			  FROM InformesDefinitivosMes
			  where Balance = @balance 
			  and CodigoPresentacion = @codigoPresentacion 
			  and año2 = @año
			  and MesFinal2 = @mes 
			  order by [Nivel1],[Nivel2],[Nivel3],[Nivel4],[Nivel5],[Nivel6]
		END
		ELSE
		Begin
			SELECT [CodigoPresentacion]
				  ,[Año1]
				  ,[MesInicial1]
				  ,[MesFinal1]
				  ,[Año2]
				  ,[MesInicial2]
				  ,[MesFinal2]
				  ,[Orden]
				  ,[Balance]
				  ,[Nivel1]
				  ,[Nivel2]
				  ,[Nivel3]
				  ,[Nivel4]
				  ,[Nivel5]
				  ,[Nivel6]
				  ,[CodigoConcepto]
				  ,[NombreConcepto]
				  ,[Sede1]
				  ,[Anterior1]/@Formato Anterior1
				  ,[AntPorcentaje1]
				  ,[Actual1]/@Formato Actual1
				  ,[ActPorcentaje1]
				  ,[Presupuesto1]/@Formato Presupuesto1
				  ,[PrePorcentaje1]
				  ,[Sede2]
				  ,[Anterior2]/@Formato Anterior2
				  ,[AntPorcentaje2]
				  ,[Actual2]/@Formato Actual2
				  ,[ActPorcentaje2]
				  ,[Presupuesto2]/@Formato Presupuesto2
				  ,[PrePorcentaje2]
				  ,[Sede3]
				  ,[Anterior3]/@Formato Anterior3
				  ,[AntPorcentaje3]
				  ,[Actual3]/@Formato Actual3
				  ,[ActPorcentaje3]
				  ,[Presupuesto3]/@Formato Presupuesto3
				  ,[PrePorcentaje3]
				  ,[Sede4]
				  ,[Anterior4]/@Formato Anterior4
				  ,[AntPorcentaje4]
				  ,[Actual4]/@Formato Actual4
				  ,[ActPorcentaje4]
				  ,[Presupuesto4]/@Formato Presupuesto4
				  ,[PrePorcentaje4]
				  ,[Sede5]
				  ,[Anterior5]/@Formato Anterior5
				  ,[AntPorcentaje5]
				  ,[Actual5]/@Formato Actual5
				  ,[ActPorcentaje5]
				  ,[Presupuesto5]/@Formato Presupuesto5
				  ,[PrePorcentaje5]
				  ,[Sede6]
				  ,[Anterior6]/@Formato Anterior6
				  ,[AntPorcentaje6]
				  ,[Actual6]/@Formato Actual6
				  ,[ActPorcentaje6]
				  ,[Presupuesto6]/@Formato Presupuesto6
				  ,[PrePorcentaje6]
				  ,[Sede7]
				  ,[Anterior7]/@Formato Anterior7
				  ,[AntPorcentaje7]
				  ,[Actual7]/@Formato Actual7
				  ,[ActPorcentaje7]
				  ,[Presupuesto7]/@Formato Presupuesto7
				  ,[PrePorcentaje7]
				  ,[Sede8]
				  ,[Anterior8]/@Formato Anterior8
				  ,[AntPorcentaje8]
				  ,[Actual8]/@Formato Actual8
				  ,[ActPorcentaje8]
				  ,[Presupuesto8]/@Formato Presupuesto8
				  ,[PrePorcentaje8]
				  ,[Sede9]
				  ,[Anterior9]/@Formato Anterior9
				  ,[AntPorcentaje9]
				  ,[Actual9]/@Formato Actual9
				  ,[ActPorcentaje9]
				  ,[Presupuesto9]/@Formato Presupuesto9
				  ,[PrePorcentaje9]
				  ,[Sede10]
				  ,[Anterior10]/@Formato Anterior10
				  ,[AntPorcentaje10]
				  ,[Actual10]/@Formato Actual10
				  ,[ActPorcentaje10]
				  ,[Presupuesto10]/@Formato Presupuesto10
				  ,[PrePorcentaje10]
				  ,[Sede11]
				  ,[Anterior11]/@Formato Anterior11
				  ,[AntPorcentaje11]
				  ,[Actual11]/@Formato Actual11
				  ,[ActPorcentaje11]
				  ,[Presupuesto11]/@Formato Presupuesto11
				  ,[PrePorcentaje11]
				  ,[Sede12]
				  ,[Anterior12]/@Formato Anterior12
				  ,[AntPorcentaje12]
				  ,[Actual12]/@Formato Actual12
				  ,[ActPorcentaje12]
				  ,[Presupuesto12]/@Formato Presupuesto12
				  ,[PrePorcentaje12]
				  ,[Sede13]
				  ,[Anterior13]/@Formato Anterior13
				  ,[AntPorcentaje13]
				  ,[Actual13]/@Formato Actual13
				  ,[ActPorcentaje13]
				  ,[Presupuesto13]/@Formato Presupuesto13
				  ,[PrePorcentaje13]
				  ,[Sede14]
				  ,[Anterior14]/@Formato Anterior14
				  ,[AntPorcentaje14]
				  ,[Actual14]/@Formato Actual14
				  ,[ActPorcentaje14]
				  ,[Presupuesto14]/@Formato Presupuesto14
				  ,[PrePorcentaje14]
				  ,[Sede15]
				  ,[Anterior15]/@Formato Anterior15
				  ,[AntPorcentaje15]
				  ,[Actual15]/@Formato Actual15
				  ,[ActPorcentaje15]
				  ,[Presupuesto15]/@Formato Presupuesto15
				  ,[PrePorcentaje15]
				  ,[Sede16]
				  ,[Anterior16]/@Formato Anterior16
				  ,[AntPorcentaje16]
				  ,[Actual16]/@Formato Actual16
				  ,[ActPorcentaje16]
				  ,[Presupuesto16]/@Formato Presupuesto16
				  ,[PrePorcentaje16]
				  ,[Sede17]
				  ,[Anterior17]/@Formato Anterior17
				  ,[AntPorcentaje17]
				  ,[Actual17]/@Formato Actual17
				  ,[ActPorcentaje17]
				  ,[Presupuesto17]/@Formato Presupuesto17
				  ,[PrePorcentaje17]
				  ,[Sede18]
				  ,[Anterior18]/@Formato Anterior18
				  ,[AntPorcentaje18]
				  ,[Actual18]/@Formato Actual18
				  ,[ActPorcentaje18]
				  ,[Presupuesto18]/@Formato Presupuesto18
				  ,[PrePorcentaje18]
				  ,[Sede19]
				  ,[Anterior19]/@Formato Anterior19
				  ,[AntPorcentaje19]
				  ,[Actual19]/@Formato Actual19
				  ,[ActPorcentaje19]
				  ,[Presupuesto19]/@Formato Presupuesto19
				  ,[PrePorcentaje19]
				  ,[Sede20]
				  ,[Anterior20]/@Formato Anterior20
				  ,[AntPorcentaje20]
				  ,[Actual20]/@Formato Actual20
				  ,[ActPorcentaje20]
				  ,[Presupuesto20]/@Formato Presupuesto20
				  ,[PrePorcentaje20]
				  ,[Sede21]
				  ,[Anterior21]/@Formato Anterior21
				  ,[AntPorcentaje21]
				  ,[Actual21]/@Formato Actual21
				  ,[ActPorcentaje21]
				  ,[Presupuesto21]/@Formato Presupuesto21
				  ,[PrePorcentaje21]
				  ,[Sede22]
				  ,[Anterior22]/@Formato Anterior22
				  ,[AntPorcentaje22]
				  ,[Actual22]/@Formato Actual22
				  ,[ActPorcentaje22]
				  ,[Presupuesto22]/@Formato Presupuesto22
				  ,[PrePorcentaje22]
				  ,[Sede23]
				  ,[Anterior23]/@Formato Anterior23
				  ,[AntPorcentaje23]
				  ,[Actual23]/@Formato Actual23
				  ,[ActPorcentaje23]
				  ,[Presupuesto23]/@Formato Presupuesto23
				  ,[PrePorcentaje23]
				  ,[Sede24]
				  ,[Anterior24]/@Formato Anterior24
				  ,[AntPorcentaje24]
				  ,[Actual24]/@Formato Actual24
				  ,[ActPorcentaje24]
				  ,[Presupuesto24]/@Formato Presupuesto24
				  ,[PrePorcentaje24]
				  ,[Sede25]
				  ,[Anterior25]/@Formato Anterior25
				  ,[AntPorcentaje25]
				  ,[Actual25]/@Formato Actual25
				  ,[ActPorcentaje25]
				  ,[Presupuesto25]/@Formato Presupuesto25
				  ,[PrePorcentaje25]
				  ,[SedeTotal]
				  ,[AnteriorTotal]/@Formato AnteriorTotal
				  ,[AntPorcentajeTotal]
				  ,[ActualTotal]/@Formato ActualTotal
				  ,[ActPorcentajeTotal]
				  ,[PresupuestoTotal]/@Formato PresupuestoTotal
				  ,[PrePorcentajeTotal]
				  ,[FechaGeneracion]
			  FROM InformesDefinitivosAcu
			  where Balance = @balance 
			  and CodigoPresentacion = @codigoPresentacion 
			  and año2 = @año
			  and MesFinal2 = @mes 
			  order by [Nivel1],[Nivel2],[Nivel3],[Nivel4],[Nivel5],[Nivel6]
		END
	end

END



```
