# View: vw_RepuestosBolsaDAI_2

## Usa los objetos:
- [[vw_RepuestosBolsaDAI_1]]

```sql

CREATE VIEW [dbo].[vw_RepuestosBolsaDAI_2]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoSede, NombreSede, CodigoCentro, NombreCentro, CodigoSeccion, Seccion, BolsaPorcentaje, SUM(TotalFactura) AS TotalFacturas, SUM(ImporteEfecto) AS ImporteEfecto, 
                         CASE WHEN SUM(TotalFactura) <> 0 THEN SUM(ImporteEfecto) / SUM(TotalFactura) * 100 ELSE 0 END AS PorcentajeRecaudo, SUM(ValorNetoMostrador) AS ValorNetoMostrador
FROM            dbo.vw_RepuestosBolsaDAI_1
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoSede, NombreSede, BolsaPorcentaje, CodigoCentro, NombreCentro, CodigoSeccion, Seccion



```
