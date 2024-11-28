# View: vw_GerentesDeLineaCT_21

## Usa los objetos:
- [[ExogenasEficienciaAdministrativaMarcas]]
- [[VehiculosMarcas]]

```sql

CREATE VIEW [dbo].[vw_GerentesDeLineaCT_21]
AS
SELECT        dbo.ExogenasEficienciaAdministrativaMarcas.Ano AS Ano_Periodo, dbo.ExogenasEficienciaAdministrativaMarcas.Mes AS Mes_Periodo, dbo.ExogenasEficienciaAdministrativaMarcas.CodigoMarca, 
                         dbo.VehiculosMarcas.Marca AS Marca, dbo.ExogenasEficienciaAdministrativaMarcas.EficienciaAdministrativa
FROM            dbo.VehiculosMarcas RIGHT OUTER JOIN                       
                         dbo.ExogenasEficienciaAdministrativaMarcas ON dbo.VehiculosMarcas.CodigoMarca = dbo.ExogenasEficienciaAdministrativaMarcas.CodigoMarca

```
