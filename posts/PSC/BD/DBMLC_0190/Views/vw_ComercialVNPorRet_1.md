# View: vw_ComercialVNPorRet_1

## Usa los objetos:
- [[ExogenasRetomasUsados]]

```sql
CREATE VIEW [dbo].[vw_ComercialVNPorRet_1]
AS
SELECT        CodigoEmpleado, Ano, Mes, SUM(RetomasUsados) AS RetomasUsados
FROM            dbo.ExogenasRetomasUsados
GROUP BY CodigoEmpleado, Ano, Mes


```
