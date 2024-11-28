# View: vw_ClubIntegralComercialAC_Carroceria

## Usa los objetos:
- [[ClubIntegralComercialAC_Carroceria]]
- [[Empleados]]
- [[Profiles]]
- [[VehiculosMarcas]]
- [[VehiculosMarcasGrupos]]

```sql
CREATE view [dbo].[vw_ClubIntegralComercialAC_Carroceria] as
select c.CodigoEmpleado,(e.Nombres+' '+e.Apellido1+' '+e.Apellido2)Nombres,c.Ano,c.CodigoMarca,v.Marca,v.CodigoMarcaGrupo,vg.MarcaGrupo,c.Mes,c.Numero_Factura,c.Cantidad,c.Carroceria
from ClubIntegralComercialAC_Carroceria c
left join Empleados e on c.CodigoEmpleado = e.CodigoEmpleado
left join VehiculosMarcas v on c.CodigoMarca = v.CodigoMarca
left join VehiculosMarcasGrupos vg on v.CodigoMarcaGrupo = vg.CodigoMarcaGrupo 
left join Profiles p on c.UserIdCreo = p.UserId




```
