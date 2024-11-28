# View: vw_ClubIntegralComercialAC_Ticket_Comparativa

## Usa los objetos:
- [[ClubIntegralTicketDeEntradaAC]]
- [[v_EmpleadosActivosRetirados]]
- [[vw_ClubIntegralComercialAC_Ticket_Entregas]]
- [[vw_ClubIntegralComercialAC_Ticket_Retomas]]
- [[vw_ClubIntegralRangoMaestrasVersionMax]]

```sql

CREATE view [dbo].[vw_ClubIntegralComercialAC_Ticket_Comparativa] as


select  Periodo,Ano_periodo,CedulaVendedor,NombreVendedor,CodigoMarcaGrupo,MarcaGrupo,CodigoMarcaCI,MarcaCI,CodigoCentro,NombreCentro,Nombre_Departamento_trabajo,Minimo_De_Entregas_Trimestrales,Retomas_Trimestrales,Trimestre,Entregas,ResultadoEntregas,Retomas,ResultadoRetomas
,case when ResultadoEntregas ='PASA' AND ResultadoRetomas='PASA' then 'PASA' else 'NO PASA' end as Resultado_Ticket

from 
(
	SELECT distinct  Periodo,Ano_periodo,CedulaVendedor,NombreVendedor,CodigoMarcaGrupo,MarcaGrupo,CodigoMarcaCI,MarcaCI,CodigoCentro,NombreCentro,Nombre_Departamento_trabajo,Minimo_De_Entregas_Trimestrales,Retomas_Trimestrales,Trimestre,Entregas,ResultadoEntregas,Retomas
	,case when Retomas >= Retomas_Trimestrales then 'PASA' else 'NO PASA' end ResultadoRetomas
	FROM 
	(
		select a.Periodo,a.Ano_periodo,a.CedulaVendedor,a.NombreVendedor,a.CodigoMarcaGrupo,a.MarcaGrupo,a.CodigoMarcaCI,a.MarcaCI,a.CodigoCentro
		,a.NombreCentro,a.Nombre_Departamento_trabajo,a.Minimo_De_Entregas_Trimestrales
		,isnull(r.Retomas_Trimestrales,case when a.Nombre_Departamento_trabajo is not null OR a.CodigoMarcaCI = 3  then '0' else t.Retomas_Trimestrales end )Retomas_Trimestrales
		,a.Trimestre,isnull(r.Retomas,0)Retomas
		--,isnull(r.Resultado,'NO PASA')ResultadoRetomas
		,a.Entregas,a.ResultadoEntregas
		from 
		(
			select e.Periodo,e.Ano_periodo,e.CedulaVendedor,e.NombreVendedor,e.CodigoMarcaGrupo,e.MarcaGrupo,e.CodigoMarcaCI,e.MarcaCI,e.CodigoCentro,e.NombreCentro,s.Codigo_Departamento_trabajo,s.Nombre_Departamento_trabajo,e.Minimo_De_Entregas_Trimestrales,e.Trimestre,e.Entregas,(e.Resultado)ResultadoEntregas

			from vw_ClubIntegralComercialAC_Ticket_Entregas e
			left join (select distinct v_EmpleadosActivosRetirados.CodigoEmpleado,(Nombres+' '+Apellido1+' '+Apellido2)Nombres,CodigoMarca,Marca,codigo_centro,nombre_centro,Codigo_Cargo,Nombre_Cargo,codigo_departamento_trabajo,Nombre_Departamento_trabajo,vm.IdRangoMaestra,vm.IdRangoVersionMax
					   from v_EmpleadosActivosRetirados
					   left join vw_ClubIntegralRangoMaestrasVersionMax vm on v_EmpleadosActivosRetirados.CodigoEmpleado = vm.CodigoEmpleado
					   where Nombre_Departamento_trabajo  in ('META','TOLIMA','SANTANDER','VALLE DEL CAUCA','BOYACA','HUILA')
					   and Ano_Periodo = year(getdate()) and Mes_Periodo = MONTH(getdate())
					   --and Ano_Periodo = 2018 and Mes_Periodo = 12 
					   and estado = 'activo' and Codigo_Cargo in ('172','174','25','266','267','278','31','317','324','328') and vm.IdRangoMaestra ='5'
					   group by v_EmpleadosActivosRetirados.CodigoEmpleado,Nombres,Apellido1,Apellido2,CodigoMarca,Marca,codigo_centro,nombre_centro,Codigo_Cargo,Nombre_Cargo,Codigo_Departamento_trabajo,Nombre_Departamento_trabajo,vm.IdRangoMaestra,vm.IdRangoVersionMax
					  )s on e.CedulaVendedor = s.CodigoEmpleado
		)a
		left join vw_ClubIntegralComercialAC_Ticket_Retomas r on a.Ano_periodo = r.Ano and a.CedulaVendedor = r.CodigoEmpleado and a.Trimestre = r.Trimestre and a.CodigoMarcaCI = r.CodigoMarcaCI and a.Periodo = r.Periodo
	left join ClubIntegralTicketDeEntradaAC t on a.CodigoMarcaCI = t.CodigoMarcaGrupo
	)b
)c

```
