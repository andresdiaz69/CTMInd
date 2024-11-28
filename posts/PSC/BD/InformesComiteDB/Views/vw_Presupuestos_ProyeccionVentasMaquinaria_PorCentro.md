# View: vw_Presupuestos_ProyeccionVentasMaquinaria_PorCentro

## Usa los objetos:
- [[Presupuestos_Maquinaria_Categoria]]
- [[Presupuestos_VariablesParametrizacionesMaquinariaPorCentros]]
- [[Presupuestos_VariablesParametrizacionesMaquinariaPorLineas]]
- [[Presupuestos_VariablesParametrizacionesPorModelos]]
- [[Presupuestos_VehiculosPrecios]]
- [[vw_Presupuestos_CentrosPorLinea]]
- [[vw_Presupuestos_Lineas]]

```sql
CREATE VIEW [dbo].[vw_Presupuestos_ProyeccionVentasMaquinaria_PorCentro] AS
-- =============================================
-- Control de Cambios
-- 2024|11|09 - Alexis - Creado para Listar proyección unidades ventas de maquinaria y calcular valores por mes
-- Modulo - Presupuestos
-- =============================================
WITH PivotedData AS (
	SELECT	IdClase,					CodigoLinea,					Linea,						CodigoCentro, 
			Centro,						CodigoGama,						Gama,						IdCategoriaMaquinaria,
			NombreCategoria,			CodigoModelo,					Modelo,						IdTipo,
			Ano_Periodo,
			[1] AS Enero,				[2] AS Febrero,					[3] AS Marzo,				[4] AS Abril,
			[5] AS Mayo,				[6] AS Junio,					[7] AS Julio,				[8] AS Agosto,						
			[9] AS Septiembre,		    [10] AS Octubre,				[11] AS Noviembre,			[12] AS Diciembre,
			ParticipacionAnual
	FROM 
	(
		SELECT	VPM.IdClase,				CM.CodigoLinea,			L.Nombre_Linea AS Linea,		VPM.CodigoCentro, 
			C.NombreCentro AS Centro,		VP.CodigoGama,			VP.Gama,						VP.IdCategoriaMaquinaria,
			CM.NombreCategoria,				VPM.CodigoModelo,		VP.Modelo,						VPM.IdTipo, 
			VPM.Ano_Periodo,				VPM.Mes_Periodo,		VPM.Valor,						ParticipacionAnual = VPL.Valor * (VPMC.Valor / 100)
		FROM Presupuestos_VariablesParametrizacionesPorModelos VPM
		LEFT JOIN Presupuestos_VehiculosPrecios		AS VP ON VPM.CodigoModelo = VP.CodigoModelo AND VPM.IdClase = VP.idClase AND VPM.Ano_Periodo = VP.AnoPresupuesto
		LEFT JOIN Presupuestos_Maquinaria_Categoria AS CM ON VP.IdCategoriaMaquinaria = CM.IdCategoria
		LEFT JOIN vw_Presupuestos_Lineas AS L ON L.Codigo_Linea = CM.CodigoLinea
		LEFT JOIN vw_Presupuestos_CentrosPorLinea AS C ON C.CodCentro = VPM.CodigoCentro AND C.CodUnidadNegocio = L.Codigo_Linea
		LEFT JOIN Presupuestos_VariablesParametrizacionesMaquinariaPorLineas VPL ON VPL.Ano_Periodo	 = VPM.Ano_Periodo
																				AND VPL.CodigoLinea  = CM.CodigoLinea
																				AND VPL.IdCategoria  = VP.IdCategoriaMaquinaria
																				AND VPL.IdClase      = VPM.IdClase
																				AND VPL.IdTipo       = 156 -- 'Unidades Compañia' 
		LEFT JOIN Presupuestos_VariablesParametrizacionesMaquinariaPorCentros VPMC ON VPMC.Ano_Periodo	   = VPM.Ano_Periodo
																					AND VPMC.CodigoLinea   = CM.CodigoLinea
																					AND VPMC.CodigoCentro  = VPM.CodigoCentro
																					AND VPMC.IdCategoria   = VP.IdCategoriaMaquinaria
																					AND VPMC.IdClase       = VPM.IdClase
																					AND VPMC.IdTipo        = 120 -- '% Participación Centro'


		WHERE CodigoMarca IN (410, 411, 520) AND AplicaPresupuesto = 1
	) AS SourceTable
	PIVOT
	(
		SUM(Valor) 
		FOR Mes_Periodo IN ([1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12])
	) AS PivotTable
) 
SELECT	P.IdClase,							P.CodigoLinea,						P.Linea,							P.CodigoCentro, 				
	P.Centro,								P.CodigoGama,						P.Gama,								P.IdCategoriaMaquinaria,
	P.NombreCategoria,						P.CodigoModelo,						P.Modelo,							P.IdTipo,
	Ano_Periodo,
	ParticipacionAnual,						ISNULL(P.Enero,0)Ene,				ISNULL(P.Febrero,0)Feb,				ISNULL(P.Marzo,0)Mar,
	ISNULL(P.Abril,0)Abr,					ISNULL(P.Mayo,0)May,				ISNULL(P.Junio,0)Jun,				ISNULL(P.Julio,0)Jul,
	ISNULL(P.Agosto,0)Ago,					ISNULL(P.Septiembre,0)Sep,			ISNULL(P.Octubre,0)Oct,				ISNULL(P.Noviembre,0)Nov,
	ISNULL(P.Diciembre,0)Dic,    
	[Total] = ISNULL(P.Enero, 0) + ISNULL(P.Febrero, 0) + ISNULL(P.Marzo, 0) + ISNULL(P.Abril, 0) + ISNULL(P.Mayo, 0) + ISNULL(P.Junio, 0) 
					+ ISNULL(P.Julio, 0) + ISNULL(P.Agosto, 0) + ISNULL(P.Septiembre, 0) + ISNULL(P.Octubre, 0) + ISNULL(P.Noviembre, 0) 
					+ ISNULL(P.Diciembre, 0)
FROM PivotedData P


```
