# View: vw_TallerTecnicos_1_Detalle

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[vw_RangosVersionesMax]]

```sql

CREATE VIEW [dbo].[vw_TallerTecnicos_1_Detalle]
AS
SELECT        dbo.ComisionesSpigaTallerPorOT.Ano_Periodo, dbo.ComisionesSpigaTallerPorOT.Mes_Periodo, 
                         CASE WHEN ComisionesSpigaTallerPorOT.CodigoEmpresa <> Empleados.CodigoEmpresa THEN Empleados.CodigoEmpresa ELSE ComisionesSpigaTallerPorOT.CodigoEmpresa END AS CodigoEmpresa, 
                         dbo.ComisionesSpigaTallerPorOT.CodigoEmpresa AS CodigoEmpresaOT, dbo.Empleados.CodigoEmpresa AS CodigoEmpresaEmpleado, dbo.ComisionesSpigaTallerPorOT.NumOT, dbo.ComisionesSpigaTallerPorOT.descripcion, 
                         dbo.ComisionesSpigaTallerPorOT.Centro, dbo.ComisionesSpigaTallerPorOT.Seccion, dbo.ComisionesSpigaTallerPorOT.CedulaOperario, SUM(dbo.ComisionesSpigaTallerPorOT.UnidadesVendidas) AS UnidadesVendidas, 
                         dbo.Empleados.CodigoEmpleado, dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS Empleado, dbo.Empleados.FechaRetiro, dbo.EmpleadosRangosMaestras.IdRangoMaestra, 
                         dbo.vw_RangosVersionesMax.IdRangoVersionMax
FROM            dbo.vw_RangosVersionesMax INNER JOIN
                         dbo.EmpleadosRangosMaestras ON dbo.vw_RangosVersionesMax.IdRangoMaestra = dbo.EmpleadosRangosMaestras.IdRangoMaestra RIGHT OUTER JOIN
                         dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado RIGHT OUTER JOIN
                         dbo.ComisionesSpigaTallerPorOT ON dbo.Empleados.CodigoEmpleado = dbo.ComisionesSpigaTallerPorOT.CedulaOperario
WHERE        (dbo.ComisionesSpigaTallerPorOT.TipoOperacion = 'MO')
GROUP BY dbo.ComisionesSpigaTallerPorOT.Ano_Periodo, dbo.ComisionesSpigaTallerPorOT.Mes_Periodo, dbo.ComisionesSpigaTallerPorOT.CodigoEmpresa, dbo.ComisionesSpigaTallerPorOT.CedulaOperario, 
                         dbo.Empleados.CodigoEmpleado, dbo.vw_RangosVersionesMax.IdRangoVersionMax, dbo.EmpleadosRangosMaestras.IdRangoMaestra, 
                         dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2, dbo.Empleados.FechaRetiro, dbo.ComisionesSpigaTallerPorOT.NumOT, dbo.ComisionesSpigaTallerPorOT.descripcion, 
                         dbo.ComisionesSpigaTallerPorOT.Centro, dbo.ComisionesSpigaTallerPorOT.Seccion, dbo.Empleados.CodigoEmpresa


```
