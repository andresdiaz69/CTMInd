# Table: ControlSalidas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkCentros | smallint | NO |
| PkFkVehiculos | int | NO |
| PkControlSalidas | datetime | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Origen | nvarchar | YES |
| FkUsuarios | smallint | YES |
| FechaPrevista | datetime | YES |
| FkEmpresas | smallint | YES |
