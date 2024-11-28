# View: vw_JefeNacionalDeServicioCT_Liquidacion

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[ExogenasJefesTallerCT]]
- [[vw_JefeNacionalDeServicioCT_1]]
- [[vw_JefeNacionalDeServicioCT_2]]
- [[vw_RangosMaestrasFull]]

```sql





CREATE VIEW [dbo].[vw_JefeNacionalDeServicioCT_Liquidacion]
AS
SELECT DISTINCT 
                         dbo.ExogenasJefesTallerCT.Ano AS Ano_Periodo, dbo.ExogenasJefesTallerCT.Mes AS Mes_Periodo, dbo.ExogenasJefesTallerCT.CodigoEmpleado, 
                         dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS Empleado, dbo.Empleados.CodigoEmpresa, dbo.Empleados.FechaIngreso, dbo.Empleados.FechaRetiro, 
                         ISNULL(dbo.vw_JefeNacionalDeServicioCT_1.Rotacion, 0) AS Rotacion, ISNULL(dbo.vw_JefeNacionalDeServicioCT_1.Valor, 0) AS Comision_Rotacion, ISNULL(dbo.vw_JefeNacionalDeServicioCT_2.Satisfaccion, 0) AS Satisfaccion, ISNULL(dbo.vw_JefeNacionalDeServicioCT_2.Valor, 0) 
                         AS Comision_Satisfaccion, ISNULL(dbo.vw_JefeNacionalDeServicioCT_1.Valor, 0) + ISNULL(dbo.vw_JefeNacionalDeServicioCT_2.Valor, 0) AS Comision_TOTAL, dbo.vw_RangosMaestrasFull.IdComisionModeloSub, 0 AS IdLiquidacion, 0 AS IdHistorico, 
                         GETDATE() AS FechaLiquidacion
FROM            dbo.ExogenasJefesTallerCT INNER JOIN
                         dbo.EmpleadosRangosMaestras ON dbo.ExogenasJefesTallerCT.CodigoEmpleado = dbo.EmpleadosRangosMaestras.CodigoEmpleado INNER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosMaestrasFull.IdRangoMaestra LEFT OUTER JOIN
                         dbo.vw_JefeNacionalDeServicioCT_2 ON dbo.ExogenasJefesTallerCT.CodigoEmpleado = dbo.vw_JefeNacionalDeServicioCT_2.CodigoEmpleado AND dbo.ExogenasJefesTallerCT.Ano = dbo.vw_JefeNacionalDeServicioCT_2.Ano_Periodo AND 
                         dbo.ExogenasJefesTallerCT.Mes = dbo.vw_JefeNacionalDeServicioCT_2.Mes_Periodo LEFT OUTER JOIN
                         dbo.vw_JefeNacionalDeServicioCT_1 ON dbo.ExogenasJefesTallerCT.CodigoEmpleado = dbo.vw_JefeNacionalDeServicioCT_1.CodigoEmpleado AND dbo.ExogenasJefesTallerCT.Ano = dbo.vw_JefeNacionalDeServicioCT_1.Ano_Periodo AND 
                         dbo.ExogenasJefesTallerCT.Mes = dbo.vw_JefeNacionalDeServicioCT_1.Mes_Periodo LEFT OUTER JOIN
                         dbo.Empleados ON dbo.ExogenasJefesTallerCT.CodigoEmpleado = dbo.Empleados.CodigoEmpleado
WHERE        (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 33)







```
