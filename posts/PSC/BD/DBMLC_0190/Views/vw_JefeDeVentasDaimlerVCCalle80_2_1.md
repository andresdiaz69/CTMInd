# View: vw_JefeDeVentasDaimlerVCCalle80_2_1

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[ExogenasEmpleadosCentrosPago]]
- [[vw_comisiones_otros_ingresos_DaimlerVC]]
- [[vw_comisiones_VentasNetas_DaimlerVC]]
- [[vw_RangosVersionesMaxSub]]

```sql

CREATE VIEW [dbo].[vw_JefeDeVentasDaimlerVCCalle80_2_1] AS


SELECT  ExogenasEmpleadosCentrosPago.CodigoEmpleado, ExogenasEmpleadosCentrosPago.Nombres,PARTICIPACION.Año, PARTICIPACION.Mes, PARTICIPACION.CodigoCentro, PARTICIPACION.VentasNetas, PARTICIPACION.OtrosIngresos, PARTICIPACION.ParticipacionOtrosIngresos
, ExogenasEmpleadosCentrosPago.IdRangoMaestra, ExogenasEmpleadosCentrosPago.IdRangoVersionMax, ExogenasEmpleadosCentrosPago.IdComisionModeloSub, ExogenasEmpleadosCentrosPago.IdComisionModeloSubCriterio
FROM
(
	SELECT VENTASNETAS.Año, VENTASNETAS.MesInicial AS Mes, VENTASNETAS.CodigoCentro, ISNULL(VENTASNETAS.VentasNetas,0) AS VentasNetas, ISNULL(OTROSINGRESOS.OtrosIngresos,0) AS OtrosIngresos,
	CASE WHEN ISNULL(VENTASNETAS.VentasNetas, 0) > 0  THEN ISNULL(CONVERT(decimal(18,2), OTROSINGRESOS.OtrosIngresos), 0) / ISNULL(CONVERT(decimal(18,2), VENTASNETAS.VentasNetas), 0) * 100
	ELSE 0.00 END AS ParticipacionOtrosIngresos
	FROM
	(
		SELECT Año, MesInicial, MesFinal, CodigoCentro, NombreCentro, Valor AS VentasNetas
		FROM vw_comisiones_VentasNetas_DaimlerVC
		WHERE MesInicial = MesFinal
	)AS VENTASNETAS
	LEFT JOIN 
	(
		SELECT Año, MesInicial, MesFinal, CodigoCentro, NombreCentro, Valor AS OtrosIngresos
		FROM vw_comisiones_otros_ingresos_DaimlerVC	
		WHERE MesInicial = MesFinal
	)AS OTROSINGRESOS ON VENTASNETAS.CodigoCentro = OTROSINGRESOS.CodigoCentro AND VENTASNETAS.Año = OTROSINGRESOS.Año AND VENTASNETAS.MesInicial = OTROSINGRESOS.MesInicial

)AS PARTICIPACION

RIGHT OUTER JOIN 
(
	SELECT EMPLEADOS.CodigoEmpleado, EMPLEADOS.Nombres, EMPLEADOS.IdRangoMaestra, EMPLEADOS.IdRangoVersionMax, EMPLEADOS.IdComisionModeloSub, EMPLEADOS.IdComisionModeloSubCriterio, CENTROS.CodigoCentro
	FROM
	(
		SELECT Empleados1.CodigoEmpleado,Empleados1.Nombres +' '+Empleados1.Apellido1+' '+Empleados1.Apellido2 AS Nombres, vw_RangosVersionesMaxSub.IdRangoMaestra, vw_RangosVersionesMaxSub.IdRangoVersionMax, vw_RangosVersionesMaxSub.IdComisionModeloSub
		,vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
		FROM EmpleadosRangosMaestras
		INNER JOIN Empleados AS Empleados1  ON EmpleadosRangosMaestras.CodigoEmpleado = Empleados1.CodigoEmpleado
		INNER JOIN vw_RangosVersionesMaxSub ON EmpleadosRangosMaestras.IdRangoMaestra = vw_RangosVersionesMaxSub.IdRangoMaestra
		WHERE (vw_RangosVersionesMaxSub.IdComisionModeloSub = 75) AND (vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 142)
	)AS EMPLEADOS
	LEFT JOIN 
	(	SELECT        CodigoEmpleado, CodigoCentro, Comentarios, UserIdCreo, FechaCreacion, UserIdModifico, FechaModificacion
		FROM            dbo.ExogenasEmpleadosCentrosPago
	) AS CENTROS ON EMPLEADOS.CodigoEmpleado = CENTROS.CodigoEmpleado
	WHERE (CENTROS.CodigoCentro IS NOT NULL)
	
)AS ExogenasEmpleadosCentrosPago ON PARTICIPACION.CodigoCentro = ExogenasEmpleadosCentrosPago.CodigoCentro
WHERE        (PARTICIPACION.Año IS NOT NULL)



```
