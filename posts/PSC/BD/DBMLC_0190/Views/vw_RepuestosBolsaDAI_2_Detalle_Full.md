# View: vw_RepuestosBolsaDAI_2_Detalle_Full

## Usa los objetos:
- [[Centros]]
- [[ExogenasPuntosEmpleadosSeccion]]
- [[vw_RepuestosBolsaDAI_2_Full]]

```sql


CREATE VIEW [dbo].[vw_RepuestosBolsaDAI_2_Detalle_Full]
AS
SELECT        dbo.vw_RepuestosBolsaDAI_2_Full.Ano_Periodo, dbo.vw_RepuestosBolsaDAI_2_Full.Mes_Periodo, dbo.vw_RepuestosBolsaDAI_2_Full.CodigoEmpresa, dbo.vw_RepuestosBolsaDAI_2_Full.CodigoSede, dbo.vw_RepuestosBolsaDAI_2_Full.NombreSede, 
                         dbo.vw_RepuestosBolsaDAI_2_Full.CodigoCentro, dbo.vw_RepuestosBolsaDAI_2_Full.NombreCentro, dbo.vw_RepuestosBolsaDAI_2_Full.CodigoSeccion, dbo.vw_RepuestosBolsaDAI_2_Full.Seccion, dbo.vw_RepuestosBolsaDAI_2_Full.BolsaPorcentaje, 
                         dbo.vw_RepuestosBolsaDAI_2_Full.TotalFacturas, dbo.vw_RepuestosBolsaDAI_2_Full.ImporteEfecto, dbo.vw_RepuestosBolsaDAI_2_Full.PorcentajeRecaudo, 
                         dbo.vw_RepuestosBolsaDAI_2_Full.ValorNetoMostrador, EMPLEADOS.CodigoEmpleado
FROM            dbo.vw_RepuestosBolsaDAI_2_Full LEFT OUTER JOIN
                             (SELECT        ExogenasPuntosEmpleadosSeccion_1.CodigoEmpleado, dbo.Centros.CodigoSede, ExogenasPuntosEmpleadosSeccion_1.CodigoCentro, ExogenasPuntosEmpleadosSeccion_1.CodigoSeccion, 
                                                         ExogenasPuntosEmpleadosSeccion_1.PuntosPIR, ExogenasPuntosEmpleadosSeccion_1.PuntosBolsa, ExogenasPuntosEmpleadosSeccion_1.UserIdCreo, ExogenasPuntosEmpleadosSeccion_1.FechaCreacion, 
                                                         ExogenasPuntosEmpleadosSeccion_1.UserIdModifico, ExogenasPuntosEmpleadosSeccion_1.FechaModificacion
                               FROM            dbo.ExogenasPuntosEmpleadosSeccion AS ExogenasPuntosEmpleadosSeccion_1 INNER JOIN
                                                         dbo.Centros ON ExogenasPuntosEmpleadosSeccion_1.CodigoCentro = dbo.Centros.CodigoCentro
                               WHERE        (ExogenasPuntosEmpleadosSeccion_1.PuntosBolsa > 0)) AS EMPLEADOS ON dbo.vw_RepuestosBolsaDAI_2_Full.CodigoSeccion = EMPLEADOS.CodigoSeccion AND 
                         dbo.vw_RepuestosBolsaDAI_2_Full.CodigoCentro = EMPLEADOS.CodigoCentro AND dbo.vw_RepuestosBolsaDAI_2_Full.CodigoSede = EMPLEADOS.CodigoSede



```
