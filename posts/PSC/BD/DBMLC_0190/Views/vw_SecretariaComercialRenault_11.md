# View: vw_SecretariaComercialRenault_11

## Usa los objetos:
- [[ComisionesSpigaVN]]
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[ExogenasEmpleadosCentrosPago]]
- [[vw_RangosMaestrasFull]]
- [[vw_RangosVersionesMaxSub]]

```sql

CREATE VIEW [dbo].[vw_SecretariaComercialRenault_11]
AS

--MODELO SUB 43 --SECRETARIA COMERCUAL RENAULT
--MODELO SUB CRITERIO 67 -- Bono Mensual por volumen de ventas
--IDRANGOMAESTRA 189 

SELECT TOTAL.Ano_Periodo,TOTAL.Mes_Periodo,TOTAL.CodigoEmpleado,TOTAL.IdRangoMaestra,TOTAL.IdRangoVersionMax,TOTAL.EntregaEfectiva,TOTAL.IdComisionModeloSub,TOTAL.IdComisionModeloSubCriterio,TOTAL.CodigoCentro,TOTAL.Centro,vw_RangosMaestrasFull.CodigoMarcaGrupo,vw_RangosMaestrasFull.MarcaGrupo
,vw_RangosMaestrasFull.IdRangoVersion,vw_RangosMaestrasFull.ConsecutivoVersion,vw_RangosMaestrasFull.IdRangoDetalle,vw_RangosMaestrasFull.Desde,vw_RangosMaestrasFull.Hasta,vw_RangosMaestrasFull.Valor
FROM 
(
	SELECT EMPLEADOS2.*,ENTREGAS.Ano_Periodo,ENTREGAS.Mes_Periodo,ENTREGAS.CodigoEmpresa,ENTREGAS.Empresa,ENTREGAS.CodigoMarca,ENTREGAS.Marca,ENTREGAS.Centro,ENTREGAS.EntregaEfectiva
	FROM 
		(
			SELECT EMPLEADOS.CodigoEmpleado, EMPLEADOS.IdRangoMaestra, EMPLEADOS.IdRangoVersionMax, EMPLEADOS.IdComisionModeloSub, EMPLEADOS.IdComisionModeloSubCriterio, CENTROS.CodigoCentro
			FROM 
				(SELECT Empleados1.CodigoEmpleado,Empleados1.Nombres +' '+Empleados1.Apellido1+' '+Empleados1.Apellido2 AS Nombres, vw_RangosVersionesMaxSub.IdRangoMaestra, vw_RangosVersionesMaxSub.IdRangoVersionMax, vw_RangosVersionesMaxSub.IdComisionModeloSub
				,vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
				FROM EmpleadosRangosMaestras
				INNER JOIN Empleados AS Empleados1  ON EmpleadosRangosMaestras.CodigoEmpleado = Empleados1.CodigoEmpleado
				INNER JOIN vw_RangosVersionesMaxSub ON EmpleadosRangosMaestras.IdRangoMaestra = vw_RangosVersionesMaxSub.IdRangoMaestra
				WHERE (vw_RangosVersionesMaxSub.IdComisionModeloSub = 43) AND (vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 67)
			)AS EMPLEADOS
			LEFT JOIN 
			(SELECT        CodigoEmpleado, CodigoCentro, Comentarios, UserIdCreo, FechaCreacion, UserIdModifico, FechaModificacion
			FROM            dbo.ExogenasEmpleadosCentrosPago
			) AS CENTROS ON EMPLEADOS.CodigoEmpleado = CENTROS.CodigoEmpleado
			WHERE (CENTROS.CodigoCentro IS NOT NULL)
		)AS EMPLEADOS2
		LEFT JOIN 

		(SELECT YEAR(FechaEntregaCliente)Ano_Periodo,MONTH(FechaEntregaCliente)Mes_Periodo, Codigoempresa, Empresa, CodigoCentro, Centro, CodigoMArca, Marca, sum(EntregaEfectiva)EntregaEfectiva
		FROM ComisionesSpigaVN
		WHERE EntregaEfectiva = 1 AND Nit <> '9003362494' AND Nit <> '8300049938'
		GROUP BY  YEAR(FechaEntregaCliente),MONTH(FechaEntregaCliente),Codigoempresa, Empresa, CodigoCentro, Centro, CodigoMArca, Marca)AS ENTREGAS ON EMPLEADOS2.CodigoCentro = ENTREGAS.CodigoCentro
)AS TOTAL
LEFT JOIN vw_RangosMaestrasFull ON TOTAL.IdRangoVersionMax = vw_RangosMaestrasFull.IdRangoVersion
WHERE (vw_RangosMaestrasFull.Desde < TOTAL.EntregaEfectiva) AND (vw_RangosMaestrasFull.Hasta >= TOTAL.EntregaEfectiva)




```
