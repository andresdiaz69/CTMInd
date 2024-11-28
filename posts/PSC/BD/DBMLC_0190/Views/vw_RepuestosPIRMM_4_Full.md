# View: vw_RepuestosPIRMM_4_Full

## Usa los objetos:
- [[vw_RepuestosPIRMM_2_Full]]
- [[vw_RepuestosPIRMM_3_Full]]

```sql

CREATE VIEW [dbo].[vw_RepuestosPIRMM_4_Full]
AS
SELECT        ISNULL(dbo.vw_RepuestosPIRMM_2_Full.Ano_Periodo, dbo.vw_RepuestosPIRMM_3_Full.Ano_Periodo) AS Ano_Periodo, ISNULL(dbo.vw_RepuestosPIRMM_2_Full.Mes_Periodo, dbo.vw_RepuestosPIRMM_3_Full.Mes_Periodo) AS Mes_Periodo, 
                         ISNULL(dbo.vw_RepuestosPIRMM_2_Full.CodigoEmpresa, dbo.vw_RepuestosPIRMM_3_Full.CodigoEmpresa) AS CodigoEmpresa, ISNULL(dbo.vw_RepuestosPIRMM_2_Full.CodigoSede, dbo.vw_RepuestosPIRMM_3_Full.CodigoSede) 
                         AS CodigoSede, ISNULL(dbo.vw_RepuestosPIRMM_2_Full.NombreSede, dbo.vw_RepuestosPIRMM_3_Full.NombreSede) AS NombreSede, ISNULL(dbo.vw_RepuestosPIRMM_2_Full.CodigoCentro, dbo.vw_RepuestosPIRMM_3_Full.CodigoCentro) 
                         AS CodigoCentro, ISNULL(dbo.vw_RepuestosPIRMM_2_Full.NombreCentro, dbo.vw_RepuestosPIRMM_3_Full.NombreCentro) AS NombreCentro, ISNULL(dbo.vw_RepuestosPIRMM_2_Full.PIRPorcentaje, 
                         dbo.vw_RepuestosPIRMM_3_Full.PIRPorcentaje) AS PIRPorcentaje, ISNULL(dbo.vw_RepuestosPIRMM_2_Full.PIRPuntos, dbo.vw_RepuestosPIRMM_3_Full.PIRPuntos) AS PIRPuntos, 
                         ISNULL(dbo.vw_RepuestosPIRMM_2_Full.ValorNetoMostrador, 0) AS ValorNetoMostrador, ISNULL(dbo.vw_RepuestosPIRMM_3_Full.ValorNetoTaller, 0) AS ValorNetoTaller, ISNULL(dbo.vw_RepuestosPIRMM_2_Full.ValorNetoMostrador, 0) 
                         + ISNULL(dbo.vw_RepuestosPIRMM_3_Full.ValorNetoTaller, 0) AS ValorBasePIR, ISNULL(dbo.vw_RepuestosPIRMM_2_Full.TotalFacturasMostrador, 0) AS TotalFacturasMostrador, 
                         ISNULL(dbo.vw_RepuestosPIRMM_2_Full.ImportesEfectoMostrador, 0) AS ImportesEfectoMostrador, ISNULL(dbo.vw_RepuestosPIRMM_2_Full.PorcentajesRecaudoMostrador, 0) AS PorcentajesRecaudoMostrador
FROM            dbo.vw_RepuestosPIRMM_2_Full FULL OUTER JOIN
                         dbo.vw_RepuestosPIRMM_3_Full ON dbo.vw_RepuestosPIRMM_2_Full.NombreCentro = dbo.vw_RepuestosPIRMM_3_Full.NombreCentro AND dbo.vw_RepuestosPIRMM_2_Full.CodigoCentro = dbo.vw_RepuestosPIRMM_3_Full.CodigoCentro AND 
                         dbo.vw_RepuestosPIRMM_2_Full.PIRPuntos = dbo.vw_RepuestosPIRMM_3_Full.PIRPuntos AND dbo.vw_RepuestosPIRMM_2_Full.PIRPorcentaje = dbo.vw_RepuestosPIRMM_3_Full.PIRPorcentaje AND 
                         dbo.vw_RepuestosPIRMM_2_Full.NombreSede = dbo.vw_RepuestosPIRMM_3_Full.NombreSede AND dbo.vw_RepuestosPIRMM_2_Full.CodigoSede = dbo.vw_RepuestosPIRMM_3_Full.CodigoSede AND 
                         dbo.vw_RepuestosPIRMM_2_Full.Ano_Periodo = dbo.vw_RepuestosPIRMM_3_Full.Ano_Periodo AND dbo.vw_RepuestosPIRMM_2_Full.Mes_Periodo = dbo.vw_RepuestosPIRMM_3_Full.Mes_Periodo AND 
                         dbo.vw_RepuestosPIRMM_2_Full.CodigoEmpresa = dbo.vw_RepuestosPIRMM_3_Full.CodigoEmpresa
WHERE        (ISNULL(dbo.vw_RepuestosPIRMM_2_Full.PIRPorcentaje, dbo.vw_RepuestosPIRMM_3_Full.PIRPorcentaje) > 0) AND (ISNULL(dbo.vw_RepuestosPIRMM_2_Full.PIRPuntos, dbo.vw_RepuestosPIRMM_3_Full.PIRPuntos) > 0)


```
