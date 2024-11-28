# Table: TraduccionesTablasColumnas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkTraducciones | smallint | NO |
| PkFkEsquemas | nvarchar | NO |
| PkFkTablas | nvarchar | NO |
| PkFkColumnas | nvarchar | NO |
| Clave | bit | YES |
| Pivote | bit | YES |
| Localizable | bit | YES |
| Excluido | bit | YES |
| Observaciones | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
