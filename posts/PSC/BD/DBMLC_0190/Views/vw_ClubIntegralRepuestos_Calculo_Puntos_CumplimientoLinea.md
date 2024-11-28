# View: vw_ClubIntegralRepuestos_Calculo_Puntos_CumplimientoLinea

## Usa los objetos:
- [[vw_ClubIntegralRepuestosV_Comparativa_CumlplimientoLinea]]

```sql
create view [dbo].[vw_ClubIntegralRepuestos_Calculo_Puntos_CumplimientoLinea] as

select Ano,SiglaMarca,CodigoMarca,Marca,Trimestre,Resultado
,case when Resultado > 100 then 30 else 0 end as Puntos

from 
(
select cl.Ano,cl.SiglaMarca,cl.CodigoMarca,cl.Marca
,case when cl.Trimestre1Presupuesto > 0 then cl.Trimestre1Ventas/cl.Trimestre1Presupuesto*100 else 0 end as '1'
,case when cl.Trimestre2Presupuesto > 0 then cl.Trimestre2Ventas/cl.Trimestre2Presupuesto*100 else 0 end as '2'
,case when cl.Trimestre3Presupuesto > 0 then cl.Trimestre3Ventas/cl.Trimestre3Presupuesto*100 else 0 end as '3'
,case when cl.Trimestre4Presupuesto > 0 then cl.Trimestre4Ventas/cl.Trimestre4Presupuesto*100 else 0 end as '4'
from vw_ClubIntegralRepuestosV_Comparativa_CumlplimientoLinea cl
)a
unpivot(Resultado for Trimestre in ([1],[2],[3],[4]))p

```
