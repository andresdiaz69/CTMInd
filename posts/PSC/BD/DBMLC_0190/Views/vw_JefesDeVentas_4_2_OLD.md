# View: vw_JefesDeVentas_4_2_OLD

## Usa los objetos:
- [[ExogenasEmpleadosCentrosPago]]
- [[vw_JefesDeVentas_4_1]]

```sql



CREATE VIEW [dbo].[vw_JefesDeVentas_4_2_OLD]
AS
SELECT        dbo.ExogenasEmpleadosCentrosPago.CodigoEmpleado, dbo.vw_JefesDeVentas_4_1.Ano_Periodo, dbo.vw_JefesDeVentas_4_1.Mes_Periodo,
                         dbo.ExogenasEmpleadosCentrosPago.CodigoCentro, dbo.vw_JefesDeVentas_4_1.NombreCentro AS Centro, dbo.vw_JefesDeVentas_4_1.ColocacionCreditosYSeguros
FROM            dbo.vw_JefesDeVentas_4_1 RIGHT OUTER JOIN
                         dbo.ExogenasEmpleadosCentrosPago ON dbo.vw_JefesDeVentas_4_1.CodigoCentro = dbo.ExogenasEmpleadosCentrosPago.CodigoCentro
WHERE        (dbo.vw_JefesDeVentas_4_1.Ano_Periodo IS NOT NULL)


```
