# View: V_HDK_Prioridades_Cliente

```sql

CREATE VIEW [dbo].[V_HDK_Prioridades_Cliente]
AS SELECT 1 AS Id_Prioridad,
		'Alta' AS Nom_prioridad
   UNION ALL
   SELECT 2 AS Id_Prioridad,
		'Media' AS Nom_prioridad
   UNION ALL
   SELECT 3 AS Id_Prioridad,
		'Baja' AS Nom_prioridad;


```
