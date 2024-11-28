# View: vw_JefesDePostVentaRenault_5

## Usa los objetos:
- [[vw_JefesDePostVentaRenault_4]]

```sql

CREATE VIEW [dbo].[vw_JefesDePostVentaRenault_5]
AS
SELECT        CodigoEmpleado, Ano_Periodo, Mes_Periodo, MAX(ValorVariable) AS ValorVariable, SUM(Facturacion) AS Facturacion, SUM(Comision_Facturacion) AS Comision_Facturacion
FROM            dbo.vw_JefesDePostVentaRenault_4
GROUP BY CodigoEmpleado, Ano_Periodo, Mes_Periodo


```
