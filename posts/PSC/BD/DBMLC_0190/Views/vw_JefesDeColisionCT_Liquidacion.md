# View: vw_JefesDeColisionCT_Liquidacion

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[ExogenasJefesTallerCT]]
- [[vw_JefesDeColisionCT_1]]
- [[vw_JefesDeColisionCT_2]]
- [[vw_JefesDeColisionCT_5]]
- [[vw_RangosMaestrasFull]]

```sql


CREATE VIEW [dbo].[vw_JefesDeColisionCT_Liquidacion]
AS
SELECT DISTINCT 
                         dbo.ExogenasJefesTallerCT.Ano AS Ano_Periodo, dbo.ExogenasJefesTallerCT.Mes AS Mes_Periodo, dbo.ExogenasJefesTallerCT.CodigoEmpleado, 
                         dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS Empleado, dbo.Empleados.CodigoEmpresa, dbo.Empleados.FechaIngreso, dbo.Empleados.FechaRetiro, 
                         
						 ISNULL(dbo.vw_JefesDeColisionCT_1.Rotacion, 0) AS Rotacion, 
						 ISNULL(dbo.vw_JefesDeColisionCT_1.Valor, 0) AS Comision_Rotacion, 
						 ISNULL(dbo.vw_JefesDeColisionCT_1.IdRangoMaestra, 0) AS IdRangoMaestra_Rotacion, 
						 ISNULL(dbo.vw_JefesDeColisionCT_1.CodigoConcepto, 0) AS CodigoConcepto_Rotacion, 
						 
						 ISNULL(dbo.vw_JefesDeColisionCT_2.Satisfaccion, 0) AS Satisfaccion, 
                         ISNULL(dbo.vw_JefesDeColisionCT_2.Valor, 0) AS Comision_Satisfaccion, 
						 ISNULL(dbo.vw_JefesDeColisionCT_2.IdRangoMaestra, 0) AS IdRangoMaestra_Satisfaccion, 
						 ISNULL(dbo.vw_JefesDeColisionCT_2.CodigoConcepto, 0) AS CodigoConcepto_Satisfaccion, 
						 
						 ISNULL(dbo.vw_JefesDeColisionCT_5.ValorVariable, 0) AS ValorVariable, 
						 ISNULL(dbo.vw_JefesDeColisionCT_5.Facturacion, 0) AS Facturacion, 
                         ISNULL(dbo.vw_JefesDeColisionCT_5.Comision_Facturacion, 0) AS Comision_Facturacion, 
						 0 AS IdRangoMaestra_Facturacion, --NO TIENE MAESTRA
						 100144 AS CodigoConcepto_Facturacion, --COMO NO TIENE MAESTRA EL CONCEPTO DEBE SER MANUAL
						 
						 ISNULL(dbo.vw_JefesDeColisionCT_1.Valor, 0) + ISNULL(dbo.vw_JefesDeColisionCT_2.Valor, 0) 
                         + ISNULL(dbo.vw_JefesDeColisionCT_5.Comision_Facturacion, 0) AS Comision_TOTAL, dbo.vw_RangosMaestrasFull.IdComisionModeloSub, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.ExogenasJefesTallerCT INNER JOIN
                         dbo.EmpleadosRangosMaestras ON dbo.ExogenasJefesTallerCT.CodigoEmpleado = dbo.EmpleadosRangosMaestras.CodigoEmpleado INNER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosMaestrasFull.IdRangoMaestra LEFT OUTER JOIN
                         dbo.vw_JefesDeColisionCT_1 ON dbo.ExogenasJefesTallerCT.CodigoEmpleado = dbo.vw_JefesDeColisionCT_1.CodigoEmpleado AND dbo.ExogenasJefesTallerCT.Ano = dbo.vw_JefesDeColisionCT_1.Ano_Periodo AND 
                         dbo.ExogenasJefesTallerCT.Mes = dbo.vw_JefesDeColisionCT_1.Mes_Periodo LEFT OUTER JOIN
                         dbo.vw_JefesDeColisionCT_2 ON dbo.ExogenasJefesTallerCT.CodigoEmpleado = dbo.vw_JefesDeColisionCT_2.CodigoEmpleado AND dbo.ExogenasJefesTallerCT.Ano = dbo.vw_JefesDeColisionCT_2.Ano_Periodo AND 
                         dbo.ExogenasJefesTallerCT.Mes = dbo.vw_JefesDeColisionCT_2.Mes_Periodo LEFT OUTER JOIN
                         dbo.vw_JefesDeColisionCT_5 ON dbo.ExogenasJefesTallerCT.CodigoEmpleado = dbo.vw_JefesDeColisionCT_5.CodigoEmpleado AND dbo.ExogenasJefesTallerCT.Ano = dbo.vw_JefesDeColisionCT_5.Ano_Periodo AND 
                         dbo.ExogenasJefesTallerCT.Mes = dbo.vw_JefesDeColisionCT_5.Mes_Periodo LEFT OUTER JOIN
                         dbo.Empleados ON dbo.ExogenasJefesTallerCT.CodigoEmpleado = dbo.Empleados.CodigoEmpleado
WHERE        (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 32)


```