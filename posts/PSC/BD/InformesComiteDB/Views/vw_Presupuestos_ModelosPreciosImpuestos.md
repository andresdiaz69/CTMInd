# View: vw_Presupuestos_ModelosPreciosImpuestos

## Usa los objetos:
- [[Presupuestos_VehiculosPrecios]]
- [[vw_Presupuestos_Variables_Macroeconomicas]]

```sql
CREATE VIEW [dbo].[vw_Presupuestos_ModelosPreciosImpuestos] AS
-- =============================================
-- Control de Cambios
-- 2024|08|22 - Wilder Chacón - Creado para listar Listar los modelos activos por lineas, el precio y lista de impuestos 
-- 2024|10|28 - Wilder Chacón - Se agrega el case para maquinaria y la columna IdCategoriaMaquinaria
-- 2024|10|29 - Manuel Suarez - Alter view donde se agrega wl idClase
-- 2024|10|29 - Alexis Barreto - Se agregan las columnas Porcentaje_Consignacion y UsadosConsignacion
-- 2024|11|15 - Wilder Chacón - Se agrega el impoconsumo para hibridos y eléctricos
-- Modulo - Presupuestos
-- =============================================

SELECT DISTINCT CodigoMarca CodigoLinea,			Marca Linea,			CodigoGama, Gama, 
				CodigoModelo,						Modelo,					PrecioListaAntesDeImpuestos PrecioSinImpuestos, 
				AnoPresupuesto,						idClase,
		CASE WHEN Combustible = 'Eléctrico' 
			 THEN (SELECT Base FROM vw_Presupuestos_Variables_Macroeconomicas
					WHERE IdTipo = 137 /*IVA Electricos*/	
					  and Ano_Periodo = pv.anopresupuesto
				   ) 
			 WHEN Combustible = 'Gasolina Electrico' 
			 THEN (SELECT  Base FROM vw_Presupuestos_Variables_Macroeconomicas
					WHERE IdTipo = 151 /*IVA hibridos*/
					  and Ano_Periodo = pv.anopresupuesto
				   )
			 WHEN CodigoMarca = 410 
			 THEN (SELECT Base FROM vw_Presupuestos_Variables_Macroeconomicas
					WHERE IdTipo = 140 /*IVA Agricola*/
					  and Ano_Periodo = pv.anopresupuesto
					)
			 WHEN CodigoMarca = 411 OR CodigoMarca = 520
			 THEN (SELECT Base FROM vw_Presupuestos_Variables_Macroeconomicas
					WHERE IdTipo = 139 /*IVA Maquinaría Construcción y Wirtgen*/	
					  and Ano_Periodo = AnoPresupuesto
				   )
			 ELSE (SELECT base FROM vw_Presupuestos_Variables_Macroeconomicas
					WHERE IdTipo = 138 /*IVA Gasolina*/
					  and Ano_Periodo = pv.anopresupuesto
					)
			 END IVA, 
		CASE WHEN CodigoMarca = 411 OR CodigoMarca = 410 OR CodigoMarca = 520
			 THEN (SELECT Base FROM vw_Presupuestos_Variables_Macroeconomicas
					WHERE IdTipo = 146 /*Impoconsumo Maquinaria y Camiones*/	
					  and Ano_Periodo = AnoPresupuesto 
					)
			 WHEN Combustible = 'Eléctrico' 
			 THEN (SELECT Base FROM vw_Presupuestos_Variables_Macroeconomicas
					WHERE IdTipo = 177 /*Tarifa Electricos*/	
					  and Ano_Periodo = pv.anopresupuesto
				   ) 
			 WHEN Combustible = 'Gasolina Electrico' 
			 THEN (SELECT  Base FROM vw_Presupuestos_Variables_Macroeconomicas
					WHERE IdTipo = 178 /*Tarifas Hibrídos*/
					  and Ano_Periodo = pv.anopresupuesto
				   )
			 ELSE (SELECT Base FROM vw_Presupuestos_Variables_Macroeconomicas
					WHERE IdTipo = 145 /*Impo General*/
						and Ano_Periodo = AnoPresupuesto) 
			 END Impoconsumo,
				Combustible,		
				Clasificacion,
				IdCategoriaMaquinaria,
				AplicaPresupuesto,
				Porcentaje_Consignacion, 
				UsadosConsignacion
 FROM Presupuestos_VehiculosPrecios pv

```
