# View: vw_spiga_CajasTraspasos

## Usa los objetos:
- [[spiga_CajasTraspasos]]

```sql

CREATE VIEW [dbo].[vw_spiga_CajasTraspasos]
AS
SELECT        IdSincronizacion, IdConsecutivo, Ano_Periodo, Mes_Periodo, FechaDeCorte, IdEmpresas, IdCentros, IdCajas, IdCajasDet, UserMod, HostMod, VersionFila, FechaMod, NumDocumento, FechaVto, Importe, FechaTraspaso, 
                         FechaAlta, IdCajasDetTraspaso, IdCajasDocumentos, FactorCambioMoneda, IdMonedas, ImporteTalon, IdSeries_NotaLiquidacion, NumNotaLiquidacion, AñoNotaLiquidacion, IdTercero_Pagador, IdCajaAcciones, 
                         IdCajasFacturasDet, AñoAsiento, IdAsientos, IdEfectosNumDet, IdRecibos, IdRecibosAsientos, SerieFactura, NumFactura, AñoFactura, IdContCtasTerceroPagador, IdCentrosRelacionado, IdCajasRelacionado, 
                         IdCajasDetRelacionado, ImporteDetalle, IdFacturaTipos, IdBancoEntidades, NombreBancoEntidad, DescripcionCentro, DescripcionCaja, FechaExportacion, FechaExportacionAnulacion
FROM            [PSCService_DB].dbo.spiga_CajasTraspasos

```
