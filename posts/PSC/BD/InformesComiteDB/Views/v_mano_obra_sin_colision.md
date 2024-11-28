# View: v_mano_obra_sin_colision

## Usa los objetos:
- [[v_mano_obra_colision]]
- [[v_mano_obra_total]]

```sql
create view v_mano_obra_sin_colision as
select s.NombrePresentacion,s.CodigoPresentacion,s.Sede,Año=s.Año2,Mes=s.MesInicial2,
Actual = (s.Actual - c.Actual), Presupuesto = (s.presupuesto - c.presupuesto)
from		v_mano_obra_total		s
left join	v_mano_obra_colision	c	on	s.CodigoPresentacion = c.CodigoPresentacion
											and s.Año2 = c.Año2
											and s.MesInicial2 = c.MesInicial2
											and s.sede = c.sede		 
--where s.Año2 = 2020
--and s.MesInicial2 = 12
--and  s.NombrePresentacion ='FORD'


```
