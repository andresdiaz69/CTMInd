# View: v_GMF_3_JD_DistribucionVentasNetasLinea_JD

## Usa los objetos:
- [[v_GMF_2_JD_ValoresVentasNetasLinea_JD]]
- [[v_GMF_2_JD_ValoresVentasNetasTotalLineas]]

```sql

CREATE VIEW [dbo].[v_GMF_3_JD_DistribucionVentasNetasLinea_JD] AS
select  l.empresa,l.año,l.mes,l.codigopresentacion,l.nombrepresentacion,l.valor,j.valortotalJD,
PorcentajeDistribucion = (l.valor / ValorTotalJD)*100
from		v_GMF_2_JD_ValoresVentasNetasTotalLineas	l	
left join	v_GMF_2_JD_ValoresVentasNetasLinea_JD		j	on	l.empresa=j.empresa
																and l.año=j.año
																and l.mes=j.mes


```
