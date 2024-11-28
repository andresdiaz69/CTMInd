# View: vw_GerenteComercialVehiculosComerciales_11

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[ExogenasEmpleadosMarcasTipos]]
- [[ExogenasVehiculosVentasNacionales]]
- [[vw_EntregasGerenteComercial_Vehiculos_Comerciales]]
- [[vw_RangosVersionesMaxSub]]

```sql


CREATE VIEW [dbo].[vw_GerenteComercialVehiculosComerciales_11] AS
SELECT marcaspago.Ano_Periodo , marcaspago.Mes_Periodo ,marcaspago.CodigoEmpleado, marcaspago.Nombres, marcaspago.VehiculosRecaudados, SUM(VENTAS_NACIONALES.VentasNacionales) AS VentasNacionales,	 
CASE WHEN (SUM(VENTAS_NACIONALES.VentasNacionales)) * 1.00 > 0 THEN ((marcaspago.VehiculosRecaudados * 1.00) / (SUM(VENTAS_NACIONALES.VentasNacionales)) * 1.00) * 100.00 ELSE 0 END AS PesoComercial
,IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio

FROM
(
	SELECT DISTINCT  ExogenasEmpleadosMarcasTipos.CodigoEmpleado, ExogenasEmpleadosMarcasTipos.Nombres,PESOCOMERCIAL.Ano_Periodo, PESOCOMERCIAL.Mes_Periodo, 
	PESOCOMERCIAL.CodigoMArca, ExogenasEmpleadosMarcasTipos.CodigoTipo, PESOCOMERCIAL.VehiculosRecaudados
	,ExogenasEmpleadosMarcasTipos.IdRangoMaestra, ExogenasEmpleadosMarcasTipos.IdRangoVersionMax, ExogenasEmpleadosMarcasTipos.IdComisionModeloSub, ExogenasEmpleadosMarcasTipos.IdComisionModeloSubCriterio
	FROM 
	(
		SELECT EMPLEADOS.CodigoEmpleado, EMPLEADOS.Nombres, EMPLEADOS.IdRangoMaestra, EMPLEADOS.IdRangoVersionMax, EMPLEADOS.IdComisionModeloSub, EMPLEADOS.IdComisionModeloSubCriterio, MARCA.CodigoMarca, MARCA.CodigoTipo
		FROM
		(
			SELECT Empleados1.CodigoEmpleado,Empleados1.Nombres +' '+Empleados1.Apellido1+' '+Empleados1.Apellido2 AS Nombres, vw_RangosVersionesMaxSub.IdRangoMaestra, vw_RangosVersionesMaxSub.IdRangoVersionMax, vw_RangosVersionesMaxSub.IdComisionModeloSub
			,vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
			FROM EmpleadosRangosMaestras
			INNER JOIN Empleados AS Empleados1  ON EmpleadosRangosMaestras.CodigoEmpleado = Empleados1.CodigoEmpleado
			INNER JOIN vw_RangosVersionesMaxSub ON EmpleadosRangosMaestras.IdRangoMaestra = vw_RangosVersionesMaxSub.IdRangoMaestra
			WHERE (vw_RangosVersionesMaxSub.IdComisionModeloSub = 79) AND (vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 150)
		)AS EMPLEADOS
		LEFT JOIN 
		(	SELECT        CodigoEmpleado, CodigoMarca, CodigoTipo, Comentarios, UserIdCreo, FechaCreacion, UserIdModifico, FechaModificacion
			FROM            dbo.ExogenasEmpleadosMarcasTipos
		) AS MARCA ON EMPLEADOS.CodigoEmpleado = MARCA.CodigoEmpleado
		WHERE (MARCA.CodigoMarca IS NOT NULL)

	
	)AS ExogenasEmpleadosMarcasTipos

	LEFT OUTER JOIN (
		
	SELECT ENTREGAS.Ano_Periodo, ENTREGAS.Mes_Periodo, ENTREGAS.CodigoMArca, ISNULL(ENTREGAS.VehiculosRecaudados, 0) AS VehiculosRecaudados
		FROM 
		(
			SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa,  CodigoMArca, Marca, SUM(EntregaEfectiva) AS VehiculosRecaudados
			FROM            dbo.vw_EntregasGerenteComercial_Vehiculos_Comerciales
			WHERE EntregaEfectiva = 1
			GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoMArca, Marca
		)AS ENTREGAS
	
	)PESOCOMERCIAL ON ExogenasEmpleadosMarcasTipos.CodigoMArca = PESOCOMERCIAL.CodigoMarca
	
) AS marcaspago 
LEFT OUTER JOIN
(
			SELECT        Ano AS Ano_Periodo, Mes AS Mes_Periodo, CodigoMarca,CodigoTipo, SUM(Unidades) AS VentasNacionales
			FROM            dbo.ExogenasVehiculosVentasNacionales
			GROUP BY Ano, Mes, CodigoMarca,CodigoTipo

) AS VENTAS_NACIONALES ON marcaspago.CodigoMArca = VENTAS_NACIONALES.CodigoMarca AND marcaspago.CodigoTipo = VENTAS_NACIONALES.CodigoTipo AND marcaspago.Mes_Periodo = VENTAS_NACIONALES.Mes_Periodo AND marcaspago.Ano_Periodo = VENTAS_NACIONALES.Ano_Periodo

GROUP BY marcaspago.Ano_Periodo,marcaspago.Mes_Periodo,marcaspago.CodigoEmpleado, marcaspago.Nombres,marcaspago.VehiculosRecaudados,IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio

```
