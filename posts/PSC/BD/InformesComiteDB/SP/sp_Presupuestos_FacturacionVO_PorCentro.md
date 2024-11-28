# Stored Procedure: sp_Presupuestos_FacturacionVO_PorCentro

## Usa los objetos:
- [[Presupuestos_VariablesParametrizacionesPorCentros]]
- [[Presupuestos_VariablesParametrizacionesPorLineas]]
- [[vw_Presupuestos_Comercial_UnidadesUsadosAnual_PorCentros]]
- [[vw_Presupuestos_Variables_Macroeconomicas]]

```sql

CREATE PROCEDURE [dbo].[sp_Presupuestos_FacturacionVO_PorCentro]   

    @Ano_Periodo  SMALLINT,
	@CodigoCentro SMALLINT,
	@idClase      SMALLINT

	
-- =============================================
-- Control de Cambios
-- 2024|08|15 - Wilder Chacón - Creado para Listar Facturacion VO y calcular valores por mes
-- 2024|11|26 - Wilder Chacón - Se quitó el redondeo de los valores por mes 
-- Modulo - Presupuestos
-- =============================================
--****************************
--Autor: Manuel Suarez
-- Date: 16/10/2024
--Descr: Alter SP donde se agrega filtro para poder consultar las diferentes clases y no solo base.
--****************************


AS   
--declare  @Ano_Periodo  SMALLINT =2025;
--declare @CodigoCentro SMALLINT=147;
--declare @idClase      SMALLINT=1;
	SET NOCOUNT ON
	SET FMTONLY OFF

 SELECT Ano_Periodo,		CodigoLinea,			NombrePresentacion, 
		CodigoCentro,		NombreSede,				ParticipacionCentro,
		UnidadesUsados,			
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
   FROM (SELECT	uua.Ano_Periodo,		uua.CodigoLinea,			uua.NombrePresentacion, 
			    uua.CodigoCentro,		uua.NombreSede,				uua.IdTipo1,		
			    uua.Variable1,			uua.UnidadDeMedida1,		uua.ParticipacionCentro,
			    uua.IdTipo2,			uua.Variable2,				uua.UnidadDeMedida2,
			    uua.UnidadesUsados,		vpc.Mes_Periodo AS Mes,		pvm.Base / 100 AS IVA,
			    vpc.valor /100 * uua.TotalAnual * vpl.valor AS UnidadesUsadosMes
           FROM vw_Presupuestos_Comercial_UnidadesUsadosAnual_PorCentros uua
		  INNER JOIN Presupuestos_VariablesParametrizacionesPorCentros  vpc ON vpc.Ano_Periodo  = uua.Ano_Periodo 
			                                                               AND vpc.CodigoCentro = uua.CodigoCentro 
			                                                               AND vpc.IdTipo       = 134 --Estacionalidad VO
																		   and vpc.IdClase      = uua.IdClase

		   JOIN Presupuestos_VariablesParametrizacionesPorLineas vpl ON vpl.Ano_Periodo = uua.Ano_Periodo
		                                                            AND vpl.CodigoLinea = uua.CodigoLinea
		                                                            AND vpl.IdTipo      = 122 -- Precio Promedio
		   														    AND vpl.IdClase     = uua.IdClase
		   
		   JOIN vw_Presupuestos_Variables_Macroeconomicas pvm ON pvm.Ano_Periodo =  uua.Ano_Periodo
		                                                     AND pvm.IdTipo = 138 /*IVA Gasolina*/

	      WHERE uua.Ano_Periodo = @Ano_Periodo 
	      AND uua.CodigoCentro  = @CodigoCentro
	      and uua.IdClase       = @idClase

        ) AS SourceTable
  PIVOT (
	     SUM(UnidadesUsadosMes)
	     FOR Mes IN ([1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12])
        ) AS PivotTable


```
