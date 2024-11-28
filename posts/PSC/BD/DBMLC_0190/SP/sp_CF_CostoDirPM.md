# Stored Procedure: sp_CF_CostoDirPM

## Usa los objetos:
- [[CF_Datos]]
- [[CF_LineaDirPM]]
- [[CF_Tipos]]

```sql

CREATE PROC [dbo].[sp_CF_CostoDirPM]
	@FechaConsulta DATE,
	@FechaIngreso DATE
AS
BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF

	DECLARE @N1 INT, @UN1 INT, @N2 INT, @N3 INT, @Tipo NVARCHAR(30);
	SET @Tipo = 'Costo Dir. PM';
	SET @UN1 = (SELECT TOP 1 N1 FROM [CF_Tipos] WHERE Tipo = 'USO');
	SET @N1  = (SELECT TOP 1 N1 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N2  = (SELECT TOP 1 N2 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N3  = (SELECT TOP 1 N3 FROM [CF_Tipos] WHERE Tipo = @Tipo);

	SELECT *
	INTO #TempDirPM
	FROM CF_Datos CF
	WHERE CONVERT(DATE, CF.Fecha) = @FechaConsulta
		AND N1 = @UN1
	
	DELETE [CF_Datos] WHERE Fecha = @FechaIngreso AND N1 = @N1 AND N2 = @N2 AND N3 = @N3
	INSERT INTO [CF_Datos] (Fecha,IdEmpresa,IdLinea,IdCentro,N1,N2,N3,Valor)

	SELECT   Fecha = @FechaIngreso		,IdEmpresa		,IdLinea		,IdCentro
			,N1 = @N1					,N2 = @N2		,N3 = @N3		,Valor=SUM(Valor)
	FROM 
	(
		SELECT	V_Centro.IdEmpresa ,V_Centro.IdLinea ,V_Centro.IdCentro	
			,Valor = CASE WHEN V_Centro.ValorUsoCentro = 0 OR V_DirPM.IdLinea IS NULL THEN 0
						ELSE (V_Centro.ValorUsoCentro / V_Linea.ValorUsoLinea) * V_DirPM.ValorDirPM END
		FROM (
			SELECT IdEmpresa ,IdLinea ,IdCentro ,ValorUsoCentro=SUM(Valor) FROM #TempDirPM
			GROUP BY IdEmpresa ,IdLinea ,IdCentro
		) AS V_Centro

		LEFT JOIN (
			SELECT IdEmpresa ,IdLinea ,IdCentro = 0 ,ValorUsoLinea=SUM(Valor) FROM #TempDirPM
			GROUP BY IdEmpresa ,IdLinea
		) AS V_Linea ON V_Centro.IdEmpresa = V_Linea.IdEmpresa AND V_Centro.IdLinea = V_Linea.IdLinea

		LEFT JOIN (
			SELECT IdLinea = Id ,Linea ,ValorDirPM = Valor 
			FROM CF_LineaDirPM 
			WHERE Año = YEAR(@FechaConsulta)
				AND Mes = MONTH(@FechaConsulta)
		)AS V_DirPM ON V_DirPM.IdLinea = V_Centro.IdLinea

	) DirPM
	GROUP BY IdEmpresa ,IdLinea ,IdCentro

END

```
