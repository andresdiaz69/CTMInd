# Stored Procedure: sp_Presupuestos_Balance_Consolidado

## Usa los objetos:
- [[vw_Presupuestos_Balance]]
- [[vw_Presupuestos_BalancePre]]

```sql
CREATE PROCEDURE [dbo].[sp_Presupuestos_Balance_Consolidado]
(	
	-- =============================================
	-- Control de Cambios
	-- 2024|11|07 - Alexis Barreto - Creado para listar el acumulado del balance junto a las presentaciones
	-- Modulo - Presupuestos
	-- =============================================

	@IdClase SMALLINT,
	@CodigoLinea SMALLINT,
	@Ano_Periodo SMALLINT,
	@FechaPresentacion DATETIME
) AS
BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF

	--DECLARE @IdClase SMALLINT = 1, @CodigoLinea SMALLINT = 19, @Ano_Periodo SMALLINT = 2025, @FechaPresentacion DATETIME = '20241001'
	

	SELECT	[B].[IdJerarquia],							[B].[Nivel1],								[B].[Nivel2],
			[B].[Nivel3],								[B].[Nivel4],								[B].[Nivel5],
			[B].[Nivel6],								[B].[CodigoConcepto],						[B].[NombreConcepto],
			[B].[IdClase],								[B].[Clase],								[B].[Editable],
			[B].[UnidadDeMedidaCalculo],				[B].[IdJerarquiaDependencia],				[B].[Ano_Periodo],
			[B].[CodigoLinea],							[VarlorAnterior] = SUM([Pre].[ValorAct]),	[Enero] = SUM([B].[Enero]),
			[Febrero] = SUM([B].[Febrero]),				[Marzo] = SUM([B].[Marzo]),					[Abril] = SUM([B].[Abril]),
			[Mayo] = SUM([B].[Mayo]),					[Junio] = SUM([B].[Junio]),					[Julio] = SUM([B].[Julio]),
			[Agosto] = SUM([B].[Agosto]),				[Septiembre] = SUM([B].[Septiembre]),		[Octubre] = SUM([B].[Octubre]),
			[Noviembre] = SUM([B].[Noviembre]),			[Diciembre] = SUM([B].[Diciembre]),			[Acumulado] = SUM([B].[Acumulado]),						
			[B].[ColorFondo],							[B].[ColorLetra],							[B].[Negrilla]

	FROM vw_Presupuestos_Balance B 
	LEFT JOIN (
		SELECT DISTINCT Orden, CodigoConcepto, NombreConcepto, ValorAct, CodSede
		FROM vw_Presupuestos_BalancePre
		WHERE CodigoLinea = @CodigoLinea 
			AND Año = YEAR(@FechaPresentacion)
			AND Mes = MONTH(@FechaPresentacion)
	) Pre ON B.IdJerarquia = Pre.Orden AND B.CodigoCentro = Pre.CodSede

	WHERE B.IdClase = @IdClase 
		AND B.CodigoLinea = @CodigoLinea 
		AND B.Ano_Periodo = @Ano_Periodo

	GROUP BY	[B].[IdJerarquia],							[B].[Nivel1],								[B].[Nivel2],
				[B].[Nivel3],								[B].[Nivel4],								[B].[Nivel5],
				[B].[Nivel6],								[B].[CodigoConcepto],						[B].[NombreConcepto],
				[B].[IdClase],								[B].[Clase],								[B].[Editable],
				[B].[UnidadDeMedidaCalculo],				[B].[IdJerarquiaDependencia],				[B].[Ano_Periodo],
				[B].[CodigoLinea],							[B].[ColorFondo],							[B].[ColorLetra],
				[B].[Negrilla]
	ORDER BY IdJerarquia
	
END

```
