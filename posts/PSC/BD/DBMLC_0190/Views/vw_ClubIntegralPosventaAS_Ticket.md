# View: vw_ClubIntegralPosventaAS_Ticket

## Usa los objetos:
- [[ClubIntegralAsesorDeServicioTicketEntrada]]
- [[v_ClubIntegral_empleados]]

```sql
CREATE VIEW [dbo].[vw_ClubIntegralPosventaAS_Ticket] AS

select CodigoEmpleado,Nombres,CodigoCentro,NombreCentro,IdCLubIntegralModeloSub,NombreModeloSub,CodigoMarca,Marca,CodigoMarcaGrupo,MarcaGrupo,Ano,Trimestre,Calidad_Informacion,Resultado
from
(
select distinct t.CodigoEmpleado,e.Nombres ,e.CodigoCentro,e.NombreCentro,e.IdCLubIntegralModeloSub,e.NombreModeloSub,e.CodigoMarca,e.Marca,e.CodigoMarcaGrupo,e.MarcaGrupo,t.Ano,t.Trimestre,t.Calidad_Informacion
,CASE WHEN Calidad_Informacion > 85.0 THEN 'pasa' ELSE 'no_pasa' END AS Resultado
from ClubIntegralAsesorDeServicioTicketEntrada t
left join v_ClubIntegral_empleados e	on t.CodigoEmpleado = e.CodigoEmpleado
)a


```
