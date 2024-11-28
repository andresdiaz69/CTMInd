# View: vw_RepuestosBolsaDAI_4_Full

## Usa los objetos:
- [[vw_RepuestosBolsaDAI_2_Full]]
- [[vw_RepuestosBolsaDAI_3_Full]]

```sql

CREATE VIEW [dbo].[vw_RepuestosBolsaDAI_4_Full]
AS
SELECT        ISNULL(dbo.vw_RepuestosBolsaDAI_2_Full.Ano_Periodo, dbo.vw_RepuestosBolsaDAI_3_Full.Ano_Periodo) AS Ano_Periodo, ISNULL(dbo.vw_RepuestosBolsaDAI_2_Full.Mes_Periodo, dbo.vw_RepuestosBolsaDAI_3_Full.Mes_Periodo) 
                         AS Mes_Periodo, ISNULL(dbo.vw_RepuestosBolsaDAI_2_Full.CodigoEmpresa, dbo.vw_RepuestosBolsaDAI_3_Full.CodigoEmpresa) AS CodigoEmpresa, ISNULL(dbo.vw_RepuestosBolsaDAI_2_Full.CodigoSede, 
                         dbo.vw_RepuestosBolsaDAI_3_Full.CodigoSede) AS CodigoSede, ISNULL(dbo.vw_RepuestosBolsaDAI_2_Full.NombreSede, dbo.vw_RepuestosBolsaDAI_3_Full.NombreSede) AS NombreSede, 
                         ISNULL(dbo.vw_RepuestosBolsaDAI_2_Full.CodigoCentro, dbo.vw_RepuestosBolsaDAI_3_Full.CodigoCentro) AS CodigoCentro, ISNULL(dbo.vw_RepuestosBolsaDAI_2_Full.NombreCentro, dbo.vw_RepuestosBolsaDAI_3_Full.NombreCentro) 
                         AS NombreCentro, ISNULL(dbo.vw_RepuestosBolsaDAI_2_Full.CodigoSeccion, dbo.vw_RepuestosBolsaDAI_3_Full.CodigoSeccion) AS CodigoSeccion, ISNULL(dbo.vw_RepuestosBolsaDAI_2_Full.Seccion, 
                         dbo.vw_RepuestosBolsaDAI_3_Full.Seccion) AS Seccion, ISNULL(dbo.vw_RepuestosBolsaDAI_2_Full.BolsaPorcentaje, dbo.vw_RepuestosBolsaDAI_3_Full.BolsaPorcentaje) AS BolsaPorcentaje, 
                         ISNULL(dbo.vw_RepuestosBolsaDAI_2_Full.ValorNetoMostrador, 0) AS ValorNetoMostrador, ISNULL(dbo.vw_RepuestosBolsaDAI_3_Full.ValorNetoTaller, 0) AS ValorNetoTaller, ISNULL(dbo.vw_RepuestosBolsaDAI_2_Full.ValorNetoMostrador, 
                         0) + ISNULL(dbo.vw_RepuestosBolsaDAI_3_Full.ValorNetoTaller, 0) AS ValorBaseBolsa
FROM            dbo.vw_RepuestosBolsaDAI_2_Full FULL OUTER JOIN
                         dbo.vw_RepuestosBolsaDAI_3_Full ON dbo.vw_RepuestosBolsaDAI_2_Full.Seccion = dbo.vw_RepuestosBolsaDAI_3_Full.Seccion AND dbo.vw_RepuestosBolsaDAI_2_Full.CodigoSeccion = dbo.vw_RepuestosBolsaDAI_3_Full.CodigoSeccion AND 
                         dbo.vw_RepuestosBolsaDAI_2_Full.NombreCentro = dbo.vw_RepuestosBolsaDAI_3_Full.NombreCentro AND dbo.vw_RepuestosBolsaDAI_2_Full.CodigoCentro = dbo.vw_RepuestosBolsaDAI_3_Full.CodigoCentro AND 
                         dbo.vw_RepuestosBolsaDAI_2_Full.BolsaPorcentaje = dbo.vw_RepuestosBolsaDAI_3_Full.BolsaPorcentaje AND dbo.vw_RepuestosBolsaDAI_2_Full.NombreSede = dbo.vw_RepuestosBolsaDAI_3_Full.NombreSede AND 
                         dbo.vw_RepuestosBolsaDAI_2_Full.CodigoSede = dbo.vw_RepuestosBolsaDAI_3_Full.CodigoSede AND dbo.vw_RepuestosBolsaDAI_2_Full.Ano_Periodo = dbo.vw_RepuestosBolsaDAI_3_Full.Ano_Periodo AND 
                         dbo.vw_RepuestosBolsaDAI_2_Full.Mes_Periodo = dbo.vw_RepuestosBolsaDAI_3_Full.Mes_Periodo AND dbo.vw_RepuestosBolsaDAI_2_Full.CodigoEmpresa = dbo.vw_RepuestosBolsaDAI_3_Full.CodigoEmpresa
WHERE        (ISNULL(dbo.vw_RepuestosBolsaDAI_2_Full.BolsaPorcentaje, dbo.vw_RepuestosBolsaDAI_3_Full.BolsaPorcentaje) > 0)


```
