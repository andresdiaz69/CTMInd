# View: vw_Usuarios_Empresa

## Usa los objetos:
- [[AspNetUsers]]
- [[EmpleadosActivos]]
- [[Empresas]]
- [[Profiles]]

```sql

CREATE view [dbo].[vw_Usuarios_Empresa] as
select Profiles.*,AspNetUsers.UserName,EmpleadosActivos.CodigoEmpresa, Empresas.NombreEmpresa
from Profiles
left join AspNetUsers on Profiles.UserId = AspNetUsers.Id
left join EmpleadosActivos on AspNetUsers.UserName = EmpleadosActivos.CodigoEmpleado and EmpleadosActivos.Ano_Periodo = YEAR(GETDATE()) AND EmpleadosActivos.Mes_Periodo = MONTH(GETDATE())
left join Empresas on EmpleadosActivos.CodigoEmpresa = Empresas.CodigoEmpresa
where Empresas.CodigoEmpresa is not null

```
