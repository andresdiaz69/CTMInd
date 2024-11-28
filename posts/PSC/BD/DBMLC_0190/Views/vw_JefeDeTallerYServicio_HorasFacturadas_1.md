# View: vw_JefeDeTallerYServicio_HorasFacturadas_1

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[ExogenasEmpleadosSeccionesPago]]
- [[vw_RangosMaestrasFull]]
- [[vw_RangosVersionesMaxSub]]

```sql

CREATE VIEW [dbo].[vw_JefeDeTallerYServicio_HorasFacturadas_1] AS 


--MODELO SUB 51 --JEFE DE TALLER VILLAVICENCIO 
--MODELO SUB CRITERIO 95 -- Comisión por hora facturada
--IDRANGOMAESTRA 265 JEFE DE TALLER VILLAVICENCIO 

SELECT  DATOSFINAL.Ano_Periodo, DATOSFINAL.Mes_Periodo, DATOSFINAL.CodigoEmpleado, DATOSFINAL.CodigoEmpresa, DATOSFINAL.CodigoCentro, DATOSFINAL.Centro, DATOSFINAL.CodigoSeccion, DATOSFINAL.Seccion, DATOSFINAL.UnidadesVendidas, DATOSFINAL.IdRangoMaestra, DATOSFINAL.IdRangoVersionMax, DATOSFINAL.IdComisionModeloSub, DATOSFINAL.IdComisionModeloSubCriterio
,DATOSFINAL.IdRangoVersion,DATOSFINAL.ConsecutivoVersion,DATOSFINAL.IdRangoDetalle,DATOSFINAL.Desde,DATOSFINAL.Hasta,DATOSFINAL.Valor, DATOSFINAL.CodigoConcepto
,(DATOSFINAL.UnidadesVendidas * Valor )AS ValorComision
FROM 
(
	SELECT TOTAL.Ano_Periodo, TOTAL.Mes_Periodo, TOTAL.CodigoEmpleado, TOTAL.CodigoEmpresa, TOTAL.CodigoCentro, TOTAL.Centro, TOTAL.CodigoSeccion, TOTAL.Seccion, TOTAL.UnidadesVendidas, TOTAL.IdRangoMaestra, TOTAL.IdRangoVersionMax, TOTAL.IdComisionModeloSub, TOTAL.IdComisionModeloSubCriterio
	,vw_RangosMaestrasFull.IdRangoVersion,vw_RangosMaestrasFull.ConsecutivoVersion,vw_RangosMaestrasFull.IdRangoDetalle,vw_RangosMaestrasFull.Desde,vw_RangosMaestrasFull.Hasta,vw_RangosMaestrasFull.Valor, vw_RangosMaestrasFull.CodigoConcepto
	FROM 
	(
		SELECT EMPLEADOS.*, UNIDADESVENDIDAS.Ano_Periodo, UNIDADESVENDIDAS.Mes_Periodo, UNIDADESVENDIDAS.CodigoEmpresa, UNIDADESVENDIDAS.CodigoCentro, UNIDADESVENDIDAS.Centro, UNIDADESVENDIDAS.Seccion, UNIDADESVENDIDAS.UnidadesVendidas
		FROM
		(
			SELECT EMPLEADOS.CodigoEmpleado, EMPLEADOS.IdRangoMaestra, EMPLEADOS.IdRangoVersionMax, EMPLEADOS.IdComisionModeloSub, EMPLEADOS.IdComisionModeloSubCriterio, SECCIONES.CodigoSeccion
			FROM 
			(
				SELECT Empleados1.CodigoEmpleado,Empleados1.Nombres +' '+Empleados1.Apellido1+' '+Empleados1.Apellido2 AS Nombres, vw_RangosVersionesMaxSub.IdRangoMaestra, vw_RangosVersionesMaxSub.IdRangoVersionMax, vw_RangosVersionesMaxSub.IdComisionModeloSub
				,vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
				FROM EmpleadosRangosMaestras
				INNER JOIN Empleados AS Empleados1  ON EmpleadosRangosMaestras.CodigoEmpleado = Empleados1.CodigoEmpleado
				INNER JOIN vw_RangosVersionesMaxSub ON EmpleadosRangosMaestras.IdRangoMaestra = vw_RangosVersionesMaxSub.IdRangoMaestra
				WHERE (vw_RangosVersionesMaxSub.IdComisionModeloSub = 51) AND (vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 95)
			)AS EMPLEADOS
			LEFT JOIN 
			(
				SELECT        CodigoEmpleado, CodigoCentro, CodigoSeccion, Comentarios, UserIdCreo, FechaCreacion, UserIdModifico, FechaModificacion
				FROM            dbo.ExogenasEmpleadosSeccionesPago
			) AS SECCIONES ON EMPLEADOS.CodigoEmpleado = SECCIONES.CodigoEmpleado
			WHERE (SECCIONES.CodigoSeccion IS NOT NULL)
		) AS EMPLEADOS
		LEFT JOIN 
		(
			SELECT  Ano_Periodo, Mes_Periodo ,CodigoEmpresa, Empresa, CodigoCentro, Centro, CodigoSeccion, Seccion, TipoOperacion, SUM(UnidadesVendidas) AS UnidadesVendidas, Tipo='Mecanica' 
			FROM ComisionesSpigaTallerPorOT
			WHERE  TipoOperacion = 'MO'
			GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, Empresa, CodigoCentro, Centro, CodigoSeccion, Seccion, TipoOperacion

		)AS UNIDADESVENDIDAS ON EMPLEADOS.CodigoSeccion = UNIDADESVENDIDAS.CodigoSeccion
	) AS TOTAL
	LEFT JOIN vw_RangosMaestrasFull ON TOTAL.IdRangoVersionMax = vw_RangosMaestrasFull.IdRangoVersion
	WHERE (vw_RangosMaestrasFull.Desde < TOTAL.UnidadesVendidas) AND (vw_RangosMaestrasFull.Hasta >= TOTAL.UnidadesVendidas)
)AS DATOSFINAL


```
