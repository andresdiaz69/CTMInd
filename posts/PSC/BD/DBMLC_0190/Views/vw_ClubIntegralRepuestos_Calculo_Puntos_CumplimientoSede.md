# View: vw_ClubIntegralRepuestos_Calculo_Puntos_CumplimientoSede

## Usa los objetos:
- [[vw_ClubIntegralRangoMaestrasVersionMax]]
- [[vw_ClubIntegralRangosMaestrasFull]]
- [[vw_ClubIntegralRepuestos_Comparativa_CumplimientoSede]]
- [[vw_ClubIntegralRepuestos_TicketEntrada]]

```sql

CREATE view [dbo].[vw_ClubIntegralRepuestos_Calculo_Puntos_CumplimientoSede] as

select a1.Ano,a1.CedulaVendedorRepuestos,a1.CodigoCentro,a1.NombreCentro,a1.TrimestreCumplimientoSede,a1.ResultadoCumplimientoSede,mf.Puntos
from 
(
	select Ano,CedulaVendedorRepuestos,CodigoCentro,NombreCentro,TrimestreCumplimientoSede,ResultadoCumplimientoSede,IdRangoMaestra,IdRangoVersionMax
	from 
	(
		select distinct c.Ano,c.CodigoCentro,c.NombreCentro,t.CedulaVendedorRepuestos,vm.IdRangoMaestra,vm.IdRangoVersionMax
		,case when c.Trimestre1Presupuesto > 0 then c.Trimestre1Ventas/c.Trimestre1Presupuesto*100 else 0 end as '1'
		,case when c.Trimestre2Presupuesto > 0 then c.Trimestre2Ventas/c.Trimestre2Presupuesto*100 else 0 end as '2'
		,case when c.Trimestre3Presupuesto > 0 then c.Trimestre3Ventas/c.Trimestre3Presupuesto*100 else 0 end as '3'
		,case when c.Trimestre4Presupuesto > 0 then c.Trimestre4Ventas/c.Trimestre4Presupuesto*100 else 0 end as '4'
		from vw_ClubIntegralRepuestos_Comparativa_CumplimientoSede c
		left join vw_ClubIntegralRepuestos_TicketEntrada t on c.CodigoCentro = t.CodigoCentro
		left join vw_ClubIntegralRangoMaestrasVersionMax vm on t.CedulaVendedorRepuestos = vm.CodigoEmpleado
		where vm.IdRangoMaestra='54'
	)a
	unpivot(ResultadoCumplimientoSede for TrimestreCumplimientoSede in ([1],[2],[3],[4]))p
)a1
left join vw_ClubIntegralRangosMaestrasFull mf on a1.IdRangoVersionMax = mf.IdRangoVersion
where (mf.Desde < a1.ResultadoCumplimientoSede) and (mf.Hasta >= a1.ResultadoCumplimientoSede)



```
