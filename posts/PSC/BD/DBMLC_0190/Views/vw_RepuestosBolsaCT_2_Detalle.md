# View: vw_RepuestosBolsaCT_2_Detalle

## Usa los objetos:
- [[Centros]]
- [[ExogenasPuntosEmpleadosSeccion]]
- [[vw_RepuestosBolsaCT_2]]

```sql
CREATE VIEW [dbo].[vw_RepuestosBolsaCT_2_Detalle]
AS
SELECT        dbo.vw_RepuestosBolsaCT_2.Ano_Periodo, dbo.vw_RepuestosBolsaCT_2.Mes_Periodo, dbo.vw_RepuestosBolsaCT_2.CodigoEmpresa, dbo.vw_RepuestosBolsaCT_2.CodigoSede, dbo.vw_RepuestosBolsaCT_2.NombreSede, 
                         dbo.vw_RepuestosBolsaCT_2.CodigoCentro, dbo.vw_RepuestosBolsaCT_2.NombreCentro, dbo.vw_RepuestosBolsaCT_2.CodigoSeccion, dbo.vw_RepuestosBolsaCT_2.Seccion, dbo.vw_RepuestosBolsaCT_2.BolsaPorcentaje, 
                         dbo.vw_RepuestosBolsaCT_2.BolsaPuntos, dbo.vw_RepuestosBolsaCT_2.TotalFacturas, dbo.vw_RepuestosBolsaCT_2.ImporteEfecto, dbo.vw_RepuestosBolsaCT_2.PorcentajeRecaudo, 
                         dbo.vw_RepuestosBolsaCT_2.ValorNetoMostrador, EMPLEADOS.CodigoEmpleado
FROM            dbo.vw_RepuestosBolsaCT_2 LEFT OUTER JOIN
                             (SELECT        ExogenasPuntosEmpleadosSeccion_1.CodigoEmpleado, dbo.Centros.CodigoSede, ExogenasPuntosEmpleadosSeccion_1.CodigoCentro, ExogenasPuntosEmpleadosSeccion_1.CodigoSeccion, 
                                                         ExogenasPuntosEmpleadosSeccion_1.PuntosPIR, ExogenasPuntosEmpleadosSeccion_1.PuntosBolsa, ExogenasPuntosEmpleadosSeccion_1.UserIdCreo, ExogenasPuntosEmpleadosSeccion_1.FechaCreacion, 
                                                         ExogenasPuntosEmpleadosSeccion_1.UserIdModifico, ExogenasPuntosEmpleadosSeccion_1.FechaModificacion
                               FROM            dbo.ExogenasPuntosEmpleadosSeccion AS ExogenasPuntosEmpleadosSeccion_1 INNER JOIN
                                                         dbo.Centros ON ExogenasPuntosEmpleadosSeccion_1.CodigoCentro = dbo.Centros.CodigoCentro
                               WHERE        (ExogenasPuntosEmpleadosSeccion_1.PuntosBolsa > 0)) AS EMPLEADOS ON dbo.vw_RepuestosBolsaCT_2.CodigoSeccion = EMPLEADOS.CodigoSeccion AND 
                         dbo.vw_RepuestosBolsaCT_2.CodigoCentro = EMPLEADOS.CodigoCentro AND dbo.vw_RepuestosBolsaCT_2.CodigoSede = EMPLEADOS.CodigoSede


```
