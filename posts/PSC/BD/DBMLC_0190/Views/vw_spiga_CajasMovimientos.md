# View: vw_spiga_CajasMovimientos

## Usa los objetos:
- [[spiga_CajasMovimientos]]

```sql

CREATE VIEW [dbo].[vw_spiga_CajasMovimientos]
AS
SELECT        IdSincronizacion, IdConsecutivo, Ano_Periodo, Mes_Periodo, FechaDeCorte, IdEmpresas, IdCentros, IdCajas, IdCajasDet, IdCajaAcciones, Fecha, Concepto, Importe, IdCajasDetAnulado, IdPagoFormaTipos, IdCajasFacturasDet, 
                         AñoAsientoContabiliza, IdAsientosContabiliza, AñoAsiento, IdAsientos, IdEfectosNumDet, DescripcionAccionCaja, IdCajaAccionesAnulado, FechaAnulado, NumFactura, AñoFactura, FechaFactura, SerieFactura, IdTerceros, 
                         IdFacturaTipos, NombreTercero, Apellido1, Apellido2, NumeroSaldar, ImporteEfecto, IdPagoFormas, DescripcionFormaPago, DescripcionAccionCajaAnulado, IdEmpleados, NombreEmpleado, Anulacion, IdConceptosBancarios, 
                         IdTerceroPagador, NombreTerceroPagador, Apellido1Pagador, Apellido2Pagador, IdAsientoGestionEliminacion, CancelaSaldoCiaSeguros, IdSituacionEfectos, ImporteFactura, FactorCambioMoneda, ImporteMoneda, 
                         IdSeries_NotaLiquidacion, NumNotaLiquidacion, AñoNotaLiquidacion, ImporteRetencionManoObra, ImporteTalon, IdImpuestos, TotalFacturaSinRedondeo, ImporteDiferenciaCambioSaldar, IdEfectosNumDetPadre, FechaVto, 
                         TipoContabilizacion, ImporteFacturaMoneda, FactorCambioContabiliza, AñoAsientoProvision, IdAsientosProvision, IdMonedas, PermiteTarjetasInternas, FechaAsientoSaldar, NumeroAsientoSaldar, ImporteTimbre, 
                         IdImpuestosTimbre, DescripcionImpuestosTimbre, DocumentoBancario, NombreCentro, DescripcionCaja, PermiteTarjetasPagoAplazado, PagoTarjetaAplazados, IdSituacionEfectos1, NumCuotasAplazadas, Voucher, 
                         IdContCtasContabilizacion, IdCajasAnuladosDet_Parcial
FROM            [PSCService_DB].dbo.spiga_CajasMovimientos

```
