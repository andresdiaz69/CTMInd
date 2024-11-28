# Table: VehiculosInternos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkVehiculos | int | NO |
| FkVehiculoTiposUso | nvarchar | NO |
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkVehiculosInternosEstados | smallint | YES |
| Publicar | bit | NO |
| IdExterno | nvarchar | YES |
