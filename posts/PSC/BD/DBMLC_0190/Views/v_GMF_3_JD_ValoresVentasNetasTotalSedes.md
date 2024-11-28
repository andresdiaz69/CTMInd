# View: v_GMF_3_JD_ValoresVentasNetasTotalSedes

## Usa los objetos:
- [[v_GMF_1_JD_ValoresVentasNetas]]

```sql

CREATE view [dbo].[v_GMF_3_JD_ValoresVentasNetasTotalSedes] as
select Empresa,Año,Mes,CodigoPresentacion,NombrePresentacion,sede,Valor=sum(Valor)
from   v_GMF_1_JD_ValoresVentasNetas
group by Empresa,Año,Mes,CodigoPresentacion,NombrePresentacion,sede




```
