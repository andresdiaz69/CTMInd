# Stored Procedure: sp_CF_Nuevos

## Usa los objetos:
- [[CF_Datos]]
- [[CF_Tipos]]
- [[spiga_InventarioVN]]
- [[v_CF_AgrupacionLinea]]

```sql
CREATE PROC [dbo].[sp_CF_Nuevos] 
(
	@FechaConsulta DATE,
	@FechaIngreso DATE
)
AS
BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF

	DECLARE @N1 INT, @N2 INT, @N3 INT, @Tipo NVARCHAR(30);
	SET @Tipo = 'Nuevos';
	SET @N1 = (SELECT TOP 1 N1 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N2 = (SELECT TOP 1 N2 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N3 = (SELECT TOP 1 N3 FROM [CF_Tipos] WHERE Tipo = @Tipo);	

	--ELIMINAR TABLA TEMPORAL
	IF OBJECT_ID(N'tempdb.dbo.#tmpDataVN', N'U') IS NOT NULL
		DROP TABLE #tmpDataVN
	
	--GUARDAR INFORMACIÓN DEL INVENTARIO EN LA TABLA TEMPORAL
	SELECT * 
	INTO #tmpDataVN
	FROM [PSCService_DB].[dbo].[spiga_InventarioVN] WITH(NOLOCK)
	WHERE Ano_Periodo = YEAR(@FechaConsulta) AND Mes_Periodo = MONTH(@FechaConsulta) 
		AND IdCompraEstados <> 'F' AND IdEmpresas IN (1, 5, 6, 19, 20, 24, 25, 27)


	--ELIMINAR E INSERTAR INFO EN LA TABLA DEL CFC
	DELETE [CF_Datos] WHERE Fecha = @FechaIngreso AND N1 = @N1 AND N2 = @N2 AND N3 = @N3
	INSERT INTO [CF_Datos] (Fecha,IdEmpresa,IdLinea,IdCentro,N1,N2,N3,Valor)
	
	SELECT	Fecha = @FechaIngreso, 		IdEmpresa,		IdLinea,		IdCentro,		
			N1 = @N1,					N2 = @N2,		N3 = @N3,		Valor
	FROM 
	(
		SELECT IdEmpresa,	IdLinea,	IdCentro,	Valor = SUM(BaseImponibleCompra + GastosAumentanStock)	
		FROM 
		(
			--CENTRO CEDI
			SELECT  IdEmpresa,				IdLinea,				IdCentro,
					BaseImponibleCompra,	GastosAumentanStock
			FROM
			(
				--CONSULTA DE LA MARCA MAYORISTA (BYD Y MIT) DEL CENTRO CEDI
				SELECT IdEmpresa=A.IdEmpresas,  							IdLinea = CASE WHEN IdSecciones = 1306 THEN 'MAY MIT' ELSE 'MAY BYD' END,
					IdCentro=ISNULL(IdCentros,0),							BaseImponibleCompra = ISNULL(A.BaseImponibleCompra,0),
					GastosAumentanStock=ISNULL(A.GastosAumentanStock,0)
				FROM #tmpDataVN A
				WHERE A.FechaFactura >= '20130101' 
					AND A.IdCentros = 204
					AND IdSecciones IN (1306, 1307)

				UNION ALL

				--CONSULTA DE LA MARCA JD (JD A, JD C, WIRTGEN) CON EL CENTRO CEDI
				SELECT IdEmpresa=A.IdEmpresas,  							IdLinea = 'JD',
					IdCentro=ISNULL(IdCentros,0),							BaseImponibleCompra = ISNULL(A.BaseImponibleCompra,0),
					GastosAumentanStock=ISNULL(A.GastosAumentanStock,0)
				FROM #tmpDataVN A
				WHERE A.FechaFactura >= '20130101' 
					AND A.IdCentros = 204
					AND IdSecciones = 1297
			) A

			UNION ALL

			--CONSULTA DE LA MARCA JD (JD A, JD C, WIRTGEN) 
			SELECT IdEmpresa=A.IdEmpresas,  								IdLinea=ISNULL(B.Id_Linea,'SIN_L'),
				IdCentro=ISNULL(IdCentros,0),								BaseImponibleCompra=ISNULL(A.BaseImponibleCompra,0),
				GastosAumentanStock=ISNULL(A.GastosAumentanStock,0)
			FROM (
				SELECT * FROM #tmpDataVN 
				WHERE FechaFactura >= '20130101' 
					AND LTRIM(RTRIM(NombreCentro)) LIKE 'JD-%'
			) A
			LEFT JOIN (
				SELECT Id_Linea, Id_Centro, Id_Seccion FROM v_CF_AgrupacionLinea 
			) B ON A.IdCentros = B.Id_Centro AND A.IdSecciones = B.Id_Seccion

			UNION ALL 

			--CONSULTA MAY (BYD Y MIT)
			SELECT IdEmpresa=A.IdEmpresas,  								IdLinea=ISNULL(B.Id_Linea,'SIN_L'),
				IdCentro=ISNULL(IdCentros,0),								BaseImponibleCompra=ISNULL(A.BaseImponibleCompra,0),
				GastosAumentanStock=ISNULL(A.GastosAumentanStock,0)
			FROM (
				SELECT * FROM #tmpDataVN 
				WHERE FechaFactura >= '20130101' 					
					AND IdCentros IN (157,83,108,84)
			) A
			LEFT JOIN (
				SELECT Id_Linea, Id_Centro, Id_Seccion FROM v_CF_AgrupacionLinea 
			) B ON A.IdCentros = B.Id_Centro AND A.IdSecciones = B.Id_Seccion

			UNION ALL 

			--CONSULTA DE MARCAS DIFERENTES A JD Y MAY
			SELECT IdEmpresa=A.IdEmpresas,  								IdLinea=ISNULL(B.Id_Linea,'SIN_L'),
				IdCentro=ISNULL(IdCentros,0),								BaseImponibleCompra=ISNULL(A.BaseImponibleCompra,0),
				GastosAumentanStock=ISNULL(A.GastosAumentanStock,0)
			FROM (
				SELECT * FROM #tmpDataVN WHERE FechaFactura >=  '20190101' 
					AND LTRIM(RTRIM(NombreCentro)) NOT LIKE 'JD-%'
					AND IdSecciones NOT IN (1306, 1307, 1297)
					AND IdCentros NOT IN (157,83,108,84)
			) A
			LEFT JOIN (
				SELECT Id_Linea, Id_Centro, Id_Seccion FROM v_CF_AgrupacionLinea 
			) B ON A.IdCentros = B.Id_Centro AND A.IdSecciones = B.Id_Seccion
		)A
		GROUP BY IdEmpresa,	IdLinea, IdCentro
	)A

	--ELIMINAR TABLA TEMPORAL
	IF OBJECT_ID(N'tempdb.dbo.#tmpDataVN', N'U') IS NOT NULL
		DROP TABLE #tmpDataVN
END

```
