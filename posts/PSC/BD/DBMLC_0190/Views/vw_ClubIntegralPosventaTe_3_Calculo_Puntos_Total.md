# View: vw_ClubIntegralPosventaTe_3_Calculo_Puntos_Total

## Usa los objetos:
- [[v_ClubIntegral_empleados]]
- [[vw_ClubIntegralPosventaTe_3_Calculo_Puntos_Ocupacion]]
- [[vw_ClubIntegralPosventaTe_3_Calculo_Puntos_tasaretorno]]

```sql
CREATE VIEW [dbo].[vw_ClubIntegralPosventaTe_3_Calculo_Puntos_Total] AS
select a.CodigoEmpleado,a.Nombres,a.CodigoMarca,a.Marca,a.CodigoMarcaGrupo,a.MarcaGrupo,a.CodigoCentro,a.NombreCentro,a.Ano,a.Trimestre,a.Ocupacion,a.PuntosOcupacion,a.Tasa_de_retorno,a.PuntosTasaRetorno
,(a.PuntosOcupacion+a.PuntosTasaRetorno)PuntosTotal
from (
select e.CodigoEmpleado,e.Nombres,e.CodigoMarca,e.Marca,e.CodigoMarcaGrupo,e.MarcaGrupo,e.CodigoCentro,e.NombreCentro,isnull(t.Ano,o.Ano)Ano,isnull(t.Trimestre,o.Trimestre)Trimestre
,isnull(o.Ocupacion,0)Ocupacion,isnull(o.Puntos,0)PuntosOcupacion
,isnull(t.Tasa_de_retorno,0)Tasa_de_retorno,isnull(t.Puntos,0)PuntosTasaRetorno
from v_ClubIntegral_empleados e
left join vw_ClubIntegralPosventaTe_3_Calculo_Puntos_Ocupacion o on  e.CodigoEmpleado = o.CodigoEmpleado and e.CodigoMarca = o.CodigoMarca and e.CodigoMarcaGrupo = o.CodigoMarcaGrupo
left join vw_ClubIntegralPosventaTe_3_Calculo_Puntos_tasaretorno t on e.CodigoEmpleado = t.CodigoEmpleado and e.CodigoMarca = t.CodigoMarca and e.CodigoMarcaGrupo = t.CodigoMarcaGrupo and o.Ano = t.Ano  and o.Trimestre = t.Trimestre 
where o.Ano is not null
)a

```
