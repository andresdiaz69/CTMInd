# View: v_GMF_15_PorcentajeDistribucionPorCentro

## Usa los objetos:
- [[v_GMF_10_ValoresVentasNetas]]
- [[v_GMF_12_ValoresVentasNetasTotalSedes]]
- [[v_GMF_12_ValoresVentasNetasTotalSedes_fab_col]]

```sql
CREATE view [dbo].[v_GMF_15_PorcentajeDistribucionPorCentro] as
select empresa,año,mes,CodigoPresentacion,NombrePresentacion,Sede,CodigoConcepto,NombreConcepto,
PorcentajeDistribucionCentro = case when Valorcentro <> 0 then ((ValorCentro/ValorSede)*100) else 0 end,
PorcentajeDistribucionFabrica = case when valorfabrica <> 0 then ((ValorFabrica/ValorSede)*100) else 0 end,
PorcentajeDistribucionColision = case when Valorcolision <> 0 then ((ValorColision/Valorsede)*100) else 0 end
from(
		select empresa,año,mes,CodigoPresentacion,NombrePresentacion,CodigoConcepto,NombreConcepto,Sede,
		Valor= case when CodigoConcepto = 99899 then sum(Valor) else sum(Valor) end,
		valorcentro=sum(valorcentro),valorfabrica=sum(valorfabrica),valorcolision=sum(valorcolision),ValorSede
		from(
				select distinct n.empresa,n.Año,n.Mes,n.CodigoPresentacion,n.NombrePresentacion,
				CodigoConcepto = case when n.CodigoConcepto in (4,18,54) then 99899 else n.codigoconcepto end,
				NombreConcepto = case when n.CodigoConcepto in (4,18,54) then 'Vehiculos' else n.NombreConcepto end,
				n.Sede,n.Valor,t.valorCentro,t.valorfabrica,t.valorcolision,ValorSede=s.valor
				from		v_GMF_10_ValoresVentasNetas			n
				left join	v_GMF_12_ValoresVentasNetasTotalSedes_fab_col	t	on		n.Año=t.año
																						and n.mes = t.mes
																						and n.CodigoPresentacion = t.CodPresentacionPrincipal
																						and n.sede = t.sede
																						and n.empresa = t.empresa
																						and n.CodigoConcepto = t.codigoconcepto
				left join v_GMF_12_ValoresVentasNetasTotalSedes				s	on	n.año=s.año 
																						and n.mes=s.mes
																						and n.CodigoPresentacion = s.CodigoPresentacion
																						and n.sede = s.sede
				--where n.año=2021 and n.mes=2 and n.CodigoPresentacion = 12 and n.sede like '%170%'
		)a 
		group by  empresa,año,mes,CodigoPresentacion,NombrePresentacion,CodigoConcepto,NombreConcepto,Sede,ValorSede
)b 
--where año=2021
--and mes=2
--and  CodigoPresentacion = 12
--order by sede

```
