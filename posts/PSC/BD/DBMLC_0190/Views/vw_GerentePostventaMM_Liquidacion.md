# View: vw_GerentePostventaMM_Liquidacion

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[ExogenasGerentePostventaMM]]
- [[vw_GerentePostventaMM_1]]
- [[vw_GerentePostventaMM_2]]
- [[vw_GerentePostventaMM_3]]
- [[vw_GerentePostventaMM_4]]
- [[vw_GerentePostventaMM_5]]
- [[vw_RangosMaestrasFull]]

```sql


CREATE VIEW [dbo].[vw_GerentePostventaMM_Liquidacion]
AS
SELECT DISTINCT 
                         dbo.ExogenasGerentePostventaMM.Ano AS Ano_Periodo, dbo.ExogenasGerentePostventaMM.Mes AS Mes_Periodo, dbo.ExogenasGerentePostventaMM.CodigoEmpleado, 
                         dbo.Empleados.Nombres + ' ' + dbo.Empleados.Apellido1 + ' ' + dbo.Empleados.Apellido2 AS Empleado, dbo.Empleados.CodigoEmpresa, dbo.Empleados.FechaIngreso, dbo.Empleados.FechaRetiro, 
                         
						 ISNULL(dbo.vw_GerentePostventaMM_1.RotacionTrabajo, 0) AS RotacionTrabajo, 
						 ISNULL(dbo.vw_GerentePostventaMM_1.Valor, 0) AS Comision_RotacionTrabajo, 
						 ISNULL(dbo.vw_GerentePostventaMM_1.IdRangoMaestra, 0) AS IdRangoMaestra_RotacionTrabajo, 
						 ISNULL(dbo.vw_GerentePostventaMM_1.CodigoConcepto, 0) AS CodigoConcepto_RotacionTrabajo, 
						 
						 ISNULL(dbo.vw_GerentePostventaMM_2.Ticket, 0) AS TicketPromedio, 
						 ISNULL(dbo.vw_GerentePostventaMM_2.Valor, 0) AS Comision_TicketPromedio, 
						 ISNULL(dbo.vw_GerentePostventaMM_2.IdRangoMaestra, 0) AS IdRangoMaestra_TicketPromedio, 
						 ISNULL(dbo.vw_GerentePostventaMM_2.CodigoConcepto, 0) AS CodigoConcepto_TicketPromedio, 
						 
						 ISNULL(dbo.vw_GerentePostventaMM_3.RotacionInventario, 0) AS RotacionInventario, 
                         ISNULL(dbo.vw_GerentePostventaMM_3.Valor, 0) AS Comision_RotacionInventario, 
						 ISNULL(dbo.vw_GerentePostventaMM_3.IdRangoMaestra, 0) AS IdRangoMaestra_RotacionInventario, 
						 ISNULL(dbo.vw_GerentePostventaMM_3.CodigoConcepto, 0) AS CodigoConcepto_RotacionInventario, 
						 
						 ISNULL(dbo.vw_GerentePostventaMM_4.UtilidadBruta, 0) AS UtilidadBruta, 
						 ISNULL(dbo.vw_GerentePostventaMM_4.Valor, 0) AS Comision_UtilidadBruta, 
						 ISNULL(dbo.vw_GerentePostventaMM_4.IdRangoMaestra, 0) AS IdRangoMaestra_UtilidadBruta, 
						 ISNULL(dbo.vw_GerentePostventaMM_4.CodigoConcepto, 0) AS CodigoConcepto_UtilidadBruta, 
						 
						 ISNULL(dbo.vw_GerentePostventaMM_5.SatisfaccionCliente, 0) AS SatisfaccionCliente, 
						 ISNULL(dbo.vw_GerentePostventaMM_5.Valor, 0) AS Comision_Satisfaccion, 
						 ISNULL(dbo.vw_GerentePostventaMM_5.IdRangoMaestra, 0) AS IdRangoMaestra_Satisfaccion, 
						 ISNULL(dbo.vw_GerentePostventaMM_5.CodigoConcepto, 0) AS CodigoConcepto_Satisfaccion, 

                         ISNULL(dbo.vw_GerentePostventaMM_1.Valor, 0) + ISNULL(dbo.vw_GerentePostventaMM_2.Valor, 0) + ISNULL(dbo.vw_GerentePostventaMM_3.Valor, 0) + ISNULL(dbo.vw_GerentePostventaMM_4.Valor, 0) 
                         + ISNULL(dbo.vw_GerentePostventaMM_5.Valor, 0) AS Comision_TOTAL, dbo.vw_RangosMaestrasFull.IdComisionModeloSub, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.ExogenasGerentePostventaMM INNER JOIN
                         dbo.EmpleadosRangosMaestras ON dbo.ExogenasGerentePostventaMM.CodigoEmpleado = dbo.EmpleadosRangosMaestras.CodigoEmpleado INNER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosMaestrasFull.IdRangoMaestra LEFT OUTER JOIN
                         dbo.vw_GerentePostventaMM_1 ON dbo.ExogenasGerentePostventaMM.CodigoEmpleado = dbo.vw_GerentePostventaMM_1.CodigoEmpleado AND 
                         dbo.ExogenasGerentePostventaMM.Ano = dbo.vw_GerentePostventaMM_1.Ano_Periodo AND dbo.ExogenasGerentePostventaMM.Mes = dbo.vw_GerentePostventaMM_1.Mes_Periodo LEFT OUTER JOIN
                         dbo.vw_GerentePostventaMM_2 ON dbo.ExogenasGerentePostventaMM.CodigoEmpleado = dbo.vw_GerentePostventaMM_2.CodigoEmpleado AND 
                         dbo.ExogenasGerentePostventaMM.Ano = dbo.vw_GerentePostventaMM_2.Ano_Periodo AND dbo.ExogenasGerentePostventaMM.Mes = dbo.vw_GerentePostventaMM_2.Mes_Periodo LEFT OUTER JOIN
                         dbo.vw_GerentePostventaMM_3 ON dbo.ExogenasGerentePostventaMM.CodigoEmpleado = dbo.vw_GerentePostventaMM_3.CodigoEmpleado AND 
                         dbo.ExogenasGerentePostventaMM.Ano = dbo.vw_GerentePostventaMM_3.Ano_Periodo AND dbo.ExogenasGerentePostventaMM.Mes = dbo.vw_GerentePostventaMM_3.Mes_Periodo LEFT OUTER JOIN
                         dbo.vw_GerentePostventaMM_4 ON dbo.ExogenasGerentePostventaMM.CodigoEmpleado = dbo.vw_GerentePostventaMM_4.CodigoEmpleado AND 
                         dbo.ExogenasGerentePostventaMM.Ano = dbo.vw_GerentePostventaMM_4.Ano_Periodo AND dbo.ExogenasGerentePostventaMM.Mes = dbo.vw_GerentePostventaMM_4.Mes_Periodo LEFT OUTER JOIN
                         dbo.vw_GerentePostventaMM_5 ON dbo.ExogenasGerentePostventaMM.CodigoEmpleado = dbo.vw_GerentePostventaMM_5.CodigoEmpleado AND 
                         dbo.ExogenasGerentePostventaMM.Ano = dbo.vw_GerentePostventaMM_5.Ano_Periodo AND dbo.ExogenasGerentePostventaMM.Mes = dbo.vw_GerentePostventaMM_5.Mes_Periodo LEFT OUTER JOIN
                         dbo.Empleados ON dbo.ExogenasGerentePostventaMM.CodigoEmpleado = dbo.Empleados.CodigoEmpleado
WHERE        (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 48)

```
