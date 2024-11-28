# Stored Procedure: sp_Presupuestos_HorasServicios_PorCentro

## Usa los objetos:
- [[Presupuestos_Clases]]
- [[Presupuestos_VariablesCategorias]]
- [[Presupuestos_VariablesParametrizacionesPorCentros]]
- [[Presupuestos_VariablesParametrizacionesPorLineas]]
- [[Presupuestos_VariablesSubCategorias]]
- [[Presupuestos_VariablesTipos]]
- [[vw_Presupuestos_CentrosPorLinea]]

```sql
CREATE PROCEDURE [dbo].[sp_Presupuestos_HorasServicios_PorCentro]   

-- =============================================
-- Control de Cambios
-- 2024|09|03 - Wilder Chacón - Creado para Listar Horas servicios y calcular valores por mes
-- 2024|10|16 - Manuel Suarez - Alter SP donde se agrega filtro para poder consultar las diferentes clases y no solo base.
-- 2024|11|09 - Alexis Barreto - Se cambia el origen del centro de DBMLC0190..UnidadNegocio a la vista vw_Presupuestos_CentrosPorLinea
-- Modulo - Presupuestos
-- =============================================

    @Ano_Periodo  SMALLINT,
	@CodigoCentro SMALLINT,
	@idClase      SMALLINT

AS   
BEGIN
--declare @Ano_Periodo  SMALLINT=2025;
--declare	@CodigoCentro SMALLINT=1;
--declare	@idClase      SMALLINT=1;
	SET NOCOUNT ON
	SET FMTONLY OFF

 SELECT Ano_Periodo,		CodigoLinea,	NombrePresentacion, 
		CodigoCentro,		NombreSede,		ParticipacionCentro,
		HorasServicios,  	[1] AS Ene,		[2] AS Feb,
		[3] AS Mar,		    [4] AS Abr,		[5] AS May,
		[6] AS Jun,		    [7] AS Jul,		[8] AS Ago,
		[9] AS Sep,		    [10] AS Oct,	[11] AS Nov,
		[12] AS Dic,		Participacion  TotalAnual
   FROM (SELECT	distinct vpc.Ano_Periodo,	vpc.CodigoLinea,			vpc.NombrePresentacion, 
			    vpc.CodigoCentro,			vpc.NombreSede,				vpc.IdTipo,	
			    vpc.Variable,				vpc.UnidadDeMedida,			vpc.valor ParticipacionCentro,
			    vpl.valor HorasServicios,	vpc.valor / 100 * vpl.valor	Participacion,
			    vpce.Mes_Periodo Mes,		vpl.valor * vpc.valor * vpce.valor / 10000 AS HorasServicioMes
	      FROM (SELECT x.CodigoLinea,                NombreUnidadNegocio NombrePresentacion,   x.CodigoCentro, 
		               NombreCentro NombreSede,      Categoria, 					           x.IdSubCategoria, 
					   x.SubCategoria,               x.IdTipo, 					               Variable = Tipo, 
					   x.UnidadDeMedida,             x.valor, 					               x.idclase,
					   Clase    ,                    x.Ano_Periodo, 				           x.Mes_Periodo						
                  FROM (SELECT vt.IdTipo,           un.NombreCentro,        vt.Tipo,             vt.UnidadDeMedida, 
				               pc.Clase,            vpc.Valor,              pvsc.IdSubCategoria, pvsc.SubCategoria, 
							   pvc.Categoria,       vpc.Ano_Periodo,        vpc.Mes_Periodo,     vpc.CodigoCentro,
							   un.CodUnidadNegocio, un.NombreUnidadNegocio, vpc.idclase,	
							   ISNULL(CAST(un.CodUnidadNegocio AS smallint), 0)  CodigoLinea                   
                          FROM Presupuestos_VariablesTipos vt
                         INNER JOIN Presupuestos_VariablesParametrizacionesPorCentros vpc     ON vt.IdTipo = vpc.IdTipo
                         INNER JOIN Presupuestos_Clases pc       ON vpc.IdClase = pc.IdClase
                         INNER JOIN Presupuestos_VariablesSubCategorias pvsc  ON pvsc.IdSubCategoria = vt.IdSubCategoria
                         INNER JOIN Presupuestos_VariablesCategorias pvc     ON pvc.IdCategoria = pvsc.IdCategoria                   
                         INNER JOIN  vw_Presupuestos_CentrosPorLinea un  	 ON un.CodCentro = vpc.CodigoCentro                                 
                      	 WHERE Activar = 1) x
			   ) vpc
		  JOIN Presupuestos_VariablesParametrizacionesPorLineas vpl  ON vpl.Ano_Periodo = vpc.Ano_Periodo 
			                                                        AND vpl.CodigoLinea = vpc.CodigoLinea 
			                                                        AND vpl.IdTipo      = 128  -- 'Horas Servicios' 
																	and vpl.IdClase     = @idClase

		 JOIN Presupuestos_VariablesParametrizacionesPorCentros vpce ON vpce.CodigoCentro = vpc.CodigoCentro
			                                                        AND vpce.Ano_Periodo  = vpc.Ano_Periodo
			                                                        AND vpce.IdTipo       = 134 /*Estacionalidad PV*/
																	and vpce.IdClase      = @idClase

	    WHERE vpc.IdTipo        = 131  /*% Participación Centro*/ 
		  AND vpc.Ano_Periodo   = @Ano_Periodo 
		  AND vpc.CodigoCentro  = @CodigoCentro
		  and vpc.IdClase       = @idClase

       ) AS SourceTable
 PIVOT (
	    SUM(HorasServicioMes)
	    FOR Mes IN ([1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12])
       ) AS PivotTable
END

```
