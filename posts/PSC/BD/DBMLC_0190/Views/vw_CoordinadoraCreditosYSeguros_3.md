# View: vw_CoordinadoraCreditosYSeguros_3

## Usa los objetos:
- [[ComisionesModelosSub]]
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[EmpresasCentros]]
- [[ExogenasEmpleadosEmpresasPago]]
- [[vw_AsesoresCreditosSeguros_Seguros]]
- [[vw_RangosMaestrasFull]]
- [[vw_RangosVersionesMaxSub]]

```sql
CREATE VIEW [dbo].[vw_CoordinadoraCreditosYSeguros_3] AS 

SELECT  TOTAL.IdRangoMaestra, TOTAL.IdRangoVersionMax, TOTAL.IdComisionModeloSub, TOTAL.IdComisionModeloSubCriterio, TOTAL.CodigoEmpleado, TOTAL.Nombres
,TOTAL.Año, TOTAL.MesInicial, TOTAL.MesFinal, TOTAL.SegCasaToro, TOTAL.SegMotorysa ,TOTAL.ValorSegurosTotal
,vw_RangosMaestrasFull.IdRangoVersion,vw_RangosMaestrasFull.ConsecutivoVersion,vw_RangosMaestrasFull.IdRangoDetalle,vw_RangosMaestrasFull.Desde,vw_RangosMaestrasFull.Hasta, vw_RangosMaestrasFull.Valor as ValorComision, vw_RangosMaestrasFull.CodigoConcepto
FROM 
(
	SELECT IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio, CodigoEmpleado, Nombres, Año, MesInicial, MesFinal, [1] AS SegCasaToro, [6] AS SegMotorysa, [1] + [6] AS ValorSegurosTotal
FROM
(
	SELECT EMPLEADOSEMPRESAS.IdRangoMaestra, EMPLEADOSEMPRESAS.IdRangoVersionMax, EMPLEADOSEMPRESAS.IdComisionModeloSub, EMPLEADOSEMPRESAS.IdComisionModeloSubCriterio, EMPLEADOSEMPRESAS.CodigoEmpleado, EMPLEADOSEMPRESAS.Nombres
	,SEGUROS.Año, SEGUROS.MesInicial, SEGUROS.MesFinal, SEGUROS.CodigoEmpresa,SEGUROS.ValorSeguros
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
			WHERE (vw_RangosVersionesMaxSub.IdComisionModeloSub = 70) AND (vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 133)
		)AS EMPLEADOS
		LEFT JOIN 
		(	SELECT        CodigoEmpleado, CodigoEmpresa, Comentarios, UserIdCreo, FechaCreacion, UserIdModifico, FechaModificacion
				FROM            dbo.ExogenasEmpleadosEmpresasPago
		) AS EMPRESAS ON EMPLEADOS.CodigoEmpleado = EMPRESAS.CodigoEmpleado 
		
		WHERE (EMPRESAS.CodigoEmpresa IS NOT NULL) 

	)AS EMPLEADOSEMPRESAS
	LEFT JOIN 
	(
		SELECT SEG.Año, SEG.MesInicial, SEG.MesFinal, SEG.CodigoCentro, SEG.Valor AS ValorSeguros, EC.CodigoEmpresa
		FROM vw_AsesoresCreditosSeguros_Seguros AS SEG
		LEFT JOIN EmpresasCentros AS EC ON SEG.CodigoCentro = EC.CodigoCentro
		WHERE MesInicial = MesFinal 

	)AS SEGUROS ON EMPLEADOSEMPRESAS.CodigoEmpresa = SEGUROS.CodigoEmpresa
)AS T
PIVOT (SUM(ValorSeguros) FOR CodigoEmpresa IN ([1],[6]))AS PVT
)AS TOTAL
LEFT JOIN vw_RangosMaestrasFull ON TOTAL.IdRangoVersionMax = vw_RangosMaestrasFull.IdRangoVersion
WHERE (vw_RangosMaestrasFull.Desde < TOTAL.ValorSegurosTotal) AND (vw_RangosMaestrasFull.Hasta >= TOTAL.ValorSegurosTotal)

```
