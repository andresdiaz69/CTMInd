# Table: spiga_InformeFacturas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| IdEmpresas | smallint | NO |
| IdAsientos | int | YES |
| AñoAsiento | nvarchar | YES |
| FechaFactura | datetime | YES |
| SerieFactura | nvarchar | YES |
| NumFactura | nvarchar | YES |
| AñoFactura | nvarchar | YES |
| NombreTerceroPagador | nvarchar | YES |
| Apellido1TerceroPagador | nvarchar | YES |
| Apellido2TerceroPagador | nvarchar | YES |
| NombreTerceroFactura | nvarchar | YES |
| Apellido1TerceroFactura | nvarchar | YES |
| Apellido2TerceroFactura | nvarchar | YES |
| NifCifTerceroPagador | nvarchar | YES |
| NifCifTercero | nvarchar | YES |
| NombrePaisTerceroPagador | nvarchar | YES |
| NombrePaisTercero | nvarchar | YES |
| IdTerceroPagador | int | YES |
| IdTerceroFactura | int | YES |
| BaseImponible | decimal | YES |
| BaseExenta | decimal | YES |
| BaseNoSujeta | decimal | YES |
| ImporteIVA | decimal | YES |
| ImportePendiente | decimal | YES |
| ImporteSaldado | decimal | YES |
| TotalFactura | decimal | YES |
| TipoRetencion | nvarchar | YES |
| Retencion | nvarchar | YES |
| Porc | decimal | YES |
| Cuota | decimal | YES |
| IdTipoRetenciones | smallint | YES |
| IdRetencion | smallint | YES |
| EsquemaGestionEliminacion | nvarchar | YES |
| IdMonedas | smallint | YES |
| DescripcionMoneda | nvarchar | YES |
| FactorCambioMoneda | decimal | YES |
| FactorCambioMonedaContravalor | decimal | YES |
| Referencia | nvarchar | YES |
| ConceptoAsiento | nvarchar | YES |
| IdCentros | smallint | YES |
| NombreCentro | nvarchar | YES |