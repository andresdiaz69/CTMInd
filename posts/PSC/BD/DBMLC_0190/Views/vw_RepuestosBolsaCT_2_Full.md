# View: vw_RepuestosBolsaCT_2_Full

## Usa los objetos:
- [[vw_RepuestosBolsaCT_1_Full]]

```sql

CREATE VIEW [dbo].[vw_RepuestosBolsaCT_2_Full]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoSede, NombreSede, CodigoCentro, NombreCentro, CodigoSeccion, Seccion, BolsaPorcentaje, BolsaPuntos, SUM(TotalFactura) AS TotalFacturas, SUM(ImporteEfecto) 
                         AS ImporteEfecto, CASE WHEN SUM(TotalFactura) <> 0 THEN SUM(ImporteEfecto) / SUM(TotalFactura) * 100 ELSE 0 END AS PorcentajeRecaudo, SUM(ValorNetoMostrador) AS ValorNetoMostrador
FROM            dbo.vw_RepuestosBolsaCT_1_Full
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoSede, NombreSede, BolsaPorcentaje, BolsaPuntos, CodigoCentro, NombreCentro, CodigoSeccion, Seccion


```
