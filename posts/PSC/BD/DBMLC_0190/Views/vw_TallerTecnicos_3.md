# View: vw_TallerTecnicos_3

## Usa los objetos:
- [[vw_TallerTecnicos_1]]
- [[vw_TallerTecnicos_2]]

```sql
CREATE VIEW [dbo].[vw_TallerTecnicos_3]
AS
SELECT        dbo.vw_TallerTecnicos_1.Ano_Periodo, dbo.vw_TallerTecnicos_1.Mes_Periodo, dbo.vw_TallerTecnicos_1.CodigoEmpresa, dbo.vw_TallerTecnicos_1.CedulaOperario, ISNULL(dbo.vw_TallerTecnicos_1.UnidadesVendidas, 0) 
                         AS UnidadesVendidas, dbo.vw_TallerTecnicos_1.CodigoEmpleado, dbo.vw_TallerTecnicos_1.Empleado, dbo.vw_TallerTecnicos_1.FechaRetiro, dbo.vw_TallerTecnicos_1.IdRangoMaestra, 
                         dbo.vw_TallerTecnicos_1.IdRangoVersionMax, ISNULL(dbo.vw_TallerTecnicos_2.HorasImproductivas, 0) AS HorasImproductivas, ISNULL(dbo.vw_TallerTecnicos_1.UnidadesVendidas, 0) 
                         + ISNULL(dbo.vw_TallerTecnicos_2.HorasImproductivas, 0) AS UnidadesTotales
FROM            dbo.vw_TallerTecnicos_1 LEFT OUTER JOIN
                         dbo.vw_TallerTecnicos_2 ON dbo.vw_TallerTecnicos_1.CodigoEmpleado = dbo.vw_TallerTecnicos_2.CodigoEmpleado AND dbo.vw_TallerTecnicos_1.Ano_Periodo = dbo.vw_TallerTecnicos_2.Ano AND 
                         dbo.vw_TallerTecnicos_1.Mes_Periodo = dbo.vw_TallerTecnicos_2.Mes



```
