# Table: ComprasPreciosVenta

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoExpediente | nvarchar | NO |
| PkFkSeries_Expediente | nvarchar | NO |
| PkFkNumExpediente | int | NO |
| PkFkVentaTipos | nvarchar | NO |
| PrecioVenta | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
