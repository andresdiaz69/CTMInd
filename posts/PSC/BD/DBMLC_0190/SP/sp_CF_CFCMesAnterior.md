# Stored Procedure: sp_CF_CFCMesAnterior

## Usa los objetos:
- [[CF_Datos]]
- [[CF_Tipos]]
- [[v_CF_AgrupacionLinea]]
- [[v_InfoPresentacionesPYG]]

```sql

CREATE PROC [dbo].[sp_CF_CFCMesAnterior]
	@FechaConsulta DATE,
	@FechaIngreso DATE
AS
BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF


	SELECT	 CodigoPresentacion		,NombrePresentacion		,Año		,Mes
			,CodigoConcepto			,NombreConcepto			,Sede		,Valor		
	INTO #TempPresentaciones
	FROM v_InfoPresentacionesPYG
	WHERE Año = YEAR(@FechaConsulta) 
		AND Mes = MONTH(@FechaConsulta)
		AND Sede <> '' --and Valor <> 0


	DECLARE @N1 INT, @N2 INT, @N3 INT, @Tipo NVARCHAR(30);
	SET @Tipo = 'CFC Mes Anterior';
	SET @N1 = (SELECT TOP 1 N1 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N2 = (SELECT TOP 1 N2 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N3 = (SELECT TOP 1 N3 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	
	DELETE [CF_Datos] WHERE Fecha = @FechaIngreso AND N1 = @N1 AND N2 = @N2 AND N3 = @N3
	INSERT INTO [CF_Datos] (Fecha,IdEmpresa,IdLinea,IdCentro,N1,N2,N3,Valor)
	
	SELECT   Fecha = @FechaIngreso		,IdEmpresa				,IdLinea
			,IdCentro					,N1 = @N1				,N2 = @N2
			,N3 = @N3					,Valor = SUM(Valor)
	FROM
	(
		--Lineas diferentes a JD, MIT, BYD y Mayorita
		SELECT   IdEmpresa = ISNULL(B.CodEmpresa,0)		,IdLinea = ISNULL(B.Id_Linea,'SIN_L')
				,IdCentro = ISNULL(B.Id_Centro,0)		,Valor = SUM(A.Valor)
		FROM #TempPresentaciones A
		LEFT JOIN (
			SELECT DISTINCT Id_Centro, Centro, Id_Linea, CodEmpresa 
			FROM [v_CF_AgrupacionLinea]
		) B ON A.Sede = B.Centro
		WHERE CodigoPresentacion NOT IN (72,73,74,76,77,120,121)
		GROUP BY B.CodEmpresa ,B.Id_Linea ,B.Id_Centro

		UNION ALL

		--Lineas JD, MIT, BYD y Mayorita
		SELECT   IdEmpresa = B.CodEmpresa				,IdLinea = ISNULL(B.Id_Linea,'SIN_L')
				,IdCentro = ISNULL(B.Id_Centro,0)		,Valor = SUM(A.Valor)
		FROM 
		(	
			SELECT	 Sede		,Valor		
					,IdLinea = CASE WHEN CodigoPresentacion = 76 THEN 'MAY MIT'
									WHEN CodigoPresentacion = 77 THEN 'MIT'
									WHEN CodigoPresentacion = 120 THEN 'BYD'
									WHEN CodigoPresentacion = 121 THEN 'MAY BYD'
									WHEN CodigoPresentacion = 72 THEN 'JD.AGR'
									WHEN CodigoPresentacion = 73 THEN 'JD.CONS'
									WHEN CodigoPresentacion = 74 THEN 'WIR'
									ELSE '' END
			FROM #TempPresentaciones
			WHERE CodigoPresentacion IN (72,73,74,76,77,120,121)
		) A
		LEFT JOIN (
			SELECT DISTINCT Id_Centro, Centro, Cod_Linea, Id_Linea, CodEmpresa 
			FROM [v_CF_AgrupacionLinea]
			WHERE CodEmpresa IN (1,6)
		) B ON A.Sede = B.Centro AND A.IdLinea = B.Id_Linea
		GROUP BY B.CodEmpresa ,B.Id_Linea ,B.Id_Centro
	) A
	WHERE IdEmpresa IN (1, 5, 6, 19, 20, 24, 25, 27)
	GROUP BY IdEmpresa ,IdLinea ,IdCentro

END

```
