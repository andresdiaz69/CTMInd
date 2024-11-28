# View: vw_GerenteDeRepuestos_MM_2

## Usa los objetos:
- [[ComisionesModelosSub]]
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[ExogenasGerenteRepuestosMM]]
- [[vw_RangosMaestrasFull]]
- [[vw_RangosVersionesMaxSub]]

```sql
CREATE VIEW [dbo].[vw_GerenteDeRepuestos_MM_2] AS 

SELECT EMPLEADOS.CodigoEmpleado, EMPLEADOS.Nombres, UTILIDAD.Ano, UTILIDAD.Mes, UTILIDAD.UtilidadBruta, EMPLEADOS.IdRangoMaestra, EMPLEADOS.IdRangoVersionMax, EMPLEADOS.IdComisionModeloSub, EMPLEADOS.IdComisionModeloSubCriterio
,vw_RangosMaestrasFull.IdRangoVersion,vw_RangosMaestrasFull.ConsecutivoVersion,vw_RangosMaestrasFull.IdRangoDetalle,vw_RangosMaestrasFull.Desde,vw_RangosMaestrasFull.Hasta, vw_RangosMaestrasFull.Valor as ValorComision, vw_RangosMaestrasFull.CodigoConcepto
FROM
(
	SELECT Empleados1.CodigoEmpleado,Empleados1.Nombres +' '+Empleados1.Apellido1+' '+Empleados1.Apellido2 AS Nombres, vw_RangosVersionesMaxSub.IdRangoMaestra, vw_RangosVersionesMaxSub.IdRangoVersionMax, vw_RangosVersionesMaxSub.IdComisionModeloSub, vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
	FROM EmpleadosRangosMaestras
	INNER JOIN Empleados AS Empleados1  ON EmpleadosRangosMaestras.CodigoEmpleado = Empleados1.CodigoEmpleado
	INNER JOIN vw_RangosVersionesMaxSub ON EmpleadosRangosMaestras.IdRangoMaestra = vw_RangosVersionesMaxSub.IdRangoMaestra
	LEFT JOIN ComisionesModelosSub ON vw_RangosVersionesMaxSub.IdComisionModeloSub = ComisionesModelosSub.IdComisionModeloSub
	WHERE (vw_RangosVersionesMaxSub.IdComisionModeloSub = 71) AND (vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 135)
)AS EMPLEADOS
LEFT JOIN 
(
	SELECT CodigoEmpleado, Ano, Mes, UtilidadBruta FROM ExogenasGerenteRepuestosMM
)AS UTILIDAD ON EMPLEADOS.CodigoEmpleado = UTILIDAD.CodigoEmpleado

LEFT JOIN vw_RangosMaestrasFull ON EMPLEADOS.IdRangoVersionMax = vw_RangosMaestrasFull.IdRangoVersion
WHERE (vw_RangosMaestrasFull.Desde < UTILIDAD.UtilidadBruta) AND (vw_RangosMaestrasFull.Hasta >= UTILIDAD.UtilidadBruta)

```
