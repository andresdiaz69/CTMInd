# Stored Procedure: sp_Presupuestos_UnidadesVO_PorCentro

## Usa los objetos:
- [[Presupuestos_VariablesParametrizacionesPorCentros]]
- [[vw_Presupuestos_Comercial_UnidadesUsadosAnual_PorCentros]]

```sql

CREATE PROCEDURE [dbo].[sp_Presupuestos_UnidadesVO_PorCentro]   

-- =============================================
-- Control de Cambios
-- 2024|08|15 - Wilder Chacón - Creado para Listar unidades vo y calcular valores por mes
-- 2024|11|26 - Wilder Chacón - Se quitó el redondeo de los valores por mes 
-- Modulo - Presupuestos
-- =============================================
--****************************
--Autor: Manuel Suarez
-- Date: 17/10/2024
--Descr: Alter SP donde se agrega filtro para poder consultar las diferentes clases y no solo base.
--****************************

    @Ano_Periodo  SMALLINT,
	@CodigoCentro SMALLINT,
	@idClase      SMALLINT

AS   
--declare    @Ano_Periodo  SMALLINT=2025;
--declare @CodigoCentro SMALLINT=147;
--declare @idClase      SMALLINT=1;
	SET NOCOUNT ON
	SET FMTONLY OFF

 SELECT Ano_Periodo,	CodigoLinea,	NombrePresentacion, 
		CodigoCentro,	NombreSede,		ParticipacionCentro,
		UnidadesUsados,	[1] AS Ene,		[2] AS Feb,
		[3] AS Mar,		[4] AS Abr,		[5] AS May,
		[6] AS Jun,		[7] AS Jul,		[8] AS Ago,
		[9] AS Sep,		[10] AS Oct,	[11] AS Nov,
		[12] AS Dic,	TotalAnual
   FROM (select	uua.Ano_Periodo,		uua.CodigoLinea,			uua.NombrePresentacion, 
			    uua.CodigoCentro,		uua.NombreSede,				uua.IdTipo1,		
			    uua.Variable1,			uua.UnidadDeMedida1,		uua.ParticipacionCentro,
			    uua.IdTipo2,			uua.Variable2,				uua.UnidadDeMedida2,
			    uua.UnidadesUsados,		vpc.Mes_Periodo AS Mes,
			    vpc.valor /100 * uua.TotalAnual AS UnidadesUsadosMes,
			    uua.TotalAnual
	       from	vw_Presupuestos_Comercial_UnidadesUsadosAnual_PorCentros uua
		  INNER JOIN Presupuestos_VariablesParametrizacionesPorCentros vpc ON vpc.Ano_Periodo  = uua.Ano_Periodo 
			                                                              AND vpc.CodigoCentro = uua.CodigoCentro 
			                                                              AND vpc.IdTipo       = 134 --'Estacionalidad VO'
																		  AND vpc.IdClase      = uua.IdClase

	      WHERE uua.Ano_Periodo  = @Ano_Periodo
		    AND uua.CodigoCentro = @CodigoCentro
			and uua.IdClase      = @idClase

        ) AS SourceTable
  PIVOT
        (
        	SUM(UnidadesUsadosMes)
        	FOR Mes IN ([1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12])
        ) AS PivotTable


```
