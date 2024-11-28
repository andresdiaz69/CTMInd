# View: vw_alerta_ContabilidadBalanceSumasSaldosSinDesglose

## Usa los objetos:
- [[spiga_ContabilidadBalanceSumasSaldosSinDesglose]]

```sql






CREATE VIEW [dbo].[vw_alerta_ContabilidadBalanceSumasSaldosSinDesglose]
AS
SELECT        IdSincronizacionSpiga, IdConsecutivo, Ano_Periodo, Mes_Periodo, FechaDeCorte, IdEmpresas, 


CAST(IdContCtas AS BIGINT) AS IdContCtas,

TerceroBanco, NombreTerceroBanco, NifCifTerceroBanco, NombreCuenta, TipoCalculo, ImporteDebeApertura, 
                         ImporteHaberApertura, ImporteDebeUltimoMes, ImporteHaberUltimoMes, TotalDebePeriodo, TotalHaberPeriodo, ImporteDebeAperturaContravalor, ImporteHaberAperturaContravalor, ImporteDebeUltimoMesContravalor, 
                         ImporteHaberUltimoMesContravalor, TotalDebePeriodoContravalor, TotalHaberPeriodoContravalor, FkContNiveles,

						 CAST(NombreCuenta AS VARCHAR(255))  + ' - ' + CAST(NombreTerceroBanco AS VARCHAR(255))  + ' - ' + CAST(NifCifTerceroBanco AS VARCHAR(255))  AS Cuenta,
						 TotalDebePeriodo - TotalHaberPeriodo AS Saldo


FROM            [PSCService_DB].dbo.spiga_ContabilidadBalanceSumasSaldosSinDesglose

WHERE ANO_PERIODO >= 2024 --JCS:2024/04/22 POR PERFORMANCE


```
