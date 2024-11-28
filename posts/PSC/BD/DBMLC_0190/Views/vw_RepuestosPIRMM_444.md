# View: vw_RepuestosPIRMM_444

## Usa los objetos:
- [[vw_RepuestosPIRMM_4]]
- [[vw_RepuestosPIRMM_44]]

```sql
CREATE VIEW [dbo].[vw_RepuestosPIRMM_444]
AS
SELECT        dbo.vw_RepuestosPIRMM_4.Ano_Periodo, dbo.vw_RepuestosPIRMM_4.Mes_Periodo, dbo.vw_RepuestosPIRMM_4.CodigoEmpresa, dbo.vw_RepuestosPIRMM_4.CodigoSede, dbo.vw_RepuestosPIRMM_4.NombreSede, 
                         dbo.vw_RepuestosPIRMM_4.CodigoCentro, dbo.vw_RepuestosPIRMM_4.NombreCentro, dbo.vw_RepuestosPIRMM_4.PIRPorcentaje, dbo.vw_RepuestosPIRMM_4.PIRPuntos, 
                         CASE WHEN CodigoSede <> 22 THEN dbo.vw_RepuestosPIRMM_4.TotalFacturasMostrador ELSE dbo.vw_RepuestosPIRMM_44.TotalFacturasMostrador_SanFacon END AS TotalFacturasMostrador, 
                         CASE WHEN CodigoSede <> 22 THEN dbo.vw_RepuestosPIRMM_4.ImportesEfectoMostrador ELSE dbo.vw_RepuestosPIRMM_44.ImportesEfectoMostrador_SanFacon END AS ImportesEfectoMostrador, 
                         CASE WHEN CodigoSede <> 22 THEN dbo.vw_RepuestosPIRMM_4.PorcentajesRecaudoMostrador ELSE dbo.vw_RepuestosPIRMM_44.PorcentajesRecaudoMostrador_SanFacon END AS PorcentajesRecaudoMostrador, 
                         CASE WHEN CodigoSede <> 22 THEN dbo.vw_RepuestosPIRMM_4.ValorNetoMostrador ELSE dbo.vw_RepuestosPIRMM_44.ValorNetoMostrador_SanFacon END AS ValorNetoMostrador, 
                         CASE WHEN CodigoSede <> 22 THEN dbo.vw_RepuestosPIRMM_4.ValorNetoTaller ELSE dbo.vw_RepuestosPIRMM_44.ValorNetoTaller_SanFacon END AS ValorNetoTaller, 
                         CASE WHEN CodigoSede <> 22 THEN dbo.vw_RepuestosPIRMM_4.ValorBasePIR ELSE dbo.vw_RepuestosPIRMM_44.ValorBasePIR_SanFacon END AS ValorBasePIR
FROM            dbo.vw_RepuestosPIRMM_4 LEFT OUTER JOIN
                         dbo.vw_RepuestosPIRMM_44 ON dbo.vw_RepuestosPIRMM_4.Ano_Periodo = dbo.vw_RepuestosPIRMM_44.Ano_Periodo AND dbo.vw_RepuestosPIRMM_4.Mes_Periodo = dbo.vw_RepuestosPIRMM_44.Mes_Periodo AND 
                         dbo.vw_RepuestosPIRMM_4.CodigoEmpresa = dbo.vw_RepuestosPIRMM_44.CodigoEmpresa


```
