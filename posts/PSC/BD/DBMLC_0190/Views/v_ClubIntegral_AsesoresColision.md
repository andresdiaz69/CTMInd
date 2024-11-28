# View: v_ClubIntegral_AsesoresColision

## Usa los objetos:
- [[Cargos]]
- [[Centros]]
- [[ClubIntegralCargosGrupos]]
- [[ClubIntegralCargosGrupos_Cargos]]
- [[ClubIntegralCargosRangosMaestras]]
- [[ClubIntegralModelosSub]]
- [[EmpleadosActivos]]

```sql


CREATE view [dbo].[v_ClubIntegral_AsesoresColision] as

select distinct g.CodigoCargoGrupo,g.NombreCargoGrupo,

c.CodigoCargo,s.NombreCargo,m.IdCLubIntegralModeloSub,b.NombreModeloSub,e.CodigoEmpleado,

nombres = e.Nombres + ' ' + e.Apellido1 + ' ' + e.Apellido2,ce.CodigoCentro,ce.NombreCentro,CodigoMarca,Marca

from         [dbo].[ClubIntegralCargosGrupos]               g

left join    [dbo].[ClubIntegralCargosGrupos_Cargos]        c      on     g.CodigoCargoGrupo = c.CodigoCargoGrupo

left join    [dbo].[cargos]                                                     s      on       c.CodigoCargo = s.CodigoCargo

left join    [dbo].[EmpleadosActivos]                              e      on     e.Codigo_Cargo = c.CodigoCargo 
--and Ano_Periodo = year(getdate())
--and Mes_Periodo = month(getdate())

left join    [dbo].[ClubIntegralCargosRangosMaestras] m      on     m.CodigoCargoGrupo = g.CodigoCargoGrupo

left join    [dbo].[ClubIntegralModelosSub]                        b      on       b.IdCLubIntegralModeloSub = m.IdCLubIntegralModeloSub

left join centros ce	on e.codigo_centro = ce.CodigoCentro

where e.nombres is not null

and g.CodigoCargoGrupo = 9

and m.IdCLubIntegralModeloSub = 7

 


```
