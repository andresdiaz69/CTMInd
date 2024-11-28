# Table: FicheroIDA_SEAT

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFechaCreacion | datetime | NO |
| PkFicheroIDA_SEAT_Iden | smallint | NO |
| FechaDesde | datetime | NO |
| FechaHasta | datetime | NO |
| FechaApertura | datetime | YES |
| FkTerceros | int | NO |
| FkTerceros_Habitual | int | YES |
| Kmts | int | YES |
| FkVehiculos | int | YES |
| FkEmpleados | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Garantia | bit | NO |
| EnvioAutomatico | bit | NO |
