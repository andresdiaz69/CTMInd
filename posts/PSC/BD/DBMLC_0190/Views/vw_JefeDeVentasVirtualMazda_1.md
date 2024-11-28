# View: vw_JefeDeVentasVirtualMazda_1

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[ExogenasEmpleadosCentrosPago]]
- [[ExogenasEmpleadosMarcasTipos]]
- [[ExogenasVehiculosVentasNacionales]]
- [[vw_PorcentajeRecaudoVNFacturaFull_V2]]
- [[vw_RangosVersionesMaxSub]]

```sql
CREATE VIEW [dbo].[vw_JefeDeVentasVirtualMazda_1] AS 

SELECT centrosPago.Ano AS Ano_Recaudo,centrosPago.Mes AS Mes_Recaudo,centrosPago.CodigoEmpleado, centrosPago.Nombres, centrosPago.CodigoCentro, centrosPago.CodigoMArca,centrosPago.VehiculosRecaudados, SUM(centrosPago.VentasNacionales) AS VentasNacionales,	 
CASE WHEN (SUM(centrosPago.VentasNacionales)) * 1.00 > 0 THEN ((centrosPago.VehiculosRecaudados * 1.00) / (SUM(centrosPago.VentasNacionales)) * 1.00) * 100.00 ELSE 0 END AS PesoComercial
,IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio
FROM
(
	SELECT  ExogenasEmpleadosCentrosPago.CodigoEmpleado, ExogenasEmpleadosCentrosPago.Nombres,PESOCOMERCIAL.Ano, PESOCOMERCIAL.Mes, ExogenasEmpleadosCentrosPago.CodigoCentro,
	PESOCOMERCIAL.CodigoMArca, PESOCOMERCIAL.CodigoTipo, PESOCOMERCIAL.VehiculosRecaudados, PESOCOMERCIAL.VentasNacionales, PESOCOMERCIAL.PesoComercial
	,ExogenasEmpleadosCentrosPago.IdRangoMaestra, ExogenasEmpleadosCentrosPago.IdRangoVersionMax, ExogenasEmpleadosCentrosPago.IdComisionModeloSub, ExogenasEmpleadosCentrosPago.IdComisionModeloSubCriterio
	FROM 
	(
		SELECT ENTREGAS.Ano, ENTREGAS.Mes, ENTREGAS.CodigoCentro, ENTREGAS.CodigoMArca, VENTAS_NACIONALES.CodigoTipo, ISNULL(ENTREGAS.VehiculosRecaudados, 0) AS VehiculosRecaudados, ISNULL(VENTAS_NACIONALES.Unidades, 0) AS VentasNacionales, 
		CASE WHEN ISNULL(VENTAS_NACIONALES.Unidades, 0) > 0  THEN ISNULL(CONVERT(decimal(18,2), ENTREGAS.VehiculosRecaudados), 0) / ISNULL(CONVERT(decimal(18,2), VENTAS_NACIONALES.Unidades), 0) * 100 
		ELSE 0.00 END AS PesoComercial
		FROM 
		(
			SELECT  YEAR(FechaEntregaCliente) AS Ano, MONTH(FechaEntregaCliente) AS Mes, CodigoEmpresa, CodigoMarca, CodigoCentro, COUNT(PorcentajeRecaudo) AS VehiculosRecaudados
			FROM vw_PorcentajeRecaudoVNFacturaFull_V2
			WHERE (TipoOportunidad = 'internet' or Procedencia = 'virtual') and PorcentajeRecaudo > 99.99 
			GROUP BY CodigoEmpresa, CodigoMarca, CodigoCentro, YEAR(FechaEntregaCliente), MONTH(FechaEntregaCliente) 
		)AS ENTREGAS
		LEFT OUTER JOIN
		(
			SELECT        Ano AS Ano_Periodo, Mes AS Mes_Periodo, CodigoMarca,CodigoTipo, SUM(Unidades) AS Unidades
			FROM          dbo.ExogenasVehiculosVentasNacionales
			GROUP BY Ano, Mes, CodigoMarca,CodigoTipo
		) AS VENTAS_NACIONALES ON ENTREGAS.CodigoMArca = VENTAS_NACIONALES.CodigoMarca AND ENTREGAS.Mes = VENTAS_NACIONALES.Mes_Periodo AND ENTREGAS.Ano = VENTAS_NACIONALES.Ano_Periodo
	)AS PESOCOMERCIAL

	RIGHT OUTER JOIN (
		SELECT EMPLEADOS.CodigoEmpleado, EMPLEADOS.Nombres, EMPLEADOS.IdRangoMaestra, EMPLEADOS.IdRangoVersionMax, EMPLEADOS.IdComisionModeloSub, EMPLEADOS.IdComisionModeloSubCriterio, CENTROS.CodigoCentro
		FROM
		(
			SELECT Empleados1.CodigoEmpleado,Empleados1.Nombres +' '+Empleados1.Apellido1+' '+Empleados1.Apellido2 AS Nombres, vw_RangosVersionesMaxSub.IdRangoMaestra, vw_RangosVersionesMaxSub.IdRangoVersionMax, vw_RangosVersionesMaxSub.IdComisionModeloSub
			,vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
			FROM EmpleadosRangosMaestras
			INNER JOIN Empleados AS Empleados1  ON EmpleadosRangosMaestras.CodigoEmpleado = Empleados1.CodigoEmpleado
			INNER JOIN vw_RangosVersionesMaxSub ON EmpleadosRangosMaestras.IdRangoMaestra = vw_RangosVersionesMaxSub.IdRangoMaestra
			WHERE (vw_RangosVersionesMaxSub.IdComisionModeloSub = 69) AND (vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 128)
		)AS EMPLEADOS
		LEFT JOIN 
		(	SELECT        CodigoEmpleado, CodigoCentro, Comentarios, UserIdCreo, FechaCreacion, UserIdModifico, FechaModificacion
			FROM            dbo.ExogenasEmpleadosCentrosPago
		) AS CENTROS ON EMPLEADOS.CodigoEmpleado = CENTROS.CodigoEmpleado
		WHERE (CENTROS.CodigoCentro IS NOT NULL)
	
	)ExogenasEmpleadosCentrosPago ON PESOCOMERCIAL.CodigoCentro = ExogenasEmpleadosCentrosPago.CodigoCentro
	WHERE        (PESOCOMERCIAL.Ano IS NOT NULL)

) AS centrosPago 
INNER JOIN ExogenasEmpleadosMarcasTipos on centrosPago.CodigoEmpleado = ExogenasEmpleadosMarcasTipos.CodigoEmpleado AND centrosPago.CodigoMArca = ExogenasEmpleadosMarcasTipos.CodigoMarca AND centrosPago.CodigoTipo = ExogenasEmpleadosMarcasTipos.CodigoTipo 
GROUP BY centrosPago.Ano,centrosPago.Mes,centrosPago.CodigoEmpleado, centrosPago.Nombres,centrosPago.CodigoCentro,centrosPago.CodigoMArca,centrosPago.VehiculosRecaudados,IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio


```
