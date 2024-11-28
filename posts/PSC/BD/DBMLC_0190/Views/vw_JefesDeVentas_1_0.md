# View: vw_JefesDeVentas_1_0

## Usa los objetos:
- [[ExogenasEmpleadosCentrosPago]]
- [[ExogenasEmpleadosMarcasTipos]]
- [[ExogenasVehiculosVentasNacionales]]
- [[vw_ComercialVNPorCom_Liquidacion_Jefes_CentroMarca]]

```sql

CREATE VIEW [dbo].[vw_JefesDeVentas_1_0]
AS
SELECT        ENTREGAS.Ano_Periodo, ENTREGAS.Mes_Periodo, CENTROS_PAGO.CodigoEmpleado, ENTREGAS.CodigoEmpresa, ENTREGAS.CodigoCentro, ENTREGAS.Centro, ENTREGAS.CodigoMArca, ENTREGAS.Marca, 
                         
						 ISNULL(MAX(ENTREGAS.VehiculosRecaudados), 0) AS VehiculosRecaudados, 
						 ISNULL(SUM(VENTAS_NACIONALES.Unidades), 0) AS VentasNacionales,

						 CASE WHEN ISNULL(SUM(VENTAS_NACIONALES.Unidades), 0) > 0 
						 THEN ISNULL(CONVERT(decimal(18,2), MAX(ENTREGAS.VehiculosRecaudados)), 0) / ISNULL(CONVERT(decimal(18,2), SUM(VENTAS_NACIONALES.Unidades)), 0) * 100 
						 ELSE 0.00 END AS PesoComercial

FROM            (SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoCentro, Centro, CodigoMArca, Marca, SUM(VehiculosRecaudados) AS VehiculosRecaudados
                          FROM            dbo.vw_ComercialVNPorCom_Liquidacion_Jefes_CentroMarca
                          GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoCentro, Centro, CodigoMArca, Marca) AS ENTREGAS INNER JOIN
                             (SELECT        Ano AS Ano_Periodo, Mes AS Mes_Periodo, CodigoMarca, CodigoTipo, Unidades
                               FROM            dbo.ExogenasVehiculosVentasNacionales) AS VENTAS_NACIONALES ON ENTREGAS.Ano_Periodo = VENTAS_NACIONALES.Ano_Periodo AND ENTREGAS.Mes_Periodo = VENTAS_NACIONALES.Mes_Periodo AND 
                         ENTREGAS.CodigoMArca = VENTAS_NACIONALES.CodigoMarca INNER JOIN
                             (SELECT        CodigoEmpleado, CodigoCentro
                               FROM            dbo.ExogenasEmpleadosCentrosPago) AS CENTROS_PAGO ON ENTREGAS.CodigoCentro = CENTROS_PAGO.CodigoCentro INNER JOIN
                             (SELECT        CodigoEmpleado, CodigoTipo
                               FROM            dbo.ExogenasEmpleadosMarcasTipos) AS MARCAS_TIPOS ON CENTROS_PAGO.CodigoEmpleado = MARCAS_TIPOS.CodigoEmpleado AND VENTAS_NACIONALES.CodigoTipo = MARCAS_TIPOS.CodigoTipo
GROUP BY ENTREGAS.Ano_Periodo, ENTREGAS.Mes_Periodo, CENTROS_PAGO.CodigoEmpleado, ENTREGAS.CodigoEmpresa, ENTREGAS.CodigoCentro, ENTREGAS.Centro, ENTREGAS.CodigoMArca, ENTREGAS.Marca

```
