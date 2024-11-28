# View: vw_alerta_CajasSaldos

## Usa los objetos:
- [[vw_alerta_Cajas]]
- [[vw_spiga_CajasSaldos]]

```sql

CREATE VIEW [dbo].[vw_alerta_CajasSaldos]
AS
SELECT        dbo.vw_spiga_CajasSaldos.IdSincronizacion, dbo.vw_spiga_CajasSaldos.IdConsecutivo, dbo.vw_spiga_CajasSaldos.Ano_Periodo, dbo.vw_spiga_CajasSaldos.Mes_Periodo, dbo.vw_spiga_CajasSaldos.FechaDeCorte, 
                         dbo.vw_spiga_CajasSaldos.IdEmpresas, dbo.vw_alerta_Cajas.NombreEmpresa, dbo.vw_alerta_Cajas.SiglaEmpresa, dbo.vw_spiga_CajasSaldos.IdCentros, dbo.vw_alerta_Cajas.NombreCentro, 
                         dbo.vw_spiga_CajasSaldos.IdCajas, dbo.vw_alerta_Cajas.NombreCaja, dbo.vw_alerta_Cajas.IdTipos, dbo.vw_alerta_Cajas.Tipos, 
                         ISNULL(dbo.vw_spiga_CajasSaldos.Saldo, 0) AS Saldo, ISNULL(dbo.vw_spiga_CajasSaldos.SaldoMoneda, 0) AS SaldoMoneda
FROM            dbo.vw_alerta_Cajas RIGHT OUTER JOIN
                         dbo.vw_spiga_CajasSaldos ON dbo.vw_alerta_Cajas.IdCajas = dbo.vw_spiga_CajasSaldos.IdCajas AND dbo.vw_alerta_Cajas.IdCentros = dbo.vw_spiga_CajasSaldos.IdCentros AND 
                         dbo.vw_alerta_Cajas.IdEmpresas = dbo.vw_spiga_CajasSaldos.IdEmpresas AND dbo.vw_alerta_Cajas.IdEmpresas = dbo.vw_spiga_CajasSaldos.IdEmpresas

```
