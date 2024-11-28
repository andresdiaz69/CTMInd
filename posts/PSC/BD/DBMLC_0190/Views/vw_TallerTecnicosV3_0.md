# View: vw_TallerTecnicosV3_0

## Usa los objetos:
- [[vw_TallerTecnicosV3_0_Detalle]]

```sql






CREATE VIEW [dbo].[vw_TallerTecnicosV3_0]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoEmpleado, CedulaOperario, Empleado, FechaRetiro, SUM(UnidadesVendidas) AS UnidadesVendidas_Total
FROM            dbo.vw_TallerTecnicosV3_0_Detalle
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaOperario, CodigoEmpleado, Empleado, FechaRetiro

```
