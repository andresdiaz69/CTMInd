# View: vw_TallerTecnicosV3_0_Detalle

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]
- [[Empleados]]

```sql









CREATE VIEW [dbo].[vw_TallerTecnicosV3_0_Detalle]
AS
SELECT DISTINCT 
                         ComisionesSpigaTallerPorOT.Ano_Periodo, ComisionesSpigaTallerPorOT.Mes_Periodo, 
                         CASE WHEN ComisionesSpigaTallerPorOT.CodigoEmpresa <> Empleados.CodigoEmpresa THEN Empleados.CodigoEmpresa ELSE ComisionesSpigaTallerPorOT.CodigoEmpresa END AS CodigoEmpresa, 
                         ComisionesSpigaTallerPorOT.CodigoEmpresa AS CodigoEmpresaOT, Empleados.CodigoEmpresa AS CodigoEmpresaEmpleado, ComisionesSpigaTallerPorOT.NumOT, ComisionesSpigaTallerPorOT.descripcion, 
                         ComisionesSpigaTallerPorOT.Centro, ComisionesSpigaTallerPorOT.Seccion, ComisionesSpigaTallerPorOT.CedulaOperario, SUM(ComisionesSpigaTallerPorOT.UnidadesVendidas) AS UnidadesVendidas, 
                         Empleados.CodigoEmpleado, Empleados.Nombres + N' ' + Empleados.Apellido1 + N' ' + Empleados.Apellido2 AS Empleado, Empleados.FechaRetiro
FROM            ComisionesSpigaTallerPorOT LEFT OUTER JOIN
                         Empleados ON ComisionesSpigaTallerPorOT.CedulaOperario = Empleados.CodigoEmpleado
WHERE        (ComisionesSpigaTallerPorOT.TipoOperacion = 'MO') AND (ComisionesSpigaTallerPorOT.FkTarifaTaller IN ('0', '1', '2', '3'))
GROUP BY ComisionesSpigaTallerPorOT.Ano_Periodo, ComisionesSpigaTallerPorOT.Mes_Periodo, ComisionesSpigaTallerPorOT.CodigoEmpresa, ComisionesSpigaTallerPorOT.CedulaOperario, Empleados.CodigoEmpleado, 
                         Empleados.Nombres + N' ' + Empleados.Apellido1 + N' ' + Empleados.Apellido2, Empleados.FechaRetiro, ComisionesSpigaTallerPorOT.NumOT, ComisionesSpigaTallerPorOT.descripcion, ComisionesSpigaTallerPorOT.Centro, 
                         ComisionesSpigaTallerPorOT.Seccion, Empleados.CodigoEmpresa

       




```
