# View: vw_JefeDeVentasDaimlerCll13_31

## Usa los objetos:
- [[ComisionesSpigaVN]]
- [[ComisionesSpigaVO]]
- [[ExogenasEficienciaJefesDeVentas]]

```sql



CREATE VIEW [dbo].[vw_JefeDeVentasDaimlerCll13_31]
AS
SELECT        ENTREGAS.Ano_Periodo, ENTREGAS.Mes_Periodo, ENTREGAS.Codigoempresa,CREDITOS_DESEMBOLSADOS.CodigoEmpleado, ISNULL(ENTREGAS.EntregasEfectivas, 0) AS EntregasEfectivas, 
                         ISNULL(CREDITOS_DESEMBOLSADOS.Cantidad, 0) AS CreditosDesembolsados, 
						 
						 CASE 
						 WHEN ISNULL(ENTREGAS.EntregasEfectivas, 0) > 0 
						 THEN ISNULL(CONVERT(decimal(18, 2), CREDITOS_DESEMBOLSADOS.Cantidad), 0) / ISNULL(CONVERT(decimal(18, 2), ENTREGAS.EntregasEfectivas), 0) * 100 
						 ELSE 0.00 
						 END 
						 AS ColocacionCreditos


FROM            (SELECT        Ano_Periodo, Mes_Periodo, Codigoempresa, SUM(EntregaEfectiva) AS EntregasEfectivas
                          FROM            (SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresaSugerido AS Codigoempresa, EntregaEfectiva
                                                    FROM            dbo.ComisionesSpigaVN
                                                    WHERE        (EntregaEfectiva = 1) AND (Nit NOT IN ('900336249-4', '900283099-7', '830004993-8', '860019063-8', '9003362494', '9002830997', '8300049938', '8600190638')) AND (CodigoCentro IN (85,86))
                                                    UNION ALL
                                                    SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresaSugerido AS Codigoempresa, EntregaEfectiva
                                                    FROM            dbo.ComisionesSpigaVO
                                                    WHERE        (EntregaEfectiva = 1) AND (Nit NOT IN ('900336249-4', '900283099-7', '830004993-8', '860019063-8', '9003362494', '9002830997', '8300049938', '8600190638')) AND (NOT (Centro LIKE 'VO%')) AND (CodigoCentro IN (85,86))) 
                                                    AS RESULTADO
                          GROUP BY Ano_Periodo, Mes_Periodo, Codigoempresa) AS ENTREGAS LEFT OUTER JOIN
                             (SELECT        Ano AS Ano_Periodo, Mes AS Mes_Periodo,CodigoEmpleado, Cantidad
                               FROM            dbo.ExogenasEficienciaJefesDeVentas) AS CREDITOS_DESEMBOLSADOS ON 
                         ENTREGAS.Mes_Periodo = CREDITOS_DESEMBOLSADOS.Mes_Periodo AND ENTREGAS.Ano_Periodo = CREDITOS_DESEMBOLSADOS.Ano_Periodo

```
