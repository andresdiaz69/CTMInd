# Stored Procedure: sp_CF_Usados

## Usa los objetos:
- [[CF_Datos]]
- [[CF_Tipos]]
- [[spiga_InventarioVO]]
- [[v_CF_AgrupacionLinea]]

```sql
CREATE PROC [dbo].[sp_CF_Usados] 
(
	@FechaConsulta DATE,
	@FechaIngreso DATE
) AS
BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF

	DECLARE @N1 INT, @N2 INT, @N3 INT, @Tipo NVARCHAR(30);
	SET @Tipo = 'Usados';
	SET @N1 = (SELECT TOP 1 N1 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N2 = (SELECT TOP 1 N2 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N3 = (SELECT TOP 1 N3 FROM [CF_Tipos] WHERE Tipo = @Tipo);	
	DELETE [CF_Datos] WHERE Fecha = @FechaIngreso AND N1 = @N1 AND N2 = @N2 AND N3 = @N3
	INSERT INTO [CF_Datos] (Fecha,IdEmpresa,IdLinea,IdCentro,N1,N2,N3,Valor)
	SELECT  Fecha = @FechaIngreso,		IdEmpresa,			IdLinea,
			IdCentro,					N1 = @N1,			N2 = @N2,
			N3 = @N3,					Valor=SUM(Valor)
	FROM
	(
		SELECT	IdEmpresa = A.IdEmpresas,			IdLinea = ISNULL(B.Id_Linea,'SIN_L'),
				IdCentro=ISNULL(A.IdCentros,0),		Valor = SUM(ISNULL(A.BaseImponibleCompra,0) + ISNULL(A.GastosAumentanStock,0))
		FROM (
			SELECT * FROM [PSCService_DB].[dbo].[spiga_InventarioVO] WITH(NOLOCK)
			WHERE Ano_Periodo = YEAR(@FechaConsulta) AND Mes_Periodo = MONTH(@FechaConsulta)
				AND IdEmpresas IN (1, 5, 6, 19, 20, 24, 25, 27)
				AND IdSecciones NOT IN (1306, 1307, 1297)
		) A
		LEFT JOIN (
			SELECT DISTINCT Id_Linea, Id_Centro, Id_Seccion FROM v_CF_AgrupacionLinea WHERE Activado = 1
		) B ON A.IdCentros = B.Id_Centro AND A.IdSecciones = B.Id_Seccion
		GROUP BY A.IdEmpresas, B.Id_Linea, A.IdCentros

		UNION ALL

		SELECT IdEmpresa = IdEmpresas,		IdLinea = CASE WHEN IdSecciones = 1297 THEN 'JD' 
															WHEN IdSecciones = 1306 THEN 'MAY MIT'
															ELSE 'MAY BYD' END,
			IdCentro=ISNULL(IdCentros,0),	Valor = SUM(ISNULL(BaseImponibleCompra,0) + ISNULL(GastosAumentanStock,0))
		FROM [PSCService_DB].[dbo].[spiga_InventarioVO] WITH(NOLOCK)
		WHERE Ano_Periodo = YEAR(@FechaConsulta) AND Mes_Periodo = MONTH(@FechaConsulta)
			AND IdEmpresas IN (1, 5, 6, 19, 20, 24, 25, 27)		
			AND IdSecciones IN (1306, 1307, 1297)
		GROUP BY IdEmpresas, IdCentros, IdSecciones
	) A
	GROUP BY IdEmpresa, IdLinea, IdCentro
END

```
