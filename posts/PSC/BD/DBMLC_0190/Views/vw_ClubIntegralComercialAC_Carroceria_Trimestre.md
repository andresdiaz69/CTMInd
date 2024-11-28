# View: vw_ClubIntegralComercialAC_Carroceria_Trimestre

## Usa los objetos:
- [[vw_ClubIntegralComercialAC_Carroceria]]

```sql
create view [dbo].[vw_ClubIntegralComercialAC_Carroceria_Trimestre] as

select distinct CodigoEmpleado,Nombres,Ano,CodigoMarca,Marca,CodigoMarcaGrupo,MarcaGrupo,Trimestre,Cantidad

from 
(
	select CodigoEmpleado,Nombres,Ano,CodigoMarca,Marca,CodigoMarcaGrupo,MarcaGrupo
	,isnull([Julio]+[Agosto]+[Septiembre],0) AS [1]
	,isnull([Octubre]+[Noviembre]+[Diciembre],0) AS [2]
	,isnull([Enero]+[Febrero]+[Marzo],0) AS [3]
	,isnull([Abril]+[Mayo]+[Junio],0) AS [4]
	from 
	(
		select  CodigoEmpleado,Nombres,Ano,CodigoMarca,Marca,CodigoMarcaGrupo,MarcaGrupo
		,isnull([1],0)'Enero',isnull([2],0)'Febrero',isnull([3],0)'Marzo'
		,isnull([4],0)'Abril',isnull([5],0)'Mayo',isnull([6],0)'Junio'
		,isnull([7],0)'Julio',isnull([8],0)'Agosto',isnull([9],0)'Septiembre'
		,isnull([10],0)'Octubre',isnull([11],0)'Noviembre',isnull([12],0)'Diciembre'
		from 
		(
		select CodigoEmpleado,Nombres,Ano,CodigoMarca,Marca,CodigoMarcaGrupo,MarcaGrupo,Mes,Cantidad
		from vw_ClubIntegralComercialAC_Carroceria
		)a
		pivot (count(Cantidad) for Mes in ([1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12]))as Pivottble
	)b
)c
unpivot(Cantidad for Trimestre in ([1],[2],[3],[4]))p




```
