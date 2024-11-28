# View: vw_ExpertoDeProductoDaimlerPC_3

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[ExogenasExpertoDeProductoDaimlerPC]]
- [[RangosMaestras]]
- [[vw_RangosMaestrasFull]]
- [[vw_RangosVersionesMaxSub]]

```sql

CREATE VIEW [dbo].[vw_ExpertoDeProductoDaimlerPC_3] AS

SELECT EMPLEADOS.CodigoEmpleado, EMPLEADOS.Nombres, EMPLEADOS.IdRangoMaestra, EMPLEADOS.IdRangoVersionMax, EMPLEADOS.IdComisionModeloSub, EMPLEADOS.IdComisionModeloSubCriterio, SATISFACCION.Ano, SATISFACCION.Mes, ISNULL(SATISFACCION.Satisfaccion_CSI,0) AS Satisfaccion_CSI
,vw_RangosMaestrasFull.IdRangoVersion,vw_RangosMaestrasFull.ConsecutivoVersion,vw_RangosMaestrasFull.IdRangoDetalle,vw_RangosMaestrasFull.Desde,vw_RangosMaestrasFull.Hasta, vw_RangosMaestrasFull.Valor as ValorComision, vw_RangosMaestrasFull.CodigoConcepto
FROM
(
	SELECT Empleados1.CodigoEmpleado,Empleados1.Nombres +' '+Empleados1.Apellido1+' '+Empleados1.Apellido2 AS Nombres, vw_RangosVersionesMaxSub.IdRangoMaestra, vw_RangosVersionesMaxSub.IdRangoVersionMax, vw_RangosVersionesMaxSub.IdComisionModeloSub
	,vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio, RangosMaestras.CodigoConcepto
	FROM EmpleadosRangosMaestras
	INNER JOIN Empleados AS Empleados1  ON EmpleadosRangosMaestras.CodigoEmpleado = Empleados1.CodigoEmpleado
	INNER JOIN vw_RangosVersionesMaxSub ON EmpleadosRangosMaestras.IdRangoMaestra = vw_RangosVersionesMaxSub.IdRangoMaestra
	LEFT JOIN  RangosMaestras ON EmpleadosRangosMaestras.IdRangoMaestra = RangosMaestras.IdRangoMaestra
	WHERE (vw_RangosVersionesMaxSub.IdComisionModeloSub = 73) AND (vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 140)

) AS EMPLEADOS
LEFT JOIN 
(
	SELECT Ano, Mes, CodigoEmpleado, Satisfaccion_CSI
	FROM ExogenasExpertoDeProductoDaimlerPC
)AS SATISFACCION ON EMPLEADOS.CodigoEmpleado = SATISFACCION.CodigoEmpleado

LEFT JOIN vw_RangosMaestrasFull ON EMPLEADOS.IdRangoVersionMax = vw_RangosMaestrasFull.IdRangoVersion
WHERE (vw_RangosMaestrasFull.Desde < SATISFACCION.Satisfaccion_CSI) AND (vw_RangosMaestrasFull.Hasta >= SATISFACCION.Satisfaccion_CSI)

```
