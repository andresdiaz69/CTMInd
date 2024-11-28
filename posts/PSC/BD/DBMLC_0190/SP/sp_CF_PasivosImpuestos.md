# Stored Procedure: sp_CF_PasivosImpuestos

## Usa los objetos:
- [[CF_Datos]]
- [[CF_Tipos]]
- [[spiga_ContabilidadMovimientos]]
- [[v_CF_AgrupacionLinea]]

```sql

CREATE PROC [dbo].[sp_CF_PasivosImpuestos]
@FechaConsulta DATE,
@FechaIngreso DATE
AS
BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF

	---Tabla Temporal Cartera 
	IF OBJECT_ID(N'tempdb.dbo.#TempPasivosImpuestos', N'U') IS NOT NULL
		DROP TABLE #TempPasivosImpuestos

	SELECT	 IdEmpresa=IdEmpresas		,IdCentro=Centro				
			,NombreCentro				,Debe=ISNULL(Debe,0)		
			,Haber=ISNULL(Haber,0)
	INTO #TempPasivosImpuestos		
	FROM [PSCService_DB].[dbo].[spiga_ContabilidadMovimientos]
	WHERE Ano_Periodo = YEAR(@FechaConsulta) AND MONTH(FechaAsiento) <= MONTH(@FechaConsulta) 
		AND Cuenta LIKE '2478%' AND IdEmpresas IN (1, 5, 6, 19, 20, 24, 25, 27)
		AND concepto NOT LIKE '%Apertura Ejercicio%' AND concepto NOT LIKE '%Ajuste automático%' 
		AND concepto NOT LIKE '%Cierre Ejercicio%'


	DECLARE @N1 INT, @N2 INT, @N3 INT, @Tipo NVARCHAR(30);
	SET @Tipo = 'Pasivos Impuestos';
	SET @N1 = (SELECT TOP 1 N1 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N2 = (SELECT TOP 1 N2 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N3 = (SELECT TOP 1 N3 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	
	DELETE [CF_Datos] WHERE Fecha = @FechaIngreso AND N1 = @N1 AND N2 = @N2 AND N3 = @N3
	INSERT INTO [CF_Datos] (Fecha,IdEmpresa,IdLinea,IdCentro,N1,N2,N3,Valor)
	
	SELECT	Fecha = @FechaIngreso,				IdEmpresa,			IdLinea = ISNULL(IdLinea,0),
			IdCentro = ISNULL(IdCentro,0),		N1 = @N1,			N2 = @N2,
			N3 = @N3,							Valor=SUM(Valor) 
	FROM 
	(
		--LINEAS SIN CENTRO COMPARTIDO
		SELECT	IdEmpresa		,IdLinea = B.Id_Linea,
				IdCentro		,Valor = (SUM(Debe) - SUM(Haber)) * -1
		FROM #TempPasivosImpuestos A
		LEFT JOIN (
			SELECT DISTINCT Id_Linea,Id_Centro FROM [v_CF_AgrupacionLinea] WHERE Activado = 1
		) B ON A.IdCentro = B.Id_Centro
		WHERE IdCentro NOT IN (83, 191) AND NombreCentro NOT LIKE 'CO-%' AND NombreCentro NOT LIKE 'JD-%'
		GROUP BY A.IdEmpresa, B.Id_Linea, A.IdCentro


		UNION ALL


		--MIT CENTRO 83 Y BN CENTRO 191
		SELECT	 IdEmpresa		,IdLinea = CASE WHEN IdCentro = 83 THEN 'MIT' ELSE 'BN' END
				,IdCentro		,Valor = (SUM(Debe) - SUM(Haber)) * -1
		FROM #TempPasivosImpuestos 
		WHERE IdCentro IN (83, 191)
		GROUP BY IdEmpresa, IdCentro


		UNION ALL


		--CENTROS DE COLISION
		SELECT DISTINCT A.IdEmpresa, 
			Id_Linea = CASE WHEN A.IdCentro IN (51,54,62,68,69,74,79,101,87,92,97) THEN 'CO'
							WHEN A.IdCentro IN (178,179) THEN 'DAI.V' ELSE B.Id_Linea END,
			A.IdCentro, Valor
		FROM 
		(
			SELECT	IdEmpresa ,IdCentro ,Valor = (SUM(Debe) - SUM(Haber)) * -1
			FROM #TempPasivosImpuestos
			WHERE IdCentro NOT IN (83, 191) AND NombreCentro LIKE 'CO-%'
			GROUP BY IdEmpresa ,IdCentro
		) A
		LEFT JOIN (
			SELECT DISTINCT Id_Linea,Id_Centro FROM [v_CF_AgrupacionLinea] WHERE Activado = 1
		) B ON A.IdCentro = B.Id_Centro


		UNION ALL


		--JOHN DEERE
		SELECT	IdEmpresa			,IdLinea = 'JD',		
				IdCentro			,Valor = (SUM(Debe) - SUM(Haber)) * -1
		FROM #TempPasivosImpuestos
		WHERE IdCentro NOT IN (83, 191) AND NombreCentro LIKE 'JD-%'
		GROUP BY IdEmpresa ,IdCentro
	) A
	GROUP BY IdEmpresa, IdLinea, IdCentro
END

```
