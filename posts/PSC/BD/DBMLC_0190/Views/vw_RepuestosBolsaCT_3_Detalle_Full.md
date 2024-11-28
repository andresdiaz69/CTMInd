# View: vw_RepuestosBolsaCT_3_Detalle_Full

## Usa los objetos:
- [[Centros]]
- [[ExogenasPuntosEmpleadosSeccion]]
- [[vw_RepuestosBolsaCT_3_Full]]

```sql

CREATE VIEW [dbo].[vw_RepuestosBolsaCT_3_Detalle_Full]
AS
SELECT        dbo.vw_RepuestosBolsaCT_3_Full.Ano_Periodo, dbo.vw_RepuestosBolsaCT_3_Full.Mes_Periodo, dbo.vw_RepuestosBolsaCT_3_Full.CodigoEmpresa, dbo.vw_RepuestosBolsaCT_3_Full.CodigoSede, dbo.vw_RepuestosBolsaCT_3_Full.NombreSede, 
                         dbo.vw_RepuestosBolsaCT_3_Full.CodigoCentro, dbo.vw_RepuestosBolsaCT_3_Full.NombreCentro, dbo.vw_RepuestosBolsaCT_3_Full.CodigoSeccion, dbo.vw_RepuestosBolsaCT_3_Full.Seccion, dbo.vw_RepuestosBolsaCT_3_Full.BolsaPorcentaje, 
                         dbo.vw_RepuestosBolsaCT_3_Full.BolsaPuntos, dbo.vw_RepuestosBolsaCT_3_Full.ValorNetoTaller, EMPLEADOS.CodigoEmpleado
FROM            dbo.vw_RepuestosBolsaCT_3_Full LEFT OUTER JOIN
                             (SELECT        ExogenasPuntosEmpleadosSeccion_1.CodigoEmpleado, dbo.Centros.CodigoSede, ExogenasPuntosEmpleadosSeccion_1.CodigoCentro, ExogenasPuntosEmpleadosSeccion_1.CodigoSeccion, 
                                                         ExogenasPuntosEmpleadosSeccion_1.PuntosPIR, ExogenasPuntosEmpleadosSeccion_1.PuntosBolsa, ExogenasPuntosEmpleadosSeccion_1.UserIdCreo, ExogenasPuntosEmpleadosSeccion_1.FechaCreacion, 
                                                         ExogenasPuntosEmpleadosSeccion_1.UserIdModifico, ExogenasPuntosEmpleadosSeccion_1.FechaModificacion
                               FROM            dbo.ExogenasPuntosEmpleadosSeccion AS ExogenasPuntosEmpleadosSeccion_1 INNER JOIN
                                                         dbo.Centros ON ExogenasPuntosEmpleadosSeccion_1.CodigoCentro = dbo.Centros.CodigoCentro
                               WHERE        (ExogenasPuntosEmpleadosSeccion_1.PuntosBolsa > 0)) AS EMPLEADOS ON dbo.vw_RepuestosBolsaCT_3_Full.CodigoSeccion = EMPLEADOS.CodigoSeccion AND 
                         dbo.vw_RepuestosBolsaCT_3_Full.CodigoCentro = EMPLEADOS.CodigoCentro AND dbo.vw_RepuestosBolsaCT_3_Full.CodigoSede = EMPLEADOS.CodigoSede


```
