# Stored Procedure: sp_CF_RepuestosStock

## Usa los objetos:
- [[CF_Datos]]
- [[CF_Tipos]]
- [[spiga_StockRepuestos]]
- [[v_CF_AgrupacionLinea]]
- [[vw_UnidadDeNegocio]]

```sql

CREATE PROC [dbo].[sp_CF_RepuestosStock]
(
	@FechaConsulta DATE,
	@FechaIngreso DATE
) AS
BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF
	
	--DECLARE @FechaConsulta DATE, @FechaIngreso DATE
	--SET @FechaConsulta = '20210930'
	--SET @FechaIngreso = '20210930'

	DECLARE @N1 INT, @N2 INT, @N3 INT, @Tipo NVARCHAR(30);
		--,@agricola int, @construccion int, @wirtgen int;
	SET @Tipo = 'Stock';
	SET @N1 = (SELECT TOP 1 N1 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N2 = (SELECT TOP 1 N2 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N3 = (SELECT TOP 1 N3 FROM [CF_Tipos] WHERE Tipo = @Tipo);
		
	DELETE [CF_Datos] WHERE Fecha = @FechaIngreso AND N1 = @N1 AND N2 = @N2 AND N3 = @N3
	
	INSERT INTO [CF_Datos] (Fecha,IdEmpresa,IdLinea,IdCentro,N1,N2,N3,Valor)
	
	SELECT Fecha=@FechaIngreso,		IdEmpresa = IdEmpresas,		IdLinea,		IdCentro = IdCentros,				
	   N1=@N1,					N2=@N2,						N3=@N3,			Valor
	FROM
	(
		--CONSULTA SIN MAYORISTA Y SIN JD
		SELECT Ano_Periodo, Mes_Periodo, IdEmpresas, IdLinea, IdCentros, Valor=SUM(PrecioMedio*stock)
		FROM 
		(
			SELECT	R.Ano_Periodo,		R.Mes_Periodo,								R.IdEmpresas,	
					R.IdCentros,		PrecioMedio = ISNULL(R.PrecioMedio,0),		Stock = ISNULL(R.Stock,0),
					IdLinea =  CASE WHEN R.IdSecciones = 1297 THEN 'JD' 
									WHEN R.IdSecciones = 1306 THEN 'MAY MIT'
									WHEN R.IdSecciones = 1307 THEN 'MAY BYD'
									ELSE B.Sigla END

			FROM [PSCService_DB].dbo.spiga_StockRepuestos	R
			LEFT JOIN	vw_UnidadDeNegocio	B	ON B.CodEmpresa = R.IdEmpresas AND B.CodCentro = R.IdCentros  
												AND B.CodSeccion = R.IdSecciones
			WHERE Ano_Periodo = YEAR(@FechaConsulta) AND Mes_Periodo = MONTH(@FechaConsulta)
				AND CodUnidadNegocio NOT IN (410, 411, 520) AND IdEmpresas IN (1, 5, 6, 19, 20, 24, 25, 27)
				AND IdCentros NOT IN (157,83,108,84)
		) A
		GROUP BY Ano_Periodo, Mes_Periodo, IdEmpresas, IdLinea, IdCentros

		UNION ALL

		--CONSULTA MAYORISTA
		SELECT Ano_Periodo, Mes_Periodo, IdEmpresas, IdLinea, IdCentros, Valor=SUM(PrecioMedio*stock)
		FROM (
			SELECT	R.Ano_Periodo,		R.Mes_Periodo,								R.IdEmpresas,	
					R.IdCentros,		PrecioMedio = ISNULL(R.PrecioMedio,0),		Stock = ISNULL(R.Stock,0),
					IdLinea = CASE WHEN (IdCentros = 157) OR (IdCentros = 83 AND IdSecciones = 861) 
									THEN 'MAY BYD' ELSE 'MAY MIT' END

			FROM [PSCService_DB].dbo.spiga_StockRepuestos	R
			WHERE Ano_Periodo = YEAR(@FechaConsulta) AND Mes_Periodo = MONTH(@FechaConsulta)
				AND IdEmpresas IN (1, 5, 6, 19, 20, 24, 25, 27)
				AND IdCentros IN (157,83,108,84)
		) B
		GROUP BY Ano_Periodo, Mes_Periodo, IdEmpresas, IdLinea, IdCentros

		UNION ALL

		--CONSULTA JD
		SELECT	Ano_Periodo, Mes_Periodo, IdEmpresas, IdLinea=ISNULL(B.Id_Linea,'SIN_L'), IdCentros, Valor = SUM(ValorPrecioMedio)
		FROM (
			SELECT Ano_Periodo, Mes_Periodo, IdEmpresas, IdCentros, ValorPrecioMedio=(PrecioMedio*stock),
				CodUnidadNegocio = CASE WHEN IdCentros = 203 THEN 410
					WHEN denominacionclasificacion5 LIKE '%AGRÍC%' AND denominacionclasificacion6 LIKE '%Agric%' AND nombreseccion LIKE '%AGR%' THEN 410
					WHEN denominacionclasificacion5 LIKE '%AGRÍC%' AND denominacionclasificacion6 LIKE '%Merchand%' THEN 410
					WHEN denominacionclasificacion5 IS NULL AND denominacionclasificacion6 IS NULL AND nombreseccion LIKE '%AGR%' THEN 410
					WHEN denominacionclasificacion5 IS NULL AND denominacionclasificacion6 IS NULL AND nombreseccion LIKE '%CONS%' THEN 411
					WHEN denominacionclasificacion5 IS NULL AND denominacionclasificacion6 IS NULL AND nombreseccion LIKE '%WIR%' THEN 520
					WHEN denominacionclasificacion6 LIKE '%Merchandising%' THEN 411
					WHEN denominacionclasificacion6 LIKE '%Lubricantes%' THEN 410
					WHEN denominacionclasificacion5 LIKE '%AGRÍC%' THEN 410
					WHEN denominacionclasificacion5 LIKE '%CONSTRUCCI%' THEN 411
					WHEN denominacionclasificacion5 LIKE '%WIRTGEN%' THEN 520
				ELSE 410 END 
			FROM (
				SELECT  D.Ano_Periodo,							D.Mes_Periodo,						D.IdEmpresas,			D.IdCentros,
						PrecioMedio=ISNULL(D.PrecioMedio,0),	stock = ISNULL(D.stock,0),			D.IdSecciones,			S.NombreSeccion,
						D.denominacionclasificacion5,			D.denominacionclasificacion6
				FROM [PSCService_DB].[dbo].[spiga_StockRepuestos] D

				INNER JOIN (
					SELECT DISTINCT CodCentro, NombreCentro 
					FROM vw_UnidadDeNegocio 
					WHERE (CodCentro = 149) OR (NombreCentro LIKE 'JD-%')
				) AS U ON U.CodCentro = D.IdCentros

				LEFT JOIN (
					SELECT DISTINCT CodSeccion, NombreSeccion FROM vw_UnidadDeNegocio WHERE (CodCentro = 149) OR (NombreCentro LIKE 'JD-%')
				) AS S ON S.CodSeccion = D.IdCentros

				WHERE Ano_Periodo = YEAR(@FechaConsulta) AND Mes_Periodo = MONTH(@FechaConsulta)
					AND IdEmpresas IN (1, 5, 6, 19, 20, 24, 25, 27)
			) A
		) A
		LEFT JOIN (
			SELECT DISTINCT Id_Linea, Cod_Linea FROM [v_CF_AgrupacionLinea] WHERE Activado = 1
		) B ON A.CodUnidadNegocio = B.Cod_Linea
		GROUP BY Ano_Periodo, Mes_Periodo, IdEmpresas, Id_Linea, IdCentros
	) A
END

```
