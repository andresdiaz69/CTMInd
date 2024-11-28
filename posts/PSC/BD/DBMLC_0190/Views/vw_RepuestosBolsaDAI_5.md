# View: vw_RepuestosBolsaDAI_5

## Usa los objetos:
- [[ExogenasPuntosEmpleadosSeccion]]
- [[vw_RepuestosBolsaDAI_4]]

```sql
CREATE VIEW [dbo].[vw_RepuestosBolsaDAI_5]
AS
SELECT        dbo.ExogenasPuntosEmpleadosSeccion.CodigoEmpleado, dbo.vw_RepuestosBolsaDAI_4.Ano_Periodo, dbo.vw_RepuestosBolsaDAI_4.Mes_Periodo, dbo.vw_RepuestosBolsaDAI_4.CodigoEmpresa, 
                         dbo.vw_RepuestosBolsaDAI_4.CodigoSede, dbo.vw_RepuestosBolsaDAI_4.NombreSede, dbo.vw_RepuestosBolsaDAI_4.CodigoCentro, dbo.vw_RepuestosBolsaDAI_4.NombreCentro, 
                         dbo.vw_RepuestosBolsaDAI_4.CodigoSeccion, dbo.vw_RepuestosBolsaDAI_4.Seccion, dbo.vw_RepuestosBolsaDAI_4.BolsaPorcentaje, dbo.vw_RepuestosBolsaDAI_4.ValorNetoMostrador, 
                         dbo.vw_RepuestosBolsaDAI_4.ValorNetoTaller, dbo.vw_RepuestosBolsaDAI_4.ValorBaseBolsa, dbo.ExogenasPuntosEmpleadosSeccion.PuntosBolsa, 
                         (dbo.vw_RepuestosBolsaDAI_4.ValorBaseBolsa * (dbo.ExogenasPuntosEmpleadosSeccion.PuntosBolsa / 100)) * (dbo.vw_RepuestosBolsaDAI_4.BolsaPorcentaje / 100) AS Comision
FROM            dbo.vw_RepuestosBolsaDAI_4 LEFT OUTER JOIN
                         dbo.ExogenasPuntosEmpleadosSeccion ON dbo.vw_RepuestosBolsaDAI_4.CodigoCentro = dbo.ExogenasPuntosEmpleadosSeccion.CodigoCentro AND 
                         dbo.vw_RepuestosBolsaDAI_4.CodigoSeccion = dbo.ExogenasPuntosEmpleadosSeccion.CodigoSeccion


```
