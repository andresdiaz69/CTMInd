# Stored Procedure: sp_CF_AnticiposRecibidos

## Usa los objetos:
- [[CF_Datos]]
- [[CF_Tipos]]
- [[v_CF_AgrupacionLinea]]
- [[vw_AnticiposPendientesClientes]]

```sql

CREATE PROC [dbo].[sp_CF_AnticiposRecibidos] 
	@FechaConsulta DATE,
	@FechaIngreso DATE
AS
BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF

	---Tabla Temporal Cartera 
	IF OBJECT_ID(N'tempdb.dbo.#TempAnticiposRecibidos', N'U') IS NOT NULL
		DROP TABLE #TempAnticiposRecibidos

	SELECT	IdEmpresa=Empresa		,IdCentro = CodCentro		
			,Centro					,Diferencia=ISNULL(Diferencia,0)
	INTO #TempAnticiposRecibidos
	FROM [vw_AnticiposPendientesClientes] WITH(NOLOCK)
	WHERE Ano_Periodo = YEAR(@FechaConsulta) AND Mes_Periodo = MONTH(@FechaConsulta)
		AND Empresa IN (1, 5, 6, 19, 20, 24, 25, 27)

	DECLARE @N1 INT, @N2 INT, @N3 INT, @Tipo NVARCHAR(30);
	SET @Tipo = 'Anticipos recibidos';
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
		SELECT	 A.IdEmpresa	,IdLinea = ISNULL(B.Id_Linea,'SIN_L')
				,A.IdCentro		,Valor = SUM(A.Diferencia) 
		FROM	
		(
			SELECT IdEmpresa, IdCentro, Diferencia 
			FROM #TempAnticiposRecibidos
			WHERE Centro NOT LIKE 'JD-%' AND Centro NOT LIKE 'CO-%' AND IdCentro IS NOT NULL
		) A
		LEFT JOIN (
			SELECT DISTINCT Id_Linea,Id_Centro FROM [v_CF_AgrupacionLinea] WHERE Activado = 1
		) B ON A.IdCentro = B.Id_Centro	
		WHERE CONCAT(LTRIM(RTRIM(B.Id_Linea)),A.IdCentro) <> 'USC191'
		GROUP BY A.IdEmpresa, B.Id_Linea, A.IdCentro

		
		UNION ALL


		--LINEA COLISION
		SELECT	IdEmpresa,		IdLinea,		IdCentro, 		Valor
		FROM 
		(
			--CONSULTA SIN LOS CENTROS DE COLISIÓN COMPARTIDOS
			SELECT	 IdEmpresa		,IdLinea=ISNULL(B.Id_Linea,'SIN_L')
					,IdCentro		,Valor=SUM(Diferencia)
			FROM #TempAnticiposRecibidos A
			LEFT JOIN (
				SELECT DISTINCT Id_Linea,Id_Centro FROM [v_CF_AgrupacionLinea] WHERE Activado = 1
			) B ON A.IdCentro = B.Id_Centro	
			WHERE Centro LIKE 'CO-%' AND IdCentro NOT IN (51,54,62,68,69,79,87,97,179) 
			GROUP BY A.IdEmpresa, B.Id_Linea, A.IdCentro

			UNION ALL

			--CONSULTA DE LOS CENTROS DE COLISIÓN COMPARTIDOS
			SELECT	 IdEmpresa		,IdLinea = 'CO'
					,IdCentro		,Valor = SUM(Diferencia)
			FROM #TempAnticiposRecibidos
			WHERE Centro LIKE 'CO-%' AND IdEmpresa IN (51,54,62,68,69,79,87,97,179)
			GROUP BY IdEmpresa ,IdCentro
		) A


		UNION ALL 


		--CONSULTA JHON DEERE
		SELECT	 IdEmpresa		,IdLinea = 'JD'
				,IdCentro		,Valor = SUM(Diferencia)
		FROM #TempAnticiposRecibidos
		WHERE Centro LIKE 'JD-%' 
		GROUP BY IdEmpresa, IdCentro
	) A
	GROUP BY IdEmpresa,		IdLinea,	IdCentro
END

```
