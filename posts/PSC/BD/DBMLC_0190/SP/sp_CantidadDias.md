# Stored Procedure: sp_CantidadDias

```sql
CREATE PROCEDURE [dbo].[sp_CantidadDias] 
  @FechaInicio as datetime,
  @FechaFin as datetime 
as
begin

SELECT DATEDIFF(DAY , @FechaInicio, @FechaFin);

end

```
