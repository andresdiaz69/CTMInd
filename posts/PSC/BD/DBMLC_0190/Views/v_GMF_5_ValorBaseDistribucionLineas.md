# View: v_GMF_5_ValorBaseDistribucionLineas

## Usa los objetos:
- [[GMF_Parametros]]
- [[v_GMF_3_ValorGastosOperacion]]
- [[v_GMF_4_ValorCostos]]

```sql

CREATE VIEW [dbo].[v_GMF_5_ValorBaseDistribucionLineas] AS
SELECT DISTINCT 
	año,					mes,					Empresa,			
	CodigoPresentacion,		NombrePresentacion,
	Valor=SUM(Valor)+SUM(Valor1)+SUM(Valor2)+SUM(Valor3)
FROM
(
	SELECT DISTINCT 
		Empresa,		CodigoPresentacion,		NombrePresentacion,
		Año,			Mes,
		Valor=CASE WHEN CodigoPresentacion in (5,7,9,12,17) THEN SUM(valor) ELSE 0 END,
		Valor1=CASE WHEN CodigoPresentacion in (8,1,76,77,83,72,73,74) 
						AND CodigoConcepto in (99,999999) THEN SUM(valor) ELSE 0 END,

		Valor2=CASE WHEN CodigoPresentacion = 6 AND CodigoConcepto in (366)
					THEN ((SUM(valor)*(
										SELECT Valor 
										FROM GMF_Parametros P 
										WHERE P.Anio = A.Año 
											AND (CONVERT(INT,(CASE WHEN P.Mes LIKE '%Ene%' THEN 1
																WHEN P.Mes LIKE '%Feb%' THEN 2
																WHEN P.Mes LIKE '%Mar%' THEN 3
																WHEN P.Mes LIKE '%Abr%' THEN 4
																WHEN P.Mes LIKE '%May%' THEN 5
																WHEN P.Mes LIKE '%Jun%' THEN 6
																WHEN P.Mes LIKE '%Jul%' THEN 7
																WHEN P.Mes LIKE '%Ago%' THEN 8
																WHEN P.Mes LIKE '%Sep%' THEN 9
																WHEN P.Mes LIKE '%Oct%' THEN 10
																WHEN P.Mes LIKE '%Nov%' THEN 11
																WHEN P.Mes LIKE '%Dic%' THEN 12
																ELSE 0 END)) = A.mes
										)))/100) ELSE 0 END, 

		Valor3=CASE WHEN CodigoPresentacion = 6 AND CodigoConcepto in (370,999999)
					THEN SUM(valor) ELSE 0 END
	FROM
	(
		SELECT * FROM v_GMF_3_ValorGastosOperacion 
		
		UNION ALL
		
		SELECT * FROM v_GMF_4_ValorCostos 
	) a 
	GROUP BY Empresa,			CodigoPresentacion,		NombrePresentacion,
			CodigoConcepto,		Año,					Mes
)b 
GROUP BY año,					mes,					Empresa,
		CodigoPresentacion,		NombrePresentacion

```
