# View: vw_ClubIntegralPosventaTe_1y2_Calculo_Puntos_Total

## Usa los objetos:
- [[v_ClubIntegral_empleados]]
- [[vw_ClubIntegralPosventaTe_1y2_Calculo_Puntos_Ocupacion]]
- [[vw_ClubIntegralPosventaTe_1y2_Calculo_Puntos_Productividad]]

```sql
CREATE VIEW [dbo].[vw_ClubIntegralPosventaTe_1y2_Calculo_Puntos_Total] AS

select ROW_NUMBER ()OVER (ORDER BY CodigoEmpleado ASC)as Orden,CodigoEmpleado,Nombres,CodigoMarca,Marca,CodigoMarcaGrupo,MarcaGrupo,CodigoCentro,NombreCentro,Ano,Trimestre,Ocupacion,PuntosOcupacion,Productividad,PuntosProductividad
,(PuntosOcupacion+PuntosProductividad)PuntosTotal
from
(
	select e.CodigoEmpleado,e.Nombres,e.CodigoMarca,e.Marca,e.CodigoMarcaGrupo,e.MarcaGrupo,e.CodigoCentro,e.NombreCentro,o.Ano,o.Trimestre,o.Ocupacion,isnull(o.Puntos,0)PuntosOcupacion,p.Productividad,isnull(p.Puntos,0)PuntosProductividad
	from v_ClubIntegral_empleados e
	left join vw_ClubIntegralPosventaTe_1y2_Calculo_Puntos_Ocupacion o on e.CodigoEmpleado = o.CodigoEmpleado and e.CodigoMarca = o.CodigoMarca and e.CodigoMarcaGrupo = o.CodigoMarcaGrupo
	left join vw_ClubIntegralPosventaTe_1y2_Calculo_Puntos_Productividad p on e.CodigoEmpleado = p.CodigoEmpleado and e.CodigoMarca = p.CodigoMarca and e.CodigoMarcaGrupo = p.CodigoMarcaGrupo and o.Ano = p.Ano and o.Trimestre = p.Trimestre
	where o.Ano is not null
)a

```
