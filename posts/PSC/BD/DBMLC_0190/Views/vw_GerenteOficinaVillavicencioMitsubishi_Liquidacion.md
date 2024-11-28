# View: vw_GerenteOficinaVillavicencioMitsubishi_Liquidacion

## Usa los objetos:
- [[Centros]]
- [[ExogenasEmpleadosCentrosPago]]
- [[Periodos]]
- [[vw_EmpleadosDetalle]]
- [[vw_EmpleadosRangosMaestras]]
- [[vw_GerenteOficinaVillavicencioMitsubishi_1]]
- [[vw_GerenteOficinaVillavicencioMitsubishi_2]]
- [[vw_GerenteOficinaVillavicencioMitsubishi_3]]

```sql

CREATE VIEW [dbo].[vw_GerenteOficinaVillavicencioMitsubishi_Liquidacion] AS

SELECT DISTINCT PERIODO.Ano_Periodo, PERIODO.Mes_Periodo, PERIODO.CodigoEmpleado, PERIODO.IdComisionModeloSub, vw_EmpleadosDetalle.Empleado, 
vw_EmpleadosDetalle.CodigoEmpresa, vw_EmpleadosDetalle.NombreEmpresa, vw_EmpleadosDetalle.FechaIngreso, vw_EmpleadosDetalle.FechaRetiro, 
PESO_COMERCIAL.Desde AS Desde_PesoComercial,
PESO_COMERCIAL.Hasta AS Hasta_PesoComercial,
ISNULL(PESO_COMERCIAL.VehiculosRecaudados, 0) AS VehiculosRecaudados,
ISNULL(PESO_COMERCIAL.VentasNacionales, 0) AS VentasNacionales,
ISNULL(PESO_COMERCIAL.PesoComercial, 0) AS PesoComercial, 
ISNULL(PESO_COMERCIAL.Comision_PesoComercial, 0) AS Comision_PesoComercial, 
ISNULL(PESO_COMERCIAL.IdRangoMaestra, 0) AS IdRangoMaestra_PesoComercial, 
ISNULL(PESO_COMERCIAL.CodigoConcepto, 0) AS CodigoConcepto_PesoComercial, 

COLOCACION_CREDITOS.Desde AS Desde_ColocacionCreditos,
COLOCACION_CREDITOS.Hasta AS Hasta_ColocacionCreditos,
ISNULL(COLOCACION_CREDITOS.EntregasEfectivas, 0) AS EntregasEfectivas,
ISNULL(COLOCACION_CREDITOS.CreditosDesembolsados, 0) AS CreditosDesembolsados,
ISNULL(COLOCACION_CREDITOS.ColocacionCreditos, 0) AS ColocacionCreditos, 
ISNULL(COLOCACION_CREDITOS.Comision_ColocacionCreditos, 0) AS Comision_ColocacionCreditos, 
ISNULL(COLOCACION_CREDITOS.IdRangoMaestra, 0) AS IdRangoMaestra_ColocacionCreditos, 
ISNULL(COLOCACION_CREDITOS.CodigoConcepto, 0) AS CodigoConcepto_ColocacionCreditos, 
						 
EFICIENCIAADMINISTRATIVA.Desde AS Desde_EficienciaAdministrativa,
EFICIENCIAADMINISTRATIVA.Hasta AS Hasta_EficienciaAdministrativa,
ISNULL(EFICIENCIAADMINISTRATIVA.EficienciaAdministrativa, 0) AS EficienciaAdministrativa, 
ISNULL(EFICIENCIAADMINISTRATIVA.Comision_EficienciaAdministrativa, 0) AS Comision_EficienciaAdministrativa, 
ISNULL(EFICIENCIAADMINISTRATIVA.IdRangoMaestra, 0) AS IdRangoMaestra_EficienciaAdministrativa, 
ISNULL(EFICIENCIAADMINISTRATIVA.CodigoConcepto, 0) AS CodigoConcepto_EficienciaAdministrativa, 
						 						 
ISNULL(PESO_COMERCIAL.Comision_PesoComercial, 0) + ISNULL(COLOCACION_CREDITOS.Comision_ColocacionCreditos, 0) + ISNULL(EFICIENCIAADMINISTRATIVA.Comision_EficienciaAdministrativa, 0) AS Comision_TOTAL
, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion

FROM           vw_GerenteOficinaVillavicencioMitsubishi_1 AS PESO_COMERCIAL 
RIGHT OUTER JOIN vw_GerenteOficinaVillavicencioMitsubishi_3 AS EFICIENCIAADMINISTRATIVA 
RIGHT OUTER JOIN
(
	SELECT DISTINCT TOP (100) PERCENT dbo.Periodos.Ano_Periodo, dbo.Periodos.Mes_Periodo, dbo.vw_EmpleadosRangosMaestras.CodigoEmpleado, dbo.vw_EmpleadosRangosMaestras.IdComisionModeloSub
	FROM           dbo.Centros 
	INNER JOIN dbo.ExogenasEmpleadosCentrosPago ON dbo.Centros.CodigoCentro = dbo.ExogenasEmpleadosCentrosPago.CodigoCentro 
	LEFT OUTER JOIN dbo.vw_EmpleadosRangosMaestras ON dbo.ExogenasEmpleadosCentrosPago.CodigoEmpleado = dbo.vw_EmpleadosRangosMaestras.CodigoEmpleado 
	CROSS JOIN dbo.Periodos
	WHERE        (dbo.vw_EmpleadosRangosMaestras.IdComisionModeloSub IN (80))
	ORDER BY dbo.Periodos.Ano_Periodo, dbo.Periodos.Mes_Periodo, dbo.vw_EmpleadosRangosMaestras.CodigoEmpleado
) AS PERIODO 

ON EFICIENCIAADMINISTRATIVA.CodigoEmpleado = PERIODO.CodigoEmpleado AND EFICIENCIAADMINISTRATIVA.Mes_Periodo = PERIODO.Mes_Periodo AND EFICIENCIAADMINISTRATIVA.Ano_Periodo = PERIODO.Ano_Periodo 

LEFT OUTER JOIN vw_GerenteOficinaVillavicencioMitsubishi_2 AS COLOCACION_CREDITOS ON PERIODO.CodigoEmpleado = COLOCACION_CREDITOS.CodigoEmpleado AND 
PERIODO.Mes_Periodo = COLOCACION_CREDITOS.Mes_Periodo AND PERIODO.Ano_Periodo = COLOCACION_CREDITOS.Ano_Periodo 

ON PESO_COMERCIAL.CodigoEmpleado = PERIODO.CodigoEmpleado AND PESO_COMERCIAL.Mes_Periodo = PERIODO.Mes_Periodo AND 
PESO_COMERCIAL.Ano_Periodo = PERIODO.Ano_Periodo 

LEFT OUTER JOIN vw_EmpleadosDetalle ON PERIODO.CodigoEmpleado = dbo.vw_EmpleadosDetalle.CodigoEmpleado

```
