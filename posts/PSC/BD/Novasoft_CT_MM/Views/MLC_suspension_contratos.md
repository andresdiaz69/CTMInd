# View: MLC_suspension_contratos

## Usa los objetos:
- [[GTH_ParamContratos]]
- [[rhh_ausentismo]]
- [[rhh_emplea]]
- [[rhh_TbClasAus]]
- [[rhh_tbenfer]]
- [[rhh_TbTipAus]]

```sql
CREATE view [dbo].[MLC_suspension_contratos] as
select a.cod_emp,a.cod_aus,dias = sum(a.dias),a.fec_ini,a.fec_fin,a.ini_aus,a.fin_aus,c.des_cla_aus
from		rhh_ausentismo	a
left join	rhh_TbTipAus	t	on	a.cod_aus = t.cod_aus
left join	rhh_TbClasAus	c	on	t.cla_aus = c.cla_aus
left join	rhh_tbenfer		e	on	a.cod_enf = e.cod_enf
where fec_ini >= '20200401' 
and a.cod_aus = 21
group by a.cod_emp,a.cod_aus,t.nom_aus,a.fec_ini,a.fec_fin,a.ini_aus,a.fin_aus,c.des_cla_aus,a.cod_enf,e.nom_enf
union all
select a.cod_emp,a.cod_aus,dias = sum(a.dias),a.fec_ini,a.fec_fin,a.ini_aus,a.fin_aus,c.des_cla_aus
from		rhh_ausentismo	a
left join	rhh_TbTipAus	t	on	a.cod_aus = t.cod_aus
left join	rhh_TbClasAus	c	on	t.cla_aus = c.cla_aus
left join	rhh_tbenfer		e	on	a.cod_enf = e.cod_enf
left join	rhh_emplea		r	on	r.cod_emp = a.cod_emp 
where fec_ini >= '20200401' 
and a.cod_aus = 22
and r.cod_car in (74,166,167)
group by a.cod_emp,a.cod_aus,t.nom_aus,a.fec_ini,a.fec_fin,a.ini_aus,a.fin_aus,c.des_cla_aus,a.cod_enf,e.nom_enf
union all
select cod_emp,cod_aus,dias,fec_ini,fec_fin,ini_aus,fin_aus,des_cla_aus
from(
	select Orden=ROW_NUMBER() over (partition by Cod_emp order by g.fec_param desc),
	g.cod_emp,cod_aus=g.horas_mes,dias=datediff(DAY,g.fec_param,GETDATE()),
	fec_ini=g.fec_param,fec_fin=getdate(),ini_aus=g.fec_param,
	fin_aus=getdate(),des_cla_aus='Medio Tiempo'
	from		GTH_ParamContratos		g
) a
where orden = 1
and cod_aus <> 240




```
