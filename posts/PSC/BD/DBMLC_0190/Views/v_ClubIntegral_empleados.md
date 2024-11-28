# View: v_ClubIntegral_empleados

## Usa los objetos:
- [[Cargos]]
- [[Centros]]
- [[ClubIntegralCargosGrupos]]
- [[ClubIntegralCargosGrupos_Cargos]]
- [[ClubIntegralCargosRangosMaestras]]
- [[ClubIntegralModelosSub]]
- [[Empleados]]
- [[VehiculosMarcas]]
- [[VehiculosMarcasGrupos]]

```sql
CREATE view [dbo].[v_ClubIntegral_empleados] as

select distinct  g.CodigoCargoGrupo,g.NombreCargoGrupo,

c.CodigoCargo,s.NombreCargo,b.IdCLubIntegralModeloSub,b.NombreModeloSub,em.CodigoEmpleado,

nombres = em.Nombres + ' ' + em.Apellido1 + ' ' + em.Apellido2,ma.CodigoMarca,ma.Marca,em.CodigoCentro,ce.NombreCentro,mg.CodigoMarcaGrupo,mg.MarcaGrupo

from         ClubIntegralCargosGrupos               g

left join		ClubIntegralCargosGrupos_Cargos			c		on		g.CodigoCargoGrupo = c.CodigoCargoGrupo

left join		cargos									s		on		c.CodigoCargo = s.CodigoCargo

left join		empleados								em		on		c.CodigoCargo = em.CodigoCargo and em.FechaRetiro is null

left join		VehiculosMarcas							ma		on		em.cod_marca = ma.CodigoMarca

left join		VehiculosMarcasGrupos					mg		on		ma.CodigoMarcaGrupo = mg.CodigoMarcaGrupo

left join		ClubIntegralCargosRangosMaestras		m		on		m.CodigoCargoGrupo = g.CodigoCargoGrupo

left join		ClubIntegralModelosSub                  b		on		b.IdCLubIntegralModeloSub = m.IdCLubIntegralModeloSub

left join		Centros									ce		on		em.CodigoCentro = ce.CodigoCentro

where em.nombres is not null 


```
