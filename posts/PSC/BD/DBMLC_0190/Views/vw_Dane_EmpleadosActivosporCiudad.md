# View: vw_Dane_EmpleadosActivosporCiudad

## Usa los objetos:
- [[DaneMunicipios]]
- [[v_EmpleadosActivosRetirados]]

```sql
CREATE view [dbo].[vw_Dane_EmpleadosActivosporCiudad] as
	select Ano_Periodo,Mes_Periodo,CodigoEmpresa,Empresa,Nombre_Ciudad_trabajo,NombreDepartamento,Nombre_Departamento_trabajo,PersonalActivo = sum(personalactivo),
	TerminoIndefinido=sum(TerminoIndefinido),TerminoFijo = sum(TerminoFijo),Aprendizaje= sum(Aprendizaje), Estado
	from(
	select e.Ano_Periodo,e.Mes_Periodo,e.CodigoEmpleado,e.CodigoEmpresa,e.Empresa,e.Nombre_Ciudad_trabajo,NombreDepartamento=u.ConceptoDepartamento,e.Nombre_Departamento_trabajo,
	u.ConceptoDepartamento,PersonalActivo=count(CodigoEmpleado), e.Estado,
	TerminoIndefinido = case when Codigo_Tipo_Contrato in ('01','1','13','06','07') then 1 else 0 end,
	TerminoFijo = case when Codigo_Tipo_Contrato in ('02','05','12') then 1 else 0 end,
	Aprendizaje= case when Codigo_Tipo_Contrato in ('09','10') then 1 else 0 end
	from	v_EmpleadosActivosRetirados	e
	left join	DaneMunicipios	u	on	e.CodigoEmpresa= u.CodigoEmpresa
	and e.Codigo_Departamento_trabajo = u.CodigoDepartamento
	where e.estado = 'activo'
	--and e.ano_periodo = 2020
	--and e.Mes_Periodo = 10
	--and e.CodigoEmpresa = 6
	group by e.Ano_Periodo,e.Mes_Periodo,e.CodigoEmpleado,e.CodigoEmpresa,e.Empresa,e.Nombre_Ciudad_trabajo,u.ConceptoDepartamento,e.Nombre_Departamento_trabajo,
	u.ConceptoDepartamento,Codigo_Tipo_Contrato,Estado
	) a group by Ano_Periodo,Mes_Periodo,CodigoEmpresa,Empresa,Nombre_Ciudad_trabajo,NombreDepartamento,Nombre_Departamento_trabajo,Estado

```
