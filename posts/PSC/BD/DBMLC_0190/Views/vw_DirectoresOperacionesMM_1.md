# View: vw_DirectoresOperacionesMM_1

## Usa los objetos:
- [[vw_DirectoresOperacionesMM_1_Detalle]]

```sql
CREATE VIEW [dbo].[vw_DirectoresOperacionesMM_1]
AS
SELECT        Ano_Periodo, Mes_Periodo, SUM(ValorNetoMostrador) AS ValorNetoMostrador, SUM(ValorNetoTaller) AS ValorNetoTaller, SUM(ValorNetoMostrador) + SUM(ValorNetoTaller) AS ValorNetoTotal
FROM            dbo.vw_DirectoresOperacionesMM_1_Detalle
GROUP BY Ano_Periodo, Mes_Periodo


```
