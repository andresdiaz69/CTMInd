# View: vw_ClubIntegralModelosSub_Empleados

## Usa los objetos:
- [[Cargos]]
- [[Centros]]
- [[ClubIntegralCargosGrupos]]
- [[ClubIntegralCargosGrupos_Cargos]]
- [[ClubIntegralCargosRangosMaestras]]
- [[ClubIntegralModelosSub]]
- [[ClubIntegralRangosMaestras]]
- [[v_ClubIntegral_empleados]]

```sql
CREATE VIEW [dbo].[vw_ClubIntegralModelosSub_Empleados] AS

select distinct

cg.CodigoCargoGrupo,cg.NombreCargoGrupo,c.CodigoCargo,c.NombreCargo,m.IdCLubIntegralModeloSub,m.NombreModeloSub,
e.CodigoEmpleado,e.Nombres as NombreEmpleado,e.CodigoMarca,e.Marca,
e.CodigoCentro,rm.IdRangoMaestra,rm.NombreMaestra
from ClubIntegralModelosSub m
left join ClubIntegralCargosRangosMaestras crm			 on			m.IdCLubIntegralModeloSub = crm.IdCLubIntegralModeloSub
left join ClubIntegralCargosGrupos			cg			 on 		crm.CodigoCargoGrupo = cg.CodigoCargoGrupo
left join ClubIntegralCargosGrupos_Cargos  cgc			 on			cg.CodigoCargoGrupo = cgc.CodigoCargoGrupo
left join Cargos							c			 on			cgc.CodigoCargo = c.CodigoCargo
left join v_Clubintegral_empleados			e			 on			c.CodigoCargo = e.CodigoCargo 
left join Centros							ce			 on			e.CodigoCentro = ce.CodigoCentro
inner join ClubIntegralRangosMaestras		rm			 on			m.IdCLubIntegralModeloSub = rm.IdClubIntegralModeloSub

where e.nombres is not null 

```
