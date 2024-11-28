# Table: CompraGastoAdicionalDetalles

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkCompraGastoAdicionales | int | NO |
| FkAñoExpediente | nvarchar | NO |
| FkSeries_Expediente | nvarchar | NO |
| FkNumExpediente | int | NO |
| BaseNoSujeta | decimal | YES |
| BaseExenta | decimal | YES |
| BaseImponible | decimal | NO |
| CreacionPosteriorVenta | bit | NO |
| AfectaRentabilidad | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkCompraGastoAdicionalTipos | nvarchar | NO |
| IncrementaStock | bit | NO |
| SobreCosteVO | bit | NO |
| PkCompraGastoAdicionalDetalles_Iden | int | NO |
| FkCentros_Origen | smallint | YES |
| FkSeries_OT | nvarchar | YES |
| FkAñoOT | nvarchar | YES |
| FkNumOT | int | YES |
| FkNumTrabajo | tinyint | YES |
| FkSeries_Salidas | nvarchar | YES |
| FkNumSalidasAlbaran | nvarchar | YES |
| FkAñoSalidasAlbaran | nvarchar | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| FkBaterias | int | YES |
| BateriaCreada | bit | YES |
| FkVehiculos | int | YES |
| FkCentros_Traspaso | smallint | YES |
| FkComprasNumDet_Traspaso | smallint | YES |
| ImporteSuplidos | decimal | YES |
| ContabilizaAlbaran | bit | NO |
| ContabilizaMedianteDUA | bit | NO |
| FkEmpresas_OT | smallint | YES |
