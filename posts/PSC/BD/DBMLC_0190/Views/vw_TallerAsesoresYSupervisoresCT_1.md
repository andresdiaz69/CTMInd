# View: vw_TallerAsesoresYSupervisoresCT_1

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]
- [[Empleados]]

```sql

CREATE VIEW [dbo].[vw_TallerAsesoresYSupervisoresCT_1]
AS
SELECT        dbo.ComisionesSpigaTallerPorOT.Ano_Periodo, dbo.ComisionesSpigaTallerPorOT.Mes_Periodo, 
                         CASE WHEN ComisionesSpigaTallerPorOT.CodigoEmpresa <> Empleados.CodigoEmpresa THEN Empleados.CodigoEmpresa ELSE ComisionesSpigaTallerPorOT.CodigoEmpresa END AS CodigoEmpresa, 
                         dbo.ComisionesSpigaTallerPorOT.CodigoEmpresa AS CodigoEmpresaOT, dbo.Empleados.CodigoEmpresa AS CodigoEmpresaEmpleado, dbo.ComisionesSpigaTallerPorOT.CedulaAsesorServicioResponsable
FROM            dbo.ComisionesSpigaTallerPorOT LEFT OUTER JOIN
                         dbo.Empleados ON dbo.ComisionesSpigaTallerPorOT.CedulaAsesorServicioResponsable = dbo.Empleados.CodigoEmpleado
GROUP BY dbo.ComisionesSpigaTallerPorOT.Ano_Periodo, dbo.ComisionesSpigaTallerPorOT.Mes_Periodo, dbo.ComisionesSpigaTallerPorOT.CodigoEmpresa, dbo.ComisionesSpigaTallerPorOT.CedulaAsesorServicioResponsable, 
                         CASE WHEN ComisionesSpigaTallerPorOT.CodigoEmpresa <> Empleados.CodigoEmpresa THEN Empleados.CodigoEmpresa ELSE ComisionesSpigaTallerPorOT.CodigoEmpresa END, dbo.Empleados.CodigoEmpresa


```
