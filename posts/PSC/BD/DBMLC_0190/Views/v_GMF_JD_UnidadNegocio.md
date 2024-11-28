# View: v_GMF_JD_UnidadNegocio

## Usa los objetos:
- [[v_GMF_2_JD_ValoresVentasNetasTotalLineas]]

```sql

CREATE VIEW [dbo].[v_GMF_JD_UnidadNegocio]
AS
SELECT DISTINCT
ROW_NUMBER() OVER(
       ORDER BY CodigoPresentacion) as Id,
CodigoPresentacion, NombrePresentacion 
from v_GMF_2_JD_ValoresVentasNetasTotalLineas
group by CodigoPresentacion, NombrePresentacion 


```
