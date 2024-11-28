# View: vw_GerentesDeLineaCT_22

## Usa los objetos:
- [[ExogenasEmpleadosMarcasPago]]
- [[vw_GerentesDeLineaCT_21]]

```sql


CREATE VIEW [dbo].[vw_GerentesDeLineaCT_22]
AS
SELECT        dbo.ExogenasEmpleadosMarcasPago.CodigoEmpleado, dbo.vw_GerentesDeLineaCT_21.Ano_Periodo, dbo.vw_GerentesDeLineaCT_21.Mes_Periodo, 
                         dbo.ExogenasEmpleadosMarcasPago.CodigoMarca, dbo.vw_GerentesDeLineaCT_21.Marca, dbo.vw_GerentesDeLineaCT_21.EficienciaAdministrativa
FROM            dbo.vw_GerentesDeLineaCT_21 RIGHT OUTER JOIN
                         dbo.ExogenasEmpleadosMarcasPago ON dbo.vw_GerentesDeLineaCT_21.CodigoMarca = dbo.ExogenasEmpleadosMarcasPago.CodigoMarca 
WHERE        (dbo.vw_GerentesDeLineaCT_21.Ano_Periodo IS NOT NULL)

```
