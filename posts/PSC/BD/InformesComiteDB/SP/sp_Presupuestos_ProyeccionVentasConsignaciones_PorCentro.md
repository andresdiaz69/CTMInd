# Stored Procedure: sp_Presupuestos_ProyeccionVentasConsignaciones_PorCentro

## Usa los objetos:
- [[Presupuestos_VariablesParametrizacionesPorCentros]]
- [[Presupuestos_VariablesParametrizacionesPorLineas]]
- [[Presupuestos_VariablesTipos]]
- [[vw_Presupuestos_Variables_PorModelos]]

```sql

CREATE PROCEDURE [dbo].[sp_Presupuestos_ProyeccionVentasConsignaciones_PorCentro] 
(
    @Ano_Periodo  SMALLINT,
	@CodigoCentro SMALLINT,
	@CodigoLinea  SMALLINT,
	@idClase      SMALLINT
) AS   
BEGIN
	-- =============================================
	-- Control de Cambios
	-- 2024|10|30 - Alexis Barreto - Creado para Listar proyección unidades ventas de consignaciones y calcular valores por mes
	-- Modulo - Presupuestos
	-- =============================================

	--declare @Ano_Periodo  SMALLINT=2025;
	--declare @CodigoCentro SMALLINT=3;
	--declare @CodigoLinea  SMALLINT=7;
	--declare @idClase      SMALLINT=1;
	SET NOCOUNT ON
	SET FMTONLY OFF

	DECLARE @QParticipacionCentro DECIMAL (18, 2);

	SET @QParticipacionCentro = (
		SELECT valor 
		  FROM [Presupuestos_VariablesParametrizacionesPorLineas] 
		 WHERE IdTipo      = 168 -- 'Unidades Compañia' 
		   AND Ano_Periodo = @Ano_Periodo 
		   AND CodigoLinea = @CodigoLinea
		   and IdClase     = @idClase
	) * (
		SELECT valor 
		  FROM Presupuestos_VariablesParametrizacionesPorCentros vpc
	     inner join Presupuestos_VariablesTipos vt ON vt.IdTipo = vpc.IdTipo
		 WHERE vpc.IdTipo     = 169 -- '% Participación Centro' 
		   AND IdSubCategoria = 27 -- 'Vehiculos Nuevos' 
		   AND CodigoCentro   = @CodigoCentro 
		   AND Ano_Periodo    = @Ano_Periodo
		   and IdClase        = @idClase
	);
 
	SELECT Ano_Periodo,	   CodigoLinea,	   NombreLinea, 
		   CodigoCentro,   NombreCentro,   CodigoGama,	
		   Gama,		   CodigoModelo,   Modelo,
		   Valor,		   [1] AS Ene,	   [2] AS Feb,
		   [3] AS Mar,	   [4] AS Abr,	   [5] AS May,
		   [6] AS Jun,	   [7] AS Jul,	   [8] AS Ago,
		   [9] AS Sep,	   [10] AS Oct,	   [11] AS Nov,
		   [12] AS Dic, 	   
		   [1] + [2] + [3] + [4] + [5] + [6] + [7] + [8] + [9] + [10] + [11] + [12] AS Total,
		   Porcentaje_Consignacion, UsadosConsignacion
	FROM (
		SELECT vpm.Ano_Periodo,	   vpm.CodigoLinea,			vpm.NombreLinea, 		
			   vpm.CodigoCentro,   vpm.NombreCentro,		vpm.CodigoGama,			
			   vpm.Gama,		   vpm.CodigoModelo,		vpm.Modelo,
			   vpm.Valor,		   vpc.Mes_Periodo Mes,		vpm.Porcentaje_Consignacion,
			   vpm.UsadosConsignacion,				   
			   ROUND(vpm.Valor * @QParticipacionCentro * vpc.valor / 1000000, 0) AS ValorCalculado
		FROM vw_Presupuestos_Variables_PorModelos vpm
		LEFT JOIN Presupuestos_VariablesParametrizacionesPorCentros vpc ON vpc.Ano_Periodo  = vpm.Ano_Periodo 
																		AND vpc.CodigoCentro = vpm.CodigoCentro 
																		AND vpc.IdTipo       = 133 --'Estacionalidad VN'
																		and vpc.IdClase      = vpm.IdClase
	 	WHERE vpm.Ano_Periodo  = @Ano_Periodo 
			AND vpm.CodigoCentro = @CodigoCentro
			and vpm.idclase      = @idClase
			and vpm.UsadosConsignacion = 1
	) AS SourceTable
	PIVOT (
		SUM(ValorCalculado)
		FOR Mes IN ([1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12])
	) AS PivotTable

END

```
