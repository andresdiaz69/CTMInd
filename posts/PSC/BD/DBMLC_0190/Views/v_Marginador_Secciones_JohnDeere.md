# View: v_Marginador_Secciones_JohnDeere

## Usa los objetos:
- [[spiga_EstructuraDeCostos]]
- [[UnidadDeNegocio]]

```sql
create view v_Marginador_Secciones_JohnDeere as
select distinct a.Cod_Centro,a.Nombre_Centro,a.Cod_seccion,a.Nombre_Seccion,a.Cod_Departamento,a.Nombre_Departamento,
CodUnidadNegocio = case when u.CodUnidadNegocio is null and a.Nombre_Seccion like '%Wirtgen%' then 520
						when u.CodUnidadNegocio is null and a.Nombre_Seccion like '%agr%' then 410
						when u.CodUnidadNegocio is null and a.Nombre_Seccion like '%constr%' then 411
						when u.CodUnidadNegocio = 417 and a.Nombre_Seccion like '%Wirtgen%' then 520
						when u.CodUnidadNegocio = 417 and a.Nombre_Seccion like '%agr%' then 410
						when u.CodUnidadNegocio = 417 and a.Nombre_Seccion like '%constr%' then 411
					else u.CodUnidadNegocio
					end,
NombreUnidadNegocio = case when u.CodUnidadNegocio is null and a.Nombre_Seccion like '%Wirtgen%' then 'Wirtgen'
						when u.CodUnidadNegocio is null and a.Nombre_Seccion like '%agr%' then 'JD Agricola'
						when u.CodUnidadNegocio is null and a.Nombre_Seccion like '%constr%' then 'JD Construccion'
						when u.CodUnidadNegocio = 417 and a.Nombre_Seccion like '%Wirtgen%' then 'Wirtgen'
						when u.CodUnidadNegocio = 417 and a.Nombre_Seccion like '%agr%' then 'JD Agricola'
						when u.CodUnidadNegocio = 417 and a.Nombre_Seccion like '%constr%' then 'JD Construccion'
					else u.NombreUnidadNegocio
					end
from(
		select e.Cod_Centro,e.Nombre_Centro,e.Cod_seccion,e.Nombre_Seccion,e.Cod_Departamento,e.Nombre_Departamento
		from [PSCService_DB].dbo.spiga_EstructuraDeCostos	e
		where e.Cod_empresa = 19
		and e.Nombre_Centro like '%JD-%'
		and e.Cod_Departamento = 'RE'
		UNION ALL
		select e.Cod_Centro,e.Nombre_Centro,e.Cod_seccion,e.Nombre_Seccion,e.Cod_Departamento,e.Nombre_Departamento
		from [PSCService_DB].dbo.spiga_EstructuraDeCostos	e
		where e.Cod_empresa = 19
		and e.Cod_Centro = 146
		and e.Cod_Departamento = 'RE'
		and e.Nombre_Seccion like '%JD%'
)a	left join UnidadDeNegocio	u	on	a.cod_centro = u.CodCentro
										and a.cod_seccion = u.CodSeccion
										and a.cod_departamento = u.CodDepartamento




```
