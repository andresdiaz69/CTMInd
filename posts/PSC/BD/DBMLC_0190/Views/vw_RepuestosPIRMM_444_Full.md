# View: vw_RepuestosPIRMM_444_Full

## Usa los objetos:
- [[vw_RepuestosPIRMM_4_Full]]
- [[vw_RepuestosPIRMM_44_Full]]

```sql

CREATE VIEW [dbo].[vw_RepuestosPIRMM_444_Full]
AS
SELECT        dbo.vw_RepuestosPIRMM_4_Full.Ano_Periodo, dbo.vw_RepuestosPIRMM_4_Full.Mes_Periodo, dbo.vw_RepuestosPIRMM_4_Full.CodigoEmpresa, dbo.vw_RepuestosPIRMM_4_Full.CodigoSede, dbo.vw_RepuestosPIRMM_4_Full.NombreSede, 
                         dbo.vw_RepuestosPIRMM_4_Full.CodigoCentro, dbo.vw_RepuestosPIRMM_4_Full.NombreCentro, dbo.vw_RepuestosPIRMM_4_Full.PIRPorcentaje, dbo.vw_RepuestosPIRMM_4_Full.PIRPuntos, 
                         CASE WHEN CodigoSede <> 22 THEN dbo.vw_RepuestosPIRMM_4_Full.TotalFacturasMostrador ELSE dbo.vw_RepuestosPIRMM_44_Full.TotalFacturasMostrador_SanFacon END AS TotalFacturasMostrador, 
                         CASE WHEN CodigoSede <> 22 THEN dbo.vw_RepuestosPIRMM_4_Full.ImportesEfectoMostrador ELSE dbo.vw_RepuestosPIRMM_44_Full.ImportesEfectoMostrador_SanFacon END AS ImportesEfectoMostrador, 
                         CASE WHEN CodigoSede <> 22 THEN dbo.vw_RepuestosPIRMM_4_Full.PorcentajesRecaudoMostrador ELSE dbo.vw_RepuestosPIRMM_44_Full.PorcentajesRecaudoMostrador_SanFacon END AS PorcentajesRecaudoMostrador, 
                         CASE WHEN CodigoSede <> 22 THEN dbo.vw_RepuestosPIRMM_4_Full.ValorNetoMostrador ELSE dbo.vw_RepuestosPIRMM_44_Full.ValorNetoMostrador_SanFacon END AS ValorNetoMostrador, 
                         CASE WHEN CodigoSede <> 22 THEN dbo.vw_RepuestosPIRMM_4_Full.ValorNetoTaller ELSE dbo.vw_RepuestosPIRMM_44_Full.ValorNetoTaller_SanFacon END AS ValorNetoTaller, 
                         CASE WHEN CodigoSede <> 22 THEN dbo.vw_RepuestosPIRMM_4_Full.ValorBasePIR ELSE dbo.vw_RepuestosPIRMM_44_Full.ValorBasePIR_SanFacon END AS ValorBasePIR
FROM            dbo.vw_RepuestosPIRMM_4_Full LEFT OUTER JOIN
                         dbo.vw_RepuestosPIRMM_44_Full ON dbo.vw_RepuestosPIRMM_4_Full.Ano_Periodo = dbo.vw_RepuestosPIRMM_44_Full.Ano_Periodo AND dbo.vw_RepuestosPIRMM_4_Full.Mes_Periodo = dbo.vw_RepuestosPIRMM_44_Full.Mes_Periodo AND 
                         dbo.vw_RepuestosPIRMM_4_Full.CodigoEmpresa = dbo.vw_RepuestosPIRMM_44_Full.CodigoEmpresa


```
