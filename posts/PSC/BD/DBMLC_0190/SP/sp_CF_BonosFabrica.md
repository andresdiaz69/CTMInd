# Stored Procedure: sp_CF_BonosFabrica

## Usa los objetos:
- [[CF_Datos]]
- [[CF_Tipos]]
- [[spiga_ContabilidadMovimientos]]
- [[v_CF_AgrupacionLinea]]

```sql

CREATE PROC [dbo].[sp_CF_BonosFabrica] 
	@FechaConsulta DATE,
	@FechaIngreso DATE
AS
BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF

	---Tabla Temporal Cartera 
	IF OBJECT_ID(N'tempdb.dbo.#TempBonos', N'U') IS NOT NULL
		DROP TABLE #TempBonos

	SELECT	IdEmpresa=IdEmpresas				,IdCentro=ISNULL(Centro,0)
			,NombreCentro						,Debe=ISNULL(Debe,0)				
			,Haber=ISNULL(Haber,0)				,CodigoTercero
	INTO #TempBonos
	FROM [PSCService_DB].[dbo].[spiga_ContabilidadMovimientos] WITH(NOLOCK)
	WHERE Ano_Periodo = YEAR(@FechaConsulta) AND MONTH(FechaAsiento) <= MONTH(@FechaConsulta)
		AND Cuenta IN ('1305051510','1305052005','1305052010','1305052015') 
		AND IdEmpresas IN (1, 5, 6, 19, 20, 24, 25, 27) AND concepto NOT LIKE '%Apertura Ejercicio%' 
		AND concepto NOT LIKE '%Ajuste automático%' AND concepto NOT LIKE '%Cierre Ejercicio%'


	DECLARE @N1 INT, @N2 INT, @N3 INT, @Tipo NVARCHAR(30);
	SET @Tipo = 'Bonos fabrica';
	SET @N1 = (SELECT TOP 1 N1 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N2 = (SELECT TOP 1 N2 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N3 = (SELECT TOP 1 N3 FROM [CF_Tipos] WHERE Tipo = @Tipo);

	DELETE [CF_Datos] WHERE Fecha = @FechaIngreso AND N1 = @N1 AND N2 = @N2 AND N3 = @N3
	INSERT INTO [CF_Datos] (Fecha,IdEmpresa,IdLinea,IdCentro,N1,N2,N3,Valor)

	SELECT	Fecha = @FechaIngreso,		IdEmpresa,		IdLinea,
			IdCentro,					N1 = @N1,		N2 = @N2,			
			N3 = @N3,					Valor 
	FROM 
	(
		SELECT	IdEmpresa,		IdCentro, 
				IdLinea,		Valor = SUM(Valor)
		FROM 
		(
			--Lineas diferentes a JD
			SELECT	IdEmpresa,								IdCentro=ISNULL(A.IdCentro,0), 
					IdLinea=ISNULL(B.Id_Linea,'SIN_L'),		Valor
			FROM 
			(
				SELECT	IdEmpresa,	IdCentro,	Valor=SUM(ISNULL(Debe,0))-SUM(ISNULL(Haber,0)) 
				FROM #TempBonos
				WHERE NombreCentro NOT LIKE 'JD-%'
				GROUP BY IdEmpresa, IdCentro
			) A

			LEFT JOIN (
				SELECT DISTINCT Id_Linea,Id_Centro FROM [v_CF_AgrupacionLinea] WHERE Activado = 1
			) B	ON A.IdCentro = B.Id_Centro

			UNION ALL 

			--Linea JD
			SELECT	IdEmpresa,			IdCentro,	
					IdLinea,			Valor=SUM(Debe)-SUM(Haber)
			FROM (
				SELECT	IdEmpresa			,IdCentro
					,Debe					,Haber
					,IdLinea = CASE WHEN CodigoTercero IN (441634, 245933) THEN 'JD.AGR'
							WHEN CodigoTercero IN (245949) THEN 'JD.CONS'
							WHEN CodigoTercero IN (931248, 794428, 517951, 517941, 517912, 517941, 517972) THEN 'WIR'
							WHEN IdCentro IN (25, 29, 43, 153) THEN 'JD.CONS'
							WHEN IdCentro IN (26) THEN 'WIR' ELSE 'JD.AGR' END
				FROM #TempBonos
				WHERE NombreCentro LIKE 'JD-%'
			) A
			GROUP BY IdEmpresa, IdCentro, IdLinea
		) A
		GROUP BY IdEmpresa, IdCentro, IdLinea
	) A
END

```
