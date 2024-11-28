# View: vw_JefeDeVentasVirtualMazda_2

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[ExogenasEmpleadosCentrosPago]]
- [[vw_AsesoresCreditosSeguros_Creditos]]
- [[vw_AsesoresCreditosSeguros_Seguros]]
- [[vw_AsesoresCreditosSeguros_VentasNetas]]
- [[vw_RangosVersionesMaxSub]]

```sql
CREATE VIEW [dbo].[vw_JefeDeVentasVirtualMazda_2] AS

SELECT EMPLEADOSCENTRO.IdRangoMaestra, EMPLEADOSCENTRO.IdRangoVersionMax, EMPLEADOSCENTRO.IdComisionModeloSub, EMPLEADOSCENTRO.IdComisionModeloSubCriterio, EMPLEADOSCENTRO.CodigoEmpleado, EMPLEADOSCENTRO.Nombres, CREDYSEGU.CodigoCentro, CREDYSEGU.Año, CREDYSEGU.MesInicial, CREDYSEGU.MesFinal, CREDYSEGU.ValorCreditos, CREDYSEGU.ValorSeguros, CREDYSEGU.ValorTotalCreYSeguros, CREDYSEGU.ValorVentasNetas, CREDYSEGU.Porcentaje
FROM (
	SELECT EMPLEADOS.CodigoEmpleado, EMPLEADOS.Nombres, EMPLEADOS.IdRangoMaestra, EMPLEADOS.IdRangoVersionMax, EMPLEADOS.IdComisionModeloSub, EMPLEADOS.IdComisionModeloSubCriterio, CENTROS.CodigoCentro
	FROM 
	(
		SELECT Empleados1.CodigoEmpleado,Empleados1.Nombres +' '+Empleados1.Apellido1+' '+Empleados1.Apellido2 AS Nombres, vw_RangosVersionesMaxSub.IdRangoMaestra, vw_RangosVersionesMaxSub.IdRangoVersionMax, vw_RangosVersionesMaxSub.IdComisionModeloSub
		,vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
		FROM EmpleadosRangosMaestras
		INNER JOIN Empleados AS Empleados1  ON EmpleadosRangosMaestras.CodigoEmpleado = Empleados1.CodigoEmpleado
		INNER JOIN vw_RangosVersionesMaxSub ON EmpleadosRangosMaestras.IdRangoMaestra = vw_RangosVersionesMaxSub.IdRangoMaestra
		WHERE (vw_RangosVersionesMaxSub.IdComisionModeloSub = 69) AND (vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 129)

	)AS EMPLEADOS
	LEFT JOIN 
	(	SELECT        CodigoEmpleado, CodigoCentro, Comentarios, UserIdCreo, FechaCreacion, UserIdModifico, FechaModificacion
		FROM            dbo.ExogenasEmpleadosCentrosPago
	) AS CENTROS ON EMPLEADOS.CodigoEmpleado = CENTROS.CodigoEmpleado
	WHERE (CENTROS.CodigoCentro IS NOT NULL)
)AS EMPLEADOSCENTRO 
LEFT JOIN
(
	SELECT  CreYSeg.Año, CreYSeg.MesInicial, CreYSeg.MesFinal, CreYSeg.CodigoCentro, CreYSeg.ValorCreditos, CreYSeg.ValorSeguros, CreYSeg.ValorTotalCreYSeguros, ISNULL(V.ValorVentasNetas,0) AS ValorVentasNetas
	,ISNULL(CreYSeg.ValorTotalCreYSeguros / V.ValorVentasNetas * 100,0) AS Porcentaje
	FROM
	(
		-- comisiones crédito
		SELECT ISNULL(C.CodigoCentro, S.CodigoCentro) AS CodigoCentro, ISNULL(C.Año, S.Año) AS Año, ISNULL(C.MesInicial, S.MesInicial) AS MesInicial, ISNULL(C.MesFinal, S.MesFinal) AS MesFinal
		, ISNULL(C.Valor,0) AS ValorCreditos, ISNULL(S.ValorSeguros,0) AS ValorSeguros, (ISNULL(C.Valor,0) + ISNULL(S.ValorSeguros,0)) AS ValorTotalCreYSeguros
		FROM vw_AsesoresCreditosSeguros_Creditos AS C
		FULL JOIN
		(--Comision de seguros
			SELECT CodigoCentro, Año, MesInicial, MesFinal, Valor AS ValorSeguros
			FROM vw_AsesoresCreditosSeguros_Seguros
		) AS S ON C.CodigoCentro = S.CodigoCentro AND C.Año = S.Año AND C.MesInicial = S.MesInicial AND C.MesFinal = S.MesFinal
	)AS CreYSeg
	LEFT JOIN
	(--Ventas netas
		SELECT V.CodigoCentro, V.Año, V.MesInicial, V.MesFinal, V.Valor AS ValorVentasNetas
		FROM vw_AsesoresCreditosSeguros_VentasNetas AS V
	)AS V ON CreYSeg.CodigoCentro = v.CodigoCentro AND CreYSeg.Año = V.Año AND CreYSeg.MesInicial = V.MesInicial AND CreYSeg.MesFinal = V.MesFinal

)AS CREDYSEGU ON EMPLEADOSCENTRO.CodigoCentro = CREDYSEGU.CodigoCentro
WHERE CREDYSEGU.Año IS NOT NULL

```
