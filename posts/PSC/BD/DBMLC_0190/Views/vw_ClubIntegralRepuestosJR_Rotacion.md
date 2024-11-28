# View: vw_ClubIntegralRepuestosJR_Rotacion

## Usa los objetos:
- [[ClubIntegralJefeRepuestosRotacion]]
- [[Empleados]]
- [[VehiculosMarcas]]
- [[VehiculosMarcasGrupos]]

```sql



create view [dbo].[vw_ClubIntegralRepuestosJR_Rotacion] as 
select Ano,CodigoEmpleado,Nombres,CodigoMarca,Marca,CodigoMarcaGrupo,MarcaGrupo,([7]+[8]+[9])Trimestre1,([10]+[11]+[12])Trimestre2,([1]+[2]+[3])Trimestre3,([4]+[5]+[6])Trimestre4
from 
(
	select Ano,CodigoEmpleado,Nombres,CodigoMarca,Marca,CodigoMarcaGrupo,MarcaGrupo,[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12]
	from(
		select r.Ano,r.CodigoEmpleado,r.CodigoMarca,r.Mes,r.Rotacion,v.Marca,v.CodigoMarcaGrupo,vg.MarcaGrupo,e.Nombres+' '+e.Apellido1+' '+e.Apellido2 as Nombres
		from ClubIntegralJefeRepuestosRotacion r
		left join VehiculosMarcas v on r.CodigoMarca = v.CodigoMarca
		left join VehiculosMarcasGrupos vg on v.CodigoMarcaGrupo = vg.CodigoMarcaGrupo
		left join Empleados e on r.CodigoEmpleado = e.CodigoEmpleado
	)a
	pivot(sum(Rotacion) for mes in ([1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12]))PivoTable
)b

```
