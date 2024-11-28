# View: vw_ClubIntegralPosventaJT_Calculo_Puntos

## Usa los objetos:
- [[VehiculosMarcas]]
- [[VehiculosMarcasGrupos]]
- [[vw_ClubIntegralPosventaJT_Calculo_Puntos_Ocupacion]]
- [[vw_ClubIntegralPosventaJT_Calculo_Puntos_Productividad]]
- [[vw_ClubIntegralPosventaJT_Ticket]]
- [[vw_ClubIntegralPosventaJTC_Calculo_Puntos_RotacionPuestos]]
- [[vw_ClubIntegralPosventaJTM_Calculo_Puntos_RotacionPuestos]]

```sql

CREATE VIEW [dbo].[vw_ClubIntegralPosventaJT_Calculo_Puntos] AS
select a.Orden,a.CodigoEmpleado,a.Nombres,a.CodigoCentro,a.NombreCentro,a.CodigoMarca,a.Marca,v.CodigoMarcaGrupo,vg.MarcaGrupo,a.IdClubIntegralModeloSub,a.NombreModeloSub,a.Ano,a.Trimestre,a.SatisfaccionGlobal,a.Resultado,a.Productividad,a.PuntosProductividad,a.Ocupacion,a.PuntosOcupacion
,a.RotacionPuestosColision,a.PuntosRotacionColision
,a.RotacionPuestosMecanica,PuntosRotacionMecanica
,(a.PuntosProductividad+a.PuntosOcupacion+a.PuntosRotacionColision+a.PuntosRotacionMecanica)PuntosTotal
from
(
	select isnull(ROW_NUMBER()over(order by t.CodigoEmpleado asc),-1)as Orden,
	t.CodigoEmpleado,t.Nombres,t.CodigoCentro,t.NombreCentro,t.CodigoMarca,t.Marca,t.IdClubIntegralModeloSub,t.NombreModeloSub,t.Ano,t.Trimestre,t.SatisfaccionGlobal,t.Resultado
	,isnull(p.Productividad,0)Productividad,isnull(p.Puntos,0)PuntosProductividad
	,isnull(o.Ocupacion,0)Ocupacion, isnull(o.Puntos,0)PuntosOcupacion
	,isnull(rc.RotacionPuestos,0)RotacionPuestosColision,isnull(rc.Puntos,0)PuntosRotacionColision
	,isnull(rm.RotacionPuestos,0)RotacionPuestosMecanica,isnull (rm.Puntos,0)PuntosRotacionMecanica
	from vw_ClubIntegralPosventaJT_Ticket t
	left join vw_ClubIntegralPosventaJT_Calculo_Puntos_Productividad p 
	on t.CodigoEmpleado = p.CodigoEmpleado and t.CodigoMarca = p.CodigoMarca and t.CodigoCentro = p.CodigoCentro and t.IdClubIntegralModeloSub = p.IdClubIntegralModeloSub and t.Ano = p.Ano and t.Trimestre = p.Trimestre
	left join vw_ClubIntegralPosventaJT_Calculo_Puntos_Ocupacion o 
	on t.CodigoEmpleado = o.CodigoEmpleado and t.CodigoMarca = o.CodigoMarca and t.CodigoCentro = o.CodigoCentro and t.IdClubIntegralModeloSub = o.IdClubIntegralModeloSub and t.Ano = o.Ano and t.Trimestre = o.Trimestre
	left join vw_ClubIntegralPosventaJTC_Calculo_Puntos_RotacionPuestos rc 
	on t.CodigoEmpleado = rc.CodigoEmpleado and t.CodigoMarca = rc.CodigoMarca and t.IdClubIntegralModeloSub = rc.IdClubIntegralModeloSub and t.Ano = rc.Ano and t.Trimestre = rc.Trimestre
	left join vw_ClubIntegralPosventaJTM_Calculo_Puntos_RotacionPuestos rm 
	on t.CodigoEmpleado = rm.CodigoEmpleado and t.CodigoMarca = rm.CodigoMarca and t.IdClubIntegralModeloSub = rm.IdClubIntegralModeloSub and t.Ano = rm.Ano and t.Trimestre = rm.Trimestre
)a
left join VehiculosMarcas v on a.CodigoMarca = v.CodigoMarca
left join VehiculosMarcasGrupos vg on v.CodigoMarcaGrupo = vg.CodigoMarcaGrupo

```
