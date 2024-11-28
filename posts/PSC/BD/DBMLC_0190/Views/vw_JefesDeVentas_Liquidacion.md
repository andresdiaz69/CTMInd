# View: vw_JefesDeVentas_Liquidacion

## Usa los objetos:
- [[Centros]]
- [[ExogenasEmpleadosCentrosPago]]
- [[Periodos]]
- [[vw_EmpleadosDetalle]]
- [[vw_EmpleadosRangosMaestras]]
- [[vw_JefesDeVentas_1]]
- [[vw_JefesDeVentas_2]]
- [[vw_JefesDeVentas_3]]
- [[vw_JefesDeVentas_4]]

```sql





CREATE VIEW [dbo].[vw_JefesDeVentas_Liquidacion]
AS
SELECT DISTINCT 
                         PERIODO.Ano_Periodo, PERIODO.Mes_Periodo, PERIODO.CodigoEmpleado, PERIODO.IdComisionModeloSub, PERIODO.CodigoCentro, PERIODO.NombreCentro AS Centro, dbo.vw_EmpleadosDetalle.Empleado, 
                         dbo.vw_EmpleadosDetalle.CodigoEmpresa, dbo.vw_EmpleadosDetalle.NombreEmpresa, dbo.vw_EmpleadosDetalle.FechaIngreso, dbo.vw_EmpleadosDetalle.FechaRetiro, 
						 
						 ISNULL(dbo.vw_JefesDeVentas_1.PesoComercial, 0) AS PesoComercial, 
						 ISNULL(dbo.vw_JefesDeVentas_1.Comision_PesoComercial, 0) AS Comision_PesoComercial, 
						 ISNULL(dbo.vw_JefesDeVentas_1.IdRangoMaestra, 0) AS IdRangoMaestra_PesoComercial, 
						 ISNULL(dbo.vw_JefesDeVentas_1.CodigoConcepto, 0) AS CodigoConcepto_PesoComercial, 
						 
						 ISNULL(dbo.vw_JefesDeVentas_2.ColocacionCreditos, 0) AS ColocacionCreditos, 
                         ISNULL(dbo.vw_JefesDeVentas_2.Comision_ColocacionCreditos, 0) AS Comision_ColocacionCreditos, 
						 ISNULL(dbo.vw_JefesDeVentas_2.IdRangoMaestra, 0) AS IdRangoMaestra_ColocacionCreditos, 
						 ISNULL(dbo.vw_JefesDeVentas_2.CodigoConcepto, 0) AS CodigoConcepto_ColocacionCreditos, 
						 
						 ISNULL(dbo.vw_JefesDeVentas_3.EficienciaAdministrativa, 0) AS EficienciaAdministrativa, 
                         ISNULL(dbo.vw_JefesDeVentas_3.Comision_EficienciaAdministrativa, 0) AS Comision_EficienciaAdministrativa, 
						 ISNULL(dbo.vw_JefesDeVentas_3.IdRangoMaestra, 0) AS IdRangoMaestra_EficienciaAdministrativa, 
						 ISNULL(dbo.vw_JefesDeVentas_3.CodigoConcepto, 0) AS CodigoConcepto_EficienciaAdministrativa, 
						 
						 ISNULL(dbo.vw_JefesDeVentas_4.ColocacionCreditosYSeguros, 0) AS ColocacionCreditosYSeguros, 
                         ISNULL(dbo.vw_JefesDeVentas_4.Comision_ColocacionCreditosYSeguros, 0) AS Comision_ColocacionCreditosYSeguros, 
						 ISNULL(dbo.vw_JefesDeVentas_4.IdRangoMaestra, 0) AS IdRangoMaestra_ColocacionCreditosYSeguros, 
						 ISNULL(dbo.vw_JefesDeVentas_4.CodigoConcepto, 0) AS CodigoConcepto_ColocacionCreditosYSeguros, 
						 
						 ISNULL(dbo.vw_JefesDeVentas_1.Comision_PesoComercial, 0) 
                         + ISNULL(dbo.vw_JefesDeVentas_2.Comision_ColocacionCreditos, 0) + ISNULL(dbo.vw_JefesDeVentas_3.Comision_EficienciaAdministrativa, 0) + ISNULL(dbo.vw_JefesDeVentas_4.Comision_ColocacionCreditosYSeguros, 0) 
                         AS Comision_TOTAL, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.vw_JefesDeVentas_1 RIGHT OUTER JOIN
                         dbo.vw_JefesDeVentas_4 RIGHT OUTER JOIN
                             (SELECT DISTINCT 
                                                         TOP (100) PERCENT dbo.Periodos.Ano_Periodo, dbo.Periodos.Mes_Periodo, dbo.vw_EmpleadosRangosMaestras.CodigoEmpleado, dbo.vw_EmpleadosRangosMaestras.IdComisionModeloSub, 
                                                         dbo.ExogenasEmpleadosCentrosPago.CodigoCentro, dbo.Centros.NombreCentro
                               FROM            dbo.Centros INNER JOIN
                                                         dbo.ExogenasEmpleadosCentrosPago ON dbo.Centros.CodigoCentro = dbo.ExogenasEmpleadosCentrosPago.CodigoCentro LEFT OUTER JOIN
                                                         dbo.vw_EmpleadosRangosMaestras ON dbo.ExogenasEmpleadosCentrosPago.CodigoEmpleado = dbo.vw_EmpleadosRangosMaestras.CodigoEmpleado CROSS JOIN
                                                         dbo.Periodos
                               WHERE        (dbo.vw_EmpleadosRangosMaestras.IdComisionModeloSub IN (29, 40))
                               ORDER BY dbo.Periodos.Ano_Periodo, dbo.Periodos.Mes_Periodo, dbo.vw_EmpleadosRangosMaestras.CodigoEmpleado) AS PERIODO ON dbo.vw_JefesDeVentas_4.CodigoCentro = PERIODO.CodigoCentro AND 
                         dbo.vw_JefesDeVentas_4.CodigoEmpleado = PERIODO.CodigoEmpleado AND dbo.vw_JefesDeVentas_4.Mes_Periodo = PERIODO.Mes_Periodo AND 
                         dbo.vw_JefesDeVentas_4.Ano_Periodo = PERIODO.Ano_Periodo LEFT OUTER JOIN
                         dbo.vw_JefesDeVentas_3 ON PERIODO.CodigoCentro = dbo.vw_JefesDeVentas_3.CodigoCentro AND PERIODO.CodigoEmpleado = dbo.vw_JefesDeVentas_3.CodigoEmpleado AND 
                         PERIODO.Mes_Periodo = dbo.vw_JefesDeVentas_3.Mes_Periodo AND PERIODO.Ano_Periodo = dbo.vw_JefesDeVentas_3.Ano_Periodo LEFT OUTER JOIN
                         dbo.vw_JefesDeVentas_2 ON PERIODO.CodigoCentro = dbo.vw_JefesDeVentas_2.CodigoCentro AND PERIODO.CodigoEmpleado = dbo.vw_JefesDeVentas_2.CodigoEmpleado AND 
                         PERIODO.Mes_Periodo = dbo.vw_JefesDeVentas_2.Mes_Periodo AND PERIODO.Ano_Periodo = dbo.vw_JefesDeVentas_2.Ano_Periodo ON dbo.vw_JefesDeVentas_1.CodigoCentro = PERIODO.CodigoCentro AND 
                         dbo.vw_JefesDeVentas_1.CodigoEmpleado = PERIODO.CodigoEmpleado AND dbo.vw_JefesDeVentas_1.Mes_Periodo = PERIODO.Mes_Periodo AND 
                         dbo.vw_JefesDeVentas_1.Ano_Periodo = PERIODO.Ano_Periodo LEFT OUTER JOIN
                         dbo.vw_EmpleadosDetalle ON PERIODO.CodigoEmpleado = dbo.vw_EmpleadosDetalle.CodigoEmpleado

```
