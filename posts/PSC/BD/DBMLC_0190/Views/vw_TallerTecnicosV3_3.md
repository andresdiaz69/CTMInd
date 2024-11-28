# View: vw_TallerTecnicosV3_3

## Usa los objetos:
- [[vw_TallerTecnicosV3_3_Detalle]]

```sql






CREATE VIEW [dbo].[vw_TallerTecnicosV3_3]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoEmpleado, CedulaOperario, Empleado, FechaRetiro,

SUM(UnidadesVendidas_Total) AS UnidadesVendidas_Total, 
SUM(UnidadesVendidas_MuyElevado) AS UnidadesVendidas_MuyElevado, 

 IdRangoMaestra, IdRangoVersionMax
FROM            dbo.vw_TallerTecnicosV3_3_Detalle
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaOperario, CodigoEmpleado, Empleado, FechaRetiro, IdRangoMaestra, IdRangoVersionMax

```
