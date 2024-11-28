# View: vw_TallerTecnicos_1

## Usa los objetos:
- [[vw_TallerTecnicos_1_Detalle]]

```sql
CREATE VIEW [dbo].[vw_TallerTecnicos_1]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaOperario, SUM(UnidadesVendidas) AS UnidadesVendidas, CodigoEmpleado, Empleado, FechaRetiro, IdRangoMaestra, IdRangoVersionMax
FROM            dbo.vw_TallerTecnicos_1_Detalle
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaOperario, CodigoEmpleado, Empleado, FechaRetiro, IdRangoMaestra, IdRangoVersionMax


```
