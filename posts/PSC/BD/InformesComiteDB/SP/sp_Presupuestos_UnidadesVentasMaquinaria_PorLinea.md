# Stored Procedure: sp_Presupuestos_UnidadesVentasMaquinaria_PorLinea

## Usa los objetos:
- [[Presupuestos_Maquinaria_Categoria]]
- [[Presupuestos_VariablesParametrizacionesPorModelos]]
- [[Presupuestos_VehiculosPrecios]]
- [[vw_Presupuestos_Lineas]]

```sql

CREATE PROCEDURE [dbo].[sp_Presupuestos_UnidadesVentasMaquinaria_PorLinea] (
    @Ano_Periodo  SMALLINT,
	@idClase      SMALLINT,
	@CodigoLinea  SMALLINT
) AS   

BEGIN
	-- =============================================
	-- Control de Cambios
	-- 2024|08|15 - Manuel Suarez - Creado para Listar proyección unidades ventas Maquinaria y calcular valores por mes
	-- Modulo - Presupuestos
	-- =============================================

	--declare @Ano_Periodo  SMALLINT=2025;
	--declare @idClase      SMALLINT=1;
	--declare @CodigoLinea  SMALLINT = 410;

	--SET NOCOUNT ON
	--SET FMTONLY OFF

	WITH PivotedData AS (

  SELECT IdClase,					CodigoLinea,					Linea,						--CodigoCentro, 			Centro,			
	     CodigoGama,				Gama,						    IdCategoriaMaquinaria,
		 NombreCategoria,			CodigoModelo,					Modelo,						
		 IdTipo,   			        Ano_Periodo,
		 [1] AS Enero,				[2] AS Febrero,					[3] AS Marzo,				[4] AS Abril,
		 [5] AS Mayo,				[6] AS Junio,					[7] AS Julio,				[8] AS Agosto,						
		 [9] AS Septiembre,		    [10] AS Octubre,				[11] AS Noviembre,			[12] AS Diciembre
		-- ,ParticipacionAnual
	FROM (
		 SELECT	distinct VPM.IdClase,		l.Codigo_Linea CodigoLinea,			l.Nombre_Linea AS Linea,		--VPM.CodigoCentro, --			C.NombreCentro AS Centro,
		        VP.CodigoGama,			    VP.Gama,				VP.IdCategoriaMaquinaria,
			    CM.NombreCategoria,			VPM.CodigoModelo,		VP.Modelo,						VPM.IdTipo, 
			    VPM.Ano_Periodo,			VPM.Mes_Periodo,		VPM.Valor				--,ParticipacionAnual = vpl.valor *  (sum(VPMC.Valor) / 100)
		   FROM (select CodigoModelo, IdClase, Ano_Periodo,Mes_Periodo,IdTipo, sum(Valor) valor
		           from Presupuestos_VariablesParametrizacionesPorModelos
				  group by CodigoModelo, IdClase, Ano_Periodo,Mes_Periodo,IdTipo) VPM
		   LEFT JOIN Presupuestos_VehiculosPrecios		AS VP ON VPM.CodigoModelo = VP.CodigoModelo 
									                         AND VPM.IdClase      = VP.idClase
															 AND VPM.Ano_Periodo  = VP.AnoPresupuesto
		   LEFT JOIN Presupuestos_Maquinaria_Categoria AS CM ON VP.IdCategoriaMaquinaria = CM.IdCategoria
		   LEFT JOIN vw_Presupuestos_Lineas AS L ON L.Codigo_Linea = CM.CodigoLinea
		  	
	WHERE CodigoMarca IN (410, 411, 520) 
      and AplicaPresupuesto = 1
      and vpm.Ano_Periodo = @Ano_Periodo
      and vpm.IdClase     = @idClase
      and cm.CodigoLinea  = @CodigoLinea
		   --and vpm.CodigoModelo = '410102513'

	    ) AS SourceTable
  PIVOT	(
		SUM(Valor) 
		FOR Mes_Periodo IN ([1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12])
	    ) AS PivotTable

   ) 
 SELECT	P.IdClase,							P.CodigoLinea,						P.Linea,							--P.CodigoCentro, 	P.Centro,		
        P.CodigoGama,						P.Gama,								P.IdCategoriaMaquinaria,
	    P.NombreCategoria,					P.CodigoModelo,						P.Modelo,							
		P.IdTipo, 						    Ano_Periodo,
	    ISNULL(P.Enero,0)Ene,				ISNULL(P.Febrero,0)Feb,				ISNULL(P.Marzo,0)Mar,
	    ISNULL(P.Abril,0)Abr,				ISNULL(P.Mayo,0)May,				ISNULL(P.Junio,0)Jun,				ISNULL(P.Julio,0)Jul,
	    ISNULL(P.Agosto,0)Ago,				ISNULL(P.Septiembre,0)Sep,			ISNULL(P.Octubre,0)Oct,				ISNULL(P.Noviembre,0)Nov,
	    ISNULL(P.Diciembre,0)Dic,    
	    [Total] = ISNULL(P.Enero, 0) + ISNULL(P.Febrero, 0) + ISNULL(P.Marzo, 0) + ISNULL(P.Abril, 0) + ISNULL(P.Mayo, 0) + ISNULL(P.Junio, 0) 
	    				+ ISNULL(P.Julio, 0) + ISNULL(P.Agosto, 0) + ISNULL(P.Septiembre, 0) + ISNULL(P.Octubre, 0) + ISNULL(P.Noviembre, 0) 
	    				+ ISNULL(P.Diciembre, 0)
   FROM PivotedData P

END 

```
