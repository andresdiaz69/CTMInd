# View: vw_RepuestosBolsaCT_6_Full

## Usa los objetos:
- [[ExogenasPuntosEmpleadosSeccion]]
- [[vw_RepuestosBolsaCT_5_Full]]

```sql

CREATE VIEW [dbo].[vw_RepuestosBolsaCT_6_Full]
AS
SELECT        dbo.ExogenasPuntosEmpleadosSeccion.CodigoEmpleado, dbo.vw_RepuestosBolsaCT_5_Full.Ano_Periodo, dbo.vw_RepuestosBolsaCT_5_Full.Mes_Periodo, dbo.vw_RepuestosBolsaCT_5_Full.CodigoEmpresa, 
                         dbo.vw_RepuestosBolsaCT_5_Full.CodigoSede, dbo.vw_RepuestosBolsaCT_5_Full.NombreSede, dbo.vw_RepuestosBolsaCT_5_Full.CodigoCentro, dbo.vw_RepuestosBolsaCT_5_Full.NombreCentro, dbo.vw_RepuestosBolsaCT_5_Full.CodigoSeccion, 
                         dbo.vw_RepuestosBolsaCT_5_Full.Seccion, dbo.vw_RepuestosBolsaCT_5_Full.BolsaPorcentaje, dbo.vw_RepuestosBolsaCT_5_Full.BolsaPuntos, dbo.vw_RepuestosBolsaCT_5_Full.ValorNetoMostrador, 
                         dbo.vw_RepuestosBolsaCT_5_Full.ValorNetoTaller, dbo.vw_RepuestosBolsaCT_5_Full.ValorBaseBolsa, dbo.vw_RepuestosBolsaCT_5_Full.ValorDelPuntoBolsa, ISNULL(dbo.ExogenasPuntosEmpleadosSeccion.PuntosBolsa, 0) 
                         AS PuntosAsignadosEmpleado
FROM            dbo.vw_RepuestosBolsaCT_5_Full LEFT OUTER JOIN
                         dbo.ExogenasPuntosEmpleadosSeccion ON dbo.vw_RepuestosBolsaCT_5_Full.CodigoCentro = dbo.ExogenasPuntosEmpleadosSeccion.CodigoCentro AND 
                         dbo.vw_RepuestosBolsaCT_5_Full.CodigoSeccion = dbo.ExogenasPuntosEmpleadosSeccion.CodigoSeccion


```
