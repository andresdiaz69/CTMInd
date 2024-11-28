# Stored Procedure: sp_Presupuestos_FacturacionRepuestosMaquinarias_PorCentro

## Usa los objetos:
- [[Presupuestos_Clases]]
- [[Presupuestos_Maquinaria_Categoria]]
- [[Presupuestos_VariablesParametrizacionesMaquinariaPorCentros]]
- [[Presupuestos_VariablesParametrizacionesPorLineas]]
- [[Presupuestos_VariablesTipos]]
- [[vw_Presupuestos_CentrosPorLinea]]
- [[vw_Presupuestos_Variables_Macroeconomicas]]

```sql
CREATE PROCEDURE [dbo].[sp_Presupuestos_FacturacionRepuestosMaquinarias_PorCentro]   

    @Ano_Periodo  SMALLINT,
	@CodigoCentro SMALLINT,
	@idClase      SMALLINT,
	@CodigoLinea  SMALLINT

	
-- =============================================
-- Control de Cambios
-- 2024|10|31 - Wilder Chacón - Creado para listar facturacion repuestos MAQUINARIA y calcular valores por mes
-- Modulo - Presupuestos
-- =============================================

AS   
--declare @Ano_Periodo  SMALLINT = 2025;
--declare	@CodigoCentro SMALLINT = 124;
--declare	@idClase      SMALLINT = 1;
--declare @CodigoLinea  SMALLINT = 411;

	SET NOCOUNT ON
	SET FMTONLY OFF
 SELECT Ano_Periodo,			CodigoLinea,			NombreLinea, 
		CodigoCentro,			NombreCentro,			Presupuesto,
		ParticipacionCentro,			
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
   FROM (SELECT vpc.CodigoLinea,				vpc.NombreLinea,			vpc.CodigoCentro,
			    vpc.NombreCentro,				vpc.IdTipo,					vpc.Tipo,		
				vpc.UnidadDeMedida,				vpc.valor Participacion,    vpl.valor Presupuesto,	
				vpl.valor * vpc.valor / 100 AS ParticipacionCentro,	vpce.Mes_Periodo Mes,		
			    vpc.Ano_Periodo,			pvm.Base / 100 AS IVA,			vpl.valor * vpc.valor * vpce.valor / 10000 AS Facturacion
           FROM (SELECT		CodigoLinea,			NombreLinea,			CodigoCentro, 
							NombreCentro,           IdTipo, 				Tipo, 
							UnidadDeMedida,         valor,  				IdClase,   
							Ano_Periodo, 			Mes_Periodo
						
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
                      	  WHERE Activar = 1
                        ) AS SourceTable
                 
			    ) vpc
		   JOIN Presupuestos_VariablesParametrizacionesPorLineas vpl ON vpl.CodigoLinea    = vpc.CodigoLinea 
			         AND vpl.Ano_Periodo    = vpc.Ano_Periodo
					 AND vpl.IdTipo = 125 /*Unidades repuestos*/
					 and vpl.IdClase        = @idClase
		   JOIN Presupuestos_VariablesParametrizacionesMaquinariaPorCentros vpce  ON vpce.CodigoLinea  = vpc.CodigoLinea
			           AND vpce.CodigoCentro = vpc.CodigoCentro
			           AND vpce.Ano_Periodo  = vpc.Ano_Periodo
			           AND vpce.IdTipo       = 134 /*Estacionalidad PV*/
					   and vpce.IdClase      = @idClase

		   JOIN vw_Presupuestos_Variables_Macroeconomicas pvm ON pvm.Ano_Periodo = vpc.Ano_Periodo
			                                                 AND pvm.IdTipo      = 144 /*IVA Repuestos*/
															-- and pvm.
	      WHERE vpc.Ano_Periodo = @Ano_Periodo 
		    AND vpc.CodigoCentro = @CodigoCentro
		    AND vpc.CodigoLinea = @CodigoLinea
			AND vpc.IdTipo = 127 /*Repuestos*/
		    and vpc.idclase = @idClase  

        ) AS SourceTable
  PIVOT (
	     SUM(Facturacion)
	     FOR Mes IN ([1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12])
        ) AS PivotTable

```
