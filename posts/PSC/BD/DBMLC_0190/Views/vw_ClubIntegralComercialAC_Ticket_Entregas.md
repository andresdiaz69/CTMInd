# View: vw_ClubIntegralComercialAC_Ticket_Entregas

## Usa los objetos:
- [[ClubIntegralTicketDeEntradaAC]]
- [[vw_ClubIntegralComercialAC_Entregas_Comparativa]]

```sql
CREATE view [dbo].[vw_ClubIntegralComercialAC_Ticket_Entregas] as

select Periodo,Ano_periodo,CedulaVendedor,NombreVendedor,CodigoMarcaGrupo,MarcaGrupo,CodigoMarcaCI,MarcaCI,CodigoCentro,NombreCentro,Minimo_De_Entregas_Trimestrales
,Trimestre
,Entregas
,case when Entregas >= Minimo_De_Entregas_Trimestrales then 'PASA' else 'NO PASA' end Resultado

from 
(
select Periodo,Ano_Periodo,CedulaVendedor,NombreVendedor,CodigoMarcaGrupo,MarcaGrupo,CodigoMarcaCI,MarcaCI,CodigoCentro,NombreCentro,Minimo_De_Entregas_Trimestrales,Trimestre,Entregas
from 
(
	select Periodo,Ano_Periodo,CedulaVendedor,NombreVendedor,CodigoMarcaGrupo,MarcaGrupo,CodigoMarcaCI,MarcaCI,CodigoCentro,NombreCentro,Minimo_De_Entregas_Trimestrales
	,(Julio+Agosto+Septiembre)'1'
	,(Octubre+Noviembre+Diciembre)'2'
	,(Enero+Febrero+Marzo)'3'
	,(Abril+Mayo+Junio)'4'
	from 
	(
		select e.Periodo,e.Ano_Periodo,e.CedulaVendedor,e.NombreVendedor,e.CodigoMarcaGrupo,e.MarcaGrupo,e.CodigoMarcaCI,e.MarcaCI,e.CodigoCentro,e.NombreCentro,(t.Minimo_De_Entregas_Mensuales * 3)Minimo_De_Entregas_Trimestrales
		,sum(e.Julio)Julio,sum(e.Agosto)Agosto,sum(e.Septiembre)Septiembre
		,sum(e.Octubre)Octubre,sum(e.Noviembre)Noviembre,sum(e.Diciembre)Diciembre
		,sum(e.Enero)Enero,sum(e.Febrero)Febrero,sum(e.Marzo)Marzo
		,sum(e.Abril)Abril,sum(e.Mayo)Mayo,sum(e.Junio)Junio

		from vw_ClubIntegralComercialAC_Entregas_Comparativa e	
		left join ClubIntegralTicketDeEntradaAC t on e.CodigoMarcaCI = t.CodigoMarcaGrupo
		group by e.Periodo,e.Ano_Periodo,e.CedulaVendedor,e.NombreVendedor,e.CodigoMarcaGrupo,e.MarcaGrupo,e.CodigoMarcaCI,e.MarcaCI,e.CodigoCentro,e.NombreCentro,t.Minimo_De_Entregas_Mensuales 
	)a
)p
unpivot(Entregas for Trimestre in ([1],[2],[3],[4]))as piv
)b

```
