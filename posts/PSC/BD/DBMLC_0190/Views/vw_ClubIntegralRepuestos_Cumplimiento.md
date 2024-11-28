# View: vw_ClubIntegralRepuestos_Cumplimiento

## Usa los objetos:
- [[vw_ClubIntegralRepuestos_Comparativa_Cumplimiento]]

```sql

CREATE view [dbo].[vw_ClubIntegralRepuestos_Cumplimiento] as
select 
Ano_Spiga,CedulaVendedorRepuestos,Nombres,IdRangoMaestra,IdRangoVersionMax
,(CumplimientoEnero+CumplimientoFebrero+CumplimientoMarzo)Trimestre3
,(CumplimientoAbril+CumplimientoMayo+CumplimientoJunio)Trimestre4
,(CumplimientoJulio+CumplimientoAgosto+CumplimientoSeptiembre)Trimestre1
,(CumplimientoOctubre+CumplimientoNoviembre+CumplimientoDiciembre)Trimestre2
from 
(
	SELECT Ano_Spiga,CedulaVendedorRepuestos,Nombres,IdRangoMaestra,IdRangoVersionMax
	,case when EnePresu > 0 then EneVendido/EnePresu*100 else 0 end as CumplimientoEnero
	,case when FebPresu > 0 then FebVendido/FebPresu*100 else 0 end as CumplimientoFebrero
	,case when MarPresu > 0 then MarVendido/MarPresu*100 else 0 end as CumplimientoMarzo
	,case when AbrPresu > 0 then AbrVendido/AbrPresu*100 else 0 end as CumplimientoAbril
	,case when MayPresu > 0 then MayVendido/MayPresu*100 else 0 end as CumplimientoMayo
	,case when JunPresu > 0 then JunVendido/JunPresu*100 else 0 end as CumplimientoJunio
	,case when JulPresu > 0 then JulVendido/JulPresu*100 else 0 end as CumplimientoJulio
	,case when AgoPresu > 0 then AgoVendido/AgoPresu*100 else 0 end as CumplimientoAgosto
	,case when SepPresu > 0 then SepVendido/SepPresu*100 else 0 end as CumplimientoSeptiembre
	,case when OctPresu > 0 then OctVendido/OctPresu*100 else 0 end as CumplimientoOctubre
	,case when NovPresu > 0 then NovVendido/NovPresu*100 else 0 end as CumplimientoNoviembre
	,case when DicPresu > 0 then DicVendido/DicPresu*100 else 0 end as CumplimientoDiciembre
	FROM vw_ClubIntegralRepuestos_Comparativa_Cumplimiento 
	--left join vw_ClubIntegralRangosMaestrasFull mf		on vw_ClubIntegralRepuestos_Comparativa_Cumplimiento.IdRangoVersionMax = mf.IdRangoVersion 
	--where (mf.Desde < a.AccesoriosVendidos) and (mf.Hasta >= a.AccesoriosVendidos)
)a


```
