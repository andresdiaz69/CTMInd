# View: vw_JefesDeVentas_4_2

## Usa los objetos:
- [[ExogenasEmpleadosCentrosPago]]
- [[vw_JefesDeVentas_4_1]]

```sql



CREATE VIEW [dbo].[vw_JefesDeVentas_4_2]
AS
SELECT        dbo.ExogenasEmpleadosCentrosPago.CodigoEmpleado, dbo.vw_JefesDeVentas_4_1.Ano_Periodo, dbo.vw_JefesDeVentas_4_1.Mes_Periodo,
                         dbo.ExogenasEmpleadosCentrosPago.CodigoCentro, dbo.vw_JefesDeVentas_4_1.NombreCentro AS Centro, MAX(dbo.vw_JefesDeVentas_4_1.ColocacionCreditosYSeguros) AS ColocacionCreditosYSeguros
FROM            dbo.vw_JefesDeVentas_4_1 RIGHT OUTER JOIN
                         dbo.ExogenasEmpleadosCentrosPago ON dbo.vw_JefesDeVentas_4_1.CodigoCentro = dbo.ExogenasEmpleadosCentrosPago.CodigoCentro
WHERE        (dbo.vw_JefesDeVentas_4_1.Ano_Periodo IS NOT NULL)

GROUP BY 

dbo.ExogenasEmpleadosCentrosPago.CodigoEmpleado, dbo.vw_JefesDeVentas_4_1.Ano_Periodo, dbo.vw_JefesDeVentas_4_1.Mes_Periodo,
                         dbo.ExogenasEmpleadosCentrosPago.CodigoCentro, dbo.vw_JefesDeVentas_4_1.NombreCentro


```
