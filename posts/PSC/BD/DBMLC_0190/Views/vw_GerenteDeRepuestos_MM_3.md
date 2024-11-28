# View: vw_GerenteDeRepuestos_MM_3

## Usa los objetos:
- [[ComisionesModelosSub]]
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[ExogenasPresupuestosGerenteRepuestosMIT]]
- [[InformesDefinitivos]]
- [[vw_RangosMaestrasFull]]
- [[vw_RangosVersionesMaxSub]]

```sql

create VIEW [dbo].[vw_GerenteDeRepuestos_MM_3] AS 

SELECT EMPLEADOS.CodigoEmpleado, EMPLEADOS.Nombres, PRESUPUESTO.Ano, PRESUPUESTO.Mes, PRESUPUESTO.ValorVentas, PRESUPUESTO.Presupuesto, PRESUPUESTO.Cumplimiento, EMPLEADOS.IdRangoMaestra, EMPLEADOS.IdRangoVersionMax, EMPLEADOS.IdComisionModeloSub, EMPLEADOS.IdComisionModeloSubCriterio
,vw_RangosMaestrasFull.IdRangoVersion,vw_RangosMaestrasFull.ConsecutivoVersion,vw_RangosMaestrasFull.IdRangoDetalle,vw_RangosMaestrasFull.Desde,vw_RangosMaestrasFull.Hasta, vw_RangosMaestrasFull.Valor as ValorComision, vw_RangosMaestrasFull.CodigoConcepto
FROM
(
	SELECT Empleados1.CodigoEmpleado,Empleados1.Nombres +' '+Empleados1.Apellido1+' '+Empleados1.Apellido2 AS Nombres, vw_RangosVersionesMaxSub.IdRangoMaestra, vw_RangosVersionesMaxSub.IdRangoVersionMax, vw_RangosVersionesMaxSub.IdComisionModeloSub, vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
	FROM EmpleadosRangosMaestras
	INNER JOIN Empleados AS Empleados1  ON EmpleadosRangosMaestras.CodigoEmpleado = Empleados1.CodigoEmpleado
	INNER JOIN vw_RangosVersionesMaxSub ON EmpleadosRangosMaestras.IdRangoMaestra = vw_RangosVersionesMaxSub.IdRangoMaestra
	LEFT JOIN ComisionesModelosSub ON vw_RangosVersionesMaxSub.IdComisionModeloSub = ComisionesModelosSub.IdComisionModeloSub
	WHERE (vw_RangosVersionesMaxSub.IdComisionModeloSub = 71) AND (vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 136)
)AS EMPLEADOS
LEFT JOIN 
(
	SELECT PRESUPUESTO.CodigoEmpleado, PRESUPUESTO.Ano, PRESUPUESTO.Mes, ISNULL(VENTAS.ValorVentas,0) AS ValorVentas, ISNULL(PRESUPUESTO.Presupuesto,0) AS Presupuesto, ISNULL(VENTAS.ValorVentas,0) / ISNULL(PRESUPUESTO.Presupuesto,0) * 100 AS Cumplimiento
	FROM
	( SELECT CodigoEmpleado, Ano, Mes, Presupuesto FROM ExogenasPresupuestosGerenteRepuestosMIT
	)AS PRESUPUESTO
	LEFT JOIN 
	( SELECT Año2, MesInicial2, MesFinal2, ActualTotal AS ValorVentas, CodigoPresentacion, CodigoConcepto
	  FROM [InformesComiteDB].dbo.InformesDefinitivos WHERE CodigoPresentacion = 3 AND MesInicial2 = MesFinal2 AND CodigoConcepto = 304
	)AS VENTAS ON PRESUPUESTO.Ano = VENTAS.Año2 AND PRESUPUESTO.Mes = VENTAS.MesInicial2 

)AS PRESUPUESTO ON EMPLEADOS.CodigoEmpleado = PRESUPUESTO.CodigoEmpleado

LEFT JOIN vw_RangosMaestrasFull ON EMPLEADOS.IdRangoVersionMax = vw_RangosMaestrasFull.IdRangoVersion
WHERE (vw_RangosMaestrasFull.Desde < PRESUPUESTO.Cumplimiento) AND (vw_RangosMaestrasFull.Hasta >= PRESUPUESTO.Cumplimiento)

```
