# Table: PrestamosDaños

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkVehiculos | int | NO |
| PkFkPrestamos | int | NO |
| PkFkDañosTipos | smallint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| DañoEntrega | tinyint | YES |
| DañoDevolucion | tinyint | YES |
