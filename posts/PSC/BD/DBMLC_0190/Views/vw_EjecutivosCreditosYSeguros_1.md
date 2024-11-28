# View: vw_EjecutivosCreditosYSeguros_1

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[ExogenasEmpleadosCentrosPago]]
- [[vw_AsesoresCreditosSeguros_Creditos]]
- [[vw_AsesoresCreditosSeguros_VentasNetas]]
- [[vw_RangosVersionesMaxSub]]

```sql


CREATE VIEW [dbo].[vw_EjecutivosCreditosYSeguros_1] AS 
SELECT EMPLEADOSCENTRO.IdRangoMaestra, EMPLEADOSCENTRO.IdRangoVersionMax, EMPLEADOSCENTRO.IdComisionModeloSub, 
EMPLEADOSCENTRO.IdComisionModeloSubCriterio, EMPLEADOSCENTRO.CodigoEmpleado, EMPLEADOSCENTRO.Nombres, 
COMISIONCREDITOS.Año, COMISIONCREDITOS.MesInicial, COMISIONCREDITOS.MesFinal, 
EMPLEADOSCENTRO.CodigoCentro,COMISIONCREDITOS.NombreCentro,COMISIONCREDITOS.ValorComisionCreditos, COMISIONCREDITOS.ValorVentasNetas
FROM 
(
	SELECT EMPLEADOS.CodigoEmpleado, EMPLEADOS.Nombres, EMPLEADOS.IdRangoMaestra, EMPLEADOS.IdRangoVersionMax, EMPLEADOS.IdComisionModeloSub, EMPLEADOS.IdComisionModeloSubCriterio, CENTROS.CodigoCentro
	FROM 
	(
		SELECT Empleados1.CodigoEmpleado,Empleados1.Nombres +' '+Empleados1.Apellido1+' '+Empleados1.Apellido2 AS Nombres, vw_RangosVersionesMaxSub.IdRangoMaestra, vw_RangosVersionesMaxSub.IdRangoVersionMax, vw_RangosVersionesMaxSub.IdComisionModeloSub
		,vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
		FROM EmpleadosRangosMaestras
		INNER JOIN Empleados AS Empleados1  ON EmpleadosRangosMaestras.CodigoEmpleado = Empleados1.CodigoEmpleado
		INNER JOIN vw_RangosVersionesMaxSub ON EmpleadosRangosMaestras.IdRangoMaestra = vw_RangosVersionesMaxSub.IdRangoMaestra
		WHERE (vw_RangosVersionesMaxSub.IdComisionModeloSub = 66) AND (vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 122)

		UNION ALL

		SELECT Empleados1.CodigoEmpleado,Empleados1.Nombres +' '+Empleados1.Apellido1+' '+Empleados1.Apellido2 AS Nombres, vw_RangosVersionesMaxSub.IdRangoMaestra, vw_RangosVersionesMaxSub.IdRangoVersionMax, vw_RangosVersionesMaxSub.IdComisionModeloSub
		,vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
		FROM EmpleadosRangosMaestras
		INNER JOIN Empleados AS Empleados1  ON EmpleadosRangosMaestras.CodigoEmpleado = Empleados1.CodigoEmpleado
		INNER JOIN vw_RangosVersionesMaxSub ON EmpleadosRangosMaestras.IdRangoMaestra = vw_RangosVersionesMaxSub.IdRangoMaestra
		WHERE (vw_RangosVersionesMaxSub.IdComisionModeloSub = 67) AND (vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 124)

	)AS EMPLEADOS
	LEFT JOIN 
	(	SELECT        CodigoEmpleado, CodigoCentro, Comentarios, UserIdCreo, FechaCreacion, UserIdModifico, FechaModificacion
		FROM            dbo.ExogenasEmpleadosCentrosPago
	) AS CENTROS ON EMPLEADOS.CodigoEmpleado = CENTROS.CodigoEmpleado
	WHERE (CENTROS.CodigoCentro IS NOT NULL)
)AS EMPLEADOSCENTRO
LEFT JOIN 
(
	--SELECT CREDITOS.Año, CREDITOS.MesInicial, CREDITOS.MesFinal, CREDITOS.CodigoCentro, CREDITOS.NombreCentro, ISNULL(CREDITOS.Valor,0)AS ValorComisionCreditos, ISNULL(VENTASNETAS.Valor,0)AS ValorVentasNetas
	--FROM vw_AsesoresCreditosSeguros_Creditos AS CREDITOS
	--LEFT JOIN vw_AsesoresCreditosSeguros_VentasNetas AS VENTASNETAS 
	--ON CREDITOS.Año = VENTASNETAS.Año AND CREDITOS.MesInicial = VENTASNETAS.MesInicial AND CREDITOS.MesFinal = VENTASNETAS.MesFinal AND CREDITOS.CodigoCentro = VENTASNETAS.CodigoCentro

	SELECT CREDITOS.Año, CREDITOS.MesInicial, CREDITOS.MesFinal, CREDITOS.CodigoCentro, CREDITOS.NombreCentro, SUM(ISNULL(CREDITOS.Valor,0)) AS ValorComisionCreditos, SUM(ISNULL(VENTASNETAS.Valor,0)) AS ValorVentasNetas
	FROM vw_AsesoresCreditosSeguros_Creditos AS CREDITOS
	LEFT JOIN vw_AsesoresCreditosSeguros_VentasNetas AS VENTASNETAS 
	ON CREDITOS.Año = VENTASNETAS.Año AND CREDITOS.MesInicial = VENTASNETAS.MesInicial AND CREDITOS.MesFinal = VENTASNETAS.MesFinal AND CREDITOS.CodigoCentro = VENTASNETAS.CodigoCentro
	GROUP BY CREDITOS.Año, CREDITOS.MesInicial, CREDITOS.MesFinal, CREDITOS.CodigoCentro, CREDITOS.NombreCentro
	-- JCS: 2022/06/21 - PARA QUE AGRUPE LAS SEDES DEL CENTRO

) AS COMISIONCREDITOS
ON EMPLEADOSCENTRO.CodigoCentro = COMISIONCREDITOS.CodigoCentro
--WHERE CodigoEmpleado = 1012396436 AND COMISIONCREDITOS.Año = 2022
--and COMISIONCREDITOS.MesInicial= 5 and COMISIONCREDITOS.MesFinal=5

```
