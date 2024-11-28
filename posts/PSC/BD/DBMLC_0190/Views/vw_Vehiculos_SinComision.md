# View: vw_Vehiculos_SinComision

## Usa los objetos:
- [[vw_Vehiculos]]

```sql
CREATE VIEW [dbo].[vw_Vehiculos_SinComision]
AS
SELECT        CodigoMarca, Marca, COUNT(ValorComision) AS Cantidad
FROM            dbo.vw_Vehiculos
WHERE        (ValorComision = 0)
GROUP BY Marca, CodigoMarca


```
