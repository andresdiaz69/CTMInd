# Table: FicherosExportacionEntidadesEnviadas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkFicherosExportacion | nvarchar | NO |
| PkFicherosExportacionEntidadesEnviadas | nvarchar | NO |
| FechaEnvio | datetime | NO |
| FkEmpresas | smallint | YES |
| FkCentros | smallint | YES |
| EstadoEnvio | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
