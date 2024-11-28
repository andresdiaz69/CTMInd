# View: vw_GerenteRegionalVillavicencio_11

## Usa los objetos:
- [[ComisionesSpigaVN]]
- [[ComisionesSpigaVO]]
- [[ExogenasVehiculosVentasNacionales]]

```sql




CREATE VIEW [dbo].[vw_GerenteRegionalVillavicencio_11]
AS
SELECT        ENTREGAS.Ano_Periodo, ENTREGAS.Mes_Periodo, ENTREGAS.CodigoEmpresa, ENTREGAS.CodigoCentro,ENTREGAS.Centro,ENTREGAS.CodigoMArca, ENTREGAS.Marca, ISNULL(ENTREGAS.EntregasEfectivas, 0) AS EntregasEfectivas,
ISNULL(VENTAS_NACIONALES.Unidades, 0) AS VentasNacionales, 
						 
						 CASE WHEN ISNULL(VENTAS_NACIONALES.Unidades, 0) > 0 
						 THEN ISNULL(CONVERT(decimal(18,2), ENTREGAS.EntregasEfectivas), 0) / ISNULL(CONVERT(decimal(18,2), VENTAS_NACIONALES.Unidades), 0) * 100 
						 ELSE 0.00 END AS PesoComercial

FROM            (SELECT Ano_Periodo, Mes_Periodo, Codigoempresa, CodigoCentro,Centro, CodigoMArca, Marca, SUM(EntregaEfectiva) AS EntregasEfectivas  
				FROM 
				(
				SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresaSugerido AS Codigoempresa,CodigoCentro,Centro, CodigoMArca, Marca, EntregaEfectiva
				FROM            ComisionesSpigaVN WHERE EntregaEfectiva = 1 AND Nit NOT IN ('900336249-4', '900283099-7', '830004993-8', '860019063-8', '9003362494', '9002830997', '8300049938', '8600190638')
				UNION ALL 
				SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresaSugerido AS Codigoempresa,CodigoCentro,Centro, CodigoMArca, Marca, EntregaEfectiva
				FROM            ComisionesSpigaVO WHERE EntregaEfectiva = 1 AND Nit NOT IN ('900336249-4', '900283099-7', '830004993-8', '860019063-8', '9003362494', '9002830997', '8300049938', '8600190638')
				AND NOT (Centro like 'VO%')
				) AS RESULTADO
				GROUP BY Ano_Periodo, Mes_Periodo, Codigoempresa,CodigoCentro,Centro, CodigoMArca, Marca) AS ENTREGAS LEFT OUTER JOIN
				  (SELECT        Ano AS Ano_Periodo, Mes AS Mes_Periodo, CodigoMarca, SUM(Unidades) AS Unidades
                               FROM            dbo.ExogenasVehiculosVentasNacionales
                               GROUP BY Ano, Mes, CodigoMarca) AS VENTAS_NACIONALES ON ENTREGAS.CodigoMArca = VENTAS_NACIONALES.CodigoMarca AND ENTREGAS.Mes_Periodo = VENTAS_NACIONALES.Mes_Periodo AND 
                         ENTREGAS.Ano_Periodo = VENTAS_NACIONALES.Ano_Periodo
where CodigoCentro in (19,70,71,72)

```
