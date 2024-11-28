# View: vw_JefesDeVentas_4_1

## Usa los objetos:
- [[Centros]]
- [[Periodos]]
- [[vw_AsesoresCreditosSeguros_Creditos_Jefes]]
- [[vw_AsesoresCreditosSeguros_Seguros]]
- [[vw_JefesDeVentas_VentasNetas]]

```sql
CREATE VIEW [dbo].[vw_JefesDeVentas_4_1] AS
SELECT PERIODOS.Ano_Periodo, PERIODOS.Mes_Periodo, PERIODOS.CodigoCentro, PERIODOS.NombreCentro, 
ISNULL(CREDITOS.Valor_Creditos, 0) AS Valor_Creditos, 
ISNULL(SEGUROS.Valor_Seguros, 0) AS Valor_Seguros, 
ISNULL(VENTAS_NETAS.Valor_VentasNetas, 0) AS Valor_VentasNetas,
CASE WHEN ISNULL(VENTAS_NETAS.Valor_VentasNetas, 0) <> 0 
	THEN (ISNULL(CREDITOS.Valor_Creditos, 0) + ISNULL(SEGUROS.Valor_Seguros, 0)) / ISNULL(VENTAS_NETAS.Valor_VentasNetas, 0) * 100
	ELSE 0
END AS ColocacionCreditosYSeguros
FROM (
		SELECT        Periodos_1.Ano_Periodo, Periodos_1.Mes_Periodo, dbo.Centros.CodigoCentro, dbo.Centros.NombreCentro
        FROM            dbo.Periodos AS Periodos_1 
		CROSS JOIN		dbo.Centros) AS PERIODOS 
		LEFT OUTER JOIN	(
						SELECT DISTINCT Año, MesInicial, CodigoCentro, NombreCentro, sum(Valor) AS Valor_VentasNetas
                        --FROM dbo.vw_AsesoresCreditosSeguros_VentasNetas
						FROM dbo.vw_JefesDeVentas_VentasNetas -- JCS: 2022/09/21 (NUEVA VISTA)
                        WHERE        (MesInicial = MesFinal)
						group by Año, MesInicial, CodigoCentro, NombreCentro 

						) AS VENTAS_NETAS ON	PERIODOS.Ano_Periodo = VENTAS_NETAS.Año 
												AND PERIODOS.Mes_Periodo = VENTAS_NETAS.MesInicial 
												AND PERIODOS.CodigoCentro = VENTAS_NETAS.CodigoCentro 
		LEFT OUTER JOIN (SELECT DISTINCT Año, MesInicial, CodigoCentro, NombreCentro, Valor AS Valor_Seguros
                         FROM            dbo.vw_AsesoresCreditosSeguros_Seguros
                         WHERE        (MesInicial = MesFinal)
						 ) AS SEGUROS ON PERIODOS.CodigoCentro = SEGUROS.CodigoCentro 
												AND PERIODOS.Mes_Periodo = SEGUROS.MesInicial 
												AND PERIODOS.Ano_Periodo = SEGUROS.Año 
		LEFT OUTER JOIN (SELECT DISTINCT Año, MesInicial, CodigoCentro, NombreCentro, Valor AS Valor_Creditos
                    --FROM            dbo.vw_AsesoresCreditosSeguros_Creditos
					FROM dbo.vw_AsesoresCreditosSeguros_Creditos_Jefes -- JCS: 2023/02/21 (NUEVA VISTA)
                    WHERE        (MesInicial = MesFinal)) AS CREDITOS ON PERIODOS.CodigoCentro = CREDITOS.CodigoCentro 
																		AND PERIODOS.Mes_Periodo = CREDITOS.MesInicial 
																		AND PERIODOS.Ano_Periodo = CREDITOS.Año


```
