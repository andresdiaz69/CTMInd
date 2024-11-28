# View: vw_ClubIntegralRepuestos_Mes

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]
- [[ComisionesSpigaTallerPorOT]]

```sql
CREATE view [dbo].[vw_ClubIntegralRepuestos_Mes] as


select distinct

Ano_Spiga,CodigoEmpresa,CodigoCentro,CodigoSeccion
,case when CedulaVendedorRepuestos = 0 then CedulaBodeguero else CedulaVendedorRepuestos end as CedulaVendedorRepuestos
,Enero,Febrero,Marzo,Abril,Mayo,Junio,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre
from 
(
	select  Ano_Spiga,CodigoEmpresa,CodigoCentro,CodigoSeccion,isnull(CedulaVendedorRepuestos,CedulaBodeguero)CedulaVendedorRepuestos,CedulaBodeguero

	,isnull([1],0)'Enero',isnull([2],0)'Febrero',isnull([3],0)'Marzo',isnull([4],0)'Abril',isnull([5],0)'Mayo',isnull([6],0)'Junio',isnull([7],0)'Julio',isnull([8],0)'Agosto'
	,isnull([9],0)'Septiembre',isnull([10],0)'Octubre',isnull([11],0)'Noviembre',isnull([12],0)'Diciembre'
	from
	(
		select Ano_Spiga,Mes_Spiga,CodigoEmpresa,CodigoCentro,CodigoSeccion,CedulaVendedorRepuestos,CedulaBodeguero
		,sum(ValorNeto)ValorTotal
		from ComisionesSpigaTallerPorOT 
		where TipoOperacion='MAT' and Ano_Spiga >='2018'
		group by Ano_Spiga,Mes_Spiga,CodigoEmpresa,CodigoCentro,CodigoSeccion,CedulaVendedorRepuestos,CedulaBodeguero
	)a
	pivot(sum(ValorTotal) for Mes_Spiga in ([1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12]))as PivoTablet

	union all 

	select  Ano_Spiga,CodigoEmpresa,CodigoCentro,CodigoSeccion,CedulaVendedorRepuestos,CedulaBodeguero
	,isnull([1],0)'Enero',isnull([2],0)'Febrero',isnull([3],0)'Marzo',isnull([4],0)'Abril',isnull([5],0)'Mayo',isnull([6],0)'Junio',isnull([7],0)'Julio',isnull([8],0)'Agosto'
	,isnull([9],0)'Septiembre',isnull([10],0)'Octubre',isnull([11],0)'Noviembre',isnull([12],0)'Diciembre'
	from 
	(
		select Ano_Spiga,Mes_Spiga,CodigoEmpresa,CodigoCentro,CodigoSeccion,CedulaVendedorRepuestos,CedulaBodeguero
		,sum(ValorNeto)ValorTotal
		from ComisionesSpigaAlmacenAlbaran
		where TipoMov not in ('VIN','VINA') and Ano_Spiga>='2018'
		group by Ano_Spiga,Mes_Spiga,CodigoEmpresa,CodigoCentro,CodigoSeccion,CedulaVendedorRepuestos,CedulaBodeguero
	)a
	pivot(sum(ValorTotal) for Mes_Spiga in ([1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12]))as PivoTablet
)b



```
