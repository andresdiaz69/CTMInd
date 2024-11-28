# Stored Procedure: sp_Presupuestos_HorasServiciosMaquinaria_PorCentro

## Usa los objetos:
- [[Presupuestos_Clases]]
- [[Presupuestos_Maquinaria_Categoria]]
- [[Presupuestos_VariablesParametrizacionesMaquinariaPorCentros]]
- [[Presupuestos_VariablesParametrizacionesPorLineas]]
- [[Presupuestos_VariablesTipos]]
- [[vw_Presupuestos_CentrosPorLinea]]

```sql
CREATE PROCEDURE [dbo].[sp_Presupuestos_HorasServiciosMaquinaria_PorCentro]   

-- =============================================
-- Control de Cambios
-- 2024|10|31 - Wilder Chacón - Creado para Listar Horas servicios maquinaria y calcular valores por mes
-- Modulo - Presupuestos
-- =============================================

    @Ano_Periodo  SMALLINT,
	@CodigoCentro SMALLINT,
	@idClase      SMALLINT,
	@CodigoLinea  SMALLINT

AS   

--declare @Ano_Periodo  SMALLINT=2025;
--declare	@CodigoCentro SMALLINT=124;
--declare	@idClase      SMALLINT=1;
--declare @CodigoLinea  SMALLINT = 411;

	SET NOCOUNT ON
	SET FMTONLY OFF

 SELECT Ano_Periodo,		CodigoLinea,	NombreLinea, 
		CodigoCentro,		NombreCentro,	ParticipacionCentro,
		HorasServicios,  	[1] AS Ene,		[2] AS Feb,
		[3] AS Mar,		    [4] AS Abr,		[5] AS May,
		[6] AS Jun,		    [7] AS Jul,		[8] AS Ago,
		[9] AS Sep,		    [10] AS Oct,	[11] AS Nov,
		[12] AS Dic,		Participacion  TotalAnual
   FROM (SELECT	vpc.Ano_Periodo,			vpc.CodigoLinea,			vpc.NombreLinea, 
			    vpc.CodigoCentro,			vpc.NombreCentro,			vpc.IdTipo,	
			    vpc.Tipo,					vpc.UnidadDeMedida,			vpc.valor ParticipacionCentro,
			    vpl.valor HorasServicios,	vpc.valor / 100 * vpl.valor	Participacion,
			    vpce.Mes_Periodo Mes,		vpl.valor * vpc.valor * vpce.valor / 10000 AS HorasServicioMes
	      FROM (SELECT		CodigoLinea,			NombreLinea,			CodigoCentro, 
							NombreCentro,           IdTipo, 				Tipo, 
							UnidadDeMedida,         valor,  				IdClase,   
							Ano_Periodo, 			Mes_Periodo,			IdCategoriaMaquinaria
						
									   FROM (SELECT  vt.IdTipo,				cl.NombreCentro,			VPC.IdClase,
													vt.Tipo,				vt.UnidadDeMedida,			pc.Clase,	
													vpc.Valor,				vpc.Ano_Periodo,			vpc.Mes_Periodo,
													vpc.CodigoCentro, 		cl.NombreUnidadNegocio		NombreLinea,	
													pmc.IdCategoria			IdCategoriaMaquinaria, 		pmc.NombreCategoria CategoriaMaquinaria,	
													ISNULL(CAST(cl.CodUnidadNegocio AS smallint), 0) AS CodigoLinea

											FROM Presupuestos_VariablesTipos vt
											INNER JOIN Presupuestos_VariablesParametrizacionesMaquinariaPorCentros vpc
												ON vt.IdTipo = vpc.IdTipo
											INNER JOIN Presupuestos_Clases pc 
												ON vpc.IdClase = pc.IdClase
											INNER JOIN vw_Presupuestos_CentrosPorLinea cl  
												ON  cl.CodCentro = vpc.CodigoCentro 
												AND cl.CodUnidadNegocio = vpc.CodigoLinea
											INNER JOIN  Presupuestos_Maquinaria_Categoria pmc
												ON pmc.IdCategoria = vpc.IdCategoria                              
                      	  WHERE Activar = 1) x
			   ) vpc
		  JOIN Presupuestos_VariablesParametrizacionesPorLineas vpl  ON vpl.Ano_Periodo = vpc.Ano_Periodo 
			                                                        AND vpl.CodigoLinea = vpc.CodigoLinea 
			                                                        AND vpl.IdTipo      = 128  -- 'Horas Servicios' 
																	and vpl.IdClase     = @idClase

		 JOIN Presupuestos_VariablesParametrizacionesMaquinariaPorCentros vpce ON vpce.CodigoCentro = vpc.CodigoCentro
																	AND vpce.CodigoLinea  = vpc.CodigoLinea 
			                                                        AND vpce.Ano_Periodo  = vpc.Ano_Periodo
			                                                        AND vpce.IdTipo       = 134 /*Estacionalidad PV*/
																	AND vpce.IdClase      = @idClase

	    WHERE vpc.IdTipo        = 131  /*% Participación Centro*/ 

		  AND vpc.Ano_Periodo   = @Ano_Periodo 
		  AND vpc.CodigoLinea   = @CodigoLinea
		  AND vpc.CodigoCentro  = @CodigoCentro
		  AND vpc.IdClase       = @idClase

       ) AS SourceTable
 PIVOT (
	    SUM(HorasServicioMes)
	    FOR Mes IN ([1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12])
       ) AS PivotTable


```
