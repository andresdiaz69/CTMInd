# View: vw_Presupuestos_Variables_MaquinariaPorLineas

## Usa los objetos:
- [[Presupuestos_Clases]]
- [[Presupuestos_Maquinaria_Categoria]]
- [[Presupuestos_VariablesCategorias]]
- [[Presupuestos_VariablesParametrizacionesMaquinariaPorLineas]]
- [[Presupuestos_VariablesSubCategorias]]
- [[Presupuestos_VariablesTipos]]

```sql
CREATE VIEW [dbo].[vw_Presupuestos_Variables_MaquinariaPorLineas]

-- =============================================
-- Control de Cambios
-- 2024|10|25 - Wilder Chacón - Creado para listar Listar los variables de maquinarias por lineas
-- Modulo - Presupuestos
-- =============================================

AS
SELECT  CodigoLinea,				IdCategoria IdCategoriaMaquinaria,			NombreCategoria CategoriaMaquinaria,
		IdTipo,						Categoria,									IdSubCategoria,
		SubCategoria,				Variable = Tipo, 							UnidadDeMedida,				
		Expansión,					Base,										Contracción,
		AñoMas1,					AñoMas2,									Ano_Periodo
FROM (
    SELECT  vt.IdTipo,			vt.Tipo,			vt.UnidadDeMedida,
			pc.Clase,			vpl.Valor,			pvsc.IdSubCategoria, 
			pvsc.SubCategoria,	pvc.Categoria,		vpl.Ano_Periodo, 
			vpl.CodigoLinea,	pmc.IdCategoria,    pmc.NombreCategoria

    FROM Presupuestos_VariablesTipos vt
    INNER JOIN [Presupuestos_VariablesParametrizacionesMaquinariaPorLineas] vpl 
        ON vt.IdTipo = vpl.IdTipo
    INNER JOIN Presupuestos_Clases pc 
        ON vpl.IdClase = pc.IdClase
    INNER JOIN Presupuestos_VariablesSubCategorias pvsc 
        ON pvsc.IdSubCategoria = vt.IdSubCategoria
	INNER JOIN Presupuestos_VariablesCategorias pvc 
	    ON pvc.IdCategoria = pvsc.IdCategoria
	INNER JOIN  Presupuestos_Maquinaria_Categoria pmc
	    ON pmc.IdCategoria = vpl.IdCategoria

    WHERE Activar = 1
) AS SourceTable
PIVOT (
    MAX(Valor)
    FOR Clase IN (AñoMas1, AñoMas2, Base, Contracción, Expansión)
) AS PivotTable

```
