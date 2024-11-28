# View: vw_EmpleadosRangosMaestrasProvisiones

## Usa los objetos:
- [[EmpleadosActivos]]
- [[vw_EmpleadosRangosMaestras]]
- [[vw_LiquidacionesProvisiones]]

```sql

CREATE VIEW [dbo].[vw_EmpleadosRangosMaestrasProvisiones]
AS
SELECT        dbo.vw_EmpleadosRangosMaestras.CodigoEmpleado, dbo.vw_EmpleadosRangosMaestras.CodigoEmpresa, dbo.vw_EmpleadosRangosMaestras.NombreEmpresa, dbo.vw_EmpleadosRangosMaestras.CodigoCentro, 
                         dbo.vw_EmpleadosRangosMaestras.NombreCentro, dbo.vw_EmpleadosRangosMaestras.cod_marca, dbo.vw_EmpleadosRangosMaestras.nombre_marca, dbo.vw_EmpleadosRangosMaestras.Nombres, 
                         dbo.vw_EmpleadosRangosMaestras.Apellido1, dbo.vw_EmpleadosRangosMaestras.Apellido2, dbo.vw_EmpleadosRangosMaestras.Empleado, dbo.vw_EmpleadosRangosMaestras.CodigoCargo, 
                         dbo.vw_EmpleadosRangosMaestras.NombreCargo, 
						 
						 LTRIM(RTRIM(dbo.EmpleadosActivos.codigo_seccion)) AS codigo_seccion, dbo.EmpleadosActivos.nombre_seccion, 
						 
						 dbo.vw_EmpleadosRangosMaestras.FechaRetiro, 
                         dbo.vw_EmpleadosRangosMaestras.IdRangoMaestra, dbo.vw_EmpleadosRangosMaestras.NombreMaestra, dbo.vw_EmpleadosRangosMaestras.CodigoMarcaGrupo, dbo.vw_EmpleadosRangosMaestras.MarcaGrupo, 
                         dbo.vw_EmpleadosRangosMaestras.IdComisionModeloSub, dbo.vw_EmpleadosRangosMaestras.NombreModeloSub, dbo.vw_EmpleadosRangosMaestras.IdComisionModelo, 
                         dbo.vw_EmpleadosRangosMaestras.NombreModelo, dbo.vw_EmpleadosRangosMaestras.NombreModeloSubCompleto, dbo.vw_LiquidacionesProvisiones.Ano_Periodo, dbo.vw_LiquidacionesProvisiones.Mes_Periodo, 
                         dbo.vw_LiquidacionesProvisiones.Comision
FROM            dbo.EmpleadosActivos RIGHT OUTER JOIN
                         dbo.vw_LiquidacionesProvisiones ON dbo.EmpleadosActivos.CodigoEmpleado = dbo.vw_LiquidacionesProvisiones.CodigoEmpleado AND 
                         dbo.EmpleadosActivos.Ano_Periodo = dbo.vw_LiquidacionesProvisiones.Ano_Periodo AND dbo.EmpleadosActivos.Mes_Periodo = dbo.vw_LiquidacionesProvisiones.Mes_Periodo LEFT OUTER JOIN
                         dbo.vw_EmpleadosRangosMaestras ON dbo.vw_LiquidacionesProvisiones.IdComisionModeloSub = dbo.vw_EmpleadosRangosMaestras.IdComisionModeloSub AND 
                         dbo.vw_LiquidacionesProvisiones.CodigoEmpleado = dbo.vw_EmpleadosRangosMaestras.CodigoEmpleado

```
