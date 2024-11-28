# Table: CompraPolizaMovimientos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoExpediente | nvarchar | NO |
| PkFkSeries_Expediente | nvarchar | NO |
| PkFkNumExpediente | int | NO |
| PkCompraPolizaMovimientosNumDet_Iden | smallint | NO |
| FechaAlta | datetime | NO |
| FechaValor | datetime | NO |
| FechaRetirada | datetime | YES |
| FkCtaBancarias_Origen | smallint | NO |
| FkCtaBancarias_Destino | smallint | YES |
| DiasCarencia | smallint | YES |
| FkAñoCarta | nvarchar | YES |
| FkSeries_Carta | nvarchar | YES |
| FkNumCarta | int | YES |
| FkAñoAsiento | nvarchar | YES |
| FkAsientos | int | YES |
| FechaValor_Abono | datetime | YES |
| FkAsientos_Abono | int | YES |
| FkAñoAsiento_Abono | nvarchar | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkCompraPolizaMovimientoEstados | nvarchar | NO |
| ImporteCompra | decimal | YES |
| FechaMod | datetime | NO |
| FkComprasNumDet | smallint | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| FactorCambioMonedaInicial | decimal | YES |
| FactorCambioMonedaContravalor | decimal | YES |
