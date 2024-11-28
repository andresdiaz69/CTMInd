# Table: spiga_HojasDeGastosPendientes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | bigint | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| IdEmpresas | smallint | YES |
| Abono | bit | YES |
| IdCentros | smallint | YES |
| IdAñoFactura | nvarchar | YES |
| IdSeries | nvarchar | YES |
| IdNumFactura | nvarchar | YES |
| FechaFactura | datetime | YES |
| FechaAsiento | datetime | YES |
| Retencion | decimal | YES |
| PorcImpuestos | decimal | YES |
| IdPagoFormas | nvarchar | YES |
| DescripcionPagoFormas | nvarchar | YES |
| IdTerceros | int | YES |
| NombreTercero | nvarchar | YES |
| ImporteBI | decimal | YES |
| ImporteBE | decimal | YES |
| ImporteBNS | decimal | YES |
| ImporteCOS | decimal | YES |
| Concepto | nvarchar | YES |
| NombreEmpresa | nvarchar | YES |
| NombreCentro | nvarchar | YES |
| IdMonedas | int | YES |
| FactorCambioMoneda | decimal | YES |
| IdAsientos | int | YES |
| IdAñoAsiento | nvarchar | YES |
| IdDocumentoEmitidoTipos | int | YES |
| ImporteTotalFactura | decimal | YES |
| FactorCambioMonedaContravalor | decimal | YES |
