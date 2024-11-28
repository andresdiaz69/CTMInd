# View: v_GMF_16_ValorGMFPorCentro

## Usa los objetos:
- [[v_GMF_14_Valor_GMFADistribuirPorSede]]
- [[v_GMF_15_PorcentajeDistribucionPorCentro]]

```sql

CREATE view [dbo].[v_GMF_16_ValorGMFPorCentro] as
select c.Empresa,c.Año,c.Mes,c.CodigoPresentacion,c.Nombrepresentacion,c.sede,c.CodigoConcepto,c.NombreConcepto,
s.ValorSedeGMF,
c.PorcentajeDistribucionCentro,c.PorcentajeDistribucionFabrica,c.PorcentajeDistribucionColision,
ValorGMFPorCentro=(s.ValorSedeGMF*c.PorcentajeDistribucionCentro)/100,
ValorGMFPorFabrica=(s.ValorSedeGMF*c.PorcentajeDistribucionFabrica)/100,
ValorGMFPorColision=(s.ValorSedeGMF*c.PorcentajeDistribucionColision)/100

from		[dbo].[v_GMF_15_PorcentajeDistribucionPorCentro]	c
left join	[dbo].[v_GMF_14_Valor_GMFADistribuirPorSede]		s	on	c.empresa = s.empresa
																		and case when c.mes = 1 then c.año-1 else c.año end =s.año
																		and case when c.mes = 1 then 12 else c.mes end =s.mes
																		and c.codigopresentacion=s.codigopresentacion
																		and c.sede=s.sede
--where s.año=2021 
--and s.mes=3
--and s.Codigopresentacion = 12
--and c.sede like '%170%'

```
