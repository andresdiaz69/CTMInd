# View: vw_ClubIntegralComercialAC_Calculo_Puntos_Carroceria

## Usa los objetos:
- [[vw_ClubIntegralComercialAC_Carroceria_Trimestre]]
- [[vw_ClubIntegralComercialAC_Ticket_Comparativa]]

```sql
CREATE view [dbo].[vw_ClubIntegralComercialAC_Calculo_Puntos_Carroceria] as

select CodigoEmpleado,Nombres,Ano,CodigoMarca,Marca,CodigoMarcaGrupo,MarcaGrupo,Trimestre,Cantidad
,case when Cantidad >= 1 then Cantidad * v else 0 end Puntos
from 
(
select ct.CodigoEmpleado,ct.Nombres,ct.Ano,ct.CodigoMarca,ct.Marca,ct.CodigoMarcaGrupo,ct.MarcaGrupo,ct.Trimestre,ct.Cantidad
,(10)v
from vw_ClubIntegralComercialAC_Carroceria_Trimestre ct
left join vw_ClubIntegralComercialAC_Ticket_Comparativa c on ct.CodigoEmpleado = c.CedulaVendedor and ct.Ano = c.Ano_Periodo and ct.Trimestre = c.trimestre 
where c.Resultado_Ticket='PASA'
)a


```
