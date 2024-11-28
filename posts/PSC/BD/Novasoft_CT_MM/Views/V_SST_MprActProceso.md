# View: V_SST_MprActProceso

## Usa los objetos:
- [[GTH_Matriz_Actividad]]
- [[GTH_Matriz_ActProcesos]]

```sql
CREATE VIEW [dbo].[V_SST_MprActProceso]
AS
SELECT        AP.cod_actividad, A.des_actividad, AP.cod_cia, AP.cod_proc
FROM            dbo.GTH_Matriz_ActProcesos AS AP WITH (NOLOCK) INNER JOIN
                         dbo.GTH_Matriz_Actividad AS A WITH (NOLOCK) ON AP.cod_actividad = A.cod_actividad

```
