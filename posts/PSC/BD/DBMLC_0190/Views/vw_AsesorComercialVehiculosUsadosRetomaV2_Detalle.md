# View: vw_AsesorComercialVehiculosUsadosRetomaV2_Detalle

## Usa los objetos:
- [[ExogenasRetomasUsados]]

```sql




CREATE VIEW [dbo].[vw_AsesorComercialVehiculosUsadosRetomaV2_Detalle]
AS
SELECT        CodigoEmpleado, Ano, Mes, SUM(RetomasUsados) AS RetomasUsados
FROM            dbo.ExogenasRetomasUsados
WHERE EsCompra = 0
GROUP BY CodigoEmpleado, Ano, Mes


```
