# Stored Procedure: sp_Presupuestos_FacturacionMaquinaria_PorLinea

## Usa los objetos:
- [[vw_Presupuestos_Comercial_PromedioPrecioSinImpuestos_PorModelos]]
- [[vw_Presupuestos_ProyeccionVentasMaquinaria_PorCentro]]
- [[vw_Presupuestos_Variables_PorModelos]]

```sql

CREATE PROCEDURE [dbo].[sp_Presupuestos_FacturacionMaquinaria_PorLinea]   
    @Ano_Periodo SMALLINT,
	@CodigoLinea SMALLINT,
	@idClase     SMALLINT

-- =============================================
-- Control de Cambios
-- 2024|08|15 -  Manuel Suarez  - Creado para Listar Facturacion Maquinaria y calcular valores por mes en el consolidado
-- Modulo - Presupuestos
-- =============================================
AS   
BEGIN

--declare @Ano_Periodo SMALLINT=2025;
--declare	@CodigoLinea SMALLINT= 411
--declare	@idClase     SMALLINT= 1

	SET NOCOUNT ON
	SET FMTONLY OFF

 SELECT a.Ano_Periodo,	                                a.CodigoLinea,	                                           a.NombreLinea, 
		a.CodigoGama,	                                a.Gama,			                                           a.CodigoModelo,		
		a.Modelo,										a.IdCategoriaMaquinaria,				
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

   FROM (SELECT DISTINCT vpm.Ano_Periodo,	vpm.IdCategoriaMaquinaria,	vpm.nombrecategoria CategoriaMaquinaria,
						 vpm.CodigoLinea,	linea NombreLinea,		   -- vpm.CodigoCentro,			 centro NombreCentro,
						 vpm.CodigoGama,	vpm.Gama,			
						 vpm.CodigoModelo,	vpm.Modelo,				    vm.IVA/100 iva,			vm.Impoconsumo/100 Impoconsumo,			
						 sum(Ene)	Ene,		    sum(Feb) Feb,		 sum(Mar) Mar,
						 sum(Abr)	Abr,		    sum(May) May,		 sum(Jun) Jun,
						 sum(Jul)	Jul,		    sum(Ago) Ago,		 sum(Sep) Sep,
						 sum(Oct)	Oct,	        sum(Nov) Nov,		 sum(Dic) Dic,	   
						 sum(Total)	Total
		  FROM vw_Presupuestos_ProyeccionVentasMaquinaria_PorCentro vpm
		  left join vw_Presupuestos_Variables_PorModelos  vm on vm.Ano_Periodo = vpm.Ano_Periodo
		                                                    and vm.IdClase     = vpm.idclase
															and vm.CodigoLinea = vpm.CodigoLinea
															and vm.CodigoCentro= vpm.CodigoCentro
															and vm.CodigoGama  = vpm.CodigoGama
															and vm.CodigoModelo= vpm.CodigoModelo
															and vm.IdTipo      = vpm.IdTipo			
		

	    WHERE vpm.Ano_Periodo = @Ano_Periodo
		  and vpm.CodigoLinea = @CodigoLinea
		  and vpm.IdClase     = @idClase
		group by vpm.Ano_Periodo,	vpm.IdCategoriaMaquinaria,	vpm.nombrecategoria ,
				 vpm.CodigoLinea,	linea ,		   -- vpm.CodigoCentro,			 centro NombreCentro,
				 vpm.CodigoGama,	vpm.Gama,		vm.IVA,			vm.Impoconsumo,	
				 vpm.CodigoModelo,	vpm.Modelo
		  	  

	   ) a

    JOIN (SELECT Enero, Febrero, Marzo, Abril, Mayo, Junio, Julio, Agosto, Septiembre, Octubre, Noviembre, Diciembre, CodigoModelo
			FROM vw_Presupuestos_Comercial_PromedioPrecioSinImpuestos_PorModelos 
		   WHERE Ano_Periodo = @Ano_Periodo 
		     AND CodigoLinea = @CodigoLinea
			 and idclase     = @idClase) ppai ON ppai.CodigoModelo = a.CodigoModelo 
END

```
