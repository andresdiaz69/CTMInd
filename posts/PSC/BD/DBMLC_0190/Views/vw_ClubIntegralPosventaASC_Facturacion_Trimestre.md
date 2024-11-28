# View: vw_ClubIntegralPosventaASC_Facturacion_Trimestre

## Usa los objetos:
- [[v_ClubIntegral_Ticket_asesores_colision]]
- [[vw_ClubIntegralRangoMaestrasVersionMax]]

```sql



CREATE VIEW [dbo].[vw_ClubIntegralPosventaASC_Facturacion_Trimestre] as


select  orden,Ano_Spiga,CodigoEmpresa,empresa,codigomarca,marca,codigoempleado,nombres
,([7]+[8]+[9])as '1' ,([10]+[11]+[12])as '2',([1]+[2]+[3])as '3',([4]+[5]+[6])as '4' 
,IdRangoMaestra,IdRangoVersionMax

from 
(
	SELECT 
	isnull(row_number()over (order by nombres asc),-1)as orden ,[Ano_Spiga],[CodigoEmpresa],[empresa],[codigomarca],[marca],[codigoempleado],[nombres]
	,isnull([1],0)as'1',isnull([2],0)'2',isnull([3],0)'3',isnull([4],0)'4',isnull([5],0)'5',isnull([6],0)'6',isnull([7],0)'7',isnull([8],0)'8',isnull([9],0)'9',isnull([10],0)'10',isnull([11],0)'11',isnull([12],0)'12'
	,IdRangoMaestra,IdRangoVersionMax

	FROM (

		  SELECT  c.Ano_Spiga,c.Mes_Spiga,c.CodigoEmpresa,c.empresa,c.codigomarca,c.marca,c.codigoempleado,c.nombres,c.Ticket,vm.IdRangoMaestra,vm.IdRangoVersionMax	
		  FROM dbo.v_ClubIntegral_Ticket_asesores_colision c
		  left join vw_ClubIntegralRangoMaestrasVersionMax vm on c.codigoempleado = vm.CodigoEmpleado
		  where vm.IdRangoMaestra = '27' and codigomarca='22'

		  union all

		  SELECT  c.Ano_Spiga,c.Mes_Spiga,c.CodigoEmpresa,c.empresa,c.codigomarca,c.marca,c.codigoempleado,c.nombres,c.Ticket,vm.IdRangoMaestra,vm.IdRangoVersionMax	
		  FROM dbo.v_ClubIntegral_Ticket_asesores_colision c
		  left join vw_ClubIntegralRangoMaestrasVersionMax vm on c.codigoempleado = vm.CodigoEmpleado
		  where vm.IdRangoMaestra = '28' and codigomarca='19' 

		  union all

		  SELECT  c.Ano_Spiga,c.Mes_Spiga,c.CodigoEmpresa,c.empresa,c.codigomarca,c.marca,c.codigoempleado,c.nombres,c.Ticket,vm.IdRangoMaestra,vm.IdRangoVersionMax	
		  FROM dbo.v_ClubIntegral_Ticket_asesores_colision c
		  left join vw_ClubIntegralRangoMaestrasVersionMax vm on c.codigoempleado = vm.CodigoEmpleado
		  where vm.IdRangoMaestra = '29' and codigomarca='12' 

		  union all

		  SELECT  c.Ano_Spiga,c.Mes_Spiga,c.CodigoEmpresa,c.empresa,c.codigomarca,c.marca,c.codigoempleado,c.nombres,c.Ticket,vm.IdRangoMaestra,vm.IdRangoVersionMax	
		  FROM dbo.v_ClubIntegral_Ticket_asesores_colision c
		  left join vw_ClubIntegralRangoMaestrasVersionMax vm on c.codigoempleado = vm.CodigoEmpleado
		  where vm.IdRangoMaestra = '30' and codigomarca='20' 
		  
		    union all

		  SELECT  c.Ano_Spiga,c.Mes_Spiga,c.CodigoEmpresa,c.empresa,c.codigomarca,c.marca,c.codigoempleado,c.nombres,c.Ticket,vm.IdRangoMaestra,vm.IdRangoVersionMax	
		  FROM dbo.v_ClubIntegral_Ticket_asesores_colision c
		  left join vw_ClubIntegralRangoMaestrasVersionMax vm on c.codigoempleado = vm.CodigoEmpleado
		  where vm.IdRangoMaestra = '31' and codigomarca='2' 

		   union all

		  SELECT  c.Ano_Spiga,c.Mes_Spiga,c.CodigoEmpresa,c.empresa,c.codigomarca,c.marca,c.codigoempleado,c.nombres,c.Ticket,vm.IdRangoMaestra,vm.IdRangoVersionMax	
		  FROM dbo.v_ClubIntegral_Ticket_asesores_colision c
		  left join vw_ClubIntegralRangoMaestrasVersionMax vm on c.codigoempleado = vm.CodigoEmpleado
		  where vm.IdRangoMaestra = '32' and codigomarca='7' 


		  )a
	PIVOT(SUM(Ticket) FOR Mes_Spiga IN ([1],[2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12]))AS PivotTable


)b

```
