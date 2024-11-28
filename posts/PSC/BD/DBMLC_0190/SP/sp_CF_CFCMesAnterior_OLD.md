# Stored Procedure: sp_CF_CFCMesAnterior_OLD

## Usa los objetos:
- [[CF_Datos]]
- [[CF_Tipos]]
- [[UnidadDeNegocio]]
- [[v_CF_AgrupacionLinea]]
- [[v_InfoPresentacionesPYG]]

```sql
CREATE PROC [dbo].[sp_CF_CFCMesAnterior_OLD]
	@FechaConsulta DATE,
	@FechaIngreso DATE
AS
BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF

	DECLARE @N1 INT, @N2 INT, @N3 INT;
	SET @N1 = (SELECT TOP 1 N1 FROM [CF_Tipos] WHERE Tipo = 'CFC Mes Anterior');
	SET @N2 = (SELECT TOP 1 N2 FROM [CF_Tipos] WHERE Tipo = 'CFC Mes Anterior');
	SET @N3 = (SELECT TOP 1 N3 FROM [CF_Tipos] WHERE Tipo = 'CFC Mes Anterior');
	DELETE [CF_Datos] WHERE Fecha = @FechaIngreso AND N1 = @N1 AND N2 = @N2 AND N3 = @N3
	INSERT INTO [CF_Datos] (Fecha,IdEmpresa,IdLinea,IdCentro,N1,N2,N3,Valor)
	
	SELECT	Fecha = @FechaIngreso,				IdEmpresa,			IdLinea = ISNULL(IdLinea,0),
			IdCentro = ISNULL(IdCentro,0),		N1 = @N1,			N2 = @N2,
			N3 = @N3,							Valor=SUM(Valor)
	FROM 
	(
		--LINEAS DIFERENTES A JD
		SELECT	IdEmpresa = B.CodEmpresa,			IdLinea = ISNULL(B.Id_Linea,'SIN_L'),
				IdCentro=ISNULL(B.Id_Centro,0),		Valor = SUM(ISNULL(A.Valor,0))
		FROM	[v_InfoPresentacionesPYG] A
		INNER JOIN (
			SELECT DISTINCT A.Id_Centro, A.Centro, A.Id_Linea, B.CodEmpresa 
			FROM [v_CF_AgrupacionLinea] A
			LEFT JOIN (SELECT DISTINCT CodEmpresa,CodCentro FROM [UnidadDeNegocio]) B ON A.Id_Centro = B.CodCentro	
			WHERE Cod_Linea NOT IN (410, 411, 520) AND B.CodEmpresa IS NOT NULL
		) B ON LTRIM(RTRIM(A.Sede)) = LTRIM(RTRIM(B.Centro))
		WHERE	A.Año = YEAR(@FechaConsulta) AND A.Mes = MONTH(@FechaConsulta) AND A.CodigoConcepto = 230 
			AND A.Sede <> ' ' AND CodigoPresentacion NOT IN (72,73,74) 
		GROUP BY B.CodEmpresa, B.Id_Linea, B.Id_Centro

		UNION ALL

		--JHON DEERE AGRICOLA
		SELECT	IdEmpresa = B.CodEmpresa,		IdLinea = B.Id_Linea,
				IdCentro = B.Id_Centro,			Valor = ISNULL(Valor, 0)
		FROM
		(
			SELECT Sede, Valor=SUM(Valor)
			FROM [v_InfoPresentacionesPYG]
			WHERE Año = YEAR(@FechaConsulta) AND Mes = MONTH(@FechaConsulta) AND CodigoConcepto = 230 
				AND Sede <> ' ' AND CodigoPresentacion = 72
			GROUP BY Sede
		) A
		INNER JOIN (
			SELECT DISTINCT A.Id_Centro, A.Centro, A.Id_Linea, B.CodEmpresa 
			FROM [v_CF_AgrupacionLinea] A
			LEFT JOIN (SELECT DISTINCT CodEmpresa,CodCentro FROM [UnidadDeNegocio]) B ON A.Id_Centro = B.CodCentro	
			WHERE Cod_Linea = 410 AND B.CodEmpresa = 1
		) B ON LTRIM(RTRIM(A.Sede)) = LTRIM(RTRIM(B.Centro))

		UNION ALL

		--JHON DEERE CONSTRUCCION
		SELECT	IdEmpresa = B.CodEmpresa,		IdLinea = B.Id_Linea,
				IdCentro = B.Id_Centro,			Valor = ISNULL(Valor, 0)
		FROM
		(
			SELECT Sede, Valor=SUM(Valor)
			FROM [v_InfoPresentacionesPYG]
			WHERE Año = YEAR(@FechaConsulta) AND Mes = MONTH(@FechaConsulta) AND CodigoConcepto = 230 
				AND Sede <> ' ' AND CodigoPresentacion = 73
			GROUP BY Sede
		) A
		INNER JOIN (
			SELECT DISTINCT A.Id_Centro, A.Centro, A.Id_Linea, B.CodEmpresa 
			FROM [v_CF_AgrupacionLinea] A
			LEFT JOIN (SELECT DISTINCT CodEmpresa,CodCentro FROM [UnidadDeNegocio]) B ON A.Id_Centro = B.CodCentro	
			WHERE Cod_Linea = 411 AND B.CodEmpresa = 1
		) B ON LTRIM(RTRIM(A.Sede)) = LTRIM(RTRIM(B.Centro))

		UNION ALL

		--WIRTGEN
		SELECT	IdEmpresa = B.CodEmpresa,		IdLinea = B.Id_Linea,
				IdCentro = B.Id_Centro,			Valor = ISNULL(Valor, 0)
		FROM
		(
			SELECT Sede, Valor=SUM(Valor)
			FROM [v_InfoPresentacionesPYG]
			WHERE Año = YEAR(@FechaConsulta) AND Mes = MONTH(@FechaConsulta) AND CodigoConcepto = 230 
				AND Sede <> ' ' AND CodigoPresentacion = 74
			GROUP BY Sede
		) A
		INNER JOIN (
			SELECT DISTINCT A.Id_Centro, A.Centro, A.Id_Linea, B.CodEmpresa 
			FROM [v_CF_AgrupacionLinea] A
			LEFT JOIN (SELECT DISTINCT CodEmpresa,CodCentro FROM [UnidadDeNegocio]) B ON A.Id_Centro = B.CodCentro	
			WHERE Cod_Linea = 520 AND B.CodEmpresa = 1
		) B ON LTRIM(RTRIM(A.Sede)) = LTRIM(RTRIM(B.Centro))
	)A
	WHERE IdEmpresa NOT IN (3) AND CONCAT(LTRIM(RTRIM(IdEmpresa)),'-',LTRIM(RTRIM(IdCentro))) NOT IN ('5-1','5-3','5-7','5-12','1-146','6-146') AND Valor <> 0
	GROUP BY IdEmpresa, IdLinea, IdCentro
END

```
