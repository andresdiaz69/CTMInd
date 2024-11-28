# View: vw_Presupuestos_Variables_PorLineas_Trimestres

## Usa los objetos:
- [[Presupuestos_Clases]]
- [[Presupuestos_VariablesCategorias]]
- [[Presupuestos_VariablesParametrizacionesPorLineas_Trimestres]]
- [[Presupuestos_VariablesSubCategorias]]
- [[Presupuestos_VariablesTipos]]

```sql




/****************************
-- Modificación: JUAN CARLOS SÁNCHEZ
-- Date: 2024|10|07
-- Descripción: Ya no se necesita cruzar con la tabla: Presupuestos_PresentacionesVsLinea

-- Modificación: DANIEL
-- Date: 2024|10|10
-- Descripción: Se quita el CodigoLinea y MesPeriodo

-- Modificación: JUAN CARLOS SÁNCHEZ
-- Date: 2024|10|29
-- Descripción: Ahora incluye el IdClase
****************************/

CREATE VIEW [dbo].[vw_Presupuestos_Variables_PorLineas_Trimestres]
AS
SELECT pvsc.IdSubCategoria, pvsc.SubCategoria, pvc.Categoria,  vt.IdTipo,  vt.Tipo Variable, vt.UnidadDeMedida, pc.IdClase, pc.Clase, vplt.Valor_T1, vplt.Valor_T2, vplt.Valor_T3, vplt.Valor_T4, 
        vplt.Ano_Periodo
  FROM Presupuestos_VariablesTipos vt
 INNER JOIN [Presupuestos_VariablesParametrizacionesPorLineas_Trimestres] vplt 
       ON vt.IdTipo = vplt.IdTipo
 INNER JOIN Presupuestos_Clases pc 
       ON vplt.IdClase = pc.IdClase
 INNER JOIN Presupuestos_VariablesSubCategorias pvsc 
       ON pvsc.IdSubCategoria = vt.IdSubCategoria
 INNER JOIN Presupuestos_VariablesCategorias pvc 
       ON pvc.IdCategoria = pvsc.IdCategoria
 where Activar = 1

```
