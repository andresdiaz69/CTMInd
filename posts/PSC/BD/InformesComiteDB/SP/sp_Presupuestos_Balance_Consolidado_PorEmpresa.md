# Stored Procedure: sp_Presupuestos_Balance_Consolidado_PorEmpresa

## Usa los objetos:
- [[Presupuestos_PesoLineaPorEmpresa]]
- [[vw_Presupuestos_Balance]]
- [[vw_Presupuestos_BalancePre]]
- [[vw_Presupuestos_Lineas]]

```sql
CREATE PROCEDURE [dbo].[sp_Presupuestos_Balance_Consolidado_PorEmpresa]
(	
	-- =============================================
	-- Control de Cambios
	-- 2024|11|12 - Wilder Chacón- Creado para listar el acumulado del balance junto a las presentaciones
	-- 2024|11|27 - Alexis Barreto - Se modifica el CodEmpresa por CodEmpresaAgupada - Se cambian los filtros quitando los datos quemados por los que recibe el sp.
	-- Modulo - Presupuestos
	-- =============================================

	@IdClase SMALLINT,
	@CodigoEmpresa SMALLINT,
	@Ano_Periodo SMALLINT,
	@FechaPresentacion DATETIME

) AS
BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF

	--DECLARE @IdClase SMALLINT = 1, @CodigoEmpresa SMALLINT = 1, @Ano_Periodo SMALLINT = 2025, @FechaPresentacion DATETIME = '20241113'
	

	SELECT  [IdJerarquia],							[Nivel1],								[Nivel2],
		[Nivel3],									[Nivel4],								[Nivel5],
		[Nivel6],									[CodigoConcepto],						[NombreConcepto], 
		[NombreEmpresaAgrupada],					[IdClase],								[Clase],
		[Editable],									[UnidadDeMedidaCalculo],				[IdJerarquiaDependencia],
		[Ano_Periodo],								[CodEmpresa] = [CodEmpresaAgrupada],	[VarlorAnterior] = SUM([VarlorAnterior]),	
		[Enero] = SUM([Enero]),						[Febrero] = SUM([Febrero]),				[Marzo] = SUM([Marzo]),
		[Abril] = SUM([Abril]),						[Mayo] = SUM([Mayo]),					[Junio] = SUM([Junio]),
		[Julio] = SUM([Julio]),						[Agosto] = SUM([Agosto]),				[Septiembre] = SUM([Septiembre]),
		[Octubre] = SUM([Octubre]),					[Noviembre] = SUM([Noviembre]),			[Diciembre] = SUM([Diciembre]),
		[Acumulado] = SUM([Acumulado]),				[ColorFondo],							[ColorLetra],
		[Negrilla]
			 
			FROM(

				SELECT	[B].[IdJerarquia],							[B].[Nivel1],								[B].[Nivel2],
						[B].[Nivel3],								[B].[Nivel4],								[B].[Nivel5],
						[B].[Nivel6],								[B].[CodigoConcepto],						[B].[NombreConcepto], 
						[B].[CodigoLinea],							[pl].[Nombre_Linea],						[pl].[NombreEmpresaAgrupada],
						[B].[IdClase],								[B].[Clase],								[B].[Editable],
						[B].[UnidadDeMedidaCalculo],				[B].[IdJerarquiaDependencia],				[B].[Ano_Periodo],
						[CodEmpresaAgrupada] = CONVERT(SMALLINT,[pl].[CodEmpresaAgrupada]),		--[VarlorAnterior] = SUM(ISNULL([Pre].[ValorAct],0)),	
						CASE WHEN CodEmpresa = 1 AND B.CodigoLinea = 418 THEN SUM(ISNULL([Pre].[ValorAct],0)) * PorcentajeParticipacion / 100
								WHEN CodEmpresa = 6 AND B.CodigoLinea = 418 THEN SUM(ISNULL([Pre].[ValorAct],0)) * PorcentajeParticipacion / 100
								WHEN CodEmpresa = 1 AND B.CodigoLinea = 4 AND B.CodigoCentro = 48 THEN SUM(ISNULL([Pre].[ValorAct],0))
								WHEN CodEmpresa = 6 AND B.CodigoLinea = 4 AND B.CodigoCentro = 78 THEN SUM(ISNULL([Pre].[ValorAct],0))
								ELSE SUM(ISNULL([Pre].[ValorAct],0))
								END [VarlorAnterior],
						CASE WHEN CodEmpresa = 1 AND B.CodigoLinea = 418 THEN SUM([B].[Enero]) * PorcentajeParticipacion / 100
								WHEN CodEmpresa = 6 AND B.CodigoLinea = 418 THEN SUM([B].[Enero]) * PorcentajeParticipacion / 100
								WHEN CodEmpresa = 1 AND B.CodigoLinea = 4 AND CodigoCentro = 48 THEN SUM([B].[Enero]) 
								WHEN CodEmpresa = 6 AND B.CodigoLinea = 4 AND CodigoCentro = 78 THEN SUM([B].[Enero]) 
								ELSE SUM([B].[Enero])
								END [Enero],
						CASE WHEN CodEmpresa = 1 AND B.CodigoLinea = 418 THEN SUM([B].[Febrero]) * PorcentajeParticipacion / 100
								WHEN CodEmpresa = 6 AND B.CodigoLinea = 418 THEN SUM([B].[Febrero]) * PorcentajeParticipacion / 100
								WHEN CodEmpresa = 1 AND B.CodigoLinea = 4 AND CodigoCentro = 48 THEN SUM([B].[Febrero]) 
								WHEN CodEmpresa = 6 AND B.CodigoLinea = 4 AND CodigoCentro = 78 THEN SUM([B].[Febrero]) 
								ELSE SUM([B].[Febrero])
								END [Febrero],
						CASE WHEN CodEmpresa = 1 AND B.CodigoLinea = 418 THEN SUM([B].[Marzo]) * PorcentajeParticipacion / 100
								WHEN CodEmpresa = 6 AND B.CodigoLinea = 418 THEN SUM([B].[Marzo]) * PorcentajeParticipacion / 100
								WHEN CodEmpresa = 1 AND B.CodigoLinea = 4 AND CodigoCentro = 48 THEN SUM([B].[Marzo]) 
								WHEN CodEmpresa = 6 AND B.CodigoLinea = 4 AND CodigoCentro = 78 THEN SUM([B].[Marzo]) 
								ELSE SUM([B].[Marzo])
								END [Marzo],
						CASE WHEN CodEmpresa = 1 AND B.CodigoLinea = 418 THEN SUM([B].[Abril]) * PorcentajeParticipacion / 100
								WHEN CodEmpresa = 6 AND B.CodigoLinea = 418 THEN SUM([B].[Abril]) * PorcentajeParticipacion / 100
								WHEN CodEmpresa = 1 AND B.CodigoLinea = 4 AND CodigoCentro = 48 THEN SUM([B].[Abril]) 
								WHEN CodEmpresa = 6 AND B.CodigoLinea = 4 AND CodigoCentro = 78 THEN SUM([B].[Abril]) 
								ELSE SUM([B].[Abril])
								END [Abril],
						CASE WHEN CodEmpresa = 1 AND B.CodigoLinea = 418 THEN SUM([B].[Mayo]) * PorcentajeParticipacion / 100
								WHEN CodEmpresa = 6 AND B.CodigoLinea = 418 THEN SUM([B].[Mayo]) * PorcentajeParticipacion / 100
								WHEN CodEmpresa = 1 AND B.CodigoLinea = 4 AND CodigoCentro = 48 THEN SUM([B].[Mayo]) 
								WHEN CodEmpresa = 6 AND B.CodigoLinea = 4 AND CodigoCentro = 78 THEN SUM([B].[Mayo]) 
								ELSE SUM([B].[Mayo])
								END [Mayo],
						CASE WHEN CodEmpresa = 1 AND B.CodigoLinea = 418 THEN SUM([B].[Junio]) * PorcentajeParticipacion / 100
								WHEN CodEmpresa = 6 AND B.CodigoLinea = 418 THEN SUM([B].[Junio]) * PorcentajeParticipacion / 100
								WHEN CodEmpresa = 1 AND B.CodigoLinea = 4 AND CodigoCentro = 48 THEN SUM([B].[Junio]) 
								WHEN CodEmpresa = 6 AND B.CodigoLinea = 4 AND CodigoCentro = 78 THEN SUM([B].[Junio]) 
								ELSE SUM([B].[Junio])
								END [Junio],
						CASE WHEN CodEmpresa = 1 AND B.CodigoLinea = 418 THEN SUM([B].[Julio]) * PorcentajeParticipacion / 100
								WHEN CodEmpresa = 6 AND B.CodigoLinea = 418 THEN SUM([B].[Julio]) * PorcentajeParticipacion / 100
								WHEN CodEmpresa = 1 AND B.CodigoLinea = 4 AND CodigoCentro = 48 THEN SUM([B].[Julio]) 
								WHEN CodEmpresa = 6 AND B.CodigoLinea = 4 AND CodigoCentro = 78 THEN SUM([B].[Julio]) 
								ELSE SUM([B].[Julio])
								END [Julio],
						CASE WHEN CodEmpresa = 1 AND B.CodigoLinea = 418 THEN SUM([B].[Agosto]) * PorcentajeParticipacion / 100
								WHEN CodEmpresa = 6 AND B.CodigoLinea = 418 THEN SUM([B].[Agosto]) * PorcentajeParticipacion / 100
								WHEN CodEmpresa = 1 AND B.CodigoLinea = 4 AND CodigoCentro = 48 THEN SUM([B].[Agosto]) 
								WHEN CodEmpresa = 6 AND B.CodigoLinea = 4 AND CodigoCentro = 78 THEN SUM([B].[Agosto]) 
								ELSE SUM([B].[Agosto])
								END [Agosto],
						CASE WHEN CodEmpresa = 1 AND B.CodigoLinea = 418 THEN SUM([B].[Septiembre]) * PorcentajeParticipacion / 100
								WHEN CodEmpresa = 6 AND B.CodigoLinea = 418 THEN SUM([B].[Septiembre]) * PorcentajeParticipacion / 100
								WHEN CodEmpresa = 1 AND B.CodigoLinea = 4 AND CodigoCentro = 48 THEN SUM([B].[Septiembre]) 
								WHEN CodEmpresa = 6 AND B.CodigoLinea = 4 AND CodigoCentro = 78 THEN SUM([B].[Septiembre]) 
								ELSE SUM([B].[Septiembre])
								END [Septiembre],
						CASE WHEN CodEmpresa = 1 AND B.CodigoLinea = 418 THEN SUM([B].[Octubre]) * PorcentajeParticipacion / 100
								WHEN CodEmpresa = 6 AND B.CodigoLinea = 418 THEN SUM([B].[Octubre]) * PorcentajeParticipacion / 100
								WHEN CodEmpresa = 1 AND B.CodigoLinea = 4 AND CodigoCentro = 48 THEN SUM([B].[Octubre]) 
								WHEN CodEmpresa = 6 AND B.CodigoLinea = 4 AND CodigoCentro = 78 THEN SUM([B].[Octubre]) 
								ELSE SUM([B].[Octubre])
								END [Octubre],
						CASE WHEN CodEmpresa = 1 AND B.CodigoLinea = 418 THEN SUM([B].[Noviembre]) * PorcentajeParticipacion / 100
								WHEN CodEmpresa = 6 AND B.CodigoLinea = 418 THEN SUM([B].[Noviembre]) * PorcentajeParticipacion / 100
								WHEN CodEmpresa = 1 AND B.CodigoLinea = 4 AND CodigoCentro = 48 THEN SUM([B].[Noviembre]) 
								WHEN CodEmpresa = 6 AND B.CodigoLinea = 4 AND CodigoCentro = 78 THEN SUM([B].[Noviembre]) 
								ELSE SUM([B].[Noviembre])
								END [Noviembre],
						CASE WHEN CodEmpresa = 1 AND B.CodigoLinea = 418 THEN SUM([B].[Diciembre]) * PorcentajeParticipacion / 100
								WHEN CodEmpresa = 6 AND B.CodigoLinea = 418 THEN SUM([B].[Diciembre]) * PorcentajeParticipacion / 100
								WHEN CodEmpresa = 1 AND B.CodigoLinea = 4 AND CodigoCentro = 48 THEN SUM([B].[Diciembre]) 
								WHEN CodEmpresa = 6 AND B.CodigoLinea = 4 AND CodigoCentro = 78 THEN SUM([B].[Diciembre]) 
								ELSE SUM([B].[Diciembre])
								END [Diciembre],
						CASE WHEN CodEmpresa = 1 AND B.CodigoLinea = 418 THEN SUM([B].[Acumulado]) * PorcentajeParticipacion / 100
								WHEN CodEmpresa = 6 AND B.CodigoLinea = 418 THEN SUM([B].[Acumulado]) * PorcentajeParticipacion / 100
								WHEN CodEmpresa = 1 AND B.CodigoLinea = 4 AND CodigoCentro = 48 THEN SUM([B].[Acumulado]) 
								WHEN CodEmpresa = 6 AND B.CodigoLinea = 4 AND CodigoCentro = 78 THEN SUM([B].[Acumulado]) 
								ELSE SUM([B].[Acumulado])
								END [Acumulado],					
						[B].[ColorFondo],							[B].[ColorLetra],							[B].[Negrilla]

					FROM vw_Presupuestos_Balance B 
					LEFT JOIN (
						SELECT DISTINCT Orden, CodigoConcepto, NombreConcepto, ValorAct, CodSede
						FROM vw_Presupuestos_BalancePre
						WHERE Año = YEAR(@FechaPresentacion)
							AND Mes = MONTH(@FechaPresentacion)
					) Pre ON B.IdJerarquia = Pre.Orden AND B.CodigoCentro = Pre.CodSede
					LEFT JOIN vw_Presupuestos_Lineas pl ON pl.Codigo_Linea = B.CodigoLinea
					LEFT JOIN Presupuestos_PesoLineaPorEmpresa ppl ON ppl.CodigoEmpresa = pl.CodEmpresaAgrupada AND ppl.CodigoLinea = B.CodigoLinea

					WHERE B.IdClase = @IdClase
						AND pl.CodEmpresaAgrupada = @CodigoEmpresa
						AND B.Ano_Periodo = @Ano_Periodo

					GROUP BY	[B].[IdJerarquia],							[B].[Nivel1],								[B].[Nivel2],
								[B].[Nivel3],								[B].[Nivel4],								[B].[Nivel5], 
								[ppl].[PorcentajeParticipacion],			[B].[Nivel6],								[B].[CodigoConcepto],
								[B].[NombreConcepto],						[B].[CodigoLinea],							[pl].[Nombre_Linea],
								[B].[CodigoCentro],							[pl].[NombreEmpresaAgrupada],				[B].[IdClase],
								[B].[Clase],								[B].[Editable],								[B].[UnidadDeMedidaCalculo],
								[B].[IdJerarquiaDependencia],				[B].[Ano_Periodo],							[pl].[CodEmpresa],
								[B].[ColorFondo],							[B].[ColorLetra],							[B].[Negrilla],
								[pl].[CodEmpresaAgrupada]
								--ORDER BY IdJerarquia
					
				)a
	GROUP BY	[IdJerarquia],							[Nivel1],								[Nivel2],
				[Nivel3],								[Nivel4],								[Nivel5],
				[Nivel6],								[CodigoConcepto],						[NombreConcepto],  NombreEmpresaAgrupada,
				[IdClase],								[Clase],								[Editable],
				[UnidadDeMedidaCalculo],				[IdJerarquiaDependencia],				[Ano_Periodo],
				[CodEmpresaAgrupada],					[ColorFondo],							[ColorLetra],
				[Negrilla]
	ORDER BY IdJerarquia
END

```
