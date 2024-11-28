# View: vw_AsesorComercialVehiculosUsados_6_1

## Usa los objetos:
- [[ExogenasVehiculosVentasEquirent]]

```sql




CREATE VIEW [dbo].[vw_AsesorComercialVehiculosUsados_6_1]
AS
SELECT        CodigoEmpleado, Ano, Mes, SUM(TotalVenta) AS TotalVentaEquirent
FROM            dbo.ExogenasVehiculosVentasEquirent
GROUP BY CodigoEmpleado, Ano, Mes


```
