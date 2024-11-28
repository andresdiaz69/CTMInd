# View: vw_JefesDeColision_22

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[ExogenasEmpleadosCentrosPago]]
- [[vw_JefesDeColision_2]]
- [[vw_RangosMaestrasFull]]
- [[vw_RangosVersionesMaxSub]]

```sql

CREATE VIEW [dbo].[vw_JefesDeColision_22] AS

SELECT A.CodigoEmpleado, A.Nombres, A.Ano_Periodo, A.Mes_Periodo, A.Ventas, A.Presupuesto, A.PorcentajeCumplimiento, A.IdRangoMaestra, A.IdRangoVersionMax, A.IdComisionModeloSub, A.IdComisionModeloSubCriterio,	
vw_RangosMaestrasFull.IdRangoVersion, vw_RangosMaestrasFull.ConsecutivoVersion, vw_RangosMaestrasFull.IdRangoDetalle, vw_RangosMaestrasFull.Desde, vw_RangosMaestrasFull.Hasta, 
vw_RangosMaestrasFull.Valor AS Comision_Presupuesto, vw_RangosMaestrasFull.CodigoConcepto
FROM
(

	SELECT ExogenasEmpleadosCentrosPago.CodigoEmpleado, ExogenasEmpleadosCentrosPago.Nombres,  VENTAS.Ano_Periodo, VENTAS.Mes_Periodo, SUM(VENTAS.Ventas) AS Ventas, SUM(VENTAS.Presupuesto) AS Presupuesto
	,CASE WHEN SUM(VENTAS.Presupuesto) <> 0 THEN CONVERT(decimal(18,2),CONVERT(decimal(18,2),SUM(VENTAS.Ventas)) / CONVERT(decimal(18,2),SUM(VENTAS.Presupuesto))) * 100 ELSE 0 END AS PorcentajeCumplimiento
	,ExogenasEmpleadosCentrosPago.IdRangoMaestra, ExogenasEmpleadosCentrosPago.IdRangoVersionMax, ExogenasEmpleadosCentrosPago.IdComisionModeloSub, ExogenasEmpleadosCentrosPago.IdComisionModeloSubCriterio
	FROM
	(
		SELECT Año AS Ano_Periodo, Mes AS Mes_Periodo, CodigoCentro, NombreCentro, SUM(Ventas) AS Ventas, SUM(Presupuesto) AS Presupuesto
		FROM vw_JefesDeColision_2 
		GROUP BY Año, Mes, CodigoCentro, NombreCentro
	)AS VENTAS
	RIGHT OUTER JOIN
	(
		SELECT EMPLEADOS.CodigoEmpleado, EMPLEADOS.Nombres, EMPLEADOS.IdRangoMaestra, EMPLEADOS.IdRangoVersionMax, EMPLEADOS.IdComisionModeloSub, EMPLEADOS.IdComisionModeloSubCriterio, CENTROS.CodigoCentro
		FROM
		(
			SELECT        dbo.Empleados.CodigoEmpleado, Empleados.Nombres +' '+ Empleados.Apellido1+' '+ Empleados.Apellido2 AS Nombres, dbo.vw_RangosVersionesMaxSub.IdRangoMaestra, dbo.vw_RangosVersionesMaxSub.IdRangoVersionMax, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
			FROM            dbo.EmpleadosRangosMaestras 
			INNER JOIN dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado 
			INNER JOIN dbo.vw_RangosVersionesMaxSub ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMaxSub.IdRangoMaestra
			WHERE (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub = 81) AND (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 155) OR 
			(dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub = 82) AND (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 157)
		)AS EMPLEADOS
		LEFT JOIN 
		(	SELECT        CodigoEmpleado, CodigoCentro, Comentarios, UserIdCreo, FechaCreacion, UserIdModifico, FechaModificacion
			FROM            dbo.ExogenasEmpleadosCentrosPago
		) AS CENTROS ON EMPLEADOS.CodigoEmpleado = CENTROS.CodigoEmpleado
		WHERE (CENTROS.CodigoCentro IS NOT NULL)

	)AS ExogenasEmpleadosCentrosPago ON VENTAS.CodigoCentro = ExogenasEmpleadosCentrosPago.CodigoCentro
	GROUP BY ExogenasEmpleadosCentrosPago.CodigoEmpleado, ExogenasEmpleadosCentrosPago.Nombres,  VENTAS.Ano_Periodo, VENTAS.Mes_Periodo,
	ExogenasEmpleadosCentrosPago.IdRangoMaestra, ExogenasEmpleadosCentrosPago.IdRangoVersionMax, ExogenasEmpleadosCentrosPago.IdComisionModeloSub, ExogenasEmpleadosCentrosPago.IdComisionModeloSubCriterio

)AS A
LEFT OUTER JOIN dbo.vw_RangosMaestrasFull ON A.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion

WHERE (dbo.vw_RangosMaestrasFull.Desde < A.PorcentajeCumplimiento) AND (dbo.vw_RangosMaestrasFull.Hasta >= A.PorcentajeCumplimiento)

```
