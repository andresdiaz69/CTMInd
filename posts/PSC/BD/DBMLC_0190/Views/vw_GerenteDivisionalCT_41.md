# View: vw_GerenteDivisionalCT_41

## Usa los objetos:
- [[ExogenasEficienciaAdministrativaEmpleados]]

```sql



CREATE VIEW [dbo].[vw_GerenteDivisionalCT_41]
AS
SELECT        Efe.Ano AS Ano_Periodo, Efe.Mes AS Mes_Periodo, Efe.CodigoEmpleado, Efe.EficienciaAdministrativa
FROM  dbo.ExogenasEficienciaAdministrativaEmpleados as Efe
		WHERE        (Efe.Ano IS NOT NULL)
                        

```
