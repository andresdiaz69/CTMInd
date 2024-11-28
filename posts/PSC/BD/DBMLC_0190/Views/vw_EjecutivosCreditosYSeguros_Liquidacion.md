# View: vw_EjecutivosCreditosYSeguros_Liquidacion

## Usa los objetos:
- [[RangosMaestras]]
- [[vw_EjecutivosCreditosYSeguros_11]]
- [[vw_EjecutivosCreditosYSeguros_22]]
- [[vw_EmpleadosDetalle]]

```sql




CREATE VIEW [dbo].[vw_EjecutivosCreditosYSeguros_Liquidacion] AS 

SELECT  T.Año, T.MesInicial, T.MesFinal, T.CodigoEmpleado, T.Nombres, vw_EmpleadosDetalle.CodigoEmpresa,vw_EmpleadosDetalle.NombreEmpresa, vw_EmpleadosDetalle.FechaRetiro, T.CodigoCentro, T.NombreCentro, T.ValorComisionCreditos, T.ValorVentasNetas,T.PorcentajeCreditos, T.DesdeCreditos, T.HastaCreditos,

CASE WHEN T.CodigoCentro <> 9999 THEN NULL ELSE T.ComisionCreditos END AS ComisionCreditos,
IdRangoMaestra_ComisionCreditos, -- NUEVO: JCS
CodigoConcepto_ComisionCreditos, -- NUEVO: JCS

T.ValorSegurosTotal, T.DesdeSeguros, T.HastaSeguros,

CASE WHEN T.CodigoCentro <> 9999 THEN NULL ELSE T.ComisionSeguros END AS ComisionSeguros,
IdRangoMaestra_ComisionSeguros, -- NUEVO: JCS
CodigoConcepto_ComisionSeguros, -- NUEVO: JCS

T.IdComisionModeloSub, T.IdRangoMaestra, RangosMaestras.NombreMaestra,

CASE WhEN T.CodigoCentro <> 9999 THEN NULL ELSE T.ComisionCreditos + T.ComisionSeguros END AS ComisionTotal, 

T.IdLiquidacion, T.IdHistorico, T.FechaLiquidacion

FROM 
(
	SELECT ISNULL(vw_EjecutivosCreditosYSeguros_11.Año, vw_EjecutivosCreditosYSeguros_22.Año)AS Año, ISNULL(vw_EjecutivosCreditosYSeguros_11.MesInicial, vw_EjecutivosCreditosYSeguros_22.MesInicial) AS MesInicial
	, ISNULL(vw_EjecutivosCreditosYSeguros_11.MesFinal, vw_EjecutivosCreditosYSeguros_22.MesFinal) AS MesFinal, ISNULL(vw_EjecutivosCreditosYSeguros_11.CodigoEmpleado, vw_EjecutivosCreditosYSeguros_22.CodigoEmpleado)AS CodigoEmpleado
	, ISNULL(vw_EjecutivosCreditosYSeguros_11.Nombres, vw_EjecutivosCreditosYSeguros_22.Nombres)AS Nombres, ISNULL(vw_EjecutivosCreditosYSeguros_11.CodigoCentro, vw_EjecutivosCreditosYSeguros_22.CodigoCentro) AS CodigoCentro
	, ISNULL(vw_EjecutivosCreditosYSeguros_11.NombreCentro, vw_EjecutivosCreditosYSeguros_22.NombreCentro) AS NombreCentro, ISNULL(vw_EjecutivosCreditosYSeguros_11.ValorComisionCreditos,0)AS ValorComisionCreditos, ISNULL(vw_EjecutivosCreditosYSeguros_11.ValorVentasNetas, 0)AS ValorVentasNetas
	, vw_EjecutivosCreditosYSeguros_11.Desde AS DesdeCreditos, vw_EjecutivosCreditosYSeguros_11.Hasta AS HastaCreditos, ISNULL(vw_EjecutivosCreditosYSeguros_11.PorcentajeCreditos, 0)AS PorcentajeCreditos
	, ISNULL(vw_EjecutivosCreditosYSeguros_11.ComisionCreditos, 0)AS ComisionCreditos, ISNULL(vw_EjecutivosCreditosYSeguros_22.ValorSegurosTotal, 0)AS ValorSegurosTotal
	, vw_EjecutivosCreditosYSeguros_22.Desde AS DesdeSeguros, vw_EjecutivosCreditosYSeguros_22.Hasta AS HastaSeguros, ISNULL(vw_EjecutivosCreditosYSeguros_22.ComisionSeguros, 0)AS ComisionSeguros
	, ISNULL(vw_EjecutivosCreditosYSeguros_11.IdComisionModeloSub, vw_EjecutivosCreditosYSeguros_22.IdComisionModeloSub)AS IdComisionModeloSub
	, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
	, ISNULL(vw_EjecutivosCreditosYSeguros_11.IdRangoMaestra, vw_EjecutivosCreditosYSeguros_22.IdRangoMaestra) AS IdRangoMaestra
	
	, ISNULL(vw_EjecutivosCreditosYSeguros_11.IdRangoMaestra, 0) AS IdRangoMaestra_ComisionCreditos -- NUEVO: JCS
	, ISNULL(vw_EjecutivosCreditosYSeguros_11.CodigoConcepto, 0) AS CodigoConcepto_ComisionCreditos -- NUEVO: JCS
	, ISNULL(vw_EjecutivosCreditosYSeguros_22.IdRangoMaestra, 0) AS IdRangoMaestra_ComisionSeguros -- NUEVO: JCS
	, ISNULL(vw_EjecutivosCreditosYSeguros_22.CodigoConcepto, 0) AS CodigoConcepto_ComisionSeguros -- NUEVO: JCS

	FROM vw_EjecutivosCreditosYSeguros_11
	FULL JOIN vw_EjecutivosCreditosYSeguros_22 ON vw_EjecutivosCreditosYSeguros_11.CodigoEmpleado = vw_EjecutivosCreditosYSeguros_22.CodigoEmpleado AND vw_EjecutivosCreditosYSeguros_11.Año = vw_EjecutivosCreditosYSeguros_22.Año
	AND vw_EjecutivosCreditosYSeguros_11.MesInicial = vw_EjecutivosCreditosYSeguros_22.MesInicial AND vw_EjecutivosCreditosYSeguros_11.MesFinal = vw_EjecutivosCreditosYSeguros_22.MesFinal
	AND vw_EjecutivosCreditosYSeguros_11.CodigoCentro = vw_EjecutivosCreditosYSeguros_22.CodigoCentro 
)AS T
INNER JOIN vw_EmpleadosDetalle ON T.CodigoEmpleado = vw_EmpleadosDetalle.CodigoEmpleado
LEFT JOIN RangosMaestras ON T.IdRangoMaestra = RangosMaestras.IdRangoMaestra
--order by año,MesInicial, MesFinal,T.CodigoEmpleado, T.CodigoCentro

```
