# View: vw_RepuestosBolsaCT_3_Detalle

## Usa los objetos:
- [[Centros]]
- [[ExogenasPuntosEmpleadosSeccion]]
- [[vw_RepuestosBolsaCT_3]]

```sql
CREATE VIEW [dbo].[vw_RepuestosBolsaCT_3_Detalle]
AS
SELECT        dbo.vw_RepuestosBolsaCT_3.Ano_Periodo, dbo.vw_RepuestosBolsaCT_3.Mes_Periodo, dbo.vw_RepuestosBolsaCT_3.CodigoEmpresa, dbo.vw_RepuestosBolsaCT_3.CodigoSede, dbo.vw_RepuestosBolsaCT_3.NombreSede, 
                         dbo.vw_RepuestosBolsaCT_3.CodigoCentro, dbo.vw_RepuestosBolsaCT_3.NombreCentro, dbo.vw_RepuestosBolsaCT_3.CodigoSeccion, dbo.vw_RepuestosBolsaCT_3.Seccion, dbo.vw_RepuestosBolsaCT_3.BolsaPorcentaje, 
                         dbo.vw_RepuestosBolsaCT_3.BolsaPuntos, dbo.vw_RepuestosBolsaCT_3.ValorNetoTaller, EMPLEADOS.CodigoEmpleado
FROM            dbo.vw_RepuestosBolsaCT_3 LEFT OUTER JOIN
                             (SELECT        ExogenasPuntosEmpleadosSeccion_1.CodigoEmpleado, dbo.Centros.CodigoSede, ExogenasPuntosEmpleadosSeccion_1.CodigoCentro, ExogenasPuntosEmpleadosSeccion_1.CodigoSeccion, 
                                                         ExogenasPuntosEmpleadosSeccion_1.PuntosPIR, ExogenasPuntosEmpleadosSeccion_1.PuntosBolsa, ExogenasPuntosEmpleadosSeccion_1.UserIdCreo, ExogenasPuntosEmpleadosSeccion_1.FechaCreacion, 
                                                         ExogenasPuntosEmpleadosSeccion_1.UserIdModifico, ExogenasPuntosEmpleadosSeccion_1.FechaModificacion
                               FROM            dbo.ExogenasPuntosEmpleadosSeccion AS ExogenasPuntosEmpleadosSeccion_1 INNER JOIN
                                                         dbo.Centros ON ExogenasPuntosEmpleadosSeccion_1.CodigoCentro = dbo.Centros.CodigoCentro
                               WHERE        (ExogenasPuntosEmpleadosSeccion_1.PuntosBolsa > 0)) AS EMPLEADOS ON dbo.vw_RepuestosBolsaCT_3.CodigoSeccion = EMPLEADOS.CodigoSeccion AND 
                         dbo.vw_RepuestosBolsaCT_3.CodigoCentro = EMPLEADOS.CodigoCentro AND dbo.vw_RepuestosBolsaCT_3.CodigoSede = EMPLEADOS.CodigoSede


```
