# Stored Procedure: sp_Presupuestos_CostoVentaUnitarioVN_PorLinea

## Usa los objetos:
- [[Presupuestos_VariablesParametrizacionesGlobales]]
- [[Presupuestos_VariablesParametrizacionesPorLineas]]
- [[vw_Presupuestos_ModelosPreciosImpuestos]]

```sql

CREATE PROCEDURE [dbo].[sp_Presupuestos_CostoVentaUnitarioVN_PorLinea] 
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
--****************************
--declare	@Ano_Periodo smallint =2025;
--declare    @CodigoLinea smallint =19;
--declare	@idClase     SMALLINT = 1;
	SET NOCOUNT ON
	SET FMTONLY OFF

SELECT ppsi.CodigoLinea,			ppsi.Linea,				ppsi.CodigoGama,			ppsi.Gama,  
	   ppsi.CodigoModelo,			ppsi.Modelo,			ppsi.PrecioSinImpuestos, 	ppsi.Ano_Periodo,		
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
  FROM (SELECT	CodigoLinea,		Linea,		CodigoGama,		Gama,				CodigoModelo,		Modelo,
			    PrecioSinImpuestos, pvm.valor	Inflacion,		pvm.Ano_Periodo,    mi.AplicaPresupuesto, 
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
	      WHERE AnoPresupuesto = @Ano_Periodo
		    
	    ) ppsi
   JOIN Presupuestos_VariablesParametrizacionesPorLineas vpl	ON vpl.CodigoLinea = ppsi.CodigoLinea
				                                               AND vpl.Ano_Periodo = ppsi.Ano_Periodo
				                                               AND vpl.IdTipo      = 117 /*Margen Nuevos*/
															   and vpl.IdClase     = ppsi.idclase

 WHERE ppsi.CodigoLinea = @CodigoLinea 
   and ppsi.Ano_Periodo = @Ano_Periodo 
   and ppsi.idclase = @idClase
   and ppsi.AplicaPresupuesto = 1


```
