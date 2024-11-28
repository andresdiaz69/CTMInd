# View: vw_Alerta_AspNetTasks

## Usa los objetos:
- [[AspNetTasks]]
- [[AspNetTasks_Tareas]]
- [[AspNetTasks_TareasTipos]]

```sql

CREATE VIEW [dbo].[vw_Alerta_AspNetTasks]
AS
SELECT        dbo.AspNetTasks.Task, MAX(dbo.AspNetTasks.CreateDate) AS CreateDate, dbo.AspNetTasks_Tareas.IdTarea, dbo.AspNetTasks_Tareas.Tarea, dbo.AspNetTasks_Tareas.Activar, dbo.AspNetTasks_TareasTipos.IdTipo, 
                         dbo.AspNetTasks_TareasTipos.Tipo
FROM            dbo.AspNetTasks_TareasTipos INNER JOIN
                         dbo.AspNetTasks_Tareas ON dbo.AspNetTasks_TareasTipos.IdTipo = dbo.AspNetTasks_Tareas.IdTipo RIGHT OUTER JOIN
                         dbo.AspNetTasks ON dbo.AspNetTasks_Tareas.Tarea = dbo.AspNetTasks.Task
GROUP BY dbo.AspNetTasks.Task, dbo.AspNetTasks_Tareas.IdTarea, dbo.AspNetTasks_Tareas.Tarea, dbo.AspNetTasks_Tareas.Activar, dbo.AspNetTasks_TareasTipos.IdTipo, dbo.AspNetTasks_TareasTipos.Tipo

```
