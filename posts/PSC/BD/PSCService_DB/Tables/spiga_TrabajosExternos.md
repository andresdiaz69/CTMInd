# Table: spiga_TrabajosExternos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| IdEmpresas | smallint | YES |
| IdCentros | smallint | YES |
| AñoAlbaran | nvarchar | YES |
| IdTerceros | int | YES |
| NombreTercero | nvarchar | YES |
| SerieAlbaran | nvarchar | YES |
| NumAlbaran | nvarchar | YES |
| FechaAlbaran | datetime | YES |
| FechaAlta | datetime | YES |
| IdAsientos | int | YES |
| AñoAsiento | nvarchar | YES |
| AñoFactura | nvarchar | YES |
| SerieFactura | nvarchar | YES |
| NumFactura | nvarchar | YES |
| NumDet | smallint | YES |
| Descripcion | nvarchar | YES |
| Unidades | decimal | YES |
| PrecioCompra | decimal | YES |
| PorcDescuentoCompra | decimal | YES |
| IdImpuestoTiposCompra | nvarchar | YES |
| IdImpuestoCompra | nvarchar | YES |
| ImpuestoPorcCompra | decimal | YES |
| ImpuestoImporteCompra | int | YES |
| IdArticulosTipos | int | YES |
| DescripcionArticulosTipos | nvarchar | YES |
| AñoOT | nvarchar | YES |
| SerieOT | nvarchar | YES |
| NumOT | int | YES |
| NumTrabajo | tinyint | YES |
| NombreCentro | nvarchar | YES |
| FechaFactura | datetime | YES |
| Series | nvarchar | YES |
| FactorCambioMoneda | decimal | YES |
| ImporteExento | decimal | YES |
| FactorCambioMonedaContravalor | decimal | YES |
