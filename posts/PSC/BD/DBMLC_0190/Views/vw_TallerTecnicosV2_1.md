# View: vw_TallerTecnicosV2_1

## Usa los objetos:
- [[vw_TallerTecnicosV2_1_Detalle]]

```sql
CREATE VIEW [dbo].[vw_TallerTecnicosV2_1]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaOperario, SUM(UnidadesVendidas) AS UnidadesVendidas, CodigoEmpleado, Empleado, FechaRetiro, IdRangoMaestra, IdRangoVersionMax
FROM            dbo.vw_TallerTecnicosV2_1_Detalle
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaOperario, CodigoEmpleado, Empleado, FechaRetiro, IdRangoMaestra, IdRangoVersionMax

```
