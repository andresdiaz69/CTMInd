# View: v_Novasoft_Gestion_ausentimos

## Usa los objetos:
- [[rhh_ausentismo]]
- [[rhh_emplea]]
- [[rhh_TbClasAus]]
- [[rhh_tbenfer]]
- [[rhh_TbTipAus]]
- [[UnidadDeNegocio]]
- [[v_EmpleadosActivosRetirados]]

```sql

CREATE view [dbo].[v_Novasoft_Gestion_ausentimos] as

select distinct e.Ano_Periodo,e.Mes_Periodo,e.estado,cedula = CodigoEmpleado,Nombre = e.nombres + ' ' + e.Apellido1 + ' ' + e.Apellido2,e.Codigo_Cargo,e.Nombre_Cargo,
       e.CodigoEmpresa,e.Empresa,e.CodigoMarca,e.Marca,e.codigo_centro,e.nombre_centro,e.codigo_seccion,e.nombre_seccion,e.codigo_departamento,
       e.nombre_departamento,e.Codigo_Sucursal,e.Nombre_Sucursal,e.fecha_ingreso,e.Fecha_retiro,e.Codigo_Ciudad_trabajo,e.Nombre_Ciudad_trabajo,
       dias = sum(a.dias),a.fec_ini,a.fec_fin,a.ini_aus,a.fin_aus,a.cod_aus,t.nom_aus,c.des_cla_aus,a.cod_enf,f.nom_enf,
       Prorroga  = case when a.ind_pro = 1 then 'SI' else 'NO' end,u.CodUnidadNegocio,u.NombreUnidadNegocio
  from v_EmpleadosActivosRetirados	e
  left join UnidadDeNegocio u on u.CodCentro = e.codigo_centro
                             and u.CodEmpresa = e.CodigoEmpresa
                       	  --   and u.CodDepartamento =e.codigo_departamento
                       	     and u.CodSeccion = e.codigo_seccion
  left join	[Novasoft_CT_MM].[dbo].[rhh_emplea]		n	on	e.CodigoEmpleado = n.cod_emp 
  left join	[Novasoft_CT_MM].[dbo].rhh_ausentismo	a	on	e.CodigoEmpleado = a.cod_emp
  left join	[Novasoft_CT_MM].[dbo].rhh_TbTipAus		t	on	a.cod_aus = t.cod_aus
  left join	[Novasoft_CT_MM].[dbo].rhh_TbClasAus	c	on	t.cla_aus = c.cla_aus
  left join	[Novasoft_CT_MM].[dbo].rhh_tbenfer		f	on	a.cod_enf = f.cod_enf
--  where year(ini_aus) = 2024
--and month(ini_aus) = 11
--and Ano_Periodo =  year(ini_aus)--8469
--and Mes_Periodo = month(ini_aus) 
--and  CodigoEmpleado = '1010204263'
group by e.Ano_Periodo,e.Mes_Periodo,e.estado,CodigoEmpleado,e.nombres,e.Apellido1,e.Apellido2,e.Codigo_Cargo,e.Nombre_Cargo,
         e.CodigoEmpresa,e.Empresa,e.CodigoMarca,e.Marca,e.codigo_centro,e.nombre_centro,e.codigo_seccion,e.nombre_seccion,e.codigo_departamento,
         e.nombre_departamento,e.Codigo_Sucursal,e.Nombre_Sucursal,e.fecha_ingreso,e.Fecha_retiro,e.Codigo_Ciudad_trabajo,e.Nombre_Ciudad_trabajo,
         a.fec_ini,a.fec_fin,a.ini_aus,a.fin_aus,a.cod_aus,t.nom_aus,c.des_cla_aus,a.cod_enf,f.nom_enf,a.ind_pro,u.CodUnidadNegocio,u.NombreUnidadNegocio


```
