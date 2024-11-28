# View: v_emp_centro_seccion

## Usa los objetos:
- [[rhh_dis_con]]
- [[rhh_tbdistri]]
- [[v_consulta_ultima_historia_laboral]]

```sql
CREATE view [dbo].[v_emp_centro_seccion] as

select  Empresa_Centro_Seccion=ltrim(rtrim(c.cod_cia))+ltrim(rtrim(c.cod_cco))+ltrim(rtrim(c.cod_cl1)),Origen='Distribucion',Cod_Dist_Cedula=c.cod_dis
from		rhh_tbdistri	d
left join	rhh_dis_con		c	on	c.cod_dis=d.cod_dis
where  (d.fec_fin is null or d.fec_fin > getdate())

UNION ALL

select  Empresa_Centro_Seccion=ltrim(rtrim(cod_cia))+ltrim(rtrim(cod_cco))+ltrim(rtrim(cod_cl1)),Origen='Historia',Cod_Dist_Cedula=cod_emp
from		v_consulta_ultima_historia_laboral

```
