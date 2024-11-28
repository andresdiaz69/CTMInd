# View: vw_JefesDeColision_1

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[ExogenasEmpleadosCentrosPago]]
- [[vw_JefesDeColision_VehiculosEntregados]]
- [[vw_RangosMaestrasFull]]
- [[vw_RangosVersionesMaxSub]]

```sql




CREATE VIEW [dbo].[vw_JefesDeColision_1] AS

SELECT A.CodigoEmpleado, A.Nombres, A.Ano_Periodo, A.Mes_Periodo, A.Cantidad, A.IdRangoMaestra, A.IdRangoVersionMax, A.IdComisionModeloSub, A.IdComisionModeloSubCriterio,	
vw_RangosMaestrasFull.IdRangoVersion, vw_RangosMaestrasFull.ConsecutivoVersion, vw_RangosMaestrasFull.IdRangoDetalle, vw_RangosMaestrasFull.Desde, vw_RangosMaestrasFull.Hasta, 
vw_RangosMaestrasFull.Valor AS Comision_Vehiculos
, vw_RangosMaestrasFull.CodigoConcepto
FROM
(
	SELECT ExogenasEmpleadosCentrosPago.CodigoEmpleado, ExogenasEmpleadosCentrosPago.Nombres,  VEHICULOS.Ano_Periodo, VEHICULOS.Mes_Periodo, SUM(VEHICULOS.cantidad) AS Cantidad
	,ExogenasEmpleadosCentrosPago.IdRangoMaestra, ExogenasEmpleadosCentrosPago.IdRangoVersionMax, ExogenasEmpleadosCentrosPago.IdComisionModeloSub, ExogenasEmpleadosCentrosPago.IdComisionModeloSubCriterio
	FROM
	(
		SELECT Ano_Periodo, Mes_Periodo, CodigoCentro, centro AS Centro, SUM(cantidad) AS Cantidad
		FROM vw_JefesDeColision_VehiculosEntregados 
		GROUP BY Ano_Periodo, Mes_Periodo, CodigoCentro, centro
	)AS VEHICULOS
	RIGHT OUTER JOIN
	(
		SELECT EMPLEADOS.CodigoEmpleado, EMPLEADOS.Nombres, EMPLEADOS.IdRangoMaestra, EMPLEADOS.IdRangoVersionMax, EMPLEADOS.IdComisionModeloSub, EMPLEADOS.IdComisionModeloSubCriterio, CENTROS.CodigoCentro
		FROM
		(
			SELECT        dbo.Empleados.CodigoEmpleado, Empleados.Nombres +' '+ Empleados.Apellido1+' '+ Empleados.Apellido2 AS Nombres, dbo.vw_RangosVersionesMaxSub.IdRangoMaestra, dbo.vw_RangosVersionesMaxSub.IdRangoVersionMax, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
			FROM            dbo.EmpleadosRangosMaestras 
			INNER JOIN dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado 
			INNER JOIN dbo.vw_RangosVersionesMaxSub ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMaxSub.IdRangoMaestra
			WHERE (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub = 81) AND (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 154) OR 
			(dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub = 82) AND (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 156)
		)AS EMPLEADOS
		LEFT JOIN 
		(	SELECT        CodigoEmpleado, CodigoCentro, Comentarios, UserIdCreo, FechaCreacion, UserIdModifico, FechaModificacion
			FROM            dbo.ExogenasEmpleadosCentrosPago
		) AS CENTROS ON EMPLEADOS.CodigoEmpleado = CENTROS.CodigoEmpleado
		WHERE (CENTROS.CodigoCentro IS NOT NULL)

	)AS ExogenasEmpleadosCentrosPago ON VEHICULOS.CodigoCentro = ExogenasEmpleadosCentrosPago.CodigoCentro
	GROUP BY ExogenasEmpleadosCentrosPago.CodigoEmpleado, ExogenasEmpleadosCentrosPago.Nombres,  VEHICULOS.Ano_Periodo, VEHICULOS.Mes_Periodo,
	ExogenasEmpleadosCentrosPago.IdRangoMaestra, ExogenasEmpleadosCentrosPago.IdRangoVersionMax, ExogenasEmpleadosCentrosPago.IdComisionModeloSub, ExogenasEmpleadosCentrosPago.IdComisionModeloSubCriterio

)AS A
LEFT OUTER JOIN dbo.vw_RangosMaestrasFull ON A.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion

WHERE (dbo.vw_RangosMaestrasFull.Desde < A.Cantidad) AND (dbo.vw_RangosMaestrasFull.Hasta >= A.Cantidad)


```
