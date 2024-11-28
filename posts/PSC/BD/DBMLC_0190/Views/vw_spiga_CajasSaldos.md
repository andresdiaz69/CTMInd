# View: vw_spiga_CajasSaldos

## Usa los objetos:
- [[spiga_CajasSaldos]]

```sql

CREATE VIEW [dbo].[vw_spiga_CajasSaldos]
AS
SELECT        IdSincronizacion, IdConsecutivo, Ano_Periodo, Mes_Periodo, FechaDeCorte, IdEmpresas, IdCentros, IdCajas, Saldo, SaldoMoneda
FROM            [PSCService_DB].dbo.spiga_CajasSaldos

```
