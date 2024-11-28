# View: vw_CalendarioNovedadNomina_Calendario

## Usa los objetos:
- [[CalendarioNovedadNomina]]

```sql

CREATE VIEW [dbo].[vw_CalendarioNovedadNomina_Calendario]
AS
SELECT        DAY(FechaCorte) AS dia, Mes, YEAR(FechaCorte) AS anio, Corte, FechaCorte
FROM            dbo.CalendarioNovedadNomina

```
