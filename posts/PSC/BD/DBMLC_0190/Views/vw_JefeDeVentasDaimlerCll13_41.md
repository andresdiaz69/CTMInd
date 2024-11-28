# View: vw_JefeDeVentasDaimlerCll13_41

## Usa los objetos:
- [[ExogenasEficienciaJefesDeVentas]]

```sql


CREATE VIEW [dbo].[vw_JefeDeVentasDaimlerCll13_41]
AS
SELECT        dbo.ExogenasEficienciaJefesDeVentas.Ano AS Ano_Periodo, dbo.ExogenasEficienciaJefesDeVentas.Mes AS Mes_Periodo,dbo.ExogenasEficienciaJefesDeVentas.CodigoEmpleado,  dbo.ExogenasEficienciaJefesDeVentas.EficienciaAdministrativa
FROM		  dbo.ExogenasEficienciaJefesDeVentas

```
