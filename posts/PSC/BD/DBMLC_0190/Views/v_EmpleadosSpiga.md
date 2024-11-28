# View: v_EmpleadosSpiga

## Usa los objetos:
- [[spiga_Empleados]]
- [[v_EmpleadosActivosRetirados]]

```sql

CREATE view [dbo].[v_EmpleadosSpiga] as
select IdEmpleados,NifCif,IdTerceros,IdUsuarios,nombre,a.Apellido1,a.Apellido2,c.estado,c.codigo_centro,c.nombre_centro,Email_Corporativo
from(
		select distinct orden= ROW_NUMBER() over(partition by idempleados order by FechaDeCorte desc),FechaDeCorte,
		e.IdEmpleados,e.IdTerceros,e.IdUsuarios,e.nombre,e.Apellido1,e.Apellido2,e.NifCif
		from [PSCService_DB].dbo.spiga_Empleados	e
		where IdEmpleados <> 0 
		--and IdEmpleados = 780
)a left join 

	(select CodigoEmpleado,Nombres,Apellido1,Apellido2,estado,codigo_centro,nombre_centro,Email_Corporativo
	from(
			select orden= ROW_NUMBER() over(partition by CodigoEmpleado order by Fecha_retiro desc),
			CodigoEmpleado,Nombres,Apellido1,Apellido2,estado,codigo_centro,nombre_centro,Email_Corporativo
			from(
				select distinct CodigoEmpleado,Nombres,Apellido1,Apellido2,estado,codigo_centro,nombre_centro,Fecha_retiro=DATEADD(MONTH, DATEDIFF(MONTH, 0, GETDATE()), 0),
				Email_Corporativo
				from v_EmpleadosActivosRetirados
				where estado = 'activo'
				and Ano_Periodo = year(getdate())
				and Mes_Periodo = month(getdate())
				--and CodigoEmpleado = '1234644282'
				union all
				select distinct CodigoEmpleado,Nombres,Apellido1,Apellido2,estado,codigo_centro,nombre_centro,Fecha_retiro,Email_Corporativo
				from v_EmpleadosActivosRetirados
				where estado = 'retirado'
				--and CodigoEmpleado = '1234644282'
			)a 
	)b where orden = 1) c	on	convert(varchar,a.NifCif) = convert(varchar,c.CodigoEmpleado)
where orden = 1

```
