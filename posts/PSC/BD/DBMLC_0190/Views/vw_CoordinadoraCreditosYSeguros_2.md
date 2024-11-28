# View: vw_CoordinadoraCreditosYSeguros_2

## Usa los objetos:
- [[ComisionesModelosSub]]
- [[ComisionesSpigaVN]]
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[ExogenasEmpleadosEmpresasPago]]
- [[spiga_ComisionesFinanciacion]]
- [[vw_RangosMaestrasFull]]
- [[vw_RangosVersionesMaxSub]]

```sql

CREATE VIEW [dbo].[vw_CoordinadoraCreditosYSeguros_2] AS
SELECT EMPLEADOSEMPRESAS.IdRangoMaestra, EMPLEADOSEMPRESAS.IdRangoVersionMax, EMPLEADOSEMPRESAS.IdComisionModeloSub, EMPLEADOSEMPRESAS.IdComisionModeloSubCriterio, EMPLEADOSEMPRESAS.CodigoEmpresa, EMPLEADOSEMPRESAS.CodigoEmpleado, EMPLEADOSEMPRESAS.Nombres
,CREDITOS.Ano_Periodo, CREDITOS.Mes_periodo, CREDITOS.UnidadesFinanciadas, CREDITOS.UnidadesEntregadas, CREDITOS.PorcentajeCreditos
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
		WHERE (vw_RangosVersionesMaxSub.IdComisionModeloSub = 70) AND (vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 132)
	)AS EMPLEADOS
	LEFT JOIN 
	(	SELECT        CodigoEmpleado, CodigoEmpresa, Comentarios, UserIdCreo, FechaCreacion, UserIdModifico, FechaModificacion
			FROM            dbo.ExogenasEmpleadosEmpresasPago
	) AS EMPRESAS ON EMPLEADOS.CodigoEmpleado = EMPRESAS.CodigoEmpleado 
		
	--ESTE CRITERIO SOLO SE USA PARA LA EMPRESA MOTORYSA
	WHERE (EMPRESAS.CodigoEmpresa IS NOT NULL) AND EMPRESAS.CodigoEmpresa = 6

)AS EMPLEADOSEMPRESAS
LEFT JOIN 
(
	SELECT FINANCIADAS.Ano_Periodo, FINANCIADAS.Mes_periodo, FINANCIADAS.CodigoEmpresa, FINANCIADAS.UnidadesFinanciadas, ISNULL(ENTREGAS.UnidadesEntregadas,0)AS UnidadesEntregadas
	,CASE WHEN ISNULL(ENTREGAS.UnidadesEntregadas,0) <> 0 THEN CONVERT(decimal(18,2),CONVERT(decimal(18,2),FINANCIADAS.UnidadesFinanciadas) / CONVERT(decimal(18,2),ENTREGAS.UnidadesEntregadas) * 100) ELSE 0 END AS PorcentajeCreditos
	FROM
	(
		select YEAR(FechaEntregaCliente)AS Ano_Periodo, MONTH(FechaEntregaCliente)AS Mes_periodo, IdEmpresas AS CodigoEmpresa , SUM(cantidad)AS UnidadesFinanciadas
		from
		(
			SELECT cantidad = case when ComisionFinanciera > 0 then 1 else -1 end, FechaEntregaCliente= isnull(f.FechaEntregaCliente,c.FechaEntregaCliente), f.IdEmpresas
			from PSCService_DB..[spiga_ComisionesFinanciacion]	f
			join 
			(
				select vin,fechaentregacliente from
				(
					select orden= row_number() over (partition by vin order by FechaEntregaCliente desc), vin, FechaEntregaCliente
					from ComisionesSpigaVN	
				) a 
				where orden = 1 
			)c on f.Vin=c.vin
			where IdEmpresas = 6
			and ComisionFinanciera <> 0
			and idcentros <> 84
		) a
		GROUP BY YEAR(FechaEntregaCliente), MONTH(FechaEntregaCliente), IdEmpresas

	)AS FINANCIADAS
	LEFT JOIN 
	(
		SELECT Ano_Periodo, Mes_Periodo, Codigoempresa, SUM(EntregaEfectiva)AS UnidadesEntregadas FROM ComisionesSpigaVN WHERE Codigoempresa = 6 and CodigoCentro <> 84
		GROUP BY  Ano_Periodo, Mes_Periodo, Codigoempresa
	)AS ENTREGAS ON FINANCIADAS.Ano_Periodo = ENTREGAS.Ano_Periodo AND FINANCIADAS.Mes_periodo = ENTREGAS.Mes_Periodo

)AS CREDITOS ON EMPLEADOSEMPRESAS.CodigoEmpresa = CREDITOS.CodigoEmpresa
LEFT JOIN vw_RangosMaestrasFull ON EMPLEADOSEMPRESAS.IdRangoVersionMax = vw_RangosMaestrasFull.IdRangoVersion
WHERE (vw_RangosMaestrasFull.Desde < CREDITOS.PorcentajeCreditos) AND (vw_RangosMaestrasFull.Hasta >= CREDITOS.PorcentajeCreditos)


```
