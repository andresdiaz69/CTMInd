# Stored Procedure: sp_Presupuestos_CostoVentaUnitarioMaquinaria_PorLinea

## Usa los objetos:
- [[Presupuestos_Maquinaria_Categoria]]
- [[Presupuestos_VariablesParametrizacionesGlobales]]
- [[Presupuestos_VariablesParametrizacionesMaquinariaPorLineas]]
- [[vw_Presupuestos_ModelosPreciosImpuestos]]

```sql
CREATE PROCEDURE [dbo].[sp_Presupuestos_CostoVentaUnitarioMaquinaria_PorLinea] 
	@Ano_Periodo smallint,
    @CodigoLinea smallint,
	@idClase     SMALLINT

AS   
--****************************
--Autor: Manuel Suarez
-- Date: 11/10/2024
--Descr: Alter SP donde se agrega filtro para poder consultar las diferentes clases y no solo base.
--****************************
--****************************
--Autor: Manuel Suarez
-- Date: 29/10/2024
--Descr: Alter SP donde se agrega nueva variable por clase
----****************************
--declare	@Ano_Periodo smallint =2025;
--declare @CodigoLinea smallint =410;
--declare	@idClase     SMALLINT = 1;
	SET NOCOUNT ON
	SET FMTONLY OFF

SELECT ppsi.CodigoLinea,			ppsi.Linea,				ppsi.CodigoGama,			ppsi.Gama,  
	   ppsi.CodigoModelo,			ppsi.Modelo,			ppsi.PrecioSinImpuestos, 	ppsi.Ano_Periodo,	
	   IdCategoriaMaquinaria,       NombreCategoria,		
	   ppsi.Enero * (1 - vpl.valor / 100) Enero,			ppsi.Febrero * (1 - vpl.valor / 100) Febrero,	
	   ppsi.Marzo * (1 - vpl.valor / 100) Marzo,			ppsi.Abril   * (1 - vpl.valor / 100) Abril,
	   ppsi.Mayo  * (1 - vpl.valor / 100) Mayo,				ppsi.Junio   * (1 - vpl.valor / 100) Junio,					
	   ppsi.Julio * (1 - vpl.valor / 100) Julio,			ppsi.Agosto  * (1 - vpl.valor / 100) Agosto,
	   ppsi.Septiembre * (1 - vpl.valor / 100) Septiembre,	ppsi.Octubre * (1 - vpl.valor / 100) Octubre,
	   ppsi.Noviembre  * (1 - vpl.valor / 100) Noviembre,	ppsi.Diciembre * (1 - vpl.valor / 100) Diciembre,
	   
	   (ppsi.Enero * (1 - vpl.valor / 100))			+ (ppsi.Febrero * (1 - vpl.valor / 100)) +	
	   (ppsi.Marzo * (1 - vpl.valor / 100))			+ (ppsi.Abril * (1 - vpl.valor / 100)) +
	   (ppsi.Mayo * (1 - vpl.valor / 100))			+ (ppsi.Junio * (1 - vpl.valor / 100)) +					
	   (ppsi.Julio * (1 - vpl.valor / 100))			+ (ppsi.Agosto * (1 - vpl.valor / 100)) +
	   (ppsi.Septiembre * (1 - vpl.valor / 100))	+ (ppsi.Octubre * (1 - vpl.valor / 100)) +
	   (ppsi.Noviembre * (1 - vpl.valor / 100))		+ (ppsi.Diciembre * (1 - vpl.valor / 100)) Total
  FROM (SELECT	mi.CodigoLinea,		Linea,		CodigoGama,		Gama,				CodigoModelo,		Modelo,
			    PrecioSinImpuestos, pvm.valor	Inflacion,		pvm.Ano_Periodo,    mi.AplicaPresupuesto, idcategoriamaquinaria, NombreCategoria,
			    (PrecioSinImpuestos/1000) * (1 + (pvm.valor/100) / 12)  Enero, mi.idclase,
			    (mi.PrecioSinImpuestos/1000) * POWER((1 + (pvm.valor/100) / 12),2)  Febrero,
			    (PrecioSinImpuestos/1000) * POWER((1 + (pvm.valor/100) / 12),3)  Marzo,
			    (PrecioSinImpuestos/1000) * POWER((1 + (pvm.valor/100) / 12),4)  Abril,
			    (PrecioSinImpuestos/1000) * POWER((1 + (pvm.valor/100) / 12),5)  Mayo,
			    (PrecioSinImpuestos/1000) * POWER((1 + (pvm.valor/100) / 12),6)  Junio,
			    (PrecioSinImpuestos/1000) * POWER((1 + (pvm.valor/100) / 12),7)  Julio,
			    (PrecioSinImpuestos/1000) * POWER((1 + (pvm.valor/100) / 12),8)  Agosto,
			    (PrecioSinImpuestos/1000) * POWER((1 + (pvm.valor/100) / 12),9)  Septiembre,
			    (PrecioSinImpuestos/1000) * POWER((1 + (pvm.valor/100) / 12),10)  Octubre,
			    (PrecioSinImpuestos/1000) * POWER((1 + (pvm.valor/100) / 12),11)  Noviembre,
			    (PrecioSinImpuestos/1000) * POWER((1 + (pvm.valor/100) / 12),12)  Diciembre
	       FROM vw_Presupuestos_ModelosPreciosImpuestos mi
	       join Presupuestos_VariablesParametrizacionesGlobales pvm ON pvm.IdTipo = 4 -- Inflacion base
																   and pvm.IdClase = mi.idclase
	       join Presupuestos_Maquinaria_Categoria ca on ca.idcategoria = mi.idcategoriamaquinaria
													and ca.codigolinea = mi.CodigoLinea
		  WHERE AnoPresupuesto = @Ano_Periodo
		    
	    ) ppsi
   JOIN Presupuestos_VariablesParametrizacionesMaquinariaPorLineas vpl	ON vpl.CodigoLinea = ppsi.CodigoLinea
				                                                       AND vpl.Ano_Periodo = ppsi.Ano_Periodo
				                                                       AND vpl.IdTipo      = 117 /*Margen Nuevos*/
															           And vpl.IdClase     = ppsi.idclase
																	   AND vpl.idcategoria = ppsi.idcategoriamaquinaria

 WHERE ppsi.CodigoLinea = @CodigoLinea 
   and ppsi.Ano_Periodo = @Ano_Periodo 
   and ppsi.idclase = @idClase
   and ppsi.AplicaPresupuesto = 1


```
