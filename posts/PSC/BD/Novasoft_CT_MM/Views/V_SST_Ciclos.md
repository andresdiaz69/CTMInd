# View: V_SST_Ciclos

```sql
CREATE VIEW [dbo].[V_SST_Ciclos]
AS
SELECT 'P' AS Codigo, 'Planear' AS Descripcion, 1 AS Orden
UNION ALL
SELECT 'H' AS Codigo, 'Hacer' AS Descripcion, 2 AS Orden
UNION ALL
SELECT 'V' AS Codigo, 'Verificar' AS Descripcion, 3 AS Orden
UNION ALL
SELECT 'A' AS Codigo, 'Actuar' AS Descripcion, 4 AS Orden


```
