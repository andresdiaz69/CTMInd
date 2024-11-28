# View: vw_JefesDeVentas_2_1

## Usa los objetos:
- [[ComisionesSpigaVN]]
- [[ComisionesSpigaVO]]
- [[ExogenasCreditosDesembolsados]]

```sql








CREATE VIEW [dbo].[vw_JefesDeVentas_2_1]
AS
SELECT        ENTREGAS.Ano_Periodo, ENTREGAS.Mes_Periodo, ENTREGAS.CodigoEmpresa, ENTREGAS.CodigoCentro, ENTREGAS.Centro, ISNULL(ENTREGAS.EntregasEfectivas, 0) AS EntregasEfectivas, 
                         ISNULL(CREDITOS_DESEMBOLSADOS.Cantidad, 0) AS CreditosDesembolsados, 

						 CASE WHEN ISNULL(ENTREGAS.EntregasEfectivas, 0) > 0 
						 THEN ISNULL(CONVERT(decimal(18,2), CREDITOS_DESEMBOLSADOS.Cantidad), 0) / ISNULL(CONVERT(decimal(18,2), ENTREGAS.EntregasEfectivas), 0) * 100
                         ELSE 0.00 END AS ColocacionCreditos

FROM            (SELECT Ano_Periodo, Mes_Periodo, Codigoempresa, CodigoCentro, Centro, SUM(EntregaEfectiva) AS EntregasEfectivas  
				FROM 
				(
				SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresaSugerido AS Codigoempresa, CodigoCentro, Centro, EntregaEfectiva
				FROM            ComisionesSpigaVN WHERE EntregaEfectiva = 1 AND Nit NOT IN ('900336249-4', '900283099-7', '830004993-8', '860019063-8', '9003362494', '9002830997', '8300049938', '8600190638')
				UNION ALL 
				SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresaSugerido AS Codigoempresa, CodigoCentro, Centro, EntregaEfectiva
				FROM            ComisionesSpigaVO WHERE EntregaEfectiva = 1 AND Nit NOT IN ('900336249-4', '900283099-7', '830004993-8', '860019063-8', '9003362494', '9002830997', '8300049938', '8600190638')
				AND NOT (Centro like 'VO%')
				) AS RESULTADO
				GROUP BY Ano_Periodo, Mes_Periodo, Codigoempresa, CodigoCentro, Centro) AS ENTREGAS LEFT OUTER JOIN
                             (SELECT        Ano AS Ano_Periodo, Mes AS Mes_Periodo, CodigoCentro, Cantidad
                               FROM            dbo.ExogenasCreditosDesembolsados) AS CREDITOS_DESEMBOLSADOS ON ENTREGAS.CodigoCentro = CREDITOS_DESEMBOLSADOS.CodigoCentro AND 
                         ENTREGAS.Mes_Periodo = CREDITOS_DESEMBOLSADOS.Mes_Periodo AND ENTREGAS.Ano_Periodo = CREDITOS_DESEMBOLSADOS.Ano_Periodo



```
