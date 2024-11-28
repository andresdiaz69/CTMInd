# Stored Procedure: sp_Presupuestos_Balance

## Usa los objetos:
- [[vw_Presupuestos_Balance]]
- [[vw_Presupuestos_BalancePre]]

```sql
CREATE PROCEDURE [dbo].[sp_Presupuestos_Balance]
(	
	-- =============================================
	-- Control de Cambios
	-- 2024|11|01 - Alexis Barreto - Creado para listar el balance junto a las presentaciones
	-- Modulo - Presupuestos
	-- =============================================

	@IdClase SMALLINT,
	@CodigoLinea SMALLINT,
	@CodigoCentro SMALLINT,
	@Ano_Periodo SMALLINT,
	@FechaPresentacion DATETIME
) AS
BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF

	--DECLARE @IdClase SMALLINT = 1, @CodigoLinea SMALLINT = 19, @CodigoCentro SMALLINT = 1, @Ano_Periodo SMALLINT = 2025, @FechaPresentacion DATETIME = '20240901'
	

	SELECT	[B].[IdJerarquia],							[B].[Nivel1],							[B].[Nivel2],
			[B].[Nivel3],								[B].[Nivel4],							[B].[Nivel5],
			[B].[Nivel6],								[B].[CodigoConcepto],					[B].[NombreConcepto],
			[B].[IdClase],								[B].[Clase],							[B].[Editable],
			[B].[UnidadDeMedidaCalculo],				[B].[IdJerarquiaDependencia],			[B].[Ano_Periodo],
			[B].[NombreCentro],							[B].[CodigoCentro],						[B].[CodigoLinea],
			[Pre].[ValorAct] AS [VarlorAnterior],		[B].[Enero],							[B].[Febrero],
			[B].[Marzo],								[B].[Abril],							[B].[Mayo],
			[B].[Junio],								[B].[Julio],							[B].[Agosto],
			[B].[Septiembre],							[B].[Octubre],							[B].[Noviembre],
			[B].[Diciembre],							[B].[Acumulado],						[B].[Porcentaje],
			[B].[ColorFondo],							[B].[ColorLetra],						[B].[Negrilla]

	FROM vw_Presupuestos_Balance B 
	LEFT JOIN (
		SELECT DISTINCT Orden, CodigoConcepto, NombreConcepto, ValorAct
		FROM vw_Presupuestos_BalancePre
		WHERE CodigoLinea = @CodigoLinea 
			AND CodSede = @CodigoCentro
			AND Año = YEAR(@FechaPresentacion)
			AND Mes = MONTH(@FechaPresentacion)
	) Pre ON B.IdJerarquia = Pre.Orden

	WHERE B.IdClase = @IdClase 
		AND B.CodigoLinea = @CodigoLinea 
		AND B.CodigoCentro = @CodigoCentro
		AND B.Ano_Periodo = @Ano_Periodo

	ORDER BY IdJerarquia

END

```
