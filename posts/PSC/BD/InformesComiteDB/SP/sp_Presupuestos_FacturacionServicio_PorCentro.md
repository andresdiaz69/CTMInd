# Stored Procedure: sp_Presupuestos_FacturacionServicio_PorCentro

## Usa los objetos:
- [[Presupuestos_Clases]]
- [[Presupuestos_VariablesCategorias]]
- [[Presupuestos_VariablesParametrizacionesPorCentros]]
- [[Presupuestos_VariablesParametrizacionesPorLineas]]
- [[Presupuestos_VariablesSubCategorias]]
- [[Presupuestos_VariablesTipos]]
- [[vw_Presupuestos_CentrosPorLinea]]
- [[vw_Presupuestos_Variables_Macroeconomicas]]

```sql
CREATE PROCEDURE [dbo].[sp_Presupuestos_FacturacionServicio_PorCentro]   

    @Ano_Periodo  SMALLINT,
	@CodigoCentro SMALLINT,
	@idClase      SMALLINT
-- =============================================
-- Control de Cambios
-- 2024|09|04 - Wilder Chacón - Creado para Listar Facturacion Servicios y calcular valores por mes
-- 2024|10|16 - Manuel Suarez - Alter SP donde se agrega filtro para poder consultar las diferentes clases y no solo valor.
-- 2024|11|09 - Alexis Barreto - Se cambia el origen del centro de DBMLC0190..UnidadNegocio a la vista vw_Presupuestos_CentrosPorLinea
-- Modulo - Presupuestos
-- =============================================
AS   
BEGIN
--declare @Ano_Periodo  SMALLINT=2025;
--declare	@CodigoCentro SMALLINT=1;
--declare	@idClase      SMALLINT=1;
	SET NOCOUNT ON
	SET FMTONLY OFF

 SELECT Ano_Periodo,			CodigoLinea,			NombreLinea, 
		CodigoCentro,			NombreCentro,			Participacion,
		ValorHoraCentro,		ParticipacionCentro,			
		[1] AS Ene,			[1] * IVA AS IVAEne,
		[2] AS Feb,			[2] * IVA AS IVAFeb,
		[3] AS Mar,			[3] * IVA AS IVAMar,
		[4] AS Abr,			[4] * IVA AS IVAAbr,
		[5] AS May,			[5] * IVA AS IVAMay,
		[6] AS Jun,			[6] * IVA AS IVAJun,
		[7] AS Jul,			[7] * IVA AS IVAJul,
		[8] AS Ago,			[8] * IVA AS IVAAgo,
		[9] AS Sep,			[9] * IVA AS IVASep,
		[10] AS Oct,		[10] * IVA AS IVAOct,
		[11] AS Nov,		[11] * IVA AS IVANov,
		[12] AS Dic,		[12] * IVA AS IVADic,
		[1] + [2] + [3] + [4] + [5] + [6] + [7] + [8] + [9] + [10] + [11] + [12] AS TotalAnual,
		([1] + [2] + [3] + [4] + [5] + [6] + [7] + [8] + [9] + [10] + [11] + [12]) * IVA AS TotalIVA
   FROM (SELECT	distinct vpc.Ano_Periodo,	vpc.CodigoLinea,				vpc.NombreLinea, 
			    vpc.CodigoCentro,			vpc.NombreCentro,	            vpc.IdTipo,	
			    vpc.Variable,				vpc.UnidadDeMedida,				vpcb.valor ParticipacionCentro,
			    vpc.valor ValorHoraCentro,	vpl.valor HorasServicios,		vpc.valor / 100 * vpl.valor Participacion,
			    vpce.Mes_Periodo Mes,		vpl.valor * vpc.valor * vpcb.valor * vpce.valor / 10000 AS FacturacionServicioMes,
			    pvm.base / 100 AS IVA

	      FROM (SELECT x.CodigoLinea,     NombreUnidadNegocio NombreLinea,  x.CodigoCentro, 
		               NombreCentro,      Categoria, 					    x.IdSubCategoria, 
					   x.SubCategoria,    x.IdTipo, 					    Variable = Tipo, 
					   x.UnidadDeMedida,  x.valor, 					        x.idclase,
					   Clase    ,         x.Ano_Periodo, 				    x.Mes_Periodo						
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

		   JOIN Presupuestos_VariablesParametrizacionesPorLineas  vpl 	ON vpl.Ano_Periodo = vpc.Ano_Periodo 
			                                                           AND vpl.CodigoLinea = vpc.CodigoLinea 
			                                                           AND vpl.IdTipo      = 128  -- 'Horas Servicios' 
					                                                   and vpl.IdClase     = @idClase

		   JOIN (SELECT distinct CodigoLinea, CodigoCentro,  IdSubCategoria, IdTipo,
		                Mes_Periodo, valor,         Ano_Periodo,    idclase 
				   FROM (SELECT ISNULL(CAST(un.CodUnidadNegocio AS smallint), 0) CodigoLinea, CodigoCentro, IdSubCategoria, v.IdTipo, 
				                Ano_Periodo, Mes_Periodo,  valor ,         idclase
		                   FROM Presupuestos_VariablesParametrizacionesPorCentros v
	                      inner join Presupuestos_VariablesTipos vt ON vt.IdTipo = v.IdTipo
						  INNER JOIN  vw_Presupuestos_CentrosPorLinea un  ON un.CodCentro = v.CodigoCentro ) x
				)  vpce  ON vpce.CodigoCentro = vpc.CodigoCentro
				        and vpce.CodigoLinea = vpc.CodigoLinea
			            AND vpce.Ano_Periodo = vpc.Ano_Periodo
			            AND vpce.IdTipo      = 134 /*Estacionalidad PV*/
						AND vpce.IdClase     = @idClase

		   JOIN vw_Presupuestos_Variables_Macroeconomicas pvm   ON pvm.Ano_Periodo = vpc.Ano_Periodo
			                                                   AND pvm.IdTipo = 141 /*IVA Mano obra*/

		   JOIN Presupuestos_VariablesParametrizacionesPorCentros vpcb 	ON vpcb.CodigoCentro = vpc.CodigoCentro
			                                                           AND vpcb.Ano_Periodo  = vpc.Ano_Periodo
			                                                           AND vpcb.IdTipo       = 131  /*% Participación Centro*/ 
																	   and vpcb.IdClase      = @idClase

	     WHERE vpc.Ano_Periodo  = @Ano_Periodo 
	       AND vpc.CodigoCentro = @CodigoCentro 
	       AND vpc.IdTipo       = 130 /*Valor Hora Centro*/
	   	   and vpc.IdClase      = @idClase

        ) AS SourceTable
  PIVOT (
	     SUM(FacturacionServicioMes)
	     FOR Mes IN ([1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12])
        ) AS PivotTable

END

```
