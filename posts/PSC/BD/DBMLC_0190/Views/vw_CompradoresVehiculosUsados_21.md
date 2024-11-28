# View: vw_CompradoresVehiculosUsados_21

## Usa los objetos:
- [[ExogenasVehiculosUsadosCompra]]

```sql

CREATE VIEW [dbo].[vw_CompradoresVehiculosUsados_21]
AS
select CodigoEmpleado, Ano, Mes, sum(RetomasUsados) as ComprasUsados 
from  ExogenasVehiculosUsadosCompra
WHERE EsCompra = 1
group by CodigoEmpleado, Ano, Mes


```
