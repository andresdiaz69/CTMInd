# View: vw_EjecutivosCreditosYSeguros_2

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[ExogenasEmpleadosCentrosPago]]
- [[vw_AsesoresCreditosSeguros_Seguros]]
- [[vw_RangosVersionesMaxSub]]

```sql









CREATE VIEW [dbo].[vw_EjecutivosCreditosYSeguros_2] AS

SELECT EMPLEADOSCENTRO.IdRangoMaestra, EMPLEADOSCENTRO.IdRangoVersionMax, EMPLEADOSCENTRO.IdComisionModeloSub, EMPLEADOSCENTRO.IdComisionModeloSubCriterio, EMPLEADOSCENTRO.CodigoEmpleado, EMPLEADOSCENTRO.Nombres
, COMISIONSEGUROS.Año, COMISIONSEGUROS.MesInicial, COMISIONSEGUROS.MesFinal, EMPLEADOSCENTRO.CodigoCentro,COMISIONSEGUROS.NombreCentro, COMISIONSEGUROS.ValorSeguros
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
		WHERE (vw_RangosVersionesMaxSub.IdComisionModeloSub = 66) AND (vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 123)

		UNION ALL

		SELECT Empleados1.CodigoEmpleado,Empleados1.Nombres +' '+Empleados1.Apellido1+' '+Empleados1.Apellido2 AS Nombres, vw_RangosVersionesMaxSub.IdRangoMaestra, vw_RangosVersionesMaxSub.IdRangoVersionMax, vw_RangosVersionesMaxSub.IdComisionModeloSub
		,vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
		FROM EmpleadosRangosMaestras
		INNER JOIN Empleados AS Empleados1  ON EmpleadosRangosMaestras.CodigoEmpleado = Empleados1.CodigoEmpleado
		INNER JOIN vw_RangosVersionesMaxSub ON EmpleadosRangosMaestras.IdRangoMaestra = vw_RangosVersionesMaxSub.IdRangoMaestra
		WHERE (vw_RangosVersionesMaxSub.IdComisionModeloSub = 67) AND (vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 125)

	)AS EMPLEADOS
	LEFT JOIN 
	(	SELECT        CodigoEmpleado, CodigoCentro, Comentarios, UserIdCreo, FechaCreacion, UserIdModifico, FechaModificacion
		FROM            dbo.ExogenasEmpleadosCentrosPago
	) AS CENTROS ON EMPLEADOS.CodigoEmpleado = CENTROS.CodigoEmpleado
	WHERE (CENTROS.CodigoCentro IS NOT NULL)
)AS EMPLEADOSCENTRO
LEFT JOIN 
(
	--SELECT SEGUROS.Año, SEGUROS.MesInicial, SEGUROS.MesFinal, SEGUROS.CodigoCentro, SEGUROS.NombreCentro, SEGUROS.Valor AS ValorSeguros
	--FROM vw_AsesoresCreditosSeguros_Seguros AS SEGUROS

	SELECT SEGUROS.Año, SEGUROS.MesInicial, SEGUROS.MesFinal, SEGUROS.CodigoCentro, SEGUROS.NombreCentro, SUM(SEGUROS.Valor) AS ValorSeguros
	FROM vw_AsesoresCreditosSeguros_Seguros AS SEGUROS
	GROUP BY SEGUROS.Año, SEGUROS.MesInicial, SEGUROS.MesFinal, SEGUROS.CodigoCentro, SEGUROS.NombreCentro
	-- JCS: 2022/06/21 - PARA QUE AGRUPE LAS SEDES DEL CENTRO

) AS COMISIONSEGUROS
ON EMPLEADOSCENTRO.CodigoCentro = COMISIONSEGUROS.CodigoCentro

```
