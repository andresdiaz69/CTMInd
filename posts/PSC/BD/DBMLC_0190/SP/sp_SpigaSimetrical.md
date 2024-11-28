# Stored Procedure: sp_SpigaSimetrical

## Usa los objetos:
- [[Centros]]
- [[spiga_PUC]]
- [[SpigaSimetrical_Datos]]
- [[SpigaSimetrical_Datos]]
- [[SpigaSimetrical_Plantilla]]
- [[StrTipoTitulo]]
- [[TMP]]
- [[vw_SpigaSimetricalDatos]]

```sql
CREATE PROCEDURE [dbo].[sp_SpigaSimetrical]
	@Año as numeric,
	@Mes as numeric,
	@En0 as bit = 0
AS
BEGIN

	SET NOCOUNT ON;
	SET FMTONLY OFF;

	DECLARE @longitud int
	DECLARE @FechaInforme as date,@FechaFinal as date,@FechaInicial as date, @FechaAnterior as date
	DECLARE @datetimeIni datetime

	-- Inicializa variables

	if object_id(N'tempdb.dbo.#tmpSimetrical_Datos', N'U') is not null
		drop TABLE #tmpSimetrical_Datos

	set @FechaInicial= DATEFROMPARTS ( @Año, 1, 1 )
	set @FechaInforme = DATEFROMPARTS ( @Año, @Mes, 1 )
	set @FechaFinal = CONVERT(date,DATEADD(dd,-(DAY(DATEADD(mm,1,@FechaInforme))),DATEADD(mm,1,@FechaInforme)),101)
	set @FechaAnterior = DATEADD(ss, -1, DATEADD(month, DATEDIFF(month, 0, @FechaInforme), 0))
	set @longitud = 10
	set @datetimeIni = CAST('1900-01-01 00:00:00.000' as datetime)

	-- Consulta saldos contables  +  Cuenta 310505 por centro en '0'
		
	select @FechaFinal Fecha,Cuenta,CentroCosto,
		dbo.StrTipoTitulo(t.Nombre) Descripcion,
		--Sum(SaldoInicial) SaldoInicial,
		--sum(Debitos) Debitos,
		--sum(Creditos) Creditos,
		--sum(Saldo) Saldo,
		Sum(SaldoInicial) + 
		sum(
			case 
				when FechaAsiento<CONVERT(date,DATEADD(dd,-(DAY(@FechaFinal)-1),@FechaFinal),105) then Debitos-Creditos
				else 0 end
		) as SaldoInicial, 

		sum(
			case 
				when FechaAsiento>=CONVERT(date,DATEADD(dd,-(DAY(@FechaFinal)-1),@FechaFinal),105) then Debitos
				else 0 
			end
		) Debitos,
		sum(
			case 
				when FechaAsiento>=CONVERT(date,DATEADD(dd,-(DAY(@FechaFinal)-1),@FechaFinal),105) then Creditos
				else 0 
			end
		) Creditos,

		sum(Saldo) Saldo,
		case when left(Cuenta,1) = 1 then 'Activo'
			 when left(Cuenta,1) = 2 then 'Pasivo'
			 when left(Cuenta,1) = 3 then 'Patrimonio'
			 when left(Cuenta,1) = 4 then 'Ingresos'
			 when left(Cuenta,1) = 5 then 'Egresos'
			 when left(Cuenta,1) = 6 then 'Egresos'
			 else '' end as TipoCuenta,
		case when t.TipoCalculo='D' then 'Deudora' else 'Acreedora' end as Naturaleza,
		sum(ModDebito) ModDebito,
		sum(ModCredito) ModCredito,
		sum(
			case 
				when FechaAsiento>=CONVERT(date,DATEADD(dd,-(DAY(@FechaFinal)-1),@FechaFinal),105) then Debitos
				else 0 
			end
		) FinDebito,
		sum(
			case 
				when FechaAsiento>=CONVERT(date,DATEADD(dd,-(DAY(@FechaFinal)-1),@FechaFinal),105) then Creditos
				else 0 
			end
		) FinCredito,
		NombreCentro,
		year(@FechaFinal) Año,month(@FechaFinal) Mes,
		@datetimeIni Envio

	into #tmpSimetrical_Datos

	FROM vw_SpigaSimetricalDatos 
	left join [PSCService_DB].dbo.spiga_PUC t on t.CodigoCuenta COLLATE greek_CI_AS​ = Cuenta 
	--and t.PKFKEmpresas = 1 
	where FechaAsiento >= @FechaInicial
	  and FechaAsiento <=  @FechaFinal
	group by Cuenta,CentroCosto,NombreCentro,t.Nombre,t.TipoCalculo


	-- Se agregan cuentas especificas de contabilidad

		-- Se agregan '3105050505','2105101150','1305050518','4295090505','5125101005','5140100505','5145100505','5195350505','5305150530','6135040560' especial por Contabilidad 2020-08-21

		insert into #tmpSimetrical_Datos
			select * from (
				SELECT @FechaFinal [Fecha] ,t.CodigoCuenta [Cuenta] ,[CentroCosto],dbo.StrTipoTitulo(t.Nombre) Descripcion ,0 [SaldoInicial]
					,0 [Debitos],0 [Creditos],0 [Saldo],'Patrimonio' [TipoCuenta],'Acreedora' [Naturaleza],0 [ModDebito],0 [ModCredito]
					,0 [FinDebito],0 [FinCredito],C.NombreCentro,year(@FechaFinal) [Año],month(@FechaFinal) [Mes],@datetimeIni Envio
				FROM SpigaSimetrical_Datos A
				left join [PSCService_DB].dbo.spiga_PUC  t 
				on t.CodigoCuenta in ('3105050505','2105101150','1305050518','4295090505','5125101005','5140100505','5145100505','5195350505','5305150530','6135040560')		
				--and t.PKFKEmpresas = 1 -- se retira esta condicion por que Juan asegura que el la nueva tabla solo viene el pcu ce CT
				LEFT JOIN Centros AS C ON CONVERT(SMALLINT,LTRIM(RTRIM(A.CentroCosto))) = C.CodigoCentro
				group by CentroCosto,C.NombreCentro,t.Nombre,t.CodigoCuenta
			) Datos where Cuenta+CentroCosto COLLATE greek_CI_AS not in ( select Cuenta+CentroCosto from #tmpSimetrical_Datos)

		-- Se agregan '1516050515','1516059010','1516059510','1516059610','1504050515','1504059015'

		insert into #tmpSimetrical_Datos
			select * from (
				SELECT @FechaFinal [Fecha] ,t.CodigoCuenta [Cuenta] ,[CentroCosto],dbo.StrTipoTitulo(t.Nombre) Descripcion ,0 [SaldoInicial]
					,0 [Debitos],0 [Creditos],0 [Saldo],'Activo' [TipoCuenta],'Deudora' [Naturaleza],0 [ModDebito],0 [ModCredito]
					,0 [FinDebito],0 [FinCredito],C.NombreCentro,year(@FechaFinal) [Año],month(@FechaFinal) [Mes],@datetimeIni Envio
				FROM SpigaSimetrical_Datos A
				left join [PSCService_DB].dbo.spiga_PUC  t 
				on t.CodigoCuenta in ('1516050515','1516059010','1516059510','1516059610','1504050515','1504059015')		
				--and t.PKFKEmpresas = 1 
				LEFT JOIN Centros AS C ON CONVERT(SMALLINT,LTRIM(RTRIM(A.CentroCosto))) = C.CodigoCentro
				group by CentroCosto,C.NombreCentro,t.Nombre,t.CodigoCuenta
			) Datos where Cuenta+CentroCosto COLLATE greek_CI_AS not in ( select Cuenta+CentroCosto from #tmpSimetrical_Datos)
		
		-- Se agregar cuenta '2120051105' especial por Contabilidad

		insert into #tmpSimetrical_Datos
			select * from (
				SELECT  @FechaFinal [Fecha] ,'2120051105' [Cuenta] ,[CentroCosto],dbo.StrTipoTitulo(t.Nombre) Descripcion ,0 [SaldoInicial]
					,0 [Debitos],0 [Creditos],0 [Saldo],'Pasivo' [TipoCuenta],'Acreedora' [Naturaleza],0 [ModDebito],0 [ModCredito]
					,0 [FinDebito],0 [FinCredito],C.NombreCentro,year(@FechaFinal) [Año],month(@FechaFinal) [Mes],@datetimeIni Envio
				FROM SpigaSimetrical_Datos A
				left join [PSCService_DB].dbo.spiga_PUC  t 
				on t.CodigoCuenta in ('2120051105') 
				--and t.PKFKEmpresas = 1 
				LEFT JOIN Centros AS C ON CONVERT(SMALLINT,LTRIM(RTRIM(A.CentroCosto))) = C.CodigoCentro
				group by CentroCosto,C.NombreCentro,t.Nombre,t.CodigoCuenta
			) Datos where Cuenta+CentroCosto COLLATE greek_CI_AS not in ( select Cuenta+CentroCosto from #tmpSimetrical_Datos)

		-- Se agregar cuenta '5160050505' especial por Contabilidad

		insert into #tmpSimetrical_Datos
			select * from (
				SELECT  @FechaFinal [Fecha] ,'5160050505' [Cuenta] ,[CentroCosto],dbo.StrTipoTitulo(t.Nombre) Descripcion ,0 [SaldoInicial]
					,0 [Debitos],0 [Creditos],0 [Saldo],'Egresos' [TipoCuenta],'Deudora' [Naturaleza],0 [ModDebito],0 [ModCredito]
					,0 [FinDebito],0 [FinCredito],C.NombreCentro,year(@FechaFinal) [Año],month(@FechaFinal) [Mes],@datetimeIni Envio
				FROM SpigaSimetrical_Datos A
				left join [PSCService_DB].dbo.spiga_PUC  t 
				on t.CodigoCuenta in ('5160050505') 
				--and t.PKFKEmpresas = 1 
				LEFT JOIN Centros AS C ON CONVERT(SMALLINT,LTRIM(RTRIM(A.CentroCosto))) = C.CodigoCentro
				group by CentroCosto,C.NombreCentro,t.Nombre,t.CodigoCuenta
			) Datos where Cuenta+CentroCosto COLLATE greek_CI_AS not in ( select Cuenta+CentroCosto from #tmpSimetrical_Datos)

	-- Importa los datos finales del mes anterior y actualiza el saldo inicial

	UPDATE TMP
		SET TMP.SaldoInicial = DA.Saldo,
			TMP.Saldo = DA.Saldo + TMP.FinDebito - TMP.FinCredito
		FROM #tmpSimetrical_Datos TMP
		INNER JOIN (Select * from dbo.SpigaSimetrical_Datos 
							where Año = year(@FechaAnterior) and Mes = month(@FechaAnterior)) DA
		ON TMP.Cuenta COLLATE greek_CI_AS = DA.Cuenta and TMP.CentroCosto = DA.CentroCosto

	-- Para no perder las modificaciones hechas en el mes actual, las graba en los datos que se van a importar

	UPDATE TMP
		SET TMP.ModCredito = DA.ModCredito,
			TMP.ModDebito = DA.ModDebito,
			TMP.FinDebito = TMP.Debitos + DA.ModDebito,
			TMP.FinCredito = TMP.Creditos + DA.ModCredito,
			TMP.Saldo = TMP.Saldo + TMP.Debitos + DA.ModDebito - TMP.Creditos + DA.ModCredito
		FROM #tmpSimetrical_Datos TMP
		INNER JOIN (Select * from dbo.SpigaSimetrical_Datos 
					where Año = @Año and Mes = @Mes) DA
		ON TMP.Cuenta COLLATE greek_CI_AS = DA.Cuenta and TMP.CentroCosto = DA.CentroCosto and TMP.Año = DA.Año and TMP.Mes = DA.Mes

	update #tmpSimetrical_Datos set FinDebito = Debitos+ModDebito where año= @Año and mes = @Mes
	update #tmpSimetrical_Datos set FinCredito = Creditos+ModCredito  where año= @Año and mes = @Mes
	update #tmpSimetrical_Datos set Saldo = SaldoInicial+FinDebito-FinCredito  where año= @Año and mes = @Mes 


	-- Actualización final de datos

	IF OBJECT_ID (N'dbo.SpigaSimetrical_Datos', N'U') IS NOT NULL
	begin
		delete from dbo.SpigaSimetrical_Datos where Año = @Año and Mes = @Mes
		insert into dbo.SpigaSimetrical_Datos select * from #tmpSimetrical_Datos
	end
	else
	begin
		select * into dbo.SpigaSimetrical_Datos from #tmpSimetrical_Datos
	end

	-- Inicializa y actualiza la plantilla con las nuevas posibles cuentas, pero los valores en 0

	update #tmpSimetrical_Datos set 
			SaldoInicial = 0,
			creditos = 0,
			debitos = 0, 
			saldo = 0,
			ModDebito = 0, 
			ModCredito = 0,
			FinCredito = 0,
			FinDebito = 0

	delete from SpigaSimetrical_Plantilla

	insert into SpigaSimetrical_Plantilla 
		select * from #tmpSimetrical_Datos

	-- Borra temporales

	IF object_id(N'tempdb.dbo.#tmpSimetrical_Datos', N'U') is not null
		drop TABLE #tmpSimetrical_Datos


END

```
