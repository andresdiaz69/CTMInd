# Stored Procedure: sp_Presupuestos_FacturacionRepuestos_PorCentro

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
CREATE PROCEDURE [dbo].[sp_Presupuestos_FacturacionRepuestos_PorCentro]   

    @Ano_Periodo  SMALLINT,
	@CodigoCentro SMALLINT,
	@idClase      SMALLINT

	
-- =============================================
-- Control de Cambios
-- 2024|09|02 - Wilder Chacón - Creado para Listar Facturacion Repuestos y calcular valores por mes
-- Modulo - Presupuestos
-- =============================================
--****************************
--Autor: Manuel Suarez
-- Date: 15/10/2024
--Descr: Alter SP donde se agrega filtro para poder consultar las diferentes clases y no solo base.
--****************************

AS   
--declare @Ano_Periodo  SMALLINT = 2025;
--declare	@CodigoCentro SMALLINT = 84;
--declare	@idClase      SMALLINT = 1;

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
   FROM (SELECT distinct vpc.CodigoLinea,			vpc.NombrePresentacion		NombreLinea,			vpc.CodigoCentro,
			    vpc.NombreSede				NombreCentro,				vpc.IdSubCategoria,		vpc.SubCategoria,
			    vpc.IdTipo,					vpc.Variable,				vpc.UnidadDeMedida,		vpc.valor Participacion,
			    vpl.valor Presupuesto,		vpl.valor * vpc.valor / 100 AS ParticipacionCentro,	vpce.Mes_Periodo Mes,		
			    vpc.Ano_Periodo,			pvm.Base / 100 AS IVA,			vpl.valor * vpc.valor * vpce.valor / 10000 AS Facturacion
           FROM (SELECT CodigoLinea,     NombreUnidadNegocio NombrePresentacion, CodigoCentro, 
		                NombreCentro     NombreSede,                             Categoria, 
						IdSubCategoria,  SubCategoria,                           IdTipo, 
						Variable = Tipo, UnidadDeMedida,                         valor, 
						idclase,         Clase    ,                              Ano_Periodo, 
						Mes_Periodo
						
                   FROM (SELECT vt.IdTipo,           un.NombreCentro,        vt.Tipo,             vt.UnidadDeMedida, 
				                pc.Clase,            vpc.Valor,              pvsc.IdSubCategoria, pvsc.SubCategoria, 
								pvc.Categoria,       vpc.Ano_Periodo,        vpc.Mes_Periodo,     vpc.CodigoCentro,
								un.CodUnidadNegocio, un.NombreUnidadNegocio, vpc.idclase,	
								ISNULL(CAST(un.CodUnidadNegocio AS smallint), 0) AS CodigoLinea
                   
                           FROM Presupuestos_VariablesTipos vt
                          INNER JOIN Presupuestos_VariablesParametrizacionesPorCentros vpc     ON vt.IdTipo = vpc.IdTipo
                          INNER JOIN Presupuestos_Clases pc       ON vpc.IdClase = pc.IdClase
                          INNER JOIN Presupuestos_VariablesSubCategorias pvsc      ON pvsc.IdSubCategoria = vt.IdSubCategoria
                          INNER JOIN Presupuestos_VariablesCategorias pvc     ON pvc.IdCategoria = pvsc.IdCategoria                   
                          INNER JOIN  vw_Presupuestos_CentrosPorLinea un  	    ON un.CodCentro = vpc.CodigoCentro                                 
                      	  WHERE Activar = 1
                        ) AS SourceTable
                 
			    ) vpc
		   JOIN (select IdSubCategoria, CodigoLinea, Ano_Periodo, valor, idclase,vp.IdTipo
		           from Presupuestos_VariablesParametrizacionesPorLineas vp
		          inner join Presupuestos_VariablesTipos vt ON vt.IdTipo = vp.IdTipo
				) vpl ON vpl.CodigoLinea    = vpc.CodigoLinea 
			         AND vpl.IdSubCategoria = vpc.IdSubCategoria 
			         AND vpl.Ano_Periodo    = vpc.Ano_Periodo
					 and vpl.IdClase        = @idClase
		   JOIN (SELECT distinct CodigoLinea, CodigoCentro,  IdSubCategoria, IdTipo,
		                Mes_Periodo, valor,         Ano_Periodo,    idclase 
				   FROM (SELECT ISNULL(CAST(un.CodUnidadNegocio AS smallint), 0) CodigoLinea, CodigoCentro, IdSubCategoria, v.IdTipo, 
				                Ano_Periodo, Mes_Periodo,  valor ,         idclase
		                   FROM Presupuestos_VariablesParametrizacionesPorCentros v
	                      inner join Presupuestos_VariablesTipos vt ON vt.IdTipo = v.IdTipo
						  INNER JOIN  vw_Presupuestos_CentrosPorLinea un  ON un.CodCentro = v.CodigoCentro ) x
				) vpce  ON vpce.CodigoLinea  = vpc.CodigoLinea
			           AND vpce.CodigoCentro = vpc.CodigoCentro
			           AND vpce.Ano_Periodo  = vpc.Ano_Periodo
			           AND vpce.IdTipo       = 134 /*Estacionalidad PV*/
					   and vpce.IdClase      = @idClase

		   JOIN vw_Presupuestos_Variables_Macroeconomicas pvm ON pvm.Ano_Periodo = vpc.Ano_Periodo
			                                                 AND pvm.IdTipo      = 144 /*IVA Repuestos*/
															-- and pvm.
	      WHERE vpc.Ano_Periodo = @Ano_Periodo 
		    AND vpc.CodigoCentro = @CodigoCentro 
		    AND vpl.IdTipo = 125
		    and vpc.idclase = @idClase/*Repuestos*/  

        ) AS SourceTable
  PIVOT (
	     SUM(Facturacion)
	     FOR Mes IN ([1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12])
        ) AS PivotTable

```
