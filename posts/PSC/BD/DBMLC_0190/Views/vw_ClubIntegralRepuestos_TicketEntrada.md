# View: vw_ClubIntegralRepuestos_TicketEntrada

## Usa los objetos:
- [[Centros]]
- [[Empleados]]
- [[vw_ClubIntegralRepuestos_Mes_TicketEntrada]]

```sql

CREATE view [dbo].[vw_ClubIntegralRepuestos_TicketEntrada] as

select Ano_Spiga,CedulaVendedorRepuestos,CodigoCentro,NombreCentro,Trimestre,Resultado
from 
(
select t.Ano_Spiga,t.CedulaVendedorRepuestos,e.CodigoCentro,c.NombreCentro
,case when t.Tic_Enero='PASA' and t.Tic_Febrero ='PASA' and t.Tic_Marzo='PASA' then 'PASA' else 'NO PASA' end as '3'
,case when t.Tic_Abril='PASA' and t.Tic_Mayo ='PASA' and t.Tic_Junio='PASA' then 'PASA' else 'NO PASA' end as '4'
,case when t.Tic_Julio='PASA' and t.Tic_Agosto ='PASA' and t.Tic_Septiembre='PASA' then 'PASA' else 'NO PASA' end as '1'
,case when t.Tic_Octubre='PASA' and t.Tic_Noviembre ='PASA' and t.Tic_Diciembre='PASA' then 'PASA' else 'NO PASA' end as '2'
from vw_ClubIntegralRepuestos_Mes_TicketEntrada t
left join Empleados e on t.CedulaVendedorRepuestos = e.CodigoEmpleado
left join Centros c on e.CodigoCentro = c.CodigoCentro
)a
unpivot (Resultado for  Trimestre in ([1],[2],[3],[4]))p





```
