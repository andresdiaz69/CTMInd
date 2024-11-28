# View: vw_ExpertoDeProductoDaimlerPC_2

## Usa los objetos:
- [[ComisionesSpigaVN]]
- [[ComisionesSpigaVO]]
- [[Empleados]]
- [[EmpleadosActivos]]
- [[EmpleadosRangosMaestras]]
- [[ExogenasEmpleadosCentrosPago]]
- [[RangosMaestras]]
- [[vw_RangosVersionesMaxSub]]
- [[vw_VariablesVersiones]]

```sql

CREATE VIEW [dbo].[vw_ExpertoDeProductoDaimlerPC_2] AS
SELECT EMPLEADOSCENTRO.CodigoEmpleado, EMPLEADOSCENTRO.Nombres, EMPLEADOSCENTRO.IdRangoMaestra, EMPLEADOSCENTRO.IdRangoVersionMax, EMPLEADOSCENTRO.IdComisionModeloSub, EMPLEADOSCENTRO.IdComisionModeloSubCriterio, EMPLEADOSCENTRO.CodigoConcepto
--, EMPLEADOSCENTRO.CodigoCentro
, CANTIDAD.Ano_Periodo, CANTIDAD.Mes_Periodo, SUM(ISNULL(CANTIDAD.Cantidad,0)) AS Cantidad
,VARIABLE.ValorVariable
, ISNULL(Cantidad,0) * VARIABLE.ValorVariable AS Comision
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
		WHERE (vw_RangosVersionesMaxSub.IdComisionModeloSub = 73) AND (vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 139)

	)AS EMPLEADOS
	LEFT JOIN 
	(	SELECT        CodigoEmpleado, CodigoCentro, Comentarios, UserIdCreo, FechaCreacion, UserIdModifico, FechaModificacion
		FROM            dbo.ExogenasEmpleadosCentrosPago
	) AS CENTROS ON EMPLEADOS.CodigoEmpleado = CENTROS.CodigoEmpleado
	WHERE (CENTROS.CodigoCentro IS NOT NULL)

) AS EMPLEADOSCENTRO
LEFT JOIN 
(
	select Ano_Periodo, Mes_Periodo, CodigoCentro, SUM(Cantidad)AS Cantidad
	from
	(
		select v.Ano_Periodo,v.Mes_Periodo,v.CodigoCentro,Cantidad = sum(v.EntregaEfectiva)
		from		ComisionesSpigaVN		v
		left join	EmpleadosActivos		e	on	v.CedulaVendedor = e.CodigoEmpleado and e.Ano_Periodo = year(getdate()) and e.Mes_Periodo = month(getdate())	
		where e.Codigo_Cargo = 106 and v.Tipo_Servicio = '1'
		group by  v.Ano_Periodo,v.Mes_Periodo,v.CodigoCentro

		UNION ALL

		select v.Ano_Periodo,v.Mes_Periodo,v.CodigoCentro,Cantidad=sum(v.EntregaEfectiva)
		from		ComisionesSpigaVO		v
		left join	EmpleadosActivos		e	on	v.CedulaVendedor = e.CodigoEmpleado and e.Ano_Periodo = year(getdate()) and e.Mes_Periodo = month(getdate())	
		where e.Codigo_Cargo = 106 and v.Tipo_Servicio = '3'
		group by  v.Ano_Periodo,v.Mes_Periodo,v.CodigoCentro
	)as t
	GROUP BY Ano_Periodo, Mes_Periodo, CodigoCentro

)AS CANTIDAD ON EMPLEADOSCENTRO.CodigoCentro = CANTIDAD.CodigoCentro
cross join
(
SELECT        ValorVariable
FROM            dbo.vw_VariablesVersiones AS vw_VariablesVersiones_1
WHERE        (IdVariable = 38)
)as VARIABLE
WHERE CANTIDAD.Ano_Periodo IS NOT NULL
GROUP BY EMPLEADOSCENTRO.CodigoEmpleado, EMPLEADOSCENTRO.Nombres, EMPLEADOSCENTRO.IdRangoMaestra, EMPLEADOSCENTRO.IdRangoVersionMax, EMPLEADOSCENTRO.IdComisionModeloSub, EMPLEADOSCENTRO.IdComisionModeloSubCriterio, EMPLEADOSCENTRO.CodigoConcepto, CANTIDAD.Ano_Periodo, CANTIDAD.Mes_Periodo
,VARIABLE.ValorVariable, CANTIDAD.Cantidad

```
