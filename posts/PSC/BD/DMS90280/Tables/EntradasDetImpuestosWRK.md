# Table: EntradasDetImpuestosWRK

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoEntradasAlbaran | nvarchar | NO |
| PkFkTerceros | int | NO |
| PkFkSeries_Entradas | nvarchar | NO |
| PkFkNumEntradasAlbaran | nvarchar | NO |
| PkFkEntradasDet | int | NO |
| PkFkImpuestoTipos | nvarchar | NO |
| FkImpuestos | nvarchar | NO |
| PorcImpuesto | decimal | YES |
| ImporteImpuesto | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Dependiente | bit | NO |
| FkImpuestos_Origen | nvarchar | YES |
