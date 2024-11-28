# View: vw_RepuestosPIRMM_2

## Usa los objetos:
- [[vw_RepuestosPIRMM_1]]

```sql

CREATE VIEW [dbo].[vw_RepuestosPIRMM_2]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoSede, NombreSede, CodigoCentro, NombreCentro, PIRPorcentaje, PIRPuntos, SUM(TotalFactura) AS TotalFacturasMostrador, SUM(ImporteEfecto) AS ImportesEfectoMostrador, SUM(ImporteEfecto) 
                         * 100 / SUM(TotalFactura) AS PorcentajesRecaudoMostrador, SUM(ValorNetoMostrador) AS ValorNetoMostrador
FROM            dbo.vw_RepuestosPIRMM_1
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoSede, NombreSede, CodigoCentro, NombreCentro, PIRPorcentaje, PIRPuntos




```
