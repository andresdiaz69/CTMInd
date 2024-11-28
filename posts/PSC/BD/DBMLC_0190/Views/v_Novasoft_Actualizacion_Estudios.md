# View: v_Novasoft_Actualizacion_Estudios

## Usa los objetos:
- [[rhh_emplea]]
- [[rhh_estudio]]
- [[rhh_tbclaest]]
- [[rhh_tbestud]]
- [[rhh_tbinsti]]
- [[v_Novasoft_Actualizacion_Estudio]]

```sql

CREATE view [dbo].[v_Novasoft_Actualizacion_Estudios] as
select a.fecha,CodigoEmpleado=s.cod_emp,NombreEmpleado=e.nom_emp,Apellido1=e.ap1_emp,Apellido2=e.ap2_emp,
NombreEstudio=t.nom_est,TipoEstudio=b.des_est,NombreInstitucion=i.nom_ins,s.ano_est,
SemestresAprobados=s.sem_apr,HorasEstudio=s.hor_est,
Graduado=case when s.gra_son = 0 then 'No' else 'Si' end,FechaGrado=s.fec_gra--,a.fecha
from		[Novasoft_CT_MM].dbo.rhh_estudio	s
left join	[Novasoft_CT_MM].dbo.rhh_emplea		e	on	s.cod_emp = e.cod_emp
left join	[Novasoft_CT_MM].dbo.rhh_tbestud	t	on	s.cod_est = t.cod_est
left join	[Novasoft_CT_MM].dbo.rhh_tbclaest	b	on	t.tip_est = b.tip_est
left join	[Novasoft_CT_MM].dbo.rhh_tbinsti	i	on	s.cod_ins = i.cod_ins
left join	v_Novasoft_Actualizacion_Estudio	a	on	rtrim(ltrim(e.cod_emp)) = rtrim(ltrim(a.cedula))
where e.cod_emp <> '0' and s.cod_est <> 0
and (e.fec_egr is null or e.fec_egr > getdate())
--order by s.cod_emp

```
