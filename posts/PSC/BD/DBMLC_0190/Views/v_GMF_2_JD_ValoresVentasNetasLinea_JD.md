# View: v_GMF_2_JD_ValoresVentasNetasLinea_JD

## Usa los objetos:
- [[v_GMF_1_JD_ValoresVentasNetas]]

```sql

CREATE VIEW [dbo].[v_GMF_2_JD_ValoresVentasNetasLinea_JD] AS
select n.empresa,n.año,n.mes,ValorTotalJD= sum(n.valor)
from [dbo].[v_GMF_1_JD_ValoresVentasNetas]	n
--where  n.año= 2021
--and n.mes=2
group by n.empresa,n.año,n.mes

```
