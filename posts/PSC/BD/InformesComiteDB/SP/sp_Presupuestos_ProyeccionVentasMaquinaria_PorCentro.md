# Stored Procedure: sp_Presupuestos_ProyeccionVentasMaquinaria_PorCentro

## Usa los objetos:
- [[Presupuestos_VariablesParametrizacionesMaquinariaPorCentros]]
- [[Presupuestos_VariablesParametrizacionesMaquinariaPorLineas]]
- [[vw_Presupuestos_Variables_PorModelos]]

```sql


CREATE PROCEDURE [dbo].[sp_Presupuestos_ProyeccionVentasMaquinaria_PorCentro] (
    @Ano_Periodo  SMALLINT,
	@CodigoCentro SMALLINT,
	@idClase      SMALLINT,
	@CodigoLinea  SMALLINT
) AS   

BEGIN
	-- =============================================
	-- Control de Cambios
	-- 2024|08|15 - Wilder Chacón - Creado para Listar proyección unidades ventas vn y calcular valores por mes
	-- Modulo - Presupuestos
	-- =============================================

	--declare @Ano_Periodo  SMALLINT=2025;
	--declare @CodigoCentro SMALLINT=124;
	--declare @idClase      SMALLINT=1;
	--declare @CodigoLinea  SMALLINT = 411;
	SET NOCOUNT ON
	SET FMTONLY OFF

 
SELECT  Ano_Periodo,		IdCategoriaMaquinaria,	CategoriaMaquinaria,
		CodigoLinea,	    NombreLinea,			CodigoCentro,	
		NombreCentro,		CodigoGama,				Gama,			
		CodigoModelo,		Modelo,					Valor,
		[1] AS Ene,			[2] AS Feb,				[3] AS Mar,
		[4] AS Abr,			[5] AS May,				[6] AS Jun,
		[7] AS Jul,			[8] AS Ago,				[9] AS Sep,
		[10] AS Oct,		[11] AS Nov,			[12] AS Dic, 	   
	    [1] + [2] + [3] + [4] + [5] + [6] + [7] + [8] + [9] + [10] + [11] + [12] AS Total
  FROM (SELECT  vpm.Ano_Periodo,	    vpm.IdCategoriaMaquinaria,	vpm.NombreCategoria CategoriaMaquinaria,
				vpm.CodigoLinea,		vpm.NombreLinea, 		    vpm.CodigoCentro,
				vpm.NombreCentro,		vpm.CodigoGama,			    vpm.Gama,
				vpm.CodigoModelo,		vpm.Modelo,				    vpm.Valor,
				vpc.Mes_Periodo Mes,--	vpl.Valor,					vpmc.Valor,
				vpm.Valor * vpl.Valor * vpmc.Valor * vpc.valor / 1000000  AS ValorCalculado
          FROM vw_Presupuestos_Variables_PorModelos vpm
		  LEFT JOIN Presupuestos_VariablesParametrizacionesMaquinariaPorCentros vpc ON vpc.Ano_Periodo  = vpm.Ano_Periodo
																				   AND vpc.CodigoLinea  = vpm.CodigoLinea 
																				   AND vpc.CodigoCentro = vpm.CodigoCentro 
																				   AND vpc.IdTipo       = 133 --'Estacionalidad VN'
																				   AND vpc.IdClase      = vpm.IdClase
		  LEFT JOIN Presupuestos_VariablesParametrizacionesMaquinariaPorLineas vpl ON vpl.Ano_Periodo	  = vpm.Ano_Periodo
																					 AND vpl.CodigoLinea  = vpm.CodigoLinea
																					 AND vpl.IdCategoria  = vpm.IdCategoriaMaquinaria
																					 AND vpl.IdClase      = vpm.IdClase
																					 AND vpl.IdTipo       = 156 -- 'Unidades Compañia' 
		  LEFT JOIN Presupuestos_VariablesParametrizacionesMaquinariaPorCentros vpmc ON vpc.Ano_Periodo  = vpm.Ano_Periodo
																				  AND vpmc.CodigoLinea   = vpm.CodigoLinea
																				  AND vpmc.CodigoCentro  = vpm.CodigoCentro
																				  AND vpmc.IdCategoria   = vpm.IdCategoriaMaquinaria
																				  AND vpmc.IdClase       = vpm.IdClase
																				  AND vpmc.IdTipo        = 120 -- '% Participación Centro'
		  
	 	 WHERE vpm.Ano_Periodo  = @Ano_Periodo
		   AND vpm.CodigoLinea  = @CodigoLinea
		   AND vpm.CodigoCentro = @CodigoCentro
		   AND vpm.idclase      = @idClase
		   AND vpm.UsadosConsignacion = 0
        ) AS SourceTable
  PIVOT	(
	     SUM(ValorCalculado)
	     FOR Mes IN ([1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12])
		) AS PivotTable

END 

```
