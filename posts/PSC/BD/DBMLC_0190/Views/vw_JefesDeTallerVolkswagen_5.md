# View: vw_JefesDeTallerVolkswagen_5

## Usa los objetos:
- [[vw_JefesDeTallerVolkswagen_4]]

```sql





CREATE VIEW [dbo].[vw_JefesDeTallerVolkswagen_5]
AS
SELECT        CodigoEmpleado, Ano_Periodo, Mes_Periodo, MAX(ValorVariable) AS ValorVariable, SUM(Facturacion) AS Facturacion, SUM(Comision_Facturacion) AS Comision_Facturacion
FROM            dbo.vw_JefesDeTallerVolkswagen_4
GROUP BY CodigoEmpleado, Ano_Periodo, Mes_Periodo


```
