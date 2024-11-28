# Stored Procedure: sp_CF_RepuestosRemisiones

## Usa los objetos:
- [[CF_Datos]]
- [[CF_Tipos]]
- [[v_CF_AgrupacionLinea]]
- [[vw_Inventario_RemisionesPendFacturar]]

```sql

CREATE PROC [dbo].[sp_CF_RepuestosRemisiones] 
(
	@FechaConsulta DATE,
	@FechaIngreso DATE
) AS
BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF

	DECLARE @N1 INT, @N2 INT, @N3 INT, @Tipo NVARCHAR(30);
	SET @Tipo = 'Remisiones Pendientes';
	SET @N1 = (SELECT TOP 1 N1 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N2 = (SELECT TOP 1 N2 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N3 = (SELECT TOP 1 N3 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	DELETE [CF_Datos] WHERE Fecha = @FechaIngreso AND N1 = @N1 AND N2 = @N2 AND N3 = @N3
	INSERT INTO [CF_Datos] (Fecha,IdEmpresa,IdLinea,IdCentro,N1,N2,N3,Valor)
	
	SELECT	Fecha = @FechaIngreso,		IdEmpresa,		IdLinea,
			IdCentro,					N1 = @N1,		N2 = @N2,
			N3 = @N3,					Valor = SUM(ValorMedioMovimiento)
	FROM 
	(
		--CONSULTA SIN MAYORISTA
		SELECT (X.IdEmpresas)IdEmpresa,			IdCentro=ISNULL(X.IdCentros,0),		
				ValorMedioMovimiento, 
				IdLinea =  CASE WHEN X.IdSecciones = 1297 THEN 'JD' 
								WHEN X.IdSecciones = 1306 THEN 'MAY MIT'
								WHEN X.IdSecciones = 1307 THEN 'MAY BYD'
								ELSE ISNULL(AL.Id_Linea,'SIN_L') END
		FROM vw_Inventario_RemisionesPendFacturar X 
		LEFT JOIN (
			SELECT DISTINCT Cod_Linea, Id_Linea FROM [v_CF_AgrupacionLinea] WHERE Activado = 1
		) AL ON X.CodUnidadNegocio = AL.Cod_Linea
		WHERE X.Ano_Periodo = YEAR(@FechaConsulta) AND X.Mes_Periodo = MONTH(@FechaConsulta) 
			AND X.IdEmpresas IN (1, 5, 6, 19, 20, 24, 25, 27)
			AND X.IdCentros NOT IN (157,83,108,84)
		
		UNION ALL
			
		--CONSULTA MAYORISTA
		SELECT  (X.IdEmpresas)IdEmpresa,		IdCentro=ISNULL(X.IdCentros,0),	
				ValorMedioMovimiento,
				IdLinea = ISNULL(AL.Id_Linea,'SIN_L')
		FROM vw_Inventario_RemisionesPendFacturar X 
		LEFT JOIN (
			SELECT DISTINCT Id_Linea, Id_Centro, Id_Seccion FROM [v_CF_AgrupacionLinea] WHERE Activado = 1
		) AL ON X.IdCentros = AL.Id_Centro AND X.IdSecciones = AL.Id_Seccion
		WHERE X.Ano_Periodo = YEAR(@FechaConsulta) AND X.Mes_Periodo = MONTH(@FechaConsulta) 
			AND X.IdEmpresas IN (1, 5, 6, 19, 20, 24, 25, 27)
			AND X.IdCentros IN (157,83,108,84)
	)A
	GROUP BY IdEmpresa, IdLinea, IdCentro
END

```
