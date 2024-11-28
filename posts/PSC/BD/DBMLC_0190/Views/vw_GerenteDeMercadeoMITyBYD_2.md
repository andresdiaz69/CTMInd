# View: vw_GerenteDeMercadeoMITyBYD_2

## Usa los objetos:
- [[Centros]]
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[ExogenasEmpleadosCentrosPago]]
- [[vw_GerenteMercadeoMitByd]]
- [[vw_RangosVersionesMaxSub]]

```sql
CREATE VIEW [dbo].[vw_GerenteDeMercadeoMITyBYD_2] AS 

SELECT A.CodigoEmpleado, A.Nombres, A.Ano_Periodo, A.Mes_Periodo, A.CodigoCentro, A.NombreCentro, A.Valor, A.IdRangoMaestra, A.IdRangoVersionMax, A.IdComisionModeloSub, A.IdComisionModeloSubCriterio
FROM
(
	SELECT ExogenasEmpleadosCentrosPago.CodigoEmpleado, ExogenasEmpleadosCentrosPago.Nombres,  FACTURACION.Ano_Periodo, FACTURACION.Mes_Periodo, FACTURACION.CodigoCentro, FACTURACION.NombreCentro, FACTURACION.Valor
	,ExogenasEmpleadosCentrosPago.IdRangoMaestra, ExogenasEmpleadosCentrosPago.IdRangoVersionMax, ExogenasEmpleadosCentrosPago.IdComisionModeloSub, ExogenasEmpleadosCentrosPago.IdComisionModeloSubCriterio
	FROM
	(
		SELECT v.Año as Ano_Periodo, v.Mes AS Mes_Periodo, v.Sede AS NombreCentro, v.Valor, c.CodigoCentro
		FROM
		(
			SELECT año, Mes
			, CASE WHEN Sede = 'BYD Bogota Mayorista' THEN 'BYD-Bta-Mayorista Vehículos'
			ELSE Sede END AS Sede
			, Valor
			FROM vw_GerenteMercadeoMitByd 
		)AS v
		LEFT JOIN centros c ON v.Sede = c.NombreCentro

	)AS FACTURACION
	RIGHT OUTER JOIN
	(
		SELECT EMPLEADOS.CodigoEmpleado, EMPLEADOS.Nombres, EMPLEADOS.IdRangoMaestra, EMPLEADOS.IdRangoVersionMax, EMPLEADOS.IdComisionModeloSub, EMPLEADOS.IdComisionModeloSubCriterio, CENTROS.CodigoCentro
		FROM
		(
			SELECT        dbo.Empleados.CodigoEmpleado, Empleados.Nombres +' '+ Empleados.Apellido1+' '+ Empleados.Apellido2 AS Nombres, dbo.vw_RangosVersionesMaxSub.IdRangoMaestra, dbo.vw_RangosVersionesMaxSub.IdRangoVersionMax, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
			FROM            dbo.EmpleadosRangosMaestras 
			INNER JOIN dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado 
			INNER JOIN dbo.vw_RangosVersionesMaxSub ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMaxSub.IdRangoMaestra
			WHERE (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub = 89) AND (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 169) 
		)AS EMPLEADOS
		LEFT JOIN 
		(	SELECT        CodigoEmpleado, CodigoCentro, Comentarios, UserIdCreo, FechaCreacion, UserIdModifico, FechaModificacion
			FROM            dbo.ExogenasEmpleadosCentrosPago
		) AS CENTROS ON EMPLEADOS.CodigoEmpleado = CENTROS.CodigoEmpleado
		WHERE (CENTROS.CodigoCentro IS NOT NULL)

	)AS ExogenasEmpleadosCentrosPago ON FACTURACION.CodigoCentro = ExogenasEmpleadosCentrosPago.CodigoCentro

)AS A

```
