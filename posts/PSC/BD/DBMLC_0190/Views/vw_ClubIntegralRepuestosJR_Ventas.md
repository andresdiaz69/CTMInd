# View: vw_ClubIntegralRepuestosJR_Ventas

## Usa los objetos:
- [[vw_ClubIntegralRangoMaestrasVersionMax]]
- [[vw_ClubIntegralRepuestosJR_Comparativa_Ventas]]

```sql
CREATE view [dbo].[vw_ClubIntegralRepuestosJR_Ventas] as 
select c.Ano_spiga,c.CodigoEmpleado,c.nombres,c.CodigoCentro,c.NombreCentro,c.cod_marca,c.Marca,c.CodigoMarcaGrupo,c.MarcaGrupo,vm.IdRangoMaestra,vm.IdRangoVersionMax
,case when Tri1_Presu <> 0 then Tri1_Ven/Tri1_Presu *100 else 0 end as Trimestre1_Ventas
,case when Tri2_Presu <> 0 then Tri2_Ven/Tri2_Presu *100 else 0 end as Trimestre2_Ventas
,case when Tri3_Presu <> 0 then Tri3_Ven/Tri3_Presu *100 else 0 end as Trimestre3_Ventas
,case when Tri4_Presu <> 0 then Tri4_Ven/Tri4_Presu *100 else 0 end as Trimestre4_Ventas
from vw_ClubIntegralRepuestosJR_Comparativa_Ventas c
left join vw_ClubIntegralRangoMaestrasVersionMax vm on c.CodigoEmpleado = vm.CodigoEmpleado
where vm.IdRangoMaestra = '57'

```
