# Stored Procedure: MLC_ConsultaEmpleados

## Usa los objetos:
- [[gen_ccosto]]
- [[gen_ciudad]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_clasif4]]
- [[gen_clasif5]]
- [[gen_clasif6]]
- [[gen_compania]]
- [[gen_deptos]]
- [[gen_sucursal]]
- [[rhh_cargos]]
- [[rhh_emplea]]
- [[v_Empresa_Cen_Sec_Dep_Spiga]]

```sql
---- =============================================
---- Author:          <Juan Carlos Ortiz>
---- Create date: <2017-05-18>
---- Description:     <Consulta de Empleados en Novasoft para el modulo de comisiones>
---- =============================================
CREATE PROCEDURE [dbo].[MLC_ConsultaEmpleados]
 
@fecha_ini   date,
@fecha_fin   date
AS
BEGIN
SET NOCOUNT ON;

select e.cod_emp,Nombres = e.nom_emp, apellido1=e.ap1_emp, apellido2= e.ap2_emp,e.fec_ing,e.fec_egr,
emp.Cod_empresa,emp.nombre_empresa,
cod_marca=g3.codigo,nombre_marca=g3.nombre,
Cod_centro=Cod_centro,Centro=emp.Nombre_centro,
cod_seccion=g1.codigo,Nombre_seccion,
Departamento =Cod_Departamento,
cod_suc=e.cod_cl5,nom_suc=g5.nombre,
r.cod_car,r.nom_car,
e.e_mail,FechaNacimiento=e.fec_nac
from rhh_emplea				e
left join gen_deptos		d      on     e.pai_res=d.cod_pai and e.dpt_res=d.cod_dep  
left join gen_ciudad		c      on     e.pai_res=c.cod_pai and e.dpt_res=c.cod_dep    and e.ciu_res=c.cod_ciu
left join gen_sucursal		s      on     e.cod_suc=s.cod_suc
left join gen_ccosto		o      on     o.cod_cco=e.cod_cco
left join gen_clasif1      g1     on     g1.codigo=e.cod_cl1
left join gen_clasif2      g2     on     g2.codigo=e.cod_cl2
left join gen_clasif3      g3     on     g3.codigo=e.cod_cl3
left join gen_clasif4      g4     on     g4.codigo=e.cod_cl4
left join gen_clasif5      g5     on     g5.codigo=e.cod_cl5
left join gen_clasif6      g6     on     g6.codigo=e.cod_cl6

left join rhh_cargos		r      on     r.cod_car=e.cod_car
left join gen_compania		i	on	i.cod_cia=e.cod_cia
left join v_Empresa_Cen_Sec_Dep_Spiga   emp    on		emp.cod_seccion=g1.codigo and e.cod_cco=emp.Cod_centro 
														and i.cod_cia=Cod_empresa
where  e.cod_emp <> '0'  
--and e.ind_svar = 1
and e.cod_cl6 = 'SI'
and e.fec_ing >= @fecha_ini
and e.fec_ing <= @fecha_fin

--order by  e.cod_emp
END




```
