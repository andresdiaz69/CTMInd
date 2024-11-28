# View: V_GTH_MatrizProceso

## Usa los objetos:
- [[GTH_Matriz_Actividad]]
- [[GTH_Matriz_Proceso]]

```sql

CREATE VIEW [dbo].[V_GTH_MatrizProceso]
AS
SELECT        dbo.GTH_Matriz_Proceso.cod_cia, dbo.GTH_Matriz_Proceso.cod_proc, dbo.GTH_Matriz_Proceso.cod_matriz, dbo.GTH_Matriz_Actividad.des_actividad
FROM            dbo.GTH_Matriz_Proceso INNER JOIN
                         dbo.GTH_Matriz_Actividad ON dbo.GTH_Matriz_Proceso.cod_actividad = dbo.GTH_Matriz_Actividad.cod_actividad

```
