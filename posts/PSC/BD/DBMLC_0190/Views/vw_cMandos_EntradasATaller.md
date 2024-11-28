# View: vw_cMandos_EntradasATaller

## Usa los objetos:
- [[spiga_PasosPorTallerGIE]]

```sql







CREATE VIEW [dbo].[vw_cMandos_EntradasATaller]
AS
--SELECT        Ano_Periodo, Mes_Periodo, IdEmpresas AS CodigoEmpresa, IdCentros AS CodigoCentro,
--IdSecciones CodigoSeccion, COUNT(NumOT) AS Cantidad
--FROM            (SELECT DISTINCT isnull(YEAR(FechaEntrada),0) AS Ano_Periodo, isnull(MONTH(FechaEntrada),0) AS Mes_Periodo,
--					IdEmpresas, IdCentros,IdSecciones, NombreSeccion, AñoOT, SerieOT, NumOT
--                    FROM Desarrollo_PSCService_DB.dbo.spiga_EntradasATaller AS e) AS a
--GROUP BY IdEmpresas, IdCentros,IdSecciones , Ano_Periodo, Mes_Periodo

SELECT	Ano_Periodo, Mes_Periodo, IdEmpresa AS CodigoEmpresa, IdCentro AS CodigoCentro, IdSeccion as CodigoSeccion, Numero as Cantidad
FROM	[PSCService_DB].[dbo].[spiga_PasosPorTallerGIE]

```
