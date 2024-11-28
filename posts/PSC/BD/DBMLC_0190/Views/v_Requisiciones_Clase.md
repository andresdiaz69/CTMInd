# View: v_Requisiciones_Clase

## Usa los objetos:
- [[Requisiciones_Clase]]
- [[Requisiciones_SubClase]]

```sql
CREATE VIEW [dbo].[v_Requisiciones_Clase] AS
SELECT A.CodClase, B.Clase, A.CodSubClase, A.SubClase, A.Activo, B.Area
FROM Requisiciones_SubClase A
LEFT JOIN Requisiciones_Clase B ON A.CodClase = B.CodClase

```
