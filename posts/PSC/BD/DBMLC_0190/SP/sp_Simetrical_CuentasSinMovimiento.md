# Stored Procedure: sp_Simetrical_CuentasSinMovimiento

## Usa los objetos:
- [[SpigaSimetrical_Datos]]
- [[SpigaSimetrical_Datos]]
- [[SpigaSimetrical_Plantilla]]

```sql
CREATE PROCEDURE [dbo].[sp_Simetrical_CuentasSinMovimiento]
(
	@Año numeric,
	@Mes as numeric
)
AS
BEGIN
	
	SET NOCOUNT ON;
	SET FMTONLY OFF;

	DECLARE	
	--@Año numeric,
	--@Mes as numeric,
	@FechaInforme date,
	@FechaFinal date, 
	@FechaAnterior date

	--SET @Año = 2020
	--SET @Mes = 8


	-- Inicializa variables
	IF OBJECT_ID(N'tempdb.dbo.#tmpSimetrical_DatosSinMovimiento', N'U') IS NOT NULL
			DROP TABLE #tmpSimetrical_DatosSinMovimiento

	SET @FechaInforme = DATEFROMPARTS ( @Año, @Mes, 1 )
	SET @FechaFinal = CONVERT(date,DATEADD(dd,-(DAY(DATEADD(mm,1,@FechaInforme))),DATEADD(mm,1,@FechaInforme)),101)
	SET @FechaAnterior = DATEADD(ss, -1, DATEADD(month, DATEDIFF(month, 0, @FechaInforme), 0))



	-- Se consulta las cuentas que no tuvieron movimiento en el mes generado pero en el anterior si, se agregan a una tabla temporal.
	SELECT Fecha=@FechaFinal,Cuenta,CentroCosto,Descripcion,SaldoInicial=Saldo,Debitos=0,Creditos=0,Saldo,TipoCuenta, 
		Naturaleza,ModDebito=0,ModCredito=0,FinCredito=0,FinDebito=0,NombreCentro,Año=YEAR(@FechaFinal),Mes=MONTH(@FechaFinal),Envio

	INTO #tmpSimetrical_DatosSinMovimiento

	FROM 
	(
		SELECT A.Cuenta,A.CentroCosto,B.Descripcion,SaldoInicial=B.Saldo,B.Saldo,B.TipoCuenta,B.Naturaleza,B.NombreCentro,B.Envio
		FROM 
		(
			SELECT Cuenta,CentroCosto,Año,Mes
			FROM 
			(
				SELECT A.Cuenta,A.CentroCosto,Año=YEAR(@FechaInforme),Mes=MONTH(@FechaInforme),
					Dato = CASE WHEN B.Dato IS NULL THEN 0 --NO EXISTE EL DATO
							ELSE 1 END --SI EXISTE EL DATO
				FROM 
				(	
					SELECT Cuenta,CentroCosto,Año,Mes
					FROM SpigaSimetrical_Datos 
					WHERE Año = YEAR(@FechaAnterior) and Mes = MONTH(@FechaAnterior)
				) A
				LEFT JOIN 
				( 
					SELECT Cuenta,CentroCosto,Año,Mes,Dato='SI'
					FROM SpigaSimetrical_Datos 
					WHERE Año = YEAR(@FechaInforme) and Mes = MONTH(@FechaInforme)
				) B ON a.Cuenta = b.Cuenta AND a.CentroCosto = b.CentroCosto 
			)A 
			WHERE Dato = 0
		)A
		INNER JOIN 
		(
			SELECT Cuenta,CentroCosto,Descripcion,Saldo,TipoCuenta,Naturaleza,NombreCentro,Envio
			FROM SpigaSimetrical_Datos 
			WHERE Año = YEAR(@FechaAnterior) and Mes = MONTH(@FechaAnterior)
		)B ON B.Cuenta = A.Cuenta AND B.CentroCosto = A.CentroCosto
	) A


	-- Actualización final de datos (inserta los datos de la tabla temporal a la tabla original)
	IF OBJECT_ID (N'dbo.SpigaSimetrical_Datos', N'U') IS NOT NULL
	BEGIN	
		INSERT INTO dbo.SpigaSimetrical_Datos SELECT * FROM #tmpSimetrical_DatosSinMovimiento
	END
	ELSE
	BEGIN
		SELECT * INTO dbo.SpigaSimetrical_Datos FROM #tmpSimetrical_DatosSinMovimiento
	END


	-- Inicializa y actualiza la plantilla con las cuentas que no tuvieron movimiento en el mes generado, pero los valores en 0
	UPDATE #tmpSimetrical_DatosSinMovimiento SET 
				SaldoInicial = 0,
				creditos = 0,
				debitos = 0, 
				saldo = 0,
				ModDebito = 0, 
				ModCredito = 0,
				FinCredito = 0,
				FinDebito = 0

	INSERT INTO SpigaSimetrical_Plantilla SELECT * FROM #tmpSimetrical_DatosSinMovimiento


	-- Borra las tablas temporales
	IF OBJECT_ID(N'tempdb.dbo.#tmpSimetrical_DatosSinMovimiento', N'U') IS NOT NULL
			DROP TABLE #tmpSimetrical_DatosSinMovimiento

END

```
