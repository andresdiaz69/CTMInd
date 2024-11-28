# View: vw_EmpleadosRangosMaestras

## Usa los objetos:
- [[Cargos]]
- [[Centros]]
- [[ComisionesModelosSub]]
- [[ComisionesModelosSubCriterios]]
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[Empresas]]
- [[Profiles]]
- [[RangosMaestras]]
- [[VehiculosMarcasGrupos]]
- [[vw_ComisionesModelosSub]]

```sql
CREATE VIEW [dbo].[vw_EmpleadosRangosMaestras]
AS
SELECT        dbo.Empleados.CodigoEmpleado, dbo.Empresas.CodigoEmpresa, dbo.Empresas.NombreEmpresa, dbo.Centros.CodigoCentro, dbo.Centros.NombreCentro, dbo.Empleados.cod_marca, dbo.Empleados.nombre_marca, 
                         dbo.Empleados.Nombres, dbo.Empleados.Apellido1, dbo.Empleados.Apellido2, ISNULL(dbo.Empleados.Apellido1, N'') + N' ' + ISNULL(dbo.Empleados.Apellido2, N'') + N' ' + ISNULL(dbo.Empleados.Nombres, N'') AS Empleado, 
                         dbo.Cargos.CodigoCargo, dbo.Cargos.NombreCargo, dbo.Empleados.FechaRetiro, dbo.RangosMaestras.IdRangoMaestra, dbo.RangosMaestras.NombreMaestra, dbo.RangosMaestras.CodigoMarcaGrupo, 
                         dbo.VehiculosMarcasGrupos.MarcaGrupo, dbo.ComisionesModelosSub.IdComisionModeloSub, dbo.ComisionesModelosSub.NombreModeloSub, dbo.vw_ComisionesModelosSub.IdComisionModelo, 
                         dbo.vw_ComisionesModelosSub.NombreModelo, dbo.vw_ComisionesModelosSub.NombreModeloSubCompleto, dbo.ComisionesModelosSubCriterios.IdComisionModeloSubCriterio, 
                         dbo.ComisionesModelosSubCriterios.NombreModeloSubCriterio, dbo.EmpleadosRangosMaestras.FechaVencimiento, dbo.EmpleadosRangosMaestras.UserIdModifico, 
                         dbo.Profiles.Nombres + N' ' + dbo.Profiles.Apellidos AS UsuarioModifico, dbo.EmpleadosRangosMaestras.FechaModificacion, 
						 
						 dbo.ComisionesModelosSub.CodigoEmpresa AS CodigoEmpresa_ModeloSub,

						 CASE 
						 WHEN dbo.ComisionesModelosSub.CodigoEmpresa IS NULL THEN '' -- NO TIENE MAESTRA
						 WHEN dbo.Empresas.CodigoEmpresa <> dbo.ComisionesModelosSub.CodigoEmpresa THEN 'VALIDAR' -- LA EMPRESA DEL EMPLEADO NO CONCUERDA CON LA DE LA MAESTRA
						 ELSE '' -- LA EMPRESA DEL EMPLEADO CONCUERDA CON LA DE LA MAESTRA
						 END AS ValidacionEmpresa

FROM            dbo.Profiles INNER JOIN
                         dbo.vw_ComisionesModelosSub INNER JOIN
                         dbo.EmpleadosRangosMaestras INNER JOIN
                         dbo.RangosMaestras ON dbo.RangosMaestras.IdRangoMaestra = dbo.EmpleadosRangosMaestras.IdRangoMaestra INNER JOIN
                         dbo.ComisionesModelosSub ON dbo.ComisionesModelosSub.IdComisionModeloSub = dbo.RangosMaestras.IdComisionModeloSub ON 
                         dbo.vw_ComisionesModelosSub.IdComisionModeloSub = dbo.ComisionesModelosSub.IdComisionModeloSub INNER JOIN
                         dbo.VehiculosMarcasGrupos ON dbo.RangosMaestras.CodigoMarcaGrupo = dbo.VehiculosMarcasGrupos.CodigoMarcaGrupo ON dbo.Profiles.UserId = dbo.EmpleadosRangosMaestras.UserIdModifico INNER JOIN
                         dbo.ComisionesModelosSubCriterios ON dbo.RangosMaestras.IdComisionModeloSubCriterio = dbo.ComisionesModelosSubCriterios.IdComisionModeloSubCriterio RIGHT OUTER JOIN
                         dbo.Centros RIGHT OUTER JOIN
                         dbo.Empresas RIGHT OUTER JOIN
                         dbo.Empleados ON dbo.Empresas.CodigoEmpresa = dbo.Empleados.CodigoEmpresa ON dbo.Centros.CodigoCentro = dbo.Empleados.CodigoCentro ON 
                         dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado LEFT OUTER JOIN
                         dbo.Cargos ON dbo.Empleados.CodigoCargo = dbo.Cargos.CodigoCargo

```
