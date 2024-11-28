# View: vw_Presupuestos_Variables

## Usa los objetos:
- [[Presupuestos_VariablesCategorias]]
- [[Presupuestos_VariablesParametrizaciones]]
- [[Presupuestos_VariablesSubCategorias]]
- [[Presupuestos_VariablesTipos]]

```sql



CREATE VIEW [dbo].[vw_Presupuestos_Variables]
AS
SELECT        dbo.Presupuestos_VariablesCategorias.IdCategoria, dbo.Presupuestos_VariablesCategorias.Categoria, dbo.Presupuestos_VariablesSubCategorias.IdSubCategoria, dbo.Presupuestos_VariablesSubCategorias.SubCategoria, 
                         dbo.Presupuestos_VariablesTipos.IdTipo, dbo.Presupuestos_VariablesTipos.Tipo, dbo.Presupuestos_VariablesTipos.IdParametrizacion, dbo.Presupuestos_VariablesParametrizaciones.Parametrizacion, 
                         dbo.Presupuestos_VariablesTipos.UnidadDeMedida, dbo.Presupuestos_VariablesTipos.Periodicidad, dbo.Presupuestos_VariablesTipos.Activar
FROM            dbo.Presupuestos_VariablesTipos LEFT OUTER JOIN
                         dbo.Presupuestos_VariablesParametrizaciones ON dbo.Presupuestos_VariablesTipos.IdParametrizacion = dbo.Presupuestos_VariablesParametrizaciones.IdParametrizacion RIGHT OUTER JOIN
                         dbo.Presupuestos_VariablesSubCategorias ON dbo.Presupuestos_VariablesTipos.IdSubCategoria = dbo.Presupuestos_VariablesSubCategorias.IdSubCategoria RIGHT OUTER JOIN
                         dbo.Presupuestos_VariablesCategorias ON dbo.Presupuestos_VariablesSubCategorias.IdCategoria = dbo.Presupuestos_VariablesCategorias.IdCategoria

```
