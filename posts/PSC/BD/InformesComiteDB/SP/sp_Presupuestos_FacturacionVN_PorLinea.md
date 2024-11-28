# Stored Procedure: sp_Presupuestos_FacturacionVN_PorLinea

## Usa los objetos:
- [[Presupuestos_VariablesParametrizacionesPorCentros]]
- [[Presupuestos_VariablesParametrizacionesPorlineas]]
- [[vw_Presupuestos_CentrosPorLinea]]
- [[vw_Presupuestos_Comercial_PromedioPrecioSinImpuestos_PorModelos]]
- [[vw_Presupuestos_Variables_PorModelos]]

```sql

CREATE PROCEDURE [dbo].[sp_Presupuestos_FacturacionVN_PorLinea]   
    @Ano_Periodo SMALLINT,
	@CodigoLinea SMALLINT,
	@idClase     SMALLINT

-- =============================================
-- Control de Cambios
-- 2024|08|15 - Wilder Chacón - Creado para Listar Facturacion vn y calcular valores por mes en el consolidado
-- 2024|10|10 - Manuel Suarez - Alter SP donde se agrega filtro para poder consultar las diferentes clases y no solo base.
-- 2024|11|09 - Alexis Barreto - Se cambia el origen del centro de DBMLC0190..UnidadNegocio a la vista vw_Presupuestos_CentrosPorLinea
-- Modulo - Presupuestos
-- =============================================
AS   
BEGIN
--declare @Ano_Periodo SMALLINT=2025;
--declare	@CodigoLinea SMALLINT= 19
--declare	@idClase     SMALLINT= 1

	SET NOCOUNT ON
	SET FMTONLY OFF

 SELECT a.Ano_Periodo,	                                a.CodigoLinea,	                                           a.NombreLinea, 
		a.CodigoGama,	                                a.Gama,			                                           a.CodigoModelo,		
		a.Modelo,		--a.IVA,			a.Impoconsumo,
		a.Ene * ppai.Enero AS Enero,					a.Ene * ppai.Enero * a.Impoconsumo AS ImpoEne,				a.Ene * ppai.Enero * a.IVA AS IVAEne,
		a.Feb * ppai.Febrero AS Febrero,				a.Feb * ppai.Febrero * a.Impoconsumo AS ImpoFeb,			a.Feb * ppai.Febrero * a.IVA AS IVAFeb,
		a.Mar * ppai.Marzo AS Marzo,					a.Mar * ppai.Marzo * a.Impoconsumo AS ImpoMar,				a.Mar * ppai.Marzo * a.IVA AS IVAMar,
		a.Abr * ppai.Abril AS Abril,					a.Abr * ppai.Abril * a.Impoconsumo AS ImpoAbr,				a.Abr * ppai.Abril * a.IVA AS IVAAbr,
		a.May * ppai.Mayo AS Mayo,						a.May * ppai.Mayo * a.Impoconsumo AS ImpoMay,				a.May * ppai.Mayo * a.IVA AS IVAMay,
		a.Jun * ppai.Junio AS Junio,					a.Jun * ppai.Junio * a.Impoconsumo AS ImpoJun,				a.Jun * ppai.Junio * a.IVA AS IVAJun,
		a.Jul * ppai.Julio AS Julio,					a.Jul * ppai.Julio * a.Impoconsumo AS ImpoJul,				a.Jul * ppai.Julio * a.IVA AS IVAJul,
		a.Ago * ppai.Agosto AS Agosto,					a.Ago * ppai.Agosto * a.Impoconsumo AS ImpoAgo,			a.Ago * ppai.Agosto * a.IVA AS IVAAgo,
		a.Sep * ppai.Septiembre AS Septiembre,			a.Sep * ppai.Septiembre * a.Impoconsumo AS ImpoSep,		a.Sep * ppai.Septiembre * a.IVA AS IVASep,
		a.Oct * ppai.Octubre AS Octubre,				a.Oct * ppai.Octubre * a.Impoconsumo AS ImpoOct,			a.Oct * ppai.Octubre * a.IVA AS IVAOct,
		a.Nov * ppai.Noviembre AS Noviembre,			a.Nov * ppai.Noviembre * a.Impoconsumo AS ImpoNov,			a.Nov * ppai.Noviembre * a.IVA AS IVANov,
		a.Dic * ppai.Diciembre AS Diciembre,			a.Dic * ppai.Diciembre * a.Impoconsumo AS ImpoDic,			a.Dic * ppai.Diciembre * a.IVA AS IVADic,

		(a.Ene * ppai.Enero)  +	(a.Feb * ppai.Febrero)	+	(a.Mar * ppai.Marzo)	+ 
		(a.Abr * ppai.Abril)  +	(a.May * ppai.Mayo)		+	(a.Jun * ppai.Junio)	+ 
		(a.Jul * ppai.Julio)  + (a.Ago * ppai.Agosto)	+	(a.Sep * ppai.Septiembre) + 
		(a.Oct * ppai.Octubre)+ (a.Nov * ppai.Noviembre)+	(a.Dic * ppai.Diciembre) AS Total,

		((a.Ene * ppai.Enero)  +	(a.Feb * ppai.Febrero)	+	(a.Mar * ppai.Marzo)	+ 
		(a.Abr * ppai.Abril)  +	(a.May * ppai.Mayo)		+	(a.Jun * ppai.Junio)	+ 
		(a.Jul * ppai.Julio)  + (a.Ago * ppai.Agosto)	+	(a.Sep * ppai.Septiembre) + 
		(a.Oct * ppai.Octubre)+ (a.Nov * ppai.Noviembre)+	(a.Dic * ppai.Diciembre)) * a.Impoconsumo AS ImpoTotal, 

		((a.Ene * ppai.Enero)  +	(a.Feb * ppai.Febrero)	+	(a.Mar * ppai.Marzo)	+ 
		(a.Abr * ppai.Abril)  +	(a.May * ppai.Mayo)		+	(a.Jun * ppai.Junio)	+ 
		(a.Jul * ppai.Julio)  + (a.Ago * ppai.Agosto)	+	(a.Sep * ppai.Septiembre) + 
		(a.Oct * ppai.Octubre)+ (a.Nov * ppai.Noviembre)+	(a.Dic * ppai.Diciembre)) * a.IVA AS IVATotal 

   FROM (SELECT Ano_Periodo,	CodigoLinea,	NombreLinea, 
			    CodigoGama,		Gama,			CodigoModelo,	
			    Modelo,			IVA,			Impoconsumo,
				[1] AS Ene,		[2] AS Feb,		[3] AS Mar,
				[4] AS Abr,		[5] AS May,		[6] AS Jun,
			    [7] AS Jul,     [8] AS Ago,	    [9] AS Sep,
			    [10] AS Oct,    [11] AS Nov,    [12] AS Dic
		   FROM	(
			     SELECT vpm.Ano_Periodo,		 vpm.CodigoLinea,		vpm.NombreLinea, 		
				        vpm.CodigoGama,			 vpm.Gama,				vpm.CodigoModelo,
				        vpm.Modelo,				 vpm.IVA / 100 AS IVA,	vpm.Impoconsumo / 100 AS Impoconsumo,
				        vpca.Mes_Periodo AS Mes, SUM(ROUND(vpm.Valor /100 * vpcb.ParticipacionCentro * vpca.valor / 100, 0)) AS ProyeccionVentaUnidades
			       FROM vw_Presupuestos_Variables_PorModelos vpm
		  	       JOIN Presupuestos_VariablesParametrizacionesPorCentros vpca  ON vpca.Ano_Periodo  = vpm.Ano_Periodo 
				                                                               AND vpca.CodigoCentro = vpm.CodigoCentro 
				                                                               AND vpca.IdTipo       = 133 --'Estacionalidad VN'
																			   and vpca.IdClase      = vpm.IdClase

		           JOIN (SELECT distinct vpcc.Ano_Periodo,CodUnidadNegocio, vpcc.idclase,vpcc.CodigoCentro, vpcc.IdTipo, vpcc.valor * vpl.valor /100 ParticipacionCentro 
		        		   FROM Presupuestos_VariablesParametrizacionesPorCentros vpcc
						  INNER JOIN  vw_Presupuestos_CentrosPorLinea un  	 ON un.CodCentro = vpcc.CodigoCentro  
		        		   JOIN Presupuestos_VariablesParametrizacionesPorlineas vpl   ON vpl.CodigoLinea = un.CodUnidadNegocio
		        			                                                          AND vpl.IdTipo      = 119 /*Unidades Compañia*/
																					  and vpl.IdClase     = vpcc.IdClase
																					  and vpl.Ano_Periodo = vpcc.Ano_Periodo 
		        		  WHERE vpcc.IdTipo = 120 /*Participacion Centro*/ 
						) vpcb 	ON vpcb.CodigoCentro      = vpm.CodigoCentro
						       and vpcb.CodUnidadNegocio  = vpm.CodigoLinea 
		        		       AND vpcb.Ano_Periodo       = vpm.Ano_Periodo
							   and vpcb.IdClase           = vpm.IdClase

			      WHERE vpm.Ano_Periodo = @Ano_Periodo
					AND vpm.CodigoLinea = @CodigoLinea
					and vpm.IdClase     = @idClase

		  	      GROUP BY vpm.Ano_Periodo,	vpm.CodigoLinea,		vpm.NombreLinea, 	
						vpm.CodigoGama,	    vpm.Gama,				vpm.CodigoModelo,		
						vpm.Modelo,		    vpca.Mes_Periodo,		vpm.Valor,
						vpm.IVA,		    vpm.Impoconsumo,		vpca.valor,
						vpcb.ParticipacionCentro

		          ) AS SourceTable

            PIVOT
		          (
		       	   SUM (ProyeccionVentaUnidades)
		       	   FOR Mes IN ([1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12])
		          ) AS PivotTable

	   ) a

    JOIN (SELECT Enero, Febrero, Marzo, Abril, Mayo, Junio, Julio, Agosto, Septiembre, Octubre, Noviembre, Diciembre, CodigoModelo
			FROM vw_Presupuestos_Comercial_PromedioPrecioSinImpuestos_PorModelos 
		   WHERE Ano_Periodo = @Ano_Periodo 
		     AND CodigoLinea = @CodigoLinea
			 and idclase     = @idClase) ppai ON ppai.CodigoModelo = a.CodigoModelo 
END

```
