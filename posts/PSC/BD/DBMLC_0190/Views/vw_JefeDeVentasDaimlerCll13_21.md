# View: vw_JefeDeVentasDaimlerCll13_21

## Usa los objetos:
- [[ExogenasVehiculosVentasNacionales]]
- [[vw_ComercialVNPorCom_Liquidacion_Jefes_CentroMarca]]

```sql
CREATE VIEW [dbo].[vw_JefeDeVentasDaimlerCll13_21]
AS
SELECT        ENTREGAS.Ano_Periodo, ENTREGAS.Mes_Periodo, ENTREGAS.CodigoEmpresa, ENTREGAS.CodigoCentro, ENTREGAS.Centro, ENTREGAS.CodigoMArca, ENTREGAS.Marca, ISNULL(ENTREGAS.VehiculosRecaudados, 0) 
                         AS VehiculosRecaudados, ISNULL(VENTAS_NACIONALES.Unidades, 0) AS VentasNacionales, CASE WHEN ISNULL(VENTAS_NACIONALES.Unidades, 0) > 0 THEN ISNULL(CONVERT(decimal(18, 2), 
                         ENTREGAS.VehiculosRecaudados), 0) / ISNULL(CONVERT(decimal(18, 2), VENTAS_NACIONALES.Unidades), 0) * 100 ELSE 0.00 END AS PesoComercial
FROM            (SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoCentro, Centro, CodigoMArca, Marca, SUM(VehiculosRecaudados) AS VehiculosRecaudados
                          FROM            dbo.vw_ComercialVNPorCom_Liquidacion_Jefes_CentroMarca
                          GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoCentro, Centro, CodigoMArca, Marca) AS ENTREGAS LEFT OUTER JOIN
                             (SELECT        Ano AS Ano_Periodo, Mes AS Mes_Periodo, CodigoMarca, SUM(Unidades) AS Unidades
                               FROM            dbo.ExogenasVehiculosVentasNacionales
                               GROUP BY Ano, Mes, CodigoMarca) AS VENTAS_NACIONALES ON ENTREGAS.CodigoMArca = VENTAS_NACIONALES.CodigoMarca AND ENTREGAS.Mes_Periodo = VENTAS_NACIONALES.Mes_Periodo AND 
                         ENTREGAS.Ano_Periodo = VENTAS_NACIONALES.Ano_Periodo

```
