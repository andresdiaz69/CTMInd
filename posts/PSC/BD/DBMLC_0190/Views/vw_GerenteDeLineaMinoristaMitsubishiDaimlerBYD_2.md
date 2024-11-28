# View: vw_GerenteDeLineaMinoristaMitsubishiDaimlerBYD_2

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[vw_GerentesDeLineaCT_22]]
- [[vw_GerentesDeLineaCT_22]]
- [[vw_RangosMaestrasFull]]
- [[vw_RangosVersionesMaxSub]]

```sql


CREATE VIEW [dbo].[vw_GerenteDeLineaMinoristaMitsubishiDaimlerBYD_2] AS 

SELECT        
EFICIENCIA_ADMINISTRATIVA.Ano_Periodo, EFICIENCIA_ADMINISTRATIVA.Mes_Periodo, EFICIENCIA_ADMINISTRATIVA.CodigoEmpleado, EFICIENCIA_ADMINISTRATIVA.IdRangoMaestra, 
EFICIENCIA_ADMINISTRATIVA.IdRangoVersionMax, EFICIENCIA_ADMINISTRATIVA.EficienciaAdministrativa, 
dbo.vw_RangosMaestrasFull.IdComisionModeloSub, dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio, dbo.vw_RangosMaestrasFull.CodigoMarcaGrupo, dbo.vw_RangosMaestrasFull.MarcaGrupo, 
dbo.vw_RangosMaestrasFull.IdRangoVersion, dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, 
dbo.vw_RangosMaestrasFull.Valor AS Comision_EficienciaAdministrativa, vw_RangosMaestrasFull.CodigoConcepto

FROM            
(
	SELECT        dbo.vw_GerentesDeLineaCT_22.Ano_Periodo, dbo.vw_GerentesDeLineaCT_22.Mes_Periodo, dbo.vw_GerentesDeLineaCT_22.CodigoEmpleado,
	EMPLEADO.IdRangoMaestra, EMPLEADO.IdRangoVersionMax, EMPLEADO.IdComisionModeloSub, EMPLEADO.IdComisionModeloSubCriterio
	, SUM(dbo.vw_GerentesDeLineaCT_22.EficienciaAdministrativa)/ (SELECT COUNT(T.CodigoMarca) FROM (SELECT DISTINCT CodigoMarca FROM vw_GerentesDeLineaCT_22 WHERE CodigoEmpleado = dbo.vw_GerentesDeLineaCT_22.CodigoEmpleado)AS T )
	AS EficienciaAdministrativa
	, (SELECT COUNT(T.CodigoMarca) FROM (SELECT DISTINCT CodigoMarca FROM vw_GerentesDeLineaCT_22 WHERE CodigoEmpleado = dbo.vw_GerentesDeLineaCT_22.CodigoEmpleado)AS T )as Marcas
	FROM            
	(			  
		SELECT        dbo.Empleados.CodigoEmpleado, dbo.vw_RangosVersionesMaxSub.IdRangoMaestra, dbo.vw_RangosVersionesMaxSub.IdRangoVersionMax, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub, 
		dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
		FROM            dbo.EmpleadosRangosMaestras 
		INNER JOIN dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado 
		INNER JOIN dbo.vw_RangosVersionesMaxSub ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMaxSub.IdRangoMaestra
		WHERE        (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub = 83) AND (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 160)

	) AS EMPLEADO 
	LEFT OUTER JOIN dbo.vw_GerentesDeLineaCT_22 ON EMPLEADO.CodigoEmpleado = dbo.vw_GerentesDeLineaCT_22.CodigoEmpleado
	GROUP BY dbo.vw_GerentesDeLineaCT_22.Ano_Periodo, dbo.vw_GerentesDeLineaCT_22.Mes_Periodo, dbo.vw_GerentesDeLineaCT_22.CodigoEmpleado,EMPLEADO.IdRangoMaestra, EMPLEADO.IdRangoVersionMax, EMPLEADO.IdComisionModeloSub, EMPLEADO.IdComisionModeloSubCriterio

) AS EFICIENCIA_ADMINISTRATIVA 
LEFT OUTER JOIN dbo.vw_RangosMaestrasFull ON EFICIENCIA_ADMINISTRATIVA.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion

WHERE (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 83) AND (dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio = 160) AND 
(dbo.vw_RangosMaestrasFull.Desde < EFICIENCIA_ADMINISTRATIVA.EficienciaAdministrativa) AND (dbo.vw_RangosMaestrasFull.Hasta >= EFICIENCIA_ADMINISTRATIVA.EficienciaAdministrativa)


```
