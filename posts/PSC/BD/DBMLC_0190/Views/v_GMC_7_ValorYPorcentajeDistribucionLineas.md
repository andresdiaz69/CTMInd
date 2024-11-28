# View: v_GMC_7_ValorYPorcentajeDistribucionLineas

## Usa los objetos:
- [[v_GMF_1_ValorMensualGMF_USC]]
- [[v_GMF_5_ValorBaseDistribucionLineas]]
- [[v_GMF_6_ValorBaseDistribucionLineas_Total]]

```sql
CREATE VIEW [dbo].[v_GMC_7_ValorYPorcentajeDistribucionLineas] as
select Año,Mes,Empresa,CodigoPresentacion,NombrePresentacion,ValorCostosGastos,ValorTotalADistribuir,
PorcentajeDistribucion,ValorGMF,ValorADistribuirPorLinea=Round((ValorGMF*PorcentajeDistribucion)/100,4)
from(
		select l.año,l.mes,l.empresa,l.Codigopresentacion,l.nombrepresentacion,ValorCostosGastos=l.valor,
		ValorTotalADistribuir=t.ValorTotal,
		PorcentajeDistribucion = (l.valor/t.ValorTotal)*100,ValorGMF=g.valor
		from		v_GMF_5_ValorBaseDistribucionLineas		l
		left join	v_GMF_6_ValorBaseDistribucionLineas_Total	t	on	l.año=t.año
																	and l.mes = t.mes
																	and l.empresa = t.empresa
		left join	v_GMF_1_ValorMensualGMF_USC				g	on	g.año=l.año
																	and g.mes=l.mes
																	and g.Idempresas = l.empresa	
)a 
WHERE CodigoPresentacion in (72,73,74)


```
