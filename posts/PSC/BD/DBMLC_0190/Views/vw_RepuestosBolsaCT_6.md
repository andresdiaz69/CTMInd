# View: vw_RepuestosBolsaCT_6

## Usa los objetos:
- [[ExogenasPuntosEmpleadosSeccion]]
- [[vw_RepuestosBolsaCT_5]]

```sql
CREATE VIEW [dbo].[vw_RepuestosBolsaCT_6]
AS
SELECT        dbo.ExogenasPuntosEmpleadosSeccion.CodigoEmpleado, dbo.vw_RepuestosBolsaCT_5.Ano_Periodo, dbo.vw_RepuestosBolsaCT_5.Mes_Periodo, dbo.vw_RepuestosBolsaCT_5.CodigoEmpresa, 
                         dbo.vw_RepuestosBolsaCT_5.CodigoSede, dbo.vw_RepuestosBolsaCT_5.NombreSede, dbo.vw_RepuestosBolsaCT_5.CodigoCentro, dbo.vw_RepuestosBolsaCT_5.NombreCentro, dbo.vw_RepuestosBolsaCT_5.CodigoSeccion, 
                         dbo.vw_RepuestosBolsaCT_5.Seccion, dbo.vw_RepuestosBolsaCT_5.BolsaPorcentaje, dbo.vw_RepuestosBolsaCT_5.BolsaPuntos, dbo.vw_RepuestosBolsaCT_5.ValorNetoMostrador, 
                         dbo.vw_RepuestosBolsaCT_5.ValorNetoTaller, dbo.vw_RepuestosBolsaCT_5.ValorBaseBolsa, dbo.vw_RepuestosBolsaCT_5.ValorDelPuntoBolsa, ISNULL(dbo.ExogenasPuntosEmpleadosSeccion.PuntosBolsa, 0) 
                         AS PuntosAsignadosEmpleado
FROM            dbo.vw_RepuestosBolsaCT_5 LEFT OUTER JOIN
                         dbo.ExogenasPuntosEmpleadosSeccion ON dbo.vw_RepuestosBolsaCT_5.CodigoCentro = dbo.ExogenasPuntosEmpleadosSeccion.CodigoCentro AND 
                         dbo.vw_RepuestosBolsaCT_5.CodigoSeccion = dbo.ExogenasPuntosEmpleadosSeccion.CodigoSeccion


```
