# Stored Procedure: sp_Presupuestos_UnidadesVentasVN_PorLinea

## Usa los objetos:
- [[Presupuestos_VariablesParametrizacionesPorCentros]]
- [[Presupuestos_VariablesParametrizacionesPorlineas]]
- [[vw_Presupuestos_CentrosPorLinea]]
- [[vw_Presupuestos_Variables_PorModelos]]

```sql
CREATE PROCEDURE [dbo].[sp_Presupuestos_UnidadesVentasVN_PorLinea]   
-- =============================================
-- Control de Cambios
-- 2024|10|11 - Manuel Suarez - Alter SP donde se agrega filtro para poder consultar las diferentes clases y no solo base.
-- 2024|11|09 - Alexis Barreto - Se cambia el origen del centro de DBMLC0190..UnidadNegocio a la vista vw_Presupuestos_CentrosPorLinea
-- Modulo - Presupuestos
-- =============================================
    @Ano_Periodo SMALLINT,
	@CodigoLiena SMALLINT,
	@idClase     SMALLINT

AS  
BEGIN
 --   declare @Ano_Periodo SMALLINT=2025;
	--declare @CodigoLiena SMALLINT=19;
	--declare @idClase     SMALLINT=1;
	SET NOCOUNT ON
	SET FMTONLY OFF
 
SELECT 	Ano_Periodo,	CodigoLinea,	NombreLinea, 
		CodigoGama,		Gama,			CodigoModelo,	
		Modelo,     	[1] AS Ene,		[2] AS Feb,
		[3] AS Mar,		[4] AS Abr,		[5] AS May,
		[6] AS Jun,		[7] AS Jul,		[8] AS Ago,
		[9] AS Sep,		[10] AS Oct,		[11] AS Nov,
		[12] AS Dic, 
		[1] + [2] + [3] + [4] + [5] + [6] + [7] + [8] + [9] + [10] + [11] + [12] AS Total
   FROM	(
		SELECT vpm.Ano_Periodo,	    vpm.CodigoLinea,			vpm.NombreLinea, 		
			   vpm.CodigoGama,		vpm.Gama,					vpm.CodigoModelo,
			   vpm.Modelo,			vpca.Mes_Periodo AS Mes,	SUM(ROUND(vpm.Valor /100 * vpcb.ParticipacionCentro * vpca.valor / 100, 0)) AS ProyeccionVentaUnidades
		  FROM vw_Presupuestos_Variables_PorModelos vpm
		  JOIN Presupuestos_VariablesParametrizacionesPorCentros vpca  ON vpca.Ano_Periodo  = vpm.Ano_Periodo 
			                                                          AND vpca.CodigoCentro = vpm.CodigoCentro 
			                                                          AND vpca.IdTipo       = 133 --'Estacionalidad VN'
																	  and vpca.IdClase      = vpm.IdClase

		 JOIN (SELECT distinct vpcc.Ano_Periodo, un.CodUnidadNegocio, vpcc.idclase,vpcc.CodigoCentro, vpcc.IdTipo, vpcc.valor * vpl.valor /100 ParticipacionCentro 
		         FROM Presupuestos_VariablesParametrizacionesPorCentros vpcc
				INNER JOIN  vw_Presupuestos_CentrosPorLinea un  	 ON un.CodCentro = vpcc.CodigoCentro  
		         JOIN Presupuestos_VariablesParametrizacionesPorlineas vpl   ON vpl.CodigoLinea = un.CodUnidadNegocio
		                                                                    AND vpl.IdTipo      = 119 /*Unidades Compañia*/
																	        and vpl.IdClase     = vpcc.IdClase
																	        and vpl.Ano_Periodo = vpcc.Ano_Periodo 
				WHERE vpcc.IdTipo = 120 /*Participacion Centro*/ 
			  ) vpcb  ON vpcb.CodUnidadNegocio  = vpm.CodigoLinea 
			         AND vpcb.CodigoCentro      = vpm.CodigoCentro
			         AND vpcb.Ano_Periodo       = vpm.Ano_Periodo
					 and vpcb.IdClase           = vpm.IdClase

		WHERE vpm.Ano_Periodo = @Ano_Periodo 
		  AND vpm.CodigoLinea = @CodigoLiena
		  and vpm.IdClase     = @idClase

		GROUP BY vpm.Ano_Periodo,	vpm.CodigoLinea,		vpm.NombreLinea, 	
				 vpm.CodigoGama,	vpm.Gama,				vpm.CodigoModelo,		
				 vpm.Modelo,		vpca.Mes_Periodo,		vpm.Valor,
				 vpca.valor,		vpcb.ParticipacionCentro

	    ) AS SourceTable
  PIVOT	(
		SUM(ProyeccionVentaUnidades)
		FOR Mes IN ([1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12])
	    ) AS PivotTable

  ORDER BY CodigoGama
END

```
