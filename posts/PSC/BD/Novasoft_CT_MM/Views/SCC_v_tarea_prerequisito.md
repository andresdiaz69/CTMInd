# View: SCC_v_tarea_prerequisito

## Usa los objetos:
- [[SCC_ParamTarea]]

```sql


CREATE VIEW [dbo].[SCC_v_tarea_prerequisito]
AS
SELECT '0' AS cod_tarea,'Sin Pre-requisito' AS Nombre_Tarea,'0' as Ind_tramite, '0' AS Tipo_SCC,'0' as Cod_Proceso,'0' AS Cod_Area
UNION
SELECT DISTINCT cod_tarea,Nombre_Tarea,Ind_tramite,Tipo_SCC,Cod_Proceso,Cod_Area
FROM SCC_ParamTarea


```
