# View: v_GMF_2_JD_ValoresVentasNetasTotalLineas

## Usa los objetos:
- [[v_GMF_1_JD_ValoresVentasNetas]]

```sql

CREATE  view [dbo].[v_GMF_2_JD_ValoresVentasNetasTotalLineas] as
select Empresa,Año,Mes,CodigoPresentacion,NombrePresentacion,Valor=sum(Valor)
from(		
		select empresa,año,mes,CodigoPresentacion,nombrepresentacion,Valor=sum(Valor)
		from(
				select Empresa,Año,Mes,CodigoPresentacion,NombrePresentacion,sede,Valor=sum(Valor)
				from  v_GMF_1_JD_ValoresVentasNetas 
				--where año=2021
				--and mes=2
				--and sede like '%FR-%'
				group by Empresa,Año,Mes,CodigoPresentacion,NombrePresentacion,sede
		)a group by  empresa,año,mes,CodigoPresentacion,nombrepresentacion,sede
)b group by Empresa,Año,Mes,CodigoPresentacion,NombrePresentacion
--order by empresa,año,mes,CodigoPresentacion,nombrepresentacion


```
