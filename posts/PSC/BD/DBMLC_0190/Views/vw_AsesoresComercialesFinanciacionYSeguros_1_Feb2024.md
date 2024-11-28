# View: vw_AsesoresComercialesFinanciacionYSeguros_1_Feb2024

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
CREATE VIEW [dbo].[vw_AsesoresComercialesFinanciacionYSeguros_1_Feb2024] AS


SELECT distinct Ano_Periodo, Mes_Periodo, IdEmpresas, IdEmpleados, CodigoEmpleado, Nombres, 
nombre_marca, cod_marca, -- JCS: 2023/08/03 - NECESARIO PARA HACER UN AJUSTE POR MARCA
IdTercerosFinanciera, NombreFinanciera, ImporteFinanciado, Financiacion, TOTAL.IdRangoMaestra, TOTAL.IdRangoVersionMax, TOTAL.IdComisionModeloSub, TOTAL.IdComisionModeloSubCriterio
,vw_RangosMaestrasFull.IdRangoVersion,vw_RangosMaestrasFull.ConsecutivoVersion,vw_RangosMaestrasFull.IdRangoDetalle,vw_RangosMaestrasFull.Desde,vw_RangosMaestrasFull.Hasta, 

-- JCS: 2023/08/03 - NECESARIO PARA EL CASO ESPECIAL FZ/VW
CASE 
WHEN TOTAL.IdRangoMaestra = 372 AND cod_marca = 2 AND TOTAL.IdComisionModeloSubCriterio = 143 THEN 7200
ELSE vw_RangosMaestrasFull.Valor
END AS Valor,

-- JCS: 2023/08/03 - NECESARIO PARA EL CASO ESPECIAL FZ/VW
CASE 
WHEN TOTAL.IdRangoMaestra = 372 AND cod_marca = 2 AND TOTAL.IdComisionModeloSubCriterio = 143 THEN Financiacion * 7200
ELSE Financiacion * vw_RangosMaestrasFull.Valor
END AS ValorComision,

vw_RangosMaestrasFull.CodigoConcepto

FROM 
(
	SELECT F.Ano_Periodo, F.Mes_Periodo, F.IdEmpresas, E.CodigoEmpleado, E.IdEmpleados, E.Nombres, 
	E.nombre_marca, E.cod_marca, -- JCS: 2023/08/03 - NECESARIO PARA HACER UN AJUSTE POR MARCA
	F.IdTercerosFinanciera, F.NombreFinanciera, F.ImporteFinanciado, F.Financiacion, E.IdRangoMaestra, E.IdRangoVersionMax, E.IdComisionModeloSub, E.IdComisionModeloSubCriterio
	FROM
	(	
		SELECT Ano_Periodo, Mes_Periodo, IdEmpresas, IdEmpleados, MAX(NombreEmpleado) AS NombreEmpleado, IdTercerosFinanciera, MAX(NombreFinanciera) AS NombreFinanciera, SUM(ImporteFinanciado)AS ImporteFinanciado
		, SUM(ImporteFinanciado) / 1000000 AS Financiacion
		FROM vw_ComisionesFinanciacionAsesores
		--GROUP BY Ano_Periodo, Mes_Periodo, IdEmpresas, IdEmpleados, NombreEmpleado, IdTercerosFinanciera, NombreFinanciera
		GROUP BY Ano_Periodo, Mes_Periodo, IdEmpresas, IdEmpleados, IdTercerosFinanciera
	)AS F
	LEFT JOIN 
	(
		SELECT DISTINCT IdEmpleados, CodigoEmpleado, Nombres, CodigoEmpresa, 
		nombre_marca, cod_marca, -- JCS: 2023/08/03 - NECESARIO PARA HACER UN AJUSTE POR MARCA
		IdRangoMaestra, NombreMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio,
		SUBSTRING(NombreMaestra, 1, (CHARINDEX('/',NombreMaestra)-1)) AS IdTercerosFinanciera
		FROM
		(
			-- CASATORO
			SELECT b.CodigoEmpleado, b.Nombres, B.CodigoEmpresa, 
			B.nombre_marca, B.cod_marca, -- JCS: 2023/08/03 - NECESARIO PARA HACER UN AJUSTE POR MARCA
			A.IdRangoMaestra, A.IdRangoVersionMax, A.IdComisionModeloSub, A.IdComisionModeloSubCriterio, a.NombreMaestra
			FROM
			(
				SELECT vw_RangosVersionesMaxSub.IdRangoMaestra, vw_RangosVersionesMaxSub.IdRangoVersionMax, vw_RangosVersionesMaxSub.IdComisionModeloSub, vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
				,RangosMaestras.NombreMaestra
				FROM vw_RangosVersionesMaxSub
				LEFT JOIN RangosMaestras ON vw_RangosVersionesMaxSub.IdRangoMaestra = RangosMaestras.IdRangoMaestra
				WHERE vw_RangosVersionesMaxSub.IdComisionModeloSub = 76 and vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 143
			) AS a,
			(
				SELECT DISTINCT EMPLEADOS.CodigoEmpleado, EMPLEADOS.Nombres, EMPLEADOS.CodigoEmpresa
				, EMPLEADOS.nombre_marca, EMPLEADOS.cod_marca -- JCS: 2023/08/03 - NECESARIO PARA HACER UN AJUSTE POR MARCA
				FROM
				(
					SELECT Empleados1.CodigoEmpleado,Empleados1.Nombres +' '+Empleados1.Apellido1+' '+Empleados1.Apellido2 AS Nombres, ComisionesModelosSub.CodigoEmpresa
					, nombre_marca, cod_marca -- JCS: 2023/08/03 - NECESARIO PARA HACER UN AJUSTE POR MARCA
					, vw_RangosVersionesMaxSub.IdRangoMaestra, vw_RangosVersionesMaxSub.IdRangoVersionMax, vw_RangosVersionesMaxSub.IdComisionModeloSub, vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
					FROM EmpleadosRangosMaestras
					INNER JOIN Empleados AS Empleados1  ON EmpleadosRangosMaestras.CodigoEmpleado = Empleados1.CodigoEmpleado
					INNER JOIN vw_RangosVersionesMaxSub ON EmpleadosRangosMaestras.IdRangoMaestra = vw_RangosVersionesMaxSub.IdRangoMaestra
					INNER JOIN ComisionesModelosSub ON vw_RangosVersionesMaxSub.IdComisionModeloSub = ComisionesModelosSub.IdComisionModeloSub
					WHERE (vw_RangosVersionesMaxSub.IdComisionModeloSub = 95) AND (vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 178)
				)AS EMPLEADOS
			)AS B

			UNION ALL

			--MOTORYSA
			SELECT b.CodigoEmpleado, b.Nombres, B.CodigoEmpresa, 
			B.nombre_marca, B.cod_marca, -- JCS: 2023/08/03 - NECESARIO PARA HACER UN AJUSTE POR MARCA
			A.IdRangoMaestra, A.IdRangoVersionMax, A.IdComisionModeloSub, A.IdComisionModeloSubCriterio, A.NombreMaestra
			FROM
			(
				SELECT vw_RangosVersionesMaxSub.IdRangoMaestra, vw_RangosVersionesMaxSub.IdRangoVersionMax, vw_RangosVersionesMaxSub.IdComisionModeloSub, vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio,
				RangosMaestras.NombreMaestra
				FROM vw_RangosVersionesMaxSub
				LEFT JOIN RangosMaestras ON vw_RangosVersionesMaxSub.IdRangoMaestra = RangosMaestras.IdRangoMaestra
				WHERE vw_RangosVersionesMaxSub.IdComisionModeloSub = 77 and vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 145
			)AS A,
			(
				SELECT DISTINCT EMPLEADOS.CodigoEmpleado, EMPLEADOS.Nombres, EMPLEADOS.CodigoEmpresa
				, EMPLEADOS.nombre_marca, EMPLEADOS.cod_marca -- JCS: 2023/08/03 - NECESARIO PARA HACER UN AJUSTE POR MARCA
				FROM
				(
					SELECT Empleados1.CodigoEmpleado,Empleados1.Nombres +' '+Empleados1.Apellido1+' '+Empleados1.Apellido2 AS Nombres, ComisionesModelosSub.CodigoEmpresa					
					, nombre_marca, cod_marca -- JCS: 2023/08/03 - NECESARIO PARA HACER UN AJUSTE POR MARCA
					, vw_RangosVersionesMaxSub.IdRangoMaestra, vw_RangosVersionesMaxSub.IdRangoVersionMax, vw_RangosVersionesMaxSub.IdComisionModeloSub, vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
					FROM EmpleadosRangosMaestras
					INNER JOIN Empleados AS Empleados1  ON EmpleadosRangosMaestras.CodigoEmpleado = Empleados1.CodigoEmpleado
					INNER JOIN vw_RangosVersionesMaxSub ON EmpleadosRangosMaestras.IdRangoMaestra = vw_RangosVersionesMaxSub.IdRangoMaestra
					INNER JOIN ComisionesModelosSub ON vw_RangosVersionesMaxSub.IdComisionModeloSub = ComisionesModelosSub.IdComisionModeloSub
					WHERE (vw_RangosVersionesMaxSub.IdComisionModeloSub = 96) AND (vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 180)
				)AS EMPLEADOS
			)AS B
		)as EMPLEADOS
		LEFT JOIN PSCService_DB..spiga_Empleados AS spigaEmpleados ON ISNUMERIC(spigaEmpleados.NifCif) = 1 AND EMPLEADOS.CodigoEmpleado = Convert(bigint,spigaEmpleados.NifCif) 
		where IdEmpleados is not null 
		--LEFT JOIN PSCService_DB..spiga_Empleados AS spigaEmpleados ON spigaEmpleados.NifCif <> 'USER1' and NifCif  <> 'DIGITAL' and EMPLEADOS.CodigoEmpleado = Convert(bigint,spigaEmpleados.NifCif) 
		--where IdEmpleados is not null and NifCif not in ('USER1', 'DIGITAL', 'COMEXML1', 'COMEXML2', 'COMEXML3', 'COMEXML4', 'COMEXML5', 'COMEXML6', 'COMEXML7', 'COMEXML8', 'COMEXML9') -- JCS: PARA EVITAR EL ERROR EN LA VISTA
	)AS E ON F.IdEmpleados = E.IdEmpleados AND F.IdEmpresas = E.CodigoEmpresa AND F.IdTercerosFinanciera = E.IdTercerosFinanciera
	
)AS TOTAL
LEFT JOIN vw_RangosMaestrasFull ON TOTAL.IdRangoVersionMax = vw_RangosMaestrasFull.IdRangoVersion
WHERE (vw_RangosMaestrasFull.Desde < TOTAL.Financiacion) AND (vw_RangosMaestrasFull.Hasta >= TOTAL.Financiacion)
AND (Ano_Periodo >= 2022) -- JCS: FILTRO PARA MEJORAR EL PERFORMANCE
--and total.Codigoempleado= '7699659' 

```
