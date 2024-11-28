# Table: SalidasDetImpuestosWRK

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoSalidasAlbaran | nvarchar | NO |
| PkFkSeries_Salidas | nvarchar | NO |
| PkFkNumSalidasAlbaran | nvarchar | NO |
| PkFkSalidasDet | int | NO |
| PkFkImpuestoTipos | nvarchar | NO |
| FkImpuestos | nvarchar | NO |
| PorcImpuesto | decimal | YES |
| ImporteImpuesto | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| Dependiente | bit | NO |
| FkImpuestos_Origen | nvarchar | YES |
