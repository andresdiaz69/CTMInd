# Table: VehiculosUbicaciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkVehiculos | int | NO |
| PkVehiculosUbicaciones_Iden | int | NO |
| FechaEntrada | datetime | NO |
| FkEmpresas | smallint | NO |
| FkCentros | smallint | NO |
| FkUbicaVNO | nvarchar | NO |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
