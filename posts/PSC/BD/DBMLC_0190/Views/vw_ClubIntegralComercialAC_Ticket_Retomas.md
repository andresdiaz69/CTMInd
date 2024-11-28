# View: vw_ClubIntegralComercialAC_Ticket_Retomas

## Usa los objetos:
- [[Centros]]
- [[ClubIntegralTicketDeEntradaAC]]
- [[Empleados]]
- [[v_EmpleadosActivosRetirados]]
- [[VehiculosMarcas]]
- [[VehiculosMarcasGrupos]]
- [[vw_ClubIntegralComercialAC_Retomas_Comparativa]]
- [[vw_ClubIntegralRangoMaestrasVersionMax]]

```sql
CREATE view [dbo].[vw_ClubIntegralComercialAC_Ticket_Retomas] as

select Periodo,Ano,CodigoEmpleado,Nombres,cod_marca,Marca,CodigoMarcaGrupo,MarcaGrupo,CodigoMarcaCI,MarcaCI,CodigoCentro,NombreCentro,Retomas_Trimestrales,Codigo_Departamento_trabajo,Nombre_Departamento_trabajo
,Trimestre
,Retomas
,case when Retomas >= Retomas_Trimestrales then 'PASA' else 'NO PASA' end Resultado

from 
(
	select Periodo,Ano,CodigoEmpleado,Nombres,cod_marca,Marca,CodigoMarcaGrupo,MarcaGrupo,CodigoMarcaCI,MarcaCI,CodigoCentro,NombreCentro,Retomas_Trimestrales,Codigo_Departamento_trabajo,Nombre_Departamento_trabajo,Trimestre,Retomas
	from
	(
		select  a.Periodo,a.Ano,a.CodigoEmpleado,a.Nombres,a.cod_marca,a.Marca,a.CodigoMarcaGrupo,a.MarcaGrupo,a.CodigoMarcaCI,a.MarcaCI,a.CodigoCentro,a.NombreCentro
		,case when a.cod_marca = '1' or s.Codigo_Departamento_trabajo is not null then '0' else t.Retomas_Trimestrales end Retomas_Trimestrales
		,s.Codigo_Departamento_trabajo,s.Nombre_Departamento_trabajo,a.Trimestre1 as '1',a.Trimestre2 as '2',a.Trimestre3 as '3',a.Trimestre4 as '4'
		from 
		(
			select r.Periodo,r.Ano,r.CodigoEmpleado,e.Nombres+' '+e.Apellido1+' '+e.Apellido2 as Nombres,e.cod_marca,v.Marca,v.CodigoMarcaGrupo,vg.MarcaGrupo
			,case when e.cod_marca = '13' then '13' else v.CodigoMarcaGrupo end as CodigoMarcaCI
			,case when e.cod_marca = '13' then 'Mercedes-Benz' else vg.MarcaGrupo end as MarcaCI
			,e.CodigoCentro,c.NombreCentro
			,(r.Julio+r.Agosto+r.Septiembre)Trimestre1
			,(r.Octubre+r.Noviembre+r.Diciembre)Trimestre2
			,(r.Enero+r.Febrero+r.Marzo)Trimestre3
			,(r.Abril+r.Mayo+r.Junio)Trimestre4
			,vm.IdRangoMaestra,vm.IdRangoVersionMax
			from vw_ClubIntegralComercialAC_Retomas_Comparativa r
			left join Empleados e on r.CodigoEmpleado = e.CodigoEmpleado
			left join VehiculosMarcas v on e.cod_marca = v.CodigoMarca
			left join VehiculosMarcasGrupos vg on v.CodigoMarcaGrupo = vg.CodigoMarcaGrupo
			left join vw_ClubIntegralRangoMaestrasVersionMax vm on r.CodigoEmpleado = vm.CodigoEmpleado
			left join Centros c on e.CodigoCentro = c.CodigoCentro
			where vm.IdRangoMaestra ='5' 
			--and e.cod_marca ='1'
		)a
		left join ClubIntegralTicketDeEntradaAC t on a.CodigoMarcaCI = t.CodigoMarcaGrupo
		left join (select distinct v_EmpleadosActivosRetirados.CodigoEmpleado,(Nombres+' '+Apellido1+' '+Apellido2)Nombres,CodigoMarca,Marca,codigo_centro,nombre_centro,Codigo_Cargo,Nombre_Cargo,codigo_departamento_trabajo,Nombre_Departamento_trabajo,vm.IdRangoMaestra,vm.IdRangoVersionMax
					from v_EmpleadosActivosRetirados
					left join vw_ClubIntegralRangoMaestrasVersionMax vm on v_EmpleadosActivosRetirados.CodigoEmpleado = vm.CodigoEmpleado
					where Nombre_Departamento_trabajo  in ('META','TOLIMA','SANTANDER','VALLE DEL CAUCA','BOYACA','HUILA')
					--and Ano_Periodo = year(getdate())
					--and Mes_Periodo = MONTH(getdate())
					and Ano_Periodo = 2018 and Mes_Periodo = 12 and estado = 'activo' and Codigo_Cargo in ('172','174','25','266','267','278','31','317','324','328')
					and vm.IdRangoMaestra ='5'
					group by v_EmpleadosActivosRetirados.CodigoEmpleado,Nombres,Apellido1,Apellido2,CodigoMarca,Marca,codigo_centro,nombre_centro,Codigo_Cargo,Nombre_Cargo,Codigo_Departamento_trabajo,Nombre_Departamento_trabajo,vm.IdRangoMaestra,vm.IdRangoVersionMax
	
					)s on a.CodigoEmpleado = s.CodigoEmpleado

	)p
	unpivot (Retomas for Trimestre in ([1],[2],[3],[4]))as piv
)c

```
