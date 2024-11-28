# View: V_GTH_Matriz_ActProcesos

## Usa los objetos:
- [[GTH_Matriz_Actividad]]
- [[GTH_Matriz_ActProcesos]]

```sql

CREATE VIEW [dbo].[V_GTH_Matriz_ActProcesos]
AS
SELECT        dbo.GTH_Matriz_ActProcesos.cod_cia, dbo.GTH_Matriz_ActProcesos.cod_proc, dbo.GTH_Matriz_ActProcesos.cod_actividad, 
                         dbo.GTH_Matriz_Actividad.des_actividad
FROM            dbo.GTH_Matriz_ActProcesos INNER JOIN
                         dbo.GTH_Matriz_Actividad ON dbo.GTH_Matriz_ActProcesos.cod_actividad = dbo.GTH_Matriz_Actividad.cod_actividad

```
