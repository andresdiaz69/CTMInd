# View: vw_TallerTecnicosV3_1

## Usa los objetos:
- [[vw_TallerTecnicosV3_1_Detalle]]

```sql







CREATE VIEW [dbo].[vw_TallerTecnicosV3_1]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoEmpleado, CedulaOperario,  Empleado, FechaRetiro, 

SUM(UnidadesVendidas_Total) AS UnidadesVendidas_Total, 
SUM(UnidadesVendidas_Normal) AS UnidadesVendidas_Normal, 

IdRangoMaestra, IdRangoVersionMax
FROM            dbo.vw_TallerTecnicosV3_1_Detalle
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaOperario, CodigoEmpleado, Empleado, FechaRetiro, IdRangoMaestra, IdRangoVersionMax

```
