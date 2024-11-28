# View: vw_JefesDeTallerDAI_Liquidacion

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[ExogenasJefesTallerDAI]]
- [[vw_JefesDeTallerDAI_1]]
- [[vw_JefesDeTallerDAI_2]]
- [[vw_RangosMaestrasFull]]

```sql


CREATE VIEW [dbo].[vw_JefesDeTallerDAI_Liquidacion]
AS
SELECT DISTINCT 
                         dbo.ExogenasJefesTallerDAI.Ano AS Ano_Periodo, dbo.ExogenasJefesTallerDAI.Mes AS Mes_Periodo, dbo.ExogenasJefesTallerDAI.CodigoEmpleado, 
                         dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS Empleado, dbo.Empleados.CodigoEmpresa, dbo.Empleados.FechaIngreso, dbo.Empleados.FechaRetiro, 
                         
						 ISNULL(dbo.vw_JefesDeTallerDAI_1.Productividad, 0) AS Productividad, 
						 ISNULL(dbo.vw_JefesDeTallerDAI_1.Valor, 0) AS Comision_Productividad, 
						 ISNULL(dbo.vw_JefesDeTallerDAI_1.IdRangoMaestra, 0) AS IdRangoMaestra_Productividad,
						 ISNULL(dbo.vw_JefesDeTallerDAI_1.CodigoConcepto, 0) AS CodigoConcepto_Productividad,
						 
						 ISNULL(dbo.vw_JefesDeTallerDAI_2.Satisfaccion, 0) AS Satisfaccion, 
						 ISNULL(dbo.vw_JefesDeTallerDAI_2.Valor, 0) AS Comision_Satisfaccion, 
						 ISNULL(dbo.vw_JefesDeTallerDAI_2.IdRangoMaestra, 0) AS IdRangoMaestra_Satisfaccion,
						 ISNULL(dbo.vw_JefesDeTallerDAI_2.CodigoConcepto, 0) AS CodigoConcepto_Satisfaccion,
						 
						 ISNULL(dbo.vw_JefesDeTallerDAI_1.Valor, 0) + ISNULL(dbo.vw_JefesDeTallerDAI_2.Valor, 0) AS Comision_TOTAL, dbo.vw_RangosMaestrasFull.IdComisionModeloSub, 0 AS IdLiquidacion, 0 AS IdHistorico, 
                         GETDATE() AS FechaLiquidacion
FROM            dbo.ExogenasJefesTallerDAI INNER JOIN
                         dbo.EmpleadosRangosMaestras ON dbo.ExogenasJefesTallerDAI.CodigoEmpleado = dbo.EmpleadosRangosMaestras.CodigoEmpleado INNER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosMaestrasFull.IdRangoMaestra LEFT OUTER JOIN
                         dbo.vw_JefesDeTallerDAI_2 ON dbo.ExogenasJefesTallerDAI.CodigoEmpleado = dbo.vw_JefesDeTallerDAI_2.CodigoEmpleado AND dbo.ExogenasJefesTallerDAI.Ano = dbo.vw_JefesDeTallerDAI_2.Ano_Periodo AND 
                         dbo.ExogenasJefesTallerDAI.Mes = dbo.vw_JefesDeTallerDAI_2.Mes_Periodo LEFT OUTER JOIN
                         dbo.vw_JefesDeTallerDAI_1 ON dbo.ExogenasJefesTallerDAI.CodigoEmpleado = dbo.vw_JefesDeTallerDAI_1.CodigoEmpleado AND dbo.ExogenasJefesTallerDAI.Ano = dbo.vw_JefesDeTallerDAI_1.Ano_Periodo AND 
                         dbo.ExogenasJefesTallerDAI.Mes = dbo.vw_JefesDeTallerDAI_1.Mes_Periodo LEFT OUTER JOIN
                         dbo.Empleados ON dbo.ExogenasJefesTallerDAI.CodigoEmpleado = dbo.Empleados.CodigoEmpleado
WHERE        (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 38)





```
