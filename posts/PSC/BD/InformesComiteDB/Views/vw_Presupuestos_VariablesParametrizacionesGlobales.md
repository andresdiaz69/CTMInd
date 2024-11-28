# View: vw_Presupuestos_VariablesParametrizacionesGlobales

## Usa los objetos:
- [[Presupuestos_Clases]]
- [[Presupuestos_VariablesParametrizaciones]]
- [[Presupuestos_VariablesParametrizacionesGlobales]]
- [[Presupuestos_VariablesTipos]]

```sql
CREATE VIEW [dbo].[vw_Presupuestos_VariablesParametrizacionesGlobales]
AS
SELECT        dbo.Presupuestos_VariablesParametrizacionesGlobales.IdClase, dbo.Presupuestos_Clases.Clase, dbo.Presupuestos_VariablesParametrizacionesGlobales.IdTipo, dbo.Presupuestos_VariablesTipos.Tipo, 
                         dbo.Presupuestos_VariablesTipos.IdParametrizacion, dbo.Presupuestos_VariablesParametrizaciones.Parametrizacion, dbo.Presupuestos_VariablesTipos.UnidadDeMedida, 
                         dbo.Presupuestos_VariablesTipos.Periodicidad, dbo.Presupuestos_VariablesTipos.Activar, dbo.Presupuestos_VariablesParametrizacionesGlobales.Ano_Periodo, dbo.Presupuestos_VariablesParametrizacionesGlobales.Valor
FROM            dbo.Presupuestos_VariablesParametrizacionesGlobales INNER JOIN
                         dbo.Presupuestos_Clases ON dbo.Presupuestos_VariablesParametrizacionesGlobales.IdClase = dbo.Presupuestos_Clases.IdClase INNER JOIN
                         dbo.Presupuestos_VariablesTipos ON dbo.Presupuestos_VariablesParametrizacionesGlobales.IdTipo = dbo.Presupuestos_VariablesTipos.IdTipo INNER JOIN
                         dbo.Presupuestos_VariablesParametrizaciones ON dbo.Presupuestos_VariablesTipos.IdParametrizacion = dbo.Presupuestos_VariablesParametrizaciones.IdParametrizacion

```
