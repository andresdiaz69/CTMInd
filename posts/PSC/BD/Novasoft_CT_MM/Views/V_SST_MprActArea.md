# View: V_SST_MprActArea

## Usa los objetos:
- [[GTH_Matriz_ActArea]]
- [[GTH_Matriz_Actividad]]

```sql
CREATE VIEW [dbo].[V_SST_MprActArea]
AS
SELECT        AA.cod_actividad, A.des_actividad, AA.cod_cia, AA.cod_area
FROM            dbo.GTH_Matriz_ActArea AS AA WITH (NOLOCK) INNER JOIN
                         dbo.GTH_Matriz_Actividad AS A WITH (NOLOCK) ON AA.cod_actividad = A.cod_actividad

```
