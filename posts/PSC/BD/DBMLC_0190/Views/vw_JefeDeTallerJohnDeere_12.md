# View: vw_JefeDeTallerJohnDeere_12

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[ExogenasEmpleadosCentrosPago]]
- [[vw_RangosVersionesMaxSub]]

```sql
CREATE VIEW [dbo].[vw_JefeDeTallerJohnDeere_12]
AS
SELECT        EMPLEADOS.CodigoEmpleado, EMPLEADOS.IdRangoMaestra, EMPLEADOS.IdRangoVersionMax, EMPLEADOS.IdComisionModeloSub, EMPLEADOS.IdComisionModeloSubCriterio, CENTROS.CodigoCentro
FROM            (SELECT        Empleados_1.CodigoEmpleado, dbo.vw_RangosVersionesMaxSub.IdRangoMaestra, dbo.vw_RangosVersionesMaxSub.IdRangoVersionMax, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub, 
                                                    dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
                          FROM            dbo.EmpleadosRangosMaestras INNER JOIN
                                                    dbo.Empleados AS Empleados_1 ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = Empleados_1.CodigoEmpleado INNER JOIN
                                                    dbo.vw_RangosVersionesMaxSub ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMaxSub.IdRangoMaestra
                          WHERE        (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub = 41) AND (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 64)) AS EMPLEADOS LEFT OUTER JOIN
                             (SELECT        CodigoEmpleado, CodigoCentro, Comentarios, UserIdCreo, FechaCreacion, UserIdModifico, FechaModificacion
                               FROM            dbo.ExogenasEmpleadosCentrosPago) AS CENTROS ON EMPLEADOS.CodigoEmpleado = CENTROS.CodigoEmpleado
WHERE        (CENTROS.CodigoCentro IS NOT NULL)

```
