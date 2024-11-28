# View: vw_AsesorComercialVehiculosUsados_4_1

## Usa los objetos:
- [[ExogenasRetomasUsados]]

```sql


CREATE VIEW [dbo].[vw_AsesorComercialVehiculosUsados_4_1]
AS
SELECT        CodigoEmpleado, Ano, Mes, SUM(RetomasUsados) AS ComprasUsados
FROM            dbo.ExogenasRetomasUsados
WHERE EsCompra = 1
GROUP BY CodigoEmpleado, Ano, Mes


```
