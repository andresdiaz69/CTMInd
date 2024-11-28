# View: vw_JefesTallerMM_Liquidacion

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[ExogenasJefesTallerMM]]
- [[vw_JefesTallerMM_1]]
- [[vw_JefesTallerMM_2]]
- [[vw_JefesTallerMM_3]]
- [[vw_JefesTallerMM_4]]
- [[vw_JefesTallerMM_5]]
- [[vw_RangosMaestrasFull]]

```sql






CREATE VIEW [dbo].[vw_JefesTallerMM_Liquidacion]
AS
SELECT DISTINCT 
                         dbo.ExogenasJefesTallerMM.Ano AS Ano_Periodo, dbo.ExogenasJefesTallerMM.Mes AS Mes_Periodo, dbo.ExogenasJefesTallerMM.CodigoEmpleado, 
                         dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS Empleado, dbo.Empleados.CodigoEmpresa, dbo.Empleados.FechaIngreso, dbo.Empleados.FechaRetiro, 
                         
						 ISNULL(dbo.vw_JefesTallerMM_1.Rotacion, 0) AS Rotacion, 
						 ISNULL(dbo.vw_JefesTallerMM_1.Valor, 0) AS Comision_Rotacion, 
						 ISNULL(dbo.vw_JefesTallerMM_1.IdRangoMaestra, 0) AS IdRangoMaestra_Rotacion,
						 ISNULL(dbo.vw_JefesTallerMM_1.CodigoConcepto, 0) AS CodigoConcepto_Rotacion,
						 
						 ISNULL(dbo.vw_JefesTallerMM_2.Ticket, 0) AS Ticket, 
						 ISNULL(dbo.vw_JefesTallerMM_2.Valor, 0) AS Comision_Ticket, 
						 ISNULL(dbo.vw_JefesTallerMM_2.IdRangoMaestra, 0) AS IdRangoMaestra_Ticket,
						 ISNULL(dbo.vw_JefesTallerMM_2.CodigoConcepto, 0) AS CodigoConcepto_Ticket,
						 
						 ISNULL(dbo.vw_JefesTallerMM_3.Asesoria, 0) AS Asesoria, 
						 ISNULL(dbo.vw_JefesTallerMM_3.Valor, 0) AS Comision_Asesoria, 
						 ISNULL(dbo.vw_JefesTallerMM_3.IdRangoMaestra, 0) AS IdRangoMaestra_Asesoria,
						 ISNULL(dbo.vw_JefesTallerMM_3.CodigoConcepto, 0) AS CodigoConcepto_Asesoria,
						 
						 --ISNULL(dbo.vw_JefesTallerMM_4.Cumplimiento, 0) AS Cumplimiento, 
                         --ISNULL(dbo.vw_JefesTallerMM_4.Valor, 0) AS Comision_Cumplimiento, 
						 --ISNULL(dbo.vw_JefesTallerMM_4.IdRangoMaestra, 0) AS IdRangoMaestra_Cumplimiento,
						 --ISNULL(dbo.vw_JefesTallerMM_4.CodigoConcepto, 0) AS CodigoConcepto_Cumplimiento,
						 
						 --ISNULL(dbo.vw_JefesTallerMM_5.Lealtad, 0) AS Lealtad, 
						 --ISNULL(dbo.vw_JefesTallerMM_5.Valor, 0) AS Comision_Lealtad, 
						 --ISNULL(dbo.vw_JefesTallerMM_5.IdRangoMaestra, 0) AS IdRangoMaestra_Lealtad,
						 --ISNULL(dbo.vw_JefesTallerMM_5.CodigoConcepto, 0) AS CodigoConcepto_Lealtad,

						 0.00 AS Cumplimiento, 
                         0.00 AS Comision_Cumplimiento, 
						 CAST(0 as smallint) AS IdRangoMaestra_Cumplimiento,
						 0 AS CodigoConcepto_Cumplimiento,
						 
						 0.00 AS Lealtad, 
						 0.00 AS Comision_Lealtad, 
						 CAST(0 as smallint)  AS IdRangoMaestra_Lealtad,
						 0 AS CodigoConcepto_Lealtad,

                         --ISNULL(dbo.vw_JefesTallerMM_1.Valor, 0) + ISNULL(dbo.vw_JefesTallerMM_2.Valor, 0) + ISNULL(dbo.vw_JefesTallerMM_3.Valor, 0) + ISNULL(dbo.vw_JefesTallerMM_4.Valor, 0) + ISNULL(dbo.vw_JefesTallerMM_5.Valor, 0) 
                         --AS Comision_TOTAL, 
						 
						 ISNULL(dbo.vw_JefesTallerMM_1.Valor, 0) + ISNULL(dbo.vw_JefesTallerMM_2.Valor, 0) + ISNULL(dbo.vw_JefesTallerMM_3.Valor, 0) + 0 + 0
                         AS Comision_TOTAL, 
						 
						 
						 dbo.vw_RangosMaestrasFull.IdComisionModeloSub, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.ExogenasJefesTallerMM INNER JOIN
                         dbo.EmpleadosRangosMaestras ON dbo.ExogenasJefesTallerMM.CodigoEmpleado = dbo.EmpleadosRangosMaestras.CodigoEmpleado INNER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosMaestrasFull.IdRangoMaestra LEFT OUTER JOIN
                         dbo.vw_JefesTallerMM_5 ON dbo.ExogenasJefesTallerMM.CodigoEmpleado = dbo.vw_JefesTallerMM_5.CodigoEmpleado AND dbo.ExogenasJefesTallerMM.Ano = dbo.vw_JefesTallerMM_5.Ano_Periodo AND 
                         dbo.ExogenasJefesTallerMM.Mes = dbo.vw_JefesTallerMM_5.Mes_Periodo LEFT OUTER JOIN
                         dbo.vw_JefesTallerMM_4 ON dbo.ExogenasJefesTallerMM.CodigoEmpleado = dbo.vw_JefesTallerMM_4.CodigoEmpleado AND dbo.ExogenasJefesTallerMM.Ano = dbo.vw_JefesTallerMM_4.Ano_Periodo AND 
                         dbo.ExogenasJefesTallerMM.Mes = dbo.vw_JefesTallerMM_4.Mes_Periodo LEFT OUTER JOIN
                         dbo.vw_JefesTallerMM_3 ON dbo.ExogenasJefesTallerMM.CodigoEmpleado = dbo.vw_JefesTallerMM_3.CodigoEmpleado AND dbo.ExogenasJefesTallerMM.Ano = dbo.vw_JefesTallerMM_3.Ano_Periodo AND 
                         dbo.ExogenasJefesTallerMM.Mes = dbo.vw_JefesTallerMM_3.Mes_Periodo LEFT OUTER JOIN
                         dbo.vw_JefesTallerMM_2 ON dbo.ExogenasJefesTallerMM.CodigoEmpleado = dbo.vw_JefesTallerMM_2.CodigoEmpleado AND dbo.ExogenasJefesTallerMM.Ano = dbo.vw_JefesTallerMM_2.Ano_Periodo AND 
                         dbo.ExogenasJefesTallerMM.Mes = dbo.vw_JefesTallerMM_2.Mes_Periodo LEFT OUTER JOIN
                         dbo.vw_JefesTallerMM_1 ON dbo.ExogenasJefesTallerMM.CodigoEmpleado = dbo.vw_JefesTallerMM_1.CodigoEmpleado AND dbo.ExogenasJefesTallerMM.Ano = dbo.vw_JefesTallerMM_1.Ano_Periodo AND 
                         dbo.ExogenasJefesTallerMM.Mes = dbo.vw_JefesTallerMM_1.Mes_Periodo LEFT OUTER JOIN
                         dbo.Empleados ON dbo.ExogenasJefesTallerMM.CodigoEmpleado = dbo.Empleados.CodigoEmpleado
WHERE        (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 25)


```
