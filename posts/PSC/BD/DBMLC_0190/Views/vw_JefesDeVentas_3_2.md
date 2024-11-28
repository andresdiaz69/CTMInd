# View: vw_JefesDeVentas_3_2

## Usa los objetos:
- [[ExogenasEmpleadosCentrosPago]]
- [[vw_JefesDeVentas_3_1]]

```sql



CREATE VIEW [dbo].[vw_JefesDeVentas_3_2]
AS
SELECT        dbo.ExogenasEmpleadosCentrosPago.CodigoEmpleado, dbo.vw_JefesDeVentas_3_1.Ano_Periodo, dbo.vw_JefesDeVentas_3_1.Mes_Periodo, dbo.vw_JefesDeVentas_3_1.CodigoEmpresa, 
                         dbo.ExogenasEmpleadosCentrosPago.CodigoCentro, dbo.vw_JefesDeVentas_3_1.Centro, dbo.vw_JefesDeVentas_3_1.EficienciaAdministrativa
FROM            dbo.vw_JefesDeVentas_3_1 RIGHT OUTER JOIN
                         dbo.ExogenasEmpleadosCentrosPago ON dbo.vw_JefesDeVentas_3_1.CodigoCentro = dbo.ExogenasEmpleadosCentrosPago.CodigoCentro
WHERE        (dbo.vw_JefesDeVentas_3_1.Ano_Periodo IS NOT NULL)


```
