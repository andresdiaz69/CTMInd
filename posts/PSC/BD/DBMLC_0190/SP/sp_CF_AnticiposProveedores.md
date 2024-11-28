# Stored Procedure: sp_CF_AnticiposProveedores

## Usa los objetos:
- [[CF_Datos]]
- [[CF_Tipos]]
- [[spiga_RecibosAsientos_AnticiposReaprovechados]]
- [[v_CF_AgrupacionLinea]]

```sql

CREATE PROC [dbo].[sp_CF_AnticiposProveedores] 
(
	@FechaConsulta DATE,
	@FechaIngreso DATE
) AS
BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF

	---Tabla Temporal Cartera 
	IF OBJECT_ID(N'tempdb.dbo.#TempProveedores', N'U') IS NOT NULL
		DROP TABLE #TempProveedores

	SELECT	IdEmpresa=A.IdEmpresas				,IdCentro=ISNULL(A.IdCentros,0)
			,NombreCentro						,Valor=ISNULL(A.ImportePendienteVincular,0)
			,IdTerceros
	INTO #TempProveedores
	FROM [PSCService_DB].[dbo].[spiga_RecibosAsientos_AnticiposReaprovechados] A WITH(NOLOCK)
	WHERE Ano_Periodo = YEAR(@FechaConsulta) AND Mes_Periodo = MONTH(@FechaConsulta) 
		AND FechaDeCorte >= '20190101' AND IdEmpresas IN (1, 5, 6, 19, 20, 24, 25, 27)


	DECLARE @N1 INT, @N2 INT, @N3 INT, @Tipo NVARCHAR(30);
	SET @Tipo = 'Anticipos Proveedores';
	SET @N1 = (SELECT TOP 1 N1 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N2 = (SELECT TOP 1 N2 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N3 = (SELECT TOP 1 N3 FROM [CF_Tipos] WHERE Tipo = @Tipo);

	DELETE [CF_Datos] WHERE Fecha = @FechaIngreso AND N1 = @N1 AND N2 = @N2 AND N3 = @N3
	INSERT INTO [CF_Datos] (Fecha,IdEmpresa,IdLinea,IdCentro,N1,N2,N3,Valor)

	SELECT	Fecha = @FechaIngreso,		IdEmpresa,			IdLinea,			IdCentro,
			N1 = @N1,					N2 = @N2,			N3 = @N3,			Valor
	FROM (
		--Lineas Diferentes a JD
		SELECT	IdEmpresa									,IdCentro
				,IdLinea=ISNULL(B.Id_Linea,'SIN_L')			,Valor=SUM(Valor)
		FROM #TempProveedores A		
		LEFT JOIN (
			SELECT DISTINCT Id_Centro, Id_Linea FROM v_CF_AgrupacionLinea WHERE Activado = 1
		) B ON A.IdCentro = B.Id_Centro
		WHERE NombreCentro NOT LIKE 'JD-%'
		GROUP BY A.IdEmpresa, A.IdCentro, B.Id_Linea

		UNION ALL

		--Lineas JD
		SELECT	IdEmpresa		,IdCentro,
				IdLinea			,Valor=SUM(Valor)
		FROM (
			SELECT	IdEmpresa		,IdCentro		,Valor
				,IdLinea = CASE WHEN IdTerceros IN (441634, 245933) THEN 'JD.AGR'
						WHEN IdTerceros IN (245949) THEN 'JD.CONS'
						WHEN IdTerceros IN (931248, 794428, 517951, 517941, 517912, 517941, 517972) THEN 'WIR'
						WHEN IdCentro IN (25, 29, 43, 153) THEN 'JD.CONS'
						WHEN IdCentro IN (26) THEN 'WIR' ELSE 'JD.AGR' END
			FROM #TempProveedores
			WHERE NombreCentro LIKE 'JD-%'
		) A
		GROUP BY IdEmpresa, IdCentro, IdLinea
	) A
END

```
