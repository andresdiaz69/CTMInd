# Table: TraspasosDetImpuestos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoTraspaso | nvarchar | NO |
| PkFkSeries_Traspaso | nvarchar | NO |
| PkFkNumTraspaso | int | NO |
| PkFkTraspasoDet | int | NO |
| PkFkImpuestoTipos | nvarchar | NO |
| FkImpuestos | nvarchar | NO |
| PorcImpuesto | decimal | YES |
| ImporteImpuesto | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| PorcImpuesto_Original | decimal | YES |
| ImporteImpuesto_Original | decimal | YES |
