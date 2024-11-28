# View: vw_ClubIntegralRepuestos_Mes_TicketEntrada

## Usa los objetos:
- [[vw_ClubIntegralRepuestos_Mes]]

```sql
CREATE view [dbo].[vw_ClubIntegralRepuestos_Mes_TicketEntrada] as

select Ano_Spiga,CedulaVendedorRepuestos
,('75000000')VentasSuperiores
,Enero,Febrero,Marzo,Abril,Mayo,Junio,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre
,case when Enero >'75000000' then 'PASA' else 'NO PASA' end as Tic_Enero
,case when Febrero >'75000000' then 'PASA' else 'NO PASA' end as Tic_Febrero
,case when Marzo >'75000000' then 'PASA' else 'NO PASA' end as Tic_Marzo
,case when Abril >'75000000' then 'PASA' else 'NO PASA' end as Tic_Abril
,case when Mayo >'75000000' then 'PASA' else 'NO PASA' end as Tic_Mayo
,case when Junio >'75000000' then 'PASA' else 'NO PASA' end as Tic_Junio
,case when Julio >'75000000' then 'PASA' else 'NO PASA' end as Tic_Julio
,case when Agosto >'75000000' then 'PASA' else 'NO PASA' end as Tic_Agosto
,case when Septiembre >'75000000' then 'PASA' else 'NO PASA' end as Tic_Septiembre
,case when Octubre >'75000000' then 'PASA' else 'NO PASA' end as Tic_Octubre
,case when Noviembre >'75000000' then 'PASA' else 'NO PASA' end as Tic_Noviembre
,case when Diciembre >'75000000' then 'PASA' else 'NO PASA' end as Tic_Diciembre
from 
(
	select distinct r.Ano_Spiga,r.CedulaVendedorRepuestos
	,sum(Enero)Enero,sum(Febrero)Febrero,sum(Marzo)Marzo,sum(Abril)Abril,sum(Mayo)Mayo,sum(Junio)Junio,sum(Julio)Julio,sum(Agosto)Agosto,sum(Septiembre)Septiembre,sum(Octubre)Octubre,sum(Noviembre)Noviembre,sum(Diciembre)Diciembre
	from vw_ClubIntegralRepuestos_Mes r
	--where r.CedulaVendedorRepuestos='79049330'
	group by r.Ano_Spiga,r.CedulaVendedorRepuestos
)a

```
