# View: vw_ClubIntegralRepuestos_CumplimientoSede

## Usa los objetos:
- [[VehiculosMarcas]]
- [[vw_Centros]]
- [[vw_ClubIntegralRepuestos_Comparativa_CumplimientoSede]]

```sql
create view [dbo].[vw_ClubIntegralRepuestos_CumplimientoSede] as
select distinct cs.Ano
,cm.SiglaMarca,v.CodigoMarca,v.Marca
,sum(cs.Trimestre1Ventas)Trimestre1Ventas
,sum(cs.Trimestre2Ventas)Trimestre2Ventas
,sum(cs.Trimestre3Ventas)Trimestre3Ventas
,sum(cs.Trimestre4Ventas)Trimestre4Ventas
from vw_ClubIntegralRepuestos_Comparativa_CumplimientoSede cs
left join vw_Centros cm on cs.CodigoCentro = cm.CodigoCentro
left join VehiculosMarcas v on cm.SiglaMarca = v.SiglaMarca
--where Ano = 2018 --and cm.SiglaMarca ='MZ' 
group by cs.Ano,cm.SiglaMarca,v.CodigoMarca,v.Marca

```
