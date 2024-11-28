# View: V_GTH_MatrizArea

## Usa los objetos:
- [[GTH_Matriz_Actividad]]
- [[GTH_Matriz_Area]]

```sql

CREATE VIEW [dbo].[V_GTH_MatrizArea]
AS
SELECT        dbo.GTH_Matriz_Area.cod_cia, dbo.GTH_Matriz_Area.cod_area, dbo.GTH_Matriz_Area.cod_matriz, dbo.GTH_Matriz_Actividad.des_actividad
FROM            dbo.GTH_Matriz_Area INNER JOIN
                         dbo.GTH_Matriz_Actividad ON dbo.GTH_Matriz_Area.cod_actividad = dbo.GTH_Matriz_Actividad.cod_actividad

```
