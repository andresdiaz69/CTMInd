# View: vw_JefedeVentasCali_2_Dic2122023

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[ExogenasEmpleadosCentrosPago]]
- [[vw_AsesoresCreditosSeguros_Creditos_Jefes]]
- [[vw_AsesoresCreditosSeguros_Seguros]]
- [[vw_JefesDeVentas_VentasNetas]]
- [[vw_RangosVersionesMaxSub]]

```sql
create VIEW [dbo].[vw_JefedeVentasCali_2_Dic2122023] AS
SELECT   ExogenasEmpleadosCentrosPago.CodigoEmpleado, ExogenasEmpleadosCentrosPago.Nombres,  COLOCACION.Ano, COLOCACION.Mes, COLOCACION.CodigoCentro, COLOCACION.Valor_Creditos, COLOCACION.Valor_Seguros, COLOCACION.Valor_VentasNetas, COLOCACION.ColocacionCreditosYSeguros
,ExogenasEmpleadosCentrosPago.IdRangoMaestra, ExogenasEmpleadosCentrosPago.IdRangoVersionMax, ExogenasEmpleadosCentrosPago.IdComisionModeloSub, ExogenasEmpleadosCentrosPago.IdComisionModeloSubCriterio
FROM
(
	SELECT ISNULL(ISNULL(VENTAS_NETAS.Año, SEGUROS.Año), CREDITOS.Año) as Ano, ISNULL(ISNULL(VENTAS_NETAS.MesInicial, SEGUROS.MesInicial), CREDITOS.MesInicial) AS Mes, ISNULL(ISNULL(VENTAS_NETAS.CodigoCentro, SEGUROS.CodigoCentro), CREDITOS.CodigoCentro) AS CodigoCentro
	, ISNULL(ISNULL(VENTAS_NETAS.NombreCentro, SEGUROS.NombreCentro), CREDITOS.NombreCentro) AS NombreCentro, ISNULL(VENTAS_NETAS.Valor_VentasNetas,0) AS Valor_VentasNetas, ISNULL(SEGUROS.Valor_Seguros, 0) AS Valor_Seguros, ISNULL(CREDITOS.Valor_Creditos, 0) AS Valor_Creditos
	,CASE WHEN ISNULL(Valor_VentasNetas,0) <> 0 THEN (ISNULL(Valor_Creditos, 0) + ISNULL(Valor_Seguros,0)) / ISNULL(Valor_VentasNetas,0) * 100 END AS ColocacionCreditosYSeguros
	FROM
	(
		SELECT DISTINCT Año, MesInicial, CodigoCentro, NombreCentro, Valor AS Valor_VentasNetas
		--FROM dbo.vw_AsesoresCreditosSeguros_VentasNetas
		FROM dbo.vw_JefesDeVentas_VentasNetas -- JCS: 2022/09/21 (NUEVA VISTA)
		WHERE        (MesInicial = MesFinal)
	) AS VENTAS_NETAS 
	FULL JOIN
	(
		SELECT DISTINCT Año, MesInicial, CodigoCentro, NombreCentro, Valor AS Valor_Seguros
		FROM            dbo.vw_AsesoresCreditosSeguros_Seguros
		WHERE        (MesInicial = MesFinal)
	) AS SEGUROS ON VENTAS_NETAS.Año = SEGUROS.Año AND VENTAS_NETAS.MesInicial = SEGUROS.MesInicial AND VENTAS_NETAS.CodigoCentro = SEGUROS.CodigoCentro
	FULL JOIN
	(
		SELECT DISTINCT Año, MesInicial, CodigoCentro, NombreCentro, Valor AS Valor_Creditos
		--FROM            dbo.vw_AsesoresCreditosSeguros_Creditos
		FROM dbo.vw_AsesoresCreditosSeguros_Creditos_Jefes -- JCS: 2023/02/21 (NUEVA VISTA)
		WHERE        (MesInicial = MesFinal)
	) AS CREDITOS ON VENTAS_NETAS.Año = CREDITOS.Año AND VENTAS_NETAS.MesInicial = CREDITOS.MesInicial AND VENTAS_NETAS.CodigoCentro = CREDITOS.CodigoCentro

)AS COLOCACION
RIGHT OUTER JOIN
(
	SELECT EMPLEADOS.CodigoEmpleado, EMPLEADOS.Nombres, EMPLEADOS.IdRangoMaestra, EMPLEADOS.IdRangoVersionMax, EMPLEADOS.IdComisionModeloSub, EMPLEADOS.IdComisionModeloSubCriterio, CENTROS.CodigoCentro
	FROM
	(
		SELECT        dbo.Empleados.CodigoEmpleado, Empleados.Nombres +' '+ Empleados.Apellido1+' '+ Empleados.Apellido2 AS Nombres, dbo.vw_RangosVersionesMaxSub.IdRangoMaestra, dbo.vw_RangosVersionesMaxSub.IdRangoVersionMax, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
		FROM            dbo.EmpleadosRangosMaestras 
		INNER JOIN dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado 
		INNER JOIN dbo.vw_RangosVersionesMaxSub ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMaxSub.IdRangoMaestra
		WHERE (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub = 84) AND (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 162) 
	)AS EMPLEADOS
	LEFT JOIN 
	(	SELECT        CodigoEmpleado, CodigoCentro, Comentarios, UserIdCreo, FechaCreacion, UserIdModifico, FechaModificacion
		FROM            dbo.ExogenasEmpleadosCentrosPago
	) AS CENTROS ON EMPLEADOS.CodigoEmpleado = CENTROS.CodigoEmpleado
	WHERE (CENTROS.CodigoCentro IS NOT NULL)

)AS ExogenasEmpleadosCentrosPago ON COLOCACION.CodigoCentro = ExogenasEmpleadosCentrosPago.CodigoCentro
	where ExogenasEmpleadosCentrosPago.CodigoEmpleado= '79792922'	
and COLOCACION.Ano = 2023
AND COLOCACION.Mes = 11


```
