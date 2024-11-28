# Stored Procedure: sp_CF_OtrosActivosDerechos

## Usa los objetos:
- [[CF_Datos]]
- [[CF_Tipos]]
- [[spiga_ContabilidadMovimientos]]
- [[v_CF_AgrupacionLinea]]

```sql

CREATE PROC [dbo].[sp_CF_OtrosActivosDerechos] 
(
	@FechaConsulta DATE,
	@FechaIngreso DATE
) AS
BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF

	DECLARE @N1 INT, @N2 INT, @N3 INT, @Tipo NVARCHAR(30);
	SET @Tipo = 'Otros activos (derechos)';
	SET @N1 = (SELECT TOP 1 N1 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N2 = (SELECT TOP 1 N2 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N3 = (SELECT TOP 1 N3 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	DELETE [CF_Datos] WHERE Fecha = @FechaIngreso AND N1 = @N1 AND N2 = @N2 AND N3 = @N3
	INSERT INTO [CF_Datos] (Fecha,IdEmpresa,IdLinea,IdCentro,N1,N2,N3,Valor)
	
	SELECT	Fecha = @FechaIngreso,			IdEmpresa = X.IdEmpresas,		IdLinea = ISNULL(A.Id_Linea,'SIN_L'),
			IdCentro=ISNULL(X.Centro,0),	N1 = @N1,						N2 = @N2,
			N3 = @N3,						Valor = SUM(ISNULL(X.Debe,0)) - SUM(ISNULL(X.Haber,0))
	FROM (
		SELECT * FROM [PSCService_DB].[dbo].[spiga_ContabilidadMovimientos] 
		WHERE Ano_Periodo = YEAR(@FechaConsulta) AND Cuenta IN ('1630050505','1625950510') 
			AND FechaAsiento >= '20190101' AND IdEmpresas IN (1, 5, 6, 19, 20, 24, 25, 27)
			--AND concepto NOT LIKE '%Apertura Ejercicio%' AND concepto NOT LIKE '%Ajuste automático%' 
			--AND concepto NOT LIKE '%Cierre Ejercicio%'
	) X
	INNER JOIN (
		SELECT DISTINCT Id_Linea,Id_Centro FROM [v_CF_AgrupacionLinea] WHERE Activado = 1 AND Id_Linea IN ('DAI', 'DAI.V', 'DAI.C')
	) A ON X.Centro = A.Id_Centro
	WHERE MONTH(FechaAsiento) <= MONTH(@FechaConsulta) 
	GROUP BY	X.IdEmpresas, 
				A.Id_Linea,
				X.Centro
END

```
