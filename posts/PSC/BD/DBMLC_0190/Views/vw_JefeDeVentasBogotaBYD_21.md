# View: vw_JefeDeVentasBogotaBYD_21

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[ExogenasEmpleadosCentrosPago]]
- [[RangosMaestras]]
- [[vw_JefeDeVentasBogotaBYD_2]]
- [[vw_RangosMaestrasFull]]
- [[vw_RangosVersionesMaxSub]]

```sql

CREATE VIEW [dbo].[vw_JefeDeVentasBogotaBYD_21] AS

SELECT T.CodigoEmpleado, T.Nombres, T.IdRangoMaestra, T.IdRangoVersionMax, T.IdComisionModeloSub, T.IdComisionModeloSubCriterio, T.CodigoConcepto, T.Ano_Periodo, T.Mes_Periodo, T.CodigoEmpresa, T.EntregasEfectivas, T.CreditosDesembolsados, T.ColocacionCreditos,
dbo.vw_RangosMaestrasFull.IdRangoVersion, dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, 
dbo.vw_RangosMaestrasFull.Valor AS Comision
FROM
(
	SELECT E.CodigoEmpleado, E.Nombres, E.IdRangoMaestra, E.IdRangoVersionMax, E.IdComisionModeloSub, E.IdComisionModeloSubCriterio, E.CodigoConcepto, C.Ano_Periodo, C.Mes_Periodo, C.CodigoEmpresa, SUM(C.EntregasEfectivas)AS EntregasEfectivas, SUM(C.CreditosDesembolsados)AS CreditosDesembolsados
	,CASE WHEN ISNULL(SUM(EntregasEfectivas), 0) > 0 
	THEN ISNULL(CONVERT(decimal(18,2), SUM(CreditosDesembolsados)), 0) / ISNULL(CONVERT(decimal(18,2), SUM(EntregasEfectivas)), 0) * 100
	ELSE 0.00 END AS ColocacionCreditos
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
			WHERE (vw_RangosVersionesMaxSub.IdComisionModeloSub = 78) AND (vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 147)

		)AS EMPLEADOS
		LEFT JOIN 
		(	SELECT        CodigoEmpleado, CodigoCentro, Comentarios, UserIdCreo, FechaCreacion, UserIdModifico, FechaModificacion
			FROM            dbo.ExogenasEmpleadosCentrosPago
		) AS CENTROS ON EMPLEADOS.CodigoEmpleado = CENTROS.CodigoEmpleado
		WHERE (CENTROS.CodigoCentro IS NOT NULL)
	)AS E
	LEFT JOIN 
	(
		SELECT Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoCentro, EntregasEfectivas, CreditosDesembolsados, ColocacionCreditos FROM vw_JefeDeVentasBogotaBYD_2
	
	)AS C ON E.CodigoCentro = C.CodigoCentro
	GROUP BY E.CodigoEmpleado, E.Nombres, E.IdRangoMaestra, E.IdRangoVersionMax, E.IdComisionModeloSub, E.IdComisionModeloSubCriterio, E.CodigoConcepto, C.Ano_Periodo, C.Mes_Periodo, C.CodigoEmpresa
)AS T
LEFT OUTER JOIN dbo.vw_RangosMaestrasFull ON T.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE (dbo.vw_RangosMaestrasFull.Desde < T.ColocacionCreditos) AND (dbo.vw_RangosMaestrasFull.Hasta >= T.ColocacionCreditos)

```
