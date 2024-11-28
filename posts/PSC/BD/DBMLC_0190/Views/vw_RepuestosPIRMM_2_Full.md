# View: vw_RepuestosPIRMM_2_Full

## Usa los objetos:
- [[vw_RepuestosPIRMM_1_Full]]

```sql


CREATE VIEW [dbo].[vw_RepuestosPIRMM_2_Full]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoSede, NombreSede, CodigoCentro, NombreCentro, PIRPorcentaje, PIRPuntos, SUM(TotalFactura) AS TotalFacturasMostrador, SUM(ImporteEfecto) AS ImportesEfectoMostrador, SUM(ImporteEfecto) 
                         * 100 / SUM(TotalFactura) AS PorcentajesRecaudoMostrador, SUM(ValorNetoMostrador) AS ValorNetoMostrador
FROM            dbo.vw_RepuestosPIRMM_1_Full
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoSede, NombreSede, CodigoCentro, NombreCentro, PIRPorcentaje, PIRPuntos




```
