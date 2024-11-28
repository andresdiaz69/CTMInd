# View: vw_RepuestosBolsaDAI_4

## Usa los objetos:
- [[vw_RepuestosBolsaDAI_2]]
- [[vw_RepuestosBolsaDAI_3]]

```sql
CREATE VIEW [dbo].[vw_RepuestosBolsaDAI_4]
AS
SELECT        ISNULL(dbo.vw_RepuestosBolsaDAI_2.Ano_Periodo, dbo.vw_RepuestosBolsaDAI_3.Ano_Periodo) AS Ano_Periodo, ISNULL(dbo.vw_RepuestosBolsaDAI_2.Mes_Periodo, dbo.vw_RepuestosBolsaDAI_3.Mes_Periodo) 
                         AS Mes_Periodo, ISNULL(dbo.vw_RepuestosBolsaDAI_2.CodigoEmpresa, dbo.vw_RepuestosBolsaDAI_3.CodigoEmpresa) AS CodigoEmpresa, ISNULL(dbo.vw_RepuestosBolsaDAI_2.CodigoSede, 
                         dbo.vw_RepuestosBolsaDAI_3.CodigoSede) AS CodigoSede, ISNULL(dbo.vw_RepuestosBolsaDAI_2.NombreSede, dbo.vw_RepuestosBolsaDAI_3.NombreSede) AS NombreSede, 
                         ISNULL(dbo.vw_RepuestosBolsaDAI_2.CodigoCentro, dbo.vw_RepuestosBolsaDAI_3.CodigoCentro) AS CodigoCentro, ISNULL(dbo.vw_RepuestosBolsaDAI_2.NombreCentro, dbo.vw_RepuestosBolsaDAI_3.NombreCentro) 
                         AS NombreCentro, ISNULL(dbo.vw_RepuestosBolsaDAI_2.CodigoSeccion, dbo.vw_RepuestosBolsaDAI_3.CodigoSeccion) AS CodigoSeccion, ISNULL(dbo.vw_RepuestosBolsaDAI_2.Seccion, 
                         dbo.vw_RepuestosBolsaDAI_3.Seccion) AS Seccion, ISNULL(dbo.vw_RepuestosBolsaDAI_2.BolsaPorcentaje, dbo.vw_RepuestosBolsaDAI_3.BolsaPorcentaje) AS BolsaPorcentaje, 
                         ISNULL(dbo.vw_RepuestosBolsaDAI_2.ValorNetoMostrador, 0) AS ValorNetoMostrador, ISNULL(dbo.vw_RepuestosBolsaDAI_3.ValorNetoTaller, 0) AS ValorNetoTaller, ISNULL(dbo.vw_RepuestosBolsaDAI_2.ValorNetoMostrador, 
                         0) + ISNULL(dbo.vw_RepuestosBolsaDAI_3.ValorNetoTaller, 0) AS ValorBaseBolsa
FROM            dbo.vw_RepuestosBolsaDAI_2 FULL OUTER JOIN
                         dbo.vw_RepuestosBolsaDAI_3 ON dbo.vw_RepuestosBolsaDAI_2.Seccion = dbo.vw_RepuestosBolsaDAI_3.Seccion AND dbo.vw_RepuestosBolsaDAI_2.CodigoSeccion = dbo.vw_RepuestosBolsaDAI_3.CodigoSeccion AND 
                         dbo.vw_RepuestosBolsaDAI_2.NombreCentro = dbo.vw_RepuestosBolsaDAI_3.NombreCentro AND dbo.vw_RepuestosBolsaDAI_2.CodigoCentro = dbo.vw_RepuestosBolsaDAI_3.CodigoCentro AND 
                         dbo.vw_RepuestosBolsaDAI_2.BolsaPorcentaje = dbo.vw_RepuestosBolsaDAI_3.BolsaPorcentaje AND dbo.vw_RepuestosBolsaDAI_2.NombreSede = dbo.vw_RepuestosBolsaDAI_3.NombreSede AND 
                         dbo.vw_RepuestosBolsaDAI_2.CodigoSede = dbo.vw_RepuestosBolsaDAI_3.CodigoSede AND dbo.vw_RepuestosBolsaDAI_2.Ano_Periodo = dbo.vw_RepuestosBolsaDAI_3.Ano_Periodo AND 
                         dbo.vw_RepuestosBolsaDAI_2.Mes_Periodo = dbo.vw_RepuestosBolsaDAI_3.Mes_Periodo AND dbo.vw_RepuestosBolsaDAI_2.CodigoEmpresa = dbo.vw_RepuestosBolsaDAI_3.CodigoEmpresa
WHERE        (ISNULL(dbo.vw_RepuestosBolsaDAI_2.BolsaPorcentaje, dbo.vw_RepuestosBolsaDAI_3.BolsaPorcentaje) > 0)


```
