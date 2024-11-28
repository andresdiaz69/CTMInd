# View: vw_CoordinadorComercialMitsubishiyBYD_1

## Usa los objetos:
- [[ComisionesSpigaVN]]
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[ExogenasEmpleadosCentrosPago]]
- [[vw_RangosVersionesMaxSub]]

```sql


CREATE VIEW [dbo].[vw_CoordinadorComercialMitsubishiyBYD_1] AS

SELECT A.CodigoEmpleado, A.Nombres, A.Ano_Periodo, A.Mes_Periodo, A.CodigoCentro, A.EntregasEfectivas, A.IdRangoMaestra, A.IdRangoVersionMax, A.IdComisionModeloSub, A.IdComisionModeloSubCriterio
FROM
(
	SELECT ExogenasEmpleadosCentrosPago.CodigoEmpleado, ExogenasEmpleadosCentrosPago.Nombres,  VEHICULOS.Ano_Periodo, VEHICULOS.Mes_Periodo, VEHICULOS.CodigoCentro,VEHICULOS.EntregasEfectivas
	,ExogenasEmpleadosCentrosPago.IdRangoMaestra, ExogenasEmpleadosCentrosPago.IdRangoVersionMax, ExogenasEmpleadosCentrosPago.IdComisionModeloSub, ExogenasEmpleadosCentrosPago.IdComisionModeloSubCriterio
	FROM
	(
		SELECT Ano_Periodo, Mes_Periodo, CodigoCentro, SUM(EntregaEfectiva) AS EntregaSEfectivaS FROM ComisionesSpigaVN
		WHERE EntregaEfectiva = 1
		GROUP BY Ano_Periodo, Mes_Periodo, CodigoCentro

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
			WHERE (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub = 87) AND (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 166) 
		)AS EMPLEADOS
		LEFT JOIN 
		(	SELECT        CodigoEmpleado, CodigoCentro, Comentarios, UserIdCreo, FechaCreacion, UserIdModifico, FechaModificacion
			FROM            dbo.ExogenasEmpleadosCentrosPago
		) AS CENTROS ON EMPLEADOS.CodigoEmpleado = CENTROS.CodigoEmpleado
		WHERE (CENTROS.CodigoCentro IS NOT NULL)

	)AS ExogenasEmpleadosCentrosPago ON VEHICULOS.CodigoCentro = ExogenasEmpleadosCentrosPago.CodigoCentro

)AS A

```
