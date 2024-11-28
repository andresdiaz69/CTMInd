# View: vw_RepuestosBolsaDAI_5_Full

## Usa los objetos:
- [[ExogenasPuntosEmpleadosSeccion]]
- [[vw_RepuestosBolsaDAI_4_Full]]

```sql

CREATE VIEW [dbo].[vw_RepuestosBolsaDAI_5_Full]
AS
SELECT        dbo.ExogenasPuntosEmpleadosSeccion.CodigoEmpleado, dbo.vw_RepuestosBolsaDAI_4_Full.Ano_Periodo, dbo.vw_RepuestosBolsaDAI_4_Full.Mes_Periodo, dbo.vw_RepuestosBolsaDAI_4_Full.CodigoEmpresa, 
                         dbo.vw_RepuestosBolsaDAI_4_Full.CodigoSede, dbo.vw_RepuestosBolsaDAI_4_Full.NombreSede, dbo.vw_RepuestosBolsaDAI_4_Full.CodigoCentro, dbo.vw_RepuestosBolsaDAI_4_Full.NombreCentro, 
                         dbo.vw_RepuestosBolsaDAI_4_Full.CodigoSeccion, dbo.vw_RepuestosBolsaDAI_4_Full.Seccion, dbo.vw_RepuestosBolsaDAI_4_Full.BolsaPorcentaje, dbo.vw_RepuestosBolsaDAI_4_Full.ValorNetoMostrador, 
                         dbo.vw_RepuestosBolsaDAI_4_Full.ValorNetoTaller, dbo.vw_RepuestosBolsaDAI_4_Full.ValorBaseBolsa, dbo.ExogenasPuntosEmpleadosSeccion.PuntosBolsa, 
                         (dbo.vw_RepuestosBolsaDAI_4_Full.ValorBaseBolsa * (dbo.ExogenasPuntosEmpleadosSeccion.PuntosBolsa / 100)) * (dbo.vw_RepuestosBolsaDAI_4_Full.BolsaPorcentaje / 100) AS Comision
FROM            dbo.vw_RepuestosBolsaDAI_4_Full LEFT OUTER JOIN
                         dbo.ExogenasPuntosEmpleadosSeccion ON dbo.vw_RepuestosBolsaDAI_4_Full.CodigoCentro = dbo.ExogenasPuntosEmpleadosSeccion.CodigoCentro AND 
                         dbo.vw_RepuestosBolsaDAI_4_Full.CodigoSeccion = dbo.ExogenasPuntosEmpleadosSeccion.CodigoSeccion


```
