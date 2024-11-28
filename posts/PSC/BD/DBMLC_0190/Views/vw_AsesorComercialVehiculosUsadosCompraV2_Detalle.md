# View: vw_AsesorComercialVehiculosUsadosCompraV2_Detalle

## Usa los objetos:
- [[ExogenasRetomasUsados]]

```sql




CREATE VIEW [dbo].[vw_AsesorComercialVehiculosUsadosCompraV2_Detalle]
AS
SELECT        CodigoEmpleado, Ano, Mes, SUM(RetomasUsados) AS ComprasUsados
FROM            dbo.ExogenasRetomasUsados
WHERE EsCompra = 1
GROUP BY CodigoEmpleado, Ano, Mes


```
