# View: vw_JefeDeVentasBogotaBYD_3

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[ExogenasJefeDeVentasBogotaBYD]]
- [[RangosMaestras]]
- [[vw_RangosMaestrasFull]]
- [[vw_RangosVersionesMaxSub]]

```sql

















CREATE VIEW [dbo].[vw_JefeDeVentasBogotaBYD_3] AS

SELECT E.CodigoEmpleado, E.Nombres, E.IdRangoMaestra, E.IdRangoVersionMax, E.IdComisionModeloSub, E.IdComisionModeloSubCriterio, E.CodigoConcepto, C.Ano_Periodo, C.Mes_Periodo, C.Satisfaccion_Cliente,
dbo.vw_RangosMaestrasFull.IdRangoVersion, dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, 
dbo.vw_RangosMaestrasFull.Valor AS Comision
FROM
(
	SELECT EMPLEADOS.CodigoEmpleado, EMPLEADOS.Nombres, EMPLEADOS.IdRangoMaestra, EMPLEADOS.IdRangoVersionMax, EMPLEADOS.IdComisionModeloSub, EMPLEADOS.IdComisionModeloSubCriterio, EMPLEADOS.CodigoConcepto
	FROM 
	(
		SELECT Empleados1.CodigoEmpleado,Empleados1.Nombres +' '+Empleados1.Apellido1+' '+Empleados1.Apellido2 AS Nombres, vw_RangosVersionesMaxSub.IdRangoMaestra, vw_RangosVersionesMaxSub.IdRangoVersionMax, vw_RangosVersionesMaxSub.IdComisionModeloSub
		,vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio, RangosMaestras.CodigoConcepto
		FROM EmpleadosRangosMaestras
		INNER JOIN Empleados AS Empleados1  ON EmpleadosRangosMaestras.CodigoEmpleado = Empleados1.CodigoEmpleado
		INNER JOIN vw_RangosVersionesMaxSub ON EmpleadosRangosMaestras.IdRangoMaestra = vw_RangosVersionesMaxSub.IdRangoMaestra
		LEFT JOIN RangosMaestras ON EmpleadosRangosMaestras.IdRangoMaestra = RangosMaestras.IdRangoMaestra
		WHERE (vw_RangosVersionesMaxSub.IdComisionModeloSub = 78) AND (vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 148)
	)AS EMPLEADOS

)AS E
LEFT JOIN 
(
	SELECT Ano AS Ano_Periodo, Mes AS Mes_Periodo, CodigoEmpleado, Satisfaccion_Cliente FROM ExogenasJefeDeVentasBogotaBYD
)AS C ON E.CodigoEmpleado = C.CodigoEmpleado

LEFT OUTER JOIN dbo.vw_RangosMaestrasFull ON E.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE (dbo.vw_RangosMaestrasFull.Desde < C.Satisfaccion_Cliente) AND (dbo.vw_RangosMaestrasFull.Hasta >= C.Satisfaccion_Cliente)

```
