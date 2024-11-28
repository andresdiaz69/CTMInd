# View: vw_JefeDeVentasBogotaBYD_1

## Usa los objetos:
- [[ComisionesSpigaVN]]
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[ExogenasEmpleadosCentrosPago]]
- [[PresupuestoBYD]]
- [[RangosMaestras]]
- [[vw_RangosVersionesMaxSub]]
- [[vw_VariablesVersiones]]

```sql




CREATE VIEW [dbo].[vw_JefeDeVentasBogotaBYD_1] AS

SELECT E_C.CodigoEmpleado, E_C.Nombres, E_C.IdRangoMaestra, E_C.IdRangoVersionMax, E_C.IdComisionModeloSub, E_C.IdComisionModeloSubCriterio, C.Ano_Periodo, C.Mes_Periodo, C.CodigoEmpresa, SUM(C.CantidadPresupuestada)AS CantidadPresupuestada, SUM(C.UnidadesEntregadas)AS UnidadesEntregadas, C.ValorVariable,

CASE WHEN 
(CASE WHEN SUM(C.CantidadPresupuestada) <> 0 THEN CONVERT (decimal(18,0),C.ValorVariable / SUM(C.CantidadPresupuestada) * SUM(C.UnidadesEntregadas)) ELSE 0 END) 
< C.ValorVariable THEN (CASE WHEN SUM(C.CantidadPresupuestada) <> 0 THEN CONVERT (decimal(18,0),C.ValorVariable / SUM(C.CantidadPresupuestada) * SUM(C.UnidadesEntregadas)) ELSE 0 END)  ELSE C.ValorVariable END AS Comision
,E_C.CodigoConcepto

FROM
(
	SELECT EMPLEADOS.CodigoEmpleado, EMPLEADOS.Nombres, EMPLEADOS.IdRangoMaestra, EMPLEADOS.IdRangoVersionMax, EMPLEADOS.IdComisionModeloSub, EMPLEADOS.IdComisionModeloSubCriterio, EMPLEADOS.CodigoConcepto, CENTROS.CodigoCentro
	FROM 
	(
		SELECT Empleados1.CodigoEmpleado,Empleados1.Nombres +' '+Empleados1.Apellido1+' '+Empleados1.Apellido2 AS Nombres, vw_RangosVersionesMaxSub.IdRangoMaestra, vw_RangosVersionesMaxSub.IdRangoVersionMax, vw_RangosVersionesMaxSub.IdComisionModeloSub
		,vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio, RangosMaestras.CodigoConcepto
		FROM EmpleadosRangosMaestras
		INNER JOIN Empleados AS Empleados1  ON EmpleadosRangosMaestras.CodigoEmpleado = Empleados1.CodigoEmpleado
		INNER JOIN vw_RangosVersionesMaxSub ON EmpleadosRangosMaestras.IdRangoMaestra = vw_RangosVersionesMaxSub.IdRangoMaestra
		LEFT JOIN RangosMaestras ON EmpleadosRangosMaestras.IdRangoMaestra = RangosMaestras.IdRangoMaestra
		WHERE (vw_RangosVersionesMaxSub.IdComisionModeloSub = 78) AND (vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 149)

	)AS EMPLEADOS
	LEFT JOIN 
	(	SELECT        CodigoEmpleado, CodigoCentro, Comentarios, UserIdCreo, FechaCreacion, UserIdModifico, FechaModificacion
		FROM            dbo.ExogenasEmpleadosCentrosPago
	) AS CENTROS ON EMPLEADOS.CodigoEmpleado = CENTROS.CodigoEmpleado
	WHERE (CENTROS.CodigoCentro IS NOT NULL)
)AS E_C
LEFT JOIN 
(
	SELECT  Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoCentro, CantidadPresupuestada, UnidadesEntregadas, ValorVariable
	FROM            
	(
		SELECT ISNULL(P.Ano, E.Ano_Periodo)AS Ano_Periodo, ISNULL(P.Mes, E.Mes_Periodo) AS Mes_Periodo, ISNULL(P.CodigoEmpresa, E.Codigoempresa) AS CodigoEmpresa, ISNULL(P.CodigoCentro, E.CodigoCentro) AS CodigoCentro, ISNULL(P.Cantidad,0) AS CantidadPresupuestada, ISNULL(E.Entregas, 0) AS UnidadesEntregadas
		FROM PresupuestoBYD AS P

		FULL JOIN 
		(
			SELECT E.Ano_Periodo, E.Mes_Periodo, E.Codigoempresa, E.CodigoCentro, SUM(E.EntregaEfectiva) AS Entregas  
			FROM ComisionesSpigaVN AS E
			WHERE E.EntregaEfectiva = 1
			GROUP BY E.Ano_Periodo, E.Mes_Periodo, E.Codigoempresa, E.CodigoCentro
		)AS E ON P.Ano = E.Ano_Periodo AND P.Mes = E.Mes_Periodo AND P.CodigoEmpresa = E.Codigoempresa AND P.CodigoCentro = E.CodigoCentro 

	) AS Totalizacion 
	
	CROSS JOIN
	(
		SELECT        IdVariable, IdVariableVersion, ValorVariable, ConsecutivoVariable
		FROM            dbo.vw_VariablesVersiones
		WHERE        (IdVariable = 40)
	) AS [VAR]

)AS C ON E_C.CodigoCentro = C.CodigoCentro
GROUP BY E_C.CodigoEmpleado, E_C.Nombres, E_C.IdRangoMaestra, E_C.IdRangoVersionMax, E_C.IdComisionModeloSub, E_C.IdComisionModeloSubCriterio, C.Ano_Periodo, C.Mes_Periodo, C.CodigoEmpresa, C.ValorVariable, E_C.CodigoConcepto

```
