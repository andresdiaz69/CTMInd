# View: v_UsuariosSpiga

## Usa los objetos:
- [[EmpleadosActivos]]
- [[spiga_Empleados]]

```sql
CREATE view [dbo].[v_UsuariosSpiga] as 
select orden, IdUsuarios
from(
	select isnull(row_number() over(partition by orden order by convert(int,orden)), 0) as orden,CodigoEmpleado,IdUsuarios
	from(
			select row_number() over(partition by idempleados order by convert(int,idusuarios)) orden,
			e.CodigoEmpleado,IdUsuarios,e.nombre_seccion,e.Nombre_Cargo
			from		[PSCService_DB].dbo.spiga_Empleados	s	
			left join	[DBMLC_0190].dbo.EmpleadosActivos	e	on	convert(varchar,e.CodigoEmpleado) = convert(varchar,s.NifCif)
																	and e.Ano_Periodo = year(getdate())
																	and e.Mes_Periodo = month(getdate())
																	
			where s.Ano_Periodo = year(getdate())
			and s.Mes_Periodo = month(getdate())
			and s.idusuarios is not null
			and ((nombre_seccion  not like '%tecnolog%') --and nombre_seccion  not like '%contabil%') and Nombre_Cargo  not like '%Gerente General%')
			or nombre_seccion is null)
	) a 
)b

```
