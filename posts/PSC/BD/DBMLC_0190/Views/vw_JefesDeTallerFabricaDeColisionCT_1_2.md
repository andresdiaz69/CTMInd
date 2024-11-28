# View: vw_JefesDeTallerFabricaDeColisionCT_1_2

## Usa los objetos:
- [[vw_EmpleadosRangosMaestras]]
- [[vw_JefesDeTallerFabricaDeColisionCT_1_1]]

```sql

create VIEW [dbo].[vw_JefesDeTallerFabricaDeColisionCT_1_2]
AS
SELECT        CANTIDAD.Ano_Periodo, CANTIDAD.Mes_Periodo, EMPLEADOS_CRITERIO.CodigoEmpleado, CANTIDAD.CantidadVehiculos
FROM            (SELECT        Ano_Periodo, Mes_Periodo, cantidad AS CantidadVehiculos
                          FROM            dbo.vw_JefesDeTallerFabricaDeColisionCT_1_1) AS CANTIDAD CROSS JOIN
                             (SELECT        CodigoEmpleado
                               FROM            dbo.vw_EmpleadosRangosMaestras
                               WHERE        (IdComisionModeloSub = 37) AND (IdComisionModeloSubCriterio = 49)) AS EMPLEADOS_CRITERIO

```
