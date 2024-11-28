# View: v_ClubIntegral_Penetracion_Creditos_Asesor

## Usa los objetos:
- [[ClubIntegralFinancierasAutorizadas]]
- [[v_ClubIntegral_Cantidad_creditos_vendedor]]
- [[vw_ClubIntegralComercialAC_Entregas_Comparativa]]

```sql
CREATE view [dbo].[v_ClubIntegral_Penetracion_Creditos_Asesor] as
select b.* ,sum(isnull(c.cantidad,0))cantidad,c.NitFinanciera,isnull(f.NombreFinanciera,'NO_AUTORIZADAS')NombreFinanciera
from 
(
	select Ano_Periodo,CedulaVendedor,NombreVendedor,CodigoMarcaCI,MarcaCI,CodigoCentro,NombreCentro,mes_periodo,VehiculosRecaudados
	from 
	(
	select e.Ano_Periodo,e.CedulaVendedor,e.NombreVendedor,e.CodigoMarcaCI,e.MarcaCI,e.CodigoCentro,e.NombreCentro,e.Enero as '1', e.Febrero as '2',e.Marzo as '3',e.Abril as '4',e.Mayo as '5',e.Junio as '6',e.Julio as'7',e.Agosto as '8',e.Septiembre as '9',e.Octubre as'10',e.Noviembre as '11',e.Diciembre as '12'
	from vw_ClubIntegralComercialAC_Entregas_Comparativa e
	--where e.CedulaVendedor='3188775'
	)a
	unpivot (VehiculosRecaudados for mes_periodo in ([1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12]))as pivotun
	
)b
left join v_ClubIntegral_Cantidad_creditos_vendedor c on b.CedulaVendedor = c.CedulaVendedor and b.Ano_Periodo = c.ano_periodo and b.mes_periodo = c.mes_periodo
left join ClubIntegralFinancierasAutorizadas f on c.NitFinanciera = f.NitFinanciera
--where b.CedulaVendedor ='5828731'
group by b.Ano_Periodo,b.CedulaVendedor,b.NombreVendedor,b.CodigoMarcaCI,b.MarcaCI,b.CodigoCentro,b.NombreCentro,b.mes_periodo,b.VehiculosRecaudados,c.NitFinanciera,f.NombreFinanciera

```
