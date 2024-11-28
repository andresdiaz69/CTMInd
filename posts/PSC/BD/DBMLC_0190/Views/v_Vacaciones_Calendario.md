# View: v_Vacaciones_Calendario

## Usa los objetos:
- [[Vacaciones_Calendario]]

```sql



CREATE VIEW [dbo].[v_Vacaciones_Calendario]
AS
SELECT        DAY(FechaCorte) AS dia, Mes, YEAR(FechaCorte) AS anio, Corte, FechaCorte
FROM            dbo.Vacaciones_Calendario

```
