# Stored Procedure: sp_CF_Cartera

## Usa los objetos:
- [[CF_Datos]]
- [[CF_Tipos]]
- [[spiga_Cartera]]
- [[v_CF_AgrupacionLinea]]
- [[v_MarginadorMostradorJohnDeere]]
- [[v_MarginadorTallerJohnDeere]]

```sql

CREATE PROC [dbo].[sp_CF_Cartera] 
(
	@FechaConsulta DATE,
	@FechaIngreso DATE
)
AS
BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF

	---Tabla Temporal Cartera 
	IF OBJECT_ID(N'tempdb.dbo.#TempCartera', N'U') IS NOT NULL
		DROP TABLE #TempCartera

	---Tabla Temporal Cartera 
	IF OBJECT_ID(N'tempdb.dbo.#TempCarteraJD', N'U') IS NOT NULL
		DROP TABLE #TempCarteraJD


	--CREAR TABLA TEMPORAL CON LA CARTERA
	SELECT IdEmpresas ,NombreCentro ,DescripcionSeccion ,Factura ,IdTerceros ,Saldo=SUM(Saldo) 
	INTO #TempCartera
	FROM
	(
		SELECT IdEmpresas ,Factura ,IdTerceros
			,DescripcionSeccion = REPLACE(REPLACE(REPLACE(DescripcionSeccion,' ','<>'),'><',''),'<>',' ')
			,CASE WHEN NombreCentro LIKE '%JD-Cali-Yumbo%' THEN 'JD-Cali-Palmira'
				WHEN NombreCentro LIKE '%VO-Bta-Cra 50%' THEN 'VO-Bta.-bellpi Usados'
				WHEN NombreCentro LIKE '%BYD Bogotá Av. 68%' THEN 'BYD-Bogotá Av. 68'
				WHEN NombreCentro LIKE '%JD-P.Gaitan-Alto Neblinas%' THEN 'JD-Ruta 40'
				WHEN NombreCentro LIKE '%MIT-Bta-Cll 170%' THEN 'MIT-Bta-Vitrina itinerante sabana'
				WHEN DescripcionSeccion = 'Taller Móvil JD Wirtgen Itaguí Carrera 92' THEN 'JD-Itagui-Cra 92'
				ELSE REPLACE(REPLACE(REPLACE(NombreCentro,' ','<>'),'><',''),'<>',' ') END NombreCentro
			,Saldo = CASE WHEN DescripcionSituacionEfectos = 'Remesado' THEN ImporteEfecto ELSE ImportePendiente END
		FROM [PSCService_DB].[dbo].[spiga_Cartera] WITH(NOLOCK)
		WHERE Ano_Periodo = YEAR(@FechaConsulta) AND Mes_Periodo = MONTH(@FechaConsulta) AND FechaDeCorte >= '20190101'
			AND IdEmpresas IN (1, 5, 6, 19, 20, 24, 25, 27)
	) A
	GROUP BY IdEmpresas, NombreCentro, DescripcionSeccion ,Factura ,IdTerceros


	--CREAR TABLA TEMPORAL CON LA CARTERA DE JD
	SELECT	A.IdEmpresas,		Id_Centro,		CodMarca=B.CodMarcaNuevo, 
			Saldo,				IdTerceros,
			CASE WHEN B.CodMarcaNuevo = 410  THEN 'JD.AGR'
				WHEN B.CodMarcaNuevo = 411  THEN 'JD.CONS'
				WHEN B.CodMarcaNuevo = 520  THEN 'WIR' END IdLinea

	INTO #TempCarteraJD

	FROM (
		SELECT Factura ,IdEmpresas ,NombreCentro ,IdTerceros ,Saldo 
		FROM #TempCartera
		WHERE NombreCentro LIKE 'JD-%' AND DescripcionSeccion IS NULL
	) A
	LEFT JOIN (
		SELECT DISTINCT CodMarcaNuevo, NumeroFactura 
		FROM (
			SELECT CodMarcaNuevo, NumeroFactura 
			FROM v_MarginadorMostradorJohnDeere 			

			UNION ALL

			SELECT CodMarcaNuevo, NumeroFactura
			FROM v_MarginadorTallerJohnDeere
		) A
	) B ON A.Factura = B.NumeroFactura
	LEFT JOIN (
		SELECT DISTINCT Id_Centro, Centro FROM v_CF_AgrupacionLinea
	) C ON A.NombreCentro = C.Centro



	DECLARE @N1 INT, @N2 INT, @N3 INT, @Tipo NVARCHAR(30);
	SET @Tipo = 'Cartera';
	SET @N1 = (SELECT TOP 1 N1 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N2 = (SELECT TOP 1 N2 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N3 = (SELECT TOP 1 N3 FROM [CF_Tipos] WHERE Tipo = @Tipo);

	DELETE [CF_Datos] WHERE Fecha = @FechaIngreso AND N1 = @N1 AND N2 = @N2 AND N3 = @N3
	INSERT INTO [CF_Datos] (Fecha,IdEmpresa,IdLinea,IdCentro,N1,N2,N3,Valor)

	--CONSULTA CARTERA GENERAL
	SELECT	Fecha = @FechaIngreso, 				IdEmpresa = IdEmpresas, 			IdLinea = ISNULL(Id_Linea,'SIN_L'), 
			IdCentro = ISNULL(Id_Centro,0), 	N1 = @N1,							N2 = @N2, 
			N3 = @N3,							Valor = SUM(ISNULL(Valor,0))
	FROM 
	(
		--CARTERA DIFERENTE A JD Y COLISION
		SELECT DISTINCT A.IdEmpresas, B.Id_Centro, Id_Linea, A.Valor
		FROM (
			SELECT IdEmpresas, 	NombreCentro, Valor = SUM(Saldo)
			FROM #TempCartera	
			WHERE NombreCentro NOT LIKE 'CO-%' AND NombreCentro NOT LIKE 'JD-%'
			GROUP BY IdEmpresas, NombreCentro
		) A

		LEFT JOIN (
			SELECT DISTINCT Id_Linea, Id_Centro, Centro FROM v_CF_AgrupacionLinea WHERE Activado = 1
		) B ON B.Centro = A.NombreCentro

		--WHERE Id_Centro NOT IN (191)
		

		UNION ALL


		----CARTERA CENTRO 191
		--SELECT IdEmpresas, B.Id_Centro, Id_Linea, Valor = SUM(Saldo)
		--FROM #TempCartera A
		--LEFT JOIN (
		--	SELECT DISTINCT Id_Linea, Id_Centro, Centro, Seccion FROM v_CF_AgrupacionLinea WHERE Activado = 1
		--) B ON B.Centro = A.NombreCentro AND A.DescripcionSeccion = B.Seccion
		--WHERE Id_Centro = 191
		--GROUP BY IdEmpresas, Id_Centro, Id_Linea


		--UNION ALL


		--CARTERA DE COLISIÓN
		SELECT IdEmpresas, Id_Centro, Id_Linea, Saldo=SUM(Saldo)
		FROM 
		(
			SELECT A.IdEmpresas, B.Id_Centro, Id_Linea = 'CO', A.Saldo
			FROM (
				SELECT IdEmpresas, NombreCentro, Saldo = SUM(Saldo)
				FROM #TempCartera A
				WHERE NombreCentro LIKE 'CO-%' AND DescripcionSeccion IS NULL
				GROUP BY IdEmpresas, NombreCentro
			) A
			LEFT JOIN (
				SELECT DISTINCT Id_Centro, Centro FROM v_CF_AgrupacionLinea
			) B ON A.NombreCentro = B.Centro 
			WHERE Id_Centro IN (51,54,62,68,69,79,87,92,97,179)
	
			UNION ALL

			SELECT IdEmpresas, B.Id_Centro, B.Id_Linea, Saldo
			FROM (
				SELECT IdEmpresas, NombreCentro, Saldo = SUM(Saldo)
				FROM	#TempCartera A
				WHERE NombreCentro LIKE 'CO-%' AND DescripcionSeccion IS NULL
				GROUP BY IdEmpresas, NombreCentro
			) A
			LEFT JOIN (
				SELECT DISTINCT Id_Centro, Centro, Id_Linea FROM v_CF_AgrupacionLinea
			) B ON A.NombreCentro = B.Centro 
			WHERE Id_Centro NOT IN (51,54,62,68,69,79,87,92,97,179)

			UNION ALL

			SELECT DISTINCT A.IdEmpresas,		
				Id_Centro = CASE WHEN B.Id_Centro IS NOT NULL THEN B.Id_Centro ELSE C.Id_Centro END,
				Id_Linea = CASE WHEN B.Id_Linea IS NOT NULL THEN B.Id_Linea 
								WHEN C.Id_Centro IN (74, 79, 92, 101) AND DescripcionSeccion LIKE '%MIT%' THEN 'MIT' 
								WHEN C.Id_Centro IN (74, 79, 92, 101) AND DescripcionSeccion NOT LIKE '%MIT%' THEN 'CO' 
								ELSE C.Id_Linea END,
				Saldo

			FROM (
				SELECT IdEmpresas, NombreCentro, DescripcionSeccion, Saldo = SUM(Saldo)
				FROM	#TempCartera A
				WHERE NombreCentro LIKE 'CO-%' AND DescripcionSeccion IS NOT NULL
				GROUP BY IdEmpresas, NombreCentro, DescripcionSeccion
			) A

			LEFT JOIN (
				SELECT DISTINCT Id_Centro, Centro, Id_Linea, Seccion FROM v_CF_AgrupacionLinea
			) B ON  A.DescripcionSeccion = B.Seccion

			LEFT JOIN (
				SELECT DISTINCT Id_Centro, Centro, Id_Linea FROM v_CF_AgrupacionLinea
			) C ON  A.NombreCentro = C.Centro
		) A
		GROUP BY IdEmpresas, Id_Centro, Id_Linea


		UNION ALL

		--CARTERA JD 
		SELECT IdEmpresas, Id_Centro, Id_Linea, Valor = SUM(Valor)
		FROM 
		(
			--CARTERA JD CON SECCION
			SELECT IdEmpresas, Id_Centro, Id_Linea, Valor
			FROM (
				SELECT	A.IdEmpresas,	Id_Linea = CASE WHEN B.Id_Linea IS NULL THEN C.Id_Linea ELSE B.Id_Linea END,
						A.Valor,		Id_Centro = CASE WHEN B.Id_Centro IS NULL THEN D.Id_Centro ELSE B.Id_Centro END
				FROM (
					SELECT IdEmpresas, 	NombreCentro, DescripcionSeccion, Valor = SUM(Saldo)
					FROM #TempCartera
					WHERE NombreCentro LIKE 'JD-%' AND DescripcionSeccion IS NOT NULL
					GROUP BY IdEmpresas, NombreCentro, DescripcionSeccion
				) A

				LEFT JOIN (
					SELECT DISTINCT Id_Linea, Id_Centro, Centro, Id_Seccion, 
						Seccion = REPLACE(REPLACE(REPLACE(Seccion,' ','<>'),'><',''),'<>',' ')
					FROM v_CF_AgrupacionLinea WHERE Activado = 1
				) B ON B.Centro = A.NombreCentro AND A.DescripcionSeccion = B.Seccion

				LEFT JOIN (
					SELECT DISTINCT Id_Linea, Seccion = REPLACE(REPLACE(REPLACE(Seccion,' ','<>'),'><',''),'<>',' ')
					FROM v_CF_AgrupacionLinea WHERE Activado = 1
				) C ON A.DescripcionSeccion = C.Seccion

				LEFT JOIN (
					SELECT DISTINCT Id_Centro, Centro
					FROM v_CF_AgrupacionLinea WHERE Activado = 1
				) D ON A.NombreCentro = D.Centro
			) A
				
			UNION ALL

			SELECT IdEmpresas, Id_Centro, IdLinea, Saldo=SUM(Saldo)
			FROM (
				--CARTERA JD CON MARCAS
				SELECT IdEmpresas, Id_Centro, IdLinea, Saldo
				FROM #TempCarteraJD 
				WHERE CodMarca IS NOT NULL

				UNION ALL

				--CARTERA JD SIN MARCAS Y FILTRADA
				SELECT IdEmpresas, Id_Centro, IdLinea, Saldo
				FROM (
					SELECT IdEmpresas, Id_Centro, Saldo, IdTerceros, 
						IdLinea = CASE WHEN IdTerceros IN (441634, 245933) THEN 'JD.AGR'
									WHEN IdTerceros IN (245949) THEN 'JD.CONS'
									WHEN IdTerceros IN (931248, 794428, 517951, 517941, 517912, 517941, 517972) THEN 'WIR'
									WHEN Id_Centro IN (25, 29, 43, 153) THEN 'JD.CONS'
									WHEN Id_Centro IN (26) THEN 'WIR' ELSE 'JD.AGR' END
					FROM #TempCarteraJD A
					WHERE CodMarca IS NULL
				)A
			) A
			GROUP BY IdEmpresas, Id_Centro, IdLinea
		)A
		GROUP BY IdEmpresas, Id_Centro, Id_Linea		
	) A
	GROUP BY IdEmpresas, Id_Linea, Id_Centro


	---Tabla Temporal Cartera 
	IF OBJECT_ID(N'tempdb.dbo.#TempCartera', N'U') IS NOT NULL
		DROP TABLE #TempCartera

	---Tabla Temporal Cartera 
	IF OBJECT_ID(N'tempdb.dbo.#TempCarteraJD', N'U') IS NOT NULL
		DROP TABLE #TempCarteraJD

END

```
