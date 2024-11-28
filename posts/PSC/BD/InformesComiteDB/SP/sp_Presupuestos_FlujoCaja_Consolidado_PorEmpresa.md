# Stored Procedure: sp_Presupuestos_FlujoCaja_Consolidado_PorEmpresa

## Usa los objetos:
- [[Presupuestos_PesoLineaPorEmpresa]]
- [[vw_Presupuestos_FlujoCajas]]
- [[vw_Presupuestos_Lineas]]

```sql

CREATE PROCEDURE [dbo].[sp_Presupuestos_FlujoCaja_Consolidado_PorEmpresa]
(	
	-- =============================================
	-- Control de Cambios
	-- 2024|11|13 - Wilder Chacón Rojas - Creado para listar el consolidado del flujo de caja por empresa
	-- Modulo - Presupuestos
	-- =============================================

	@IdClase SMALLINT,
	@CodigoEmpresa SMALLINT,
	@Ano_Periodo SMALLINT
) AS
BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF

	--DECLARE @IdClase SMALLINT = 1, @CodigoEmpresa SMALLINT = 1, @Ano_Periodo SMALLINT = 2025	

	SELECT	a.IdJerarquia,						a.Nivel1,								a.Nivel2,
			a.Nivel3,							a.Nivel4,								a.Nivel5,
			a.Nivel6,							a.CodigoConcepto,						a.NombreConcepto,
			a.IdClase,							a.Clase,								a.Editable,
			a.UnidadDeMedidaCalculo,			a.IdJerarquiaDependencia,				a.Ano_Periodo,
			Enero = SUM(a.Enero),				Febrero = SUM(a.Febrero),				Marzo = SUM(a.Marzo),	
			Abril = SUM(a.Abril),				Mayo = SUM(a.Mayo),						Junio = SUM(a.Junio),		
			Julio = SUM(a.Julio),				Agosto = SUM(a.Agosto),					Septiembre = SUM(a.Septiembre),	
			Octubre = SUM(a.Octubre),			Noviembre = SUM(a.Noviembre),			Diciembre = SUM(a.Diciembre),		
			Acumulado = SUM(a.Acumulado),		a.ColorFondo,							a.ColorLetra,	
			a.Negrilla

	FROM
	(
		SELECT	B.IdJerarquia,							B.Nivel1,								B.Nivel2,
				B.Nivel3,								B.Nivel4,								B.Nivel5,
				B.Nivel6,								B.CodigoConcepto,						B.NombreConcepto, 
				B.CodigoLinea,							pl.CodEmpresa,								B.CodigoCentro,
				B.IdClase,								B.Clase,								B.Editable,
				B.UnidadDeMedidaCalculo,				B.IdJerarquiaDependencia,				B.Ano_Periodo,
				CASE WHEN CodEmpresa = 1 AND B.CodigoLinea = 418 THEN SUM(B.Enero) * PorcentajeParticipacion / 100
						WHEN CodEmpresa = 6 AND B.CodigoLinea = 418 THEN SUM(B.Enero) * PorcentajeParticipacion / 100
						WHEN CodEmpresa = 1 AND B.CodigoLinea = 4 AND CodigoCentro = 48 THEN SUM(B.Enero) 
						WHEN CodEmpresa = 6 AND B.CodigoLinea = 4 AND CodigoCentro = 78 THEN SUM(B.Enero) 
						ELSE SUM(B.Enero)
						END Enero,
				CASE WHEN CodEmpresa = 1 AND B.CodigoLinea = 418 THEN SUM(B.Febrero) * PorcentajeParticipacion / 100
						WHEN CodEmpresa = 6 AND B.CodigoLinea = 418 THEN SUM(B.Febrero) * PorcentajeParticipacion / 100
						WHEN CodEmpresa = 1 AND B.CodigoLinea = 4 AND CodigoCentro = 48 THEN SUM(B.Febrero) 
						WHEN CodEmpresa = 6 AND B.CodigoLinea = 4 AND CodigoCentro = 78 THEN SUM(B.Febrero) 
						ELSE SUM(B.Febrero)
						END Febrero,
				CASE WHEN CodEmpresa = 1 AND B.CodigoLinea = 418 THEN SUM(B.Marzo) * PorcentajeParticipacion / 100
						WHEN CodEmpresa = 6 AND B.CodigoLinea = 418 THEN SUM(B.Marzo) * PorcentajeParticipacion / 100
						WHEN CodEmpresa = 1 AND B.CodigoLinea = 4 AND CodigoCentro = 48 THEN SUM(B.Marzo) 
						WHEN CodEmpresa = 6 AND B.CodigoLinea = 4 AND CodigoCentro = 78 THEN SUM(B.Marzo) 
						ELSE SUM(B.Marzo)
						END Marzo,
				CASE WHEN CodEmpresa = 1 AND B.CodigoLinea = 418 THEN SUM(B.Abril) * PorcentajeParticipacion / 100
						WHEN CodEmpresa = 6 AND B.CodigoLinea = 418 THEN SUM(B.Abril) * PorcentajeParticipacion / 100
						WHEN CodEmpresa = 1 AND B.CodigoLinea = 4 AND CodigoCentro = 48 THEN SUM(B.Abril) 
						WHEN CodEmpresa = 6 AND B.CodigoLinea = 4 AND CodigoCentro = 78 THEN SUM(B.Abril) 
						ELSE SUM(B.Abril)
						END Abril,
				CASE WHEN CodEmpresa = 1 AND B.CodigoLinea = 418 THEN SUM(B.Mayo) * PorcentajeParticipacion / 100
						WHEN CodEmpresa = 6 AND B.CodigoLinea = 418 THEN SUM(B.Mayo) * PorcentajeParticipacion / 100
						WHEN CodEmpresa = 1 AND B.CodigoLinea = 4 AND CodigoCentro = 48 THEN SUM(B.Mayo) 
						WHEN CodEmpresa = 6 AND B.CodigoLinea = 4 AND CodigoCentro = 78 THEN SUM(B.Mayo) 
						ELSE SUM(B.Mayo)
						END Mayo,
				CASE WHEN CodEmpresa = 1 AND B.CodigoLinea = 418 THEN SUM(B.Junio) * PorcentajeParticipacion / 100
						WHEN CodEmpresa = 6 AND B.CodigoLinea = 418 THEN SUM(B.Junio) * PorcentajeParticipacion / 100
						WHEN CodEmpresa = 1 AND B.CodigoLinea = 4 AND CodigoCentro = 48 THEN SUM(B.Junio) 
						WHEN CodEmpresa = 6 AND B.CodigoLinea = 4 AND CodigoCentro = 78 THEN SUM(B.Junio) 
						ELSE SUM(B.Junio)
						END Junio,
				CASE WHEN CodEmpresa = 1 AND B.CodigoLinea = 418 THEN SUM(B.Julio) * PorcentajeParticipacion / 100
						WHEN CodEmpresa = 6 AND B.CodigoLinea = 418 THEN SUM(B.Julio) * PorcentajeParticipacion / 100
						WHEN CodEmpresa = 1 AND B.CodigoLinea = 4 AND CodigoCentro = 48 THEN SUM(B.Julio) 
						WHEN CodEmpresa = 6 AND B.CodigoLinea = 4 AND CodigoCentro = 78 THEN SUM(B.Julio) 
						ELSE SUM(B.Julio)
						END Julio,
				CASE WHEN CodEmpresa = 1 AND B.CodigoLinea = 418 THEN SUM(B.Agosto) * PorcentajeParticipacion / 100
						WHEN CodEmpresa = 6 AND B.CodigoLinea = 418 THEN SUM(B.Agosto) * PorcentajeParticipacion / 100
						WHEN CodEmpresa = 1 AND B.CodigoLinea = 4 AND CodigoCentro = 48 THEN SUM(B.Agosto) 
						WHEN CodEmpresa = 6 AND B.CodigoLinea = 4 AND CodigoCentro = 78 THEN SUM(B.Agosto) 
						ELSE SUM(B.Agosto)
						END Agosto,
				CASE WHEN CodEmpresa = 1 AND B.CodigoLinea = 418 THEN SUM(B.Septiembre) * PorcentajeParticipacion / 100
						WHEN CodEmpresa = 6 AND B.CodigoLinea = 418 THEN SUM(B.Septiembre) * PorcentajeParticipacion / 100
						WHEN CodEmpresa = 1 AND B.CodigoLinea = 4 AND CodigoCentro = 48 THEN SUM(B.Septiembre) 
						WHEN CodEmpresa = 6 AND B.CodigoLinea = 4 AND CodigoCentro = 78 THEN SUM(B.Septiembre) 
						ELSE SUM(B.Septiembre)
						END Septiembre,
				CASE WHEN CodEmpresa = 1 AND B.CodigoLinea = 418 THEN SUM(B.Octubre) * PorcentajeParticipacion / 100
						WHEN CodEmpresa = 6 AND B.CodigoLinea = 418 THEN SUM(B.Octubre) * PorcentajeParticipacion / 100
						WHEN CodEmpresa = 1 AND B.CodigoLinea = 4 AND CodigoCentro = 48 THEN SUM(B.Octubre) 
						WHEN CodEmpresa = 6 AND B.CodigoLinea = 4 AND CodigoCentro = 78 THEN SUM(B.Octubre) 
						ELSE SUM(B.Octubre)
						END Octubre,
				CASE WHEN CodEmpresa = 1 AND B.CodigoLinea = 418 THEN SUM(B.Noviembre) * PorcentajeParticipacion / 100
						WHEN CodEmpresa = 6 AND B.CodigoLinea = 418 THEN SUM(B.Noviembre) * PorcentajeParticipacion / 100
						WHEN CodEmpresa = 1 AND B.CodigoLinea = 4 AND CodigoCentro = 48 THEN SUM(B.Noviembre) 
						WHEN CodEmpresa = 6 AND B.CodigoLinea = 4 AND CodigoCentro = 78 THEN SUM(B.Noviembre) 
						ELSE SUM(B.Noviembre)
						END Noviembre,
				CASE WHEN CodEmpresa = 1 AND B.CodigoLinea = 418 THEN SUM(B.Diciembre) * PorcentajeParticipacion / 100
						WHEN CodEmpresa = 6 AND B.CodigoLinea = 418 THEN SUM(B.Diciembre) * PorcentajeParticipacion / 100
						WHEN CodEmpresa = 1 AND B.CodigoLinea = 4 AND CodigoCentro = 48 THEN SUM(B.Diciembre) 
						WHEN CodEmpresa = 6 AND B.CodigoLinea = 4 AND CodigoCentro = 78 THEN SUM(B.Diciembre) 
						ELSE SUM(B.Diciembre)
						END Diciembre,
				CASE WHEN CodEmpresa = 1 AND B.CodigoLinea = 418 THEN SUM(B.Acumulado) * PorcentajeParticipacion / 100
						WHEN CodEmpresa = 6 AND B.CodigoLinea = 418 THEN SUM(B.Acumulado) * PorcentajeParticipacion / 100
						WHEN CodEmpresa = 1 AND B.CodigoLinea = 4 AND CodigoCentro = 48 THEN SUM(B.Acumulado) 
						WHEN CodEmpresa = 6 AND B.CodigoLinea = 4 AND CodigoCentro = 78 THEN SUM(B.Acumulado) 
						ELSE SUM(B.Acumulado)
						END Acumulado,			
				B.ColorFondo,					B.ColorLetra,							B.Negrilla

		FROM vw_Presupuestos_FlujoCajas B 
		LEFT JOIN vw_Presupuestos_Lineas pl ON pl.Codigo_Linea = B.CodigoLinea
		LEFT JOIN Presupuestos_PesoLineaPorEmpresa ppl ON ppl.CodigoEmpresa = pl.CodEmpresaAgrupada AND ppl.CodigoLinea = B.CodigoLinea

		WHERE B.IdClase = @IdClase 
			AND pl.CodEmpresaAgrupada = @CodigoEmpresa 
			AND B.Ano_Periodo = @Ano_Periodo

		GROUP BY	B.IdJerarquia,							B.Nivel1,								B.Nivel2,
					B.Nivel3,								B.Nivel4,								B.Nivel5,
					B.Nivel6,								B.CodigoConcepto,						B.NombreConcepto, 
					B.CodigoLinea,							pl.CodEmpresa,							B.CodigoCentro,
					B.IdClase,								B.Clase,								B.Editable,
					B.UnidadDeMedidaCalculo,				B.IdJerarquiaDependencia,				B.Ano_Periodo,
					B.ColorFondo,							B.ColorLetra,							B.Negrilla,
					ppl.PorcentajeParticipacion
	)a

	GROUP BY	IdJerarquia,						Nivel1,								Nivel2,
				Nivel3,								Nivel4,								Nivel5,
				Nivel6,								CodigoConcepto,						NombreConcepto,
				IdClase,							Clase,								Editable,
				UnidadDeMedidaCalculo,				IdJerarquiaDependencia,				Ano_Periodo,
				ColorFondo,							ColorLetra,							Negrilla
	ORDER BY IdJerarquia
	
END

```
