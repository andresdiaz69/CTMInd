# View: vw_Presupuestos_Variables_PorLineas

## Usa los objetos:
- [[Presupuestos_Clases]]
- [[Presupuestos_VariablesCategorias]]
- [[Presupuestos_VariablesParametrizacionesPorLineas]]
- [[Presupuestos_VariablesSubCategorias]]
- [[Presupuestos_VariablesTipos]]

```sql

/****************************
-- Modificación: JUAN CARLOS SÁNCHEZ
-- Date: 2024|10|07
-- Descripción: Ya no se necesita cruzar con la tabla: Presupuestos_PresentacionesVsLinea
****************************/
 

CREATE VIEW [dbo].[vw_Presupuestos_Variables_PorLineas]
AS
SELECT CodigoLinea, 

--CodigoPresentacion, 
--NombrePresentacion, 

0 AS CodigoPresentacion, 
'' AS NombrePresentacion, 

IdTipo, Categoria, IdSubCategoria, SubCategoria, Variable = Tipo, UnidadDeMedida, [Expansión], [Base], [Contracción], [AñoMas1], [AñoMas2], Ano_Periodo
FROM (
    SELECT vt.IdTipo, 
	
	--inp.CodigoPresentacion,
	--inp.NombrePresentacion,  	
	
	vt.Tipo, vt.UnidadDeMedida, pc.Clase, vpl.Valor, pvsc.IdSubCategoria, pvsc.SubCategoria, pvc.Categoria, vpl.Ano_Periodo, vpl.CodigoLinea 
    FROM Presupuestos_VariablesTipos vt
    INNER JOIN [Presupuestos_VariablesParametrizacionesPorLineas] vpl 
        ON vt.IdTipo = vpl.IdTipo
    INNER JOIN Presupuestos_Clases pc 
        ON vpl.IdClase = pc.IdClase
    INNER JOIN Presupuestos_VariablesSubCategorias pvsc 
        ON pvsc.IdSubCategoria = vt.IdSubCategoria
	INNER JOIN Presupuestos_VariablesCategorias pvc 
	    ON pvc.IdCategoria = pvsc.IdCategoria
	--INNER JOIN  Presupuestos_PresentacionesVsLineas ppvl
	--    ON ppvl.CodigoLinea = vpl.CodigoLinea
	--INNER JOIN  InformesPresentaciones inp
	--    ON inp.CodigoPresentacion = ppvl.CodigoPresentacion
    WHERE Activar = 1
) AS SourceTable
PIVOT (
    MAX(Valor)
    FOR Clase IN ([AñoMas1], [AñoMas2], [Base], [Contracción], [Expansión])
) AS PivotTable

```
