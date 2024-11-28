# View: vw_ComercialVNJefesBonoPorObjetivos_2

## Usa los objetos:
- [[EmpleadosRangosMaestras]]
- [[vw_ComercialVNJefesBonoPorObjetivos_1]]
- [[vw_RangosVersionesMaxSub]]

```sql

CREATE VIEW [dbo].[vw_ComercialVNJefesBonoPorObjetivos_2]
AS
SELECT        dbo.vw_ComercialVNJefesBonoPorObjetivos_1.*, dbo.EmpleadosRangosMaestras.IdRangoMaestra, dbo.vw_RangosVersionesMaxSub.IdRangoVersionMax
FROM            dbo.vw_RangosVersionesMaxSub INNER JOIN
                         dbo.EmpleadosRangosMaestras ON dbo.vw_RangosVersionesMaxSub.IdRangoMaestra = dbo.EmpleadosRangosMaestras.IdRangoMaestra LEFT OUTER JOIN
                         dbo.vw_ComercialVNJefesBonoPorObjetivos_1 ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.vw_ComercialVNJefesBonoPorObjetivos_1.CodigoEmpleado
WHERE        (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub = 30)



```
