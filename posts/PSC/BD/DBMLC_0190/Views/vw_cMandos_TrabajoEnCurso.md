# View: vw_cMandos_TrabajoEnCurso

## Usa los objetos:
- [[spiga_EntradasATaller]]
- [[UnidadDeNegocio]]

```sql

CREATE VIEW [dbo].[vw_cMandos_TrabajoEnCurso]
AS
SELECT        YEAR(e.FechaEntrada) AS Ano_Periodo, MONTH(e.FechaEntrada) AS Mes_Periodo, e.IdEmpresas AS CodigoEmpresa, e.IdCentros AS CodigoCentro, e.IdSecciones AS CodigoSeccion, e.FechaEntrada, e.SerieOT, e.NumOT, 
                         e.ImporteMAT, e.ImporteMO, e.ImportePINT, e.ImporteSUB, e.ImporteVAR, a.CodDepartamento, e.ImporteMAT+e.ImporteMO+e.ImportePINT+e.ImporteSUB+e.ImporteVAR ImporteTotal
FROM            PSCService_DB.dbo.spiga_EntradasATaller AS e LEFT OUTER JOIN
                         dbo.UnidadDeNegocio AS a ON e.IdEmpresas = a.CodEmpresa AND e.IdCentros = a.CodCentro AND e.IdSecciones = a.CodSeccion AND e.IdTrabajoEstados <> 'F'

```
