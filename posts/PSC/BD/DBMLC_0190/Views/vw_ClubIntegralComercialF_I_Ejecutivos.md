# View: vw_ClubIntegralComercialF_I_Ejecutivos

## Usa los objetos:
- [[Centros]]
- [[ClubIntegralEmpleadosCentro]]
- [[Empleados]]
- [[v_ClubIntegral_empleados]]

```sql
CREATE view [dbo].[vw_ClubIntegralComercialF_I_Ejecutivos] as
select distinct c.CodigoEmpleado,(e.Nombres+' '+e.Apellido1+' '+e.Apellido2)Nombres,c.CodigoCentro,ce.NombreCentro

--,m.CodigoMarca,v.Marca,v.CodigoMarcaGrupo,vg.MarcaGrupo,em.IdClubIntegralModeloSub,em.NombreModeloSub
from ClubIntegralEmpleadosCentro c
left join Empleados e on c.CodigoEmpleado = e.CodigoEmpleado
left join Centros	ce	on c.CodigoCentro = ce.CodigoCentro
left join v_ClubIntegral_empleados em on c.CodigoEmpleado = em.CodigoEmpleado
--left join ClubIntegralEmpleadosMarca m on c.CodigoEmpleado = m.CodigoEmpleado
--left join VehiculosMarcas v	on m.CodigoMarca = v.CodigoMarca
--left join VehiculosMarcasGrupos vg on v.CodigoMarcaGrupo = vg.CodigoMarcaGrupo
where IdClubIntegralModeloSub='2'




```
