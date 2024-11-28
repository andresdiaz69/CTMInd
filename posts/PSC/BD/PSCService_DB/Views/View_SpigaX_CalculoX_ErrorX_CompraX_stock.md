# View: View_SpigaX_CalculoX_ErrorX_CompraX_stock

## Usa los objetos:
- [[View_Spiga_Compras_Calculo_Error_Compra]]
- [[View_Spiga_Invent_Calculo_Error_Compra_stock]]

```sql
create VIEW  [dbo].[View_SpigaX_CalculoX_ErrorX_CompraX_stock] AS
SELECT a.*, b.VrCompras
FROM View_Spiga_Invent_Calculo_Error_Compra_stock a
LEFT JOIN View_Spiga_Compras_Calculo_Error_Compra b ON (a.IdEmpresas = b.IdEmpresas AND
                                                        a.IdCentros  = b.IdCentros  AND
														a.UltAñoCompra = b.Ano_Cierre AND
														a.UltMesCompra = b.Mes_Cierre)






```
