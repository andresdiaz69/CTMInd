# View: vw_DirectoresOperacionesMM_2

## Usa los objetos:
- [[vw_DirectoresOperacionesMM_2_Detalle]]

```sql
CREATE VIEW [dbo].[vw_DirectoresOperacionesMM_2]
AS
SELECT        Ano_Periodo, Mes_Periodo, SUM(ValorNetoTaller) AS ValorNetoTaller
FROM            dbo.vw_DirectoresOperacionesMM_2_Detalle
GROUP BY Ano_Periodo, Mes_Periodo


```
