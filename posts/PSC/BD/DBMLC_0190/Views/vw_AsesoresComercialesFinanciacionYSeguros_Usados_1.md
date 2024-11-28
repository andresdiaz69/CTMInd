# View: vw_AsesoresComercialesFinanciacionYSeguros_Usados_1

## Usa los objetos:
- [[ComisionesModelosSub]]
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[RangosMaestras]]
- [[spiga_Empleados]]
- [[vw_ComisionesFinanciacionAsesores]]
- [[vw_RangosMaestrasFull]]
- [[vw_RangosVersionesMaxSub]]

```sql




CREATE VIEW [dbo].[vw_AsesoresComercialesFinanciacionYSeguros_Usados_1] AS


SELECT distinct Ano_Periodo, Mes_Periodo, IdEmpresas, IdEmpleados, CodigoEmpleado, Nombres, IdTercerosFinanciera, NombreFinanciera, ImporteFinanciado, Financiacion, TOTAL.IdRangoMaestra, TOTAL.IdRangoVersionMax, TOTAL.IdComisionModeloSub, TOTAL.IdComisionModeloSubCriterio
,vw_RangosMaestrasFull.IdRangoVersion,vw_RangosMaestrasFull.ConsecutivoVersion,vw_RangosMaestrasFull.IdRangoDetalle,vw_RangosMaestrasFull.Desde,vw_RangosMaestrasFull.Hasta, vw_RangosMaestrasFull.Valor,
Financiacion * vw_RangosMaestrasFull.Valor as ValorComision
, vw_RangosMaestrasFull.CodigoConcepto
FROM 
(
	SELECT F.Ano_Periodo, F.Mes_Periodo, F.IdEmpresas, E.CodigoEmpleado, E.IdEmpleados, E.Nombres, F.IdTercerosFinanciera, F.NombreFinanciera, F.ImporteFinanciado, F.Financiacion, E.IdRangoMaestra, E.IdRangoVersionMax, E.IdComisionModeloSub, E.IdComisionModeloSubCriterio
	FROM
	(	
		SELECT Ano_Periodo, Mes_Periodo, IdEmpresas, IdEmpleados, NombreEmpleado, IdTercerosFinanciera, NombreFinanciera, SUM(ImporteFinanciado)AS ImporteFinanciado
		, SUM(ImporteFinanciado) / 1000000 AS Financiacion
		FROM vw_ComisionesFinanciacionAsesores
		GROUP BY Ano_Periodo, Mes_Periodo, IdEmpresas, IdEmpleados, NombreEmpleado, IdTercerosFinanciera, NombreFinanciera
	)AS F
	LEFT JOIN 
	(
		SELECT DISTINCT IdEmpleados, CodigoEmpleado, Nombres, CodigoEmpresa, IdRangoMaestra, NombreMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio,
		SUBSTRING(NombreMaestra, 1, (CHARINDEX('/',NombreMaestra)-1)) AS IdTercerosFinanciera
		FROM
		(
			-- CASATORO EMPLEADOS ASOCIADOS AL SUBMODELO 39
			SELECT b.CodigoEmpleado, b.Nombres, B.CodigoEmpresa, A.IdRangoMaestra, A.IdRangoVersionMax, A.IdComisionModeloSub, A.IdComisionModeloSubCriterio, a.NombreMaestra
			FROM
			(
				SELECT vw_RangosVersionesMaxSub.IdRangoMaestra, vw_RangosVersionesMaxSub.IdRangoVersionMax, vw_RangosVersionesMaxSub.IdComisionModeloSub, vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
				,RangosMaestras.NombreMaestra
				FROM vw_RangosVersionesMaxSub
				LEFT JOIN RangosMaestras ON vw_RangosVersionesMaxSub.IdRangoMaestra = RangosMaestras.IdRangoMaestra
				WHERE vw_RangosVersionesMaxSub.IdComisionModeloSub = 92 and vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 172
			) AS a,
			(
				SELECT DISTINCT EMPLEADOS.CodigoEmpleado, EMPLEADOS.Nombres, EMPLEADOS.CodigoEmpresa
				FROM
				(
					SELECT DISTINCT Empleados1.CodigoEmpleado,Empleados1.Nombres +' '+Empleados1.Apellido1+' '+Empleados1.Apellido2 AS Nombres, ComisionesModelosSub.CodigoEmpresa
					,vw_RangosVersionesMaxSub.IdComisionModeloSub
					FROM EmpleadosRangosMaestras
					INNER JOIN Empleados AS Empleados1  ON EmpleadosRangosMaestras.CodigoEmpleado = Empleados1.CodigoEmpleado
					INNER JOIN vw_RangosVersionesMaxSub ON EmpleadosRangosMaestras.IdRangoMaestra = vw_RangosVersionesMaxSub.IdRangoMaestra
					INNER JOIN ComisionesModelosSub ON vw_RangosVersionesMaxSub.IdComisionModeloSub = ComisionesModelosSub.IdComisionModeloSub
					WHERE (vw_RangosVersionesMaxSub.IdComisionModeloSub = 39) 
				)AS EMPLEADOS
			)AS B

		)as EMPLEADOS
		LEFT JOIN PSCService_DB..spiga_Empleados AS spigaEmpleados ON ISNUMERIC(spigaEmpleados.NifCif) = 1 AND EMPLEADOS.CodigoEmpleado = Convert(bigint,spigaEmpleados.NifCif) 
		where IdEmpleados is not null 
		--and NifCif not in ('USER1', 'DIGITAL', 'COMEXML1', 'COMEXML2', 'COMEXML3', 'COMEXML4', 'COMEXML5', 'COMEXML6', 'COMEXML7', 'COMEXML8', 'COMEXML9') -- JCS: PARA EVITAR EL ERROR EN LA VISTA

	)AS E ON F.IdEmpleados = E.IdEmpleados AND F.IdEmpresas = E.CodigoEmpresa AND F.IdTercerosFinanciera = E.IdTercerosFinanciera
	
)AS TOTAL
LEFT JOIN vw_RangosMaestrasFull ON TOTAL.IdRangoVersionMax = vw_RangosMaestrasFull.IdRangoVersion
WHERE 

TOTAL.IdRangoMaestra IS NOT NULL 
-- JCS - 2022/09/21: DEBIDO AL PERFORMANCE AHORA SÓLO SE UTILIZA ESTE FILTRO, 
-- LO DEMÁS SE DESCARTA EN LA VISTA DE LIQUIDACIÓN PQ SI SE HACE A ESTE NIVEL LA VISTA SE DEGRADA

--(vw_RangosMaestrasFull.Desde < TOTAL.Financiacion) AND (vw_RangosMaestrasFull.Hasta >= TOTAL.Financiacion)
--AND 
--(Ano_Periodo >= 2022) -- JCS: FILTRO PARA MEJORAR EL PERFORMANCE


```
