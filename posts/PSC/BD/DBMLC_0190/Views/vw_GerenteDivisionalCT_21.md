# View: vw_GerenteDivisionalCT_21

## Usa los objetos:
- [[ComisionesSpigaVN]]
- [[ComisionesSpigaVO]]
- [[ExogenasVehiculosVentasNacionales]]

```sql






CREATE VIEW [dbo].[vw_GerenteDivisionalCT_21]
AS
SELECT        ENTREGAS.Ano_Periodo, ENTREGAS.Mes_Periodo, ENTREGAS.CodigoEmpresa, ENTREGAS.CodigoMArca, ENTREGAS.Marca,VENTAS_NACIONALES.CodigoTipo, ISNULL(ENTREGAS.EntregasEfectivas, 0) AS EntregasEfectivas,
ISNULL(VENTAS_NACIONALES.Unidades, 0) AS VentasNacionales, 
						 
						 CASE WHEN ISNULL(VENTAS_NACIONALES.Unidades, 0) > 0 
						 THEN ISNULL(CONVERT(decimal(18,2), ENTREGAS.EntregasEfectivas), 0) / ISNULL(CONVERT(decimal(18,2), VENTAS_NACIONALES.Unidades), 0) * 100 
						 ELSE 0.00 END AS PesoComercial

FROM            (SELECT Ano_Periodo, Mes_Periodo, Codigoempresa, CodigoMArca, Marca, SUM(EntregaEfectiva) AS EntregasEfectivas  
				FROM 
				(
				SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresaSugerido AS Codigoempresa, CodigoMArca, Marca, EntregaEfectiva
				FROM            ComisionesSpigaVN WHERE EntregaEfectiva = 1 AND Nit NOT IN ('900336249-4', '900283099-7', '830004993-8', '860019063-8', '9003362494', '9002830997', '8300049938', '8600190638')
				UNION ALL 
				SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresaSugerido AS Codigoempresa, CodigoMArca, Marca, EntregaEfectiva
				FROM            ComisionesSpigaVO WHERE EntregaEfectiva = 1 AND Nit NOT IN ('900336249-4', '900283099-7', '830004993-8', '860019063-8', '9003362494', '9002830997', '8300049938', '8600190638')
						AND NOT (Centro like 'VO%')
				) AS RESULTADO
				GROUP BY Ano_Periodo, Mes_Periodo, Codigoempresa, CodigoMArca, Marca) AS ENTREGAS LEFT OUTER JOIN
				  (SELECT        Ano AS Ano_Periodo, Mes AS Mes_Periodo, CodigoMarca,CodigoTipo, SUM(Unidades) AS Unidades
                               FROM            dbo.ExogenasVehiculosVentasNacionales
							   WHERE CodigoTipo in (1,6)
                               GROUP BY Ano, Mes, CodigoMarca,CodigoTipo) AS VENTAS_NACIONALES ON ENTREGAS.CodigoMArca = VENTAS_NACIONALES.CodigoMarca AND ENTREGAS.Mes_Periodo = VENTAS_NACIONALES.Mes_Periodo AND 
                         ENTREGAS.Ano_Periodo = VENTAS_NACIONALES.Ano_Periodo
WHERE        (ENTREGAS.CodigoMArca = 13)

```
