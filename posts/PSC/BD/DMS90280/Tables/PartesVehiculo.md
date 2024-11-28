# Table: PartesVehiculo

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkPartesVehiculo | nvarchar | NO |
| Descripcion | nvarchar | NO |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkManoObraTipos | smallint | YES |
| FechaMod | datetime | NO |
