# View: vw_Presupuestos_Comercial_PromedioPrecioSinImpuestos_PorModelos

## Usa los objetos:
- [[Presupuestos_Maquinaria_Categoria]]
- [[Presupuestos_VariablesParametrizacionesGlobales]]
- [[vw_Presupuestos_ModelosPreciosImpuestos]]

```sql

CREATE VIEW  [dbo].[vw_Presupuestos_Comercial_PromedioPrecioSinImpuestos_PorModelos] as
-- =============================================
-- Control de Cambios
-- 2024|10|28 - Wilder Chacón - Se agrega las columnas de Categoria Maquinaria
-- 2024|10|29 - Manuel Suarez - Alter View donde se agrega filtro por clase del origen
-- 2024|10|29 - Alexis Barreto - Se agregan las columnas Porcentaje_Consignacion y UsadosConsignacion. Case para cambiar el valor del precio cuando es Usados Consignacion
-- 2024|10|29 - Alexis Barreto - Se agrega case para cambiar el valor del precio cuando es Usados Consignacion
-- Modulo - Presupuestos
-- =============================================

SELECT	CodigoLinea,				Linea,							CodigoGama,		
		Gama,						CodigoModelo,					Modelo,
		IdCategoriaMaquinaria,		NombreCategoria,				PrecioSinImpuestos,		
		Inflacion,					Ano_Periodo,					AplicaPresupuesto,  
		IdClase,					Porcentaje_Consignacion,		UsadosConsignacion,
		Precio = (Precio/1000),
		(Precio/1000) * (1 + (Inflacion/100) / 12)  Enero,
		(Precio/1000) * POWER((1 + (Inflacion/100) / 12),2)  Febrero,
		(Precio/1000) * POWER((1 + (Inflacion/100) / 12),3)  Marzo,
		(Precio/1000) * POWER((1 + (Inflacion/100) / 12),4)  Abril,
		(Precio/1000) * POWER((1 + (Inflacion/100) / 12),5)  Mayo,
		(Precio/1000) * POWER((1 + (Inflacion/100) / 12),6)  Junio,
		(Precio/1000) * POWER((1 + (Inflacion/100) / 12),7)  Julio,
		(Precio/1000) * POWER((1 + (Inflacion/100) / 12),8)  Agosto,
		(Precio/1000) * POWER((1 + (Inflacion/100) / 12),9)  Septiembre,
		(Precio/1000) * POWER((1 + (Inflacion/100) / 12),10)  Octubre,
		(Precio/1000) * POWER((1 + (Inflacion/100) / 12),11)  Noviembre,
		(Precio/1000) * POWER((1 + (Inflacion/100) / 12),12)  Diciembre

FROM (
	SELECT	pm.CodigoLinea,					pm.Linea,						pm.CodigoGama,		
			pm.Gama,						pm.CodigoModelo,				pm.Modelo,
			pm.IdCategoriaMaquinaria,		pmc.NombreCategoria,			pm.PrecioSinImpuestos,		
			Inflacion = pvm.valor,			pvm.Ano_Periodo,				pm.AplicaPresupuesto,  
			pm.IdClase,						pm.Porcentaje_Consignacion,		pm.UsadosConsignacion,
			Precio = CASE WHEN pm.UsadosConsignacion = 1 THEN (pm.PrecioSinImpuestos * (pm.Porcentaje_Consignacion / 100))
							ELSE pm.PrecioSinImpuestos END
	FROM vw_Presupuestos_ModelosPreciosImpuestos pm
	JOIN Presupuestos_VariablesParametrizacionesGlobales pvm ON pvm.IdTipo      = 4 -- Inflacion valor
															AND pvm.Ano_Periodo = pm.anopresupuesto
															AND pvm.IdClase		= pm.idClase 
	LEFT JOIN Presupuestos_Maquinaria_Categoria pmc on pmc.IdCategoria = pm.IdCategoriaMaquinaria 

	WHERE Modelo IS NOT NULL 
) A

```
