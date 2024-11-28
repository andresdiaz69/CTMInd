# Stored Procedure: sp_Presupuestos_CostoVentaMaquinaria_PorLinea

## Usa los objetos:
- [[Presupuestos_VariablesParametrizacionesMaquinariaPorLineas]]
- [[vw_Presupuestos_Comercial_PromedioPrecioSinImpuestos_PorModelos]]
- [[vw_Presupuestos_ProyeccionVentasMaquinaria_PorCentro]]

```sql

CREATE PROCEDURE [dbo].[sp_Presupuestos_CostoVentaMaquinaria_PorLinea]   
    @Ano_Periodo SMALLINT,
	@CodigoLiena SMALLINT,
	@idClase     SMALLINT

-- =============================================
-- Control de Cambios
-- 2024|11|15 - Manuel Suarez - Creado para Listar costo de venta Maquinaria y calcular valores por mes en el consolidado
-- Modulo - Presupuestos
-- =============================================

AS   
BEGIN
--declare @Ano_Periodo SMALLINT=2025;
--declare @CodigoLiena SMALLINT=410;
--declare @idClase     SMALLINT=1;
	SET NOCOUNT ON
	SET FMTONLY OFF

 SELECT a.Ano_Periodo,	a.CodigoLinea,	a.NombreLinea, 
		a.CodigoGama,	a.Gama,			a.CodigoModelo,		
		a.Modelo,	    a.IdCategoriaMaquinaria, a.CategoriaMaquinaria,--a.IVA,			a.Impoconsumo,MargenNuevos,
		a.Ene * ppai.Enero * (1 - MargenNuevos) AS Enero,					--a.Ene * ppai.Enero * a.Impoconsumo AS ImpoEne,				a.Ene * ppai.Enero * a.IVA AS IVAEne,
		a.Feb * ppai.Febrero * (1 - MargenNuevos) AS Febrero,				--a.Feb * ppai.Febrero * a.Impoconsumo AS ImpoFeb,			a.Feb * ppai.Febrero * a.IVA AS IVAFeb,
		a.Mar * ppai.Marzo * (1 - MargenNuevos) AS Marzo,					--a.Mar * ppai.Marzo * a.Impoconsumo AS ImpoMar,				a.Mar * ppai.Marzo * a.IVA AS IVAMar,
		a.Abr * ppai.Abril * (1 - MargenNuevos) AS Abril,					--a.Abr * ppai.Abril * a.Impoconsumo AS ImpoAbr,				a.Abr * ppai.Abril * a.IVA AS IVAAbr,
		a.May * ppai.Mayo * (1 - MargenNuevos) AS Mayo,						--a.May * ppai.Mayo * a.Impoconsumo AS ImpoMay,				a.May * ppai.Mayo * a.IVA AS IVAMay,
		a.Jun * ppai.Junio * (1 - MargenNuevos) AS Junio,					--a.Jun * ppai.Junio * a.Impoconsumo AS ImpoJun,				a.Jun * ppai.Junio * a.IVA AS IVAJun,
		a.Jul * ppai.Julio * (1 - MargenNuevos) AS Julio,					--a.Jul * ppai.Julio * a.Impoconsumo AS ImpoJul,				a.Jul * ppai.Julio * a.IVA AS IVAJul,
		a.Ago * ppai.Agosto * (1 - MargenNuevos) AS Agosto,					--a.Ago * ppai.Agosto * a.Impoconsumo AS ImpoAgo,			a.Ago * ppai.Agosto * a.IVA AS IVAAgo,
		a.Sep * ppai.Septiembre * (1 - MargenNuevos) AS Septiembre,			--a.Sep * ppai.Septiembre * a.Impoconsumo AS ImpoSep,		a.Sep * ppai.Septiembre * a.IVA AS IVASep,
		a.Oct * ppai.Octubre * (1 - MargenNuevos) AS Octubre,				--a.Oct * ppai.Octubre * a.Impoconsumo AS ImpoOct,			a.Oct * ppai.Octubre * a.IVA AS IVAOct,
		a.Nov * ppai.Noviembre * (1 - MargenNuevos) AS Noviembre,			--a.Nov * ppai.Noviembre * a.Impoconsumo AS ImpoNov,			a.Nov * ppai.Noviembre * a.IVA AS IVANov,
		a.Dic * ppai.Diciembre * (1 - MargenNuevos) AS Diciembre,			--a.Dic * ppai.Diciembre * a.Impoconsumo AS ImpoDic,			a.Dic * ppai.Diciembre * a.IVA AS IVADic,

		(a.Ene * ppai.Enero * (1 - MargenNuevos))  +	(a.Feb * ppai.Febrero * (1 - MargenNuevos))	+	(a.Mar * ppai.Marzo * (1 - MargenNuevos))	+ 
		(a.Abr * ppai.Abril * (1 - MargenNuevos))  +	(a.May * ppai.Mayo * (1 - MargenNuevos))		+	(a.Jun * ppai.Junio * (1 - MargenNuevos))	+ 
		(a.Jul * ppai.Julio * (1 - MargenNuevos))  + (a.Ago * ppai.Agosto * (1 - MargenNuevos))	+	(a.Sep * ppai.Septiembre * (1 - MargenNuevos)) + 
		(a.Oct * ppai.Octubre * (1 - MargenNuevos)) + (a.Nov * ppai.Noviembre * (1 - MargenNuevos)) +	(a.Dic * ppai.Diciembre * (1 - MargenNuevos)) AS Total --,

		--((a.Ene * ppai.Enero)  +	(a.Feb * ppai.Febrero)	+	(a.Mar * ppai.Marzo)	+ 
		--(a.Abr * ppai.Abril)  +	(a.May * ppai.Mayo)		+	(a.Jun * ppai.Junio)	+ 
		--(a.Jul * ppai.Julio)  + (a.Ago * ppai.Agosto)	+	(a.Sep * ppai.Septiembre) + 
		--(a.Oct * ppai.Octubre)+ (a.Nov * ppai.Noviembre)+	(a.Dic * ppai.Diciembre)) * a.Impoconsumo AS ImpoTotal, 
		--((a.Ene * ppai.Enero)  +	(a.Feb * ppai.Febrero)	+	(a.Mar * ppai.Marzo)	+ 
		--(a.Abr * ppai.Abril)  +	(a.May * ppai.Mayo)		+	(a.Jun * ppai.Junio)	+ 
		--(a.Jul * ppai.Julio)  + (a.Ago * ppai.Agosto)	+	(a.Sep * ppai.Septiembre) + 
		--(a.Oct * ppai.Octubre)+ (a.Nov * ppai.Noviembre)+	(a.Dic * ppai.Diciembre)) * a.IVA AS IVATotal 
   FROM (SELECT DISTINCT vpm.Ano_Periodo,	vpm.IdCategoriaMaquinaria,	vpm.nombrecategoria CategoriaMaquinaria,
						 vpm.CodigoLinea,	linea NombreLinea,		   -- vpm.idcategoriamaquinaria,			 vpm.NombreCategoria,
						 vpm.CodigoGama,	vpm.Gama,			
						 vpm.CodigoModelo,	vpm.Modelo,				    vpl.valor / 100 MargenNuevos,-- IVA/100 iva,			Impoconsumo/100 Impoconsumo,			
						 sum(Ene)	Ene,		    sum(Feb) Feb,		 sum(Mar) Mar,
						 sum(Abr)	Abr,		    sum(May) May,		 sum(Jun) Jun,
						 sum(Jul)	Jul,		    sum(Ago) Ago,		 sum(Sep) Sep,
						 sum(Oct)	Oct,	        sum(Nov) Nov,		 sum(Dic) Dic,	   
						 sum(Total)	Total
		  FROM vw_Presupuestos_ProyeccionVentasMaquinaria_PorCentro vpm
		  JOIN Presupuestos_VariablesParametrizacionesMaquinariaPorLineas vpl 	ON vpl.CodigoLinea = vpm.CodigoLinea
				                                                               AND vpl.Ano_Periodo = vpm.Ano_Periodo
				                                                               AND vpl.IdTipo      = 117 /*Margen Nuevos*/
																	           AND vpl.IdClase     = vpm.IdClase	
																			   and vpl.idcategoria = vpm.idcategoriamaquinaria
  
	      WHERE vpm.Ano_Periodo = @Ano_Periodo 
		    AND vpm.CodigoLinea = @CodigoLiena
			and vpm.IdClase     = @idClase
		  group by vpm.Ano_Periodo,	    vpm.IdCategoriaMaquinaria,	vpm.nombrecategoria ,
				    vpm.CodigoLinea,	linea ,		   -- vpm.idcategoriamaquinaria,			 vpm.NombreCategoria,
				    vpm.CodigoGama,	    vpm.Gama,			
				    vpm.CodigoModelo,	vpm.Modelo,				    vpl.valor
		 	      

	   ) a

	JOIN (SELECT Enero, Febrero, Marzo, Abril, Mayo, Junio, Julio, Agosto, Septiembre, Octubre, Noviembre, Diciembre, CodigoModelo
			FROM vw_Presupuestos_Comercial_PromedioPrecioSinImpuestos_PorModelos 
		   WHERE Ano_Periodo = @Ano_Periodo 
		     AND CodigoLinea = @CodigoLiena
			 and idclase     = @idClase) ppai ON ppai.CodigoModelo = a.CodigoModelo 
END

```
