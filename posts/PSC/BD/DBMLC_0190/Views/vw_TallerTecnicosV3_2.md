# View: vw_TallerTecnicosV3_2

## Usa los objetos:
- [[vw_TallerTecnicosV3_2_Detalle]]

```sql






CREATE VIEW [dbo].[vw_TallerTecnicosV3_2]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoEmpleado, CedulaOperario, Empleado, FechaRetiro, 

SUM(UnidadesVendidas_Total) AS UnidadesVendidas_Total, 
SUM(UnidadesVendidas_Elevado) AS UnidadesVendidas_Elevado, 

 IdRangoMaestra, IdRangoVersionMax
FROM            dbo.vw_TallerTecnicosV3_2_Detalle
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaOperario, CodigoEmpleado, Empleado, FechaRetiro, IdRangoMaestra, IdRangoVersionMax

```
