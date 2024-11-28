# View: vw_GerenteRegionalVillavicencio_21

## Usa los objetos:
- [[ExogenasEficienciaAdministrativaEmpleados]]

```sql
CREATE VIEW [dbo].[vw_GerenteRegionalVillavicencio_21]
AS
SELECT        Ano AS Ano_Periodo, Mes AS Mes_Periodo, CodigoEmpleado, EficienciaAdministrativa
FROM            dbo.ExogenasEficienciaAdministrativaEmpleados AS Efe
WHERE        (Ano IS NOT NULL)

```
