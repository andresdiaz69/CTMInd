# View: vw_Promotec_ProductosByAseguradoras

## Usa los objetos:
- [[Promotec_Aseguradoras]]
- [[Promotec_Item]]
- [[Promotec_Productos]]

```sql
CREATE VIEW [dbo].[vw_Promotec_ProductosByAseguradoras] AS
SELECT DISTINCT A.IdAseg, B.Aseguradora, (B.Estado)EstadoAseguradora, A.IdProd, C.Producto, (C.Estado)EstadoProducto
FROM Promotec_Item A
LEFT JOIN  Promotec_Aseguradoras B ON A.IdAseg = B.IdAseg 
LEFT JOIN  Promotec_Productos	 C ON A.IdProd = C.IdProd
WHERE B.Estado = 1

```
