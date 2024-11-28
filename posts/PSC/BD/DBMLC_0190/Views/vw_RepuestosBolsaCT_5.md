# View: vw_RepuestosBolsaCT_5

## Usa los objetos:
- [[vw_RepuestosBolsaCT_4]]

```sql
CREATE VIEW [dbo].[vw_RepuestosBolsaCT_5]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoSede, NombreSede, CodigoCentro, NombreCentro, CodigoSeccion, Seccion, BolsaPorcentaje, BolsaPuntos, ValorNetoMostrador, ValorNetoTaller, ValorBaseBolsa, 
                         CASE WHEN isnull(BolsaPuntos, 0) > 0 THEN (isnull(ValorBaseBolsa, 0)) / isnull(BolsaPuntos, 0) ELSE 0 END AS ValorDelPuntoBolsa
FROM            dbo.vw_RepuestosBolsaCT_4


```
