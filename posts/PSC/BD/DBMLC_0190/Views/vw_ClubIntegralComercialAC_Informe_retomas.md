# View: vw_ClubIntegralComercialAC_Informe_retomas

## Usa los objetos:
- [[Centros]]
- [[Empleados]]
- [[VehiculosMarcas]]
- [[VehiculosMarcasGrupos]]
- [[vw_ClubIntegralComercialAC_Retomas_Comparativa]]

```sql

CREATE view [dbo].[vw_ClubIntegralComercialAC_Informe_retomas] as

select distinct r.Periodo,r.CodigoEmpleado,e.Nombres+' '+e.Apellido1+' '+e.Apellido2 as Nombres,e.CodigoCentro,c.NombreCentro,e.cod_marca,v.Marca,v.CodigoMarcaGrupo,vg.MarcaGrupo,sum(r.Julio)Julio,sum(r.Agosto)Agosto,sum(r.Septiembre)Septiembre,sum(r.Octubre)Octubre,sum(r.Noviembre)Noviembre,sum(r.Diciembre)Diciembre,sum(r.Enero)Enero,sum(r.Febrero)Febrero,sum(r.Marzo)Marzo,sum(r.Abril)Abril,sum(r.Mayo)Mayo,sum(r.Junio)Junio
from vw_ClubIntegralComercialAC_Retomas_Comparativa r
left join Empleados e on r.CodigoEmpleado = e.CodigoEmpleado
left join Centros c on e.CodigoCentro = c.CodigoCentro
left join VehiculosMarcas v on e.cod_marca = v.CodigoMarca
left join VehiculosMarcasGrupos vg on v.CodigoMarcaGrupo = vg.CodigoMarcaGrupo
group by r.Periodo,r.CodigoEmpleado,e.Nombres,e.Apellido1,e.Apellido2,e.CodigoCentro,c.NombreCentro,e.cod_marca,v.Marca,v.CodigoMarcaGrupo,vg.MarcaGrupo

union all

select  Periodo,CodigoEmpleado,Nombres,CodigoCentro,NombreCentro,cod_marca,Marca,CodigoMarcaGrupo,MarcaGrupo,sum(Julio)Julio,sum(Agosto)Agosto,sum(Septiembre)Septiembre,sum(Octubre)Octubre,sum(Noviembre)Noviembre,sum(Diciembre)Diciembre,sum(Enero)Enero,sum(Febrero)Febrero,sum(Marzo)Marzo,sum(Abril)Abril,sum(Mayo)Mayo,sum(Junio)Junio
from 
(
	select ''Periodo,''CodigoEmpleado,''Nombres,CodigoCentro,NombreCentro,''cod_marca,''Marca,CodigoMarcaGrupo,''MarcaGrupo,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre,Enero,Febrero,Marzo,Abril,Mayo,Junio
		from 
		(
			select distinct r.Periodo,r.CodigoEmpleado,e.Nombres+' '+e.Apellido1+' '+e.Apellido2 as Nombres,e.CodigoCentro,c.NombreCentro,e.cod_marca,v.Marca,v.CodigoMarcaGrupo,vg.MarcaGrupo,sum(r.Julio)Julio,sum(r.Agosto)Agosto,sum(r.Septiembre)Septiembre,sum(r.Octubre)Octubre,sum(r.Noviembre)Noviembre,sum(r.Diciembre)Diciembre,sum(r.Enero)Enero,sum(r.Febrero)Febrero,sum(r.Marzo)Marzo,sum(r.Abril)Abril,sum(r.Mayo)Mayo,sum(r.Junio)Junio
			from vw_ClubIntegralComercialAC_Retomas_Comparativa r
			left join Empleados e on r.CodigoEmpleado = e.CodigoEmpleado
			left join Centros c on e.CodigoCentro = c.CodigoCentro
			left join VehiculosMarcas v on e.cod_marca = v.CodigoMarca
			left join VehiculosMarcasGrupos vg on v.CodigoMarcaGrupo = vg.CodigoMarcaGrupo
			group by r.Periodo,r.CodigoEmpleado,e.Nombres,e.Apellido1,e.Apellido2,e.CodigoCentro,c.NombreCentro,e.cod_marca,v.Marca,v.CodigoMarcaGrupo,vg.MarcaGrupo
		)a
	group by Periodo,CodigoEmpleado,Nombres,CodigoCentro,NombreCentro,cod_marca,Marca,CodigoMarcaGrupo,MarcaGrupo,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre,Enero,Febrero,Marzo,Abril,Mayo,Junio
)b
group by Periodo,CodigoEmpleado,Nombres,CodigoCentro,NombreCentro,cod_marca,Marca,CodigoMarcaGrupo,MarcaGrupo


```
