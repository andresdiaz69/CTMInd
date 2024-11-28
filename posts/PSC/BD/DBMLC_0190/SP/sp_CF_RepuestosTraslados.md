# Stored Procedure: sp_CF_RepuestosTraslados

## Usa los objetos:
- [[CF_Datos]]
- [[CF_Tipos]]
- [[v_CF_AgrupacionLinea]]
- [[vw_Inventario_Traslados]]

```sql

CREATE PROC [dbo].[sp_CF_RepuestosTraslados] 
(
	@FechaConsulta DATE,
	@FechaIngreso DATE
) AS
BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF

	DECLARE @N1 INT, @N2 INT, @N3 INT, @Tipo NVARCHAR(30);
	SET @Tipo = 'Traslados Pendientes';
	SET @N1 = (SELECT TOP 1 N1 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N2 = (SELECT TOP 1 N2 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	SET @N3 = (SELECT TOP 1 N3 FROM [CF_Tipos] WHERE Tipo = @Tipo);
	DELETE [CF_Datos] WHERE Fecha = @FechaIngreso AND N1 = @N1 AND N2 = @N2 AND N3 = @N3
	INSERT INTO [CF_Datos] (Fecha,IdEmpresa,IdLinea,IdCentro,N1,N2,N3,Valor)
	SELECT Fecha = @FechaIngreso,					IdEmpresa = IdEmpresas_Entrada,		
		IdLinea = ISNULL(Id_Linea,'SIN_L'),			IdCentro=ISNULL(IdCentros,0),	
		N1 = @N1,									N2 = @N2,
		N3 = @N3,									Valor = SUM(valormediomovimiento)
	FROM (
		SELECT IdEmpresas_Entrada, IdCentros, valormediomovimiento,
			Id_Linea = CASE WHEN X.IdSecciones = 1297 THEN 'JD' 
								WHEN X.IdSecciones = 1306 THEN 'MAY MIT'
								WHEN X.IdSecciones = 1307 THEN 'MAY BYD'
								ELSE ISNULL(AL.Id_Linea,'SIN_L') END
		FROM [vw_Inventario_Traslados]  X
		LEFT JOIN (
			SELECT DISTINCT Cod_Linea, Id_Linea FROM [v_CF_AgrupacionLinea] WHERE Activado = 1 AND Id_Linea IS NOT NULL
		) AL ON X.CodUnidadNegocio = AL.Cod_Linea  
		WHERE Ano_Periodo = YEAR(@FechaConsulta) AND Mes_Periodo = MONTH(@FechaConsulta)
			AND IdEmpresas_Entrada IN (1, 5, 6, 19, 20, 24, 25, 27)
			AND X.IdCentros NOT IN (157,83,108,84)

		UNION ALL

		SELECT IdEmpresas_Entrada, IdCentros, valormediomovimiento, IdLinea = ISNULL(AL.Id_Linea,'SIN_L')
		FROM [vw_Inventario_Traslados]  X
		LEFT JOIN (
			SELECT DISTINCT Id_Linea, Id_Centro, Id_Seccion FROM [v_CF_AgrupacionLinea] WHERE Activado = 1 AND Id_Linea IS NOT NULL
		) AL ON X.IdCentros = AL.Id_Centro AND x.IdSecciones = AL.Id_Seccion
		WHERE Ano_Periodo = YEAR(@FechaConsulta) AND Mes_Periodo = MONTH(@FechaConsulta)
			AND idEmpresas_Entrada IN (1, 5, 6, 19, 20, 24, 25, 27)
			AND X.IdCentros IN (157,83,108,84)
	) X
	GROUP BY IdEmpresas_Entrada,Id_Linea,IdCentros
END

```
