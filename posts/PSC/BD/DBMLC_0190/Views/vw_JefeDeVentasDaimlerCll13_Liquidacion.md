# View: vw_JefeDeVentasDaimlerCll13_Liquidacion

## Usa los objetos:
- [[vw_EmpleadosDetalle]]
- [[vw_JefeDeVentasDaimlerCll13_1]]
- [[vw_JefeDeVentasDaimlerCll13_2]]
- [[vw_JefeDeVentasDaimlerCll13_3]]
- [[vw_JefeDeVentasDaimlerCll13_4]]

```sql


CREATE VIEW [dbo].[vw_JefeDeVentasDaimlerCll13_Liquidacion]
AS
SELECT DISTINCT 
                         dbo.vw_JefeDeVentasDaimlerCll13_1.Ano_Periodo, dbo.vw_JefeDeVentasDaimlerCll13_1.Mes_Periodo, dbo.vw_JefeDeVentasDaimlerCll13_1.CodigoEmpleado, dbo.vw_EmpleadosDetalle.Empleado, 
                         dbo.vw_EmpleadosDetalle.CodigoEmpresa, dbo.vw_EmpleadosDetalle.NombreEmpresa, dbo.vw_EmpleadosDetalle.FechaIngreso, dbo.vw_EmpleadosDetalle.FechaRetiro, 
                         dbo.vw_JefeDeVentasDaimlerCll13_1.IdComisionModeloSub, ISNULL(dbo.vw_JefeDeVentasDaimlerCll13_1.PesoComercial, 0) AS PesoComercial_Mitsubishi, 
                         ISNULL(dbo.vw_JefeDeVentasDaimlerCll13_1.Comision_PesoComercial, 0) AS Comision_PesoComercial_Mitsubishi, ISNULL(dbo.vw_JefeDeVentasDaimlerCll13_2.PesoComercial, 0) AS PesoComercial_Fuso, 
                         ISNULL(dbo.vw_JefeDeVentasDaimlerCll13_2.Comision_PesoComercial, 0) AS Comision_PesoComercial_Fuso, ISNULL(dbo.vw_JefeDeVentasDaimlerCll13_3.ColocacionCreditos, 0) AS ColocacionCreditos, 
                         ISNULL(dbo.vw_JefeDeVentasDaimlerCll13_3.Comision_ColocacionCreditos, 0) AS Comision_ColocacionCreditos, ISNULL(dbo.vw_JefeDeVentasDaimlerCll13_4.EficienciaAdministrativa, 0) AS EficienciaAdministrativa, 
                         ISNULL(dbo.vw_JefeDeVentasDaimlerCll13_4.Comision_EficienciaAdministrativa, 0) AS Comision_EficienciaAdministrativa, ISNULL(dbo.vw_JefeDeVentasDaimlerCll13_1.Comision_PesoComercial, 0) 
                         + ISNULL(dbo.vw_JefeDeVentasDaimlerCll13_2.Comision_PesoComercial, 0) + ISNULL(dbo.vw_JefeDeVentasDaimlerCll13_3.Comision_ColocacionCreditos, 0) 
                         + ISNULL(dbo.vw_JefeDeVentasDaimlerCll13_4.Comision_EficienciaAdministrativa, 0) AS Comision_TOTAL, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.vw_JefeDeVentasDaimlerCll13_1 LEFT OUTER JOIN
                         dbo.vw_JefeDeVentasDaimlerCll13_4 ON dbo.vw_JefeDeVentasDaimlerCll13_1.Ano_Periodo = dbo.vw_JefeDeVentasDaimlerCll13_4.Ano_Periodo AND 
                         dbo.vw_JefeDeVentasDaimlerCll13_1.Mes_Periodo = dbo.vw_JefeDeVentasDaimlerCll13_4.Mes_Periodo AND 
                         dbo.vw_JefeDeVentasDaimlerCll13_1.CodigoEmpleado = dbo.vw_JefeDeVentasDaimlerCll13_4.CodigoEmpleado LEFT OUTER JOIN
                         dbo.vw_JefeDeVentasDaimlerCll13_3 ON dbo.vw_JefeDeVentasDaimlerCll13_1.Ano_Periodo = dbo.vw_JefeDeVentasDaimlerCll13_3.Ano_Periodo AND 
                         dbo.vw_JefeDeVentasDaimlerCll13_1.Mes_Periodo = dbo.vw_JefeDeVentasDaimlerCll13_3.Mes_Periodo AND 
                         dbo.vw_JefeDeVentasDaimlerCll13_1.CodigoEmpleado = dbo.vw_JefeDeVentasDaimlerCll13_3.CodigoEmpleado LEFT OUTER JOIN
                         dbo.vw_JefeDeVentasDaimlerCll13_2 ON dbo.vw_JefeDeVentasDaimlerCll13_1.CodigoEmpleado = dbo.vw_JefeDeVentasDaimlerCll13_2.CodigoEmpleado AND 
                         dbo.vw_JefeDeVentasDaimlerCll13_1.Mes_Periodo = dbo.vw_JefeDeVentasDaimlerCll13_2.Mes_Periodo AND 
                         dbo.vw_JefeDeVentasDaimlerCll13_1.Ano_Periodo = dbo.vw_JefeDeVentasDaimlerCll13_2.Ano_Periodo LEFT OUTER JOIN
                         dbo.vw_EmpleadosDetalle ON dbo.vw_JefeDeVentasDaimlerCll13_1.CodigoEmpleado = dbo.vw_EmpleadosDetalle.CodigoEmpleado

```
