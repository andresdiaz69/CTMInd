# View: vw_CargosComisionesManuales

## Usa los objetos:
- [[Cargos]]
- [[EmpleadosActivos]]

```sql
CREATE view [com].[vw_CargosComisionesManuales]
as
select distinct codigo_departamento, Codigo_Cargo, Nombre_Cargo, Unidad_Negocio,  Nombre_Unidad_Negocio
  from        EmpleadosActivos    a

left join    Cargos                c    on    a.Codigo_Cargo = c.CodigoCargo

where c.Activo = 1
and c.Obsoleto = 0
and a.codigo_cargo not in (120)
and a.Ano_Periodo = YEAR(GETDATE())
and a.Mes_Periodo = MONTH(GETDATE())

```
