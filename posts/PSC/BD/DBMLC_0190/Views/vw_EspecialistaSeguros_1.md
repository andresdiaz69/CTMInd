# View: vw_EspecialistaSeguros_1

## Usa los objetos:
- [[ComisionesModelosSub]]
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[EmpresasCentros]]
- [[ExogenasEmpleadosCentrosPago]]
- [[ExogenasEmpleadosEmpresasPago]]
- [[vw_AsesoresCreditosSeguros_Seguros]]
- [[vw_RangosVersionesMaxSub]]

```sql
CREATE VIEW [dbo].[vw_EspecialistaSeguros_1] AS 
SELECT EMPLEADOSCENTRO.IdRangoMaestra, EMPLEADOSCENTRO.IdRangoVersionMax, EMPLEADOSCENTRO.IdComisionModeloSub, EMPLEADOSCENTRO.IdComisionModeloSubCriterio, EMPLEADOSCENTRO.CodigoEmpresa, EMPLEADOSCENTRO.CodigoEmpleado, EMPLEADOSCENTRO.Nombres
, COMISIONSEGUROS.Año, COMISIONSEGUROS.MesInicial, COMISIONSEGUROS.MesFinal, EMPLEADOSCENTRO.CodigoCentro,COMISIONSEGUROS.NombreCentro, COMISIONSEGUROS.ValorSeguros
FROM 
(
	SELECT EMPLEADOSEMPRESAS.CodigoEmpleado, EMPLEADOSEMPRESAS.Nombres, EMPLEADOSEMPRESAS.IdRangoMaestra, EMPLEADOSEMPRESAS.IdRangoVersionMax, EMPLEADOSEMPRESAS.IdComisionModeloSub, EMPLEADOSEMPRESAS.IdComisionModeloSubCriterio, EMPLEADOSEMPRESAS.CodigoEmpresa, EMPLEADOSEMPRESAS.CodigoCentro
	FROM
	(
		SELECT EMPLEADOS.CodigoEmpleado, EMPLEADOS.Nombres, EMPLEADOS.IdRangoMaestra, EMPLEADOS.IdRangoVersionMax, EMPLEADOS.IdComisionModeloSub, EMPLEADOS.IdComisionModeloSubCriterio, EMPRESAS.CodigoEmpresa
		,EmpresasCentros.CodigoCentro
		FROM 
		(
			--CASATORO
			SELECT Empleados1.CodigoEmpleado,Empleados1.Nombres +' '+Empleados1.Apellido1+' '+Empleados1.Apellido2 AS Nombres, vw_RangosVersionesMaxSub.IdRangoMaestra, vw_RangosVersionesMaxSub.IdRangoVersionMax, vw_RangosVersionesMaxSub.IdComisionModeloSub, vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio, '1'CodigoEmpresa
			FROM EmpleadosRangosMaestras
			INNER JOIN Empleados AS Empleados1  ON EmpleadosRangosMaestras.CodigoEmpleado = Empleados1.CodigoEmpleado
			INNER JOIN vw_RangosVersionesMaxSub ON EmpleadosRangosMaestras.IdRangoMaestra = vw_RangosVersionesMaxSub.IdRangoMaestra
			LEFT JOIN ComisionesModelosSub ON vw_RangosVersionesMaxSub.IdComisionModeloSub = ComisionesModelosSub.IdComisionModeloSub
			WHERE (vw_RangosVersionesMaxSub.IdComisionModeloSub = 68) AND (vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 126)

			union all 
			
			--MOTORYSA
			SELECT Empleados1.CodigoEmpleado,Empleados1.Nombres +' '+Empleados1.Apellido1+' '+Empleados1.Apellido2 AS Nombres, vw_RangosVersionesMaxSub.IdRangoMaestra, vw_RangosVersionesMaxSub.IdRangoVersionMax, vw_RangosVersionesMaxSub.IdComisionModeloSub, vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio, '6'CodigoEmpresa
			FROM EmpleadosRangosMaestras
			INNER JOIN Empleados AS Empleados1  ON EmpleadosRangosMaestras.CodigoEmpleado = Empleados1.CodigoEmpleado
			INNER JOIN vw_RangosVersionesMaxSub ON EmpleadosRangosMaestras.IdRangoMaestra = vw_RangosVersionesMaxSub.IdRangoMaestra
			LEFT JOIN ComisionesModelosSub ON vw_RangosVersionesMaxSub.IdComisionModeloSub = ComisionesModelosSub.IdComisionModeloSub
			WHERE (vw_RangosVersionesMaxSub.IdComisionModeloSub = 68) AND (vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 127)

		)AS EMPLEADOS
		LEFT JOIN 
		(	SELECT        CodigoEmpleado, CodigoEmpresa, Comentarios, UserIdCreo, FechaCreacion, UserIdModifico, FechaModificacion
			FROM            dbo.ExogenasEmpleadosEmpresasPago
		) AS EMPRESAS ON EMPLEADOS.CodigoEmpleado = EMPRESAS.CodigoEmpleado AND EMPLEADOS.CodigoEmpresa = EMPRESAS.CodigoEmpresa
		
		LEFT JOIN EmpresasCentros ON EMPRESAS.CodigoEmpresa = EmpresasCentros.CodigoEmpresa
		WHERE (EMPRESAS.CodigoEmpresa IS NOT NULL)

	)AS EMPLEADOSEMPRESAS

	LEFT OUTER JOIN 
	(	SELECT        CodigoEmpleado, CodigoCentro, Comentarios, UserIdCreo, FechaCreacion, UserIdModifico, FechaModificacion
		FROM            dbo.ExogenasEmpleadosCentrosPago
	) AS CENTROS ON EMPLEADOSEMPRESAS.CodigoEmpleado = CENTROS.CodigoEmpleado AND EMPLEADOSEMPRESAS.CodigoCentro = CENTROS.CodigoCentro
	WHERE (CENTROS.CodigoCentro IS NOT NULL)

)AS EMPLEADOSCENTRO
LEFT JOIN 
(
	SELECT SEGUROS.Año, SEGUROS.MesInicial, SEGUROS.MesFinal, SEGUROS.CodigoCentro, SEGUROS.NombreCentro, SEGUROS.Valor AS ValorSeguros
	FROM vw_AsesoresCreditosSeguros_Seguros AS SEGUROS
) AS COMISIONSEGUROS
ON EMPLEADOSCENTRO.CodigoCentro = COMISIONSEGUROS.CodigoCentro


```
