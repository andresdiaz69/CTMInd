# View: vw_Presupuestos_Variables_Macroeconomicas

## Usa los objetos:
- [[Presupuestos_Clases]]
- [[Presupuestos_VariablesCategorias]]
- [[Presupuestos_VariablesParametrizacionesGlobales]]
- [[Presupuestos_VariablesSubCategorias]]
- [[Presupuestos_VariablesTipos]]

```sql
CREATE VIEW [dbo].[vw_Presupuestos_Variables_Macroeconomicas]
AS
SELECT IdTipo, Categoria, IdSubCategoria, SubCategoria, Variable = Tipo, UnidadDeMedida, [Expansión], [Base], [Contracción], [AñoMas1], [AñoMas2], Ano_Periodo
FROM (
    SELECT vt.IdTipo, vt.Tipo, vt.UnidadDeMedida, pc.Clase, vpg.Valor, pvsc.IdSubCategoria, pvsc.SubCategoria, pvc.Categoria, vpg.Ano_Periodo
    FROM Presupuestos_VariablesTipos vt
    INNER JOIN Presupuestos_VariablesParametrizacionesGlobales vpg 
        ON vt.IdTipo = vpg.IdTipo
    INNER JOIN Presupuestos_Clases pc 
        ON vpg.IdClase = pc.IdClase
    INNER JOIN Presupuestos_VariablesSubCategorias pvsc 
        ON pvsc.IdSubCategoria = vt.IdSubCategoria
	INNER JOIN Presupuestos_VariablesCategorias pvc 
	    ON pvc.IdCategoria = pvsc.IdCategoria
	WHERE Activar = 1
) AS SourceTable
PIVOT (
    MAX(Valor)
    FOR Clase IN ([AñoMas1], [AñoMas2], [Base], [Contracción], [Expansión])
) AS PivotTable

```
