# View: vw_TallerPITMM_2

## Usa los objetos:
- [[vw_TallerPITMM_1]]

```sql

CREATE VIEW [dbo].[vw_TallerPITMM_2]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoSede, NombreSede, CodigoCentro, NombreCentro, PITPorcentaje, PITPuntos, SUM(ValorTotalFactura) AS ValorTotalFacturas, SUM(ImporteEfecto) AS ImportesEfecto, 

CASE 
WHEN SUM(ValorTotalFactura) <> 0 
THEN SUM(ImporteEfecto) * 100 / SUM(ValorTotalFactura) 
 ELSE 0 
 END AS PorcentajesRecaudo, 



SUM(ValorNetoTaller) AS ValorNetoTaller, SUM(ValorNetoTaller) AS ValorBasePIT
FROM            dbo.vw_TallerPITMM_1
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoSede, NombreSede, CodigoCentro, NombreCentro, PITPorcentaje, PITPuntos




```
