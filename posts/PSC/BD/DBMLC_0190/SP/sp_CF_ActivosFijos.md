# Stored Procedure: sp_CF_ActivosFijos

## Usa los objetos:
- [[CF_Datos]]
- [[CF_Tipos]]
- [[spiga_ActivosFijos]]
- [[v_CF_AgrupacionLinea]]

```sql

CREATE PROC [dbo].[sp_CF_ActivosFijos] 
(
	@FechaConsulta DATE,
	@FechaIngreso DATE
) AS
BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF

	---Tabla Temporal Activos Fijos 
	IF OBJECT_ID(N'tempdb.dbo.#TempActivosFijos', N'U') IS NOT NULL
		DROP TABLE #TempActivosFijos

	--Consulta principal
	SELECT	IdEmpresa=A.IdEmpresas		,IdCentro = ISNULL(A.IdCentrosDesg,0)
			,NombreCentroDesg			,ValorAmortizable=ISNULL(ValorAmortizable,0)	
			,Porcentaje					,AmortizacionAcumulada=ISNULL(AmortizacionAcumulada,0)
			,IdSecciones
	INTO #TempActivosFijos
	FROM [PSCService_DB].[dbo].[spiga_ActivosFijos] A WITH(NOLOCK)
	WHERE Ano_Periodo = YEAR(@FechaConsulta) AND FechaDeCorte >= '20190101' 
		AND Mes_Periodo = MONTH(@FechaConsulta) AND FechaBaja IS NULL 
		AND DescripcionInmovilizadoTipos NOT LIKE '%Diferido%'
		AND IdEmpresas IN (1, 5, 6, 19, 20, 24, 25, 27)


	DECLARE @N1 INT, @N2 INT, @N3 INT, @Tipo NVARCHAR(30);
	SET @Tipo = 'Activos Fijos';
	SET @N1 = (SELECT TOP 1 N1 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N2 = (SELECT TOP 1 N2 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N3 = (SELECT TOP 1 N3 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	DELETE [CF_Datos] WHERE Fecha = @FechaIngreso AND N1 = @N1 AND N2 = @N2 AND N3 = @N3
	INSERT INTO [CF_Datos] (Fecha,IdEmpresa,IdLinea,IdCentro,N1,N2,N3,Valor)
	
	SELECT	Fecha=@FechaIngreso,	IdEmpresa,		IdLinea,		IdCentro,
			N1=@N1,					N2=@N2,			N3=@N3,			Valor=SUM(Valor)
	FROM 
	(
		SELECT IdEmpresa, IdCentro, IdLinea, Valor = SUM(Valor)
		FROM (
			--Lineas diferentes a JD, MAY y CO - Sin Centro CEDI
			SELECT	IdEmpresa,								IdCentro,		
					IdLinea=ISNULL(B.Id_Linea,'SIN_L'),		Valor = SUM((ValorAmortizable - AmortizacionAcumulada) * Porcentaje)
			FROM #TempActivosFijos A
			LEFT JOIN (
				SELECT DISTINCT Id_Centro, Id_Linea FROM v_CF_AgrupacionLinea WHERE Activado = 1
			) B ON A.IdCentro = B.Id_Centro
			WHERE NombreCentroDesg NOT LIKE 'JD-%' AND NombreCentroDesg NOT LIKE 'CO-%'
				AND IdCentro NOT IN (204,157,83,108,84)
			GROUP BY A.IdEmpresa, A.IdCentro, B.Id_Linea


			UNION ALL


			--Centro CEDI y Mayorista
			SELECT	IdEmpresa,								IdCentro,		
					IdLinea =  CASE WHEN a.IdSecciones = 1297 THEN 'JD' 
									WHEN a.IdSecciones = 1306 THEN 'MAY MIT'
									WHEN a.IdSecciones = 1307 THEN 'MAY BYD'
									ELSE ISNULL(b.Id_Linea,'SIN_L') END,
					Valor = SUM((ValorAmortizable - AmortizacionAcumulada) * Porcentaje)
			FROM #TempActivosFijos A
			LEFT JOIN (
				SELECT DISTINCT Id_Centro, Id_Linea, Id_Seccion FROM v_CF_AgrupacionLinea WHERE Activado = 1
			) B ON A.IdCentro = B.Id_Centro AND a.IdSecciones = b.Id_Seccion
			WHERE IdCentro IN (204,157,83,108,84)
			GROUP BY A.IdEmpresa, A.IdCentro, B.Id_Linea, A.IdSecciones


			UNION ALL


			--Linea Colision
			SELECT	IdEmpresa,		IdCentro, 		IdLinea,		Valor
			FROM 
			(
				--CONSULTA SIN LOS CENTROS DE COLISIÓN
				SELECT	IdEmpresa	,IdLinea=ISNULL(A.Id_Linea,'SIN_L')	
						,IdCentro	,Valor=SUM((ValorAmortizable - AmortizacionAcumulada) * Porcentaje)
				FROM #TempActivosFijos C
				LEFT JOIN (
					SELECT DISTINCT Id_Linea,Id_Centro FROM [v_CF_AgrupacionLinea] WHERE Activado = 1
				) A ON C.IdCentro = a.Id_Centro
				WHERE NombreCentroDesg LIKE 'CO-%' AND IdCentro NOT IN (51,54,62,68,69,79,87,97,179) 
				GROUP BY C.IdEmpresa ,A.Id_Linea ,C.IdCentro

				UNION ALL

				--CONSULTA DE LOS CENTROS DE COLISIÓN
				SELECT	IdEmpresa	,IdLinea=ISNULL(A.Id_Linea,'SIN_L')		
						,IdCentro	,Valor=SUM((ValorAmortizable - AmortizacionAcumulada) * Porcentaje)
				FROM #TempActivosFijos C
				LEFT JOIN (
					SELECT DISTINCT Id_Linea,Id_Centro,Id_Seccion FROM [v_CF_AgrupacionLinea] WHERE Activado = 1
				) A ON C.IdCentro = a.Id_Centro AND C.IdSecciones = A.Id_Seccion
				WHERE	NombreCentroDesg LIKE 'CO-%' AND A.Id_Centro IS NOT NULL 
					AND C.IdCentro IN (51,54,62,68,69,79,87,97,179) 
				GROUP BY C.IdEmpresa ,A.Id_Linea ,C.IdCentro
		
			) A


			UNION ALL


			--Linea JD (Agricola, Construccion y Wirtgen)
			SELECT	IdEmpresa,				IdCentro,				IdLinea,
				Valor = SUM((ValorAmortizable - AmortizacionAcumulada) * Porcentaje)
			FROM 
			(
				SELECT	A.IdEmpresa					,A.IdCentro			,A.ValorAmortizable
						,A.AmortizacionAcumulada	,A.Porcentaje		,IdLinea=ISNULL(B.Id_Linea,'SIN_L')
				FROM #TempActivosFijos A
				LEFT JOIN (
					SELECT DISTINCT Id_Centro, Id_Linea, Id_Seccion FROM v_CF_AgrupacionLinea WHERE Activado = 1
				) B ON A.IdCentro = B.Id_Centro AND A.IdSecciones = B.Id_Seccion
				WHERE NombreCentroDesg LIKE 'JD-%' AND IdSecciones NOT IN (44,90,92,300,332,338,363,369,579)

				UNION ALL

				SELECT	A.IdEmpresa					,IdCentro			,ValorAmortizable
						,A.AmortizacionAcumulada	,A.Porcentaje
						,IdLinea = CASE WHEN IdSecciones IN (44,90,92,300,332,338) THEN 'JD.AGR'
										WHEN IdSecciones IN (363,369,579) THEN 'JD.CONS'
										ELSE 'SIN_L' END 
				FROM #TempActivosFijos A
				WHERE NombreCentroDesg LIKE 'JD-%' AND IdSecciones IN (44,90,92,300,332,338,363,369,579)
			) A
			GROUP BY IdEmpresa, IdCentro, IdLinea
		) A
		GROUP BY IdEmpresa, IdCentro, IdLinea
	) A
	GROUP BY IdEmpresa,IdLinea,IdCentro
END

```
