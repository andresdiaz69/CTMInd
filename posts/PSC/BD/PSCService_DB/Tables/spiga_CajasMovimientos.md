# Table: spiga_CajasMovimientos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacion | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| IdEmpresas | smallint | NO |
| IdCentros | smallint | NO |
| IdCajas | smallint | NO |
| IdCajasDet | int | YES |
| IdCajaAcciones | smallint | YES |
| Fecha | datetime | YES |
| Concepto | nvarchar | YES |
| Importe | decimal | YES |
| IdCajasDetAnulado | int | YES |
| IdPagoFormaTipos | nvarchar | YES |
| IdCajasFacturasDet | smallint | YES |
| AñoAsientoContabiliza | nvarchar | YES |
| IdAsientosContabiliza | int | YES |
| AñoAsiento | nvarchar | YES |
| IdAsientos | int | YES |
| IdEfectosNumDet | smallint | YES |
| DescripcionAccionCaja | nvarchar | YES |
| IdCajaAccionesAnulado | smallint | YES |
| FechaAnulado | datetime | YES |
| NumFactura | nvarchar | YES |
| AñoFactura | nvarchar | YES |
| FechaFactura | datetime | YES |
| SerieFactura | nvarchar | YES |
| IdTerceros | int | YES |
| IdFacturaTipos | nvarchar | YES |
| NombreTercero | nvarchar | YES |
| Apellido1 | nvarchar | YES |
| Apellido2 | nvarchar | YES |
| NumeroSaldar | nvarchar | YES |
| ImporteEfecto | decimal | YES |
| IdPagoFormas | nvarchar | YES |
| DescripcionFormaPago | nvarchar | YES |
| DescripcionAccionCajaAnulado | nvarchar | YES |
| IdEmpleados | smallint | YES |
| NombreEmpleado | nvarchar | YES |
| Anulacion | int | YES |
| IdConceptosBancarios | nvarchar | YES |
| IdTerceroPagador | int | YES |
| NombreTerceroPagador | nvarchar | YES |
| Apellido1Pagador | nvarchar | YES |
| Apellido2Pagador | nvarchar | YES |
| IdAsientoGestionEliminacion | nvarchar | YES |
| CancelaSaldoCiaSeguros | bit | YES |
| IdSituacionEfectos | tinyint | YES |
| ImporteFactura | decimal | YES |
| FactorCambioMoneda | decimal | YES |
| ImporteMoneda | decimal | YES |
| IdSeries_NotaLiquidacion | nvarchar | YES |
| NumNotaLiquidacion | int | YES |
| AñoNotaLiquidacion | nvarchar | YES |
| ImporteRetencionManoObra | decimal | YES |
| ImporteTalon | decimal | YES |
| IdImpuestos | nvarchar | YES |
| TotalFacturaSinRedondeo | decimal | YES |
| ImporteDiferenciaCambioSaldar | decimal | YES |
| IdEfectosNumDetPadre | smallint | YES |
| FechaVto | datetime | YES |
| TipoContabilizacion | nvarchar | YES |
| ImporteFacturaMoneda | decimal | YES |
| FactorCambioContabiliza | decimal | YES |
| AñoAsientoProvision | nvarchar | YES |
| IdAsientosProvision | int | YES |
| IdMonedas | smallint | YES |
| PermiteTarjetasInternas | bit | YES |
| FechaAsientoSaldar | datetime | YES |
| NumeroAsientoSaldar | int | YES |
| ImporteTimbre | decimal | YES |
| IdImpuestosTimbre | nvarchar | YES |
| DescripcionImpuestosTimbre | nvarchar | YES |
| DocumentoBancario | nvarchar | YES |
| NombreCentro | nvarchar | YES |
| DescripcionCaja | nvarchar | YES |
| PermiteTarjetasPagoAplazado | bit | YES |
| PagoTarjetaAplazados | bit | YES |
| IdSituacionEfectos1 | tinyint | YES |
| NumCuotasAplazadas | nvarchar | YES |
| Voucher | nvarchar | YES |
| IdContCtasContabilizacion | nvarchar | YES |
| IdCajasAnuladosDet_Parcial | int | YES |
