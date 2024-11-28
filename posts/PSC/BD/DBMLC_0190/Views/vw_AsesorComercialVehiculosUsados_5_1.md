# View: vw_AsesorComercialVehiculosUsados_5_1

## Usa los objetos:
- [[ExogenasRetomasUsados]]

```sql


CREATE VIEW [dbo].[vw_AsesorComercialVehiculosUsados_5_1]
AS
SELECT        CodigoEmpleado, Ano, Mes, SUM(RetomasUsados) AS RetomasUsados
FROM            dbo.ExogenasRetomasUsados
WHERE EsCompra = 0
GROUP BY CodigoEmpleado, Ano, Mes


```
