# View: vw_GerenteOficinaVillavicencioMitsubishi_1

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[vw_JefesDeVentas_1_0]]
- [[vw_RangosMaestrasFull]]
- [[vw_RangosVersionesMaxSub]]

```sql

CREATE VIEW [dbo].[vw_GerenteOficinaVillavicencioMitsubishi_1] AS

SELECT        PESO_COMERCIAL.Ano_Periodo, PESO_COMERCIAL.Mes_Periodo, PESO_COMERCIAL.CodigoEmpleado, PESO_COMERCIAL.IdRangoMaestra, PESO_COMERCIAL.IdRangoVersionMax, VehiculosRecaudados, VentasNacionales,PESO_COMERCIAL.PesoComercial, 
                         dbo.vw_RangosMaestrasFull.IdComisionModeloSub, dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio, dbo.vw_RangosMaestrasFull.CodigoMarcaGrupo, dbo.vw_RangosMaestrasFull.MarcaGrupo, 
                         dbo.vw_RangosMaestrasFull.IdRangoVersion, dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, 
                         dbo.vw_RangosMaestrasFull.Valor AS Comision_PesoComercial, dbo.vw_RangosMaestrasFull.CodigoConcepto
FROM            (SELECT        dbo.vw_JefesDeVentas_1_0.Ano_Periodo, dbo.vw_JefesDeVentas_1_0.Mes_Periodo, dbo.vw_JefesDeVentas_1_0.CodigoEmpleado, EMPLEADO.IdRangoMaestra, EMPLEADO.IdRangoVersionMax, 
					EMPLEADO.IdComisionModeloSub, EMPLEADO.IdComisionModeloSubCriterio,
					SUM(vw_JefesDeVentas_1_0.VehiculosRecaudados) AS VehiculosRecaudados, SUM(vw_JefesDeVentas_1_0.VentasNacionales) AS VentasNacionales,
					CASE WHEN ISNULL(SUM(vw_JefesDeVentas_1_0.VentasNacionales), 0) > 0 
					THEN ISNULL(CONVERT(decimal(18,2),SUM(vw_JefesDeVentas_1_0.VehiculosRecaudados)),0) / ISNULL(CONVERT(decimal(18,2), SUM(vw_JefesDeVentas_1_0.VentasNacionales)), 0) * 100 
					ELSE 0.00 END AS PesoComercial

					FROM           
					(
						SELECT        dbo.Empleados.CodigoEmpleado, dbo.vw_RangosVersionesMaxSub.IdRangoMaestra, dbo.vw_RangosVersionesMaxSub.IdRangoVersionMax, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
						FROM            dbo.EmpleadosRangosMaestras 
						INNER JOIN dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado 
						INNER JOIN dbo.vw_RangosVersionesMaxSub ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMaxSub.IdRangoMaestra
						WHERE (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub = 80) AND (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 151)
					) AS EMPLEADO 
					LEFT OUTER JOIN dbo.vw_JefesDeVentas_1_0 ON EMPLEADO.CodigoEmpleado = dbo.vw_JefesDeVentas_1_0.CodigoEmpleado
					WHERE dbo.vw_JefesDeVentas_1_0.CodigoMArca IN (263,20)
					GROUP BY dbo.vw_JefesDeVentas_1_0.Ano_Periodo, dbo.vw_JefesDeVentas_1_0.Mes_Periodo, dbo.vw_JefesDeVentas_1_0.CodigoEmpleado, EMPLEADO.IdRangoMaestra, EMPLEADO.IdRangoVersionMax, EMPLEADO.IdComisionModeloSub, EMPLEADO.IdComisionModeloSubCriterio
) AS PESO_COMERCIAL LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON PESO_COMERCIAL.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        

(dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 80) AND (dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio = 151) 

AND (dbo.vw_RangosMaestrasFull.Desde < PESO_COMERCIAL.PesoComercial) 
AND (dbo.vw_RangosMaestrasFull.Hasta >= PESO_COMERCIAL.PesoComercial)


```
