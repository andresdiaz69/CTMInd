# Stored Procedure: sp_CF_Diferidos

## Usa los objetos:
- [[CF_Datos]]
- [[CF_Tipos]]
- [[spiga_ContabilidadMovimientos]]
- [[v_CF_AgrupacionLinea]]

```sql

CREATE PROC [dbo].[sp_CF_Diferidos] 
(
	@FechaConsulta DATE,
	@FechaIngreso DATE
) AS
BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF
	--SET @FechaConsulta = '20210101'
	--SET @FechaIngreso = '20210101'

	---Tabla Temporal Cartera 
	IF OBJECT_ID(N'tempdb.dbo.#TempDiferidos', N'U') IS NOT NULL
		DROP TABLE #TempDiferidos

	SELECT	IdEmpresa=A.IdEmpresas		,IdCentro=ISNULL(A.Centro,0)	,NombreCentro
			,Debe=ISNULL(A.Debe,0)		,Haber=ISNULL(A.Haber,0)
	INTO #TempDiferidos
	FROM [PSCService_DB].[dbo].[spiga_ContabilidadMovimientos] A
	WHERE Ano_Periodo = YEAR(@FechaConsulta) AND (Cuenta LIKE '17%') AND MONTH(FechaAsiento) <= MONTH(@FechaConsulta)
		AND IdEmpresas IN (1, 5, 6, 19, 20, 24, 25, 27) AND concepto NOT LIKE '%Apertura Ejercicio%' 
		AND concepto NOT LIKE '%Ajuste automático%' AND concepto NOT LIKE '%Cierre Ejercicio%'


	DECLARE @N1 INT, @N2 INT, @N3 INT, @Tipo NVARCHAR(30);
	SET @Tipo = 'Diferidos';
	SET @N1 = (SELECT TOP 1 N1 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N2 = (SELECT TOP 1 N2 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N3 = (SELECT TOP 1 N3 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	DELETE [CF_Datos] WHERE Fecha = @FechaIngreso AND N1 = @N1 AND N2 = @N2 AND N3 = @N3
	INSERT INTO [CF_Datos] (Fecha,IdEmpresa,IdLinea,IdCentro,N1,N2,N3,Valor)
	
	SELECT	Fecha=@FechaIngreso,	IdEmpresa,		IdLinea,		IdCentro,
			N1=@N1,					N2=@N2,			N3=@N3,			Valor=SUM(Valor)
	FROM 
	(
		--LINEAS DIFERENTES A COLISION Y JHON DEERE
		SELECT	IdEmpresa				,IdLinea = ISNULL(B.Id_Linea,'SIN_L'),
				IdCentro				,Valor = (SUM(Debe) - SUM(Haber))
		FROM	#TempDiferidos A
		LEFT JOIN (
			SELECT DISTINCT Id_Linea,Id_Centro FROM [v_CF_AgrupacionLinea] WHERE Activado = 1
		) B ON A.IdCentro = B.Id_Centro	
		WHERE NombreCentro NOT LIKE 'JD-%' AND NombreCentro NOT LIKE 'CO-%'
		GROUP BY A.IdEmpresa, B.Id_Linea, A.IdCentro


		UNION ALL


		--LINEA COLISION
		SELECT	IdEmpresa,		IdLinea,		IdCentro, 		Valor
		FROM 
		(
			--CONSULTA SIN LOS CENTROS DE COLISIÓN COMPARTIDOS
			SELECT	IdEmpresa			,IdLinea = ISNULL(B.Id_Linea,'SIN_L'),
					IdCentro			,Valor = (SUM(Debe) - SUM(Haber))
			FROM #TempDiferidos A
			LEFT JOIN (
				SELECT DISTINCT Id_Linea,Id_Centro FROM [v_CF_AgrupacionLinea] WHERE Activado = 1
			) B ON A.IdCentro = B.Id_Centro
			WHERE NombreCentro LIKE 'CO-%' AND IdCentro NOT IN (51,54,62,68,69,79,87,97,179)
			GROUP BY	A.IdEmpresa ,B.Id_Linea ,A.IdCentro

			UNION ALL

			--CONSULTA DE LOS CENTROS DE COLISIÓN COMPARTIDOS
			SELECT	IdEmpresa	,IdLinea = 'CO',
					IdCentro	,Valor = (SUM(Debe) - SUM(Haber))
			FROM #TempDiferidos
			WHERE NombreCentro LIKE 'CO-%' AND IdCentro IN (51,54,62,68,69,79,87,97,179)
			GROUP BY IdEmpresa ,IdCentro		
		) A


		UNION ALL 


		--CONSULTA SIN LOS CENTROS DE COLISIÓN COMPARTIDOS
		SELECT	IdEmpresa	,IdLinea = 'JD',
				IdCentro	,Valor = (SUM(Debe) - SUM(Haber))
		FROM #TempDiferidos
		WHERE NombreCentro LIKE 'JD-%' 
		GROUP BY IdEmpresa	,IdCentro
	) A
	GROUP BY IdEmpresa,		IdLinea,		IdCentro
END

```
