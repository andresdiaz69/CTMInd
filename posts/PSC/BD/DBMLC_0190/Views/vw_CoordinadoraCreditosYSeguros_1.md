# View: vw_CoordinadoraCreditosYSeguros_1

## Usa los objetos:
- [[ComisionesModelosSub]]
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[EmpresasCentros]]
- [[ExogenasEmpleadosEmpresasPago]]
- [[vw_AsesoresCreditosSeguros_Creditos]]
- [[vw_AsesoresCreditosSeguros_VentasNetas]]
- [[vw_RangosMaestrasFull]]
- [[vw_RangosVersionesMaxSub]]

```sql
CREATE VIEW [dbo].[vw_CoordinadoraCreditosYSeguros_1] AS

SELECT EMPLEADOSEMPRESAS.IdRangoMaestra, EMPLEADOSEMPRESAS.IdRangoVersionMax, EMPLEADOSEMPRESAS.IdComisionModeloSub, EMPLEADOSEMPRESAS.IdComisionModeloSubCriterio, EMPLEADOSEMPRESAS.CodigoEmpresa, EMPLEADOSEMPRESAS.CodigoEmpleado, EMPLEADOSEMPRESAS.Nombres
,CREDITOS.Año, CREDITOS.MesInicial, CREDITOS.MesFinal, CREDITOS.ValorCreditos, CREDITOS.ValorVentasNetas, CREDITOS.PorcentajeCreditos
,vw_RangosMaestrasFull.IdRangoVersion,vw_RangosMaestrasFull.ConsecutivoVersion,vw_RangosMaestrasFull.IdRangoDetalle,vw_RangosMaestrasFull.Desde,vw_RangosMaestrasFull.Hasta, vw_RangosMaestrasFull.Valor as ValorComision, vw_RangosMaestrasFull.CodigoConcepto
FROM
(
	SELECT EMPLEADOS.CodigoEmpleado, EMPLEADOS.Nombres, EMPLEADOS.IdRangoMaestra, EMPLEADOS.IdRangoVersionMax, EMPLEADOS.IdComisionModeloSub, EMPLEADOS.IdComisionModeloSubCriterio, EMPRESAS.CodigoEmpresa
	FROM 
	(
		SELECT Empleados1.CodigoEmpleado,Empleados1.Nombres +' '+Empleados1.Apellido1+' '+Empleados1.Apellido2 AS Nombres, vw_RangosVersionesMaxSub.IdRangoMaestra, vw_RangosVersionesMaxSub.IdRangoVersionMax, vw_RangosVersionesMaxSub.IdComisionModeloSub, vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio, '1'CodigoEmpresa
		FROM EmpleadosRangosMaestras
		INNER JOIN Empleados AS Empleados1  ON EmpleadosRangosMaestras.CodigoEmpleado = Empleados1.CodigoEmpleado
		INNER JOIN vw_RangosVersionesMaxSub ON EmpleadosRangosMaestras.IdRangoMaestra = vw_RangosVersionesMaxSub.IdRangoMaestra
		LEFT JOIN ComisionesModelosSub ON vw_RangosVersionesMaxSub.IdComisionModeloSub = ComisionesModelosSub.IdComisionModeloSub
		WHERE (vw_RangosVersionesMaxSub.IdComisionModeloSub = 70) AND (vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 131)
	)AS EMPLEADOS
	LEFT JOIN 
	(	SELECT        CodigoEmpleado, CodigoEmpresa, Comentarios, UserIdCreo, FechaCreacion, UserIdModifico, FechaModificacion
			FROM            dbo.ExogenasEmpleadosEmpresasPago
	) AS EMPRESAS ON EMPLEADOS.CodigoEmpleado = EMPRESAS.CodigoEmpleado 
		
	--ESTE CRITERIO SOLO SE USA PARA LA EMPRESA CASATORO
	WHERE (EMPRESAS.CodigoEmpresa IS NOT NULL) AND EMPRESAS.CodigoEmpresa = 1

)AS EMPLEADOSEMPRESAS
LEFT JOIN 
(
	SELECT Año, MesInicial, MesFinal, CodigoEmpresa, SUM(ValorCreditos)AS ValorCreditos, SUM(ValorVentasNetas)AS ValorVentasNetas
	,CASE WHEN SUM(ValorVentasNetas) <> 0 THEN SUM(ValorCreditos) / SUM(ValorVentasNetas) * 100 ELSE 0 END AS PorcentajeCreditos
	FROM
	(
		SELECT CRE.Año, CRE.MesInicial, CRE.MesFinal, CRE.CodigoCentro, CRE.Valor AS ValorCreditos, SEG.Valor AS ValorVentasNetas, EC.CodigoEmpresa
		FROM vw_AsesoresCreditosSeguros_Creditos AS CRE
		LEFT JOIN vw_AsesoresCreditosSeguros_VentasNetas AS SEG ON CRE.Año = SEG.Año AND CRE.MesInicial = SEG.MesInicial AND CRE.MesFinal = SEG.MesFinal AND CRE.CodigoCentro = SEG.CodigoCentro
		LEFT JOIN EmpresasCentros AS EC ON CRE.CodigoCentro = EC.CodigoCentro
	)AS CRED
	WHERE MesInicial = MesFinal
	GROUP BY Año, MesInicial, MesFinal, CodigoEmpresa
)AS CREDITOS ON EMPLEADOSEMPRESAS.CodigoEmpresa = CREDITOS.CodigoEmpresa
LEFT JOIN vw_RangosMaestrasFull ON EMPLEADOSEMPRESAS.IdRangoVersionMax = vw_RangosMaestrasFull.IdRangoVersion
WHERE (vw_RangosMaestrasFull.Desde < CREDITOS.PorcentajeCreditos) AND (vw_RangosMaestrasFull.Hasta >= CREDITOS.PorcentajeCreditos)

```
