# View: V_GTH_Matriz_ActArea

## Usa los objetos:
- [[GTH_Matriz_ActArea]]
- [[GTH_Matriz_Actividad]]

```sql

CREATE VIEW [dbo].[V_GTH_Matriz_ActArea]
AS
SELECT        dbo.GTH_Matriz_ActArea.cod_cia, dbo.GTH_Matriz_ActArea.cod_area, dbo.GTH_Matriz_ActArea.cod_actividad, dbo.GTH_Matriz_Actividad.des_actividad
FROM            dbo.GTH_Matriz_ActArea INNER JOIN
                         dbo.GTH_Matriz_Actividad ON dbo.GTH_Matriz_ActArea.cod_actividad = dbo.GTH_Matriz_Actividad.cod_actividad

```
