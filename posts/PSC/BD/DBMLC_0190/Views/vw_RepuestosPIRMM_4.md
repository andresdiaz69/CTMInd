# View: vw_RepuestosPIRMM_4

## Usa los objetos:
- [[vw_RepuestosPIRMM_2]]
- [[vw_RepuestosPIRMM_3]]

```sql
CREATE VIEW [dbo].[vw_RepuestosPIRMM_4]
AS
SELECT        ISNULL(dbo.vw_RepuestosPIRMM_2.Ano_Periodo, dbo.vw_RepuestosPIRMM_3.Ano_Periodo) AS Ano_Periodo, ISNULL(dbo.vw_RepuestosPIRMM_2.Mes_Periodo, dbo.vw_RepuestosPIRMM_3.Mes_Periodo) AS Mes_Periodo, 
                         ISNULL(dbo.vw_RepuestosPIRMM_2.CodigoEmpresa, dbo.vw_RepuestosPIRMM_3.CodigoEmpresa) AS CodigoEmpresa, ISNULL(dbo.vw_RepuestosPIRMM_2.CodigoSede, dbo.vw_RepuestosPIRMM_3.CodigoSede) 
                         AS CodigoSede, ISNULL(dbo.vw_RepuestosPIRMM_2.NombreSede, dbo.vw_RepuestosPIRMM_3.NombreSede) AS NombreSede, ISNULL(dbo.vw_RepuestosPIRMM_2.CodigoCentro, dbo.vw_RepuestosPIRMM_3.CodigoCentro) 
                         AS CodigoCentro, ISNULL(dbo.vw_RepuestosPIRMM_2.NombreCentro, dbo.vw_RepuestosPIRMM_3.NombreCentro) AS NombreCentro, ISNULL(dbo.vw_RepuestosPIRMM_2.PIRPorcentaje, 
                         dbo.vw_RepuestosPIRMM_3.PIRPorcentaje) AS PIRPorcentaje, ISNULL(dbo.vw_RepuestosPIRMM_2.PIRPuntos, dbo.vw_RepuestosPIRMM_3.PIRPuntos) AS PIRPuntos, 
                         ISNULL(dbo.vw_RepuestosPIRMM_2.ValorNetoMostrador, 0) AS ValorNetoMostrador, ISNULL(dbo.vw_RepuestosPIRMM_3.ValorNetoTaller, 0) AS ValorNetoTaller, ISNULL(dbo.vw_RepuestosPIRMM_2.ValorNetoMostrador, 0) 
                         + ISNULL(dbo.vw_RepuestosPIRMM_3.ValorNetoTaller, 0) AS ValorBasePIR, ISNULL(dbo.vw_RepuestosPIRMM_2.TotalFacturasMostrador, 0) AS TotalFacturasMostrador, 
                         ISNULL(dbo.vw_RepuestosPIRMM_2.ImportesEfectoMostrador, 0) AS ImportesEfectoMostrador, ISNULL(dbo.vw_RepuestosPIRMM_2.PorcentajesRecaudoMostrador, 0) AS PorcentajesRecaudoMostrador
FROM            dbo.vw_RepuestosPIRMM_2 FULL OUTER JOIN
                         dbo.vw_RepuestosPIRMM_3 ON dbo.vw_RepuestosPIRMM_2.NombreCentro = dbo.vw_RepuestosPIRMM_3.NombreCentro AND dbo.vw_RepuestosPIRMM_2.CodigoCentro = dbo.vw_RepuestosPIRMM_3.CodigoCentro AND 
                         dbo.vw_RepuestosPIRMM_2.PIRPuntos = dbo.vw_RepuestosPIRMM_3.PIRPuntos AND dbo.vw_RepuestosPIRMM_2.PIRPorcentaje = dbo.vw_RepuestosPIRMM_3.PIRPorcentaje AND 
                         dbo.vw_RepuestosPIRMM_2.NombreSede = dbo.vw_RepuestosPIRMM_3.NombreSede AND dbo.vw_RepuestosPIRMM_2.CodigoSede = dbo.vw_RepuestosPIRMM_3.CodigoSede AND 
                         dbo.vw_RepuestosPIRMM_2.Ano_Periodo = dbo.vw_RepuestosPIRMM_3.Ano_Periodo AND dbo.vw_RepuestosPIRMM_2.Mes_Periodo = dbo.vw_RepuestosPIRMM_3.Mes_Periodo AND 
                         dbo.vw_RepuestosPIRMM_2.CodigoEmpresa = dbo.vw_RepuestosPIRMM_3.CodigoEmpresa
WHERE        (ISNULL(dbo.vw_RepuestosPIRMM_2.PIRPorcentaje, dbo.vw_RepuestosPIRMM_3.PIRPorcentaje) > 0) AND (ISNULL(dbo.vw_RepuestosPIRMM_2.PIRPuntos, dbo.vw_RepuestosPIRMM_3.PIRPuntos) > 0)


```
