# View: vw_RepuestosPIRMM_44

## Usa los objetos:
- [[vw_RepuestosPIRMM_4]]

```sql

CREATE VIEW [dbo].[vw_RepuestosPIRMM_44]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, SUM(TotalFacturasMostrador) AS TotalFacturasMostrador_SanFacon, SUM(ImportesEfectoMostrador) AS ImportesEfectoMostrador_SanFacon, 
                         CASE WHEN SUM(TotalFacturasMostrador) > 0 THEN SUM(ImportesEfectoMostrador) * 100 / SUM(TotalFacturasMostrador) ELSE 0 END AS PorcentajesRecaudoMostrador_SanFacon, SUM(ValorNetoMostrador) AS ValorNetoMostrador_SanFacon, SUM(ValorNetoTaller) AS ValorNetoTaller_SanFacon, SUM(ValorBasePIR) AS ValorBasePIR_SanFacon
FROM            dbo.vw_RepuestosPIRMM_4
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa




```
