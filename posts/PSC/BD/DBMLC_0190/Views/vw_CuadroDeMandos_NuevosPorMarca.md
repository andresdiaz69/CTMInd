# View: vw_CuadroDeMandos_NuevosPorMarca

## Usa los objetos:
- [[ComisionesSpigaVN]]

```sql
CREATE VIEW [dbo].[vw_CuadroDeMandos_NuevosPorMarca]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoMArca, Marca, 


COUNT(*) AS Facturas_Unidades, 
SUM(TotalFactura) AS Facturas_Valor, 

COUNT(NumerEntregas) AS Entregas_Unidades,
SUM(CASE WHEN NumerEntregas  > 0 THEN TotalFactura ELSE 0 END) AS Entregas_Valor,
SUM(CASE WHEN NumerEntregas  > 0 THEN (TotalFactura * 0.99) ELSE 0 END) AS Entregas_Costo,

SUM(CASE WHEN NumerEntregas  > 0 THEN TotalFactura ELSE 0 END) - SUM(CASE WHEN NumerEntregas  > 0 THEN (TotalFactura * 0.99) ELSE 0 END) AS UtilidadBruta,

CASE WHEN 
SUM(CASE WHEN NumerEntregas  > 0 THEN TotalFactura ELSE 0 END) <> 0
THEN 1 - SUM(CASE WHEN NumerEntregas  > 0 THEN (TotalFactura * 0.99) ELSE 0 END) / SUM(CASE WHEN NumerEntregas  > 0 THEN TotalFactura ELSE 0 END)
ELSE 0
END AS Stock_Porcentaje, 

COUNT(*) - 1 AS Stock_Unidades, 
SUM(TotalFactura * 0.95) AS Stock_Valor, 

COUNT(*) - 5  AS Inventario_Unidades, 
SUM(TotalFactura * 0.90) AS Inventario_Valor



FROM            dbo.ComisionesSpigaVN
GROUP BY Ano_Periodo, Mes_Periodo, CodigoMArca, Marca




```
