# View: vw_ConsignacionesDetalles

## Usa los objetos:
- [[ConsignacionesDetalles]]
- [[Empresas]]
- [[Spiga_CtaBancarias]]
- [[VehiculosMarcas]]
- [[vw_Usuarios_Empresa]]

```sql



CREATE view [dbo].[vw_ConsignacionesDetalles]  as 
 select d.*,s.Descripcion2,e.NombreEmpresa, 
 
 -- JCS: 2022/08/31 - NCESARIO PQ ELLA NO ES UN EMPLEADO ACTIVO Y NO APARECE EN LA VISTA
 CASE WHEN d.UserId = '6aeecd32-beef-4a89-8491-2bd12df5aa41' THEN 'Francy Yolima Rojas Pardo' 
 ELSE u.Nombres +' '+u.Apellidos
 END AS UsuarioCreo, 

 CASE WHEN d.ModificoEstado_UserId = '6aeecd32-beef-4a89-8491-2bd12df5aa41' THEN 'Francy Yolima Rojas Pardo' 
 ELSE u1.Nombres +' '+u1.Apellidos
 END AS UsuarioModifico 

  from ConsignacionesDetalles d
 left join Spiga_CtaBancarias s on d.PkFkEmpresas = s.PkFkEmpresas and d.PkCtaBancarias_Iden = s.PkCtaBancarias_Iden
 left join VehiculosMarcas v on d.CodigoMarca = v.CodigoMarca
 left join Empresas e on d.PkFkEmpresas = e.CodigoEmpresa
 left join vw_Usuarios_Empresa u on d.UserId = u.UserId 
 left join vw_Usuarios_Empresa u1 on d.ModificoEstado_UserId = u1.UserId

```
