# View: vw_JefeNacionalDeAccesoriosBonaparte_1

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[vw_JefeDeAccesoriosBonaparte]]
- [[vw_RangosVersionesMaxSub]]

```sql
CREATE VIEW [dbo].[vw_JefeNacionalDeAccesoriosBonaparte_1] AS

SELECT distinct A.CodigoEmpleado, A.Nombres, A.Ano_Periodo, A.Mes_Periodo, a.Sede, A.Valor, A.IdRangoMaestra, A.IdRangoVersionMax, A.IdComisionModeloSub, A.IdComisionModeloSubCriterio
FROM
(
	SELECT E.CodigoEmpleado, E.Nombres,  V.Ano_Periodo, V.Mes_Periodo, v.Sede, V.Valor
	,E.IdRangoMaestra, E.IdRangoVersionMax, E.IdComisionModeloSub, E.IdComisionModeloSubCriterio
	FROM
	(
		SELECT V.Año As Ano_Periodo, V.MesInicial AS Mes_Periodo, V.Sede, V.valor As Valor
		FROM vw_JefeDeAccesoriosBonaparte AS V
		WHERE V.MesInicial = V.MesFinal

		UNION ALL

		SELECT Año As Ano_Periodo, MesInicial AS Mes_Periodo, 'TOTAL' Sede, SUM(valor)/1000000 As Valor
		FROM vw_JefeDeAccesoriosBonaparte 
		WHERE MesInicial = MesFinal
		GROUP BY AÑO, MesInicial

	)AS V
	CROSS JOIN
	(
		SELECT        dbo.Empleados.CodigoEmpleado, Empleados.Nombres +' '+ Empleados.Apellido1+' '+ Empleados.Apellido2 AS Nombres, dbo.vw_RangosVersionesMaxSub.IdRangoMaestra, dbo.vw_RangosVersionesMaxSub.IdRangoVersionMax, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
		FROM            dbo.EmpleadosRangosMaestras 
		INNER JOIN dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado 
		INNER JOIN dbo.vw_RangosVersionesMaxSub ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMaxSub.IdRangoMaestra
		WHERE (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub = 85) AND (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 164) 
		
	)AS E 

)AS A

```
