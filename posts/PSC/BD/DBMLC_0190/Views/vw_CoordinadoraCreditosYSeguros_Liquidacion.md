# View: vw_CoordinadoraCreditosYSeguros_Liquidacion

## Usa los objetos:
- [[vw_CoordinadoraCreditosYSeguros_1]]
- [[vw_CoordinadoraCreditosYSeguros_2]]
- [[vw_CoordinadoraCreditosYSeguros_3]]
- [[vw_EmpleadosDetalle]]

```sql
CREATE VIEW [dbo].[vw_CoordinadoraCreditosYSeguros_Liquidacion] AS

SELECT TOTAL.CodigoEmpleado, TOTAL.Nombres, vw_EmpleadosDetalle.FechaRetiro, vw_EmpleadosDetalle.CodigoEmpresa, vw_EmpleadosDetalle.NombreEmpresa, Ano_Periodo, Mes_Periodo, ValorCreditos, ValorVentasNetas, PorcentajeCreditos_CT, Desde_1, Hasta_1, ComisionCreditos_CT, UnidadesFinanciadas, UnidadesEntregadas,PorcentajeCreditos_MM, Desde_2, Hasta_2, ComisionCreditos_MM, SegCasaToro, SegMotorysa, ValorSegurosTotal, Desde_3, Hasta_3, ComisionSegurosTotal, ComisionTOTAL,CodigoConcepto
, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM
(
SELECT ISNULL(C1.CodigoEmpleado, ISNULL(C2.CodigoEmpleado, C3.CodigoEmpleado))AS CodigoEmpleado, ISNULL(C1.Nombres, ISNULL(C2.Nombres, C3.Nombres))AS Nombres, ISNULL(C1.Año, ISNULL(C2.Ano_Periodo, C3.Año))AS Ano_Periodo
, ISNULL(C1.MesInicial, ISNULL(C2.Mes_Periodo, C3.MesInicial))AS Mes_Periodo, ISNULL(C1.MesFinal, ISNULL(C2.Mes_Periodo,C3.MesInicial))AS Mes_Periodo2, ISNULL(C1.ValorCreditos, 0)AS ValorCreditos, ISNULL(C1.ValorVentasNetas, 0)AS ValorVentasNetas, ISNULL(C1.PorcentajeCreditos,0) AS PorcentajeCreditos_CT
, ISNULL(C1.Desde,0) AS Desde_1, ISNULL(C1.Hasta,0) AS Hasta_1, ISNULL(C1.ValorComision,0) AS ComisionCreditos_CT, ISNULL(C2.UnidadesFinanciadas,0)AS UnidadesFinanciadas, ISNULL(C2.UnidadesEntregadas,0)AS UnidadesEntregadas
, ISNULL(C2.PorcentajeCreditos,0) AS PorcentajeCreditos_MM, ISNULL(C2.Desde,0) AS Desde_2, ISNULL(C2.Hasta,0) AS Hasta_2, ISNULL(C2.ValorComision,0) AS ComisionCreditos_MM
, ISNULL(C1.CodigoConcepto,ISNULL(C2.CodigoConcepto, C3.CodigoConcepto))AS CodigoConcepto, ISNULL(C3.SegCasaToro,0)AS SegCasaToro, ISNULL(C3.SegMotorysa,0)AS SegMotorysa, ISNULL(C3.ValorSegurosTotal,0)AS ValorSegurosTotal
, ISNULL(C3.Desde, 0)AS Desde_3, ISNULL(C3.Hasta, 0)AS Hasta_3, ISNULL(C3.ValorComision,0)AS ComisionSegurosTotal
, ISNULL(C1.ValorComision,0) + ISNULL(C2.ValorComision,0) + ISNULL(C3.ValorComision,0) AS ComisionTOTAL
FROM vw_CoordinadoraCreditosYSeguros_1 AS C1
FULL JOIN vw_CoordinadoraCreditosYSeguros_2 AS C2 ON C1.Año = C2.Ano_Periodo AND C1.MesInicial = C2.Mes_periodo AND C1.CodigoEmpleado = C2.CodigoEmpleado
FULL JOIN vw_CoordinadoraCreditosYSeguros_3 AS C3 ON C1.Año = C3.Año AND C1.MesInicial = C3.MesInicial AND C1.CodigoEmpleado = C3.CodigoEmpleado
)AS TOTAL
INNER JOIN vw_EmpleadosDetalle ON TOTAL.CodigoEmpleado = vw_EmpleadosDetalle.CodigoEmpleado

```
