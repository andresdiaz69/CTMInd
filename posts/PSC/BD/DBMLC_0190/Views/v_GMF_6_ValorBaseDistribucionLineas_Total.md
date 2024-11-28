# View: v_GMF_6_ValorBaseDistribucionLineas_Total

## Usa los objetos:
- [[v_GMF_5_ValorBaseDistribucionLineas]]

```sql

CREATE view [dbo].[v_GMF_6_ValorBaseDistribucionLineas_Total] as
select año,mes,empresa,ValorTotal=sum(valor)
from v_GMF_5_ValorBaseDistribucionLineas
group by año,mes,empresa


```
