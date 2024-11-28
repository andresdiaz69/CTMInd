# Stored Procedure: sp_BalanceSumasSsaldos

## Usa los objetos:
- [[spiga_BalanceSumasSaldos]]

```sql
CREATE PROCEDURE [dbo].[sp_BalanceSumasSsaldos]
(
@IdEmpresas int,
@FechaDesde date,
@FechaHasta date
)
AS
BEGIN
SET NOCOUNT ON
SET FMTONLY OFF

SELECT *
	FROM [PSCService_DB].[dbo].[spiga_BalanceSumasSaldos] 
    WHERE IdEmpresas = @IdEmpresas
	AND  CONVERT(DATE, FechaDeCorte) >= @fechaDesde
	AND CONVERT(DATE, FechaDeCorte) <= @FechaHasta

END

```
