# View: vw_JefesDeTallerFabricaDeColisionCT_1

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[vw_JefesDeTallerFabricaDeColisionCT_1_2]]
- [[vw_RangosMaestrasFull]]
- [[vw_RangosVersionesMaxSub]]

```sql





CREATE VIEW [dbo].[vw_JefesDeTallerFabricaDeColisionCT_1]
AS
SELECT        VEHICULOS_ENTREGADOS.Ano_Periodo, VEHICULOS_ENTREGADOS.Mes_Periodo, VEHICULOS_ENTREGADOS.CodigoEmpleado, VEHICULOS_ENTREGADOS.IdRangoMaestra, VEHICULOS_ENTREGADOS.IdRangoVersionMax, VEHICULOS_ENTREGADOS.CantidadVehiculos, dbo.vw_RangosMaestrasFull.IdComisionModeloSub, 
                         dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio, dbo.vw_RangosMaestrasFull.CodigoMarcaGrupo, dbo.vw_RangosMaestrasFull.MarcaGrupo, dbo.vw_RangosMaestrasFull.IdRangoVersion, 
                         dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, dbo.vw_RangosMaestrasFull.Valor
FROM            (SELECT        dbo.vw_JefesDeTallerFabricaDeColisionCT_1_2.Ano_Periodo, dbo.vw_JefesDeTallerFabricaDeColisionCT_1_2.Mes_Periodo, dbo.vw_JefesDeTallerFabricaDeColisionCT_1_2.CodigoEmpleado, EMPLEADO.IdRangoMaestra, EMPLEADO.IdRangoVersionMax,
                                                     EMPLEADO.IdComisionModeloSub, EMPLEADO.IdComisionModeloSubCriterio, dbo.vw_JefesDeTallerFabricaDeColisionCT_1_2.CantidadVehiculos
                          FROM            (SELECT        dbo.Empleados.CodigoEmpleado, dbo.vw_RangosVersionesMaxSub.IdRangoMaestra, dbo.vw_RangosVersionesMaxSub.IdRangoVersionMax, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub, 
                                                                              dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
                                                    FROM            dbo.EmpleadosRangosMaestras INNER JOIN
                                                                              dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado INNER JOIN
                                                                              dbo.vw_RangosVersionesMaxSub ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMaxSub.IdRangoMaestra
                                                    WHERE        (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub = 37) AND (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 49)) AS EMPLEADO LEFT OUTER JOIN
                                                    dbo.vw_JefesDeTallerFabricaDeColisionCT_1_2 ON EMPLEADO.CodigoEmpleado = dbo.vw_JefesDeTallerFabricaDeColisionCT_1_2.CodigoEmpleado) AS VEHICULOS_ENTREGADOS LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON VEHICULOS_ENTREGADOS.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 37) AND (dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio = 49) AND (dbo.vw_RangosMaestrasFull.Desde < VEHICULOS_ENTREGADOS.CantidadVehiculos) AND 
                         (dbo.vw_RangosMaestrasFull.Hasta >= VEHICULOS_ENTREGADOS.CantidadVehiculos)







```
