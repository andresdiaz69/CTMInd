# Stored Procedure: sp_Presupuestos_FacturacionMaquinaria_PorCentro

## Usa los objetos:
- [[vw_Presupuestos_Comercial_PromedioPrecioSinImpuestos_PorModelos]]
- [[vw_Presupuestos_ProyeccionVentasMaquinaria_PorCentro]]
- [[vw_Presupuestos_Variables_PorModelos]]

```sql



CREATE PROCEDURE [dbo].[sp_Presupuestos_FacturacionMaquinaria_PorCentro]
    @Ano_Periodo  SMALLINT,
	@CodigoCentro SMALLINT,
	@idClase      SMALLINT,
	@CodigoLinea  SMALLINT

---- =============================================
---- Control de Cambios
---- 2024|10|31 - Wilder Chacón - Creado para Listar Facturacion vn y calcular valores por mes
---- 20241109 - Manuel Suarez - Alter se cambia el origen de datos a la vista vw_Presupuestos_ProyeccionVentasMaquinaria_PorCentro para las operaciones
---- Modulo - Presupuestos
---- =============================================

AS

BEGIN 

--declare @Ano_Periodo  SMALLINT = 2025;
--declare	@CodigoCentro SMALLINT = 21;
--declare	@idClase      SMALLINT = 1;
--declare @CodigoLinea  SMALLINT = 411;

	SET NOCOUNT ON
	SET FMTONLY OFF

	

 SELECT 
		a.Ano_Periodo,	                                a.IdCategoriaMaquinaria,									a.CategoriaMaquinaria,
		a.CodigoLinea,		                            a.NombreLinea,												a.CodigoCentro,	 
		a.NombreCentro,		                            a.CodigoGama,												a.Gama,	
		a.CodigoModelo,		                            a.Modelo,												
		--a.IVA,										a.Impoconsumo,
		a.Ene * ppai.Enero AS Enero,					a.Ene * ppai.Enero * a.Impoconsumo AS ImpoEne,				a.Ene * ppai.Enero * a.IVA AS IVAEne,
		a.Feb * ppai.Febrero AS Febrero,				a.Feb * ppai.Febrero * a.Impoconsumo AS ImpoFeb,			a.Feb * ppai.Febrero * a.IVA AS IVAFeb,
		a.Mar * ppai.Marzo AS Marzo,					a.Mar * ppai.Marzo * a.Impoconsumo AS ImpoMar,				a.Mar * ppai.Marzo * a.IVA AS IVAMar,
		a.Abr * ppai.Abril AS Abril,					a.Abr * ppai.Abril * a.Impoconsumo AS ImpoAbr,				a.Abr * ppai.Abril * a.IVA AS IVAAbr,
		a.May * ppai.Mayo AS Mayo,						a.May * ppai.Mayo * a.Impoconsumo AS ImpoMay,				a.May * ppai.Mayo * a.IVA AS IVAMay,
		a.Jun * ppai.Junio AS Junio,					a.Jun * ppai.Junio * a.Impoconsumo AS ImpoJun,				a.Jun * ppai.Junio * a.IVA AS IVAJun,
		a.Jul * ppai.Julio AS Julio,					a.Jul * ppai.Julio * a.Impoconsumo AS ImpoJul,				a.Jul * ppai.Julio * a.IVA AS IVAJul,
		a.Ago * ppai.Agosto AS Agosto,					a.Ago * ppai.Agosto * a.Impoconsumo AS ImpoAgo,				a.Ago * ppai.Agosto * a.IVA AS IVAAgo,
		a.Sep * ppai.Septiembre AS Septiembre,			a.Sep * ppai.Septiembre * a.Impoconsumo AS ImpoSep,			a.Sep * ppai.Septiembre * a.IVA AS IVASep,
		a.Oct * ppai.Octubre AS Octubre,				a.Oct * ppai.Octubre * a.Impoconsumo AS ImpoOct,			a.Oct * ppai.Octubre * a.IVA AS IVAOct,
		a.Nov * ppai.Noviembre AS Noviembre,			a.Nov * ppai.Noviembre * a.Impoconsumo AS ImpoNov,			a.Nov * ppai.Noviembre * a.IVA AS IVANov,
		a.Dic * ppai.Diciembre AS Diciembre,			a.Dic * ppai.Diciembre * a.Impoconsumo AS ImpoDic,			a.Dic * ppai.Diciembre * a.IVA AS IVADic,

		(a.Ene * ppai.Enero)  +	(a.Feb * ppai.Febrero)	+	(a.Mar * ppai.Marzo)	+ 
		(a.Abr * ppai.Abril)  +	(a.May * ppai.Mayo)		+	(a.Jun * ppai.Junio)	+ 
		(a.Jul * ppai.Julio)  + (a.Ago * ppai.Agosto)	+	(a.Sep * ppai.Septiembre) + 
		(a.Oct * ppai.Octubre)+ (a.Nov * ppai.Noviembre)+	(a.Dic * ppai.Diciembre)  Total,

		((a.Ene * ppai.Enero) +	(a.Feb * ppai.Febrero)	+	(a.Mar * ppai.Marzo)	+ 
		(a.Abr * ppai.Abril)  +	(a.May * ppai.Mayo)		+	(a.Jun * ppai.Junio)	+ 
		(a.Jul * ppai.Julio)  + (a.Ago * ppai.Agosto)	+	(a.Sep * ppai.Septiembre) + 
		(a.Oct * ppai.Octubre)+ (a.Nov * ppai.Noviembre)+	(a.Dic * ppai.Diciembre)) * a.Impoconsumo  ImpoTotal, 

		((a.Ene * ppai.Enero)  +	(a.Feb * ppai.Febrero)	+	(a.Mar * ppai.Marzo)	+ 
		(a.Abr * ppai.Abril)  +	(a.May * ppai.Mayo)		+	(a.Jun * ppai.Junio)	+ 
		(a.Jul * ppai.Julio)  + (a.Ago * ppai.Agosto)	+	(a.Sep * ppai.Septiembre) + 
		(a.Oct * ppai.Octubre)+ (a.Nov * ppai.Noviembre)+	(a.Dic * ppai.Diciembre)) * a.IVA  IVATotal 


   FROM
		(SELECT DISTINCT vpm.Ano_Periodo,	vpm.IdCategoriaMaquinaria,	vpm.nombrecategoria CategoriaMaquinaria,
						 vpm.CodigoLinea,	linea NombreLinea,		    vpm.CodigoCentro,	
						 centro NombreCentro,vpm.CodigoGama,			vpm.Gama,			
						 vpm.CodigoModelo,	vpm.Modelo,				    IVA/100 iva,			Impoconsumo/100 Impoconsumo,			
						 Ene,			    Feb,		 Mar,
						 Abr,			    May,		 Jun,
						 Jul,			    Ago,		 Sep,
						 Oct,		        Nov,		 Dic, 	   
						 Total
		  FROM vw_Presupuestos_ProyeccionVentasMaquinaria_PorCentro vpm
		  left join vw_Presupuestos_Variables_PorModelos  vm on vm.Ano_Periodo = vpm.Ano_Periodo
		                                                    and vm.IdClase     = vpm.idclase
															and vm.CodigoLinea = vpm.CodigoLinea
															and vm.CodigoCentro= vpm.CodigoCentro
															and vm.CodigoGama  = vpm.CodigoGama
															and vm.CodigoModelo= vpm.CodigoModelo
															and vm.IdTipo      = vpm.IdTipo															


		    --(SELECT  vpm.Ano_Periodo,	    vpm.IdCategoriaMaquinaria,	vpm.NombreCategoria CategoriaMaquinaria,
				--		vpm.CodigoLinea,		vpm.NombreLinea, 		    vpm.CodigoCentro,
				--		vpm.NombreCentro,		vpm.CodigoGama,			    vpm.Gama,
				--		vpm.CodigoModelo,		vpm.Modelo,				    vpm.Valor,
				--		vpm.IVA /100 AS IVA,	vpm.Impoconsumo /100 AS Impoconsumo,
				--		vpc.Mes_Periodo Mes,
				--		ROUND(vpm.Valor * vpl.Valor * vpmc.Valor * vpc.valor / 1000000, 0) AS ValorCalculado
				--  FROM vw_Presupuestos_Variables_PorModelos vpm
				--  LEFT JOIN Presupuestos_VariablesParametrizacionesMaquinariaPorCentros vpc ON vpc.Ano_Periodo  = vpm.Ano_Periodo
				--																		   AND vpc.CodigoLinea  = vpm.CodigoLinea 
				--																		   AND vpc.CodigoCentro = vpm.CodigoCentro 
				--																		   AND vpc.IdTipo       = 133 --'Estacionalidad VN'
				--																		   AND vpc.IdClase      = vpm.IdClase
				--  LEFT JOIN Presupuestos_VariablesParametrizacionesMaquinariaPorLineas vpl ON vpl.Ano_Periodo	  = vpm.Ano_Periodo
				--																			 AND vpl.CodigoLinea  = vpm.CodigoLinea
				--																			 AND vpl.IdCategoria  = vpm.IdCategoriaMaquinaria
				--																			 AND vpl.IdClase      = vpm.IdClase
				--																			 AND vpl.IdTipo       = 156 -- 'Unidades Compañia' 
				--  LEFT JOIN Presupuestos_VariablesParametrizacionesMaquinariaPorCentros vpmc ON vpc.Ano_Periodo  = vpm.Ano_Periodo
				--																		  AND vpmc.CodigoLinea   = vpm.CodigoLinea
				--																		  AND vpmc.CodigoCentro  = vpm.CodigoCentro
				--																		  AND vpmc.IdCategoria   = vpm.IdCategoriaMaquinaria
				--																		  AND vpmc.IdClase       = vpm.IdClase
				--																		  AND vpmc.IdTipo        = 120 -- '% Participación Centro'
		  
	 			 WHERE vpm.Ano_Periodo  = @Ano_Periodo
				   AND vpm.CodigoLinea  = @CodigoLinea
				   AND vpm.CodigoCentro = @CodigoCentro
				   AND vpm.idclase      = @idClase
					

	       ) a
      JOIN (
		SELECT Enero, Febrero, Marzo, Abril, Mayo, Junio, Julio, Agosto, Septiembre, Octubre, Noviembre, Diciembre, CodigoModelo
  		FROM vw_Presupuestos_Comercial_PromedioPrecioSinImpuestos_PorModelos 
  	    WHERE Ano_Periodo = @Ano_Periodo
			AND idclase = @idClase
			AND UsadosConsignacion = 0
	) ppai 	ON ppai.CodigoModelo = a.CodigoModelo 

END

```
