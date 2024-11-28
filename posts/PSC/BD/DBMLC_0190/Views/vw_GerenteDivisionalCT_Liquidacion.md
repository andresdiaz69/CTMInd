# View: vw_GerenteDivisionalCT_Liquidacion

## Usa los objetos:
- [[vw_EmpleadosDetalle]]
- [[vw_GerenteDivisionalCT_1]]
- [[vw_GerenteDivisionalCT_2]]
- [[vw_GerenteDivisionalCT_3]]
- [[vw_GerenteDivisionalCT_4]]

```sql









CREATE VIEW [dbo].[vw_GerenteDivisionalCT_Liquidacion]
AS
SELECT        dbo.vw_GerenteDivisionalCT_1.Ano_Periodo, dbo.vw_GerenteDivisionalCT_1.Mes_Periodo, dbo.vw_GerenteDivisionalCT_1.CodigoEmpleado, dbo.vw_EmpleadosDetalle.Empleado, dbo.vw_EmpleadosDetalle.CodigoEmpresa, 
                         dbo.vw_EmpleadosDetalle.NombreEmpresa, dbo.vw_EmpleadosDetalle.FechaIngreso, dbo.vw_EmpleadosDetalle.FechaRetiro, dbo.vw_GerenteDivisionalCT_1.IdComisionModeloSub, ISNULL(dbo.vw_GerenteDivisionalCT_1.EntregasEfectivas,0) as EntregasEfectivas_Renault, 
                         ISNULL(dbo.vw_GerenteDivisionalCT_1.VentasNacionales,0) as VentasNacionales_Renault,  ISNULL(dbo.vw_GerenteDivisionalCT_1.PesoComercial, 0) AS PesoComercial_Renault, 
                         ISNULL(dbo.vw_GerenteDivisionalCT_1.Comision_PesoComercial_Renault, 0) AS Comision_PesoComercial_Renault,ISNULL(dbo.vw_GerenteDivisionalCT_2.EntregasEfectivas,0) as EntregasEfectivas_DaimlerPC, 
                         ISNULL(dbo.vw_GerenteDivisionalCT_2.VentasNacionales,0) as VentasNacionales_DaimlerPC, ISNULL(dbo.vw_GerenteDivisionalCT_2.PesoComercial, 0) AS PesoComercial_DaimlerPC, 
                         ISNULL(dbo.vw_GerenteDivisionalCT_2.Comision_PesoComercial_DaimlerPC, 0) AS Comision_PesoComercial_DaimlerPC,ISNULL(dbo.vw_GerenteDivisionalCT_3.EntregasEfectivas,0) as EntregasEfectivas_DaimlerFuso, 
                         ISNULL(dbo.vw_GerenteDivisionalCT_3.VentasNacionales,0) as VentasNacionales_DaimlerFuso, ISNULL(dbo.vw_GerenteDivisionalCT_3.PesoComercial, 0) AS PesoComercial_DaimlerFuso, 
                         ISNULL(dbo.vw_GerenteDivisionalCT_3.Comision_PesoComercial_DaimlerFuso, 0) AS Comision_PesoComercial_DaimlerFuso, ISNULL(dbo.vw_GerenteDivisionalCT_4.EficienciaAdministrativa, 0) AS EficienciaAdministrativa, 
                         ISNULL(dbo.vw_GerenteDivisionalCT_4.Comision_EficienciaAdministrativa, 0) AS Comision_EficienciaAdministrativa, ISNULL(dbo.vw_GerenteDivisionalCT_1.Comision_PesoComercial_Renault, 0) + ISNULL(dbo.vw_GerenteDivisionalCT_2.Comision_PesoComercial_DaimlerPC, 0) 
						 + ISNULL(dbo.vw_GerenteDivisionalCT_3.Comision_PesoComercial_DaimlerFuso, 0) + ISNULL(dbo.vw_GerenteDivisionalCT_4.Comision_EficienciaAdministrativa, 0) AS Comision_TOTAL, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.vw_GerenteDivisionalCT_1 LEFT OUTER JOIN
                         dbo.vw_GerenteDivisionalCT_4 ON  
                         dbo.vw_GerenteDivisionalCT_1.CodigoEmpleado = dbo.vw_GerenteDivisionalCT_4.CodigoEmpleado AND dbo.vw_GerenteDivisionalCT_1.Ano_Periodo = dbo.vw_GerenteDivisionalCT_4.Ano_Periodo AND 
                         dbo.vw_GerenteDivisionalCT_1.Mes_Periodo = dbo.vw_GerenteDivisionalCT_4.Mes_Periodo LEFT OUTER JOIN
                         dbo.vw_GerenteDivisionalCT_2 ON 
                         dbo.vw_GerenteDivisionalCT_1.CodigoEmpleado = dbo.vw_GerenteDivisionalCT_2.CodigoEmpleado AND dbo.vw_GerenteDivisionalCT_1.Ano_Periodo = dbo.vw_GerenteDivisionalCT_2.Ano_Periodo AND 
                         dbo.vw_GerenteDivisionalCT_1.Mes_Periodo = dbo.vw_GerenteDivisionalCT_2.Mes_Periodo LEFT OUTER JOIN
                         dbo.vw_GerenteDivisionalCT_3 ON 
                         dbo.vw_GerenteDivisionalCT_1.CodigoEmpleado = dbo.vw_GerenteDivisionalCT_3.CodigoEmpleado AND dbo.vw_GerenteDivisionalCT_1.Ano_Periodo = dbo.vw_GerenteDivisionalCT_3.Ano_Periodo AND 
                         dbo.vw_GerenteDivisionalCT_1.Mes_Periodo = dbo.vw_GerenteDivisionalCT_3.Mes_Periodo LEFT OUTER JOIN
                         dbo.vw_EmpleadosDetalle ON dbo.vw_GerenteDivisionalCT_1.CodigoEmpleado = dbo.vw_EmpleadosDetalle.CodigoEmpleado

```
