# View: vw_JefeDeVentasVirtualMazda_3

## Usa los objetos:
- [[ComisionesSpigaVN]]
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[ExogenasEmpleadosCentrosPago]]
- [[vw_PorcentajeRecaudoVNFacturaFull_V2]]
- [[vw_RangosVersionesMaxSub]]

```sql


CREATE VIEW [dbo].[vw_JefeDeVentasVirtualMazda_3] AS 

SELECT EMPLEADOSCENTRO.IdRangoMaestra, EMPLEADOSCENTRO.IdRangoVersionMax, EMPLEADOSCENTRO.IdComisionModeloSub, EMPLEADOSCENTRO.IdComisionModeloSubCriterio, EMPLEADOSCENTRO.CodigoEmpleado, EMPLEADOSCENTRO.Nombres, EMPLEADOSCENTRO.CodigoCentro, VENTASDIGITALES.Ano_Recaudo, VENTASDIGITALES.Mes_Recaudo, VENTASDIGITALES.EntregasCanalVirtual, VENTASDIGITALES.EntregasLinea, VENTASDIGITALES.ParticipacionVentasDigitales
FROM
(
	SELECT EMPLEADOS.CodigoEmpleado, EMPLEADOS.Nombres, EMPLEADOS.IdRangoMaestra, EMPLEADOS.IdRangoVersionMax, EMPLEADOS.IdComisionModeloSub, EMPLEADOS.IdComisionModeloSubCriterio, CENTROS.CodigoCentro
	FROM 
	(
		SELECT Empleados1.CodigoEmpleado,Empleados1.Nombres +' '+Empleados1.Apellido1+' '+Empleados1.Apellido2 AS Nombres, vw_RangosVersionesMaxSub.IdRangoMaestra, vw_RangosVersionesMaxSub.IdRangoVersionMax, vw_RangosVersionesMaxSub.IdComisionModeloSub
		,vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
		FROM EmpleadosRangosMaestras
		INNER JOIN Empleados AS Empleados1  ON EmpleadosRangosMaestras.CodigoEmpleado = Empleados1.CodigoEmpleado
		INNER JOIN vw_RangosVersionesMaxSub ON EmpleadosRangosMaestras.IdRangoMaestra = vw_RangosVersionesMaxSub.IdRangoMaestra
		WHERE (vw_RangosVersionesMaxSub.IdComisionModeloSub = 69) AND (vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 130)

	)AS EMPLEADOS
	LEFT JOIN 
	(	SELECT        CodigoEmpleado, CodigoCentro, Comentarios, UserIdCreo, FechaCreacion, UserIdModifico, FechaModificacion
		FROM            dbo.ExogenasEmpleadosCentrosPago
	) AS CENTROS ON EMPLEADOS.CodigoEmpleado = CENTROS.CodigoEmpleado
	WHERE (CENTROS.CodigoCentro IS NOT NULL)
)AS EMPLEADOSCENTRO 
LEFT JOIN
(
	SELECT ENTREGASVIRTUAL.Ano_Recaudo, ENTREGASVIRTUAL.Mes_Recaudo, ENTREGASVIRTUAL.CodigoCentro, ENTREGASVIRTUAL.EntregasCanalVirtual, ENTREGAS.EntregasLinea
	, CASE WHEN ISNULL(ENTREGAS.EntregasLinea, 0) > 0  THEN ISNULL(CONVERT(decimal(18,2), ENTREGASVIRTUAL.EntregasCanalVirtual), 0) / ISNULL(CONVERT(decimal(18,2), ENTREGAS.EntregasLinea), 0) * 100 
	ELSE 0.00 END AS ParticipacionVentasDigitales
	FROM
	(
		SELECT YEAR(FechaEntregaCliente) AS Ano_Recaudo, MONTH(FechaEntregaCliente) AS Mes_Recaudo, CodigoEmpresa, CodigoMarca, CodigoCentro, COUNT(PorcentajeRecaudo) AS EntregasCanalVirtual
		FROM vw_PorcentajeRecaudoVNFacturaFull_V2
		WHERE (TipoOportunidad = 'internet' or Procedencia = 'virtual')
		GROUP BY CodigoEmpresa, CodigoMarca, CodigoCentro, YEAR(FechaEntregaCliente), MONTH(FechaEntregaCliente)
	)AS ENTREGASVIRTUAL
	LEFT JOIN 
	(
		SELECT Ano_Periodo, Mes_Periodo, CodigoCentro, COUNT(EntregaEfectiva) AS EntregasLinea
		FROM ComisionesSpigaVN 
		WHERE EntregaEfectiva = 1
		GROUP BY Ano_Periodo, Mes_Periodo, CodigoCentro
	)AS ENTREGAS ON ENTREGASVIRTUAL.Ano_Recaudo = ENTREGAS.Ano_Periodo AND ENTREGASVIRTUAL.Mes_Recaudo = ENTREGAS.Mes_Periodo AND ENTREGASVIRTUAL.CodigoCentro = ENTREGAS.CodigoCentro
)AS VENTASDIGITALES ON EMPLEADOSCENTRO.CodigoCentro = VENTASDIGITALES.CodigoCentro
WHERE VENTASDIGITALES.Ano_Recaudo IS NOT NULL


```
