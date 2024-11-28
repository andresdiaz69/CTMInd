# View: vw_TallerPITMM_3

## Usa los objetos:
- [[ExogenasSedesFaltantes]]
- [[vw_TallerPITMM_2]]

```sql
CREATE VIEW [dbo].[vw_TallerPITMM_3]
AS
SELECT        dbo.vw_TallerPITMM_2.Ano_Periodo, dbo.vw_TallerPITMM_2.Mes_Periodo, dbo.vw_TallerPITMM_2.CodigoEmpresa, dbo.vw_TallerPITMM_2.CodigoSede, dbo.vw_TallerPITMM_2.NombreSede, 
                         dbo.vw_TallerPITMM_2.CodigoCentro, dbo.vw_TallerPITMM_2.NombreCentro, dbo.vw_TallerPITMM_2.PITPorcentaje, dbo.vw_TallerPITMM_2.PITPuntos, dbo.vw_TallerPITMM_2.ValorNetoTaller, 
                         dbo.vw_TallerPITMM_2.ValorBasePIT, ISNULL(dbo.ExogenasSedesFaltantes.Faltante, 0) AS Faltante, CASE WHEN isnull(PITPuntos, 0) > 0 THEN (((isnull(ValorBasePIT, 0) * isnull(PITPorcentaje, 0) / 100) - isnull(Faltante, 0))) 
                         / isnull(PITPuntos, 0) ELSE 0 END AS ValorDelPuntoPIT
FROM            dbo.vw_TallerPITMM_2 LEFT OUTER JOIN
                         dbo.ExogenasSedesFaltantes ON dbo.vw_TallerPITMM_2.CodigoSede = dbo.ExogenasSedesFaltantes.CodigoSede AND dbo.vw_TallerPITMM_2.Ano_Periodo = dbo.ExogenasSedesFaltantes.Ano AND 
                         dbo.vw_TallerPITMM_2.Mes_Periodo = dbo.ExogenasSedesFaltantes.Mes


```
