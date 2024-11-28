# View: v_rhh_DIPs_SIIF_fp

## Usa los objetos:
- [[rhh_DIPs_SIIF_fp]]

```sql
CREATE VIEW v_rhh_DIPs_SIIF_fp
AS

    SELECT ROW_NUMBER() OVER(ORDER BY lote,convert(BIGINT,num_ide)) AS Consec, *, '800' AS SubTipo
    FROM rhh_DIPs_SIIF_fp;


```
