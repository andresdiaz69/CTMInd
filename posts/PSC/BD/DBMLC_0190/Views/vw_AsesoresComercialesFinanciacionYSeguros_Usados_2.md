# View: vw_AsesoresComercialesFinanciacionYSeguros_Usados_2

## Usa los objetos:
- [[ComisionesModelosSub]]
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[spiga_Empleados]]
- [[vw_ComisionesSegurosAsesores]]
- [[vw_RangosMaestrasFull]]
- [[vw_RangosVersionesMaxSub]]

```sql


CREATE VIEW [dbo].[vw_AsesoresComercialesFinanciacionYSeguros_Usados_2] AS

SELECT Ano_Periodo, Mes_Periodo, IdEmpresas, CodigoEmpleado, Nombres, IdTerceros, NombreFinanciera, Importe, TOTAL.IdRangoMaestra, TOTAL.IdRangoVersionMax, TOTAL.IdComisionModeloSub, TOTAL.IdComisionModeloSubCriterio
,vw_RangosMaestrasFull.IdRangoVersion,vw_RangosMaestrasFull.ConsecutivoVersion,vw_RangosMaestrasFull.IdRangoDetalle,vw_RangosMaestrasFull.Desde,vw_RangosMaestrasFull.Hasta, vw_RangosMaestrasFull.Valor,
Importe * vw_RangosMaestrasFull.Valor / 100 as ValorComision
, vw_RangosMaestrasFull.CodigoConcepto
FROM 
	(
		SELECT F.Ano_Periodo, F.Mes_Periodo, F.IdEmpresas, E.CodigoEmpleado, E.Nombres, F.IdTerceros, F.NombreFinanciera, F.Importe, E.IdRangoMaestra, E.IdRangoVersionMax, E.IdComisionModeloSub, E.IdComisionModeloSubCriterio
		FROM
		(
			SELECT DISTINCT CodigoEmpleado, Nombres, CodigoEmpresa, IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio
			FROM
			(
				-- CASATORO EMPLEADOS ASOCIADOS AL SUBMODELO 39
				SELECT b.CodigoEmpleado, b.Nombres, B.CodigoEmpresa, A.IdRangoMaestra, A.IdRangoVersionMax, A.IdComisionModeloSub, A.IdComisionModeloSubCriterio
				FROM
				(
					SELECT IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio
					FROM vw_RangosVersionesMaxSub
					WHERE vw_RangosVersionesMaxSub.IdComisionModeloSub = 92 and vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 173
				) AS a,
				(
					SELECT DISTINCT EMPLEADOS.CodigoEmpleado, EMPLEADOS.Nombres, EMPLEADOS.CodigoEmpresa
					FROM
					(
						SELECT Empleados1.CodigoEmpleado,Empleados1.Nombres +' '+Empleados1.Apellido1+' '+Empleados1.Apellido2 AS Nombres, ComisionesModelosSub.CodigoEmpresa
						, vw_RangosVersionesMaxSub.IdRangoMaestra, vw_RangosVersionesMaxSub.IdRangoVersionMax, vw_RangosVersionesMaxSub.IdComisionModeloSub, vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
						FROM EmpleadosRangosMaestras
						INNER JOIN Empleados AS Empleados1  ON EmpleadosRangosMaestras.CodigoEmpleado = Empleados1.CodigoEmpleado
						INNER JOIN vw_RangosVersionesMaxSub ON EmpleadosRangosMaestras.IdRangoMaestra = vw_RangosVersionesMaxSub.IdRangoMaestra
						INNER JOIN ComisionesModelosSub ON vw_RangosVersionesMaxSub.IdComisionModeloSub = ComisionesModelosSub.IdComisionModeloSub
						WHERE (vw_RangosVersionesMaxSub.IdComisionModeloSub = 39) 
					)AS EMPLEADOS
				)AS B

				)as EMPLEADOS
				LEFT JOIN PSCService_DB..spiga_Empleados AS spigaEmpleados ON ISNUMERIC(spigaEmpleados.NifCif) = 1 AND EMPLEADOS.CodigoEmpleado = Convert(bigint,spigaEmpleados.NifCif) 

		)AS E
		LEFT JOIN 
		(
			SELECT Ano_Periodo, Mes_Periodo, IdEmpresas, CedulaVendedor, NombreVendedor, IdTerceros, nombre as NombreFinanciera, SUM(Importe)AS Importe
			FROM vw_ComisionesSegurosAsesores
			GROUP BY Ano_Periodo, Mes_Periodo, IdEmpresas, CedulaVendedor, NombreVendedor, IdTerceros, nombre

	)AS F ON E.CodigoEmpleado = F.CedulaVendedor and E.CodigoEmpresa = F.IdEmpresas
	WHERE (E.IdRangoMaestra = 450 and IdTerceros = 231864) or (E.IdRangoMaestra = 451 and IdTerceros = 19336) OR
	--ESTOS CODIGOS MAESTRAS COSRRESPONDEN AL ID QUE SE CREO EN EL SUB CRITERIO DE SEGUROS, AJUSTAR LOS ID SI ES NECESARIO 
	(E.IdRangoMaestra = 514 and IdTerceros = 17320) or (E.IdRangoMaestra = 515 and IdTerceros = 17280) 


)AS TOTAL
LEFT JOIN vw_RangosMaestrasFull ON TOTAL.IdRangoVersionMax = vw_RangosMaestrasFull.IdRangoVersion
WHERE (vw_RangosMaestrasFull.Desde < TOTAL.Importe) AND (vw_RangosMaestrasFull.Hasta >= TOTAL.Importe) 
AND (Ano_Periodo >= 2022) -- JCS: FILTRO PARA MEJORAR EL PERFORMANCE

```
