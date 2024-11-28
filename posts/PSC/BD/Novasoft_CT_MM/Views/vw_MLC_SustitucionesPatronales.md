# View: vw_MLC_SustitucionesPatronales

## Usa los objetos:
- [[gen_compania]]
- [[rhh_cauretiro]]
- [[rhh_emplea]]
- [[rhh_hislab]]
- [[rhh_tbestlab]]

```sql
create view vw_MLC_SustitucionesPatronales as
select distinct CodigoCompania=e.cod_cia,NombreCompania=c.nom_cia,CodigoEmpleado=e.cod_emp,
NombreEmpleado = e.nom_emp+ ' ' + e.ap1_emp + ' ' + e.ap2_emp,FechaIngreso = e.fec_ing,FechaRetiro = e.fec_egr,
CodigoCausaRetiro= h.cau_ret,CausaRetiro = r.nom_ret, CodigoEstadoLaboral = e.est_lab,EstadoLaboral=l.nom_est
from		rhh_emplea		e
left join 	gen_compania	c	on	e.cod_cia = c.cod_cia
left join	rhh_hislab		h	on	e.cod_emp = h.cod_emp
left join	rhh_cauretiro	r	on	h.cau_ret = r.cau_ret
left join	rhh_tbestlab	l	on	e.est_lab = l.est_lab	
where h.cau_ret = 9
		
```
