# Table: VehiculosEspecificacionesTipos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkVehiculos | int | NO |
| PkFkEspecificacionesTipos | smallint | NO |
| ValorEspecificacion | nvarchar | NO |
| Importado | bit | NO |
| Modificado | bit | NO |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| ValorEspecificacionExterno | nvarchar | YES |
