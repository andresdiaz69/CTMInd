# View: vw_JefeDeColisionFabricaDeColisionCT_Liquidacion

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[ExogenasFabricaColisionCT]]
- [[vw_JefeDeColisionFabricaDeColisionCT_1]]
- [[vw_JefeDeColisionFabricaDeColisionCT_21]]
- [[vw_JefeDeColisionFabricaDeColisionCT_22]]
- [[vw_JefeDeColisionFabricaDeColisionCT_23]]
- [[vw_JefeDeColisionFabricaDeColisionCT_24]]
- [[vw_JefeDeColisionFabricaDeColisionCT_25]]
- [[vw_JefeDeColisionFabricaDeColisionCT_26]]
- [[vw_RangosMaestrasFull]]

```sql
CREATE VIEW [dbo].[vw_JefeDeColisionFabricaDeColisionCT_Liquidacion]
AS
SELECT DISTINCT 
                         dbo.ExogenasFabricaColisionCT.Ano AS Ano_Periodo, dbo.ExogenasFabricaColisionCT.Mes AS Mes_Periodo, dbo.ExogenasFabricaColisionCT.CodigoEmpleado, 
                         dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS Empleado, dbo.Empleados.CodigoEmpresa, dbo.Empleados.FechaIngreso, dbo.Empleados.FechaRetiro, 
                         ISNULL(dbo.vw_JefeDeColisionFabricaDeColisionCT_1.Rotacion, 0) AS Rotacion, ISNULL(dbo.vw_JefeDeColisionFabricaDeColisionCT_1.Valor, 0) AS Comision_Rotacion, 
                         ISNULL(dbo.vw_JefeDeColisionFabricaDeColisionCT_21.Satisfaccion_Mazda, 0) AS Satisfaccion_Mazda, ISNULL(dbo.vw_JefeDeColisionFabricaDeColisionCT_21.Valor, 0) AS Comision_Satisfaccion_Mazda, 
                         ISNULL(dbo.vw_JefeDeColisionFabricaDeColisionCT_22.Satisfaccion_Ford, 0) AS Satisfaccion_Ford, ISNULL(dbo.vw_JefeDeColisionFabricaDeColisionCT_22.Valor, 0) AS Comision_Satisfaccion_Ford, 
                         ISNULL(dbo.vw_JefeDeColisionFabricaDeColisionCT_23.Satisfaccion_Renault, 0) AS Satisfaccion_Renault, ISNULL(dbo.vw_JefeDeColisionFabricaDeColisionCT_23.Valor, 0) AS Comision_Satisfaccion_Renault, 
                         ISNULL(dbo.vw_JefeDeColisionFabricaDeColisionCT_24.Satisfaccion_Volkswagen, 0) AS Satisfaccion_Volkswagen, ISNULL(dbo.vw_JefeDeColisionFabricaDeColisionCT_24.Valor, 0) AS Comision_Satisfaccion_Volkswagen, 
                         ISNULL(dbo.vw_JefeDeColisionFabricaDeColisionCT_25.Satisfaccion_MercedesBenz, 0) AS Satisfaccion_Mercedes, ISNULL(dbo.vw_JefeDeColisionFabricaDeColisionCT_25.Valor, 0) AS Comision_Satisfaccion_Mercedes, 
                         ISNULL(dbo.vw_JefeDeColisionFabricaDeColisionCT_26.Satisfaccion_JohnDeere, 0) AS Satisfaccion_JohnDeere, ISNULL(dbo.vw_JefeDeColisionFabricaDeColisionCT_26.Valor, 0) AS Comision_Satisfaccion_JohnDeere, 
                         ISNULL(dbo.vw_JefeDeColisionFabricaDeColisionCT_1.Valor, 0) + ISNULL(dbo.vw_JefeDeColisionFabricaDeColisionCT_21.Valor, 0) + ISNULL(dbo.vw_JefeDeColisionFabricaDeColisionCT_22.Valor, 0) 
                         + ISNULL(dbo.vw_JefeDeColisionFabricaDeColisionCT_23.Valor, 0) + ISNULL(dbo.vw_JefeDeColisionFabricaDeColisionCT_24.Valor, 0) + ISNULL(dbo.vw_JefeDeColisionFabricaDeColisionCT_25.Valor, 0) 
                         + ISNULL(dbo.vw_JefeDeColisionFabricaDeColisionCT_26.Valor, 0) AS Comision_TOTAL, dbo.vw_RangosMaestrasFull.IdComisionModeloSub, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.ExogenasFabricaColisionCT INNER JOIN
                         dbo.EmpleadosRangosMaestras ON dbo.ExogenasFabricaColisionCT.CodigoEmpleado = dbo.EmpleadosRangosMaestras.CodigoEmpleado INNER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosMaestrasFull.IdRangoMaestra LEFT OUTER JOIN
                         dbo.vw_JefeDeColisionFabricaDeColisionCT_21 ON dbo.ExogenasFabricaColisionCT.CodigoEmpleado = dbo.vw_JefeDeColisionFabricaDeColisionCT_21.CodigoEmpleado AND 
                         dbo.ExogenasFabricaColisionCT.Ano = dbo.vw_JefeDeColisionFabricaDeColisionCT_21.Ano_Periodo AND dbo.ExogenasFabricaColisionCT.Mes = dbo.vw_JefeDeColisionFabricaDeColisionCT_21.Mes_Periodo LEFT OUTER JOIN
                         dbo.vw_JefeDeColisionFabricaDeColisionCT_22 ON dbo.ExogenasFabricaColisionCT.CodigoEmpleado = dbo.vw_JefeDeColisionFabricaDeColisionCT_22.CodigoEmpleado AND 
                         dbo.ExogenasFabricaColisionCT.Ano = dbo.vw_JefeDeColisionFabricaDeColisionCT_22.Ano_Periodo AND dbo.ExogenasFabricaColisionCT.Mes = dbo.vw_JefeDeColisionFabricaDeColisionCT_22.Mes_Periodo LEFT OUTER JOIN
                         dbo.vw_JefeDeColisionFabricaDeColisionCT_23 ON dbo.ExogenasFabricaColisionCT.CodigoEmpleado = dbo.vw_JefeDeColisionFabricaDeColisionCT_23.CodigoEmpleado AND 
                         dbo.ExogenasFabricaColisionCT.Ano = dbo.vw_JefeDeColisionFabricaDeColisionCT_23.Ano_Periodo AND dbo.ExogenasFabricaColisionCT.Mes = dbo.vw_JefeDeColisionFabricaDeColisionCT_23.Mes_Periodo LEFT OUTER JOIN
                         dbo.vw_JefeDeColisionFabricaDeColisionCT_24 ON dbo.ExogenasFabricaColisionCT.CodigoEmpleado = dbo.vw_JefeDeColisionFabricaDeColisionCT_24.CodigoEmpleado AND 
                         dbo.ExogenasFabricaColisionCT.Ano = dbo.vw_JefeDeColisionFabricaDeColisionCT_24.Ano_Periodo AND dbo.ExogenasFabricaColisionCT.Mes = dbo.vw_JefeDeColisionFabricaDeColisionCT_24.Mes_Periodo LEFT OUTER JOIN
                         dbo.vw_JefeDeColisionFabricaDeColisionCT_25 ON dbo.ExogenasFabricaColisionCT.CodigoEmpleado = dbo.vw_JefeDeColisionFabricaDeColisionCT_25.CodigoEmpleado AND 
                         dbo.ExogenasFabricaColisionCT.Ano = dbo.vw_JefeDeColisionFabricaDeColisionCT_25.Ano_Periodo AND dbo.ExogenasFabricaColisionCT.Mes = dbo.vw_JefeDeColisionFabricaDeColisionCT_25.Mes_Periodo LEFT OUTER JOIN
                         dbo.vw_JefeDeColisionFabricaDeColisionCT_26 ON dbo.ExogenasFabricaColisionCT.CodigoEmpleado = dbo.vw_JefeDeColisionFabricaDeColisionCT_26.CodigoEmpleado AND 
                         dbo.ExogenasFabricaColisionCT.Ano = dbo.vw_JefeDeColisionFabricaDeColisionCT_26.Ano_Periodo AND dbo.ExogenasFabricaColisionCT.Mes = dbo.vw_JefeDeColisionFabricaDeColisionCT_26.Mes_Periodo LEFT OUTER JOIN
                         dbo.vw_JefeDeColisionFabricaDeColisionCT_1 ON dbo.ExogenasFabricaColisionCT.CodigoEmpleado = dbo.vw_JefeDeColisionFabricaDeColisionCT_1.CodigoEmpleado AND 
                         dbo.ExogenasFabricaColisionCT.Ano = dbo.vw_JefeDeColisionFabricaDeColisionCT_1.Ano_Periodo AND dbo.ExogenasFabricaColisionCT.Mes = dbo.vw_JefeDeColisionFabricaDeColisionCT_1.Mes_Periodo LEFT OUTER JOIN
                         dbo.Empleados ON dbo.ExogenasFabricaColisionCT.CodigoEmpleado = dbo.Empleados.CodigoEmpleado
WHERE        (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 45)

```
