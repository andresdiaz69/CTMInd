# View: v_GMF_12_ValoresVentasNetasTotalSedes

## Usa los objetos:
- [[v_GMF_10_ValoresVentasNetas]]

```sql
CREATE view [dbo].[v_GMF_12_ValoresVentasNetasTotalSedes] as
select Empresa,Año,Mes,CodigoPresentacion,NombrePresentacion,sede,Valor=sum(Valor)
from  v_GMF_10_ValoresVentasNetas 
where CodigoPresentacion not in (28,29,87,88,90)
--and año=2021
--and mes=2
--and CodigoPresentacion = 12
group by Empresa,Año,Mes,CodigoPresentacion,NombrePresentacion,sede




```
