# Stored Procedure: sp_Presupuestos_FlujoCaja_Consolidado

## Usa los objetos:
- [[vw_Presupuestos_FlujoCajas]]

```sql
CREATE PROCEDURE [dbo].[sp_Presupuestos_FlujoCaja_Consolidado]
(	
	-- =============================================
	-- Control de Cambios
	-- 2024|11|07 - Alexis Barreto - Creado para listar el consolidado del flujo de caja
	-- Modulo - Presupuestos
	-- =============================================

	@IdClase SMALLINT,
	@CodigoLinea SMALLINT,
	@Ano_Periodo SMALLINT
) AS
BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF

	--DECLARE @IdClase SMALLINT = 1, @CodigoLinea SMALLINT = 19, @Ano_Periodo SMALLINT = 2025	

	SELECT	[B].[IdJerarquia],							[B].[Nivel1],								[B].[Nivel2],
			[B].[Nivel3],								[B].[Nivel4],								[B].[Nivel5],
			[B].[Nivel6],								[B].[CodigoConcepto],						[B].[NombreConcepto],
			[B].[IdClase],								[B].[Clase],								[B].[Editable],
			[B].[UnidadDeMedidaCalculo],				[B].[IdJerarquiaDependencia],				[B].[Ano_Periodo],
			[B].[CodigoLinea],							[Enero] = SUM([B].[Enero]),					[Febrero] = SUM([B].[Febrero]),
			[Marzo] = SUM([B].[Marzo]),					[Abril] = SUM([B].[Abril]),					[Mayo] = SUM([B].[Mayo]),
			[Junio] = SUM([B].[Junio]),					[Julio] = SUM([B].[Julio]),					[Agosto] = SUM([B].[Agosto]),
			[Septiembre] = SUM([B].[Septiembre]),		[Octubre] = SUM([B].[Octubre]),				[Noviembre] = SUM([B].[Noviembre]),
			[Diciembre] = SUM([B].[Diciembre]),			[Acumulado] = SUM([B].[Acumulado]),			[B].[ColorFondo],
			[B].[ColorLetra],							[B].[Negrilla]

	FROM vw_Presupuestos_FlujoCajas B 
	
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
